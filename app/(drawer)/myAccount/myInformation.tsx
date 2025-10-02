import SafeView from "@/components/shared/SafeView";
import React, { useEffect, useState } from "react";
import { Keyboard, ScrollView, Alert } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "@/components/shared/notifications/toast";
import { useNavigation } from "expo-router";
import TextInputThemed from "@/components/shared/ThemedInput";
import { ThemedText } from "@/components/shared/ThemedText";
import ButtonThemed from "@/components/shared/ThemedButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as yup from "yup";
import { appColors } from "@/constants/Colors";
import { updateInfoValidation } from "@/utils/axios/validators/myInformation";
import { updateUserInfo } from "@/store/onBoarding/onBoarding.actions";

interface IUpdateInfoParams {
    nickName: string;
    email: string;
}

export default function MyInformation() {
    const dispatch: AppDispatch = useDispatch();
    const navigation = useNavigation();
    const { userInfo } = useSelector((state: RootState) => state.onBoarding);

    const { control, handleSubmit, setValue, watch } = useForm({
        resolver: yupResolver(updateInfoValidation),
        defaultValues: {
            nickName: userInfo?.userInformation?.username || "",
            email: userInfo?.userInformation?.email || "",
        },
    });

    const [loading, setLoading] = useState(false);
    const [keyboardOpen, setKeyboardOpen] = useState<boolean>(false);
    const [hasChanges, setHasChanges] = useState<boolean>(false);

    // initial values
    const initialValues = {
        nickName: userInfo?.userInformation?.username || "",
        email: userInfo?.userInformation?.email || "",
    };

    // Watch for changes in the fields
    const watchedValues = watch();

    useEffect(() => {
        // Check for changes
        const changed =
            watchedValues.nickName !== initialValues.nickName ||
            watchedValues.email !== initialValues.email;
        setHasChanges(changed);
    }, [watchedValues, initialValues]);

    useEffect(() => {
        // Set initial values when the component loads
        if (userInfo?.userInformation) {
            setValue("nickName", userInfo.userInformation.username || "");
            setValue("email", userInfo.userInformation.email || "");
        }
    }, [userInfo, setValue]);

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

    const onSubmit: SubmitHandler<IUpdateInfoParams> = async (formData) => {
        if (loading) return;

        if (!hasChanges) {
            showToast("No hay cambios para guardar", {
                type: "warning",
            });
            return;
        }

        setLoading(true);
        try {
            // TODO: Aquí irá la acción para actualizar la información del usuario
            await dispatch(updateUserInfo({
              inputParams: {
                nickName: formData.nickName,
                email: formData.email,
              },
            })).unwrap();

            showToast("Información actualizada correctamente", {
                type: "success",
            });

            // Opcional: navegar hacia atrás
            navigation.goBack();
        } catch (error: any) {
            showToast(
                error.response?.data?.message ||
                    error.message ||
                    "Error al actualizar la información",
                {
                    type: "danger",
                }
            );
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        Alert.alert(
            "Restablecer cambios",
            "¿Estás seguro de que quieres descartar los cambios?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Restablecer",
                    style: "destructive",
                    onPress: () => {
                        setValue("nickName", initialValues.nickName);
                        setValue("email", initialValues.email);
                        showToast("Cambios descartados", { type: "warning" });
                    },
                },
            ]
        );
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
                        Mi Información
                    </ThemedText>

                    <ThemedText
                        type="subtitle"
                        style={{
                            marginBottom: 20,
                            opacity: 0.7,
                        }}
                    >
                        Actualiza tu información personal
                    </ThemedText>

                    <Controller
                        name="nickName"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextInputThemed
                                label="Apodo"
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
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        )}
                    />

                    {hasChanges && (
                        <ButtonThemed
                            style={{
                                marginTop: 10,
                                backgroundColor: "transparent",
                                borderWidth: 1,
                                borderColor: appColors.primary,
                            }}
                            textStyles={{ color: appColors.primary }}
                            text="Descartar cambios"
                            onPress={handleReset}
                        />
                    )}
                </ScrollView>

                {keyboardOpen === false && (
                    <ButtonThemed
                        style={{
                            position: "absolute",
                            bottom: 20,
                            alignSelf: "center",
                            width: "90%",
                            opacity: hasChanges ? 1 : 0.5,
                        }}
                        text={hasChanges ? "Guardar cambios" : "Sin cambios"}
                        onPress={handleSubmit(onSubmit)}
                        loading={loading}
                        disabled={!hasChanges}
                    />
                )}
            </KeyboardAwareScrollView>
        </SafeView>
    );
}
