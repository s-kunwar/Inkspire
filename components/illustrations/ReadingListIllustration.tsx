import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

export const ReadingListIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const hoverFilter = isDark
    ? 'drop-shadow(0px 8px 25px rgba(167, 139, 250, 0.3))'
    : 'drop-shadow(0px 8px 20px rgba(0, 0, 0, 0.25))';

  return (
    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="bookCover1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isDark ? '#581C87' : '#A855F7'} />
          <stop offset="100%" stopColor={isDark ? '#3B0764' : '#7E22CE'} />
        </linearGradient>
        <linearGradient id="bookCover2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isDark ? '#047857' : '#10B981'} />
          <stop offset="100%" stopColor={isDark ? '#064E3B' : '#059669'} />
        </linearGradient>
        <linearGradient id="bookCover3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isDark ? '#BE185D' : '#F472B6'} />
          <stop offset="100%" stopColor={isDark ? '#831843' : '#DB2777'} />
        </linearGradient>
      </defs>

      <style>
        {`
          .book-interactive {
            transition: transform 0.3s ease-out, filter 0.3s ease-out;
            cursor: pointer;
            will-change: transform, filter;
          }

          .book-anim:hover {
            animation-play-state: paused;
          }

          .book-anim:hover .book-interactive {
            transform: scale(1.15) rotate(2deg);
            filter: ${hoverFilter};
          }

          .book1-anim { animation: float1 10s ease-in-out infinite; }
          .book2-anim { animation: float2 12s ease-in-out infinite; }
          .book3-anim { animation: float3 9s ease-in-out infinite; }
          .book4-anim { animation: float4 11s ease-in-out infinite; }
          .book5-anim { animation: float5 8s ease-in-out infinite; }
          .book6-anim { animation: float6 13s ease-in-out infinite; }

          @keyframes float1 {
            0% { transform: translate(300px, 160px) rotate(-10deg); }
            50% { transform: translate(310px, 145px) rotate(-13deg); }
            100% { transform: translate(300px, 160px) rotate(-10deg); }
          }
          @keyframes float2 {
            0% { transform: translate(100px, 380px) rotate(15deg); }
            50% { transform: translate(90px, 400px) rotate(12deg); }
            100% { transform: translate(100px, 380px) rotate(15deg); }
          }
          @keyframes float3 {
            0% { transform: translate(420px, 320px) rotate(-5deg); }
            50% { transform: translate(430px, 340px) rotate(-8deg); }
            100% { transform: translate(420px, 320px) rotate(-5deg); }
          }
          @keyframes float4 {
            0% { transform: translate(120px, 60px) rotate(5deg); }
            50% { transform: translate(130px, 80px) rotate(8deg); }
            100% { transform: translate(120px, 60px) rotate(5deg); }
          }
          @keyframes float5 {
            0% { transform: translate(400px, 40px) rotate(-15deg); }
            50% { transform: translate(390px, 60px) rotate(-12deg); }
            100% { transform: translate(400px, 40px) rotate(-15deg); }
          }
          @keyframes float6 {
            0% { transform: translate(60px, 200px) rotate(20deg); }
            50% { transform: translate(75px, 210px) rotate(24deg); }
            100% { transform: translate(60px, 200px) rotate(20deg); }
          }

          .sparkle {
            animation: sparkle-anim 5s ease-in-out infinite;
            opacity: 0;
          }
          @keyframes sparkle-anim {
            0%, 100% { opacity: 0; transform: scale(0.5); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          .sparkle1 { animation-delay: 0s; }
          .sparkle2 { animation-delay: 1.3s; }
          .sparkle3 { animation-delay: 2.1s; }
          .sparkle4 { animation-delay: 3.5s; }
          .sparkle5 { animation-delay: 4.2s; }
          .sparkle6 { animation-delay: 0.5s; }
          .sparkle7 { animation-delay: 0.8s; }
          .sparkle8 { animation-delay: 1.9s; }
          .sparkle9 { animation-delay: 2.8s; }
          .sparkle10 { animation-delay: 3.8s; }
        `}
      </style>
      
      {/* Sparkles */}
      <path d="M-5 0 L 5 0 M 0 -5 L 0 5" stroke={isDark ? '#FBBF24' : '#F59E0B'} strokeWidth="2" className="sparkle sparkle1" transform="translate(150, 100) rotate(45)" />
      <path d="M-4 0 L 4 0 M 0 -4 L 0 4" stroke={isDark ? '#A78BFA' : '#C4B5FD'} strokeWidth="2" className="sparkle sparkle2" transform="translate(400, 150) rotate(-30)" />
      <path d="M-6 0 L 6 0 M 0 -6 L 0 6" stroke={isDark ? '#6EE7B7' : '#34D399'} strokeWidth="2" className="sparkle sparkle3" transform="translate(80, 250) rotate(0)" />
      <path d="M-5 0 L 5 0 M 0 -5 L 0 5" stroke={isDark ? '#F472B6' : '#F9A8D4'} strokeWidth="2" className="sparkle sparkle4" transform="translate(420, 420) rotate(20)" />
      <path d="M-5 0 L 5 0 M 0 -5 L 0 5" stroke={isDark ? '#60A5FA' : '#3B82F6'} strokeWidth="2" className="sparkle sparkle5" transform="translate(250, 450) rotate(60)" />
      <path d="M-4 0 L 4 0 M 0 -4 L 0 4" stroke={isDark ? '#FDE68A' : '#FBBF24'} strokeWidth="1.5" className="sparkle sparkle6" transform="translate(50, 400) rotate(10)" />
      <path d="M-5 0 L 5 0 M 0 -5 L 0 5" stroke={isDark ? '#FBBF24' : '#F59E0B'} strokeWidth="2" className="sparkle sparkle7" transform="translate(450, 250) rotate(45)" />
      <path d="M-4 0 L 4 0 M 0 -4 L 0 4" stroke={isDark ? '#A78BFA' : '#C4B5FD'} strokeWidth="2" className="sparkle sparkle8" transform="translate(50, 50) rotate(-30)" />
      <path d="M-6 0 L 6 0 M 0 -6 L 0 6" stroke={isDark ? '#6EE7B7' : '#34D399'} strokeWidth="2" className="sparkle sparkle9" transform="translate(250, 30) rotate(0)" />
      <path d="M-5 0 L 5 0 M 0 -5 L 0 5" stroke={isDark ? '#F472B6' : '#F9A8D4'} strokeWidth="2" className="sparkle sparkle10" transform="translate(180, 450) rotate(20)" />

      
      <g className="book-anim book2-anim" style={{ transformOrigin: 'center' }}>
        <g className="book-interactive">
          <rect x="-80" y="-18" width="160" height="36" rx="4" fill="url(#bookCover2)" />
          <rect x="-80" y="-13" width="8" height="26" fill={isDark ? "#FFF" : "#F1F5F9"} opacity="0.8" />
          <rect x="-65" y="-7" width="90" height="4" fill="white" opacity="0.3" rx="2" />
        </g>
      </g>
      
      <g className="book-anim book4-anim" style={{ transformOrigin: 'center' }}>
        <g className="book-interactive">
          <rect x="-70" y="-15" width="140" height="30" rx="4" fill="url(#bookCover1)" />
          <rect x="-70" y="-11" width="7" height="22" fill={isDark ? "#FFF" : "#F1F5F9"} opacity="0.8" />
          <rect x="-55" y="-6" width="80" height="3.5" fill="white" opacity="0.3" rx="2" />
        </g>
      </g>

      <g className="book-anim book3-anim" style={{ transformOrigin: 'center' }}>
        <g className="book-interactive">
          <rect x="-90" y="-20" width="180" height="40" rx="5" fill="url(#bookCover3)" />
          <rect x="-90" y="-15" width="10" height="30" fill={isDark ? "#FFF" : "#F1F5F9"} opacity="0.8" />
          <rect x="-70" y="-8" width="110" height="5" fill="white" opacity="0.3" rx="2.5" />
        </g>
      </g>

      <g className="book-anim book6-anim" style={{ transformOrigin: 'center' }}>
        <g className="book-interactive">
          <rect x="-75" y="-16" width="150" height="32" rx="4" fill="url(#bookCover3)" />
          <rect x="-75" y="-12" width="8" height="24" fill={isDark ? "#FFF" : "#F1F5F9"} opacity="0.8" />
          <rect x="-60" y="-7" width="85" height="4" fill="white" opacity="0.3" rx="2" />
        </g>
      </g>
      
      <g className="book-anim book5-anim" style={{ transformOrigin: 'center' }}>
        <g className="book-interactive">
          <path d="M -80 -20 C -80 -20, -80 20, 0 20 C 80 20, 80 -20, 80 -20 L 80 -25 L -80 -25 Z" fill={isDark ? "#FFF" : "#F1F5F9"}/>
          <path d="M 0 20 C -80 20, -80 -20, -80 -20 L -85 -20 C -85 25, 0 25, 0 25 Z" fill="url(#bookCover2)" />
          <path d="M 0 20 C 80 20, 80 -20, 80 -20 L 85 -20 C 85 25, 0 25, 0 25 Z" fill="url(#bookCover2)" />
          <path d="M -60 -8 H -15 M -60 0 H -15 M -60 8 H -15" stroke={isDark ? '#94A3B8' : '#CBD5E1'} strokeWidth="1.5" fill="none" opacity="0.7"/>
          <path d="M 15 -8 H 60 M 15 0 H 60 M 15 8 H 60" stroke={isDark ? '#94A3B8' : '#CBD5E1'} strokeWidth="1.5" fill="none" opacity="0.7"/>
        </g>
      </g>
      
      <g className="book-anim book1-anim" style={{ transformOrigin: 'center' }}>
        <g className="book-interactive">
          <path d="M -100 -25 C -100 -25, -100 25, 0 25 C 100 25, 100 -25, 100 -25 L 100 -30 L -100 -30 Z" fill={isDark ? "#FFF" : "#F1F5F9"}/>
          <path d="M 0 25 C -100 25, -100 -25, -100 -25 L -105 -25 C -105 30, 0 30, 0 30 Z" fill="url(#bookCover1)" />
          <path d="M 0 25 C 100 25, 100 -25, 100 -25 L 105 -25 C 105 30, 0 30, 0 30 Z" fill="url(#bookCover1)" />
          <path d="M -80 -10 H -20 M -80 0 H -20 M -80 10 H -20" stroke={isDark ? '#94A3B8' : '#CBD5E1'} strokeWidth="1.5" fill="none" opacity="0.7"/>
          <path d="M 20 -10 H 80 M 20 0 H 80 M 20 10 H 80" stroke={isDark ? '#94A3B8' : '#CBD5E1'} strokeWidth="1.5" fill="none" opacity="0.7"/>
        </g>
      </g>
    </svg>
  );
};
