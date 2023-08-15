import { toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";

injectStyle();

export const notify = (message: string, configs?: Record<string, unknown>) =>
  toast(message, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
    theme: "dark",
    ...configs,
  });
