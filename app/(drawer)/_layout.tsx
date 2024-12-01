import { Drawer } from "expo-router/drawer";

import { router, useNavigation } from "expo-router";

import { Platform, Text, View } from "react-native";
import { Header } from "@/components/shared/Header";

export default function Layout() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <Drawer
        drawerContent={() => (
          <View>
            <Text>pruebaaaa</Text>
          </View>
        )}
        screenOptions={{
          //headerShown:false,
          header: () => <Header />,
          title: "",
        }}
      ></Drawer>
    </View>
  );
}
