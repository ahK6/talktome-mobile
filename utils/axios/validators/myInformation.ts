import * as yup from "yup";

export const updateInfoValidation = yup.object().shape({
    nickName: yup
        .string()
        .required("El campo es requerido")
        .min(4, "Debe tener al menos 4 caracteres"),
    email: yup
        .string()
        .required("El email es requerido")
        .email("Introduce un email válido"),
});