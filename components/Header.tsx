import React, { useState, useEffect, useContext } from 'react';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { SunIcon, MoonIcon } from './icons/ThemeIcons';
import { ThemeContext } from '../contexts/ThemeContext';
import { HeartIcon } from './icons/HeartIcon';
import { LogoutIcon } from './icons/LogoutIcon';

interface HeaderProps {
  isLoggedIn: boolean;
  onNavigate: (page: string) => void;
  currentPage: string;
  onLogout: () => void;
}

const LoggedInNavLink: React.FC<{ page: string; currentPage: string; onNavigate: (page: string) => void; children: React.ReactNode }> = ({ page, currentPage, onNavigate, children }) => {
  const isActive = currentPage === page;
  return (
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); onNavigate(page); }}
      className={`transition-colors px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1.5 ${isActive ? 'text-teal-600 bg-teal-50 dark:text-teal-300 dark:bg-teal-500/10' : 'text-slate-600 hover:text-teal-500 dark:text-slate-300 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
    >
      {children}
    </a>
  );
};

const LoggedOutNavLink: React.FC<{ page: string; currentPage: string; onNavigate: (page: string) => void; children: React.ReactNode }> = ({ page, currentPage, onNavigate, children }) => {
  const isActive = currentPage === page;
  return (
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); onNavigate(page); }}
      className={`transition-colors px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-teal-600 dark:text-teal-400' : 'text-slate-600 hover:text-teal-500 dark:text-slate-300 dark:hover:text-teal-400'}`}
    >
      {children}
    </a>
  );
};

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onNavigate, currentPage, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleMobileNavigate = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };
  
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };
  
  const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );

  const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-white/80 backdrop-blur-lg shadow-md dark:bg-slate-900/80' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <a href="#" onClick={(e) => {e.preventDefault(); onNavigate(isLoggedIn ? 'explore' : 'home')}} className="flex items-center gap-2 text-2xl font-bold text-slate-800 dark:text-white">
            <BookOpenIcon className="w-8 h-8 text-teal-500" />
            Inkspire
          </a>
          <nav className="hidden md:flex items-center space-x-2">
            {isLoggedIn ? (
              <>
                <LoggedInNavLink page="explore" currentPage={currentPage} onNavigate={onNavigate}>Explore</LoggedInNavLink>
                <LoggedInNavLink page="connect" currentPage={currentPage} onNavigate={onNavigate}>Connect</LoggedInNavLink>
                <LoggedInNavLink page="reachout" currentPage={currentPage} onNavigate={onNavigate}>Reach Out</LoggedInNavLink>
                <LoggedInNavLink page="fam" currentPage={currentPage} onNavigate={onNavigate}>Fam</LoggedInNavLink>
                <LoggedInNavLink page="customize" currentPage={currentPage} onNavigate={onNavigate}>Customize</LoggedInNavLink>
              </>
            ) : (
              <>
                <LoggedOutNavLink page="features" currentPage={currentPage} onNavigate={onNavigate}>Features</LoggedOutNavLink>
                <LoggedOutNavLink page="about" currentPage={currentPage} onNavigate={onNavigate}>About</LoggedOutNavLink>
                <LoggedOutNavLink page="contact" currentPage={currentPage} onNavigate={onNavigate}>Contact</LoggedOutNavLink>
              </>
            )}
          </nav>
          <div className="flex items-center gap-2">
            {isLoggedIn && (
               <>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); onNavigate('readingList'); }}
                  className={`p-2 rounded-full transition-colors ${currentPage === 'readingList' ? 'text-teal-600 bg-teal-50 dark:text-teal-300 dark:bg-teal-500/10' : 'text-slate-600 hover:text-teal-500 dark:text-slate-300 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  aria-label="My Reading List"
                >
                  <HeartIcon className="w-6 h-6" isFilled={false} />
                </a>
               </>
            )}
            <button
              onClick={toggleTheme}
              className="relative flex items-center justify-center w-10 h-10 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle theme"
            >
              <SunIcon className={`w-6 h-6 transition-all duration-300 transform ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-50 opacity-0'}`} />
              <MoonIcon className={`absolute w-6 h-6 transition-all duration-300 transform ${theme === 'light' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'}`} />
            </button>
            {isLoggedIn && (
              <button
                onClick={onLogout}
                className="p-2 rounded-full transition-colors text-slate-600 hover:text-red-500 dark:text-slate-300 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Logout"
              >
                <LogoutIcon className="w-6 h-6" />
              </button>
            )}
            {!isLoggedIn && (
              <a href="#signup" onClick={handleSmoothScroll} className="hidden md:inline-block bg-teal-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-teal-600 dark:hover:bg-teal-400 transition-all transform hover:scale-105">
                Join Now
              </a>
            )}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? <CloseIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <nav className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {isLoggedIn ? (
              <>
                <a href="#" onClick={(e) => {e.preventDefault(); handleMobileNavigate('explore')}} className={`block px-3 py-2 rounded-md text-base font-medium ${currentPage === 'explore' ? 'bg-teal-50 text-teal-700 dark:bg-teal-900 dark:text-white' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}>Explore</a>
                <a href="#" onClick={(e) => {e.preventDefault(); handleMobileNavigate('connect')}} className={`block px-3 py-2 rounded-md text-base font-medium ${currentPage === 'connect' ? 'bg-teal-50 text-teal-700 dark:bg-teal-900 dark:text-white' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}>Connect</a>
                <a href="#" onClick={(e) => {e.preventDefault(); handleMobileNavigate('reachout')}} className={`block px-3 py-2 rounded-md text-base font-medium ${currentPage === 'reachout' ? 'bg-teal-50 text-teal-700 dark:bg-teal-900 dark:text-white' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}>Reach Out</a>
                <a href="#" onClick={(e) => {e.preventDefault(); handleMobileNavigate('fam')}} className={`block px-3 py-2 rounded-md text-base font-medium ${currentPage === 'fam' ? 'bg-teal-50 text-teal-700 dark:bg-teal-900 dark:text-white' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}>Fam</a>
                <a href="#" onClick={(e) => {e.preventDefault(); handleMobileNavigate('readingList')}} className={`block px-3 py-2 rounded-md text-base font-medium ${currentPage === 'readingList' ? 'bg-teal-50 text-teal-700 dark:bg-teal-900 dark:text-white' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}>My List</a>
                <a href="#" onClick={(e) => {e.preventDefault(); handleMobileNavigate('customize')}} className={`block px-3 py-2 rounded-md text-base font-medium ${currentPage === 'customize' ? 'bg-teal-50 text-teal-700 dark:bg-teal-900 dark:text-white' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}>Customize</a>
                <hr className="border-slate-200 dark:border-slate-700 my-2" />
                <a href="#" onClick={(e) => {e.preventDefault(); onLogout(); setIsMobileMenuOpen(false);}} className="block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/50">Logout</a>
              </>
            ) : (
              <>
                <a href="#" onClick={(e) => {e.preventDefault(); handleMobileNavigate('features')}} className={`block px-3 py-2 rounded-md text-base font-medium ${currentPage === 'features' ? 'bg-teal-50 text-teal-700 dark:bg-teal-900 dark:text-white' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}>Features</a>
                <a href="#" onClick={(e) => {e.preventDefault(); handleMobileNavigate('about')}} className={`block px-3 py-2 rounded-md text-base font-medium ${currentPage === 'about' ? 'bg-teal-50 text-teal-700 dark:bg-teal-900 dark:text-white' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}>About</a>
                <a href="#" onClick={(e) => {e.preventDefault(); handleMobileNavigate('contact')}} className={`block px-3 py-2 rounded-md text-base font-medium ${currentPage === 'contact' ? 'bg-teal-50 text-teal-700 dark:bg-teal-900 dark:text-white' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}>Contact</a>
                <a href="#signup" onClick={handleSmoothScroll} className="block w-full text-center mt-4 bg-teal-500 text-white font-semibold px-3 py-2 rounded-md hover:bg-teal-600 dark:hover:bg-teal-400">Join Now</a>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;