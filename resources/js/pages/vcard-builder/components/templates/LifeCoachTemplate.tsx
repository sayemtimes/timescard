import { handleAppointmentBooking } from '../VCardPreview';
import React from 'react';
import StableHtmlContent from '@/components/StableHtmlContent';
import { VideoEmbed, extractVideoUrl } from '@/components/VideoEmbed';
import { createYouTubeEmbedRef } from '@/utils/youtubeEmbedUtils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Globe, MapPin, Calendar, UserPlus, Target, TrendingUp, Star, Lightbulb, Zap, Video, Play, Youtube, Share2, QrCode } from 'lucide-react';
import SocialIcon from '../../../link-bio-builder/components/SocialIcon';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionOrder } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';
import { useTranslation } from 'react-i18next';
import { sanitizeText, sanitizeUrl } from '@/utils/sanitizeHtml';
import languageData from '@/../../resources/lang/language.json';

interface LifeCoachTemplateProps {
  data: any;
  template: any;
}

export default function LifeCoachTemplate({ data, template }: LifeCoachTemplateProps) {
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
      
      const videoData = video.embed_url ? extractVideoUrl(video.embed_url) : null;
      return {
        ...video,
        videoData,
        key: `video-${index}-${video.title || ''}-${video.embed_url || ''}`
      };
    });
  }, [configSections.videos?.video_list]);

  const colors = configSections.colors || template?.defaultColors || { primary: '#FF6B35', secondary: '#F7931E', accent: '#FFD23F', background: '#FFF9F0', text: '#2D1B69' };
  const font = configSections.font || template?.defaultFont || 'Montserrat, sans-serif';

  // Get all sections for this business type
  const allSections = getBusinessTemplate('life-coach')?.sections || [];

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
      case 'programs':
        return renderProgramsSection(sectionData);
      case 'videos':
        return renderVideosSection(sectionData);
      case 'youtube':
        return renderYouTubeSection(sectionData);
      case 'transformations':
        return renderTransformationsSection(sectionData);
      case 'speaking':
        return renderSpeakingSection(sectionData);
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
    <div className="relative rounded-t-3xl overflow-hidden" style={{ 
      background: `radial-gradient(circle at top right, ${colors.primary}20, ${colors.secondary}15, ${colors.accent}10)`,
      minHeight: '220px'
    }}>
      {/* Inspirational rays */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="absolute opacity-10" 
               style={{ 
                 top: '20%', 
                 left: '50%',
                 width: '2px',
                 height: '100px',
                 background: `linear-gradient(to bottom, ${colors.primary}, transparent)`,
                 transform: `rotate(${i * 30}deg)`,
                 transformOrigin: 'top center'
               }}></div>
        ))}
      </div>
      
      <div className="relative px-6 py-8 text-center">
        {/* Language Selector */}
        {configSections.language && (
          <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}>
            <div className="relative">
              <button
                onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                className="flex items-center space-x-1 px-3 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
                  color: colors.text,
                  backdropFilter: 'blur(10px)',
                  border: `2px solid ${colors.primary}30`,
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
        
        <div className="w-28 h-28 mx-auto mb-4 rounded-full border-4 shadow-2xl overflow-hidden relative" 
             style={{ 
               borderColor: colors.primary, 
               boxShadow: `0 0 40px ${colors.primary}30`
             }}>
          {headerData.profile_image ? (
            <img src={headerData.profile_image} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center" 
                 style={{ background: `linear-gradient(135deg, ${colors.cardBg}, ${colors.accent}20)` }}>
              <Target className="w-12 h-12" style={{ color: colors.primary }} />
            </div>
          )}
          {/* Success aura */}
          <div className="absolute -inset-2 rounded-full animate-pulse" 
               style={{ 
                 background: `conic-gradient(${colors.primary}40, ${colors.secondary}40, ${colors.accent}40, ${colors.primary}40)`,
                 animationDuration: '3s'
               }}></div>
        </div>
        
        <h1 className="text-2xl font-bold mb-2" style={{ color: colors.text, fontFamily: font }}>
          {sanitizeText(headerData.name || data.name || 'Life Coach')}
        </h1>
        
        <div className="inline-flex items-center px-6 py-2 rounded-full mb-3" 
             style={{ 
               background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
               color: 'white'
             }}>
          <Star className="w-4 h-4 mr-2" />
          <span className="text-sm font-semibold" style={{ fontFamily: font }}>
            {sanitizeText(headerData.title || 'Transformation Expert')}
          </span>
        </div>
        
        {headerData.tagline && (
          <p className="text-sm italic max-w-sm mx-auto leading-relaxed" style={{ color: colors.text + 'DD', fontFamily: font }}>
            "{sanitizeText(headerData.tagline)}"
          </p>
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

  const renderContactSection = (contactData: any) => (
    <div className="px-6 py-4">
      <div className="grid grid-cols-2 gap-4">
        {(contactData.email || data.email) && (
          <a href={`mailto:${contactData.email || data.email}`}
             className="flex flex-col items-center p-4 rounded-2xl transition-all hover:scale-105"
             style={{ 
               backgroundColor: colors.cardBg, 
               border: `3px solid ${colors.primary}20`,
               boxShadow: `0 8px 25px ${colors.primary}15`
             }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2" 
                 style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
              <Mail className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-semibold text-center" style={{ color: colors.text, fontFamily: font }}>
              Connect
            </span>
          </a>
        )}
        
        {(contactData.phone || data.phone) && (
          <a href={`tel:${contactData.phone || data.phone}`}
             className="flex flex-col items-center p-4 rounded-2xl transition-all hover:scale-105"
             style={{ 
               backgroundColor: colors.cardBg, 
               border: `3px solid ${colors.secondary}20`,
               boxShadow: `0 8px 25px ${colors.secondary}15`
             }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2" 
                 style={{ background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})` }}>
              <Phone className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-semibold text-center" style={{ color: colors.text, fontFamily: font }}>
              Call
            </span>
          </a>
        )}
        
        {(contactData.website || data.website) && (
          <a href={contactData.website || data.website} target="_blank" rel="noopener noreferrer"
             className="flex flex-col items-center p-4 rounded-2xl transition-all hover:scale-105"
             style={{ 
               backgroundColor: colors.cardBg, 
               border: `3px solid ${colors.accent}20`,
               boxShadow: `0 8px 25px ${colors.accent}15`
             }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2" 
                 style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})` }}>
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-semibold text-center" style={{ color: colors.text, fontFamily: font }}>
              Explore
            </span>
          </a>
        )}
        
        {contactData.location && (
          <div className="flex flex-col items-center p-4 rounded-2xl"
               style={{ backgroundColor: colors.cardBg, border: `3px solid ${colors.primary}10` }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2" 
                 style={{ backgroundColor: colors.primary + '20' }}>
              <MapPin className="w-6 h-6" style={{ color: colors.primary }} />
            </div>
            <span className="text-xs font-semibold text-center" style={{ color: colors.text, fontFamily: font }}>
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
      <div className="px-6 py-4">
        <div className="relative p-6 rounded-3xl" style={{ 
          backgroundColor: colors.cardBg, 
          border: `3px solid ${colors.primary}15`,
          boxShadow: `0 12px 35px ${colors.primary}10`
        }}>
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" 
                 style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
              <Lightbulb className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <div className="text-center mt-2">
            <h3 className="font-bold text-lg mb-4" style={{ color: colors.primary, fontFamily: font }}>
              {t('My Purpose')}
            </h3>
            
            <p className="text-sm leading-relaxed mb-4" style={{ color: colors.text, fontFamily: font }}>
              {sanitizeText(aboutData.description || data.description)}
            </p>
            
            {aboutData.specializations && (
              <div className="mb-4">
                <p className="text-xs font-bold mb-2" style={{ color: colors.secondary, fontFamily: font }}>
                  {t('Transformation Areas')}:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {aboutData.specializations.split(',').map((spec: string, index: number) => (
                    <Badge key={index} className="text-xs rounded-full px-3 py-1" 
                           style={{ 
                             background: `linear-gradient(135deg, ${colors.accent}30, ${colors.primary}20)`,
                             color: colors.text, 
                             border: `1px solid ${colors.accent}`,
                             fontFamily: font
                           }}>
                      {spec.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-center items-center space-x-8">
              {aboutData.experience && (
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-2" 
                       style={{ 
                         background: `conic-gradient(${colors.primary}, ${colors.secondary}, ${colors.accent}, ${colors.primary})`,
                         padding: '3px'
                       }}>
                    <div className="w-full h-full rounded-full flex items-center justify-center" style={{ backgroundColor: colors.cardBg }}>
                      <span className="text-lg font-bold" style={{ color: colors.primary, fontFamily: font }}>
                        {aboutData.experience}+
                      </span>
                    </div>
                  </div>
                  <p className="text-xs font-semibold" style={{ color: colors.text, fontFamily: font }}>{t('Years Transforming Lives')}</p>
                </div>
              )}
            </div>
            
            {aboutData.mission && (
              <div className="mt-4 p-4 rounded-2xl" style={{ backgroundColor: colors.accent + '15' }}>
                <p className="text-xs italic font-medium" style={{ color: colors.text, fontFamily: font }}>
                  "{aboutData.mission}"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderProgramsSection = (programsData: any) => {
    const programs = programsData.program_list || [];
    if (!Array.isArray(programs) || programs.length === 0) return null;
    return (
      <div className="px-6 py-4">
        <h3 className="text-center font-bold text-lg mb-4 flex items-center justify-center" 
            style={{ color: colors.primary, fontFamily: font }}>
          <TrendingUp className="w-5 h-5 mr-2" />
          {t('Transformation Programs')}
        </h3>
        <div className="space-y-4">
          {programs.map((program: any, index: number) => (
            <div key={index} className="relative p-5 rounded-3xl transition-all hover:scale-102" 
                 style={{ 
                   backgroundColor: colors.cardBg,
                   border: `3px solid ${colors.primary}20`,
                   boxShadow: `0 10px 30px ${colors.primary}10`
                 }}>
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>
                  {program.title}
                </h4>
                <div className="flex flex-col items-end">
                  <Badge className="text-xs mb-1" 
                         style={{ backgroundColor: colors.secondary + '20', color: colors.secondary, fontFamily: font }}>
                    {program.format?.replace('-', ' ')}
                  </Badge>
                  {program.price && (
                    <span className="text-xs font-bold" style={{ color: colors.primary, fontFamily: font }}>
                      {program.price}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-xs mb-3 leading-relaxed" style={{ color: colors.text + 'CC', fontFamily: font }}>
                {program.description}
              </p>
              {program.duration && (
                <div className="flex items-center">
                  <span className="text-xs px-3 py-1 rounded-full" 
                        style={{ backgroundColor: colors.accent + '30', color: colors.text, fontFamily: font }}>
                    {t("Duration")}: {program.duration}
                  </span>
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
    
    
    
    return (
      <div className="px-6 py-4">
        <h3 className="text-center font-bold text-lg mb-4 flex items-center justify-center" 
            style={{ color: colors.primary, fontFamily: font }}>
          <Video className="w-5 h-5 mr-2" />
          {t('Inspiration Videos')}
        </h3>
        <div className="space-y-4">
          {videoContent.map((video: any) => (
            <div key={video.key} className="rounded-3xl overflow-hidden transition-all hover:scale-102" 
                 style={{ 
                   backgroundColor: colors.cardBg,
                   border: `3px solid ${colors.primary}20`,
                   boxShadow: `0 10px 30px ${colors.primary}10`
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
                      alt={video.title || 'Inspiration video'} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white bg-opacity-90 flex items-center justify-center">
                        <Play className="w-6 h-6 ml-1" style={{ color: colors.primary }} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-32 flex items-center justify-center" 
                       style={{ background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}15)` }}>
                    <div className="text-center">
                      <Video className="w-8 h-8 mx-auto mb-2" style={{ color: colors.primary }} />
                      <span className="text-xs font-medium" style={{ color: colors.primary, fontFamily: font }}>{t("Transformation Video")}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
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
                    <span className="text-xs px-2 py-1 rounded-full" 
                          style={{ backgroundColor: colors.accent + '30', color: colors.text, fontFamily: font }}>
                      ✨ {video.video_type}
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
      <div className="px-6 py-4">
        <h3 className="text-center font-bold text-lg mb-4 flex items-center justify-center" 
            style={{ color: colors.primary, fontFamily: font }}>
          <Youtube className="w-5 h-5 mr-2" />
          {t('YouTube Channel')}
        </h3>
        
        <div className="space-y-4">
          {youtubeData.latest_video_embed && (
            <div className="rounded-3xl overflow-hidden" 
                 style={{ 
                   backgroundColor: colors.cardBg, 
                   border: `3px solid ${colors.primary}15`,
                   boxShadow: `0 12px 35px ${colors.primary}10`
                 }}>
              <div className="p-4 mb-2">
                <h4 className="font-bold text-base flex items-center" style={{ color: colors.text, fontFamily: font }}>
                  <Play className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
                  {t("Latest Inspiration")}
                </h4>
              </div>
              <div className="w-full relative overflow-hidden" style={{ paddingBottom: '56.25%', height: 0 }}>
                <div 
                  className="absolute inset-0 w-full h-full"
                  ref={createYouTubeEmbedRef(
                    youtubeData.latest_video_embed,
                    { colors, font },
                    'Latest Inspiration Video'
                  )}
                />
              </div>
            </div>
          )}
          
          <div className="p-5 rounded-3xl" 
               style={{ 
                 backgroundColor: colors.cardBg, 
                 border: `3px solid ${colors.primary}15`,
                 boxShadow: `0 12px 35px ${colors.primary}10`
               }}>
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center mr-4">
              <Youtube className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-base" style={{ color: colors.text, fontFamily: font }}>
                {youtubeData.channel_name || 'Life Coach Channel'}
              </h4>
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
                className="w-full py-4 font-bold rounded-2xl" 
                style={{ 
                  backgroundColor: '#FF0000', 
                  color: 'white',
                  fontFamily: font,
                  border: 'none'
                }}
                onClick={() => typeof window !== "undefined" && window.open(youtubeData.channel_url, '_blank', 'noopener,noreferrer')}
              >
                <Youtube className="w-5 h-5 mr-2" />
                {t("SUBSCRIBE FOR INSPIRATION")}
              </Button>
            )}
            {youtubeData.featured_playlist && (
              <Button 
                variant="outline" 
                className="w-full py-4 font-bold rounded-2xl" 
                style={{ 
                  borderColor: colors.primary, 
                  color: colors.primary, 
                  fontFamily: font 
                }}
                onClick={() => typeof window !== "undefined" && window.open(youtubeData.featured_playlist, '_blank', 'noopener,noreferrer')}
              >
                ✨ {t("TRANSFORMATION PLAYLIST")}
              </Button>
            )}
          </div>
        </div>
        </div>
      </div>
    );
  };

  const renderTransformationsSection = (transformationsData: any) => {
    const stories = transformationsData.success_stories || [];
    if (!Array.isArray(stories) || stories.length === 0) return null;
    return (
      <div className="px-6 py-4">
        <h3 className="font-bold text-lg mb-4 text-center flex items-center justify-center" 
            style={{ color: colors.primary, fontFamily: font }}>
          <Zap className="w-5 h-5 mr-2" />
          {t('Success Stories')}
        </h3>
        <div className="space-y-4">
          {stories.slice(0, 2).map((story: any, index: number) => (
            <div key={index} className="p-5 rounded-3xl" 
                 style={{ 
                   backgroundColor: colors.cardBg, 
                   border: `3px solid ${colors.secondary}15`,
                   boxShadow: `0 10px 30px ${colors.secondary}10`
                 }}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-sm" style={{ color: colors.primary, fontFamily: font }}>
                  {t("Client")} {story.client_initial}
                </h4>
                {story.timeframe && (
                  <Badge className="text-xs" 
                         style={{ backgroundColor: colors.accent + '30', color: colors.text, fontFamily: font }}>
                    {story.timeframe}
                  </Badge>
                )}
              </div>
              
              <div className="space-y-3">
                <div className="p-3 rounded-xl" style={{ backgroundColor: colors.primary + '10' }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: colors.primary, fontFamily: font }}>
                    {t("Challenge")}:
                  </p>
                  <p className="text-xs" style={{ color: colors.text, fontFamily: font }}>
                    {story.challenge}
                  </p>
                </div>
                
                <div className="p-3 rounded-xl" style={{ backgroundColor: colors.secondary + '10' }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: colors.secondary, fontFamily: font }}>
                    {t("Transformation")}:
                  </p>
                  <p className="text-xs" style={{ color: colors.text, fontFamily: font }}>
                    {story.transformation}
                  </p>
                </div>
                
                {story.outcome && (
                  <div className="p-3 rounded-xl" style={{ backgroundColor: colors.accent + '10' }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: colors.text, fontFamily: font }}>
                      {t("Current Success")}:
                    </p>
                    <p className="text-xs" style={{ color: colors.text, fontFamily: font }}>
                      {story.outcome}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSpeakingSection = (speakingData: any) => {
    const topics = speakingData.topics || [];
    if (!Array.isArray(topics) || topics.length === 0) return null;
    return (
      <div className="px-6 py-4">
        <h3 className="font-bold text-sm mb-3 text-center" style={{ color: colors.primary, fontFamily: font }}>
          {t('🎤 Speaking Topics')}
        </h3>
        <div className="space-y-3">
          {topics.map((topic: any, index: number) => (
            <div key={index} className="p-4 rounded-2xl" 
                 style={{ backgroundColor: colors.cardBg, border: `2px solid ${colors.accent}20` }}>
              <h4 className="font-bold text-sm mb-2" style={{ color: colors.text, fontFamily: font }}>
                {topic.topic}
              </h4>
              <p className="text-xs mb-2" style={{ color: colors.text + 'CC', fontFamily: font }}>
                {topic.description}
              </p>
              <div className="flex justify-between items-center">
                {topic.audience && (
                  <span className="text-xs" style={{ color: colors.secondary, fontFamily: font }}>
                    {t("For")}: {topic.audience}
                  </span>
                )}
                {topic.duration && (
                  <span className="text-xs" style={{ color: colors.accent, fontFamily: font }}>
                    {topic.duration}
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
      <div className="px-6 py-4">
        <h3 className="font-bold text-sm mb-3 text-center" style={{ color: colors.primary, fontFamily: font }}>
          {t('Follow the Journey')}
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {socialLinks.map((link: any, index: number) => (
            <Button key={index} size="sm" className="rounded-full transition-all hover:scale-110"
                    style={{ 
                      background: `linear-gradient(135deg, ${colors.primary}80, ${colors.secondary}80)`,
                      color: 'white',
                      fontFamily: font,
                      border: 'none'
                    }}
                    onClick={() => link.url && typeof window !== "undefined" && window.open(link.url, '_blank', 'noopener,noreferrer')}>
              <span className="text-xs capitalize">{link.platform}</span>
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
      <div className="px-6 py-4">
        <h3 className="font-bold text-sm mb-3 text-center" style={{ color: colors.primary, fontFamily: font }}>
          {t('Availability')}
        </h3>
        <div className="space-y-2">
          {hours.slice(0, 7).map((hour: any, index: number) => (
            <div key={index} className="flex justify-between items-center p-3 rounded-xl" 
                 style={{ backgroundColor: hour.is_closed ? colors.background : colors.cardBg }}>
              <span className="capitalize font-semibold text-xs" style={{ color: colors.text, fontFamily: font }}>
                {hour.day}
              </span>
              <span className="text-xs font-medium" 
                    style={{ color: hour.is_closed ? colors.text + '60' : colors.primary, fontFamily: font }}>
                {hour.is_closed ? t('Rest Day') : `${hour.open_time} - ${hour.close_time}`}
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
      <div className="px-6 py-4">
        <h3 className="font-bold text-sm mb-3 text-center" style={{ color: colors.primary, fontFamily: font }}>
          {t('✨ Client Love')}
        </h3>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentReview * 100}%)` }}
            >
              {reviews.map((review: any, index: number) => (
                <div key={index} className="w-full flex-shrink-0 px-1">
                  <div className="p-4 rounded-3xl" 
                       style={{ backgroundColor: colors.cardBg, border: `2px solid ${colors.secondary}15` }}>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-4 h-4 rounded-full ${i < parseInt(review.rating || 5) ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                      ))}
                    </div>
                    <p className="text-xs mb-3 leading-relaxed italic" style={{ color: colors.text, fontFamily: font }}>
                      "{review.review}"
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-bold" style={{ color: colors.primary, fontFamily: font }}>
                        - {review.client_name}
                      </p>
                      {review.program && (
                        <Badge className="text-xs" 
                               style={{ backgroundColor: colors.accent + '20', color: colors.text, fontFamily: font }}>
                          {review.program}
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
      <div className="px-6 py-4">
        <div className="text-center p-6 rounded-3xl" style={{ 
          background: `linear-gradient(135deg, ${colors.primary}15, ${colors.secondary}10)`,
          border: `3px solid ${colors.primary}20`
        }}>
          <h3 className="font-bold text-sm mb-2" style={{ color: colors.primary, fontFamily: font }}>
            {t('🚀 Start Your Transformation')}
          </h3>
          {appointmentsData?.consultation_info && (
            <p className="text-xs mb-4" style={{ color: colors.text, fontFamily: font }}>
              {appointmentsData.consultation_info}
            </p>
          )}
          <Button size="sm" className="rounded-full px-6" 
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    color: 'white', 
                    fontFamily: font,
                    border: 'none'
                  }}
                  onClick={() => handleAppointmentBooking(configSections.appointments)}>
            <Calendar className="w-4 h-4 mr-2" />
            {t('Book Free Session')}
          </Button>
        </div>
      </div>
    );
  };

  const renderLocationSection = (locationData: any) => {
    if (!locationData.map_embed_url && !locationData.directions_url) return null;
    
    return (
      <div className="px-6 py-4">
        <h3 className="font-bold text-sm mb-3 flex items-center" style={{ color: colors.primary, fontFamily: font }}>
          <MapPin className="w-4 h-4 mr-2" />
          {t('Location')}
        </h3>
        
        <div className="space-y-3">
          {locationData.map_embed_url && (
            <div className="rounded-2xl overflow-hidden" style={{ height: '200px' }}>
              <div dangerouslySetInnerHTML={{ __html: locationData.map_embed_url }} className="w-full h-full" />
            </div>
          )}
          
          {locationData.directions_url && (
            <Button size="sm" variant="outline" className="w-full rounded-2xl" 
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
      <div className="px-6 py-4">
        <div className="grid grid-cols-2 gap-2">
          {appData.app_store_url && (
            <Button size="sm" variant="outline" style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}
                    onClick={() => typeof window !== "undefined" && window.open(appData.app_store_url, '_blank', 'noopener,noreferrer')}>
              {t('App Store')}
            </Button>
          )}
          {appData.play_store_url && (
            <Button size="sm" variant="outline" style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}
                    onClick={() => typeof window !== "undefined" && window.open(appData.play_store_url, '_blank', 'noopener,noreferrer')}>
              {t('Play Store')}
            </Button>
          )}
        </div>
      </div>
    );
  };

  const renderContactFormSection = (formData: any) => {
    if (!formData.form_title) return null;
    return (
      <div className="px-6 py-4">
        <div className="text-center p-5 rounded-3xl" style={{ 
          backgroundColor: colors.cardBg,
          border: `3px solid ${colors.secondary}20`
        }}>
          <h3 className="font-bold text-sm mb-2" style={{ color: colors.secondary, fontFamily: font }}>
            {formData.form_title}
          </h3>
          {formData.form_description && (
            <p className="text-xs mb-3" style={{ color: colors.text, fontFamily: font }}>
              {formData.form_description}
            </p>
          )}
          <Button size="sm" className="rounded-full" 
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`,
                    color: 'white', 
                    fontFamily: font,
                    border: 'none'
                  }}
                  onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}>
            <Mail className="w-4 h-4 mr-2" />
            {t('Let\'s Connect')}
          </Button>
        </div>
      </div>
    );
  };

  const renderCustomHtmlSection = (customHtmlData: any) => {
    if (!customHtmlData.html_content) return null;
    
    return (
      <div className="px-6 py-4">
        {customHtmlData.show_title && customHtmlData.section_title && (
          <h3 className="text-center font-bold text-lg mb-4 flex items-center justify-center" 
              style={{ color: colors.primary, fontFamily: font }}>
            <Lightbulb className="w-5 h-5 mr-2" />
            {customHtmlData.section_title}
          </h3>
        )}
        <div 
          className="custom-html-content p-5 rounded-3xl" 
          style={{ 
            backgroundColor: colors.cardBg,
            border: `3px solid ${colors.primary}15`,
            boxShadow: `0 12px 35px ${colors.primary}10`,
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
                background: linear-gradient(135deg, ${colors.accent}30, ${colors.primary}20);
                color: ${colors.primary};
                padding: 0.125rem 0.25rem;
                border-radius: 0.5rem;
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
      <div className="px-6 py-4">
        <h3 className="text-center font-bold text-lg mb-4 flex items-center justify-center" 
            style={{ color: colors.primary, fontFamily: font }}>
          <Share2 className="w-5 h-5 mr-2" />
          {t("Share the Journey")}
        </h3>
        <div className="text-center p-5 rounded-3xl" 
             style={{ 
               backgroundColor: colors.cardBg,
               border: `3px solid ${colors.primary}15`,
               boxShadow: `0 12px 35px ${colors.primary}10`
             }}>
          {qrData.qr_title && (
            <h4 className="font-bold text-base mb-2" style={{ color: colors.text, fontFamily: font }}>
              {qrData.qr_title}
            </h4>
          )}
          
          {qrData.qr_description && (
            <p className="text-sm mb-4" style={{ color: colors.text + 'CC', fontFamily: font }}>
              {qrData.qr_description}
            </p>
          )}
          
          <Button 
            className="w-full py-4 font-bold rounded-2xl" 
            style={{ 
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              color: 'white',
              fontFamily: font,
              border: 'none'
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
    <div className="w-full max-w-md mx-auto rounded-3xl overflow-hidden" style={{ 
      fontFamily: font,
      backgroundColor: colors.background,
      boxShadow: `0 25px 70px ${colors.primary}15`,
      border: `3px solid ${colors.primary}10`,
      direction: isRTL ? 'rtl' : 'ltr'
    }}>
      {orderedSectionKeys
        .filter(key => key !== 'colors' && key !== 'font' && key !== 'copyright')
        .map((sectionKey) => (
          <React.Fragment key={sectionKey}>
            {renderSection(sectionKey)}
          </React.Fragment>
        ))}
      
      <div className="p-6 space-y-4" style={{ 
        background: `linear-gradient(135deg, ${colors.primary}08, ${colors.secondary}05)`
      }}>
        <Button className="w-full h-16 font-bold rounded-3xl transition-all hover:scale-105" 
                style={{ 
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
                  color: 'white',
                  fontFamily: font,
                  border: 'none',
                  boxShadow: `0 12px 35px ${colors.primary}30`
                }}
                onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <Target className="w-6 h-6 mr-2" />
          {t('Transform Your Life Today')}
        </Button>
        
        <Button size="sm" variant="outline" className="w-full rounded-2xl" 
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