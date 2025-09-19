import React, { useRef } from "react";
import gsap from "gsap";

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

  return (
    <div
      className="relative overflow-hidden h-[200px] w-[200px] bg-custom-gold rounded-full cursor-pointer"
      onMouseEnter={() => handleHover("start")}
      onMouseLeave={() => handleHover("end")}
    >
      <div className="rounded-full w-full h-full flex flex-col gap-4 items-center justify-center relative z-10">
        {icon}

        <h4 className="font-heading text-3xl w-3/5 mx-auto font-bold text-center">{title}</h4>
      </div>

      <div
        className="h-[200px] w-[200px] bg-custom-white absolute -bottom-full rounded-full"
        ref={circleSlideBg}
      />
    </div>
  );
};

export default HeroNavCircle;
