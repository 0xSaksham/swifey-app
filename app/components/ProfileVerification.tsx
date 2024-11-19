import { StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native';
import { useVerification } from '../hooks/useVerification';
import { VerificationBadge } from './VerificationBadge';
import { VerificationStatus } from '../types/verification';

interface ProfileVerificationProps {
  fieldName: string;
  value: string;
  provider: 'linkedin' | 'twitter';
  status?: VerificationStatus;
  onVerificationComplete: (result: VerificationStatus) => void;
}

export function ProfileVerification({
  fieldName,
  value,
  provider,
  status,
  onVerificationComplete
}: ProfileVerificationProps) {
  const { isVerifying, error, startVerification } = useVerification();

  const handleVerification = async () => {
    const result = await startVerification({
      fieldName,
      value,
      provider
    });

    if (result.success && result.proofId) {
      onVerificationComplete({
        field: fieldName,
        isVerified: true,
        provider,
        verifiedAt: new Date(),
        proofId: result.proofId
      });
    }
  };

  return (
    <View style={styles.container}>
      {status ? (
        <VerificationBadge status={status} />
      ) : (
        <Pressable
          style={[styles.button, isVerifying && styles.buttonDisabled]}
          onPress={handleVerification}
          disabled={isVerifying}
        >
          {isVerifying ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>
              Verify with {provider === 'linkedin' ? 'LinkedIn' : 'Twitter'}
            </Text>
          )}
        </Pressable>
      )}
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    color: '#ff0000',
    fontSize: 12,
    marginTop: 4,
  },
});
