'use client'

import { Menu } from 'lucide-react'
import React, { useRef, useState } from 'react'
import NavMenu from './NavMenu'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP)

const Nav: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
  const navMenuRef = useRef<HTMLDivElement>(null)
  const navSlideBgRef = useRef<HTMLDivElement>(null)

  const handleNavOpen = (): void => {
    const navTl = gsap.timeline();
    navTl.fromTo(navSlideBgRef.current, { autoAlpha: 1 }, { autoAlpha: 1, xPercent: 100, duration: 0.8, ease: 'power2.out' }, 0);
    navTl.fromTo(navMenuRef.current, { autoAlpha: 1 }, { autoAlpha: 1, xPercent: 100, delay: 0.2, duration: 0.8, ease: 'circ.out' }, 0);
    setIsNavOpen(true)
  };

  const handleNavClose = (): void => {
    const navTl = gsap.timeline();
    navTl.to(navMenuRef.current, { xPercent: -100, duration: 1, ease: 'power.out' }, 0);
    navTl.to(navSlideBgRef.current, { xPercent: -100, duration: 1, delay: 0.2, ease: 'power.out' }, 0);
    setIsNavOpen(false)
  };

  const handleMenuClick = (): void => {
    if (isNavOpen) {
      handleNavClose()
    } else {
      handleNavOpen()
    }
  }

  useGSAP(() => {
    gsap.set([navMenuRef.current, navSlideBgRef.current], { 
      xPercent: -100,
      autoAlpha: 1 
    })
  }, [])

  return (
    <nav>
      <Menu 
        color='var(--color-gold)' 
        size='2rem' 
        className='nav-menu-icon fixed lg:left-[var(--margin-section-x-desktop)] lg:top-8 cursor-pointer z-50'
        onClick={handleMenuClick}
      />

      <NavMenu ref={navMenuRef} handleClose={handleNavClose} />

      <div 
        ref={navSlideBgRef}
        className='nav-slide-bg z-40 h-screen w-screen bg-[var(--color-gold)] fixed top-0 -left-full right-0' 
      />
    </nav>
  )
}

export default Nav