import { handleAppointmentBooking } from '../VCardPreview';
import React from 'react';
import StableHtmlContent from '@/components/StableHtmlContent';
import { VideoEmbed, extractVideoUrl } from '@/components/VideoEmbed';
import { createYouTubeEmbedRef } from '@/utils/youtubeEmbedUtils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ensureRequiredSections } from '@/utils/ensureRequiredSections';
import { Mail, Phone, Globe, MapPin, Calendar, UserPlus, Dumbbell, Trophy, Zap, Clock, Star, Target, Activity, Video, Play, Youtube, Share2, QrCode } from 'lucide-react';
import SocialIcon from '../../../link-bio-builder/components/SocialIcon';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionOrder } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';
import { useTranslation } from 'react-i18next';
import { sanitizeText, sanitizeUrl } from '@/utils/sanitizeHtml';
import languageData from '@/../../resources/lang/language.json';

interface IPersonalTrainerTemplateProps {
  data: {
    name?: string;
    email?: string;
    phone?: string;
    website?: string;
    description?: string;
    config_sections?: Record<string, any>;
    template_config?: Record<string, any>;
  };
  template: {
    defaultData?: Record<string, any>;
    defaultColors?: Record<string, string>;
    defaultFont?: string;
  };
}

export default function PersonalTrainerTemplate({ data, template }: IPersonalTrainerTemplateProps) {
   const { t, i18n } = useTranslation();
   
   // Get all sections for this business type
   const templateSections = template?.defaultData || {};
   
   // Ensure all required sections are available
   const configSections = ensureRequiredSections(data?.config_sections || {}, templateSections);

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
  const colors = configSections.colors || template?.defaultColors || { primary: '#EA580C', secondary: '#FB923C', text: '#1C1917' };
  const font = configSections.font || template?.defaultFont || 'Poppins, sans-serif';

  // Get all sections for this business type
  const allSections = getBusinessTemplate('personal-trainer')?.sections || [];

  const renderSection = (sectionKey: string) => {
    const sectionData = configSections[sectionKey] || {};
    if (!sectionData || Object.keys(sectionData).length === 0 || sectionData.enabled === false) return null;
    
    switch (sectionKey) {
      case 'header': return renderHeaderSection(sectionData);
      case 'contact': return renderContactSection(sectionData);
      case 'about': return renderAboutSection(sectionData);
      case 'services': return renderServicesSection(sectionData);
      case 'videos':
        return renderVideosSection(sectionData);
      case 'youtube':
        return renderYouTubeSection(sectionData);
      case 'achievements': return renderAchievementsSection(sectionData);
      case 'transformation_stories': return renderTransformationStoriesSection(sectionData);
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
    <div className="relative rounded-t-2xl overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
      <div className="absolute inset-0 opacity-15">
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="fill-current text-white">
          <pattern id="fitness-pattern" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
            <circle cx="12.5" cy="5" r="2" />
            <rect x="10" y="8" width="5" height="2" />
            <circle cx="5" cy="20" r="1.5" />
            <path d="M18 15 L22 19 L18 23 L14 19 Z" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#fitness-pattern)" />
        </svg>
      </div>
      
      <div className="px-6 py-6 relative">
        {/* Language Selector */}
        {configSections.language && (
          <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}>
            <div className="relative">
              <button
                onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                className="flex items-center space-x-1 px-3 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105"
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255,255,255,0.3)',
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
        
        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 rounded-full border-4 border-white/30 bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
            {headerData.profile_image ? (
              <img src={headerData.profile_image} alt="Profile" className="w-full h-full rounded-full object-cover" />
            ) : (
              <Dumbbell className="w-10 h-10 text-white" />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white mb-1" style={{ fontFamily: font }}>
              {sanitizeText(headerData?.name || data?.name || 'Personal Trainer')}
            </h1>
            <p className="text-white/90 text-sm font-medium mb-2" style={{ fontFamily: font }}>
              {sanitizeText(headerData?.title || 'Certified Fitness Coach')}
            </p>
            {headerData?.tagline && (
              <p className="text-white/80 text-xs leading-relaxed italic" style={{ fontFamily: font }}>
                "{sanitizeText(headerData.tagline)}"
              </p>
            )}
          </div>
        </div>
        
        <div className="flex justify-center items-center mt-6 pt-4 border-t border-white/20">
          <div className="flex items-center space-x-4">
            {headerData.badge_1 && (
              <div className="flex items-center space-x-1">
                <Zap className="w-4 h-4 text-white" />
                <span className="text-white text-xs font-medium" style={{ fontFamily: font }}>{headerData.badge_1}</span>
              </div>
            )}
            {headerData.badge_2 && (
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4 text-white" />
                <span className="text-white text-xs font-medium" style={{ fontFamily: font }}>{headerData.badge_2}</span>
              </div>
            )}
            {headerData.badge_3 && (
              <div className="flex items-center space-x-1">
                <Trophy className="w-4 h-4 text-white" />
                <span className="text-white text-xs font-medium" style={{ fontFamily: font }}>{headerData.badge_3}</span>
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
      <div className="flex justify-center py-3" style={{ backgroundColor: colors.cardBg }}>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.primary }}></div>
          <div className="w-8 h-1 rounded-full" style={{ backgroundColor: colors.secondary }}></div>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.primary, animationDelay: '0.5s' }}></div>
        </div>
      </div>
      <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
        <div className="grid grid-cols-1 gap-3">
          {(contactData.phone || data.phone) && (
            <div className="flex items-center justify-between p-3 rounded-xl border-2" style={{ 
              backgroundColor: colors.accent, 
              borderColor: colors.primary 
            }}>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5" style={{ color: colors.primary }} />
                <div>
                  <p className="text-xs font-medium" style={{ color: colors.text + '80', fontFamily: font }}>Let's Train!</p>
                  <p className="text-sm font-bold" style={{ color: colors.text, fontFamily: font }}>
                    {contactData.phone || data.phone}
                  </p>
                </div>
              </div>
              <Button 
                size="sm" 
                className="h-8 px-4 font-bold" 
                style={{ backgroundColor: colors.primary, color: 'white', fontFamily: font }}
                onClick={() => typeof window !== "undefined" && window.open(`tel:${contactData.phone || data.phone}`, '_self')}
              >
                {t("Call Now")}
              </Button>
            </div>
          )}
          <div className="grid grid-cols-2 gap-2">
            {(contactData.email || data.email) && (
              <a 
                href={`mailto:${contactData.email || data.email}`}
                className="flex items-center space-x-2 p-2 rounded-lg" 
                style={{ backgroundColor: colors.accent }}
              >
                <Mail className="w-4 h-4" style={{ color: colors.primary }} />
                <span className="text-xs font-medium" style={{ color: colors.text, fontFamily: font }}>{t("Email")}</span>
              </a>
            )}
            {contactData.location && (
              <div className="flex items-center space-x-2 p-2 rounded-lg" style={{ backgroundColor: colors.accent }}>
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
        <div className="flex justify-center py-3" style={{ backgroundColor: colors.cardBg }}>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: colors.primary }}></div>
            <Dumbbell className="w-4 h-4" style={{ color: colors.primary }} />
            <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: colors.primary }}></div>
          </div>
        </div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <h3 className="font-bold text-sm mb-3" style={{ color: colors.primary, fontFamily: font }}>
            About Your Coach
          </h3>
          <p className="text-sm leading-relaxed mb-3" style={{ color: colors.text, fontFamily: font }}>
            {sanitizeText(aboutData?.description || data?.description || '')}
          </p>
          {aboutData.specialties && (
            <div className="mb-3">
              <p className="text-xs font-bold mb-2" style={{ color: colors.text + '80', fontFamily: font }}>{t("SPECIALTIES")}:</p>
              <div className="flex flex-wrap gap-1">
                {aboutData.specialties.split(',').map((specialty: string, index: number) => (
                  <Badge key={index} className="text-xs px-2 py-1 font-medium" style={{ 
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
            <div className="flex items-center space-x-3 p-3 rounded-xl" style={{ backgroundColor: colors.accent }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
                <span className="text-white text-sm font-bold" style={{ fontFamily: font }}>{aboutData.experience}</span>
              </div>
              <span className="text-sm font-medium" style={{ color: colors.text, fontFamily: font }}>{t("Years Transforming Lives")}</span>
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
        <div className="flex justify-center py-3" style={{ backgroundColor: colors.cardBg }}>
          <div className="flex space-x-1">
            <div className="w-1 h-5 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-5 rounded-full" style={{ backgroundColor: colors.secondary }}></div>
            <div className="w-3 h-5 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-5 rounded-full" style={{ backgroundColor: colors.secondary }}></div>
            <div className="w-1 h-5 rounded-full" style={{ backgroundColor: colors.primary }}></div>
          </div>
        </div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <h3 className="font-bold text-sm mb-3" style={{ color: colors.primary, fontFamily: font }}>
            Training Programs
          </h3>
          <div className="space-y-3">
            {services.map((service: any, index: number) => (
              <div key={index} className="p-3 rounded-xl border-l-4" style={{ 
                backgroundColor: colors.accent,
                borderColor: colors.primary
              }}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>
                    {service.title}
                  </h4>
                  <div className="text-right">
                    {service.price && (
                      <span className="text-sm font-bold" style={{ color: colors.primary, fontFamily: font }}>
                        {service.price}
                      </span>
                    )}
                    {service.duration && (
                      <p className="text-xs flex items-center justify-end" style={{ color: colors.text + '80', fontFamily: font }}>
                        <Clock className="w-3 h-3 mr-1" />
                        {service.duration}
                      </p>
                    )}
                  </div>
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

  const renderAchievementsSection = (achievementsData: any) => {
    const achievements = achievementsData.achievement_list || [];
    if (!Array.isArray(achievements) || achievements.length === 0) return null;
    return (
      <>
        <div className="flex justify-center py-3" style={{ backgroundColor: colors.cardBg }}>
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4" style={{ color: colors.primary }} />
            <div className="w-6 h-px" style={{ backgroundColor: colors.primary }}></div>
            <Trophy className="w-4 h-4" style={{ color: colors.primary }} />
          </div>
        </div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <h3 className="font-bold text-sm mb-3" style={{ color: colors.primary, fontFamily: font }}>
            {t("Certifications & Awards")}
          </h3>
          <div className="space-y-2">
            {achievements.map((achievement: any, index: number) => (
              <div key={index} className="flex items-center space-x-3 p-2 rounded-lg" style={{ backgroundColor: colors.accent }}>
                <Trophy className="w-4 h-4" style={{ color: colors.primary }} />
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: colors.text, fontFamily: font }}>{achievement.title}</p>
                  <div className="flex justify-between items-center">
                    {achievement.organization && (
                      <p className="text-xs" style={{ color: colors.text + '80', fontFamily: font }}>{achievement.organization}</p>
                    )}
                    {achievement.year && (
                      <span className="text-xs font-medium" style={{ color: colors.secondary, fontFamily: font }}>
                        {achievement.year}
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

  const renderTransformationStoriesSection = (storiesData: any) => {
    const stories = storiesData.stories || [];
    if (!Array.isArray(stories) || stories.length === 0) return null;
    return (
      <>
        <div className="flex justify-center py-3" style={{ backgroundColor: colors.cardBg }}>
          <div className="flex items-center space-x-1">
            <Zap className="w-3 h-3" style={{ color: colors.primary }} />
            <div className="w-4 h-px" style={{ backgroundColor: colors.primary }}></div>
            <Target className="w-4 h-4" style={{ color: colors.primary }} />
            <div className="w-4 h-px" style={{ backgroundColor: colors.primary }}></div>
            <Zap className="w-3 h-3" style={{ color: colors.primary }} />
          </div>
        </div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <h3 className="font-bold text-sm mb-3" style={{ color: colors.primary, fontFamily: font }}>
            {t("Success Stories")}
          </h3>
          <div className="space-y-3">
            {stories.map((story: any, index: number) => (
              <div key={index} className="rounded-xl overflow-hidden" style={{ backgroundColor: colors.accent }}>
                {story.before_after && (
                  <div className="w-full h-32">
                    <img 
                      src={story.before_after} 
                      alt={`${story.client_name} transformation`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>
                      {story.client_name}
                    </h4>
                    {story.timeframe && (
                      <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ 
                        backgroundColor: colors.primary + '20',
                        color: colors.primary,
                        fontFamily: font
                      }}>
                        {story.timeframe}
                      </span>
                    )}
                  </div>
                  {story.result && (
                    <p className="text-sm font-medium" style={{ color: colors.primary, fontFamily: font }}>
                      🎯 {story.result}
                    </p>
                  )}
                </div>
              </div>
            ))}
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
        <div className="flex justify-center py-3" style={{ backgroundColor: colors.cardBg }}>
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4" style={{ color: colors.primary }} />
            <div className="w-12 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)` }}></div>
            <Activity className="w-4 h-4" style={{ color: colors.primary }} />
          </div>
        </div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <h3 className="font-bold text-sm mb-3" style={{ color: colors.primary, fontFamily: font }}>
            {t("Follow My Journey")}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {socialLinks.map((link: any, index: number) => (
              <Button 
                key={index} 
                size="sm" 
                className="h-8 font-medium" 
                style={{ 
                  backgroundColor: colors.primary,
                  color: 'white',
                  fontFamily: font
                }}
                onClick={() => link.url && typeof window !== "undefined" && window.open(link.url, '_blank', 'noopener,noreferrer')}
              >
                {link.platform}
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
        <div className="flex justify-center py-3" style={{ backgroundColor: colors.cardBg }}>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <Clock className="w-4 h-4" style={{ color: colors.primary }} />
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
          </div>
        </div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <h3 className="font-bold text-sm mb-3" style={{ color: colors.primary, fontFamily: font }}>
            {t("Training Schedule")}
          </h3>
          <div className="space-y-1">
            {hours.slice(0, 7).map((hour: any, index: number) => (
              <div key={index} className="flex justify-between items-center py-2 px-3 rounded-lg" style={{ 
                backgroundColor: hour.is_closed ? colors.accent + '60' : colors.accent
              }}>
                <span className="capitalize text-sm font-medium" style={{ color: colors.text, fontFamily: font }}>
                  {hour.day}
                </span>
                <span className="text-sm font-bold" style={{ 
                  color: hour.is_closed ? colors.text + '60' : colors.primary, 
                  fontFamily: font 
                }}>
                  {hour.is_closed ? 'Rest Day' : `${hour.open_time} - ${hour.close_time}`}
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
        <div className="flex justify-center py-3" style={{ backgroundColor: colors.cardBg }}>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 fill-current" style={{ color: colors.primary }} />
            <Star className="w-4 h-4 fill-current" style={{ color: colors.primary }} />
            <Star className="w-5 h-5 fill-current" style={{ color: colors.primary }} />
            <Star className="w-4 h-4 fill-current" style={{ color: colors.primary }} />
            <Star className="w-3 h-3 fill-current" style={{ color: colors.primary }} />
          </div>
        </div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <h3 className="font-bold text-sm mb-3" style={{ color: colors.primary, fontFamily: font }}>
            {t("Client Success")}
          </h3>
          
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentReview * 100}%)` }}
              >
                {reviews.map((review: any, index: number) => (
                  <div key={index} className="w-full flex-shrink-0 px-1">
                    <div className="p-3 rounded-xl" style={{ backgroundColor: colors.accent }}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < parseInt(review.rating || 5) ? 'fill-current text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        {review.program && (
                          <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ 
                            backgroundColor: colors.primary + '20',
                            color: colors.primary,
                            fontFamily: font
                          }}>
                            {review.program}
                          </span>
                        )}
                      </div>
                      <p className="text-xs mb-2 leading-relaxed" style={{ color: colors.text, fontFamily: font }}>
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
      <div className="flex justify-center py-3" style={{ backgroundColor: colors.cardBg }}>
        <Calendar className="w-4 h-4" style={{ color: colors.primary }} />
      </div>
      <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
        <h3 className="font-bold text-sm mb-3" style={{ color: colors.primary, fontFamily: font }}>
          {t("Start Your Journey")}
        </h3>
        {appointmentsData?.consultation_note && (
          <p className="text-xs mb-3 p-2 rounded-lg font-medium" style={{ 
            color: colors.primary, 
            backgroundColor: colors.primary + '10',
            fontFamily: font 
          }}>
            💪 {appointmentsData.consultation_note}
          </p>
        )}
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
          {t("Book Training Session")}
        </Button>
      </div>
    </>
  );

  const renderLocationSection = (locationData: any) => {
    if (!locationData.map_embed_url && !locationData.directions_url) return null;
    
    return (
      <>
        <div className="flex justify-center py-3" style={{ backgroundColor: colors.cardBg }}>
          <MapPin className="w-4 h-4" style={{ color: colors.primary }} />
        </div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <h3 className="font-bold text-sm mb-3" style={{ color: colors.primary, fontFamily: font }}>
            {t("Training Location")}
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
                {t("Get Directions")}
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
        <div className="flex justify-center py-3" style={{ backgroundColor: colors.cardBg }}>
          <div className="w-10 h-px" style={{ backgroundColor: colors.primary }}></div>
        </div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <h3 className="font-bold text-sm mb-3" style={{ color: colors.primary, fontFamily: font }}>
            {t("Fitness App")}
          </h3>
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
        <div className="flex justify-center py-3" style={{ backgroundColor: colors.cardBg }}>
          <Mail className="w-4 h-4" style={{ color: colors.primary }} />
        </div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <h3 className="font-bold text-sm mb-2" style={{ color: colors.primary, fontFamily: font }}>
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
            {t("Get Started")}
          </Button>
        </div>
      </>
    );
  };

  
  const renderVideosSection = (videosData: any) => {
    const videos = videosData.video_list || [];
    if (!Array.isArray(videos) || videos.length === 0) return null;
    
    
    
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor}` }}>
        <h3 className="font-bold text-sm mb-3 flex items-center" style={{ color: colors.primary, fontFamily: font }}>
          <Video className="w-4 h-4 mr-2" />
          {t("Training Videos")}
        </h3>
        <div className="space-y-3">
          {videoContent.map((video: any) => (
            <div key={video.key} className="rounded-lg overflow-hidden" style={{ 
              backgroundColor: colors.cardBg,
              border: `1px solid ${colors.borderColor}`
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
                      alt={video.title || 'training videos'} 
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
                      <span className="text-xs font-medium" style={{ color: colors.primary, fontFamily: font }}>{t("Training Videos")}</span>
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
                  {video.video_type && (
                    <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: colors.accent, color: colors.primary, fontFamily: font }}>
                      💪 {video.video_type}
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
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor}` }}>
        <h3 className="font-bold text-sm mb-3 flex items-center" style={{ color: colors.primary, fontFamily: font }}>
          <Youtube className="w-4 h-4 mr-2" />
          {t("YouTube Channel")}
        </h3>
        <div className="p-4 rounded-lg" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.borderColor}` }}>
          <div className="flex items-center mb-3">
        
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
            <div className="w-12 h-12 rounded-lg bg-red-600 flex items-center justify-center mr-3">
              <Youtube className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>
                {youtubeData.channel_name || 'Personal Training'}
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
                💪 {t("WORKOUT ROUTINES")}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderCustomHtmlSection = (customHtmlData: any) => {
    if (!customHtmlData.html_content) return null;
    
    return (
      <>
        <div className="flex justify-center py-3" style={{ backgroundColor: colors.cardBg }}>
          <div className="flex items-center space-x-2">
            <Dumbbell className="w-4 h-4" style={{ color: colors.primary }} />
            <div className="w-8 h-px" style={{ backgroundColor: colors.primary }}></div>
            <Dumbbell className="w-4 h-4" style={{ color: colors.primary }} />
          </div>
        </div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          {customHtmlData.show_title && customHtmlData.section_title && (
            <h3 className="font-bold text-sm mb-3" style={{ color: colors.primary, fontFamily: font }}>
              {customHtmlData.section_title}
            </h3>
          )}
          <div 
            className="custom-html-content p-3 rounded-xl" 
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
                  background-color: ${colors.primary}20;
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
      </>
    );
  };

  const renderQrShareSection = (qrData: any) => {
    if (!qrData.enable_qr) return null;
    
    return (
      <>
        <div className="flex justify-center py-3" style={{ backgroundColor: colors.cardBg }}>
          <div className="flex items-center space-x-2">
            <Share2 className="w-4 h-4" style={{ color: colors.primary }} />
            <div className="w-8 h-px" style={{ backgroundColor: colors.primary }}></div>
            <Share2 className="w-4 h-4" style={{ color: colors.primary }} />
          </div>
        </div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <h3 className="font-bold text-sm mb-3" style={{ color: colors.primary, fontFamily: font }}>
            {t("Share Your Fitness Journey")}
          </h3>
          <div className="p-3 rounded-xl" style={{ backgroundColor: colors.accent }}>
            {qrData.qr_title && (
              <h4 className="font-bold text-sm mb-2" style={{ color: colors.text, fontFamily: font }}>
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
              className="w-full h-10 font-bold" 
              style={{ 
                backgroundColor: colors.primary,
                color: 'white',
                fontFamily: font
              }}
              onClick={() => setShowQrModal(true)}
            >
              <QrCode className="w-4 h-4 mr-2" />
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
    <div className="w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ 
      fontFamily: font,
      backgroundColor: colors.background,
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
          💪 {t("Transform Your Life")}
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
          🎯 {t("Book Free Consultation")}
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
          {t("Save Contact")}
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