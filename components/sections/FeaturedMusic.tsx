"use client";

import { SanitySongType } from "@/app/lib/sanity/types";
import { PropsWithClassName } from "@/types";
import React, { useState } from "react";
import BigTileCarouselNavigator from "../bigTileCarousel/BigTileCarouselNavigator";
import Image from "next/image";

type FeaturedMusicProps = PropsWithClassName<{
  heading: string;
  featuredMusic: SanitySongType[];
}>;

const FeaturedMusic = ({ heading, featuredMusic }: FeaturedMusicProps) => {
  const [activeItem, setActiveItem] = useState<SanitySongType>(
    featuredMusic[0]
  );

  console.log(featuredMusic)

  const handleItemSelect = (item: SanitySongType, i: number) => {
    setActiveItem(() => {
      return featuredMusic.find((song) => song.name === item.name);
    });
  };

  return (
    <section className="section section-padding flex flex-col items-center gap-8">
      <h2 className="section-heading text-center">{heading}</h2>
      <BigTileCarouselNavigator
        featuredMusic={featuredMusic}
        activeItem={activeItem}
        handleItemSelect={handleItemSelect}
        className="bg-custom-gold"
      />

      <div className="w-full">
        <div className="flex items-center gap-64 min-w-full">
          {featuredMusic.map((song, i) => (
            <div key={i} className="min-w-[50vw] h-screen relative">
              <figure className="w-full h-full absolute top-0 left-0">
                <Image src={song.artwork.image.asset.url} fill alt = {song.artwork.alt} objectFit="cover rounded-[8px]"/>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMusic;
