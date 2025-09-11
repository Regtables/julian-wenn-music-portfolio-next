import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

const NAV_LINKS = [
  {
    link: "home",
    slug: "#",
  },
  {
    link: "featured music",
    slug: "#featured-music",
  },
  {
    link: "about",
    slug: "#about",
  },
  {
    link: "music videos",
    slug: "#music-videos",
  },
  {
    link: "upcoming shows",
    slug: "#upcoming-shows",
  },
  {
    link: "featured gallery",
    slug: "#featured-gallery",
  },
  {
    link: "the album",
    slug: "#album",
  },
  {
    link: "contact",
    slug: "#contact",
  },
];

interface NavMenuProps {
  ref: any;
  handleClose: () => void;
}

const NavMenu = ({ ref, handleClose }: NavMenuProps) => {
  return (
    <div
      className="nav-menu z-50 flex h-screen w-screen bg-[var(--color-black)] fixed top-0 -left-full right-0 bottom-0 lg:px-[var(--padding-section-x-desktop)] py-16"
      ref={ref}
    >
      <div className="relative w-full h-full">
        <div className="nav-close cursor-pointer absolute border-[var(--color-gold)] border-solid border-2 right-0 top-0 h-24 w-24 rounded-full flex justify-center items-center" onClick={handleClose}>
          <X color="var(--color-gold)" size={"3rem"} strokeWidth={"1px"} />
        </div>
        <div className="flex flex-col justify-between h-full text-[var(--color-gold)]">
          {NAV_LINKS.map((link, i) => (
            <Link key={i} href={link.slug} className="text-6xl uppercase">
              {link.link}
            </Link>
          ))}
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default NavMenu;
