import { cn } from "@/app/lib/utils";
import { PropsWithClassName } from "@/types";
import Link from "next/link";
import React from "react";

type MainButtonProps = PropsWithClassName<{
  text: string;
  link?: string;
  color?: "black" | "gold";
}>;

const MainButton = ({ text, link = '', className, color = 'gold' }: MainButtonProps) => {
  return (
    <Link href={link}>
      <button
        className={cn(
          "rounded-[20rem] border-2 py-2 px-6 text-sm capitalize max-w-[200px]",
          color === "gold" ? "border-custom-gold" : "border-custom-black",
          className
        )}
      >
        {text}
      </button>
    </Link>
  );
};

export default MainButton;
