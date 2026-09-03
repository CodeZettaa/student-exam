-- Advanced JavaScript Exam Generator
-- Apply this in the Supabase SQL editor.
--
-- After applying:
-- 1. Disable public sign-ups in Authentication > Providers > Email
-- 2. Create one instructor user in Authentication > Users
-- 3. Optionally insert that email into admin_allowlist below

create extension if not exists pgcrypto;

create table if not exists public.admin_allowlist (
  email text primary key
);

create table if not exists public.exams (
  id uuid primary key default gen_random_uuid(),
  exam_id text not null unique,
  student_name text not null unique,
  exam_version integer not null check (exam_version >= 1),
  generated_questions jsonb not null,
  access_token text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.exam_submissions (
  id uuid primary key default gen_random_uuid(),
  exam_id text not null unique references public.exams (exam_id) on delete cascade,
  student_name text not null,
  answers jsonb not null default '{"mcq":{},"explain":{},"problem":{}}'::jsonb,
  started_at timestamptz,
  submitted_at timestamptz,
  duration_seconds integer,
  status text not null default 'not_started'
    check (status in ('not_started', 'in_progress', 'submitted', 'graded')),
  total_score numeric,
  instructor_notes text,
  mcq_score numeric,
  explain_scores jsonb,
  problem_score numeric,
  problem_comment text,
  timed_out boolean not null default false,
  updated_at timestamptz not null default now()
);

create index if not exists exams_exam_id_idx on public.exams (exam_id);
create index if not exists exams_access_token_idx on public.exams (access_token);
create index if not exists exams_student_name_idx on public.exams (student_name);
create index if not exists exam_submissions_exam_id_idx on public.exam_submissions (exam_id);
create index if not exists exam_submissions_status_idx on public.exam_submissions (status);
create index if not exists exam_submissions_student_name_idx on public.exam_submissions (student_name);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists exam_submissions_set_updated_at on public.exam_submissions;
create trigger exam_submissions_set_updated_at
before update on public.exam_submissions
for each row
execute procedure public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.uid() is not null;
$$;

create or replace function public.get_exam_by_token(p_token text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  r public.exams;
begin
  if p_token is null or length(trim(p_token)) < 16 then
    return null;
  end if;

  select * into r
  from public.exams
  where access_token = trim(p_token);

  if not found then
    return null;
  end if;

  return jsonb_build_object(
    'id', r.id,
    'exam_id', r.exam_id,
    'student_name', r.student_name,
    'exam_version', r.exam_version,
    'generated_questions', r.generated_questions,
    'created_at', r.created_at
  );
end;
$$;

create or replace function public.get_submission_by_token(p_token text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  exam_row public.exams;
  sub public.exam_submissions;
begin
  if p_token is null or length(trim(p_token)) < 16 then
    return null;
  end if;

  select * into exam_row
  from public.exams
  where access_token = trim(p_token);

  if not found then
    return null;
  end if;

  select * into sub
  from public.exam_submissions
  where exam_id = exam_row.exam_id;

  if not found then
    return null;
  end if;

  return jsonb_build_object(
    'id', sub.id,
    'exam_id', sub.exam_id,
    'student_name', sub.student_name,
    'answers', sub.answers,
    'started_at', sub.started_at,
    'submitted_at', sub.submitted_at,
    'duration_seconds', sub.duration_seconds,
    'status', sub.status,
    'timed_out', sub.timed_out
  );
end;
$$;

create or replace function public.start_exam(p_token text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  exam_row public.exams;
  sub public.exam_submissions;
begin
  if p_token is null or length(trim(p_token)) < 16 then
    raise exception 'Invalid exam token';
  end if;

  select * into exam_row
  from public.exams
  where access_token = trim(p_token);

  if not found then
    raise exception 'Exam not found';
  end if;

  select * into sub
  from public.exam_submissions
  where exam_id = exam_row.exam_id
  for update;

  if not found then
    insert into public.exam_submissions (exam_id, student_name, status, started_at)
    values (exam_row.exam_id, exam_row.student_name, 'in_progress', now())
    returning * into sub;
  elsif sub.status in ('submitted', 'graded') then
    null;
  elsif sub.started_at is null then
    update public.exam_submissions
    set status = 'in_progress',
        started_at = now()
    where id = sub.id
    returning * into sub;
  elsif sub.status = 'not_started' then
    update public.exam_submissions
    set status = 'in_progress'
    where id = sub.id
    returning * into sub;
  end if;

  return jsonb_build_object(
    'id', sub.id,
    'exam_id', sub.exam_id,
    'student_name', sub.student_name,
    'answers', sub.answers,
    'started_at', sub.started_at,
    'submitted_at', sub.submitted_at,
    'duration_seconds', sub.duration_seconds,
    'status', sub.status,
    'timed_out', sub.timed_out
  );
end;
$$;

create or replace function public.save_exam_draft(p_token text, p_answers jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  exam_row public.exams;
  sub public.exam_submissions;
begin
  if p_token is null or length(trim(p_token)) < 16 then
    raise exception 'Invalid exam token';
  end if;

  select * into exam_row
  from public.exams
  where access_token = trim(p_token);

  if not found then
    raise exception 'Exam not found';
  end if;

  select * into sub
  from public.exam_submissions
  where exam_id = exam_row.exam_id
  for update;

  if not found then
    raise exception 'Submission not found';
  end if;

  if sub.status in ('submitted', 'graded') then
    raise exception 'Exam already submitted';
  end if;

  if sub.status = 'not_started' or sub.started_at is null then
    raise exception 'Exam has not been started';
  end if;

  update public.exam_submissions
  set answers = coalesce(p_answers, sub.answers),
      status = 'in_progress'
  where id = sub.id
  returning * into sub;

  return jsonb_build_object(
    'id', sub.id,
    'exam_id', sub.exam_id,
    'status', sub.status,
    'updated_at', sub.updated_at
  );
end;
$$;

create or replace function public.submit_exam(p_token text, p_answers jsonb, p_timed_out boolean default false)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  exam_row public.exams;
  sub public.exam_submissions;
  started timestamptz;
begin
  if p_token is null or length(trim(p_token)) < 16 then
    raise exception 'Invalid exam token';
  end if;

  select * into exam_row
  from public.exams
  where access_token = trim(p_token);

  if not found then
    raise exception 'Exam not found';
  end if;

  select * into sub
  from public.exam_submissions
  where exam_id = exam_row.exam_id
  for update;

  if not found then
    raise exception 'Submission not found';
  end if;

  if sub.status in ('submitted', 'graded') then
    return jsonb_build_object(
      'id', sub.id,
      'exam_id', sub.exam_id,
      'student_name', sub.student_name,
      'answers', sub.answers,
      'started_at', sub.started_at,
      'submitted_at', sub.submitted_at,
      'duration_seconds', sub.duration_seconds,
      'status', sub.status,
      'timed_out', sub.timed_out,
      'already_submitted', true
    );
  end if;

  started := coalesce(sub.started_at, now());

  update public.exam_submissions
  set answers = coalesce(p_answers, sub.answers),
      status = 'submitted',
      started_at = started,
      submitted_at = now(),
      duration_seconds = greatest(0, floor(extract(epoch from (now() - started)))::int),
      timed_out = coalesce(p_timed_out, false)
  where id = sub.id
  returning * into sub;

  return jsonb_build_object(
    'id', sub.id,
    'exam_id', sub.exam_id,
    'student_name', sub.student_name,
    'answers', sub.answers,
    'started_at', sub.started_at,
    'submitted_at', sub.submitted_at,
    'duration_seconds', sub.duration_seconds,
    'status', sub.status,
    'timed_out', sub.timed_out,
    'already_submitted', false
  );
end;
$$;

alter table public.exams enable row level security;
alter table public.exam_submissions enable row level security;
alter table public.admin_allowlist enable row level security;

revoke all on table public.exams from anon, public;
revoke all on table public.exam_submissions from anon, public;
revoke all on table public.admin_allowlist from anon, public;

grant select, insert, update, delete on table public.exams to authenticated;
grant select, insert, update, delete on table public.exam_submissions to authenticated;
grant select on table public.admin_allowlist to authenticated;

drop policy if exists exams_admin_all on public.exams;
create policy exams_admin_all
  on public.exams
  for all
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

drop policy if exists exam_submissions_admin_all on public.exam_submissions;
create policy exam_submissions_admin_all
  on public.exam_submissions
  for all
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

drop policy if exists admin_allowlist_admin_read on public.admin_allowlist;
create policy admin_allowlist_admin_read
  on public.admin_allowlist
  for select
  to authenticated
  using (auth.uid() is not null);

create or replace function public.admin_upsert_exam(
  p_exam_id text,
  p_student_name text,
  p_exam_version integer,
  p_generated_questions jsonb,
  p_access_token text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  r public.exams;
begin
  if auth.uid() is null then
    raise exception 'Not authorized';
  end if;

  if p_access_token is null or length(trim(p_access_token)) < 16 then
    raise exception 'Invalid access token';
  end if;

  delete from public.exams
  where student_name = p_student_name
    and exam_id <> p_exam_id;

  insert into public.exams (
    exam_id,
    student_name,
    exam_version,
    generated_questions,
    access_token
  )
  values (
    p_exam_id,
    p_student_name,
    p_exam_version,
    p_generated_questions,
    trim(p_access_token)
  )
  on conflict (exam_id) do update
    set student_name = excluded.student_name,
        exam_version = excluded.exam_version,
        generated_questions = excluded.generated_questions,
        access_token = excluded.access_token
  returning * into r;

  insert into public.exam_submissions (exam_id, student_name, answers, status)
  values (r.exam_id, r.student_name, '{"mcq":{},"explain":{},"problem":{}}'::jsonb, 'not_started')
  on conflict (exam_id) do nothing;

  return jsonb_build_object(
    'exam_id', r.exam_id,
    'student_name', r.student_name,
    'access_token', r.access_token
  );
end;
$$;

grant execute on function public.is_admin() to anon, authenticated;
grant execute on function public.get_exam_by_token(text) to anon, authenticated;
grant execute on function public.get_submission_by_token(text) to anon, authenticated;
grant execute on function public.start_exam(text) to anon, authenticated;
grant execute on function public.save_exam_draft(text, jsonb) to anon, authenticated;
grant execute on function public.submit_exam(text, jsonb, boolean) to anon, authenticated;
grant execute on function public.admin_upsert_exam(text, text, integer, jsonb, text) to authenticated;
