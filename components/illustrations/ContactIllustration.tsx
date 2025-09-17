import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

export const ContactIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="contactGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isDark ? '#0F766E' : '#2DD4BF'} />
          <stop offset="100%" stopColor={isDark ? '#115E59' : '#14B8A6'} />
        </linearGradient>
      </defs>
      
      {/* Background shape */}
      <path d="M50 0 H450 A50 50 0 0 1 500 50 V450 A50 50 0 0 1 450 500 H50 A50 50 0 0 1 0 450 V50 A50 50 0 0 1 50 0" fill="url(#contactGrad)" />

      {/* Envelope */}
      <g transform="translate(250, 250)">
        <path d="M-150 -100 H150 L0 25 Z" fill={isDark ? '#083344' : '#5EEAD4'} />
        <rect x="-150" y="-100" width="300" height="200" fill={isDark ? '#0D9488' : '#99F6E4'} />
        <path d="M-150 -100 L0 25 L150 -100" stroke={isDark ? '#0F766E' : '#14B8A6'} strokeWidth="5" fill="none" />
      </g>

      {/* Paper Plane */}
      <g transform="translate(100, 150)" style={{ animation: 'fly 8s ease-in-out infinite' }}>
        <path d="M0 0 L50 25 L0 50 L10 25 Z" fill={isDark ? '#F1F5F9' : '#FFFFFF'} />
      </g>
      
      {/* Dots */}
      <circle cx="400" cy="80" r="10" fill={isDark ? '#115E59' : '#CCFBF1'} style={{ animation: 'pulse 4s infinite 0.5s' }} />
      <circle cx="80" cy="420" r="15" fill={isDark ? '#115E59' : '#CCFBF1'} style={{ animation: 'pulse 4s infinite 1s' }} />
      <circle cx="450" cy="380" r="8" fill={isDark ? '#115E59' : '#CCFBF1'} style={{ animation: 'pulse 4s infinite 1.5s' }}/>

      <style>
        {`
          @keyframes fly {
            0% { transform: translate(100px, 150px) rotate(-15deg); opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { transform: translate(350px, 400px) rotate(15deg); opacity: 0; }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.2); opacity: 1; }
          }
        `}
      </style>
    </svg>
  );
};
