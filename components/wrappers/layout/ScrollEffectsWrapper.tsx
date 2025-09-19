"use client";

import React, { PropsWithChildren, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

type ScrollPinningWrapperProps = PropsWithChildren;

const ScrollEffectsWrapper = ({ children }: ScrollPinningWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1,
      smoothTouch: 0.1,
      normalizeScroll: true,
      ignoreMobileResize: true,
      effects: true,
    });

    const initPinning = () => {
      ScrollTrigger.create({
        trigger: ".socials",
        start: "top top",
        end: "+=2000",
        pin: ".socials-container",
        markers: true,
        pinSpacing: false,
      });

      ScrollTrigger.create({
        trigger: ".about",
        start: "top top",
        end: "+=2000",
        pin: ".about-container",
        pinSpacing: false,
        markers: true,
      });
    };

    initPinning();

    return () => {
      smoother?.kill()
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.pin) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div ref={wrapperRef} className="overflow-hidden">
      <div ref={contentRef}>{children}</div>
    </div>
  );
};

export default ScrollEffectsWrapper;
