"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

export type DrawerType = "cart" | "filter" | "mobileMenu" | "navMenu" | "shopMenu" | null;

type SlideDirection = 'left' | 'right';

interface DrawerContextProps {
  isOpen: boolean;
  types: DrawerType[];
  slideDirection: SlideDirection;
  handleDrawerOpen: (type: string, direction?: SlideDirection) => void;
  handleDrawerClose: (type: string, direction?: SlideDirection) => void;
}

const defaultValues: DrawerContextProps = {
  isOpen: false,
  types: [],
  slideDirection: 'right',
  handleDrawerOpen: () => {},
  handleDrawerClose: () => {},
};

const DrawerContext = createContext<DrawerContextProps>(defaultValues);

interface DrawerProviderProps {
  children: ReactNode;
}

export const DrawerProvider = ({ children }: DrawerProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [types, setTypes] = useState<DrawerType[]>([]);
  const [slideDirection, setSlideDirection] = useState<SlideDirection>('right');

  const handleDrawerOpen = (drawerType: DrawerType, direction: SlideDirection = 'right') => {
    setIsOpen(true);
    setTypes((prevTypes) => [...prevTypes, drawerType]);
    setSlideDirection(direction);
  };

  const handleDrawerClose = (typeToClose?: DrawerType ) => {
    if (typeToClose) {
      const newTypes = types.filter((type) => type !== typeToClose);
      setTypes(newTypes);

      if (newTypes.length === 0) {
        setIsOpen(false);
      }
    } else {
      setTypes([]);
      setIsOpen(false);
    }


    document.body.style.overflowY = "unset";

    document.body.style.overflowY = "unset";
  };

  return (
    <DrawerContext.Provider
      value={{
        isOpen,
        types,
        handleDrawerOpen,
        handleDrawerClose,
        slideDirection,
        setSlideDirection
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => {
  const context = useContext(DrawerContext);

  if (context === undefined) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }

  return context;
};
