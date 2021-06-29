export default {
    /** 
      * Snowpack automatically exposes these values on `import.meta.env`
      */
    env: {
        NETLIFY_URL: process.env.NETLIFY ? process.env.DEPLOY_URL : 'http://localhost:8888'
    }
}
