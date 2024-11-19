import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  joinDate: Date;
  totalClaims: number;
}

interface VerificationStatus {
  isVerified: boolean;
  provider: string;
  timestamp?: Date;
  details?: string;
}

export default function UserProfile() {
  const { userId } = useLocalSearchParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [verifications, setVerifications] = useState<VerificationStatus[]>([]);

  useEffect(() => {
    // Mock data based on userId
    const mockUsers: { [key: string]: UserProfile } = {
      'user123': {
        id: 'user123',
        name: 'Sarah Chen',
        avatar: 'https://i.pravatar.cc/150?img=1',
        bio: 'Software Engineer | Web3 Enthusiast',
        joinDate: new Date('2024-01-15'),
        totalClaims: 8
      },
      'user456': {
        id: 'user456',
        name: 'Alex Rivera',
        avatar: 'https://i.pravatar.cc/150?img=2',
        bio: 'Full Stack Developer | Open Source Contributor',
        joinDate: new Date('2024-02-01'),
        totalClaims: 5
      },
      // Add more mock users as needed
    };

    setProfile(mockUsers[userId as string] || mockUsers['user123']);

    setVerifications([
      {
        isVerified: true,
        provider: 'Gmail',
        timestamp: new Date(),
        details: 'sarah.chen@gmail.com'
      },
      {
        isVerified: true,
        provider: 'LinkedIn',
        timestamp: new Date(),
        details: 'Senior Software Engineer at Tech Corp'
      },
      {
        isVerified: true,
        provider: 'GitHub',
        timestamp: new Date(),
        details: '500+ contributions this year'
      }
    ]);
  }, [userId]);

  if (!profile) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: profile.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.bio}>{profile.bio}</Text>
        <View style={styles.statsRow}>
          <Text style={styles.statsText}>
            <Ionicons name="shield-checkmark" size={16} /> {profile.totalClaims} Claims
          </Text>
          <Text style={styles.statsText}>
            <Ionicons name="calendar" size={16} /> Joined {profile.joinDate.toLocaleDateString()}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Verified Claims</Text>
        <View style={styles.verificationContainer}>
          {verifications.map((verification, index) => (
            <View key={index} style={styles.verificationItem}>
              <View style={styles.providerRow}>
                <Text style={styles.providerText}>{verification.provider}</Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: verification.isVerified ? '#4CAF50' : '#FF5252' }
                ]}>
                  <Text style={styles.statusText}>
                    {verification.isVerified ? 'Verified' : 'Not Verified'}
                  </Text>
                </View>
              </View>
              {verification.details && (
                <Text style={styles.details}>{verification.details}</Text>
              )}
              {verification.timestamp && (
                <Text style={styles.timestamp}>
                  Verified on: {verification.timestamp.toLocaleDateString()}
                </Text>
              )}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  verificationContainer: {
    gap: 16,
  },
  verificationItem: {
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  providerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  providerText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#ffffff',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  timestamp: {
    color: '#9f9f9f',
    fontSize: 14,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    color: '#9f9f9f',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    marginBottom: 24,
  },
  statsText: {
    color: '#ffffff',
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  details: {
    color: '#9f9f9f',
    fontSize: 14,
    marginTop: 4,
  }
});
