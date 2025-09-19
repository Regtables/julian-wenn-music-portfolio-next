"use client";

import { SanityMusicVideo } from "@/app/lib/sanity/types";
import { cn, getYouTubeVideoId } from "@/app/lib/utils";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type MusicVideosProps = {
  heading: string;
  musicVideos: SanityMusicVideo[];
};

const MusicVideos = ({ heading, musicVideos }: MusicVideosProps) => {
  const [activeVideo, setActiveVideo] = useState<SanityMusicVideo>(
    musicVideos[0]
  );

  const musicVideoRef = useRef<HTMLDivElement>(null);

  const handleVideoSelect = (video: SanityMusicVideo) => {
    setActiveVideo(video);

    const videoTl = gsap.timeline();

    videoTl.to(musicVideoRef.current, { y: 20, opacity: 0 });
    videoTl.to(musicVideoRef.current, { y: 0, opacity: 1 });
  };

  const activeVideoId = activeVideo?.link
    ? getYouTubeVideoId(activeVideo.link)
    : null;

  return (
    <section className="section flex flex-col gap-12 relative">
      <div className="h-full w-[4px] absolute left-section-x-desktop top-0 bg-custom-gold" />
      <div className="h-full w-[4px] absolute right-section-x-desktop top-0 bg-custom-gold" />
      <h2 className="section-heading !text-center">{heading}</h2>
      <div className="h-[4px] bg-custom-gold w-full" />

      <div className="flex flex-col items-center gap-8">
        {/* Video Selection Tabs */}
        <div className="text-custom-gold flex">
          {musicVideos.map((item, i) => (
            <button
              key={i}
              onClick={() => handleVideoSelect(item)}
              className={cn(
                "border-y border-r hover:bg-custom-gold/20 border-custom-gold/40 h-[35px] min-w-[150px] flex items-center cursor-pointer justify-center transition-colors duration-500",
                i === 0 && "border-l",
                activeVideo?.name === item.name &&
                  "!bg-custom-gold text-custom-black"
              )}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Video Player */}
        <div className="w-full lg:px-32" ref={musicVideoRef}>
          {activeVideoId ? (
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" /* 16:9 aspect ratio */ }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?rel=0&modestbranding=1&autoplay=0`}
                title={activeVideo.name || activeVideo.name}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : (
            <div
              className="w-full bg-custom-black/50 border border-custom-gold/40 rounded-lg flex items-center justify-center text-custom-gold"
              style={{ paddingBottom: "56.25%", position: "relative" }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <p>No video available</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="h-[4px] bg-custom-gold w-full" />
    </section>
  );
};

export default MusicVideos;
