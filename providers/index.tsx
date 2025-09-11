import { AppSettingsProvider } from "@/context/AppSettingsContext";
import { DrawerProvider as DrawerWrapperProvider } from "@/context/DrawerContext";
import { ModalProvider as ModalWrapperProvider } from "@/context/ModalContext";
import React, { PropsWithChildren } from "react";
import ModalProvider from "./ModalProvider";
import DrawerProvider from "./DrawerProvider";

type Props = PropsWithChildren<{}>;

const Providers = ({ children }: Props) => {
  return (
    <AppSettingsProvider>
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
