"use client";

import { SanityMedia } from "@/app/lib/sanity/types";
import Image from "next/image";
import React, { useRef } from "react";
import Overlay from "../Overlay";
import HeroNavCircle from "../HeroNavCircle";
import { Guitar, Mail, Music } from "lucide-react";
import MainButton from "../buttons/MainButton";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useAppSettings } from "@/context/AppSettingsContext";

gsap.registerPlugin(SplitText, useGSAP);

type HeroProps = {
  bgImageDesktop: SanityMedia;
  shortBio: string;
};

const Hero = ({ bgImageDesktop, shortBio }: HeroProps) => {
  const { isAnimationReady, isMobile } = useAppSettings()
  const verLineLeft = useRef<HTMLDivElement>(null);
  const verLineRight = useRef<HTMLDivElement>(null);
  const horLine = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if(!isAnimationReady) return 
    
    const heroNavContainer = document.querySelector(".hero-nav-container"); 
    const heading = new SplitText(".hero-heading");

    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-section",
      },
      delay: 1.5
    });

    gsap.set(
      [
        heading.chars,
        heroNavContainer?.children,
        verLineLeft.current,
        verLineRight.current,
        horLine.current,
        '.hero-about',
        '.hero-bg-image'
      ],
      { autoAlpha: 0 }
    );

    heroTl
      .to('.hero-bg-image', { autoAlpha: 1, duration: 0.5 }, 0)
      .fromTo(heading.chars, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, stagger: 0.15 }, 1)
      .fromTo([verLineLeft.current, verLineRight.current], { autoAlpha: 0, scaleY: 0 }, { autoAlpha: 1, scaleY: 1 }, 2)
      .fromTo(horLine.current, { autoAlpha: 0, scaleX: 0 }, { autoAlpha: 1, scaleX: 1 }, 2)
      .fromTo([heroNavContainer?.children], { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, stagger: 0.1 }, "-=0.2")
      .fromTo('.hero-about', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0 }, '-=0.2')

    return () => {
      heroTl.kill()
    }
  }, [isAnimationReady]);

  return (
    <section className="hero-section md:flex items-center w-full md:min-h-[unset] min-h-screen relative" id = 'home'>
      <div className="absolute w-full h-full top-0 left-0 right-0">
        <Overlay opacity={40} className="hero-bg-image">
          <Image
            src={bgImageDesktop.fileUrl!}
            fill
            alt={bgImageDesktop.alt!}
            objectFit="cover"
          />
        </Overlay>
      </div>

      <div className="h-full w-full flex lg:flex-row md:justify-center relative z-10 lg:py-8 md:py-4 py-8 lg:px-8 md:px-4 px-2">
        {/* Line */}
        <div className="w-[4px] lg:h-auto md:h-screen md:min-h-full bg-[var(--color-gold)]" ref={verLineLeft} />

        {/* Content */}
        <div className="w-full h-full flex flex-col md:justify-end md:pb-8">
          <div className="flex w-full justify-center md:justify-end md:text-right lg:pr-8 md:pr-4">
            <h1 className="hero-heading md:ml-auto lg:text-[200px] text-center md:text-[150px] text-[80px] md:tracking-[20px] tracking-[8px] lg:leading-[200px] md:leading-[150px] leading-[80px] text-[var(--color-gold)] lg:w-3/5 uppercase">
              Julian Wenn
            </h1>
          </div>

          <div
            className="h-[3px] w-full bg-[var(--color-gold)]"
            ref={horLine}
          />

          <div className="flex lg:flex-row flex-col-reverse gap-8 lg:px-8 lg:py-8 md:px-4 md:py-4 py-4 px-4">
            <div className="flex md:gap-8 justify-between hero-nav-container">
              <HeroNavCircle
                icon={<Music color="var(--color-black)" size={"32px"} className="md:size-auto size-6" />}
                title="Featured Music"
                link="featured-music"
              />
              <HeroNavCircle
                icon={<Guitar size={"32px"} className="md:size-auto size-6"/>}
                title="Upcoming Shows"
                link="upcoming-shows"
              />
              <HeroNavCircle
                icon={<Mail size={"28px"} className="md:size-auto size-6" />}
                title="Get in Touch"
                link="featured-music"
              />
            </div>

            <div className="bg-[var(--color-black)] text-[var(--color-gold)] p-4 flex flex-col md:items-start items-center gap-4 hero-about">
              <p className="font-baskerville text-justify md:text-base text-sm">{shortBio}</p>

              <div className="flex gap-4">
                <MainButton text="read more" link="#about" />

                <MainButton text="view gallery" link="#featured-gallery" />
              </div>
            </div>
          </div>
        </div>

        {/* Line */}
        <div className="w-[4px] bg-[var(--color-gold)]" ref={verLineRight} />
      </div>
    </section>
  );
};

export default Hero;
