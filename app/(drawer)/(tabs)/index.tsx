import React, { useCallback } from "react";
import {
    FlatList,
    View,
    RefreshControl,
    ActivityIndicator,
} from "react-native";
import SafeView from "@/components/shared/SafeView";
import { ThemedText } from "@/components/shared/ThemedText";
import { appColors } from "@/constants/Colors";
import { IPost } from "@/store/posts/posts.types";

// Components
import { HomeHeader } from "@/components/HomeHeader";
import { KeywordsFilter } from "@/components/KeywordsFilter";
import { SearchResultsBanner } from "@/components/SearchResultsBanner";
import { PostItem } from "@/components/PostItem";
import { EmptyState } from "@/components/EmptyState";

// Hooks
import { useHomePosts } from "@/hooks/useHomePosts";

export default function HomeScreen() {
    const {
        displayData,
        keywords,
        isRefreshing,
        selectedKeywords,
        isSearchMode,
        isSearching,
        toggleKeyword,
        clearFilters,
        onRefresh,
        handleLoadMore,
    } = useHomePosts();

    const headerList = useCallback(() => {
        return (
            <View>
                <HomeHeader />
                <KeywordsFilter
                    keywords={keywords}
                    selectedKeywords={selectedKeywords}
                    isSearchMode={isSearchMode}
                    onToggleKeyword={toggleKeyword}
                    onClearFilters={clearFilters}
                />
                <SearchResultsBanner
                    isSearchMode={isSearchMode}
                    isSearching={isSearching}
                    resultCount={displayData.length}
                    onClearFilters={clearFilters}
                />
            </View>
        );
    }, [
        keywords,
        selectedKeywords,
        isSearchMode,
        isSearching,
        displayData.length,
        toggleKeyword,
        clearFilters,
    ]);

    const renderItem = useCallback(
        ({ item }: { item: IPost }) => <PostItem item={item} />,
        []
    );

    const renderEmptyComponent = useCallback(
        () => (
            <EmptyState
                isSearching={isSearching}
                isSearchMode={isSearchMode}
                hasData={displayData.length > 0}
            />
        ),
        [isSearching, isSearchMode, displayData.length]
    );

    return (
        <SafeView topSafe bottomSafe>
            <FlatList
                contentContainerStyle={{ padding: 15 }}
                ListHeaderComponent={headerList}
                style={{ marginTop: 60 }}
                renderItem={renderItem}
                data={displayData}
                keyExtractor={(item) =>
                    item._id?.toString() || Math.random().toString()
                }
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                        colors={[appColors.primary]}
                        tintColor={appColors.primary}
                    />
                }
                onEndReached={handleLoadMore}
                ListEmptyComponent={renderEmptyComponent}
                removeClippedSubviews={true}
                maxToRenderPerBatch={10}
                updateCellsBatchingPeriod={50}
                windowSize={10}
                initialNumToRender={10}
                getItemLayout={(data, index) => ({
                    length: 200,
                    offset: 200 * index,
                    index,
                })}
            />

            {/* Loading overlay para búsquedas */}
            {isSearching && displayData.length > 0 && (
                <View
                    style={{
                        position: "absolute",
                        top: 70,
                        right: 20,
                        backgroundColor: appColors.primary,
                        borderRadius: 20,
                        padding: 8,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <ActivityIndicator size="small" color={appColors.white} />
                    <ThemedText
                        style={{
                            color: appColors.white,
                            fontSize: 12,
                            marginLeft: 5,
                        }}
                    >
                        Buscando...
                    </ThemedText>
                </View>
            )}
        </SafeView>
    );
}
