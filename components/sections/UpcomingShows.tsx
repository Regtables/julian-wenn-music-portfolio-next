"use client";

import { UpcomingShow } from "@/app/lib/sanity/types";
import { useModal } from "@/context/ModalContext";
import { Calendar, Eye, MapPin, MoveUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";

gsap.registerPlugin(ScrollTrigger);

type UpcomingShowsProps = {
  heading: string;
  upcomingShows: UpcomingShow[];
};

const UpcomingShows = ({ heading, upcomingShows }: UpcomingShowsProps) => {
  const { handleModalOpen } = useModal();
  const { animateSectionHeading } = useGSAPAnimations();

  const handlePosterClick = (show: UpcomingShow) => {
    handleModalOpen("showPoster", { show });
  };

  useGSAP(() => {
    const upcomingIntro = gsap.timeline({
      scrollTrigger: {
        trigger: ".upcoming-section",
        start: "top 80%",
      },
    });

    const shows = gsap.utils.toArray(".upcoming-show");

    upcomingIntro
      .add(animateSectionHeading(".upcoming-heading"))
      .fromTo(shows, { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1 });

    return () => {
      upcomingIntro.kill();
    };
  }, []);

  return (
    <div
      className="upcoming-section relative z-20 section-padding flex flex-col md:gap-12 gap-8"
      id="upcoming-shows"
    >
      <h2 className="upcoming-heading section-heading text-custom-gold">
        {heading}
      </h2>

      {upcomingShows.map((show, i) => (
        <div
          key={i}
          className="upcoming-show text-custom-gold flex md:flex-row flex-row items-center md:gap-8 gap-4"
        >
          <div>Month</div>
          <div className="border-2 border-custom-gold/30 md:p-6 p-4 grow rounded-lg flex md:flex-row flex-col justify-between items-center md:gap-0 gap-4">
            <div className="flex flex-col md:items-start items-center gap-6">
              <h3 className="font-heading uppercase tracking-[3px] text-sm">
                {show.name}
              </h3>

              <div className="flex gap-6">
                <div className="flex gap-2 md:w-auto w-1/2 items-center">
                  <MapPin
                    // fill="var(--color-white)"
                    color="var(--color-white)"
                    size={"16px"}
                    className="min-w-4"
                  />
                  <h4 className="text-xs">
                    {show.venue}, {show.city}
                  </h4>
                </div>

                <div className="flex gap-2 md:w-auto w-1/2 ">
                  <Calendar
                    // fill="var(--color-white)"
                    color="var(--color-white)"
                    size={"1rem"}
                  />
                  <h4 className="text-xs">{show.date}</h4>
                </div>
              </div>
            </div>
            <div className="flex gap-8">
              <div
                className="flex gap-2 md:w-auto w-1/2  md:items-center items-start text-xs uppercase border-b-2 border-custom-gold/0 box-border hover:border-custom-gold py-1 transition-all duration-500 cursor-pointer"
                onClick={() => handlePosterClick(show)}
              >
                view poster
                <Eye size={16}  />
              </div>

              <div className="flex gap-2 md:w-auto w-1/2  items-center text-xs uppercase border-b-2 border-custom-gold/0 box-border hover:border-custom-gold py-1 transition-all duration-500 cursor-pointer">
                get tickets
                <MoveUpRight size={16} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingShows;
