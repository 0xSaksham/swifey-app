import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Button } from './Button';
import { WalletService } from '../services/walletService';
import { useWallet } from '../context/WalletContext';

interface StakingModalProps {
  visible: boolean;
  onClose: () => void;
  targetUserId: string;
  targetWallet: string;
  onStakeComplete: () => void;
}

export function StakingModal({
  visible,
  onClose,
  targetUserId,
  targetWallet,
  onStakeComplete
}: StakingModalProps) {
  const { walletAddress, connectWallet } = useWallet();
  const [isStaking, setIsStaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const walletService = new WalletService();

  const handleStake = async () => {
    try {
      setIsStaking(true);
      setError(null);

      if (!walletAddress) {
        await connectWallet();
      }

      if (!walletAddress) {
        throw new Error("Please connect your wallet first");
      }

      // Check balance
      const balance = await walletService.getBalance(walletAddress);
      if (balance < 0.2) {
        throw new Error("Insufficient balance. You need at least 0.2 SOL to stake.");
      }

      // Create and send transaction
      const transaction = await walletService.createStakeTransaction(
        walletAddress,
        targetWallet
      );

      // TODO: Sign and send transaction
      console.log("Transaction created:", transaction);

      onStakeComplete();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to stake SOL");
    } finally {
      setIsStaking(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Stake 0.2 SOL</Text>

          <Text style={styles.description}>
            To connect with this user, you need to stake 0.2 SOL.
            This amount will be locked until either party ends the connection.
          </Text>

          {error && (
            <Text style={styles.error}>{error}</Text>
          )}

          <Button
            title={isStaking ? "Staking..." : "Stake 0.2 SOL"}
            onPress={handleStake}
            disabled={isStaking}
            style={styles.stakeButton}
          />

          {isStaking && (
            <ActivityIndicator style={styles.loader} />
          )}

          <Button
            title="Cancel"
            onPress={onClose}
            style={styles.cancelButton}
            textStyle={styles.cancelButtonText}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    marginBottom: 20,
    color: '#666',
    lineHeight: 20,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  stakeButton: {
    marginBottom: 12,
  },
  loader: {
    marginTop: 12,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
}); 
