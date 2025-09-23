"use client";

import React, { useRef } from "react";
import Line from "../Line";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";
import { useAppSettings } from "@/context/AppSettingsContext";

gsap.registerPlugin(ScrollTrigger);

type Props = {};

const Socials = (props: Props) => {
  // Refs for animation targeting
  const { isAnimationReady } = useAppSettings()
  const sectionRef = useRef<HTMLDivElement>(null);
  const followHeadingRef = useRef<HTMLHeadingElement>(null);
  const listenHeadingRef = useRef<HTMLHeadingElement>(null);
  const followIconsRef = useRef<HTMLDivElement>(null);
  const listenIconsRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const svgCircleRef = useRef<SVGPathElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const { animateSectionHeading } = useGSAPAnimations();

  useGSAP(() => {
    if(!isAnimationReady) return
    // Intro animations - headings and icons
    if (followHeadingRef.current) {
      gsap.from(followHeadingRef.current, {
        y: 50,
        autoAlpha: 0,
        duration: 0.4,
        ease: "circ.out",
        scrollTrigger: {
          trigger: followHeadingRef.current,
          start: "top 80%"
        }
      });
    }

    if (listenHeadingRef.current) {
      gsap.from(listenHeadingRef.current, {
        y: 50,
        autoAlpha: 0,
        duration: 0.4,
        ease: "circ.out",
        scrollTrigger: {
          trigger: listenHeadingRef.current,
          start: "top 80%"
        }
      });
    }

    // Left icons (follow) - stagger from start
    if (followIconsRef.current) {
      gsap.from(followIconsRef.current.children, {
        y: 30,
        autoAlpha: 0,
        stagger: { each: 0.1, from: "start" },
        ease: "circ.out",
        scrollTrigger: {
          trigger: followIconsRef.current,
          start: "top 80%"
        }
      });
    }

    // Right icons (listen) - stagger from end
    if (listenIconsRef.current) {
      gsap.from(listenIconsRef.current.children, {
        y: 30,
        autoAlpha: 0,
        stagger: { each: 0.1, from: "end" },
        ease: "circ.out",
        scrollTrigger: {
          trigger: listenIconsRef.current,
          start: "top 80%"
        }
      });
    }

    // Circle + Logo setup
    const svgCircle = svgCircleRef.current;
    const logo = logoRef.current;

    if (svgCircle) {
      const circumference = 2 * Math.PI * 40; // radius = 40
      gsap.set(svgCircle, {
        strokeDasharray: circumference,
        strokeDashoffset: circumference,
        opacity: 0
      });
    }

    if (logo) {
      gsap.set(logo, { opacity: 0, scale: 0.9 });
    }

    // Set initial line positions
    gsap.set([topLineRef.current, bottomLineRef.current], {
      xPercent: (index) => (index === 0 ? -80 : 80)
    });

    // Scroll-based animations
    const socialsTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "+=1500",
        scrub: true,
      },
    });

    // Animate lines to center
    socialsTimeline.to([topLineRef.current, bottomLineRef.current], {
      xPercent: 0,
      ease: "none",
      duration: 1
    }, 0);

    // Circle trace animation
    if (svgCircle) {
      socialsTimeline.to(svgCircle, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 0.5,
        ease: "none"
      }, 1);
    }

    // Logo reveal
    if (logo) {
      socialsTimeline.to(logo, {
        opacity: 1,
        scale: 1,
        duration: 0.5
      }, "-=0.1");
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [isAnimationReady]);

  return (
    <div 
      ref={sectionRef}
      className="socials section socials-section flex flex-col justify-between w-full min-h-screen h-[300vh] py-[96px]"
    >
      <div className="socials-container overflow-hidden">
        {/* Top Line */}
        <div ref={topLineRef} className="socials-horizontal-line">
          <Line className="socials-top-line h-[4px] w-full bg-custom-gold" />
        </div>

        <div className="px-section-x-desktop py-section-y-desktop relative">
          {/* Follow */}
          <div className="flex flex-col justify-between items-start">
            <h3 
              ref={followHeadingRef}
              className="socials-heading left socials-follow text-custom-gold text-9xl font-heading uppercase"
            >
              Follow
            </h3>

            <div 
              ref={followIconsRef}
              className="socials-icons left text-custom-gold flex gap-4"
            >
              <div className="w-8 h-8 bg-custom-gold rounded">IG</div>
              <div className="w-8 h-8 bg-custom-gold rounded">TW</div>
              <div className="w-8 h-8 bg-custom-gold rounded">FB</div>
            </div>
          </div>

          {/* Center Circle + Logo */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg 
              width="100" 
              height="100" 
              viewBox="0 0 100 100"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <path
                ref={svgCircleRef}
                className="circle-path"
                d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                fill="none"
                stroke="var(--color-gold)"
                strokeWidth="2"
              />
            </svg>
            
            <div 
              ref={logoRef}
              className="socials-logo w-16 h-16 bg-custom-gold rounded-full flex items-center justify-center text-custom-black font-bold"
            >
              JW
            </div>
          </div>

          {/* Listen */}
          <div className="flex flex-col-reverse justify-between items-end">
            <h3 
              ref={listenHeadingRef}
              className="socials-heading right socials-listen text-custom-gold text-9xl font-heading uppercase"
            >
              Listen
            </h3>

            <div 
              ref={listenIconsRef}
              className="socials-icons right text-custom-gold flex gap-4"
            >
              <div className="w-8 h-8 bg-custom-gold rounded">SP</div>
              <div className="w-8 h-8 bg-custom-gold rounded">AM</div>
              <div className="w-8 h-8 bg-custom-gold rounded">YT</div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div ref={bottomLineRef} className="socials-horizontal-line line-2">
          <Line className="socials-bottom-line h-[4px] w-full bg-custom-gold" />
        </div>
      </div>
    </div>
  );
};

export default Socials;