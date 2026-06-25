import { tokenStorage } from "@/src/services/tokenStorage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = await tokenStorage.getAccessToken();
      const refreshToken = await tokenStorage.getRefreshToken();

      // Phải có refreshToken VÀ accessToken phải là role STUDENT
      if (refreshToken && accessToken && tokenStorage.isStudentToken(accessToken)) {
        setIsLoggedIn(true);
      } else if (refreshToken || accessToken) {
        // Có token nhưng không phải student → xóa và đá về login
        await tokenStorage.clearTokens();
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    };
    checkToken();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f8fbff" }}>
        <ActivityIndicator size="large" color="#0d47a1" />
      </View>
    );
  }

  return <Redirect href={isLoggedIn ? "/(tabs)" : "/login"} />;
}
