import React from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { router } from "expo-router";
import dayjs from "dayjs";
import { ThemedText } from "@/components/shared/ThemedText";
import CategoryItem from "@/components/shared/CategoryItem";
import { appColors } from "@/constants/Colors";
import { IPost } from "@/store/posts/posts.types";
import IconMessage from "@/assets/images/icons/iconMessages.svg";
import UserCircle from "@/assets/images/icons/userCircle.svg";
import IconClock from "@/assets/images/icons/iconClock.svg";
import IconComment from "@/assets/images/icons/iconComment.svg";
import IconMessageCheckSecondary from "@/assets/images/icons/iconMessageCheckSecondary.svg";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface PostItemProps {
    item: IPost;
    type?: 'help' | 'testimony';
}

export const PostItem: React.FC<PostItemProps> = ({ item, type }) => {
    return (
        <TouchableOpacity
            style={{
                height: "auto",
                borderWidth: 1,
                borderColor: "rgba(89, 105, 140, 0.7)",
                borderRadius: 7,
                paddingHorizontal: 15,
                paddingTop: 20,
                marginTop: 20,
            }}
            onPress={() => {
                router.navigate({
                    pathname: "/(drawer)/post/postDetail",
                    params: {
                        postId: item._id,
                        name: item.title,
                    },
                });
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
                        backgroundColor: type === "help" ? "rgba(240, 90, 126, 0.1)" : "rgba(11, 132, 148, 0.1)",
                        height: 40,
                        width: 40,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 5,
                        position: "absolute",
                    }}
                >
                    {type === "help" ? <IconMessage width={25} height={25} /> : <IconMessageCheckSecondary width={25} height={25} />}
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
                <ThemedText
                    style={{ color: appColors.grayText }}
                    numberOfLines={5}
                >
                    {item.content}
                </ThemedText>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {item.keywords?.map((keyword, index) => (
                    <CategoryItem
                        key={`${item._id}-${keyword}-${index}`}
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
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
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
        </TouchableOpacity>
    );
};
