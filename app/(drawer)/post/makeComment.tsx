import React, { useRef, useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { appColors } from "@/constants/Colors";
import IconSend from "@/assets/images/icons/iconSend.svg";
import TextInputThemed from "@/components/shared/ThemedInput";
import SafeView from "@/components/shared/SafeView";
import { ThemedText } from "@/components/shared/ThemedText";
import ButtonThemed from "@/components/shared/ThemedButton";
import { router, useLocalSearchParams } from "expo-router";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { showToast } from "@/components/shared/notifications/toast";
import { postComment } from "@/store/posts/posts.actions";

const CommentInput: React.FC = () => {
  const params = useLocalSearchParams();

  console.log("xddd " + JSON.stringify(params, null, 2));

  const dispatch: AppDispatch = useDispatch();

  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputHeight, setInputHeight] = useState(100);

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
      router.navigate({
        pathname: "/(drawer)/post/postDetail",
        params: {
          postId: params.postId as string,
        },
      });
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

  return (
    <SafeView topSafe bottomSafe>
      <View
        style={{
          borderTopWidth: 0.3,
          borderColor: appColors.secondary,
          flex: 1,
        }}
      >
        <View style={{ flex: 1, marginTop: "20%" }}>
          <ThemedText type="title" style={{ marginBottom: 15, marginLeft: 15 }}>
            Escribe un comentario
          </ThemedText>
          <TextInputThemed
            value={commentText}
            onChangeText={(value) => {
              setCommentText(value);
            }}
            placeholder="Escribe tu comentario aquí..."
            inputStyle={{
              borderRadius: 0,
              borderWidth: 0,
              height: inputHeight,
              maxHeight: "80%",
              textAlignVertical: "top",
              marginHorizontal: 15,
            }}
            numberOfLines={50}
            multiline={true}
            onContentSizeChange={(event) => {
              setInputHeight(event.nativeEvent.contentSize.height + 20);
            }}
          />
          <ButtonThemed
            onPress={makeComment}
            style={{
              position: "absolute",
              bottom: 10,
              alignSelf: "center",
              width: "90%",
            }}
            text="Responder"
            loading={loading}
          />
        </View>
      </View>
    </SafeView>
  );
};

export default CommentInput;
