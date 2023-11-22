import { api } from "../api";
import { useGlobalStore } from "../useGlobalStore";

export function UserAccountRoute() {
  const user = useGlobalStore((state) => state.user);
  const setUser = useGlobalStore((state) => state.setUser);

  async function onAvatarUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const [avatar] = event.target.files;
    const formData = new FormData();
    formData.append("avatar", avatar);
    const request = await api.post("/users/avatar", formData);
    const user = request.data;
    setUser({
      ...user,
      avatar: user.avatar.concat(`?refresh=${Math.random()}`)
    });
  }

  return (
    <div>
      <form>
        <label htmlFor="avatar" className="cursor-pointer">
          <img src={user.avatar} alt="Explorar..." className="mx-4 my-2" />
        </label>
        <input type="file" accept="image/jpeg" id="avatar" className="hidden" onChange={onAvatarUpload} />
      </form>
      <h1>
        {user.first_name} {user.last_name}
      </h1>
    </div>
  );
}
