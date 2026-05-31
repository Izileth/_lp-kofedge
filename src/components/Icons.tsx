import type { FC } from "react";

export interface IconProps {
  color?: string;
  size?: number;
  className?: string;
}

// Runic Serifed Icons
export const RunicAnsuz: FC<IconProps> = ({ color = "currentColor", size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M8 4V20M8 4L16 10M8 10L16 16" stroke={color} strokeWidth="1.5" strokeLinecap="butt" />
    <path d="M6 4H10M6 20H10M15.5 9.5L17.5 10.5M15.5 15.5L17.5 16.5" stroke={color} strokeWidth="1" />
  </svg>
);

export const RunicLaguz: FC<IconProps> = ({ color = "currentColor", size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M8 4V20M8 4L16 8" stroke={color} strokeWidth="1.5" strokeLinecap="butt" />
    <path d="M6 4H10M6 20H10M15.5 7.5L17.5 8.5" stroke={color} strokeWidth="1" />
  </svg>
);

export const RunicOthala: FC<IconProps> = ({ color = "currentColor", size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 12L8 16V20M12 12L16 16V20M12 12L8 8L12 4L16 8L12 12" stroke={color} strokeWidth="1.5" strokeLinecap="butt" />
    <path d="M6 20H10M14 20H18M11 4H13" stroke={color} strokeWidth="1" />
  </svg>
);

export const RunicTiwaz: FC<IconProps> = ({ color = "currentColor", size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 20V4M12 4L8 8M12 4L16 8" stroke={color} strokeWidth="1.5" strokeLinecap="butt" />
    <path d="M10 20H14M7.5 8.5L8.5 7.5M15.5 7.5L16.5 8.5" stroke={color} strokeWidth="1" />
  </svg>
);

export const RunicFehu: FC<IconProps> = ({ color = "currentColor", size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M8 20V4M8 4L16 8M8 10L16 14" stroke={color} strokeWidth="1.5" strokeLinecap="butt" />
    <path d="M6 20H10M6 4H10M15.5 7.5L17.5 8.5M15.5 13.5L17.5 14.5" stroke={color} strokeWidth="1" />
  </svg>
);


export const RunicAlgiz: FC<IconProps> = ({
  color = "currentColor",
  size = 24,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 20V4M12 8L6 4M12 8L18 4"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
    <path
      d="M10 20H14"
      stroke={color}
      strokeWidth="1"
    />
  </svg>
);
export const RunicGebo: FC<IconProps> = ({
  color = "currentColor",
  size = 24,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M6 6L18 18M18 6L6 18"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
  </svg>
);
export const RunicUruz: FC<IconProps> = ({
  color = "currentColor",
  size = 24,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M8 4V16L16 20V4"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
    <path
      d="M6 4H10M14 4H18"
      stroke={color}
      strokeWidth="1"
    />
  </svg>
);

// Alias or specialized versions for the layout
export const LightningIcon = RunicAnsuz;
export const TridentIcon = RunicLaguz;
export const SwordIcon = RunicTiwaz;
export const CrownIcon = RunicFehu;

// Original Greek Icons (Kept for other pages)
export const TempleIcon: FC<IconProps> = ({ color = "currentColor", size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M3 21H21M4 11V18M12 11V18M20 11V18M12 3L3 11H21L12 3Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const VaseIcon: FC<IconProps> = ({ color = "currentColor", size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M8 3H16M12 3V5M6 9C6 14 8 21 12 21C16 21 18 14 18 9C18 7 17 5 12 5C7 5 6 7 6 9Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 9H18M9 5L7 7M15 5L17 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const ScrollIcon: FC<IconProps> = ({ color = "currentColor", size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M16 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H16M16 3C17.1046 3 18 3.89543 18 5V19C18 20.1046 17.1046 21 16 21M16 3V21M18 5H21M18 19H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const WavesIcon: FC<IconProps> = ({ color = "currentColor", size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M2 12C4 10 6 10 8 12C10 14 12 14 14 12C16 10 18 10 20 12M2 17C4 15 6 15 8 17C10 19 12 19 14 17C16 15 18 15 20 17" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const FireIcon: FC<IconProps> = ({ color = "currentColor", size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2C12 2 7 6 7 11C7 13.7614 9.23858 16 12 16C14.7614 16 17 13.7614 17 11C17 6 12 2 12 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 21C14 21 15 20 15 18.5C15 17 14 16 12 16C10 16 9 17 9 18.5C9 20 10 21 12 21Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SkullIcon: FC<IconProps> = ({ color = "currentColor", size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M9 14H9.01M15 14H15.01M12 21C16.4183 21 20 17.4183 20 13C20 8.58172 16.4183 5 12 5C7.58172 5 4 8.58172 4 13C4 17.4183 7.58172 21 12 21ZM12 21V18M10 21V19M14 21V19" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
