import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

export const SignUpIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="signUpBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isDark ? '#134E4A' : '#14B8A6'} />
          <stop offset="100%" stopColor={isDark ? '#115E59' : '#0D9488'} />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#signUpBg)" />
      
      <g transform="translate(200, 250)">
        {/* Character */}
        <path d="M150 150 C 150 50, 50 0, 0 0 C -50 0, -150 50, -150 150 Z" fill={isDark ? '#E9D5FF' : '#F3E8FF'} />
        <circle cx="0" cy="-50" r="80" fill={isDark ? '#E9D5FF' : '#F3E8FF'} />

        {/* Hair */}
        <path d="M -90 -50 C -120 -150, 120 -150, 90 -50 A 80 80 0 0 1 -90 -50" fill={isDark ? '#9333EA' : '#A855F7'} />
        
        {/* Eyes */}
        <circle cx="-30" cy="-60" r="8" fill={isDark ? '#3B0764' : '#4C1D95'} />
        <circle cx="30" cy="-60" r="8" fill={isDark ? '#3B0764' : '#4C1D95'} />
        
        {/* Smile */}
        <path d="M-20 -35 Q 0 -20 20 -35" stroke={isDark ? '#3B0764' : '#4C1D95'} strokeWidth="4" fill="none" strokeLinecap="round" />

        {/* Book */}
        <g transform="translate(-100, 50) rotate(15)">
          <rect x="-40" y="-55" width="80" height="110" fill={isDark ? '#E2E8F0' : '#FFFFFF'} rx="8"/>
          <rect x="-30" y="-45" width="25" height="35" fill={isDark ? '#34D399' : '#A7F3D0'} />
          <rect x="-30" y="0" width="60" height="5" fill={isDark ? '#94A3B8' : '#E5E7EB'} />
          <rect x="-30" y="15" width="60" height="5" fill={isDark ? '#94A3B8' : '#E5E7EB'} />
          <rect x="-30" y="30" width="40" height="5" fill={isDark ? '#94A3B8' : '#E5E7EB'} />
        </g>
      </g>
    </svg>
  );
};
