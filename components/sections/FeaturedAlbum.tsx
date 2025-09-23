"use client";

import { SanityAlbum } from "@/app/lib/sanity/types";
import { cn } from "@/app/lib/utils";
import { Play } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type FeaturedAlbumProps = {
  heading: string;
  album: SanityAlbum;
};

const FeaturedAlbum = ({ heading, album }: FeaturedAlbumProps) => {
  const { artwork, albumTitle } = album;

  // Refs for animation targeting
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const artworkRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const trackListTextRef = useRef<HTMLHeadingElement>(null);

  const { animateSectionHeading } = useGSAPAnimations();

  useGSAP(() => {
    const albumTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%",
      },
    });

    const contentContainer = contentContainerRef.current;
    const albumTracks = gsap.utils.toArray(".album-track");

    // Set initial opacity to 0
    albumTl.set(
      [artworkRef.current, contentContainer?.children, albumTracks],
      {
        opacity: 0,
      },
      0
    );

    // Animation sequence
    albumTl
      .add(animateSectionHeading(headingRef.current))
      .from(artworkRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      })
      .from(contentContainer?.children, {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.3,
        ease: "circ.out",
      })
      .from(trackListTextRef.current, {
        opacity: 0,
        duration: 0.4,
      })
      .from(albumTracks, {
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
      });

    return () => {
      albumTl.kill();
    };
  }, []);

  console.log(artwork);

  return (
    <section
      ref={sectionRef}
      className="album-section w-full section-padding h-screen flex gap-12 flex-col"
    >
      <h2 ref={headingRef} className="featured-album-title section-heading">
        {heading}
      </h2>

      {/* Album */}
      <div className="w-full flex gap-16 h-full">
        {/* Artwork */}
        <div
          ref={artworkRef}
          className="featured-album-cover-art relative w-1/2 h-full"
        >
          <Image
            src={artwork.image.asset.url}
            fill
            alt={artwork.alt}
            style={{ objectFit: "cover" }}
            className="rounded-lg"
          />
        </div>

        {/* Content */}
        <div
          ref={contentContainerRef}
          className="featured-album-content text-custom-gold flex flex-col gap-8 items-end text-end w-1/2"
        >
          <h3 className="text-5xl uppercase font-heading">{albumTitle}</h3>

          <p className="text-xs">{album.description}</p>

          <div className="flex gap-4">
            <h4>Listen</h4>

            <div className="flex gap-4">
              <div>spotify</div>
              <div>apple</div>
              <div>youtube</div>
            </div>
          </div>

          {/* Track List */}
          <div className="w-full flex flex-col gap-4 items-start">
            <h4
              ref={trackListTextRef}
              className="track-list-text text-xs uppercase"
            >
              Track List
            </h4>

            <div className="flex flex-col items-start w-full">
              {album.trackList?.map((track, i) => (
                <div
                  key={i}
                  className={cn(
                    "album-track group text-custom-gold flex w-full justify-between items-center py-4 border-b border-custom-gold/40 hover:bg-custom-gold/20 cursor-pointer",
                    i === 0 && "border-t"
                  )}
                >
                  <div className="flex items-center gap-16">
                    <h5 className="font-heading text-lg capitalize">
                      {track.name}
                    </h5>

                    <Play
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      fill="var(--color-gold)"
                      size={"1rem"}
                    />
                  </div>

                  <div className="text-sm">3:00</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAlbum;
