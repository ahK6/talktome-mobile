import { appColors } from "@/constants/Colors";
import { DrawerActions } from "@react-navigation/native";
import { router, useNavigation } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import SafeView from "./SafeView";
import { ThemedText } from "./ThemedText";
import MenuIcon from "@/assets/images/icons/menu.svg";
import IconBack from "@/assets/images/icons/iconBack.svg";

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
        {router.canGoBack() ? (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              position: "absolute",
              left: 20,
              backgroundColor: "#25374D1A",
              padding: 5,
              borderRadius: 50,
            }}
          >
            <IconBack />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer());
            }}
            style={{ position: "absolute", left: 20 }}
          >
            <MenuIcon />
          </TouchableOpacity>
        )}

        <ThemedText>{props.title}</ThemedText>
      </View>
    </SafeView>
  );
};
