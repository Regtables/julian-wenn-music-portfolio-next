"use client";

import React, { useEffect, useRef, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/context/ModalContext";
import { cn } from "@/app/lib/utils";

interface PopupProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  isAlert?: boolean;
  isLoading?: boolean;
  opacity?: number;
  fade?: boolean;
  color?: string;
  onClick?: () => void;
  h_0?: boolean;
}

const Popup = forwardRef<HTMLDivElement, PopupProps>(({
  children,
  className,
  isOpen,
  isAlert = false,
  isLoading = false,
  opacity = 90,
  fade = false,
  color = '#000000',
  onClick,
  h_0 = false,
}, ref) => {
  const { handleModalClose } = useModal();
  const contentRef = useRef<HTMLDivElement>(null);
  const validOpacity = Math.max(0, Math.min(100, opacity));
  const hexOpacity = Math.round((validOpacity / 100) * 255).toString(16).padStart(2, '0');

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking the overlay (not the content) and not an alert
    if (!isAlert) {
      handleModalClose();
    }
    // Call the onClick prop if provided
    onClick?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref} // Pass the forwarded ref to the overlay div
          className={cn(
            "fixed z-40 top-0 left-0 bottom-0 w-screen overflow-y-auto content-none",
            isLoading && "z-[100]"
          )}
          style={{ backgroundColor: `${color}${hexOpacity}` }}
          onClick={handleOverlayClick}
          initial={fade ? { opacity: 0 } : {}}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          id="popup"
        >
          <div
            className={cn(
              "flex flex-col items-center",
              h_0 ? "h-0" : "min-h-full",
              className
            )}
            ref={contentRef}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

Popup.displayName = "Popup";

export default Popup;