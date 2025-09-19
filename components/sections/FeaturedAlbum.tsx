"use client";

import { SanityAlbum } from "@/app/lib/sanity/types";
import { cn } from "@/app/lib/utils";
import { Play } from "lucide-react";
import Image from "next/image";
import React from "react";

type FeaturedAlbumProps = {
  heading: string;
  album: SanityAlbum;
};

const FeaturedAlbum = ({ heading, album }: FeaturedAlbumProps) => {
  if (!album) return;

  const { artwork, albumTitle } = album;

  console.log(artwork);
  return (
    <section className="w-full section-padding h-screen flex gap-12 flex-col">
      <h2 className="section-heading">{heading}</h2>

      {/* Album */}
      <div className="w-full flex gap-16 h-full">
        {/* Artwork */}
        <div className="relative w-1/2 h-full">
          <Image
            src={artwork.image.asset.url}
            fill
            alt={artwork.alt}
            objectFit="cover"
            className="rounded-lg"
          />
        </div>


        {/* Content */}
        <div className="text-custom-gold flex flex-col gap-8 items-end text-end w-1/2">
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
            <h4 className="text-xs uppercase">Track List</h4>

            <div className="flex flex-col items-start w-full">
              {album.trackList?.map((track, i) => (
                <div key={i} className={cn("group text-custom-gold flex w-full justify-between items-center py-4 border-b border-custom-gold/40 hover:bg-custom-gold/20 cursor-pointer", i === 0 && 'border-t')}>
                  <div className="flex items-center gap-16">
                    <h5 className="font-heading text-lg capitalize">{track.name}</h5>

                    <Play className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" fill="var(--color-gold)" size={'1rem'} />
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
