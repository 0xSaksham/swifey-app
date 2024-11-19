import { ReclaimProofRequest } from '@reclaimprotocol/reactnative-sdk';
import { Linking } from 'react-native';
import Constants from 'expo-constants';

interface ReclaimConfig {
  reclaimProofRequestConfig: string;
}

export class ReclaimService {
  private static instance: ReclaimService;
  private reclaim?: ReclaimProofRequest;

  private constructor() {}

  static getInstance(): ReclaimService {
    if (!ReclaimService.instance) {
      ReclaimService.instance = new ReclaimService();
    }
    return ReclaimService.instance;
  }

  async startVerification(
    onSuccess: (proofs: any) => void,
    onError: (error: Error) => void
  ) {
    try {
      // Initialize with direct config for testing
      console.log('App ID:', process.env.RECLAIM_APP_ID); // Debug log

      this.reclaim = await ReclaimProofRequest.init(
        Constants.expoConfig?.extra?.RECLAIM_APP_ID ?? '',
        Constants.expoConfig?.extra?.RECLAIM_APP_SECRET ?? '',
        Constants.expoConfig?.extra?.RECLAIM_PROVIDER_ID_TWITTER ?? ''
      );

      const requestUrl = await this.reclaim.getRequestUrl();
      console.log("Request URL:", requestUrl); // For debugging

      await this.reclaim.startSession({
        onSuccess: (proofs) => {
          console.log("Success callback triggered:", proofs);
          onSuccess(proofs);
        },
        onError: (error) => {
          console.error("Failure callback triggered:", error);
          onError(error);
        }
      });

      // Use Linking instead of WebBrowser
      await Linking.openURL(requestUrl);

    } catch (error) {
      console.error("Service error:", error);
      onError(error as Error);
    }
  }
}

export const reclaimService = ReclaimService.getInstance();
export default reclaimService;
