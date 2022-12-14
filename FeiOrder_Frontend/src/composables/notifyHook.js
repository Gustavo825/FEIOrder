import { useQuasar } from "quasar";
export const useNotify = () => {
  const $q = useQuasar();
  const showNotify = (message, color = "negative", icon = "report_problem") => {
    $q.notify({
      message,
      color,
      icon: icon && null,
      timeout: 400,
    });
  };
  return { showNotify };
};
