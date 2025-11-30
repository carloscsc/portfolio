import React from "react";

interface FlagProps {
  className?: string;
}

export const USFlag: React.FC<FlagProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="United States flag"
    >
      <title>United States</title>
      {/* Red stripes */}
      <rect width="20" height="15" fill="#B22234" />
      {/* White stripes */}
      <rect y="1.15" width="20" height="1.15" fill="white" />
      <rect y="3.46" width="20" height="1.15" fill="white" />
      <rect y="5.77" width="20" height="1.15" fill="white" />
      <rect y="8.08" width="20" height="1.15" fill="white" />
      <rect y="10.38" width="20" height="1.15" fill="white" />
      <rect y="12.69" width="20" height="1.15" fill="white" />
      {/* Blue canton */}
      <rect width="8" height="7" fill="#3C3B6E" />
      {/* Stars (simplified pattern) */}
      <g fill="white">
        <circle cx="1.5" cy="1.5" r="0.4" />
        <circle cx="3" cy="1.5" r="0.4" />
        <circle cx="4.5" cy="1.5" r="0.4" />
        <circle cx="6" cy="1.5" r="0.4" />
        <circle cx="2.25" cy="2.5" r="0.4" />
        <circle cx="3.75" cy="2.5" r="0.4" />
        <circle cx="5.25" cy="2.5" r="0.4" />
        <circle cx="1.5" cy="3.5" r="0.4" />
        <circle cx="3" cy="3.5" r="0.4" />
        <circle cx="4.5" cy="3.5" r="0.4" />
        <circle cx="6" cy="3.5" r="0.4" />
        <circle cx="2.25" cy="4.5" r="0.4" />
        <circle cx="3.75" cy="4.5" r="0.4" />
        <circle cx="5.25" cy="4.5" r="0.4" />
        <circle cx="1.5" cy="5.5" r="0.4" />
        <circle cx="3" cy="5.5" r="0.4" />
        <circle cx="4.5" cy="5.5" r="0.4" />
        <circle cx="6" cy="5.5" r="0.4" />
      </g>
    </svg>
  );
};

export const BRFlag: React.FC<FlagProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Brazil flag"
    >
      <title>Brazil</title>
      {/* Green background */}
      <rect width="20" height="14" fill="#009C3B" />
      {/* Yellow diamond */}
      <path
        d="M 10 1.5 L 18 7 L 10 12.5 L 2 7 Z"
        fill="#FFDF00"
      />
      {/* Blue circle */}
      <circle cx="10" cy="7" r="3" fill="#002776" />
      {/* White stars (simplified) */}
      <g fill="white">
        <circle cx="10" cy="6" r="0.3" />
        <circle cx="9" cy="7" r="0.25" />
        <circle cx="11" cy="7" r="0.25" />
        <circle cx="10" cy="8" r="0.3" />
        <circle cx="8.5" cy="6.5" r="0.2" />
        <circle cx="11.5" cy="6.5" r="0.2" />
        <circle cx="8.5" cy="7.5" r="0.2" />
        <circle cx="11.5" cy="7.5" r="0.2" />
      </g>
      {/* White band (simplified) */}
      <path
        d="M 7.5 7.8 Q 10 8.5 12.5 7.8"
        stroke="white"
        strokeWidth="0.4"
        fill="none"
      />
    </svg>
  );
};
