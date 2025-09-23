import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useCallback } from "react";

type ElementToAnimate = HTMLElement | string;

type SectionHeadingConfig = {
  y?: number;
  autoAlpha?: number;
  stagger?: number;
  duration?: number;
  ease?: string;
  reverse?: boolean;
  delay?: number;
};

type SlideInConfig = {
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
  ease?: string;
  opacity?: { from: number; to: number };
  delay?: number;
  stagger?: number;
};

type StaggerConfig = {
  elements: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  stagger?: number;
  duration?: number;
  ease?: string;
  delay?: number;
};

export const useGSAPAnimations = () => {
  const animateSectionHeading = useCallback((
    element: ElementToAnimate,
    config: SectionHeadingConfig = {}
  ) => {
    const {
      y = 30,
      autoAlpha = 0,
      stagger = 0.03,
      duration = 0.2,
      ease = "power1.out",
      reverse = true,
      delay = 0
    } = config;

    const el = typeof element === "string" ? document.querySelector(element) : element;

    if (!el) {
      console.warn(`animateSectionHeading: element not found for ${element}`);
      return gsap.timeline();
    }

    const split = SplitText.create(el);
    const tl = gsap.timeline();
    const charsToAnimate = reverse ? split.chars.reverse() : split.chars;

    tl.set(charsToAnimate, { y, autoAlpha })
      .fromTo(charsToAnimate,
        { y, autoAlpha },
        {
          y: 0,
          autoAlpha: 1,
          stagger,
          duration,
          ease,
          delay,
          onComplete: () => split.revert(),
        }
      );

    return tl;
  }, []);

  const animateSlideIn = useCallback((
    element: ElementToAnimate,
    config: SlideInConfig = {}
  ) => {
    const {
      direction = 'up',
      distance = 50,
      duration = 0.6,
      ease = "power2.out",
      opacity = { from: 0, to: 1 },
      delay = 0,
      stagger = 0
    } = config;

    const el = typeof element === "string" ? document.querySelector(element) : element;

    if (!el) {
      console.warn(`animateSlideIn: element not found for ${element}`);
      return gsap.timeline();
    }

    const tl = gsap.timeline();

    // Determine direction values
    const getDirectionVars = (dir: string, dist: number) => {
      switch (dir) {
        case 'up':
          return { from: { y: dist }, to: { y: 0 } };
        case 'down':
          return { from: { y: -dist }, to: { y: 0 } };
        case 'left':
          return { from: { x: dist }, to: { x: 0 } };
        case 'right':
          return { from: { x: -dist }, to: { x: 0 } };
        default:
          return { from: { y: dist }, to: { y: 0 } };
      }
    };

    const directionVars = getDirectionVars(direction, distance);

    tl.fromTo(el,
      { 
        ...directionVars.from, 
        opacity: opacity.from 
      },
      {
        ...directionVars.to,
        opacity: opacity.to,
        duration,
        ease,
        delay,
        stagger
      }
    );

    return tl;
  }, []);

  const animateStaggerIn = useCallback((
    container: ElementToAnimate,
    config: StaggerConfig = {}
  ) => {
    const {
      elements = '[data-animate]',
      from = { y: 50, opacity: 0 },
      to = { y: 0, opacity: 1 },
      stagger = 0.1,
      duration = 0.6,
      ease = "power2.out",
      delay = 0
    } = config;

    const containerEl = typeof container === "string" ? document.querySelector(container) : container;

    if (!containerEl) {
      console.warn(`animateStaggerIn: container not found for ${container}`);
      return gsap.timeline();
    }

    const elementsToAnimate = containerEl.querySelectorAll(elements);

    if (!elementsToAnimate.length) {
      console.warn(`animateStaggerIn: no elements found with selector ${elements}`);
      return gsap.timeline();
    }

    const tl = gsap.timeline();

    tl.fromTo(elementsToAnimate,
      from,
      {
        ...to,
        duration,
        ease,
        stagger,
        delay
      }
    );

    return tl;
  }, []);

  const animateFadeIn = useCallback((
    element: ElementToAnimate,
    config: {
      from?: number;
      to?: number;
      duration?: number;
      ease?: string;
      delay?: number;
      scale?: { from?: number; to?: number };
    } = {}
  ) => {
    const {
      from = 0,
      to = 1,
      duration = 0.8,
      ease = "power2.out",
      delay = 0,
      scale
    } = config;

    const el = typeof element === "string" ? document.querySelector(element) : element;

    if (!el) {
      console.warn(`animateFadeIn: element not found for ${element}`);
      return gsap.timeline();
    }

    const tl = gsap.timeline();
    
    const fromVars: gsap.TweenVars = { opacity: from };
    const toVars: gsap.TweenVars = { opacity: to, duration, ease, delay };

    if (scale) {
      fromVars.scale = scale.from || 0.8;
      toVars.scale = scale.to || 1;
    }

    tl.fromTo(el, fromVars, toVars);

    return tl;
  }, []);

  return {
    animateSectionHeading,
    animateSlideIn,
    animateStaggerIn,
    animateFadeIn
  };
};