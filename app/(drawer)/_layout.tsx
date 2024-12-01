import { Drawer } from "expo-router/drawer";
import { useNavigation } from "expo-router";
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
          header: (props) => <Header title={props.options.headerTitle} />,
        }}
      >
        <Drawer.Screen
          name="(drawer)/(tabs)/index"
          options={{
            title: "Mi Título Personalizado",
            headerTitle: "Test",
          }}
        />
      </Drawer>
    </View>
  );
}
