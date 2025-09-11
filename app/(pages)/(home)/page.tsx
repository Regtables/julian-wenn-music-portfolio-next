import Hero from "@/components/sections/Hero";
import { sanityFetchHomePage } from "../../lib/sanity/actions";
import Socials from "@/components/sections/Socials";
import About from "@/components/sections/About";
import UpcomingShows from "@/components/sections/UpcomingShows";
import FeaturedMusic from "@/components/sections/FeaturedMusic";
import FeaturedGallery from "@/components/sections/FeaturedGallery";

export default async function Home() {
  const page = await sanityFetchHomePage();
  const { heroSection, aboutSection, upcomingShowsSection, featuredMusicSection, featuredGallerySection } = page;
  console.log(page);
  return (
    <div className="">
      <Hero
        shortBio={heroSection?.shortBio}
        bgImageDesktop={heroSection?.backgroundImageDesktop}
      />

      <Socials />

      <About
        heading={aboutSection?.heading}
        mediumBio={aboutSection?.mediumBio}
        fullBio={aboutSection?.fullBio}
        timelineSection={aboutSection?.timeline}
      />

      <UpcomingShows
        heading= {upcomingShowsSection?.heading}
        upcomingShows={upcomingShowsSection?.upcomingShows}
      />

      <FeaturedMusic 
        heading= {featuredMusicSection.heading}
        featuredMusic={featuredMusicSection.featuredMusic}
      />

      <FeaturedGallery 
        heading= {featuredGallerySection.heading}
        galleryItems={featuredGallerySection.featuredMedia}
      />  
    </div>
  );
}
