import { SanitySongType } from "@/app/lib/sanity/types";
import { cn } from "@/app/lib/utils";
import { PropsWithClassName } from "@/types";
import React, { PropsWithChildren } from "react";

type BigTileNavigatorProps = PropsWithChildren<
  PropsWithClassName<{
    featuredMusic?: SanitySongType[];
    activeItem: SanitySongType;
    handleItemSelect: (item: SanitySongType) => void;
  }>
>;

const BigTileCarouselNavigator = ({
  children,
  className,
  featuredMusic,
  activeItem,
  handleItemSelect,
}: BigTileNavigatorProps) => {
  return (
    <div className= {cn('rounded-full flex items-center gap-4 relative p-2 py-2', className)}>
      {featuredMusic?.map((song, i) => (
        <div key={i} className={cn('uppercase text-sm h-[50px] w-[120px] flex items-center justify-center relative z-10 cursor-pointer', activeItem.name === song.name && 'text-custom-gold')}>
          {song.name}
        </div>
      ))}
      <div className="bg-custom-black absolute left-0 w-[120px] h-[50px] rounded-full mx-2" />
    </div>
  );
};

export default BigTileCarouselNavigator;
