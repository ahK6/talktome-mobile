import React, { Fragment } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StatusBarStyle,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { appColors } from "@/constants/Colors";

type NViewProps = {
  topSafe?: boolean;
  bottomSafe?: boolean;
  avoidKeyboard?: boolean;
  contentStyle?: ViewStyle | ViewStyle[];
  bottomSafeAreaStyle?: ViewStyle;
  statusBarStyle?: StatusBarStyle;
  children: React.ReactNode;
  containerStyle?: ViewStyle;
};

const SafeView: React.FC<NViewProps> = ({
  children,
  topSafe = false,
  bottomSafe = false,
  avoidKeyboard = false,
  contentStyle,
  bottomSafeAreaStyle,
  statusBarStyle,
  containerStyle,
}) => {
  return (
    <View style={[{ flex: 1, backgroundColor: "white" }, containerStyle]}>
      {!!topSafe && (
        <SafeAreaView
          edges={["top"]}
          style={{
            height: 0,
            backgroundColor: appColors.secondary,
          }}
        />
      )}
      <StatusBar
        backgroundColor={appColors.primary}
        barStyle={statusBarStyle ?? "light-content"}
      />
      {!!avoidKeyboard && (
        <KeyboardAvoidingView
          style={[styles.content, contentStyle]}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {children}
        </KeyboardAvoidingView>
      )}

      {!avoidKeyboard ? children : null}

      {!!bottomSafe && (
        <SafeAreaView
          edges={["bottom"]}
          style={[
            { flex: 0, backgroundColor: appColors.white },
            !!bottomSafeAreaStyle
              ? bottomSafeAreaStyle
              : { backgroundColor: appColors.secondary },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.greenDark,
  },
  content: {
    flex: 1,
    backgroundColor: appColors.white,
  },
});

export default SafeView;
