import React from "react";
import { View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/shared/ThemedText";
import { appColors } from "@/constants/Colors";

interface SearchResultsBannerProps {
    isSearchMode: boolean;
    isSearching: boolean;
    resultCount: number;
    onClearFilters: () => void;
}

export const SearchResultsBanner: React.FC<SearchResultsBannerProps> = ({
    isSearchMode,
    isSearching,
    resultCount,
    onClearFilters,
}) => {
    if (!isSearchMode) return null;

    return (
        <View
            style={{
                marginTop: 15,
                padding: 10,
                backgroundColor: appColors.softBlue,
                borderRadius: 8,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <View>
                <ThemedText style={{ fontSize: 14, fontWeight: "bold" }}>
                    {isSearching ? "Buscando..." : "Resultados de búsqueda"}
                </ThemedText>
                <ThemedText style={{ fontSize: 12, color: appColors.grayText }}>
                    {isSearching
                        ? "Procesando búsqueda..."
                        : `${resultCount} publicaciones encontradas`}
                </ThemedText>
            </View>
            <TouchableOpacity
                onPress={onClearFilters}
                style={{
                    backgroundColor: appColors.white,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 15,
                }}
            >
                <ThemedText style={{ fontSize: 12, color: appColors.primary }}>
                    Ver todo
                </ThemedText>
            </TouchableOpacity>
        </View>
    );
};
