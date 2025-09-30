'use client'

import Image from "next/image";
import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

type Props = {};

const LoadingScreen = (props: Props) => {
  useGSAP(() => {
    const loadingTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.loading-screen'
      }
    })

    gsap.set('.loading-logo', { autoAlpha: 0, scale: 0.8 })
    gsap.set('.nav-menu-icon', { autoAlpha: 0 })

    loadingTl
      .to('.loading-screen', { opacity: 1, duration: 0 })
      .to('.loading-logo', { autoAlpha: 1, scale: 1, duration: 2 })
      .to('.loading-screen', { autoAlpha: 0 }, "-=0.5")
      .to('.nav-menu-icon', { autoAlpha: 1 })

  },[])
  return (
    <div className="loading-screen opacity-0 fixed top-0 left-0 right-0 z-40 h-screen w-screen bg-custom-black flex justify-center items-center">
      <div className="h-[150px] w-[130px] relative">
        <Image
          src={"/logo.png"}
          fill
          alt="Julian Wenn Logo"
          objectFit="cover"
          className="rounded-[50px] loading-logo"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
