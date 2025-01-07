import { appColors } from "@/constants/Colors";
import * as React from "react";
import {
  Text,
  View,
  ViewStyle,
  TextInput,
  TextInputProps,
  TextStyle,
} from "react-native";
import { ThemedText } from "./ThemedText";

// Extiende TextInputProps para incluir el prop "errorMessage"
interface TextInputThemedProps extends TextInputProps {
  errorMessage?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  label?: string;
}

/**
 * Renderiza el componente TextInput de react-native-paper pero personalizado con el tema del app
 **/
export default function TextInputThemed(props: TextInputThemedProps) {
  return (
    <View style={props.containerStyle}>
      {props.label && (
        <ThemedText style={{ marginBottom: 2 }}>{props.label}</ThemedText>
      )}

      <TextInput
        style={[
          {
            backgroundColor: appColors.lightBlue,
            height: 50,
            borderRadius: 5,
            borderWidth: 0.5,
            borderColor: appColors.softBlue,
            paddingHorizontal: 10,
            color: appColors.text,
          },
          props.inputStyle,
        ]}
        {...props}
        //activeOutlineColor={formColors.outlineActive}
      />
      {props.errorMessage && <Text style={{}}>{props.errorMessage}</Text>}
    </View>
  );
}
