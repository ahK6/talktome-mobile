import SafeView from "@/components/shared/SafeView";
import React, { useEffect, useState } from "react";
import { Keyboard, ScrollView, Text } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { signUpValidation } from "@/utils/axios/validators/onBoarding";
import { ICreateAccountParams } from "@/store/onBoarding/onBoarding.types";
import { createAccount } from "@/store/onBoarding/onBoarding.actions";
import { showToast } from "@/components/shared/notifications/toast";
import { router } from "expo-router";
import TextInputThemed from "@/components/shared/ThemedInput";
import { ThemedText } from "@/components/shared/ThemedText";
import ButtonThemed from "@/components/shared/ThemedButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function CreateAccount() {
  const dispatch: AppDispatch = useDispatch();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(signUpValidation),
  });

  const [loading, setLoading] = useState(false);

  const [keyboardOpen, setKeyboardOpen] = useState<boolean>(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardOpen(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardOpen(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const onSubmit: SubmitHandler<any> = async (fData: ICreateAccountParams) => {
    if (loading) return;
    setLoading(true);
    try {
      await dispatch(
        createAccount({
          inputParams: {
            email: fData.email,
            nickName: fData.nickName,
            password: fData.password,
          },
        })
      ).unwrap();

      showToast("Cuenta creada", {
        type: "success",
      });

      router.navigate("/(drawer)");
    } catch (error: any) {
      showToast(error.response?.data?.error ?? "Error al crear la cuenta", {
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeView topSafe bottomSafe>
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 15,
            marginTop: 75,
            flex: 1,
          }}
        >
          <ThemedText type="title" style={{ marginBottom: 15 }}>
            Crear cuenta
          </ThemedText>
          <Controller
            name="nickName"
            control={control}
            render={({ field, fieldState }) => (
              <TextInputThemed
                label="Introduce un apodo"
                value={field.value?.toString()}
                onChangeText={(text) => field.onChange(text)}
                errorMessage={fieldState?.error?.message}
                placeholder="EJ: Juanito2255"
                containerStyle={{ marginBottom: 15 }}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <TextInputThemed
                label="Email"
                value={field.value?.toString()}
                onChangeText={(text) => field.onChange(text)}
                errorMessage={fieldState?.error?.message}
                placeholder="ejemplo@ejemplo.com"
                containerStyle={{ marginBottom: 15 }}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <TextInputThemed
                label="Contraseña"
                value={field.value?.toString()}
                onChangeText={(text) => field.onChange(text)}
                errorMessage={fieldState?.error?.message}
                containerStyle={{ marginBottom: 15 }}
                placeholder="Introduce una contraseña"
                secureTextEntry
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field, fieldState }) => (
              <TextInputThemed
                label="Repetir contraseña"
                value={field.value?.toString()}
                onChangeText={(text) => field.onChange(text)}
                errorMessage={fieldState?.error?.message}
                placeholder="Repite la contraseña"
                secureTextEntry
              />
            )}
          />
        </ScrollView>
        {keyboardOpen === false && (
          <ButtonThemed
            style={{
              position: "absolute",
              bottom: 20,
              alignSelf: "center",
              width: "90%",
            }}
            text="Publicar"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
          />
        )}
      </KeyboardAwareScrollView>
    </SafeView>
  );
}
