import { handleAppointmentBooking } from '../VCardPreview';
import React, { useState } from 'react';
import StableHtmlContent from '@/components/StableHtmlContent';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ensureRequiredSections } from '@/utils/ensureRequiredSections';
import { VideoEmbed, extractVideoUrl } from '@/components/VideoEmbed';
import { createYouTubeEmbedRef } from '@/utils/youtubeEmbedUtils';
import { sanitizeText, sanitizeUrl } from '@/utils/sanitizeHtml';
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
  AlertTriangle,
  Users,
  CheckCircle2,
  Info,
  Youtube,
  Scissors,
  Home,
  PawPrint,
  Video,
  Play,
  Share2,
  QrCode
} from 'lucide-react';
import SocialIcon from '../../../link-bio-builder/components/SocialIcon';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionData, getSectionOrder } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';
import { useTranslation } from 'react-i18next';
import languageData from '@/../../resources/lang/language.json';

interface PetCareTemplateProps {
  data: any;
  template: any;
}

export default function PetCareTemplate({ data, template }: PetCareTemplateProps) {
   const { t, i18n } = useTranslation();
  const [activeTip, setActiveTip] = useState<number>(0);
  const [activeService, setActiveService] = useState<string>('all');
  
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
    primary: '#4CAF50',
    secondary: '#8BC34A',
    accent: '#E8F5E9',
    background: '#FFFFFF',
    text: '#333333',
    cardBg: '#FFFFFF',
    borderColor: '#E0E0E0',
    buttonText: '#FFFFFF',
    highlightColor: '#FFC107'
  };
  const font = configSections.font || template?.defaultFont || 'Nunito, sans-serif';
  
  // Get all sections for this business type
  const allSections = getBusinessTemplate('pet-care')?.sections || [];



  // Helper function to get pet type icon
  const getPetTypeIcon = (petType: string, size: number = 20) => {
    switch(petType) {
      case 'dogs': return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5"></path>
          <path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"></path>
          <path d="M8 14v.5"></path>
          <path d="M16 14v.5"></path>
          <path d="M11.25 16.25h1.5L12 17l-.75-.75Z"></path>
          <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306"></path>
        </svg>
      );
      case 'cats': return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"></path>
          <path d="M8 14v.5"></path>
          <path d="M16 14v.5"></path>
          <path d="M11.25 16.25h1.5L12 17l-.75-.75Z"></path>
        </svg>
      );
      case 'small': return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 16a6 6 0 1 1 6-6 6 6 0 0 1-6 6z"></path>
          <path d="M10 8l-1 1"></path>
          <path d="M14 8l1 1"></path>
          <path d="M10 14a3.5 3.5 0 0 0 4 0"></path>
        </svg>
      );
      case 'exotic': return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 5c0 9-7 12-7 12s-7-3-7-12a7 7 0 0 1 14 0Z"></path>
          <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0Z"></path>
        </svg>
      );
      case 'all':
      default: return <PawPrint size={size} />;
    }
  };

  const renderSection = (sectionKey: string) => {
    const sectionData = configSections[sectionKey] || {};
    if (!sectionData || Object.keys(sectionData).length === 0 || sectionData.enabled === false) return null;
    
    switch (sectionKey) {
      case 'header':
        return renderHeaderSection(sectionData);
      case 'emergency':
        return renderEmergencySection(sectionData);
      case 'about':
        return renderAboutSection(sectionData);
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
      case 'gallery':
        return renderGallerySection(sectionData);
      case 'testimonials':
        return renderTestimonialsSection(sectionData);
      case 'appointments':
        return renderAppointmentsSection(sectionData);
      case 'team':
        return renderTeamSection(sectionData);
      case 'pet_care_tips':
        return renderPetCareTipsSection(sectionData);
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
      {/* Header with Paw Pattern */}
      <div className="relative h-56 overflow-hidden">
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
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            }}
          >
            {/* Paw pattern overlay */}
            <div className="absolute inset-0 opacity-10" 
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M13 3.5c2.44 0 4.42 1.94 4.42 4.32a4.37 4.37 0 01-4.42 4.31c-2.44 0-4.42-1.93-4.42-4.31C8.58 5.44 10.56 3.5 13 3.5zm10.76 6.49c1.9 0 3.45 1.51 3.45 3.37a3.4 3.4 0 01-3.45 3.37c-1.9 0-3.45-1.51-3.45-3.37a3.4 3.4 0 013.45-3.37zm9.77 4.67c1.73 0 3.13 1.37 3.13 3.07a3.1 3.1 0 01-3.13 3.06c-1.73 0-3.13-1.37-3.13-3.06a3.1 3.1 0 013.13-3.07zm-15.95 6.8c2.1 0 3.8 1.67 3.8 3.72a3.76 3.76 0 01-3.8 3.72c-2.1 0-3.8-1.67-3.8-3.72a3.76 3.76 0 013.8-3.72zm-9.77 4.66c1.73 0 3.13 1.37 3.13 3.07a3.1 3.1 0 01-3.13 3.06c-1.73 0-3.13-1.37-3.13-3.06a3.1 3.1 0 013.13-3.07z'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>
        )}
        
        {/* Overlay */}
        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
        ></div>
        
        {/* Language Selector */}
        {configSections.language && (
          <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}>
            <div className="relative">
              <button
                onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                className="flex items-center space-x-1 px-3 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105"
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: colors.background,
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  fontFamily: font
                }}
              >
                <Globe className="w-3 h-3" />
                <span>{languageData.find(lang => lang.code === currentLanguage)?.name || 'EN'}</span>
              </button>
              
              {showLanguageSelector && (
                <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 min-w-[140px] max-h-48 overflow-y-auto z-[99999]">
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
            {sanitizeText(headerData.name || data.name || 'Paws & Claws')}
          </h1>
          
          {headerData.tagline && (
            <p 
              className="text-lg" 
              style={{ 
                color: colors.background,
                fontFamily: font,
                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              {sanitizeText(headerData.tagline)}
            </p>
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

  const renderEmergencySection = (emergencyData: any) => {
    if (!emergencyData.show_emergency_banner || !emergencyData.emergency_phone) return null;
      return (
        <div 
          className="px-5 py-3" 
          style={{ 
            backgroundColor: '#F44336',
            color: '#FFFFFF'
          }}
        >
          <div className="flex items-start">
            <AlertTriangle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">{emergencyData.emergency_title || 'Pet Emergency?'}</p>
              {emergencyData.emergency_description && (
                <p className="text-xs mb-1">{emergencyData.emergency_description}</p>
              )}
              <p className="text-xs">
                {t("Call")}: <a href={`tel:${emergencyData.emergency_phone}`} className="font-bold underline">{emergencyData.emergency_phone}</a>
                {emergencyData.emergency_hours && ` (${emergencyData.emergency_hours})`}
              </p>
            </div>
          </div>
        </div>
      );
  };

  const renderAboutSection = (aboutData: any) => {
    if (!aboutData.description && !data.description) return null;
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background
        }}
        id="about"
      >
        <div className="text-center mb-4">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("About Us")}
          </h2>
          {/* Paw print divider */}
          <div className="flex justify-center items-center space-x-1 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
          </div>
        </div>
        
        <p 
          className="text-base leading-relaxed mb-5" 
          style={{ color: colors.text }}
        >
          {sanitizeText(aboutData.description || data.description)}
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
                {t("Years Experience")}
              </p>
            </div>
          )}
          
          {aboutData.business_type && (
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2"
                style={{ 
                  backgroundColor: colors.accent,
                  color: colors.primary
                }}
              >
                {aboutData.business_type === 'veterinary' ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 2v4"></path>
                    <path d="M16 2v4"></path>
                    <path d="M8 22v-4"></path>
                    <path d="M16 22v-4"></path>
                    <path d="M2 8h4"></path>
                    <path d="M2 16h4"></path>
                    <path d="M22 8h-4"></path>
                    <path d="M22 16h-4"></path>
                  </svg>
                ) : aboutData.business_type === 'grooming' ? (
                  <Scissors size={24} />
                ) : aboutData.business_type === 'boarding' ? (
                  <Home size={24} />
                ) : aboutData.business_type === 'training' ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v4"></path>
                    <path d="M12 18v4"></path>
                    <path d="m4.93 10.93 2.83 2.83"></path>
                    <path d="M16.24 16.24 19.07 19.07"></path>
                    <path d="M2 12h4"></path>
                    <path d="M18 12h4"></path>
                    <path d="m10.93 4.93-2.83 2.83"></path>
                    <path d="M16.24 7.76 19.07 4.93"></path>
                  </svg>
                ) : (
                  <PawPrint size={24} />
                )}
              </div>
              <p 
                className="text-sm capitalize" 
                style={{ color: colors.text }}
              >
                {aboutData.business_type.replace('_', ' ')}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderServicesSection = (servicesData: any) => {
    const services = servicesData.pet_services || [];
    if (!Array.isArray(services) || services.length === 0) return null;
    
    // Get unique pet types
    const uniquePetTypes = [...new Set(services.map((service: any) => service.pet_type).filter(Boolean))];
    const petTypes = ['all', ...uniquePetTypes.filter(type => type !== 'all')];
    
    // Filter services by active pet type
    const filteredServices = activeService === 'all' 
      ? services 
      : services.filter((service: any) => service.pet_type === activeService);
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.accent
        }}
        id="services"
      >
        <div className="text-center mb-4">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("Our Services")}
          </h2>
          {/* Paw print divider */}
          <div className="flex justify-center items-center space-x-1 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
          </div>
        </div>
        
        {/* Pet type filters */}
        {petTypes.length > 1 && (
          <div className="flex overflow-x-auto pb-2 mb-4 hide-scrollbar justify-center">
            {petTypes.map((petType: string) => (
              <button
                key={petType}
                className={`flex items-center text-xs py-1 px-3 mr-2 capitalize rounded-full whitespace-nowrap`}
                style={{ 
                  backgroundColor: activeService === petType ? colors.primary : colors.background,
                  color: activeService === petType ? colors.buttonText : colors.text,
                  border: `1px solid ${activeService === petType ? colors.primary : colors.borderColor}`
                }}
                onClick={() => setActiveService(petType)}
              >
                <span className="mr-1">{getPetTypeIcon(petType, 14)}</span>
                {petType === 'all' ? 'All Pets' : petType.replace('_', ' ')}
              </button>
            ))}
          </div>
        )}
        
        {/* Services list */}
        <div className="space-y-4">
          {filteredServices.map((service: any, index: number) => (
            <div 
              key={index} 
              className="rounded-lg shadow-sm overflow-hidden" 
              style={{ 
                backgroundColor: colors.background,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              {/* Service Image */}
              {service.image && (
                <div className="w-full h-32">
                  <img 
                    src={service.image} 
                    alt={service.name || 'Pet Service'} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 
                      className="text-lg font-bold" 
                      style={{ 
                        color: colors.primary,
                        fontFamily: font
                      }}
                    >
                      {service.name}
                    </h3>
                    
                    <div className="flex items-center mt-1">
                      {service.pet_type && service.pet_type !== 'all' && (
                        <div 
                          className="flex items-center mr-3 text-xs"
                          style={{ color: colors.text + '99' }}
                        >
                          <span className="mr-1">{getPetTypeIcon(service.pet_type, 12)}</span>
                          <span className="capitalize">{service.pet_type.replace('_', ' ')}</span>
                        </div>
                      )}
                      
                      {service.duration && (
                        <div 
                          className="flex items-center text-xs"
                          style={{ color: colors.text + '99' }}
                        >
                          <Clock size={12} className="mr-1" />
                          {service.duration}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {service.price && (
                    <span 
                      className="text-sm font-bold" 
                      style={{ color: colors.secondary }}
                    >
                      {service.price}
                    </span>
                  )}
                </div>
                
                {service.description && (
                  <p 
                    className="text-sm mt-2" 
                    style={{ color: colors.text + 'CC' }}
                  >
                    {service.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {configSections.appointments?.booking_url && (
          <div className="mt-5 text-center">
            <Button
              className="px-6 py-2"
              style={{ 
                backgroundColor: colors.primary,
                color: colors.buttonText,
                fontFamily: font
              }}
              onClick={() => handleAppointmentBooking(configSections.appointments)}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {t("Book a Service")}
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderContactSection = (contactData: any) => (
    <div 
      className="px-5 py-6" 
      style={{ 
        backgroundColor: colors.background
      }}
      id="contact"
    >
      <div className="text-center mb-4">
        <h2 
          className="text-2xl font-bold mb-2" 
          style={{ 
            color: colors.primary,
            fontFamily: font
          }}
        >
          {t("Contact Us")}
        </h2>
        {/* Paw print divider */}
        <div className="flex justify-center items-center space-x-1 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary }}></div>
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
        </div>
      </div>
      
      <div className="space-y-4">
        {contactData.emergency_phone && (
          <div 
            className="p-4 rounded-lg" 
            style={{ 
              backgroundColor: '#FFEBEE',
              border: '1px solid #FFCDD2'
            }}
          >
            <div className="flex">
              <AlertTriangle 
                size={20} 
                className="mr-3 flex-shrink-0 mt-1" 
                style={{ color: '#D32F2F' }}
              />
              <div>
                <p 
                  className="text-sm font-bold mb-1" 
                  style={{ color: '#D32F2F' }}
                >
                  {t("EMERGENCY CONTACT")}
                </p>
                <a 
                  href={`tel:${contactData.emergency_phone}`} 
                  className="text-base font-bold" 
                  style={{ color: '#D32F2F' }}
                >
                  {contactData.emergency_phone}
                </a>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          {(contactData.phone || data.phone) && (
            <div 
              className="p-4 rounded-lg" 
              style={{ 
                backgroundColor: colors.accent,
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
                    {t("PHONE")}
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
                backgroundColor: colors.accent,
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
                    {t("EMAIL")}
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
        
        {contactData.address && (
          <div 
            className="p-4 rounded-lg" 
            style={{ 
              backgroundColor: colors.accent,
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
                  className="text-xs font-medium mb-1" 
                  style={{ color: colors.primary }}
                >
                  {t("ADDRESS")}
                </p>
                <p 
                  className="text-sm" 
                  style={{ color: colors.text }}
                >
                  {contactData.address}
                </p>
                
                {configSections.google_map?.directions_url && (
                  <a 
                    href={configSections.google_map?.directions_url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs flex items-center mt-2"
                    style={{ color: colors.primary }}
                  >
                    {t("Get Directions")}
                    <ChevronRight size={12} className="ml-1" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
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
          backgroundColor: colors.accent
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
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-sm transition-transform hover:scale-110 mx-auto"
              style={{ 
                backgroundColor: colors.primary,
                color: colors.buttonText
              }}
            >
              <SocialIcon platform={link.platform} color={colors.buttonText} />
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
    
    // Find current day's hours
    const todayHours = hours.find(h => h.day === currentDay);
    const isOpenNow = todayHours && !todayHours.is_closed;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background
        }}
      >
        <div className="text-center mb-4">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("Hours")}
          </h2>
          {/* Paw print divider */}
          <div className="flex justify-center items-center space-x-1 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
          </div>
        </div>
        
        <div 
          className="p-4 rounded-lg" 
          style={{ 
            backgroundColor: colors.accent,
            border: `1px solid ${colors.borderColor}`
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <p 
              className="text-sm font-medium" 
              style={{ color: colors.text }}
            >
              {t("Current Status")}
            </p>
            
            {isOpenNow ? (
              <Badge 
                style={{ 
                  backgroundColor: '#4CAF50',
                  color: '#FFFFFF'
                }}
              >
                {t("Open Now")}
              </Badge>
            ) : (
              <Badge 
                style={{ 
                  backgroundColor: '#F44336',
                  color: '#FFFFFF'
                }}
              >
                {t("Closed Now")}
              </Badge>
            )}
          </div>
          
          <div className="space-y-2">
            {hours.map((hour: any, index: number) => (
              <div 
                key={index} 
                className="flex justify-between items-center py-1"
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
                <span 
                  className="text-sm" 
                  style={{ 
                    color: hour.is_closed ? colors.text + '80' : colors.text
                  }}
                >
                  {hour.is_closed ? 'Closed' : `${hour.open_time} - ${hour.close_time}`}
                </span>
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
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.accent
        }}
        id="gallery"
      >
        <div className="text-center mb-4">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("Gallery")}
          </h2>
          {/* Paw print divider */}
          <div className="flex justify-center items-center space-x-1 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
          </div>
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
                  style={{ backgroundColor: colors.background }}
                >
                  <PawPrint size={24} style={{ color: colors.primary }} />
                </div>
              )}
              
              {photo.caption && (
                <div 
                  className="absolute bottom-0 left-0 right-0 p-2 text-xs"
                  style={{ 
                    backgroundColor: 'rgba(0,0,0,0.5)',
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
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background
        }}
        id="testimonials"
      >
        <div className="text-center mb-4">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("Happy Pet Parents")}
          </h2>
          {/* Paw print divider */}
          <div className="flex justify-center items-center space-x-1 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
          </div>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentReview * 100}%)` }}
            >
              {reviews.map((review: any, index: number) => (
                <div key={index} className="w-full flex-shrink-0 px-1">
                  <div 
                    className="p-4 rounded-lg shadow-sm" 
                    style={{ 
                      backgroundColor: colors.accent,
                      border: `1px solid ${colors.borderColor}`
                    }}
                  >
                    <div className="flex items-center space-x-1 mb-2">
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
                      className="text-sm italic mb-3" 
                      style={{ color: colors.text }}
                    >
                      "{review.review}"
                    </p>
                    
                    <div className="flex items-center">
                      {review.client_image ? (
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                          <img 
                            src={review.client_image} 
                            alt={review.client_name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div 
                          className="w-10 h-10 rounded-full mr-3 flex items-center justify-center"
                          style={{ backgroundColor: colors.primary + '20' }}
                        >
                          <Users size={16} style={{ color: colors.primary }} />
                        </div>
                      )}
                      
                      <div>
                        <p 
                          className="text-sm font-bold" 
                          style={{ color: colors.primary }}
                        >
                          {review.client_name}
                        </p>
                        
                        {(review.pet_name || review.pet_type) && (
                          <p 
                            className="text-xs" 
                            style={{ color: colors.text + '99' }}
                          >
                            {review.pet_name}{review.pet_name && review.pet_type ? ' • ' : ''}{review.pet_type}
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
              {testimonialsData.reviews.map((_, dotIndex) => (
                <div
                  key={dotIndex}
                  className="w-2 h-2 rounded-full transition-colors"
                  style={{ 
                    backgroundColor: dotIndex === currentReview % Math.max(1, testimonialsData.reviews.length) ? colors.primary : colors.primary + '40'
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAppointmentsSection = (appointmentsData: any) => {
    if (!appointmentsData.booking_url && !appointmentsData.appointment_info) return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.accent
        }}
        id="appointments"
      >
        <div className="text-center mb-4">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("Book an Appointment")}
          </h2>
          {/* Paw print divider */}
          <div className="flex justify-center items-center space-x-1 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
          </div>
        </div>
        
        <div 
          className="p-4 rounded-lg shadow-sm" 
          style={{ 
            backgroundColor: colors.background,
            border: `1px solid ${colors.borderColor}`
          }}
        >
          {appointmentsData.appointment_info && (
            <p 
              className="text-sm mb-4" 
              style={{ color: colors.text }}
            >
              {appointmentsData.appointment_info}
            </p>
          )}
          
          {appointmentsData.online_booking && (
            <div 
              className="mb-4 p-3 rounded-lg flex items-center" 
              style={{ backgroundColor: colors.accent }}
            >
              <Info size={16} className="mr-2" style={{ color: colors.primary }} />
              <p 
                className="text-xs" 
                style={{ color: colors.text }}
              >
                {t("Online booking is available for your convenience.")}
              </p>
            </div>
          )}
          
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
            {appointmentsData.booking_text || 'Book Now'}
          </Button>
        </div>
      </div>
    );
  };

  const renderTeamSection = (teamData: any) => {
    const staff = teamData.staff || [];
    if (!Array.isArray(staff) || staff.length === 0) return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background
        }}
        id="team"
      >
        <div className="text-center mb-4">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("Our Team")}
          </h2>
          {/* Paw print divider */}
          <div className="flex justify-center items-center space-x-1 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
          </div>
        </div>
        
        <div className="space-y-4">
          {staff.map((member: any, index: number) => (
            <div 
              key={index} 
              className="p-4 rounded-lg shadow-sm" 
              style={{ 
                backgroundColor: colors.accent,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div className="flex">
                {member.image ? (
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div 
                    className="w-16 h-16 rounded-full mr-4 flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: colors.primary + '20' }}
                  >
                    <Users size={24} style={{ color: colors.primary }} />
                  </div>
                )}
                
                <div>
                  <h3 
                    className="text-lg font-bold" 
                    style={{ 
                      color: colors.primary,
                      fontFamily: font
                    }}
                  >
                    {member.name}
                  </h3>
                  
                  {member.title && (
                    <p 
                      className="text-sm" 
                      style={{ color: colors.secondary }}
                    >
                      {member.title}
                    </p>
                  )}
                  
                  {member.specialties && (
                    <p 
                      className="text-xs mt-1" 
                      style={{ color: colors.text + '99' }}
                    >
                      {member.specialties}
                    </p>
                  )}
                </div>
              </div>
              
              {member.bio && (
                <p 
                  className="text-sm mt-3" 
                  style={{ color: colors.text }}
                >
                  {member.bio}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPetCareTipsSection = (tipsData: any) => {
    const tips = tipsData.tips || [];
    if (!Array.isArray(tips) || tips.length === 0) return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.accent
        }}
        id="tips"
      >
        <div className="text-center mb-4">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("Pet Care Tips")}
          </h2>
          {/* Paw print divider */}
          <div className="flex justify-center items-center space-x-1 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
          </div>
        </div>
        
        <div className="space-y-4">
          {tips.map((tip: any, index: number) => (
            <div 
              key={index}
              className="p-4 rounded-lg shadow-sm" 
              style={{ 
                backgroundColor: colors.background,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div className="mb-3">
                <h3 
                  className="text-lg font-bold" 
                  style={{ 
                    color: colors.primary,
                    fontFamily: font
                  }}
                >
                  {tip.title}
                </h3>
                
                {tip.pet_type && tip.pet_type !== 'all' && (
                  <div 
                    className="flex items-center mt-1 text-xs"
                    style={{ color: colors.text + '99' }}
                  >
                    <span className="mr-1">{getPetTypeIcon(tip.pet_type, 12)}</span>
                    <span className="capitalize">{tip.pet_type.replace('_', ' ')} Care</span>
                  </div>
                )}
              </div>
              
              {tip.image && (
                <div className="mb-3 rounded-lg overflow-hidden">
                  <img 
                    src={tip.image} 
                    alt={tip.title} 
                    className="w-full h-32 object-cover"
                  />
                </div>
              )}
              
              <p 
                className="text-sm" 
                style={{ color: colors.text }}
              >
                {tip.description}
              </p>
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
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background
        }}
      >
        <div className="text-center mb-4">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("Find Us")}
          </h2>
          {/* Paw print divider */}
          <div className="flex justify-center items-center space-x-1 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
          </div>
        </div>
        
        {locationData.map_embed_url && (
          <div 
            className="w-full h-48 mb-4 rounded-lg overflow-hidden shadow-sm" 
            style={{ border: `1px solid ${colors.borderColor}` }}
          >
            <div 
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: locationData.map_embed_url }}
            />
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
    );
  };

  const renderAppDownloadSection = (appData: any) => {
    if (!appData.app_store_url && !appData.play_store_url) return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.accent
        }}
      >
        <div className="text-center mb-4">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("Pet Care App")}
          </h2>
          {/* Paw print divider */}
          <div className="flex justify-center items-center space-x-1 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
          </div>
        </div>
        
        <div 
          className="p-4 rounded-lg shadow-sm" 
          style={{ backgroundColor: colors.background }}
        >
          {appData.app_description && (
            <p 
              className="text-sm mb-4" 
              style={{ color: colors.text }}
            >
              {appData.app_description}
            </p>
          )}
          
          {appData.app_features && (
            <div className="mb-4">
              <p 
                className="text-sm font-bold mb-2" 
                style={{ color: colors.primary }}
              >
                {t("Features")}:
              </p>
              <ul className="space-y-1">
                {appData.app_features.split('\n').map((feature: string, i: number) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle2 
                      size={14} 
                      className="mr-2 flex-shrink-0" 
                      style={{ color: colors.primary }}
                    />
                    <span 
                      className="text-xs" 
                      style={{ color: colors.text }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-3">
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
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background
        }}
        id="contact_form"
      >
        <div className="text-center mb-4">
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
            className="w-16 h-1 mx-auto rounded-full" 
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
          {t("Send Message")}
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
          {t("Pet Care Videos")}
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
                      alt={video.title || 'pet care videos'} 
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
                      <span className="text-xs font-medium" style={{ color: colors.primary, fontFamily: font }}>{t("Pet Care Videos")}</span>
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
                      🐾 {video.video_type}
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
          {t("YouTube Channel")}
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
                {youtubeData.channel_name || 'Pet Care Tips'}
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
                {t("SUBSCRIBE")}
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
                🐾 {t("PET CARE GUIDES")}
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
        style={{ backgroundColor: colors.accent }}
      >
        <p 
          className="text-sm text-center" 
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
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background
        }}
      >
        {customHtmlData.show_title && customHtmlData.section_title && (
          <div className="text-center mb-4">
            <h2 
              className="text-2xl font-bold mb-2" 
              style={{ 
                color: colors.primary,
                fontFamily: font
              }}
            >
              <PawPrint className="w-6 h-6 mr-2 inline" />
              {customHtmlData.section_title}
            </h2>
            {/* Paw print divider */}
            <div className="flex justify-center items-center space-x-1 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary }}></div>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            </div>
          </div>
        )}
        <div 
          className="custom-html-content p-4 rounded-lg shadow-sm" 
          style={{ 
            backgroundColor: colors.accent,
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
                font-weight: bold;
              }
              .custom-html-content p {
                color: ${colors.text};
                margin-bottom: 0.5rem;
                font-family: ${font};
              }
              .custom-html-content a {
                color: ${colors.secondary};
                text-decoration: underline;
                font-weight: bold;
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
                font-family: 'Monaco', monospace;
                font-weight: bold;
              }
            `}
          </style>
          <StableHtmlContent htmlContent={customHtmlData.html_content} />
        </div>
      </div>
    );
  };

  const renderQrShareSection = (qrData: any) => {
    if (!qrData.enable_qr) return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.accent
        }}
      >
        <div className="text-center mb-4">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            <Share2 className="w-6 h-6 mr-2 inline" />
            {t("Share Pet Care")}
          </h2>
          {/* Paw print divider */}
          <div className="flex justify-center items-center space-x-1 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
          </div>
        </div>
        <div 
          className="p-4 rounded-lg shadow-sm" 
          style={{ 
            backgroundColor: colors.background,
            border: `1px solid ${colors.borderColor}`
          }}
        >
          {qrData.qr_title && (
            <h4 className="font-bold text-lg mb-2" style={{ color: colors.primary, fontFamily: font }}>
              {qrData.qr_title}
            </h4>
          )}
          
          {qrData.qr_description && (
            <p className="text-sm mb-4" style={{ color: colors.text, fontFamily: font }}>
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
            {t("Share QR Code")}
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
      className="w-full max-w-md mx-auto overflow-hidden rounded-lg" 
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
        
      {/* Save Contact Button */}
      <div className="p-5 border-t" style={{ borderColor: colors.borderColor }}>
        <Button 
          className="w-full" 
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
          {t("Save Contact")}
        </Button>
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