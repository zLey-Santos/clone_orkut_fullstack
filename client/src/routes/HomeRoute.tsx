import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { LinkButton } from "../components/LinkButton";
import { Card } from "../components/Card";
import { api } from "../api";

const pageSize = 30;

const initialPostsList = {
  count: 0,
  posts: []
};
const initialSearch = "";
const initialOrderBy = "desc";

export function HomeRoute() {
  const [postsList, setPostsList] = useState(initialPostsList);
  const [search, setSearch] = useState(initialSearch);
  const [orderBy, setOrderBy] = useState(initialOrderBy);
  const pageCount = Math.ceil(postsList.count / pageSize);
  const pages = new Array(pageCount).fill(null).map((_, index) => index + 1);

  async function loadPosts() {
    try {
      const response = await api.get("/posts", {
        params: {
          search,
          order_by: orderBy
        }
      });
      const nextPosts = response.data;
      setPostsList(nextPosts);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  }

  useEffect(() => {
    loadPosts();
  }, [search, orderBy]);

  return (
    <Card>
      <Helmet>
        <title>Home | Orkut</title>
      </Helmet>
      <div className="flex gap-2">
        <input
          type="search"
          placeholder="Buscar publicações..."
          className="flex-1 border-gray-400 focus:border-pink-600 rounded-2xl border-2 outline-none p-2"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select
          className="bg-white p-2 border-gray-400 focus:border-pink-600 rounded-md border-2"
          onChange={(event) => {
            setOrderBy(event.target.value);
          }}>
          <option value="desc">Mais recentes</option>
          <option value="asc">Mais antigas</option>
        </select>
      </div>
      {postsList.posts.length === 0 ? (
        <div>Nenhum resultado encontrado</div>
      ) : (
        postsList.posts.map((post) => (
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
                  className="my-1 text-sky-600 hover:text-sky-800 hover:underline font-bold">
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
        ))
      )}
      <div className="flex flex-row gap-2 flex-wrap mt-3">
        {pages.map((page) => (
          <LinkButton key={page} to={`/publicacoes/${page}`} typeClass="default">
            {page}
          </LinkButton>
        ))}
      </div>
    </Card>
  );
}
