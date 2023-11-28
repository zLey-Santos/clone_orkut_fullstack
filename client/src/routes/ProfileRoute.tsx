import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalStore } from "../useGlobalStore";
import { api } from "../api";
import { AvatarCard } from "../components/AvatarCard";
import { FriendsCard } from "../components/FriendsCard";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import toast from "react-simple-toasts";

const initialUser = {
  id: 0,
  first_name: "",
  last_name: "",
  created_at: "",
  passwd: "",
  avatar: ""
};

export function ProfileRoute() {
  const params = useParams();
  const userId = params.id;
  const isAuthorized = useGlobalStore((state) => state.isAuthorized);
  const myself = useGlobalStore((state) => state.user);
  const [user, setUser] = useState({ ...initialUser, id: userId });
  const [isFriend, setIsFriend] = useState(null as null | boolean);

  const loadUser = async () => {
    try {
      const response = await api.get(`/users/${userId}`);
      const userData = response.data;
      setUser(userData);
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  const checkIsFriend = async () => {
    try {
      const response = await api.get(`/users/check-is-friend/${userId}`);
      setIsFriend(response.data.isFriend);
    } catch (error) {
      console.error("Error checking friend status:", error);
      // Handle error checking friend status
    }
  };

  const addFriend = async () => {
    try {
      const response = await api.post(`/users/add-friend/${user.id}`);
      if (response !== undefined) {
        toast("Amigo adicionado com sucesso!");
        setIsFriend(true);
      }
    } catch (error) {
      console.error("Error adding friend:", error);
      // Handle error adding friend
    }
  };

  const removeFriend = async () => {
    try {
      const response = await api.post(`/users/remove-friend/${user.id}`);
      if (response !== undefined) {
        toast("Amigo removido com sucesso!");
        setIsFriend(false);
      }
    } catch (error) {
      console.error("Error removing friend:", error);
      // Handle error removing friend
    }
  };

  useEffect(() => {
    loadUser();
  }, [userId]);

  useEffect(() => {
    if (isAuthorized) {
      checkIsFriend();
    }
  }, [isAuthorized, userId]);

  return (
    <div className="flex flex-col lg:flex-row gap-2 m-2 sm:mx-auto max-w-screen-sm lg:max-w-screen-lg lg:mx-auto">
      <div className="lg:max-w-[192px]">
        <AvatarCard {...user} />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <Card>
          {isFriend !== null && (
            <div className="flex gap-2 mb-2">
              {isFriend === false && (
                <Button onClick={addFriend} typeClass="submit">
                  Adicionar como amigo
                </Button>
              )}
              {isFriend === true && (
                <Button onClick={removeFriend} typeClass="submit">
                  Remover amigo
                </Button>
              )}
            </div>
          )}
          <h2 className="text-2xl font-bold">
            {user.first_name} {user.last_name}
          </h2>
        </Card>
      </div>
      <div className="lg:max-w-[256px]">
        <FriendsCard {...user} />
      </div>
    </div>
  );
}
