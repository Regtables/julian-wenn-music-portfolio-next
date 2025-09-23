import { useRef, RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText"; // Requires GSAP Club membership

gsap.registerPlugin(TextPlugin, SplitText);

export type SplitType = "chars" | "words" | "lines";
export type SplitCombination =
  | SplitType
  | `${SplitType},${SplitType}`
  | `${SplitType},${SplitType},${SplitType}`;

export type TextSplitConfig = {
  splitBy?: SplitCombination;
  animateBy?: SplitType;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  stagger?: number | { amount: number; from?: string };
  trigger?: "immediate" | "scroll" | "hover" | "manual";
  scrollTrigger?: {
    start?: string;
    end?: string;
    once?: boolean;
  };
  duration?: number;
  ease?: string;
  delay?: number;
};

export const useSplitTextAnimation = <T extends HTMLElement = HTMLElement>(
  config: TextSplitConfig = {}
): {
  ref: RefObject<T>;
  replay: () => void;
  splitInstance?: SplitText;
} => {
  const ref = useRef<T>(null);
  let splitInstance: SplitText;

  const {
    splitBy = "chars",
    animateBy = "chars",
    from = { opacity: 0, y: 50 },
    to = { opacity: 1, y: 0 },
    stagger = 0.05,
    trigger = "scroll",
    scrollTrigger = { start: "top 85%", once: true },
    duration = 0.6,
    ease = "power2.out",
    delay = 0,
  } = config;

  const performAnimation = () => {
    if (!ref.current) return;

    splitInstance = new SplitText(ref.current, { type: splitBy });

    const elementsToAnimate =
      animateBy === "chars"
        ? splitInstance.chars
        : animateBy === "words"
          ? splitInstance.words
          : splitInstance.lines;

    if (!elementsToAnimate?.length) return;

    gsap.set(elementsToAnimate, from);

    gsap.to(elementsToAnimate, {
      ...to,
      duration,
      ease,
      stagger,
      delay,
    });
  };

  useGSAP(() => {
    if (!ref.current) return;

    switch (trigger) {
      case "immediate":
        performAnimation();
        break;

      case "scroll":
        //gsap.set(ref.current, { opacity: 1 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            ...scrollTrigger,
            onEnter: performAnimation,
          },
        });
        break;

      case "hover":
        break;

      case "manual":
        break;
    }

    // Cleanup
    return () => {
      if (splitInstance) {
        splitInstance.revert();
      }
    };
  }, [config]);

  return { ref, splitInstance };
};
