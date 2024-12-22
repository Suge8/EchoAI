import {  Modal,  ModalContent,  ModalBody,  ModalFooter} from "@nextui-org/modal";
import {Tabs, Tab} from "@nextui-org/tabs";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { useState } from "react";
import { ArrowRightStartOnRectangleIcon, UserPlusIcon, RocketLaunchIcon, SparklesIcon } from "@heroicons/react/24/outline";

interface LoginModalProps {
    isOpen: boolean;                         // 控制弹窗是否显示的状态
    onOpenChange: (isOpen: boolean) => void; // 状态改变时的回调函数
}

export const LoginModal = ({ isOpen, onOpenChange }: LoginModalProps) => {
  const [selected, setSelected] = useState("login");

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      placement="center"
      hideCloseButton
      backdrop="blur"
    >

      <ModalContent>
        {/* nextui 自带的 onClose 方法 */}
        {(onClose) => (
          <>
          
            <ModalBody>
            <Tabs
            fullWidth
            aria-label="Options"
            selectedKey={selected}
            size="lg"
            onSelectionChange={(key) => setSelected(key as string)}
          >
            {/* 登录 */}
            <Tab 
              key="login" 
              title={
                <div className="flex items-center gap-2">
                  <ArrowRightStartOnRectangleIcon className="h-6" />
                  <span>登录</span>
                </div>
              }
            >
              <form className="flex flex-col gap-4">
                <Input size="lg" placeholder="手机号" type="phone" className="my-2"/>
                <Input size="lg" placeholder="密码" type="password" className="mb-2"/>
                <p className="text-center text-sm text-default-600">
                  没账号吗？{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>去注册</Link>
                </p>
                <Button 
                size="lg"
                fullWidth 
                radius="full" 
                color="primary" 
                endContent={<RocketLaunchIcon className="h-6 w-6" />}>
                </Button>
              </form>
            </Tab>

            {/* 注册 */}
            <Tab 
              key="sign-up" 
              title={
                <div className="flex items-center gap-2">
                  <UserPlusIcon className="h-6" />
                  <span>注册</span>
                </div>
              }
            >
            <form className="flex flex-col" style={{ gap: '24px' }}>
                <Input size="lg" placeholder="用户名" type="password" />
                <Input size="lg" placeholder="手机号" type="email" />
                <Input size="lg" placeholder="密码" type="password" className="mb-2"/>
                <Button 
                size="lg"
                fullWidth 
                radius="full"     
                color="primary" 
                endContent={<SparklesIcon className="h-6 w-6" />}>
                </Button>
              </form>
            </Tab>
          </Tabs>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};