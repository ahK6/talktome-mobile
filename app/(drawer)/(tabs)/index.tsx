import SafeView from "@/components/shared/SafeView";
import { ThemedText } from "@/components/ThemedText";
import { getPostsByType } from "@/store/posts/posts.actions";
import { IPost, PostTypes } from "@/store/posts/posts.types";
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
import IconMessage from "@/assets/images/icons/iconMessages.svg";
import UserCircle from "@/assets/images/icons/userCircle.svg";
import IconClock from "@/assets/images/icons/iconClock.svg";
import IconComment from "@/assets/images/icons/iconComment.svg";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

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

  const renderItem = ({ item }: { item: IPost }) => {
    return (
      <View
        style={{
          height: "auto",
          borderWidth: 1,
          borderColor: "rgba(89, 105, 140, 0.7)",
          borderRadius: 7,
          paddingHorizontal: 15,
          paddingTop: 20,
          marginTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(240, 90, 126, 0.1)",
              height: 40,
              width: 40,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              position: "absolute",
            }}
          >
            <IconMessage width={25} height={25} />
          </View>
          <ThemedText
            style={{
              alignSelf: "center",
              marginLeft: 60,
              width: "70%",
            }}
            type="subtitle"
            numberOfLines={1}
          >
            {item.title}
          </ThemedText>
        </View>
        <View style={{ marginTop: 10 }}>
          <ThemedText style={{ color: appColors.grayText }} numberOfLines={5}>
            {item.content}
          </ThemedText>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {item.keywords?.map((keyword) => (
            <CategoryItem
              key={keyword}
              label={keyword}
              containerStyle={{
                height: 20,
                marginRight: 5,
                marginTop: 10,
              }}
              textStyle={{ fontSize: 12, lineHeight: 16 }}
            />
          ))}
        </ScrollView>
        <View
          style={{
            height: 1,
            backgroundColor: "rgba(89, 105, 140, 0.2)",
            width: "100%",
            marginTop: 15,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <UserCircle height={17} width={17} />
            <ThemedText
              style={{
                marginLeft: 5,
                color: appColors.grayText,
                textDecorationLine: "underline",
                fontSize: 12,
              }}
            >
              {item.idUserCreator?.nickName}
            </ThemedText>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <IconClock height={17} width={17} />
              <ThemedText
                style={{
                  color: appColors.grayText,
                  fontSize: 12,
                  marginLeft: 2,
                }}
              >
                {dayjs(item.createdAt).fromNow(true)}
              </ThemedText>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 15,
              }}
            >
              <IconComment height={17} width={17} />
              <ThemedText
                style={{
                  color: appColors.grayText,
                  fontSize: 12,
                  marginLeft: 2,
                }}
              >
                {item.comments?.length || 0}
              </ThemedText>
            </View>
          </View>
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
        renderItem={renderItem}
        data={postsRequestingLists}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeView>
  );
}

const styles = StyleSheet.create({});
