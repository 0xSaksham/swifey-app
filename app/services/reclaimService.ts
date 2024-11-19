import { ReclaimProofRequest } from '@reclaimprotocol/reactnative-sdk';
import * as WebBrowser from 'expo-web-browser';
import { RECLAIM_CONFIG } from "../constants/Config";

class ReclaimService {
  private reclaim!: ReclaimProofRequest;

  async initialize(providerType: 'TWITTER' | 'LINKEDIN') {
    this.reclaim = await ReclaimProofRequest.init(
      RECLAIM_CONFIG.APP_ID,
      RECLAIM_CONFIG.APP_SECRET,
      RECLAIM_CONFIG.PROVIDER_ID
    );
  }

  async startVerification(
    providerType: 'TWITTER' | 'LINKEDIN',
    onSuccess: (proof: any) => void,
    onError: (error: Error) => void
  ) {
    try {
      if (!this.reclaim) {
        await this.initialize(providerType);
      }

      const requestUrl = await this.reclaim.getRequestUrl();

      // Open the verification URL in the in-app browser
      const result = await WebBrowser.openAuthSessionAsync(
        requestUrl,
        undefined, // Let Expo handle the redirect URL
        {
          showInRecents: true,
          preferEphemeralSession: true
        }
      );

      if (result.type === 'success') {
        await this.reclaim.startSession({
          onSuccess: (proofs) => {
            if (proofs) {
              onSuccess(proofs);
            }
          },
          onError: (error) => {
            onError(error);
          }
        });
      } else if (result.type === 'cancel') {
        onError(new Error('Verification was cancelled'));
      }

    } catch (error) {
      onError(error as Error);
    } finally {
      // Clean up the browser session
      await WebBrowser.coolDownAsync();
    }
  }
}

export const reclaimService = new ReclaimService();
