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

    try {
      const response = await api.post("/auth/sign-up", form);

      // Verifica se a resposta não é undefined e se a propriedade 'data' está presente na resposta
      if (response && response.data) {
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
        navigate("/user");
        toast(`Seja bem-vindo, ${user.first_name}! Sua conta foi criada com sucesso!`);
      } else {
        // Se a resposta não tiver 'data', pode ser tratado como um erro de login
        toast("Erro ao criar conta. Verifique suas informações e tente novamente.");
      }
    } catch (error) {
      // Lidar com erros durante a solicitação
      console.error("Erro durante a solicitação:", error);
      toast("Erro ao criar conta. Tente novamente mais tarde.");
    }
  }

  return (
    <div className="flex align-center justify-center w-full">
      <Card>
        <h2 className="text-center text-2xl mb-3">Criar conta</h2>
        <form onSubmit={submitForm} className="flex flex-col gap-2 w-full">
          <TextField
            value={form.first_name}
            whenChanges={(first_name) => setForm({ ...form, first_name })}
            defaultText="Nome"
          />
          <TextField
            value={form.last_name}
            whenChanges={(last_name) => setForm({ ...form, last_name })}
            defaultText="Sobrenome"
          />
          <TextField value={form.email} whenChanges={(email) => setForm({ ...form, email })} defaultText="Email" />
          <TextField
            value={form.password}
            whenChanges={(password) => setForm({ ...form, password })}
            defaultText="Senha"
            type="password"
          />
          <Button type="submit" typeClass="logout">
            Enviar
          </Button>
        </form>
      </Card>
    </div>
  );
}
