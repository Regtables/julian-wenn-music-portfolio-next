import {
  MEDIA_FRAGMENT,
  PAGE_FRAGMENT,
} from './fragments'

export const SANITY_HOME_PAGE_QUERY = `*[_type == "homePage"][0]{
  ${PAGE_FRAGMENT},

  heroSection->{
    title,
    heading,
    backgroundImageDesktop->${MEDIA_FRAGMENT},
    backgroundImageMobile->${MEDIA_FRAGMENT},
    shortBio
  },

  aboutSection->{
    title,
    heading,
    mediumBio,
    fullBio,
    timeline->{
      timeline[]{
        year,
        description,
        images[]->${MEDIA_FRAGMENT}
      }
    }
  },

  upcomingShowsSection->{
    title,
    heading,
    upcomingShows[]{
      name,
      venue,
      city,
      date,
      poster{
        image{
          asset->{
            url,
            metadata
          }
        },
        alt
      },
      eventLink
    }
  },

  featuredMusicSection->{
    title,
    heading,
    featuredMusic[]->{
      name,
      description,
      artwork{
        image{
          asset->
        },
        alt
      },
      links
    }
  },

  featuredGallerySection->{
    title,
    heading,
    featuredMedia[]->${MEDIA_FRAGMENT}
  },

  contactSection->{
    heading,
    text,
    image{
      image{
        asset->{
          url
        },
      },
      alt
    }
  },

  albumSection->{
    heading,
    album->{
      albumTitle,
      artwork{
        image{
          asset->{
            url
          }
        },
        alt
      },
      description,
      listenLinks,
      trackList[]->
    }
  },

  musicVideosSection->{
    heading,
    musicVideos[]->
  }
}`

export const SANITY_CONTACT_INFO_QUERY = `*[_type == "contactInfo"][0]{
  _id,
  _type,
  email,
  phone,
  address,
  workingHours,
  socialMedia{
    instagram,
    facebook,
    twitter,
    tiktok,
    youtube,
    spotify,
    appleMusic,
    youtubeMusic,
    soundcloud,
    bandcamp,
    deezer,
    linkedin,
    threads
  }
}`;
