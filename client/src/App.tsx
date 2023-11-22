import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppBar } from "./components/AppBar";
import { HomeRoute } from "./routes/HomeRoute";
import { CreatePostRoute } from "./routes/CreatepostRoute";
import { ViewPostRoute } from "./routes/ViewPostRoute";
import { NotFoundPage } from "./routes/NotFoundPage";
import { Footer } from "./components/FooterComponent";
import { EditPostRoute } from "./routes/EditPostRoute";
import { PostPageRoute } from "./routes/PostPageRoute";
import { ProfileRoute } from "./routes/ProfileRoute";
import { UserAccountRoute } from "./routes/UserAccountRoute";
import { SignInRoute } from "./routes/SignInRoute";
import { SignUpRoute } from "./routes/SignUpRoute";
import { LoadUser } from "./components/LoadUser";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <LoadUser />
        <AppBar />
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/user" element={<UserAccountRoute />} />
          <Route path="/create-post" element={<CreatePostRoute />} />
          <Route path="/view-post/:id" element={<ViewPostRoute />} />
          <Route path="/edit-post/:id" element={<EditPostRoute />} />
          <Route path="/not-found-page" element={<NotFoundPage />} />
          <Route path="/posts/:page" element={<PostPageRoute />} />
          <Route path="/perfil/:id" element={<ProfileRoute />} />
          <Route path="/sign-in" element={<SignInRoute />} />
          <Route path="/sign-up" element={<SignUpRoute />} />
        </Routes>
        <Footer className={"flex justify-end items-center gap-2  bg-[#222]"} />
      </div>
    </BrowserRouter>
  );
}
