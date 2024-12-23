"use client"
import React, { useState, useCallback } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Button } from "@nextui-org/button";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Icon } from "./icon";
import dynamic from 'next/dynamic';
// 定义模型类型
type ModelType = {
  key: string;
  label: string;
  icon: 'gpt' | 'claude' | 'gemini';
  description: string;
};

// 整合所有模型信息到 modelList
export const modelList: ModelType[] = [
  {
    key: "GPT",
    label: "GPT-PLUS",
    icon: 'gpt',
    description: "OpenAI 出品的模型，擅长对话和创作"
  },
  {
    key: "Claude",
    label: "Claude-PLUS", 
    icon: 'claude',
    description: "Anthropic 出品的模型，擅长分析和推理"
  },
  {
    key: "Gemini",
    label: "Gemini-PLUS",
    icon: 'gemini',
    description: "Google 出品的模型，擅长多模态理解"
  }
];

const LoginModal = dynamic(() => import('./login-modal').then(mod => mod.LoginModal), {
  loading: () => <div>加载中...</div>
});

export const ModelSelect = () => {
  const [selectedModel, setSelectedModel] = useState<ModelType>(modelList[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleModelSelect = useCallback((item: ModelType) => {
    setSelectedModel(item);
    requestAnimationFrame(() => {
      setIsOpen(false);
    });
  }, []);

  return (
    <Popover 
      placement="top-end" 
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    >
      <PopoverTrigger>
        <Button 
          variant="light" 
          radius="lg"
          className="bg-default-50 hover:bg-default-200"
          style={{
            height: '32px',
            justifyContent: 'flex-start',
            marginBottom: '6px',
            marginRight: '1px',
            fontSize: '13px',
            fontWeight: 'bold'
          }}          
          startContent={
            <Icon type={selectedModel.icon} size={20} />
          }
        >
          {selectedModel.label}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-[320px]">
        <div className="p-2">
          {modelList.map((item) => (
            <Button
              key={item.key}
              variant="light"
              className="w-full justify-start mb-2 last:mb-0"
              style={selectedModel.key === item.key ? {
                border: '1.5px dashed grey'
              } : undefined}
              startContent={<Icon type={item.icon} size={20} />}
              endContent={
                selectedModel.key === item.key ? (
                  <CheckIcon className="h-4 w-4 text-foreground" style={{ strokeWidth: 3 }} />
                ) : null
              }
              onPress={() => handleModelSelect(item)}
            >
              <div className="flex flex-col items-start">
                <span>{item.label}</span>
                <span className="text-xs text-default-400">{item.description}</span>
              </div>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};