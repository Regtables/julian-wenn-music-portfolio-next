import { X } from "lucide-react";
import Link from "next/link";
import React from "react";
import SocialIconStrip from "../icons/SocialIconStrip";
import { navigateToSection } from "@/app/lib/utils";
import PhoneInfo from "../icons/PhoneInfo";
import EmailInfo from "../icons/EmailInfo";

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
    navigateToSection(item.slug);
    handleClose();
  };
  return (
    <div
      className="nav-menu z-50 flex h-screen w-screen bg-[var(--color-black)] fixed top-0 left-0 right-0 bottom-0 section-padding py-16 invisible"
      ref={ref}
    >
      <div className="relative flex lg:flex-row flex-col justify-between lg:items-end items-start w-full h-full">
        <div
          className="nav-close cursor-pointer absolute border-[var(--color-gold)] border-solid border-2 right-0 top-0 md:h-24 md:w-24 h-16 w-16 rounded-full flex justify-center items-center"
          onClick={handleClose}
        >
          <X color="var(--color-gold)" size={"3rem"} strokeWidth={"1px"} className="md:size-auto size-8" />
        </div>
        <div className="flex flex-col lg:justify-between h-full text-[var(--color-gold)] lg:gap-0 md:gap-4 gap-2">
          {NAV_LINKS.map((link, i) => (
            <div
              key={i}
              // href={link.slug}
              className="lg:text-6xl md:text-6xl text-3xl uppercase font-heading tracking-[1px] hover:text-custom-white transition-colors duration-500 cursor-pointer"
              onClick={() => handleItemClick(link)}
            >
              {link.link}
            </div>
          ))}
        </div>

        <div className="text-custom-gold flex flex-col lg:items-end gap-4">
          <PhoneInfo />
          <EmailInfo />
          <SocialIconStrip iconSize={24} />
        </div>
      </div>
    </div>
  );
};

export default NavMenu;
