import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ThemedText } from "@/components/shared/ThemedText";
import ButtonThemed from "@/components/shared/ThemedButton";
import { appColors } from "@/constants/Colors";
import Hands from "@/assets/images/hands.svg";

export const HomeHeader: React.FC = () => {
    const { userInfo } = useSelector((state: RootState) => state.onBoarding);

    return (
        <View>
            <ThemedText type="title" style={{ marginBottom: 15 }}>
                Necesitas ayuda?
            </ThemedText>
            <LinearGradient
                colors={[
                    "rgba(240, 90, 126, 0.008)",
                    "rgba(240, 90, 126, 0.1)",
                    "rgba(240, 90, 126, 0.25)",
                ]}
                style={{
                    height: userInfo?.token ? 150 : 170,
                    borderWidth: 0.5,
                    borderColor: appColors.primary,
                    borderRadius: 5,
                }}
            >
                <View
                    style={{
                        position: "absolute",
                        right: 15,
                    }}
                >
                    <Hands height={userInfo?.token ? 150 : 170} width={60} />
                </View>
                <View style={{ width: "75%", padding: 20 }}>
                    <ThemedText type="default" style={{ fontSize: 20 }}>
                        {userInfo?.token
                            ? "Encuentra personas dispuesta a escucharte"
                            : "Únete a nuestra comunidad y encuentra el apoyo que necesitas"}
                    </ThemedText>
                    <ButtonThemed
                        text={userInfo?.token ? "Publicar" : "Iniciar sesión"}
                        onPress={() => {
                            if (userInfo?.token) {
                                router.navigate("/(drawer)/post/createPost");
                            } else {
                                router.navigate("/(drawer)/onBoarding/login");
                            }
                        }}
                        color="primary"
                        size="md"
                        style={{ marginTop: 20 }}
                    />
                </View>
            </LinearGradient>
        </View>
    );
};
