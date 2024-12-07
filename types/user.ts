export interface UserProfile {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  graduatedFrom: string;
  currentlyWorking: string;
  isVerified: boolean;
  verifiedFields: string[];
  walletAddress?: string;
  reclaimId?: string; // For Reclaim Protocol verification
}

export interface VerificationStatus {
  field: string;
  status: "pending" | "verified" | "failed";
  timestamp?: number;
}

export type Gender = "male" | "female" | "other";
