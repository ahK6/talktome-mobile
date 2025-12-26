import React from "react";
import { View, ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/shared/ThemedText";
import { appColors } from "@/constants/Colors";

interface EmptyStateProps {
    isSearching: boolean;
    isSearchMode: boolean;
    hasData: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    isSearching,
    isSearchMode,
    hasData,
}) => {
    if (hasData) return null;

    if (isSearching) {
        return (
            <View
                style={{
                    alignItems: "center",
                    paddingVertical: 50,
                }}
            >
                <ActivityIndicator size="large" color={appColors.primary} />
                <ThemedText
                    style={{
                        color: appColors.grayText,
                        textAlign: "center",
                        marginTop: 10,
                    }}
                >
                    Buscando publicaciones...
                </ThemedText>
            </View>
        );
    }

    return (
        <View
            style={{
                alignItems: "center",
                paddingVertical: 50,
            }}
        >
            <ThemedText
                style={{
                    color: appColors.grayText,
                    textAlign: "center",
                }}
            >
                {isSearchMode
                    ? "No se encontraron publicaciones con los filtros seleccionados"
                    : "No hay publicaciones disponibles"}
            </ThemedText>
        </View>
    );
};
