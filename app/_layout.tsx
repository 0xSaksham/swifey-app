import { StyleSheet, View, Platform, SafeAreaView } from 'react-native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

// Define default styles and theme colors that can be used across the app
export const theme = {
  colors: {
    primary: '#4A90E2',
    background: '#1a1a1a',
    card: '#2a2a2a',
    text: '#ffffff',
    textSecondary: '#9f9f9f',
    border: '#333333',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 20,
    xl: 28,
  }
}

const RootLayout = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: '600',
          },
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
          animation: 'slide_from_right',
          headerShadowVisible: false,
          statusBarStyle: 'dark',
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            title: "Profile",
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="explore"
          options={{
            title: "Explore",
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="user/[id]"
          options={{
            title: "User Profile",
            presentation: 'card',
          }}
        />
      </Stack>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
})

export default RootLayout
