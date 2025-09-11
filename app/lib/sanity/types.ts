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

// SEO
export type PageSeo = {
  title?: string
  description?: string
  noIndex?: boolean
  canonicalUrl?: string
  ogImage?: ImageWithAlt
}

// Sections
export type HeroSection = {
  _id: string
  title?: string
  heading?: string
  shortBio?: string
  backgroundImageDesktop?: SanityMedia
  backgroundImageMobile?: SanityMedia
}

export type SanityTimelineMilestone = {
  year?: string
  decription?: string
  images?: SanityMedia[]
}

export type SanityTimelineSection = {
  _id: string
  title?: string
  timeline?: SanityTimelineMilestone[]
}

export type AboutSection = {
  _id: string
  title?: string
  heading?: string
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

export type UpcomingShowsSection = {
  _id: string
  title?: string
  heading?: string
  upcomingShows?: UpcomingShow[]
}

// Home Page
export type SanityHomePageData = {
  _id: string
  title?: string
  heading?: string
  pageSeo?: PageSeo
  heroSection?: HeroSection
  aboutSection?: AboutSection
  upcomingShowsSection?: UpcomingShowsSection
  featuredMusicSection: SanityFeaturedMusicSection
  featuredGallerySection: {
    heading: string,
    featuredMedia: SanityMedia[]
  }
}

export type SanityFeaturedMusicSection = {
  title?: string,
  heading: string,
  featuredMusic: SanitySongType
}

export type SanitySongType = {
  name: string,
  artwork: SanityImageWithAlt
  description: string
}
