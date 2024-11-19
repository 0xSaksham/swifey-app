import { StyleSheet, Text, View, TextInput, ScrollView, Button, Alert } from 'react-native'
import { Stack } from 'expo-router';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import ProfileVerification from './components/ProfileVerification';

interface VerificationStatus {
  field: string;
  isVerified: boolean;
  provider: 'linkedin' | 'twitter' | 'x';
  verifiedAt?: Date;
}

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    dateOfBirth: new Date(),
    gender: '',
    graduatedFrom: '',
    currentlyWorking: ''
  });

  const [verifications, setVerifications] = useState<VerificationStatus[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleVerificationComplete = (field: string, provider: 'linkedin' | 'twitter' | 'x', result: VerificationStatus) => {
    if (result.isVerified) {
      setVerifications(prev => [
        ...prev.filter(v => v.field !== field),
        result
      ]);
      Alert.alert('Success', `${field} has been verified successfully!`);
    } else {
      Alert.alert('Verification Failed', 'Please try again.');
    }
  };

  const isFieldVerified = (field: string) => {
    return verifications.some(v => v.field === field && v.isVerified);
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: "Profile" }} />

      <View style={styles.formContainer}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={profile.name}
            onChangeText={(text) => setProfile(prev => ({ ...prev, name: text }))}
            placeholder="Enter your name"
            placeholderTextColor="#666666"
          />
          {!isFieldVerified('name') && profile.name && (
            <>
              <ProfileVerification
                fieldName="name"
                value={profile.name}
                provider="linkedin"
                onVerificationComplete={(result) =>
                  handleVerificationComplete('name', 'linkedin', result)
                }
              />
              <ProfileVerification
                fieldName="name"
                value={profile.name}
                provider="twitter"
                onVerificationComplete={(result) =>
                  handleVerificationComplete('name', 'x', result)
                }
              />
            </>
          )}
          {isFieldVerified('name') && (
            <Text style={styles.verifiedBadge}>✓ Verified</Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Date of Birth</Text>
          <Button
            title={profile.dateOfBirth.toLocaleDateString()}
            onPress={() => setShowDatePicker(true)}
          />
          {showDatePicker && (
            <DateTimePicker
              value={profile.dateOfBirth}
              mode="date"
              onChange={(event, date) => {
                setShowDatePicker(false);
                if (date) {
                  setProfile(prev => ({ ...prev, dateOfBirth: date }));
                }
              }}
            />
          )}
          {!isFieldVerified('dateOfBirth') && profile.dateOfBirth && (
            <ProfileVerification
              fieldName="dateOfBirth"
              value={profile.dateOfBirth.toISOString().split('T')[0]}
              provider="linkedin"
              onVerificationComplete={(result: VerificationStatus) =>
                handleVerificationComplete('dateOfBirth', 'linkedin', result)
              }
            />
          )}
          {isFieldVerified('dateOfBirth') && (
            <Text style={styles.verifiedBadge}>✓ Verified</Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Gender</Text>
          <Picker
            selectedValue={profile.gender}
            onValueChange={(value) => setProfile(prev => ({ ...prev, gender: value }))}
            style={{ color: '#ffffff' }}
            dropdownIconColor="#ffffff"
          >
            <Picker.Item label="Select gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
          {!isFieldVerified('gender') && profile.gender && (
            <ProfileVerification
              fieldName="gender"
              value={profile.gender}
              provider="linkedin"
              onVerificationComplete={(result) =>
                handleVerificationComplete('gender', 'linkedin', result)
              }
            />
          )}
          {isFieldVerified('gender') && (
            <Text style={styles.verifiedBadge}>✓ Verified</Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Graduated From</Text>
          <TextInput
            style={styles.input}
            value={profile.graduatedFrom}
            onChangeText={(text) => setProfile(prev => ({ ...prev, graduatedFrom: text }))}
            placeholder="Enter your educational institution"
            placeholderTextColor="#666666"
          />
          {!isFieldVerified('graduatedFrom') && profile.graduatedFrom && (
            <ProfileVerification
              fieldName="graduatedFrom"
              value={profile.graduatedFrom}
              provider="linkedin"
              onVerificationComplete={(result) =>
                handleVerificationComplete('graduatedFrom', 'linkedin', result)
              }
            />
          )}
          {isFieldVerified('graduatedFrom') && (
            <Text style={styles.verifiedBadge}>✓ Verified</Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Currently Working</Text>
          <TextInput
            style={styles.input}
            value={profile.currentlyWorking}
            onChangeText={(text) => setProfile(prev => ({ ...prev, currentlyWorking: text }))}
            placeholder="Enter your current role"
            placeholderTextColor="#666666"
          />
          {!isFieldVerified('currentlyWorking') && profile.currentlyWorking && (
            <ProfileVerification
              fieldName="currentlyWorking"
              value={profile.currentlyWorking}
              provider="linkedin"
              onVerificationComplete={(result) =>
                handleVerificationComplete('currentlyWorking', 'linkedin', result)
              }
            />
          )}
          {isFieldVerified('currentlyWorking') && (
            <Text style={styles.verifiedBadge}>✓ Verified</Text>
          )}
        </View>
      </View>
    </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  formContainer: {
    gap: 12,
    padding: 16,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#ffffff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    color: '#ffffff',
    backgroundColor: '#2a2a2a',
  },
  fieldContainer: {
    marginBottom: 20,
  },
  verifiedBadge: {
    color: '#4CAF50',
    fontSize: 14,
    marginTop: 4,
    fontWeight: '600',
  },
});
