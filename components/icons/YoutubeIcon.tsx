"use client";

import React, { useState } from 'react';
import { IconProps } from '@/types';
import Link from 'next/link';
import { useBrandLinks } from '@/context/AppSettingsContext';

const YouTubeIcon: React.FC<IconProps> = ({
  size = 32,
  color = 'currentColor',
  hoverColor = 'var(--color-white)',
  className = '',
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { brands } = useBrandLinks()

  return (
    <Link href={brands.youtube || ''} target='_blank'>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        role="img"
        className={`icon-base ${className}`}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle 
          cx="16" 
          cy="16" 
          r="16" 
          fill={isHovered ? hoverColor : (color === 'black' ? 'var(--color-black)' : 'var(--color-gold)')} 
          className="icon-path transition-colors duration-500" 
        />
        <g transform="translate(6, 6) scale(0.833)">
          <path
            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
            fill={isHovered ? (color === 'black' ? 'var(--color-black)' : 'var(--color-gold)') : (color === 'black' ? 'var(--color-gold)' : 'var(--color-black)')} 
            className="icon-path transition-colors duration-500"
          />
        </g>
      </svg>
    </Link>
  );
};

export default YouTubeIcon;