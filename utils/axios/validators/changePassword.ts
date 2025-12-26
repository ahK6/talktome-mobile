import * as yup from "yup";

export const changePasswordValidation = yup.object().shape({
  newPassword: yup
    .string()
    .required("La nueva contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  confirmPassword: yup
    .string()
    .required("Confirma tu nueva contraseña")
    .oneOf([yup.ref("newPassword")], "Las contraseñas no coinciden"),
});