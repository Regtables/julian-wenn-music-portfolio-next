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
import { useModal } from "@/context/ModalContext";

gsap.registerPlugin(ScrollTrigger);

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
  const timelineContainerRef = useRef<HTMLDivElement>(null);

  const { handleModalOpen } = useModal();

  const { animateSectionHeading } = useGSAPAnimations();

useGSAP(() => {
  // Intro animations
  const aboutIntroTl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 80%",
    },
  });

  const aboutMainImages = gsap.utils.toArray(".about-main-image");
  const aboutLeftImages = gsap.utils.toArray(".about-left-image");
  const timelineSections = gsap.utils.toArray(".timeline-section");
  const timelineBases = gsap.utils.toArray(".timeline-section-base");
  const timelineMilestones = gsap.utils.toArray(
    ".timeline-section-milestone"
  );
  const timelineTexts = gsap.utils.toArray(".milestone-text");
  const timelineDates = gsap.utils.toArray(".milestone-date");

  const buttonsContainer = buttonsContainerRef.current;

  // Set initial states
  gsap.set(
    [
      ".about-text",
      buttonsContainer?.children,
      ".about-images",
      ".about-timeline",
    ],
    {
      autoAlpha: 0,
    }
  );

  // Set initial states for all images
  gsap.set([aboutMainImages, aboutLeftImages], {
    opacity: 0,
    y: 100,
    scale: 0.8,
  });

  // Set initial timeline states
  gsap.set(timelineSections, { opacity: 0 });
  gsap.set(timelineBases, { scaleX: 0, transformOrigin: "left center" });
  gsap.set([timelineMilestones, timelineTexts, timelineDates], {
    opacity: 0,
  });

  // Intro timeline
  aboutIntroTl
    .add(animateSectionHeading(headingRef.current), 0)
    .fromTo(
      ".about-text",
      { autoAlpha: 0, y: 50 },
      { autoAlpha: 1, y: 0, ease: "circ.out" },
      1
    )
    .fromTo(
      buttonsContainer?.children,
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, stagger: 0.2, ease: "circ.out" },
      1
    )
    .fromTo(
      [".about-images", ".about-timeline"],
      { autoAlpha: 0 },
      { autoAlpha: 1 },
      "-=0.2"
    );

  // Initial image animations - first images in position at start
  if (aboutMainImages[0]) {
    gsap.to(aboutMainImages[0], {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });
  }

  if (aboutLeftImages[0]) {
    gsap.to(aboutLeftImages[0], {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });
  }

  // Initial timeline section
  if (
    timelineSections[0] &&
    timelineBases[0] &&
    timelineMilestones[0] &&
    timelineTexts[0] &&
    timelineDates[0]
  ) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      })
      .to(timelineSections[0], { opacity: 1, duration: 0.1 }, 0)
      .to(timelineMilestones[0], { opacity: 1, duration: 0.2 }, 0)
      .to(
        timelineBases[0],
        { scaleX: 1, duration: 0.3, ease: "power2.out" },
        0.1
      )
      .to(
        [timelineTexts[0], timelineDates[0]],
        { opacity: 1, duration: 0.2 },
        0.2
      );
  }

  // Main scroll-based animation timeline
  const aboutTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
  });

  // Animation settings
  const mainStagger = 0.9;

  gsap.set(aboutMainImages, { y: 100, scale: 0.9, opacity: 0 });
  gsap.set(aboutMainImages[0], { y: 0, scale: 1, opacity: 1 });
  gsap.set(aboutLeftImages, { y: 100, scale: 0.8, opacity: 0 });
  gsap.set(aboutLeftImages[0], { y: 0, scale: 1, opacity: 1 });

  // SYNC ALL ANIMATIONS - Main Images, Left Images, and Timeline
  aboutMainImages.forEach((image, index) => {
    const startTime = index * mainStagger - mainStagger + (index === 1 ? 0.3 : 0);
    
    if (index === 0) {
      // First main image fades out
      aboutTimeline.fromTo(
        image,
        { y: 0, scale: 1, opacity: 1 },
        { y: -100, scale: 1.1, opacity: 0, duration: 0.8, ease: "power2.inOut" },
        0
      );
    } else {
      // Other main images fade in at staggered times
      aboutTimeline.fromTo(
        image,
        { y: 100, scale: 0.9, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" },
        startTime
      );

      // Only fade out if it's not the last image
      if (index < aboutMainImages.length - 1) {
        aboutTimeline.fromTo(
          image,
          { opacity: 1, y: 0, scale: 1 },
          { y: -100, scale: 1.1, opacity: 0, duration: 0.5, ease: "power2.out" },
          startTime + 0.3
        );
      }
    }
  });

  // Left images - synced with main images
  aboutLeftImages.forEach((image, index) => {
    const startTime = index * mainStagger - mainStagger + (index === 1 ? 0.3 : 0);
    
    if (index === 0) {
      // First left image fades out
      aboutTimeline.fromTo(
        image,
        { y: 0, scale: 1, opacity: 1 },
        { y: -40, scale: 1.05, opacity: 0, duration: 0.8, ease: "power2.inOut" },
        0
      );
    } else {
      // Other left images fade in at staggered times
      aboutTimeline.fromTo(
        image,
        { y: 100, scale: 0.8, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" },
        startTime
      );

      // Only fade out if it's not the last image
      if (index < aboutLeftImages.length - 1) {
        aboutTimeline.fromTo(
          image,
          { opacity: 1, y: 0, scale: 1 },
          { y: -40, scale: 1.05, opacity: 0, duration: 0.5, ease: "power2.out" },
          startTime + 0.3
        );
      }
    }
  });

  // Timeline elements - synced with images
  timelineSections.forEach((section, index) => {
    const startTime = index * mainStagger - mainStagger + (index === 1 ? 0.3 : 0);

    if (index === 0) {
      // First timeline section already visible
    } else {
      // Timeline sections appear in sync with images
      aboutTimeline.to(timelineSections[index], { opacity: 1, duration: 0.1 }, startTime);
      aboutTimeline.to(timelineMilestones[index], { opacity: 1, duration: 0.2 }, startTime);
      aboutTimeline.to(
        timelineBases[index],
        { scaleX: 1, duration: 0.3, ease: "power2.out" },
        startTime + 0.1
      );
      aboutTimeline.to(
        [timelineTexts[index], timelineDates[index]],
        { opacity: 1, duration: 0.2 },
        startTime + 0.2
      );
    }
  });

  return () => {
    aboutIntroTl.kill();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}, []);

  return (
    <section
      className="about about-wrapper lg:block hidden hidden min-h-screen bg-custom-gold lg:px-section-x-desktop md:px-section-x-tablet h-[800vh]"
      ref={sectionRef}
      id="about"
    >
      <div className="about-container w-full h-screen lg:py-section-y-desktop md:py-section-y-tablet">
        <div className="flex flex-col w-full h-full">
          {/* Content */}
          <div className="flex w-full h-full">
            {/* Copy */}
            <div className="lg:w-3/5 md:w-1/2 lg:min-w-3/5 flex flex-col gap-6">
              <h2
                className="section-heading w-full !text-start !text-custom-black"
                ref={headingRef}
              >
                {heading}
              </h2>

              <div>
                <SanityTextBlock
                  text={mediumBio}
                  className="about-text !font-baskerville text-sm tracking-wide font-medium"
                />
              </div>

              <div
                ref={buttonsContainerRef}
                className="flex items-center gap-6"
              >
                <MainButton text="view upcoming shows" color="black" />
                <MainButton text="get in touch" color="black" />

                <button
                  className="bg-custom-black text-custom-gold text-xs h-[20px] px-2 capitalize font-bold cursor-pointer"
                  onClick={() => handleModalOpen("fullBio", { fullBio })}
                >
                  read full bio
                </button>
              </div>
            </div>

            {/* Images */}
            <div className="about-images w-full h-full flex lg:justify-end md:justify-center items-center relative">
              {/* Smaller Images */}
              <div className="about-images-left w-1/3 h-[250px] absolute top-[30%] lg:left-10 md:left-4 z-20 -bottom-1/2">
                {timeline?.map((milestone, i) => (
                  <div
                    key={i}
                    className="ml-auto absolute w-full h-full about-left-image about-image z-10"
                  >
                    <Image
                      src={milestone.images[1].fileUrl}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-[20rem] absolute z-0"
                      alt={milestone.images[1].alt}
                    />
                  </div>
                ))}
              </div>

              {/* Main Images */}
              <div className="about-images-right lg:w-2/3 md:w-1/2 md:right-6 absolute h-full flex md:items-center -top-[10%] -bottom-1/2">
                {timeline?.map((milestone, i) => (
                  <div
                    key={i}
                    className="ml-auto absolute w-full lg:h-full md:h-[400px] about-main-image about-image z-10"
                  >
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
          <div
            ref={timelineContainerRef}
            className="about-timeline about-timeline-container grid grid-cols-5 w-full"
          >
            {timeline?.map((milestone, i) => (
              <div
                key={i}
                className="timeline-section relative w-full flex items-center"
              >
                {/* Base */}
                {i === 0 && (
                  <div className="timeline-section-milestone h-4 w-4 rounded-full bg-custom-black" />
                )}
                <div className="timeline-section-base h-[4.5px] w-full bg-custom-black" />
                <div className="timeline-section-milestone h-4 w-4 rounded-full bg-custom-black" />
                <div className="milestone-text absolute -top-[40px] bg-custom-black text-custom-white text-xs px-2 py-1">
                  {milestone.description}
                </div>
                <p className="milestone-date absolute -bottom-[40px] text-sm">
                  {milestone.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
