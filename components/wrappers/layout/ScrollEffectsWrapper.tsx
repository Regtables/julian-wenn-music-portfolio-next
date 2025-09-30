"use client";

import React, { PropsWithChildren, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import { useAppSettings } from "@/context/AppSettingsContext";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

type ScrollPinningWrapperProps = PropsWithChildren;

// Export a function to get the smoother instance
export const getScrollSmoother = () => {
  return ScrollSmoother.get();
};

const ScrollEffectsWrapper = ({ children }: ScrollPinningWrapperProps) => {
  // const { isAnimationReady } = useAppSettings();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1,
      smoothTouch: 0.1,
      // normalizeScroll: true,
      // ignoreMobileResize: true,
      // effects: true,
    });

    function initNavigationColorChanges() {
      // Change to black when entering about section (scrolling down)
      ScrollTrigger.create({
        trigger: ".about",
        start: "top center",
        end: "+=20",
        onEnter: () => {
          gsap.to(".nav-menu-icon path", {
            stroke: "var(--color-black)",
            duration: 0.1
          });
        },
        onLeaveBack: () => {
          gsap.to(".nav-menu-icon path", {
            stroke: "var(--color-gold)",
            duration: 0.1
          });
        }
      });

      // Change to gold when entering upcoming section (scrolling down)
      ScrollTrigger.create({
        trigger: ".upcoming-section",
        start: "top center",
        end: "+=20",
        onEnter: () => {
          gsap.to(".nav-menu-icon path", {
            stroke: "var(--color-gold)",
            duration: 0.1
          });
        },
        onLeaveBack: () => {
          gsap.to(".nav-menu-icon path", {
            stroke: "var(--color-black)",
            duration: 0.1
          });
        }
      });
    }

    const initPinning = () => {
      ScrollTrigger.create({  
        trigger: ".socials",
        start: "top top",
        end: "bottom bottom",
        pin: ".socials-container",
        pinSpacing: false,
      });

      ScrollTrigger.create({
        trigger: ".about",
        start: "top top",
        end: "bottom bottom",
        pin: ".about-container",
        pinSpacing: false,
      });
    };

    initPinning();
    initNavigationColorChanges();

    return () => {
      smoother?.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
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