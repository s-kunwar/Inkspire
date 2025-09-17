import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

// Reading by a window
export const GalleryImage1: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  return (
    <svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="300" height="400" fill={isDark ? "#1E3A8A" : "#BFDBFE"}/>
      <rect x="20" y="20" width="260" height="360" fill={isDark ? "#0C4A6E" : "#60A5FA"}/>
      <path d="M150 380 C 100 380, 100 200, 150 200 C 200 200, 200 380, 150 380 Z" fill={isDark ? "#FBCFE8" : "#FBCFE8"}/>
      <circle cx="150" cy="150" r="40" fill={isDark ? "#FBCFE8" : "#FBCFE8"}/>
      <rect x="120" y="250" width="60" height="10" fill={isDark ? "#BE185D" : "#D946EF"} rx="5"/>
    </svg>
  );
};

// Reading in a park
export const GalleryImage2: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  return (
    <svg viewBox="0 0 300 350" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="300" height="350" fill={isDark ? "#064E3B" : "#A7F3D0"}/>
      <circle cx="150" cy="400" r="150" fill={isDark ? "#047857" : "#22C55E"}/>
      <path d="M200 350 V 150 H 250 V 350" fill={isDark ? "#4D7C0F" : "#A3E635"}/>
      <circle cx="100" cy="220" r="30" fill={isDark ? "#FDE68A" : "#FDE68A"}/>
      <rect x="80" y="250" width="40" height="15" fill={isDark ? "#A5B4FC" : "#3B82F6"} rx="5"/>
    </svg>
  );
};

// Reading in a cafe
export const GalleryImage3: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  return (
    <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="300" height="300" fill={isDark ? "#451A03" : "#F5E9D3"}/>
      <rect y="250" width="300" height="50" fill={isDark ? "#7F1D1D" : "#8C5A3B"}/>
      <path d="M180 200 C 180 150, 250 150, 250 200 V 250 H 180 Z" fill={isDark ? "#F472B6" : "#F9A8D4"}/>
      <circle cx="215" cy="150" r="30" fill={isDark ? "#F472B6" : "#F9A8D4"}/>
      <rect x="200" y="210" width="30" height="10" fill={isDark ? "#E0E0E0" : "#FFFFFF"} rx="2"/>
      <path d="M80 250 C 80 200 120 200 120 250" stroke={isDark ? "#FCA5A5" : "#FFFFFF"} strokeWidth="10"/>
    </svg>
  );
};

// Reading on a balcony
export const GalleryImage4: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  return (
    <svg viewBox="0 0 300 450" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="300" height="450" fill={isDark ? "#0F172A" : "#1E293B"}/>
      <circle cx="50" cy="80" r="20" fill={isDark ? "#F1F5F9" : "#FBBF24"}/>
      <rect x="150" y="200" width="150" height="250" fill={isDark ? "#1E293B" : "#334155"}/>
      <circle cx="225" cy="300" r="40" fill={isDark ? "#C4B5FD" : "#A5B4FC"}/>
      <rect x="200" y="340" width="50" height="15" fill={isDark ? "#E0E0E0" : "#FFFFFF"} rx="5"/>
    </svg>
  );
};

// Reading in a library
export const GalleryImage5: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  return (
    <svg viewBox="0 0 300 380" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="300" height="380" fill={isDark ? "#57280D" : "#FEF3C7"}/>
      <rect x="50" y="50" width="200" height="280" fill={isDark ? "#422006" : "#D2B48C"}/>
      <rect x="60" y="60" width="180" height="260" fill={isDark ? "#78350F" : "#F5DEB3"}/>
      <rect x="70" y="70" width="20" height="240" fill={isDark ? "#451A03" : "#A0522D"}/>
      <rect x="100" y="70" width="20" height="240" fill={isDark ? "#57280D" : "#8B4513"}/>
      <circle cx="180" cy="250" r="35" fill={isDark ? "#F472B6" : "#F472B6"}/>
      <rect x="160" y="285" width="40" height="10" fill={isDark ? "#E0E0E0" : "#FFFFFF"} rx="3"/>
    </svg>
  );
};

// Reading with a friend
export const GalleryImage6: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  return (
    <svg viewBox="0 0 300 320" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="300" height="320" fill={isDark ? "#1A2E05" : "#ECFCCB"}/>
      <rect y="250" width="300" height="70" fill={isDark ? "#365314" : "#84CC16"}/>
      <circle cx="100" cy="200" r="30" fill={isDark ? "#FB923C" : "#FDBA74"}/>
      <rect x="80" y="230" width="40" height="10" fill={isDark ? "#818CF8" : "#4F46E5"} rx="3"/>
      <circle cx="200" cy="200" r="30" fill={isDark ? "#60A5FA" : "#93C5FD"}/>
      <rect x="180" y="230" width="40" height="10" fill={isDark ? "#E879F9" : "#D946EF"} rx="3"/>
    </svg>
  );
};
