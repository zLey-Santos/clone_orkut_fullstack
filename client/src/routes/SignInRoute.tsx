import { useState } from "react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importa os ícones do React

const initialForm = {
  email: "",
  password: ""
};

export function SignInRoute() {
  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    alert(`email:${form.email} password:${form.password}`);
  }

  return (
    <div>
      <Card>
        <h2 className="text-center text-4xl">Iniciar Sessão</h2>
        <form onSubmit={submitForm}>
          <TextField
            type="email"
            value={form.email}
            whenChanges={(email) => setForm({ ...form, email })}
            defaultText={"Email"}
          />

          <div className="relative">
            <TextField
              type={showPassword ? "text" : "password"}
              value={form.password}
              whenChanges={(password) => setForm({ ...form, password })}
              defaultText={"Senha"}
            />

            <button type="button" className="absolute right-2 top-2" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <Button type="submit" typeClass="signin">
            Entrar
          </Button>
        </form>
      </Card>
    </div>
  );
}
