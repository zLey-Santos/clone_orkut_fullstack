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
  first_name: "",
  last_name: "",
  email: "",
  password: ""
};

export function SignUpRoute() {
  const [form, setForm] = useState(initialForm);
  const navigate = useNavigate();
  const { setIsAuthorized, setUser } = useGlobalStore();

  const handleChange = (field, value) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
  };

  const submitForm = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post("/auth/sign-up", form);

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
        toast(`Seja bem-vinde, ${user.first_name}! Sua conta foi criada com sucesso!`);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast("Erro ao criar a conta. Por favor, tente novamente.", {
        render(message) {
          return <div className="p-2 rounded-md text-gray-100 bg-red-500">{message}</div>;
        }
      });
    }
  };

  return (
    <div className="flex align-center justify-center w-full">
      <Card>
        <h2 className="text-center text-2xl mb-3">Criar conta</h2>
        <form onSubmit={submitForm} className="flex flex-col gap-2 w-full">
          <TextField
            value={form.first_name}
            onChange={(value) => handleChange("first_name", value)}
            defaultText="Nome"
          />
          <TextField
            value={form.last_name}
            onChange={(value) => handleChange("last_name", value)}
            defaultText="Sobrenome"
          />
          <TextField value={form.email} onChange={(value) => handleChange("email", value)} defaultText="Email" />

          <PasswordField
            type="password"
            defaultText={"Senha"}
            value={form.password}
            onChange={(value) => handleChange("password", value)}
          />
          <Button type="submit" typeClass="submit">
            Enviar
          </Button>
        </form>
      </Card>
    </div>
  );
}
