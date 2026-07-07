import { Link } from "lucide-react";
import Image from "next/image";
import React from "react";

const Donate = () => {
  return (
    <div className="flex flex-col gap-4 items-center bg-custom-black lg:min-w-2xl p-10 rounded-xl justify-center">
      <div className="h-32 w-32 relative">
        <Image src={"/logo.png"} fill alt="Julian Wenn Logo" objectFit="cover" className="rounded-[60px]" />
      </div>

      <h1 className="font-baskerville md:text-5xl text-2xl text-custom-gold font-light">Donations Accepted here.</h1>
      <p className="font-baskerville md:text-sm text-xs text-center text-custom-gold">
        Thank you for your contribution to the artistic process.
      </p>
      <Image src="/donate-qr.jpeg" height={250} width={250} className="rounded-xl" alt = 'Julian Wenn Donate QR Code' />
    </div>
  );
};

export default Donate;
