"use client";

import { FC } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import clsx from "clsx";
import { motion } from "framer-motion";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
  size?: number;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
  size = 24,
}) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: theme === "light" || isSSR,
    "aria-label": `Switch to ${theme === "light" || isSSR ? "dark" : "light"} mode`,
    onChange,
  });

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          "px-px transition-opacity hover:opacity-80",
          "cursor-pointer touch-manipulation",
          "w-12 h-12 flex items-center justify-center",
          className,
          classNames?.base,
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              "w-auto h-auto",
              "bg-transparent",
              "rounded-lg",
              "flex items-center justify-center",
              "group-data-[selected=true]:bg-transparent",
              "!text-default-500",
              "pt-px",
              "px-0",
              "mx-0",
            ],
            classNames?.wrapper,
          ),
        })}
      >
        <motion.div
          initial={{ x: -32, y: 10, opacity: 0, rotate: -45 }}
          animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          exit={{ x: 32, y: 10, opacity: 0, rotate: 45 }}
          transition={{ 
            duration: 0.5,
            ease: "easeInOut"
          }}
          key={theme === "light" ? "light" : "dark"}
          style={{ 
            position: "relative",
            transformOrigin: "center"
          }}
        >
          {theme === "light" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFB800"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: '#FFB800' }}
            >
              <circle cx="12" cy="12" r="4" fill="#FFB800" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="M4.93 4.93l1.41 1.41" />
              <path d="M17.66 17.66l1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="M6.34 17.66l-1.41 1.41" />
              <path d="M19.07 4.93l-1.41 1.41" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: '#CBD5E1' }}
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="#CBD5E1" />
            </svg>
          )}
        </motion.div>
      </div>
    </Component>
  );
};
