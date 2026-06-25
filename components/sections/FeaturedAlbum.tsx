"use client";

import { SanityAlbum } from "@/app/lib/sanity/types";
import { cn } from "@/app/lib/utils";
import { Download, Play, Wallet } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";
import SpotifyIcon from "../icons/SpotifyIcon";
import AppleMusicIcon from "../icons/AppleMusicIcon";
import YouTubeMusicIcon from "../icons/YoutubeMusicIcon";
import Link from "next/link";
import { useModal } from "@/context/ModalContext";

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
  const { handleModalOpen } = useModal()

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
      0,
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

  return (
    <section
      ref={sectionRef}
      className="album-section w-full section-padding lg:h-screen flex gap-12 flex-col !pb-40"
      id="featured-album"
    >
      <h2 ref={headingRef} className="featured-album-title section-heading lg:!text-start">
        {heading}
      </h2>

      {/* Album */}
      <div className="w-full flex xl:flex-row flex-col md:items-center items-center lg:gap-16 gap-8 h-full">
        {/* Artwork */}
        <div
          ref={artworkRef}
          className="featured-album-cover-art relative aspect-square lg:w-1/2 md:w-3/5 w-full lg:h-full md:h-[40vh]"
        >
          <Image
            src={artwork.image.asset.url}
            fill
            alt={artwork.alt}
            style={{ objectFit: "cover" }}
            className="rounded-lg aspect-square"
          />
        </div>

        {/* Content */}
        <div
          ref={contentContainerRef}
          className="featured-album-content text-custom-gold flex flex-col gap-8 lg:items-end items-center lg:text-end md:text-center text-center lg:w-1/2 w-full"
        >
          <h3 className="md:text-5xl text-3xl uppercase font-heading">{albumTitle}</h3>

          <p className="md:text-sm text-xs font-normal">{album.description}</p>

          <div className="flex md:flex-row flex-col md:gap-4 gap-2">
            <h4>Listen</h4>

            <div className="flex gap-4">
              <SpotifyIcon size={24} url={album.listenLinks?.spotify} />
              <AppleMusicIcon size={24} url={album.listenLinks?.appleMusic} />
              <YouTubeMusicIcon size={24} url={album.listenLinks?.youtube} />
            </div>
          </div>

          {/* Track List */}
          <div className="w-full flex flex-col gap-4 items-start">
            <h4 ref={trackListTextRef} className="track-list-text text-xs uppercase">
              Track List
            </h4>

            <div className="flex flex-col items-start w-full">
              {album.trackList?.map((track, i) => (
                <div
                  key={i}
                  className={cn(
                    "album-track group text-custom-gold flex w-full justify-between items-center py-4 border-b border-custom-gold/40 hover:bg-custom-gold/20 cursor-pointer",
                    i === 0 && "border-t",
                  )}
                  // href={track.links.linktree}
                  // target="_blank"
                >
                  <div className="flex items-center gap-16">
                    <h5 className="font-heading text-lg capitalize">{track.name}</h5>
                  </div>

                  <div className="flex items-center gap-4">
                    <Play
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      fill="var(--color-gold)"
                      size={"1rem"}
                    />
                    <button className="text-black cursor-pointer transition-opacity duration-500 bg-custom-gold opacity-0 group-hover:opacity-100 flex gap-1 rounded-full text-xs items-center px-2 py-1">
                      Download <Download size={14} />
                    </button>

                    <button onClick={() => handleModalOpen('donate')} className="text-black transition-opacity duration-500 cursor-pointer bg-custom-gold opacity-0 group-hover:opacity-100 flex gap-1 rounded-full text-xs items-center px-2 py-1">
                      Donate <Wallet size={14} />
                    </button>
                    <div className="text-sm">3:00</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-4 justify-center pt-6">
        <div className="text-custom-gold font-baskerville">All the music Julian releases is completely free. Concider donating to support the artist process.</div>
        <button className="px-4 py-2 cursor-pointer border-custom-gold border-2 hover:bg-custom-black hover:text-custom-gold transition-colors duration-500 bg-custom-gold text-sm items-center rounded-full flex gap-2 font-medium" onClick={() => handleModalOpen('donate')}>
          Donate <Wallet />
        </button>
      </div>
    </section>
  );
};

export default FeaturedAlbum;
