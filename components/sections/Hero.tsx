"use client";

import { SanityMedia } from "@/app/lib/sanity/types";
import Image from "next/image";
import React from "react";
import Overlay from "../Overlay";
import HeroNavCircle from "../HeroNavCircle";
import { Guitar, Mail, Music } from "lucide-react";
import MainButton from "../buttons/MainButton";

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
            <h1 className="ml-auto text-[200px] tracking-[20px] leading-[200px] text-[var(--color-gold)] w-3/5 uppercase">
              Julian Wenn
            </h1>
          </div>

          <div className="h-[3px] w-full bg-[var(--color-gold)]" />

          <div className="flex gap-8 px-8 py-8">
            <div className="flex gap-8">
              <HeroNavCircle
                icon={<Music color="var(--color-black)" size={'32px'} />}
                title="Featured Music"
                link="#featured-music"
              />
              <HeroNavCircle
                icon={<Guitar size={'32px'}/>}
                title="Upcoming Shows"
                link="#upcoming-shows"
              />
              <HeroNavCircle
                icon={<Mail size={'28px'} />}
                title="Get in Touch"
                link="#featured-music"
              />
            </div>

            <div className="bg-[var(--color-black)] text-[var(--color-gold)] p-4 flex flex-col gap-4">
              <p className="font-baskerville text-justify">{shortBio}</p>

              <div className="flex gap-4">
                <MainButton text="read more" link="#about"/>
                
                <MainButton text="view gallery" link="#featured-gallery"/>
              </div>
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
