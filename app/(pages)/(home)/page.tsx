import Hero from "@/components/sections/Hero";
import { sanityFetchHomePage } from "../../lib/sanity/actions";
import Socials from "@/components/sections/Socials";
import About from "@/components/sections/About";
import UpcomingShows from "@/components/sections/UpcomingShows";
import FeaturedMusic from "@/components/sections/FeaturedMusic";
import FeaturedGallery from "@/components/sections/FeaturedGallery";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import FeaturedAlbum from "@/components/sections/FeaturedAlbum";
import MusicVideos from "@/components/sections/MusicVideos";
import AboutMobile from "@/components/sections/AboutMobile";
import { Wallet } from "lucide-react";

export const revalidate = 60;

export default async function Home() {
  const page = await sanityFetchHomePage();
  const {
    heroSection,
    aboutSection,
    upcomingShowsSection,
    featuredMusicSection,
    featuredGallerySection,
    contactSection,
    albumSection,
    musicVideosSection,
  } = page;
  return (
    <div className="">
      <Hero shortBio={heroSection?.shortBio} bgImageDesktop={heroSection?.backgroundImageDesktop} />

      <Socials />

      <About
        heading={aboutSection?.heading}
        mediumBio={aboutSection?.mediumBio}
        fullBio={aboutSection?.fullBio}
        timelineSection={aboutSection?.timeline}
      />

      <AboutMobile
        heading={aboutSection?.heading}
        mediumBio={aboutSection?.mediumBio}
        fullBio={aboutSection?.fullBio}
        timelineSection={aboutSection?.timeline}
      />

      <UpcomingShows heading={upcomingShowsSection?.heading} upcomingShows={upcomingShowsSection?.upcomingShows} />

      {/* <FeaturedMusic
        heading={featuredMusicSection.heading}
        featuredMusic={featuredMusicSection.featuredMusic}
      /> */}

      <MusicVideos heading={musicVideosSection.heading} musicVideos={musicVideosSection.musicVideos} />

      <FeaturedAlbum heading={albumSection?.heading} album={albumSection?.album} />

      {/* <div className="w-full flex flex-col items-center gap-4 justify-center section-padding !pb-0">
        <div className="text-custom-gold font-baskerville">
          All the music Julian releases is completely free. Concider donating to support the artist process.
        </div>
        <button className="px-4 py-2 bg-custom-gold text-sm items-center rounded-full flex gap-2 font-medium">
          Donate <Wallet />
        </button>
      </div> */}

      <FeaturedGallery heading={featuredGallerySection.heading} galleryItems={featuredGallerySection.featuredMedia} />

      <Contact heading={contactSection.heading} text={contactSection.text} image={contactSection.image} />

      <Footer />
    </div>
  );
}
