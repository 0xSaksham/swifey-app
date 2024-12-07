import './polyfills';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileCreation from './app/screens/ProfileCreation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ConnectionProvider from './app/context/ConnectionContext';
import WalletProvider from './app/context/WalletContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <WalletProvider>
        <ConnectionProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="ProfileCreation"
                component={ProfileCreation}
                options={{ title: 'Create Profile' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ConnectionProvider>
      </WalletProvider>
    </SafeAreaProvider>
  );
}
