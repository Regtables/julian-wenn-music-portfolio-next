import React, { useRef } from "react";
import gsap from "gsap";
import { navigateToSection } from "@/app/lib/utils";

gsap.registerPlugin();

type HeroNavCircleProps = {
  icon: any;
  title: string;
  link: string;
};

const HeroNavCircle = ({ icon, title, link }: HeroNavCircleProps) => {
  const circleSlideBg = useRef<HTMLDivElement>(null);

  const handleHover = (phase: string) => {
    const hoverTl = gsap.timeline();

    hoverTl.to(circleSlideBg.current, { yPercent: phase === "start" ? -100 : 100, duration: 0.5, ease: 'power1.out' });
  };

  const handleClick = (itemLink) => {
    navigateToSection(itemLink)
  }

  return (
    <div
      className="relative overflow-hidden md:h-[200px] md:w-[200px] h-[100px] w-[100px] bg-custom-gold rounded-full cursor-pointer"
      onMouseEnter={() => handleHover("start")}
      onMouseLeave={() => handleHover("end")}
      onClick={() => handleClick(link)}
    >
      <div className="rounded-full w-full h-full flex flex-col md:gap-4 gap-2 items-center justify-center relative z-10">
        {icon}

        <h4 className="font-heading md:text-3xl text-lg md:leading-8 leading-5 md:w-3/5 w-4/5 md:mx-auto font-bold text-center">{title}</h4>
      </div>

      <div
        className="md:h-[200px] md:w-[200px] h-[100px] w-[100px] bg-custom-white absolute -bottom-full rounded-full"
        ref={circleSlideBg}
      />
    </div>
  );
};

export default HeroNavCircle;
