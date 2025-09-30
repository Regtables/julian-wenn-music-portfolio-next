import { AppSettingsProvider } from "@/context/AppSettingsContext";
import { DrawerProvider as DrawerWrapperProvider } from "@/context/DrawerContext";
import { ModalProvider as ModalWrapperProvider } from "@/context/ModalContext";
import React, { PropsWithChildren } from "react";
import ModalProvider from "./ModalProvider";
import DrawerProvider from "./DrawerProvider";
import { SanityContactInfoData } from "@/app/lib/sanity/types";

type Props = PropsWithChildren<{
  intialData: {
    contactInfo: SanityContactInfoData,
    seoSettings: {}
  }
}>;

const Providers = ({ children, intialData }: Props) => {
  return (
    <AppSettingsProvider initialData={intialData}>
      <DrawerWrapperProvider>
        <ModalWrapperProvider>
          {children}

          <ModalProvider />
          <DrawerProvider />
        </ModalWrapperProvider>
      </DrawerWrapperProvider>
    </AppSettingsProvider>
  );
};

export default Providers;
