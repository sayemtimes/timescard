import { handleAppointmentBooking } from '../VCardPreview';
import React from 'react';
import StableHtmlContent from '@/components/StableHtmlContent';
import { VideoEmbed, extractVideoUrl } from '@/components/VideoEmbed';
import { createYouTubeEmbedRef } from '@/utils/youtubeEmbedUtils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ensureRequiredSections } from '@/utils/ensureRequiredSections';
import { Mail, Phone, Globe, MapPin, Clock, Star, Stethoscope, Calendar, Download, UserPlus, Heart, Activity, Shield, Video, Play, Youtube, QrCode } from 'lucide-react';
import SocialIcon from '../../../link-bio-builder/components/SocialIcon';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionOrder, isSectionEnabled, getSectionData } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';
import { useTranslation } from 'react-i18next';
import languageData from '@/../../resources/lang/language.json';
import { sanitizeVideoData } from '@/utils/secureVideoUtils';

interface DoctorTemplateProps {
  data: any;
  template: any;
}

export default function DoctorTemplate({ data, template }: DoctorTemplateProps) {
  const { t, i18n } = useTranslation();
  const templateSections = template?.defaultData || {};
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
      return { ...sanitizedVideo, videoData, key: `video-${index}-${sanitizedVideo?.title || ''}-${sanitizedVideo?.embed_url || ''}` };
    });
  }, [configSections.videos?.video_list]);
  const colors = configSections.colors || template?.defaultColors || { 
    primary: '#1E40AF', 
    secondary: '#3B82F6', 
    accent: '#DBEAFE', 
    background: '#F8FAFC', 
    text: '#1E293B',
    cardBg: '#FFFFFF',
    borderColor: '#E2E8F0'
  };
  const font = configSections.font || template?.defaultFont || 'Inter, -apple-system, BlinkMacSystemFont, sans-serif';
  
  const globalStyle = {
    fontFamily: font
  };

  const renderSection = (sectionKey: string) => {
    const sectionData = configSections[sectionKey] || {};
    if (!sectionData || Object.keys(sectionData).length === 0 || sectionData.enabled === false) return null;
    
    switch (sectionKey) {
      case 'header': return renderHeaderSection(sectionData);
      case 'about': return renderAboutSection(sectionData);
      case 'contact': return renderContactSection(sectionData);
      case 'business_hours': return renderBusinessHoursSection(sectionData);
      case 'specialties': return renderSpecialtiesSection(sectionData);
      case 'services': return renderServicesSection(sectionData);
      case 'videos': return renderVideosSection(sectionData);
      case 'youtube': return renderYouTubeSection(sectionData);
      case 'appointments': return renderAppointmentsSection(sectionData);
      case 'testimonials': return renderTestimonialsSection(sectionData);
      case 'social': return renderSocialSection(sectionData);
      case 'google_map': return renderLocationSection(sectionData);
      case 'app_download': return renderAppDownloadSection(sectionData);
      case 'contact_form': return renderContactFormSection(sectionData);
      case 'custom_html': return renderCustomHtmlSection(sectionData);
      case 'qr_share': return renderQrShareSection(sectionData);
      case 'thank_you': return renderThankYouSection(sectionData);
      case 'copyright': return renderCopyrightSection(sectionData);
      default: return null;
    }
  };

  const renderHeaderSection = (headerData: any) => (
    <div className="relative bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-t-2xl border-b-4" style={{ borderColor: colors.primary, overflow: 'visible' }}>
      {/* Medical Cross Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 60 60" className="fill-current" style={{ color: colors.primary }}>
          <pattern id="medical-cross" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M12 8h6v6h6v6h-6v6h-6v-6H6v-6h6V8z" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#medical-cross)" />
        </svg>
      </div>
      
      <div className="h-28 w-full relative" style={{ background: `linear-gradient(135deg, ${colors.background || '#F8FAFC'} 0%, ${colors.primary}15 100%)` }}>
        <div className="absolute top-4 left-4">
          <div className="flex items-center space-x-2 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <span className="text-xs font-semibold tracking-wide" style={{ color: colors.primary }}>
              {headerData.professional_badge || 'HEALTHCARE PROFESSIONAL'}
            </span>
          </div>
        </div>
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          {/* Language Selector */}
          {configSections.language && (
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
          )}
          
          <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-sm flex items-center justify-center">
            <Stethoscope className="w-4 h-4" style={{ color: colors.primary }} />
          </div>
        </div>
      </div>
      
      <div className="px-6 pb-6 -mt-12 relative">
        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 bg-white rounded-xl border-2 shadow-lg flex items-center justify-center" style={{ borderColor: colors.borderColor || colors.primary }}>
            {headerData.profile_image ? (
              <img src={headerData.profile_image} alt="Profile" className="w-full h-full rounded-xl object-cover" />
            ) : (
              <div className="w-full h-full rounded-xl flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
                <Stethoscope className="w-8 h-8" style={{ color: colors.primary }} />
              </div>
            )}
          </div>
          <div className="flex-1 mt-2" style={globalStyle}>
            <h1 className="text-xl font-semibold" style={{ color: colors.text || '#1E293B', ...globalStyle }}>
              {headerData.name || data.name || 'Dr. Medical Professional'}
            </h1>
            <p className="text-sm font-medium" style={{ color: colors.primary, ...globalStyle }}>
              {headerData.title || 'MD, Medical Specialist'}
            </p>
            {headerData.specialization && (
              <p className="text-xs mt-1 bg-gray-50 px-2 py-1 rounded-md inline-block" style={{ color: colors.text, ...globalStyle }}>
                {headerData.specialization}
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
    <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#E2E8F0'}` }}>
      <h3 className="font-semibold text-sm mb-3 flex items-center" style={{ color: colors.text || '#1E293B', ...globalStyle }}>
        <div className="w-1 h-4 rounded-full mr-2" style={{ backgroundColor: colors.primary }}></div>
        {t('Contact Information')}
      </h3>
      <div className="space-y-3">
        {(contactData.phone || data.phone) && (
          <div className="flex items-center space-x-3 p-2 rounded-lg" style={{ backgroundColor: colors.accent || '#F8FAFC' }}>
            <div className="p-1.5 rounded-md" style={{ backgroundColor: colors.primary + '20' }}>
              <Phone className="w-3.5 h-3.5" style={{ color: colors.primary }} />
            </div>
            <a 
              href={`tel:${contactData.phone || data.phone}`} 
              className="text-sm font-medium" 
              style={{ color: colors.text || '#1E293B', ...globalStyle }}
            >
              {contactData.phone || data.phone}
            </a>
          </div>
        )}
        {contactData.emergency_phone && (
          <div className="flex items-center space-x-3 p-2 rounded-lg" style={{ backgroundColor: '#FEF2F2' }}>
            <div className="p-1.5 rounded-md" style={{ backgroundColor: '#DC2626' + '20' }}>
              <Phone className="w-3.5 h-3.5" style={{ color: '#DC2626' }} />
            </div>
            <div className="flex-1">
              <div className="text-xs font-medium" style={{ color: '#DC2626', ...globalStyle }}>{t('Emergency')}</div>
              <a 
                href={`tel:${contactData.emergency_phone}`} 
                className="text-sm font-medium" 
                style={{ color: colors.text || '#1E293B', ...globalStyle }}
              >
                {contactData.emergency_phone}
              </a>
            </div>
          </div>
        )}
        {(contactData.email || data.email) && (
          <div className="flex items-center space-x-3 p-2 rounded-lg" style={{ backgroundColor: colors.accent || '#F8FAFC' }}>
            <div className="p-1.5 rounded-md" style={{ backgroundColor: colors.primary + '20' }}>
              <Mail className="w-3.5 h-3.5" style={{ color: colors.primary }} />
            </div>
            <a 
              href={`mailto:${contactData.email || data.email}`} 
              className="text-sm font-medium" 
              style={{ color: colors.text || '#1E293B', ...globalStyle }}
            >
              {contactData.email || data.email}
            </a>
          </div>
        )}
        {(contactData.website || data.website) && (
          <div className="flex items-center space-x-3 p-2 rounded-lg" style={{ backgroundColor: colors.accent || '#F8FAFC' }}>
            <div className="p-1.5 rounded-md" style={{ backgroundColor: colors.primary + '20' }}>
              <Globe className="w-3.5 h-3.5" style={{ color: colors.primary }} />
            </div>
            <a 
              href={contactData.website || data.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium" 
              style={{ color: colors.text || '#1E293B', ...globalStyle }}
            >
              {(contactData.website || data.website).replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}
        {contactData.clinic_address && (
          <div className="flex items-center space-x-3 p-2 rounded-lg" style={{ backgroundColor: colors.accent || '#F8FAFC' }}>
            <div className="p-1.5 rounded-md" style={{ backgroundColor: colors.primary + '20' }}>
              <MapPin className="w-3.5 h-3.5" style={{ color: colors.primary }} />
            </div>
            <span className="text-sm font-medium" style={{ color: colors.text || '#1E293B', ...globalStyle }}>{contactData.clinic_address}</span>
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
    if (!aboutData.description && !aboutData.bio && !data.description) return null;
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#E2E8F0'}` }}>
        <h3 className="font-semibold text-sm mb-3" style={{ color: colors.text, ...globalStyle }}>{t('About')}</h3>
        <p className="text-sm leading-relaxed" style={{ color: colors.text, ...globalStyle }}>{aboutData.description || aboutData.bio || data.description}</p>
        {aboutData.qualifications && (
          <div className="mt-3">
            <p className="text-xs font-medium mb-1" style={{ color: colors.text, ...globalStyle }}>{t('Qualifications')}:</p>
            <p className="text-xs" style={{ color: colors.text, ...globalStyle }}>{aboutData.qualifications}</p>
          </div>
        )}
        {aboutData.experience_years && (
          <div className="mt-2">
            <p className="text-xs font-medium" style={{ color: colors.text, ...globalStyle }}>{t('Experience')}: {aboutData.experience_years} {t('years')}</p>
          </div>
        )}
      </div>
    );
  };

  const renderSpecialtiesSection = (specialtiesData: any) => {
    if (!Array.isArray(specialtiesData.specialty_list) || specialtiesData.specialty_list.length === 0) return null;
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#E2E8F0'}` }}>
        <h3 className="font-semibold text-sm mb-3" style={{ color: colors.text, ...globalStyle }}>{t('Medical Specialties')}</h3>
        <div className="space-y-2">
          {specialtiesData.specialty_list.slice(0, 4).map((specialty: any, index: number) => (
            <div key={index} className="p-2 rounded-lg" style={{ backgroundColor: colors.accent }}>
              <h4 className="text-sm font-medium" style={{ color: colors.text, ...globalStyle }}>{specialty.name}</h4>
              <p className="text-xs" style={{ color: colors.text, ...globalStyle }}>{specialty.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderServicesSection = (servicesData: any) => {
    const services = servicesData.service_list || servicesData.treatments;
    if (!Array.isArray(services) || services.length === 0) return null;
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#E2E8F0'}` }}>
        <h3 className="font-semibold text-sm mb-3" style={{ color: colors.text, ...globalStyle }}>{t('Medical Services')}</h3>
        <div className="space-y-2">
          {services.slice(0, 4).map((service: any, index: number) => (
            <div key={index} className="flex justify-between items-center p-2 rounded-lg" style={{ backgroundColor: colors.accent }}>
              <div className="flex-1">
                <span className="text-sm font-medium" style={{ color: colors.text, ...globalStyle }}>{service.name}</span>
                {service.description && <p className="text-xs" style={{ color: colors.text, ...globalStyle }}>{service.description}</p>}
              </div>
              {service.duration && (
                <span className="text-xs" style={{ color: colors.text, ...globalStyle }}>{service.duration}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderBusinessHoursSection = (hoursData: any) => {
    if (!Array.isArray(hoursData.hours) || hoursData.hours.length === 0) return null;
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#E2E8F0'}` }}>
        <h3 className="font-semibold text-sm mb-3 flex items-center" style={{ color: colors.text, ...globalStyle }}>
          <Clock className="w-4 h-4 mr-2" style={{ color: colors.primary }} />
          {t('Clinic Hours')}
        </h3>
        <div className="space-y-1 text-xs">
          {hoursData.hours.slice(0, 7).map((hour: any, index: number) => (
            <div key={index} className="flex justify-between">
              <span className="capitalize font-medium" style={{ color: colors.text, ...globalStyle }}>{hour.day}:</span>
              <span style={{ color: hour.is_closed ? colors.text + '80' : colors.primary, ...globalStyle }}>
                {hour.is_closed ? 'Closed' : `${hour.open_time} - ${hour.close_time}`}
                {!hour.is_closed && hour.appointment_only && (
                  <span className="text-xs ml-1 px-1 rounded" style={{ backgroundColor: colors.primary + '20', color: colors.primary }}>
                    {t('By Appt')}
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderVideosSection = (videosData: any) => {
    if (!videoContent || videoContent.length === 0) return null;
    
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#E2E8F0'}` }}>
        <h3 className="font-semibold text-sm mb-3 flex items-center" style={{ color: colors.text, ...globalStyle }}>
          <Video className="w-4 h-4 mr-2" style={{ color: colors.primary }} />
          {t('Educational Videos')}
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
                      alt={video.title || 'Medical video'} 
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
                      <span className="text-xs" style={{ color: colors.primary, fontFamily: font }}>{t("Medical Video")}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-3">
                <h4 className="font-medium text-sm mb-1" style={{ color: colors.text, ...globalStyle }}>
                  {video.title}
                </h4>
                {video.description && (
                  <p className="text-xs mb-2" style={{ color: colors.text + 'CC', ...globalStyle }}>
                    {video.description}
                  </p>
                )}
                <div className="flex justify-between items-center">
                  {video.duration && (
                    <span className="text-xs" style={{ color: colors.text + '80', ...globalStyle }}>
                      ⏱️ {video.duration}
                    </span>
                  )}
                  {video.video_type && (
                    <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: colors.primary + '20', color: colors.primary, ...globalStyle }}>
                      {video.video_type.replace('_', ' ')}
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
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#E2E8F0'}` }}>
        <h3 className="font-semibold text-sm mb-3 flex items-center" style={{ color: colors.text, ...globalStyle }}>
          <Youtube className="w-4 h-4 mr-2" style={{ color: colors.primary }} />
          {t('YouTube Channel')}
        </h3>
        <div className="rounded-lg p-4" style={{ backgroundColor: colors.accent }}>
          <div className="flex items-center space-x-3 mb-3">
        
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
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
              <Youtube className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm" style={{ color: colors.text, ...globalStyle }}>
                {youtubeData.channel_name || 'Medical Channel'}
              </h4>
              {youtubeData.subscriber_count && (
                <p className="text-xs" style={{ color: colors.text + 'CC', ...globalStyle }}>
                  📊 {youtubeData.subscriber_count} {t("subscribers")}
                </p>
              )}
            </div>
          </div>
          {youtubeData.channel_description && (
            <p className="text-xs mb-3" style={{ color: colors.text, ...globalStyle }}>
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
                📋 {t("Health Tips")}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderAppointmentsSection = (appointmentsData: any) => {
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#E2E8F0'}` }}>
        <h3 className="font-semibold text-sm mb-3 flex items-center" style={{ color: colors.text, ...globalStyle }}>
          <Calendar className="w-4 h-4 mr-2" style={{ color: colors.primary }} />
          {t('Book Appointment')}
        </h3>
        <div className="space-y-2">
          <Button 
            size="sm" 
            className="w-full" 
            style={{ backgroundColor: colors.primary, color: 'white', fontFamily: font }}
            onClick={() => {
              const calendarLink = appointmentsData?.online_booking_url || appointmentsData?.calendar_link || appointmentsData?.booking_url || configSections.appointments?.online_booking_url || configSections.appointments?.calendar_link || configSections.appointments?.booking_url;
              if (calendarLink) {
                window.open(calendarLink, '_blank', 'noopener,noreferrer');
              } else {
                handleAppointmentBooking(configSections.appointments);
              }
            }}
          >
            {t('Book Online')}
          </Button>
          {(appointmentsData?.calendar_link || appointmentsData?.booking_url) && (
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full" 
              style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}
              onClick={() => typeof window !== "undefined" && window.open(appointmentsData.calendar_link || appointmentsData.booking_url, '_blank', 'noopener,noreferrer')}
            >
              {t('View Calendar')}
            </Button>
          )}
          {appointmentsData?.booking_phone && (
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full" 
              style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}
              onClick={() => typeof window !== "undefined" && window.open(`tel:${appointmentsData.booking_phone}`, '_self')}
            >
              {t('Call')}: {appointmentsData.booking_phone}
            </Button>
          )}
        </div>
      </div>
    );
  };

  const renderTestimonialsSection = (testimonialsData: any) => {
    if (!Array.isArray(testimonialsData.reviews) || testimonialsData.reviews.length === 0) return null;
    
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#E2E8F0'}` }}>
        <h3 className="font-semibold text-sm mb-3" style={{ color: colors.text, ...globalStyle }}>{t('Patient Reviews')}</h3>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentReview * 100}%)` }}
            >
              {testimonialsData.reviews.map((review: any, index: number) => (
                <div key={index} className="w-full flex-shrink-0 px-1">
                  <div className="p-3 rounded-xl" style={{ backgroundColor: colors.accent }}>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < parseInt(review.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <p className="text-xs mb-2" style={{ color: colors.text, ...globalStyle }}>"{review.review}"</p>
                    <p className="text-xs font-medium" style={{ color: colors.primary, ...globalStyle }}>- {review.patient_name || review.client_name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {testimonialsData.reviews.length > 1 && (
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

  const renderSocialSection = (socialData: any) => {
    if (!Array.isArray(socialData.social_links) || socialData.social_links.length === 0) return null;
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#E2E8F0'}` }}>
        <h3 className="font-semibold text-sm mb-3" style={{ color: colors.text, ...globalStyle }}>{t('Professional Profiles')}</h3>
        <div className="grid grid-cols-2 gap-2">
          {socialData.social_links.map((link: any, index: number) => (
            <Button 
              key={index} 
              size="sm" 
              variant="outline" 
              className="justify-start" 
              style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}
              onClick={() => link.url && typeof window !== "undefined" && window.open(link.url, '_blank', 'noopener,noreferrer')}
            >
              <SocialIcon platform={link.platform} color={colors.primary} />
              <span className="text-xs capitalize ml-2" style={globalStyle}>{link.platform}</span>
            </Button>
          ))}
        </div>
      </div>
    );
  };

  const renderAppDownloadSection = (appData: any) => {
    if (!appData.app_store_url && !appData.play_store_url) return null;
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#E2E8F0'}` }}>
        <h3 className="font-semibold text-sm mb-3" style={{ color: colors.text, ...globalStyle }}>{t('Medical App')}</h3>
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
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#E2E8F0'}` }}>
        <h3 className="font-semibold text-sm mb-2" style={{ color: colors.text, ...globalStyle }}>{formData.form_title}</h3>
        {formData.form_description && (
          <p className="text-xs mb-3" style={{ color: colors.text, ...globalStyle }}>{formData.form_description}</p>
        )}
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full" 
          style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}
          onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
        >
          <Mail className="w-4 h-4 mr-2" />
          {t('Contact Doctor')}
        </Button>
      </div>
    );
  };

  const renderThankYouSection = (thankYouData: any) => {
    if (!thankYouData.message) return null;
    return (
      <div className="px-6 pb-2">
        <p className="text-xs text-center" style={{ color: colors.text + '80', ...globalStyle }}>{thankYouData.message}</p>
      </div>
    );
  };

  const renderCustomHtmlSection = (customHtmlData: any) => {
    if (!customHtmlData.html_content) return null;
    
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#E2E8F0'}` }}>
        {customHtmlData.show_title && customHtmlData.section_title && (
          <h3 className="font-semibold text-sm mb-3 flex items-center" style={{ color: colors.text, ...globalStyle }}>
            <div className="w-1 h-4 rounded-full mr-2" style={{ backgroundColor: colors.primary }}></div>
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
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#E2E8F0'}` }}>
        <h3 className="font-semibold text-sm mb-3 flex items-center" style={{ color: colors.text, ...globalStyle }}>
          <QrCode className="w-4 h-4 mr-2" style={{ color: colors.primary }} />
          {qrData.qr_title || t('Share QR Code')}
        </h3>
        <div className="text-center p-4 rounded-lg" style={{ backgroundColor: colors.accent }}>
          {qrData.qr_description && (
            <p className="text-xs mb-3" style={{ color: colors.text, ...globalStyle }}>
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

  const renderCopyrightSection = (copyrightData: any) => {
    // This function is no longer used as we're rendering copyright separately at the end
    return null;
  };

  const renderLocationSection = (locationData: any) => {
    if (!locationData.map_embed_url && !locationData.directions_url) return null;
    
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#E2E8F0'}` }}>
        <h3 className="font-semibold text-sm mb-3" style={{ color: colors.text, ...globalStyle }}>{t('Clinic Location')}</h3>
        
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

  // Get all sections for this business type
  const allSections = getBusinessTemplate('doctor')?.sections || [];
  
  // Extract copyright section to render it at the end
  const copyrightSection = configSections.copyright;
  
  // Get ordered sections using the utility function
  const orderedSectionKeys = getSectionOrder(data.template_config || { sections: configSections, sectionSettings: configSections }, allSections);
    
  return (
    <div className="w-full max-w-md mx-auto rounded-2xl shadow-xl overflow-hidden" style={{ 
      fontFamily: font,
      background: colors.background || '#FFFFFF',
      border: `1px solid ${colors.borderColor || '#E2E8F0'}`,
      direction: isRTL ? 'rtl' : 'ltr'
    }}>
      {orderedSectionKeys
        .filter(key => key !== 'colors' && key !== 'font' && key !== 'copyright')
        .map((sectionKey) => (
          <React.Fragment key={sectionKey}>
            {renderSection(sectionKey)}
          </React.Fragment>
        ))}
      
      <div className="p-4 space-y-2" style={{ background: `linear-gradient(to bottom, ${colors.background || '#FFFFFF'}, ${colors.accent || '#F8FAFC'})` }}>
        <Button 
          className="w-full h-10 font-medium rounded-lg shadow-sm transition-all hover:shadow-md" 
          style={{ 
            backgroundColor: colors.primary,
            color: 'white',
            border: 'none',
            fontFamily: font
          }}
          onClick={() => handleAppointmentBooking(configSections.appointments)}
        >
          <Calendar className="w-4 h-4 mr-2" />
          {t('Schedule Appointment')}
        </Button>
        <Button 
          className="w-full h-10 font-medium rounded-lg border-2 transition-all hover:shadow-sm" 
          style={{ 
            borderColor: colors.primary, 
            color: colors.primary,
            backgroundColor: 'transparent',
            fontFamily: font
          }}
          onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
        >
          <Mail className="w-4 h-4 mr-2" />
          {t('Contact Doctor')}
        </Button>
        
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full flex items-center justify-center" 
          style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}
          onClick={() => {
            const contactData = {
              name: data.name || '',
              title: data.title || '',
              email: data.email || configSections.contact?.email || '',
              phone: data.phone || configSections.contact?.phone || '',
              website: data.website || configSections.contact?.website || '',
              location: configSections.contact?.clinic_address || ''
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
      
      {/* Copyright always at the end */}
      {copyrightSection && (
        <div className="px-6 pb-4 pt-2">
          {copyrightSection.text && (
            <p className="text-xs text-center" style={{ color: colors.text + '60', ...globalStyle }}>
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