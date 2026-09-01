# Advanced JavaScript Exam Generator

Instructor tool for generating a unique **Advanced JavaScript Diploma Assessment** for each student. There is no backend. Exams are generated in the browser and stored in `localStorage`.

## Run

```bash
npm install
npm run dev
```

Open the printed URL (usually `http://localhost:5173`).

## Replace student names

Edit `src/data/students.ts` and replace the `PREDEFINED_STUDENTS` array with your roster.

You can also type a name on the instructor page. Custom names are remembered in this browser.

## How it works

- Instructor page: generate, preview, open the student view, print, and open the answer key.
- Each exam is **15 MCQs (30) + 4 explain questions (40) + 1 coding problem (30) = 100 marks**.
- Selection is seeded by `student name + version`, so the same student keeps the same paper until you click **Regenerate Exam**.
- The student view has a 30-minute timer. It starts only after **Start Exam** and survives a refresh.
- The answer key is a separate instructor route and is not shown on the student paper.
- Share exams with **Copy student link**. The URL looks like `/exam/JS-XXXX?n=Student+01&v=1` so it works on Vercel and on another device.
- Vercel needs `vercel.json` so routes such as `/exam/...` load the app instead of a 404.

## Extend the question bank

Add questions in:

- `src/data/mcq/`
- `src/data/explainQuestions.ts`
- `src/data/problemQuestions.ts`

Keep the existing TypeScript shapes in `src/types/exam.ts`.
