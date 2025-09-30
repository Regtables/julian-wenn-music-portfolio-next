"use client";

import { SanityMedia } from "@/app/lib/sanity/types";
import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import GalleryNavigator from "../GalleryNavigator";
import GalleryItemTile from "../GalleryItemTile";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";

gsap.registerPlugin(useGSAP, Flip);

type FilterType = "all" | "videos" | "images";

type FeaturedGalleryProps = {
  heading: string;
  galleryItems: SanityMedia[];
};

const FeaturedGallery = ({ heading, galleryItems }: FeaturedGalleryProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const galleryRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const navigatorRef = useRef<HTMLDivElement>(null);
  
  // Store items with refs
  const itemsMapRef = useRef<Map<string, SanityMedia>>(new Map());

  const { animateSectionHeading } = useGSAPAnimations();

  const enhancedItems = galleryItems.map((item, index) => {
    const id = `gallery-item-${index}`;
    itemsMapRef.current.set(id, item);
    return {
      ...item,
      id,
    };
  });

  useGSAP(() => {
    if (!headingRef.current || !navigatorRef.current || !galleryRef.current)
      return;

    const galleryItems = gsap.utils.toArray(".gallery-item-wrapper");

    const galleryTl = gsap.timeline({
      scrollTrigger: {
        trigger: galleryRef.current.parentElement,
        start: "top 90%",
        once: true,
      },
    });

    gsap.set([navigatorRef.current, galleryItems], { opacity: 0 });

    galleryTl
      .add(animateSectionHeading(headingRef.current))
      .fromTo(
        navigatorRef.current,
        {
          y: 50,
          opacity: 0,
        },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      )
      .fromTo(
        galleryItems,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
        }
      );
  }, []);

  const filterItems = (filterType: FilterType) => {
    if (!galleryRef.current) return;

    const allItems = galleryRef.current.querySelectorAll(
      ".gallery-item-wrapper"
    ) as NodeListOf<HTMLElement>;

    const state = Flip.getState(allItems);

    allItems.forEach((item) => {
      const itemId = item.getAttribute("data-id");
      if (!itemId) return;

      const mediaItem = itemsMapRef.current.get(itemId);
      if (!mediaItem) return;

      const mediaType = mediaItem.mediaType;
      
      const shouldShow =
        filterType === "all" ||
        (filterType === "videos" && mediaType !== "image") ||
        (filterType === "images" && mediaType === "image");

      item.style.display = shouldShow ? "block" : "none";
    });

    Flip.from(state, {
      duration: 0.6,
      ease: "power1.inOut",
      onEnter: (elements) =>
        gsap.fromTo(
          elements,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.5 }
        ),
      onLeave: (elements) => gsap.to(elements, { autoAlpha: 0, duration: 0.3 }),
    });
  };

  const handleNavItemClick = (filterType: FilterType) => {
    if (filterType === activeFilter) return;

    setActiveFilter(filterType);
    filterItems(filterType);
  };

  return (
    <section className="section-padding section-margin-y flex flex-col items-center gap-8" id="featured-gallery">
      <h2
        ref={headingRef}
        className="gallery-section-heading section-heading text-center"
      >
        {heading}
      </h2>

      {/* Navigator */}
      <div ref={navigatorRef}>
        <GalleryNavigator
          activeItem={activeFilter}
          handleItemClick={handleNavItemClick}
        />
      </div>

      {/* Gallery */}
      <div ref={galleryRef} className="grid w-full lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
        {enhancedItems.map((item) => (
          <div
            key={item.id}
            className="gallery-item-wrapper"
            data-id={item.id}
          >
            <GalleryItemTile title={item.title} media={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedGallery;