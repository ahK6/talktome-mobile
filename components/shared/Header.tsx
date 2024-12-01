import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={{ height: 70 }}>
      <Text
        style={{ marginTop: 20 }}
        onPress={() => {
          console.log("cerrar");
          navigation.dispatch(DrawerActions.openDrawer());
        }}
      >
        header
      </Text>
    </View>
  );
};
