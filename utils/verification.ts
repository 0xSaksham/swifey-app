import { VerificationStatus, VerificationResult } from "../types/verification";
import { RECLAIM_CONFIG } from "../app/constants/Config";

/**
 * Formats a verification date to a readable string
 */
export function formatVerificationDate(date?: Date): string {
  if (!date) return "Not verified";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Checks if a verification is still valid (not expired)
 */
export function isVerificationValid(status: VerificationStatus): boolean {
  if (!status.verifiedAt) return false;

  // Verifications are valid for 30 days
  const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
  const expirationDate = new Date(status.verifiedAt.getTime() + thirtyDaysInMs);

  return new Date() < expirationDate;
}

/**
 * Gets the appropriate verification provider for a field
 */
export function getRecommendedProvider(
  fieldName: string
): "linkedin" | "twitter" {
  const linkedInFields = ["currentlyWorking", "graduatedFrom", "name"];
  return linkedInFields.includes(fieldName) ? "linkedin" : "twitter";
}

/**
 * Formats verification result for display
 */
export function formatVerificationResult(result: VerificationResult): string {
  if (result.success) {
    return "Verification successful";
  }
  return `Verification failed: ${result.error || "Unknown error"}`;
}

/**
 * Validates if a field can be verified
 */
export function canVerifyField(fieldName: string, value: string): boolean {
  if (!value || value.trim() === "") return false;
  return RECLAIM_CONFIG.VERIFICATION_FIELDS.includes(fieldName as any);
}

/**
 * Gets verification status text
 */
export function getVerificationStatusText(status: VerificationStatus): string {
  if (!status.isVerified) return "Not verified";
  if (!isVerificationValid(status)) return "Verification expired";
  return "Verified";
}

/**
 * Sorts verifications by date
 */
export function sortVerifications(
  verifications: VerificationStatus[]
): VerificationStatus[] {
  return [...verifications].sort((a, b) => {
    if (!a.verifiedAt || !b.verifiedAt) return 0;
    return b.verifiedAt.getTime() - a.verifiedAt.getTime();
  });
}

/**
 * Groups verifications by provider
 */
export function groupVerificationsByProvider(
  verifications: VerificationStatus[]
): {
  [key: string]: VerificationStatus[];
} {
  return verifications.reduce((acc, verification) => {
    const provider = verification.provider;
    if (!acc[provider]) {
      acc[provider] = [];
    }
    acc[provider].push(verification);
    return acc;
  }, {} as { [key: string]: VerificationStatus[] });
}

/**
 * Checks if all required fields are verifie
 */
export function areRequiredFieldsVerified(
  verifications: VerificationStatus[],
  requiredFields: string[]
): boolean {
  const verifiedFields = verifications
    .filter((v) => requiredFields.includes(v.fieldName))
    .filter((v) => v.isVerified);
  return verifiedFields.length === requiredFields.length;
}
