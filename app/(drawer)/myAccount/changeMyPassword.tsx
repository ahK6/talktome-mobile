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
import { appColors } from "@/constants/Colors";
import { updateUserInfo } from "@/store/onBoarding/onBoarding.actions";
import { changePasswordValidation } from "@/utils/axios/validators/changePassword";

interface IChangePasswordParams {
    newPassword: string;
    confirmPassword: string;
}

export default function ChangeMyPassword() {
    const dispatch: AppDispatch = useDispatch();
    const navigation = useNavigation();

    const { control, handleSubmit, watch, reset } = useForm({
        resolver: yupResolver(changePasswordValidation),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    });

    const [loading, setLoading] = useState(false);
    const [keyboardOpen, setKeyboardOpen] = useState<boolean>(false);
    const [showPasswords, setShowPasswords] = useState<boolean>(false);

    const watchedValues = watch();
    const hasValues =
        watchedValues.newPassword && watchedValues.confirmPassword;

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

    const onSubmit: SubmitHandler<IChangePasswordParams> = async (formData) => {
        if (loading) return;

        Alert.alert(
            "Cambiar contraseña",
            "¿Estás seguro de que quieres cambiar tu contraseña?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Cambiar",
                    style: "default",
                    onPress: async () => {
                        setLoading(true);
                        try {
                            await dispatch(
                                updateUserInfo({
                                    inputParams: {
                                        password: formData.newPassword,
                                    },
                                })
                            ).unwrap();

                            showToast("Contraseña actualizada correctamente", {
                                type: "success",
                            });

                            // Limpiar el formulario
                            reset();

                            // Navegar hacia atrás
                            navigation.goBack();
                        } catch (error: any) {
                            showToast(
                                error.response?.data?.message ||
                                    error.message ||
                                    "Error al actualizar la contraseña",
                                {
                                    type: "danger",
                                }
                            );
                        } finally {
                            setLoading(false);
                        }
                    },
                },
            ]
        );
    };

    const handleClearForm = () => {
        Alert.alert(
            "Limpiar formulario",
            "¿Estás seguro de que quieres limpiar el formulario?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Limpiar",
                    style: "destructive",
                    onPress: () => {
                        reset();
                        showToast("Formulario limpiado", { type: "warning" });
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
                        Cambiar Contraseña
                    </ThemedText>

                    <ThemedText
                        type="subtitle"
                        style={{
                            marginBottom: 20,
                            opacity: 0.7,
                        }}
                    >
                        Introduce tu nueva contraseña de forma segura
                    </ThemedText>

                    <Controller
                        name="newPassword"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextInputThemed
                                label="Nueva Contraseña"
                                value={field.value}
                                onChangeText={(text) => field.onChange(text)}
                                errorMessage={fieldState?.error?.message}
                                placeholder="Introduce tu nueva contraseña"
                                containerStyle={{ marginBottom: 15 }}
                                secureTextEntry={!showPasswords}
                                rightIcon={showPasswords ? "eye-off" : "eye"}
                                onRightIconPress={() =>
                                    setShowPasswords(!showPasswords)
                                }
                            />
                        )}
                    />

                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextInputThemed
                                label="Confirmar Nueva Contraseña"
                                value={field.value}
                                onChangeText={(text) => field.onChange(text)}
                                errorMessage={fieldState?.error?.message}
                                placeholder="Confirma tu nueva contraseña"
                                containerStyle={{ marginBottom: 15 }}
                                secureTextEntry={!showPasswords}
                                rightIcon={showPasswords ? "eye-off" : "eye"}
                                onRightIconPress={() =>
                                    setShowPasswords(!showPasswords)
                                }
                            />
                        )}
                    />

                    <ThemedText
                        style={{
                            fontSize: 12,
                            opacity: 0.6,
                            marginBottom: 20,
                            lineHeight: 18,
                        }}
                    >
                        La contraseña debe contener al menos 8 caracteres.
                    </ThemedText>

                    {hasValues && (
                        <ButtonThemed
                            style={{
                                marginTop: 10,
                                backgroundColor: "transparent",
                                borderWidth: 1,
                                borderColor: appColors.primary,
                            }}
                            textStyles={{ color: appColors.primary }}
                            text="Limpiar formulario"
                            onPress={handleClearForm}
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
                            opacity: hasValues ? 1 : 0.5,
                            backgroundColor: hasValues
                                ? appColors.primary
                                : appColors.lightGray,
                        }}
                        text="Cambiar Contraseña"
                        onPress={handleSubmit(onSubmit)}
                        loading={loading}
                        disabled={!hasValues}
                    />
                )}
            </KeyboardAwareScrollView>
        </SafeView>
    );
}
