"use client";

import { SanityImageWithAlt } from "@/app/lib/sanity/types";
import Image from "next/image";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";
import Input from "../forms/Input";
import MainButton from "../buttons/MainButton";
import PhoneInfo from "../icons/PhoneInfo";
import EmailInfo from "../icons/EmailInfo";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type ContactProps = {
  heading: string;
  text: string;
  image: SanityImageWithAlt;
};

const Contact = ({ heading, text, image }: ContactProps) => {
  // Refs for animation targeting
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);

  const { animateSectionHeading } = useGSAPAnimations();

  useGSAP(() => {
    const contactTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 90%'
      }
    });

    const contentContainer = contentContainerRef.current;

    // Set initial state - elements invisible
    contactTl.set([imageRef.current, contentContainer?.children], {
      autoAlpha: 0
    }, 0);

    // Animation sequence matching your Webflow pattern
    contactTl
      .add(animateSectionHeading(headingRef.current))
      .fromTo(imageRef.current, 
        { autoAlpha: 0 }, 
        { 
          autoAlpha: 1,
          duration: 0.6,
          ease: "power2.out"
        }
      )
      .fromTo(contentContainer?.children, 
        { 
          y: 0,
          autoAlpha: 0
        },
        {
          y: 30,
          autoAlpha: 1,
          stagger: 0.15,
          duration: 0.5,
          ease: 'circ.out'
        }
      );

    return () => {
      contactTl.kill();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="contact-us flex md:flex-row flex-col w-full lg:!h-screen md:!h-[60vh] md:min-h-[unset] min-h-screen"
      id = 'contact'
    >
      {/* Image */}
      <div 
        ref={imageRef}
        className="contact-us-image relative md:h-full md:w-1/2 w-full md:aspect-auto aspect-square"
      >
        <Image
          alt={image.alt}
          src={image.image.asset.url}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Copy & Form */}
      <div 
        ref={contentContainerRef}
        className="contact-us-form-container flex text-custom-gold flex-col md:items-end items-center md:w-1/2 gap-5 lg:px-section-x-desktop md:px-section-x-tablet px-section-x-mobile lg:pt-8 pb-4 h-full justify-center"
      >
        <h2 
          ref={headingRef}
          className="contact-us-heading md:ml-auto w-auto lg:text-8xl md:text-6xl text-4xl md:text-end text-center uppercase"
        >
          {heading}
        </h2>
        
        <p className="text-xs w-3/5 md:text-end text-center">{text}</p>

        <div className="flex gap-8">
          <PhoneInfo />
          <EmailInfo />
        </div>

        {/* Form */}
        <form className="w-full flex flex-col gap-2">
          <div className="flex min-w-full gap-2">
            <Input placeholder="First Name" className="w-full" />
            <Input placeholder="Email Address" type="email" />
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