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
import HandsSecondary from "@/assets/images/handsSecondary.svg";

interface HomeHeaderProps {
    type?: 'help' | 'testimony';
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({type}) => {
    const { userInfo } = useSelector((state: RootState) => state.onBoarding);
    const [containerHeight, setContainerHeight] = React.useState<number>(0);

    const getMessage = () => {
        if (userInfo?.token) {
            return type === "help" 
                ? "Encuentra personas dispuestas a escucharte"
                : "Comparte tu historia y ayuda a otros en su proceso de sanación";
        } else {
            return type === "help"
                ? "Únete a nuestra comunidad y encuentra el apoyo que necesitas"
                : "Únete a nuestra comunidad y comparte tu experiencia para ayudar a otros";
        }
    };

    return (
        <View>
            <ThemedText type="title" style={{ marginBottom: 15 }}>
                {type === "help" ? "¿Necesitas ayuda?" : "¿Quieres compartir tu experiencia?"}
            </ThemedText>
            <LinearGradient
                colors={type === "help" ? [
                    "rgba(240, 90, 126, 0.008)",
                    "rgba(240, 90, 126, 0.1)",
                    "rgba(240, 90, 126, 0.25)",
                ] : [
                    "rgba(11, 132, 148, 0.008)",
                    "rgba(11, 132, 148, 0.1)",
                    "rgba(11, 132, 148, 0.25)",
                ]}
                style={{
                    borderWidth: 0.5,
                    borderColor: type === "help" ? appColors.primary : appColors.secondary,
                    borderRadius: 5,
                }}
            >
                <View
                    style={{
                        position: "absolute",
                        right: 15,
                    }}
                >
                    {type === "help" ? (
                        <Hands height={containerHeight || (userInfo?.token ? 150 : 170)} width={60} />
                    ) : (
                        <HandsSecondary height={170} width={60} />
                    )}
                </View>
                <View style={{ width: "75%", padding: 20 }} onLayout={(event) => setContainerHeight(event.nativeEvent.layout.height)}>
                    <ThemedText type="default" style={{ fontSize: 20 }}>
                        {getMessage()}
                    </ThemedText>
                    <ButtonThemed
                        text={userInfo?.token ? "Publicar" : "Iniciar sesión"}
                        onPress={() => {
                            if (userInfo?.token) {
                                router.push({
                                    pathname: "/(drawer)/post/createPost",
                                    params: { type: type === "help" ? "help" : "testimony" },
                                });
                            } else {
                                router.navigate("/(drawer)/onBoarding/login");
                            }
                        }}
                        color={type === "help" ? "primary" : "secondary"}
                        size="md"
                        style={{ marginTop: 20 }}
                    />
                </View>
            </LinearGradient>
        </View>
    );
};
