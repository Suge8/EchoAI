"use client";

import { ThemeSwitch } from "@/components/theme-switch";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { FaDoorOpen } from "react-icons/fa6";
import { MdDisplaySettings } from "react-icons/md";
import { Announcement } from "@/components/announcement";
import { useDisclosure } from "@nextui-org/modal";

import {
  UserIcon as UserRegularIcon,
  WindowIcon,
  BellIcon,
  ArrowRightStartOnRectangleIcon,
  UserIcon,
  SparklesIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import { Chip } from "@nextui-org/chip";

// 定义用户角色枚举
export enum UserRole {
  USER = "USER",
  VIP = "VIP",
  ADMIN = "ADMIN",
}

// 角色配置
const roleConfig = {
  [UserRole.USER]: {
    color: "success",
    icon: UserIcon,
    label: "普通用户",
  },
  [UserRole.VIP]: {
    color: "warning",
    icon: SparklesIcon,
    label: "订阅会员",
  },
  [UserRole.ADMIN]: {
    color: "secondary",
    icon: ShieldCheckIcon,
    label: "超级权限",
  },
} as const;

interface UserPopoverProps {
  children: React.ReactNode;
}

export const UserPopover = ({ children }: UserPopoverProps) => {
  // TODO: 这里应该从用户认证状态中获取用户信息
  const user = {
    name: "用户名",
    avatar:
      "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix&backgroundColor=ffdfbf,ffd5dc,c0aede&radius=50",
    role: UserRole.ADMIN,
  };

  const isAdmin = user.role === UserRole.ADMIN;
  const Icon = roleConfig[user.role].icon;

  const handleLogout = () => {
    // TODO: 实现登出逻辑
    console.log("用户登出");
  };

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Popover 
        placement="bottom-end" 
        backdrop="blur"
        style={{ width: "320px" }}
      >
        <PopoverTrigger>{children}</PopoverTrigger>

        <PopoverContent className="p-4">
          <div className="flex flex-col" style={{ gap: "16px" }}>
            {/* 头像 */}
            <div className="flex justify-center">
              <Avatar
                size="lg"
                src={user.avatar || undefined}
                fallback={
                  <UserRegularIcon className="w-6 h-6 text-default-600" />
                }
                style={{
                  marginTop: "24px",
                  width: "128px",
                  height: "128px",
                }}
              />
            </div>

            {/* 用户名 */}
            <div className="flex flex-col items-center">
              <p className="text-xl font-bold">{user.name}</p>
            </div>

            {/* 角色 */}
            <div className="flex justify-center w-full">
              <Chip 
              variant="bordered" 
              size="md"
              color={roleConfig[user.role].color}
              startContent={<Icon className="h-5" />}
              >
                <span style={{ fontSize: "1rem", fontWeight: "semibold" }}>{roleConfig[user.role].label}</span>
              </Chip>
            </div>

            {/* 按钮组 */}
            <div className="flex justify-between w-full" style={{ marginTop: "24px", gap: isAdmin ? '20px' : '36px' }}>
              {/* 后台 */}
              {isAdmin && (
                <Button
                  variant="light"
                  size="lg"
                  radius="full"
                  isIconOnly
                  onClick={handleLogout}
                  >
                    <MdDisplaySettings className="text-secondary-500" style={{ width: '32px', height: '32px' }}/>
                </Button>
              )}

              {/* 公告 */}
              <Button
                variant="light"
                size="lg"
                radius="full"
                isIconOnly
                onClick={onOpen}
              >
                <BellIcon className="text-primary-500" style={{ width: '32px', height: '32px' }}/>
              </Button>

              {/* 主题 */}
              <Button
                variant="light"
                size="lg"
                radius="full"
                isIconOnly
              >
                <ThemeSwitch size={32} />
              </Button>

              {/* 退出 */}
              <Button
                variant="light"
                size="lg"
                radius="full"
                isIconOnly
                onClick={handleLogout}
              >
                <FaDoorOpen className="text-danger-500" style={{ width: '32px', height: '32px' }}/>
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* 公告弹窗 */}
      <Announcement 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
      />
    </>
  );
};
