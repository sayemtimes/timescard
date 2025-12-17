import { handleAppointmentBooking } from '../VCardPreview';
import React, { useState } from 'react';
import StableHtmlContent from '@/components/StableHtmlContent';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ensureRequiredSections } from '@/utils/ensureRequiredSections';
import { VideoEmbed, extractVideoUrl } from '@/components/VideoEmbed';
import { createYouTubeEmbedRef } from '@/utils/youtubeEmbedUtils';
import { useTranslation } from 'react-i18next';
import { sanitizeVideoData, sanitizePath } from '@/utils/secureVideoUtils';
import languageData from '@/../../resources/lang/language.json';
import { 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Calendar, 
  Clock, 
  Heart,
  Star,
  ChevronRight,
  MessageSquare,
  Image,
  PartyPopper,
  Users,
  Briefcase,
  Cake,
  Music,
  Sparkles,
  Facebook,
  Instagram,
  User,
  Download,
  Video,
  Play,
  Youtube,
  QrCode
} from 'lucide-react';
import SocialIcon from '../../../link-bio-builder/components/SocialIcon';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionOrder } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';

interface EventPlannerTemplateProps {
  data: any;
  template: any;
}

export default function EventPlannerTemplate({ data, template }: EventPlannerTemplateProps) {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('about');
  const [activeEvent, setActiveEvent] = useState<number | null>(null);
  
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
  const [currentLanguage, setCurrentLanguage] = React.useState(configSections.language?.template_language || i18n.language || 'en');

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
    primary: '#9C27B0', 
    secondary: '#E1BEE7', 
    accent: '#F3E5F5', 
    background: '#FFFFFF', 
    text: '#333333',
    cardBg: '#FAFAFA',
    borderColor: '#EEEEEE',
    buttonText: '#FFFFFF'
  };
  const font = configSections.font || template?.defaultFont || 'Montserrat, sans-serif';

  // Get all sections for this business type
  const allSections = getBusinessTemplate('eventplanner')?.sections || [];

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
      
      const sanitizedVideo = sanitizeVideoData(video);
      const videoData = sanitizedVideo?.embed_url ? extractVideoUrl(sanitizedVideo.embed_url) : null;
      return {
        ...sanitizedVideo,
        videoData,
        key: `video-${index}-${sanitizedVideo?.title || ''}-${sanitizedVideo?.embed_url || ''}`
      };
    });
  }, [configSections.videos?.video_list]);
  
  const renderHeaderSection = (headerData: any) => (
    <div className="relative">
      {/* Cover Image with Overlay */}
      <div className="relative h-64 overflow-hidden">
        {headerData.cover_image ? (
          <img 
            src={headerData.cover_image} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div 
            className="w-full h-full" 
            style={{ 
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
              opacity: 0.9
            }}
          ></div>
        )}
        
        {/* Language Selector - Top Right */}
        {configSections.language && (
          <div className="absolute top-4 right-4">
            <div className="relative z-50">
              <button
                onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-sm flex items-center justify-center"
                style={{ 
                  border: `1px solid ${colors.borderColor}`,
                  color: colors.text
                }}
              >
                <span className="text-sm">
                  {String.fromCodePoint(...(languageData.find(lang => lang.code === currentLanguage)?.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt()) || [127468, 127463]))}
                </span>
              </button>
              
              {showLanguageSelector && (
                <>
                  <div 
                    className="fixed inset-0" 
                    style={{ zIndex: 40 }}
                    onClick={() => setShowLanguageSelector(false)}
                  />
                  <div 
                    className="fixed inset-0" 
                    style={{ zIndex: 40 }}
                    onClick={() => setShowLanguageSelector(false)}
                  />
                  <div 
                    className="absolute right-0 top-full mt-1 rounded border shadow-xl py-1 w-40 max-h-60 overflow-y-auto"
                    style={{
                      backgroundColor: colors.background,
                      borderColor: colors.borderColor,
                      zIndex: 50
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
          </div>
        )}
        
        {/* Overlay with Logo and Name */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-6" 
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
        >
          {headerData.logo ? (
            <img 
              src={headerData.logo} 
              alt={headerData.name} 
              className="h-24 mb-4 object-contain"
            />
          ) : (
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center mb-4" 
              style={{ 
                backgroundColor: colors.primary,
                color: colors.buttonText
              }}
            >
              <PartyPopper size={32} />
            </div>
          )}
          
          <h1 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: '#FFFFFF',
              fontFamily: font,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            {headerData.name || data.name || 'Stellar Events'}
          </h1>

          {/* Save Contact Button */}
          <Button
            size="sm"
            className="mt-4"
            style={{ 
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: '#FFFFFF',
              fontFamily: font,
              backdropFilter: 'blur(10px)'
            }}
            onClick={() => {
              const businessData = {
                name: sanitizePath(headerData.name || data.name || ''),
                title: sanitizePath(headerData.tagline || ''),
                email: sanitizePath(configSections.contact?.email || data.email || ''),
                phone: sanitizePath(configSections.contact?.phone || data.phone || ''),
                website: sanitizePath(configSections.contact?.website || ''),
                location: sanitizePath(configSections.contact?.address || '')
              };
              import('@/utils/vcfGenerator').then(module => {
                module.downloadVCF(businessData);
              });
            }}
          >
            <User size={14} className="mr-2" />
            {t("Save Contact")}
          </Button>
          
          {headerData.tagline && (
            <p 
              className="text-sm italic" 
              style={{ 
                color: '#FFFFFF',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              {headerData.tagline}
            </p>
          )}
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
          label="About" 
          active={activeTab === 'about'} 
          onClick={() => setActiveTab('about')} 
          colors={colors}
          font={font}
        />
        <TabButton 
          label="Services" 
          active={activeTab === 'services'} 
          onClick={() => setActiveTab('services')} 
          colors={colors}
          font={font}
        />
        <TabButton 
          label="Portfolio" 
          active={activeTab === 'portfolio'} 
          onClick={() => setActiveTab('portfolio')} 
          colors={colors}
          font={font}
        />
        <TabButton 
          label="Contact" 
          active={activeTab === 'contact'} 
          onClick={() => setActiveTab('contact')} 
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
    if (activeTab !== 'about') return null;
    if (!aboutData.description && !data.description) return null;
  return (
      <div className="p-5">
        <h2 
          className="text-xl font-bold mb-4 text-center" 
          style={{ 
            color: colors.primary,
            fontFamily: font
          }}
        >
          {t("About Us")}
        </h2>
        
        <p 
          className="text-sm leading-relaxed mb-6" 
          style={{ color: colors.text }}
        >
          {aboutData.description || data.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          {aboutData.year_established && (
            <div 
              className="p-4 rounded-lg text-center" 
              style={{ 
                backgroundColor: colors.accent,
                border: `1px solid ${colors.secondary}`
              }}
            >
              <p 
                className="text-xs mb-1" 
                style={{ color: colors.text + '80' }}
              >
                {t("ESTABLISHED")}
              </p>
              <p 
                className="text-xl font-bold" 
                style={{ color: colors.primary }}
              >
                {aboutData.year_established}
              </p>
            </div>
          )}
          
          {aboutData.events_completed && (
            <div 
              className="p-4 rounded-lg text-center" 
              style={{ 
                backgroundColor: colors.accent,
                border: `1px solid ${colors.secondary}`
              }}
            >
              <p 
                className="text-xs mb-1" 
                style={{ color: colors.text + '80' }}
              >
                {t("EVENTS COMPLETED")}
              </p>
              <p 
                className="text-xl font-bold" 
                style={{ color: colors.primary }}
              >
                {aboutData.events_completed}+
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
          onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          {t("Contact Us")}
        </Button>
      </div>
    );
  };
  
  const renderServicesSection = (servicesData: any) => {
    if (activeTab !== 'services') return null;
    
    const services = servicesData.service_list || [];
    if (!Array.isArray(services) || services.length === 0) return null;
    
    const getServiceIcon = (iconName: string) => {
      switch(iconName) {
        case 'wedding': return <Heart size={24} />;
        case 'corporate': return <Briefcase size={24} />;
        case 'birthday': return <Cake size={24} />;
        case 'social': return <Users size={24} />;
        case 'conference': return <Users size={24} />;
        case 'concert': return <Music size={24} />;
        case 'festival': return <PartyPopper size={24} />;
        case 'graduation': return <Users size={24} />;
        default: return <Sparkles size={24} />;
      }
    };
    
    return (
      <div className="p-5">
        <h2 
          className="text-xl font-bold mb-4 text-center" 
          style={{ 
            color: colors.primary,
            fontFamily: font
          }}
        >
          {t("Our Services")}
        </h2>
        
        <div className="space-y-4">
          {services.map((service: any, index: number) => (
            <div 
              key={index} 
              className="p-4 rounded-lg" 
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div className="flex items-start">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0" 
                  style={{ 
                    backgroundColor: colors.accent,
                    color: colors.primary
                  }}
                >
                  {getServiceIcon(service.icon)}
                </div>
                
                <div>
                  <h3 
                    className="text-base font-bold mb-1" 
                    style={{ 
                      color: colors.primary,
                      fontFamily: font
                    }}
                  >
                    {service.title}
                  </h3>
                  
                  {service.description && (
                    <p 
                      className="text-xs" 
                      style={{ color: colors.text + 'CC' }}
                    >
                      {service.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
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
            {t("Schedule a Consultation")}
          </Button>
        </div>
      </div>
    );
  };
  
  const renderPortfolioSection = (portfolioData: any) => {
    if (activeTab !== 'portfolio') return null;
    
    const events = portfolioData.events || [];
    if (!Array.isArray(events) || events.length === 0) return null;
    
    const getCategoryBadge = (category: string) => {
      const categories: Record<string, { bg: string, text: string }> = {
        'wedding': { bg: '#FFF0F5', text: '#D81B60' },
        'corporate': { bg: '#E8EAF6', text: '#3949AB' },
        'birthday': { bg: '#E0F7FA', text: '#00ACC1' },
        'social': { bg: '#F3E5F5', text: '#8E24AA' },
        'conference': { bg: '#E8F5E9', text: '#43A047' },
        'concert': { bg: '#FFF3E0', text: '#FB8C00' },
        'festival': { bg: '#E1F5FE', text: '#039BE5' },
        'graduation': { bg: '#EFEBE9', text: '#6D4C41' }
      };
      
      return categories[category] || { bg: colors.accent, text: colors.primary };
    };
    
    return (
      <div className="p-5">
        <h2 
          className="text-xl font-bold mb-4 text-center" 
          style={{ 
            color: colors.primary,
            fontFamily: font
          }}
        >
          {t("Our Portfolio")}
        </h2>
        
        <div className="space-y-6">
          {events.map((event: any, index: number) => (
            <div 
              key={index} 
              className="rounded-lg overflow-hidden" 
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                {event.image ? (
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center" 
                    style={{ backgroundColor: colors.accent }}
                  >
                    <PartyPopper size={32} style={{ color: colors.primary }} />
                  </div>
                )}
                
                {/* Category Badge */}
                {event.category && (
                  <div 
                    className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium" 
                    style={{ 
                      backgroundColor: getCategoryBadge(event.category).bg,
                      color: getCategoryBadge(event.category).text
                    }}
                  >
                    {event.category.replace('_', ' ').charAt(0).toUpperCase() + event.category.replace('_', ' ').slice(1)}
                  </div>
                )}
              </div>
              
              {/* Event Details */}
              <div className="p-4">
                <h3 
                  className="text-base font-bold mb-1" 
                  style={{ 
                    color: colors.primary,
                    fontFamily: font
                  }}
                >
                  {event.title}
                </h3>
                
                <div className="flex items-center text-xs mb-2" style={{ color: colors.text + '80' }}>
                  {event.date && (
                    <div className="flex items-center mr-3">
                      <Calendar size={12} className="mr-1" />
                      {event.date}
                    </div>
                  )}
                  
                  {event.location && (
                    <div className="flex items-center">
                      <MapPin size={12} className="mr-1" />
                      {event.location}
                    </div>
                  )}
                </div>
                
                {event.description && (
                  <p 
                    className="text-xs" 
                    style={{ color: colors.text + 'CC' }}
                  >
                    {event.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const renderVideosSection = (videosData: any) => {
    if (!videoContent || videoContent.length === 0) return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderTop: `1px solid ${colors.borderColor}`,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <h2 
          className="text-lg font-bold mb-4 text-center" 
          style={{ 
            color: colors.primary,
            fontFamily: font
          }}
        >
          {t("Event Videos")}
        </h2>
        
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
                  <div className="relative w-full h-32">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title || 'Event video'} 
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
                      <span className="text-xs font-medium" style={{ color: colors.primary, fontFamily: font }}>Event Showcase</span>
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
                  {video.event_type && (
                    <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: colors.accent, color: colors.primary, fontFamily: font }}>
                      🎉 {video.event_type}
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
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderTop: `1px solid ${colors.borderColor}`,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <h2 
          className="text-lg font-bold mb-4 text-center" 
          style={{ 
            color: colors.primary,
            fontFamily: font
          }}
        >
          {t("YouTube Channel")}
        </h2>
        
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
                {youtubeData.channel_name || 'Event Planning Channel'}
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
                🎉 {t("EVENT HIGHLIGHTS")}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderContactSection = (contactData: any) => {
    if (activeTab !== 'contact') return null;
    
    return (
      <div className="p-5">
        <h2 
          className="text-xl font-bold mb-4 text-center" 
          style={{ 
            color: colors.primary,
            fontFamily: font
          }}
        >
          {t("Contact Us")}
        </h2>
        
        <div className="space-y-4 mb-6">
          {(contactData.phone || data.phone) && (
            <a 
              href={`tel:${contactData.phone || data.phone}`} 
              className="flex items-center p-3 rounded-lg" 
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center mr-3" 
                style={{ 
                  backgroundColor: colors.accent,
                  color: colors.primary
                }}
              >
                <Phone size={18} />
              </div>
              <div>
                <p 
                  className="text-xs" 
                  style={{ color: colors.text + '80' }}
                >
                  {t("PHONE")}
                </p>
                <p 
                  className="text-sm font-medium" 
                  style={{ color: colors.text }}
                >
                  {contactData.phone || data.phone}
                </p>
              </div>
            </a>
          )}
          
          {(contactData.email || data.email) && (
            <a 
              href={`mailto:${contactData.email || data.email}`} 
              className="flex items-center p-3 rounded-lg" 
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center mr-3" 
                style={{ 
                  backgroundColor: colors.accent,
                  color: colors.primary
                }}
              >
                <Mail size={18} />
              </div>
              <div className="flex-1 overflow-hidden">
                <p 
                  className="text-xs" 
                  style={{ color: colors.text + '80' }}
                >
                  {t("EMAIL")}
                </p>
                <p 
                  className="text-sm font-medium truncate" 
                  style={{ color: colors.text }}
                >
                  {contactData.email || data.email}
                </p>
              </div>
            </a>
          )}
          
          {contactData.address && (
            <div 
              className="flex items-center p-3 rounded-lg" 
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0" 
                style={{ 
                  backgroundColor: colors.accent,
                  color: colors.primary
                }}
              >
                <MapPin size={18} />
              </div>
              <div>
                <p 
                  className="text-xs" 
                  style={{ color: colors.text + '80' }}
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
                    className="text-xs flex items-center mt-1"
                    style={{ color: colors.primary }}
                  >
                    {t("Get Directions")}
                    <ChevronRight size={12} />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <Button
            className="w-full"
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText,
              fontFamily: font
            }}
            onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            {t("Send a Message")}
          </Button>
          
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
            {t("Schedule a Consultation")}
          </Button>
        </div>
      </div>
    );
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
      case 'portfolio':
        return renderPortfolioSection(sectionData);
      case 'contact':
        return renderContactSection(sectionData);
      case 'videos':
        return renderVideosSection(sectionData);
      case 'youtube':
        return renderYouTubeSection(sectionData);
      case 'gallery':
        return renderGallerySection(sectionData);
      case 'testimonials':
        return renderTestimonialsSection(sectionData);
      case 'appointments':
        return renderAppointmentsSection(sectionData);
      case 'social':
        return renderSocialSection(sectionData);
      case 'business_hours':
        return renderBusinessHoursSection(sectionData);
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
  
  const renderTestimonialsSection = (testimonialsData: any) => {
    const reviews = testimonialsData.reviews || [];
    
    
    if (!Array.isArray(reviews) || reviews.length === 0) return null;
    
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.accent,
          borderTop: `1px solid ${colors.borderColor}`,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <h2 
          className="text-lg font-bold mb-4 text-center" 
          style={{ 
            color: colors.primary,
            fontFamily: font
          }}
        >
          {t("Client Testimonials")}
        </h2>
        
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
                          fill={i < parseInt(review.rating || 5) ? colors.primary : 'transparent'} 
                          stroke={i < parseInt(review.rating || 5) ? colors.primary : colors.borderColor}
                        />
                      ))}
                    </div>
                    
                    <p 
                      className="text-sm italic mb-3" 
                      style={{ color: colors.text }}
                    >
                      "{review.review}"
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <p 
                        className="text-xs font-bold" 
                        style={{ color: colors.primary }}
                      >
                        - {review.client_name}
                      </p>
                      
                      <div className="flex flex-col items-end">
                        {review.event_type && (
                          <span 
                            className="text-xs" 
                            style={{ color: colors.primary }}
                          >
                            {review.event_type}
                          </span>
                        )}
                        
                        {review.event_date && (
                          <span 
                            className="text-xs" 
                            style={{ color: colors.text + '80' }}
                          >
                            {review.event_date}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {reviews.length > 1 && (
            <div className="flex justify-center mt-3 space-x-2">
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
  
  const renderGallerySection = (galleryData: any) => {
    const photos = galleryData.photos || [];
    if (!Array.isArray(photos) || photos.length === 0) return null;
    
    // Get unique categories
    const categories = ['all', ...new Set(photos.map((photo: any) => photo.category).filter(Boolean))];
    
    // Filter photos by active category
    const filteredPhotos = activeEvent === null || activeEvent === 0 
      ? photos 
      : photos.filter((photo: any) => photo.category === categories[activeEvent]);
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderTop: `1px solid ${colors.borderColor}`,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <h2 
          className="text-lg font-bold mb-4 text-center" 
          style={{ 
            color: colors.primary,
            fontFamily: font
          }}
        >
          {t("Photo Gallery")}
        </h2>
        
        {/* Category filters */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {categories.map((category: string, index: number) => (
              <button
                key={category}
                className="text-xs py-1 px-3 capitalize rounded-full transition-all duration-300"
                style={{ 
                  backgroundColor: activeEvent === index ? colors.primary : colors.cardBg,
                  color: activeEvent === index ? '#FFFFFF' : colors.text,
                  border: `1px solid ${activeEvent === index ? colors.primary : colors.borderColor}`
                }}
                onClick={() => setActiveEvent(activeEvent === index ? 0 : index)}
              >
                {category === 'all' ? 'All' : category.replace('_', ' ')}
              </button>
            ))}
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-3">
          {filteredPhotos.map((photo: any, index: number) => (
            <div 
              key={index} 
              className="relative rounded-lg overflow-hidden aspect-square" 
              style={{ 
                border: `1px solid ${colors.borderColor}`
              }}
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
                  <PartyPopper size={24} style={{ color: colors.primary }} />
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
          borderTop: `1px solid ${colors.borderColor}`,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="text-center">
          <h2 
            className="text-xl font-bold mb-3" 
            style={{ 
              color: colors.buttonText,
              fontFamily: font
            }}
          >
            {appointmentsData.section_title || 'Ready to Plan Your Event?'}
          </h2>
          
          <p 
            className="text-sm mb-4" 
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            {appointmentsData.section_description || 'Let\'s discuss your vision and create an unforgettable experience together.'}
          </p>
          
          <div className="flex flex-col space-y-3">
            <Button
              className="w-full"
              style={{ 
                backgroundColor: colors.background,
                color: colors.primary,
                fontFamily: font,
                fontWeight: 'bold',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() => handleAppointmentBooking(configSections.appointments)}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {appointmentsData.booking_text || 'Schedule Consultation'}
            </Button>
            
            <Button
              className="w-full"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: colors.buttonText,
                fontFamily: font,
                fontWeight: 'bold',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              {appointmentsData.consultation_text || 'Free Consultation'}
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  const renderSocialSection = (socialData: any) => {
    const socialLinks = socialData.social_links || [];
    if (!Array.isArray(socialLinks) || socialLinks.length === 0) return null;
    
    const getSocialIcon = (platform: string) => {
      switch(platform) {
        case 'instagram': return <Instagram size={16} />;
        case 'facebook': return <Facebook size={16} />;
        case 'pinterest': return <Star size={16} />;
        case 'tiktok': return <Music size={16} />;
        case 'youtube': return <Star size={16} />;
        case 'linkedin': return <Briefcase size={16} />;
        default: return <Globe size={16} />;
      }
    };
    
    return (
      <div 
        className="px-5 py-4" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="flex flex-wrap justify-center gap-3">
          {socialLinks.map((link: any, index: number) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-transform hover:scale-105"
              style={{ 
                backgroundColor: colors.primary,
                color: '#FFFFFF'
              }}
            >
              {getSocialIcon(link.platform)}
            </a>
          ))}
        </div>
      </div>
    );
  };
  
  const renderBusinessHoursSection = (hoursData: any) => {
    const hours = hoursData.hours || [];
    if (!Array.isArray(hours) || hours.length === 0) return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderTop: `1px solid ${colors.borderColor}`
        }}
      >
        <h2 
          className="text-lg font-bold mb-4 text-center" 
          style={{ 
            color: colors.primary,
            fontFamily: font
          }}
        >
          {t("Office Hours")}
        </h2>
        
        <div className="space-y-2">
          {hours.map((hour: any, index: number) => (
            <div 
              key={index} 
              className="flex justify-between items-center p-3 rounded-lg" 
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <span 
                className="capitalize font-medium text-sm" 
                style={{ color: colors.text }}
              >
                {hour.day}
              </span>
              <span 
                className="text-sm" 
                style={{ 
                  color: hour.is_closed ? colors.text + '80' : colors.primary
                }}
              >
                {hour.is_closed ? 'Closed' : (hour.by_appointment ? 'By Appointment' : `${hour.open_time} - ${hour.close_time}`)}
              </span>
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
          backgroundColor: colors.accent,
          borderTop: `1px solid ${colors.borderColor}`
        }}
      >
        <h2 
          className="text-lg font-bold mb-4 text-center" 
          style={{ 
            color: colors.primary,
            fontFamily: font
          }}
        >
          {t("Our Location")}
        </h2>
        
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
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderTop: `1px solid ${colors.borderColor}`
        }}
      >
        <h2 
          className="text-lg font-bold mb-4 text-center" 
          style={{ 
            color: colors.primary,
            fontFamily: font
          }}
        >
          {t("Download Our App")}
        </h2>
        
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
                fontFamily: font
              }}
              onClick={() => typeof window !== "undefined" && window.open(appData.app_store_url, '_blank', 'noopener,noreferrer')}
            >
              <Download className="w-4 h-4 mr-2" />
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
              <Download className="w-4 h-4 mr-2" />
              {t("Play Store")}
            </Button>
          )}
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
          backgroundColor: colors.primary,
          color: colors.buttonText,
          borderTop: `1px solid ${colors.borderColor}`
        }}
      >
        <h2 
          className="text-lg font-bold mb-4 text-center" 
          style={{ 
            color: colors.buttonText,
            fontFamily: font
          }}
        >
          {formData.form_title}
        </h2>
        
        {formData.form_description && (
          <p 
            className="text-sm mb-4 text-center" 
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            {formData.form_description}
          </p>
        )}
        
        <Button 
          className="w-full"
          style={{ 
            backgroundColor: colors.background,
            color: colors.primary,
            fontFamily: font
          }}
          onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          {t("Contact Us")}
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
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderTop: `1px solid ${colors.borderColor}`
        }}
      >
        {customHtmlData.show_title && customHtmlData.section_title && (
          <h2 
            className="text-lg font-bold mb-4 text-center" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {customHtmlData.section_title}
          </h2>
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
                background-color: ${colors.primary}20;
                color: ${colors.secondary};
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
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.accent,
          borderTop: `1px solid ${colors.borderColor}`
        }}
      >
        <h2 
          className="text-lg font-bold mb-4 text-center" 
          style={{ 
            color: colors.primary,
            fontFamily: font
          }}
        >
          {qrData.qr_title || t('Share Our Services')}
        </h2>
        
        <div 
          className="text-center p-4 rounded-lg" 
          style={{ 
            backgroundColor: colors.background,
            border: `1px solid ${colors.borderColor}`
          }}
        >
          {qrData.qr_description && (
            <p 
              className="text-sm mb-3" 
              style={{ color: colors.text }}
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
        style={{ backgroundColor: colors.background }}
      >
        <p 
          className="text-xs text-center" 
          style={{ color: colors.text + '80' }}
        >
          {copyrightData.text}
        </p>
      </div>
    );
  };
  
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
      {/* Always render header first */}
      {renderSection('header')}
      
      {/* Render content based on active tab */}
      {renderSection('about')}
      {renderSection('services')}
      {renderSection('portfolio')}
      {renderSection('contact')}
      
      {/* Always render these sections at the bottom */}
      {renderSection('videos')}
      {renderSection('youtube')}
      {renderSection('gallery')}
      {renderSection('testimonials')}
      {renderSection('appointments')}
      {renderSection('business_hours')}
      {renderSection('google_map')}
      {renderSection('app_download')}
      {renderSection('contact_form')}
      {renderSection('qr_share')}
      {renderSection('social')}
      {renderSection('thank_you')}
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