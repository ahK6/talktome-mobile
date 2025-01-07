import { Drawer } from "expo-router/drawer";
import { useNavigation, usePathname } from "expo-router";
import { Platform, Text, View } from "react-native";
import { Header } from "@/components/shared/Header";
import { useEffect, useRef } from "react";

export default function Layout() {
  const navigation = useNavigation();

  const pathname = usePathname();

  const titleRef = useRef<string>(null);

  useEffect(() => {
    console.log(pathname);
    if (pathname === "/post/createPost") {
      console.log("entroooooooo");
      titleRef.current = "Crear publicación";
    }
  }, [pathname]);

  return (
    <View style={{ flex: 1 }}>
      <Drawer
        drawerContent={() => (
          <View>
            <Text>pruebaaaa</Text>
          </View>
        )}
        screenOptions={{
          header: (props) => {
            console.log(props.options);
            return <Header title={titleRef.current} />;
          },
        }}
      ></Drawer>
    </View>
  );
}
