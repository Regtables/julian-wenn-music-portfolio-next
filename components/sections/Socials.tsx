'use client'

import React from "react";
import Line from "../Line";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger)

type Props = {};

const Socials = (props: Props) => {
  useGSAP(() => {
    const socialsTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.socials',
        start: "top bottom",
        end: "+=1500",
        scrub: true,
      },
    });
  
    socialsTimeline.to(
      ['.socials-top-line', '.socials-bottom-line'],
      {
        translateX: '3/4',
        ease: "none",
        duration: 0.5,
      },
      0
    );
  }, [])


  return (
    <div className="socials flex flex-col justify-between w-full min-h-screen h-[300vh] py-[96px]">
      <div className="socials-container overflow-hidden">
        <Line className="-translate-x-3/4 socials-top-line" />
        <div className="px-section-x-desktop py-section-y-desktop">
          {/* Follow */}
          <div className="flex flex-col justify-between items-start">
            <h3 className="text-custom-gold text-9xl font-heading uppercase">Follow</h3>

            <div className="text-custom-gold flex">
              <div>icon</div>
              <div>icon</div>
              <div>icon</div>
            </div>
          </div>

          {/* Listen */}
          <div className="flex flex-col-reverse justify-between items-end">
            <h3 className="text-custom-gold text-9xl font-heading uppercase">Listen</h3>

            <div className="text-custom-gold flex">
              <div>icon</div>
              <div>icon</div>
              <div>icon</div>
            </div>
          </div>
        </div>
        <Line className="translate-x-3/4 socials-bottom-line" />
      </div>
    </div>
  );
};

export default Socials;
