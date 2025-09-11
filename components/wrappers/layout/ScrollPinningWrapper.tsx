'use client'

import React, { PropsWithChildren } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

type ScrollPinningWrapperProps = PropsWithChildren

const ScrollPinningWrapper = ({ children }: ScrollPinningWrapperProps) => {
  
  useGSAP(() => {
    const initPinning = () => {
      ScrollTrigger.create({
        trigger: ".socials",
        start: "top top",
        end: "+=2000",
        pin: ".socials-container",
        markers: true,
        pinSpacing: false,
      });
      
      ScrollTrigger.create({
        trigger: ".about",
        start: "top top",
        end: "+=2000",
        pin: ".about-container",
        pinSpacing: false,
        markers: true
      });
    }

    initPinning()

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.pin) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <div>
      {children}
    </div>
  )
}

export default ScrollPinningWrapper