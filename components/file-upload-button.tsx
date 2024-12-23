"use client"

import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { BsFileEarmarkPlusFill } from "react-icons/bs";

import {
  ArrowUpTrayIcon, // 上传
  DocumentTextIcon, // PDF
  PresentationChartBarIcon, // PPT
  DocumentIcon, // Word
  PhotoIcon, // 图片
  FolderPlusIcon, // 文件夹
} from "@heroicons/react/24/outline";
import { useState } from "react";

export const FileUploadButton = () => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    console.log(files);
  };

  return (
    <Popover backdrop="blur" placement="top-start">
      <PopoverTrigger>
        <Button radius="full" size="sm" className="h-8 min-w-0 w-12 ml-2 bg-default-50 hover:bg-default-200">
          <ArrowUpTrayIcon className="h-5"
          style={{ strokeWidth: 3 }}/>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0">
        <Card>
            <CardHeader className="flex-col gap-2" style={{ padding: "1.5rem 1.5rem 1rem 1.5rem" }}>
            {/* 文件 */}
            <div className="flex gap-3">
              <div className="flex items-center gap-1">
                <DocumentIcon className="h-5" style={{ strokeWidth: 2.5, color: '#2563EB' }} />
                Word
              </div>
              <div className="flex items-center gap-1">
                <DocumentTextIcon className="h-5" style={{ strokeWidth: 2.5, color: '#EF4444' }} />
                PDF
              </div>
              <div className="flex items-center gap-1">
                <PresentationChartBarIcon className="h-5" style={{ strokeWidth: 2.5, color: '#F97316' }} />
                PPT
              </div>
              <div className="flex items-center gap-1">
                <PhotoIcon className="h-5" style={{ strokeWidth: 2.5, color: '#22C55E' }} />
                图片
              </div>
            </div>
            
          </CardHeader>

          <CardBody className="flex justify-center items-center" style={{ padding: "0.5rem 1rem 1.5rem 1rem" }}>
            <Button
              style={{ height: "12rem", width: "16rem", border: "2px dashed" }} // 添加内联样式
              className={`${isDragging ? "border-primary bg-primary/10" : "border-default-300"}`}
              variant="ghost"
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onPress={() => {
                // 创建一个隐藏的文件输入框并触发点击
                const input = document.createElement("input");
                input.type = "file";
                input.accept =
                  ".pdf,.ppt,.pptx,.doc,.docx,.jpg,.jpeg,.png,.gif,.svg";
                input.multiple = true;
                input.click();
                input.onchange = (e) => {
                  const files = (e.target as HTMLInputElement).files;
                  if (files) {
                    console.log(files);
                    // 这里处理文件上传逻辑
                  }
                };
              }}
            >
              <FolderPlusIcon className="h-8 w-8" style={{ strokeWidth: 2.5 }} />
            </Button>
          </CardBody>
        </Card>
      </PopoverContent>
    </Popover>
  );
};
