import { Stack, Slot } from "expo-router";
import FooterContainer from "common/components/main-component/footer-container";
import { View } from "react-native";

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "none", 
        }}
      >
        <Stack.Screen name="main-page/index" />
        <Stack.Screen name="order-page/index" />
        <Stack.Screen name="profile-page/index" />
        <Stack.Screen name="cart-page/index" />
        <Slot />
      </Stack>
      <FooterContainer />
    </View>
  );
}
