import { Toast } from "react-native-toast-notifications";

export const showToast = (
  text: string,
  options?: {
    type?: "success" | "warning" | "danger";
    placement?: "center" | "bottom" | "top";
  }
) => {
  const { type = "success", placement = "bottom" } = options || {};

  Toast.hideAll();

  Toast.show(text, {
    type,
    placement,
  });
};
