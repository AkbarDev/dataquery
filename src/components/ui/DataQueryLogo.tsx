import React from "react";

interface DataQueryLogoProps {
  className?: string;
  size?: number;
}

export function DataQueryLogo({ className = "", size = 28 }: DataQueryLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="dq-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
      </defs>

      {/* Rounded squircle background */}
      <rect
        x="1.5"
        y="1.5"
        width="29"
        height="29"
        rx="7"
        fill="#0F172A"
        stroke="url(#dq-logo-grad)"
        strokeWidth="1.5"
      />

      {/* Database Column / Data Grid Node */}
      <rect x="7" y="7" width="5" height="18" rx="2.5" fill="url(#dq-logo-grad)" />

      {/* Query Arc / D shape */}
      <path
        d="M12 8.5C17.5 8.5 21 11.5 21 16C21 20.5 17.5 23.5 12 23.5"
        stroke="url(#dq-logo-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Query Pulse Accent (sparkle / beam at Q leg) */}
      <circle cx="21.5" cy="22.5" r="2.5" fill="#38BDF8" />
      <path
        d="M20 21L24.5 25.5"
        stroke="#38BDF8"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
