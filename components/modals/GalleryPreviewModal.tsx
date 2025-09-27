'use client'

import React from "react";
import Popup from "../Popup";
import { useModal } from "@/context/ModalContext";
import Image from "next/image";
import { getYouTubeVideoId } from "@/app/lib/utils";

type Props = {};

const GalleryPreviewModal = (props: Props) => {
  const { isOpen, types, data } = useModal();

  const { media } = data;

  if(!media) return

  const isModalOpen = isOpen && types.includes("galleryPreview");

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
              title={media.title}
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
              {media.fileUrl && <source src={media.fileUrl} type="video/mp4" />}
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
    <Popup isOpen={isModalOpen} className="items-center justify-center">
      <div className="w-[40vw] h-[70vh]">{renderMediaContent()}</div>
    </Popup>
  );
};

export default GalleryPreviewModal;
