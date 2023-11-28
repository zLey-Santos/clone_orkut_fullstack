import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Title } from "../components/Title";
import { Card } from "../components/Card";
import { api } from "../api";
import { ImagemComponent } from "../components/ImageComponent";
import { LinkButton } from "../components/LinkButton";
import { Helmet } from "react-helmet";

const pageSize = 30;

const initialPostsList = {
  count: 0,
  posts: []
};

export function PostPageRoute() {
  const params = useParams();
  const offset = (parseInt(params.page) - 1) * pageSize;
  const [postsList, setPostsList] = useState(initialPostsList);
  const pageCount = Math.ceil(postsList.count / pageSize);
  const pages = new Array(pageCount).fill(null).map((_, index) => index + 1);

  const loadPosts = async () => {
    try {
      const response = await api.get(`/posts?limit=${pageSize}&offset=${offset}`);
      const nextPosts = response.data;
      setPostsList(nextPosts);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [params.page]);

  return (
    <Card>
      <Helmet>
        <title>Página {params.page} | Posts</title>
      </Helmet>
      <Title>
        Página {params.page} de {pageCount}
      </Title>
      {postsList.posts.map((post) => (
        <div key={post.id} className="border-b py-2">
          <div className="flex items-center gap-2">
            <Link to={`/perfil/${post.user_id}`}>
              <ImagemComponent
                src={post.users.avatar}
                alt={`Foto de ${post.users.first_name} ${post.users.last_name}`}
                className="w-[48px] h-[48px] rounded-full"
              />
            </Link>

            <div className="flex flex-col">
              <Link
                to={`/perfil/${post.user_id}`}
                className="text-sky-600 hover:text-sky-800 hover:underline font-bold">
                {post.users.first_name} {post.users.last_name}
              </Link>
              <span className="text-sm mb-2 font-bold text-sky-800">
                {new Date(post.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
          <Card>
            <p className="mt-3">{post.content}</p>
            <div className="mt-2 flex justify-end">
              <LinkButton to={`/ver-publicacao/${post.id}`} typeClass="listComment">
                Listar comentários
              </LinkButton>
            </div>
          </Card>
        </div>
      ))}
      <div className="flex flex-row gap-2 flex-wrap pt-4">
        {pages.map((page) => (
          <LinkButton
            typeClass="default"
            key={page}
            to={`/publicacoes/${page}`}
            className={page === parseInt(params.page) ? "default" : ""}>
            {page}
          </LinkButton>
        ))}
      </div>
    </Card>
  );
}
