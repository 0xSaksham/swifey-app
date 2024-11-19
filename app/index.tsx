import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { VerifyAndStakeButton } from './components/VerifyAndStakeButton';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.title}>Verify & Stake</Text>
          <Text style={styles.subtitle}>Verify your Twitter account to continue</Text>

          <VerifyAndStakeButton />

          {/* Remove LinkedIn section */}
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  main: {
    flex: 1,
    padding: 20,
    maxWidth: 960,
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
});
