import NavbarWrapper from "@/components/wrappers/layout/NavbarWrapper";
import ScrollEffectsWrapper from "@/components/wrappers/layout/ScrollEffectsWrapper";
import Providers from "@/providers";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren;

const RootPagesLayout = async ({ children }: Props) => {
  return (
    <Providers>
      <NavbarWrapper>
        <ScrollEffectsWrapper>
          <main>{children}</main>
        </ScrollEffectsWrapper>
      </NavbarWrapper>
    </Providers>
  );
};

export default RootPagesLayout;
