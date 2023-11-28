import { useState, useEffect } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import toast from "react-simple-toasts";
import { Helmet } from "react-helmet";
import { Button } from "../components/Button";
import { ErrorMessage } from "../components/ErrorMessage";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Card } from "../components/Card";
import { TextField } from "../components/TextField";
import { api } from "../api";
import { useGlobalStore } from "../useGlobalStore";

export function UpdateProfileRoute() {
  const navigate = useNavigate();
  const user = useGlobalStore((state) => state.user);
  const setUser = useGlobalStore((state) => state.setUser);

  const [name, setName] = useState(user.first_name);
  const [surname, setSurname] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setName(user.first_name);
    setSurname(user.last_name);
    setEmail(user.email);
  }, [user]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if ((password || confirmPassword) && password !== confirmPassword) {
      toast("As senhas são diferentes", {
        render(message) {
          return <div className="p-2 rounded-md text-gray-100 bg-red-500">{message}</div>;
        }
      });
      return;
    }

    const user = {
      first_name: name,
      last_name: surname,
      email,
      password: password || undefined
    };

    const response = await api.patch("/users/update-myself", user);
    if (response !== undefined) {
      setUser(response.data);
      toast("Perfil alterado com sucesso!");
      navigate("/usuario");
    }
  }

  return (
    <Card>
      <Helmet>
        <title>Atualizar perfil</title>
      </Helmet>
      <Breadcrumbs
        links={[
          { href: "/usuario", label: "Usuário" },
          {
            href: "/atualizar-perfil",
            label: "Atualizar perfil"
          }
        ]}
      />
      <form className="flex flex-col gap-2" noValidate onSubmit={onSubmit}>
        <h1 className="text-center font-bold text-2xl">Atualizar perfil</h1>
        <TextField value={name} onChange={setName} defaultText="Nome" />
        <TextField value={surname} onChange={setSurname} defaultText="Sobrenome" />
        <TextField value={email} type="email" onChange={setEmail} defaultText="Email" />

        <Button type="submit">Enviar</Button>
        <h2 className="font-bold text-xl mt-4">Segurança (atualizar senha)</h2>
        <TextField value={password} type="password" onChange={setPassword} defaultText="Senha" />
        <TextField
          value={confirmPassword}
          type="password"
          onChange={setConfirmPassword}
          defaultText="Confirmar senha"
        />
        <Button type="submit">Alterar agora</Button>
      </form>
    </Card>
  );
}
