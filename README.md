# Shopify + Astro + React

[![Netlify Status](https://api.netlify.com/api/v1/badges/00c79ab2-364d-4c1d-923b-ed0a9a3b4d2b/deploy-status)](https://app.netlify.com/sites/shopify-astro/deploys)

A demo of a Shopify site using [Astro](https://astro.build) and React. If you'd like to learn how it's built and how you can do the same, [check out this blog post](https://dev.to/netlify/build-a-modern-shopping-site-with-astro-and-serverless-functions-5326)!

## Customize and make it your own

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/cassidoo/shopify-react-astro)

Clicking this button will clone the repo to your GitHub account and instantly deploy to Netlify. You will need to have the [Netlify CLI](https://cli.netlify.com/) installed, and a `.env` file at the top level of your project (after you clone) with the following:

```bash
SHOPIFY_STOREFRONT_API_TOKEN=example
SHOPIFY_API_ENDPOINT=https://exampleshopify/graphql.json
```

## Commands

All commands are run from the root of the project, from a terminal. Make sure you have the [Netlify CLI](https://docs.netlify.com/cli/get-started/) installed so the serverless functions can work properly!

| Command         | Action                                  |
| :-------------- | :-------------------------------------- |
| `npm install`   | Installs dependencies                   |
| `npm run start` | Starts local dev server                 |
| `npm run build` | Build your production site to `./dist/` |
