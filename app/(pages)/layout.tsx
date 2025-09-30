import NavbarWrapper from "@/components/wrappers/layout/NavbarWrapper";
import ScrollEffectsWrapper from "@/components/wrappers/layout/ScrollEffectsWrapper";
import LoadingScreenWrapper from "@/components/wrappers/LoadingScreenWrapper";
import Providers from "@/providers";
import React, { PropsWithChildren } from "react";
import { sanityFetchContactInfo } from "../lib/sanity/actions";

type Props = PropsWithChildren;

const RootPagesLayout = async ({ children }: Props) => {
  const contactInfo = await sanityFetchContactInfo()
  return (
    <Providers intialData={{ contactInfo }}>
      <LoadingScreenWrapper>
        <NavbarWrapper>
          <ScrollEffectsWrapper>
            <main>{children}</main>
          </ScrollEffectsWrapper>
        </NavbarWrapper>
      </LoadingScreenWrapper>
    </Providers>
  );
};

export default RootPagesLayout;
