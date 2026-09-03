# Advanced JavaScript Exam Generator

Instructor tool for generating a unique **Advanced JavaScript Diploma Assessment** for each student. Exams are generated in the browser, assigned through a unique token link, and submitted to Supabase for later grading.

## Run

```bash
npm install
cp .env.example .env
npm run dev
```

Open the printed URL (usually `http://localhost:5173`).

## Supabase setup

1. Create a Supabase project.
2. Put the project URL and anon key in `.env`:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

3. Run `supabase/schema.sql` in the Supabase SQL editor.
4. Disable public sign-ups in Authentication settings.
5. Create one instructor Auth user.
6. Optionally insert that instructor email into `admin_allowlist`. If the table is empty, any authenticated user is treated as admin.

Without these variables the generator still works locally, but live submissions, autosave, and remote grading are disabled.

## Replace student names

Edit `src/data/students.ts` and replace the `PREDEFINED_STUDENTS` array with your roster.

You can also type a name on the instructor page. Custom names are remembered in this browser.

## How it works

- Instructor pages live under `/admin` and require Supabase Auth once credentials are configured.
- Generate, preview, open the student view, print, and open the answer key from the Generate page.
- Each exam is **15 MCQs (30) + 4 explain questions (40) + 1 coding problem (30) = 100 marks**.
- Selection is seeded by `student name + version`, so the same student keeps the same paper until you click **Regenerate Exam**.
- Share exams with **Copy student link**. The URL looks like `/exam/JS-XXXX?token=...`.
- Students cannot browse other exams. Access is by token, not by name alone.
- The student view has a 30-minute timer. It starts only after **Start Exam** and survives a refresh.
- Answers save locally immediately and draft to Supabase every 25 seconds after the exam starts.
- **Submit Exam** confirms, stores a final submission, locks the paper, and stops the timer. Time expiry submits automatically.
- Open **Submissions** to filter, view, auto-grade MCQs, and manually grade written answers out of 100.
- The answer key is a separate instructor route and is not included in the student question bundle.
- Vercel needs `vercel.json` so routes such as `/exam/...` load the app instead of a 404.

## Extend the question bank

Add questions in:

- `src/data/mcq/`
- `src/data/explainQuestions.ts`
- `src/data/problemQuestions.ts`

Keep the existing TypeScript shapes in `src/types/exam.ts`.

After changing the bank, regenerate the student-facing copy (no answer keys) with:

```bash
npm run split:bank
```
