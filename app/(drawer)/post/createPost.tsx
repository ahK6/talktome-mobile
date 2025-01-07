import SafeView from "@/components/shared/SafeView";
import ButtonThemed from "@/components/shared/ThemedButton";
import TextInputThemed from "@/components/shared/ThemedInput";
import DropDownPicker from "react-native-dropdown-picker";
import { appColors } from "@/constants/Colors";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function TabTwoScreen() {
  const { keywords } = useSelector((state: RootState) => state.posts);

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState([]);

  return (
    <SafeView topSafe bottomSafe avoidKeyboard>
      <View
        style={{
          paddingHorizontal: 15,
          marginTop: 60,
          flex: 1,
        }}
      >
        <TextInputThemed label="Título" placeholder="Título" />
        <TextInputThemed
          label="Describe tu situación"
          placeholder="Escribe todos los detalles"
          multiline={true}
          numberOfLines={11}
          containerStyle={{ height: 200, marginTop: 15 }}
          inputStyle={{
            height: 200,
            backgroundColor: appColors.lightBlue,
            textAlignVertical: "top",
          }}
        />
        <View style={{ marginTop: 50 }}>
          <DropDownPicker
            open={open}
            value={values}
            items={keywords.map((keyword) => {
              return { value: keyword.value, label: keyword.value };
            })}
            setOpen={setOpen}
            setValue={setValues}
            multiple={true}
            mode="BADGE"
            badgeDotColors={[appColors.primary]}
            placeholder="Selecciona almenos una categoría"
            style={{
              borderWidth: 0.8,
              borderColor: appColors.softBlue,
              backgroundColor: appColors.lightBlue,
            }}
            max={3}
            dropDownContainerStyle={{
              borderWidth: 1,
              borderColor: appColors.softBlue,
            }}
          />
        </View>

        <ButtonThemed
          style={{
            position: "absolute",
            bottom: 20,
            alignSelf: "center",
            width: "90%",
          }}
          text="Publicar"
          onPress={() => {}}
        />
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
