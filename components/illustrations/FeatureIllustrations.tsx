import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

// Illustration for Personalized Recommendations
export const PersonalizedRecsIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  return(
    <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="200" height="150" fill={isDark ? '#1E293B' : '#F0F9FF'} rx="8"/>
      <g transform="translate(100 75)">
        <path d="M-80 -50 H 80 V 50 H -80 Z" fill={isDark ? '#7C3AED' : '#A78BFA'}/>
        <path d="M-75 -45 H 75 V 45 H -75 Z" fill={isDark ? '#312E81' : '#EDE9FE'}/>
        <path d="M-65 0 L -45 -20 L -25 0 L -45 20 Z" fill={isDark ? '#A78BFA' : '#A78BFA'}/>
        <circle cx="0" cy="0" r="30" fill={isDark ? '#F472B6' : '#FBCFE8'} filter="url(#bookGlow)" />
        <path d="M-10 -15 L 10 -15 L 10 15 L -10 15 Z M 0 -15 V 15" stroke={isDark ? '#F9A8D4' : '#EC4899'} strokeWidth="2" fill="none"/>
      </g>
      <defs>
        <filter id="bookGlow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
        </filter>
      </defs>
    </svg>
  );
};

// Illustration for Community & Sharing
export const CommunityIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  return (
    <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="200" height="150" fill={isDark ? '#422006' : '#FFFBEB'} rx="8"/>
      {/* Character 1 */}
      <circle cx="60" cy="80" r="20" fill={isDark ? '#FCD34D' : '#FDE68A'}/>
      <rect x="50" y="100" width="20" height="30" fill={isDark ? '#F97316' : '#FB923C'}/>
      {/* Character 2 */}
      <circle cx="140" cy="80" r="20" fill={isDark ? '#A5B4FC' : '#A5B4FC'}/>
      <rect x="130" y="100" width="20" height="30" fill={isDark ? '#4F46E5' : '#6366F1'}/>
      {/* Speech bubbles */}
      <path d="M80 60 L 90 50 L 120 50 L 120 70 L 90 70 L 80 60" fill={isDark ? '#374151' : '#FFFFFF'} stroke={isDark ? '#4B5563' : '#E5E7EB'}/>
      <text x="95" y="66" fontSize="10" fill="#F43F5E">❤️</text>
    </svg>
  );
};

// Illustration for Inspirational Feed
export const InspirationIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  return (
    <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="200" height="150" fill={isDark ? '#064E3B' : '#F0FDF4'} rx="8"/>
      <path d="M 50 130 C 80 100, 120 100, 150 130" stroke={isDark ? '#4ADE80' : '#BEF264'} strokeWidth="4" fill="none" />
      <g transform="translate(100 60)">
        <path d="M -40 -30 H 40 V 30 H -40 Z" fill={isDark ? '#1F2937' : '#FFFFFF'} stroke={isDark ? '#374151' : '#E5E7EB'}/>
        <text x="-30" y="0" fontSize="10" fill={isDark ? '#D1D5DB' : '#4B5563'} fontFamily="serif" fontStyle="italic">"To read is to fly..."</text>
      </g>
      {/* Stars */}
      <path d="M150 40 L 155 50 L 165 52 L 158 60 L 160 70 L 150 65 L 140 70 L 142 60 L 135 52 L 145 50 Z" fill="#FACC15"/>
    </svg>
  );
};

// Illustration for Professional Support
export const SupportIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  return (
    <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="200" height="150" fill={isDark ? '#1E3A8A' : '#EFF6FF'} rx="8"/>
      {/* Character 1 (Support) */}
      <circle cx="70" cy="80" r="20" fill={isDark ? '#60A5FA' : '#93C5FD'}/>
      <rect x="60" y="100" width="20" height="30" fill={isDark ? '#2563EB' : '#3B82F6'}/>
      {/* Character 2 (User) */}
      <circle cx="130" cy="90" r="15" fill={isDark ? '#FDBA74' : '#FDBA74'}/>
      <rect x="122" y="105" width="16" height="25" fill={isDark ? '#F97316' : '#F97316'}/>
      {/* Heart */}
      <path d="M 100 60 C 90 50, 80 55, 80 65 C 80 80, 100 95, 100 95 C 100 95, 120 80, 120 65 C 120 55, 110 50, 100 60 Z" fill="#F472B6"/>
    </svg>
  );
};
