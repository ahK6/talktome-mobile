import { appColors } from "@/constants/Colors";
import {
  View,
  ViewStyle,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";

type IProps = {
  focused: boolean;
  style?: ViewStyle;
  text: string;
  onPress?(): void;
  contentStyle?: ViewStyle;
};

export default function TabButtonTop(props: IProps) {
  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      onPress={props.onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.content, props.contentStyle]}>
        <Text style={styles.text}>{props.text}</Text>
      </View>

      {props.focused && <View style={styles.bar}></View>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: appColors.white,
    position: "relative",
  },
  content: {
    backgroundColor: appColors.white,
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    height: 40,
    paddingBottom: 10,
    paddingHorizontal: 8,
  },
  bar: {
    backgroundColor: appColors.secondary,
    height: 8,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
  text: {
    //fontFamily: appFonts.secondary.medium_500,
    textAlign: "center",
    fontSize: 14,
    color: appColors.text,
    lineHeight: 16,
  },
});
