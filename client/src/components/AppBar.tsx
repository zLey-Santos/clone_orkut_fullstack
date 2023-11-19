import { Link } from "react-router-dom";
import { LinkButton } from "./LinkButton";

export function AppBar() {
  return (
    <header className="bg-[#222] p-3 shadow-md flex flex-row justify-between">
      <div className="flex flex-row items-center gap-8">
        <Link to={"/"}>
          <img src="\src\assets\img-fiveIcons\orkut.png" alt="orkut" className="h-6 w-20 rounded-md ml-3" />
        </Link>
      </div>

      <div className="flex flex-row items-center gap-8">
        <LinkButton to="/create-post">Nova publicação</LinkButton>
        <LinkButton to="/sign-in">Entrar</LinkButton>
      </div>
    </header>
  );
}
