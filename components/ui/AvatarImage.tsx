import { appColors } from "@/constants/Colors";
import React from "react";
import { View } from "react-native";
import { ThemedText } from "../shared/ThemedText";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useAvatarColor } from "@/hooks/useAvatarColor";

export const AvatarImage = () => {
    const { userInfo } = useSelector((state: RootState) => state.onBoarding);
    const { getColorByLetter } = useAvatarColor();

    const getFirstLetter = (): string => {
        const username = userInfo?.userInformation?.username || "U";
        return username.charAt(0).toUpperCase();
    };

    const firstLetter = getFirstLetter();
    const avatarColor = getColorByLetter(firstLetter);
    return (
        <View
            style={{
                backgroundColor: appColors.grayText,
                width: 100,
                height: 100,
                borderRadius: 50,
            }}
        >
            <View
                style={{
                    backgroundColor: appColors.lightGray,
                    width: 90,
                    height: 90,
                    borderRadius: 45,
                    margin: 5,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <View
                    style={{
                        backgroundColor: avatarColor,
                        width: 80,
                        height: 80,
                        borderRadius: 45,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <ThemedText
                        style={{
                            fontSize: 40,
                            lineHeight: 40,
                            fontWeight: "bold",
                            color: "#FFFFFF",
                            textShadowColor: "rgba(0, 0, 0, 0.3)",
                            textShadowOffset: {
                                width: 1,
                                height: 1,
                            },
                            textShadowRadius: 2,
                        }}
                    >
                        {firstLetter}
                    </ThemedText>
                </View>
            </View>
        </View>
    );
};
