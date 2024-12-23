"use client";

import { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { ChevronRightIcon } from "@nextui-org/shared-icons";
import { motion, AnimatePresence } from "framer-motion";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 初始化检查
    setIsMobile(window.innerWidth < 768);

    // 添加窗口大小变化监听
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    // 清理监听器
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* 模糊背景 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-default/50 backdrop-blur-sm z-30"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* 主容器 */}
      <motion.div
        className="h-full relative flex flex-col z-40"
        animate={{
          width: isOpen ? (isMobile ? "450px" : "35vw") : "0px",
        }}
        transition={{duration: 0.5,ease: "easeInOut"}}
      >
        {/* 侧边栏内容 */}
        <div className="flex-1 bg-default-50"></div>

        {/* 展开按钮 */}
        <Button
          isIconOnly
          className="absolute top-1/2 -translate-y-1/2 left-full bg-default-100 min-w-0 w-8 h-14"
          style={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderTopRightRadius: 99,
            borderBottomRightRadius: 99,
          }}
          onPress={() => setIsOpen(!isOpen)}
        >
          {/* 按钮图标 */}
          <motion.div
            animate={{
              rotate: isOpen ? 180 : 0,
            }}
            transition={{
              duration: 0.7,
              ease: "easeInOut",
            }}
          >
            <ChevronRightIcon
              className="w-6 h-6" // 增大图标尺寸
              strokeWidth={2} // 使用 strokeWidth 属性来控制线条粗细
            />
          </motion.div>
        </Button>
      </motion.div>
    </>
  );
};
