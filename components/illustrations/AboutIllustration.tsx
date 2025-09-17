import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

export const AboutIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
  <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="aboutBg" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor={isDark ? "#374151" : "#A1A1AA"} />
        <stop offset="45%" stopColor={isDark ? "#1F2937" : "#D4D4D8"} />
        <stop offset="55%" stopColor={isDark ? "#065F46" : "#A7F3D0"} />
        <stop offset="100%" stopColor={isDark ? "#064E3B" : "#6EE7B7"} />
      </linearGradient>
      <clipPath id="splitClip">
        <path d="M0 0 H 800 V 600 H 0 Z" />
      </clipPath>
    </defs>
    
    <rect width="800" height="600" fill="url(#aboutBg)" />

    {/* Left side - Chaos */}
    <g clipPath="url(#splitClip)">
        <path d="M50 600 V 300 L 100 280 V 600" fill={isDark ? "#1E293B" : "#4B5563"} />
        <path d="M120 600 V 250 L 180 230 V 600" fill={isDark ? "#334155" : "#6B7280"} />
        <path d="M200 600 V 350 L 280 340 V 600" fill={isDark ? "#1E293B" : "#4B5563"} />
        <text x="100" y="150" fontFamily="sans-serif" fontSize="40" fill={isDark ? "#6B7280" : "#4B5563"} transform="rotate(-15 100 150)">NOISE</text>
        <text x="250" y="200" fontFamily="sans-serif" fontSize="30" fill={isDark ? "#94A3B8" : "#6B7280"} transform="rotate(10 250 200)">HURRY</text>
        <path d="M50 400 L 350 420" stroke={isDark ? "#1E293B" : "#4B5563"} strokeWidth="4" />
    </g>

    {/* Right side - Calm */}
    <g clipPath="url(#splitClip)">
      <circle cx="650" cy="300" r="200" fill={isDark ? "#059669" : "#34D399"} opacity="0.5" />
      <path d="M450 600 C 550 500, 650 500, 800 600" fill={isDark ? "#14532D" : "#16A34A"} />
      <g transform="translate(600, 450)">
        {/* Character */}
        <circle cx="0" cy="-20" r="30" fill={isDark ? '#FBBF24' : '#FDE68A'} />
        <path d="M-25 10 C -25 70, 25 70, 25 10" fill={isDark ? '#7C3AED' : '#8B5CF6'}/>
        {/* Book */}
        <rect x="-40" y="20" width="80" height="15" fill={isDark ? '#60A5FA' : '#3B82F6'} rx="5" transform="rotate(-10 0 20)"/>
      </g>
    </g>

    {/* Divider */}
    <path d="M 400 0 V 600" stroke={isDark ? "#0F172A" : "#FFFFFF"} strokeWidth="10" />

    {/* Floating Book transforming */}
    <g transform="translate(400, 300)">
        <path d="M -50 -30 L 0 -40 L 0 40 L -50 30 Z" fill={isDark ? "#334155" : "#4B5563"} />
        <path d="M 0 -40 L 50 -30 L 50 30 L 0 40 Z" fill={isDark ? "#E2E8F0" : "#FFFFFF"} />
        <path d="M 10 0 L 30 -10 L 40 0 L 30 10 Z" fill={isDark ? '#60A5FA' : '#3B82F6'} />
    </g>
  </svg>
  );
};
