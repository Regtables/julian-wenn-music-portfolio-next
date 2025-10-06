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

export const revalidate = 60

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

      <AboutMobile
        heading={aboutSection?.heading}
        mediumBio={aboutSection?.mediumBio}
        fullBio={aboutSection?.fullBio}
        timelineSection={aboutSection?.timeline}
      />

      <UpcomingShows
        heading={upcomingShowsSection?.heading}
        upcomingShows={upcomingShowsSection?.upcomingShows}
      />

      <FeaturedMusic
        heading={featuredMusicSection.heading}
        featuredMusic={featuredMusicSection.featuredMusic}
      />

      <MusicVideos
        heading={musicVideosSection.heading}
        musicVideos={musicVideosSection.musicVideos}
      />

      <FeaturedAlbum
        heading={albumSection?.heading}
        album={albumSection?.album}
      />

      <FeaturedGallery
        heading={featuredGallerySection.heading}
        galleryItems={featuredGallerySection.featuredMedia}
      />

      <Contact
        heading={contactSection.heading}
        text={contactSection.text}
        image={contactSection.image}
      />

      <Footer />
    </div>
  );
}
