import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";
import { api } from "../api";
import { TokenStorage } from "../tokenStorage";
import { useGlobalStore } from "../useGlobalStore";
import { PasswordField } from "../components/PasswordField";

const initialForm = {
  email: "",
  password: ""
};

export function SignInRoute() {
  const [form, setForm] = useState(initialForm);
  const navigate = useNavigate();
  const { setIsAuthorized, setUser } = useGlobalStore();

  const handleChange = (field, value) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
  };

  const submitForm = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post("/auth/sign-in", form);

      if (response) {
        const { token, user } = response.data;
        TokenStorage.setToken(token);
        setIsAuthorized(true);
        setUser({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          avatar: user.avatar
        });
        navigate("/usuario");
        toast(`Olá novamente, ${user.first_name}!`);
      }
    } catch (error) {
      console.error("Error signing in:", error);
      toast("Erro ao entrar. Por favor, verifique suas credenciais e tente novamente.", {
        render(message) {
          return <div className="p-2 rounded-md text-gray-100 bg-red-500">{message}</div>;
        }
      });
    }
  };

  return (
    <div className="flex align-center justify-center w-full">
      <Card>
        <h2 className="text-center text-2xl mb-3">Entrar na sua conta</h2>
        <form onSubmit={submitForm} className="flex flex-col gap-2 w-full">
          <TextField value={form.email} onChange={(value) => handleChange("email", value)} defaultText="Email" />
          <PasswordField
            type="password"
            defaultText={"Senha"}
            value={form.password}
            onChange={(value) => handleChange("password", value)}
          />
          <Button type="submit" typeClass="submit">
            Entrar
          </Button>
        </form>
      </Card>
    </div>
  );
}
