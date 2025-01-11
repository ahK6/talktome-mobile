import * as yup from "yup";

export const loginValidation = yup.object().shape({
  email: yup.string().required("El campo es requerido"),
  password: yup.string().required("El campo es requerido"),
});

export const signUpValidation = yup.object().shape({
  email: yup
    .string()
    .email("Por favor, introduce un correo electrónico válido.")
    .required("El campo es requerido"),
  nickName: yup
    .string()
    .required("El campo es requerido")
    .min(4, "Debe tener al menos 4 caracteres"),
  password: yup
    .string()
    .required("Este campo es requerido")
    .min(8, "Debe tener al menos 8 caracteres"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas deben coincidir")
    .required("Este campo es requerido"),
});
