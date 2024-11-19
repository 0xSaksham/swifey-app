import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Button } from './Button';
import { reclaimService } from '../services/reclaimService';
import { createUserWithProofs } from '../services/userService';

export function VerifyAndStakeButton() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleVerifyAndStake = async () => {
    try {
      setIsProcessing(true);
      setError(null);
      setStatus('Starting Twitter verification...');

      await reclaimService.startVerification(
        async (proofs) => {
          try {
            setStatus('Creating user profile...');
            const user = await createUserWithProofs(proofs);
            setStatus('Verification complete! User profile created.');
            return user;
          } catch (err) {
            setError('Failed to create user profile');
            console.error('User creation error:', err);
          }
        },
        (error: Error) => {
          setError('Verification failed: ' + error.message);
          console.error('Verification failed:', error);
        }
      );

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Process failed';
      setError(errorMessage);
      setStatus('Failed');
      console.error('Error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title={isProcessing ? "Processing..." : "Start Twitter Verification"}
        onPress={handleVerifyAndStake}
        disabled={isProcessing}
        style={styles.button}
      />

      {status && (
        <Text style={styles.status}>{status}</Text>
      )}

      {error && (
        <Text style={styles.error}>{error}</Text>
      )}

      {isProcessing && (
        <ActivityIndicator style={styles.loader} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    marginBottom: 16,
  },
  status: {
    marginBottom: 8,
    color: '#666',
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
  loader: {
    marginTop: 8,
  },
});
