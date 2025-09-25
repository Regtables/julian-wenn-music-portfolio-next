"use client";

import React, { PropsWithChildren, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import { useAppSettings } from "@/context/AppSettingsContext";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

type ScrollPinningWrapperProps = PropsWithChildren;

const ScrollEffectsWrapper = ({ children }: ScrollPinningWrapperProps) => {
  const { isAnimationReady } = useAppSettings();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isAnimationReady) return;

    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1,
      smoothTouch: 0.1,
      normalizeScroll: true,
      ignoreMobileResize: true,
      effects: true,
    });

    function initNavigationColorChanges() {
      ScrollTrigger.create({
        trigger: ".about",
        start: "-=50",
        end: "+=20",
        animation: gsap.to(".nav-menu-icon path", {
          stroke: "var(--color-black)",
        }),
        scrub: true,
        markers: true,
      });

      ScrollTrigger.create({
        trigger: ".upcoming-section",
        start: "-=50",
        end: "+=20",
        animation: gsap.to(".nav-menu-icon path", {
          stroke: "var(--color-gold)",
        }),
        scrub: true,
      });
    }

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
        end: "+=4000",
        pin: ".about-container",
        pinSpacing: false,
        markers: true,
      });
    };

    initPinning();
    initNavigationColorChanges();

    return () => {
      smoother?.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.pin) {
          trigger.kill();
        }
      });
    };
  }, [isAnimationReady]);

  return (
    <div ref={wrapperRef} className="overflow-hidden">
      <div ref={contentRef}>{children}</div>
    </div>
  );
};

export default ScrollEffectsWrapper;
