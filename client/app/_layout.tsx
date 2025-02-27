import { Stack } from "expo-router";
import { Slot } from "expo-router";

export default function Layout() {
  return (
    <Stack  screenOptions={{ headerShown: false }}>
      <Stack.Screen name="authorization" options={{ headerShown: false }} />
      <Slot />
    </Stack>
  );
}
