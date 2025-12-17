import { handleAppointmentBooking } from '../VCardPreview';
import React from 'react';
import StableHtmlContent from '@/components/StableHtmlContent';
import { VideoEmbed, extractVideoUrl } from '@/components/VideoEmbed';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { sanitizeVideoData } from '@/utils/secureVideoUtils';
import { createYouTubeEmbedRef } from '@/utils/youtubeEmbedUtils';
import { Mail, Phone, Globe, MapPin, Calendar, UserPlus, Gamepad2, Zap, Trophy, Users, Tv, Video, Play, Youtube, Share2, QrCode } from 'lucide-react';
import SocialIcon from '../../../link-bio-builder/components/SocialIcon';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionOrder } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';
import languageData from '@/../../resources/lang/language.json';

interface GamingStreamerTemplateProps {
  data: any;
  template: any;
}

function GamingStreamerTemplate({ data, template }: GamingStreamerTemplateProps) {
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

  const colors = configSections.colors || template?.defaultColors || { primary: '#00FF41', secondary: '#FF0080', accent: '#00D9FF', background: '#0A0A0A', text: '#FFFFFF' };
  const font = configSections.font || template?.defaultFont || 'Orbitron, monospace';

  // Get all sections for this business type
  const allSections = getBusinessTemplate('gaming-streamer')?.sections || [];

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
      case 'streaming':
        return renderStreamingSection(sectionData);
      case 'schedule':
        return renderScheduleSection(sectionData);
      case 'videos':
        return renderVideosSection(sectionData);
      case 'youtube':
        return renderYouTubeSection(sectionData);
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
    <div className="relative rounded-t-2xl overflow-hidden" style={{ 
      background: `linear-gradient(135deg, ${colors.background}, ${colors.primary}20, ${colors.secondary}20)`,
      minHeight: '200px'
    }}>
      {/* Matrix-style background */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-8 gap-1 h-full">
          {[...Array(64)].map((_, i) => (
            <div key={i} className="animate-pulse" 
                 style={{ 
                   backgroundColor: i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.accent,
                   animationDelay: `${i * 0.1}s`,
                   animationDuration: '2s'
                 }}></div>
          ))}
        </div>
      </div>
      
      <div className="relative px-6 py-6">
        {/* Language Selector */}
        {configSections.language && (
          <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}>
            <div className="relative">
              <button
                onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-bold transition-all hover:scale-105"
                style={{ 
                  background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
                  color: 'black',
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
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-lg border-2 shadow-2xl overflow-hidden" 
                 style={{ 
                   borderColor: colors.primary, 
                   boxShadow: `0 0 30px ${colors.primary}80, inset 0 0 20px ${colors.primary}20`
                 }}>
              {headerData.profile_image ? (
                <img src={headerData.profile_image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: colors.cardBg }}>
                  <Gamepad2 className="w-10 h-10" style={{ color: colors.primary }} />
                </div>
              )}
            </div>
            {/* Glitch effect borders */}
            <div className="absolute inset-0 rounded-lg border-2 animate-pulse" 
                 style={{ borderColor: colors.secondary, animationDuration: '0.5s' }}></div>
            <div className="absolute -inset-1 rounded-lg border animate-pulse" 
                 style={{ borderColor: colors.accent, animationDuration: '0.3s', animationDelay: '0.2s' }}></div>
          </div>
          
          <div className="flex-1">
            {headerData.status_text && (
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: colors.primary }}></div>
                <span className="text-xs font-bold" style={{ color: colors.primary, fontFamily: font }}>{headerData.status_text}</span>
                <div className="flex space-x-1">
                  <div className="w-1 h-4 animate-bounce" style={{ backgroundColor: colors.secondary, animationDelay: '0s' }}></div>
                  <div className="w-1 h-6 animate-bounce" style={{ backgroundColor: colors.primary, animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-5 animate-bounce" style={{ backgroundColor: colors.accent, animationDelay: '0.2s' }}></div>
                </div>
              </div>
            )}
            
            <h1 className="text-xl font-bold mb-1" style={{ color: colors.text, fontFamily: font }}>
              {headerData.name || data.name || 'GamerTag'}
            </h1>
            
            <div className="inline-flex items-center px-3 py-1 rounded-full mb-2" 
                 style={{ backgroundColor: colors.primary + '20', border: `1px solid ${colors.primary}` }}>
              <Trophy className="w-3 h-3 mr-1" style={{ color: colors.primary }} />
              <span className="text-xs font-bold" style={{ color: colors.primary, fontFamily: font }}>
                {headerData.title || 'Pro Gamer'}
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
    <div className="px-6 py-4" style={{ borderBottom: `2px solid ${colors.primary}30` }}>
      <div className="grid grid-cols-2 gap-3">
        {(contactData.email || data.email) && (
          <a href={`mailto:${contactData.email || data.email}`}
             className="flex items-center space-x-2 p-3 rounded-lg transition-all hover:scale-105"
             style={{ 
               backgroundColor: colors.cardBg, 
               border: `1px solid ${colors.primary}50`,
               boxShadow: `0 0 10px ${colors.primary}30`
             }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" 
                 style={{ background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})` }}>
              <Mail className="w-4 h-4 text-black" />
            </div>
            <span className="text-xs font-bold" style={{ color: colors.text, fontFamily: font }}>{t("EMAIL")}</span>
          </a>
        )}
        
        {(contactData.phone || data.phone) && (
          <a href={`tel:${contactData.phone || data.phone}`}
             className="flex items-center space-x-2 p-3 rounded-lg transition-all hover:scale-105"
             style={{ 
               backgroundColor: colors.cardBg, 
               border: `1px solid ${colors.secondary}50`,
               boxShadow: `0 0 10px ${colors.secondary}30`
             }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" 
                 style={{ background: `linear-gradient(45deg, ${colors.secondary}, ${colors.accent})` }}>
              <Phone className="w-4 h-4 text-black" />
            </div>
            <span className="text-xs font-bold" style={{ color: colors.text, fontFamily: font }}>{t("CALL")}</span>
          </a>
        )}
        
        {(contactData.website || data.website) && (
          <a href={contactData.website || data.website} target="_blank" rel="noopener noreferrer"
             className="flex items-center space-x-2 p-3 rounded-lg transition-all hover:scale-105"
             style={{ 
               backgroundColor: colors.cardBg, 
               border: `1px solid ${colors.accent}50`,
               boxShadow: `0 0 10px ${colors.accent}30`
             }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" 
                 style={{ background: `linear-gradient(45deg, ${colors.accent}, ${colors.primary})` }}>
              <Globe className="w-4 h-4 text-black" />
            </div>
            <span className="text-xs font-bold" style={{ color: colors.text, fontFamily: font }}>{t("WEB")}</span>
          </a>
        )}
        
        {contactData.location && (
          <div className="flex items-center space-x-2 p-3 rounded-lg"
               style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.primary}30` }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" 
                 style={{ backgroundColor: colors.primary + '30' }}>
              <MapPin className="w-4 h-4" style={{ color: colors.primary }} />
            </div>
            <span className="text-xs font-bold truncate" style={{ color: colors.text, fontFamily: font }}>
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
      <div className="px-6 py-4" style={{ borderBottom: `2px solid ${colors.primary}30` }}>
        <div className="relative p-4 rounded-xl" 
             style={{ 
               backgroundColor: colors.cardBg, 
               border: `2px solid ${colors.primary}30`,
               boxShadow: `inset 0 0 20px ${colors.primary}10`
             }}>
          <div className="flex items-center space-x-2 mb-3">
            <Zap className="w-4 h-4" style={{ color: colors.primary }} />
            <h3 className="font-bold text-sm" style={{ color: colors.primary, fontFamily: font }}>{t("PLAYER.BIO")}</h3>
          </div>
          
          <p className="text-sm leading-relaxed mb-3" style={{ color: colors.text, fontFamily: font }}>
            {aboutData.description || data.description}
          </p>
          
          {aboutData.games && (
            <div className="mb-3">
              <p className="text-xs font-bold mb-2" style={{ color: colors.secondary, fontFamily: font }}>{t("MAIN_GAMES")}:</p>
              <div className="flex flex-wrap gap-1">
                {aboutData.games.split(',').map((game: string, index: number) => (
                  <Badge key={index} className="text-xs font-bold" 
                         style={{ 
                           backgroundColor: colors.accent + '20', 
                           color: colors.accent, 
                           border: `1px solid ${colors.accent}`,
                           fontFamily: font
                         }}>
                    {game.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            {aboutData.experience && (
              <div className="text-center">
                <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-1" 
                     style={{ 
                       background: `conic-gradient(${colors.primary}, ${colors.secondary}, ${colors.accent}, ${colors.primary})`,
                       padding: '2px'
                     }}>
                  <div className="w-full h-full rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.cardBg }}>
                    <span className="text-sm font-bold" style={{ color: colors.primary, fontFamily: font }}>
                      {aboutData.experience}Y
                    </span>
                  </div>
                </div>
                <p className="text-xs" style={{ color: colors.text, fontFamily: font }}>{t("EXP")}</p>
              </div>
            )}
            
            {aboutData.achievements && (
              <div className="flex-1 ml-4">
                <p className="text-xs font-bold mb-1" style={{ color: colors.accent, fontFamily: font }}>{t("ACHIEVEMENTS")}:</p>
                <p className="text-xs" style={{ color: colors.text + 'CC', fontFamily: font }}>
                  {aboutData.achievements}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderStreamingSection = (streamingData: any) => {
    const streams = streamingData.stream_details || [];
    if (!Array.isArray(streams) || streams.length === 0) return null;
    return (
      <div className="px-6 py-4" style={{ borderBottom: `2px solid ${colors.primary}30` }}>
        <h3 className="font-bold text-sm mb-3 flex items-center" style={{ color: colors.primary, fontFamily: font }}>
          <Tv className="w-4 h-4 mr-2" />
          {t("STREAMING_PLATFORMS")}
        </h3>
        <div className="space-y-3">
          {streams.map((stream: any, index: number) => (
            <div key={index} className="p-3 rounded-xl transition-all hover:scale-102" 
                 style={{ 
                   backgroundColor: colors.cardBg, 
                   border: `1px solid ${colors.secondary}40`,
                   boxShadow: `0 0 15px ${colors.secondary}20`
                 }}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-sm uppercase" style={{ color: colors.text, fontFamily: font }}>
                  {stream.platform}
                </h4>
                <Badge className="text-xs font-bold" 
                       style={{ backgroundColor: colors.primary + '20', color: colors.primary, fontFamily: font }}>
                  {stream.followers} {t("FOLLOWERS")}
                </Badge>
              </div>
              <p className="text-xs mb-2" style={{ color: colors.secondary, fontFamily: font }}>
                @{stream.username}
              </p>
              {stream.stream_url && (
                <Button size="sm" className="text-xs px-3 py-1 rounded-lg font-bold" 
                        style={{ 
                          background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
                          color: 'black',
                          fontFamily: font
                        }}
                        onClick={() => typeof window !== "undefined" && window.open(stream.stream_url, '_blank', 'noopener,noreferrer')}>
                  {t("WATCH_LIVE")}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderScheduleSection = (scheduleData: any) => {
    const schedule = scheduleData.stream_schedule || [];
    if (!Array.isArray(schedule) || schedule.length === 0) return null;
    return (
      <div className="px-6 py-4" style={{ borderBottom: `2px solid ${colors.primary}30` }}>
        <h3 className="font-bold text-sm mb-3 text-center" style={{ color: colors.primary, fontFamily: font }}>
          📅 {t("STREAM_SCHEDULE")}
        </h3>
        <div className="space-y-2">
          {schedule.map((item: any, index: number) => (
            <div key={index} className="flex items-center p-3 rounded-lg" 
                 style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.accent}30` }}>
              <div className="w-4 h-4 rounded-full mr-3 animate-pulse" 
                   style={{ backgroundColor: colors.accent }}></div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-sm uppercase" style={{ color: colors.text, fontFamily: font }}>
                    {item.day}
                  </h4>
                  <span className="text-xs" style={{ color: colors.accent, fontFamily: font }}>
                    {item.start_time} • {item.duration}
                  </span>
                </div>
                <p className="text-xs" style={{ color: colors.secondary, fontFamily: font }}>
                  {item.game}
                </p>
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
      <div className="px-6 py-4" style={{ borderBottom: `2px solid ${colors.primary}30` }}>
        <h3 className="font-bold text-sm mb-3 text-center flex items-center justify-center" 
            style={{ color: colors.primary, fontFamily: font }}>
          <Video className="w-4 h-4 mr-2" />
          {t("GAMING_CONTENT")}
        </h3>
        <div className="space-y-3">
          {videoContent.map((video: any) => (
            <div key={video.key} className="rounded-xl overflow-hidden" 
                 style={{ 
                   backgroundColor: colors.cardBg, 
                   border: `1px solid ${colors.secondary}40`,
                   boxShadow: `0 0 15px ${colors.secondary}20`
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
                      alt={video.title || 'Gaming video'} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center" 
                        style={{ 
                          background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
                          color: 'black'
                        }}
                      >
                        <Play className="w-6 h-6 ml-1" />
                      </div>
                    </div>
                    {video.duration && (
                      <div className="absolute bottom-2 right-2 px-2 py-1 rounded text-xs font-bold" 
                           style={{ backgroundColor: colors.primary + 'CC', color: 'black' }}>
                        {video.duration}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-32 flex items-center justify-center" 
                       style={{ backgroundColor: colors.primary + '20' }}>
                    <div className="text-center">
                      <Video className="w-8 h-8 mx-auto mb-2" style={{ color: colors.primary }} />
                      <span className="text-xs font-bold" style={{ color: colors.primary, fontFamily: font }}>{t("GAMING_VIDEO")}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-3">
                <h4 className="font-bold text-sm mb-1 uppercase" style={{ color: colors.text, fontFamily: font }}>
                  {video.title}
                </h4>
                {video.description && (
                  <p className="text-xs mb-2" style={{ color: colors.text + 'CC', fontFamily: font }}>
                    {video.description}
                  </p>
                )}
                <div className="flex justify-between items-center">
                  {video.game && (
                    <Badge className="text-xs font-bold" 
                           style={{ backgroundColor: colors.accent + '20', color: colors.accent, fontFamily: font }}>
                      {video.game.toUpperCase()}
                    </Badge>
                  )}
                  {video.views && (
                    <span className="text-xs font-bold" style={{ color: colors.secondary, fontFamily: font }}>
                      👁️ {video.views}
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
      <div className="px-6 py-4" style={{ borderBottom: `2px solid ${colors.primary}30` }}>
        <h3 className="font-bold text-sm mb-3 text-center flex items-center justify-center" 
            style={{ color: colors.primary, fontFamily: font }}>
          <Youtube className="w-4 h-4 mr-2" />
          {t("YOUTUBE_CHANNEL")}
        </h3>
        
        <div className="space-y-3">
          {/* Latest Video Embed */}
          {youtubeData.latest_video_embed && (
            <div className="rounded-xl overflow-hidden" 
                 style={{ 
                   backgroundColor: colors.cardBg, 
                   border: `2px solid ${colors.primary}40`,
                   boxShadow: `0 0 20px ${colors.primary}20`
                 }}>
              <div className="p-3 mb-2">
                <h4 className="font-bold text-sm flex items-center uppercase" style={{ color: colors.text, fontFamily: font }}>
                  <Play className="w-4 h-4 mr-2" style={{ color: colors.primary }} />
                  {t("LATEST_GAMING_VIDEO")}
                </h4>
              </div>
              <div className="w-full relative overflow-hidden" style={{ paddingBottom: '56.25%', height: 0 }}>
                <div 
                  className="absolute inset-0 w-full h-full"
                  ref={createYouTubeEmbedRef(
                    youtubeData.latest_video_embed,
                    { colors, font },
                    'Latest Gaming Video'
                  )}
                />
              </div>
            </div>
          )}
          
          {/* Channel Info */}
          <div className="p-4 rounded-xl" 
               style={{ 
                 backgroundColor: colors.cardBg, 
                 border: `2px solid ${colors.primary}40`,
                 boxShadow: `0 0 20px ${colors.primary}20`
               }}>
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mr-4">
                <Youtube className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-base uppercase" style={{ color: colors.text, fontFamily: font }}>
                  {youtubeData.channel_name || 'GAMING_CHANNEL'}
                </h4>
                {youtubeData.subscriber_count && (
                  <p className="text-xs font-bold" style={{ color: colors.primary, fontFamily: font }}>
                    📊 {youtubeData.subscriber_count} {t("subscribers")}
                  </p>
                )}
              </div>
            </div>
            
            {youtubeData.channel_description && (
              <p className="text-xs mb-4" style={{ color: colors.text, fontFamily: font }}>
                {youtubeData.channel_description}
              </p>
            )}
            
            <div className="space-y-2">
              {youtubeData.channel_url && (
                <Button 
                  size="sm" 
                  className="w-full font-bold rounded-lg" 
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
                  className="w-full font-bold rounded-lg" 
                  style={{ 
                    borderColor: colors.primary, 
                    color: colors.primary, 
                    fontFamily: font 
                  }}
                  onClick={() => typeof window !== "undefined" && window.open(youtubeData.featured_playlist, '_blank', 'noopener,noreferrer')}
                >
                  🎮 {t("GAMING_PLAYLIST")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSocialSection = (socialData: any) => {
    const socialLinks = socialData.social_links || [];
    if (!Array.isArray(socialLinks) || socialLinks.length === 0) return null;
    return (
      <div className="px-6 py-4" style={{ borderBottom: `2px solid ${colors.primary}30` }}>
        <h3 className="font-bold text-sm mb-3 text-center" style={{ color: colors.primary, fontFamily: font }}>
          {t('CONNECT_&_FOLLOW')}
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {socialLinks.map((link: any, index: number) => (
            <Button key={index} size="sm" className="text-xs font-bold rounded-lg transition-all hover:scale-105"
                    style={{ 
                      background: `linear-gradient(45deg, ${colors.primary}40, ${colors.secondary}40)`,
                      color: colors.text,
                      border: `1px solid ${colors.primary}`,
                      fontFamily: font
                    }}
                    onClick={() => link.url && typeof window !== "undefined" && window.open(link.url, '_blank', 'noopener,noreferrer')}>
              {link.platform.toUpperCase()}
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
      <div className="px-6 py-4" style={{ borderBottom: `2px solid ${colors.primary}30` }}>
        <h3 className="font-bold text-sm mb-3 text-center" style={{ color: colors.primary, fontFamily: font }}>
          {t('ONLINE_STATUS')}
        </h3>
        <div className="space-y-2">
          {hours.slice(0, 7).map((hour: any, index: number) => (
            <div key={index} className="flex justify-between items-center p-2 rounded-lg" 
                 style={{ backgroundColor: hour.is_closed ? colors.background : colors.cardBg }}>
              <span className="capitalize font-bold text-xs" style={{ color: colors.text, fontFamily: font }}>
                {hour.day.toUpperCase()}
              </span>
              <span className="text-xs font-bold" 
                    style={{ color: hour.is_closed ? colors.text + '60' : colors.primary, fontFamily: font }}>
                {hour.is_closed ? 'OFFLINE' : `${hour.open_time} - ${hour.close_time}`}
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
      <div className="px-6 py-4" style={{ borderBottom: `2px solid ${colors.primary}30` }}>
        <h3 className="font-bold text-sm mb-3 text-center flex items-center justify-center" 
            style={{ color: colors.primary, fontFamily: font }}>
          <Users className="w-4 h-4 mr-2" />
          {t('COMMUNITY_REVIEWS')}
        </h3>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentReview * 100}%)` }}
            >
              {reviews.map((review: any, index: number) => (
                <div key={index} className="w-full flex-shrink-0 px-1">
                  <div className="p-3 rounded-xl" 
                       style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.secondary}30` }}>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-3 h-3 ${i < parseInt(review.rating || 5) ? 'bg-yellow-400' : 'bg-gray-600'}`}
                             style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
                      ))}
                    </div>
                    <p className="text-xs mb-2 leading-relaxed" style={{ color: colors.text, fontFamily: font }}>
                      "{review.review}"
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-bold" style={{ color: colors.primary, fontFamily: font }}>
                        - {review.client_name}
                      </p>
                      {review.platform && (
                        <Badge className="text-xs font-bold" 
                               style={{ backgroundColor: colors.accent + '20', color: colors.accent, fontFamily: font }}>
                          {review.platform}
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
      <div className="px-6 py-4" style={{ borderBottom: `2px solid ${colors.primary}30` }}>
        <div className="text-center p-4 rounded-xl" 
             style={{ 
               backgroundColor: colors.cardBg, 
               border: `2px solid ${colors.primary}40`,
               boxShadow: `0 0 20px ${colors.primary}20`
             }}>
          <h3 className="font-bold text-sm mb-2" style={{ color: colors.primary, fontFamily: font }}>
            🤝 {t("COLLABORATION_REQUEST")}
          </h3>
          {appointmentsData?.collab_info && (
            <p className="text-xs mb-3" style={{ color: colors.text, fontFamily: font }}>
              {appointmentsData.collab_info}
            </p>
          )}
          <Button size="sm" className="rounded-lg font-bold" 
                  style={{ 
                    background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
                    color: 'black',
                    fontFamily: font
                  }}
                  onClick={() => handleAppointmentBooking(configSections.appointments)}>
            <Calendar className="w-4 h-4 mr-2" />
            {t("BOOK_COLLAB")}
          </Button>
        </div>
      </div>
    );
  };

  const renderLocationSection = (locationData: any) => {
    if (!locationData.map_embed_url && !locationData.directions_url) return null;
    
    return (
      <div className="px-6 py-4" style={{ borderBottom: `2px solid ${colors.primary}30` }}>
        <h3 className="font-bold text-sm mb-3 flex items-center" style={{ color: colors.primary, fontFamily: font }}>
          <MapPin className="w-4 h-4 mr-2" />
          {t("Gaming HQ Location")}
        </h3>
        
        <div className="space-y-3">
          {locationData.map_embed_url && (
            <div className="rounded-lg overflow-hidden" style={{ height: '200px' }}>
              <div dangerouslySetInnerHTML={{ __html: locationData.map_embed_url }} className="w-full h-full" />
            </div>
          )}
          
          {locationData.directions_url && (
            <Button size="sm" variant="outline" className="w-full rounded-lg font-bold" 
                    style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}
                    onClick={() => typeof window !== "undefined" && window.open(locationData.directions_url, '_blank', 'noopener,noreferrer')}>
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
      <div className="px-6 py-4" style={{ borderBottom: `2px solid ${colors.primary}30` }}>
        <div className="grid grid-cols-2 gap-2">
          {appData.app_store_url && (
            <Button size="sm" variant="outline" className="font-bold"
                    style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}
                    onClick={() => typeof window !== "undefined" && window.open(appData.app_store_url, '_blank', 'noopener,noreferrer')}>
              {t("APP_STORE")}
            </Button>
          )}
          {appData.play_store_url && (
            <Button size="sm" variant="outline" className="font-bold"
                    style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}
                    onClick={() => typeof window !== "undefined" && window.open(appData.play_store_url, '_blank', 'noopener,noreferrer')}>
              {t("PLAY_STORE")}
            </Button>
          )}
        </div>
      </div>
    );
  };

  const renderContactFormSection = (formData: any) => {
    if (!formData.form_title) return null;
    return (
      <div className="px-6 py-4" style={{ borderBottom: `2px solid ${colors.primary}30` }}>
        <div className="text-center p-4 rounded-xl" 
             style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.secondary}40` }}>
          <h3 className="font-bold text-sm mb-2" style={{ color: colors.secondary, fontFamily: font }}>
            {formData.form_title.toUpperCase()}
          </h3>
          {formData.form_description && (
            <p className="text-xs mb-3" style={{ color: colors.text, fontFamily: font }}>
              {formData.form_description}
            </p>
          )}
          <Button size="sm" className="rounded-lg font-bold" 
                  style={{ 
                    background: `linear-gradient(45deg, ${colors.secondary}, ${colors.accent})`,
                    color: 'black',
                    fontFamily: font
                  }}
                  onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}>
            <Mail className="w-4 h-4 mr-2" />
            {t("SEND_MESSAGE")}
          </Button>
        </div>
      </div>
    );
  };

  const renderCustomHtmlSection = (customHtmlData: any) => {
    if (!customHtmlData.html_content) return null;
    
    return (
      <div className="px-6 py-4" style={{ borderBottom: `2px solid ${colors.primary}30` }}>
        {customHtmlData.show_title && customHtmlData.section_title && (
          <h3 className="font-bold text-sm mb-3 text-center flex items-center justify-center" 
              style={{ color: colors.primary, fontFamily: font }}>
            <Gamepad2 className="w-4 h-4 mr-2" />
            {customHtmlData.section_title.toUpperCase()}
          </h3>
        )}
        <div 
          className="custom-html-content p-4 rounded-xl" 
          style={{ 
            backgroundColor: colors.cardBg,
            border: `2px solid ${colors.primary}40`,
            boxShadow: `0 0 20px ${colors.primary}20`,
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
                text-transform: uppercase;
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
                background: linear-gradient(45deg, ${colors.primary}20, ${colors.secondary}20);
                color: ${colors.accent};
                padding: 0.125rem 0.25rem;
                border-radius: 0.25rem;
                font-family: 'Courier New', monospace;
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
      <div className="px-6 py-4" style={{ borderBottom: `2px solid ${colors.primary}30` }}>
        <h3 className="font-bold text-sm mb-3 text-center flex items-center justify-center" 
            style={{ color: colors.primary, fontFamily: font }}>
          <Share2 className="w-4 h-4 mr-2" />
          {t("SHARE_PROFILE")}
        </h3>
        <div className="text-center p-4 rounded-xl" 
             style={{ 
               backgroundColor: colors.cardBg,
               border: `2px solid ${colors.primary}40`,
               boxShadow: `0 0 20px ${colors.primary}20`
             }}>
          {qrData.qr_title && (
            <h4 className="font-bold text-sm mb-2 uppercase" style={{ color: colors.text, fontFamily: font }}>
              {qrData.qr_title}
            </h4>
          )}
          
          {qrData.qr_description && (
            <p className="text-xs mb-3" style={{ color: colors.text + 'CC', fontFamily: font }}>
              {qrData.qr_description}
            </p>
          )}
          
          <Button 
            size="sm" 
            className="w-full font-bold rounded-lg" 
            style={{ 
              background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
              color: 'black',
              fontFamily: font
            }}
            onClick={() => setShowQrModal(true)}
          >
            <QrCode className="w-4 h-4 mr-2" />
            {t("SHARE_QR_CODE")}
          </Button>
        </div>
      </div>
    );
  };

  const renderThankYouSection = (thankYouData: any) => {
    if (!thankYouData.message) return null;
    return (
      <div className="px-6 pb-2">
        <p className="text-xs text-center" style={{ color: colors.text + '80', fontFamily: font }}>
          {thankYouData.message}
        </p>
      </div>
    );
  };

  const copyrightSection = configSections.copyright;
  
  // Get ordered sections using the utility function
  const orderedSectionKeys = getSectionOrder(data.template_config || { sections: configSections, sectionSettings: configSections }, allSections);

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl overflow-hidden" style={{ 
      fontFamily: font,
      backgroundColor: colors.background,
      border: `3px solid ${colors.primary}`,
      boxShadow: `0 0 40px ${colors.primary}40, inset 0 0 40px ${colors.primary}10`,
      direction: isRTL ? 'rtl' : 'ltr'
    }}>
      {orderedSectionKeys
        .filter(key => key !== 'colors' && key !== 'font' && key !== 'copyright')
        .map((sectionKey) => (
          <React.Fragment key={sectionKey}>
            {renderSection(sectionKey)}
          </React.Fragment>
        ))}
      
      <div className="p-6 space-y-3" 
           style={{ 
             background: `linear-gradient(135deg, ${colors.cardBg}, ${colors.primary}10)`
           }}>
        <Button className="w-full h-14 font-bold rounded-xl transition-all hover:scale-105 uppercase" 
                style={{ 
                  background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
                  color: 'black',
                  fontFamily: font,
                  boxShadow: `0 0 30px ${colors.primary}50`
                }}
                onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <Gamepad2 className="w-5 h-5 mr-2" />
          {t('LEVEL_UP_TOGETHER')}
        </Button>
        
        <Button size="sm" variant="outline" className="w-full rounded-lg font-bold uppercase" 
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
          {t('SAVE_CONTACT')}
        </Button>
      </div>
      
      {copyrightSection && (
        <div className="px-6 pb-4 pt-2">
          {copyrightSection.text && (
            <p className="text-xs text-center font-bold" style={{ color: colors.text + '60', fontFamily: font }}>
              {copyrightSection.text.toUpperCase()}
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

export default GamingStreamerTemplate;