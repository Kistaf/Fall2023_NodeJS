import { toast } from "@zerodevx/svelte-toast";

export const successToast = (msg: string) => {
  return toast.push(msg, {
    theme: {
      "--toastBackground": "green",
      "--toastColor": "white",
      "--toastBarBackground": "olive",
    },
  });
};

export const warningToast = (msg: string) => {
  return toast.push(msg, {
    theme: {
      "--toastBackground": "orange",
      "--toastColor": "white",
      "--toastBarBackground": "yellow",
    },
  });
};

export const errorToast = (msg: string) => {
  return toast.push(msg, {
    theme: {
      "--toastBackground": "red",
      "--toastColor": "white",
      "--toastBarBackground": "gray",
    },
  });
};
