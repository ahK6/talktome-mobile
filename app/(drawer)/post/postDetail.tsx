import { showToast } from "@/components/shared/notifications/toast";
import SafeView from "@/components/shared/SafeView";
import ButtonThemed from "@/components/shared/ThemedButton";
import { ThemedText } from "@/components/shared/ThemedText";
import { appColors } from "@/constants/Colors";
import UserCircle from "@/assets/images/icons/userCircle.svg";
import IconClock from "@/assets/images/icons/iconClock.svg";
import IconComment from "@/assets/images/icons/iconComment.svg";
import { postDetail } from "@/store/posts/posts.actions";
import { IPostDetail } from "@/store/posts/posts.types";
import { AppDispatch, RootState } from "@/store/store";
import { useIsFocused } from "@react-navigation/native";

import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import CategoryItem from "@/components/shared/CategoryItem";

const PostDetail = () => {
  const params = useLocalSearchParams();
  const isVisible = useIsFocused();

  const dispatch: AppDispatch = useDispatch();

  const [postDetailInfo, setPostDetailInfo] = useState<IPostDetail | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const getPostDetail = async () => {
    setLoading(true);
    try {
      const res = await dispatch(
        postDetail({ inputParams: { idPost: params.postId as string } })
      ).unwrap();
      setPostDetailInfo(res.data);
    } catch (error: any) {
      showToast(
        error.response?.data?.error ?? "Error al obtener los detalles",
        {
          type: "danger",
        }
      );
      router.back();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      console.log("params.postId22222 " + params.postId);
      if (params.postId) {
        console.log("params.postId " + params.postId);

        getPostDetail();
      } else {
        showToast("Especifica un ID de publicación", { type: "danger" });
        router.back();
      }
    }
  }, [isVisible]);

  useEffect(() => {
    console.log("wef;kwe;flwef " + JSON.stringify(postDetailInfo));
  }, [postDetailInfo]);

  return (
    <SafeView topSafe bottomSafe>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingBottom: 180,
          marginTop: 75,
        }}
      >
        <ThemedText type="title" style={{ marginBottom: 15 }}>
          {postDetailInfo?.title}
        </ThemedText>
        <View
          style={{
            flexDirection: "row",
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
              {postDetailInfo?.idUserCreator?.nickName}
            </ThemedText>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 15,
              }}
            >
              <IconClock height={17} width={17} />
              <ThemedText
                style={{
                  color: appColors.grayText,
                  fontSize: 12,
                  marginLeft: 2,
                }}
              >
                {dayjs(postDetailInfo?.createdAt).fromNow(true)}
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
                {postDetailInfo?.comments?.length || 0}
              </ThemedText>
            </View>
          </View>
        </View>
        <ThemedText>{postDetailInfo?.content}</ThemedText>

        <ThemedText
          style={{ fontWeight: "bold", marginTop: 20, marginBottom: 7 }}
        >
          Temas relacionados
        </ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {postDetailInfo?.keywords?.map((item) => (
            <CategoryItem
              key={item}
              label={item}
              containerStyle={{
                height: 20,
                marginRight: 5,
              }}
              textStyle={{ fontSize: 12, lineHeight: 16 }}
            />
          ))}
        </ScrollView>
      </ScrollView>
      <ButtonThemed
        style={{
          position: "absolute",
          bottom: 20,
          alignSelf: "center",
          width: "90%",
        }}
        text="Responder"
        loading={loading}
      />
    </SafeView>
  );
};

export default PostDetail;
