import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { Helmet } from "react-helmet";
import { Button } from "../components/Button";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Card } from "../components/Card";
import { TextField } from "../components/TextField";
import { api } from "../api";
import { useGlobalStore } from "../useGlobalStore";
import { PasswordField } from "../components/PasswordField";

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

  async function onSubmit(event) {
    event.preventDefault();

    if ((password || confirmPassword) && password !== confirmPassword) {
      toast("As senhas são diferentes", {
        render(message) {
          return <div className="p-2 rounded-md text-gray-100 bg-red-500">{message}</div>;
        }
      });
      return;
    }

    const updatedUser = {
      first_name: name,
      last_name: surname,
      email,
      password: password || undefined
    };

    try {
      const response = await api.patch("/users/update-myself", updatedUser);
      setUser(response.data);
      toast("Perfil alterado com sucesso!");
      navigate("/usuario");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast("Erro ao atualizar o perfil. Por favor, tente novamente.", {
        render(message) {
          return <div className="p-2 rounded-md text-gray-100 bg-red-500">{message}</div>;
        }
      });
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

        <Button type="submit" typeClass="submit">
          Enviar
        </Button>

        <div className="mt-4">
          <h2 className="font-bold text-xl">Segurança (atualizar senha)</h2>
          <PasswordField type="password" defaultText="Nova senha" value={password} onChange={setPassword} />
          <PasswordField
            type="password"
            defaultText="Confirmar senha"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />

          <Button type="submit" typeClass="submit">
            Alterar agora
          </Button>
        </div>
      </form>
    </Card>
  );
}
