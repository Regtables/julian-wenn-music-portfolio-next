"use client";

import { SanityAlbum } from "@/app/lib/sanity/types";
import { cn } from "@/app/lib/utils";
import { Download, Pause, Play, Wallet } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
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

type Track = SanityAlbum["trackList"][number];

const FeaturedAlbum = ({ heading, album }: FeaturedAlbumProps) => {
  const { artwork, albumTitle } = album;

  // Refs for animation targeting
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const artworkRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const trackListTextRef = useRef<HTMLHeadingElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { animateSectionHeading } = useGSAPAnimations();
  const { handleModalOpen } = useModal();

  const [playingTrackKey, setPlayingTrackKey] = useState<string | null>(null);
  const [downloadingTrackKey, setDownloadingTrackKey] = useState<string | null>(null);

  // Reset playing state when a track finishes naturally
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setPlayingTrackKey(null);
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  const toTitleCase = (value: string) =>
    value
      .toLowerCase()
      .split(" ")
      .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : word))
      .join(" ");

  const handlePlayPause = (track: Track, key: string) => {
    const audioUrl = track.audioFile?.asset?.url;
    const audio = audioRef.current;
    if (!audioUrl || !audio) return;

    // Clicking the currently playing track pauses it
    if (playingTrackKey === key) {
      audio.pause();
      setPlayingTrackKey(null);
      return;
    }

    audio.src = audioUrl;
    audio.play();
    setPlayingTrackKey(key);
  };

  const handleDownload = (track: Track) => {
    const audioUrl = track.audioFile?.asset?.url;
    if (!audioUrl) return;

    const key = track._key ?? track.name;
    setDownloadingTrackKey(key);

    const filename = `${toTitleCase(track.name)}.mp3`;
    const proxyUrl = `/api/downloads/download-track?url=${encodeURIComponent(audioUrl)}&filename=${encodeURIComponent(filename)}`;

    const link = document.createElement("a");
    link.href = proxyUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // The browser takes over the actual transfer at this point — this
    // is just a brief visual confirmation that the click registered.
    setTimeout(() => setDownloadingTrackKey(null), 800);
  };

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
      className="album-section w-full section-padding lg:min-h-screen flex gap-12 flex-col !pb-0"
      id="featured-album"
    >
      {/* Shared audio element for track playback */}
      <audio ref={audioRef} className="hidden" />

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
              {album.trackList?.map((track, i) => {
                const trackKey = track._key ?? `${track.name}-${i}`;
                const hasAudio = Boolean(track.audioFile?.asset?.url);
                const isPlaying = playingTrackKey === trackKey;
                const isDownloading = downloadingTrackKey === trackKey;

                return (
                  <div
                    key={trackKey}
                    className={cn(
                      "album-track group text-custom-gold flex w-full justify-between items-center py-4 border-b border-custom-gold/40 hover:bg-custom-gold/20 cursor-pointer",
                      i === 0 && "border-t",
                    )}
                  >
                    <div className="flex items-center gap-16">
                      <h5 className="font-heading text-lg capitalize">{track.name}</h5>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handlePlayPause(track, trackKey)}
                        disabled={!hasAudio}
                        aria-label={isPlaying ? `Pause ${track.name}` : `Play ${track.name}`}
                        className={cn(
                          "transition-opacity duration-500",
                          hasAudio
                            ? isPlaying
                              ? "opacity-100 cursor-pointer"
                              : "opacity-0 group-hover:opacity-100 cursor-pointer"
                            : "opacity-0 cursor-not-allowed",
                        )}
                      >
                        {isPlaying ? (
                          <Pause fill="var(--color-gold)" size={"1rem"} />
                        ) : (
                          <Play fill="var(--color-gold)" size={"1rem"} />
                        )}
                      </button>

                      <button
                        onClick={() => handleDownload(track)}
                        disabled={!hasAudio || isDownloading}
                        className="text-black cursor-pointer transition-opacity duration-500 bg-custom-gold opacity-0 group-hover:opacity-100 flex gap-1 rounded-full text-xs items-center px-2 py-1 disabled:cursor-not-allowed"
                      >
                        {isDownloading ? "Downloading..." : "Download"} <Download size={14} />
                      </button>

                      <button
                        onClick={() => handleModalOpen("donate")}
                        className="text-black transition-opacity duration-500 cursor-pointer bg-custom-gold opacity-0 group-hover:opacity-100 flex gap-1 rounded-full text-xs items-center px-2 py-1"
                      >
                        Donate <Wallet size={14} />
                      </button>
                      <div className="text-sm">{track.duration}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-4 justify-center pt-6">
        <div className="text-custom-gold font-baskerville">
          All the music Julian releases is completely free. Concider donating to support the artist process.
        </div>
        <button
          className="px-4 py-2 cursor-pointer border-custom-gold border-2 hover:bg-custom-black hover:text-custom-gold transition-colors duration-500 bg-custom-gold text-sm items-center rounded-full flex gap-2 font-medium"
          onClick={() => handleModalOpen("donate")}
        >
          Donate <Wallet />
        </button>
      </div>
    </section>
  );
};

export default FeaturedAlbum;
