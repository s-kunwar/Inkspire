import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

export const HeroIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: isDark ? '#0F172A' : '#3B82F6' }} />
          <stop offset="100%" style={{ stopColor: isDark ? '#1E3A8A' : '#1D4ED8' }} />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={isDark ? "15" : "10"} result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="800" height="600" fill="url(#skyGradient)" />
      
      {/* Moon/Sun */}
      <circle cx="150" cy="100" r="30" fill={isDark ? '#F1F5F9' : '#FBBF24'} filter={isDark ? "url(#glow)" : "none"} />
      <circle cx={isDark ? "650" : "700"} cy={isDark ? "120" : "150"} r={isDark ? "5" : "40"} fill={isDark ? '#F1F5F9' : '#FBBF24'} opacity="0.8" />
      
      {/* Hills */}
      <path d="M-50 600 C 150 400, 350 700, 550 450 C 750 200, 850 550, 850 550 V 600 H-50 Z" fill={isDark ? '#1E293B' : '#166534'} />
      <path d="M-50 600 C 100 450, 250 650, 450 500 C 650 350, 850 500, 850 500 V 600 H-50 Z" fill={isDark ? '#334155' : '#15803D'} />

      {/* Tree */}
      <g transform="translate(400 350)">
        <path d="M0 250 Q -50 150 -150 150 T -250 250 H 250 Q 150 150 50 150 T 0 250 Z" fill={isDark ? '#1A2333' : '#544439'} />
        <path d="M-10 250 V -50 C -10 -100 -100 -150 -100 -200 C -100 -250 0 -300 0 -300 C 0 -300 100 -250 100 -200 C 100 -150 10 -100 10 -50 V 250 H -10 Z" fill={isDark ? '#263145' : '#6B4F3A'} />
        <circle cx="0" cy="-200" r="180" fill={isDark ? '#064E3B' : '#059669'} />
        <circle cx="-80" cy="-250" r="100" fill={isDark ? '#047857' : '#10B981'} />
        <circle cx="80" cy="-250" r="100" fill={isDark ? '#047857' : '#10B981'} />
        <circle cx="0" cy="-350" r="80" fill={isDark ? '#059669' : '#34D399'} />
      </g>

      {/* Character */}
      <g transform="translate(420 500)">
        <rect x="-25" y="0" width="50" height="80" fill={isDark ? '#7E22CE' : '#A855F7'} rx="10"/>
        <path d="M -30 20 C -50 40 -50 60 -30 80" stroke={isDark ? '#C4B5FD' : '#F3E8FF'} strokeWidth="4" fill="none"/>
        <rect x="-20" y="5" width="40" height="70" fill={isDark ? '#C4B5FD' : '#F3E8FF'} rx="5"/>
        <rect x="-15" y="10" width="30" height="5" fill={isDark ? '#A78BFA' : '#C084FC'}/>
        <rect x="-15" y="20" width="30" height="5" fill={isDark ? '#A78BFA' : '#C084FC'}/>
        <rect x="-15" y="30" width="30" height="5" fill={isDark ? '#A78BFA' : '#C084FC'}/>
      </g>

      {/* Animal */}
      <g transform="translate(400 500)" filter={isDark ? '' : "url(#glow)"}>
        <path d="M20,80 C40,40 100,40 120,80 L140,100 L0,100 Z" fill={isDark ? '#FDBA74' : '#FDBA74'} />
        <circle cx="70" cy="20" r="30" fill={isDark ? '#FDBA74' : '#FDBA74'} />
        <path d="M50 20 Q 70 -20 90 20" stroke={isDark ? '#854D0E' : '#A16207'} fill="none" strokeWidth="4" />
        <rect x="50" y="80" width="40" height="20" fill={isDark ? '#60A5FA' : '#3B82F6'}/>
      </g>

      {/* Fireflies / stars */}
      <circle cx="400" cy="300" r={isDark ? "8" : "10"} fill="#FBBF24" opacity="0.9" filter="url(#glow)"/>
      <circle cx="550" cy="250" r={isDark ? "10" : "15"} fill="#FBBF24" opacity="0.9" filter="url(#glow)"/>
      <circle cx="250" cy="350" r={isDark ? "6" : "8"} fill="#FBBF24" opacity="0.9" filter="url(#glow)"/>
    </svg>
  )
};
