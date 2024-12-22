import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import { LoginButton } from "@/components/login-button";
import { UserButton } from "@/components/user-button";
import { Icon } from "@/components/icon";
export const Navbar = () => {
  // const searchInput = (
  //   <Input
  //     aria-label="Search"
  //     classNames={{
  //       inputWrapper: "bg-default-100",
  //       input: "text-sm",
  //     }}
  //     endContent={
  //       <Kbd className="hidden lg:inline-block" keys={["command"]}>
  //         K
  //       </Kbd>
  //     }
  //     labelPlacement="outside"
  //     placeholder="Search..."
  //     startContent={
  //       <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
  //     }
  //     type="search"
  //   />
  // );

  // TODO: 这里应该从用户认证状态中获取登录状态
  const isLoggedIn = true;

  return (
    <NextUINavbar maxWidth="full" className="z-20">

      {/*logo*/}
      <NavbarContent justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Icon type="gpt" />
            <p className="font-bold text-inherit">ECHO</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
    
      {/* 根据登录状态显示不同按钮 */}
      <NavbarContent justify="end">
        {isLoggedIn ? <UserButton /> : <LoginButton />}
      </NavbarContent>
  

    </NextUINavbar>
  );
};
