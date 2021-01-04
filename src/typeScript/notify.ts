import { reactive } from 'vue'

export default function alert() {

  const alertObject = reactive({
    error: "",
    warning: "",
    info: "",
    success: ""
  });

  const notify = (type: string, message: string): void => {
    if (type === "error") {
      alertObject.error = message;
    } else {
      alertObject.warning = message;
    }
  };

  return { alertObject, notify };
};
