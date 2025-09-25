import React from 'react';
import { IconProps } from '@/types';

const YouTubeIcon: React.FC<IconProps> = ({
  size = 32,
  color = 'currentColor',
  hoverColor = 'var(--color-white)',
  className = '',
  onClick
}) => {
  const hoverStyle = hoverColor ? { '--hover-color': hoverColor } as React.CSSProperties : {};

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={`icon-base ${className}`}
      onClick={onClick}
      style={hoverStyle}
    >
      <circle cx="16" cy="16" r="16" fill={color === 'black' ? 'var(--color-black)' : 'var(--color-gold)'} className="icon-path" />
      <path
        d="M25.498 10.186a3.016 3.016 0 0 0-2.122-2.136C21.505 7.545 16 7.545 16 7.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 4.502 10.186C4 12.07 4 16 4 16s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C28 19.93 28 16 28 16s0-3.93-.502-5.814zM13.545 19.568V12.432L19.818 16l-6.273 3.568z"
        fill= {color === 'black' ? 'var(--color-gold)' : 'var(--color-black)'} 
        className="icon-path"
      />
    </svg>
  );
};

export default YouTubeIcon;