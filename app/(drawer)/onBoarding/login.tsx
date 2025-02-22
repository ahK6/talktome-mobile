import { showToast } from "@/components/shared/notifications/toast";
import SafeView from "@/components/shared/SafeView";
import ButtonThemed from "@/components/shared/ThemedButton";
import TextInputThemed from "@/components/shared/ThemedInput";
import { ThemedText } from "@/components/shared/ThemedText";
import { appColors } from "@/constants/Colors";
import { login } from "@/store/onBoarding/onBoarding.actions";
import { IOnBoardingUserParams } from "@/store/onBoarding/onBoarding.types";
import { AppDispatch, RootState } from "@/store/store";
import { loginValidation } from "@/utils/axios/validators/onBoarding";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch: AppDispatch = useDispatch();

  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(loginValidation),
  });

  const [loading, setLoading] = useState(false);

  const { userInfo } = useSelector((state: RootState) => state.onBoarding);

  useEffect(() => {
    console.log("wflkjwelkfwekflj " + JSON.stringify(userInfo));
  }, [userInfo]);

  const onSubmit: SubmitHandler<any> = async (fData: IOnBoardingUserParams) => {
    if (loading) return;
    setLoading(true);
    try {
      await dispatch(
        login({
          inputParams: { email: fData.email, password: fData.password },
          shouldStoreOutputState: true,
        })
      ).unwrap();

      showToast("Sesión iniciada", {
        type: "success",
      });
      setValue("email", "");
      setValue("password", "");
      router.replace("/(drawer)/");
    } catch (error: any) {
      showToast(error.response?.data?.error ?? "Error al iniciar sesión", {
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeView topSafe bottomSafe>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          marginTop: 75,
          flex: 1,
        }}
      >
        <ThemedText type="title" style={{ marginBottom: 15 }}>
          Iniciar sesión
        </ThemedText>

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
              placeholder="Introduce tu contraseña"
              containerStyle={{ marginBottom: 15 }}
              secureTextEntry
            />
          )}
        />

        <ThemedText
          style={{
            textAlign: "right",
            marginBottom: 15,
            color: appColors.primary,
            textDecorationLine: "underline",
          }}
        >
          Olvidé mi contraseña
        </ThemedText>

        <ButtonThemed
          text="Continuar"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
        />
        <ThemedText
          style={{
            textAlign: "center",
            marginTop: 15,
          }}
        >
          No tienes cuenta?{" "}
          <ThemedText
            onPress={() => router.replace("/(drawer)/onBoarding/createAccount")}
            style={{
              textAlign: "center",
              marginTop: 15,
              color: appColors.primary,
              textDecorationLine: "underline",
              fontWeight: "bold",
            }}
          >
            Regístrate aqui
          </ThemedText>
        </ThemedText>
      </ScrollView>
    </SafeView>
  );
};

export default Login;
