import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { ReactNode } from "react";
import { appColors } from "@/constants/Colors";

type IProps = {
  style?: StyleProp<ViewStyle> | undefined;
  textStyles?: StyleProp<TextStyle> | undefined;
  onPress?(): void;
  text: string;
  disabled?: boolean;
  color?: "primary" | "secondary" | "dark";
  type?: "outline" | "fill" | "text" | null;
  size?: "sm" | "md" | "lg" | null;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  textSecondary?: string;
  underline?: boolean;
  loading?: boolean;
};

export default function ButtonThemed(props: IProps) {
  let mainColor = appColors.primary;
  if (props.color == "dark") {
    mainColor = appColors.dark;
  }
  if (props.color == "secondary") {
    mainColor = appColors.secondary;
  }

  let sizeStyle = styles.md;
  let textStyle = styles.mdText;
  if (props.size == "sm") {
    sizeStyle = styles.sm;
    textStyle = styles.smText;
  }
  if (props.size == "lg") {
    sizeStyle = styles.lg;
    textStyle = styles.lgText;
  }

  return (
    <TouchableOpacity
      style={[
        styles.content,
        {
          backgroundColor:
            props.type != "outline" && props.type != "text"
              ? mainColor
              : "transparent",
          borderColor: props.type != "text" ? mainColor : "transparent",
        },
        sizeStyle,
        props.style,
        props.type === "text" ? { paddingHorizontal: 0 } : null,
        { opacity: props.disabled ? 0.4 : 1 },
      ]}
      onPress={!props.loading ? props.onPress : undefined}
      disabled={props.disabled}
    >
      {props.iconLeft}
      {props.loading ? (
        <ActivityIndicator color={"white"} />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color:
                props.type === "outline" || props.type === "text"
                  ? mainColor
                  : appColors.white,
              textDecorationLine: props.underline ? "underline" : "none",
              textDecorationColor: mainColor,
            },
            textStyle,
            props.textStyles,
          ]}
          numberOfLines={1}
        >
          {props.text}
        </Text>
      )}
      {props.textSecondary && (
        <Text
          style={[
            styles.text,
            {
              color: props.type == "outline" ? mainColor : appColors.white,
              textDecorationLine: props.underline ? "underline" : "none",
              textDecorationColor: mainColor,
            },
            textStyle,
            {
              //fontFamily: appFonts.primary.regular_400,
            },
            props.textStyles,
          ]}
        >
          {props.textSecondary}
        </Text>
      )}
      {props.iconRight}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  content: {
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 2,
    minHeight: 32,
  },
  text: {
    //fontFamily: appFonts.primary.semibold_600,
    textAlign: "center",
    fontSize: 14,
    paddingHorizontal: 5,
  },
  primary: {
    backgroundColor: appColors.primary,
    borderColor: appColors.primary,
  },
  sm: {
    minHeight: 28,
    paddingHorizontal: 8,
  },
  md: {
    minHeight: 38,
    paddingHorizontal: 12,
  },
  lg: {
    minHeight: 54,
    paddingHorizontal: 16,
  },
  smText: {
    fontSize: 14,
  },
  mdText: {
    fontSize: 16,
  },
  lgText: {
    fontSize: 18,
  },
});
