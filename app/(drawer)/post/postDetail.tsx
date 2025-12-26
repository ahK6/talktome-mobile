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
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import CategoryItem from "@/components/shared/CategoryItem";
import TabBarPost from "@/components/posts/HeaderPost";
import TextInputThemed from "@/components/shared/ThemedInput";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { set } from "react-hook-form";

const PostDetail = () => {
  const params = useLocalSearchParams();
  const isVisible = useIsFocused();
  const refPagerView = useRef(null);
  const commentInputRef = useRef<TextInput>(null);

  const dispatch: AppDispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.onBoarding);

  const [postDetailInfo, setPostDetailInfo] = useState<IPostDetail | null>(null);
  const [postCommentsList, setPostCommentsList] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup cuando el componente se desmonta
      cleanupPostData();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      // Limpiar datos cuando la pantalla pierde foco
      cleanupPostData();
    }
  }, [isVisible]);

  const cleanupPostData = () => {
    setPostDetailInfo(null);
    setPostCommentsList([]);
    setCurrentPostId(null);
    setLoading(false);
    setIsCheckingAuth(true);
  };

  // Verificar autenticación cuando la pantalla recibe foco
  useFocusEffect(
    useCallback(() => {
      checkAuthAndLoadData();
    }, [userInfo?.token, params.postId])
  );

  const checkAuthAndLoadData = async () => {
    // Verificar si hay un postId válido
    if (!params.postId) {
      showToast("Especifica un ID de publicación", { type: "danger" });
      router.back();
      return;
    }

    if (currentPostId && currentPostId !== params.postId) {
      cleanupPostData();
    }

    setCurrentPostId(params.postId as string);

    // Si está autenticado, cargar datos
    setIsCheckingAuth(false);
    if (isVisible) {
      await Promise.all([getPostDetail(), getPostComments()]);
    }
  };

  const getPostDetail = async () => {
    if (!postDetailInfo || currentPostId !== params.postId) {
      setLoading(true);
    }
    try {
      const res = await dispatch(
        postDetail({ inputParams: { idPost: params.postId as string } })
      ).unwrap();
      setPostDetailInfo(res.data);
    } catch (error: any) {
      // Verificar si el error es de autenticación
      if (error.response?.status === 401) {
        showToast("Tu sesión ha expirado. Inicia sesión nuevamente", {
          type: "danger",
        });
        router.replace("/(drawer)/onBoarding/login");
        return;
      }
      
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
    try {
      const res = await dispatch(
        getcommentsByPostId({
          inputParams: { idPost: params.postId as string },
        })
      ).unwrap();
      if (currentPostId === params.postId) {
        setPostCommentsList(res.data);
      }
    } catch (error: any) {
      // Verificar si el error es de autenticación
      if (error.response?.status === 401) {
        showToast("Tu sesión ha expirado. Inicia sesión nuevamente", {
          type: "danger",
        });
        router.replace("/(drawer)/onBoarding/login");
        return;
      }
      
      showToast(
        error.response?.data?.error ?? "Error al obtener los comentarios",
        {
          type: "danger",
        }
      );
    }
  };

  const handleCommentPress = () => {
    // Verificar autenticación antes de ir a comentar
    if (!userInfo?.token) {
      showToast("Debes iniciar sesión para comentar", {
        type: "warning",
      });
      router.replace("/(drawer)/onBoarding/login");
      return;
    }
    router.push({
      pathname: "/(drawer)/post/makeComment",
      params: {
        postId: params.postId as string,
        name: params.name as string,
      },
    });
  };

  // Mostrar loading mientras verifica autenticación
  if (isCheckingAuth || !postDetailInfo || currentPostId !== params.postId) {
    return (
      <SafeView topSafe bottomSafe>
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
        }}>
          <ActivityIndicator size="large" color={appColors.primary} />
          <ThemedText style={{
            marginTop: 20,
            textAlign: "center",
            color: appColors.grayText,
          }}>
            Cargando información...
          </ThemedText>
        </View>
      </SafeView>
    );
  }

  const renderItem = ({ item, index }: { item: IComment; index: number }) => {
    return (
      <>
        {index === 0 && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <ThemedText type="subtitle" style={{ color: appColors.text }}>
              Comentarios ({postCommentsList.length})
            </ThemedText>
          </View>
        )}
        <View
          style={{
            borderWidth: 1,
            borderColor: "rgba(89, 105, 140, 0.7)",
            borderRadius: 7,
            paddingHorizontal: 15,
            paddingTop: 5,
            marginTop: 20,
            paddingBottom: 15,
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
            <ThemedText style={{ color: appColors.grayText }}>
              {item.content}
            </ThemedText>
          </View>
        </View>
      </>
    );
  };

  const renderEmptyComments = () => (
    <View style={{
      alignItems: 'center',
      paddingVertical: 40,
      marginTop: 30,
    }}>
      <IconComment width={40} height={40} />
      <ThemedText style={{
        color: appColors.grayText,
        textAlign: 'center',
        marginTop: 15,
        fontSize: 16,
      }}>
        Sé el primero en comentar
      </ThemedText>
      <ThemedText style={{
        color: appColors.grayText,
        textAlign: 'center',
        marginTop: 5,
        fontSize: 14,
      }}>
        Comparte tu experiencia y ayuda a otros
      </ThemedText>
    </View>
  );

  return (
    <SafeView topSafe bottomSafe>
      <View key={2} style={{ flex: 1, marginTop: "15%" }}>
        <FlatList
          ListHeaderComponent={
            <View key={0} style={{ flex: 1 }}>
              <ThemedText type="title" style={{ marginBottom: 15 }}>
                {postDetailInfo?.title}
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
                </View>
              </View>
              <ThemedText>{postDetailInfo?.content}</ThemedText>
            </View>
          }
          data={postCommentsList}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={renderEmptyComments}
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingBottom: 100,
            marginTop: 30,
          }}
          showsVerticalScrollIndicator={false}
        />
        
        <ButtonThemed
          onPress={handleCommentPress}
          style={{
            position: "absolute",
            bottom: 25,
            alignSelf: "center",
            width: "90%",
          }}
          text={postCommentsList.length > 0 ? "Agregar comentario" : "Comentar"}
          loading={loading}
          disabled={loading}
        />
      </View>
    </SafeView>
  );
};

export default PostDetail;