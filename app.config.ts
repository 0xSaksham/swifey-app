export default {
  expo: {
    name: "your-app-name",
    // ... other expo config
    extra: {
      RECLAIM_APP_ID: process.env.RECLAIM_APP_ID,
      RECLAIM_APP_SECRET: process.env.RECLAIM_APP_SECRET,
      RECLAIM_PROVIDER_ID_TWITTER: process.env.RECLAIM_PROVIDER_ID_TWITTER,
    },
  },
}; 
