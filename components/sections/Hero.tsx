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
  const { isAnimationReady } = useAppSettings()
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
    <section className="hero-section w-full min-h-screen relative" id = 'home'>
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

      <div className="h-full w-full flex relative z-10 lg:py-8 lg:px-8">
        {/* Line */}
        <div className="w-[4px] bg-[var(--color-gold)]" ref={verLineLeft} />

        {/* Content */}
        <div className="w-full flex flex-col">
          <div className="flex w-full justify-end text-right pr-8">
            <h1 className="hero-heading ml-auto text-[200px] tracking-[20px] leading-[200px] text-[var(--color-gold)] w-3/5 uppercase">
              Julian Wenn
            </h1>
          </div>

          <div
            className="h-[3px] w-full bg-[var(--color-gold)]"
            ref={horLine}
          />

          <div className="flex gap-8 px-8 py-8">
            <div className="flex gap-8 hero-nav-container">
              <HeroNavCircle
                icon={<Music color="var(--color-black)" size={"32px"} />}
                title="Featured Music"
                link="featured-music"
              />
              <HeroNavCircle
                icon={<Guitar size={"32px"} />}
                title="Upcoming Shows"
                link="upcoming-shows"
              />
              <HeroNavCircle
                icon={<Mail size={"28px"} />}
                title="Get in Touch"
                link="featured-music"
              />
            </div>

            <div className="bg-[var(--color-black)] text-[var(--color-gold)] p-4 flex flex-col gap-4 hero-about">
              <p className="font-baskerville text-justify">{shortBio}</p>

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
