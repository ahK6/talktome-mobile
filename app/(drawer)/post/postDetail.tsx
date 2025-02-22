import { showToast } from "@/components/shared/notifications/toast";
import SafeView from "@/components/shared/SafeView";
import ButtonThemed from "@/components/shared/ThemedButton";
import { ThemedText } from "@/components/shared/ThemedText";
import { appColors } from "@/constants/Colors";
import UserCircle from "@/assets/images/icons/userCircle.svg";
import IconClock from "@/assets/images/icons/iconClock.svg";
import IconComment from "@/assets/images/icons/iconComment.svg";
import IconSend from "@/assets/images/icons/iconSend.svg";
import IconBack from "@/assets/images/icons/iconBack.svg";

import {
  getcommentsByPostId,
  postComment,
  postDetail,
} from "@/store/posts/posts.actions";
import { IComment, IPostDetail } from "@/store/posts/posts.types";
import { AppDispatch, RootState } from "@/store/store";
import { useIsFocused } from "@react-navigation/native";
import PagerView from "react-native-pager-view";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import CategoryItem from "@/components/shared/CategoryItem";
import TabBarPost from "@/components/posts/HeaderPost";
import TextInputThemed from "@/components/shared/ThemedInput";
import { set } from "react-hook-form";

const PostDetail = () => {
  const params = useLocalSearchParams();
  const isVisible = useIsFocused();
  const refPagerView = useRef(null);
  const commentInputRef = useRef<TextInput>(null);

  const dispatch: AppDispatch = useDispatch();

  const [postDetailInfo, setPostDetailInfo] = useState<IPostDetail | null>(
    null
  );
  const [postCommentsList, setPostCommentsList] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedTab, setSelectedTab] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [textBoxFocused, setTextBoxFocused] = useState(false);

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

  const getPostComments = async () => {
    setLoading(true);
    try {
      const res = await dispatch(
        getcommentsByPostId({
          inputParams: { idPost: params.postId as string },
        })
      ).unwrap();
      setPostCommentsList(res.data);
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

  const makeComment = async () => {
    setLoading(true);
    try {
      await dispatch(
        postComment({
          inputParams: {
            idPost: params.postId as string,
            commentContent: commentText,
          },
        })
      ).unwrap();
      setCommentText("");
      showToast("Comentario enviado", { type: "success" });
      setTextBoxFocused(false);
      getPostComments();
    } catch (error: any) {
      showToast(
        error.response?.data?.error ?? "Error al enviar el comentario",
        {
          type: "danger",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      if (params.postId) {
        getPostDetail();
        getPostComments();
      } else {
        showToast("Especifica un ID de publicación", { type: "danger" });
        router.back();
      }
    }
  }, [isVisible]);

  const renderItem = ({ item }: { item: IComment }) => {
    return (
      <TouchableOpacity
        style={{
          height: "auto",
          borderWidth: 1,
          borderColor: "rgba(89, 105, 140, 0.7)",
          borderRadius: 7,
          paddingHorizontal: 15,
          paddingTop: 5,
          marginTop: 20,
          paddingBottom: 15,
        }}
        onPress={() => {
          router.navigate({
            pathname: "/(drawer)/post/postDetail",
            params: {
              postId: item._id,
            },
          });
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ThemedText
            type="subtitle"
            style={{
              color: appColors.grayText,
              textDecorationLine: "underline",
              fontSize: 12,
            }}
          >
            {item.idUserCreator?.nickName}
          </ThemedText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
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
        </View>

        <View style={{ marginTop: 10 }}>
          <ThemedText style={{ color: appColors.grayText }} numberOfLines={30}>
            {item.content}
          </ThemedText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeView topSafe bottomSafe>
      <View>
        <TabBarPost
          refPagerView={refPagerView}
          containerStyle={{ marginTop: 50 }}
          selectedTab={selectedTab}
        />

        {textBoxFocused && (
          <TouchableOpacity
            onPress={() => setTextBoxFocused(false)}
            style={{
              width: 50,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              backgroundColor: appColors.secondary,
              top: 65,
              right: 15,
              padding: 5,
              borderRadius: 50,
            }}
          >
            <ThemedText style={{ color: "white" }}>X</ThemedText>
          </TouchableOpacity>
        )}
      </View>
      <PagerView
        style={{ flex: 1 }}
        initialPage={0}
        ref={refPagerView}
        onPageSelected={(e) => {
          setSelectedTab(e.nativeEvent.position);
          setTextBoxFocused(false);
        }}
      >
        <View key={0}>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 15,
              paddingBottom: 180,
              marginTop: 30,
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
            onPress={() => {
              setSelectedTab(1);
              refPagerView.current?.setPage(1);

              setTimeout(() => {
                setTextBoxFocused(true);
              }, 600);
            }}
            style={{
              position: "absolute",
              bottom: 20,
              alignSelf: "center",
              width: "90%",
            }}
            text="Responder"
            loading={loading}
          />
        </View>
        <View key={1} style={{ flex: 1 }}>
          <FlatList
            data={postCommentsList}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingHorizontal: 15,
              paddingBottom: 100,
              marginTop: 30,
            }}
          />
          <View
            style={{
              borderTopWidth: 0.3,
              borderColor: appColors.secondary,
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 1 }}>
              <TextInputThemed
                ref={commentInputRef}
                value={commentText}
                onChangeText={(value) => {
                  if (textBoxFocused === false) {
                    setTextBoxFocused(true);
                  }
                  setCommentText(value);
                }}
                placeholder="Escribe un comentario..."
                inputStyle={{
                  borderRadius: 0,
                  borderWidth: 0,
                  height: textBoxFocused ? "100%" : 50,
                  textAlignVertical: "top",
                }}
                onFocus={() => setTextBoxFocused(true)}
                onBlur={() => setTextBoxFocused(false)}
                numberOfLines={textBoxFocused ? 50 : 1}
                multiline={textBoxFocused}
              />
            </View>

            <TouchableOpacity
              onPress={makeComment}
              style={{
                width: 50,
                justifyContent: "center",
                alignItems: "center",
                position: textBoxFocused ? "absolute" : "relative",
                bottom: textBoxFocused ? 25 : 0,
                right: textBoxFocused ? 15 : 0,
                backgroundColor: textBoxFocused
                  ? appColors.secondary
                  : "transparent",
                padding: textBoxFocused ? 15 : 0,
                borderRadius: textBoxFocused ? 50 : 0,
              }}
            >
              <IconSend
                height={15}
                width={15}
                color={textBoxFocused ? "white" : appColors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </PagerView>
    </SafeView>
  );
};

export default PostDetail;
