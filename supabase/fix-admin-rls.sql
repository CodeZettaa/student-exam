-- Run this now in the Supabase SQL editor to allow a signed-in instructor
-- to save exams. Student access stays token-only through the RPCs.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.uid() is not null;
$$;

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

grant select, insert, update, delete on table public.exams to authenticated;
grant select, insert, update, delete on table public.exam_submissions to authenticated;
grant execute on function public.is_admin() to anon, authenticated;
grant execute on function public.admin_upsert_exam(text, text, integer, jsonb, text) to authenticated;
grant execute on function public.get_exam_by_token(text) to anon, authenticated;
grant execute on function public.get_submission_by_token(text) to anon, authenticated;
grant execute on function public.start_exam(text) to anon, authenticated;
grant execute on function public.save_exam_draft(text, jsonb) to anon, authenticated;
grant execute on function public.submit_exam(text, jsonb, boolean) to anon, authenticated;
