"use client";

import { SanityMedia } from "@/app/lib/sanity/types";
import Image from "next/image";
import React from "react";
import Overlay from "../Overlay";
import HeroNavCircle from "../HeroNavCircle";
import { Guitar } from "lucide-react";

type HeroProps = {
  bgImageDesktop: SanityMedia;
  shortBio: string;
};

const Hero = ({ bgImageDesktop, shortBio }: HeroProps) => {
  return (
    <section className="w-full min-h-screen relative">
      <div className="absolute w-full h-full top-0 left-0 right-0">
        <Overlay opacity={40}>
          <Image
            src={bgImageDesktop.fileUrl!}
            fill
            alt={bgImageDesktop.alt!}
            objectFit="cover"
          />
        </Overlay>
      </div>

      <div className="h-full w-full flex relative z-10 lg:py-8 lg:px-8">
        {/* Line */}
        <div className="w-[4px] bg-[var(--color-gold)]" />

        {/* Content */}
        <div className="w-full flex flex-col">
          <div className="flex w-full justify-end text-right pr-8">
            <h1 className="ml-auto text-[200px] leading-[200px] text-[var(--color-gold)] w-3/5 uppercase">
              Julian Wenn
            </h1>
          </div>

          <div className="h-[3px] w-full bg-[var(--color-gold)]" />

          <div className="flex gap-8 px-8 py-8">
            <div className="flex gap-8">
              <HeroNavCircle
                icon={<Guitar />}
                title="Featured Music"
                link="#featured-music"
              />
              <HeroNavCircle
                icon={<Guitar />}
                title="Featured Music"
                link="#featured-music"
              />
              <HeroNavCircle
                icon={<Guitar />}
                title="Featured Music"
                link="#featured-music"
              />
            </div>

            <div className="bg-[var(--color-black)] text-[var(--color-gold)] p-4">
              <p>{shortBio}</p>
            </div>
          </div>
        </div>

        {/* Line */}
        <div className="w-[4px] bg-[var(--color-gold)]" />
      </div>
    </section>
  );
};

export default Hero;
