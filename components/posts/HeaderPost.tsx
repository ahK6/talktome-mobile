import { View, StyleSheet, ScrollView } from "react-native";
import TabButtonTop from "./HeadrButton";
import { appColors } from "@/constants/Colors";

const TabBarPost = (props) => {
  return (
    <View style={[styles.tabBar, props.containerStyle]}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        bounces={false}
        contentContainerStyle={{
          paddingHorizontal: 10,
          width: "100%",
          paddingTop: 10,
        }}
      >
        <TabButtonTop
          text="Detalles"
          onPress={() => {
            props.refPagerView.current.setPage(0);
          }}
          focused={props.selectedTab === 0}
          style={{ width: "33.33%" }}
          contentStyle={styles.contentStyles}
        />
        <TabButtonTop
          text="Comentarios"
          onPress={() => {
            props.refPagerView.current.setPage(1);
          }}
          focused={props.selectedTab === 1}
          style={{
            width: "33.33%",
          }}
          contentStyle={styles.contentStyles}
        />
      </ScrollView>
    </View>
  );
};

export default TabBarPost;

const styles = StyleSheet.create({
  tabBar: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    backgroundColor: appColors.white,
  },
  contentStyles: {
    justifyContent: "center",
    height: 45,
    paddingBottom: 5,
  },
});
