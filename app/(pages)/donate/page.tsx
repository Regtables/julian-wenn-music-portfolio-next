import Donate from "@/components/Donate";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const DonatePage = (props: Props) => {
  return (
    <div>
      <Donate />

      <Footer />
    </div>
  );
};

export default DonatePage;
