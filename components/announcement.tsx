import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import {ScrollShadow} from "@nextui-org/scroll-shadow";
import { useEffect, useState, useRef } from "react";
import { IoEyeSharp } from "react-icons/io5";

// 导入 Markdown 组件
import { MarkdownContent } from "@/content/markdown/styles";

interface AnnouncementProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

// 优化后的动画配置
const motionConfig = {
  variants: {
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -100,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  }
} as const;

interface AnnouncementData {
  title: string;
  content: string;
}

export const Announcement = ({ isOpen, onOpenChange }: AnnouncementProps) => {
  const [announcement, setAnnouncement] = useState<AnnouncementData>({
    title: "",
    content: "",
  });
  const [error, setError] = useState<string>("");
  const [showButton, setShowButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setShowButton(false);
      const fetchAnnouncement = async () => {
        try {
          const response = await fetch('/api/announcement');
          if (!response.ok) {
            throw new Error('Failed to fetch announcement');
          }
          const data = await response.json();
          setAnnouncement(data);
          setError("");
        } catch (err) {
          console.error('Error fetching announcement:', err);
          setError('加载公告失败，请稍后再试');
        }
      };
      fetchAnnouncement();
    }
  }, [isOpen]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;
    const reachedBottom = Math.abs(
      element.scrollHeight - element.clientHeight - element.scrollTop
    ) <= 1;
    
    if (reachedBottom) {
      setShowButton(true);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      backdrop="blur"
      size="3xl"
      hideCloseButton
      scrollBehavior="inside"
      isDismissable={false}
      motionProps={motionConfig}
      classNames={{
        base: "bg-background dark:bg-background will-change-transform transform-gpu",
        header: "border-b border-divider px-6",
        body: "p-6",
        footer: "border-t border-divider px-6 py-4",
        closeButton: "hidden",
      }}
    >   
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-2xl font-bold">
                {announcement.title || '加载中...'}
            </ModalHeader>

            <ModalBody style={{padding: "2rem"}}>
              <ScrollShadow 
                ref={contentRef}
                className="h-[65vh]"
                hideScrollBar={true}
                onScroll={handleScroll}
              >
                {error ? (
                  <div className="text-danger text-center p-4 text-lg">{error}</div>
                ) : announcement.content ? (
                  <MarkdownContent content={announcement.content} />
                ) : (
                  <div className="text-center p-4 text-lg">加载中...</div>
                )}
              </ScrollShadow>
            </ModalBody>

            <ModalFooter className="flex justify-center">
              {showButton ? (
                <Button 
                  isIconOnly
                  color="primary"
                  radius="full"
                  size="lg"
                  onPress={() => onClose()}
                  aria-label="确认已阅读"
                  style={{width: "120px", height: "50px"}}
                >
                  <IoEyeSharp className="w-6 h-6" />
                </Button>
              ) : null}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
