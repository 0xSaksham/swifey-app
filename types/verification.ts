export interface VerificationStatus {
  field: string;
  isVerified: boolean;
  provider: 'linkedin' | 'twitter';
  verifiedAt: Date;
  proofId: string;
  fieldName: string;
}

export interface VerificationRequest {
  fieldName: string;
  value: string;
  provider: 'linkedin' | 'twitter';
}

export interface VerificationResult {
  success: boolean;
  proofId?: string;
  error?: string;
}
