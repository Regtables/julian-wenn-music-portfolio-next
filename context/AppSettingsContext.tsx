'use client'
  
  import { createContext, FC, useContext, useEffect, useState } from "react";
  import { useMediaQuery } from "react-responsive";

  // Types for your settings
  interface ContactDetails {
    email: string;
    phone: string;
    address: string;
    workingHours: string;
    socialMedia: {
      instagram?: string;
      facebook?: string;
      twitter?: string;
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
    isAnimationReady: boolean;
    showNavbar: boolean;
    setShowNavbar: (show: boolean) => void;
    isMobile: boolean;
    isTablet: boolean;
  }

  interface AppSettingsContextProviderProps {
    children: React.ReactNode;
    // initialData: {
    //   contactDetails: ContactDetails;
    //   navMenuSettings: NavMenuSettings;
    //   seoSettings: SeoSettings;
    // };
  }

  const defaultValue: AppSettingsContextType = {
    contactDetails: {
      email: "",
      phone: "",
      address: "",
      workingHours: "",
         socialMedia: {
      instagram: "",
      facebook: "",
      twitter: "",
    },
    },
    seoSettings: {
      siteName: "",
      defaultTitle: "",
      titleTemplate: "",
      description: "",
      keywords: [],
    },
    isAnimationReady: false,
    showNavbar: true,
    setShowNavbar: () => {},
    isMobile: false,
    isTablet: false,
  };

  const AppSettingsContext = createContext<AppSettingsContextType>(defaultValue);

  export const AppSettingsProvider: FC<AppSettingsContextProviderProps> = ({
    children,
  }) => {
    const [isAnimationReady, setIsAnimationReady] = useState(false);
    const [showNavbar, setShowNavbar] = useState(false);
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
    const isTablet = useMediaQuery({ query: "(min-width: 768px) and (max-width: 1023px)" });
    const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

    useEffect(() => {
      requestAnimationFrame(() => {
        setIsAnimationReady(true);
      });
    }, []);

    return (
      <AppSettingsContext.Provider
        value={{
          // contactDetails: initialData.contactDetails,
          // navMenuSettings: initialData.navMenuSettings,
          // seoSettings: initialData.seoSettings,
          // shopMenuItems: initialData.shopMenuItems,
          // productFilters: initialData.productFilters,
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
      throw new Error("useAppSettings must be used within an AppSettingsProvider");
    }

    return context;
  };

  export const useContactDetails = () => {
    const { contactDetails } = useAppSettings();
    return contactDetails;
  };

  export const useNavMenuSettings = () => {
    const { navMenuSettings } = useAppSettings();
    return navMenuSettings;
  };

  export const useSeoSettings = () => {
    const { seoSettings } = useAppSettings();
    return seoSettings;
  };


  export const useSocialLinks = () => {
    const { contactDetails } = useAppSettings();
    return contactDetails.socialMedia;
  };

  export const useMenuItems = () => {
    const { navMenuSettings } = useAppSettings();
    return navMenuSettings.menuItems;
  };

  export const useLogo = () => {
    const { navMenuSettings } = useAppSettings();
    return navMenuSettings.logo;
  };

  export const useResponsive = () => {
    const { isMobile, isTablet } = useAppSettings();
    return { isMobile, isTablet };
  };