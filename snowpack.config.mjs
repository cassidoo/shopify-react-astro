export default {
  /**
   * Snowpack automatically exposes these values on `import.meta.env`
   */
  env: {
    NETLIFY_URL: process.env.NETLIFY
      ? 'https://shopify-astro.netlify.app/'
      : 'http://localhost:8888',
  },
};
