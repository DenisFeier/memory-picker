import React, { useCallback, useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";

import TabBar from "./router/TabBar";
import LoginRegisterStack from "./router/LoginRegisterStack";
import { JWT_TOKEN } from "./util/Constants";
import { AuthContext, AuthProvider } from "./context/AuthContext";

SplashScreen.preventAutoHideAsync();

function LoginRegisterContainer() {
  return <LoginRegisterStack />;
}

function TabContainer() {
  return <TabBar />;
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        const token = await AsyncStorage.getItem(JWT_TOKEN);
        if (token) {
          const decoded = jwtDecode(token);
          const exp = decoded.exp;
          if (!exp) {
            console.log("No exp found in token");
            setAuth(false);
            return;
          }

          const currentTime = Math.floor(Date.now() / 1000);

          console.log("Current time: ", currentTime);
          console.log("Token exp: ", exp);

          if (currentTime < exp) {
            console.log("Token is valid");
            setAuth(true);
          } else {
            console.log("Token is expired");
            await AsyncStorage.removeItem(JWT_TOKEN);
            setAuth(false);
          }
        } else {
          console.log("No token found");
          setAuth(false);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    };

    prepare();
  }, [setAppIsReady, setAuth]);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <AuthContext.Provider value={{ isAuth, setAuth }}>
        <NavigationContainer>
          {isAuth ? <TabContainer /> : <LoginRegisterContainer />}
        </NavigationContainer>
      </AuthContext.Provider>
    </View>
  );
}
