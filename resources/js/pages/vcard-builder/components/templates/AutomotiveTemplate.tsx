import { handleAppointmentBooking } from '../VCardPreview';
import React from 'react';
import StableHtmlContent from '@/components/StableHtmlContent';
import { VideoEmbed, extractVideoUrl } from '@/components/VideoEmbed';
import { createYouTubeEmbedRef } from '@/utils/youtubeEmbedUtils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Globe, MapPin, Calendar, UserPlus, Wrench, Car, Shield, Clock, Star, PhoneCall, Video, Play, Youtube, QrCode } from 'lucide-react';
import SocialIcon from '../../../link-bio-builder/components/SocialIcon';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionOrder } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';

import { useTranslation } from 'react-i18next';
import { sanitizeVideoData } from '@/utils/secureVideoUtils';
import languageData from '@/../../resources/lang/language.json';

interface AutomotiveTemplateProps {
  data: any;
  template: any;
}

export default function AutomotiveTemplate({ data, template }: AutomotiveTemplateProps) {
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

  const colors = configSections.colors || template?.defaultColors || { primary: '#DC2626', secondary: '#EF4444', text: '#F5F5F5' };
  const font = configSections.font || template?.defaultFont || 'Roboto, sans-serif';

  // Get all sections for this business type
  const allSections = getBusinessTemplate('automotive')?.sections || [];

  const renderSection = (sectionKey: string) => {
    const sectionData = configSections[sectionKey] || {};
    if (!sectionData || Object.keys(sectionData).length === 0 || sectionData.enabled === false) return null;
    
    switch (sectionKey) {
      case 'header': return renderHeaderSection(sectionData);
      case 'contact': return renderContactSection(sectionData);
      case 'about': return renderAboutSection(sectionData);
      case 'services': return renderServicesSection(sectionData);
      case 'certifications': return renderCertificationsSection(sectionData);
      case 'videos': return renderVideosSection(sectionData);
      case 'youtube': return renderYouTubeSection(sectionData);
      case 'social': return renderSocialSection(sectionData);
      case 'business_hours': return renderBusinessHoursSection(sectionData);
      case 'testimonials': return renderTestimonialsSection(sectionData);
      case 'appointments': return renderAppointmentsSection(sectionData);
      case 'google_map': return renderLocationSection(sectionData);
      case 'app_download': return renderAppDownloadSection(sectionData);
      case 'contact_form': return renderContactFormSection(sectionData);
      case 'custom_html': return renderCustomHtmlSection(sectionData);
      case 'qr_share': return renderQrShareSection(sectionData);
      case 'thank_you': return renderThankYouSection(sectionData);
      default: return null;
    }
  };

  const renderHeaderSection = (headerData: any) => (
    <div className="relative rounded-t-2xl overflow-hidden" style={{ background: `linear-gradient(45deg, ${colors.background}, ${colors.cardBg})` }}>
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 60 60" className="fill-current" style={{ color: colors.primary }}>
          <pattern id="tire-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="12" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="15" cy="15" r="6" fill="none" stroke="currentColor" strokeWidth="1"/>
            <path d="M3 15h24M15 3v24" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#tire-pattern)" />
        </svg>
      </div>
      
      <div className="px-6 py-6 relative">
        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 rounded-lg flex items-center justify-center shadow-2xl" style={{ 
            backgroundColor: colors.primary,
            border: `2px solid ${colors.secondary}`
          }}>
            {headerData.profile_image ? (
              <img src={headerData.profile_image} alt="Logo" className="w-full h-full rounded-lg object-cover" />
            ) : (
              <Car className="w-10 h-10 text-white" />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold mb-1" style={{ color: colors.text, fontFamily: font }}>
              {headerData.name || data.name || 'Auto Shop'}
            </h1>
            <p className="text-sm font-medium mb-2" style={{ color: colors.primary, fontFamily: font }}>
              {headerData.title || 'Professional Auto Services'}
            </p>
            {headerData.tagline && (
              <p className="text-xs leading-relaxed" style={{ color: colors.text + 'CC', fontFamily: font }}>
                {headerData.tagline}
              </p>
            )}
          </div>
        </div>
        
        {/* Language Selector */}
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
        
        <div className="flex justify-between items-center mt-4 pt-4" style={{ borderTop: `1px solid ${colors.primary}40` }}>
          <div className="flex items-center space-x-4">
            {headerData.badge_1 && (
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" style={{ color: colors.primary }} />
                <span className="text-xs font-medium" style={{ color: colors.text, fontFamily: font }}>{headerData.badge_1}</span>
              </div>
            )}
            {headerData.badge_2 && (
              <div className="flex items-center space-x-2">
                <Wrench className="w-4 h-4" style={{ color: colors.primary }} />
                <span className="text-xs font-medium" style={{ color: colors.text, fontFamily: font }}>{headerData.badge_2}</span>
              </div>
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
    <>
      <div className="h-1" style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary}, ${colors.primary})` }}></div>
      <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
        <div className="grid grid-cols-1 gap-3">
          {(contactData.phone || data.phone) && (
            <div className="flex items-center space-x-3 p-3 rounded-lg border-l-4" style={{ 
              backgroundColor: colors.background, 
              borderColor: colors.primary 
            }}>
              <Phone className="w-5 h-5" style={{ color: colors.primary }} />
              <div>
                <p className="text-xs font-medium" style={{ color: colors.text + '80', fontFamily: font }}>Call Now</p>
                <a 
                  href={`tel:${contactData.phone || data.phone}`} 
                  className="text-sm font-bold" 
                  style={{ color: colors.text, fontFamily: font }}
                >
                  {contactData.phone || data.phone}
                </a>
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-2">
            {(contactData.email || data.email) && (
              <div className="flex items-center space-x-2 p-2 rounded" style={{ backgroundColor: colors.background }}>
                <Mail className="w-4 h-4" style={{ color: colors.primary }} />
                <a 
                  href={`mailto:${contactData.email || data.email}`} 
                  className="text-xs font-medium truncate" 
                  style={{ color: colors.text, fontFamily: font }}
                >
                  {t("Email")}
                </a>
              </div>
            )}
            {contactData.location && (
              <div className="flex items-center space-x-2 p-2 rounded" style={{ backgroundColor: colors.background }}>
                <MapPin className="w-4 h-4" style={{ color: colors.primary }} />
                <span className="text-xs font-medium truncate" style={{ color: colors.text, fontFamily: font }}>
                  {contactData.location}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

  const renderAboutSection = (aboutData: any) => {
    if (!aboutData.description && !data.description) return null;
  
  return (
      <>
        <div className="h-px" style={{ backgroundColor: colors.primary + '30' }}></div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
              <Wrench className="w-3 h-3 text-white" />
            </div>
            <h3 className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>{t('About Our Shop')}</h3>
          </div>
          <p className="text-sm leading-relaxed mb-3" style={{ color: colors.text + 'DD', fontFamily: font }}>
            {aboutData.description || data.description}
          </p>
          {aboutData.specialties && (
            <div className="mb-3">
              <p className="text-xs font-bold mb-2" style={{ color: colors.primary, fontFamily: font }}>{t('SPECIALTIES')}:</p>
              <div className="flex flex-wrap gap-1">
                {aboutData.specialties.split(',').map((specialty: string, index: number) => (
                  <Badge key={index} className="text-xs px-2 py-1" style={{ 
                    backgroundColor: colors.primary + '20', 
                    color: colors.primary,
                    border: `1px solid ${colors.primary}40`
                  }}>
                    {specialty.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {aboutData.experience && (
            <div className="flex items-center space-x-3 p-2 rounded" style={{ backgroundColor: colors.background }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
                <span className="text-white text-sm font-bold" style={{ fontFamily: font }}>{aboutData.experience}</span>
              </div>
              <span className="text-sm font-medium" style={{ color: colors.text, fontFamily: font }}>{t('Years of Trusted Service')}</span>
            </div>
          )}
        </div>
      </>
    );
  };

  const renderServicesSection = (servicesData: any) => {
    const services = servicesData.service_list || [];
    if (!Array.isArray(services) || services.length === 0) return null;
    return (
      <>
        <div className="h-px" style={{ backgroundColor: colors.primary + '30' }}></div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
              <Car className="w-3 h-3 text-white" />
            </div>
            <h3 className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>{t('Our Services')}</h3>
          </div>
          <div className="space-y-3">
            {services.map((service: any, index: number) => (
              <div key={index} className="p-3 rounded-lg border" style={{ 
                backgroundColor: colors.background,
                borderColor: colors.primary + '40'
              }}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>
                    {service.title}
                  </h4>
                  {service.price && (
                    <span className="text-xs font-bold px-2 py-1 rounded" style={{ 
                      color: colors.primary,
                      backgroundColor: colors.primary + '20',
                      fontFamily: font
                    }}>
                      {service.price}
                    </span>
                  )}
                </div>
                {service.description && (
                  <p className="text-xs" style={{ color: colors.text + 'CC', fontFamily: font }}>
                    {service.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  const renderCertificationsSection = (certData: any) => {
    const certs = certData.cert_list || [];
    if (!Array.isArray(certs) || certs.length === 0) return null;
    return (
      <>
        <div className="h-px" style={{ backgroundColor: colors.primary + '30' }}></div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
              <Shield className="w-3 h-3 text-white" />
            </div>
            <h3 className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>{t('Certifications')}</h3>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {certs.map((cert: any, index: number) => (
              <div key={index} className="flex items-center space-x-3 p-2 rounded" style={{ backgroundColor: colors.background }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                <div>
                  <p className="text-sm font-bold" style={{ color: colors.text, fontFamily: font }}>{cert.title}</p>
                  {cert.description && (
                    <p className="text-xs" style={{ color: colors.text + 'AA', fontFamily: font }}>{cert.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  const renderVideosSection = (videosData: any) => {
    if (!videoContent || videoContent.length === 0) return null;
    
    return (
      <>
        <div className="h-px" style={{ backgroundColor: colors.primary + '30' }}></div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
              <Video className="w-3 h-3 text-white" />
            </div>
            <h3 className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>{t('Service Videos')}</h3>
          </div>
          <div className="space-y-3">
            {videoContent.map((video: any) => (
              <div key={video.key} className="rounded-lg overflow-hidden border" style={{ 
                backgroundColor: colors.background,
                borderColor: colors.primary + '40'
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
                        alt={video.title || 'Service video'} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
                          <Play className="w-6 h-6 ml-1 text-white" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-32 flex items-center justify-center" style={{ backgroundColor: colors.primary + '20' }}>
                      <div className="text-center">
                        <Video className="w-8 h-8 mx-auto mb-2" style={{ color: colors.primary }} />
                        <span className="text-xs font-medium" style={{ color: colors.primary, fontFamily: font }}>{t("Auto Service")}</span>
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
                    {video.service_type && (
                      <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: colors.primary + '20', color: colors.primary, fontFamily: font }}>
                        🔧 {video.service_type}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  const renderYouTubeSection = (youtubeData: any) => {
    if (!youtubeData.channel_url && !youtubeData.channel_name && !youtubeData.latest_video_embed) return null;
    
    return (
      <>
        <div className="h-px" style={{ backgroundColor: colors.primary + '30' }}></div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
              <Youtube className="w-3 h-3 text-white" />
            </div>
            <h3 className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>{t('YouTube Channel')}</h3>
        </div>
        
        {youtubeData.latest_video_embed && (
          <div className="mb-4 rounded overflow-hidden" style={{ backgroundColor: colors.background, border: `1px solid ${colors.borderColor}` }}>
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
        
        <div className="p-3 rounded-lg border" style={{ 
            backgroundColor: colors.background,
            borderColor: colors.primary + '40'
          }}>
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 rounded bg-red-600 flex items-center justify-center mr-3">
                <Youtube className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>
                  {youtubeData.channel_name || 'Auto Shop TV'}
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
                  🔧 {t("AUTO TIPS")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderSocialSection = (socialData: any) => {
    const socialLinks = socialData.social_links || [];
    if (!Array.isArray(socialLinks) || socialLinks.length === 0) return null;
    return (
      <>
        <div className="h-px" style={{ backgroundColor: colors.primary + '30' }}></div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <h3 className="font-bold text-sm mb-3" style={{ color: colors.text, fontFamily: font }}>{t('Find Us Online')}</h3>
          <div className="grid grid-cols-2 gap-2">
            {socialLinks.map((link: any, index: number) => (
              <Button 
                key={index} 
                size="sm" 
                className="h-8 font-medium justify-start" 
                style={{ 
                  backgroundColor: colors.primary,
                  color: 'white',
                  fontFamily: font
                }}
                onClick={() => link.url && typeof window !== "undefined" && window.open(link.url, '_blank', 'noopener,noreferrer')}
              >
                <SocialIcon platform={link.platform} color="white" />
                <span className="ml-2 capitalize">{link.platform}</span>
              </Button>
            ))}
          </div>
        </div>
      </>
    );
  };

  const renderBusinessHoursSection = (hoursData: any) => {
    const hours = hoursData.hours || [];
    if (!Array.isArray(hours) || hours.length === 0) return null;
    return (
      <>
        <div className="h-px" style={{ backgroundColor: colors.primary + '30' }}></div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
              <Clock className="w-3 h-3 text-white" />
            </div>
            <h3 className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>{t('Shop Hours')}</h3>
          </div>
          <div className="space-y-1">
            {hours.slice(0, 7).map((hour: any, index: number) => (
              <div key={index} className="flex justify-between items-center py-1">
                <span className="capitalize text-sm font-medium" style={{ color: colors.text, fontFamily: font }}>
                  {hour.day}
                </span>
                <span className="text-sm font-bold" style={{ 
                  color: hour.is_closed ? colors.text + '60' : colors.primary, 
                  fontFamily: font 
                }}>
                  {hour.is_closed ? t('CLOSED') : `${hour.open_time} - ${hour.close_time}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  const renderTestimonialsSection = (testimonialsData: any) => {
    const reviews = testimonialsData.reviews || [];
    
    
    if (!Array.isArray(reviews) || reviews.length === 0) return null;
    
    
    return (
      <>
        <div className="h-px" style={{ backgroundColor: colors.primary + '30' }}></div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
              <Star className="w-3 h-3 text-white" />
            </div>
            <h3 className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>{t('Customer Reviews')}</h3>
          </div>
          
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentReview * 100}%)` }}
              >
                {reviews.map((review: any, index: number) => (
                  <div key={index} className="w-full flex-shrink-0 px-1">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: colors.background }}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < parseInt(review.rating || 5) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                          ))}
                        </div>
                        {review.vehicle && (
                          <span className="text-xs px-2 py-1 rounded" style={{ 
                            backgroundColor: colors.primary + '20',
                            color: colors.primary,
                            fontFamily: font
                          }}>
                            {review.vehicle}
                          </span>
                        )}
                      </div>
                      <p className="text-xs mb-2 leading-relaxed" style={{ color: colors.text + 'DD', fontFamily: font }}>
                        "{review.review}"
                      </p>
                      <p className="text-xs font-bold" style={{ color: colors.primary, fontFamily: font }}>
                        - {review.client_name}
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
      </>
    );
  };

  const renderAppointmentsSection = (appointmentsData: any) => (
    <>
      <div className="h-px" style={{ backgroundColor: colors.primary + '30' }}></div>
      <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
        <h3 className="font-bold text-sm mb-3" style={{ color: colors.text, fontFamily: font }}>{t('Schedule Service')}</h3>
        <div className="space-y-2">
          <Button 
            size="sm" 
            className="w-full h-10 font-bold" 
            style={{ 
              backgroundColor: colors.primary, 
              color: 'white',
              fontFamily: font 
            }}
            onClick={() => handleAppointmentBooking(configSections.appointments)}
          >
            <Calendar className="w-4 h-4 mr-2" />
            {t('Book Appointment')}
          </Button>
          {appointmentsData?.emergency_phone && (
            <Button 
              size="sm" 
              variant="outline"
              className="w-full h-8" 
              style={{ 
                borderColor: colors.primary, 
                color: colors.primary,
                fontFamily: font 
              }}
              onClick={() => typeof window !== "undefined" && window.open(`tel:${appointmentsData.emergency_phone}`, '_self')}
            >
              <PhoneCall className="w-4 h-4 mr-2" />
              {t('Emergency/Towing')}
            </Button>
          )}
        </div>
      </div>
    </>
  );

  const renderLocationSection = (locationData: any) => {
    if (!locationData.map_embed_url && !locationData.directions_url) return null;
    
    return (
      <>
        <div className="h-px" style={{ backgroundColor: colors.primary + '30' }}></div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <h3 className="font-bold text-sm mb-3" style={{ color: colors.text, fontFamily: font }}>{t('Visit Our Shop')}</h3>
          
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
      </>
    );
  };

  const renderAppDownloadSection = (appData: any) => {
    if (!appData.app_store_url && !appData.play_store_url) return null;
    return (
      <>
        <div className="h-px" style={{ backgroundColor: colors.primary + '30' }}></div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <h3 className="font-bold text-sm mb-3" style={{ color: colors.text, fontFamily: font }}>{t('Download Our App')}</h3>
          <div className="grid grid-cols-2 gap-2">
            {appData.app_store_url && (
              <Button size="sm" variant="outline" style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}>
                {t("App Store")}
              </Button>
            )}
            {appData.play_store_url && (
              <Button size="sm" variant="outline" style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}>
                {t("Play Store")}
              </Button>
            )}
          </div>
        </div>
      </>
    );
  };

  const renderContactFormSection = (formData: any) => {
    if (!formData.form_title) return null;
    return (
      <>
        <div className="h-px" style={{ backgroundColor: colors.primary + '30' }}></div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <h3 className="font-bold text-sm mb-2" style={{ color: colors.text, fontFamily: font }}>
            {formData.form_title}
          </h3>
          {formData.form_description && (
            <p className="text-xs mb-3" style={{ color: colors.text + 'CC', fontFamily: font }}>
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
            {t('Get Free Estimate')}
          </Button>
        </div>
      </>
    );
  };

  const renderCustomHtmlSection = (customHtmlData: any) => {
    if (!customHtmlData.html_content) return null;
    
    return (
      <>
        <div className="h-px" style={{ backgroundColor: colors.primary + '30' }}></div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          {customHtmlData.show_title && customHtmlData.section_title && (
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
                <Wrench className="w-3 h-3 text-white" />
              </div>
              <h3 className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>
                {customHtmlData.section_title}
              </h3>
            </div>
          )}
          <div 
            className="custom-html-content p-3 rounded-lg" 
            style={{ 
              backgroundColor: colors.background,
              border: `1px solid ${colors.primary}40`,
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
      </>
    );
  };

  const renderQrShareSection = (qrData: any) => {
    if (!qrData.enable_qr) return null;
    
    return (
      <>
        <div className="h-px" style={{ backgroundColor: colors.primary + '30' }}></div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <div className="text-center p-4 rounded-lg" style={{ 
            backgroundColor: colors.background,
            border: `1px solid ${colors.primary}40`
          }}>
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
      </>
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
    <div className="w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl" style={{ 
      fontFamily: font,
      backgroundColor: colors.background,
      border: `2px solid ${colors.primary}40`,
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
          className="w-full h-12 font-bold rounded-lg shadow-lg" 
          style={{ 
            backgroundColor: 'white',
            color: colors.primary,
            fontFamily: font
          }}
          onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
        >
          🔧 {t('Get Service Quote')}
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
          📅 {t('Schedule Service')}
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
        <div className="px-6 pb-4 pt-2" style={{ backgroundColor: colors.cardBg }}>
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