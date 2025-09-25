export type PropsWithClassName<P = unknown> = P & {
  className?: string
}

export interface IconProps {
  size?: number | string;
  color?: string;
  hoverColor?: string;
  className?: string;
  onClick?: () => void;
}
