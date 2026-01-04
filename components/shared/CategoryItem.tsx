import React from "react";
import {
    Pressable,
    StyleSheet,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { appColors } from "@/constants/Colors";

interface IProps {
    label: string;
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
    onPress?: () => void;
}

const CategoryItem = ({
    label,
    containerStyle,
    textStyle,
    onPress,
}: IProps) => {
    return (
        <TouchableOpacity
            style={[styles.container, containerStyle]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <ThemedText style={[{ color: appColors.grayText }, textStyle]}>
                {label}
            </ThemedText>
        </TouchableOpacity>
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
