import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { ThemedText } from "../ThemedText";
import { appColors } from "@/constants/Colors";

interface IProps {
  label: string;
  containerStyle?: ViewStyle;
}

const CategoryItem = ({ label, containerStyle }: IProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <ThemedText style={{ color: appColors.grayText }}>{label}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    width: "auto",
    paddingHorizontal: 15,
    justifyContent: "center",
    borderColor: "rgba(89, 105, 140, 0.7)",
  },
});

export default CategoryItem;
