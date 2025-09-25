import { X } from "lucide-react";
import Link from "next/link";
import React from "react";
import SocialIconStrip from "../icons/SocialIconStrip";
import { navigateToSection } from "@/app/lib/utils";

export const NAV_LINKS = [
  {
    link: "home",
    slug: "home",
  },
  {
    link: "about",
    slug: "about",
  },
  {
    link: "upcoming shows",
    slug: "upcoming-shows",
  },
  {
    link: "featured music",
    slug: "featured-music",
  },
  {
    link: "the album",
    slug: "featured-album",
  },
  {
    link: "music videos",
    slug: "music-videos",
  },
  {
    link: "featured gallery",
    slug: "featured-gallery",
  },
  {
    link: "contact",
    slug: "contact",
  },
];

interface NavMenuProps {
  ref: any;
  handleClose: () => void;
}

const NavMenu = ({ ref, handleClose }: NavMenuProps) => {
  const handleItemClick = (item) => {
    navigateToSection(item.slug)
    handleClose()
  }
  return (
    <div
className="nav-menu z-50 flex h-screen w-screen bg-[var(--color-black)] fixed top-0 left-0 right-0 bottom-0 lg:px-[var(--padding-section-x-desktop)] py-16 invisible"
      ref={ref}
    >
      <div className="relative flex justify-between items-end w-full h-full">
        <div
          className="nav-close cursor-pointer absolute border-[var(--color-gold)] border-solid border-2 right-0 top-0 h-24 w-24 rounded-full flex justify-center items-center"
          onClick={handleClose}
        >
          <X color="var(--color-gold)" size={"3rem"} strokeWidth={"1px"} />
        </div>
        <div className="flex flex-col justify-between h-full text-[var(--color-gold)]">
          {NAV_LINKS.map((link, i) => (
            <div
              key={i}
              // href={link.slug}
              className="text-6xl uppercase font-heading tracking-[1px] hover:text-custom-white transition-colors duration-500"
              onClick={() => handleItemClick(link)}
            >
              {link.link}
            </div>
          ))}
        </div>

        <div>
          <SocialIconStrip iconSize={24} />
        </div>
      </div>
    </div>
  );
};

export default NavMenu;
