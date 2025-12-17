import { handleAppointmentBooking } from '../VCardPreview';
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ensureRequiredSections } from '@/utils/ensureRequiredSections';
import { VideoEmbed, extractVideoUrl } from '@/components/VideoEmbed';
import { createYouTubeEmbedRef } from '@/utils/youtubeEmbedUtils';
import { useTranslation } from 'react-i18next';
import { sanitizeVideoData } from '@/utils/secureVideoUtils';
import languageData from '@/../../resources/lang/language.json';
import { 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Instagram, 
  Facebook, 
  Twitter, 
  Clock, 
  Calendar, 
  Star, 
  ChevronRight, 
  UserPlus,
  ExternalLink,
  Image as ImageIcon,
  MessageSquare,
  Heart,
  Gift,
  Home,
  Users,
  CheckCircle2,
  CalendarDays,
  HelpCircle,
  Youtube,
  Building,
  Video,
  Play,
  Share2,
  QrCode
} from 'lucide-react';
import SocialIcon from '../../../link-bio-builder/components/SocialIcon';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionOrder } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';

interface WeddingPlannerTemplateProps {
  data: {
    name?: string;
    email?: string;
    phone?: string;
    website?: string;
    description?: string;
    config_sections?: any;
    template_config?: any;
  };
  template: {
    defaultData?: any;
    defaultColors?: any;
    defaultFont?: string;
  };
}

export default function WeddingPlannerTemplate({ data, template }: WeddingPlannerTemplateProps) {
  const { t, i18n } = useTranslation();
  const [activePortfolio, setActivePortfolio] = useState<number>(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Get all sections for this business type
  const templateSections = template?.defaultData || {};
  
  // Ensure all required sections are available
  const configSections = ensureRequiredSections(data.config_sections || {}, templateSections);

  // Testimonials state
  const [currentReview, setCurrentReview] = React.useState(0);
  
  // Effect for testimonials rotation
  React.useEffect(() => {
    const testimonialsData = configSections.testimonials;
    const reviews = testimonialsData?.reviews || [];
    if (!Array.isArray(reviews) || reviews.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentReview(prev => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [configSections.testimonials?.reviews]);
  
  // Language selector state
  const [showLanguageSelector, setShowLanguageSelector] = React.useState(false);
  const [currentLanguage, setCurrentLanguage] = React.useState(configSections.language?.template_language || 'en');

  // QR Modal state
  const [showQrModal, setShowQrModal] = React.useState(false);
  
  // RTL languages
  const rtlLanguages = ['ar', 'he'];
  const isRTL = rtlLanguages.includes(currentLanguage);
  
  // Change language function
  const changeLanguage = (langCode: string) => {
    setCurrentLanguage(langCode);
    setShowLanguageSelector(false);
    i18n.changeLanguage(langCode);
  };
  
  // Process video content at component level to avoid hooks in render functions
  const videoContent = React.useMemo(() => {
    const videos = configSections.videos?.video_list || [];
    if (!Array.isArray(videos)) return [];
    return videos.map((video: any, index: number) => {
      // If it's an iframe, skip processing and use raw content
      if (video?.embed_url && video.embed_url.includes('<iframe')) {
        return {
          ...video,
          key: `video-${index}-${video?.title || ''}-${video?.embed_url?.substring(0, 20) || ''}`
        };
      }
      
      const sanitizedVideo = sanitizeVideoData(video);
      const videoData = sanitizedVideo?.embed_url ? extractVideoUrl(sanitizedVideo.embed_url) : null;
      return {
        ...sanitizedVideo,
        videoData,
        key: `video-${index}-${sanitizedVideo?.title || ''}-${sanitizedVideo?.embed_url || ''}`
      };
    });
  }, [configSections.videos?.video_list]);
  const colors = configSections.colors || template?.defaultColors || { 
    primary: '#D8A7B1',
    secondary: '#EAC9C1',
    accent: '#F9F1F0',
    background: '#FFFFFF',
    text: '#5D4954',
    cardBg: '#FFFFFF',
    borderColor: '#F0E4E6',
    buttonText: '#FFFFFF',
    highlightColor: '#D8A7B1'
  };
  const font = configSections.font || template?.defaultFont || 'Cormorant Garamond, serif';
  
  // Get all sections for this business type
  const allSections = getBusinessTemplate('wedding-planner')?.sections || [];



  const renderSection = (sectionKey: string) => {
    const sectionData = configSections[sectionKey] || {};
    if (!sectionData || Object.keys(sectionData).length === 0 || sectionData.enabled === false) return null;
    
    switch (sectionKey) {
      case 'header':
        return renderHeaderSection(sectionData);
      case 'about':
        return renderAboutSection(sectionData);
      case 'services':
        return renderServicesSection(sectionData);
      case 'videos':
        return renderVideosSection(sectionData);
      case 'youtube':
        return renderYouTubeSection(sectionData);
      case 'portfolio':
        return renderPortfolioSection(sectionData);
      case 'contact':
        return renderContactSection(sectionData);
      case 'social':
        return renderSocialSection(sectionData);
      case 'business_hours':
        return renderBusinessHoursSection(sectionData);
      case 'gallery':
        return renderGallerySection(sectionData);
      case 'testimonials':
        return renderTestimonialsSection(sectionData);
      case 'appointments':
        return renderAppointmentsSection(sectionData);
      case 'venues':
        return renderVenuesSection(sectionData);
      case 'faq':
        return renderFaqSection(sectionData);
      case 'pricing':
        return null;
      case 'google_map':
        return renderLocationSection(sectionData);
      case 'app_download':
        return renderAppDownloadSection(sectionData);
      case 'contact_form':
        return renderContactFormSection(sectionData);
      case 'custom_html':
        return renderCustomHtmlSection(sectionData);
      case 'qr_share':
        return renderQrShareSection(sectionData);
      case 'thank_you':
        return renderThankYouSection(sectionData);
      case 'copyright':
        return renderCopyrightSection(sectionData);
      default:
        return null;
    }
  };

  const renderHeaderSection = (headerData: any) => (
    <div className="relative">
      {/* Elegant Header with Floral Pattern */}
      <div className="relative h-64 overflow-hidden">
        {headerData.cover_image ? (
          <img 
            src={headerData.cover_image} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div 
            className="w-full h-full relative" 
            style={{ 
              background: `linear-gradient(135deg, ${colors.primary}40 0%, ${colors.secondary}80 100%)`,
            }}
          >
            {/* Wedding pattern overlay */}
            <div className="absolute inset-0 opacity-20" 
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${colors.primary.replace('#', '')}' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>
        )}
        
        {/* Language Selector */}
        {configSections.language && (
          <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-20`}>
            <div className="relative">
              <button
                onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                className="flex items-center space-x-1 transition-colors"
                style={{ 
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: colors.background
                }}
              >
                <span className="text-lg">{String.fromCodePoint(...(languageData.find(lang => lang.code === currentLanguage)?.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt()) || []))}</span>
                <span className="text-lg font-bold">{currentLanguage.toUpperCase()}</span>
              </button>
              
              {showLanguageSelector && (
                <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 min-w-[140px] max-h-48 overflow-y-auto z-50">
                  {languageData.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-3 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2 ${
                        currentLanguage === lang.code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span className="text-sm">{String.fromCodePoint(...lang.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt()))}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Overlay */}
        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
        ></div>
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
          {/* Logo */}
          {headerData.logo && (
            <div className="mb-4">
              <div 
                className="w-20 h-20 rounded-full overflow-hidden border-4 shadow-lg mx-auto" 
                style={{ 
                  borderColor: colors.background,
                  backgroundColor: colors.background
                }}
              >
                <img 
                  src={headerData.logo} 
                  alt={headerData.name} 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}
          
          {/* Business Name */}
          <h1 
            className="text-3xl font-bold mb-2" 
            style={{ 
              color: colors.background,
              fontFamily: font,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            {headerData.name || data.name || t('Eternal Moments')}
          </h1>
          
          {headerData.tagline && (
            <p 
              className="text-lg italic" 
              style={{ 
                color: colors.background,
                fontFamily: font,
                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              {headerData.tagline}
            </p>
          )}
        </div>
      </div>
      
      {/* Decorative Divider */}
      <div 
        className="h-3 w-full" 
        style={{ 
          background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary}, ${colors.primary})` 
        }}
      ></div>
      
      {/* QR Share Modal */}
      <QRShareModal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
        url={typeof window !== 'undefined' ? window.location.href : ''}
        colors={colors}
        font={font}
        socialLinks={configSections.social?.social_links || []}
      />
    </div>
  );

  const renderAboutSection = (aboutData: any) => {
    if (!aboutData.description && !data.description) return null;
    return (
      <div 
        className="px-5 py-8" 
        style={{ 
          backgroundColor: colors.background
        }}
        id="about"
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t('About Us')}
          </h2>
          <div 
            className="w-16 h-0.5 mx-auto" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <p 
          className="text-base leading-relaxed mb-6 text-center" 
          style={{ color: colors.text }}
        >
          {aboutData.description || data.description}
        </p>
        
        <div className="flex justify-center space-x-6">
          {aboutData.years_experience && (
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2"
                style={{ 
                  backgroundColor: colors.accent,
                  color: colors.primary
                }}
              >
                <span className="text-xl font-bold">{aboutData.years_experience}</span>
              </div>
              <p 
                className="text-sm" 
                style={{ color: colors.text }}
              >
                {t('Years Experience')}
              </p>
            </div>
          )}
          
          {aboutData.weddings_planned && (
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2"
                style={{ 
                  backgroundColor: colors.accent,
                  color: colors.primary
                }}
              >
                <span className="text-xl font-bold">{aboutData.weddings_planned}</span>
              </div>
              <p 
                className="text-sm" 
                style={{ color: colors.text }}
              >
                {t('Weddings Planned')}
              </p>
            </div>
          )}
        </div>
        
        {aboutData.approach && (
          <div className="mt-6 text-center">
            <div 
              className="inline-flex items-center px-4 py-2 rounded-full"
              style={{ 
                backgroundColor: colors.primary,
                color: colors.buttonText
              }}
            >
              <Heart size={16} className="mr-2" />
              <span className="text-sm font-medium capitalize">
                {aboutData.approach.replace('_', ' & ')}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderServicesSection = (servicesData: any) => {
    const packages = servicesData.packages || [];
    if (!Array.isArray(packages) || packages.length === 0) return null;
    
    return (
      <div 
        className="px-5 py-8" 
        style={{ 
          backgroundColor: colors.accent
        }}
        id="services"
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t('Our Services')}
          </h2>
          <div 
            className="w-16 h-0.5 mx-auto" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div className="space-y-6">
          {packages.map((pkg: any, index: number) => (
            <div 
              key={index} 
              className="rounded-lg shadow-md overflow-hidden" 
              style={{ 
                backgroundColor: colors.background,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              {/* Package Image */}
              {pkg.image && (
                <div className="w-full h-40">
                  <img 
                    src={pkg.image} 
                    alt={pkg.name || 'Service Package'} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-5">
                <h3 
                  className="text-xl font-bold mb-2 text-center" 
                  style={{ 
                    color: colors.primary,
                    fontFamily: font
                  }}
                >
                  {pkg.name}
                </h3>
                
                {pkg.price_range && (
                  <p 
                    className="text-center mb-3" 
                    style={{ color: colors.secondary }}
                  >
                    {pkg.price_range}
                  </p>
                )}
                
                {pkg.description && (
                  <p 
                    className="text-sm mb-4 text-center" 
                    style={{ color: colors.text }}
                  >
                    {pkg.description}
                  </p>
                )}
                
                {pkg.features && (
                  <div className="space-y-2">
                    {pkg.features.split('\n').map((feature: string, i: number) => (
                      <div key={i} className="flex items-start">
                        <CheckCircle2 
                          size={16} 
                          className="mr-2 flex-shrink-0 mt-0.5" 
                          style={{ color: colors.primary }}
                        />
                        <span 
                          className="text-sm" 
                          style={{ color: colors.text }}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button
            className="px-6 py-2"
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText,
              fontFamily: font
            }}
            onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            {t('Inquire About Services')}
          </Button>
        </div>
      </div>
    );
  };

  const renderPortfolioSection = (portfolioData: any) => {
    const weddings = portfolioData.weddings || [];
    if (!Array.isArray(weddings) || weddings.length === 0) return null;
    
    const getWeddingStyleIcon = (style: string) => {
      switch(style) {
        case 'rustic': return <Home size={16} />;
        case 'beach': return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 16l-6 6h18l-6-6"></path>
            <path d="M2 12h20"></path>
            <path d="M12 2v10"></path>
          </svg>
        );
        case 'garden': return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22c6.5-6.5 6.5-14.5 0-14.5S5.5 15.5 12 22z"></path>
            <path d="M12 7.5V2"></path>
          </svg>
        );
        case 'modern': return <Building size={16} />;
        case 'traditional': return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        );
        case 'bohemian': return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            <path d="M2 12h20"></path>
          </svg>
        );
        case 'vintage': return <Gift size={16} />;
        case 'luxury': return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        );
        default: return <Heart size={16} />;
      }
    };
    
    return (
      <div 
        className="px-5 py-8" 
        style={{ 
          backgroundColor: colors.background
        }}
        id="portfolio"
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t('Wedding Portfolio')}
          </h2>
          <div 
            className="w-16 h-0.5 mx-auto" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        {/* Featured wedding display */}
        <div 
          className="rounded-lg overflow-hidden mb-6 shadow-md" 
          style={{ border: `1px solid ${colors.borderColor}` }}
        >
          {weddings[activePortfolio]?.cover_image ? (
            <div className="relative w-full h-48">
              <img 
                src={weddings[activePortfolio].cover_image} 
                alt={weddings[activePortfolio].title} 
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0" 
                style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
              ></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <h3 
                  className="text-xl font-bold" 
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: font,
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                  }}
                >
                  {weddings[activePortfolio].title}
                </h3>
              </div>
            </div>
          ) : (
            <div 
              className="w-full h-48 flex items-center justify-center"
              style={{ backgroundColor: colors.accent }}
            >
              <Heart size={32} style={{ color: colors.primary }} />
            </div>
          )}
          
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                {weddings[activePortfolio]?.style && (
                  <div 
                    className="flex items-center mr-3 text-xs"
                    style={{ color: colors.primary }}
                  >
                    {getWeddingStyleIcon(weddings[activePortfolio].style)}
                    <span className="ml-1 capitalize">{weddings[activePortfolio].style}</span>
                  </div>
                )}
                
                {weddings[activePortfolio]?.location && (
                  <div 
                    className="flex items-center text-xs"
                    style={{ color: colors.text + 'CC' }}
                  >
                    <MapPin size={12} className="mr-1" />
                    {weddings[activePortfolio].location}
                  </div>
                )}
              </div>
              
              {weddings[activePortfolio]?.date && (
                <div 
                  className="text-xs"
                  style={{ color: colors.text + 'CC' }}
                >
                  {weddings[activePortfolio].date}
                </div>
              )}
            </div>
            
            {weddings[activePortfolio]?.description && (
              <p 
                className="text-sm" 
                style={{ color: colors.text }}
              >
                {weddings[activePortfolio].description}
              </p>
            )}
          </div>
        </div>
        
        {/* Wedding thumbnails */}
        <div className="grid grid-cols-3 gap-2">
          {weddings.map((wedding: any, index: number) => (
            <div 
              key={index} 
              className={`rounded-lg overflow-hidden cursor-pointer ${activePortfolio === index ? 'ring-2' : ''}`}
              style={{ 
                ringColor: colors.primary
              }}
              onClick={() => setActivePortfolio(index)}
            >
              {wedding.cover_image ? (
                <img 
                  src={wedding.cover_image} 
                  alt={wedding.title} 
                  className="w-full aspect-square object-cover"
                />
              ) : (
                <div 
                  className="w-full aspect-square flex items-center justify-center"
                  style={{ backgroundColor: colors.accent }}
                >
                  <Heart size={20} style={{ color: colors.primary }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContactSection = (contactData: any) => (
    <div 
      className="px-5 py-8" 
      style={{ 
        backgroundColor: colors.accent
      }}
      id="contact"
    >
      <div className="text-center mb-6">
        <h2 
          className="text-2xl font-bold mb-2" 
          style={{ 
            color: colors.primary,
            fontFamily: font
          }}
        >
          {t("Contact Us")}
        </h2>
        <div 
          className="w-16 h-0.5 mx-auto" 
          style={{ backgroundColor: colors.primary }}
        ></div>
      </div>
      
      <div className="space-y-4">
        {contactData.address && (
          <div 
            className="p-4 rounded-lg" 
            style={{ 
              backgroundColor: colors.background,
              border: `1px solid ${colors.borderColor}`
            }}
          >
            <div className="flex">
              <MapPin 
                size={20} 
                className="mr-3 flex-shrink-0 mt-1" 
                style={{ color: colors.primary }}
              />
              <div>
                <p 
                  className="text-sm font-medium mb-1" 
                  style={{ color: colors.primary }}
                >
                  {t('STUDIO ADDRESS')}
                </p>
                <p 
                  className="text-base" 
                  style={{ color: colors.text }}
                >
                  {contactData.address}
                </p>
                
                {configSections.google_map?.directions_url && (
                  <a 
                    href={configSections.google_map?.directions_url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm flex items-center mt-2"
                    style={{ color: colors.primary }}
                  >
                    {t('Get Directions')}
                    <ChevronRight size={16} className="ml-1" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          {(contactData.phone || data.phone) && (
            <div 
              className="p-4 rounded-lg" 
              style={{ 
                backgroundColor: colors.background,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div className="flex items-center">
                <Phone 
                  size={20} 
                  className="mr-3 flex-shrink-0" 
                  style={{ color: colors.primary }}
                />
                <div>
                  <p 
                    className="text-xs font-medium" 
                    style={{ color: colors.primary }}
                  >
                    {t('PHONE')}
                  </p>
                  <a 
                    href={`tel:${contactData.phone || data.phone}`} 
                    className="text-sm" 
                    style={{ color: colors.text }}
                  >
                    {contactData.phone || data.phone}
                  </a>
                </div>
              </div>
            </div>
          )}
          
          {(contactData.email || data.email) && (
            <div 
              className="p-4 rounded-lg" 
              style={{ 
                backgroundColor: colors.background,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div className="flex items-center">
                <Mail 
                  size={20} 
                  className="mr-3 flex-shrink-0" 
                  style={{ color: colors.primary }}
                />
                <div>
                  <p 
                    className="text-xs font-medium" 
                    style={{ color: colors.primary }}
                  >
                    {t('EMAIL')}
                  </p>
                  <a 
                    href={`mailto:${contactData.email || data.email}`} 
                    className="text-sm break-all" 
                    style={{ color: colors.text }}
                  >
                    {contactData.email || data.email}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* QR Share Modal */}
      <QRShareModal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
        url={typeof window !== 'undefined' ? window.location.href : ''}
        colors={colors}
        font={font}
        socialLinks={configSections.social?.social_links || []}
      />
    </div>
  );

  const renderSocialSection = (socialData: any) => {
    const socialLinks = socialData.social_links || [];
    if (!Array.isArray(socialLinks) || socialLinks.length === 0) return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background
        }}
        id="social"
      >
        <div className="grid grid-cols-4 gap-4 max-w-xs mx-auto">
          {socialLinks.map((link: any, index: number) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
                style={{ 
                  backgroundColor: colors.primary,
                  color: colors.buttonText
                }}
              >
                <SocialIcon platform={link.platform} color={colors.buttonText} />
              </div>
              <span 
                className="text-xs" 
                style={{ color: colors.text }}
              >
                {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
              </span>
            </a>
          ))}
        </div>
      </div>
    );
  };

  const renderBusinessHoursSection = (hoursData: any) => {
    const hours = hoursData.hours || [];
    if (!Array.isArray(hours) || hours.length === 0) return null;
    
    // Get current day
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDay = days[new Date().getDay()];
    
    return (
      <div 
        className="px-5 py-8" 
        style={{ 
          backgroundColor: colors.accent
        }}
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t('Office Hours')}
          </h2>
          <div 
            className="w-16 h-0.5 mx-auto" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div 
          className="p-4 rounded-lg" 
          style={{ 
            backgroundColor: colors.background,
            border: `1px solid ${colors.borderColor}`
          }}
        >
          <div className="space-y-2">
            {hours.map((hour: any, index: number) => (
              <div 
                key={index} 
                className="flex justify-between items-center py-2"
                style={{ 
                  borderBottom: index < hours.length - 1 ? `1px solid ${colors.borderColor}` : 'none'
                }}
              >
                <span 
                  className="capitalize text-sm font-medium" 
                  style={{ 
                    color: hour.day === currentDay ? colors.primary : colors.text,
                    fontWeight: hour.day === currentDay ? 'bold' : 'normal'
                  }}
                >
                  {hour.day}
                </span>
                <div className="flex items-center">
                  {hour.by_appointment && (
                    <Badge 
                      className="mr-2 text-xs" 
                      style={{ 
                        backgroundColor: colors.accent,
                        color: colors.primary
                      }}
                    >
                      {t('By Appointment')}
                    </Badge>
                  )}
                  <span 
                    className="text-sm" 
                    style={{ 
                      color: hour.is_closed ? colors.text + '80' : colors.text
                    }}
                  >
                    {hour.is_closed ? t('Closed') : `${hour.open_time} - ${hour.close_time}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderGallerySection = (galleryData: any) => {
    const photos = galleryData.photos || [];
    if (!Array.isArray(photos) || photos.length === 0) return null;
    
    return (
      <div 
        className="px-5 py-8" 
        style={{ 
          backgroundColor: colors.background
        }}
        id="gallery"
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t('Gallery')}
          </h2>
          <div 
            className="w-16 h-0.5 mx-auto" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {photos.map((photo: any, index: number) => (
            <div 
              key={index} 
              className="relative rounded-lg overflow-hidden aspect-square shadow-sm"
            >
              {photo.image ? (
                <img 
                  src={photo.image} 
                  alt={photo.caption || `Gallery image ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div 
                  className="w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: colors.accent }}
                >
                  <Heart size={24} style={{ color: colors.primary }} />
                </div>
              )}
              
              {photo.caption && (
                <div 
                  className="absolute bottom-0 left-0 right-0 p-2 text-xs"
                  style={{ 
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    color: '#FFFFFF'
                  }}
                >
                  {photo.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTestimonialsSection = (testimonialsData: any) => {
    const reviews = testimonialsData.reviews || [];
    
    
    if (!Array.isArray(reviews) || reviews.length === 0) return null;
    
    
    return (
      <div 
        className="px-5 py-8" 
        style={{ 
          backgroundColor: colors.accent
        }}
        id="testimonials"
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t('Happy Couples')}
          </h2>
          <div 
            className="w-16 h-0.5 mx-auto" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentReview * 100}%)` }}
            >
              {reviews.map((review: any, index: number) => (
                <div key={index} className="w-full flex-shrink-0 px-1">
                  <div 
                    className="p-5 rounded-lg shadow-md" 
                    style={{ 
                      backgroundColor: colors.background,
                      border: `1px solid ${colors.borderColor}`
                    }}
                  >
                    <div className="flex items-center space-x-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          fill={i < parseInt(review.rating || 5) ? colors.highlightColor : 'transparent'} 
                          stroke={i < parseInt(review.rating || 5) ? colors.highlightColor : colors.borderColor}
                        />
                      ))}
                    </div>
                    
                    <p 
                      className="text-base italic mb-4" 
                      style={{ color: colors.text }}
                    >
                      "{review.review}"
                    </p>
                    
                    <div className="flex items-center">
                      {review.couple_image ? (
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                          <img 
                            src={review.couple_image} 
                            alt={review.couple_name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div 
                          className="w-12 h-12 rounded-full mr-3 flex items-center justify-center"
                          style={{ backgroundColor: colors.primary + '20' }}
                        >
                          <Heart size={20} style={{ color: colors.primary }} />
                        </div>
                      )}
                      
                      <div>
                        <p 
                          className="text-sm font-bold" 
                          style={{ color: colors.primary }}
                        >
                          {review.couple_name}
                        </p>
                        
                        {review.wedding_date && (
                          <p 
                            className="text-xs" 
                            style={{ color: colors.text + '99' }}
                          >
                            {review.wedding_date}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {reviews.length > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {reviews.map((_, index) => (
                <Heart
                  key={index}
                  size={12}
                  fill={currentReview === index ? colors.primary : 'transparent'}
                  stroke={colors.primary}
                  className="transition-all duration-300"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAppointmentsSection = (appointmentsData: any) => {
    if (!appointmentsData.booking_url && !appointmentsData.consultation_info) return null;
    
    return (
      <div 
        className="px-5 py-8" 
        style={{ 
          backgroundColor: colors.background
        }}
        id="consultation"
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t('Schedule a Consultation')}
          </h2>
          <div 
            className="w-16 h-0.5 mx-auto" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div 
          className="p-5 rounded-lg shadow-md" 
          style={{ 
            backgroundColor: colors.accent,
            border: `1px solid ${colors.borderColor}`
          }}
        >
          {appointmentsData.consultation_info && (
            <p 
              className="text-sm mb-4 text-center" 
              style={{ color: colors.text }}
            >
              {appointmentsData.consultation_info}
            </p>
          )}
          
          <div className="flex justify-center space-x-4 mb-4">
            {appointmentsData.consultation_length && (
              <div className="text-center">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-1"
                  style={{ 
                    backgroundColor: colors.background,
                    color: colors.primary
                  }}
                >
                  <Clock size={18} />
                </div>
                <p 
                  className="text-xs" 
                  style={{ color: colors.text }}
                >
                  {appointmentsData.consultation_length}
                </p>
              </div>
            )}
            
            {appointmentsData.virtual_option && (
              <div className="text-center">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-1"
                  style={{ 
                    backgroundColor: colors.background,
                    color: colors.primary
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 10l5 5-5 5"></path>
                    <path d="M4 4v7a4 4 0 0 0 4 4h12"></path>
                  </svg>
                </div>
                <p 
                  className="text-xs" 
                  style={{ color: colors.text }}
                >
                  {t('Virtual Option')}
                </p>
              </div>
            )}
          </div>
          
          <Button
            className="w-full"
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText,
              fontFamily: font
            }}
            onClick={() => handleAppointmentBooking(configSections.appointments)}
          >
            <Calendar className="w-4 h-4 mr-2" />
            {appointmentsData.booking_text || t('Book a Consultation')}
          </Button>
        </div>
      </div>
    );
  };

  const renderVenuesSection = (venuesData: any) => {
    const venues = venuesData.venue_list || [];
    if (!Array.isArray(venues) || venues.length === 0) return null;
    
    return (
      <div 
        className="px-5 py-8" 
        style={{ 
          backgroundColor: colors.accent
        }}
        id="venues"
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t('Preferred Venues')}
          </h2>
          <div 
            className="w-16 h-0.5 mx-auto" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div className="space-y-5">
          {venues.map((venue: any, index: number) => (
            <div 
              key={index} 
              className="rounded-lg overflow-hidden shadow-md" 
              style={{ 
                backgroundColor: colors.background,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              {venue.image ? (
                <img 
                  src={venue.image} 
                  alt={venue.name} 
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div 
                  className="w-full h-40 flex items-center justify-center"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <Building size={32} style={{ color: colors.primary }} />
                </div>
              )}
              
              <div className="p-4">
                <h3 
                  className="text-lg font-bold mb-1" 
                  style={{ 
                    color: colors.primary,
                    fontFamily: font
                  }}
                >
                  {venue.name}
                </h3>
                
                <div className="flex items-center mb-2">
                  {venue.location && (
                    <div 
                      className="flex items-center text-xs mr-3"
                      style={{ color: colors.text + 'CC' }}
                    >
                      <MapPin size={12} className="mr-1" />
                      {venue.location}
                    </div>
                  )}
                  
                  {venue.capacity && (
                    <div 
                      className="flex items-center text-xs"
                      style={{ color: colors.text + 'CC' }}
                    >
                      <Users size={12} className="mr-1" />
                      {venue.capacity}
                    </div>
                  )}
                </div>
                
                {venue.description && (
                  <p 
                    className="text-sm mb-3" 
                    style={{ color: colors.text }}
                  >
                    {venue.description}
                  </p>
                )}
                
                {venue.website && (
                  <a 
                    href={venue.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs flex items-center"
                    style={{ color: colors.primary }}
                  >
                    {t('Visit Website')}
                    <ExternalLink size={12} className="ml-1" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderFaqSection = (faqData: any) => {
    const questions = faqData.questions || [];
    if (!Array.isArray(questions) || questions.length === 0) return null;
    
    return (
      <div 
        className="px-5 py-8" 
        style={{ 
          backgroundColor: colors.background
        }}
        id="faq"
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t('Frequently Asked Questions')}
          </h2>
          <div 
            className="w-16 h-0.5 mx-auto" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div className="space-y-3">
          {questions.map((faq: any, index: number) => (
            <div 
              key={index} 
              className="rounded-lg overflow-hidden shadow-sm" 
              style={{ 
                backgroundColor: colors.accent,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div 
                className="p-4 flex justify-between items-center cursor-pointer"
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              >
                <div className="flex items-start">
                  <HelpCircle 
                    size={18} 
                    className="mr-3 flex-shrink-0 mt-0.5" 
                    style={{ color: colors.primary }}
                  />
                  <h3 
                    className="text-base font-medium" 
                    style={{ 
                      color: colors.text,
                      fontFamily: font
                    }}
                  >
                    {faq.question}
                  </h3>
                </div>
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ 
                    backgroundColor: colors.primary,
                    color: colors.buttonText
                  }}
                >
                  {activeFaq === index ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12h14"></path>
                    </svg>
                  )}
                </div>
              </div>
              
              {activeFaq === index && faq.answer && (
                <div 
                  className="p-4 pt-0 pl-9"
                >
                  <p 
                    className="text-sm" 
                    style={{ color: colors.text }}
                  >
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderLocationSection = (locationData: any) => {
    if (!locationData.map_embed_url && !locationData.directions_url) return null;
    
    return (
      <div 
        className="px-5 py-8" 
        style={{ 
          backgroundColor: colors.accent
        }}
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t('Our Location')}
          </h2>
          <div 
            className="w-16 h-0.5 mx-auto" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div className="space-y-4">
          {locationData.map_embed_url && (
            <div 
              className="w-full h-48 rounded-lg overflow-hidden shadow-md" 
              style={{ border: `1px solid ${colors.borderColor}` }}
            >
              <div dangerouslySetInnerHTML={{ __html: locationData.map_embed_url }} className="w-full h-full" />
            </div>
          )}
          
          {locationData.directions_url && (
            <Button 
              className="w-full"
              style={{ 
                backgroundColor: colors.primary,
                color: colors.buttonText,
                fontFamily: font
              }}
              onClick={() => typeof window !== "undefined" && window.open(locationData.directions_url, '_blank', 'noopener,noreferrer')}
            >
              <MapPin className="w-4 h-4 mr-2" />
              {t("Get Directions")}
            </Button>
          )}
        </div>
      </div>
    );
  };

  const renderAppDownloadSection = (appData: any) => {
    if (!appData.app_store_url && !appData.play_store_url) return null;
    
    return (
      <div 
        className="px-5 py-8" 
        style={{ 
          backgroundColor: colors.background
        }}
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t('Wedding Planning App')}
          </h2>
          <div 
            className="w-16 h-0.5 mx-auto" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div 
          className="p-5 rounded-lg shadow-md" 
          style={{ backgroundColor: colors.accent }}
        >
          {appData.app_description && (
            <p 
              className="text-sm mb-4 text-center" 
              style={{ color: colors.text }}
            >
              {appData.app_description}
            </p>
          )}
          
          <div className="grid grid-cols-2 gap-3">
            {appData.app_store_url && (
              <Button 
                variant="outline" 
                style={{ 
                  borderColor: colors.primary,
                  color: colors.primary,
                  fontFamily: font,
                  backgroundColor: colors.background
                }}
                onClick={() => typeof window !== "undefined" && window.open(appData.app_store_url, '_blank', 'noopener,noreferrer')}
              >
                {t("App Store")}
              </Button>
            )}
            
            {appData.play_store_url && (
              <Button 
                variant="outline" 
                style={{ 
                  borderColor: colors.primary,
                  color: colors.primary,
                  fontFamily: font,
                  backgroundColor: colors.background
                }}
                onClick={() => typeof window !== "undefined" && window.open(appData.play_store_url, '_blank', 'noopener,noreferrer')}
              >
                {t("Play Store")}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderContactFormSection = (formData: any) => {
    if (!formData.form_title) return null;
    
    return (
      <div 
        className="px-5 py-8" 
        style={{ 
          backgroundColor: colors.accent
        }}
        id="contact_form"
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {formData.form_title}
          </h2>
          <div 
            className="w-16 h-0.5 mx-auto" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        {formData.form_description && (
          <p 
            className="text-sm text-center mb-4" 
            style={{ color: colors.text }}
          >
            {formData.form_description}
          </p>
        )}
        
        <Button 
          className="w-full"
          style={{ 
            backgroundColor: colors.primary,
            color: colors.buttonText,
            fontFamily: font
          }}
          onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
        >
          <Mail className="w-4 h-4 mr-2" />
          {t('Contact Us')}
        </Button>
      </div>
    );
  };

  
  const renderVideosSection = (videosData: any) => {
    const videos = videosData.video_list || [];
    if (!Array.isArray(videos) || videos.length === 0) return null;
    
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor}` }}>
        <h3 className="font-bold text-sm mb-3 flex items-center" style={{ color: colors.primary, fontFamily: font }}>
          <Video className="w-4 h-4 mr-2" />
          {t('Wedding Videos')}
        </h3>
        <div className="space-y-3">
          {videoContent.map((video: any) => (
            <div key={video.key} className="rounded-lg overflow-hidden" style={{ 
              backgroundColor: colors.cardBg,
              border: `1px solid ${colors.borderColor}`
            }}>
              <div className="relative">
                {video.embed_url && video.embed_url.includes('<iframe') ? (
                  <div className="w-full relative overflow-hidden" style={{ paddingBottom: '56.25%', height: 0 }}>
                    <div 
                      className="absolute inset-0 w-full h-full"
                      ref={(el) => {
                        if (el && !el.hasChildNodes()) {
                          el.innerHTML = video.embed_url.replace(
                            /<iframe([^>]*)>/i, 
                            '<iframe$1 style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;">'
                          );
                        }
                      }}
                    />
                  </div>
                ) : video.videoData ? (
                  <VideoEmbed
                    url={video.videoData.url}
                    title={video.title || 'Video'}
                    platform={video.videoData.platform}
                    colors={colors}
                  />
                ) : video.thumbnail ? (
                  <div className="relative w-full h-32">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title || 'wedding videos'} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white bg-opacity-90 flex items-center justify-center">
                        <Play className="w-6 h-6 ml-1" style={{ color: colors.primary }} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-32 flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
                    <div className="text-center">
                      <Video className="w-8 h-8 mx-auto mb-2" style={{ color: colors.primary }} />
                      <span className="text-xs font-medium" style={{ color: colors.primary, fontFamily: font }}>{t('Wedding Videos')}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-3">
                <h4 className="font-bold text-sm mb-1" style={{ color: colors.text, fontFamily: font }}>
                  {video.title}
                </h4>
                {video.description && (
                  <p className="text-xs mb-2" style={{ color: colors.text + 'CC', fontFamily: font }}>
                    {video.description}
                  </p>
                )}
                <div className="flex justify-between items-center">
                  {video.duration && (
                    <span className="text-xs" style={{ color: colors.text + '80', fontFamily: font }}>
                      ⏱️ {video.duration}
                    </span>
                  )}
                  {video.video_type && (
                    <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: colors.accent, color: colors.primary, fontFamily: font }}>
                      💒 {video.video_type}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderYouTubeSection = (youtubeData: any) => {
    if (!youtubeData.channel_url && !youtubeData.channel_name && !youtubeData.latest_video_embed) return null;
    
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor}` }}>
        <h3 className="font-bold text-sm mb-3 flex items-center" style={{ color: colors.primary, fontFamily: font }}>
          <Youtube className="w-4 h-4 mr-2" />
          YouTube Channel
        </h3>
        {youtubeData.latest_video_embed && (
          <div className="mb-4 rounded-lg overflow-hidden" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.borderColor}` }}>
            <div className="p-3 mb-2">
              <h4 className="font-semibold text-sm flex items-center" style={{ color: colors.text, fontFamily: font }}>
                <Play className="w-4 h-4 mr-2" style={{ color: colors.primary }} />
                {t("Latest Video")}
              </h4>
            </div>
            <div className="w-full relative overflow-hidden" style={{ paddingBottom: "56.25%", height: 0 }}>
              <div 
                className="absolute inset-0 w-full h-full"
                ref={createYouTubeEmbedRef(
                  youtubeData.latest_video_embed,
                  { colors, font },
                  "Latest Video"
                )}
              />
            </div>
          </div>
        )}
        
        <div className="p-4 rounded-lg" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.borderColor}` }}>
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 rounded-lg bg-red-600 flex items-center justify-center mr-3">
              <Youtube className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>
                {youtubeData.channel_name || t('Wedding Planning')}
              </h4>
              {youtubeData.subscriber_count && (
                <p className="text-xs" style={{ color: colors.text + 'CC', fontFamily: font }}>
                  📊 {youtubeData.subscriber_count} {t("subscribers")}
                </p>
              )}
            </div>
          </div>
          
          {youtubeData.channel_description && (
            <p className="text-xs mb-3" style={{ color: colors.text, fontFamily: font }}>
              {youtubeData.channel_description}
            </p>
          )}
          
          <div className="space-y-2">
            {youtubeData.channel_url && (
              <Button 
                size="sm" 
                className="w-full" 
                style={{ 
                  backgroundColor: '#FF0000', 
                  color: 'white',
                  fontFamily: font 
                }}
                onClick={() => typeof window !== "undefined" && window.open(youtubeData.channel_url, '_blank', 'noopener,noreferrer')}
              >
                <Youtube className="w-4 h-4 mr-2" />
                {t('SUBSCRIBE')}
              </Button>
            )}
            {youtubeData.featured_playlist && (
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full" 
                style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}
                onClick={() => typeof window !== "undefined" && window.open(youtubeData.featured_playlist, '_blank', 'noopener,noreferrer')}
              >
                💒 {t('WEDDING INSPIRATION')}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderThankYouSection = (thankYouData: any) => {
    if (!thankYouData.message) return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ backgroundColor: colors.background }}
      >
        <p 
          className="text-sm text-center italic" 
          style={{ color: colors.text }}
        >
          {thankYouData.message}
        </p>
      </div>
    );
  };

  const renderCustomHtmlSection = (customHtmlData: any) => {
    if (!customHtmlData.html_content) return null;
    
    return (
      <div 
        className="px-5 py-8" 
        style={{ backgroundColor: colors.background }}
        id="custom_html"
      >
        <div 
          dangerouslySetInnerHTML={{ __html: customHtmlData.html_content }}
          style={{ fontFamily: font }}
        />
      </div>
    );
  };
  
  const renderQrShareSection = (qrData: any) => {
    if (!qrData.enable_qr) return null;
    
    return (
      <div 
        className="px-5 py-8" 
        style={{ backgroundColor: colors.accent }}
        id="qr_share"
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {qrData.section_title || t('Share & Connect')}
          </h2>
          <div 
            className="w-16 h-0.5 mx-auto" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div 
          className="p-6 rounded-lg shadow-md text-center" 
          style={{ backgroundColor: colors.background, border: `1px solid ${colors.borderColor}` }}
        >
          {qrData.qr_description && (
            <p 
              className="text-sm mb-4" 
              style={{ color: colors.text + 'CC' }}
            >
              {qrData.qr_description}
            </p>
          )}
          
          <Button 
            className="w-full" 
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText,
              fontFamily: font
            }}
            onClick={() => setShowQrModal(true)}
          >
            <QrCode className="w-4 h-4 mr-2" />
            {t('Share QR Code')}
          </Button>
        </div>
      </div>
    );
  };

  const renderCopyrightSection = (copyrightData: any) => {
    if (!copyrightData.text) return null;
    
    return (
      <div 
        className="px-5 py-4" 
        style={{ backgroundColor: colors.primary }}
      >
        <p 
          className="text-xs text-center" 
          style={{ color: colors.buttonText + 'CC' }}
        >
          {copyrightData.text}
        </p>
      </div>
    );
  };

  // Get ordered sections using the utility function
  const orderedSectionKeys = getSectionOrder(data.template_config || { sections: configSections, sectionSettings: configSections }, allSections);
    
  
  return (
    <div 
      className="w-full max-w-md mx-auto overflow-hidden" 
      style={{ 
        fontFamily: font,
        background: colors.background,
        color: colors.text,
        direction: isRTL ? 'rtl' : 'ltr'
      }}
    >
      {orderedSectionKeys
        .filter(key => key !== 'colors' && key !== 'font' && key !== 'copyright')
        .map((sectionKey) => (
          <React.Fragment key={sectionKey}>
            {renderSection(sectionKey)}
          </React.Fragment>
        ))}
        
      {/* Save Contact Button */}
      <div className="p-5 border-t" style={{ borderColor: colors.borderColor }}>
        <div className="flex gap-2">
          <Button 
            className="flex-1" 
            variant="outline"
            style={{ 
              borderColor: colors.primary, 
              color: colors.primary, 
              fontFamily: font 
            }}
            onClick={() => {
              const contactData = {
                name: data.name || configSections.header?.name || '',
                title: configSections.header?.tagline || '',
                email: data.email || configSections.contact?.email || '',
                phone: data.phone || configSections.contact?.phone || '',
                website: data.website || configSections.contact?.website || '',
                address: configSections.contact?.address || ''
              };
              import('@/utils/vcfGenerator').then(module => {
                  module.downloadVCF(contactData);
                });
            }}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            {t('Save Contact')}
          </Button>
          
          <Button 
            variant="outline"
            size="sm"
            style={{ 
              borderColor: colors.primary, 
              color: colors.primary, 
              fontFamily: font 
            }}
            onClick={() => {
              if (typeof navigator !== 'undefined' && navigator.share) {
                navigator.share({
                  title: data.name || configSections.header?.name || 'Business Card',
                  text: configSections.header?.tagline || 'Check out this business card',
                  url: window.location.href
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Copyright Section */}
      {renderSection('copyright')}
      
      {/* QR Share Modal */}
      <QRShareModal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
        url={typeof window !== 'undefined' ? window.location.href : ''}
        colors={colors}
        font={font}
        socialLinks={configSections.social?.social_links || []}
      />
    </div>
  );
}