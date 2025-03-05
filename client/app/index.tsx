import { useEffect } from "react";
import { useRouter, useNavigationContainerRef } from "expo-router";
import WelcomePage from "./welcome-page";

export default function Index() {
  const router = useRouter();
  const navigationRef = useNavigationContainerRef();


  return <WelcomePage/>; 
}
