import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

export const ReachOutIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="reachOutGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isDark ? '#0D9488' : '#5EEAD4'} />
          <stop offset="100%" stopColor={isDark ? '#0F766E' : '#14B8A6'} />
        </linearGradient>
        <linearGradient id="reachOutGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isDark ? '#FBBF24' : '#FDE68A'} />
          <stop offset="100%" stopColor={isDark ? '#F59E0B' : '#FCD34D'} />
        </linearGradient>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="15" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      <style>
        {`
          .path-anim1 { animation: flow1 12s ease-in-out infinite; }
          .path-anim2 { animation: flow2 15s ease-in-out infinite; }
          .orb-anim { animation: pulse 6s ease-in-out infinite; }

          @keyframes flow1 {
            0%, 100% { d: path("M 50 200 C 150 100, 350 300, 450 200"); }
            50% { d: path("M 50 200 C 180 120, 320 280, 450 200"); }
          }
          @keyframes flow2 {
            0%, 100% { d: path("M 50 220 C 150 320, 350 100, 450 220"); }
            50% { d: path("M 50 220 C 180 300, 320 120, 450 220"); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.9; }
            50% { transform: scale(1.1); opacity: 1; }
          }
        `}
      </style>

      {/* Background Orbs */}
      <circle cx="150" cy="150" r="100" fill="url(#reachOutGrad1)" opacity="0.3" filter="url(#softGlow)" />
      <circle cx="350" cy="250" r="120" fill="url(#reachOutGrad2)" opacity="0.3" filter="url(#softGlow)" />

      {/* Flowing Paths */}
      <path className="path-anim1" stroke={isDark ? '#5EEAD4' : '#0D9488'} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.8" />
      <path className="path-anim2" stroke={isDark ? '#FCD34D' : '#F59E0B'} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.8" />
      
      {/* Central Heart/Connection Element */}
      <g className="orb-anim" style={{ transformOrigin: '250px 200px' }}>
        <path d="M250,180 C220,150 200,160 200,180 C200,210 250,240 250,240 C250,240 300,210 300,180 C300,160 280,150 250,180 Z" fill={isDark ? '#A78BFA' : '#C4B5FD'} />
      </g>
      
      {/* Abstract person shapes */}
      <g>
        <circle cx="120" cy="230" r="25" fill={isDark ? '#0F766E' : '#14B8A6'}/>
        <path d="M90 250 C 100 320, 140 320, 150 250 Z" fill={isDark ? '#0D9488' : '#5EEAD4'} />
      </g>
      <g>
        <circle cx="380" cy="170" r="25" fill={isDark ? '#B45309' : '#FBBF24'}/>
        <path d="M350 190 C 360 260, 400 260, 410 190 Z" fill={isDark ? '#F59E0B' : '#FCD34D'} />
      </g>

    </svg>
  );
};