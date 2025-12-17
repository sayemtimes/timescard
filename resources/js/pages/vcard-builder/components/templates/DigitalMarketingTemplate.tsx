import { handleAppointmentBooking } from '../VCardPreview';
import React from 'react';
import StableHtmlContent from '@/components/StableHtmlContent';
import { VideoEmbed, extractVideoUrl } from '@/components/VideoEmbed';
import { createYouTubeEmbedRef } from '@/utils/youtubeEmbedUtils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Globe, MapPin, Calendar, Download, UserPlus, TrendingUp, Target, BarChart3, Zap, Play, Youtube, Video, QrCode } from 'lucide-react';
import SocialIcon from '../../../link-bio-builder/components/SocialIcon';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionOrder } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';
import { useTranslation } from 'react-i18next';
import languageData from '@/../../resources/lang/language.json';
import { sanitizeVideoData } from '@/utils/secureVideoUtils';

interface DigitalMarketingTemplateProps {
  data: any;
  template: any;
}

export default function DigitalMarketingTemplate({ data, template }: DigitalMarketingTemplateProps) {
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
  
  const colors = configSections.colors || template?.defaultColors || { primary: '#1E40AF', secondary: '#3B82F6', accent: '#DBEAFE', text: '#1E293B' };
  const font = configSections.font || template?.defaultFont || 'Poppins, sans-serif';

  // Get all sections for this business type
  const allSections = getBusinessTemplate('digital-marketing')?.sections || [];

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
    <div className="relative rounded-t-2xl overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="fill-current text-white">
          <defs>
            <pattern id="marketing-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#marketing-grid)" />
        </svg>
      </div>
      
      <div className="px-6 py-8 relative">
        {/* Language Selector */}
        {configSections.language && (
          <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'}`}>
            <div className="relative">
              <button
                onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                className="flex items-center space-x-1 px-2 py-1 rounded text-xs transition-colors"
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: 'white'
                }}
              >
                <Globe className="w-3 h-3" />
                <span>{languageData.find(lang => lang.code === currentLanguage)?.name || 'EN'}</span>
              </button>
              
              {showLanguageSelector && (
                <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 min-w-[140px] max-h-48 overflow-y-auto z-50">
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
        
        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-xl">
            {headerData.profile_image ? (
              <img src={headerData.profile_image} alt="Logo" className="w-full h-full rounded-xl object-cover" />
            ) : (
              <TrendingUp className="w-8 h-8 text-white" />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white mb-1" style={{ fontFamily: font }}>
              {headerData.name || data.name || 'Digital Marketing Agency'}
            </h1>
            <p className="text-white/90 text-sm font-medium mb-2" style={{ fontFamily: font }}>
              {headerData.title || 'Growing Your Digital Presence'}
            </p>
            {headerData.tagline && (
              <p className="text-white/80 text-xs leading-relaxed" style={{ fontFamily: font }}>
                {headerData.tagline}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <div className="flex space-x-2">
            {headerData.badge_1 && (
              <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                <span className="text-white text-xs font-medium" style={{ fontFamily: font }}>{headerData.badge_1}</span>
              </div>
            )}
            {headerData.badge_2 && (
              <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                <span className="text-white text-xs font-medium" style={{ fontFamily: font }}>{headerData.badge_2}</span>
              </div>
            )}
          </div>
          {headerData.badge_3 && (
            <div className="flex items-center space-x-1 text-white/80">
              <BarChart3 className="w-4 h-4" />
              <span className="text-xs font-medium" style={{ fontFamily: font }}>{headerData.badge_3}</span>
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

  const renderContactSection = (contactData: any) => (
    <div className="px-6 py-4 bg-white" style={{ borderBottom: `1px solid ${colors.accent}` }}>
      <div className="grid grid-cols-2 gap-3">
        {(contactData.email || data.email) && (
          <div className="flex items-center space-x-2 p-2 rounded-lg" style={{ backgroundColor: colors.accent }}>
            <Mail className="w-4 h-4" style={{ color: colors.primary }} />
            <a 
              href={`mailto:${contactData.email || data.email}`} 
              className="text-xs font-medium truncate" 
              style={{ color: colors.text, fontFamily: font }}
            >
              {contactData.email || data.email}
            </a>
          </div>
        )}
        {(contactData.phone || data.phone) && (
          <div className="flex items-center space-x-2 p-2 rounded-lg" style={{ backgroundColor: colors.accent }}>
            <Phone className="w-4 h-4" style={{ color: colors.primary }} />
            <a 
              href={`tel:${contactData.phone || data.phone}`} 
              className="text-xs font-medium" 
              style={{ color: colors.text, fontFamily: font }}
            >
              {contactData.phone || data.phone}
            </a>
          </div>
        )}
        {(contactData.website || data.website) && (
          <div className="flex items-center space-x-2 p-2 rounded-lg" style={{ backgroundColor: colors.accent }}>
            <Globe className="w-4 h-4" style={{ color: colors.primary }} />
            <a 
              href={contactData.website || data.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs font-medium truncate" 
              style={{ color: colors.text, fontFamily: font }}
            >
              {t('Visit Website')}
            </a>
          </div>
        )}
        {contactData.location && (
          <div className="flex items-center space-x-2 p-2 rounded-lg" style={{ backgroundColor: colors.accent }}>
            <MapPin className="w-4 h-4" style={{ color: colors.primary }} />
            <span className="text-xs font-medium" style={{ color: colors.text, fontFamily: font }}>
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
      <div className="px-6 py-4 bg-white" style={{ borderBottom: `1px solid ${colors.accent}` }}>
        <h3 className="font-semibold text-sm mb-3 flex items-center" style={{ color: colors.primary, fontFamily: font }}>
          <Target className="w-4 h-4 mr-2" />
          {t('About Us')}
        </h3>
        <p className="text-sm leading-relaxed mb-3" style={{ color: colors.text, fontFamily: font }}>
          {aboutData.description || data.description}
        </p>
        {aboutData.specialties && (
          <div className="mb-3">
            <p className="text-xs font-medium mb-2" style={{ color: colors.text, fontFamily: font }}>{t("Specialties:")}</p>
            <div className="flex flex-wrap gap-1">
              {aboutData.specialties.split(',').map((specialty: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs" style={{ backgroundColor: colors.primary + '20', color: colors.primary }}>
                  {specialty.trim()}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {aboutData.experience && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
              <span className="text-white text-xs font-bold" style={{ fontFamily: font }}>{aboutData.experience}</span>
            </div>
            <span className="text-xs font-medium" style={{ color: colors.text, fontFamily: font }}>{t("Years of Experience")}</span>
          </div>
        )}
      </div>
    );
  };

  const renderServicesSection = (servicesData: any) => {
    const services = servicesData.service_list || [];
    if (!Array.isArray(services) || services.length === 0) return null;
    return (
      <div className="px-6 py-4 bg-white" style={{ borderBottom: `1px solid ${colors.accent}` }}>
        <h3 className="font-semibold text-sm mb-3 flex items-center" style={{ color: colors.primary, fontFamily: font }}>
          <Zap className="w-4 h-4 mr-2" />
          {t('Our Services')}
        </h3>
        <div className="space-y-3">
          {services.map((service: any, index: number) => (
            <div key={index} className="p-3 rounded-lg border-l-4" style={{ 
              backgroundColor: colors.accent, 
              borderColor: colors.primary 
            }}>
              <h4 className="font-medium text-sm mb-1" style={{ color: colors.text, fontFamily: font }}>
                {service.title}
              </h4>
              {service.description && (
                <p className="text-xs mb-2" style={{ color: colors.text + 'CC', fontFamily: font }}>
                  {service.description}
                </p>
              )}
              {service.price && (
                <p className="text-xs font-semibold" style={{ color: colors.primary, fontFamily: font }}>
                  {service.price}
                </p>
              )}
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
      <div className="px-6 py-4 bg-white" style={{ borderBottom: `1px solid ${colors.accent}` }}>
        <h3 className="font-semibold text-sm mb-3 flex items-center" style={{ color: colors.primary, fontFamily: font }}>
          <BarChart3 className="w-4 h-4 mr-2" />
          {t('Success Stories')}
        </h3>
        <div className="space-y-3">
          {projects.map((project: any, index: number) => (
            <div key={index} className="rounded-lg overflow-hidden" style={{ backgroundColor: colors.accent }}>
              {project.image && (
                <div className="w-full h-24">
                  <img 
                    src={project.image} 
                    alt={project.title || 'Case Study'} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-3">
                <h4 className="font-medium text-sm mb-1" style={{ color: colors.text, fontFamily: font }}>
                  {project.title}
                </h4>
                {project.results && (
                  <p className="text-xs font-semibold mb-2" style={{ color: colors.primary, fontFamily: font }}>
                    📈 {project.results}
                  </p>
                )}
                {project.url && (
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs underline" 
                    style={{ color: colors.secondary, fontFamily: font }}
                  >
                    {t('View Case Study')}
                  </a>
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
      <div className="px-6 py-4 bg-white" style={{ borderBottom: `1px solid ${colors.accent}` }}>
        <h3 className="font-semibold text-sm mb-3 flex items-center" style={{ color: colors.primary, fontFamily: font }}>
          <Video className="w-4 h-4 mr-2" />
          {t('Marketing Videos')}
        </h3>
        <div className="space-y-3">
          {videoContent.map((video: any) => (
            <div key={video.key} className="rounded-lg overflow-hidden" style={{ backgroundColor: colors.accent }}>
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
                      alt={video.title || 'Video thumbnail'} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white bg-opacity-90 flex items-center justify-center">
                        <Play className="w-6 h-6 ml-1" style={{ color: colors.primary }} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-32 flex items-center justify-center" style={{ backgroundColor: colors.primary + '20' }}>
                    <div className="text-center">
                      <Video className="w-8 h-8 mx-auto mb-2" style={{ color: colors.primary }} />
                      <span className="text-xs" style={{ color: colors.primary, fontFamily: font }}>{t("Video Content")}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-3">
                <h4 className="font-medium text-sm mb-1" style={{ color: colors.text, fontFamily: font }}>
                  {video.title}
                </h4>
                {video.description && (
                  <p className="text-xs mb-2" style={{ color: colors.text + 'CC', fontFamily: font }}>
                    {video.description}
                  </p>
                )}
                <div className="flex justify-between items-center">
                  {video.duration && (
                    <span className="text-xs" style={{ color: colors.secondary, fontFamily: font }}>
                      ⏱️ {video.duration}
                    </span>
                  )}
                  {video.marketing_channel && (
                    <Badge variant="secondary" className="text-xs" style={{ backgroundColor: colors.primary + '20', color: colors.primary }}>
                      {video.marketing_channel.replace('_', ' ').toUpperCase()}
                    </Badge>
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
      <div className="px-6 py-4 bg-white" style={{ borderBottom: `1px solid ${colors.accent}` }}>
        <h3 className="font-semibold text-sm mb-3 flex items-center" style={{ color: colors.primary, fontFamily: font }}>
          <Youtube className="w-4 h-4 mr-2" />
          {t('YouTube Channel')}
        </h3>
        <div className="space-y-3">
          {youtubeData.latest_video_embed && (
            <div className="rounded-lg overflow-hidden" style={{ backgroundColor: colors.accent }}>
              <div className="p-3 mb-2">
                <h4 className="font-medium text-sm flex items-center" style={{ color: colors.text, fontFamily: font }}>
                  <Play className="w-4 h-4 mr-2" style={{ color: colors.primary }} />
                  {t("Latest Video")}
                </h4>
              </div>
              <div className="w-full relative overflow-hidden" style={{ paddingBottom: '56.25%', height: 0 }}>
                <div 
                  className="absolute inset-0 w-full h-full"
                  ref={createYouTubeEmbedRef(
                    youtubeData.latest_video_embed,
                    { colors, font },
                    'Latest Video'
                  )}
                />
              </div>
            </div>
          )}
          <div className="rounded-lg p-4" style={{ backgroundColor: colors.accent }}>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                <Youtube className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm" style={{ color: colors.text, fontFamily: font }}>
                  {youtubeData.channel_name || 'YouTube Channel'}
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
                  {t('Visit Channel')}
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
                  📋 {t("Featured Playlist")}
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
      <div className="px-6 py-4 bg-white" style={{ borderBottom: `1px solid ${colors.accent}` }}>
        <h3 className="font-semibold text-sm mb-3" style={{ color: colors.primary, fontFamily: font }}>
          {t('Follow Us')}
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {socialLinks.map((link: any, index: number) => (
            <Button 
              key={index} 
              size="sm" 
              variant="outline" 
              className="justify-start h-8" 
              style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}
              onClick={() => link.url && typeof window !== "undefined" && window.open(link.url, '_blank', 'noopener,noreferrer')}
            >
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
      <div className="px-6 py-4 bg-white" style={{ borderBottom: `1px solid ${colors.accent}` }}>
        <h3 className="font-semibold text-sm mb-3" style={{ color: colors.primary, fontFamily: font }}>
          {t('Office Hours')}
        </h3>
        <div className="space-y-2">
          {hours.slice(0, 7).map((hour: any, index: number) => (
            <div key={index} className="flex justify-between items-center p-2 rounded" style={{ 
              backgroundColor: hour.is_closed ? colors.accent + '80' : colors.accent
            }}>
              <span className="capitalize font-medium text-xs" style={{ color: colors.text, fontFamily: font }}>
                {hour.day}
              </span>
              <span className="text-xs" style={{ 
                color: hour.is_closed ? colors.text + '80' : colors.primary, 
                fontFamily: font 
              }}>
                {hour.is_closed ? t('Closed') : `${hour.open_time} - ${hour.close_time}`}
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
      <div className="px-6 py-4 bg-white" style={{ borderBottom: `1px solid ${colors.accent}` }}>
        <h3 className="font-semibold text-sm mb-3" style={{ color: colors.primary, fontFamily: font }}>
          {t('Client Success')}
        </h3>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentReview * 100}%)` }}
            >
              {reviews.map((review: any, index: number) => (
                <div key={index} className="w-full flex-shrink-0 px-1">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: colors.accent }}>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-3 h-3 rounded-full ${i < parseInt(review.rating || 5) ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                      ))}
                    </div>
                    <p className="text-xs mb-2 leading-relaxed" style={{ color: colors.text, fontFamily: font }}>
                      "{review.review}"
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-medium" style={{ color: colors.primary, fontFamily: font }}>
                        {review.client_name}
                      </p>
                      {review.company && (
                        <p className="text-xs" style={{ color: colors.text + 'CC', fontFamily: font }}>
                          {review.company}
                        </p>
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

  const renderAppointmentsSection = (appointmentsData: any) => (
    <div className="px-6 py-4 bg-white" style={{ borderBottom: `1px solid ${colors.accent}` }}>
      <h3 className="font-semibold text-sm mb-3" style={{ color: colors.primary, fontFamily: font }}>
        {t('Free Consultation')}
      </h3>
      <Button 
        size="sm" 
        className="w-full" 
        style={{ 
          backgroundColor: colors.primary, 
          color: 'white',
          fontFamily: font 
        }}
        onClick={() => handleAppointmentBooking(configSections.appointments)}
      >
        <Calendar className="w-4 h-4 mr-2" />
        {t('Book Strategy Call')}
      </Button>
      
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

  const renderLocationSection = (locationData: any) => {
    if (!locationData.map_embed_url && !locationData.directions_url) return null;
    
    return (
      <div className="px-6 py-4 bg-white" style={{ borderBottom: `1px solid ${colors.accent}` }}>
        <h3 className="font-semibold text-sm mb-3" style={{ color: colors.primary, fontFamily: font }}>
          {t('Visit Our Office')}
        </h3>
        
        <div className="space-y-3">
          {locationData.map_embed_url && (
            <div className="rounded-lg overflow-hidden" style={{ height: '200px' }}>
              <div dangerouslySetInnerHTML={{ __html: locationData.map_embed_url }} className="w-full h-full" />
            </div>
          )}
          
          {locationData.directions_url && (
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full" 
              style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}
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
      <div className="px-6 py-4 bg-white" style={{ borderBottom: `1px solid ${colors.accent}` }}>
        <h3 className="font-semibold text-sm mb-3" style={{ color: colors.primary, fontFamily: font }}>
          {t('Download Our App')}
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {appData.app_store_url && (
            <Button 
              size="sm" 
              variant="outline" 
              style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}
              onClick={() => typeof window !== "undefined" && window.open(appData.app_store_url, '_blank', 'noopener,noreferrer')}
            >
              {t("App Store")}
            </Button>
          )}
          {appData.play_store_url && (
            <Button 
              size="sm" 
              variant="outline" 
              style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}
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
    return (
      <div className="px-6 py-4 bg-white" style={{ borderBottom: `1px solid ${colors.accent}` }}>
        <h3 className="font-semibold text-sm mb-2" style={{ color: colors.primary, fontFamily: font }}>
          {formData.form_title}
        </h3>
        {formData.form_description && (
          <p className="text-xs mb-3" style={{ color: colors.text, fontFamily: font }}>
            {formData.form_description}
          </p>
        )}
        <Button 
          size="sm" 
          className="w-full" 
          style={{ 
            backgroundColor: colors.secondary, 
            color: 'white',
            fontFamily: font 
          }}
          onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
        >
          <Mail className="w-4 h-4 mr-2" />
          {t('Get Free Quote')}
        </Button>
      </div>
    );
  };

  const renderCustomHtmlSection = (customHtmlData: any) => {
    if (!customHtmlData.html_content) return null;
    
    return (
      <div className="px-6 py-4 bg-white" style={{ borderBottom: `1px solid ${colors.accent}` }}>
        {customHtmlData.show_title && customHtmlData.section_title && (
          <h3 className="font-semibold text-sm mb-3 flex items-center" style={{ color: colors.primary, fontFamily: font }}>
            <Target className="w-4 h-4 mr-2" />
            {customHtmlData.section_title}
          </h3>
        )}
        <div 
          className="custom-html-content p-3 rounded-lg" 
          style={{ 
            backgroundColor: colors.accent,
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
    
    return (
      <div className="px-6 py-4 bg-white" style={{ borderBottom: `1px solid ${colors.accent}` }}>
        <h3 className="font-semibold text-sm mb-3 flex items-center" style={{ color: colors.primary, fontFamily: font }}>
          <QrCode className="w-4 h-4 mr-2" />
          {qrData.qr_title || t('Share QR Code')}
        </h3>
        <div className="text-center p-4 rounded-lg" style={{ backgroundColor: colors.accent }}>
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
    <div className="w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ 
      fontFamily: font,
      backgroundColor: colors.background || '#F8FAFC',
      border: `1px solid ${colors.accent}`,
      direction: isRTL ? 'rtl' : 'ltr'
    }}>
      {orderedSectionKeys
        .filter(key => key !== 'colors' && key !== 'font' && key !== 'copyright')
        .map((sectionKey) => (
          <React.Fragment key={sectionKey}>
            {renderSection(sectionKey)}
          </React.Fragment>
        ))}
      
      <div className="p-6 space-y-3" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
        <Button 
          className="w-full h-12 font-semibold rounded-lg shadow-lg" 
          style={{ 
            backgroundColor: 'white',
            color: colors.primary,
            fontFamily: font
          }}
          onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
        >
          🚀 {t('Start Your Growth Journey')}
        </Button>
        <Button 
          className="w-full h-10 font-medium rounded-lg border-2" 
          style={{ 
            borderColor: 'white', 
            color: 'white',
            backgroundColor: 'transparent',
            fontFamily: font
          }}
          onClick={() => handleAppointmentBooking(configSections.appointments)}
        >
          📞 {t('Free Strategy Call')}
        </Button>
        
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full flex items-center justify-center mt-4" 
          style={{ 
            borderColor: 'white', 
            color: 'white',
            backgroundColor: 'rgba(255,255,255,0.1)',
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
          {t('Save Contact')}
        </Button>
      </div>
      
      {copyrightSection && (
        <div className="px-6 pb-4 pt-2 bg-white">
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