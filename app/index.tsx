import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.title}>Swifey</Text>
        <Text style={styles.subtitle}>Your Decentralized Social Identity</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Connect, share, and own your social presence with the power of Reclaim Protocol
        </Text>

        <View style={styles.buttonContainer}>
          <Link href="/profile" asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Create Profile</Text>
            </Pressable>
          </Link>

          <Link href="/explore" asChild>
            <Pressable style={styles.buttonOutline}>
              <Text style={styles.buttonOutlineText}>Explore</Text>
            </Pressable>
          </Link>
        </View>

        <Text style={styles.footer}>
          Powered by Reclaim Protocol
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#9f9f9f",
    textAlign: "center",
  },
  content: {
    flex: 2,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  description: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 16,
    width: "100%",
    maxWidth: 300,
  },
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  buttonOutline: {
    backgroundColor: "transparent",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#4A90E2",
  },
  buttonOutlineText: {
    color: "#4A90E2",
    fontSize: 18,
    fontWeight: "600",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    color: "#9f9f9f",
    fontSize: 14,
  },
});
