import { useState } from 'react';
import { reclaimService } from '../services/reclaimService';
import type { VerificationRequest, VerificationResult } from '../types/verification';

export function useVerification() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startVerification = async (request: VerificationRequest): Promise<VerificationResult> => {
    setIsVerifying(true);
    setError(null);

    try {
      const provider = request.provider.toUpperCase() as 'TWITTER' | 'LINKEDIN';

      return new Promise((resolve) => {
        reclaimService.startVerification(
          provider,
          (proof) => {
            resolve({
              success: true,
              proofId: typeof proof === 'string' ? proof : proof?.claimData.context
            });
          },
          (error) => {
            setError(error.message);
            resolve({
              success: false,
              error: error.message
            });
          }
        );
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Verification failed';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsVerifying(false);
    }
  };

  return {
    isVerifying,
    error,
    startVerification
  };
}
