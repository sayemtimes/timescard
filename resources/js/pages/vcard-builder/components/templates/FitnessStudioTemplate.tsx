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
  Dumbbell,
  Users,
  Award,
  Youtube,
  Linkedin,
  Clock3,
  Flame,
  Heart,
  CheckCircle2,
  ArrowRight,
  Video,
  Play,
  QrCode
} from 'lucide-react';
import SocialIcon from '../../../link-bio-builder/components/SocialIcon';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionData } from '@/utils/sectionHelpers';
import { getSectionOrder } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';

interface FitnessStudioTemplateProps {
  data: any;
  template: any;
}

export default function FitnessStudioTemplate({ data, template }: FitnessStudioTemplateProps) {
  const { t, i18n } = useTranslation();
  const [activeDay, setActiveDay] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<string>('all');
  
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
  

  
  // Get all sections for this business type
  const colors = configSections.colors || template?.defaultColors || { 
    primary: '#E53935', 
    secondary: '#FF5252', 
    accent: '#FFEBEE', 
    background: '#FFFFFF', 
    text: '#212121',
    cardBg: '#F5F5F5',
    borderColor: '#E0E0E0',
    buttonText: '#FFFFFF',
    highlightColor: '#FFC107'
  };
  const font = configSections.font || template?.defaultFont || 'Montserrat, sans-serif';
  
  // Get all sections for this business type
  const allSections = getBusinessTemplate('fitness-studio')?.sections || [];

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
      case 'class_schedule':
        return renderClassScheduleSection(sectionData);
      case 'contact':
        return renderContactSection(sectionData);
      case 'videos':
        return renderVideosSection(sectionData);
      case 'youtube':
        return renderYouTubeSection(sectionData);
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
      case 'trainers':
        return renderTrainersSection(sectionData);
      case 'membership':
        return renderMembershipSection(sectionData);
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
      case 'footer':
        return renderFooterSection(sectionData);
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
      {/* Dynamic Header with Pattern Overlay */}
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
            {/* Fitness pattern overlay */}
            <div className="absolute inset-0 opacity-10" 
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>
        )}
        
        {/* Overlay */}
        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
        ></div>
        

        
        {/* Logo and Name Container - Centered on header */}
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
          
          {/* Studio Name and Tagline */}
          <h1 
            className="text-3xl font-extrabold mb-1 tracking-tight" 
            style={{ 
              color: colors.background,
              fontFamily: font,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            {headerData.name || data.name || 'FlexFit Studio'}
          </h1>
          
          {headerData.tagline && (
            <p 
              className="text-sm font-medium" 
              style={{ 
                color: colors.background,
                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              {headerData.tagline}
            </p>
          )}
        </div>
      </div>
      
      {/* Quick Action Buttons */}
      <div 
        className="px-5 py-3 flex justify-center space-x-3 shadow-md"
        style={{ backgroundColor: colors.background }}
      >
        {configSections.contact?.phone && (
          <a 
            href={`tel:${configSections.contact?.phone}`} 
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText
            }}
          >
            <Phone size={18} />
          </a>
        )}
        
        {configSections.contact?.address && (
          <a 
            href={configSections.google_map?.directions_url || `https://maps.google.com/?q=${encodeURIComponent(configSections.contact?.address)}`} 
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText
            }}
          >
            <MapPin size={18} />
          </a>
        )}
        
        <button 
          onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
          style={{ 
            backgroundColor: colors.primary,
            color: colors.buttonText
          }}
        >
          <MessageSquare size={18} />
        </button>
        
        {configSections.appointments?.booking_url && (
          <button 
            onClick={() => handleAppointmentBooking(configSections.appointments)}
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText
            }}
          >
            <Calendar size={18} />
          </button>
        )}
        
        {/* Language Selector beside Calendar button */}
        {configSections.language && (
          <div className="relative z-50">
            <button
              onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
              style={{ 
                backgroundColor: colors.secondary,
                color: colors.buttonText
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
                      <span>{String.fromCodePoint(...lang.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt()))}</span>
                      <span className="truncate">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </>
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
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background
        }}
      >
        <div className="flex items-center mb-4">
          <Dumbbell 
            size={20} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-xl font-bold" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("About Us")}
          </h2>
        </div>
        
        <p 
          className="text-sm leading-relaxed mb-4" 
          style={{ color: colors.text }}
        >
          {aboutData.description || data.description}
        </p>
        
        <div className="flex justify-between">
          {aboutData.year_established && (
            <div 
              className="text-center p-3 rounded-lg" 
              style={{ backgroundColor: colors.accent }}
            >
              <p 
                className="text-xs font-semibold" 
                style={{ color: colors.primary }}
              >
                {t("ESTABLISHED")}
              </p>
              <p 
                className="text-lg font-bold" 
                style={{ color: colors.primary }}
              >
                {aboutData.year_established}
              </p>
            </div>
          )}
          
          {aboutData.studio_type && (
            <div 
              className="text-center p-3 rounded-lg" 
              style={{ backgroundColor: colors.accent }}
            >
              <p 
                className="text-xs font-semibold" 
                style={{ color: colors.primary }}
              >
                {t("SPECIALTY")}
              </p>
              <p 
                className="text-sm capitalize font-medium" 
                style={{ color: colors.primary }}
              >
                {aboutData.studio_type.replace('_', ' ')}
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
    
    const getIntensityBadge = (intensity: string) => {
      if (!intensity) return null;
      
      const intensityLabels: Record<string, { bg: string, text: string, label: string }> = {
        'beginner': { bg: '#E8F5E9', text: '#2E7D32', label: 'Beginner' },
        'intermediate': { bg: '#FFF8E1', text: '#F57F17', label: 'Intermediate' },
        'advanced': { bg: '#FFEBEE', text: '#C62828', label: 'Advanced' },
        'all_levels': { bg: '#E3F2FD', text: '#1565C0', label: 'All Levels' }
      };
      
      const style = intensityLabels[intensity] || { bg: '#F5F5F5', text: '#757575', label: intensity };
      
      return (
        <span 
          className="inline-block text-xs py-1 px-2 rounded-full ml-2"
          style={{ 
            backgroundColor: style.bg,
            color: style.text
          }}
        >
          {style.label}
        </span>
      );
    };
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.cardBg
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Flame 
              size={20} 
              className="mr-2" 
              style={{ color: colors.primary }}
            />
            <h2 
              className="text-xl font-bold" 
              style={{ 
                color: colors.primary,
                fontFamily: font
              }}
            >
              {t("Our Services")}
            </h2>
          </div>
        </div>
        
        {/* Services list */}
        <div className="space-y-4">
          {offerings.map((service: any, index: number) => (
            <div 
              key={index} 
              className="flex p-4 rounded-lg shadow-md" 
              style={{ 
                backgroundColor: colors.background,
                borderLeft: `4px solid ${colors.primary}`
              }}
            >
              {/* Service Image */}
              <div className="flex-shrink-0 mr-4">
                {service.image ? (
                  <img 
                    src={service.image} 
                    alt={service.name || 'Service'} 
                    className="w-16 h-16 rounded-lg object-cover"
                    style={{ border: `1px solid ${colors.borderColor}` }}
                  />
                ) : (
                  <div 
                    className="w-16 h-16 rounded-lg flex items-center justify-center" 
                    style={{ 
                      backgroundColor: colors.accent,
                      border: `1px solid ${colors.borderColor}`
                    }}
                  >
                    <Dumbbell size={20} style={{ color: colors.primary }} />
                  </div>
                )}
              </div>
              
              {/* Service Details */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 
                      className="text-base font-bold" 
                      style={{ 
                        color: colors.text,
                        fontFamily: font
                      }}
                    >
                      {service.name}
                      {getIntensityBadge(service.intensity)}
                    </h3>
                    
                    {service.duration && (
                      <div className="flex items-center mt-1">
                        <Clock3 size={14} style={{ color: colors.text + '99' }} />
                        <span 
                          className="text-xs ml-1" 
                          style={{ color: colors.text + '99' }}
                        >
                          {service.duration}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <span 
                    className="text-sm font-bold ml-2" 
                    style={{ color: colors.secondary }}
                  >
                    {service.price}
                  </span>
                </div>
                
                {service.description && (
                  <p 
                    className="text-xs mt-2" 
                    style={{ color: colors.text + 'CC' }}
                  >
                    {service.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderClassScheduleSection = (scheduleData: any) => {
    const classes = scheduleData.classes || [];
    if (!Array.isArray(classes) || classes.length === 0) return null;
    
    // Get unique days
    const days = ['all', ...new Set(classes.map((item: any) => item.day))];
    
    // Filter classes by active day
    const filteredClasses = activeDay === 'all' 
      ? classes 
      : classes.filter((item: any) => item.day === activeDay);
    
    // Get current day
    const currentDayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDay = currentDayNames[new Date().getDay()];
    
    // If no active day is selected, default to current day if it has classes
    React.useEffect(() => {
      if (activeDay === 'all' && days.includes(currentDay)) {
        setActiveDay(currentDay);
      }
    }, []);
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background
        }}
      >
        <div className="flex items-center mb-4">
          <Calendar 
            size={20} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-xl font-bold" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("Class Schedule")}
          </h2>
        </div>
        
        {/* Day filters */}
        <div className="flex overflow-x-auto pb-2 mb-4 hide-scrollbar">
          {days.map((day: string) => (
            <button
              key={day}
              className={`text-xs py-1 px-3 mr-2 capitalize rounded-full whitespace-nowrap`}
              style={{ 
                backgroundColor: activeDay === day ? colors.primary : 'transparent',
                color: activeDay === day ? colors.buttonText : colors.text,
                border: `1px solid ${activeDay === day ? colors.primary : colors.borderColor}`,
                fontWeight: activeDay === day ? 'bold' : 'normal'
              }}
              onClick={() => setActiveDay(day)}
            >
              {day === 'all' ? 'All Days' : day}
            </button>
          ))}
        </div>
        
        {/* Classes list */}
        <div className="space-y-3">
          {filteredClasses.map((classItem: any, index: number) => (
            <div 
              key={index} 
              className="p-3 rounded-lg" 
              style={{ 
                backgroundColor: classItem.day === currentDay ? colors.accent : colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 
                    className="text-base font-bold" 
                    style={{ 
                      color: colors.text,
                      fontFamily: font
                    }}
                  >
                    {classItem.class_name}
                    
                    {classItem.day === currentDay && (
                      <Badge 
                        className="ml-2 text-xs" 
                        style={{ 
                          backgroundColor: colors.primary,
                          color: colors.buttonText
                        }}
                      >
                        {t("Today")}
                      </Badge>
                    )}
                  </h3>
                  
                  <p 
                    className="text-xs capitalize" 
                    style={{ color: colors.text + '80' }}
                  >
                    {classItem.day}
                  </p>
                </div>
                
                <div className="text-right">
                  <span 
                    className="text-sm font-medium" 
                    style={{ color: colors.secondary }}
                  >
                    {classItem.time}
                  </span>
                  
                  {classItem.instructor && (
                    <p 
                      className="text-xs" 
                      style={{ color: colors.text + '99' }}
                    >
                      {t("with")} {classItem.instructor}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {configSections.appointments?.booking_url && (
          <Button
            className="w-full mt-4"
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText,
              fontFamily: font
            }}
            onClick={() => handleAppointmentBooking(configSections.appointments)}
          >
            <Calendar className="w-4 h-4 mr-2" />
            {t("Book a Class")}
          </Button>
        )}
      </div>
    );
  };

  const renderVideosSection = (videosData: any) => {
    if (!videoContent || videoContent.length === 0) return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background
        }}
      >
        <div className="flex items-center mb-4">
          <Video 
            size={20} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-xl font-bold" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("Workout Videos")}
          </h2>
        </div>
        
        <div className="space-y-4">
          {videoContent.map((video: any) => (
            <div 
              key={video.key} 
              className="rounded-lg overflow-hidden shadow-md" 
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
                      alt={video.title || 'Workout video'} 
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
                      <span className="text-xs font-medium" style={{ color: colors.primary, fontFamily: font }}>{t("Fitness Video")}</span>
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
                  {video.workout_type && (
                    <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: colors.accent, color: colors.primary, fontFamily: font }}>
                      💪 {video.workout_type}
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
          backgroundColor: colors.cardBg
        }}
      >
        <div className="flex items-center mb-4">
          <Youtube 
            size={20} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-xl font-bold" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("YouTube Channel")}
          </h2>
        </div>
        
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
        
        <div className="p-4 rounded-lg shadow-md" style={{ backgroundColor: colors.background, border: `1px solid ${colors.borderColor}` }}>
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 rounded-lg bg-red-600 flex items-center justify-center mr-3">
              <Youtube className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>
                {youtubeData.channel_name || 'Fitness Studio'}
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
                💪 {t("WORKOUT VIDEOS")}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderContactSection = (contactData: any) => (
    <div 
      className="px-5 py-6" 
      style={{ 
        backgroundColor: colors.cardBg
      }}
    >
      <div className="flex items-center mb-4">
        <MapPin 
          size={20} 
          className="mr-2" 
          style={{ color: colors.primary }}
        />
        <h2 
          className="text-xl font-bold" 
          style={{ 
            color: colors.primary,
            fontFamily: font
          }}
        >
          {t("Contact Us")}
        </h2>
      </div>
      
      <div className="space-y-3">
        {contactData.address && (
          <div 
            className="p-3 rounded-lg" 
            style={{ 
              backgroundColor: colors.background,
              border: `1px solid ${colors.borderColor}`
            }}
          >
            <div className="flex">
              <MapPin 
                size={18} 
                className="mr-2 flex-shrink-0 mt-1" 
                style={{ color: colors.primary }}
              />
              <div>
                <p 
                  className="text-xs font-semibold mb-1" 
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
                backgroundColor: colors.background,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div className="flex items-center">
                <Phone 
                  size={18} 
                  className="mr-2 flex-shrink-0" 
                  style={{ color: colors.primary }}
                />
                <div>
                  <p 
                    className="text-xs font-semibold" 
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
              className="p-3 rounded-lg" 
              style={{ 
                backgroundColor: colors.background,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div className="flex items-center">
                <Mail 
                  size={18} 
                  className="mr-2 flex-shrink-0" 
                  style={{ color: colors.primary }}
                />
                <div>
                  <p 
                    className="text-xs font-semibold" 
                    style={{ color: colors.primary }}
                  >
                    {t("EMAIL")}
                  </p>
                  <a 
                    href={`mailto:${contactData.email || data.email}`} 
                    className="text-sm truncate block" 
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
        className="px-5 py-4" 
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
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-105"
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
    
    // Check if currently open
    const isCurrentlyOpen = () => {
      if (!todayHours || todayHours.is_closed) return false;
      
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      
      const [openHours, openMinutes] = todayHours.open_time.split(':').map(Number);
      const [closeHours, closeMinutes] = todayHours.close_time.split(':').map(Number);
      
      const openTime = openHours * 60 + openMinutes;
      const closeTime = closeHours * 60 + closeMinutes;
      
      return currentTime >= openTime && currentTime <= closeTime;
    };
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Clock 
              size={20} 
              className="mr-2" 
              style={{ color: colors.primary }}
            />
            <h2 
              className="text-xl font-bold" 
              style={{ 
                color: colors.primary,
                fontFamily: font
              }}
            >
              {t("Hours")}
            </h2>
          </div>
          
          {isCurrentlyOpen() ? (
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
        
        <div 
          className="p-4 rounded-lg" 
          style={{ 
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.borderColor}`
          }}
        >
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
          backgroundColor: colors.cardBg
        }}
      >
        <div className="flex items-center mb-4">
          <ImageIcon 
            size={20} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-xl font-bold" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("Our Facility")}
          </h2>
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
                  <Dumbbell size={24} style={{ color: colors.primary }} />
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
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background
        }}
      >
        <div className="flex items-center mb-4">
          <Star 
            size={20} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-xl font-bold" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("Success Stories")}
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
                    className="p-4 rounded-lg shadow-md" 
                    style={{ 
                      backgroundColor: colors.cardBg,
                      border: `1px solid ${colors.borderColor}`
                    }}
                  >
                    <div className="flex items-center mb-3">
                      {review.member_image ? (
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                          <img 
                            src={review.member_image} 
                            alt={review.member_name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div 
                          className="w-12 h-12 rounded-full mr-3 flex items-center justify-center"
                          style={{ backgroundColor: colors.accent }}
                        >
                          <Users size={18} style={{ color: colors.primary }} />
                        </div>
                      )}
                      
                      <div>
                        <p 
                          className="text-sm font-bold" 
                          style={{ color: colors.text }}
                        >
                          {review.member_name}
                        </p>
                        
                        {review.achievement && (
                          <div className="flex items-center">
                            <Award size={12} style={{ color: colors.highlightColor }} />
                            <p 
                              className="text-xs ml-1" 
                              style={{ color: colors.secondary }}
                            >
                              {review.achievement}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          fill={i < parseInt(review.rating || 5) ? colors.highlightColor : 'transparent'} 
                          stroke={i < parseInt(review.rating || 5) ? colors.highlightColor : colors.borderColor}
                        />
                      ))}
                    </div>
                    
                    <p 
                      className="text-sm" 
                      style={{ color: colors.text }}
                    >
                      "{review.review}"
                    </p>
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

  const renderAppointmentsSection = (appointmentsData: any) => {
    if (!appointmentsData.booking_url) return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.cardBg
        }}
      >
        <div className="flex items-center mb-4">
          <Calendar 
            size={20} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-xl font-bold" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("Book a Class")}
          </h2>
        </div>
        
        <div 
          className="p-4 rounded-lg text-center" 
          style={{ 
            backgroundColor: colors.background,
            border: `1px solid ${colors.borderColor}`
          }}
        >
          {appointmentsData.trial_available && appointmentsData.trial_text && (
            <div 
              className="mb-4 p-3 rounded-lg" 
              style={{ backgroundColor: colors.accent }}
            >
              <div className="flex items-center justify-center">
                <Heart size={16} className="mr-2" style={{ color: colors.primary }} />
                <p 
                  className="text-sm font-medium" 
                  style={{ color: colors.primary }}
                >
                  {appointmentsData.trial_text}
                </p>
              </div>
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

  const renderTrainersSection = (trainersData: any) => {
    const trainers = trainersData.team || [];
    if (!Array.isArray(trainers) || trainers.length === 0) return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background
        }}
      >
        <div className="flex items-center mb-4">
          <Users 
            size={20} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-xl font-bold" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("Our Trainers")}
          </h2>
        </div>
        
        <div className="space-y-4">
          {trainers.map((trainer: any, index: number) => (
            <div 
              key={index} 
              className="p-4 rounded-lg shadow-md" 
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div className="flex items-center mb-3">
                {trainer.image ? (
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-3">
                    <img 
                      src={trainer.image} 
                      alt={trainer.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div 
                    className="w-16 h-16 rounded-full mr-3 flex items-center justify-center"
                    style={{ backgroundColor: colors.accent }}
                  >
                    <Users size={24} style={{ color: colors.primary }} />
                  </div>
                )}
                
                <div>
                  <p 
                    className="text-base font-bold" 
                    style={{ color: colors.text }}
                  >
                    {trainer.name}
                  </p>
                  
                  {trainer.title && (
                    <p 
                      className="text-xs" 
                      style={{ color: colors.secondary }}
                    >
                      {trainer.title}
                    </p>
                  )}
                  
                  {trainer.certifications && (
                    <p 
                      className="text-xs mt-1" 
                      style={{ color: colors.text + '99' }}
                    >
                      {trainer.certifications}
                    </p>
                  )}
                </div>
              </div>
              
              {trainer.bio && (
                <p 
                  className="text-sm" 
                  style={{ color: colors.text }}
                >
                  {trainer.bio}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMembershipSection = (membershipData: any) => {
    const plans = membershipData.plans || [];
    if (!Array.isArray(plans) || plans.length === 0) return null;
    
    // Set active tab to the popular plan if available
    React.useEffect(() => {
      const popularPlan = plans.find(plan => plan.is_popular);
      if (popularPlan && activeTab === 'all') {
        setActiveTab(plans.indexOf(popularPlan).toString());
      }
    }, []);
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.cardBg
        }}
      >
        <div className="flex items-center mb-4">
          <Award 
            size={20} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-xl font-bold" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("Membership Plans")}
          </h2>
        </div>
        
        {/* Plan tabs */}
        <div className="flex overflow-x-auto pb-2 mb-4 hide-scrollbar">
          {plans.map((plan: any, index: number) => (
            <button
              key={index}
              className={`text-xs py-1 px-3 mr-2 whitespace-nowrap`}
              style={{ 
                backgroundColor: activeTab === index.toString() ? colors.primary : 'transparent',
                color: activeTab === index.toString() ? colors.buttonText : colors.text,
                border: `1px solid ${activeTab === index.toString() ? colors.primary : colors.borderColor}`,
                borderRadius: '20px',
                fontWeight: activeTab === index.toString() ? 'bold' : 'normal'
              }}
              onClick={() => setActiveTab(index.toString())}
            >
              {plan.name}
              {plan.is_popular && (
                <span 
                  className="ml-1 px-1 text-xs rounded"
                  style={{ 
                    backgroundColor: activeTab === index.toString() ? colors.highlightColor : colors.highlightColor,
                    color: '#000000'
                  }}
                >
                  {t("Popular")}
                </span>
              )}
            </button>
          ))}
        </div>
        
        {/* Plan details */}
        <div className="space-y-4">
          {plans.map((plan: any, index: number) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg shadow-md ${activeTab === index.toString() ? 'block' : 'hidden'}`}
              style={{ 
                backgroundColor: colors.background,
                border: plan.is_popular ? `2px solid ${colors.primary}` : `1px solid ${colors.borderColor}`
              }}
            >
              <div className="text-center mb-3">
                <h3 
                  className="text-lg font-bold" 
                  style={{ 
                    color: colors.primary,
                    fontFamily: font
                  }}
                >
                  {plan.name}
                </h3>
                
                <div className="my-2">
                  <span 
                    className="text-2xl font-extrabold" 
                    style={{ color: colors.text }}
                  >
                    {plan.price}
                  </span>
                  {plan.duration && (
                    <span 
                      className="text-sm" 
                      style={{ color: colors.text + '99' }}
                    >
                      {' '}/{plan.duration}
                    </span>
                  )}
                </div>
                
                {plan.description && (
                  <p 
                    className="text-sm" 
                    style={{ color: colors.text + 'CC' }}
                  >
                    {plan.description}
                  </p>
                )}
              </div>
              
              {plan.features && (
                <div 
                  className="p-3 rounded-lg mb-3" 
                  style={{ backgroundColor: colors.accent + '80' }}
                >
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
                onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
              >
                {plan.is_popular ? 'Join Now' : 'Learn More'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderLocationSection = (locationData: any) => {
    if (!locationData.directions_url) return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background
        }}
      >
        <div className="flex items-center mb-4">
          <MapPin 
            size={20} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-xl font-bold" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("Find Us")}
          </h2>
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
          backgroundColor: colors.cardBg
        }}
      >
        <div className="flex items-center mb-4">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="mr-2"
            style={{ color: colors.primary }}
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          <h2 
            className="text-xl font-bold" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("Mobile App")}
          </h2>
        </div>
        
        <div 
          className="p-4 rounded-lg shadow-md" 
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
                {t("Features:")}
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
      >
        <div className="flex items-center mb-4">
          <Mail 
            size={20} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-xl font-bold" 
            style={{ 
              color: colors.primary,
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
          {t("Send Message")}
        </Button>
      </div>
    );
  };

  const renderThankYouSection = (thankYouData: any) => {
    if (!thankYouData.message) return null;
    
    return (
      <div 
        className="px-5 py-4" 
        style={{ backgroundColor: colors.cardBg }}
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
          backgroundColor: colors.background
        }}
      >
        {customHtmlData.show_title && customHtmlData.section_title && (
          <div className="flex items-center mb-4">
            <Dumbbell 
              size={20} 
              className="mr-2" 
              style={{ color: colors.primary }}
            />
            <h2 
              className="text-xl font-bold" 
              style={{ 
                color: colors.primary,
                fontFamily: font
              }}
            >
              {customHtmlData.section_title}
            </h2>
          </div>
        )}
        <div 
          className="custom-html-content p-4 rounded-lg shadow-md" 
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
          backgroundColor: colors.cardBg
        }}
      >
        <div className="flex items-center mb-4">
          <QrCode 
            size={20} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-xl font-bold" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {qrData.qr_title || t('Share Our Gym')}
          </h2>
        </div>
        
        <div 
          className="text-center p-4 rounded-lg shadow-md" 
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

  const renderFooterSection = (footerData: any) => {
    if (!footerData.show_footer) return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.cardBg
        }}
      >
        {footerData.footer_text && (
          <p 
            className="text-sm text-center mb-4" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {footerData.footer_text}
          </p>
        )}
        
        {footerData.footer_links && Array.isArray(footerData.footer_links) && footerData.footer_links.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {footerData.footer_links.map((link: any, index: number) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1 rounded transition-colors font-medium"
                style={{ 
                  backgroundColor: colors.primary + '20',
                  color: colors.primary,
                  fontFamily: font
                }}
              >
                {link.title}
              </a>
            ))}
          </div>
        )}
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
        .filter(key => key !== 'colors' && key !== 'font' && key !== 'footer' && key !== 'copyright')
        .map((sectionKey) => (
          <React.Fragment key={sectionKey}>
            {renderSection(sectionKey)}
          </React.Fragment>
        ))}
        
      {/* Footer Section */}
      {renderSection('footer')}
      
      {/* Copyright Section */}
      {renderSection('copyright')}
        
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
              name: sanitizePath(data.name || configSections.header?.name || ''),
              title: sanitizePath(configSections.header?.tagline || ''),
              email: sanitizePath(data.email || configSections.contact?.email || ''),
              phone: sanitizePath(data.phone || configSections.contact?.phone || ''),
              website: sanitizePath(data.website || configSections.contact?.website || ''),
              address: sanitizePath(configSections.contact?.address || '')
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
}