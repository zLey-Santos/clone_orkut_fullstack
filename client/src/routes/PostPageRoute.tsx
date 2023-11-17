import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/Card";
import { Pagination } from "../components/pagination"; // Importe o componente de paginação
import { api } from "../api";
import { Helmet } from "react-helmet";

const pageSize = 10; // Define o número de posts por página
const initialPostsList = {
  count: 0,
  posts: [],
};

export function PostPageRoute() {
  const params = useParams();
  const offset = (parseInt(params.page) - 1) * pageSize;
  const [postsList, setPostsList] = useState(initialPostsList);
  const pageCount = Math.ceil(postsList.count / pageSize);

  // Função assíncrona para carregar os posts da página atual
  async function loadPosts() {
    const response = await api.get(`/posts?limit=${pageSize}&offset=${offset}`);
    const nextPosts = response.data;
    setPostsList(nextPosts);
  }

  useEffect(() => {
    // Carrega os posts quando o componente é montado ou quando a página muda
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.page]);

  // Exibe o número da página atual e o total de páginas no título da página
  const postPage = `Publicação pág. ${params.page} de ${pageCount}`;
  return (
    <Card>
      <Helmet><title> {postPage} </title></Helmet>
      {postsList.posts.map((post) => {
        return (
          <div key={post.id} className="border-b py-2">
            <div className="flex items-center gap-2">
              <Link to={`/perfil/${post.user_id}`}>
                <img
                  src={post.users.avatar}
                  alt={`Foto de ${post.users.first_name} ${post.users.last_name}`}
                  className="w-[48px] h-[48px] rounded-full"
                />
              </Link>
              <div className="flex flex-col">
                <Link
                  to={`/perfil/${post.user_id}`}
                  className="text-sky-600 hover:text-sky-800 hover:underline font-bold"
                >
                  {post.users.first_name} {post.users.last_name}
                </Link>
                <span className="text-sm text-gray-500">
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            <Link
              to={`/view-post/${post.id}`}
              className="cursor-pointer block"
            >
              <p>{post.content}</p>
            </Link>
          </div>
        );
      })}

      {/* Renderiza o componente de paginação */}
      <Pagination
        pageCount={pageCount}
        currentPage={parseInt(params.page)}
        basePath="/posts"
        onPageChange={undefined} // Aqui deve ser fornecida a função para atualizar a página atual
      />
    </Card>
  );
}
