import { handleAppointmentBooking } from '../VCardPreview';
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ensureRequiredSections } from '@/utils/ensureRequiredSections';
import { useTranslation } from 'react-i18next';
import { VideoEmbed, extractVideoUrl } from '@/components/VideoEmbed';
import { createYouTubeEmbedRef } from '@/utils/youtubeEmbedUtils';
import { 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Github, 
  Facebook,
  Instagram,
  Youtube,
  Clock, 
  Calendar, 
  Star, 
  ChevronRight, 
  UserPlus,
  ExternalLink,
  Image as ImageIcon,
  MessageSquare,
  Code,
  Cloud,
  Database,
  Smartphone,
  Monitor,
  Shield,
  BarChart,
  Cpu,
  Zap,
  Settings,
  Users,
  TrendingUp,
  Clock3,
  CheckCircle2,
  ArrowRight,
  Award,
  Video,
  Play,
  Share2,
  QrCode
} from 'lucide-react';
import SocialIcon from '../../../link-bio-builder/components/SocialIcon';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionData } from '@/utils/sectionHelpers';
import { getSectionOrder } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';
import { sanitizeVideoData } from '@/utils/secureVideoUtils';
import languageData from '@/../../resources/lang/language.json';

interface TechStartupTemplateProps {
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

export default function TechStartupTemplate({ data, template }: TechStartupTemplateProps) {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [activePricingTab, setActivePricingTab] = useState<string>('1');
  
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
  const colors = configSections.colors || template?.defaultColors || { 
    primary: '#2563EB', 
    secondary: '#3B82F6', 
    accent: '#EFF6FF', 
    background: '#FFFFFF', 
    text: '#1E293B',
    cardBg: '#F8FAFC',
    borderColor: '#E2E8F0',
    buttonText: '#FFFFFF',
    highlightColor: '#38BDF8'
  };
  const font = configSections.font || template?.defaultFont || 'Inter, sans-serif';
  
  // Get all sections for this business type
  const allSections = getBusinessTemplate('tech-startup')?.sections || [];

  // Helper function to get icon component
  const getServiceIcon = (iconName: string, size: number = 20) => {
    switch(iconName) {
      case 'code': return <Code size={size} />;
      case 'cloud': return <Cloud size={size} />;
      case 'database': return <Database size={size} />;
      case 'mobile': return <Smartphone size={size} />;
      case 'desktop': return <Monitor size={size} />;
      case 'security': return <Shield size={size} />;
      case 'analytics': return <BarChart size={size} />;
      case 'ai': return <Cpu size={size} />;
      case 'zap': return <Zap size={size} />;
      case 'shield': return <Shield size={size} />;
      case 'settings': return <Settings size={size} />;
      case 'users': return <Users size={size} />;
      case 'trending-up': return <TrendingUp size={size} />;
      case 'smartphone': return <Smartphone size={size} />;
      case 'globe': return <Globe size={size} />;
      case 'clock': return <Clock3 size={size} />;
      default: return <Code size={size} />;
    }
  };

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
      case 'features':
        return renderFeaturesSection(sectionData);
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
      case 'pricing':
        return renderPricingSection(sectionData);
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
      {/* Modern Header with Gradient Background */}
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
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            }}
          >
            {/* Tech pattern overlay */}
            <div className="absolute inset-0 opacity-10" 
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>
        )}
        

        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
          {/* Logo */}
          {headerData.logo && (
            <div className="mb-4">
              <div 
                className="w-16 h-16 rounded-lg overflow-hidden shadow-lg mx-auto" 
                style={{ 
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
          
          {/* Company Name and Tagline */}
          <h1 
            className="text-3xl font-bold mb-2" 
            style={{ 
              color: colors.background,
              fontFamily: font
            }}
          >
            {headerData.name || data.name || t('NexaTech')}
          </h1>
          
          {headerData.tagline && (
            <p 
              className="text-lg font-medium mb-6" 
              style={{ 
                color: colors.background + 'E6'
              }}
            >
              {headerData.tagline}
            </p>
          )}
          
          {/* CTA Button */}
          {headerData.cta_text && (
            <Button
              className="px-6 py-2 font-medium shadow-lg"
              style={{ 
                backgroundColor: colors.background,
                color: colors.primary
              }}
              onClick={() => {
                if (headerData.cta_url && headerData.cta_url.startsWith('#')) {
                  const sectionId = headerData.cta_url.substring(1);
                  const element = typeof document !== "undefined" && document.getElementById(sectionId);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                } else if (headerData.cta_url) {
                  typeof window !== "undefined" && window.open(headerData.cta_url, "_blank", "noopener,noreferrer");
                }
              }}
            >
              {headerData.cta_text}
            </Button>
          )}
        </div>
      </div>
      
      {/* Quick Action Buttons */}
      <div 
        className="px-5 py-3 flex justify-center space-x-4 shadow-md"
        style={{ backgroundColor: colors.background }}
      >
        {configSections.contact?.phone && (
          <a 
            href={`tel:${configSections.contact?.phone}`} 
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
            style={{ 
              backgroundColor: colors.accent,
              color: colors.primary
            }}
          >
            <Phone size={18} />
          </a>
        )}
        
        {configSections.contact?.email && (
          <a 
            href={`mailto:${configSections.contact?.email}`} 
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
            style={{ 
              backgroundColor: colors.accent,
              color: colors.primary
            }}
          >
            <Mail size={18} />
          </a>
        )}
        
        {configSections.contact?.address && (
          <a 
            href={configSections.google_map?.directions_url || `https://maps.google.com/?q=${encodeURIComponent(configSections.contact?.address)}`} 
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
            style={{ 
              backgroundColor: colors.accent,
              color: colors.primary
            }}
          >
            <MapPin size={18} />
          </a>
        )}
        
        <button 
          onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
          className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
          style={{ 
            backgroundColor: colors.accent,
            color: colors.primary
          }}
        >
          <MessageSquare size={18} />
        </button>
        
        {/* Language Selector beside Chat button */}
        {configSections.language && (
          <div className="relative">
            <button
              onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
              style={{ 
                backgroundColor: colors.accent,
                color: colors.primary
              }}
            >
              <span className="text-sm">{String.fromCodePoint(...(languageData.find(lang => lang.code === currentLanguage)?.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt()) || []))}</span>
            </button>
            
            {showLanguageSelector && (
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl border py-2 min-w-[150px] max-h-48 overflow-y-auto z-[999999]" style={{ borderColor: colors.borderColor }}>
                {languageData.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center space-x-2 ${
                      currentLanguage === lang.code ? 'font-semibold' : ''
                    }`}
                    style={{
                      backgroundColor: currentLanguage === lang.code ? colors.accent : 'transparent',
                      color: currentLanguage === lang.code ? colors.primary : colors.text
                    }}
                  >
                    <span className="text-base">{String.fromCodePoint(...lang.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt()))}</span>
                    <span>{lang.name}</span>
                    {currentLanguage === lang.code && <Code size={12} style={{ color: colors.primary }} />}
                  </button>
                ))}
              </div>
            )}
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
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('About Us')}
          </h2>
          <div 
            className="w-16 h-1 mx-auto rounded-full" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <p 
          className="text-base leading-relaxed mb-6" 
          style={{ color: colors.text }}
        >
          {aboutData.description || data.description}
        </p>
        
        <div className="flex justify-center space-x-8">
          {aboutData.year_founded && (
            <div className="text-center">
              <p 
                className="text-sm font-medium" 
                style={{ color: colors.text + '80' }}
              >
                {t('FOUNDED')}
              </p>
              <p 
                className="text-xl font-bold" 
                style={{ color: colors.primary }}
              >
                {aboutData.year_founded}
              </p>
            </div>
          )}
          
          {aboutData.company_size && (
            <div className="text-center">
              <p 
                className="text-sm font-medium" 
                style={{ color: colors.text + '80' }}
              >
                {t('TEAM SIZE')}
              </p>
              <p 
                className="text-xl capitalize" 
                style={{ color: colors.primary }}
              >
                {aboutData.company_size.replace('_', ' ')}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderServicesSection = (servicesData: any) => {
    const offerings = servicesData.offerings || [];
    if (!Array.isArray(offerings) || offerings.length === 0) return null;
    
    return (
      <div 
        className="px-5 py-8" 
        style={{ 
          backgroundColor: colors.cardBg
        }}
        id="services"
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('Our Services')}
          </h2>
          <div 
            className="w-16 h-1 mx-auto rounded-full" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 mt-6">
          {offerings.map((service: any, index: number) => (
            <div 
              key={index} 
              className="p-5 rounded-lg shadow-md" 
              style={{ 
                backgroundColor: colors.background
              }}
            >
              <div className="flex items-start">
                {/* Service Image or Icon */}
                <div className="mr-4 flex-shrink-0">
                  {service.image ? (
                    <img 
                      src={service.image} 
                      alt={service.name || 'Service'} 
                      className="w-16 h-16 rounded-lg object-cover"
                      style={{ border: `1px solid ${colors.borderColor}` }}
                    />
                  ) : (
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ 
                        backgroundColor: colors.accent,
                        color: colors.primary
                      }}
                    >
                      {getServiceIcon(service.icon)}
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 
                    className="text-lg font-bold mb-2" 
                    style={{ 
                      color: colors.text,
                      fontFamily: font
                    }}
                  >
                    {service.name}
                  </h3>
                  
                  <p 
                    className="text-sm mb-3" 
                    style={{ color: colors.text + 'CC' }}
                  >
                    {service.description}
                  </p>
                  
                  {service.link && (
                    <a 
                      href={service.link}
                      className="text-sm font-medium flex items-center"
                      style={{ color: colors.primary }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('Learn More')}
                      <ChevronRight size={16} className="ml-1" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderFeaturesSection = (featuresData: any) => {
    const features = featuresData.feature_list || [];
    if (!Array.isArray(features) || features.length === 0) return null;
    
    return (
      <div 
        className="px-5 py-8" 
        style={{ 
          backgroundColor: colors.background
        }}
        id="features"
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('Key Features')}
          </h2>
          <div 
            className="w-16 h-1 mx-auto rounded-full" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          {features.map((feature: any, index: number) => (
            <div 
              key={index} 
              className="p-4 rounded-lg text-center" 
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              {/* Feature Image or Icon */}
              <div className="mb-3">
                {feature.image ? (
                  <img 
                    src={feature.image} 
                    alt={feature.title || 'Feature'} 
                    className="w-16 h-16 rounded-lg object-cover mx-auto"
                    style={{ border: `1px solid ${colors.borderColor}` }}
                  />
                ) : (
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto"
                    style={{ 
                      backgroundColor: colors.accent,
                      color: colors.primary
                    }}
                  >
                    {getServiceIcon(feature.icon)}
                  </div>
                )}
              </div>
              
              <h3 
                className="text-base font-bold mb-2" 
                style={{ 
                  color: colors.text,
                  fontFamily: font
                }}
              >
                {feature.title}
              </h3>
              
              <p 
                className="text-xs" 
                style={{ color: colors.text + 'CC' }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderVideosSection = (videosData: any) => {
    const videos = videosData.video_list || [];
    if (!Array.isArray(videos) || videos.length === 0) return null;
    
    const videoContent = videos.map((video: any, index: number) => {
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
    
    return (
      <div 
        className="px-5 py-8" 
        style={{ 
          backgroundColor: colors.cardBg
        }}
        id="videos"
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('Product Videos')}
          </h2>
          <div 
            className="w-16 h-1 mx-auto rounded-full" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div className="space-y-4">
          {videoContent.map((video: any) => (
            <div 
              key={video.key} 
              className="rounded-lg overflow-hidden shadow-md" 
              style={{ 
                backgroundColor: colors.background,
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
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center" 
                        style={{ backgroundColor: colors.primary }}
                      >
                        <Play className="w-8 h-8 ml-1 text-white" />
                      </div>
                    </div>
                    {video.duration && (
                      <div className="absolute bottom-2 right-2 px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: 'rgba(0,0,0,0.8)', color: 'white' }}>
                        {video.duration}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-48 flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
                    <div className="text-center">
                      <Video className="w-12 h-12 mx-auto mb-2" style={{ color: colors.primary }} />
                      <span className="text-sm font-medium" style={{ color: colors.primary, fontFamily: font }}>{t('Product Demo')}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2" style={{ color: colors.text, fontFamily: font }}>
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
                      className="text-xs px-2 py-1 rounded font-medium" 
                      style={{ 
                        backgroundColor: colors.accent,
                        color: colors.primary,
                        fontFamily: font
                      }}
                    >
                      {video.video_type.replace('_', ' ').toUpperCase()}
                    </span>
                  )}
                  {video.tech_stack && (
                    <span className="text-xs" style={{ color: colors.text + '80', fontFamily: font }}>
                      💻 {video.tech_stack}
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
      <div 
        className="px-5 py-8" 
        style={{ 
          backgroundColor: colors.background
        }}
        id="youtube"
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('YouTube Channel')}
          </h2>
          <div 
            className="w-16 h-1 mx-auto rounded-full" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        {youtubeData.latest_video_embed && (
          <div className="mb-6 rounded-lg overflow-hidden" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.borderColor}` }}>
            <div className="p-4 mb-2">
              <h4 className="font-bold text-lg flex items-center" style={{ color: colors.text, fontFamily: font }}>
                <Play className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
                {t("Latest Video")}
              </h4>
            </div>
            <div className="w-full relative overflow-hidden" style={{ paddingBottom: '56.25%', height: 0 }}>
              <div 
                className="absolute inset-0 w-full h-full"
                ref={createYouTubeEmbedRef(
                  youtubeData.latest_video_embed,
                  { colors, font },
                  'Latest Tech Video'
                )}
              />
            </div>
          </div>
        )}
        
        <div 
          className="p-6 rounded-lg shadow-md" 
          style={{ 
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.borderColor}`
          }}
        >
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-lg bg-red-600 flex items-center justify-center mr-4">
              <Youtube className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg" style={{ color: colors.text, fontFamily: font }}>
                {youtubeData.channel_name || t('Tech Channel')}
              </h3>
              {youtubeData.subscriber_count && (
                <p className="text-sm font-medium" style={{ color: colors.primary, fontFamily: font }}>
                  📊 {youtubeData.subscriber_count} {t("subscribers")}
                </p>
              )}
            </div>
          </div>
          
          {youtubeData.channel_description && (
            <p className="text-sm mb-4" style={{ color: colors.text, fontFamily: font }}>
              {youtubeData.channel_description}
            </p>
          )}
          
          <div className="space-y-3">
            {youtubeData.channel_url && (
              <Button 
                className="w-full py-3 font-bold" 
                style={{ 
                  backgroundColor: '#FF0000', 
                  color: 'white',
                  fontFamily: font 
                }}
                onClick={() => typeof window !== "undefined" && window.open(youtubeData.channel_url, '_blank', 'noopener,noreferrer')}
              >
                <Youtube className="w-5 h-5 mr-2" />
                {t('SUBSCRIBE TO CHANNEL')}
              </Button>
            )}
            {youtubeData.featured_playlist && (
              <Button 
                variant="outline" 
                className="w-full py-3 font-bold" 
                style={{ 
                  borderColor: colors.primary, 
                  color: colors.primary, 
                  fontFamily: font 
                }}
                onClick={() => typeof window !== "undefined" && window.open(youtubeData.featured_playlist, '_blank', 'noopener,noreferrer')}
              >
                📺 {t('TECH TUTORIALS')}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderContactSection = (contactData: any) => (
    <div 
      className="px-5 py-8" 
      style={{ 
        backgroundColor: colors.cardBg
      }}
      id="contact"
    >
      <div className="text-center mb-6">
        <h2 
          className="text-2xl font-bold mb-2" 
          style={{ 
            color: colors.text,
            fontFamily: font
          }}
        >
          {t("Contact Us")}
        </h2>
        <div 
          className="w-16 h-1 mx-auto rounded-full" 
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
                  {t('ADDRESS')}
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
                    className="text-sm font-medium" 
                    style={{ color: colors.primary }}
                  >
                    {t('PHONE')}
                  </p>
                  <a 
                    href={`tel:${contactData.phone || data.phone}`} 
                    className="text-base" 
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
                    className="text-sm font-medium" 
                    style={{ color: colors.primary }}
                  >
                    {t('EMAIL')}
                  </p>
                  <a 
                    href={`mailto:${contactData.email || data.email}`} 
                    className="text-base truncate block" 
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
          backgroundColor: colors.background,
          borderTop: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="flex flex-wrap justify-center gap-3">
          {socialLinks.map((link: any, index: number) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm transition-transform hover:scale-110"
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
        className="px-5 py-8" 
        style={{ 
          backgroundColor: colors.background
        }}
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('Office Hours')}
          </h2>
          <div 
            className="w-16 h-1 mx-auto rounded-full" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div 
          className="p-4 rounded-lg" 
          style={{ 
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.borderColor}`
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <p 
              className="text-sm font-medium" 
              style={{ color: colors.text }}
            >
              {t('Current Status')}
            </p>
            
            {isOpenNow ? (
              <Badge 
                style={{ 
                  backgroundColor: '#10B981',
                  color: '#FFFFFF'
                }}
              >
                {t('Open Now')}
              </Badge>
            ) : (
              <Badge 
                style={{ 
                  backgroundColor: '#EF4444',
                  color: '#FFFFFF'
                }}
              >
                {t('Closed Now')}
              </Badge>
            )}
          </div>
          
          <div className="space-y-2">
            {hours.map((hour: any, index: number) => (
              <div 
                key={index} 
                className="flex justify-between items-center py-2"
                style={{ 
                  borderBottom: index < hours.length - 1 ? `1px solid ${colors.borderColor}` : 'none'
                }}
              >
                <div className="flex items-center">
                  <span 
                    className="capitalize text-sm font-medium" 
                    style={{ 
                      color: hour.day === currentDay ? colors.primary : colors.text,
                      fontWeight: hour.day === currentDay ? 'bold' : 'normal'
                    }}
                  >
                    {hour.day}
                  </span>
                  
                  {hour.is_remote && (
                    <Badge 
                      className="ml-2 text-xs" 
                      style={{ 
                        backgroundColor: colors.accent,
                        color: colors.primary
                      }}
                    >
                      {t('Remote')}
                    </Badge>
                  )}
                </div>
                
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
          backgroundColor: colors.cardBg
        }}
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('Gallery')}
          </h2>
          <div 
            className="w-16 h-1 mx-auto rounded-full" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {photos.map((photo: any, index: number) => (
            <div 
              key={index} 
              className="relative rounded-lg overflow-hidden aspect-square shadow-md"
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
                  <Code size={24} style={{ color: colors.primary }} />
                </div>
              )}
              
              {photo.caption && (
                <div 
                  className="absolute bottom-0 left-0 right-0 p-2 text-xs"
                  style={{ 
                    backgroundColor: 'rgba(0,0,0,0.7)',
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
          backgroundColor: colors.background
        }}
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('Client Testimonials')}
          </h2>
          <div 
            className="w-16 h-1 mx-auto rounded-full" 
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
                      backgroundColor: colors.cardBg,
                      borderLeft: `4px solid ${colors.primary}`
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
                      className="text-sm italic mb-4" 
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
                          style={{ backgroundColor: colors.accent }}
                        >
                          <Users size={16} style={{ color: colors.primary }} />
                        </div>
                      )}
                      
                      <div>
                        <p 
                          className="text-sm font-bold" 
                          style={{ color: colors.text }}
                        >
                          {review.client_name}
                        </p>
                        
                        {(review.position || review.company) && (
                          <p 
                            className="text-xs" 
                            style={{ color: colors.text + '99' }}
                          >
                            {review.position}{review.position && review.company ? ', ' : ''}{review.company}
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
                <div
                  key={index}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    backgroundColor: currentReview === index ? colors.primary : colors.primary + '40'
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
    if (!appointmentsData.booking_url) return null;
    
    return (
      <div 
        className="px-5 py-8" 
        style={{ 
          backgroundColor: colors.cardBg
        }}
        id="demo"
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('Request a Demo')}
          </h2>
          <div 
            className="w-16 h-1 mx-auto rounded-full" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div 
          className="p-5 rounded-lg shadow-md" 
          style={{ 
            backgroundColor: colors.background
          }}
        >
          {appointmentsData.demo_description && (
            <p 
              className="text-sm mb-4" 
              style={{ color: colors.text }}
            >
              {appointmentsData.demo_description}
            </p>
          )}
          
          {appointmentsData.demo_length && (
            <div 
              className="flex items-center mb-4 p-3 rounded-lg" 
              style={{ backgroundColor: colors.accent }}
            >
              <Clock3 size={18} className="mr-2" style={{ color: colors.primary }} />
              <p 
                className="text-sm font-medium" 
                style={{ color: colors.primary }}
              >
                {t('Demo Duration')}: {appointmentsData.demo_length}
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
            {appointmentsData.booking_text || t('Schedule a Demo')}
          </Button>
        </div>
      </div>
    );
  };

  const renderTeamSection = (teamData: any) => {
    const members = teamData.members || [];
    if (!Array.isArray(members) || members.length === 0) return null;
    
    return (
      <div 
        className="px-5 py-8" 
        style={{ 
          backgroundColor: colors.background
        }}
        id="team"
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('Our Team')}
          </h2>
          <div 
            className="w-16 h-1 mx-auto rounded-full" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {members.map((member: any, index: number) => (
            <div 
              key={index} 
              className="p-4 rounded-lg text-center" 
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              {member.image ? (
                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div 
                  className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: colors.accent }}
                >
                  <Users size={20} style={{ color: colors.primary }} />
                </div>
              )}
              
              <h3 
                className="text-base font-bold mb-1" 
                style={{ 
                  color: colors.text,
                  fontFamily: font
                }}
              >
                {member.name}
              </h3>
              
              {member.title && (
                <p 
                  className="text-xs mb-2" 
                  style={{ color: colors.primary }}
                >
                  {member.title}
                </p>
              )}
              
              {member.bio && (
                <p 
                  className="text-xs mb-2" 
                  style={{ color: colors.text + 'CC' }}
                >
                  {member.bio}
                </p>
              )}
              
              {member.linkedin && (
                <a 
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full"
                  style={{ 
                    backgroundColor: colors.primary,
                    color: '#FFFFFF'
                  }}
                >
                  <Linkedin size={14} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPricingSection = (pricingData: any) => {
    const plans = pricingData.plans || [];
    if (!Array.isArray(plans) || plans.length === 0) return null;
    
    // Set active tab to the popular plan if available
    React.useEffect(() => {
      const popularPlanIndex = plans.findIndex(plan => plan.is_popular);
      if (popularPlanIndex !== -1) {
        setActivePricingTab(popularPlanIndex.toString());
      }
    }, [plans]);
    
    return (
      <div 
        className="px-5 py-8" 
        style={{ 
          backgroundColor: colors.cardBg
        }}
        id="pricing"
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('Pricing Plans')}
          </h2>
          <div 
            className="w-16 h-1 mx-auto rounded-full" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        {/* Plan tabs */}
        <div className="flex justify-center mb-4">
          {plans.map((plan: any, index: number) => (
            <button
              key={index}
              className="px-4 py-2 text-sm font-medium relative"
              style={{ 
                color: activePricingTab === index.toString() ? colors.primary : colors.text + '99',
                borderBottom: `2px solid ${activePricingTab === index.toString() ? colors.primary : 'transparent'}`
              }}
              onClick={() => setActivePricingTab(index.toString())}
            >
              {plan.name}
              {plan.is_popular && (
                <span 
                  className="absolute -top-2 -right-2 px-1 py-0.5 text-xs rounded font-medium"
                  style={{ 
                    backgroundColor: colors.primary,
                    color: '#FFFFFF'
                  }}
                >
                  {t('Popular')}
                </span>
              )}
            </button>
          ))}
        </div>
        
        {/* Plan details */}
        {plans.map((plan: any, index: number) => (
          <div 
            key={index} 
            className={`p-5 rounded-lg shadow-md ${activePricingTab === index.toString() ? 'block' : 'hidden'}`}
            style={{ 
              backgroundColor: colors.background,
              border: plan.is_popular ? `2px solid ${colors.primary}` : `1px solid ${colors.borderColor}`
            }}
          >
            <div className="text-center mb-4">
              <h3 
                className="text-xl font-bold mb-2" 
                style={{ 
                  color: colors.text,
                  fontFamily: font
                }}
              >
                {plan.name}
              </h3>
              
              <div className="mb-2">
                <span 
                  className="text-3xl font-extrabold" 
                  style={{ color: colors.primary }}
                >
                  {plan.price}
                </span>
                {plan.billing_period && plan.billing_period !== 'custom' && (
                  <span 
                    className="text-sm" 
                    style={{ color: colors.text + '99' }}
                  >
                    {' '}/{plan.billing_period}
                  </span>
                )}
              </div>
              
              {plan.description && (
                <p 
                  className="text-sm mb-4" 
                  style={{ color: colors.text + 'CC' }}
                >
                  {plan.description}
                </p>
              )}
            </div>
            
            {plan.features && (
              <div className="mb-5">
                <ul className="space-y-2">
                  {plan.features.split('\n').map((feature: string, i: number) => (
                    <li key={i} className="flex items-start">
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
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <Button
              className="w-full"
              style={{ 
                backgroundColor: plan.is_popular ? colors.primary : 'transparent',
                color: plan.is_popular ? colors.buttonText : colors.primary,
                border: `1px solid ${colors.primary}`,
                fontFamily: font
              }}
              onClick={() => {
                if (plan.cta_url && plan.cta_url.startsWith('#')) {
                  const sectionId = plan.cta_url.substring(1);
                  const element = typeof document !== "undefined" && document.getElementById(sectionId);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                } else if (plan.cta_url) {
                  typeof window !== "undefined" && window.open(plan.cta_url, "_blank", "noopener,noreferrer");
                } else {
                  typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'));
                }
              }}
            >
              {plan.cta_text || t('Get Started')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        ))}
      </div>
    );
  };

  const renderLocationSection = (locationData: any) => {
    if (!locationData.directions_url) return null;
    
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
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('Our Location')}
          </h2>
          <div 
            className="w-16 h-1 mx-auto rounded-full" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div className="space-y-3">
          {locationData.map_embed_url && (
            <div className="rounded-lg overflow-hidden shadow-md" style={{ height: '200px' }}>
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
    
    return (
      <div 
        className="px-5 py-8" 
        style={{ 
          backgroundColor: colors.cardBg
        }}
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('Mobile App')}
          </h2>
          <div 
            className="w-16 h-1 mx-auto rounded-full" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div 
          className="p-5 rounded-lg shadow-md" 
          style={{ backgroundColor: colors.background }}
        >
          <div className="flex flex-col md:flex-row">
            {appData.app_image && (
              <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-4">
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img 
                    src={appData.app_image} 
                    alt="App Screenshot" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            )}
            
            <div className="w-full md:w-2/3">
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
                    {t('Features')}:
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
              
              <div className="flex gap-2">
                {appData.app_store_url && (
                  <Button 
                    variant="outline" 
                    className="flex-1"
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
                    className="flex-1"
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
          backgroundColor: colors.background
        }}
        id="contact_form"
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.text,
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
          {t('Contact Us')}
        </Button>
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
        style={{ backgroundColor: colors.cardBg }}
        id="qr_share"
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {qrData.section_title || t('Share & Connect')}
          </h2>
          <div 
            className="w-16 h-1 mx-auto rounded-full" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div 
          className="p-6 rounded-lg shadow-md text-center" 
          style={{ backgroundColor: colors.background }}
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

  const renderThankYouSection = (thankYouData: any) => {
    if (!thankYouData.message) return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ backgroundColor: colors.cardBg }}
      >
        <p 
          className="text-sm text-center" 
          style={{ color: colors.text + '99' }}
        >
          {thankYouData.message}
        </p>
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
          style={{ color: '#FFFFFF' }}
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