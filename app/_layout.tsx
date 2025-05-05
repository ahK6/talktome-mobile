import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { ToastProvider } from "react-native-toast-notifications";
import { appColors } from "@/constants/Colors";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import SafeView from "@/components/shared/SafeView";
import { ThemedText } from "@/components/shared/ThemedText";
import HandsIcon from "@/assets/images/icons/handsIcon.svg";
import HomeIcon from "@/assets/images/icons/homeIcon.svg";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeView bottomSafe>
      <ToastProvider
        offsetBottom={90}
        successColor={appColors.secondary}
        dangerColor={appColors.primary}
      >
        <Provider store={store}>
          <Stack
          /*  screenOptions={{
              header: (params) => (
                <SafeView topSafe>
                  <View
                    style={{
                      height: 50,
                      backgroundColor: appColors.primary,
                      borderBottomLeftRadius: 5,
                      borderBottomRightRadius: 5,
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                      paddingHorizontal: 10,
                    }}
                  >
                    <ThemedText type="subtitle" style={{ color: "white" }}>
                      {params.options.title}
                    </ThemedText>
                  </View>
                </SafeView>
              ),
            }} */
          >
            <Stack.Screen
              name="index"
              options={{ headerShown: false, title: "Ayuda" }}
            />
            <Stack.Screen
              name="onBoarding/login"
              options={{ headerShown: false, title: "Iniciar sesión" }}
            />
            <Stack.Screen
              name="onBoarding/createAccount"
              options={{ headerShown: false, title: "Crear cuenta" }}
            />
            <Stack.Screen
              name="post/createPost"
              options={{ headerShown: false, title: "Crear publicación" }}
            />
            <Stack.Screen
              name="post/postDetail"
              options={{ headerShown: false, title: "Detalle" }}
            />

            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </Provider>
      </ToastProvider>

      <View
        style={{
          height: Platform.OS === "ios" ? 90 : 70,
          backgroundColor: appColors.white,
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 9,
        }}
      >
        <TouchableOpacity
          style={{
            alignSelf: "center",
            marginTop: Platform.OS === "android" ? 10 : 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            router.navigate("/");
          }}
        >
          <HomeIcon width={30} height={30} color={appColors.secondary} />
        </TouchableOpacity>
      </View>
    </SafeView>
  );
}
