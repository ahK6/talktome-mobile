import { appColors } from "@/constants/Colors";
import { DrawerActions } from "@react-navigation/native";
import { router, useNavigation, usePathname } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View, TextInput } from "react-native";
import SafeView from "./SafeView";
import { ThemedText } from "./ThemedText";
import MenuIcon from "@/assets/images/icons/menu.svg";
import IconBack from "@/assets/images/icons/iconBack.svg";
import IconSearch from "@/assets/images/icons/iconSearch.svg";
import { HeaderConfig } from "@/constants/headers";

interface HeaderProps {
  headerConfig: HeaderConfig | null;
  onSearchChange?: (query: string) => void;
  searchQuery?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  headerConfig, 
  onSearchChange,
  searchQuery = ''
 }) => {
  const navigation = useNavigation();
  const pathname = usePathname();

  const shouldShowBackButton = (): boolean => {
    const backRoutes: string[] = [
      "/(drawer)/onBoarding/login",
      "/(drawer)/onBoarding/createAccount", 
      "/(drawer)/post/createPost",
      "/(drawer)/post/postDetail",
      "/(drawer)/post/makeComment"
    ];
    
    return backRoutes.some(route => pathname.includes(route.split('/').pop() ?? ""));
  };

  const handleGoBack = (): void => {
    // Para rutas específicas, usar navegación específica
    if (pathname.includes("createAccount")) {
      router.push("/(drawer)/onBoarding/login");
    } else if (pathname.includes("makeComment")) {
      // Volver a postDetail manteniendo el parámetro postId
      router.back();
    } else {
      // Para otras rutas, usar goBack normal
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        router.push("/(drawer)/(tabs)");
      }
    }
  };

  if (headerConfig?.type === 'hidden') {
    return null;
  }

  return (
    <SafeView topSafe>
      <View
        style={{
          height: 50,
          backgroundColor: appColors.softBlue,
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {shouldShowBackButton() ? (
          <TouchableOpacity
            onPress={handleGoBack}
            style={{
              position: "absolute",
              left: 20,
              backgroundColor: "#25374D1A",
              padding: 5,
              borderRadius: 50,
            }}
          >
            <IconBack />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer());
            }}
            style={{ position: "absolute", left: 20 }}
          >
            <MenuIcon />
          </TouchableOpacity>
        )}

        {headerConfig?.showSearchBox ? (
          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: appColors.white,
            borderRadius: 20,
            paddingHorizontal: 15,
            marginHorizontal: 50,
            height: 35
          }}>
            <IconSearch width={20} height={20} />
            <TextInput
              placeholder="Buscar una publicación"
              value={searchQuery}
              onChangeText={onSearchChange}
              style={{
                flex: 1,
                marginLeft: 10,
                fontSize: 14,
                color: appColors.text
              }}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => onSearchChange?.('')}>
                <Text style={{ 
                  color: appColors.grayText, 
                  fontSize: 18,
                  paddingHorizontal: 5
                }}>
                  x
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          headerConfig?.title && <ThemedText>{headerConfig.title}</ThemedText>
        )}
      </View>
    </SafeView>
  );
};
