import { SanitySongType } from "@/app/lib/sanity/types";
import { cn } from "@/app/lib/utils";
import { PropsWithClassName } from "@/types";
import React, { PropsWithChildren, forwardRef } from "react";

type BigTileNavigatorProps = PropsWithChildren<
  PropsWithClassName<{
    featuredMusic?: SanitySongType[];
    activeItem: SanitySongType;
    handleItemSelect: (item: SanitySongType, index: number) => void;
    activeIndex?: number;
  }>
>;

const BigTileCarouselNavigator = forwardRef<HTMLDivElement, BigTileNavigatorProps>(({
  className,
  featuredMusic,
  activeItem,
  handleItemSelect,
}, ref) => {
  return (
    <div
      className={cn(
        "rounded-full flex items-center gap-4 relative p-2 py-2",
        className
      )}
    >
      {featuredMusic?.map((song, i) => (
        <div
          key={i}
          className={cn(
            "uppercase text-sm font-bold h-[50px] w-[120px] flex items-center justify-center relative transition-colors duration-500 z-10 cursor-pointer",
            activeItem.name === song.name && "text-custom-gold"
          )}
          onClick={() => handleItemSelect(song, i)}
        >
          {song.name}
        </div>
      ))}
      <div 
        ref={ref}
        className="bg-custom-black absolute left-0 w-[120px] h-[50px] rounded-full mx-2" 
      />
    </div>
  );
});

BigTileCarouselNavigator.displayName = "BigTileCarouselNavigator";

export default BigTileCarouselNavigator;