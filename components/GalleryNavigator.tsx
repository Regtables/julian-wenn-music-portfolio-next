import { cn } from "@/app/lib/utils";
import { PropsWithClassName } from "@/types";
import React from "react";

type GalleryNavigatorProps = PropsWithClassName<{
  activeItem: "videos" | "all" | "images";
  handleItemClick: () => void;
}>;

const GalleryNavigator = ({
  activeItem,
  handleItemClick,
}: GalleryNavigatorProps) => {
  return (
    <div className="flex items-center border-custom-gold/40 border rounded-full text-sm h-[30px] capitalize">
      <div
        className={cn(
          "px-3 text-custom-gold flex items-center h-full",
          activeItem === "videos" && "bg-custom-gold text-custom-black"
        )}
      >
        videos
      </div>

      <div
        className={cn(
          "px-3 border-x border-custom-gold/40 h-full text-custom-gold flex items-center",
          activeItem === "all" && "bg-custom-gold text-custom-black"
        )}
      >
        all
      </div>

      <div
        className={cn(
          "px-3 text-custom-gold flex items-center h-full",
          activeItem === "images" && "bg-custom-gold text-custom-black"
        )}
      >
        images
      </div>
    </div>
  );
};

export default GalleryNavigator;
