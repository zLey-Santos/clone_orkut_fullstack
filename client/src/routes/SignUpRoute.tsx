import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { useState } from "react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";
import { api } from "../api";
import { TokenStorage } from "../tokenStorage";
import { useGlobalStore } from "../useGlobalStore";

const initialForm = {
  first_name: "",
  last_name: "",
  email: "",
  password: ""
};

export function SignUpRoute() {
  const [form, setForm] = useState(initialForm);
  const navigate = useNavigate();
  const setIsAuthorized = useGlobalStore((state) => state.setIsAuthorized);
  const setUser = useGlobalStore((state) => state.setUser);

  async function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await api.post("/auth/sign-up", form);
    if (response === undefined) {
      return;
    }
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

  return (
    <div className="flex align-center justify-center w-full">
      <Card>
        <h2 className="text-center text-2xl mb-3">Criar conta</h2>
        <form onSubmit={submitForm} className="flex flex-col gap-2 w-full">
          <TextField
            value={form.first_name}
            onChange={(first_name) => setForm({ ...form, first_name })}
            defaultText="Nome"
          />
          <TextField
            value={form.last_name}
            onChange={(last_name) => setForm({ ...form, last_name })}
            defaultText="Sobrenome"
          />
          <TextField value={form.email} onChange={(email) => setForm({ ...form, email })} defaultText="Email" />
          <TextField
            value={form.password}
            onChange={(password) => setForm({ ...form, password })}
            defaultText="Senha"
            type="password"
          />
          <Button type="submit">Enviar</Button>
        </form>
      </Card>
    </div>
  );
}
