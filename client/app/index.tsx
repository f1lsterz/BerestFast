import { useEffect } from "react";
import { useRouter, useNavigationContainerRef } from "expo-router";
import WellcomePage from "./welcome-page";

export default function Index() {
  const router = useRouter();
  const navigationRef = useNavigationContainerRef();


  return <WellcomePage/>; 
}
