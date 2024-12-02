import SafeView from "@/components/shared/SafeView";
import { ThemedText } from "@/components/ThemedText";
import { getPostsByType } from "@/store/posts/posts.actions";
import { PostTypes } from "@/store/posts/posts.types";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  Text,
  FlatList,
  View,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { appColors } from "@/constants/Colors";
import Hands from "@/assets/images/hands.svg";
import ButtonThemed from "@/components/shared/ThemedButton";
import CategoryItem from "@/components/shared/CategoryItem";

export default function HomeScreen() {
  const dispatch: AppDispatch = useDispatch();
  const { postsRequestingLists } = useSelector(
    (state: RootState) => state.posts
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const getPostsRequestingLists = () => {
    dispatch(
      getPostsByType({
        inputParams: { type: PostTypes.requesting, page: currentPage },
        shouldStoreOutputState: true,
      })
    );
  };

  useEffect(() => {
    getPostsRequestingLists();
  }, []);

  const headerList = () => {
    return (
      <View>
        <ThemedText type="title" style={{ marginBottom: 15 }}>
          Necesitas ayuda?
        </ThemedText>
        <LinearGradient
          // Button Linear Gradient
          colors={[
            "rgba(240, 90, 126, 0.008)",
            "rgba(240, 90, 126, 0.1)",
            "rgba(240, 90, 126, 0.25)",
          ]}
          style={{
            height: 150,
            borderWidth: 0.5,
            borderColor: appColors.primary,
            borderRadius: 5,
          }}
        >
          <View
            style={{
              position: "absolute",
              right: 15,
            }}
          >
            <Hands height={150} width={60} />
          </View>
          <View style={{ width: "75%", padding: 20 }}>
            <ThemedText type="default" style={{ fontSize: 20 }}>
              Encuentra personas dispuesta a escucharte
            </ThemedText>
            <ButtonThemed
              text="Publicar"
              onPress={() => {}}
              color="primary"
              size="md"
              style={{ marginTop: 20 }}
            />
          </View>
        </LinearGradient>
        <View style={{ marginTop: 15 }}>
          <ThemedText type="subtitle" style={{ marginBottom: 5 }}>
            Temas
          </ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {["Salud mental", "Depresión", "Ansiedad", "Autoestima"].map(
              (item) => (
                <CategoryItem
                  key={item}
                  label={item}
                  containerStyle={{ marginRight: 10 }}
                />
              )
            )}
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <SafeView topSafe bottomSafe>
      <FlatList
        contentContainerStyle={{ padding: 15 }}
        ListHeaderComponent={headerList}
        style={{ marginTop: 60 }}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        data={postsRequestingLists}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
