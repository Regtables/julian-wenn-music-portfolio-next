"use client";

import { SanitySongType } from "@/app/lib/sanity/types";
import { PropsWithClassName } from "@/types";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import React, { useRef, useState } from "react";
import Image from "next/image";

import BigTileCarouselNavigator from "../bigTileCarousel/BigTileCarouselNavigator";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";
import { Play } from "lucide-react";

gsap.registerPlugin(useGSAP);

type FeaturedMusicProps = PropsWithClassName<{
  heading: string;
  featuredMusic: SanitySongType[];
}>;

const FeaturedMusic = ({ heading, featuredMusic }: FeaturedMusicProps) => {
  const [activeItem, setActiveItem] = useState<SanitySongType>(
    featuredMusic[0]
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const { animateSectionHeading } = useGSAPAnimations();

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const navigatorRef = useRef<HTMLDivElement>(null);
  const navigatorBgRef = useRef<HTMLDivElement>(null);
  const trackListRef = useRef<HTMLDivElement>(null);
  const trackItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const featuredMusicTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%",
      },
    });

    featuredMusicTl
      .set([navigatorRef.current, trackItemsRef.current], { opacity: 0 })
      .add(animateSectionHeading(headingRef.current))
      .fromTo(navigatorRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1 })
      .fromTo(
        trackItemsRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.5 }
      );

    return () => {
      featuredMusicTl.kill();
    };
  }, []);

  const animateToItem = (targetIndex: number, item: SanitySongType) => {
    if (targetIndex === activeIndex) return;

    if (!trackItemsRef.current[0] || !trackListRef.current) return;

    const firstTrackItem = trackItemsRef.current[0];
    const trackItemWidth = firstTrackItem.offsetWidth;
    const trackListStyles = window.getComputedStyle(trackListRef.current);
    const trackGap = parseInt(trackListStyles.gap) || 256;
    const navigatorBgWidth = navigatorBgRef.current.offsetWidth;

    const translateTrackX = targetIndex * (trackItemWidth + trackGap);
    const translateNavBg = targetIndex * (navigatorBgWidth + 16);

    gsap.to(trackListRef.current, {
      x: -translateTrackX,
      duration: 0.8,
      ease: "power2.out",
    });

    gsap.to(navigatorBgRef.current, {
      x: translateNavBg,
      duration: 0.8,
      ease: "power2.out",
    });

    setActiveItem(item);
    setActiveIndex(targetIndex);
  };

  const handleItemSelect = (item: SanitySongType, index: number) => {
    animateToItem(index, item);
  };

  return (
    <section
      className="section-padding md:!pr-0 px-section-x-mobile flex flex-col items-center md:gap-8 gap-8"
      ref={sectionRef}
      id="featured-music"
    >
      <h2 className="section-heading text-center" ref={headingRef}>
        {heading}
      </h2>

      <div ref={navigatorRef}>
        <BigTileCarouselNavigator
          featuredMusic={featuredMusic}
          activeItem={activeItem}
          handleItemSelect={handleItemSelect}
          className="bg-custom-gold"
          ref={navigatorBgRef}
        />
      </div>

      <div className="w-full">
        <div className="flex items-center justify-center gap-64 w-full overflow-hidden">
          <div className="xl:w-[50vw] md:w-[70vw] w-[90vw] flex gap-64" ref={trackListRef}>
            {featuredMusic.map((song, i) => (
              <div
                key={i}
                className="xl:h-screen md:h-[60vh] h-[50vh] min-w-full relative flex"
                ref={(el) => (trackItemsRef.current[i] = el)}
              >
                <figure className="h-full absolute top-0 left-0 xl:min-w-[50vw] md:min-w-[70vw] min-w-[90vw]">
                  <Image
                    src={song.artwork.image.asset.url}
                    fill
                    alt={song.artwork.alt}
                    objectFit="cover"
                    className="rounded-[8px]"
                  />
                </figure>
                <div className="flex w-full h-full items-end relative p-3">
                  <div className="h-9 w-9 rounded-full bg-custom-black absolute md:top-1/2 top-2/5 start-1/2 end-1/2 flex justify-center items-center z-10">
                    <Play color="var(--color-gold)" fill="var(--color-gold)" />
                  </div>

                  <div className="bg-custom-black text-custom-gold relative md:w-1/3 rounded-lg p-3 flex flex-col gap-2 ">
                    <h3 className="font-heading text-xl">{song.name}</h3>
                    <p className="md:text-sm text-xs text-start">{song.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMusic;
