import { SanityMedia } from "@/app/lib/sanity/types";
import { PropsWithClassName } from "@/types";
import { Image as LucideImage, LucideVideo } from "lucide-react";
import Image from "next/image";
import React from "react";

type GalleryItemTileProps = PropsWithClassName<{
  media: SanityMedia;
  title: string;
}>;

// Helper function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const GalleryItemTile = ({ title, media, className }: GalleryItemTileProps) => {
  const renderMediaContent = () => {
    switch (media.mediaType) {
      case "image":
        return (
          <div className="w-full h-full relative">
            <Image 
              src={media.imageWithAlt?.url || media.fileUrl || ""} 
              fill 
              alt={media.alt || media.imageWithAlt?.alt || ""}
              className="object-cover rounded-lg"
            />
          </div>
        );

      case "youtube":
        if (!media.fileUrl) return null;
        
        const videoId = getYouTubeVideoId(media.fileUrl);
        if (!videoId) return null;

        return (
          <div className="w-full h-full relative">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
              title={media.title || title}
              className="w-full h-full rounded-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );

      case "video":
        return (
          <div className="w-full h-full relative">
            <video
              className="w-full h-full object-cover rounded-lg"
              controls
              preload="metadata"
            >
              {media.videoUrlMp4 && (
                <source src={media.videoUrlMp4} type="video/mp4" />
              )}
              {media.videoUrlWebm && (
                <source src={media.videoUrlWebm} type="video/webm" />
              )}
              {media.fileUrl && (
                <source src={media.fileUrl} type="video/mp4" />
              )}
              Your browser does not support the video tag.
            </video>
          </div>
        );

      default:
        return (
          <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Unsupported media type</span>
          </div>
        );
    }
  };

  return (
    <div className={`gallery-item-wrapper lg:h-[250px] rounded-lg cursor-pointer ${className || ""}`}>
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

        {renderMediaContent()}
      </div>
    </div>
  );
};

export default GalleryItemTile;