React Framework 
- NextJS

CSS Framework
- Tailwind CSS

Theme switcher
- next-themes (https://www.npmjs.com/package/next-themes)

Component
- Search
    Input Box, Search Button
- Weather Detail
    Today Weather
    Temperature
    Description
    Humidity
    DateTime
- Search History
    Search History
- History Item
    City, Country, Datetime, Search Button, Delete Button

Deployment
- github page (https://www.freecodecamp.org/news/how-to-deploy-next-js-app-to-github-pages/#:~:text=Step%202%20%E2%80%93%20Configure%20the%20Next.&text=js%20uses%20Node.,static%20page%20generation%20in%20Next.)
Bug fix: 
- filename change from next.config.mjs to next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: "/weather-scan", // new
    output: "export",          // new
    reactStrictMode: true,     // new
  };
module.exports = nextConfig    // new
// export default nextConfig;  // old
  



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
