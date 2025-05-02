import { Stack } from "expo-router";
import { Slot } from "expo-router";


export default function Layout() {
  return (
    <Stack  screenOptions={{ headerShown: false }}>
      <Stack.Screen name="authorization" options={{ headerShown: false }} />
      <Stack.Screen name="welcome-page/index" options={{ headerShown: false }} />
      <Stack.Screen name="main" options={{ headerShown: false }} />
      <Stack.Screen name="settings-page/index" options={{ headerShown: false }} />
      <Slot />
    </Stack>
  );
}
