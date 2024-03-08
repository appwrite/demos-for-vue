// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    appwriteKey: process.env.APPWRITE_KEY,
    public: {
      appwriteEndpoint: process.env.PUBLIC_APPWRITE_ENDPOINT,
      appwriteProjectId: process.env.PUBLIC_APPWRITE_PROJECT_ID,
    },
  },
});
