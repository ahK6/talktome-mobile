import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/shared/ThemedText";
import CategoryItem from "@/components/shared/CategoryItem";
import { appColors } from "@/constants/Colors";
import { IKeywords } from "@/store/posts/posts.types";

interface KeywordsFilterProps {
    keywords: IKeywords[];
    selectedKeywords: string[];
    isSearchMode: boolean;
    onToggleKeyword: (keyword: string) => void;
    onClearFilters: () => void;
}

export const KeywordsFilter: React.FC<KeywordsFilterProps> = ({
    keywords,
    selectedKeywords,
    isSearchMode,
    onToggleKeyword,
    onClearFilters,
}) => {
    return (
        <View style={{ marginTop: 15 }}>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                }}
            >
                <ThemedText type="subtitle">
                    Temas{" "}
                    {selectedKeywords.length > 0 &&
                        `(${selectedKeywords.length})`}
                </ThemedText>
                {isSearchMode && (
                    <TouchableOpacity onPress={onClearFilters}>
                        <ThemedText
                            style={{
                                color: appColors.primary,
                                fontSize: 12,
                                textDecorationLine: "underline",
                            }}
                        >
                            Limpiar filtros
                        </ThemedText>
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {keywords?.map((item) => {
                    const isSelected = selectedKeywords.includes(item.value);
                    return (
                        <TouchableOpacity
                            key={item._id}
                            onPress={() => onToggleKeyword(item.value)}
                        >
                            <CategoryItem
                                label={item.value}
                                containerStyle={{
                                    marginRight: 10,
                                    backgroundColor: isSelected
                                        ? appColors.primary
                                        : appColors.softGray,
                                    borderColor: isSelected
                                        ? appColors.primary
                                        : appColors.softGray,
                                    borderWidth: 1,
                                }}
                                textStyle={{
                                    color: isSelected
                                        ? appColors.white
                                        : appColors.text,
                                    fontWeight: isSelected ? "bold" : "normal",
                                }}
                            />
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};
