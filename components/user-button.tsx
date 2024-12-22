"use client"

import { Avatar } from "@nextui-org/avatar";
import { UserIcon as UserRegularIcon } from "@heroicons/react/24/outline";
import { UserPopover } from "./user-popover";

export const UserButton = () => {
  // TODO: 这里应该从用户认证状态中获取用户信息
  const user = {
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix&backgroundColor=ffdfbf,ffd5dc,c0aede&radius=50",
  };

  return (
    <UserPopover>
      <Avatar
        as="button"
        size="md"
        src={user.avatar || undefined}
        fallback={
          <UserRegularIcon className="w-5 h-5 text-default-600" />
        }
      />
    </UserPopover>
  );
}; 