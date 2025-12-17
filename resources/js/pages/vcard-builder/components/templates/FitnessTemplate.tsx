import { handleAppointmentBooking } from '../VCardPreview';
import React from 'react';
import StableHtmlContent from '@/components/StableHtmlContent';
import { VideoEmbed, extractVideoUrl } from '@/components/VideoEmbed';
import { createYouTubeEmbedRef } from '@/utils/youtubeEmbedUtils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ensureRequiredSections } from '@/utils/ensureRequiredSections';
import { sanitizeVideoData } from '@/utils/secureVideoUtils';
import languageData from '@/../../resources/lang/language.json';
import { 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Instagram, 
  Facebook, 
  Youtube, 
  Twitter, 
  Linkedin, 
  Calendar, 
  Clock, 
  Award, 
  Dumbbell, 
  User, 
  Star, 
  ChevronRight, 
  Download, 
  UserPlus,
  Video,
  Play,
  QrCode
} from 'lucide-react';
import SocialIcon from '../../../link-bio-builder/components/SocialIcon';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionOrder, isSectionEnabled, getSectionData } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';
import { useTranslation } from 'react-i18next';

interface FitnessTemplateProps {
  data: any;
  template: any;
}

export default function FitnessTemplate({ data, template }: FitnessTemplateProps) {
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
  

  

  const colors = configSections.colors || template?.defaultColors || { 
    primary: '#FF4136', 
    secondary: '#FF725C', 
    accent: '#FFCEC9', 
    background: '#FFFFFF', 
    text: '#333333',
    cardBg: '#F9F9F9',
    borderColor: '#EEEEEE',
    buttonText: '#FFFFFF',
    highlightColor: '#FFD700'
  };
  const font = configSections.font || template?.defaultFont || 'Montserrat, sans-serif';
  
  // Get all sections for this business type
  const allSections = getBusinessTemplate('fitness')?.sections || [];

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

  const renderSection = (sectionKey: string) => {
    const sectionData = configSections[sectionKey] || {};
        
    if (!sectionData || Object.keys(sectionData).length === 0 || sectionData.enabled === false) return null;
    
    switch (sectionKey) {
      case 'header':
        return renderHeaderSection(sectionData);
      case 'about':
        return renderAboutSection(sectionData);
      case 'contact':
        return renderContactSection(sectionData);
      case 'services':
        return renderServicesSection(sectionData);
      case 'transformation':
        return renderTransformationSection(sectionData);
      case 'programs':
        return renderProgramsSection(sectionData);
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
    <div className="relative overflow-hidden">
      {/* Cover Image or Gradient Background */}
      <div className="h-48 w-full relative">
        {headerData.cover_image ? (
          <img 
            src={headerData.cover_image} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div 
            className="w-full h-full" 
            style={{ 
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
              opacity: 0.9
            }}
          >
            {/* Fitness Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <pattern id="fitness-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M0 10h20v1H0zM10 0v20h1V0z" fill="#FFFFFF"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#fitness-pattern)" />
              </svg>
            </div>
          </div>
        )}
        
        {/* Language Selector */}
        {configSections.language && (
          <div className="absolute top-4 right-4">
            <div className="relative z-50">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowLanguageSelector(!showLanguageSelector);
                }}
                className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-sm flex items-center justify-center transition-all hover:shadow-md"
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
                    onClick={(e) => e.stopPropagation()}
                  >
                    {languageData.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          changeLanguage(lang.code);
                        }}
                        className="w-full text-left px-2 py-1 text-xs flex items-center space-x-1 hover:bg-gray-50 transition-colors"
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
        
        {/* Motivational Quote */}
        <div className="absolute bottom-20 left-4 right-4 text-white text-center">
          <div className="bg-black bg-opacity-50 p-3 rounded-lg inline-block max-w-xs mx-auto">
            <p className="text-sm font-bold italic leading-tight">{headerData.motivational_quote || 'TRANSFORM YOUR BODY, TRANSFORM YOUR LIFE'}</p>
          </div>
        </div>
      </div>
      
      <div className="px-6 pb-6 -mt-16 relative">
        <div className="flex items-start space-x-4">
          <div 
            className="w-32 h-32 rounded-full border-4 shadow-xl flex items-center justify-center overflow-hidden" 
            style={{ 
              borderColor: colors.background,
              backgroundColor: colors.cardBg
            }}
          >
            {headerData.profile_image ? (
              <img 
                src={headerData.profile_image} 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100">
                <Dumbbell size={24} style={{ color: colors.primary }} />
                <span className="text-xs mt-1 font-bold" style={{ color: colors.primary }}>{t("TRAINER")}</span>
              </div>
            )}
          </div>
          <div className="flex-1 mt-16">
            <h1 
              className="text-2xl font-extrabold tracking-tight" 
              style={{ color: colors.text }}
            >
              {headerData.name || data.name || 'Alex Fitness'}
            </h1>
            <p 
              className="text-sm font-medium" 
              style={{ color: colors.primary }}
            >
              {headerData.title || 'Certified Personal Trainer'}
            </p>
            {headerData.tagline && (
              <p 
                className="text-xs mt-1" 
                style={{ color: colors.text }}
              >
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

  const renderAboutSection = (aboutData: any) => {
    if (!aboutData.description && !data.description) return null;
    return (
      <div 
        className="px-6 py-5" 
        style={{ borderBottom: `1px solid ${colors.borderColor}` }}
      >
        <h3 
          className="font-bold text-lg mb-3 flex items-center" 
          style={{ color: colors.text }}
        >
          <User size={18} className="mr-2" style={{ color: colors.primary }} />
          About Me
        </h3>
        <p 
          className="text-sm leading-relaxed mb-4" 
          style={{ color: colors.text }}
        >
          {aboutData.description || data.description}
        </p>
        
        {/* Experience Badge */}
        {aboutData.experience && (
          <div className="mb-4 flex items-center">
            <Badge 
              className="text-xs py-1 px-3" 
              style={{ 
                backgroundColor: colors.primary, 
                color: colors.buttonText 
              }}
            >
              {aboutData.experience} {t("Years Experience")}
            </Badge>
          </div>
        )}
        
        {/* Specialties */}
        {aboutData.specialties && (
          <div className="mb-4">
            <p 
              className="text-xs font-bold mb-2 flex items-center" 
              style={{ color: colors.primary }}
            >
              <Award size={14} className="mr-1" />
              {t("SPECIALTIES")}
            </p>
            <div className="flex flex-wrap gap-1">
              {aboutData.specialties.split(',').map((specialty: string, index: number) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs" 
                  style={{ 
                    borderColor: colors.primary,
                    color: colors.text
                  }}
                >
                  {specialty.trim()}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Certifications */}
        {aboutData.certifications && (
          <div>
            <p 
              className="text-xs font-bold mb-2 flex items-center" 
              style={{ color: colors.primary }}
            >
              <Award size={14} className="mr-1" />
              {t("CERTIFICATIONS")}
            </p>
            <div className="flex flex-wrap gap-1">
              {aboutData.certifications.split(',').map((cert: string, index: number) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs" 
                  style={{ 
                    backgroundColor: `${colors.primary}15`,
                    color: colors.text,
                    borderColor: 'transparent'
                  }}
                >
                  {cert.trim()}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderContactSection = (contactData: any) => (
    <div 
      className="px-6 py-5" 
      style={{ borderBottom: `1px solid ${colors.borderColor}` }}
    >
      <h3 
        className="font-bold text-lg mb-3 flex items-center" 
        style={{ color: colors.text }}
      >
        <Phone size={18} className="mr-2" style={{ color: colors.primary }} />
        {t("Contact Information")}
      </h3>
      <div className="space-y-3">
        {(contactData.email || data.email) && (
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center" 
              style={{ backgroundColor: `${colors.primary}15` }}
            >
              <Mail size={18} style={{ color: colors.primary }} />
            </div>
            <div>
              <p 
                className="text-xs" 
                style={{ color: colors.text + '80' }}
              >
                {t("Email")}
              </p>
              <a 
                href={`mailto:${contactData.email || data.email}`} 
                className="text-sm font-medium" 
                style={{ color: colors.text }}
              >
                {contactData.email || data.email}
              </a>
            </div>
          </div>
        )}
        
        {(contactData.phone || data.phone) && (
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center" 
              style={{ backgroundColor: `${colors.primary}15` }}
            >
              <Phone size={18} style={{ color: colors.primary }} />
            </div>
            <div>
              <p 
                className="text-xs" 
                style={{ color: colors.text + '80' }}
              >
                {t("Phone")}
              </p>
              <a 
                href={`tel:${contactData.phone || data.phone}`} 
                className="text-sm font-medium" 
                style={{ color: colors.text }}
              >
                {contactData.phone || data.phone}
              </a>
            </div>
          </div>
        )}
        
        {(contactData.website || data.website) && (
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center" 
              style={{ backgroundColor: `${colors.primary}15` }}
            >
              <Globe size={18} style={{ color: colors.primary }} />
            </div>
            <div>
              <p 
                className="text-xs" 
                style={{ color: colors.text + '80' }}
              >
                {t("Website")}
              </p>
              <a 
                href={contactData.website || data.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-medium" 
                style={{ color: colors.text }}
              >
                {contactData.website || data.website}
              </a>
            </div>
          </div>
        )}
        
        {contactData.location && (
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center" 
              style={{ backgroundColor: `${colors.primary}15` }}
            >
              <MapPin size={18} style={{ color: colors.primary }} />
            </div>
            <div>
              <p 
                className="text-xs" 
                style={{ color: colors.text + '80' }}
              >
                {t("Location")}
              </p>
              <p 
                className="text-sm font-medium" 
                style={{ color: colors.text }}
              >
                {contactData.location}
              </p>
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

  const renderServicesSection = (servicesData: any) => {
    const services = servicesData.service_list || [];
    if (!Array.isArray(services) || services.length === 0) return null;
    
    const getServiceIcon = (iconName: string) => {
      switch(iconName) {
        case 'dumbbell': return <Dumbbell size={24} />;
        case 'running': return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 4v16M17 4v16M21 4v16M9 4v16M5 4v16M1 4v16"/></svg>;
        case 'yoga': return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"/><path d="M12 8v13M9 21h6M7 8l3 6M17 8l-3 6"/></svg>;
        case 'nutrition': return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20M12 9a3 3 0 0 0 0 6 3 3 0 0 0 0-6z"/></svg>;
        case 'group': return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="5" r="3"/><circle cx="18" cy="19" r="3"/><circle cx="6" cy="19" r="3"/><path d="M6 8v8M18 8v8M3 12h18"/></svg>;
        case 'personal': return <User size={24} />;
        default: return <Dumbbell size={24} />;
      }
    };
    
    return (
      <div 
        className="px-6 py-5" 
        style={{ borderBottom: `1px solid ${colors.borderColor}` }}
      >
        <h3 
          className="font-bold text-lg mb-4 flex items-center" 
          style={{ color: colors.text }}
        >
          <Dumbbell size={18} className="mr-2" style={{ color: colors.primary }} />
          {t("Training Services")}
        </h3>
        <div className="space-y-4">
          {services.map((service: any, index: number) => (
            <div 
              key={index} 
              className="p-4 rounded-lg" 
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div className="flex items-start">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mr-3 flex-shrink-0" 
                  style={{ 
                    backgroundColor: `${colors.primary}15`,
                    color: colors.primary
                  }}
                >
                  {getServiceIcon(service.icon)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 
                      className="font-bold text-base" 
                      style={{ color: colors.text }}
                    >
                      {service.title}
                    </h4>
                    <div 
                      className="text-sm font-bold" 
                      style={{ color: colors.primary }}
                    >
                      {service.price}
                    </div>
                  </div>
                  {service.description && (
                    <p 
                      className="text-xs mt-1" 
                      style={{ color: colors.text + 'CC' }}
                    >
                      {service.description}
                    </p>
                  )}
                  {service.duration && (
                    <div 
                      className="flex items-center mt-2 text-xs" 
                      style={{ color: colors.text + '99' }}
                    >
                      <Clock size={12} className="mr-1" />
                      {service.duration}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTransformationSection = (transformationData: any) => {
    const gallery = transformationData.gallery || [];
    if (!Array.isArray(gallery) || gallery.length === 0) return null;
    
    return (
      <div 
        className="px-6 py-5" 
        style={{ borderBottom: `1px solid ${colors.borderColor}` }}
      >
        <h3 
          className="font-bold text-lg mb-4 flex items-center" 
          style={{ color: colors.text }}
        >
          <Award size={18} className="mr-2" style={{ color: colors.primary }} />
          {t("Client Transformations")}
        </h3>
        <div className="space-y-4">
          {gallery.map((item: any, index: number) => (
            <div 
              key={index} 
              className="p-4 rounded-lg" 
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <h4 
                className="font-bold text-base mb-2" 
                style={{ color: colors.text }}
              >
                {item.title}
              </h4>
              
              <div className="flex space-x-2 mb-3">
                <div className="flex-1 relative">
                  <div 
                    className="absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded" 
                    style={{ 
                      backgroundColor: 'rgba(0,0,0,0.7)', 
                      color: '#FFFFFF' 
                    }}
                  >
                    {t("BEFORE")}
                  </div>
                  <div 
                    className="h-32 bg-gray-200 rounded flex items-center justify-center" 
                    style={{ border: `1px solid ${colors.borderColor}` }}
                  >
                    {item.before_image ? (
                      <img 
                        src={item.before_image} 
                        alt="Before" 
                        className="w-full h-full object-cover rounded" 
                      />
                    ) : (
                      <User size={24} style={{ color: colors.text + '40' }} />
                    )}
                  </div>
                </div>
                
                <div className="flex-1 relative">
                  <div 
                    className="absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded" 
                    style={{ 
                      backgroundColor: colors.primary, 
                      color: colors.buttonText 
                    }}
                  >
                    {t("AFTER")}
                  </div>
                  <div 
                    className="h-32 bg-gray-200 rounded flex items-center justify-center" 
                    style={{ border: `1px solid ${colors.borderColor}` }}
                  >
                    {item.after_image ? (
                      <img 
                        src={item.after_image} 
                        alt="After" 
                        className="w-full h-full object-cover rounded" 
                      />
                    ) : (
                      <User size={24} style={{ color: colors.text + '40' }} />
                    )}
                  </div>
                </div>
              </div>
              
              {item.description && (
                <p 
                  className="text-xs" 
                  style={{ color: colors.text + 'CC' }}
                >
                  "{item.description}"
                </p>
              )}
              
              {item.duration && (
                <div 
                  className="mt-2 text-xs font-bold" 
                  style={{ color: colors.primary }}
                >
                  {t("Transformation Time")}: {item.duration}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderProgramsSection = (programsData: any) => {
    const programs = programsData.program_list || programsData || [];
    
    // If no programs data, show default programs from template
    const defaultPrograms = templateSections.programs?.program_list || [];
    const finalPrograms = Array.isArray(programs) && programs.length > 0 ? programs : defaultPrograms;
    
    if (!Array.isArray(finalPrograms) || finalPrograms.length === 0) return null;
    
    const getLevelBadgeColor = (level: string) => {
      switch(level) {
        case 'beginner': return '#4CAF50';
        case 'intermediate': return '#FF9800';
        case 'advanced': return '#F44336';
        default: return colors.primary;
      }
    };
    
    return (
      <div 
        className="px-6 py-5" 
        style={{ borderBottom: `1px solid ${colors.borderColor}` }}
      >
        <h3 
          className="font-bold text-lg mb-4 flex items-center" 
          style={{ color: colors.text }}
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
            className="mr-2"
            style={{ color: colors.primary }}
          >
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
            <line x1="4" y1="22" x2="4" y2="15"></line>
          </svg>
          {t("Training Programs")}
        </h3>
        <div className="space-y-4">
          {finalPrograms.map((program: any, index: number) => (
            <div 
              key={index} 
              className="p-4 rounded-lg" 
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 
                  className="font-bold text-base" 
                  style={{ color: colors.text }}
                >
                  {program.title}
                </h4>
                <div 
                  className="text-sm font-bold" 
                  style={{ color: colors.primary }}
                >
                  {program.price}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mb-2">
                {program.level && (
                  <Badge 
                    className="text-xs capitalize" 
                    style={{ 
                      backgroundColor: getLevelBadgeColor(program.level),
                      color: '#FFFFFF'
                    }}
                  >
                    {program.level}
                  </Badge>
                )}
                
                {program.duration && (
                  <Badge 
                    variant="outline" 
                    className="text-xs" 
                    style={{ 
                      borderColor: colors.primary,
                      color: colors.primary,
                      backgroundColor: colors.background
                    }}
                  >
                    {program.duration}
                  </Badge>
                )}
              </div>
              
              {program.description && (
                <p 
                  className="text-xs" 
                  style={{ color: colors.text + 'CC' }}
                >
                  {program.description}
                </p>
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
        className="px-6 py-5" 
        style={{ borderBottom: `1px solid ${colors.borderColor}` }}
      >
        <h3 
          className="font-bold text-lg mb-4 flex items-center" 
          style={{ color: colors.text }}
        >
          <Video size={18} className="mr-2" style={{ color: colors.primary }} />
          {t("Workout Videos")}
        </h3>
        <div className="space-y-4">
          {videoContent.map((video: any) => (
            <div 
              key={video.key} 
              className="rounded-lg overflow-hidden" 
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
                  <div className="relative w-full h-40">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title || 'Video thumbnail'} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center" 
                        style={{ backgroundColor: colors.primary }}
                      >
                        <Play className="w-8 h-8 ml-1 text-white" />
                      </div>
                    </div>
                    {video.duration && (
                      <div className="absolute bottom-2 right-2 px-2 py-1 rounded text-xs font-bold" style={{ backgroundColor: 'rgba(0,0,0,0.8)', color: 'white' }}>
                        {video.duration}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-40 flex items-center justify-center" style={{ backgroundColor: `${colors.primary}15` }}>
                    <div className="text-center">
                      <Video className="w-12 h-12 mx-auto mb-2" style={{ color: colors.primary }} />
                      <span className="text-sm font-bold" style={{ color: colors.primary, fontFamily: font }}>{t("WORKOUT VIDEO")}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h4 className="font-bold text-base mb-2" style={{ color: colors.text, fontFamily: font }}>
                  {video.title}
                </h4>
                {video.description && (
                  <p className="text-sm mb-3" style={{ color: colors.text + 'CC', fontFamily: font }}>
                    {video.description}
                  </p>
                )}
                <div className="flex justify-between items-center">
                  {video.video_type && (
                    <span 
                      className="text-xs px-2 py-1 rounded font-bold" 
                      style={{ 
                        backgroundColor: colors.primary,
                        color: colors.buttonText,
                        fontFamily: font
                      }}
                    >
                      {video.video_type.replace('_', ' ').toUpperCase()}
                    </span>
                  )}
                  {video.difficulty_level && (
                    <span 
                      className="text-xs px-2 py-1 rounded" 
                      style={{ 
                        backgroundColor: `${colors.secondary}20`,
                        color: colors.secondary,
                        fontFamily: font
                      }}
                    >
                      {video.difficulty_level.toUpperCase()}
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
        className="px-6 py-5" 
        style={{ borderBottom: `1px solid ${colors.borderColor}` }}
      >
        <h3 
          className="font-bold text-lg mb-4 flex items-center" 
          style={{ color: colors.text }}
        >
          <Youtube size={18} className="mr-2" style={{ color: colors.primary }} />
          {t("YouTube Channel")}
        </h3>
        <div 
          className="rounded-lg p-4" 
          style={{ 
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.borderColor}`
          }}
        >
          <div className="flex items-center space-x-4 mb-4">
        
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
            <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
              <Youtube className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-base" style={{ color: colors.text, fontFamily: font }}>
                {youtubeData.channel_name || 'Fitness Channel'}
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
                className="w-full py-4 font-bold" 
                style={{ 
                  backgroundColor: '#FF0000', 
                  color: 'white',
                  fontFamily: font 
                }}
                onClick={() => typeof window !== "undefined" && window.open(youtubeData.channel_url, '_blank', 'noopener,noreferrer')}
              >
                <Youtube className="w-5 h-5 mr-2" />
                {t("SUBSCRIBE TO CHANNEL")}
              </Button>
            )}
            {youtubeData.featured_playlist && (
              <Button 
                variant="outline" 
                className="w-full py-4 font-bold" 
                style={{ 
                  borderColor: colors.primary, 
                  color: colors.primary, 
                  fontFamily: font 
                }}
                onClick={() => typeof window !== "undefined" && window.open(youtubeData.featured_playlist, '_blank', 'noopener,noreferrer')}
              >
                📋 {t("WORKOUT PLAYLIST")}
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
        className="px-6 py-5" 
        style={{ borderBottom: `1px solid ${colors.borderColor}` }}
      >
        <h3 
          className="font-bold text-lg mb-4 flex items-center" 
          style={{ color: colors.text }}
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
            className="mr-2"
            style={{ color: colors.primary }}
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
          {t("Follow Me")}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {socialLinks.map((link: any, index: number) => (
            <Button 
              key={index} 
              className="flex items-center justify-center py-5" 
              style={{ 
                backgroundColor: colors.primary,
                color: colors.buttonText,
                fontFamily: font
              }}
              onClick={() => link.url && typeof window !== "undefined" && window.open(link.url, '_blank', 'noopener,noreferrer')}
            >
              <div className="mr-2">
                <SocialIcon platform={link.platform} color={colors.buttonText} />
              </div>
              <span className="capitalize">{link.platform}</span>
            </Button>
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
        className="px-6 py-5" 
        style={{ borderBottom: `1px solid ${colors.borderColor}` }}
      >
        <h3 
          className="font-bold text-lg mb-4 flex items-center" 
          style={{ color: colors.text }}
        >
          <Clock size={18} className="mr-2" style={{ color: colors.primary }} />
          {t("Training Hours")}
        </h3>
        <div className="space-y-2">
          {hours.map((hour: any, index: number) => (
            <div 
              key={index} 
              className="flex justify-between items-center p-3 rounded-lg" 
              style={{ 
                backgroundColor: hour.day === currentDay ? `${colors.primary}15` : 'transparent',
                border: hour.day === currentDay ? `1px solid ${colors.primary}30` : `1px solid ${colors.borderColor}`
              }}
            >
              <div className="flex items-center">
                <span 
                  className="capitalize font-medium text-sm" 
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
                    {t("Today")}
                  </Badge>
                )}
              </div>
              <span 
                className="text-sm" 
                style={{ 
                  color: hour.is_closed ? colors.text + '80' : (hour.day === currentDay ? colors.primary : colors.text)
                }}
              >
                {hour.is_closed ? 'Not Available' : `${hour.open_time} - ${hour.close_time}`}
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
      <div 
        className="px-6 py-5" 
        style={{ borderBottom: `1px solid ${colors.borderColor}` }}
      >
        <h3 
          className="font-bold text-lg mb-4 flex items-center" 
          style={{ color: colors.text }}
        >
          <Star size={18} className="mr-2" style={{ color: colors.primary }} />
          {t("Client Reviews")}
        </h3>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentReview * 100}%)` }}
            >
              {reviews.map((review: any, index: number) => (
                <div key={index} className="w-full flex-shrink-0 px-1">
                  <div 
                    className="p-4 rounded-lg" 
                    style={{ 
                      backgroundColor: colors.cardBg,
                      border: `1px solid ${colors.borderColor}`
                    }}
                  >
                    <div className="flex items-center mb-3">
                      <div 
                        className="w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0" 
                        style={{ border: `2px solid ${colors.primary}` }}
                      >
                        {review.client_image ? (
                          <img 
                            src={review.client_image} 
                            alt={review.client_name} 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div 
                            className="w-full h-full flex items-center justify-center" 
                            style={{ backgroundColor: `${colors.primary}30` }}
                          >
                            <User size={20} style={{ color: colors.primary }} />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-sm" style={{ color: colors.text }}>
                          {review.client_name}
                        </div>
                        {review.goal_achieved && (
                          <div 
                            className="text-xs" 
                            style={{ color: colors.primary }}
                          >
                            {review.goal_achieved}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          fill={i < parseInt(review.rating || 5) ? colors.highlightColor : 'transparent'} 
                          stroke={i < parseInt(review.rating || 5) ? colors.highlightColor : colors.borderColor}
                        />
                      ))}
                    </div>
                    
                    <p 
                      className="text-sm italic" 
                      style={{ color: colors.text }}
                    >
                      "{review.review}"
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
    );
  };

  const renderAppointmentsSection = (appointmentsData: any) => {
    return (
      <div 
        className="px-6 py-5" 
        style={{ borderBottom: `1px solid ${colors.borderColor}` }}
      >
        <h3 
          className="font-bold text-lg mb-4 flex items-center" 
          style={{ color: colors.text }}
        >
          <Calendar size={18} className="mr-2" style={{ color: colors.primary }} />
          {t("Book a Session")}
        </h3>
        <div className="space-y-3">
          <Button 
            className="w-full py-6 font-bold text-base rounded-xl" 
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText,
              fontFamily: font
            }}
            onClick={() => handleAppointmentBooking(configSections.appointments)}
          >
            {appointmentsData?.booking_text || 'Book a Training Session'}
          </Button>
          
          {appointmentsData?.consultation_text && (
            <Button 
              variant="outline" 
              className="w-full py-6 font-bold text-base rounded-xl" 
              style={{ 
                borderColor: colors.primary,
                color: colors.primary,
                fontFamily: font
              }}
              onClick={() => handleAppointmentBooking(configSections.appointments)}
            >
              {appointmentsData.consultation_text}
            </Button>
          )}
        </div>
      </div>
    );
  };

  const renderLocationSection = (locationData: any) => {
    if (!locationData.map_embed_url && !locationData.directions_url) return null;
    
    return (
      <div 
        className="px-6 py-5" 
        style={{ borderBottom: `1px solid ${colors.borderColor}` }}
      >
        <h3 
          className="font-bold text-lg mb-4 flex items-center" 
          style={{ color: colors.text }}
        >
          <MapPin size={18} className="mr-2" style={{ color: colors.primary }} />
          {t("Find My Gym")}
        </h3>
        
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
        className="px-6 py-5" 
        style={{ borderBottom: `1px solid ${colors.borderColor}` }}
      >
        <h3 
          className="font-bold text-lg mb-3 flex items-center" 
          style={{ color: colors.text }}
        >
          <Download size={18} className="mr-2" style={{ color: colors.primary }} />
          {t("Fitness App")}
        </h3>
        
        {appData.app_description && (
          <p 
            className="text-sm mb-4" 
            style={{ color: colors.text + 'CC' }}
          >
            {appData.app_description}
          </p>
        )}
        
        <div className="grid grid-cols-2 gap-3">
          {appData.app_store_url && (
            <Button 
              variant="outline" 
              className="flex items-center justify-center" 
              style={{ 
                borderColor: colors.primary,
                color: colors.primary,
                fontFamily: font
              }}
              onClick={() => typeof window !== "undefined" && window.open(appData.app_store_url, '_blank', 'noopener,noreferrer')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M12 19c0-4.2-2.8-7-7-7M5 8c4.2 0 7-2.8 7-7M12 5c0 4.2 2.8 7 7 7M19 16c-4.2 0-7 2.8-7 7"/>
              </svg>
              {t("App Store")}
            </Button>
          )}
          
          {appData.play_store_url && (
            <Button 
              variant="outline" 
              className="flex items-center justify-center" 
              style={{ 
                borderColor: colors.primary,
                color: colors.primary,
                fontFamily: font
              }}
              onClick={() => typeof window !== "undefined" && window.open(appData.play_store_url, '_blank', 'noopener,noreferrer')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
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
        className="px-6 py-5" 
        style={{ borderBottom: `1px solid ${colors.borderColor}` }}
      >
        <h3 
          className="font-bold text-lg mb-2" 
          style={{ color: colors.text }}
        >
          {formData.form_title}
        </h3>
        
        {formData.form_description && (
          <p 
            className="text-sm mb-4" 
            style={{ color: colors.text + 'CC' }}
          >
            {formData.form_description}
          </p>
        )}
        
        <Button 
          className="w-full py-6 font-bold text-base rounded-xl" 
          style={{ 
            backgroundColor: colors.primary,
            color: colors.buttonText,
            fontFamily: font
          }}
          onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
        >
          <Mail className="w-5 h-5 mr-2" />
          {t("Contact Me")}
        </Button>
      </div>
    );
  };

  const renderThankYouSection = (thankYouData: any) => {
    if (!thankYouData.message) return null;
    
    return (
      <div className="px-6 py-4">
        <div 
          className="p-4 rounded-lg text-center" 
          style={{ 
            backgroundColor: `${colors.primary}10`,
            border: `1px solid ${colors.primary}30`
          }}
        >
          <p 
            className="text-sm" 
            style={{ color: colors.text }}
          >
            {thankYouData.message}
          </p>
        </div>
      </div>
    );
  };

  const renderCustomHtmlSection = (customHtmlData: any) => {
    if (!customHtmlData.html_content) return null;
    
    return (
      <div 
        className="px-6 py-5" 
        style={{ borderBottom: `1px solid ${colors.borderColor}` }}
      >
        {customHtmlData.show_title && customHtmlData.section_title && (
          <h3 
            className="font-bold text-lg mb-4 flex items-center" 
            style={{ color: colors.text }}
          >
            <Dumbbell size={18} className="mr-2" style={{ color: colors.primary }} />
            {customHtmlData.section_title}
          </h3>
        )}
        <div 
          className="custom-html-content p-4 rounded-lg" 
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
    );
  };

  const renderQrShareSection = (qrData: any) => {
    if (!qrData.enable_qr) return null;
    
    return (
      <div 
        className="px-6 py-5" 
        style={{ borderBottom: `1px solid ${colors.borderColor}` }}
      >
        <h3 
          className="font-bold text-lg mb-4 flex items-center" 
          style={{ color: colors.text }}
        >
          <QrCode size={18} className="mr-2" style={{ color: colors.primary }} />
          {qrData.qr_title || t('Share My Training')}
        </h3>
        
        <div 
          className="text-center p-4 rounded-lg" 
          style={{ 
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.borderColor}`
          }}
        >
          {qrData.qr_description && (
            <p 
              className="text-sm mb-3" 
              style={{ color: colors.text }}
            >
              {qrData.qr_description}
            </p>
          )}
          
          <Button 
            className="w-full py-4 font-bold" 
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText,
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

  const renderFooterSection = (footerData: any) => {
    if (!footerData.show_footer) return null;
    
    return (
      <div 
        className="px-6 py-5" 
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
          <div className="flex flex-wrap justify-center gap-2">
            {footerData.footer_links.map((link: any, index: number) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1 rounded transition-colors font-medium"
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
        className="px-6 py-4 text-center" 
        style={{ 
          backgroundColor: colors.background
        }}
      >
        <p 
          className="text-xs" 
          style={{ color: colors.text + '80' }}
        >
          {copyrightData.text}
        </p>
      </div>
    );
  };

  // Create a style object that will be applied to all text elements
  const globalStyle = {
    fontFamily: font
  };
  
  // Extract copyright section to render it at the end
  const copyrightSection = configSections.copyright;
  
  // Get ordered sections using the utility function
  const orderedSectionKeys = getSectionOrder(data.template_config || { sections: configSections, sectionSettings: configSections }, allSections);
  return (
    <div 
      className="w-full max-w-md mx-auto rounded-2xl overflow-hidden" 
      style={{ 
        fontFamily: font,
        background: colors.background,
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
      
      <div 
        className="p-6 space-y-4" 
        style={{ 
          background: colors.cardBg
        }}
      >
        <Button 
          className="w-full py-6 font-bold text-base rounded-xl" 
          style={{ 
            backgroundColor: colors.primary,
            color: colors.buttonText,
            fontFamily: font
          }}
          onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
        >
          <Mail className="w-5 h-5 mr-2" />
          {t("Contact Me")}
        </Button>
        
        <Button 
          className="w-full py-6 font-bold text-base rounded-xl" 
          style={{ 
            backgroundColor: colors.secondary,
            color: colors.buttonText,
            fontFamily: font
          }}
          onClick={() => handleAppointmentBooking(configSections.appointments)}
        >
          <Calendar className="w-5 h-5 mr-2" />
          {t("Book a Session")}
        </Button>
        
        {/* Save Contact Button */}
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center" 
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
          {t("Save Contact")}
        </Button>
      </div>
      
      {/* Copyright always at the end */}
      {copyrightSection && (
        <div 
          className="px-6 py-4 text-center" 
          style={{ 
            backgroundColor: colors.background
          }}
        >
          {copyrightSection.text && (
            <p 
              className="text-xs" 
              style={{ color: colors.text + '80' }}
            >
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