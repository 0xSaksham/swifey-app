import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ConnectionButton } from '../components/ConnectionButton';

export function UserProfile() {
  const targetUser = {
    id: "target-user-id",
    wallet: "target-wallet-address",
    // ... other user details
  };

  const handleConnectionComplete = () => {
    console.log("Connection established!");
    // Update UI or navigate to chat
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>

      <ConnectionButton
        targetUserId={targetUser.id}
        targetWallet={targetUser.wallet}
        onConnectionComplete={handleConnectionComplete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
}); 
