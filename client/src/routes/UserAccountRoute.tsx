import React from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { useGlobalStore } from "../useGlobalStore";
import { FriendsCard } from "../components/FriendsCard";
import { ProfileCard } from "../components/ProfileCard";
import { Card } from "../components/Card";
import { ImagemComponent } from "../components/ImageComponent";

export function UserAccountRoute() {
  const user = useGlobalStore((state) => state.user);
  const setUser = useGlobalStore((state) => state.setUser);

  async function onAvatarUpload(event) {
    const [avatar] = event.target.files;
    const formData = new FormData();
    formData.append("avatar", avatar);

    try {
      const response = await api.post("/users/avatar", formData);
      const updatedUser = response.data;
      setUser({ ...user, avatar: updatedUser.avatar.concat(`?refresh=${Math.random()}`) });
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-2 m-2 sm:mx-auto max-w-screen-sm lg:max-w-screen-lg lg:mx-auto">
      <div className="lg:max-w-[192px]">
        <AvatarCard {...user} onAvatarUpload={onAvatarUpload} />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <ProfileCard {...user} />
      </div>
      <div className="lg:max-w-[256px]">
        <FriendsCard {...user} />
      </div>
    </div>
  );
}

export function AvatarCard({ id, avatar, first_name, last_name, onAvatarUpload }) {
  return (
    <Card>
      <form>
        <input type="file" accept="image/jpeg" id="avatar" className="hidden" onChange={onAvatarUpload} />
      </form>
      <label htmlFor="avatar" className="cursor-pointer">
        <ImagemComponent src={avatar} alt={`Foto de ${first_name}`} />
      </label>
      <Link to={`/perfil/${id}`} className="text-sky-600 hover:text-sky-800 hover:underline font-bold">
        {first_name} {last_name}
      </Link>
    </Card>
  );
}
