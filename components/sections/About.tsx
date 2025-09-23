"use client";

import {
  SanityTextBlock as SanityTextBlockType,
  SanityTimelineSection,
} from "@/app/lib/sanity/types";
import React, { useRef } from "react";
import SanityTextBlock from "../SanityTextBlock";
import MainButton from "../buttons/MainButton";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";

gsap.registerPlugin(ScrollTrigger)

type AboutProps = {
  heading: string;
  mediumBio: SanityTextBlockType;
  fullBio: string;
  timelineSection: SanityTimelineSection;
};

const About = ({
  heading,
  mediumBio,
  fullBio,
  timelineSection,
}: AboutProps) => {
  const { timeline } = timelineSection;
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);

  const { animateSectionHeading } = useGSAPAnimations();

  useGSAP(() => {
    const aboutIntroTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%'
      }
    });

    const buttonsContainer = buttonsContainerRef.current;

    // Set initial state - hide elements before animation
    gsap.set(['.about-text', buttonsContainer?.children, '.about-images', '.about-timeline'], { 
      autoAlpha: 0 
    });

    aboutIntroTl
      .add(animateSectionHeading(headingRef.current), 0)
      .fromTo('.about-text', 
        { autoAlpha: 0, y: 50 }, 
        { autoAlpha: 1, y: 0, ease: 'circ.out' }, 
        1
      )
      .fromTo(buttonsContainer?.children, 
        { autoAlpha: 0, y: 30 }, 
        { autoAlpha: 1, y: 0, stagger: 0.2, ease: 'circ.out' }, 
        1
      )
      .fromTo(['.about-images', '.about-timeline'], 
        { autoAlpha: 0 }, 
        { autoAlpha: 1 }, 
        '-=0.2'
      );

    return () => {
      aboutIntroTl.kill();
    };
  }, []);

  console.log(timeline, "timeline");

  return (
    <section 
      className="about min-h-screen bg-custom-gold lg:px-section-x-desktop h-[400vh]" 
      ref={sectionRef}
    >
      <div className="about-container w-full h-screen py-section-y-desktop">
        <div className="flex flex-col w-full h-full">
          {/* Content */}
          <div className="flex w-full h-full">
            {/* Copy */}
            <div className="w-3/5 flex flex-col gap-8">
              <h2 
                className="section-heading !text-custom-black" 
                ref={headingRef}
              >
                {heading}
              </h2>
              
              <SanityTextBlock 
                text={mediumBio} 
                className="about-text body-text font-bold" 
              />
              
              <div 
                ref={buttonsContainerRef}
                className="flex gap-6"
              >
                <MainButton text="view upcoming shows" color="black" />
                <MainButton text="get in touch" color="black" />
              </div>
            </div>

            {/* Images */}
            <div className="about-images w-full h-full flex justify-end items-center relative">
              {/* Smaller Images */}
              <div className="w-1/3 h-[250px] absolute top-[50%] left-10 z-10 -bottom-1/2">
                {timeline?.map((milestone, i) => (
                  <div key={i} className="ml-auto relative w-full h-full">
                    <Image
                      src={milestone.images[1].fileUrl}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-[20rem] absolute"
                      alt={milestone.images[1].alt}
                    />
                  </div>
                ))}
              </div>
              
              {/* Main Images */}
              <div className="w-2/3 h-full">
                {timeline?.map((milestone, i) => (
                  <div key={i} className="ml-auto relative w-full h-full">
                    <Image
                      src={milestone.images[0].fileUrl}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-[20rem] absolute"
                      alt={milestone.images[0].alt}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="about-timeline grid grid-cols-5 w-full">
            {timeline?.map((milestone, i) => (
              <div key={i} className="relative w-full flex items-center">
                {/* Base */}
                {i === 0 && (
                  <div className="h-4 w-4 rounded-full bg-custom-black" />
                )}
                <div className="h-[4.5px] w-full bg-custom-black" />
                <div className="h-4 w-4 rounded-full bg-custom-black" />
                <div className="absolute -top-[40px] bg-custom-black text-custom-white text-xs px-2 py-1">
                  {milestone.description}
                </div>
                <p className="absolute -bottom-[40px] text-sm">{milestone.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;