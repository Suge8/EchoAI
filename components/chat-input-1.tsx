"use client"

import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { FileUploadButton } from "./file-upload-button";
import { ModelSelect } from "./model-select";
export const ChatInput1 = () => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    /* 主容器 */
    <motion.div 
      className="w-96 md:w-1/2 flex flex-col"
      animate={{ 
        width: isFocused ? "70%" : "50%"
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >

      {/* 选项排 */}
      <div className="flex items-center w-full">
        <div className="flex-shrink-0">
          <FileUploadButton />
        </div>
        <div className="flex-grow" />
        <div className="flex-shrink-0">
          <ModelSelect />
        </div>
      </div>


      {/* 输入框 */}
      <Textarea 
        size="lg"
        minRows={1}
        maxRows={5}
        placeholder="想问啥问啥" 
        value={inputValue}
        onValueChange={setInputValue}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        classNames={{
          base: "max-w-full flex-nowrap [&_textarea::placeholder]:whitespace-nowrap [&_textarea::placeholder]:text-center [&_textarea::placeholder]:w-full",
          inputWrapper: "rounded-3xl flex-nowrap whitespace-nowrap h-[52px]",
          input: "text-2xl py-2 overflow-x-auto whitespace-nowrap placeholder:text-center",
          innerWrapper: "!h-full",
        }}


        /* Logo 在输入框开头 */
        startContent={
          <motion.div 
            animate={{ 
              opacity: isFocused||inputValue.trim() ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
            style={{ paddingTop: '0.6rem', paddingLeft: '0.6rem' }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="26" 
              height="26" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="10" rx="2"/>
              <circle cx="12" cy="5" r="2"/>
              <path d="M12 7v4"/>
              <line x1="8" y1="16" x2="8" y2="16"/>
              <line x1="16" y1="16" x2="16" y2="16"/>
            </svg>
          </motion.div>
        }
        
        /* 按钮  在输入框末尾 */
        endContent={
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: inputValue.trim() ? 1 : 0,
              scale: inputValue.trim() ? 1 : 0.8 
            }}
            style={{
              pointerEvents: inputValue.trim() ? "auto" : "none",  // 控制是否可以交互
              marginTop: '0.3rem'
            } as any}
            transition={{ 
              duration: 1,
              ease: "easeInOut",
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
            className="h-full flex items-center justify-center"
          >
            <Button 
              isIconOnly
              className="rounded-full bg-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </Button>
          </motion.div>
        }
      />
    </motion.div>
  );
};
