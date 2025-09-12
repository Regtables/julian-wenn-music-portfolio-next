export type SanityImageWithAlt = {
  image: SanityImage,
  alt: string
}

export type SanityImage = {
  asset: {
    _ref: string;
    _type: 'reference';
  };
  _type: 'image';
}

export type SanityTextBlock = {
  _type: 'block';
  children: Array<{
    text: string;
  }>;
};

// Shared
export type ImageWithAlt = {
  alt?: string
  url: string
  metadata?: unknown
}

export type SanityMedia = {
  _id: string
  title?: string
  mediaType: 'image' | 'youtube' | 'video'
  alt?: string
  fileUrl?: string
  videoUrlWebm?: string
  videoUrlMp4?: string
  imageWithAlt?: ImageWithAlt
}

export type SanityMusicVideoSection = {
  heading: string,
  musicVideos: SanityMusicVideo[]
}

export type SanityMusicVideo = {
  name:string,
  url: string
}

// SEO
export type PageSeo = {
  title?: string
  description?: string
  noIndex?: boolean
  canonicalUrl?: string
  ogImage?: ImageWithAlt
}

// Listen/Song Links
export type SongLinks = {
  spotify?: string
  appleMusic?: string
  youtube?: string
  soundcloud?: string
  bandcamp?: string
  amazonMusic?: string
}

// Base Section (for reusable section fields)
export type BaseSection = {
  _id: string
  title?: string
  heading?: string
}

// Sections
export type HeroSection = BaseSection & {
  shortBio?: string
  backgroundImageDesktop?: SanityMedia
  backgroundImageMobile?: SanityMedia
}

export type SanityTimelineMilestone = {
  year?: string
  description?: string // Fixed typo from "decription"
  images?: SanityMedia[]
}

export type SanityTimelineSection = BaseSection & {
  timeline?: SanityTimelineMilestone[]
}

export type AboutSection = BaseSection & {
  mediumBio?: SanityTextBlock // Portable Text
  fullBio?: SanityTextBlock   // Portable Text
  timeline?: SanityTimelineSection
}

export type UpcomingShow = {
  name?: string
  venue?: string
  city?: string
  date?: string
  eventLink?: string
  poster?: ImageWithAlt
}

export type UpcomingShowsSection = BaseSection & {
  upcomingShows?: UpcomingShow[]
}

// Enhanced Song Type
export type SanitySongType = {
  _id: string
  name: string
  artwork: SanityImageWithAlt
  description: string
  duration?: string
  trackNumber?: number
  listenLinks?: SongLinks
  lyrics?: string
  isExplicit?: boolean
}

// Album Type
export type SanityAlbum = {
  _id: string
  albumTitle: string
  description?: string
  artwork: SanityImageWithAlt
  listenLinks?: SongLinks
  trackList?: SanitySongType[]
  releaseDate?: string
  genre?: string
  totalDuration?: string
  isExplicit?: boolean
}

// Album Section
export type AlbumSection = BaseSection & {
  album: SanityAlbum
}

// Contact Section
export type ContactSection = BaseSection & {
  image: SanityImageWithAlt
  text: string
}

export type SanityFeaturedMusicSection = BaseSection & {
  featuredMusic: SanitySongType[]
}

export type FeaturedGallerySection = BaseSection & {
  featuredMedia: SanityMedia[]
}

// Home Page (Updated with new sections)
export type SanityHomePageData = {
  _id: string
  title?: string
  heading?: string
  pageSeo?: PageSeo
  heroSection?: HeroSection
  aboutSection?: AboutSection
  upcomingShowsSection?: UpcomingShowsSection
  featuredMusicSection?: SanityFeaturedMusicSection,
  musicVideosSection: SanityMusicVideoSection
  featuredGallerySection?: FeaturedGallerySection
  albumSection?: AlbumSection
  contactSection?: ContactSection
}