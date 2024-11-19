export default {
  expo: {
    name: "your-app-name",
    // ... other expo config
    extra: {
      RECLAIM_APP_ID: process.env.RECLAIM_APP_ID,
      RECLAIM_APP_SECRET: process.env.RECLAIM_APP_SECRET,
      RECLAIM_APP_NAME: process.env.RECLAIM_APP_NAME,
      RECLAIM_PROVIDER_ID_TWITTER: process.env.RECLAIM_PROVIDER_ID_TWITTER,
      RECLAIM_PROVIDER_ID_LINKEDIN: process.env.RECLAIM_PROVIDER_ID_LINKEDIN,
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    },
  },
};
