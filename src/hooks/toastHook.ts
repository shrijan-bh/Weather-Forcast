import { toast } from "react-toastify";

export const toastHook = ({
  message,
  type,
}: {
  message: string;
  type: string;
}) => {
  if (type === "warning") {
    toast.warning(message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
  }
};
