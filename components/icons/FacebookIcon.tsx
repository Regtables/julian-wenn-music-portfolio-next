import React from 'react';
import { IconProps } from '@/types';

const FacebookIcon: React.FC<IconProps> = ({
  size = 32,
  color = 'currentColor',
  hoverColor,
  className = '',
  onClick
}) => {
  const hoverStyle = hoverColor ? { '--hover-color': hoverColor } as React.CSSProperties : {};

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`icon-base ${className}`}
      onClick={onClick}
      style={hoverStyle}
    >
      <path
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
        fill={color}
        className="icon-path"
      />
    </svg>
  );
};

export default FacebookIcon;