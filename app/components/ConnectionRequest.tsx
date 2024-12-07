import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import Button from './Button';
import SolanaService from '../services/solanaService';
import { useConnections } from '../context/ConnectionContext';

interface ConnectionRequestProps {
  targetUserId: string;
  targetUserName: string;
  onClose: () => void;
}

export default function ConnectionRequest({ targetUserId, targetUserName, onClose }: ConnectionRequestProps) {
  const [keepChatHistory, setKeepChatHistory] = useState(true);
  const [isStaking, setIsStaking] = useState(false);
  const { addConnection } = useConnections();
  const solanaService = new SolanaService();

  const handleStakeAndConnect = async () => {
    try {
      setIsStaking(true);
      // TODO: Implement wallet connection and staking

      // Add connection after successful staking
      addConnection({
        userId: 'currentUserId', // Replace with actual current user ID
        connectedUserId: targetUserId,
        stakeAmount: 0.2,
        isStaked: true,
        chatHistoryEnabled: keepChatHistory
      });

      onClose();
    } catch (error) {
      console.error('Staking failed:', error);
    } finally {
      setIsStaking(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connect with {targetUserName}</Text>

      <Text style={styles.description}>
        Stake 0.2 SOL to establish connection
      </Text>

      <View style={styles.preferenceContainer}>
        <Text>Keep chat history</Text>
        <Switch
          value={keepChatHistory}
          onValueChange={setKeepChatHistory}
        />
      </View>

      <Button
        title="Stake & Connect"
        onPress={handleStakeAndConnect}
        disabled={isStaking}
      />

      <Button
        title="Cancel"
        onPress={onClose}
        style={styles.cancelButton}
        textStyle={styles.cancelButtonText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    marginBottom: 16,
    color: '#666',
  },
  preferenceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    marginTop: 8,
  },
  cancelButtonText: {
    color: '#007AFF',
  },
});
