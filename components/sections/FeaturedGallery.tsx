"use client";

import { SanityMedia } from "@/app/lib/sanity/types";
import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import GalleryNavigator from "../GalleryNavigator";
import GalleryItemTile from "../GalleryItemTile";

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

  const enhancedItems = galleryItems.map((item, index) => ({
    ...item,
    id: `gallery-item-${index}`,
    dataMediaType: item.mediaType
  }));

  useGSAP(() => {
    if (!headingRef.current || !navigatorRef.current || !galleryRef.current) return;

    const galleryTl = gsap.timeline({
      scrollTrigger: {
        trigger: galleryRef.current.parentElement,
        start: 'top 80%',
        once: true,
      }
    });

    galleryTl
      .from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      })
      .from(navigatorRef.current, { 
        y: 50, 
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      }, '-=0.2')
      .from('.gallery-item-wrapper', { 
        opacity: 0, 
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out"
      }, '-=0.2');

  }, []);

  const filterItems = (filterType: FilterType) => {
    if (!galleryRef.current) return;

    const allItems = galleryRef.current.querySelectorAll('.gallery-item-wrapper');
    
    const state = Flip.getState(allItems);

    allItems.forEach((item) => {
      const mediaType = item.getAttribute('data-media-type');
      const shouldShow = 
        filterType === 'all' || 
        (filterType === 'videos' && mediaType !== 'image') ||
        (filterType === 'images' && mediaType === 'image');

      if (shouldShow) {
        (item as HTMLElement).style.display = 'block';
      } else {
        (item as HTMLElement).style.display = 'none';
      }
    });

    Flip.from(state, {
      duration: 0.6,
      ease: "power1.inOut",
      onEnter: (elements) => gsap.fromTo(elements, 
        { autoAlpha: 0 }, 
        { autoAlpha: 1, duration: 0.5 }
      ),
      onLeave: (elements) => gsap.to(elements, 
        { autoAlpha: 0, duration: 0.3 }
      )
    });
  };

  const handleNavItemClick = (filterType: FilterType) => {
    if (filterType === activeFilter) return; 
    
    setActiveFilter(filterType);
    filterItems(filterType);
  };

  return (
    <section className="section-padding flex flex-col items-center gap-8">
      <h2 ref={headingRef} className="section-heading text-center">
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
      <div ref={galleryRef} className="grid w-full lg:grid-cols-4 gap-4">
        {enhancedItems.map((item, i) => (
          <div
            key={item.id}
            className="gallery-item-wrapper"
            data-media-type={item.dataMediaType}
          >
            <GalleryItemTile title={item.title} media={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedGallery;