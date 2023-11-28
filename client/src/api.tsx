import axios from "axios";
import toast from "react-simple-toasts";
import { TokenStorage } from "./tokenStorage";
import { globalNavigate } from "./globalNavigate";
import { useGlobalStore } from "./useGlobalStore";

const { setIsLoading, setUser } = useGlobalStore.getState();

const showErrorToast = (message) => {
  toast(message, {
    render(message) {
      return <div className="p-2 rounded-md text-gray-100 bg-red-500">{message}</div>;
    }
  });
};

export const api = axios.create({
  baseURL: "http://localhost:9000"
});

api.interceptors.request.use((config) => {
  setIsLoading(true);
  const token = TokenStorage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (config) => {
    setIsLoading(false);
    return config;
  },
  (error) => {
    setIsLoading(false);
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        const token = TokenStorage.getToken();
        if (token) {
          TokenStorage.removeToken();
          setUser({
            id: 0,
            first_name: "",
            last_name: "",
            email: "",
            avatar: ""
          });
          showErrorToast("Sua sessão expirou. Por favor, entre novamente.");
          globalNavigate.navigate("/entrar");
          return Promise.resolve(); // Evita que o erro seja propagado
        }
      }

      if (status >= 400) {
        if (error.response.data.errors) {
          const errors = error.response.data.errors.map((issue) => Object.values(issue.constraints).at(0));
          errors.forEach(showErrorToast);
        } else if (error.response.data.message) {
          showErrorToast(error.response.data.message);
        } else {
          showErrorToast("Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.");
        }
      }
    }

    return Promise.reject(error);
  }
);
