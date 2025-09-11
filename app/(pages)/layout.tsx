import NavbarWrapper from "@/components/wrappers/layout/NavbarWrapper";
import ScrollPinningWrapper from "@/components/wrappers/layout/ScrollPinningWrapper";
import Providers from "@/providers";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren;

const RootPagesLayout = async ({ children }: Props) => {
  return (
    <Providers>
      <NavbarWrapper>
        <ScrollPinningWrapper>
          <main>{children}</main>
        </ScrollPinningWrapper>
      </NavbarWrapper>
    </Providers>
  );
};

export default RootPagesLayout;
