This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Update contents

To add a new page, you have to
- add markdown files (en, ja) to `content/{folder}/{title_of_page_in_snake_case}/{locale}.md`
- add images to `public/images/{folder}/{title_of_page_in_snake_case}`
- add properties to `content/content.ts`
- add titles/translations to `public/locales/{locale}/common.json`
