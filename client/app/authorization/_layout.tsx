import { Stack ,Slot  } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-up/index" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in/index" options={{ headerShown: false }} />
      <Stack.Screen name="code-page/index" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in-password/index" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up-password/index" options={{ headerShown: false }} />
      <Stack.Screen name="auth-user-profile-page/index" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password-code/index" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password-page/index" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password-pass-page/index" options={{ headerShown: false }} />
      <Slot />
    </Stack>
  );
}
