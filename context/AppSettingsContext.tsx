"use client";

import { createContext, FC, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

// Types for your settings
interface ContactDetails {
  email: string;
  phone: string;
  address?: string;
  workingHours?: string;
  socialMedia: {
    // Social platforms
    instagram?: string;
    facebook?: string;
    twitter?: string;
    tiktok?: string;
    youtube?: string;
    
    // Music streaming platforms
    spotify?: string;
    appleMusic?: string;
    youtubeMusic?: string;
    soundcloud?: string;
    bandcamp?: string;
    deezer?: string;
    
    // Optional additional platforms
    linkedin?: string;
    threads?: string;
  };
}

interface NavMenuSettings {
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  menuItems: {
    title: string;
    href: string;
    subItems?: Array<{
      title: string;
      href: string;
    }>;
  }[];
}

interface SeoSettings {
  siteName: string;
  defaultTitle: string;
  titleTemplate: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

export interface AppSettingsContextType {
  contactDetails: ContactDetails;
  seoSettings: SeoSettings;
  brandLinks: { [brand: string]: string };
  setBrandLinks: (links: { [brand: string]: string }) => void;
  brandIconPaths: { [brand: string]: string };
  setBrandIconPaths: (paths: { [brand: string]: string }) => void;
  isAnimationReady: boolean;
  showNavbar: boolean;
  setShowNavbar: (show: boolean) => void;
  isMobile: boolean;
  isTablet: boolean;
}

interface AppSettingsContextProviderProps {
  children: React.ReactNode;
  initialData?: {
    contactDetails: ContactDetails;
    // navMenuSettings: NavMenuSettings;
    seoSettings: SeoSettings;
  };
}

const defaultContactDetails: ContactDetails = {
  email: "",
  phone: "",
  address: "",
  workingHours: "",
  socialMedia: {
    instagram: "",
    facebook: "",
    twitter: "",
    tiktok: "",
    youtube: "",
    spotify: "",
    appleMusic: "",
    youtubeMusic: "",
    soundcloud: "",
    bandcamp: "",
    deezer: "",
    linkedin: "",
    threads: "",
  },
};

const defaultSeoSettings: SeoSettings = {
  siteName: "",
  defaultTitle: "",
  titleTemplate: "",
  description: "",
  keywords: [],
};

const defaultValue: AppSettingsContextType = {
  contactDetails: defaultContactDetails,
  seoSettings: defaultSeoSettings,
  brandLinks: {},
  setBrandLinks: () => {},
  brandIconPaths: {},
  setBrandIconPaths: () => {},
  isAnimationReady: false,
  showNavbar: true,
  setShowNavbar: () => {},
  isMobile: false,
  isTablet: false,
};

const AppSettingsContext = createContext<AppSettingsContextType>(defaultValue);

export const AppSettingsProvider: FC<AppSettingsContextProviderProps> = ({
  children,
  initialData,
}) => {
  const [isAnimationReady, setIsAnimationReady] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [brandLinks, setBrandLinks] = useState<{ [brand: string]: string }>({});
  const [brandIconPaths, setBrandIconPaths] = useState<{ [brand: string]: string }>({});
  
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsAnimationReady(true);
    });
  }, []);

  // Populate brandLinks from initialData or use defaults
  useEffect(() => {
    const defaultLinks = {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      tiktok: 'https://tiktok.com',
      youtube: 'https://youtube.com',
      spotify: 'https://spotify.com',
      appleMusic: 'https://music.apple.com',
      youtubeMusic: 'https://music.youtube.com',
      soundcloud: 'https://soundcloud.com',
      bandcamp: 'https://bandcamp.com',
      deezer: 'https://deezer.com',
      linkedin: 'https://linkedin.com',
      threads: 'https://threads.net',
    };

    const defaultIconPaths = {
      instagram: '/icons/instagram.svg',
      facebook: '/icons/facebook.svg',
      twitter: '/icons/twitter.svg',
      tiktok: '/icons/tiktok.svg',
      youtube: '/icons/youtube.svg',
      spotify: '/icons/spotify.svg',
      appleMusic: '/icons/applemusic.svg',
      youtubeMusic: '/icons/youtubemusic.svg',
      soundcloud: '/icons/soundcloud.svg',
      bandcamp: '/icons/bandcamp.svg',
      deezer: '/icons/deezer.svg',
      linkedin: '/icons/linkedin.svg',
      threads: '/icons/threads.svg',
    };

    if (initialData?.contactDetails?.socialMedia) {
      const social = initialData.contactDetails.socialMedia;
      const links: { [brand: string]: string } = {};
      
      // Use CMS data if available, otherwise fall back to defaults
      links.instagram = social.instagram || defaultLinks.instagram;
      links.facebook = social.facebook || defaultLinks.facebook;
      links.twitter = social.twitter || defaultLinks.twitter;
      links.tiktok = social.tiktok || defaultLinks.tiktok;
      links.youtube = social.youtube || defaultLinks.youtube;
      links.spotify = social.spotify || defaultLinks.spotify;
      links.appleMusic = social.appleMusic || defaultLinks.appleMusic;
      links.youtubeMusic = social.youtubeMusic || defaultLinks.youtubeMusic;
      links.soundcloud = social.soundcloud || defaultLinks.soundcloud;
      links.bandcamp = social.bandcamp || defaultLinks.bandcamp;
      links.deezer = social.deezer || defaultLinks.deezer;
      links.linkedin = social.linkedin || defaultLinks.linkedin;
      links.threads = social.threads || defaultLinks.threads;
      
      setBrandLinks(links);
    } else {
      // No CMS data? Use all defaults
      setBrandLinks(defaultLinks);
    }

    // Always set icon paths (these don't come from CMS)
    setBrandIconPaths(defaultIconPaths);
  }, [initialData]);

  return (
    <AppSettingsContext.Provider
      value={{
        contactDetails: initialData?.contactInfo || defaultContactDetails,
        seoSettings: initialData?.seoSettings || defaultSeoSettings,
        brandLinks,
        setBrandLinks,
        brandIconPaths,
        setBrandIconPaths,
        isAnimationReady,
        showNavbar,
        setShowNavbar,
        isMobile,
        isTablet,
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettings = () => {
  const context = useContext(AppSettingsContext);

  if (context === undefined) {
    throw new Error(
      "useAppSettings must be used within an AppSettingsProvider"
    );
  }

  return context;
};

export const useContactDetails = () => {
  const { contactDetails } = useAppSettings();
  return contactDetails;
};

export const useSeoSettings = () => {
  const { seoSettings } = useAppSettings();
  return seoSettings;
};

export const useBrandLinks = () => {
  const { brandLinks, setBrandLinks, brandIconPaths } = useAppSettings();
  return { brands: brandLinks, setBrandLinks, brandIconPaths };
};

export const useResponsive = () => {
  const { isMobile, isTablet } = useAppSettings();
  return { isMobile, isTablet };
};