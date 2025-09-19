import { cn } from "@/app/lib/utils";
import { PropsWithClassName } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<
  PropsWithClassName<{
    isModalOpen: boolean;
    handleClose: () => void;
  }>
>;

const ModalLayout = ({ children, className, isModalOpen }: Props) => {
  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className={cn(
            "h-screen w-screen fixed top-0 left-0 right-0 bottom-0 bg-[#000000bb] z-50",
            className
          )}
          whileInView={{ opacity: [0, 1]}}
          exit={{ opacity: [1, 0]}}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalLayout;
