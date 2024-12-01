import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";
import { appColors } from "@/constants/Colors";
import HandsIcon from "@/assets/images/icons/handsIcon.svg";
import BoxIcon from "@/assets/images/icons/boxIcon.svg";
import ProfessionalsIcon from "@/assets/images/icons/professionalsIcon.svg";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
        tabBarActiveTintColor: appColors.primary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Ayuda",
          tabBarIcon: ({ color }) => (
            <HandsIcon width={28} height={28} fill={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Yo pude",
          tabBarIcon: ({ color }) => (
            <BoxIcon width={28} height={28} fill={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="directory"
        options={{
          title: "Profesionales",
          tabBarIcon: ({ color }) => (
            <ProfessionalsIcon width={28} height={28} fill={color} />
          ),
        }}
      />
    </Tabs>
  );
}
