import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { useZorm } from "react-zorm";
import { Helmet } from "react-helmet";
import { Title } from "../components/Title";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { ErrorMessage } from "../components/ErrorMessage";
import { PostSchema } from "../postSchema";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { api } from "../api";

const texts = {
  title: "Editar publicação",
  contentPlaceholder: "Digite a sua publicação",
  submit: "Enviar",
  submitSuccess: "Sua publicação foi editada com sucesso!",
  submitFailure: "Houve um erro ao editar a sua publicação. :("
};

const initialPost = {
  id: 0,
  content: "",
  created_at: ""
};

export function EditPostRoute() {
  const params = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const zo = useZorm("edit-post", PostSchema, {
    async onValidSubmit(event) {
      event.preventDefault();
      const response = await api.put(`/posts/${params.id}`, {
        content: content
      });
      if (response.data.id) {
        toast(texts.submitSuccess);
        navigate(`/ver-publicacao/${params.id}`);
      } else {
        toast(texts.submitFailure);
      }
    }
  });

  useEffect(() => {
    async function loadPost() {
      const response = await api.get(`/posts/${params.id}`);
      setContent(response.data.content);
    }

    loadPost();
  }, [params.id]);

  return (
    <Card>
      <Helmet>
        <title>Editar publicação #{params.id}</title>
      </Helmet>
      <Breadcrumbs
        links={[
          { href: "/", label: "Home" },
          {
            href: `/ver-publicacao/${params.id}`,
            label: `Ver publicação #${params.id}`
          },
          {
            href: `/editar-publicacao/${params.id}`,
            label: `Editar publicação #${params.id}`
          }
        ]}
      />
      <Title>
        {texts.title} #{params.id}
      </Title>
      <form ref={zo.ref} className="flex flex-col gap-3 ">
        <div>
          <textarea
            className="rounded-lg px-2 py-1 mt-4 border focus:border-sky-500 outline-none w-full resize-none"
            placeholder={texts.contentPlaceholder}
            name={zo.fields.content()}
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {zo.errors.content((error) => (
            <ErrorMessage>{error.message}</ErrorMessage>
          ))}
        </div>
        <Button type="submit" typeClass="submit">
          {texts.submit}
        </Button>
      </form>
    </Card>
  );
}
