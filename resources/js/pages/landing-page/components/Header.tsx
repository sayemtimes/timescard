import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CustomPage {
  id: number;
  title: string;
  slug: string;
}

interface HeaderProps {
  brandColor?: string;
  settings: any;
  sectionData?: any;
  customPages?: CustomPage[];
  directoryCustomPages?: CustomPage[];
  isDirectoryContext?: boolean;
  user?: any;
  directorySettings?: {
    company_name: string;
  };
}

export default function Header({ settings, sectionData, customPages = [], directoryCustomPages = [], isDirectoryContext = false, brandColor = '#3b82f6', user, directorySettings }: HeaderProps) {
  const { t } = useTranslation();
  const { props } = usePage();
  const globalSettings = (props as any).globalSettings || {};
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper to get full URL for images
  const getImageUrl = (path: string) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${window.appSettings.imageUrl}${path}`;
  };

  // Get company logo from settings (priority: landing page dark > global dark > landing page light > global light > default)
  const landingPageLogoDark = settings?.config_sections?.theme?.logo_dark;
  const landingPageLogoLight = settings?.config_sections?.theme?.logo_light;
  const globalLogoDark = globalSettings?.logoDark;
  const globalLogoLight = globalSettings?.logoLight;
  
  // Use dark logo if set, otherwise fall back to light logo, then default
  const logoPath = landingPageLogoDark || globalLogoDark || landingPageLogoLight || globalLogoLight;
  const companyLogo = (logoPath ? getImageUrl(logoPath) : '/images/logos/logo-dark.png') || '/images/logos/logo-dark.png';
  
  // Debug: Check if logo is properly configured
  React.useEffect(() => {
    console.log('🔍 Header Logo Debug:');
    console.log('  Landing Page Dark:', landingPageLogoDark || '(not set)');
    console.log('  Landing Page Light:', landingPageLogoLight || '(not set)');
    console.log('  Global Dark:', globalLogoDark || '(not set)');
    console.log('  Global Light:', globalLogoLight || '(not set)');
    console.log('  Final Logo Path:', logoPath || '(using default)');
    console.log('  Final Logo URL:', companyLogo);
  }, [logoPath, companyLogo, landingPageLogoDark, landingPageLogoLight, globalLogoDark, globalLogoLight, settings]);
  
  const menuItems = isDirectoryContext 
    ? directoryCustomPages.map(page => ({
        name: page.title,
        href: route('directory.custom-page.show', page.slug)
      }))
    : customPages.map(page => ({
        name: page.title,
        href: route('custom-page.show', page.slug)
      }));

  const isTransparent = sectionData?.transparent;
  const backgroundColor = sectionData?.background_color || '#ffffff';
  
  const getHeaderClasses = () => {
    if (isTransparent) {
      return isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50'
        : 'bg-transparent';
    }
    return isScrolled 
      ? 'shadow-lg border-b border-gray-200/50'
      : '';
  };

  const getHeaderStyle = () => {
    if (isTransparent) return {};
    return { backgroundColor };
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getHeaderClasses()}`}
      style={getHeaderStyle()}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center justify-center"
            style={{ background: '#ffffff', height: '100%', width: '64px' }}
          >
            {isDirectoryContext ? (
              <img 
                src={companyLogo} 
                alt={directorySettings?.company_name || settings.company_name}
                style={{ height: '100%', width: '100%', objectFit: 'contain' }}
              />
            ) : (
              <Link 
                href={route("home")} 
                className="inline-block"
              >
                <img 
                  src={companyLogo} 
                  alt={settings.company_name}
                  style={{ height: '100%', width: '100%', objectFit: 'contain', cursor: 'pointer' }}
                  className="hover:opacity-80 transition-opacity"
                />
              </Link>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            <Link
              href={route('directory.index')}
              className="text-gray-600 text-sm font-medium transition-colors relative group"
              style={{ '--hover-color': brandColor } as React.CSSProperties}
              onMouseEnter={(e) => e.currentTarget.style.color = brandColor}
              onMouseLeave={(e) => e.currentTarget.style.color = ''}
            >
              {t("Business Directory")}
              <span 
                className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full" 
                style={{ backgroundColor: brandColor }}
                aria-hidden="true"
              ></span>
            </Link>
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 text-sm font-medium transition-colors relative group"
                style={{ '--hover-color': brandColor } as React.CSSProperties}
                onMouseEnter={(e) => e.currentTarget.style.color = brandColor}
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
              >
                {item.name}
                <span 
                  className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full" 
                  style={{ backgroundColor: brandColor }}
                  aria-hidden="true"
                ></span>
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <Link
                href={route('dashboard')}
                className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors border"
                style={{ 
                  backgroundColor: brandColor, 
                  color: 'white',
                  borderColor: brandColor
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = brandColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = brandColor;
                  e.currentTarget.style.color = 'white';
                }}
              >
                {t("Dashboard")}
              </Link>
            ) : (
              <>
                <Link
                  href={route('login')}
                  className="text-gray-600 text-sm font-medium transition-colors px-6 py-2.5 rounded-lg border-2"
                  style={{ borderColor: brandColor, color: brandColor }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = brandColor;
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = brandColor;
                  }}
                >
                  {t("Login")}
                </Link>
                <Link
                  href={route('register')}
                  className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors border"
                  style={{ 
                    backgroundColor: brandColor, 
                    color: 'white',
                    borderColor: brandColor
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = brandColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = brandColor;
                    e.currentTarget.style.color = 'white';
                  }}
                >
                  {t("Get Started")}
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200" id="mobile-menu">
            <div 
              className="px-4 py-6 space-y-4"
              style={isTransparent ? { backgroundColor: 'white' } : { backgroundColor }}
            >
              <Link
                href={route('directory.index')}
                className="block text-gray-600 hover:text-gray-900 text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("Business Directory")}
              </Link>
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-600 hover:text-gray-900 text-base font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-3 border-t border-gray-200">
                {user ? (
                  <Link
                    href={route('dashboard')}
                    className="block w-full text-center py-2.5 rounded-lg text-sm font-semibold transition-colors border"
                    style={{ 
                      backgroundColor: brandColor, 
                      color: 'white',
                      borderColor: brandColor
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.color = brandColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = brandColor;
                      e.currentTarget.style.color = 'white';
                    }}
                  >
                    {t("Dashboard")}
                  </Link>
                ) : (
                  <>
                    <Link
                      href={route('login')}
                      className="block w-full text-center py-2.5 rounded-lg text-sm font-medium transition-colors border-2"
                      style={{ borderColor: brandColor, color: brandColor, backgroundColor: 'transparent' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = brandColor;
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = brandColor;
                      }}
                    >
                      {t("Login")}
                    </Link>
                    <Link
                      href={route('register')}
                      className="block w-full text-center py-2.5 rounded-lg text-sm font-semibold transition-colors border"
                      style={{ 
                        backgroundColor: brandColor, 
                        color: 'white',
                        borderColor: brandColor
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.color = brandColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = brandColor;
                        e.currentTarget.style.color = 'white';
                      }}
                    >
                      {t("Get Started")}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}