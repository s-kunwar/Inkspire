import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

export const ConnectIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <filter id="connectGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={isDark ? "20" : "15"} result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="connectGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isDark ? '#1D4ED8' : '#60A5FA'} />
          <stop offset="100%" stopColor={isDark ? '#5B21B6' : '#A78BFA'} />
        </linearGradient>
        <linearGradient id="connectGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isDark ? '#047857' : '#10B981'} />
          <stop offset="100%" stopColor={isDark ? '#F59E0B' : '#34D399'} />
        </linearGradient>
      </defs>

      <style>
        {`
          .node { animation: float 8s ease-in-out infinite; }
          .node1 { animation-delay: 0s; }
          .node2 { animation-delay: -2s; }
          .node3 { animation-delay: -4s; }
          .node4 { animation-delay: -6s; }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          
          .line {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: draw 10s ease-in-out infinite;
          }
          .line1 { animation-delay: 0s; }
          .line2 { animation-delay: -3s; }
          .line3 { animation-delay: -6s; }
          
          @keyframes draw {
            to { stroke-dashoffset: 0; }
          }
        `}
      </style>

      {/* Connection Lines */}
      <path className="line line1" d="M150 150 Q 250 250, 350 150" stroke={isDark ? '#38BDF8' : '#3B82F6'} strokeWidth="3" fill="none" opacity="0.6" />
      <path className="line line2" d="M150 150 S 100 350, 250 350" stroke={isDark ? '#4ADE80' : '#22C55E'} strokeWidth="3" fill="none" opacity="0.6" />
      <path className="line line3" d="M350 150 C 450 250, 350 450, 250 350" stroke={isDark ? '#F472B6' : '#EC4899'} strokeWidth="3" fill="none" opacity="0.6" />
      
      {/* Node 1 */}
      <g className="node node1" transform="translate(150, 150)">
        <circle r="40" fill="url(#connectGrad1)" filter="url(#connectGlow)" opacity="0.8" />
        <path d="M-15 -5 H 15 M -15 2 H 15 M -10 9 H 10" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </g>
      
      {/* Node 2 */}
      <g className="node node2" transform="translate(350, 150)">
        <circle r="35" fill="url(#connectGrad2)" filter="url(#connectGlow)" opacity="0.8" />
        <path d="M-10 -10 L 10 10 M 10 -10 L -10 10" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </g>
      
      {/* Node 3 */}
      <g className="node node3" transform="translate(250, 350)">
        <circle r="50" fill={isDark ? 'url(#connectGrad1)' : 'url(#connectGrad2)'} filter="url(#connectGlow)" opacity="0.8" />
        <rect x="-15" y="-15" width="30" height="30" rx="5" fill="white" opacity="0.8"/>
        <circle cx="0" cy="0" r="8" fill={isDark ? '#047857' : '#5B21B6'} />
      </g>
      
      {/* Node 4 (Central) */}
      <g className="node node4" transform="translate(250, 250)">
         <circle r="25" fill={isDark ? '#4B5569' : '#94A3B8'} />
      </g>
      
    </svg>
  );
};
