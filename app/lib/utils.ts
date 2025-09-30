import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import gsap from 'gsap';
import ScrollSmoother from 'gsap/ScrollSmoother';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getYouTubeVideoId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

/**
 * Smoothly navigates to a section by ID using ScrollSmoother
 * Falls back to GSAP scrollTo if ScrollSmoother is not available
 * 
 * @param id - The ID of the element to scroll to (without the # symbol)
 */
export const navigateToSection = (id: string) => {
  // Get the ScrollSmoother instance using GSAP's built-in getter
  const smoother = ScrollSmoother.get();
  const target = document.getElementById(id);
  
  if (smoother && target) {
    // Use ScrollSmoother's scrollTo method - maintains smooth scrolling
    // Parameters: (target, smooth, position)
    // smooth: true maintains the smooth scroll effect
    // position: "top top" aligns target's top with viewport's top
    smoother.scrollTo(target, true, "top top");
    
    // Optional: Update URL hash without triggering scroll
    history.pushState(null, '', `#${id}`);
  } else if (target) {
    // Fallback if ScrollSmoother isn't available
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: target, offsetY: 0 },
      ease: "power2.inOut"
    });
    
    // Optional: Update URL hash
    history.pushState(null, '', `#${id}`);
  } else {
    console.warn(`Element with id "${id}" not found`);
  }
}