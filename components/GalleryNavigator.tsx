import { cn } from "@/app/lib/utils";
import { PropsWithClassName } from "@/types";
import React from "react";

type FilterType = "all" | "videos" | "images";

type NavigatorItem = {
  key: FilterType;
  label: string;
  className?: string;
};

type GalleryNavigatorProps = PropsWithClassName<{
  activeItem: FilterType;
  handleItemClick: (item: FilterType) => void;
}>;

const GalleryNavigator = ({
  activeItem,
  handleItemClick,
  className
}: GalleryNavigatorProps) => {
  const navItems: NavigatorItem[] = [
    { key: "videos", label: "videos", className: "rounded-l-full" },
    { key: "all", label: "all", className: "border-x border-custom-gold/40" },
    { key: "images", label: "images", className: "rounded-r-full" }
  ];

  return (
    <div className={cn(
      "flex items-center border-custom-gold/40 border rounded-full text-sm h-[30px] capitalize cursor-pointer",
      className
    )}>
      {navItems.map((item) => (
        <div
          key={item.key}
          className={cn(
            "px-3 text-custom-gold flex items-center h-full cursor-pointer transition-colors duration-200",
            item.className,
            activeItem === item.key 
              ? "bg-custom-gold text-custom-black" 
              : "hover:bg-custom-gold/20"
          )}
          onClick={() => handleItemClick(item.key)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default GalleryNavigator;