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
import { 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Clock, 
  Calendar, 
  Hammer, 
  Star, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  Home,
  Briefcase,
  Image,
  Award,
  MessageSquare,
  AlertTriangle,
  Check,
  ArrowRight,
  User,
  Download,
  Video,
  Play,
  QrCode
} from 'lucide-react';
import SocialIcon from '../../../link-bio-builder/components/SocialIcon';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionOrder, isSectionEnabled, getSectionData } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';

import languageData from '@/../../resources/lang/language.json';

interface ConstructionTemplateProps {
  data: any;
  template: any;
}

export default function ConstructionTemplate({ data, template }: ConstructionTemplateProps) {
  const { t, i18n } = useTranslation();
  const [activeProject, setActiveProject] = useState<number | null>(0);
  
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
    primary: '#F9A826', 
    secondary: '#FFD166', 
    accent: '#FFF3CD', 
    background: '#FFFFFF', 
    text: '#333333',
    cardBg: '#F9F9F9',
    borderColor: '#E0E0E0',
    buttonText: '#FFFFFF',
    warningColor: '#FF5722'
  };
  const font = configSections.font || template?.defaultFont || 'Roboto, sans-serif';
  
  // Get all sections for this business type
  const allSections = getBusinessTemplate('construction')?.sections || [];
  
  const renderHeaderSection = (headerData: any) => (
    <div className="relative">
      {/* Top Bar with License Number */}
      {headerData.license_number && (
        <div 
          className="py-1 px-4 flex justify-between items-center text-xs font-bold" 
          style={{ 
            backgroundColor: colors.primary,
            color: colors.buttonText
          }}
        >
          <span>{headerData.license_number}</span>
          
          {/* Language Selector in Top Bar */}
          {configSections.language && (
            <div className="relative">
              <button
                onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                className="flex items-center space-x-1 transition-all"
                style={{ 
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: colors.buttonText
                }}
              >
                <span className="text-lg">{String.fromCodePoint(...(languageData.find(lang => lang.code === currentLanguage)?.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt()) || []))}</span>
                <span className="text-xs font-bold">{currentLanguage.toUpperCase()}</span>
              </button>
              
              {showLanguageSelector && (
                <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-xl border py-1 min-w-[140px] max-h-48 overflow-y-auto z-[999999]" style={{ borderColor: colors.borderColor }}>
                  {languageData.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center space-x-2 ${
                        currentLanguage === lang.code ? 'font-bold' : ''
                      }`}
                      style={{
                        backgroundColor: currentLanguage === lang.code ? colors.accent : 'transparent',
                        color: currentLanguage === lang.code ? colors.primary : colors.text
                      }}
                    >
                      <span className="text-sm">{String.fromCodePoint(...lang.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt()))}</span>
                      <span>{lang.name}</span>
                      {currentLanguage === lang.code && <Hammer size={12} style={{ color: colors.primary }} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Main Header */}
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `4px solid ${colors.primary}`
        }}
      >
        <div className="flex items-center">
          {headerData.logo ? (
            <img 
              src={headerData.logo} 
              alt={headerData.name} 
              className="h-16 mr-4"
            />
          ) : (
            <div 
              className="w-16 h-16 mr-4 flex items-center justify-center rounded" 
              style={{ 
                backgroundColor: colors.primary,
                color: colors.buttonText
              }}
            >
              <Hammer size={32} />
            </div>
          )}
          
          <div>
            <h1 
              className="text-xl font-bold uppercase tracking-wide" 
              style={{ 
                color: colors.text,
                fontFamily: font
              }}
            >
              {headerData.name || data.name || 'BuildRight Construction'}
            </h1>
            
            {headerData.tagline && (
              <p 
                className="text-sm" 
                style={{ color: colors.text + 'CC' }}
              >
                {headerData.tagline}
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Emergency Contact Bar */}
      {configSections.contact?.emergency && (
        <div 
          className="py-2 px-4 flex items-center justify-between" 
          style={{ 
            backgroundColor: colors.warningColor,
            color: colors.buttonText
          }}
        >
          <div className="flex items-center">
            <AlertTriangle size={16} className="mr-2" />
            <span className="text-xs font-bold">{t("EMERGENCY SERVICE")}</span>
          </div>
          
          <a 
            href={`tel:${configSections.contact?.emergency}`} 
            className="text-sm font-bold"
            style={{ color: colors.buttonText }}
          >
            {configSections.contact?.emergency}
          </a>
        </div>
      )}
      

      
      {/* Quick Action Buttons */}
      <div 
        className="grid grid-cols-4 divide-x" 
        style={{ 
          backgroundColor: colors.cardBg,
          borderBottom: `1px solid ${colors.borderColor}`,
          color: colors.primary
        }}
      >
        <a 
          href={`tel:${configSections.contact?.phone}`} 
          className="py-3 flex flex-col items-center justify-center text-center"
        >
          <Phone size={18} />
          <span className="text-xs mt-1">{t('Call Us')}</span>
        </a>
        
        <button 
          onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
          className="py-3 flex flex-col items-center justify-center text-center"
        >
          <MessageSquare size={18} />
          <span className="text-xs mt-1">{t('Message')}</span>
        </button>
        
        <button 
          onClick={() => handleAppointmentBooking(configSections.appointments)}
          className="py-3 flex flex-col items-center justify-center text-center"
        >
          <Calendar size={18} />
          <span className="text-xs mt-1">{t('Estimate')}</span>
        </button>

        <button 
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
          className="py-3 flex flex-col items-center justify-center text-center"
        >
          <User size={18} />
          <span className="text-xs mt-1">{t('Save')}</span>
        </button>
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
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="flex items-center mb-4">
          <div 
            className="w-8 h-8 flex items-center justify-center rounded mr-3" 
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText
            }}
          >
            <Briefcase size={18} />
          </div>
          <h2 
            className="text-lg font-bold uppercase tracking-wide" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('About Us')}
          </h2>
        </div>
        
        <p 
          className="text-sm leading-relaxed mb-4" 
          style={{ color: colors.text }}
        >
          {aboutData.description || data.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          {aboutData.year_established && (
            <div 
              className="p-3 rounded border" 
              style={{ 
                borderColor: colors.borderColor,
                backgroundColor: colors.cardBg
              }}
            >
              <p 
                className="text-xs uppercase font-bold mb-1" 
                style={{ color: colors.primary }}
              >
                {t('Established')}
              </p>
              <p 
                className="text-lg font-bold" 
                style={{ color: colors.text }}
              >
                {aboutData.year_established}
              </p>
            </div>
          )}
          
          {aboutData.service_area && (
            <div 
              className="p-3 rounded border" 
              style={{ 
                borderColor: colors.borderColor,
                backgroundColor: colors.cardBg
              }}
            >
              <p 
                className="text-xs uppercase font-bold mb-1" 
                style={{ color: colors.primary }}
              >
                {t('Service Area')}
              </p>
              <p 
                className="text-sm" 
                style={{ color: colors.text }}
              >
                {aboutData.service_area}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  const renderServicesSection = (servicesData: any) => {
    const services = servicesData.service_list || [];
    if (!Array.isArray(services) || services.length === 0) return null;
    
    const getServiceIcon = (iconName: string) => {
      switch(iconName) {
        case 'renovation': return <Home size={24} />;
        case 'plumbing': return <Hammer size={24} />;
        case 'electrical': return <Hammer size={24} />;
        case 'roofing': return <Home size={24} />;
        case 'painting': return <Hammer size={24} />;
        case 'flooring': return <Hammer size={24} />;
        case 'landscaping': return <Hammer size={24} />;
        case 'carpentry': return <Hammer size={24} />;
        case 'masonry': return <Hammer size={24} />;
        case 'hvac': return <Hammer size={24} />;
        default: return <Hammer size={24} />;
      }
    };
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.cardBg,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="flex items-center mb-4">
          <div 
            className="w-8 h-8 flex items-center justify-center rounded mr-3" 
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText
            }}
          >
            <Hammer size={18} />
          </div>
          <h2 
            className="text-lg font-bold uppercase tracking-wide" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('Our Services')}
          </h2>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {services.map((service: any, index: number) => (
            <div 
              key={index} 
              className="p-4 rounded border flex flex-col items-center text-center" 
              style={{ 
                borderColor: colors.borderColor,
                backgroundColor: colors.background
              }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mb-2" 
                style={{ 
                  backgroundColor: colors.primary + '20',
                  color: colors.primary
                }}
              >
                {getServiceIcon(service.icon)}
              </div>
              
              <h3 
                className="text-sm font-bold mb-1" 
                style={{ 
                  color: colors.text,
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
                  {service.description.length > 60 ? service.description.substring(0, 60) + '...' : service.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderProjectsSection = (projectsData: any) => {
    const projects = projectsData.project_list || [];
    if (!Array.isArray(projects) || projects.length === 0) return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="flex items-center mb-4">
          <div 
            className="w-8 h-8 flex items-center justify-center rounded mr-3" 
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText
            }}
          >
            <Image size={18} />
          </div>
          <h2 
            className="text-lg font-bold uppercase tracking-wide" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('Featured Projects')}
          </h2>
        </div>
        
        <div className="space-y-4">
          {projects.map((project: any, index: number) => (
            <div 
              key={index} 
              className="rounded overflow-hidden border" 
              style={{ 
                borderColor: colors.borderColor,
                backgroundColor: colors.cardBg
              }}
            >
              <div 
                className="p-3 flex justify-between items-center cursor-pointer"
                style={{
                  backgroundColor: activeProject === index ? colors.primary : colors.cardBg,
                  color: activeProject === index ? colors.buttonText : colors.text
                }}
                onClick={() => setActiveProject(activeProject === index ? null : index)}
              >
                <div>
                  <h3 
                    className="text-sm font-bold" 
                    style={{ 
                      color: activeProject === index ? colors.buttonText : colors.text,
                      fontFamily: font
                    }}
                  >
                    {project.title}
                  </h3>
                  
                  {project.location && (
                    <p 
                      className="text-xs flex items-center" 
                      style={{ color: activeProject === index ? colors.buttonText + 'CC' : colors.text + '80' }}
                    >
                      <MapPin size={10} className="mr-1" />
                      {project.location}
                    </p>
                  )}
                </div>
                
                {project.category && (
                  <Badge 
                    className="text-xs capitalize" 
                    style={{ 
                      backgroundColor: activeProject === index ? colors.buttonText + '30' : colors.primary + '20',
                      color: activeProject === index ? colors.buttonText : colors.primary
                    }}
                  >
                    {project.category.replace('_', ' ')}
                  </Badge>
                )}
              </div>
              
              {activeProject === index && (
                <div className="p-3">
                  {(project.before_image || project.after_image) && (
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="relative">
                        {project.before_image ? (
                          <img 
                            src={project.before_image} 
                            alt="Before" 
                            className="w-full h-32 object-cover rounded"
                          />
                        ) : (
                          <div 
                            className="w-full h-32 flex items-center justify-center rounded" 
                            style={{ backgroundColor: colors.borderColor + '50' }}
                          >
                            <span className="text-xs" style={{ color: colors.text + '80' }}>Before</span>
                          </div>
                        )}
                        <div 
                          className="absolute top-0 left-0 px-2 py-1 text-xs" 
                          style={{ 
                            backgroundColor: colors.primary,
                            color: colors.buttonText
                          }}
                        >
                          {t("BEFORE")}
                        </div>
                      </div>
                      
                      <div className="relative">
                        {project.after_image ? (
                          <img 
                            src={project.after_image} 
                            alt="After" 
                            className="w-full h-32 object-cover rounded"
                          />
                        ) : (
                          <div 
                            className="w-full h-32 flex items-center justify-center rounded" 
                            style={{ backgroundColor: colors.borderColor + '50' }}
                          >
                            <span className="text-xs" style={{ color: colors.text + '80' }}>{t("After")}</span>
                          </div>
                        )}
                        <div 
                          className="absolute top-0 left-0 px-2 py-1 text-xs" 
                          style={{ 
                            backgroundColor: colors.secondary,
                            color: colors.buttonText
                          }}
                        >
                          {t("AFTER")}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {project.description && (
                    <p 
                      className="text-xs" 
                      style={{ color: colors.text + 'CC' }}
                    >
                      {project.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const renderContactSection = (contactData: any) => (
    <div 
      className="px-5 py-6" 
      style={{ 
        backgroundColor: colors.cardBg,
        borderBottom: `1px solid ${colors.borderColor}`
      }}
    >
      <div className="flex items-center mb-4">
        <div 
          className="w-8 h-8 flex items-center justify-center rounded mr-3" 
          style={{ 
            backgroundColor: colors.primary,
            color: colors.buttonText
          }}
        >
          <Phone size={18} />
        </div>
        <h2 
          className="text-lg font-bold uppercase tracking-wide" 
          style={{ 
            color: colors.text,
            fontFamily: font
          }}
        >
          {t("Contact Us")}
        </h2>
      </div>
      
      <div className="space-y-3">
        {(contactData.phone || data.phone) && (
          <a 
            href={`tel:${contactData.phone || data.phone}`} 
            className="flex items-center p-3 rounded border" 
            style={{ 
              borderColor: colors.borderColor,
              backgroundColor: colors.background
            }}
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center mr-3" 
              style={{ 
                backgroundColor: colors.primary,
                color: colors.buttonText
              }}
            >
              <Phone size={18} />
            </div>
            <div>
              <p 
                className="text-xs uppercase font-bold" 
                style={{ color: colors.text + '80' }}
              >
                {t('PHONE')}
              </p>
              <p 
                className="text-sm font-bold" 
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
            className="flex items-center p-3 rounded border" 
            style={{ 
              borderColor: colors.borderColor,
              backgroundColor: colors.background
            }}
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center mr-3" 
              style={{ 
                backgroundColor: colors.primary,
                color: colors.buttonText
              }}
            >
              <Mail size={18} />
            </div>
            <div className="flex-1 overflow-hidden">
              <p 
                className="text-xs uppercase font-bold" 
                style={{ color: colors.text + '80' }}
              >
                {t('EMAIL')}
              </p>
              <p 
                className="text-sm font-bold truncate" 
                style={{ color: colors.text }}
              >
                {contactData.email || data.email}
              </p>
            </div>
          </a>
        )}
        
        {contactData.address && (
          <div 
            className="flex items-center p-3 rounded border" 
            style={{ 
              borderColor: colors.borderColor,
              backgroundColor: colors.background
            }}
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0" 
              style={{ 
                backgroundColor: colors.primary,
                color: colors.buttonText
              }}
            >
              <MapPin size={18} />
            </div>
            <div>
              <p 
                className="text-xs uppercase font-bold" 
                style={{ color: colors.text + '80' }}
              >
                {t('ADDRESS')}
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
                  {t('Get Directions')}
                  <ChevronRight size={12} />
                </a>
              )}
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
  
  const renderCredentialsSection = (credentialsData: any) => {
    const certifications = credentialsData.certifications || [];
    if (!Array.isArray(certifications) || certifications.length === 0) return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="flex items-center mb-4">
          <div 
            className="w-8 h-8 flex items-center justify-center rounded mr-3" 
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText
            }}
          >
            <Award size={18} />
          </div>
          <h2 
            className="text-lg font-bold uppercase tracking-wide" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('Credentials')}
          </h2>
        </div>
        
        <div className="space-y-3">
          {certifications.map((cert: any, index: number) => (
            <div 
              key={index} 
              className="p-3 rounded border" 
              style={{ 
                borderColor: colors.borderColor,
                backgroundColor: colors.cardBg
              }}
            >
              <div className="flex items-center">
                {/* Certificate Image */}
                {cert.image ? (
                  <div className="w-16 h-16 rounded overflow-hidden mr-3 flex-shrink-0">
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0" 
                    style={{ 
                      backgroundColor: colors.primary + '20',
                      color: colors.primary
                    }}
                  >
                    <Award size={18} />
                  </div>
                )}
                
                <div>
                  <h3 
                    className="text-sm font-bold" 
                    style={{ 
                      color: colors.text,
                      fontFamily: font
                    }}
                  >
                    {cert.title}
                  </h3>
                  
                  <div className="flex items-center text-xs" style={{ color: colors.text + '80' }}>
                    <span>{cert.issuer}</span>
                    {cert.year && (
                      <>
                        <span className="mx-1">•</span>
                        <span>{cert.year}</span>
                      </>
                    )}
                  </div>
                </div>
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
      <div 
        className="px-5 py-4" 
        style={{ 
          backgroundColor: colors.cardBg,
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
              className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-105"
              style={{ 
                backgroundColor: colors.primary,
                color: colors.buttonText
              }}
            >
              <SocialIcon platform={link.platform} color="currentColor" />
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
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="flex items-center mb-4">
          <div 
            className="w-8 h-8 flex items-center justify-center rounded mr-3" 
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText
            }}
          >
            <Clock size={18} />
          </div>
          <h2 
            className="text-lg font-bold uppercase tracking-wide" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('Business Hours')}
          </h2>
        </div>
        
        <div 
          className="rounded overflow-hidden border" 
          style={{ borderColor: colors.borderColor }}
        >
          {hours.map((hour: any, index: number) => (
            <div 
              key={index} 
              className="flex justify-between items-center p-3"
              style={{ 
                backgroundColor: hour.day === currentDay ? colors.accent : colors.cardBg,
                borderBottom: index < hours.length - 1 ? `1px solid ${colors.borderColor}` : 'none'
              }}
            >
              <div className="flex items-center">
                <span 
                  className="capitalize text-sm font-bold" 
                  style={{ 
                    color: hour.day === currentDay ? colors.primary : colors.text
                  }}
                >
                  {hour.day}
                </span>
                
                {hour.day === currentDay && (
                  <Badge 
                    className="ml-2 text-xs" 
                    style={{ 
                      backgroundColor: colors.primary,
                      color: colors.buttonText
                    }}
                  >
                    {t('Today')}
                  </Badge>
                )}
              </div>
              
              <span 
                className="text-sm" 
                style={{ 
                  color: hour.is_closed ? colors.text + '80' : colors.text,
                  fontWeight: hour.day === currentDay ? 'bold' : 'normal'
                }}
              >
                {hour.is_closed ? 'Closed' : `${hour.open_time} - ${hour.close_time}`}
              </span>
            </div>
          ))}
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
          backgroundColor: colors.cardBg,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="flex items-center mb-4">
          <div 
            className="w-8 h-8 flex items-center justify-center rounded mr-3" 
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText
            }}
          >
            <Image size={18} />
          </div>
          <h2 
            className="text-lg font-bold uppercase tracking-wide" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('Photo Gallery')}
          </h2>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {photos.map((photo: any, index: number) => (
            <div 
              key={index} 
              className="relative rounded overflow-hidden aspect-square border" 
              style={{ borderColor: colors.borderColor }}
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
                  style={{ backgroundColor: colors.borderColor + '50' }}
                >
                  <Hammer size={24} style={{ color: colors.primary }} />
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
  
  const renderVideosSection = (videosData: any) => {
    if (!videoContent || videoContent.length === 0) return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.cardBg,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="flex items-center mb-4">
          <div 
            className="w-8 h-8 flex items-center justify-center rounded mr-3" 
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText
            }}
          >
            <Video size={18} />
          </div>
          <h2 
            className="text-lg font-bold uppercase tracking-wide" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('Project Videos')}
          </h2>
        </div>
        
        <div className="space-y-3">
          {videoContent.map((video: any) => (
            <div 
              key={video.key} 
              className="rounded overflow-hidden border" 
              style={{ 
                borderColor: colors.borderColor,
                backgroundColor: colors.background
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
                      alt={video.title || 'Construction video'} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center" 
                        style={{ backgroundColor: colors.primary }}
                      >
                        <Play className="w-6 h-6 ml-1 text-white" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-32 flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
                    <div className="text-center">
                      <Video className="w-8 h-8 mx-auto mb-2" style={{ color: colors.primary }} />
                      <span className="text-sm font-medium" style={{ color: colors.primary, fontFamily: font }}>{t("Project Video")}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-bold text-base mb-2" style={{ color: colors.text, fontFamily: font }}>
                  {video.title}
                </h3>
                {video.description && (
                  <p className="text-sm mb-2" style={{ color: colors.text + 'CC', fontFamily: font }}>
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
                    <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: colors.primary + '20', color: colors.primary, fontFamily: font }}>
                      🔨 {video.project_type.replace('_', ' ')}
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
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="flex items-center mb-4">
          <div 
            className="w-8 h-8 flex items-center justify-center rounded mr-3" 
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText
            }}
          >
            <Youtube size={18} />
          </div>
          <h2 
            className="text-lg font-bold uppercase tracking-wide" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('YouTube Channel')}
          </h2>
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
        
        <div 
          className="p-4 rounded border" 
          style={{ 
            borderColor: colors.borderColor,
            backgroundColor: colors.cardBg
          }}
        >
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 rounded bg-red-600 flex items-center justify-center mr-3">
              <Youtube className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base" style={{ color: colors.text, fontFamily: font }}>
                {youtubeData.channel_name || 'Construction Channel'}
              </h3>
              {youtubeData.subscriber_count && (
                <p className="text-sm" style={{ color: colors.text + 'CC', fontFamily: font }}>
                  📊 {youtubeData.subscriber_count} {t("subscribers")}
                </p>
              )}
            </div>
          </div>
          
          {youtubeData.channel_description && (
            <p className="text-sm mb-3" style={{ color: colors.text, fontFamily: font }}>
              {youtubeData.channel_description}
            </p>
          )}
          
          <div className="space-y-2">
            {youtubeData.channel_url && (
              <Button 
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
                variant="outline" 
                className="w-full" 
                style={{ 
                  borderColor: colors.primary, 
                  color: colors.primary, 
                  fontFamily: font 
                }}
                onClick={() => typeof window !== "undefined" && window.open(youtubeData.featured_playlist, '_blank', 'noopener,noreferrer')}
              >
                🔨 {t("PROJECT TUTORIALS")}
              </Button>
            )}
          </div>
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
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="flex items-center mb-4">
          <div 
            className="w-8 h-8 flex items-center justify-center rounded mr-3" 
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText
            }}
          >
            <Star size={18} />
          </div>
          <h2 
            className="text-lg font-bold uppercase tracking-wide" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('Testimonials')}
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
                    className="p-4 rounded border" 
                    style={{ 
                      borderColor: colors.borderColor,
                      backgroundColor: colors.cardBg
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
                      className="text-sm mb-3" 
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
                      
                      <div className="flex items-center">
                        {review.project_type && (
                          <Badge 
                            className="text-xs" 
                            style={{ 
                              backgroundColor: colors.primary + '20',
                              color: colors.primary
                            }}
                          >
                            {review.project_type}
                          </Badge>
                        )}
                        
                        {review.location && (
                          <span 
                            className="text-xs ml-2" 
                            style={{ color: colors.text + '80' }}
                          >
                            {review.location}
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
  
  const renderAppointmentsSection = (appointmentsData: any) => {
    if (!appointmentsData.booking_url) return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.primary,
          color: colors.buttonText,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="text-center">
          <h2 
            className="text-xl font-bold uppercase tracking-wide mb-3" 
            style={{ 
              color: colors.buttonText,
              fontFamily: font
            }}
          >
            {appointmentsData.section_title || 'Ready to Start Your Project?'}
          </h2>
          
          <p 
            className="text-sm mb-4" 
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            {appointmentsData.section_description || 'Contact us today for professional service and quality workmanship.'}
          </p>
          
          <div className="flex flex-col space-y-3">
            <Button
              className="w-full"
              style={{ 
                backgroundColor: colors.background,
                color: colors.primary,
                fontFamily: font,
                fontWeight: 'bold'
              }}
              onClick={() => handleAppointmentBooking(configSections.appointments)}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {appointmentsData.booking_text || 'Schedule Consultation'}
            </Button>
            
            <Button
              className="w-full"
              style={{ 
                backgroundColor: colors.secondary,
                color: colors.buttonText,
                fontFamily: font,
                fontWeight: 'bold'
              }}
              onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              {appointmentsData.estimate_text || 'Free Estimate'}
            </Button>
          </div>
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
          backgroundColor: colors.cardBg,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="flex items-center mb-4">
          <div 
            className="w-8 h-8 flex items-center justify-center rounded mr-3" 
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText
            }}
          >
            <MapPin size={18} />
          </div>
          <h2 
            className="text-lg font-bold uppercase tracking-wide" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t("Our Location")}
          </h2>
        </div>
        
        <div className="space-y-3">
          {locationData.map_embed_url && (
            <div className="rounded overflow-hidden" style={{ height: '200px' }}>
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
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="flex items-center mb-4">
          <div 
            className="w-8 h-8 flex items-center justify-center rounded mr-3" 
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText
            }}
          >
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12.01" y2="18"></line>
            </svg>
          </div>
          <h2 
            className="text-lg font-bold uppercase tracking-wide" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('Mobile App')}
          </h2>
        </div>
        
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
    );
  };
  
  const renderContactFormSection = (formData: any) => {
    if (!formData.form_title) return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.cardBg,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="flex items-center mb-4">
          <div 
            className="w-8 h-8 flex items-center justify-center rounded mr-3" 
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText
            }}
          >
            <MessageSquare size={18} />
          </div>
          <h2 
            className="text-lg font-bold uppercase tracking-wide" 
            style={{ 
              color: colors.text,
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
          <MessageSquare className="w-4 h-4 mr-2" />
          {t('Contact Us Now')}
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
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        {customHtmlData.show_title && customHtmlData.section_title && (
          <div className="flex items-center mb-4">
            <div 
              className="w-8 h-8 flex items-center justify-center rounded mr-3" 
              style={{ 
                backgroundColor: colors.primary,
                color: colors.buttonText
              }}
            >
              <Hammer size={18} />
            </div>
            <h2 
              className="text-lg font-bold uppercase tracking-wide" 
              style={{ 
                color: colors.text,
                fontFamily: font
              }}
            >
              {customHtmlData.section_title}
            </h2>
          </div>
        )}
        <div 
          className="custom-html-content p-3 rounded border" 
          style={{ 
            backgroundColor: colors.cardBg,
            borderColor: colors.borderColor,
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
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.cardBg,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="flex items-center mb-4">
          <div 
            className="w-8 h-8 flex items-center justify-center rounded mr-3" 
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText
            }}
          >
            <QrCode size={18} />
          </div>
          <h2 
            className="text-lg font-bold uppercase tracking-wide" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {qrData.qr_title || t('Share QR Code')}
          </h2>
        </div>
        
        <div className="text-center p-4 rounded border" style={{ backgroundColor: colors.background, borderColor: colors.borderColor }}>
          {qrData.qr_description && (
            <p 
              className="text-sm mb-4" 
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
            <QrCode className="w-4 h-4 mr-2" />
            {t('Share QR Code')}
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
          backgroundColor: colors.cardBg,
          borderBottom: `1px solid ${colors.borderColor}`
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
          <div className="flex flex-wrap justify-center gap-3">
            {footerData.footer_links.map((link: any, index: number) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1 rounded transition-colors font-bold uppercase"
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
      case 'projects':
        return renderProjectsSection(sectionData);
      case 'contact':
        return renderContactSection(sectionData);
      case 'credentials':
        return renderCredentialsSection(sectionData);
      case 'social':
        return renderSocialSection(sectionData);
      case 'business_hours':
        return renderBusinessHoursSection(sectionData);
      case 'gallery':
        return renderGallerySection(sectionData);
      case 'videos':
        return renderVideosSection(sectionData);
      case 'youtube':
        return renderYouTubeSection(sectionData);
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
      case 'thank_you':
        return renderThankYouSection(sectionData);
      case 'custom_html':
        return renderCustomHtmlSection(sectionData);
      case 'qr_share':
        return renderQrShareSection(sectionData);
      case 'footer':
        return renderFooterSection(sectionData);
      case 'copyright':
        return renderCopyrightSection(sectionData);
      default:
        return null;
    }
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