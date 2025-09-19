"use client";

import { SanityImageWithAlt } from "@/app/lib/sanity/types";
import Image from "next/image";
import React from "react";
import Input from "../forms/Input";
import MainButton from "../buttons/MainButton";
import PhoneInfo from "../icons/PhoneInfo";
import EmailInfo from "../icons/EmailInfo";

type ContactProps = {
  heading: string;
  text: string;
  image: SanityImageWithAlt;
};

const Contact = ({ heading, text, image }: ContactProps) => {
  return (
    <section className="flex w-full h-screen">
      {/* Image */}
      <div className="relative h-full w-1/2">
        <Image
          alt={image.alt}
          src={image.image.asset.url}
          fill
          objectFit="cover"
        />
      </div>

      {/* Copy & Form */}
      <div className="flex text-custom-gold flex-col items-end w-1/2 gap-5 lg:px-section-x-desktop lg:pt-8 h-full justify-center">
        <h2 className="ml-auto w-auto text-8xl text-end uppercase">
          {heading}
        </h2>
        <p className="text-xs w-3/5 text-end">{text}</p>

        <div className="flex gap-8">
          <PhoneInfo />

          <EmailInfo />
        </div>

        {/* Form */}
        <form className="w-full flex flex-col gap-2">
          <div className="flex min-w-full gap-2">
            <Input placeholder="First Name" className="w-full" />

            <Input placeholder="Email Adress" type="email" />
          </div>

          <div className="flex gap-2">
            <Input placeholder="Instagram" />

            <Input placeholder="Country" />
          </div>

          <textarea
            className="w-full border-2 border-custom-gold rounded-lg px-3 py-2 placeholder:text-custom-gold"
            placeholder="Your Message"
          />

          <MainButton text="submit" className="w-full max-w-[unset]" />
        </form>
      </div>
    </section>
  );
};

export default Contact;
