"use client";

import { Menu } from "lucide-react";
import React, { useRef, useState } from "react";
import NavMenu from "./NavMenu";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import MenuIcon from "../icons/MenuIcon";

gsap.registerPlugin(useGSAP);

const Nav: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const navMenuRef = useRef<HTMLDivElement>(null);
  const navSlideBgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".nav-menu-icon",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.5,
        scrollTrigger: { trigger: ".nav-menu-icon" },
      }
    );
  }, []);

  const handleNavOpen = (): void => {
    const navTl = gsap.timeline();
    navTl.to(
      navSlideBgRef.current,
      {
        xPercent: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      0
    );
    navTl.to(
      navMenuRef.current,
      {
        xPercent: 0,
        delay: 0.2,
        duration: 0.8,
        ease: "circ.out",
      },
      0
    );
    setIsNavOpen(true);
  };

  const handleNavClose = (): void => {
    const navTl = gsap.timeline();
    navTl.to(
      navMenuRef.current,
      {
        xPercent: -100,
        duration: 0.8,
        ease: "power.out",
      },
      0
    );
    navTl.to(
      navSlideBgRef.current,
      {
        xPercent: -100,
        duration: 0.8,
        delay: 0.2,
        ease: "power.out",
      },
      0
    );
    setIsNavOpen(false);
  };

  const handleMenuClick = (): void => {
    if (isNavOpen) {
      handleNavClose();
    } else {
      handleNavOpen();
    }
  };

  useGSAP(() => {
    gsap.set([navMenuRef.current, navSlideBgRef.current], {
      xPercent: -100,
      visibility: "visible", // Make them visible but off-screen
    });
  }, []);

  return (
    <nav>
      <MenuIcon
        // This is what your ScrollTrigger targets
        color="var(--color-gold)" // Default color
        size={32}
        onClick={handleMenuClick}
        className="nav-menu-icon fixed lg:left-16 md:left-12 left-4 lg:top-8 md:top-4 top-4 top-padding-y-mobile cursor-pointer z-50"
      />

      <NavMenu ref={navMenuRef} handleClose={handleNavClose} />
      <div
        ref={navSlideBgRef}
        className="nav-slide-bg z-40 h-screen w-screen bg-[var(--color-gold)] fixed top-0 right-0 invisible"
      />
    </nav>
  );
};

export default Nav;
