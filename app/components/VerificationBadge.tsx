import { StyleSheet, Text, View } from 'react-native';
import type { VerificationStatus } from '../types/verification';

interface VerificationBadgeProps {
  status: VerificationStatus;
}

export function VerificationBadge({ status }: VerificationBadgeProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        ✓ Verified with {status.provider === 'linkedin' ? 'LinkedIn' : 'Twitter'}
      </Text>
      <Text style={styles.date}>
        {new Date(status.verifiedAt).toLocaleDateString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  text: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: '500',
  },
  date: {
    color: '#2E7D32',
    fontSize: 12,
    marginLeft: 8,
    opacity: 0.7,
  },
});
