import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getYouTubeVideoId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// export const navigateToSection = (id: string) => {
//   const section = document.getElementById(`${id}`)

//   if(section){
//     section.scrollIntoView({ behavior: 'smooth'})
//   }
// }

import gsap from 'gsap';
import ScrollSmoother from 'gsap/ScrollSmoother';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

// Method 1: Using ScrollSmoother.scrollTo() - BEST for ScrollSmoother
export const navigateToSection = (id: string) => {
  const smoother = ScrollSmoother.get();
  const target = document.getElementById(`${id}`);
  
  if (smoother && target) {
    // ScrollSmoother's scrollTo method - maintains smooth scrolling
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
  }
};
