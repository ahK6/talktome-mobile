import SafeView from "@/components/shared/SafeView";
import { ThemedText } from "@/components/shared/ThemedText";
import { AvatarImage } from "@/components/ui/AvatarImage";
import { appColors } from "@/constants/Colors";
import { RootState } from "@/store/store";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import IconUser from "@/assets/images/icons/iconUser.svg";
import IconEdit from "@/assets/images/icons/iconEdit.svg";
import IconSettings from "@/assets/images/icons/iconSettings.svg";
import { ThemeSwitch } from "@/components/shared/ThemeSwitch";
import { useConfig } from "@/hooks/useConfig";

const MyAccount = () => {
    const { userInfo } = useSelector((state: RootState) => state.onBoarding);
    const { notifications, contactInfoVisible, updateSetting } = useConfig();

    return (
        <SafeView topSafe bottomSafe>
            <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{
                        marginTop: 50,
                        flex: 1,
                    }}
                >
                    {/* Avatar */}
                    <View
                        style={{
                            backgroundColor: appColors.lightGray,
                            padding: 15,
                            borderBottomColor: appColors.grayBorder,
                            borderBottomWidth: 1,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                gap: 15,
                            }}
                        >
                            <AvatarImage />
                            <View>
                                <ThemedText
                                    style={{
                                        fontSize: 18,
                                        color: appColors.red,
                                        marginBottom: 10,
                                    }}
                                >
                                    Mi cuenta
                                </ThemedText>
                                <ThemedText
                                    style={{ fontSize: 23, fontWeight: "bold" }}
                                >
                                    {userInfo?.userInformation?.username}
                                </ThemedText>
                            </View>
                        </View>
                    </View>
                    {/* My information */}
                    <View
                        style={{
                            padding: 15,
                            borderWidth: 1,
                            borderColor: appColors.grayBorder,
                            borderRadius: 10,
                            margin: 20,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                gap: 10,
                                borderBottomColor: appColors.softBlue,
                                borderBottomWidth: 1,
                                paddingBottom: 5,
                            }}
                        >
                            <IconUser width={25} height={25} />
                            <ThemedText
                                type="subtitle"
                                style={{
                                    fontSize: 18,
                                    marginBottom: 10,
                                    color: appColors.grayText,
                                }}
                            >
                                Mi información
                            </ThemedText>
                            <IconEdit
                                style={{
                                    marginLeft: "auto",
                                }}
                                width={25}
                                height={25}
                            />
                        </View>
                        <View
                            style={{
                                marginTop: 15,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: 10,
                                }}
                            >
                                <ThemedText
                                    style={{
                                        fontSize: 16,
                                        fontWeight: "bold",
                                        color: appColors.grayText,
                                    }}
                                >
                                    Nombre
                                </ThemedText>
                                <ThemedText
                                    style={{
                                        fontSize: 16,
                                        color: appColors.grayText,
                                    }}
                                >
                                    {userInfo?.userInformation?.username ||
                                        "No definido"}
                                </ThemedText>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: 10,
                                }}
                            >
                                <ThemedText
                                    style={{
                                        fontSize: 16,
                                        fontWeight: "bold",
                                        color: appColors.grayText,
                                    }}
                                >
                                    Email
                                </ThemedText>
                                <ThemedText
                                    style={{
                                        fontSize: 16,
                                        color: appColors.grayText,
                                    }}
                                >
                                    {userInfo?.userInformation?.email ||
                                        "No definido"}
                                </ThemedText>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: 10,
                                }}
                            >
                                <ThemedText
                                    style={{
                                        fontSize: 16,
                                        fontWeight: "bold",
                                        color: appColors.grayText,
                                    }}
                                >
                                    Contraseña
                                </ThemedText>
                                <TouchableOpacity onPress={() => {}}>
                                    <ThemedText
                                        style={{
                                            fontSize: 16,
                                            color: appColors.red,
                                            textDecorationLine: "underline",
                                        }}
                                    >
                                        Cambiar contraseña
                                    </ThemedText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/* Settings */}
                    <View
                        style={{
                            padding: 15,
                            borderWidth: 1,
                            borderColor: appColors.grayBorder,
                            borderRadius: 10,
                            margin: 20,
                            marginTop: 0,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                gap: 10,
                                borderBottomColor: appColors.softBlue,
                                borderBottomWidth: 1,
                                paddingBottom: 5,
                            }}
                        >
                            <IconSettings width={25} height={25} />
                            <ThemedText
                                type="subtitle"
                                style={{
                                    fontSize: 18,
                                    marginBottom: 10,
                                    color: appColors.grayText,
                                }}
                            >
                                Configuración
                            </ThemedText>
                        </View>
                        <View
                            style={{
                                marginTop: 20,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: 15,
                                }}
                            >
                                <ThemedText
                                    style={{
                                        fontSize: 16,
                                        fontWeight: "bold",
                                        color: appColors.grayText,
                                    }}
                                >
                                    Permitir Notificaciones
                                </ThemedText>
                                <ThemeSwitch
                                    value={notifications}
                                    onValueChange={(v) =>
                                        updateSetting("notifications", v)
                                    }
                                    size="small"
                                />
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: 15,
                                }}
                            >
                                <ThemedText
                                    style={{
                                        fontSize: 16,
                                        fontWeight: "bold",
                                        color: appColors.grayText,
                                    }}
                                >
                                    Información de contacto visible
                                </ThemedText>
                                <ThemeSwitch
                                    value={contactInfoVisible}
                                    onValueChange={(v) =>
                                        updateSetting("contactInfoVisible", v)
                                    }
                                    size="small"
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>
        </SafeView>
    );
};

export default MyAccount;
