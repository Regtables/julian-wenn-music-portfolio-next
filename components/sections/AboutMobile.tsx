"use client";

import React, { useRef, useState } from "react";
import {
  SanityTextBlock as SanityTextBlockType,
  SanityTimelineSection,
} from "@/app/lib/sanity/types";
import SanityTextBlock from "../SanityTextBlock";
import MainButton from "../buttons/MainButton";
import { useModal } from "@/context/ModalContext";
import Image from "next/image";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";

type AboutMobileProps = {
  heading: string;
  mediumBio: SanityTextBlockType;
  fullBio: string;
  timelineSection: SanityTimelineSection;
};

const AboutMobile = ({
  heading,
  mediumBio,
  fullBio,
  timelineSection,
}: AboutMobileProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { handleModalOpen } = useModal();

  // Carousel state
  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = timelineSection.timeline?.length || 0;

  // Navigation handlers
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? totalItems - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === totalItems - 1 ? 0 : prev + 1));
  };

  // Navigate to specific index
  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="lg:hidden flex flex-col gap-8 section-padding bg-custom-gold">
      <div className="lg:w-3/5 w-full lg:min-w-3/5 flex flex-col gap-6">
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

        <div ref={buttonsContainerRef} className="flex  w-full md:flex-row flex-col items-center gap-6">
          <MainButton text="view upcoming shows" color="black"  className="w-full"/>
          <MainButton text="get in touch" color="black" />

          <button
            className="bg-custom-black text-custom-gold text-xs h-[20px] px-2 capitalize font-bold cursor-pointer"
            onClick={() => handleModalOpen("fullBio", { fullBio })}
          >
            read full bio
          </button>
        </div>
      </div>

      <div className="w-full relative" ref={timelineContainerRef}>
        <div className="w-full overflow-hidden">
          <div
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {timelineSection.timeline?.map((milestone, i) => (
              <div
                key={i}
                className="w-full min-w-full flex flex-col items-center gap-4"
              >
                <div className="w-full relative flex justify-center">
                  <div className="h-[70vw] w-3/4 relative">
                    <Image
                      src={milestone.images[0].fileUrl}
                      fill
                      className="rounded-[20rem] absolute object-cover"
                      alt={milestone.images[0].alt}
                    />
                  </div>

                  <div className="absolute bottom-0 left-8 w-1/4">
                    <div className="h-[30vw] w-full relative">
                      <Image
                        src={milestone.images[1].fileUrl}
                        fill
                        className="rounded-[20rem] absolute object-cover"
                        alt={milestone.images[1].alt}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-custom-black text-white py-1 px-2">
                  {milestone.description}
                </div>
                <div className="font-heading text-2xl font-bold tracking-wider">
                  {milestone.year}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        {activeIndex !== 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/3 -translate-y-1/2 text-custom-black hover:text-custom-black/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={totalItems <= 1}
            aria-label="Previous slide"
          >
            <ChevronLeftCircle size={"2.5rem"} strokeWidth={"1px"} className="md:w-auto md:h-auto w-8 h-8" />
          </button>
        )}

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/3 -translate-y-1/2 text-custom-black hover:text-custom-black/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={totalItems <= 1}
          aria-label="Next slide"
        >
          <ChevronRightCircle size={"2.5rem"} strokeWidth={"1px"} className="md:w-auto md:h-auto w-8 h-8"/>
        </button>

        {/* Dots Indicator */}
        {totalItems > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {timelineSection.timeline?.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === activeIndex
                    ? "bg-custom-black w-6"
                    : "bg-custom-black/30"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutMobile;