import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

export const CustomizeIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isDark ? '#5B21B6' : '#A78BFA'} />
          <stop offset="100%" stopColor={isDark ? '#1D4ED8' : '#60A5FA'} />
        </linearGradient>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isDark ? '#BE185D' : '#F472B6'} />
          <stop offset="100%" stopColor={isDark ? '#F59E0B' : '#FBBF24'} />
        </linearGradient>
      </defs>
      
      <g transform="translate(250, 250)">
        {/* Central Element - Mind */}
        <circle cx="0" cy="0" r="80" fill={isDark ? '#1E293B' : '#F1F5F9'} />
        <circle cx="0" cy="0" r="75" fill={isDark ? 'url(#grad1)' : 'url(#grad1)'} opacity="0.5" filter="url(#softGlow)" />
        <path d="M-20 -15 Q 0 -30 20 -15" stroke={isDark ? '#E2E8F0' : '#475569'} strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M-25 10 Q 0 25 25 10" stroke={isDark ? '#E2E8F0' : '#475569'} strokeWidth="3" fill="none" strokeLinecap="round"/>

        {/* Orbiting Concepts */}
        <g style={{ animation: 'spin 30s linear infinite' }}>
          {/* Interest */}
          <g transform="translate(150, 0) rotate(0)">
            <rect x="-25" y="-15" width="50" height="30" rx="10" fill="url(#grad2)" />
            <path d="M-10 -5 L 10 5 M 10 -5 L -10 5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </g>
          {/* Goal */}
          <g transform="translate(0, -180) rotate(0)">
            <path d="M0 -20 L 15 0 L 0 20 L -15 0 Z" fill={isDark ? '#34D399' : '#10B981'}/>
          </g>
           {/* Mood */}
          <g transform="translate(-160, 50) rotate(0)">
             <path d="M-20 0 A 20 20 0 0 1 20 0" stroke={isDark ? '#FBBF24' : '#F59E0B'} strokeWidth="4" fill="none" strokeLinecap="round"/>
          </g>
        </g>
        
        {/* Flowing lines */}
        <path d="M-80 0 C -150 -100, 150 -100, 80 0" stroke="url(#grad1)" strokeWidth="3" fill="none" opacity="0.6" />
        <path d="M-60 20 C -120 150, 120 150, 60 20" stroke="url(#grad2)" strokeWidth="3" fill="none" opacity="0.6" />
        <path d="M-70 -10 C -50 180, 200 50, 70 -10" stroke={isDark ? '#34D399' : '#6EE7B7'} strokeWidth="3" fill="none" opacity="0.6" />

      </g>
      <style>
        {`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}
      </style>
    </svg>
  );
};