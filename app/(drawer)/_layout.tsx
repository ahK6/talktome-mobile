import { Drawer } from "expo-router/drawer";
import { router, usePathname } from "expo-router";
import { View } from "react-native";
import { Header } from "@/components/shared/Header";
import { useEffect, useRef } from "react";
import { appColors } from "@/constants/Colors";
import { ThemedText } from "@/components/shared/ThemedText";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ButtonThemed from "@/components/shared/ThemedButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DrawerOptions } from "@/components/drawer/DrawerOptions";

export default function Layout() {
    const safeAreaInsets = useSafeAreaInsets();

    const { userInfo } = useSelector((state: RootState) => state.onBoarding);

    const pathname = usePathname();

    const titleRef = useRef<string>(null);

    useEffect(() => {
        console.log(pathname);
        if (pathname === "/post/createPost") {
            console.log("entroooooooo");
            titleRef.current = "Crear publicación";
        }
    }, [pathname]);

    return (
        <Drawer
            drawerContent={() => (
                <View
                    style={{
                        marginTop: safeAreaInsets.top + 10,
                        padding: 20,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            paddingBottom: 20,
                            borderBottomWidth: 0.3,
                            borderBottomColor: appColors.gray,
                        }}
                    >
                        <View
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: 50,
                                borderWidth: 1,
                                borderColor: "black",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <View
                                style={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: 50,
                                    backgroundColor: appColors.softGray,
                                }}
                            />
                        </View>

                        <View>
                            <ThemedText
                                type="subtitle"
                                style={{ fontSize: 20, marginLeft: 10 }}
                            >
                                Eres increible
                            </ThemedText>
                            {userInfo?.token ? (
                                <ThemedText
                                    style={{ fontSize: 20, marginLeft: 10 }}
                                >
                                    {userInfo?.userInformation?.username?.toUpperCase()}
                                </ThemedText>
                            ) : (
                                <ThemedText
                                    style={{ fontSize: 20, marginLeft: 10 }}
                                >
                                    Eres importante
                                </ThemedText>
                            )}
                        </View>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        {userInfo?.token ? (
                            <DrawerOptions />
                        ) : (
                            <ButtonThemed
                                text={"Iniciar sesión"}
                                style={{
                                    backgroundColor: appColors.secondary,
                                    borderColor: appColors.secondary,
                                }}
                                onPress={() => {
                                    router.navigate(
                                        "/(drawer)/onBoarding/login"
                                    );
                                }}
                            />
                        )}

                        {!userInfo?.token && (
                            <ButtonThemed
                                text="Registrarse"
                                style={{
                                    marginTop: 10,
                                    backgroundColor: appColors.transparent,
                                    borderColor: appColors.transparent,
                                }}
                                textStyles={{
                                    textAlign: "center",
                                    textDecorationLine: "underline",
                                    color: appColors.text,
                                }}
                                onPress={() => {
                                    router.navigate(
                                        "/(drawer)/onBoarding/createAccount"
                                    );
                                }}
                            />
                        )}
                    </View>
                </View>
            )}
            screenOptions={{
                header: (props) => {
                    console.log(props.options);
                    return <Header title={titleRef.current} />;
                },
            }}
        ></Drawer>
    );
}
