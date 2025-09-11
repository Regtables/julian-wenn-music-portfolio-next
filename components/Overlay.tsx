import { cn } from '@/app/lib/utils';
import React from 'react'

interface OverlayProps {
  children: React.ReactNode;
  className?: string;
  opacity?: number;
  color?: string;
}

const Overlay = ({ children, className, opacity = 80, color = '#000000' }: OverlayProps) => {
  // Ensure opacity is within bounds and convert it to a two-digit hex value
  const validOpacity = Math.max(0, Math.min(100, opacity));
  const hexOpacity = Math.round((validOpacity / 100) * 255).toString(16).padStart(2, '0');

  return (
    <div className={cn(`w-full h-full relative rounded-[inherit]`, className)} role="presentation">
      <div className='w-full h-full'>
        {children}
      </div>
      <div
        className='absolute h-full w-full top-0 start-0 end-0 bottom-0 z-10 rounded-[inherit]'
        style={{ backgroundColor: `${color}${hexOpacity}` }}
        aria-hidden="true"
      />
    </div>
  )
}

export default Overlay;
