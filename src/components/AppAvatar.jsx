import { Avatar } from "@nextui-org/react";
import { useAppAvatar } from "@/hooks/useAppAvatar";

export default function AppAvatar({ user }) {
  const { avatarURL, loading } = useAppAvatar({ user });

  return loading ? (
    <Avatar
      name={user.firstName}
      src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`}
    />
  ) : (
    <Avatar src={avatarURL} name={user.firstName} />
  );
}
