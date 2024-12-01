import { appColors } from "@/constants/Colors";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import SafeView from "./SafeView";
import MenuIcon from "@/assets/images/icons/menu.svg";
import { ThemedText } from "../ThemedText";

export const Header = (props) => {
  const navigation = useNavigation();

  return (
    <SafeView topSafe>
      <View
        style={{
          height: 50,
          backgroundColor: appColors.softBlue,
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
          style={{ position: "absolute", left: 20 }}
        >
          <MenuIcon />
        </TouchableOpacity>

        <ThemedText>{props.title}</ThemedText>
      </View>
    </SafeView>
  );
};
