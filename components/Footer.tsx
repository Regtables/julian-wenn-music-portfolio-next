import React from "react";
import { NAV_LINKS } from "./navigation/NavMenu";
import Link from "next/link";
import Image from "next/image";
import SocialIconStrip from "./icons/SocialIconStrip";
import PhoneInfo from "./icons/PhoneInfo";
import EmailInfo from "./icons/EmailInfo";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="w-full">
      {/* Socials */}
      <div className="w-full bg-custom-gold lg:py-12 lg:px-section-x-desktop flex justify-end">
        {/* <SocialIconStrip iconSize={72} /> */}
      </div>

      {/* Links & Copy */}
      <div className="lg:px-section-x-desktop lg:pt-12 text-custom-gold w-full flex justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 font-heading text-sm uppercase tracking-[2px]">
            {NAV_LINKS.map((link, i) => (
              <Link href={link.slug} key={i} className="">
                {link.link}
              </Link>
            ))}
          </div>

          <div className="flex gap-8">
            <PhoneInfo />

            <EmailInfo />
          </div>

          <div className="text-xs">
            © Julian Wenn 2025
          </div>
        </div>

        <div>
          <Image src={'/logo.png'} width={100} height={100} alt = 'julian wenn logo' className="rounded-[3rem]"/>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
