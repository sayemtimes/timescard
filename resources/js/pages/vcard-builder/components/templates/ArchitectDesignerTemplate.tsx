import { handleAppointmentBooking } from '../VCardPreview';
import React from 'react';
import StableHtmlContent from '@/components/StableHtmlContent';
import { VideoEmbed, extractVideoUrl } from '@/components/VideoEmbed';
import { createYouTubeEmbedRef } from '@/utils/youtubeEmbedUtils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Globe, MapPin, Calendar, UserPlus, Compass, Layers, Square, Triangle, Ruler, Video, Play, Youtube, QrCode } from 'lucide-react';
import SocialIcon from '../../../link-bio-builder/components/SocialIcon';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionOrder } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';

import { useTranslation } from 'react-i18next';
import { sanitizeVideoData } from '@/utils/secureVideoUtils';
import languageData from '@/../../resources/lang/language.json';

interface ArchitectDesignerTemplateProps {
  data: any;
  template: any;
}

export default function ArchitectDesignerTemplate({ data, template }: ArchitectDesignerTemplateProps) {
  const { t, i18n } = useTranslation();
  const configSections = data.config_sections || {};
  
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
    primary: '#2C3E50', 
    secondary: '#34495E', 
    accent: '#E74C3C', 
    background: '#FFFFFF', 
    text: '#2C3E50',
    cardBg: '#F8F9FA',
    borderColor: '#E9ECEF',
    shadowColor: 'rgba(44, 62, 80, 0.1)'
  };
  const font = configSections.font || template?.defaultFont || 'Playfair Display, serif';

  // Get all sections for this business type
  const allSections = getBusinessTemplate('architect-designer')?.sections || [];

  const renderSection = (sectionKey: string) => {
    const sectionData = configSections[sectionKey] || {};
    if (!sectionData || Object.keys(sectionData).length === 0 || sectionData.enabled === false) return null;
    
    switch (sectionKey) {
      case 'header':
        return renderHeaderSection(sectionData);
      case 'contact':
        return renderContactSection(sectionData);
      case 'about':
        return renderAboutSection(sectionData);
      case 'services':
        return renderServicesSection(sectionData);
      case 'portfolio':
        return renderPortfolioSection(sectionData);
      case 'videos':
        return renderVideosSection(sectionData);
      case 'youtube':
        return renderYouTubeSection(sectionData);
      case 'design_process':
        return renderDesignProcessSection(sectionData);
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
      default:
        return null;
    }
  };

  const renderHeaderSection = (headerData: any) => (
    <div className="relative rounded-t-2xl" style={{ 
      background: `linear-gradient(135deg, ${colors.background}, ${colors.cardBg})`,
      minHeight: '180px',
      overflow: 'visible'
    }}>
      {/* Architectural grid lines */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="fill-none stroke-current" style={{ color: colors.primary }}>
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Blueprint corner elements */}
      <div className="absolute top-4 left-4 opacity-20">
        <div className="flex items-center space-x-1">
          <Square className="w-3 h-3" style={{ color: colors.primary }} />
          <Triangle className="w-3 h-3" style={{ color: colors.accent }} />
          <div className="w-8 h-0.5" style={{ backgroundColor: colors.secondary }}></div>
        </div>
      </div>
      
      <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3`} style={{ zIndex: 9999 }}>
        {/* Language Selector */}
        {configSections.language && (
          <div className="relative" style={{ zIndex: 99999, position: 'relative' }}>
            <button
              onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="flex items-center space-x-1 px-2 py-1 rounded text-xs transition-colors"
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.primary}`,
                color: colors.text,
                position: 'relative',
                zIndex: 99999
              }}
            >
              <Globe className="w-3 h-3" />
              <span>{languageData.find(lang => lang.code === currentLanguage)?.name || 'EN'}</span>
            </button>
            
            {showLanguageSelector && (
              <div 
                className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-xl border py-1 min-w-[140px] max-h-48 overflow-y-auto"
                style={{ 
                  zIndex: 999999,
                  borderColor: colors.borderColor
                }}
              >
                {languageData.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-gray-100 transition-colors flex items-center space-x-2"
                    style={{
                      backgroundColor: currentLanguage === lang.code ? colors.accent + '20' : 'transparent',
                      color: currentLanguage === lang.code ? colors.accent : colors.text
                    }}
                  >
                    <span className="text-sm">{String.fromCodePoint(...lang.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt()))}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        
        <div className="opacity-20">
          <Compass className="w-6 h-6" style={{ color: colors.primary }} />
        </div>
      </div>
      
      <div className="relative px-6 py-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-lg border-2 shadow-xl overflow-hidden" 
                 style={{ 
                   borderColor: colors.primary,
                   boxShadow: `0 8px 25px ${colors.shadowColor}`
                 }}>
              {headerData.profile_image ? (
                <img src={headerData.profile_image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: colors.cardBg }}>
                  <Layers className="w-8 h-8" style={{ color: colors.primary }} />
                </div>
              )}
            </div>
            {/* Blueprint corner markers */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2" style={{ borderColor: colors.accent }}></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2" style={{ borderColor: colors.accent }}></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2" style={{ borderColor: colors.accent }}></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2" style={{ borderColor: colors.accent }}></div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-xl font-bold mb-1" style={{ color: colors.text, fontFamily: font }}>
              {headerData.name || data.name || 'Design Professional'}
            </h1>
            
            <div className="inline-flex items-center px-3 py-1 rounded mb-2" 
                 style={{ backgroundColor: colors.primary, color: 'white' }}>
              <Ruler className="w-3 h-3 mr-2" />
              <span className="text-sm font-medium" style={{ fontFamily: font }}>
                {headerData.title || 'Architect & Designer'}
              </span>
            </div>
            
            {headerData.tagline && (
              <p className="text-xs leading-relaxed" style={{ color: colors.text + 'CC', fontFamily: font }}>
                {headerData.tagline}
              </p>
            )}
          </div>
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

  const renderContactSection = (contactData: any) => (
    <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor}` }}>
      <div className="grid grid-cols-2 gap-3">
        {(contactData.email || data.email) && (
          <a href={`mailto:${contactData.email || data.email}`}
             className="flex items-center space-x-2 p-3 rounded-lg transition-all hover:scale-105"
             style={{ 
               backgroundColor: colors.cardBg, 
               border: `1px solid ${colors.borderColor}`,
               boxShadow: `0 2px 8px ${colors.shadowColor}`
             }}>
            <div className="w-8 h-8 rounded flex items-center justify-center" 
                 style={{ backgroundColor: colors.primary }}>
              <Mail className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-medium" style={{ color: colors.text, fontFamily: font }}>{t('Email')}</span>
          </a>
        )}
        
        {(contactData.phone || data.phone) && (
          <a href={`tel:${contactData.phone || data.phone}`}
             className="flex items-center space-x-2 p-3 rounded-lg transition-all hover:scale-105"
             style={{ 
               backgroundColor: colors.cardBg, 
               border: `1px solid ${colors.borderColor}`,
               boxShadow: `0 2px 8px ${colors.shadowColor}`
             }}>
            <div className="w-8 h-8 rounded flex items-center justify-center" 
                 style={{ backgroundColor: colors.secondary }}>
              <Phone className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-medium" style={{ color: colors.text, fontFamily: font }}>{t('Call')}</span>
          </a>
        )}
        
        {(contactData.website || data.website) && (
          <a href={contactData.website || data.website} target="_blank" rel="noopener noreferrer"
             className="flex items-center space-x-2 p-3 rounded-lg transition-all hover:scale-105"
             style={{ 
               backgroundColor: colors.cardBg, 
               border: `1px solid ${colors.borderColor}`,
               boxShadow: `0 2px 8px ${colors.shadowColor}`
             }}>
            <div className="w-8 h-8 rounded flex items-center justify-center" 
                 style={{ backgroundColor: colors.accent }}>
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-medium" style={{ color: colors.text, fontFamily: font }}>{t('Portfolio')}</span>
          </a>
        )}
        
        {contactData.location && (
          <div className="flex items-center space-x-2 p-3 rounded-lg"
               style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.borderColor}` }}>
            <div className="w-8 h-8 rounded flex items-center justify-center" 
                 style={{ backgroundColor: colors.primary + '30' }}>
              <MapPin className="w-4 h-4" style={{ color: colors.primary }} />
            </div>
            <span className="text-xs font-medium truncate" style={{ color: colors.text, fontFamily: font }}>
              {contactData.location}
            </span>
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
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor}` }}>
        <div className="relative p-4 rounded-lg" style={{ 
          backgroundColor: colors.cardBg, 
          border: `1px solid ${colors.borderColor}`,
          boxShadow: `0 4px 12px ${colors.shadowColor}`
        }}>
          <div className="flex items-center space-x-2 mb-3">
            <Compass className="w-4 h-4" style={{ color: colors.primary }} />
            <h3 className="font-bold text-sm" style={{ color: colors.primary, fontFamily: font }}>{t('Design Philosophy')}</h3>
          </div>
          
          <p className="text-sm leading-relaxed mb-3" style={{ color: colors.text, fontFamily: font }}>
            {aboutData.description || data.description}
          </p>
          
          {aboutData.specialties && (
            <div className="mb-3">
              <p className="text-xs font-bold mb-2" style={{ color: colors.secondary, fontFamily: font }}>{t("Specialties:")}</p>
              <div className="flex flex-wrap gap-1">
                {aboutData.specialties.split(',').map((specialty: string, index: number) => (
                  <Badge key={index} className="text-xs" 
                         style={{ backgroundColor: colors.accent + '20', color: colors.accent, border: `1px solid ${colors.accent}` }}>
                    {specialty.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            {aboutData.experience && (
              <div className="text-center">
                <div className="w-12 h-12 rounded flex items-center justify-center mb-1" 
                     style={{ backgroundColor: colors.primary + '20', border: `2px solid ${colors.primary}` }}>
                  <span className="text-sm font-bold" style={{ color: colors.primary, fontFamily: font }}>
                    {aboutData.experience}
                  </span>
                </div>
                <p className="text-xs" style={{ color: colors.text, fontFamily: font }}>{t('Years')}</p>
              </div>
            )}
            
            {aboutData.education && (
              <div className="flex-1 ml-4">
                <p className="text-xs font-bold mb-1" style={{ color: colors.accent, fontFamily: font }}>{t('Credentials')}:</p>
                <p className="text-xs" style={{ color: colors.text + 'CC', fontFamily: font }}>
                  {aboutData.education}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderServicesSection = (servicesData: any) => {
    const services = servicesData.service_list || [];
    if (!Array.isArray(services) || services.length === 0) return null;
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor}` }}>
        <h3 className="font-bold text-sm mb-3 flex items-center" style={{ color: colors.primary, fontFamily: font }}>
          <Layers className="w-4 h-4 mr-2" />
          {t('Design Services')}
        </h3>
        <div className="space-y-3">
          {services.map((service: any, index: number) => (
            <div key={index} className="p-3 rounded-lg transition-all hover:scale-102" 
                 style={{ 
                   backgroundColor: colors.cardBg, 
                   border: `1px solid ${colors.borderColor}`,
                   boxShadow: `0 2px 8px ${colors.shadowColor}`
                 }}>
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>
                  {service.title}
                </h4>
                <div className="flex flex-col items-end">
                  <Badge className="text-xs mb-1" 
                         style={{ backgroundColor: colors.secondary + '20', color: colors.secondary }}>
                    {service.category}
                  </Badge>
                  {service.price_range && (
                    <span className="text-xs font-medium" style={{ color: colors.primary, fontFamily: font }}>
                      {service.price_range}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: colors.text + 'CC', fontFamily: font }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPortfolioSection = (portfolioData: any) => {
    const projects = portfolioData.projects || [];
    if (!Array.isArray(projects) || projects.length === 0) return null;
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor}` }}>
        <h3 className="font-bold text-sm mb-3 text-center" style={{ color: colors.primary, fontFamily: font }}>
          📐 {t('Featured Projects')}
        </h3>
        <div className="space-y-3">
          {projects.slice(0, 3).map((project: any, index: number) => (
            <div key={index} className="relative">
              <div className="aspect-video rounded-lg overflow-hidden mb-2" 
                   style={{ backgroundColor: colors.cardBg, border: `2px solid ${colors.borderColor}` }}>
                {project.image ? (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" 
                       style={{ background: `linear-gradient(45deg, ${colors.primary}10, ${colors.secondary}10)` }}>
                    <div className="text-center">
                      <div className="text-2xl mb-2">
                        {project.type === 'residential' ? '🏠' : 
                         project.type === 'commercial' ? '🏢' : 
                         project.type === 'hospitality' ? '🏨' : 
                         project.type === 'office' ? '💼' : 
                         project.type === 'retail' ? '🛍️' : '🏛️'}
                      </div>
                      <p className="text-xs font-bold" style={{ color: colors.primary, fontFamily: font }}>
                        {project.title}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.borderColor}` }}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>
                    {project.title}
                  </h4>
                  <div className="flex space-x-1">
                    <Badge className="text-xs" style={{ backgroundColor: colors.accent + '20', color: colors.accent }}>
                      {project.type}
                    </Badge>
                    {project.year && (
                      <Badge className="text-xs" style={{ backgroundColor: colors.secondary + '20', color: colors.secondary }}>
                        {project.year}
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-xs mb-2" style={{ color: colors.text + 'CC', fontFamily: font }}>
                  {project.description}
                </p>
                {project.size && (
                  <p className="text-xs" style={{ color: colors.primary, fontFamily: font }}>
                    Size: {project.size}
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
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor}` }}>
        <h3 className="font-bold text-sm mb-3 flex items-center" style={{ color: colors.primary, fontFamily: font }}>
          <Video className="w-4 h-4 mr-2" />
          {t('Design Process Videos')}
        </h3>
        <div className="space-y-3">
          {videoContent.map((video: any) => (
            <div key={video.key} className="rounded-lg overflow-hidden" 
                 style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.borderColor}` }}>
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
                  <div 
                    className="relative w-full h-32 cursor-pointer" 
                    onClick={() => {
                      if (video.video_url) {
                        typeof window !== "undefined" && window.open(video.video_url, '_blank', 'noopener,noreferrer');
                      }
                    }}
                  >
                    <img 
                      src={video.thumbnail} 
                      alt={video.title || 'Design video'} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center hover:bg-opacity-30 transition-all">
                      <div className="w-12 h-12 rounded-full bg-white bg-opacity-90 flex items-center justify-center hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 ml-1" style={{ color: colors.primary }} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-32 flex items-center justify-center" style={{ backgroundColor: colors.accent + '20' }}>
                    <div className="text-center">
                      <Video className="w-8 h-8 mx-auto mb-2" style={{ color: colors.primary }} />
                      <span className="text-xs font-medium" style={{ color: colors.primary, fontFamily: font }}>{t("Design Showcase")}</span>
                    </div>
                  </div>
                )}
              </div>
              {(video.title || video.description || video.duration || video.project_type) && (
                <div className="p-3">
                  {video.title && (
                    <h4 className="font-bold text-sm mb-1" style={{ color: colors.text, fontFamily: font }}>
                      {video.title}
                    </h4>
                  )}
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
                    {video.project_type && (
                      <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: colors.accent + '20', color: colors.accent, fontFamily: font }}>
                        🏗️ {video.project_type}
                      </span>
                    )}
                  </div>
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
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor}` }}>
        <h3 className="font-bold text-sm mb-3 flex items-center" style={{ color: colors.primary, fontFamily: font }}>
          <Youtube className="w-4 h-4 mr-2" />
          {t('YouTube Channel')}
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
                {youtubeData.channel_name || 'Design Studio'}
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
                🏗️ {t("DESIGN PROCESS")}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderDesignProcessSection = (processData: any) => {
    const steps = processData.process_steps || [];
    if (!Array.isArray(steps) || steps.length === 0) return null;
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor}` }}>
        <h3 className="font-bold text-sm mb-3 text-center" style={{ color: colors.primary, fontFamily: font }}>
          🔄 {t('Design Process')}
        </h3>
        <div className="space-y-3">
          {steps.sort((a, b) => a.step_number - b.step_number).map((step: any, index: number) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg" 
                 style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.borderColor}` }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" 
                   style={{ backgroundColor: colors.primary, color: 'white' }}>
                <span className="text-xs font-bold" style={{ fontFamily: font }}>
                  {step.step_number}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm mb-1" style={{ color: colors.text, fontFamily: font }}>
                  {step.step_title}
                </h4>
                <p className="text-xs mb-1" style={{ color: colors.text + 'CC', fontFamily: font }}>
                  {step.step_description}
                </p>
                {step.duration && (
                  <span className="text-xs px-2 py-1 rounded" 
                        style={{ backgroundColor: colors.accent + '20', color: colors.accent, fontFamily: font }}>
                    {step.duration}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSocialSection = (socialData: any) => {
    const socialLinks = socialData.social_links || [];
    if (!Array.isArray(socialLinks) || socialLinks.length === 0) return null;
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor}` }}>
        <h3 className="font-bold text-sm mb-3 text-center" style={{ color: colors.primary, fontFamily: font }}>
          {t('Design Inspiration')}
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {socialLinks.map((link: any, index: number) => (
            <Button key={index} size="sm" variant="outline" className="justify-start text-xs" 
                    style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}
                    onClick={() => link.url && typeof window !== "undefined" && window.open(link.url, '_blank', 'noopener,noreferrer')}>
              <SocialIcon platform={link.platform} color={colors.primary} />
              <span className="capitalize ml-2">{link.platform}</span>
            </Button>
          ))}
        </div>
      </div>
    );
  };

  const renderBusinessHoursSection = (hoursData: any) => {
    const hours = hoursData.hours || [];
    if (!Array.isArray(hours) || hours.length === 0) return null;
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor}` }}>
        <h3 className="font-bold text-sm mb-3 text-center" style={{ color: colors.primary, fontFamily: font }}>
          {t('Studio Hours')}
        </h3>
        <div className="space-y-2">
          {hours.slice(0, 7).map((hour: any, index: number) => (
            <div key={index} className="flex justify-between items-center p-2 rounded" 
                 style={{ backgroundColor: hour.is_closed ? colors.background : colors.cardBg }}>
              <span className="capitalize font-medium text-xs" style={{ color: colors.text, fontFamily: font }}>
                {hour.day}
              </span>
              <span className="text-xs" style={{ color: hour.is_closed ? colors.text + '60' : colors.primary, fontFamily: font }}>
                {hour.is_closed ? 'Closed' : `${hour.open_time} - ${hour.close_time}`}
              </span>
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
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor}` }}>
        <h3 className="font-bold text-sm mb-3 text-center" style={{ color: colors.primary, fontFamily: font }}>
          ⭐ {t('Client Reviews')}
        </h3>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentReview * 100}%)` }}
            >
              {reviews.map((review: any, index: number) => (
                <div key={index} className="w-full flex-shrink-0 px-1">
                  <div className="p-3 rounded-lg" 
                       style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.borderColor}` }}>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-3 h-3 rounded-full ${i < parseInt(review.rating || 5) ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                      ))}
                    </div>
                    <p className="text-xs mb-2 leading-relaxed italic" style={{ color: colors.text, fontFamily: font }}>
                      "{review.review}"
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-bold" style={{ color: colors.primary, fontFamily: font }}>
                        - {review.client_name}
                      </p>
                      {review.project_type && (
                        <Badge className="text-xs" style={{ backgroundColor: colors.accent + '20', color: colors.accent }}>
                          {review.project_type}
                        </Badge>
                      )}
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

  const renderAppointmentsSection = (appointmentsData: any) => {
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor}` }}>
        <div className="text-center p-4 rounded-lg" style={{ 
          backgroundColor: colors.cardBg, 
          border: `1px solid ${colors.borderColor}`,
          boxShadow: `0 4px 12px ${colors.shadowColor}`
        }}>
          <h3 className="font-bold text-sm mb-2" style={{ color: colors.primary, fontFamily: font }}>
            📋 {t('Design Consultation')}
          </h3>
          {appointmentsData?.consultation_info && (
            <p className="text-xs mb-3" style={{ color: colors.text, fontFamily: font }}>
              {appointmentsData.consultation_info}
            </p>
          )}
          <Button size="sm" className="rounded-lg" 
                  style={{ backgroundColor: colors.primary, color: 'white', fontFamily: font }}
                  onClick={() => handleAppointmentBooking(configSections.appointments)}>
            <Calendar className="w-4 h-4 mr-2" />
            {t('Schedule Meeting')}
          </Button>
        </div>
      </div>
    );
  };

  const renderLocationSection = (locationData: any) => {
    if (!locationData.map_embed_url && !locationData.directions_url) return null;
    
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor}` }}>
        <h3 className="font-bold text-sm mb-3 flex items-center" style={{ color: colors.primary, fontFamily: font }}>
          <MapPin className="w-4 h-4 mr-2" />
          {t('Studio Location')}
        </h3>
        
        <div className="space-y-3">
          {locationData.map_embed_url && (
            <div className="rounded-lg overflow-hidden" style={{ height: '200px' }}>
              <div dangerouslySetInnerHTML={{ __html: locationData.map_embed_url }} className="w-full h-full" />
            </div>
          )}
          
          {locationData.directions_url && (
            <Button size="sm" variant="outline" className="w-full rounded-lg" 
                    style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}
                    onClick={() => typeof window !== "undefined" && window.open(locationData.directions_url, '_blank', 'noopener,noreferrer')}>
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
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor}` }}>
        <div className="grid grid-cols-2 gap-2">
          {appData.app_store_url && (
            <Button size="sm" variant="outline" style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}
                    onClick={() => typeof window !== "undefined" && window.open(appData.app_store_url, '_blank', 'noopener,noreferrer')}>
              {t("App Store")}
            </Button>
          )}
          {appData.play_store_url && (
            <Button size="sm" variant="outline" style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}
                    onClick={() => typeof window !== "undefined" && window.open(appData.play_store_url, '_blank', 'noopener,noreferrer')}>
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
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor}` }}>
        <div className="text-center p-4 rounded-lg" style={{ 
          backgroundColor: colors.cardBg,
          border: `1px solid ${colors.borderColor}`
        }}>
          <h3 className="font-bold text-sm mb-2" style={{ color: colors.secondary, fontFamily: font }}>
            {formData.form_title}
          </h3>
          {formData.form_description && (
            <p className="text-xs mb-3" style={{ color: colors.text, fontFamily: font }}>
              {formData.form_description}
            </p>
          )}
          <Button size="sm" className="rounded-lg" 
                  style={{ backgroundColor: colors.secondary, color: 'white', fontFamily: font }}
                  onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}>
            <Mail className="w-4 h-4 mr-2" />
            {t("Start Project")}
          </Button>
        </div>
      </div>
    );
  };

  const renderCustomHtmlSection = (customHtmlData: any) => {
    if (!customHtmlData.html_content) return null;
    
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor}` }}>
        {customHtmlData.show_title && customHtmlData.section_title && (
          <h3 className="font-bold text-sm mb-3 flex items-center" style={{ color: colors.primary, fontFamily: font }}>
            <Layers className="w-4 h-4 mr-2" />
            {customHtmlData.section_title}
          </h3>
        )}
        <div 
          className="custom-html-content p-3 rounded-lg" 
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
                color: ${colors.accent};
                text-decoration: underline;
              }
              .custom-html-content ul, .custom-html-content ol {
                color: ${colors.text};
                padding-left: 1rem;
                font-family: ${font};
              }
              .custom-html-content code {
                background-color: ${colors.primary}20;
                color: ${colors.accent};
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
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor}` }}>
        <div className="text-center p-4 rounded-lg" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.borderColor}` }}>
          {qrData.qr_title && (
            <h4 className="font-bold text-sm mb-2" style={{ color: colors.primary, fontFamily: font }}>
              {qrData.qr_title}
            </h4>
          )}
          
          {qrData.qr_description && (
            <p className="text-xs mb-3" style={{ color: colors.text, fontFamily: font }}>
              {qrData.qr_description}
            </p>
          )}
          
          <Button 
            size="sm" 
            className="w-full" 
            style={{ 
              backgroundColor: colors.primary,
              color: 'white',
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

  const renderThankYouSection = (thankYouData: any) => {
    if (!thankYouData.message) return null;
    return (
      <div className="px-6 pb-2">
        <p className="text-xs text-center italic" style={{ color: colors.text + '80', fontFamily: font }}>
          {thankYouData.message}
        </p>
      </div>
    );
  };

  const copyrightSection = configSections.copyright;
  
  // Get ordered sections using the utility function
  const orderedSectionKeys = getSectionOrder(data.template_config || { sections: configSections, sectionSettings: configSections }, allSections);
  
  return (
    <>
      <style>{`
        .video-container iframe {
          width: 100% !important;
          height: 180px !important;
          border: none;
        }
        .video-container {
          position: relative;
          width: 100%;
          height: 180px;
          overflow: hidden;
        }
      `}</style>
      <div className="w-full max-w-md mx-auto rounded-2xl overflow-hidden" style={{ 
        fontFamily: font,
        backgroundColor: colors.background,
        boxShadow: `0 12px 40px ${colors.shadowColor}`,
        border: `1px solid ${colors.borderColor}`,
        direction: isRTL ? 'rtl' : 'ltr'
      }}>
      {orderedSectionKeys
        .filter(key => key !== 'colors' && key !== 'font' && key !== 'copyright')
        .map((sectionKey) => (
          <React.Fragment key={sectionKey}>
            {renderSection(sectionKey)}
          </React.Fragment>
        ))}
      
      <div className="p-6 space-y-3" style={{ backgroundColor: colors.cardBg }}>
        <Button className="w-full h-12 font-bold rounded-lg transition-all hover:scale-105" 
                style={{ 
                  backgroundColor: colors.primary,
                  color: 'white',
                  fontFamily: font,
                  boxShadow: `0 4px 15px ${colors.shadowColor}`
                }}
                onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <Compass className="w-5 h-5 mr-2" />
          {t('Design Your Space')}
        </Button>
        
        <Button size="sm" variant="outline" className="w-full rounded-lg" 
                style={{ borderColor: colors.accent, color: colors.accent, fontFamily: font }}
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
                }}>
          <UserPlus className="w-4 h-4 mr-2" />
          {t('Save Contact')}
        </Button>
      </div>
      
      {copyrightSection && (
        <div className="px-6 pb-4 pt-2">
          {copyrightSection.text && (
            <p className="text-xs text-center" style={{ color: colors.text + '60', fontFamily: font }}>
              {copyrightSection.text}
            </p>
          )}
        </div>
      )}
      </div>
    </>
  );
}