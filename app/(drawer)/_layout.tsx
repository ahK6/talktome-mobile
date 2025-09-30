import { Drawer } from "expo-router/drawer";
import { router, usePathname } from "expo-router";
import { View } from "react-native";
import { Header } from "@/components/shared/Header";
import { useEffect, useState } from "react";
import { appColors } from "@/constants/Colors";
import { ThemedText } from "@/components/shared/ThemedText";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ButtonThemed from "@/components/shared/ThemedButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DrawerOptions } from "@/components/drawer/DrawerOptions";
import { appHeaders, HeaderConfig } from "@/constants/headers";
import { SearchProvider, useSearch } from "@/contexts/SearchContext";

function DrawerLayout() {
    const safeAreaInsets = useSafeAreaInsets();
    const { userInfo } = useSelector((state: RootState) => state.onBoarding);
    const pathname = usePathname();
    const [headerConfig, setHeaderConfig] = useState<HeaderConfig | null>(null);

    // Usar el contexto de búsqueda
    const { searchQuery, setSearchQuery } = useSearch();

    useEffect(() => {
        console.log(pathname, appHeaders[pathname as keyof typeof appHeaders]);
        if (Object.prototype.hasOwnProperty.call(appHeaders, pathname)) {
            setHeaderConfig(appHeaders[pathname as keyof typeof appHeaders]);
        } else {
            setHeaderConfig({
                title: null,
                showSearchBox: false,
                showBackButton: false,
                type: "hidden",
            });
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
                    return (
                        <Header
                            headerConfig={headerConfig}
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            params={props.route.params}
                        />
                    );
                },
            }}
        />
    );
}

export default function Layout() {
    return (
        <SearchProvider>
            <DrawerLayout />
        </SearchProvider>
    );
}
