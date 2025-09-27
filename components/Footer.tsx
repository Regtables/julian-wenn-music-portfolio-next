"use client";

import React, { useMemo } from "react";
import { NAV_LINKS } from "./navigation/NavMenu";
import Link from "next/link";
import Image from "next/image";
import SocialIconStrip from "./icons/SocialIconStrip";
import PhoneInfo from "./icons/PhoneInfo";
import EmailInfo from "./icons/EmailInfo";
import { useAppSettings } from "@/context/AppSettingsContext";

const Footer = () => {
  const { isTablet, isMobile } = useAppSettings();

  const iconSizes = () => {
    if (isMobile) {
      return 28;
    } else if (isTablet) {
      return 36;
    } else if (!isMobile && isTablet) {
      return 72;
    }
  };

  return (
    <footer className="w-full">
      {/* Socials */}
      <div className="w-full bg-custom-gold lg:py-12 lg:px-section-x-desktop md:px-section-x-tablet md:py-8 py-4 flex md:justify-end justify-center">
        <SocialIconStrip iconSize={iconSizes()} color="black" className="" />
      </div>

      {/* Links & Copy */}
      <div className="lg:px-section-x-desktop md:px-section-x-tablet px-section-x-mobile lg:pt-12 md:pt-8 md:pb-6 pb-8 pt-8 text-custom-gold w-full flex md:flex-row flex-col items-center justify-between">
        <div className="flex flex-col md:items-start items-center gap-4">
          <div className="flex gap-4 md:flex-nowrap flex-wrap justify-center font-heading lg:text-sm md:text-xs uppercase tracking-[2px]">
            {NAV_LINKS.map((link, i) => (
              <Link href={link.slug} key={i} className="">
                {link.link}
              </Link>
            ))}
          </div>

          <Image
            src={"/logo.png"}
            width={100}
            height={100}
            alt="julian wenn logo"
            className="rounded-[3rem] md:hidden block"
          />

          <div className="flex gap-8">
            <PhoneInfo />

            <EmailInfo />
          </div>

          <div className="text-xs">© Julian Wenn 2025</div>
        </div>

        <Image
          src={"/logo.png"}
          width={100}
          height={100}
          alt="julian wenn logo"
          className="rounded-[3rem] md:block hidden"
        />
      </div>
    </footer>
  );
};

export default Footer;
