"use client";

import { SanityMusicVideo } from "@/app/lib/sanity/types";
import { cn, getYouTubeVideoId } from "@/app/lib/utils";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type MusicVideosProps = {
  heading: string;
  musicVideos: SanityMusicVideo[];
};

const MusicVideos = ({ heading, musicVideos }: MusicVideosProps) => {
  const [activeVideo, setActiveVideo] = useState<SanityMusicVideo>(
    musicVideos[0]
  );

  // Refs for animation targeting
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const leftLineRef = useRef<HTMLDivElement>(null);
  const rightLineRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const tabsWrapperRef = useRef<HTMLDivElement>(null);
  const musicVideoRef = useRef<HTMLDivElement>(null);

  const { animateSectionHeading } = useGSAPAnimations();

  // Entrance animation
  useGSAP(() => {
    const musicVideoTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 90%'
      }
    });

    // Set initial state - hide all elements
    musicVideoTl.set([
      leftLineRef.current, 
      rightLineRef.current, 
      topLineRef.current, 
      bottomLineRef.current,
      tabsWrapperRef.current,
      musicVideoRef.current
    ], {
      autoAlpha: 0
    }, 0);

    musicVideoTl
      .fromTo([rightLineRef.current, leftLineRef.current], 
        { autoAlpha: 0, scaleY: 0 }, 
        { autoAlpha: 1, scaleY: 1, duration: 0.6 }, 
        0
      )
      .from([topLineRef.current, bottomLineRef.current], 
        { autoAlpha: 0, scaleX: 0, duration: 0.4 }, 
        0
      )
      .add(animateSectionHeading(headingRef.current), '-=0.2')
      .fromTo(tabsWrapperRef.current, 
        { autoAlpha: 0, y: 50 }, 
        { autoAlpha: 1, y: 0 }, 
        '-=0.2'
      )
      .fromTo(musicVideoRef.current, 
        { autoAlpha: 0, y: 50 }, 
        { autoAlpha: 1, y: 0 }, 
        '-=0.2'
      );

    return () => {
      musicVideoTl.kill();
    };
  }, []);

  const handleVideoSelect = (video: SanityMusicVideo) => {
    if (activeVideo?.name === video.name) return; // Prevent animation if same video

    const videoTl = gsap.timeline();

    videoTl.to(musicVideoRef.current, { 
      y: 20, 
      opacity: 0, 
      duration: 0.3,
      ease: "power2.in"
    });
    
    videoTl.call(() => {
      setActiveVideo(video);
    });
    
    videoTl.to(musicVideoRef.current, { 
      y: 0, 
      opacity: 1, 
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const activeVideoId = activeVideo?.link
    ? getYouTubeVideoId(activeVideo.link)
    : null;

  return (
    <section 
      ref={sectionRef}
      className="music-videos section flex flex-col gap-12 relative"
      id = 'music-videos'
    >
      {/* Vertical Lines */}
      <div 
        ref={leftLineRef}
        className="verticle-line music-video-left-line h-full w-[4px] absolute left-section-x-desktop top-0 bg-custom-gold" 
      />
      <div 
        ref={rightLineRef}
        className="verticle-line music-video-right-line h-full w-[4px] absolute right-section-x-desktop top-0 bg-custom-gold" 
      />
      
      {/* Section Heading */}
      <h2 
        ref={headingRef}
        className="h2 wide-lettering music-videos section-heading !text-center"
      >
        {heading}
      </h2>
      
      {/* Top Horizontal Line */}
      <div 
        ref={topLineRef}
        className="horizontal-line music-video-top-line h-[4px] bg-custom-gold w-full" 
      />

      <div className="flex flex-col items-center gap-8">
        {/* Video Selection Tabs */}
        <div 
          ref={tabsWrapperRef}
          className="music-video-tabs-wrapper text-custom-gold flex"
        >
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
        <div 
          ref={musicVideoRef}
          className="music-video-items-wrapper w-full lg:px-32"
        >
          {activeVideoId ? (
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" /* 16:9 aspect ratio */ }}
            >
              <iframe
                key={activeVideoId} // Force iframe re-render when video changes
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

      {/* Bottom Horizontal Line */}
      <div 
        ref={bottomLineRef}
        className="horizontal-line music-video-bottom-line h-[4px] bg-custom-gold w-full" 
      />
    </section>
  );
};

export default MusicVideos;