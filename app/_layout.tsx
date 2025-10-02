import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Provider, useDispatch } from "react-redux";
import { AppDispatch, store } from "@/store/store";
import { ToastProvider } from "react-native-toast-notifications";
import { appColors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { validateUserToken } from "@/store/onBoarding/onBoarding.actions";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function AppInitializer() {
  const dispatch: AppDispatch = useDispatch();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    const initializeApp = async () => {
      try {
        if (!loaded) {
          return;
        }
        const token = await AsyncStorage.getItem('accessToken');
        console.log('Retrieved token on app start:', token);
        
        if (token) {
          await dispatch(validateUserToken()).unwrap();
        }
      } catch (error) {
        console.log('Error validating token on app start:', error);
        await AsyncStorage.removeItem('accessToken');
      } finally {
        if (loaded) {
          await SplashScreen.hideAsync();
        }
      }
    };

    initializeApp();
  }, [loaded, dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <ToastProvider
        offsetBottom={90}
        successColor={appColors.secondary}
        dangerColor={appColors.primary}
      >
        <AppInitializer />
        <StatusBar style="auto" />
      </ToastProvider>
    </Provider>
  );
}