interface ReclaimConfig {
  APP_ID: string;
  APP_SECRET: string;
  PROVIDER_ID: string;
  APP_NAME: string;
  CALLBACK_URL?: string;
  VERIFICATION_FIELDS: string[];
}

export const RECLAIM_CONFIG: ReclaimConfig = {
  APP_ID: process.env.RECLAIM_APP_ID!,
  APP_SECRET: process.env.RECLAIM_APP_SECRET!,
  PROVIDER_ID: process.env.RECLAIM_PROVIDER_ID!,
  APP_NAME: process.env.RECLAIM_APP_NAME!,
  CALLBACK_URL: process.env.RECLAIM_CALLBACK_URL,
  VERIFICATION_FIELDS: ['currentlyWorking', 'graduatedFrom', 'name', 'twitter'],
};

export const API_CONFIG = {
  BASE_URL: "your-api-url",
  TIMEOUT: 10000,
};

export default { RECLAIM_CONFIG, API_CONFIG };
