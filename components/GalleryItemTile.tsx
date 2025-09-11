import { SanityMedia } from "@/app/lib/sanity/types";
import { PropsWithClassName } from "@/types";
import { Image as LucideImage, LucideVideo } from "lucide-react";
import Image from "next/image";
import React from "react";

type GalleryItemTileProps = PropsWithClassName<{
  media: SanityMedia;
  title: string;
}>;

const GalleryItemTile = ({ title, media }: GalleryItemTileProps) => {
  return (
    <div className="lg:h-[250px] rounded-lg cursor-pointer">
      {/* Positioner */}
      <div className="w-full h-full relative">
        {/* Overlay */}
        <div className="absolute z-10 top-0 left-0 h-full flex flex-col justify-between w-full p-3 bg-black/40 rounded-lg hover:opacity-0 transition-opacity duration-500">
          <div className="w-auto ml-auto">
            <div className="bg-custom-black rounded-full h-8 w-8 flex items-center justify-center">
              {media.mediaType === "image" ? (
                <LucideImage color="var(--color-gold)" />
              ) : (
                <LucideVideo color="var(--color-gold)" />
              )}
            </div>
          </div>

          <div className="bg-black text-custom-gold text-xs p-1.5 w-auto mr-auto rounded-lg">
            {title}
          </div>
        </div>

        {media.mediaType === "image" ? (
          <div className="w-full h-full relative">
            <Image 
              src={media.fileUrl} 
              fill 
              alt={media.alt}
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        ) : (
          <div className="w-full h-full">
              
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryItemTile;
