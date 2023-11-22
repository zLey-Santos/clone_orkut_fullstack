import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { FaSpinner } from "react-icons/fa";
import { globalNavigate } from "../globalNavigate";
import { LinkButton } from "./LinkButton";
import { Button } from "./Button";
import { useGlobalStore } from "../useGlobalStore";
import { TokenStorage } from "../tokenStorage";

export function AppBar() {
  const user = useGlobalStore((state) => state.user);
  const setUser = useGlobalStore((state) => state.setUser);
  const setIsAuthorized = useGlobalStore((state) => state.setIsAuthorized);
  const isAuthorized = useGlobalStore((state) => state.isAuthorized);
  const isLoading = useGlobalStore((state) => state.isLoading);

  const navigate = useNavigate();

  useEffect(() => {
    globalNavigate.navigate = navigate;
  }, [navigate]);

  function logout() {
    TokenStorage.removeToken();
    navigate("/sign-in");
    toast(`Até mais, ${user.first_name}!`);
    setIsAuthorized(false);
    setUser({
      id: 0,
      first_name: "",
      last_name: "",
      email: "",
      avatar: ""
    });
  }

  return (
    <header className="bg-[#222] p-2 shadow-md flex flex-row justify-between">
      <div className="flex flex-row items-center gap-8">
        <Logo />
        <Link to={"/"}>
          <img src="/src/assets/img-fiveIcons/orkut.png" alt="orkut" className="h-6 w-20 rounded-md ml-3 " />
        </Link>
        {isLoading && <FaSpinner className="animate-spin text-2xl" />}
      </div>
      {isAuthorized && (
        <div className="flex flex-row items-center gap-4 ">
          <LinkButton to="/create-post">Criar publicação</LinkButton>
          <Button typeClass="logout" onClick={logout}>
            Sair
          </Button>
          <Link to="/user" className="flex flex-row items-center gap-2">
            {user.first_name} {user.last_name}
            <img src={user.avatar} alt="" className="w-12 h-12 rounded-full" />
          </Link>
        </div>
      )}
      {!isAuthorized && (
        <div className="flex flex-row items-center gap-4 p-2">
          <LinkButton to="/sign-in">Entrar</LinkButton>
          <LinkButton to="/sign-up">Criar conta</LinkButton>
        </div>
      )}
    </header>
  );
}

function Logo() {
  return (
    <Link to="/" className="flex flex-row items-center gap-2" title="Orkut">
      <img
        alt=""
        src="/orkut.png"
        style={{
          height: "22px"
        }}
      />
    </Link>
  );
}
