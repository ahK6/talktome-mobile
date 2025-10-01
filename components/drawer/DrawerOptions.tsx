import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { logout } from "@/store/onBoarding/onBoarding.store";
import { appColors } from "@/constants/Colors";
import IconMessage from "@/assets/images/icons/iconMessages.svg";
import IconMessageCheck from "@/assets/images/icons/iconMessageCheck.svg";
import IconUsers from "@/assets/images/icons/iconUsers.svg";
import IconUserCircle from "@/assets/images/icons/userCirclePrimary.svg";
import IconBell from "@/assets/images/icons/iconBell.svg";
import IconEmptyMessage from "@/assets/images/icons/iconEmptyMessage.svg";
import IconDocument from "@/assets/images/icons/iconDocument.svg";
import IconLogOut from "@/assets/images/icons/logout.svg";
import { View } from "react-native";
import ButtonThemed from "../shared/ThemedButton";
import { router } from "expo-router";

export const DrawerOptions = () => {
    const dispatch: AppDispatch = useDispatch();
    return (
        <View>
            <View
                style={{
                    borderBottomWidth: 0.3,
                    borderBottomColor: appColors.gray,
                    paddingBottom: 20,
                    marginBottom: 20,
                }}
            >
                <ButtonThemed
                    text="Solicitudes de ayuda"
                    iconLeft={<IconMessage width={25} height={25} />}
                    onPress={() => console.log("Solicitudes de ayuda pressed")}
                    style={{
                        backgroundColor: appColors.white,
                        borderColor: appColors.white,
                        justifyContent: "flex-start",
                        marginBottom: 10,
                    }}
                    textStyles={{
                        color: appColors.black,
                        marginLeft: 5,
                    }}
                />
                <ButtonThemed
                    text="Testimonios"
                    iconLeft={<IconMessageCheck width={25} height={25} />}
                    onPress={() => console.log("Testimonios pressed")}
                    style={{
                        backgroundColor: appColors.white,
                        borderColor: appColors.white,
                        justifyContent: "flex-start",
                        marginBottom: 10,
                    }}
                    textStyles={{
                        color: appColors.black,
                        marginLeft: 5,
                    }}
                />
                <ButtonThemed
                    text="Directorio de profesionales"
                    iconLeft={<IconUsers width={25} height={25} />}
                    onPress={() =>
                        console.log("Directorio de profesionales pressed")
                    }
                    style={{
                        backgroundColor: appColors.white,
                        borderColor: appColors.white,
                        justifyContent: "flex-start",
                        marginBottom: 10,
                    }}
                    textStyles={{
                        color: appColors.black,
                        marginLeft: 5,
                    }}
                />
            </View>
            <View
                style={{
                    borderBottomWidth: 0.3,
                    borderBottomColor: appColors.gray,
                    paddingBottom: 20,
                    marginBottom: 20,
                }}
            >
                <ButtonThemed
                    text="Mi Cuenta"
                    iconLeft={
                        <IconUserCircle
                            width={25}
                            height={25}
                            color={appColors.primary}
                        />
                    }
                    onPress={() =>
                        router.navigate("/(drawer)/myAccount/myAccount")
                    }
                    style={{
                        backgroundColor: appColors.white,
                        borderColor: appColors.white,
                        justifyContent: "flex-start",
                        marginBottom: 10,
                    }}
                    textStyles={{
                        color: appColors.black,
                        marginLeft: 5,
                    }}
                />
                <ButtonThemed
                    text="Notificaciones"
                    iconLeft={<IconBell width={25} height={25} />}
                    onPress={() => console.log("Notificaciones pressed")}
                    style={{
                        backgroundColor: appColors.white,
                        borderColor: appColors.white,
                        justifyContent: "flex-start",
                        marginBottom: 10,
                    }}
                    textStyles={{
                        color: appColors.black,
                        marginLeft: 5,
                    }}
                />
                <ButtonThemed
                    text="Bandeja de mensajes"
                    iconLeft={<IconEmptyMessage width={25} height={25} />}
                    onPress={() => console.log("Bandeja de mensajes pressed")}
                    style={{
                        backgroundColor: appColors.white,
                        borderColor: appColors.white,
                        justifyContent: "flex-start",
                        marginBottom: 10,
                    }}
                    textStyles={{
                        color: appColors.black,
                        marginLeft: 5,
                    }}
                />
                <ButtonThemed
                    text="Mis publicaciones"
                    iconLeft={<IconDocument width={25} height={25} />}
                    onPress={() => console.log("Mis publicaciones pressed")}
                    style={{
                        backgroundColor: appColors.white,
                        borderColor: appColors.white,
                        justifyContent: "flex-start",
                        marginBottom: 10,
                    }}
                    textStyles={{
                        color: appColors.black,
                        marginLeft: 5,
                    }}
                />
            </View>
            <ButtonThemed
                text="Cerrar sesión"
                iconLeft={<IconLogOut width={25} height={25} />}
                onPress={() => dispatch(logout())}
                style={{
                    backgroundColor: appColors.white,
                    borderColor: appColors.white,
                    justifyContent: "flex-start",
                    marginBottom: 10,
                }}
                textStyles={{
                    color: appColors.black,
                    marginLeft: 5,
                }}
            />
        </View>
    );
};
