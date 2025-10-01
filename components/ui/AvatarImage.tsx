import { appColors } from "@/constants/Colors";
import React from "react";
import { View } from "react-native";
import { ThemedText } from "../shared/ThemedText";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useAvatarColor } from "@/hooks/useAvatarColor";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

interface AvatarImageProps {
    avatarSize?: number;
}

export const AvatarImage: React.FC<AvatarImageProps> = ({ avatarSize }) => {
    const { userInfo } = useSelector((state: RootState) => state.onBoarding);
    const { getColorByLetter } = useAvatarColor();

    const getFirstLetter = (): string => {
        const username = userInfo?.userInformation?.username;
        return username ? username.charAt(0).toUpperCase() : "";
    };

    const firstLetter = getFirstLetter();
    const avatarColor = getColorByLetter(firstLetter || "G");
    const isLoggedIn = !!userInfo?.userInformation?.username;

    if (!isLoggedIn) {
        return (
            <View
                style={{
                    width: avatarSize || 100,
                    height: avatarSize || 100,
                    borderRadius: 50,
                    overflow: "hidden",
                }}
            >
                <LinearGradient
                    colors={["#95a5a6", "#bdc3c7"]}
                    style={{
                        width: "100%",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Feather
                        name="user"
                        size={avatarSize ? avatarSize / 2.5 : 40}
                        color="#FFFFFF"
                    />
                </LinearGradient>
            </View>
        );
    }

    return (
        <View
            style={{
                backgroundColor: appColors.grayText,
                width: avatarSize || 100,
                height: avatarSize || 100,
                borderRadius: 50,
            }}
        >
            <View
                style={{
                    backgroundColor: appColors.lightGray,
                    width: avatarSize ? avatarSize - 10 : 90,
                    height: avatarSize ? avatarSize - 10 : 90,
                    borderRadius: 45,
                    margin: 5,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <View
                    style={{
                        backgroundColor: avatarColor,
                        width: avatarSize ? avatarSize - 20 : 80,
                        height: avatarSize ? avatarSize - 20 : 80,
                        borderRadius: 45,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <ThemedText
                        style={{
                            fontSize: avatarSize ? avatarSize / 2.5 : 40,
                            lineHeight: avatarSize ? avatarSize / 2.5 : 40,
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
