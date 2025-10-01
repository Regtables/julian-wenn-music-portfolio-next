"use client";

import React, { useRef } from "react";
import { useModal } from "@/context/ModalContext";
import Image from "next/image";
import Popup from "../Popup";

type Props = {};

const UpcomingShowsPosterModal = (props: Props) => {
  const { isOpen, types, data, handleModalClose } = useModal();
  const posterRef = useRef<HTMLDivElement>(null);

  const isModalOpen = isOpen && types.includes("showPoster");

  return (
    <Popup
      isOpen={isModalOpen}
      className="items-center justify-center"
      ref={posterRef}
    >
      <div className="relative md:w-[25vw] h-[75vh] w-[90vw]">
        <Image
          src={data.show?.poster?.image.asset.url}
          fill
          objectFit="cover"
          alt={data.show?.poster?.alt}
        />
      </div>
    </Popup>
  );
};

export default UpcomingShowsPosterModal;
