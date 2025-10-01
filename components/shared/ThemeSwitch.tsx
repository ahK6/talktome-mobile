import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, Animated, Easing } from "react-native";
import { appColors } from "@/constants/Colors";

interface ThemeSwitchProps {
    value?: boolean;
    onValueChange?: (value: boolean) => void;
    activeColor?: string;
    inactiveColor?: string;
    thumbColor?: string;
    size?: "small" | "medium" | "large";
    disabled?: boolean;
}

export const ThemeSwitch: React.FC<ThemeSwitchProps> = ({
    value = false,
    onValueChange,
    activeColor = "#FF6B7A",
    inactiveColor = "#E0E0E0",
    thumbColor = "#FFFFFF",
    size = "medium",
    disabled = false,
}) => {
    const [isEnabled, setIsEnabled] = useState(value);
    const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

    // Configuraciones de tamaño
    const sizeConfig = {
        small: {
            width: 40,
            height: 24,
            thumbSize: 18,
            padding: 3,
        },
        medium: {
            width: 50,
            height: 30,
            thumbSize: 24,
            padding: 3,
        },
        large: {
            width: 60,
            height: 36,
            thumbSize: 30,
            padding: 3,
        },
    };

    const config = sizeConfig[size];

    useEffect(() => {
        setIsEnabled(value);
        Animated.timing(animatedValue, {
            toValue: value ? 1 : 0,
            duration: 200,
            easing: Easing.bezier(0.4, 0.0, 0.2, 1),
            useNativeDriver: false,
        }).start();
    }, [value, animatedValue]);

    const toggleSwitch = () => {
        if (disabled) return;

        const newValue = !isEnabled;
        setIsEnabled(newValue);
        onValueChange?.(newValue);

        Animated.timing(animatedValue, {
            toValue: newValue ? 1 : 0,
            duration: 200,
            easing: Easing.bezier(0.4, 0.0, 0.2, 1),
            useNativeDriver: false,
        }).start();
    };

    // Interpolaciones para animaciones
    const backgroundColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [inactiveColor, activeColor],
    });

    const thumbPosition = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [
            config.padding,
            config.width - config.thumbSize - config.padding,
        ],
    });

    const thumbScale = animatedValue.interpolate({
        inputRange: [0, 0.1, 0.9, 1],
        outputRange: [1, 1.1, 1.1, 1],
    });

    return (
        <TouchableOpacity
            activeOpacity={disabled ? 1 : 0.8}
            onPress={toggleSwitch}
            disabled={disabled}
        >
            <Animated.View
                style={{
                    width: config.width,
                    height: config.height,
                    borderRadius: config.height / 2,
                    backgroundColor: backgroundColor,
                    justifyContent: "center",
                    position: "relative",
                    opacity: disabled ? 0.5 : 1,
                    elevation: 2,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                }}
            >
                <Animated.View
                    style={{
                        position: "absolute",
                        left: thumbPosition,
                        width: config.thumbSize,
                        height: config.thumbSize,
                        borderRadius: config.thumbSize / 2,
                        backgroundColor: thumbColor,
                        transform: [{ scale: thumbScale }],
                        elevation: 4,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                    }}
                />
            </Animated.View>
        </TouchableOpacity>
    );
};

// Componente con estilos predefinidos para tu tema
export const ThemedSwitch: React.FC<
    Omit<ThemeSwitchProps, "activeColor" | "inactiveColor">
> = (props) => {
    return (
        <ThemeSwitch
            {...props}
            activeColor={appColors.primary}
            inactiveColor={appColors.softGray}
            thumbColor={appColors.white}
        />
    );
};
