import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

export const ChatIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="chatGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isDark ? '#2DD4BF' : '#A7F3D0'} />
          <stop offset="100%" stopColor={isDark ? '#0D9488' : '#5EEAD4'} />
        </linearGradient>
        <linearGradient id="chatGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isDark ? '#A78BFA' : '#C4B5FD'} />
          <stop offset="100%" stopColor={isDark ? '#7C3AED' : '#8B5CF6'} />
        </linearGradient>
      </defs>
      <style>
        {`
          .float1 { animation: float-up-down 4s ease-in-out infinite; }
          .float2 { animation: float-up-down 5s ease-in-out infinite 0.5s; }
          .float3 { animation: float-up-down 6s ease-in-out infinite 1s; }
          @keyframes float-up-down {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
      
      {/* Background shapes */}
      <circle cx="100" cy="150" r="100" fill={isDark ? '#1E293B' : '#F1F5F9'} />
      <circle cx="300" cy="150" r="120" fill={isDark ? '#334155' : '#E2E8F0'} />
      
      {/* Chat bubble 1 */}
      <g className="float1">
        <path d="M50 100 C 20 100, 20 140, 50 140 L130 140 C 160 140, 160 100, 130 100 Z" fill="url(#chatGrad1)" />
        <path d="M70 140 L 80 155 L 90 140 Z" fill="url(#chatGrad1)" />
      </g>

      {/* Chat bubble 2 */}
      <g className="float2">
        <path d="M250 80 C 220 80, 220 120, 250 120 L330 120 C 360 120, 360 80, 330 80 Z" fill="url(#chatGrad2)" />
        <path d="M310 120 L 300 135 L 290 120 Z" fill="url(#chatGrad2)" />
      </g>
      
      {/* Chat bubble 3 (typing) */}
      <g className="float3">
        <path d="M120 200 C 100 200, 100 230, 120 230 L180 230 C 200 230, 200 200, 180 200 Z" fill={isDark ? '#475569' : '#CBD5E1'} />
        <path d="M140 230 L 150 245 L 160 230 Z" fill={isDark ? '#475569' : '#CBD5E1'} />
        <circle cx="135" cy="215" r="4" fill={isDark ? '#94A3B8' : '#FFFFFF'} />
        <circle cx="150" cy="215" r="4" fill={isDark ? '#94A3B8' : '#FFFFFF'} />
        <circle cx="165" cy="215" r="4" fill={isDark ? '#94A3B8' : '#FFFFFF'} />
      </g>
    </svg>
  );
};
