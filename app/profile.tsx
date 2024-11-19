import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native'
import { Stack } from 'expo-router';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    dateOfBirth: new Date(),
    gender: '',
    graduatedFrom: '',
    currentlyWorking: ''
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: "Profile" }} />

      <View style={styles.formContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={profile.name}
          onChangeText={(text) => setProfile(prev => ({ ...prev, name: text }))}
          placeholder="Enter your name"
          placeholderTextColor="#666666"
        />

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

        <Text style={styles.label}>Graduated From</Text>
        <TextInput
          style={styles.input}
          value={profile.graduatedFrom}
          onChangeText={(text) => setProfile(prev => ({ ...prev, graduatedFrom: text }))}
          placeholder="Enter your educational institution"
          placeholderTextColor="#666666"
        />

        <Text style={styles.label}>Currently Working</Text>
        <TextInput
          style={styles.input}
          value={profile.currentlyWorking}
          onChangeText={(text) => setProfile(prev => ({ ...prev, currentlyWorking: text }))}
          placeholder="Enter your current role"
          placeholderTextColor="#666666"
        />
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
});
