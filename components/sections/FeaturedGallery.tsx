"use client";

import { SanityMedia } from "@/app/lib/sanity/types";
import React, { useState } from "react";
import GalleryNavigator from "../GalleryNavigator";
import GalleryItemTile from "../GalleryItemTile";

type FeaturedGalleryProps = {
  heading: string;
  galleryItems: SanityMedia[];
};

const FeaturedGallery = ({ heading, galleryItems }: FeaturedGalleryProps) => {
  const [activeItem, setActiveItem] = useState("all");
  const [filteredItems, setFilteredItems] = useState(galleryItems);

  const handleItemClick = (item) => {};

  return (
    <section className="section-padding flex flex-col items-center gap-8">
      <h2 className="section-heading text-center">{heading}</h2>

      {/* Navigator */}
      <GalleryNavigator
        activeItem={activeItem}
        handleItemClick={handleItemClick}
      />

      {/* Gallery */}
      <div className="grid w-full lg:grid-cols-4 gap-4">
        {filteredItems.map((item, i) => (
          <GalleryItemTile 
            key={i} 
            title={item.title} 
            media={item} 
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedGallery;
