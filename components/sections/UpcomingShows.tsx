import { UpcomingShow } from "@/app/lib/sanity/types";
import { Calendar, MapPin } from "lucide-react";
import React from "react";

type UpcomingShowsProps = {
  heading: string;
  upcomingShows: UpcomingShow[];
};

const UpcomingShows = ({ heading, upcomingShows }: UpcomingShowsProps) => {
  return (
    <div className="min-h-screen relative z-20 lg:px-section-x-desktop lg:py-section-y-desktop">
      <h2 className="section-heading text-custom-gold">{heading}</h2>

      {upcomingShows.map((show, i) => (
        <div key={i} className="text-custom-gold flex items-center gap-8">
          <div>Month</div>
          <div className="border-2 border-custom-gold/30 p-6 grow rounded-lg">
            <div className="flex flex-col gap-6">
              <h3>{show.name}</h3>

              <div className="flex gap-6">
                <div className="flex gap-2">
                  <MapPin
                    // fill="var(--color-white)"
                    color="var(--color-white)"
                  />
                  <h4>
                    {show.venue}, {show.city}
                  </h4>
                </div>

                <div className="flex gap-2">
                  <Calendar
                    // fill="var(--color-white)"
                    color="var(--color-white)"
                  />
                  <h4>
                    {show.date}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingShows;
