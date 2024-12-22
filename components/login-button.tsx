"use client"

import { Button } from "@nextui-org/button";
import { UserIcon } from "@heroicons/react/24/solid";
import { useDisclosure } from "@nextui-org/modal";
import { LoginModal } from "./login-modal";

export const LoginButton = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button 
        isIconOnly 
        radius="full"
        variant="light"
        onPress={onOpen}
      >
        <UserIcon className="w-5 h-5 text-foreground" />
      </Button>

      <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};