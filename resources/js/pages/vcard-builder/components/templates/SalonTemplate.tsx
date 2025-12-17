import { handleAppointmentBooking } from '../VCardPreview';
import React, { useState } from 'react';
import StableHtmlContent from '@/components/StableHtmlContent';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ensureRequiredSections } from '@/utils/ensureRequiredSections';
import { VideoEmbed, extractVideoUrl } from '@/components/VideoEmbed';
import { createYouTubeEmbedRef } from '@/utils/youtubeEmbedUtils';
import { useTranslation } from 'react-i18next';
import { sanitizeText, sanitizeUrl } from '@/utils/sanitizeHtml';
import { 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Instagram, 
  Facebook, 
  Clock, 
  Calendar, 
  Scissors, 
  Star, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  User,
  Users,
  Image,
  Gift,
  MessageSquare,
  Heart,
  Video,
  Play,
  Youtube,
  Share2,
  QrCode
} from 'lucide-react';
import SocialIcon from '../../../link-bio-builder/components/SocialIcon';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionOrder, isSectionEnabled, getSectionData } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';
import { sanitizeVideoData } from '@/utils/secureVideoUtils';
import languageData from '@/../../resources/lang/language.json';

interface SalonTemplateProps {
  data: any;
  template: any;
}

export default function SalonTemplate({ data, template }: SalonTemplateProps) {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('services');
  const [expandedService, setExpandedService] = useState<number | null>(null);
  
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
  const colors = data.colors || configSections.colors || template?.defaultColors || { 
    primary: '#DB7093', 
    secondary: '#E8B4B8', 
    accent: '#FFF0F5', 
    background: '#FFFFFF', 
    text: '#333333',
    cardBg: '#FAFAFA',
    borderColor: '#F0F0F0',
    buttonText: '#FFFFFF',
    highlightColor: '#FFD700'
  };
  const font = configSections.font || template?.defaultFont || 'Montserrat, sans-serif';
  
  // Get all sections for this business type
  const allSections = getBusinessTemplate('salon')?.sections || [];
  
  // Process video content at component level to avoid Rules of Hooks violation
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
      case 'specialists':
        return renderSpecialistsSection(sectionData);
      case 'promotions':
        return renderPromotionsSection(sectionData);
      case 'contact':
        return renderContactSection(sectionData);
      case 'social':
        return renderSocialSection(sectionData);
      case 'business_hours':
        return renderBusinessHoursSection(sectionData);
      case 'gallery':
        return renderGallerySection(sectionData);
      case 'videos':
        return renderVideosSection(sectionData);
      case 'youtube':
        return renderYouTubeSection(sectionData);
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
    <div className="relative">
      {/* Background Image */}
      <div className="relative h-64 overflow-hidden rounded-t-2xl">
        {headerData.background_image ? (
          <img 
            src={headerData.background_image} 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div 
            className="w-full h-full" 
            style={{ 
              background: `linear-gradient(to right, ${colors.primary}80, ${colors.secondary}80), url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: 'cover'
            }}
          ></div>
        )}
        
        {/* Language Selector - Salon themed */}
        {configSections.language && (
          <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-30`}>
            <div className="relative">
              <button
                onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                className="flex items-center justify-center transition-all"
                style={{ 
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: colors.primary
                }}
              >
                <span className="text-2xl">{String.fromCodePoint(...(languageData.find(lang => lang.code === currentLanguage)?.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt()) || []))}</span>
              </button>
              
              {showLanguageSelector && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border py-2 min-w-[150px] max-h-48 overflow-y-auto z-[999999]" style={{ borderColor: colors.borderColor }}>
                  {languageData.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center space-x-2 ${
                        currentLanguage === lang.code ? 'font-medium' : ''
                      }`}
                      style={{
                        backgroundColor: currentLanguage === lang.code ? colors.accent : 'transparent',
                        color: currentLanguage === lang.code ? colors.primary : colors.text
                      }}
                    >
                      <span className="text-base">{String.fromCodePoint(...lang.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt()))}</span>
                      <span>{lang.name}</span>
                      {currentLanguage === lang.code && <Heart size={12} style={{ color: colors.primary }} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Overlay */}
        <div 
          className="absolute inset-0 flex flex-col justify-center items-center text-center p-6"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
        >
          {headerData.logo ? (
            <img 
              src={headerData.logo} 
              alt={headerData.name} 
              className="h-20 mb-4 object-contain"
            />
          ) : (
            <div 
              className="mb-4 text-3xl font-bold" 
              style={{ 
                color: '#FFFFFF',
                fontFamily: font
              }}
            >
              {sanitizeText(headerData.name || data.name || t('Serenity Salon & Spa'))}
            </div>
          )}
          
          {headerData.tagline && (
            <p 
              className="text-sm italic" 
              style={{ color: '#FFFFFF' }}
            >
              {sanitizeText(headerData.tagline)}
            </p>
          )}
          
          <Button
            className="mt-4"
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText,
              fontFamily: font
            }}
            onClick={() => handleAppointmentBooking(configSections.appointments)}
          >
            <Calendar className="w-4 h-4 mr-2" />
            {t('Book Now')}
          </Button>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div 
        className="flex overflow-x-auto py-3 px-2 hide-scrollbar" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <TabButton 
          label={t('Services')} 
          active={activeTab === 'services'} 
          onClick={() => setActiveTab('services')} 
          colors={colors}
          font={font}
        />
        <TabButton 
          label={t('Team')} 
          active={activeTab === 'team'} 
          onClick={() => setActiveTab('team')} 
          colors={colors}
          font={font}
        />
        <TabButton 
          label={t('Gallery')} 
          active={activeTab === 'gallery'} 
          onClick={() => setActiveTab('gallery')} 
          colors={colors}
          font={font}
        />
        <TabButton 
          label={t('Info')} 
          active={activeTab === 'info'} 
          onClick={() => setActiveTab('info')} 
          colors={colors}
          font={font}
        />
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

  const TabButton = ({ label, active, onClick, colors, font }: any) => (
    <button
      className={`px-4 py-1 mx-1 text-sm font-medium whitespace-nowrap transition-all duration-200`}
      style={{ 
        color: active ? colors.primary : colors.text,
        borderBottom: active ? `2px solid ${colors.primary}` : 'none',
        fontFamily: font
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );

  const renderAboutSection = (aboutData: any) => {
    if (!aboutData.description && !data.description) return null;
    if (activeTab !== 'info') return null;
  return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="flex items-center mb-4">
          <Heart 
            size={18} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-lg font-semibold" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('About Us')}
          </h2>
        </div>
        
        <p 
          className="text-sm leading-relaxed mb-4" 
          style={{ color: colors.text }}
        >
          {sanitizeText(aboutData.description || data.description)}
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          {aboutData.year_established && (
            <div 
              className="p-3 rounded-lg text-center" 
              style={{ 
                backgroundColor: colors.accent,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <p 
                className="text-xs mb-1" 
                style={{ color: colors.text + '80' }}
              >
                {t('ESTABLISHED')}
              </p>
              <p 
                className="text-xl font-bold" 
                style={{ color: colors.primary }}
              >
                {aboutData.year_established}
              </p>
            </div>
          )}
          
          {aboutData.specialists_count && (
            <div 
              className="p-3 rounded-lg text-center" 
              style={{ 
                backgroundColor: colors.accent,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <p 
                className="text-xs mb-1" 
                style={{ color: colors.text + '80' }}
              >
                {t('SPECIALISTS')}
              </p>
              <p 
                className="text-xl font-bold" 
                style={{ color: colors.primary }}
              >
                {aboutData.specialists_count}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderServicesSection = (servicesData: any) => {
    const services = servicesData.service_list || [];
    if (!Array.isArray(services) || services.length === 0) return null;
    if (activeTab !== 'services') return null;
    
    // Group services by category
    const categories: Record<string, any[]> = {};
    services.forEach(service => {
      const category = service.category || 'other';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(service);
    });
    
    const getCategoryLabel = (category: string) => {
      const labels: Record<string, string> = {
        'hair': t('Hair Services'),
        'nails': t('Nail Services'),
        'facial': t('Facial Treatments'),
        'massage': t('Massage Therapy'),
        'makeup': t('Makeup Services'),
        'spa': t('Spa Treatments'),
        'waxing': t('Waxing Services'),
        'other': t('Other Services')
      };
      return labels[category] || t('Services');
    };
    
    const getCategoryIcon = (category: string) => {
      switch(category) {
        case 'hair': return <Scissors size={16} />;
        case 'nails': return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"></path>
            <line x1="16" y1="8" x2="2" y2="22"></line>
            <line x1="17.5" y1="15" x2="9" y2="15"></line>
          </svg>
        );
        case 'facial': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>;
        case 'massage': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h16"></path><path d="M4 6h16"></path><path d="M4 18h16"></path></svg>;
        case 'makeup': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3"></path><path d="M21 3v3a2 2 0 0 0 2 2h3"></path><path d="M3 16v3a2 2 0 0 0 2 2h3"></path><path d="M16 21v-3a2 2 0 0 1 2-2h3"></path></svg>;
        case 'spa': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9z"></path><path d="M12 3a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9z"></path></svg>;
        case 'waxing': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"></path><path d="M2 20h20"></path></svg>;
        default: return <Scissors size={16} />;
      }
    };
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ backgroundColor: colors.background }}
      >
        {Object.keys(categories).map((category, index) => (
          <div 
            key={category} 
            className="mb-6"
            style={{ 
              borderBottom: index < Object.keys(categories).length - 1 ? `1px solid ${colors.borderColor}` : 'none',
              paddingBottom: index < Object.keys(categories).length - 1 ? '24px' : '0'
            }}
          >
            <div 
              className="flex items-center mb-4"
              style={{ color: colors.primary }}
            >
              {getCategoryIcon(category)}
              <h3 
                className="ml-2 text-base font-semibold" 
                style={{ 
                  color: colors.text,
                  fontFamily: font
                }}
              >
                {getCategoryLabel(category)}
              </h3>
            </div>
            
            <div className="space-y-3">
              {categories[category].map((service, idx) => (
                <div 
                  key={idx} 
                  className="rounded-lg overflow-hidden"
                  style={{ 
                    backgroundColor: colors.cardBg,
                    border: `1px solid ${colors.borderColor}`
                  }}
                >
                  <div 
                    className="p-3 flex justify-between items-center cursor-pointer"
                    onClick={() => setExpandedService(expandedService === idx ? null : idx)}
                  >
                    <div>
                      <h4 
                        className="text-sm font-medium" 
                        style={{ 
                          color: colors.text,
                          fontFamily: font
                        }}
                      >
                        {service.title}
                      </h4>
                      
                      {service.duration && (
                        <p 
                          className="text-xs" 
                          style={{ color: colors.text + '80' }}
                        >
                          {service.duration}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center">
                      <span 
                        className="text-sm font-semibold mr-2" 
                        style={{ color: colors.primary }}
                      >
                        {service.price}
                      </span>
                      
                      {expandedService === idx ? (
                        <ChevronUp size={16} style={{ color: colors.primary }} />
                      ) : (
                        <ChevronDown size={16} style={{ color: colors.primary }} />
                      )}
                    </div>
                  </div>
                  
                  {expandedService === idx && service.description && (
                    <div 
                      className="px-3 pb-3 pt-0" 
                      style={{ borderTop: `1px solid ${colors.borderColor}` }}
                    >
                      <p 
                        className="text-xs" 
                        style={{ color: colors.text + 'CC' }}
                      >
                        {service.description}
                      </p>
                      
                      <Button
                        size="sm"
                        className="mt-2 text-xs h-7"
                        style={{ 
                          backgroundColor: colors.primary,
                          color: colors.buttonText,
                          fontFamily: font
                        }}
                        onClick={() => handleAppointmentBooking(configSections.appointments)}
                      >
                        {t('Book This Service')}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderSpecialistsSection = (specialistsData: any) => {
    const specialists = specialistsData.team || [];
    if (!Array.isArray(specialists) || specialists.length === 0) return null;
    if (activeTab !== 'team') return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ backgroundColor: colors.background }}
      >
        <div className="flex items-center mb-4">
          <Users 
            size={18} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-lg font-semibold" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('Our Team')}
          </h2>
        </div>
        
        <div className="space-y-5">
          {specialists.map((specialist: any, index: number) => (
            <div 
              key={index} 
              className="rounded-lg overflow-hidden" 
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div className="flex">
                <div 
                  className="w-1/3 aspect-square"
                  style={{ backgroundColor: colors.accent }}
                >
                  {specialist.image ? (
                    <img 
                      src={specialist.image} 
                      alt={specialist.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User size={32} style={{ color: colors.primary }} />
                    </div>
                  )}
                </div>
                
                <div className="w-2/3 p-3">
                  <h3 
                    className="text-base font-semibold" 
                    style={{ 
                      color: colors.text,
                      fontFamily: font
                    }}
                  >
                    {specialist.name}
                  </h3>
                  
                  <p 
                    className="text-xs mb-2" 
                    style={{ color: colors.primary }}
                  >
                    {specialist.title}
                  </p>
                  
                  {specialist.specialties && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {specialist.specialties.split(',').map((specialty: string, i: number) => (
                        <Badge 
                          key={i} 
                          variant="outline" 
                          className="text-xs py-0 px-1" 
                          style={{ 
                            borderColor: colors.primary,
                            color: colors.primary
                          }}
                        >
                          {specialty.trim()}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <Button
                    size="sm"
                    className="text-xs h-7 mt-1"
                    style={{ 
                      backgroundColor: colors.primary,
                      color: colors.buttonText,
                      fontFamily: font
                    }}
                    onClick={() => handleAppointmentBooking(configSections.appointments)}
                  >
                    {t('Book with')} {specialist.name.split(' ')[0]}
                  </Button>
                </div>
              </div>
              
              {specialist.bio && (
                <div 
                  className="p-3 text-xs" 
                  style={{ 
                    borderTop: `1px solid ${colors.borderColor}`,
                    color: colors.text + 'CC'
                  }}
                >
                  {specialist.bio}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPromotionsSection = (promotionsData: any) => {
    const promotions = promotionsData.offers || [];
    if (!Array.isArray(promotions) || promotions.length === 0) return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.accent,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="flex items-center mb-4">
          <Gift 
            size={18} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-lg font-semibold" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('Special Offers')}
          </h2>
        </div>
        
        <div className="space-y-3">
          {promotions.map((promo: any, index: number) => (
            <div 
              key={index} 
              className="p-3 rounded-lg" 
              style={{ 
                backgroundColor: colors.background,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div className="flex justify-between items-start">
                <h3 
                  className="text-base font-semibold" 
                  style={{ 
                    color: colors.primary,
                    fontFamily: font
                  }}
                >
                  {promo.title}
                </h3>
                
                <Badge 
                  className="text-xs" 
                  style={{ 
                    backgroundColor: colors.primary,
                    color: colors.buttonText
                  }}
                >
                  {promo.discount}
                </Badge>
              </div>
              
              {promo.description && (
                <p 
                  className="text-xs mt-1 mb-2" 
                  style={{ color: colors.text + 'CC' }}
                >
                  {promo.description}
                </p>
              )}
              
              <div className="flex justify-between items-center">
                {promo.valid_until && (
                  <p 
                    className="text-xs" 
                    style={{ color: colors.text + '80' }}
                  >
                    {t('Valid until')}: {promo.valid_until}
                  </p>
                )}
                
                {promo.code && (
                  <div 
                    className="text-xs px-2 py-1 rounded" 
                    style={{ 
                      backgroundColor: colors.accent,
                      color: colors.primary,
                      fontWeight: 'bold'
                    }}
                  >
                    {t('Code')}: {promo.code}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContactSection = (contactData: any) => {
    if (activeTab !== 'info') return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="flex items-center mb-4">
          <MapPin 
            size={18} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-lg font-semibold" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('Contact Us')}
          </h2>
        </div>
        
        <div className="space-y-3">
          {contactData.address && (
            <div 
              className="p-3 rounded-lg" 
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div className="flex">
                <MapPin 
                  size={16} 
                  className="mr-2 flex-shrink-0 mt-0.5" 
                  style={{ color: colors.primary }}
                />
                <div>
                  <p 
                    className="text-xs mb-1" 
                    style={{ color: colors.text + '80' }}
                  >
                    {t('ADDRESS')}
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
                      className="text-xs flex items-center mt-1"
                      style={{ color: colors.primary }}
                    >
                      {t('Get Directions')}
                      <ChevronRight size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-3">
            {(contactData.phone || data.phone) && (
              <div 
                className="p-3 rounded-lg" 
                style={{ 
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.borderColor}`
                }}
              >
                <div className="flex">
                  <Phone 
                    size={16} 
                    className="mr-2 flex-shrink-0" 
                    style={{ color: colors.primary }}
                  />
                  <div>
                    <p 
                      className="text-xs mb-1" 
                      style={{ color: colors.text + '80' }}
                    >
                      {t('PHONE')}
                    </p>
                    <a 
                      href={`tel:${contactData.phone || data.phone}`} 
                      className="text-sm" 
                      style={{ color: colors.primary }}
                    >
                      {contactData.phone || data.phone}
                    </a>
                  </div>
                </div>
              </div>
            )}
            
            {(contactData.email || data.email) && (
              <div 
                className="p-3 rounded-lg" 
                style={{ 
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.borderColor}`
                }}
              >
                <div className="flex">
                  <Mail 
                    size={16} 
                    className="mr-2 flex-shrink-0" 
                    style={{ color: colors.primary }}
                  />
                  <div>
                    <p 
                      className="text-xs mb-1" 
                      style={{ color: colors.text + '80' }}
                    >
                      {t('EMAIL')}
                    </p>
                    <a 
                      href={`mailto:${contactData.email || data.email}`} 
                      className="text-sm truncate block" 
                      style={{ color: colors.primary }}
                    >
                      {contactData.email || data.email}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderSocialSection = (socialData: any) => {
    const socialLinks = socialData.social_links || [];
    if (!Array.isArray(socialLinks) || socialLinks.length === 0) return null;
    if (activeTab !== 'info') return null;
    

    
    return (
      <div 
        className="px-5 py-4" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="flex items-center mb-3">
          <Instagram 
            size={18} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-base font-semibold" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('Follow Us')}
          </h2>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {socialLinks.map((link: any, index: number) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg flex flex-col items-center justify-center text-center"
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`,
                color: colors.primary
              }}
            >
              <SocialIcon platform={link.platform} color={colors.primary} />
              <span className="text-xs mt-1 capitalize">
                {link.platform}
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
    if (activeTab !== 'info') return null;
    
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
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Clock 
              size={18} 
              className="mr-2" 
              style={{ color: colors.primary }}
            />
            <h2 
              className="text-lg font-semibold" 
              style={{ 
                color: colors.text,
                fontFamily: font
              }}
            >
              {t('Salon Hours')}
            </h2>
          </div>
          
          {isOpenNow ? (
            <Badge 
              style={{ 
                backgroundColor: '#4CAF50',
                color: '#FFFFFF'
              }}
            >
              {t('Open Now')}
            </Badge>
          ) : (
            <Badge 
              style={{ 
                backgroundColor: '#F44336',
                color: '#FFFFFF'
              }}
            >
              {t('Closed Now')}
            </Badge>
          )}
        </div>
        
        <div 
          className="rounded-lg overflow-hidden" 
          style={{ 
            border: `1px solid ${colors.borderColor}`
          }}
        >
          {hours.map((hour: any, index: number) => (
            <div 
              key={index} 
              className="flex justify-between items-center p-3"
              style={{ 
                backgroundColor: hour.day === currentDay ? colors.accent : colors.cardBg,
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
                {hour.is_closed ? t('Closed') : `${hour.open_time} - ${hour.close_time}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };


  const renderVideosSection = (videosData: any) => {
    if (!Array.isArray(videoContent) || videoContent.length === 0) return null;
    if (activeTab !== 'gallery') return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ backgroundColor: colors.background }}
      >
        <div className="flex items-center mb-4">
          <Video 
            size={18} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h3 
            className="text-base font-semibold" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('Beauty Tutorials')}
          </h3>
        </div>
        
        <div className="space-y-4">
          {videoContent.map((video: any) => (
            <div 
              key={video.key} 
              className="rounded-lg overflow-hidden" 
              style={{ 
                backgroundColor: colors.cardBg,
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
                  <div className="relative w-full h-36">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title || 'Beauty tutorial'} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <div 
                        className="w-14 h-14 rounded-full flex items-center justify-center" 
                        style={{ backgroundColor: colors.primary }}
                      >
                        <Play className="w-7 h-7 ml-1 text-white" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-36 flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
                    <div className="text-center">
                      <Video className="w-10 h-10 mx-auto mb-2" style={{ color: colors.primary }} />
                      <span className="text-sm font-medium" style={{ color: colors.primary, fontFamily: font }}>{t('Beauty Tutorial')}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-3">
                <h4 className="font-medium text-sm mb-2" style={{ color: colors.text, fontFamily: font }}>
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
                  {video.service_type && (
                    <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: colors.primary + '20', color: colors.primary, fontFamily: font }}>
                      ✨ {video.service_type}
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
    if (activeTab !== 'gallery') return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ backgroundColor: colors.background }}
      >
        <div className="flex items-center mb-4">
          <Youtube 
            size={18} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h3 
            className="text-base font-semibold" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('YouTube Channel')}
          </h3>
        </div>
        
        <div 
          className="p-4 rounded-lg" 
          style={{ 
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.borderColor}`
          }}
        >
          <div className="flex items-center mb-3">
        
        {youtubeData.latest_video_embed && (
          <div className="mb-4 rounded-lg overflow-hidden" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.borderColor}` }}>
            <div className="p-3 mb-2">
              <h4 className="font-bold text-sm flex items-center" style={{ color: colors.text, fontFamily: font }}>
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
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mr-3">
              <Youtube className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm" style={{ color: colors.text, fontFamily: font }}>
                {youtubeData.channel_name || t('Beauty Channel')}
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
                variant="outline" 
                className="w-full" 
                style={{ 
                  borderColor: colors.primary, 
                  color: colors.primary, 
                  fontFamily: font 
                }}
                onClick={() => typeof window !== "undefined" && window.open(youtubeData.featured_playlist, '_blank', 'noopener,noreferrer')}
              >
                ✨ {t('BEAUTY TUTORIALS')}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderGallerySection = (galleryData: any) => {
    const photos = galleryData.photos || [];
    if (!Array.isArray(photos) || photos.length === 0) return null;
    if (activeTab !== 'gallery') return null;
    
    // Group photos by category
    const categories: Record<string, any[]> = {};
    photos.forEach(photo => {
      const category = photo.category || 'other';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(photo);
    });
    
    const getCategoryLabel = (category: string) => {
      const labels: Record<string, string> = {
        'salon': t('Our Salon'),
        'work': t('Our Work'),
        'products': t('Products'),
        'team': t('Our Team'),
        'other': t('Gallery')
      };
      return labels[category] || t('Gallery');
    };
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ backgroundColor: colors.background }}
      >
        {Object.keys(categories).map((category, index) => (
          <div 
            key={category} 
            className="mb-6"
            style={{ 
              borderBottom: index < Object.keys(categories).length - 1 ? `1px solid ${colors.borderColor}` : 'none',
              paddingBottom: index < Object.keys(categories).length - 1 ? '24px' : '0'
            }}
          >
            <div className="flex items-center mb-4">
              <Image 
                size={18} 
                className="mr-2" 
                style={{ color: colors.primary }}
              />
              <h3 
                className="text-base font-semibold" 
                style={{ 
                  color: colors.text,
                  fontFamily: font
                }}
              >
                {getCategoryLabel(category)}
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {categories[category].map((photo: any, idx: number) => (
                <div 
                  key={idx} 
                  className="relative rounded-lg overflow-hidden aspect-square"
                  style={{ 
                    border: `1px solid ${colors.borderColor}`
                  }}
                >
                  {photo.image ? (
                    <img 
                      src={photo.image} 
                      alt={photo.caption || `Gallery image ${idx + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: colors.accent }}
                    >
                      <Scissors size={24} style={{ color: colors.primary }} />
                    </div>
                  )}
                  
                  {photo.caption && (
                    <div 
                      className="absolute bottom-0 left-0 right-0 p-2 text-xs"
                      style={{ 
                        backgroundColor: 'rgba(0,0,0,0.6)',
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
        ))}
      </div>
    );
  };

  const renderTestimonialsSection = (testimonialsData: any) => {
    const reviews = testimonialsData.reviews || [];
    if (!Array.isArray(reviews) || reviews.length === 0) return null;
    if (activeTab !== 'info') return null;
    

    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.accent,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="flex items-center mb-4">
          <Star 
            size={18} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-lg font-semibold" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('Client Reviews')}
          </h2>
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
                    className="p-4 rounded-lg" 
                    style={{ 
                      backgroundColor: colors.background,
                      border: `1px solid ${colors.borderColor}`
                    }}
                  >
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          fill={i < parseInt(review.rating || 5) ? colors.highlightColor : 'transparent'} 
                          stroke={i < parseInt(review.rating || 5) ? colors.highlightColor : colors.borderColor}
                        />
                      ))}
                      
                      {review.service_received && (
                        <Badge 
                          className="ml-2 text-xs" 
                          style={{ 
                            backgroundColor: colors.primary + '30',
                            color: colors.primary
                          }}
                        >
                          {review.service_received}
                        </Badge>
                      )}
                    </div>
                    
                    <p 
                      className="text-sm italic mb-2" 
                      style={{ color: colors.text }}
                    >
                      "{review.review}"
                    </p>
                    
                    <p 
                      className="text-xs font-medium" 
                      style={{ color: colors.primary }}
                    >
                      - {review.client_name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {reviews.length > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {testimonialsData.reviews.map((_, dotIndex) => (
                <Heart
                  key={dotIndex}
                  size={12}
                  fill={currentReview === dotIndex ? colors.primary : 'transparent'}
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
    if (!appointmentsData.booking_url) return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.primary,
          color: colors.buttonText,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="text-center">
          <h2 
            className="text-xl font-bold mb-2" 
            style={{ 
              color: colors.buttonText,
              fontFamily: font
            }}
          >
            {appointmentsData.section_title || t('Ready for a New Look?')}
          </h2>
          
          <p 
            className="text-sm mb-4" 
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            {appointmentsData.section_description || t('Book your appointment today and let our specialists take care of you.')}
          </p>
          
          <Button
            size="lg"
            className="w-full"
            style={{ 
              backgroundColor: colors.background,
              color: colors.primary,
              fontFamily: font,
              fontWeight: 'bold'
            }}
            onClick={() => handleAppointmentBooking(configSections.appointments)}
          >
            <Calendar className="w-4 h-4 mr-2" />
            {appointmentsData.booking_text || t('Book an Appointment')}
          </Button>
          
          {appointmentsData.cancellation_policy && (
            <p 
              className="text-xs mt-3" 
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              {appointmentsData.cancellation_policy}
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderLocationSection = (locationData: any) => {
    if (!locationData.map_embed_url && !locationData.directions_url) return null;
    if (activeTab !== 'info') return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="flex items-center mb-4">
          <MapPin 
            size={18} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-lg font-semibold" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('Find Us')}
          </h2>
        </div>
        
        <div className="space-y-4">
          {locationData.map_embed_url && (
            <div 
              className="w-full h-40 rounded-lg overflow-hidden" 
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
              {t('Get Directions')}
            </Button>
          )}
        </div>
      </div>
    );
  };

  const renderAppDownloadSection = (appData: any) => {
    if (!appData.app_store_url && !appData.play_store_url) return null;
    if (activeTab !== 'info') return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="flex items-center mb-4">
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="mr-2"
            style={{ color: colors.primary }}
          >
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
            <line x1="12" y1="18" x2="12.01" y2="18"></line>
          </svg>
          <h2 
            className="text-lg font-semibold" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('Mobile App')}
          </h2>
        </div>
        
        {appData.app_description && (
          <p 
            className="text-sm mb-4" 
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
    );
  };

  const renderContactFormSection = (formData: any) => {
    if (!formData.form_title) return null;
    if (activeTab !== 'info') return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="flex items-center mb-4">
          <MessageSquare 
            size={18} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-lg font-semibold" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {formData.form_title}
          </h2>
        </div>
        
        {formData.form_description && (
          <p 
            className="text-sm mb-4" 
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
          {t('Send Message')}
        </Button>
      </div>
    );
  };

  const renderThankYouSection = (thankYouData: any) => {
    if (!thankYouData.message) return null;
    
    return (
      <div 
        className="px-5 py-4" 
        style={{ backgroundColor: colors.background }}
      >
        <p 
          className="text-xs text-center" 
          style={{ color: colors.text + '80' }}
        >
          {thankYouData.message}
        </p>
      </div>
    );
  };

  const renderCustomHtmlSection = (customHtmlData: any) => {
    if (!customHtmlData.html_content) return null;
    if (activeTab !== 'info') return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        {customHtmlData.show_title && customHtmlData.section_title && (
          <div className="flex items-center mb-4">
            <Heart 
              size={18} 
              className="mr-2" 
              style={{ color: colors.primary }}
            />
            <h2 
              className="text-lg font-semibold" 
              style={{ 
                color: colors.text,
                fontFamily: font
              }}
            >
              {customHtmlData.section_title}
            </h2>
          </div>
        )}
        <div 
          className="custom-html-content p-4 rounded-lg" 
          style={{ 
            backgroundColor: colors.cardBg,
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
                color: ${colors.secondary};
                text-decoration: underline;
              }
              .custom-html-content ul, .custom-html-content ol {
                color: ${colors.text};
                padding-left: 1rem;
                font-family: ${font};
              }
              .custom-html-content code {
                background-color: ${colors.accent};
                color: ${colors.primary};
                padding: 0.125rem 0.25rem;
                border-radius: 0.25rem;
                font-family: monospace;
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
    if (activeTab !== 'info') return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="flex items-center mb-4">
          <QrCode 
            size={18} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-lg font-semibold" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t("Share QR Code")}
          </h2>
        </div>
        <div className="text-center p-4 rounded-lg" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.borderColor}` }}>
          {qrData.qr_title && (
            <h4 className="font-medium text-base mb-2" style={{ color: colors.text, fontFamily: font }}>
              {qrData.qr_title}
            </h4>
          )}
          
          {qrData.qr_description && (
            <p className="text-sm mb-4" style={{ color: colors.text + 'CC', fontFamily: font }}>
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
            <QrCode className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
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
          style={{ color: colors.buttonText + '80' }}
        >
          {copyrightData.text}
        </p>
      </div>
    );
  };

  // Create a style object that will be applied to all text elements
  const globalStyle = {
    fontFamily: font
  };
  
  return (
    <div 
      className="w-full max-w-md mx-auto rounded-2xl overflow-hidden" 
      style={{ 
        fontFamily: font,
        background: colors.background,
        color: colors.text,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}
    >
      {renderHeaderSection(configSections.header || {})}
      
      {activeTab === 'services' && (
        <>
          {renderServicesSection(configSections.services || {})}
          {renderPromotionsSection(configSections.promotions || {})}
          {renderAppointmentsSection(configSections.appointments || {})}
        </>
      )}
      
      {activeTab === 'team' && (
        <>
          {renderSpecialistsSection(configSections.specialists || {})}
          {renderAppointmentsSection(configSections.appointments || {})}
        </>
      )}
      
      {activeTab === 'gallery' && (
        <>
          {renderVideosSection(configSections.videos || {})}
          {renderYouTubeSection(configSections.youtube || {})}
          {renderGallerySection(configSections.gallery || {})}
        </>
      )}
      
      {activeTab === 'info' && (
        <>
          {renderAboutSection(configSections.about || {})}
          {renderBusinessHoursSection(configSections.business_hours || {})}
          {renderContactSection(configSections.contact || {})}
          {renderLocationSection(configSections.google_map || {})}
          {renderSocialSection(configSections.social || {})}
          {renderTestimonialsSection(configSections.testimonials || {})}
          {renderAppDownloadSection(configSections.app_download || {})}
          {renderContactFormSection(configSections.contact_form || {})}
          {renderCustomHtmlSection(configSections.custom_html || {})}
          {renderQrShareSection(configSections.qr_share || {})}
        </>
      )}
      
      {/* Save Contact Button */}
      <div className="p-5 border-t" style={{ borderColor: colors.borderColor }}>
        <Button 
          className="w-full" 
          style={{ 
            backgroundColor: colors.primary,
            color: colors.buttonText,
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
          <User className="w-4 h-4 mr-2" />
          {t('Save Contact')}
        </Button>
      </div>
      
      {renderThankYouSection(configSections.thank_you || {})}
      {renderCopyrightSection(configSections.copyright || {})}
      
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