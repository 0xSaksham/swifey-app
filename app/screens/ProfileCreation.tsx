import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { Picker } from '@react-native-picker/picker';
import { UserProfile } from '../types/user';
import { ReclaimProofRequest } from '@reclaimprotocol/reactnative-sdk';
import { ConnectionButton } from '../components/ConnectionButton';
import { VerifyAndStakeButton } from '../components/VerifyAndStakeButton';

const APP_ID = '0x77AAf2b683c046fa72B33c24135a6D768B3316e5';
const APP_SECRET = 'YOUR_APPLICATION_SECRET';
const PROVIDER_ID = '2523321f-f61d-4db3-b4e6-e665af5efdc1';

// Add this mock data (later replace with real data)
const MOCK_USERS = [
  {
    id: "1",
    name: "John Doe",
    wallet: "BH6mQtqmxQxkPhZpZcChHR5pXjrpbzxEiZU5YwcgL9Sm",
  },
  {
    id: "2",
    name: "Jane Smith",
    wallet: "5FHwkrdxkjPmWHEMZBqvPKkYZGCwjZvSNqzSh5UxQYEc",
  }
];

export function ProfileCreation() {
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    gender: 'other',
    verifiedFields: [],
    isVerified: false
  });
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerification = async () => {
    try {
      setIsVerifying(true);
      const reclaimProofRequest = await ReclaimProofRequest.init(
        APP_ID,
        APP_SECRET,
        PROVIDER_ID
      );

      const requestUrl = await reclaimProofRequest.getRequestUrl();
      console.log('Request URL:', requestUrl);

      await reclaimProofRequest.startSession({
        onSuccess: (proofs) => {
          console.log('Verification successful:', proofs);
          setProfile(prev => ({
            ...prev,
            isVerified: true,
            verifiedFields: ['name', 'graduatedFrom'] // Example fields
          }));
        },
        onError: (error: Error) => {
          console.error('Verification failed:', error);
        },
      });
    } catch (error: unknown) {
      console.error('Verification error:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async () => {
    // TODO: Implement profile submission
    console.log('Profile:', profile);
  };

  const handleConnectionComplete = (userId: string) => {
    console.log(`Connected with user ${userId}`);
    // TODO: Update UI or navigate to chat
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Create Profile</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={profile.name}
            onChangeText={(text) => setProfile(prev => ({ ...prev, name: text }))}
            placeholder="Enter your name"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            value={profile.dateOfBirth}
            onChangeText={(text) => setProfile(prev => ({ ...prev, dateOfBirth: text }))}
            placeholder="YYYY-MM-DD"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender</Text>
          <Picker
            selectedValue={profile.gender}
            onValueChange={(value) =>
              setProfile((prev) => ({ ...prev, gender: value }))
            }
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Graduated From</Text>
          <TextInput
            style={styles.input}
            value={profile.graduatedFrom}
            onChangeText={(text) => setProfile(prev => ({ ...prev, graduatedFrom: text }))}
            placeholder="Enter your university"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Currently Working</Text>
          <TextInput
            style={styles.input}
            value={profile.currentlyWorking}
            onChangeText={(text) => setProfile(prev => ({ ...prev, currentlyWorking: text }))}
            placeholder="Enter your current workplace"
          />
        </View>

        <VerifyAndStakeButton />

        {profile.isVerified && (
          <View style={styles.connectionsSection}>
            <Text style={styles.sectionTitle}>Connect with Users</Text>

            {MOCK_USERS.map(user => (
              <View key={user.id} style={styles.userCard}>
                <Text style={styles.userName}>{user.name}</Text>
                <ConnectionButton
                  targetUserId={user.id}
                  targetWallet={user.wallet}
                  onConnectionComplete={() => handleConnectionComplete(user.id)}
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    marginTop: 24,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  connectionsSection: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
  },
  userName: {
    fontSize: 16,
  },
});
