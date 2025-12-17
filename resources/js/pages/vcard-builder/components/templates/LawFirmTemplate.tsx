import { handleAppointmentBooking } from '../VCardPreview';
import React from 'react';
import StableHtmlContent from '@/components/StableHtmlContent';
import { VideoEmbed, extractVideoUrl } from '@/components/VideoEmbed';
import { createYouTubeEmbedRef } from '@/utils/youtubeEmbedUtils';
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
  Linkedin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Calendar, 
  Clock, 
  FileText, 
  Briefcase, 
  Scale, 
  User, 
  Building, 
  ChevronRight, 
  UserPlus,
  Printer,
  ExternalLink,
  Home,
  Video,
  Play,
  Share2,
  QrCode
} from 'lucide-react';
import SocialIcon from '../../../link-bio-builder/components/SocialIcon';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionOrder, isSectionEnabled, getSectionData } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';
import { useTranslation } from 'react-i18next';
import languageData from '@/../../resources/lang/language.json';

interface LawFirmTemplateProps {
  data: any;
  template: any;
}

export default function LawFirmTemplate({ data, template }: LawFirmTemplateProps) {
  const { t, i18n } = useTranslation();
  
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
  
  const handleDotClick = (index: number) => {
    setCurrentReview(index);
  };
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
  const colors = configSections.colors || template?.defaultColors || { 
    primary: '#0A3161', 
    secondary: '#1E5091', 
    accent: '#E6ECF2', 
    background: '#FFFFFF', 
    text: '#333333',
    cardBg: '#F9F9F9',
    borderColor: '#EEEEEE',
    buttonText: '#FFFFFF',
    goldAccent: '#DAA520'
  };
  const font = configSections.font || template?.defaultFont || 'Times New Roman, Times, serif';
  
  // Get all sections for this business type
  const allSections = getBusinessTemplate('lawfirm')?.sections || [];

  const renderSection = (sectionKey: string) => {
    const sectionData = configSections[sectionKey] || {};
    if (!sectionData || Object.keys(sectionData).length === 0 || sectionData.enabled === false) return null;
    
    switch (sectionKey) {
      case 'header':
        return renderHeaderSection(sectionData);
      case 'about':
        return renderAboutSection(sectionData);
      case 'practice_areas':
        return renderPracticeAreasSection(sectionData);
      case 'contact':
        return renderContactSection(sectionData);
      case 'services':
        return renderServicesSection(sectionData);
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
      case 'copyright':
        return renderCopyrightSection(sectionData);
      default:
        return null;
    }
  };

  const renderHeaderSection = (headerData: any) => (
    <div className="relative">
      {/* Top Bar */}
      <div 
        className="py-2 px-5" 
        style={{ 
          backgroundColor: colors.primary,
          color: colors.accent
        }}
      >
        <div className="flex justify-between items-center">
          <div className="text-xs font-medium">
            {configSections.contact?.phone && (
              <a 
                href={`tel:${configSections.contact?.phone}`} 
                className="inline-flex items-center mr-4 hover:opacity-80 transition-opacity"
                style={{ color: colors.accent, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
              >
                <Phone size={12} className="mr-1" />
                {configSections.contact?.phone}
              </a>
            )}
            {configSections.contact?.email && (
              <a 
                href={`mailto:${configSections.contact?.email}`} 
                className="inline-flex items-center hover:opacity-80 transition-opacity"
                style={{ color: colors.accent, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
              >
                <Mail size={12} className="mr-1" />
                {configSections.contact?.email}
              </a>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {/* Language Selector beside Print Button */}
            {configSections.language && (
              <div className="relative">
                <button
                  onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                  className="flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium transition-all"
                  style={{ 
                    backgroundColor: `rgba(255,255,255,0.15)`,
                    color: colors.buttonText,
                    fontFamily: font,
                    border: `1px solid rgba(255,255,255,0.2)`
                  }}
                >
                  <span className="text-sm">{String.fromCodePoint(...(languageData.find(lang => lang.code === currentLanguage)?.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt()) || []))}</span>
                </button>
                
                {showLanguageSelector && (
                  <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 py-1 min-w-[140px] max-h-48 overflow-y-auto z-[999999]">
                    {languageData.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full text-left px-3 py-1 text-xs hover:bg-gray-100 transition-colors flex items-center space-x-2 ${
                          currentLanguage === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-sm">{String.fromCodePoint(...lang.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt()))}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            <button 
              className="text-xs flex items-center px-2 py-1 rounded transition-all"
              style={{ 
                color: colors.accent,
                backgroundColor: `rgba(255,255,255,0.15)`,
                border: `1px solid rgba(255,255,255,0.2)`
              }}
              onClick={() => window.print()}
            >
              <Printer size={12} className="mr-1" />
              {t("Print")}
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <div 
        className="px-5 py-6 text-center" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        {headerData.profile_image ? (
          <div className="flex justify-center mb-4">
            <img 
              src={headerData.profile_image} 
              alt={headerData.name} 
              className="h-16 object-contain"
            />
          </div>
        ) : (
          <div 
            className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" 
            style={{ 
              backgroundColor: colors.accent,
              color: colors.primary
            }}
          >
            <Scale size={32} />
          </div>
        )}
        
        <h1 
          className="text-2xl font-bold mb-1" 
          style={{ 
            color: colors.primary,
            fontFamily: font
          }}
        >
          {headerData.name || data.name || 'Johnson & Associates'}
        </h1>
        
        <h2 
          className="text-sm mb-2" 
          style={{ 
            color: colors.secondary,
            fontFamily: font
          }}
        >
          {headerData.title || 'Attorneys at Law'}
        </h2>
        
        {headerData.tagline && (
          <p 
            className="text-xs italic" 
            style={{ color: colors.text }}
          >
            {headerData.tagline}
          </p>
        )}
      </div>
      
      {/* Navigation Tabs */}
      <div 
        className="flex overflow-x-auto py-2 px-1" 
        style={{ 
          backgroundColor: colors.cardBg,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <a 
          href="#about" 
          className="whitespace-nowrap px-3 py-1 mx-1 text-xs font-medium rounded"
          style={{ 
            backgroundColor: colors.accent,
            color: colors.primary
          }}
        >
          {t('About')}
        </a>
        <a 
          href="#practice-areas" 
          className="whitespace-nowrap px-3 py-1 mx-1 text-xs font-medium"
          style={{ color: colors.text }}
        >
          {t('Practice Areas')}
        </a>
        <a 
          href="#services" 
          className="whitespace-nowrap px-3 py-1 mx-1 text-xs font-medium"
          style={{ color: colors.text }}
        >
          {t('Services')}
        </a>
        <a 
          href="#contact" 
          className="whitespace-nowrap px-3 py-1 mx-1 text-xs font-medium"
          style={{ color: colors.text }}
        >
          {t('Contact')}
        </a>
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
        id="about"
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div 
          className="mb-4 pb-2" 
          style={{ borderBottom: `2px solid ${colors.goldAccent}` }}
        >
          <h2 
            className="text-lg font-bold" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t('About Our Firm')}
          </h2>
        </div>
        
        <p 
          className="text-sm leading-relaxed mb-4" 
          style={{ color: colors.text }}
        >
          {aboutData.description || data.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          {aboutData.experience && (
            <div 
              className="p-3 rounded" 
              style={{ 
                backgroundColor: colors.accent,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <p 
                className="text-xs font-medium mb-1" 
                style={{ color: colors.primary }}
              >
                {t('YEARS OF EXPERIENCE')}
              </p>
              <p 
                className="text-xl font-bold" 
                style={{ color: colors.primary }}
              >
                {aboutData.experience}+
              </p>
            </div>
          )}
          
          <div 
            className="p-3 rounded" 
            style={{ 
              backgroundColor: colors.accent,
              border: `1px solid ${colors.borderColor}`
            }}
          >
            <p 
              className="text-xs font-medium mb-1" 
              style={{ color: colors.primary }}
            >
              {t('SATISFIED CLIENTS')}
            </p>
            <p 
              className="text-xl font-bold" 
              style={{ color: colors.primary }}
            >
              {aboutData.satisfied_clients || '1000+'}
            </p>
          </div>
        </div>
        
        {(aboutData.education || aboutData.bar_admissions) && (
          <div className="mt-5 grid grid-cols-1 gap-4">
            {aboutData.education && (
              <div>
                <h3 
                  className="text-sm font-bold mb-2" 
                  style={{ color: colors.primary }}
                >
                  {t('Education')}
                </h3>
                <div 
                  className="text-xs whitespace-pre-line" 
                  style={{ color: colors.text }}
                >
                  {aboutData.education}
                </div>
              </div>
            )}
            
            {aboutData.bar_admissions && (
              <div>
                <h3 
                  className="text-sm font-bold mb-2" 
                  style={{ color: colors.primary }}
                >
                  {t('Bar Admissions')}
                </h3>
                <div 
                  className="text-xs whitespace-pre-line" 
                  style={{ color: colors.text }}
                >
                  {aboutData.bar_admissions}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderPracticeAreasSection = (practiceAreasData: any) => {
    const areas = practiceAreasData.areas || [];
    if (!Array.isArray(areas) || areas.length === 0) return null;
    
    const getAreaIcon = (iconName: string) => {
      switch(iconName) {
        case 'family': return <User size={20} />;
        case 'corporate': return <Building size={20} />;
        case 'criminal': return <Scale size={20} />;
        case 'real-estate': return <Home size={20} />;
        case 'immigration': return <Globe size={20} />;
        case 'intellectual': return <FileText size={20} />;
        case 'personal-injury': return <User size={20} />;
        case 'tax': return <Briefcase size={20} />;
        default: return <Scale size={20} />;
      }
    };
    
    return (
      <div 
        id="practice-areas"
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.cardBg,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div 
          className="mb-4 pb-2" 
          style={{ borderBottom: `2px solid ${colors.goldAccent}` }}
        >
          <h2 
            className="text-lg font-bold" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t('Practice Areas')}
          </h2>
        </div>
        
        <div className="space-y-4">
          {areas.map((area: any, index: number) => (
            <div 
              key={index} 
              className="flex items-center p-4 rounded" 
              style={{ 
                backgroundColor: colors.background,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div 
                className="mr-3 p-2 rounded-full flex-shrink-0" 
                style={{ 
                  backgroundColor: colors.accent,
                  color: colors.primary
                }}
              >
                {getAreaIcon(area.icon)}
              </div>
              <div>
                <h3 
                  className="text-base font-bold mb-1" 
                  style={{ 
                    color: colors.primary,
                    fontFamily: font
                  }}
                >
                  {area.title}
                </h3>
                {area.description && (
                  <p 
                    className="text-xs" 
                    style={{ color: colors.text }}
                  >
                    {area.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderServicesSection = (servicesData: any) => {
    const services = servicesData.service_list || [];
    if (!Array.isArray(services) || services.length === 0) return null;
    
    const getFeeStructureBadge = (feeType: string) => {
      switch(feeType) {
        case 'hourly': return { bg: '#E6F0FF', text: '#0066CC', label: 'Hourly Rate' };
        case 'flat': return { bg: '#E6F7F2', text: '#00875A', label: 'Flat Fee' };
        case 'contingency': return { bg: '#FFF1E6', text: '#FF5630', label: 'Contingency' };
        case 'retainer': return { bg: '#F2E6FF', text: '#6554C0', label: 'Retainer' };
        case 'consultation': return { bg: '#E6FFFA', text: '#00B8D9', label: 'Free Consultation' };
        default: return { bg: '#F2F2F2', text: '#666666', label: 'Fee Structure' };
      }
    };
    
    return (
      <div 
        id="services"
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div 
          className="mb-4 pb-2" 
          style={{ borderBottom: `2px solid ${colors.goldAccent}` }}
        >
          <h2 
            className="text-lg font-bold" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t('Legal Services')}
          </h2>
        </div>
        
        <div className="space-y-4">
          {services.map((service: any, index: number) => {
            const feeStyle = getFeeStructureBadge(service.fee_structure);
            
            return (
              <div 
                key={index} 
                className="p-4 rounded" 
                style={{ 
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.borderColor}`
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 
                    className="text-base font-bold" 
                    style={{ 
                      color: colors.primary,
                      fontFamily: font
                    }}
                  >
                    {service.title}
                  </h3>
                  
                  {service.fee_structure && (
                    <span 
                      className="text-xs px-2 py-1 rounded" 
                      style={{ 
                        backgroundColor: feeStyle.bg,
                        color: feeStyle.text
                      }}
                    >
                      {feeStyle.label}
                    </span>
                  )}
                </div>
                
                {service.description && (
                  <p 
                    className="text-xs mb-3" 
                    style={{ color: colors.text }}
                  >
                    {service.description}
                  </p>
                )}
                
                {service.price && (
                  <div 
                    className="text-sm font-medium" 
                    style={{ color: colors.secondary }}
                  >
                    {service.price}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderContactSection = (contactData: any) => (
    <div 
      id="contact"
      className="px-5 py-6" 
      style={{ 
        backgroundColor: colors.cardBg,
        borderBottom: `1px solid ${colors.borderColor}`
      }}
    >
      <div 
        className="mb-4 pb-2" 
        style={{ borderBottom: `2px solid ${colors.goldAccent}` }}
      >
        <h2 
          className="text-lg font-bold" 
          style={{ 
            color: colors.primary,
            fontFamily: font
          }}
        >
          {t('Contact Information')}
        </h2>
      </div>
      
      <div 
        className="p-4 rounded mb-4" 
        style={{ 
          backgroundColor: colors.background,
          border: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="space-y-3">
          {(contactData.phone || data.phone) && (
            <div className="flex items-center">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center mr-3" 
                style={{ 
                  backgroundColor: colors.accent,
                  color: colors.primary
                }}
              >
                <Phone size={14} />
              </div>
              <div>
                <p 
                  className="text-xs" 
                  style={{ color: colors.text + '80' }}
                >
                  {t('Phone')}
                </p>
                <a 
                  href={`tel:${contactData.phone || data.phone}`} 
                  className="text-sm font-medium" 
                  style={{ color: colors.primary }}
                >
                  {contactData.phone || data.phone}
                </a>
              </div>
            </div>
          )}
          
          {contactData.fax && (
            <div className="flex items-center">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center mr-3" 
                style={{ 
                  backgroundColor: colors.accent,
                  color: colors.primary
                }}
              >
                <Printer size={14} />
              </div>
              <div>
                <p 
                  className="text-xs" 
                  style={{ color: colors.text + '80' }}
                >
                  {t('Fax')}
                </p>
                <p 
                  className="text-sm font-medium" 
                  style={{ color: colors.primary }}
                >
                  {contactData.fax}
                </p>
              </div>
            </div>
          )}
          
          {(contactData.email || data.email) && (
            <div className="flex items-center">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center mr-3" 
                style={{ 
                  backgroundColor: colors.accent,
                  color: colors.primary
                }}
              >
                <Mail size={14} />
              </div>
              <div>
                <p 
                  className="text-xs" 
                  style={{ color: colors.text + '80' }}
                >
                  {t('Email')}
                </p>
                <a 
                  href={`mailto:${contactData.email || data.email}`} 
                  className="text-sm font-medium" 
                  style={{ color: colors.primary }}
                >
                  {contactData.email || data.email}
                </a>
              </div>
            </div>
          )}
          
          {(contactData.website || data.website) && (
            <div className="flex items-center">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center mr-3" 
                style={{ 
                  backgroundColor: colors.accent,
                  color: colors.primary
                }}
              >
                <Globe size={14} />
              </div>
              <div className="flex-1 overflow-hidden">
                <p 
                  className="text-xs" 
                  style={{ color: colors.text + '80' }}
                >
                  {t('Website')}
                </p>
                <a 
                  href={contactData.website || data.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm font-medium truncate block" 
                  style={{ color: colors.primary }}
                >
                  {contactData.website || data.website}
                </a>
              </div>
            </div>
          )}
          
          {contactData.location && (
            <div className="flex items-center">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center mr-3" 
                style={{ 
                  backgroundColor: colors.accent,
                  color: colors.primary
                }}
              >
                <MapPin size={14} />
              </div>
              <div>
                <p 
                  className="text-xs" 
                  style={{ color: colors.text + '80' }}
                >
                  {t('Office Location')}
                </p>
                <p 
                  className="text-sm font-medium" 
                  style={{ color: colors.primary }}
                >
                  {contactData.location}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-3">
        <Button
          className="w-full"
          size="sm"
          style={{ 
            backgroundColor: colors.primary,
            color: colors.buttonText,
            fontFamily: font
          }}
          onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
        >
          {t('Contact Us')}
        </Button>
        
        <Button
          className="w-full"
          size="sm"
          variant="outline"
          style={{ 
            borderColor: colors.primary,
            color: colors.primary,
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

  const renderVideosSection = (videosData: any) => {
    const videos = videosData.video_list || [];
    if (!Array.isArray(videos) || videos.length === 0) return null;
    
    
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div 
          className="mb-4 pb-2" 
          style={{ borderBottom: `2px solid ${colors.goldAccent}` }}
        >
          <h2 
            className="text-lg font-bold" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t('Legal Education Videos')}
          </h2>
        </div>
        
        <div className="space-y-4">
          {videoContent.map((video: any) => (
            <div 
              key={video.key} 
              className="rounded overflow-hidden" 
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
                  <div className="relative w-full h-36">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title || 'Legal video'} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div 
                        className="w-14 h-14 rounded-full flex items-center justify-center" 
                        style={{ backgroundColor: colors.primary }}
                      >
                        <Play className="w-7 h-7 ml-1 text-white" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-36 flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
                    <div className="text-center">
                      <Video className="w-10 h-10 mx-auto mb-2" style={{ color: colors.primary }} />
                      <span className="text-sm font-medium" style={{ color: colors.primary, fontFamily: font }}>{t("Legal Video")}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h4 className="font-bold text-base mb-2" style={{ color: colors.primary, fontFamily: font }}>
                  {video.title}
                </h4>
                {video.description && (
                  <p className="text-sm mb-3" style={{ color: colors.text, fontFamily: font }}>
                    {video.description}
                  </p>
                )}
                <div className="flex justify-between items-center">
                  {video.duration && (
                    <span className="text-xs" style={{ color: colors.text + '80', fontFamily: font }}>
                      ⏱️ {video.duration}
                    </span>
                  )}
                  {video.legal_topic && (
                    <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: colors.accent, color: colors.primary, fontFamily: font }}>
                      ⚖️ {video.legal_topic}
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
          backgroundColor: colors.cardBg,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div 
          className="mb-4 pb-2" 
          style={{ borderBottom: `2px solid ${colors.goldAccent}` }}
        >
          <h2 
            className="text-lg font-bold" 
            style={{ 
              color: colors.primary,
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
            <div className="w-full relative overflow-hidden" style={{ paddingBottom: '56.25%', height: 0 }}>
              <div 
                className="absolute inset-0 w-full h-full"
                ref={createYouTubeEmbedRef(
                  youtubeData.latest_video_embed,
                  { colors, font },
                  'Latest Legal Video'
                )}
              />
            </div>
          </div>
        )}
        
        <div 
          className="p-4 rounded" 
          style={{ 
            backgroundColor: colors.background,
            border: `1px solid ${colors.borderColor}`
          }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 rounded bg-red-600 flex items-center justify-center flex-shrink-0">
              <Youtube className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-base" style={{ color: colors.primary, fontFamily: font }}>
                {youtubeData.channel_name || 'Legal Channel'}
              </h4>
              {youtubeData.subscriber_count && (
                <p className="text-sm" style={{ color: colors.secondary, fontFamily: font }}>
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
                style={{ 
                  borderColor: colors.primary, 
                  color: colors.primary, 
                  fontFamily: font 
                }}
                onClick={() => typeof window !== "undefined" && window.open(youtubeData.featured_playlist, '_blank', 'noopener,noreferrer')}
              >
                ⚖️ {t("LEGAL INSIGHTS")}
              </Button>
            )}
          </div>
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
          backgroundColor: colors.background,
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
              className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-105 shadow-sm"
              style={{ 
                backgroundColor: colors.primary,
                color: '#FFFFFF'
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
          backgroundColor: colors.cardBg,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div 
          className="mb-4 pb-2" 
          style={{ borderBottom: `2px solid ${colors.goldAccent}` }}
        >
          <h2 
            className="text-lg font-bold" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t('Office Hours')}
          </h2>
        </div>
        
        <div 
          className="p-4 rounded" 
          style={{ 
            backgroundColor: colors.background,
            border: `1px solid ${colors.borderColor}`
          }}
        >
          <div className="space-y-2">
            {hours.map((hour: any, index: number) => (
              <div 
                key={index} 
                className="flex justify-between items-center py-2"
                style={{ 
                  borderBottom: index < hours.length - 1 ? `1px solid ${colors.borderColor}` : 'none'
                }}
              >
                <div className="flex items-center">
                  <span 
                    className="capitalize font-medium text-sm" 
                    style={{ 
                      color: hour.day === currentDay ? colors.primary : colors.text,
                      fontWeight: hour.day === currentDay ? 'bold' : 'normal'
                    }}
                  >
                    {hour.day}
                  </span>
                  {hour.day === currentDay && (
                    <span 
                      className="ml-2 text-xs px-1 rounded" 
                      style={{ 
                        backgroundColor: colors.accent,
                        color: colors.primary
                      }}
                    >
                      {t('Today')}
                    </span>
                  )}
                </div>
                <span 
                  className="text-sm" 
                  style={{ 
                    color: hour.is_closed ? colors.text + '80' : colors.text
                  }}
                >
                  {hour.is_closed ? t('Closed') : `${hour.open_time} - ${hour.close_time}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderTestimonialsSection = (testimonialsData: any) => {
    const reviews = testimonialsData.reviews || [];
    
    if (!Array.isArray(reviews) || reviews.length === 0) return null;
    
    // Render star rating
    const renderStars = (rating: number) => {
      const stars = [];
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 !== 0;
      
      for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
          stars.push(
            <span key={i} style={{ color: colors.goldAccent }}>★</span>
          );
        } else if (i === fullStars && hasHalfStar) {
          stars.push(
            <span key={i} style={{ color: colors.goldAccent }}>☆</span>
          );
        } else {
          stars.push(
            <span key={i} style={{ color: colors.borderColor }}>☆</span>
          );
        }
      }
      return stars;
    };
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div 
          className="mb-4 pb-2" 
          style={{ borderBottom: `2px solid ${colors.goldAccent}` }}
        >
          <h2 
            className="text-lg font-bold" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t('Client Testimonials')}
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
                    className="p-4 rounded" 
                    style={{ 
                      backgroundColor: colors.cardBg,
                      border: `1px solid ${colors.borderColor}`
                    }}
                  >
                    
                    {/* Dynamic Rating Display */}
                    <div className="flex items-center mb-2">
                      <div className="flex text-lg mr-2">
                        {renderStars(review.rating || 5)}
                      </div>
                      <span 
                        className="text-sm font-medium" 
                        style={{ color: colors.primary }}
                      >
                        {review.rating || 5}/5
                      </span>
                    </div>
                    
                    <p 
                      className="text-sm italic mb-3" 
                      style={{ color: colors.text }}
                    >
                      "{review.review}"
                    </p>
                    <div className="flex justify-between items-center">
                      <p 
                        className="text-sm font-bold" 
                        style={{ color: colors.primary }}
                      >
                        {review.client_name}
                      </p>
                      {review.case_type && (
                        <span 
                          className="text-xs px-2 py-1 rounded" 
                          style={{ 
                            backgroundColor: colors.accent,
                            color: colors.primary
                          }}
                        >
                          {review.case_type}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Fixed Dot Navigation */}
          <div className="flex justify-center mt-4 space-x-3">
            {reviews.map((_, dotIndex) => (
              <div
                key={dotIndex}
                className="w-4 h-4 rounded-full transition-all duration-300 cursor-pointer border-2"
                style={{ 
                  backgroundColor: dotIndex === currentReview ? colors.goldAccent : colors.background,
                  borderColor: colors.goldAccent,
                  opacity: dotIndex === currentReview ? 1 : 0.5,
                  borderWidth: dotIndex === currentReview ? '3px' : '2px'
                }}

                onClick={() => handleDotClick(dotIndex)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderAppointmentsSection = (appointmentsData: any) => {
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
            className="text-lg font-bold mb-3" 
            style={{ 
              color: '#FFFFFF',
              fontFamily: font
            }}
          >
            {appointmentsData.section_title || t('Need Legal Assistance?')}
          </h2>
          <p 
            className="text-sm mb-4" 
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            {appointmentsData.section_description || t('Schedule a consultation with our experienced attorneys to discuss your case.')}
          </p>
          <Button
            size="sm"
            className="w-full"
            style={{ 
              backgroundColor: colors.goldAccent,
              color: colors.primary,
              fontFamily: font,
              fontWeight: 'bold'
            }}
            onClick={() => handleAppointmentBooking(configSections.appointments)}
          >
            <Calendar className="w-4 h-4 mr-2" />
            {appointmentsData?.consultation_text || t('Schedule a Free Consultation')}
          </Button>
        </div>
      </div>
    );
  };

  const renderLocationSection = (locationData: any) => {
    if (!locationData.map_embed_url && !locationData.directions_url) return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.cardBg,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div 
          className="mb-4 pb-2" 
          style={{ borderBottom: `2px solid ${colors.goldAccent}` }}
        >
          <h2 
            className="text-lg font-bold" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t('Office Location')}
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
              size="sm"
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
        <div 
          className="mb-4 pb-2" 
          style={{ borderBottom: `2px solid ${colors.goldAccent}` }}
        >
          <h2 
            className="text-lg font-bold" 
            style={{ 
              color: colors.primary,
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
              size="sm"
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
              size="sm"
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
        <div 
          className="mb-4 pb-2" 
          style={{ borderBottom: `2px solid ${colors.goldAccent}` }}
        >
          <h2 
            className="text-lg font-bold" 
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
          size="sm"
          className="w-full mb-4"
          style={{ 
            backgroundColor: colors.primary,
            color: colors.buttonText,
            fontFamily: font
          }}
          onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
        >
          <Mail className="w-4 h-4 mr-2" />
          {t('Send a Message')}
        </Button>
        
        {formData.confidentiality_note && (
          <p 
            className="text-xs italic" 
            style={{ color: colors.text + '80' }}
          >
            {formData.confidentiality_note}
          </p>
        )}
      </div>
    );
  };

  const renderThankYouSection = (thankYouData: any) => {
    if (!thankYouData.message) return null;
    
    return (
      <div 
        className="px-5 py-4" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
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
          <div 
            className="mb-4 pb-2" 
            style={{ borderBottom: `2px solid ${colors.goldAccent}` }}
          >
            <h2 
              className="text-lg font-bold" 
              style={{ 
                color: colors.primary,
                fontFamily: font
              }}
            >
              <Scale className="w-5 h-5 mr-2 inline" />
              {customHtmlData.section_title}
            </h2>
          </div>
        )}
        <div 
          className="custom-html-content p-4 rounded" 
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
                background-color: ${colors.accent};
                color: ${colors.primary};
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
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.cardBg,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div 
          className="mb-4 pb-2" 
          style={{ borderBottom: `2px solid ${colors.goldAccent}` }}
        >
          <h2 
            className="text-lg font-bold" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            <Share2 className="w-5 h-5 mr-2 inline" />
            {t("Share Our Firm")}
          </h2>
        </div>
        <div 
          className="text-center p-4 rounded" 
          style={{ 
            backgroundColor: colors.background,
            border: `1px solid ${colors.borderColor}`
          }}
        >
          {qrData.qr_title && (
            <h4 className="font-bold text-base mb-2" style={{ color: colors.primary, fontFamily: font }}>
              {qrData.qr_title}
            </h4>
          )}
          
          {qrData.qr_description && (
            <p className="text-sm mb-4" style={{ color: colors.text, fontFamily: font }}>
              {qrData.qr_description}
            </p>
          )}
          
          <Button 
            size="sm" 
            className="w-full" 
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText,
              fontFamily: font
            }}
            onClick={() => setShowQrModal(true)}
          >
            <QrCode className="w-4 h-4 mr-2" />
            {t("Share QR Code")}
          </Button>
        </div>
      </div>
    );
  };

  const renderCopyrightSection = (copyrightData: any) => {
    return (
      <div 
        className="px-5 py-4" 
        style={{ backgroundColor: colors.primary }}
      >
        {copyrightData.text && (
          <p 
            className="text-xs text-center mb-2" 
            style={{ color: '#FFFFFF' }}
          >
            {copyrightData.text}
          </p>
        )}
        
        {copyrightData.disclaimer && (
          <p 
            className="text-xs text-center" 
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            {copyrightData.disclaimer}
          </p>
        )}
      </div>
    );
  };

  // Create a style object that will be applied to all text elements
  const globalStyle = {
    fontFamily: font
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
        .filter(key => key !== 'colors' && key !== 'font' && key !== 'copyright')
        .map((sectionKey) => (
          <React.Fragment key={sectionKey}>
            {renderSection(sectionKey)}
          </React.Fragment>
        ))}
      
      {/* Copyright Footer */}
      {configSections.copyright && renderCopyrightSection(configSections.copyright)}
      
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