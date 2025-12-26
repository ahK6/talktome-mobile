import { appColors } from "@/constants/Colors";
import * as React from "react";
import {
  Text,
  View,
  ViewStyle,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { Feather } from "@expo/vector-icons";

// Extiende TextInputProps para incluir el prop "errorMessage"
interface TextInputThemedProps extends TextInputProps {
  errorMessage?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  label?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
}

/**
 * Renderiza el componente TextInput de react-native-paper pero personalizado con el tema del app
 **/
export default function TextInputThemed(props: TextInputThemedProps) {
  const { rightIcon, onRightIconPress, ...textInputProps } = props;
  return (
    <View style={props.containerStyle}>
      {props.label && (
        <ThemedText style={{ marginBottom: 2 }}>{props.label}</ThemedText>
      )}

      <View style={{ position: 'relative' }}>
        <TextInput
          style={[
            {
              backgroundColor: appColors.lightBlue,
              height: 50,
              borderRadius: 5,
              borderWidth: 2,
              borderColor: appColors.softBlue,
              paddingHorizontal: 10,
              paddingRight: rightIcon ? 45 : 10,
              color: appColors.text,
            },
            props.inputStyle,
          ]}
          {...textInputProps}
        />
        
        {rightIcon && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 12,
              top: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              width: 30,
            }}
            onPress={onRightIconPress}
            activeOpacity={0.7}
          >
            <Feather
              name={rightIcon as any}
              size={20}
              color={appColors.grayText}
            />
          </TouchableOpacity>
        )}
      </View>

      {props.errorMessage && (
        <Text style={{ color: appColors.primary }}>{props.errorMessage}</Text>
      )}
    </View>
  );
}
