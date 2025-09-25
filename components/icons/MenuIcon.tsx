import React from 'react';
import { IconProps } from '@/types';

const MenuIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  hoverColor,
  className = '',
  onClick
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`icon-base cursor-pointer ${className}`}
      onClick={onClick}
    >
      <path
        d="M4 6H20M4 12H20M4 18H20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon-path"
      />
    </svg>
  );
};

export default MenuIcon;