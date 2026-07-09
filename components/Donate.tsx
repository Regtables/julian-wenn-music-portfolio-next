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

      <div className="w-full border border-custom-gold/30 rounded-xl p-6 flex flex-col gap-3 mt-2">
        <div className="flex items-center justify-between border-b border-custom-gold/20 pb-3">
          <span className="font-baskerville text-xs text-custom-gold/60 uppercase tracking-widest">Bank</span>
          <span className="font-baskerville text-sm text-custom-gold font-medium">Capitec Bank</span>
        </div>
        <div className="flex items-center justify-between border-b border-custom-gold/20 pb-3">
          <span className="font-baskerville text-xs text-custom-gold/60 uppercase tracking-widest">Account No.</span>
          <span className="font-baskerville text-sm text-custom-gold font-medium tracking-wider">2530489382</span>
        </div>
        <div className="flex items-center justify-between border-b border-custom-gold/20 pb-3">
          <span className="font-baskerville text-xs text-custom-gold/60 uppercase tracking-widest">Account Holder</span>
          <span className="font-baskerville text-sm text-custom-gold font-medium">MR JK WENN</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-baskerville text-xs text-custom-gold/60 uppercase tracking-widest">Reference</span>
          <span className="font-baskerville text-sm text-custom-gold font-medium">WENNTERTAINMENT</span>
        </div>
      </div>
    </div>
  );
};

export default Donate;
