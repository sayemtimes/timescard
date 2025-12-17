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
  Clock, 
  Calendar, 
  Star, 
  ChevronRight, 
  UserPlus,
  ExternalLink,
  Image as ImageIcon,
  MessageSquare,
  Music,
  Mic,
  Headphones,
  Radio,
  Disc,
  Play,
  Users,
  ShoppingBag,
  Youtube,
  Ticket,
  Share2,
  QrCode
} from 'lucide-react';
import SocialIcon from '../../../link-bio-builder/components/SocialIcon';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionOrder } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';
import { useTranslation } from 'react-i18next';
import languageData from '@/../../resources/lang/language.json';

interface MusicArtistTemplateProps {
  data: any;
  template: any;
}

export default function MusicArtistTemplate({ data, template }: MusicArtistTemplateProps) {
  const { t, i18n } = useTranslation();
  const [activeTrack, setActiveTrack] = useState<number>(0);
  const [activeVideo, setActiveVideo] = useState<number>(0);
  
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
    primary: '#E91E63', 
    secondary: '#FF4081', 
    accent: '#311B92', 
    background: '#121212', 
    text: '#FFFFFF',
    cardBg: '#1E1E1E',
    borderColor: '#333333',
    buttonText: '#FFFFFF',
    highlightColor: '#FFC107'
  };
  const font = configSections.font || template?.defaultFont || 'Montserrat, sans-serif';
  
  // Get all sections for this business type
  const allSections = getBusinessTemplate('music-artist')?.sections || [];

  // Helper function to get icon component
  const getServiceIcon = (iconName: string, size: number = 20) => {
    switch(iconName) {
      case 'music': return <Music size={size} />;
      case 'mic': return <Mic size={size} />;
      case 'headphones': return <Headphones size={size} />;
      case 'radio': return <Radio size={size} />;
      case 'disc': return <Disc size={size} />;
      case 'guitar':
  return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 3h4v4l-4 3-2-2-6 6-4-4 6-6-2-2z"></path>
          <path d="M17 18v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-3l6-6 6 6z"></path>
        </svg>
      );
      case 'piano': return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"></path>
          <path d="M8 4v16"></path>
          <path d="M16 4v16"></path>
          <path d="M4 12h16"></path>
        </svg>
      );
      case 'drum': return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 6a4 4 0 0 0-4 4v10h8V10a4 4 0 0 0-4-4Z"></path>
          <path d="M18 8a4 4 0 0 0-4-4h-4a4 4 0 0 0-4 4"></path>
          <path d="M8 16h8"></path>
        </svg>
      );
      default: return <Music size={size} />;
    }
  };

  // Helper function to get social icon
  const getSocialIcon = (platform: string, size: number = 20) => {
    switch(platform) {
      case 'spotify': return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 11.8A5.5 5.5 0 0 1 16 8"></path>
          <path d="M9 15a4 4 0 0 1 6-1"></path>
          <path d="M11 18a2 2 0 0 1 2-1"></path>
        </svg>
      );
      case 'apple': return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path>
          <path d="M10 2c1 .5 2 2 2 5"></path>
        </svg>
      );
      case 'soundcloud': return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 13h6"></path>
          <path d="M3 13h2"></path>
          <path d="M16 13h2"></path>
          <path d="M18 9h1a3 3 0 0 1 0 6h-1"></path>
          <path d="M3 17v-8l4 8v-8"></path>
          <path d="M13 17v-4a2 2 0 0 0-2-2"></path>
        </svg>
      );
      case 'youtube': return <Youtube size={size} />;
      case 'instagram': return <Instagram size={size} />;
      case 'facebook': return <Facebook size={size} />;
      case 'twitter': return <Twitter size={size} />;
      case 'tiktok': return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
          <path d="M15 8h.01"></path>
          <path d="M15 2h-4v6l1 2h3V8h4v4h-3v10"></path>
        </svg>
      );
      case 'bandcamp': return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 15h12l-6-12z"></path>
        </svg>
      );
      default: return <Globe size={size} />;
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
      case 'music':
        return renderMusicSection(sectionData);
      case 'videos':
        return renderVideosSection(sectionData);
      case 'youtube':
        return renderYouTubeSection(sectionData);
      case 'services':
        return renderServicesSection(sectionData);
      case 'contact':
        return renderContactSection(sectionData);
      case 'social':
        return renderSocialSection(sectionData);
      case 'tour_dates':
        return renderTourDatesSection(sectionData);
      case 'business_hours':
        return renderBusinessHoursSection(sectionData);
      case 'gallery':
        return renderGallerySection(sectionData);
      case 'testimonials':
        return renderTestimonialsSection(sectionData);
      case 'appointments':
        return renderAppointmentsSection(sectionData);
      case 'band_members':
        return renderBandMembersSection(sectionData);
      case 'merchandise':
        return renderMerchandiseSection(sectionData);
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
      {/* Fullscreen Header with Image Overlay */}
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
              background: `linear-gradient(135deg, ${colors.primary}80 0%, ${colors.accent} 100%)`,
            }}
          >
            {/* Music pattern overlay */}
            <div className="absolute inset-0 opacity-10" 
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>
        )}
        
        {/* Dark overlay */}
        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        ></div>
        
        {/* Language Selector */}
        {configSections.language && (
          <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}>
            <div className="relative">
              <button
                onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                className="flex items-center space-x-1 px-3 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105"
                style={{ 
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: colors.buttonText,
                  backdropFilter: 'blur(10px)',
                  border: `2px solid ${colors.primary}50`,
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
        
        {/* Content Overlay - Centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 py-4">
          {/* Logo/Artist Photo */}
          {headerData.logo && (
            <div className="mb-3">
              <div 
                className="w-16 h-16 rounded-full overflow-hidden border-2 shadow-lg mx-auto" 
                style={{ 
                  borderColor: colors.primary,
                  backgroundColor: colors.background
                }}
              >
                <img 
                  src={headerData.logo} 
                  alt={headerData.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
          
          {/* Artist/Band Name */}
          <h1 
            className="text-2xl font-bold mb-2 tracking-wide" 
            style={{ 
              color: colors.buttonText,
              fontFamily: font,
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            {headerData.name || data.name || 'Sonic Wave'}
          </h1>
          
          {headerData.tagline && (
            <p 
              className="text-sm font-medium mb-4" 
              style={{ 
                color: colors.buttonText + 'E6',
                textShadow: '0 1px 2px rgba(0,0,0,0.5)'
              }}
            >
              {headerData.tagline}
            </p>
          )}
          
          {/* CTA Button */}
          {headerData.cta_text && (
            <Button
              className="px-4 py-2 font-medium text-sm shadow-lg"
              style={{ 
                backgroundColor: colors.primary,
                color: colors.buttonText
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
              <Play size={16} className="mr-2" />
              {headerData.cta_text}
            </Button>
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

  const renderAboutSection = (aboutData: any) => {
    if (!aboutData.description && !data.description) return null; 
    return (
      <div 
        className="px-5 py-10" 
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
            {t("About")}
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
          {aboutData.genre && (
            <div className="text-center">
              <p 
                className="text-sm font-medium" 
                style={{ color: colors.text + '80' }}
              >
                {t("GENRE")}
              </p>
              <p 
                className="text-lg font-bold" 
                style={{ color: colors.primary }}
              >
                {aboutData.genre}
              </p>
            </div>
          )}
          
          {aboutData.origin && (
            <div className="text-center">
              <p 
                className="text-sm font-medium" 
                style={{ color: colors.text + '80' }}
              >
                {t("ORIGIN")}
              </p>
              <p 
                className="text-lg font-bold" 
                style={{ color: colors.primary }}
              >
                {aboutData.origin}
              </p>
            </div>
          )}
          
          {aboutData.formed_year && (
            <div className="text-center">
              <p 
                className="text-sm font-medium" 
                style={{ color: colors.text + '80' }}
              >
                {t("FORMED")}
              </p>
              <p 
                className="text-lg font-bold" 
                style={{ color: colors.primary }}
              >
                {aboutData.formed_year}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderMusicSection = (musicData: any) => {
    const tracks = musicData.tracks || [];
    if (!Array.isArray(tracks) || tracks.length === 0) return null;
    
    return (
      <div 
        className="px-5 py-10" 
        style={{ 
          backgroundColor: colors.cardBg
        }}
        id="music"
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("Music")}
          </h2>
          <div 
            className="w-16 h-1 mx-auto rounded-full" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div className="space-y-4">
          {tracks.map((track: any, index: number) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg ${activeTrack === index ? 'border-2' : 'border'}`}
              style={{ 
                backgroundColor: colors.background,
                borderColor: activeTrack === index ? colors.primary : colors.borderColor,
                cursor: 'pointer'
              }}
              onClick={() => setActiveTrack(index)}
            >
              <div className="flex items-center">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                  style={{ 
                    backgroundColor: activeTrack === index ? colors.primary : colors.accent + '40',
                    color: activeTrack === index ? colors.buttonText : colors.primary
                  }}
                >
                  <Play size={18} />
                </div>
                
                <div className="flex-1">
                  <h3 
                    className="text-base font-bold" 
                    style={{ 
                      color: colors.text,
                      fontFamily: font
                    }}
                  >
                    {track.title}
                  </h3>
                  
                  <div className="flex text-xs" style={{ color: colors.text + '80' }}>
                    <span>{track.album}</span>
                    {track.year && (
                      <>
                        <span className="mx-1">•</span>
                        <span>{track.year}</span>
                      </>
                    )}
                  </div>
                </div>
                
                {track.stream_url && (
                  <a 
                    href={track.stream_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs flex items-center"
                    style={{ color: colors.primary }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {t("Stream")}
                    <ExternalLink size={12} className="ml-1" />
                  </a>
                )}
              </div>
              
              {activeTrack === index && track.embed_url && (
                <div className="mt-4 rounded overflow-hidden">
                  <div className="w-full h-20 bg-gray-800 flex items-center justify-center">
                    <Music size={24} style={{ color: colors.text + '40' }} />
                    <span className="ml-2 text-sm" style={{ color: colors.text + '60' }}>{t("Music Player Embed")}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderVideosSection = (videosData: any) => {
    const videos = videosData.video_list || [];
    if (!Array.isArray(videos) || videos.length === 0) return null;
    
    // Process videos without memoization
    const videoContent = videos.map((video: any, index: number) => {
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
    
    return (
      <div 
        className="px-5 py-10" 
        style={{ 
          backgroundColor: colors.background
        }}
        id="videos"
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("Videos")}
          </h2>
          <div 
            className="w-16 h-1 mx-auto rounded-full" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        {/* Video player */}
        <div 
          className="w-full rounded-lg overflow-hidden mb-4"
          style={{ 
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.borderColor}`
          }}
        >
          {videoContent[activeVideo]?.embed_url && videoContent[activeVideo].embed_url.includes('<iframe') ? (
            <div className="w-full relative overflow-hidden" style={{ paddingBottom: '56.25%', height: 0 }}>
              <div 
                className="absolute inset-0 w-full h-full"
                ref={(el) => {
                  if (el && !el.hasChildNodes()) {
                    el.innerHTML = videoContent[activeVideo].embed_url.replace(
                      /<iframe([^>]*)>/i, 
                      '<iframe$1 style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;">'
                    );
                  }
                }}
              />
            </div>
          ) : videoContent[activeVideo]?.videoData ? (
            <VideoEmbed
              url={videoContent[activeVideo].videoData.url}
              title={videoContent[activeVideo].title || 'Video'}
              platform={videoContent[activeVideo].videoData.platform}
              colors={colors}
            />
          ) : videoContent[activeVideo]?.thumbnail ? (
            <div className="relative w-full aspect-video">
              <img 
                src={videoContent[activeVideo].thumbnail} 
                alt={videoContent[activeVideo].title} 
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ 
                    backgroundColor: colors.primary + 'CC',
                    color: colors.buttonText
                  }}
                >
                  <Play size={32} />
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full aspect-video bg-gray-800 flex items-center justify-center">
              <Play size={32} style={{ color: colors.text + '40' }} />
              <span className="ml-2 text-base" style={{ color: colors.text + '60' }}>{t("Video Preview")}</span>
            </div>
          )}
        </div>
        
        {/* Video title and description */}
        <div className="mb-6 text-center">
          <h3 
            className="text-lg font-bold mb-1" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {videoContent[activeVideo]?.title || 'Video Title'}
          </h3>
          
          {videoContent[activeVideo]?.description && (
            <p 
              className="text-sm" 
              style={{ color: colors.text + 'CC' }}
            >
              {videoContent[activeVideo].description}
            </p>
          )}
        </div>
        
        {/* Video thumbnails */}
        <div className="grid grid-cols-2 gap-3">
          {videoContent.map((video: any, index: number) => (
            <div 
              key={video.key} 
              className={`rounded-lg overflow-hidden cursor-pointer ${activeVideo === index ? 'ring-2' : ''}`}
              style={{ 
                ringColor: colors.primary
              }}
              onClick={() => setActiveVideo(index)}
            >
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
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full aspect-video object-cover"
                />
              ) : (
                <div 
                  className="w-full aspect-video flex items-center justify-center"
                  style={{ backgroundColor: colors.cardBg }}
                >
                  <Play size={24} style={{ color: colors.text + '40' }} />
                </div>
              )}
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
        className="px-5 py-10" 
        style={{ 
          backgroundColor: colors.cardBg
        }}
        id="youtube"
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("YouTube Channel")}
          </h2>
          <div 
            className="w-16 h-1 mx-auto rounded-full" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div className="space-y-4">
          {/* Latest Video Embed */}
          {youtubeData.latest_video_embed && (
            <div 
              className="rounded-lg overflow-hidden" 
              style={{ 
                backgroundColor: colors.background,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div className="p-3 mb-2">
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
                    'Latest Music Video'
                  )}
                />
              </div>
            </div>
          )}
          
          {/* Channel Info */}
          <div 
            className="p-6 rounded-lg" 
            style={{ 
              backgroundColor: colors.background,
              border: `1px solid ${colors.borderColor}`
            }}
          >
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mr-4">
                <Youtube className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg" style={{ color: colors.text, fontFamily: font }}>
                  {youtubeData.channel_name || 'Music Channel'}
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
                  {t("SUBSCRIBE")}
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
                  🎵 {t("MUSIC VIDEOS")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderServicesSection = (servicesData: any) => {
    const offerings = servicesData.offerings || [];
    if (!Array.isArray(offerings) || offerings.length === 0) return null;
    
    return (
      <div 
        className="px-5 py-10" 
        style={{ 
          backgroundColor: colors.background
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
            {t("Services")}
          </h2>
          <div 
            className="w-16 h-1 mx-auto rounded-full" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {offerings.map((service: any, index: number) => (
            <div 
              key={index} 
              className="p-5 rounded-lg" 
              style={{ 
                backgroundColor: colors.background,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div className="flex items-center mb-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                  style={{ 
                    backgroundColor: colors.primary + '20',
                    color: colors.primary
                  }}
                >
                  {getServiceIcon(service.icon)}
                </div>
                
                <div>
                  <h3 
                    className="text-lg font-bold" 
                    style={{ 
                      color: colors.text,
                      fontFamily: font
                    }}
                  >
                    {service.name}
                  </h3>
                  
                  {service.price && (
                    <p 
                      className="text-sm" 
                      style={{ color: colors.primary }}
                    >
                      {service.price}
                    </p>
                  )}
                </div>
              </div>
              
              {service.description && (
                <p 
                  className="text-sm" 
                  style={{ color: colors.text + 'CC' }}
                >
                  {service.description}
                </p>
              )}
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
            {t("Inquire About Services")}
          </Button>
        </div>
      </div>
    );
  };

  const renderContactSection = (contactData: any) => (
    <div 
      className="px-5 py-10" 
      style={{ 
        backgroundColor: colors.background
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
          {t("Contact")}
        </h2>
        <div 
          className="w-16 h-1 mx-auto rounded-full" 
          style={{ backgroundColor: colors.primary }}
        ></div>
      </div>
      
      <div className="space-y-4">
        {contactData.booking_email && (
          <div 
            className="p-4 rounded-lg" 
            style={{ 
              backgroundColor: colors.cardBg,
              border: `1px solid ${colors.borderColor}`
            }}
          >
            <div className="flex">
              <Mail 
                size={20} 
                className="mr-3 flex-shrink-0 mt-1" 
                style={{ color: colors.primary }}
              />
              <div>
                <p 
                  className="text-sm font-medium mb-1" 
                  style={{ color: colors.primary }}
                >
                  {t("BOOKING")}
                </p>
                <a 
                  href={`mailto:${contactData.booking_email}`} 
                  className="text-base" 
                  style={{ color: colors.text }}
                >
                  {contactData.booking_email}
                </a>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          {(contactData.email || data.email) && (
            <div 
              className="p-4 rounded-lg" 
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div className="flex items-center">
                <Mail 
                  size={20} 
                  className="mr-3 flex-shrink-0" 
                  style={{ color: colors.primary }}
                />
                <div className="min-w-0 flex-1">
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
          
          {(contactData.phone || data.phone) && (
            <div 
              className="p-4 rounded-lg" 
              style={{ 
                backgroundColor: colors.cardBg,
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
        </div>
        
        {contactData.address && (
          <div 
            className="p-4 rounded-lg" 
            style={{ 
              backgroundColor: colors.cardBg,
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
                  {t("LOCATION")}
                </p>
                <p 
                  className="text-sm" 
                  style={{ color: colors.text }}
                >
                  {contactData.address}
                </p>
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
        className="px-5 py-8" 
        style={{ 
          backgroundColor: colors.cardBg
        }}
        id="social"
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("Follow")}
          </h2>
          <div 
            className="w-16 h-1 mx-auto rounded-full" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          {socialLinks.map((link: any, index: number) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center transition-transform hover:scale-105"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                style={{ 
                  backgroundColor: colors.background,
                  color: colors.primary,
                  border: `1px solid ${colors.borderColor}`
                }}
              >
                <SocialIcon platform={link.platform} color="currentColor" />
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

  const renderTourDatesSection = (tourData: any) => {
    const events = tourData.events || [];
    if (!Array.isArray(events) || events.length === 0) return null;
    
    // Sort events by date
    const sortedEvents = [...events].sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    
    // Format date
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };
    
    return (
      <div 
        className="px-5 py-10" 
        style={{ 
          backgroundColor: colors.background
        }}
        id="tour"
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("Tour Dates")}
          </h2>
          <div 
            className="w-16 h-1 mx-auto rounded-full" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div className="space-y-4">
          {sortedEvents.map((event: any, index: number) => (
            <div 
              key={index} 
              className="p-4 rounded-lg" 
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <div 
                      className="w-12 h-12 rounded-lg flex flex-col items-center justify-center mr-3"
                      style={{ 
                        backgroundColor: colors.primary + '20',
                        color: colors.primary
                      }}
                    >
                      <span className="text-xs font-bold">{formatDate(event.date).split(' ')[0]}</span>
                      <span className="text-lg font-bold">{formatDate(event.date).split(' ')[1].replace(',', '')}</span>
                    </div>
                    
                    <div>
                      <h3 
                        className="text-base font-bold" 
                        style={{ 
                          color: colors.text,
                          fontFamily: font
                        }}
                      >
                        {event.venue}
                      </h3>
                      
                      <p 
                        className="text-xs" 
                        style={{ color: colors.text + 'CC' }}
                      >
                        {event.city}{event.country ? `, ${event.country}` : ''}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  {event.sold_out ? (
                    <Badge 
                      style={{ 
                        backgroundColor: '#F44336',
                        color: '#FFFFFF'
                      }}
                    >
                      {t("Sold Out")}
                    </Badge>
                  ) : event.ticket_url ? (
                    <Button
                      size="sm"
                      style={{ 
                        backgroundColor: colors.primary,
                        color: colors.buttonText
                      }}
                      onClick={() => typeof window !== "undefined" && window.open(event.ticket_url, "_blank", "noopener,noreferrer")}
                    >
                      <Ticket size={14} className="mr-1" />
                      {t("Tickets")}
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
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
          backgroundColor: colors.cardBg
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
            {t("Availability")}
          </h2>
          <div 
            className="w-16 h-1 mx-auto rounded-full" 
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
                  {hour.is_closed ? 'Unavailable' : `${hour.open_time} - ${hour.close_time}`}
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
        className="px-5 py-10" 
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
            {t("Gallery")}
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
              className="relative rounded-lg overflow-hidden aspect-square"
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
                  style={{ backgroundColor: colors.cardBg }}
                >
                  <Music size={24} style={{ color: colors.text + '40' }} />
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
        className="px-5 py-10" 
        style={{ 
          backgroundColor: colors.cardBg
        }}
        id="press"
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("Press & Reviews")}
          </h2>
          <div 
            className="w-16 h-1 mx-auto rounded-full" 
            style={{ backgroundColor: colors.primary }}
          ></div>
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
                    className="p-5 rounded-lg" 
                    style={{ 
                      backgroundColor: colors.background,
                      border: `1px solid ${colors.borderColor}`
                    }}
                  >
                    <p 
                      className="text-base italic mb-4" 
                      style={{ color: colors.text }}
                    >
                      "{review.review}"
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p 
                          className="text-sm font-bold" 
                          style={{ color: colors.primary }}
                        >
                          {review.reviewer_name}
                        </p>
                        
                        {review.source && (
                          <p 
                            className="text-xs" 
                            style={{ color: colors.text + '99' }}
                          >
                            {review.source}
                          </p>
                        )}
                      </div>
                      
                      {review.source_url && (
                        <a 
                          href={review.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs flex items-center"
                          style={{ color: colors.primary }}
                        >
                          {t("Read More")}
                          <ExternalLink size={12} className="ml-1" />
                        </a>
                      )}
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
    if (!appointmentsData.booking_email && !appointmentsData.booking_url) return null;
    
    return (
      <div 
        className="px-5 py-10" 
        style={{ 
          backgroundColor: colors.background
        }}
        id="booking"
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("Booking")}
          </h2>
          <div 
            className="w-16 h-1 mx-auto rounded-full" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div 
          className="p-5 rounded-lg" 
          style={{ 
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.borderColor}`
          }}
        >
          {appointmentsData.booking_description && (
            <p 
              className="text-sm mb-5" 
              style={{ color: colors.text }}
            >
              {appointmentsData.booking_description}
            </p>
          )}
          
          <Button
            className="w-full mb-3"
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
          
          {appointmentsData.booking_email && (
            <p 
              className="text-xs text-center" 
              style={{ color: colors.text + 'CC' }}
            >
              {t("Or email us directly at")}{' '}
              <a 
                href={`mailto:${appointmentsData.booking_email}`}
                style={{ color: colors.primary }}
              >
                {appointmentsData.booking_email}
              </a>
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderBandMembersSection = (bandData: any) => {
    const members = bandData.members || [];
    if (!Array.isArray(members) || members.length === 0) return null;
    
    return (
      <div 
        className="px-5 py-10" 
        style={{ 
          backgroundColor: colors.cardBg
        }}
        id="band"
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("The Band")}
          </h2>
          <div 
            className="w-16 h-1 mx-auto rounded-full" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div className="space-y-5">
          {members.map((member: any, index: number) => (
            <div 
              key={index} 
              className="flex items-start p-4 rounded-lg" 
              style={{ 
                backgroundColor: colors.background,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              {member.image ? (
                <div className="w-20 h-20 rounded-full overflow-hidden mr-4 flex-shrink-0">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div 
                  className="w-20 h-20 rounded-full mr-4 flex-shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <Users size={24} style={{ color: colors.primary }} />
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 
                      className="text-lg font-bold" 
                      style={{ 
                        color: colors.text,
                        fontFamily: font
                      }}
                    >
                      {member.name}
                    </h3>
                    
                    {member.role && (
                      <p 
                        className="text-sm" 
                        style={{ color: colors.primary }}
                      >
                        {member.role}
                      </p>
                    )}
                  </div>
                  
                  {member.instagram && (
                    <a 
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ 
                        backgroundColor: colors.primary,
                        color: colors.buttonText
                      }}
                    >
                      <Instagram size={16} />
                    </a>
                  )}
                </div>
                
                {member.bio && (
                  <p 
                    className="text-sm mt-2" 
                    style={{ color: colors.text + 'CC' }}
                  >
                    {member.bio}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMerchandiseSection = (merchData: any) => {
    const items = merchData.items || [];
    if (!Array.isArray(items) || items.length === 0) return null;
    
    return (
      <div 
        className="px-5 py-10" 
        style={{ 
          backgroundColor: colors.background
        }}
        id="merch"
      >
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t("Merchandise")}
          </h2>
          <div 
            className="w-16 h-1 mx-auto rounded-full" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {items.map((item: any, index: number) => (
            <div 
              key={index} 
              className="rounded-lg overflow-hidden" 
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full aspect-square object-cover"
                />
              ) : (
                <div 
                  className="w-full aspect-square flex items-center justify-center"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <ShoppingBag size={32} style={{ color: colors.primary }} />
                </div>
              )}
              
              <div className="p-3">
                <div className="flex justify-between items-start mb-1">
                  <h3 
                    className="text-base font-bold" 
                    style={{ 
                      color: colors.text,
                      fontFamily: font
                    }}
                  >
                    {item.name}
                  </h3>
                  
                  <span 
                    className="text-sm font-bold" 
                    style={{ color: colors.primary }}
                  >
                    {item.price}
                  </span>
                </div>
                
                {item.description && (
                  <p 
                    className="text-xs mb-2" 
                    style={{ color: colors.text + 'CC' }}
                  >
                    {item.description}
                  </p>
                )}
                
                {item.store_url && (
                  <a 
                    href={item.store_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs flex items-center"
                    style={{ color: colors.primary }}
                  >
                    {t("Buy Now")}
                    <ChevronRight size={12} className="ml-1" />
                  </a>
                )}
              </div>
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
        className="px-5 py-8" 
        style={{ 
          backgroundColor: colors.cardBg
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
            {t("Location")}
          </h2>
          <div 
            className="w-16 h-1 mx-auto rounded-full" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div className="space-y-3">
          {locationData.map_embed_url && (
            <div className="rounded-lg overflow-hidden" style={{ height: '200px' }}>
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
            {t("Mobile App")}
          </h2>
          <div 
            className="w-16 h-1 mx-auto rounded-full" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        
        <div 
          className="p-5 rounded-lg" 
          style={{ backgroundColor: colors.cardBg }}
        >
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
      </div>
    );
  };

  const renderContactFormSection = (formData: any) => {
    if (!formData.form_title) return null;
    
    return (
      <div 
        className="px-5 py-10" 
        style={{ 
          backgroundColor: colors.cardBg
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

  const renderThankYouSection = (thankYouData: any) => {
    if (!thankYouData.message) return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ backgroundColor: colors.background }}
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

  const renderCustomHtmlSection = (customHtmlData: any) => {
    if (!customHtmlData.html_content) return null;
    
    return (
      <div 
        className="px-5 py-10" 
        style={{ 
          backgroundColor: colors.background
        }}
      >
        {customHtmlData.show_title && customHtmlData.section_title && (
          <div className="text-center mb-6">
            <h2 
              className="text-2xl font-bold mb-2" 
              style={{ 
                color: colors.primary,
                fontFamily: font
              }}
            >
              <Music className="w-6 h-6 mr-2 inline" />
              {customHtmlData.section_title}
            </h2>
            <div 
              className="w-16 h-1 mx-auto rounded-full" 
              style={{ backgroundColor: colors.primary }}
            ></div>
          </div>
        )}
        <div 
          className="custom-html-content p-5 rounded-lg" 
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
                background-color: ${colors.accent}40;
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
        className="px-5 py-10" 
        style={{ 
          backgroundColor: colors.cardBg
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
            <Share2 className="w-6 h-6 mr-2 inline" />
            {t("Share the Music")}
          </h2>
          <div 
            className="w-16 h-1 mx-auto rounded-full" 
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
        <div 
          className="text-center p-5 rounded-lg" 
          style={{ 
            backgroundColor: colors.background,
            border: `1px solid ${colors.borderColor}`
          }}
        >
          {qrData.qr_title && (
            <h4 className="font-bold text-lg mb-2" style={{ color: colors.text, fontFamily: font }}>
              {qrData.qr_title}
            </h4>
          )}
          
          {qrData.qr_description && (
            <p className="text-sm mb-4" style={{ color: colors.text + 'CC', fontFamily: font }}>
              {qrData.qr_description}
            </p>
          )}
          
          <Button 
            className="w-full py-3 font-bold" 
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText,
              fontFamily: font
            }}
            onClick={() => setShowQrModal(true)}
          >
            <QrCode className="w-5 h-5 mr-2" />
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
        className="px-5 py-10" 
        style={{ 
          backgroundColor: colors.cardBg
        }}
      >
        {footerData.footer_text && (
          <p 
            className="text-sm text-center mb-6" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {footerData.footer_text}
          </p>
        )}
        
        {footerData.footer_links && Array.isArray(footerData.footer_links) && footerData.footer_links.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3">
            {footerData.footer_links.map((link: any, index: number) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-4 py-2 rounded-full transition-colors font-medium"
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
        style={{ backgroundColor: colors.accent }}
      >
        <p 
          className="text-xs text-center" 
          style={{ color: colors.text + '99' }}
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