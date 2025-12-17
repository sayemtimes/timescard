import { handleAppointmentBooking } from '../VCardPreview';
import React, { useState } from 'react';
import StableHtmlContent from '@/components/StableHtmlContent';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ensureRequiredSections } from '@/utils/ensureRequiredSections';
import { VideoEmbed, extractVideoUrl } from '@/components/VideoEmbed';
import { createYouTubeEmbedRef } from '@/utils/youtubeEmbedUtils';
import { 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Calendar, 
  Clock, 
  Camera, 
  Image, 
  User, 
  Star, 
  ChevronRight, 
  Download, 
  UserPlus,
  Menu,
  X,
  Heart,
  Video,
  Play,
  Youtube,
  QrCode,
  Share2
} from 'lucide-react';
import SocialIcon from '../../../link-bio-builder/components/SocialIcon';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionOrder, isSectionEnabled, getSectionData } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';
import { useTranslation } from 'react-i18next';
import languageData from '@/../../resources/lang/language.json';

interface PhotographyTemplateProps {
  data: any;
  template: any;
}

// Photography template component
export default function PhotographyTemplate({ data, template }: PhotographyTemplateProps) {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  
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
  
  // Process video content at component level
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
      
      const videoData = video.embed_url ? extractVideoUrl(video.embed_url) : null;
      return {
        ...video,
        videoData,
        key: `video-${index}-${video.title || ''}-${video.embed_url || ''}`
      };
    });
  }, [configSections.videos?.video_list]);
  const colors = configSections.colors || template?.defaultColors || { 
    primary: '#000000', 
    secondary: '#333333', 
    accent: '#FFFFFF', 
    background: '#FFFFFF', 
    text: '#000000',
    cardBg: '#F9F9F9',
    borderColor: '#EEEEEE',
    buttonText: '#FFFFFF',
    overlayColor: 'rgba(0,0,0,0.7)'
  };
  const font = configSections.font || template?.defaultFont || 'Playfair Display, serif';
  
  // Get all sections for this business type
  const allSections = getBusinessTemplate('photography')?.sections || [];

  const renderSection = (sectionKey: string) => {
    const sectionData = configSections[sectionKey] || {};
    if (!sectionData || Object.keys(sectionData).length === 0 || sectionData.enabled === false) return null;
    
    switch (sectionKey) {
      case 'header':
        return renderHeaderSection(sectionData);
      case 'about':
        return renderAboutSection(sectionData);
      case 'portfolio':
        return renderPortfolioSection(sectionData);
      case 'services':
        return renderServicesSection(sectionData);
      case 'videos':
        return renderVideosSection(sectionData);
      case 'youtube':
        return renderYouTubeSection(sectionData);
      case 'contact':
        return renderContactSection(sectionData);
      case 'social':
        return renderSocialSection(sectionData);
      case 'business_hours':
        return renderBusinessHoursSection(sectionData);
      case 'testimonials':
        return renderTestimonialsSection(sectionData);
      case 'appointments':
        return renderAppointmentsSection(sectionData);
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
    <div className="relative w-full h-[500px] overflow-hidden rounded-t-2xl">
      {/* Full-screen background image */}
      <div className="absolute inset-0 w-full h-full">
        {headerData.background_image ? (
          <img 
            src={headerData.background_image} 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div 
            className="w-full h-full" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        )}
        {/* Dark overlay */}
        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: colors.overlayColor }}
        ></div>
      </div>
      
      {/* Mobile menu button and language selector */}
      <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-20 flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3`}>
        {/* Language Selector */}
        {configSections.language && (
          <div className="relative">
            <button
              onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            >
              <span className="text-sm text-white">
                {String.fromCodePoint(...(languageData.find(lang => lang.code === currentLanguage)?.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt()) || [127468, 127463]))}
              </span>
            </button>
            
            {showLanguageSelector && (
              <>
                <div 
                  className="fixed inset-0" 
                  style={{ zIndex: 99998 }}
                  onClick={() => setShowLanguageSelector(false)}
                />
                <div 
                  className="absolute right-0 top-full mt-1 rounded border shadow-lg py-1 w-32 max-h-48 overflow-y-auto"
                  style={{
                    backgroundColor: colors.background,
                    borderColor: colors.borderColor,
                    zIndex: 99999
                  }}
                >
                  {languageData.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className="w-full text-left px-2 py-1 text-xs flex items-center space-x-1 hover:bg-gray-50"
                      style={{
                        backgroundColor: currentLanguage === lang.code ? colors.primary + '10' : 'transparent',
                        color: colors.text
                      }}
                    >
                      <span>
                        {String.fromCodePoint(...lang.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt()))}
                      </span>
                      <span className="truncate">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
        
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-full"
          style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
        >
          {menuOpen ? (
            <X size={24} color="#FFFFFF" />
          ) : (
            <Menu size={24} color="#FFFFFF" />
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      {menuOpen && (
        <div 
          className="absolute inset-0 z-10 flex flex-col justify-center items-center"
          style={{ backgroundColor: colors.overlayColor }}
        >
          <div className="space-y-6 text-center">
            <a 
              href="#about" 
              className="block text-xl font-light" 
              style={{ color: '#FFFFFF' }}
              onClick={() => setMenuOpen(false)}
            >
              {t("About")}
            </a>
            <a 
              href="#portfolio" 
              className="block text-xl font-light" 
              style={{ color: '#FFFFFF' }}
              onClick={() => setMenuOpen(false)}
            >
              {t("Portfolio")}
            </a>
            <a 
              href="#services" 
              className="block text-xl font-light" 
              style={{ color: '#FFFFFF' }}
              onClick={() => setMenuOpen(false)}
            >
              {t("Services")}
            </a>
            <a 
              href="#contact" 
              className="block text-xl font-light" 
              style={{ color: '#FFFFFF' }}
              onClick={() => setMenuOpen(false)}
            >
              {t("Contact")}
            </a>
            <Button
              className="mt-6"
              style={{ 
                backgroundColor: 'transparent',
                border: '1px solid white',
                color: '#FFFFFF'
              }}
              onClick={() => {
                handleAppointmentBooking(configSections.appointments);
                setMenuOpen(false);
              }}
            >
              {t("Book a Session")}
            </Button>
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
        {headerData.profile_image && (
          <div 
            className="w-24 h-24 rounded-full overflow-hidden mb-6 border-2"
            style={{ borderColor: colors.accent }}
          >
            <img 
              src={headerData.profile_image} 
              alt={headerData.name} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <h1 
          className="text-4xl font-light mb-2" 
          style={{ 
            color: '#FFFFFF',
            fontFamily: font
          }}
        >
          {headerData.name || data.name || 'Alex Morgan'}
        </h1>
        
        <div 
          className="w-16 h-0.5 mb-4" 
          style={{ backgroundColor: colors.accent }}
        ></div>
        
        <h2 
          className="text-lg font-light mb-4" 
          style={{ 
            color: '#FFFFFF',
            fontFamily: font
          }}
        >
          {headerData.title || 'Professional Photographer'}
        </h2>
        
        {headerData.tagline && (
          <p 
            className="text-sm max-w-md" 
            style={{ 
              color: 'rgba(255,255,255,0.8)',
              fontFamily: font
            }}
          >
            {headerData.tagline}
          </p>
        )}
        
        <div className="mt-8">
          <Button
            style={{ 
              backgroundColor: 'transparent',
              border: '1px solid white',
              color: '#FFFFFF',
              fontFamily: font
            }}
            onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
          >
            {headerData.cta_button_text || 'Get in Touch'}
          </Button>
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

  const renderAboutSection = (aboutData: any) => {
    if (!aboutData.description && !data.description) return null;
    return (
      <div 
        id="about"
        className="py-8 px-5" 
        style={{ backgroundColor: colors.background }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center mb-4">
            <div className="flex-grow h-px" style={{ backgroundColor: colors.primary }}></div>
            <div className="mx-4 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full" style={{ 
                  border: `2px solid ${colors.primary}`,
                  transform: 'rotate(45deg)'
                }}></div>
                <div className="w-8 h-8 rounded-full absolute" style={{ 
                  border: `2px solid ${colors.primary}`,
                  transform: 'rotate(45deg)'
                }}></div>
                <div className="w-4 h-4 rounded-full absolute" style={{ backgroundColor: colors.primary }}></div>
              </div>
              <h2 
                className="text-3xl font-light px-8 py-2 relative z-10 text-center" 
                style={{ 
                  color: colors.text,
                  fontFamily: font
                }}
              >
                <span style={{ backgroundColor: colors.background, padding: '0 15px' }}>{t("About Me")}</span>
              </h2>
            </div>
            <div className="flex-grow h-px" style={{ backgroundColor: colors.primary }}></div>
          </div>
          
          <p 
            className="text-base leading-relaxed mb-4" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {aboutData.description || data.description}
          </p>
          
          {aboutData.experience && (
            <div className="mb-6">
              <span 
                className="text-sm font-medium" 
                style={{ color: colors.text }}
              >
                {aboutData.experience} {t("Years of Experience")}
              </span>
            </div>
          )}
          
          {aboutData.specialties && (
            <div>
              <h3 
                className="text-sm font-medium mb-3" 
                style={{ color: colors.text }}
              >
                {t("SPECIALTIES")}
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {aboutData.specialties.split(',').map((specialty: string, index: number) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-xs py-1 px-3" 
                    style={{ 
                      borderColor: colors.primary,
                      color: colors.text
                    }}
                  >
                    {specialty.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderPortfolioSection = (portfolioData: any) => {
    const gallery = portfolioData.gallery || [];
    if (!Array.isArray(gallery) || gallery.length === 0) return null;
    
    // Get unique categories
    const categories = ['all', ...new Set(gallery.map((item: any) => item.category))];
    
    // Filter gallery by active category
    const filteredGallery = activeCategory === 'all' 
      ? gallery 
      : gallery.filter((item: any) => item.category === activeCategory);
    
    return (
      <div 
        id="portfolio"
        className="py-8 px-5" 
        style={{ backgroundColor: colors.cardBg }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 
              className="text-3xl font-light mb-4 relative inline-block" 
              style={{ 
                color: colors.text,
                fontFamily: font
              }}
            >
              {t("Portfolio")}
              <div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 mt-2" 
                style={{ backgroundColor: colors.primary }}
              ></div>
            </h2>
          </div>
          
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {categories.map((category: string) => (
              <button
                key={category}
                className={`text-xs py-2 px-4 capitalize transition-all duration-300 hover:scale-105 rounded-full`}
                style={{ 
                  backgroundColor: activeCategory === category ? colors.primary : 'transparent',
                  color: activeCategory === category ? '#FFFFFF' : colors.text,
                  border: `1px solid ${activeCategory === category ? colors.primary : colors.borderColor}`,
                  fontFamily: font
                }}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Gallery grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGallery.map((item: any, index: number) => (
              <div 
                key={index} 
                className="relative overflow-hidden group"
                style={{ 
                  border: `1px solid ${colors.borderColor}`
                }}
              >
                <div style={{ aspectRatio: '1/1' }}>
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: `${colors.primary}15` }}
                    >
                      <Camera size={32} style={{ color: colors.primary }} />
                    </div>
                  )}
                  
                  {/* Overlay on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center p-4 text-center"
                    style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                  >
                    {item.description && (
                      <p 
                        className="text-sm font-light leading-relaxed" 
                        style={{ color: '#FFFFFF', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Always visible title and category */}
                <div className="p-3" style={{ backgroundColor: colors.background }}>
                  <h3 
                    className="text-sm font-medium mb-1" 
                    style={{ color: colors.text, fontFamily: font }}
                  >
                    {item.title}
                  </h3>
                  <Badge 
                    className="text-xs capitalize" 
                    style={{ 
                      backgroundColor: `${colors.primary}15`,
                      color: colors.primary,
                      border: `1px solid ${colors.primary}30`
                    }}
                  >
                    {item.category}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderServicesSection = (servicesData: any) => {
    const services = servicesData.service_list || [];
    if (!Array.isArray(services) || services.length === 0) return null;
    
    const getServiceIcon = (iconName: string) => {
      switch(iconName) {
        case 'camera': return <Camera size={20} />;
        case 'video': return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>;
        case 'edit': return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>;
        case 'portrait': return <User size={20} />;
        case 'wedding': return <Heart size={20} />;
        case 'event': return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
        default: return <Camera size={20} />;
      }
    };
    
    return (
      <div 
        id="services"
        className="py-8 px-5" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="flex items-center mb-6">
          <div className="flex-grow h-px" style={{ backgroundColor: colors.primary }}></div>
          <div className="mx-4 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full" style={{ 
                border: `2px solid ${colors.primary}`,
                transform: 'rotate(45deg)'
              }}></div>
              <div className="w-8 h-8 rounded-full absolute" style={{ 
                border: `2px solid ${colors.primary}`,
                transform: 'rotate(45deg)'
              }}></div>
              <div className="w-4 h-4 rounded-full absolute" style={{ backgroundColor: colors.primary }}></div>
            </div>
            <h2 
              className="text-xl font-light px-8 py-2 relative z-10 text-center" 
              style={{ 
                color: colors.text,
                fontFamily: font
              }}
            >
              <span style={{ backgroundColor: colors.background, padding: '0 15px' }}>{t("Services")}</span>
            </h2>
          </div>
          <div className="flex-grow h-px" style={{ backgroundColor: colors.primary }}></div>
        </div>
        
        <div className="space-y-4">
          {services.map((service: any, index: number) => (
            <div 
              key={index} 
              className="p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div className="flex items-start">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 shadow-sm" 
                  style={{ 
                    backgroundColor: `${colors.primary}15`,
                    color: colors.primary
                  }}
                >
                  {getServiceIcon(service.icon)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 
                      className="text-base font-medium" 
                      style={{ 
                        color: colors.text,
                        fontFamily: font
                      }}
                    >
                      {service.title}
                    </h3>
                    
                    {service.price && (
                      <span 
                        className="text-sm font-medium" 
                        style={{ color: colors.primary }}
                      >
                        {service.price}
                      </span>
                    )}
                  </div>
                  
                  {service.description && (
                    <p 
                      className="text-xs mt-1" 
                      style={{ color: colors.text + 'CC' }}
                    >
                      {service.description}
                    </p>
                  )}
                  
                  {service.duration && (
                    <div 
                      className="mt-2 text-xs flex items-center" 
                      style={{ color: colors.text + '99' }}
                    >
                      <Clock size={12} className="mr-1" />
                      {service.duration}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button
            size="sm"
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText,
              fontFamily: font
            }}
            onClick={() => handleAppointmentBooking(configSections.appointments)}
          >
            {t("Book a Session")}
          </Button>
        </div>
      </div>
    );
  };

  const renderVideosSection = (videosData: any) => {
    const videos = videosData.video_list || [];
    if (!Array.isArray(videos) || videos.length === 0) return null;
    
    
    
    return (
      <div 
        className="py-8 px-5" 
        style={{ backgroundColor: colors.cardBg }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 
              className="text-3xl font-light mb-4 relative inline-block" 
              style={{ 
                color: colors.text,
                fontFamily: font
              }}
            >
              {t("Behind the Lens")}
              <div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 mt-2" 
                style={{ backgroundColor: colors.primary }}
              ></div>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {videoContent.map((video: any) => (
              <div 
                key={video.key} 
                className="group overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
                style={{ 
                  border: `1px solid ${colors.borderColor}`
                }}
              >
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
                    <div className="relative w-full h-48">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title || 'Video thumbnail'} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div 
                          className="w-16 h-16 rounded-full flex items-center justify-center" 
                          style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                        >
                          <Play className="w-8 h-8 ml-1" style={{ color: colors.primary }} />
                        </div>
                      </div>
                      {video.duration && (
                        <div className="absolute bottom-2 right-2 px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: colors.overlayColor, color: '#FFFFFF' }}>
                          {video.duration}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center" style={{ backgroundColor: `${colors.primary}10` }}>
                      <div className="text-center">
                        <Video className="w-12 h-12 mx-auto mb-2" style={{ color: colors.primary }} />
                        <span className="text-sm font-light" style={{ color: colors.primary, fontFamily: font }}>{t("Photography Video")}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-5" style={{ backgroundColor: colors.background }}>
                  <h3 className="font-medium text-lg mb-3" style={{ color: colors.text, fontFamily: font }}>
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-sm mb-3" style={{ color: colors.text + 'CC', fontFamily: font }}>
                      {video.description}
                    </p>
                  )}
                  <div className="flex justify-between items-center">
                    {video.video_type && (
                      <span 
                        className="text-xs px-2 py-1" 
                        style={{ 
                          backgroundColor: `${colors.primary}15`,
                          color: colors.primary,
                          fontFamily: font
                        }}
                      >
                        {video.video_type.replace('_', ' ')}
                      </span>
                    )}
                    {video.location && (
                      <span className="text-xs" style={{ color: colors.text + '80', fontFamily: font }}>
                        📍 {video.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderYouTubeSection = (youtubeData: any) => {
    if (!youtubeData.channel_url && !youtubeData.channel_name && !youtubeData.latest_video_embed) return null;
    
    return (
      <div 
        className="py-8 px-5" 
        style={{ backgroundColor: colors.background }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-4">
            <div className="flex-grow h-px" style={{ backgroundColor: colors.primary }}></div>
            <div className="mx-4 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full" style={{ 
                  border: `2px solid ${colors.primary}`,
                  transform: 'rotate(45deg)'
                }}></div>
                <div className="w-8 h-8 rounded-full absolute" style={{ 
                  border: `2px solid ${colors.primary}`,
                  transform: 'rotate(45deg)'
                }}></div>
                <div className="w-4 h-4 rounded-full absolute" style={{ backgroundColor: colors.primary }}></div>
              </div>
              <h2 
                className="text-3xl font-light px-8 py-2 relative z-10 text-center" 
                style={{ 
                  color: colors.text,
                  fontFamily: font
                }}
              >
                <span style={{ backgroundColor: colors.background, padding: '0 15px' }}>{t("YouTube Channel")}</span>
              </h2>
            </div>
            <div className="flex-grow h-px" style={{ backgroundColor: colors.primary }}></div>
          </div>
          
          <div 
            className="p-8 text-center"
            style={{ 
              backgroundColor: colors.cardBg,
              border: `1px solid ${colors.borderColor}`
            }}
          >
            {youtubeData.latest_video_embed && (
              <div className="mb-6 rounded-lg overflow-hidden" style={{ backgroundColor: colors.background, border: `1px solid ${colors.borderColor}` }}>
                <div className="p-3 mb-2">
                  <h4 className="font-light text-sm flex items-center" style={{ color: colors.text, fontFamily: font }}>
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
            
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center mr-4">
                <Youtube className="w-10 h-10 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-light text-xl mb-1" style={{ color: colors.text, fontFamily: font }}>
                  {youtubeData.channel_name || 'Photography Channel'}
                </h3>
                {youtubeData.subscriber_count && (
                  <p className="text-sm font-medium" style={{ color: colors.primary, fontFamily: font }}>
                    📊 {youtubeData.subscriber_count} {t("subscribers")}
                  </p>
                )}
              </div>
            </div>
            
            {youtubeData.channel_description && (
              <p className="text-base mb-6 leading-relaxed" style={{ color: colors.text, fontFamily: font }}>
                {youtubeData.channel_description}
              </p>
            )}
            
            <div className="space-y-4">
              {youtubeData.channel_url && (
                <Button 
                  size="lg"
                  className="px-8 py-4 text-base font-light" 
                  style={{ 
                    backgroundColor: '#FF0000', 
                    color: 'white',
                    fontFamily: font 
                  }}
                  onClick={() => typeof window !== "undefined" && window.open(youtubeData.channel_url, '_blank', 'noopener,noreferrer')}
                >
                  <Youtube className="w-5 h-5 mr-2" />
                  {t("Subscribe to Channel")}
                </Button>
              )}
              {youtubeData.featured_playlist && (
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-4 text-base font-light" 
                  style={{ 
                    borderColor: colors.primary, 
                    color: colors.primary, 
                    fontFamily: font 
                  }}
                  onClick={() => typeof window !== "undefined" && window.open(youtubeData.featured_playlist, '_blank', 'noopener,noreferrer')}
                >
                  📹 {t("Photography Tutorials")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContactSection = (contactData: any) => (
    <div 
      id="contact"
      className="py-8 px-5" 
      style={{ 
        backgroundColor: colors.cardBg,
        borderBottom: `1px solid ${colors.borderColor}`
      }}
    >
      <div className="text-center mb-8">
        <h2 
          className="text-3xl font-light mb-4 relative inline-block" 
          style={{ 
            color: colors.text,
            fontFamily: font
          }}
        >
          {t("Contact")}
          <div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 mt-2" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </h2>
      </div>
      
      <div className="space-y-4">
        {(contactData.email || data.email) && (
          <div className="flex items-center">
            <div 
              className="w-9 h-9 rounded-full flex items-center justify-center mr-3" 
              style={{ 
                backgroundColor: `${colors.primary}10`,
                color: colors.primary
              }}
            >
              <Mail size={16} />
            </div>
            <div>
              <p 
                className="text-xs" 
                style={{ color: colors.text + '80' }}
              >
                {t("Email")}
              </p>
              <a 
                href={`mailto:${contactData.email || data.email}`} 
                className="text-sm font-medium" 
                style={{ color: colors.text }}
              >
                {contactData.email || data.email}
              </a>
            </div>
          </div>
        )}
        
        {(contactData.phone || data.phone) && (
          <div className="flex items-center">
            <div 
              className="w-9 h-9 rounded-full flex items-center justify-center mr-3" 
              style={{ 
                backgroundColor: `${colors.primary}10`,
                color: colors.primary
              }}
            >
              <Phone size={16} />
            </div>
            <div>
              <p 
                className="text-xs" 
                style={{ color: colors.text + '80' }}
              >
                {t("Phone")}
              </p>
              <a 
                href={`tel:${contactData.phone || data.phone}`} 
                className="text-sm font-medium" 
                style={{ color: colors.text }}
              >
                {contactData.phone || data.phone}
              </a>
            </div>
          </div>
        )}
        
        {(contactData.website || data.website) && (
          <div className="flex items-center">
            <div 
              className="w-9 h-9 rounded-full flex items-center justify-center mr-3" 
              style={{ 
                backgroundColor: `${colors.primary}10`,
                color: colors.primary
              }}
            >
              <Globe size={16} />
            </div>
            <div className="flex-1 overflow-hidden">
              <p 
                className="text-xs" 
                style={{ color: colors.text + '80' }}
              >
                {t("Website")}
              </p>
              <a 
                href={contactData.website || data.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-medium truncate block" 
                style={{ color: colors.text }}
              >
                {contactData.website || data.website}
              </a>
            </div>
          </div>
        )}
        
        {contactData.location && (
          <div className="flex items-center">
            <div 
              className="w-9 h-9 rounded-full flex items-center justify-center mr-3" 
              style={{ 
                backgroundColor: `${colors.primary}10`,
                color: colors.primary
              }}
            >
              <MapPin size={16} />
            </div>
            <div>
              <p 
                className="text-xs" 
                style={{ color: colors.text + '80' }}
              >
                {t("Studio Location")}
              </p>
              <p 
                className="text-sm font-medium" 
                style={{ color: colors.text }}
              >
                {contactData.location}
              </p>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-8 space-y-4">
        <Button
          className="w-full py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
          size="sm"
          style={{ 
            backgroundColor: colors.primary,
            color: colors.buttonText,
            fontFamily: font
          }}
          onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
        >
          {t("Send a Message")}
        </Button>
        
        <Button
          className="w-full py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
          size="sm"
          variant="outline"
          style={{ 
            borderColor: colors.primary,
            color: colors.primary,
            fontFamily: font
          }}
          onClick={() => {
            const contactData = {
              name: data.name || '',
              title: data.title || '',
              email: data.email || configSections.contact?.email || '',
              phone: data.phone || configSections.contact?.phone || '',
              website: data.website || configSections.contact?.website || '',
              location: configSections.contact?.location || ''
            };
            import('@/utils/vcfGenerator').then(module => {
                  module.downloadVCF(contactData);
                });
          }}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          {t("Save Contact")}
        </Button>
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
        className="py-12 px-6" 
        style={{ backgroundColor: colors.background }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="flex-grow h-px" style={{ backgroundColor: colors.primary }}></div>
             <div className="text-center mb-8">
                <h2 
                  className="text-3xl font-light mb-4 relative inline-block" 
                  style={{ 
                    color: colors.text,
                    fontFamily: font
                  }}
                >
                  {t("Follow Me")}
                  <div 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 mt-2" 
                    style={{ backgroundColor: colors.primary }}
                  ></div>
                </h2>
              </div>
            <div className="flex-grow h-px" style={{ backgroundColor: colors.primary }}></div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {socialLinks.map((link: any, index: number) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg shadow-md"
                style={{ 
                  backgroundColor: colors.primary,
                  color: '#FFFFFF'
                }}
              >
                <SocialIcon platform={link.platform} color="#FFFFFF" />
              </a>
            ))}
          </div>
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
        className="py-12 px-6" 
        style={{ backgroundColor: colors.cardBg }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 
              className="text-3xl font-light mb-4 relative inline-block" 
              style={{ 
                color: colors.text,
                fontFamily: font
              }}
            >
              {t("Studio Hours")}
              <div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 mt-2" 
                style={{ backgroundColor: colors.primary }}
              ></div>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
            {hours.map((hour: any, index: number) => (
              <div 
                key={index} 
                className="flex justify-between items-center p-4 rounded-lg transition-colors duration-200"
                style={{ 
                  backgroundColor: hour.day === currentDay ? `${colors.primary}15` : colors.background,
                  border: `1px solid ${hour.day === currentDay ? colors.primary + '30' : colors.borderColor}`
                }}
              >
                <span 
                  className="capitalize font-medium text-sm" 
                  style={{ 
                    color: hour.day === currentDay ? colors.primary : colors.text
                  }}
                >
                  {hour.day}
                </span>
                <span 
                  className="text-sm" 
                  style={{ 
                    color: hour.is_closed ? colors.text + '80' : (hour.day === currentDay ? colors.primary : colors.text)
                  }}
                >
                  {hour.is_closed ? t('Closed') : `${hour.open_time} - ${hour.close_time}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderTestimonialsSection = (testimonialsData: any) => {
    const reviews = testimonialsData.reviews || [];
    
    
    if (!Array.isArray(reviews) || reviews.length === 0) return null;
    
    
    return (
      <div 
        className="py-8 px-5" 
        style={{ 
          backgroundColor: colors.primary,
          color: colors.buttonText
        }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <div className="flex-grow h-px" style={{ backgroundColor: colors.buttonText }}></div>
            <div className="mx-4 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full" style={{ 
                  border: `2px solid ${colors.buttonText}`,
                  transform: 'rotate(45deg)'
                }}></div>
                <div className="w-8 h-8 rounded-full absolute" style={{ 
                  border: `2px solid ${colors.buttonText}`,
                  transform: 'rotate(45deg)'
                }}></div>
                <div className="w-4 h-4 rounded-full absolute" style={{ backgroundColor: colors.buttonText }}></div>
              </div>
              <h2 
                className="text-3xl font-light px-8 py-2 relative z-10 text-center" 
                style={{ 
                  color: '#FFFFFF',
                  fontFamily: font
                }}
              >
                <span style={{ backgroundColor: colors.primary, padding: '0 15px' }}>{t("Client Testimonials")}</span>
              </h2>
            </div>
            <div className="flex-grow h-px" style={{ backgroundColor: colors.buttonText }}></div>
          </div>
          
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentReview * 100}%)` }}
              >
                {reviews.map((review: any, index: number) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="text-center max-w-xl mx-auto">
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            fill={i < parseInt(review.rating || 5) ? '#FFFFFF' : 'transparent'} 
                            stroke="#FFFFFF"
                            className="mx-0.5"
                          />
                        ))}
                      </div>
                      
                      <p 
                        className="text-xl italic mb-8 leading-relaxed font-light" 
                        style={{ 
                          color: '#FFFFFF',
                          fontFamily: font
                        }}
                      >
                        "{review.review}"
                      </p>
                      
                      <div className="flex items-center justify-center">
                        {review.client_image ? (
                          <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-white border-opacity-30">
                            <img 
                              src={review.client_image} 
                              alt={review.client_name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : null}
                        
                        <div>
                          <p 
                            className="font-medium" 
                            style={{ color: '#FFFFFF' }}
                          >
                            {review.client_name}
                          </p>
                          {review.project_type && (
                            <p 
                              className="text-sm" 
                              style={{ color: 'rgba(255,255,255,0.8)' }}
                            >
                              {review.project_type}
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
              <div className="flex justify-center mt-4 space-x-3">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    className="w-3 h-3 rounded-full transition-all duration-300"
                    style={{ 
                      backgroundColor: currentReview === index ? colors.buttonText : 'rgba(255,255,255,0.3)'
                    }}
                    onClick={() => setCurrentReview(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderAppointmentsSection = (appointmentsData: any) => {

    return (
      <div 
        className="py-8 px-5" 
        style={{ backgroundColor: colors.background }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center mb-4">
            <div className="flex-grow h-px" style={{ backgroundColor: colors.primary }}></div>
            <div className="mx-4 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full" style={{ 
                  border: `2px solid ${colors.primary}`,
                  transform: 'rotate(45deg)'
                }}></div>
                <div className="w-8 h-8 rounded-full absolute" style={{ 
                  border: `2px solid ${colors.primary}`,
                  transform: 'rotate(45deg)'
                }}></div>
                <div className="w-4 h-4 rounded-full absolute" style={{ backgroundColor: colors.primary }}></div>
              </div>
              <h2 
                className="text-3xl font-light px-8 py-2 relative z-10 text-center" 
                style={{ 
                  color: colors.text,
                  fontFamily: font
                }}
              >
                <span style={{ backgroundColor: colors.background, padding: '0 15px' }}>{t("Ready to Book a Session?")}</span>
              </h2>
            </div>
            <div className="flex-grow h-px" style={{ backgroundColor: colors.primary }}></div>
          </div>
          
          <p 
            className="text-base mb-4" 
            style={{ color: colors.text + 'CC' }}
          >
            {t("Let's create something beautiful together. Schedule a consultation to discuss your photography needs.")}
          </p>
          
          <Button 
            size="lg"
            className="px-8 py-6 text-base"
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText,
              fontFamily: font
            }}
            onClick={() => handleAppointmentBooking(appointmentsData)}
          >
            <Calendar className="w-5 h-5 mr-2" />
            {appointmentsData?.booking_text || 'Schedule a Consultation'}
          </Button>
        </div>
      </div>
    );
  };

  const renderLocationSection = (locationData: any) => {
    if (!locationData.map_embed_url && !locationData.directions_url) return null;
    
    return (
      <div 
        className="py-12 px-6" 
        style={{ backgroundColor: colors.cardBg }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 
              className="text-3xl font-light mb-4 relative inline-block" 
              style={{ 
                color: colors.text,
                fontFamily: font
              }}
            >
              {t("Studio Location")}
              <div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 mt-2" 
                style={{ backgroundColor: colors.primary }}
              ></div>
            </h2>
          </div>
          
          <div className="space-y-6">
            {locationData.map_embed_url && (
              <div 
                className="w-full h-64 rounded overflow-hidden" 
                style={{ border: `1px solid ${colors.borderColor}` }}
              >
                <div dangerouslySetInnerHTML={{ __html: locationData.map_embed_url }} className="w-full h-full" />
              </div>
            )}
            
            {locationData.directions_url && (
              <div className="text-center">
                <Button 
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
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderAppDownloadSection = (appData: any) => {
    if (!appData.app_store_url && !appData.play_store_url) return null;
    
    return (
      <div 
        className="py-12 px-6" 
        style={{ backgroundColor: colors.background }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center mb-6">
            <div className="flex-grow h-px" style={{ backgroundColor: colors.primary }}></div>
            <div className="mx-4 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full" style={{ 
                  border: `2px solid ${colors.primary}`,
                  transform: 'rotate(45deg)'
                }}></div>
                <div className="w-8 h-8 rounded-full absolute" style={{ 
                  border: `2px solid ${colors.primary}`,
                  transform: 'rotate(45deg)'
                }}></div>
                <div className="w-4 h-4 rounded-full absolute" style={{ backgroundColor: colors.primary }}></div>
              </div>
              <h2 
                className="text-2xl font-light px-8 py-2 relative z-10 text-center" 
                style={{ 
                  color: colors.text,
                  fontFamily: font
                }}
              >
                <span style={{ backgroundColor: colors.background, padding: '0 15px' }}>{t("Download Our App")}</span>
              </h2>
            </div>
            <div className="flex-grow h-px" style={{ backgroundColor: colors.primary }}></div>
          </div>
          
          {appData.app_description && (
            <p 
              className="text-sm mb-6" 
              style={{ color: colors.text + 'CC' }}
            >
              {appData.app_description}
            </p>
          )}
          
          <div className="flex justify-center space-x-4">
            {appData.app_store_url && (
              <Button 
                variant="outline" 
                style={{ 
                  borderColor: colors.primary,
                  color: colors.primary,
                  fontFamily: font
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
                  fontFamily: font
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
        className="py-16 px-6" 
        style={{ 
          backgroundColor: colors.primary,
          color: colors.buttonText
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center mb-6">
            <div className="flex-grow h-px" style={{ backgroundColor: colors.buttonText }}></div>
            <div className="mx-4 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full" style={{ 
                  border: `2px solid ${colors.buttonText}`,
                  transform: 'rotate(45deg)'
                }}></div>
                <div className="w-8 h-8 rounded-full absolute" style={{ 
                  border: `2px solid ${colors.buttonText}`,
                  transform: 'rotate(45deg)'
                }}></div>
                <div className="w-4 h-4 rounded-full absolute" style={{ backgroundColor: colors.buttonText }}></div>
              </div>
              <h2 
                className="text-3xl font-light px-8 py-2 relative z-10 text-center" 
                style={{ 
                  color: '#FFFFFF',
                  fontFamily: font
                }}
              >
                <span style={{ backgroundColor: colors.primary, padding: '0 15px' }}>{formData.form_title}</span>
              </h2>
            </div>
            <div className="flex-grow h-px" style={{ backgroundColor: colors.buttonText }}></div>
          </div>
          
          {formData.form_description && (
            <p 
              className="text-base mb-8" 
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              {formData.form_description}
            </p>
          )}
          
          <Button 
            size="lg"
            className="px-8 py-6 text-base"
            style={{ 
              backgroundColor: 'transparent',
              border: `2px solid ${colors.buttonText}`,
              color: colors.buttonText,
              fontFamily: font
            }}
            onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
          >
            <Mail className="w-5 h-5 mr-2" />
            {t("Get in Touch")}
          </Button>
        </div>
      </div>
    );
  };

  const renderCustomHtmlSection = (customHtmlData: any) => {
    if (!customHtmlData.html_content) return null;
    
    return (
      <div className="py-16 px-6" style={{ backgroundColor: colors.cardBg }}>
        <div className="max-w-4xl mx-auto">
          {customHtmlData.show_title && customHtmlData.section_title && (
            <div className="text-center mb-8">
              <h2 
                className="text-3xl font-light mb-4 relative inline-block" 
                style={{ 
                  color: colors.text,
                  fontFamily: font
                }}
              >
                {customHtmlData.section_title}
                <div 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 mt-2" 
                  style={{ backgroundColor: colors.primary }}
                ></div>
              </h2>
            </div>
          )}
          
          <div 
            className="custom-html-content p-6 rounded-lg" 
            style={{ 
              backgroundColor: colors.background,
              border: `1px solid ${colors.borderColor}`,
              fontFamily: font,
              color: colors.text
            }}
          >
            <style>
              {`
                .custom-html-content h1, .custom-html-content h2, .custom-html-content h3, .custom-html-content h4, .custom-html-content h5, .custom-html-content h6 {
                  color: ${colors.primary};
                  margin-bottom: 0.5rem;
                  font-family: ${font};
                }
                .custom-html-content p {
                  color: ${colors.text};
                  margin-bottom: 0.5rem;
                  font-family: ${font};
                }
                .custom-html-content a {
                  color: ${colors.primary};
                  text-decoration: underline;
                }
                .custom-html-content ul, .custom-html-content ol {
                  color: ${colors.text};
                  padding-left: 1rem;
                  font-family: ${font};
                }
                .custom-html-content code {
                  background-color: ${colors.primary}20;
                  color: ${colors.primary};
                  padding: 0.125rem 0.25rem;
                  border-radius: 0.25rem;
                  font-family: 'JetBrains Mono', monospace;
                }
              `}
            </style>
            <StableHtmlContent htmlContent={customHtmlData.html_content} />
          </div>
        </div>
      </div>
    );
  };

  const renderQrShareSection = (qrData: any) => {
    if (!qrData.enable_qr) return null;
    
    return (
      <div className="py-16 px-6" style={{ backgroundColor: colors.background }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="flex-grow h-px" style={{ backgroundColor: colors.primary }}></div>
            <div className="mx-4 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full" style={{ 
                  border: `2px solid ${colors.primary}`,
                  transform: 'rotate(45deg)'
                }}></div>
                <div className="w-8 h-8 rounded-full absolute" style={{ 
                  border: `2px solid ${colors.primary}`,
                  transform: 'rotate(45deg)'
                }}></div>
                <div className="w-4 h-4 rounded-full absolute" style={{ backgroundColor: colors.primary }}></div>
              </div>
              <h2 
                className="text-3xl font-light px-8 py-2 relative z-10 text-center" 
                style={{ 
                  color: colors.text,
                  fontFamily: font
                }}
              >
                <span style={{ backgroundColor: colors.background, padding: '0 15px' }}>{t('Share My Portfolio')}</span>
              </h2>
            </div>
            <div className="flex-grow h-px" style={{ backgroundColor: colors.primary }}></div>
          </div>
          
          <div 
            className="text-center p-8"
            style={{ 
              backgroundColor: colors.cardBg,
              border: `1px solid ${colors.borderColor}`
            }}
          >
            {qrData.qr_title && (
              <h4 className="font-light text-xl mb-3" style={{ color: colors.text, fontFamily: font }}>
                {qrData.qr_title}
              </h4>
            )}
            
            {qrData.qr_description && (
              <p className="text-base mb-6 leading-relaxed" style={{ color: colors.text, fontFamily: font }}>
                {qrData.qr_description}
              </p>
            )}
            
            <Button 
              size="lg"
              className="px-8 py-4 text-base font-light" 
              style={{ 
                backgroundColor: colors.primary,
                color: colors.buttonText,
                fontFamily: font
              }}
              onClick={() => setShowQrModal(true)}
            >
              <QrCode className="w-5 h-5 mr-2" />
              {t('Share QR Code')}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderThankYouSection = (thankYouData: any) => {
    if (!thankYouData.message) return null;
    
    return (
      <div 
        className="py-12 px-6" 
        style={{ backgroundColor: colors.background }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p 
            className="text-sm italic" 
            style={{ 
              color: colors.text + 'CC',
              fontFamily: font
            }}
          >
            {thankYouData.message}
          </p>
        </div>
      </div>
    );
  };

  const renderCopyrightSection = (copyrightData: any) => {
    // This function is no longer used as we're rendering copyright separately at the end
    return null;
  };

  // Create a style object that will be applied to all text elements
  const globalStyle = {
    fontFamily: font
  };
  
  // Extract copyright section to render it at the end
  const copyrightSection = configSections.copyright;
  
  // Get ordered sections using the utility function
  const orderedSectionKeys = getSectionOrder(data.template_config || { sections: configSections, sectionSettings: configSections }, allSections);
  
  return (
    <div 
      className="w-full max-w-md mx-auto rounded-2xl overflow-hidden" 
      style={{ 
        fontFamily: font,
        background: colors.background,
        color: colors.text,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
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
      
      {/* Copyright always at the end */}
      {copyrightSection && (
        <div 
          className="py-6 px-6 text-center" 
          style={{ 
            backgroundColor: colors.background,
            borderTop: `1px solid ${colors.borderColor}`
          }}
        >
          {copyrightSection.text && (
            <p 
              className="text-xs" 
              style={{ color: colors.text + '80' }}
            >
              {copyrightSection.text}
            </p>
          )}
        </div>
      )}
      
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