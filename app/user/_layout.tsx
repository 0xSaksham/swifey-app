import { Stack } from 'expo-router';

export default function UserLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]/index"
        options={{
          title: "User Profile",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
