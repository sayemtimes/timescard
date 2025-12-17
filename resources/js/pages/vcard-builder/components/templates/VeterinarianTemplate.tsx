import { handleAppointmentBooking } from '../VCardPreview';
import React from 'react';
import { VideoEmbed, extractVideoUrl } from '@/components/VideoEmbed';
import { createYouTubeEmbedRef } from '@/utils/youtubeEmbedUtils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ensureRequiredSections } from '@/utils/ensureRequiredSections';
import { Mail, Phone, Globe, MapPin, Calendar, UserPlus, Heart, Shield, AlertTriangle, Stethoscope, Clock, Youtube, Video,
  Play, Share2, QrCode } from 'lucide-react';
import SocialIcon from '../../../link-bio-builder/components/SocialIcon';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionOrder } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';
import { useTranslation } from 'react-i18next';
import { sanitizeVideoData } from '@/utils/secureVideoUtils';
import languageData from '@/../../resources/lang/language.json';

interface VeterinarianTemplateProps {
  data: {
    name?: string;
    email?: string;
    phone?: string;
    website?: string;
    description?: string;
    config_sections?: any;
    template_config?: any;
  };
  template: {
    defaultData?: any;
    defaultColors?: any;
    defaultFont?: string;
  };
}

export default function VeterinarianTemplate({ data, template }: VeterinarianTemplateProps) {
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
  const colors = configSections.colors || template?.defaultColors || { primary: '#4A90E2', secondary: '#7BB3F0', accent: '#50C878', background: '#F8FBFF', text: '#1A365D' };
  const font = configSections.font || template?.defaultFont || 'Inter, sans-serif';

  // Get all sections for this business type
  const allSections = getBusinessTemplate('veterinarian')?.sections || [];

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
      case 'videos':
        return renderVideosSection(sectionData);
      case 'youtube':
        return renderYouTubeSection(sectionData);
      case 'animal_care':
        return renderAnimalCareSection(sectionData);
      case 'emergency':
        return renderEmergencySection(sectionData);
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
      background: `linear-gradient(135deg, ${colors.background}, ${colors.primary}15, ${colors.accent}10)`,
      minHeight: '200px'
    }}>
      {/* Language Selector */}
      {configSections.language && (
        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-20`}>
          <div className="relative">
            <button
              onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium transition-colors"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.9)',
                border: `1px solid ${colors.primary}`,
                color: colors.primary
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
      
      {/* Floating paw prints */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute opacity-10 animate-bounce" 
               style={{ 
                 top: `${Math.random() * 70 + 10}%`, 
                 left: `${Math.random() * 80 + 10}%`,
                 animationDelay: `${i * 0.5}s`,
                 animationDuration: '3s'
               }}>
            <div className="text-2xl">🐾</div>
          </div>
        ))}
      </div>
      
      <div className="relative px-6 py-8">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 shadow-2xl overflow-hidden" 
                 style={{ 
                   borderColor: colors.primary, 
                   boxShadow: `0 0 30px ${colors.primary}30`
                 }}>
              {headerData.profile_image ? (
                <img src={headerData.profile_image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: colors.cardBg }}>
                  <Stethoscope className="w-10 h-10" style={{ color: colors.primary }} />
                </div>
              )}
            </div>
            {/* Caring pulse animation */}
            <div className="absolute -inset-2 rounded-full border-2 animate-pulse" 
                 style={{ borderColor: colors.accent, animationDuration: '2s' }}></div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-xl font-bold mb-1" style={{ color: colors.text, fontFamily: font }}>
              {headerData.name || data.name || t('Dr. Veterinarian')}
            </h1>
            
            <div className="inline-flex items-center px-4 py-1 rounded-full mb-2" 
                 style={{ backgroundColor: colors.primary, color: 'white' }}>
              <Heart className="w-3 h-3 mr-2" />
              <span className="text-sm font-medium" style={{ fontFamily: font }}>
                {headerData.title || t('Animal Care Specialist')}
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
    <div className="px-6 py-4" style={{ borderBottom: `2px solid ${colors.primary}20` }}>
      <div className="grid grid-cols-2 gap-3">
        {(contactData.email || data.email) && (
          <a href={`mailto:${contactData.email || data.email}`}
             className="flex items-center space-x-2 p-3 rounded-2xl transition-all hover:scale-105"
             style={{ 
               backgroundColor: colors.cardBg, 
               border: `2px solid ${colors.primary}20`,
               boxShadow: `0 4px 15px ${colors.primary}10`
             }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center" 
                 style={{ backgroundColor: colors.primary }}>
              <Mail className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-medium" style={{ color: colors.text, fontFamily: font }}>{t('Email')}</span>
          </a>
        )}
        
        {(contactData.phone || data.phone) && (
          <a href={`tel:${contactData.phone || data.phone}`}
             className="flex items-center space-x-2 p-3 rounded-2xl transition-all hover:scale-105"
             style={{ 
               backgroundColor: colors.cardBg, 
               border: `2px solid ${colors.secondary}20`,
               boxShadow: `0 4px 15px ${colors.secondary}10`
             }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center" 
                 style={{ backgroundColor: colors.secondary }}>
              <Phone className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-medium" style={{ color: colors.text, fontFamily: font }}>{t('Call')}</span>
          </a>
        )}
        
        {(contactData.website || data.website) && (
          <a href={contactData.website || data.website} target="_blank" rel="noopener noreferrer"
             className="flex items-center space-x-2 p-3 rounded-2xl transition-all hover:scale-105"
             style={{ 
               backgroundColor: colors.cardBg, 
               border: `2px solid ${colors.accent}20`,
               boxShadow: `0 4px 15px ${colors.accent}10`
             }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center" 
                 style={{ backgroundColor: colors.accent }}>
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-medium" style={{ color: colors.text, fontFamily: font }}>{t('Website')}</span>
          </a>
        )}
        
        {contactData.location && (
          <div className="flex items-center space-x-2 p-3 rounded-2xl"
               style={{ backgroundColor: colors.cardBg, border: `2px solid ${colors.primary}15` }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center" 
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
      <div className="px-6 py-4" style={{ borderBottom: `2px solid ${colors.primary}20` }}>
        <div className="relative p-5 rounded-3xl" style={{ 
          backgroundColor: colors.cardBg, 
          border: `2px solid ${colors.primary}15`,
          boxShadow: `0 8px 25px ${colors.primary}10`
        }}>
          <div className="flex items-center space-x-2 mb-3">
            <Heart className="w-4 h-4" style={{ color: colors.primary }} />
            <h3 className="font-bold text-sm" style={{ color: colors.primary, fontFamily: font }}>{t('About Dr.')} {data.name?.split(' ')[1] || t('Veterinarian')}</h3>
          </div>
          
          <p className="text-sm leading-relaxed mb-3" style={{ color: colors.text, fontFamily: font }}>
            {aboutData.description || data.description}
          </p>
          
          {aboutData.specialties && (
            <div className="mb-3">
              <p className="text-xs font-bold mb-2" style={{ color: colors.secondary, fontFamily: font }}>{t('Specialties')}:</p>
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
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-1" 
                     style={{ backgroundColor: colors.primary + '20', border: `2px solid ${colors.primary}` }}>
                  <span className="text-sm font-bold" style={{ color: colors.primary, fontFamily: font }}>
                    {aboutData.experience}+
                  </span>
                </div>
                <p className="text-xs" style={{ color: colors.text, fontFamily: font }}>{t('Years')}</p>
              </div>
            )}
            
            {aboutData.education && (
              <div className="flex-1 ml-4">
                <p className="text-xs font-bold mb-1" style={{ color: colors.accent, fontFamily: font }}>{t('Education')}:</p>
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
      <div className="px-6 py-4" style={{ borderBottom: `2px solid ${colors.primary}20` }}>
        <h3 className="font-bold text-sm mb-3 flex items-center" style={{ color: colors.primary, fontFamily: font }}>
          <Shield className="w-4 h-4 mr-2" />
          {t('Veterinary Services')}
        </h3>
        <div className="space-y-3">
          {services.map((service: any, index: number) => (
            <div key={index} className="p-4 rounded-2xl transition-all hover:scale-102" 
                 style={{ 
                   backgroundColor: colors.cardBg, 
                   border: `2px solid ${colors.secondary}20`,
                   boxShadow: `0 6px 20px ${colors.secondary}08`
                 }}>
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>
                  {service.title}
                </h4>
                {service.price_range && (
                  <Badge className="text-xs" 
                         style={{ backgroundColor: colors.primary + '20', color: colors.primary }}>
                    {service.price_range}
                  </Badge>
                )}
              </div>
              <p className="text-xs mb-2 leading-relaxed" style={{ color: colors.text + 'CC', fontFamily: font }}>
                {service.description}
              </p>
              {service.animal_types && (
                <div className="flex flex-wrap gap-1">
                  {service.animal_types.split(',').map((animal: string, idx: number) => (
                    <span key={idx} className="text-xs px-2 py-1 rounded-full" 
                          style={{ backgroundColor: colors.accent + '20', color: colors.accent, fontFamily: font }}>
                      {animal.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAnimalCareSection = (careData: any) => {
    const tips = careData.care_tips || [];
    if (!Array.isArray(tips) || tips.length === 0) return null;
    return (
      <div className="px-6 py-4" style={{ borderBottom: `2px solid ${colors.primary}20` }}>
        <h3 className="font-bold text-sm mb-3 text-center" style={{ color: colors.primary, fontFamily: font }}>
          🐾 {t('Pet Care Tips')}
        </h3>
        <div className="space-y-3">
          {tips.slice(0, 3).map((tip: any, index: number) => (
            <div key={index} className="p-3 rounded-2xl" 
                 style={{ backgroundColor: colors.cardBg, border: `2px solid ${colors.accent}20` }}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-sm capitalize" style={{ color: colors.text, fontFamily: font }}>
                  {tip.tip_title}
                </h4>
                <div className="flex space-x-1">
                  <Badge className="text-xs" 
                         style={{ backgroundColor: colors.secondary + '20', color: colors.secondary }}>
                    {tip.animal_type}
                  </Badge>
                  {tip.season !== 'all-year' && (
                    <Badge className="text-xs" 
                           style={{ backgroundColor: colors.accent + '20', color: colors.accent }}>
                      {tip.season}
                    </Badge>
                  )}
                </div>
              </div>
              <p className="text-xs" style={{ color: colors.text + 'CC', fontFamily: font }}>
                {tip.tip_description}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderEmergencySection = (emergencyData: any) => {
    if (!emergencyData.emergency_phone && !emergencyData.after_hours_info) return null;
    return (
      <div className="px-6 py-4" style={{ borderBottom: `2px solid ${colors.primary}20` }}>
        <div className="p-4 rounded-2xl" 
             style={{ 
               backgroundColor: '#FEF2F2', 
               border: `2px solid #FCA5A5`,
               boxShadow: '0 4px 15px rgba(248, 113, 113, 0.1)'
             }}>
          <div className="flex items-center space-x-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <h3 className="font-bold text-sm text-red-700" style={{ fontFamily: font }}>{t('Emergency Care')}</h3>
          </div>
          
          {emergencyData.emergency_phone && (
            <div className="mb-2">
              <a href={`tel:${emergencyData.emergency_phone}`}
                 className="flex items-center space-x-2 p-2 rounded-lg bg-red-100 hover:bg-red-200 transition-colors">
                <Phone className="w-4 h-4 text-red-600" />
                <span className="text-sm font-bold text-red-700" style={{ fontFamily: font }}>
                  {t('Emergency')}: {emergencyData.emergency_phone}
                </span>
              </a>
            </div>
          )}
          
          {emergencyData.after_hours_info && (
            <p className="text-xs text-red-600 mb-2" style={{ fontFamily: font }}>
              {emergencyData.after_hours_info}
            </p>
          )}
          
          {emergencyData.emergency_clinic && (
            <div className="p-2 rounded-lg bg-red-50 mb-2">
              <p className="text-xs font-medium text-red-700 mb-1" style={{ fontFamily: font }}>{t('Partner Emergency Clinic')}:</p>
              <p className="text-xs text-red-600" style={{ fontFamily: font }}>
                {emergencyData.emergency_clinic}
              </p>
            </div>
          )}
          
          {emergencyData.emergency_tips && (
            <div className="p-2 rounded-lg bg-red-50">
              <p className="text-xs font-medium text-red-700 mb-1" style={{ fontFamily: font }}>{t('First Aid Tips')}:</p>
              <p className="text-xs text-red-600" style={{ fontFamily: font }}>
                {emergencyData.emergency_tips}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSocialSection = (socialData: any) => {
    const socialLinks = socialData.social_links || [];
    if (!Array.isArray(socialLinks) || socialLinks.length === 0) return null;
    return (
      <div className="px-6 py-4" style={{ borderBottom: `2px solid ${colors.primary}20` }}>
        <h3 className="font-bold text-sm mb-3 text-center" style={{ color: colors.primary, fontFamily: font }}>
          {t('Follow Our Pet Community')}
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {socialLinks.map((link: any, index: number) => (
            <Button key={index} size="sm" variant="outline" className="justify-start text-xs" 
                    style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}
                    onClick={() => link.url && typeof window !== "undefined" && window.open(link.url, '_blank', 'noopener,noreferrer')}>
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
    return (
      <div className="px-6 py-4" style={{ borderBottom: `2px solid ${colors.primary}20` }}>
        <h3 className="font-bold text-sm mb-3 text-center flex items-center justify-center" 
            style={{ color: colors.primary, fontFamily: font }}>
          <Clock className="w-4 h-4 mr-2" />
          {t('Clinic Hours')}
        </h3>
        <div className="space-y-2">
          {hours.slice(0, 7).map((hour: any, index: number) => (
            <div key={index} className="flex justify-between items-center p-2 rounded-xl" 
                 style={{ backgroundColor: hour.is_closed ? colors.background : colors.cardBg }}>
              <span className="capitalize font-medium text-xs" style={{ color: colors.text, fontFamily: font }}>
                {hour.day}
              </span>
              <span className="text-xs" style={{ color: hour.is_closed ? colors.text + '60' : colors.primary, fontFamily: font }}>
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
      <div className="px-6 py-4" style={{ borderBottom: `2px solid ${colors.primary}20` }}>
        <h3 className="font-bold text-sm mb-3 text-center" style={{ color: colors.primary, fontFamily: font }}>
          💕 {t('Happy Pet Families')}
        </h3>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentReview * 100}%)` }}
            >
              {reviews.map((review: any, index: number) => (
                <div key={index} className="w-full flex-shrink-0 px-1">
                  <div className="p-4 rounded-2xl" 
                       style={{ backgroundColor: colors.cardBg, border: `2px solid ${colors.secondary}15` }}>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-3 h-3 rounded-full ${i < parseInt(review.rating || 5) ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                      ))}
                    </div>
                    <p className="text-xs mb-2 leading-relaxed italic" style={{ color: colors.text, fontFamily: font }}>
                      "{review.review}"
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs font-bold" style={{ color: colors.primary, fontFamily: font }}>
                          - {review.client_name}
                        </p>
                        {review.pet_name && review.pet_type && (
                          <p className="text-xs" style={{ color: colors.text + '80', fontFamily: font }}>
                            {t('Pet parent to')} {review.pet_name} ({review.pet_type})
                          </p>
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
                  className="text-sm transition-all duration-300"
                  style={{ 
                    opacity: currentReview === dotIndex ? 1 : 0.4
                  }}
                >
                  🐾
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAppointmentsSection = (appointmentsData: any) => {
    return (
      <div className="px-6 py-4" style={{ borderBottom: `2px solid ${colors.primary}20` }}>
        <div className="text-center p-4 rounded-2xl" style={{ 
          backgroundColor: colors.cardBg, 
          border: `2px solid ${colors.primary}30`,
          boxShadow: `0 8px 25px ${colors.primary}15`
        }}>
          <h3 className="font-bold text-sm mb-2" style={{ color: colors.primary, fontFamily: font }}>
            🏥 {t('Schedule an Appointment')}
          </h3>
          {appointmentsData?.appointment_info && (
            <p className="text-xs mb-3" style={{ color: colors.text, fontFamily: font }}>
              {appointmentsData.appointment_info}
            </p>
          )}
          <Button size="sm" className="rounded-2xl" 
                  style={{ backgroundColor: colors.primary, color: 'white', fontFamily: font }}
                  onClick={() => handleAppointmentBooking(configSections.appointments)}>
            <Calendar className="w-4 h-4 mr-2" />
            {t('Book Appointment')}
          </Button>
        </div>
      </div>
    );
  };

  const renderLocationSection = (locationData: any) => {
    if (!locationData.map_embed_url && !locationData.directions_url) return null;
    
    return (
      <div className="px-6 py-4" style={{ borderBottom: `2px solid ${colors.primary}20` }}>
        <h3 className="font-bold text-sm mb-3 flex items-center" style={{ color: colors.primary, fontFamily: font }}>
          <MapPin className="w-4 h-4 mr-2" />
          {t('Clinic Location')}
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
      <div className="px-6 py-4" style={{ borderBottom: `2px solid ${colors.primary}20` }}>
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
      <div className="px-6 py-4" style={{ borderBottom: `2px solid ${colors.primary}20` }}>
        <div className="text-center p-4 rounded-2xl" style={{ 
          backgroundColor: colors.cardBg,
          border: `2px solid ${colors.secondary}20`
        }}>
          <h3 className="font-bold text-sm mb-2" style={{ color: colors.secondary, fontFamily: font }}>
            {formData.form_title}
          </h3>
          {formData.form_description && (
            <p className="text-xs mb-3" style={{ color: colors.text, fontFamily: font }}>
              {formData.form_description}
            </p>
          )}
          <Button size="sm" className="rounded-2xl" 
                  style={{ backgroundColor: colors.secondary, color: 'white', fontFamily: font }}
                  onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}>
            <Mail className="w-4 h-4 mr-2" />
            {t('Contact Us')}
          </Button>
        </div>
      </div>
    );
  };

  
  const renderVideosSection = (videosData: any) => {
    const videos = videosData.video_list || [];
    if (!Array.isArray(videos) || videos.length === 0) return null;
    
    const videoContent = videos.map((video: any, index: number) => {
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
    
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor}` }}>
        <h3 className="font-bold text-sm mb-3 flex items-center" style={{ color: colors.primary, fontFamily: font }}>
          <Video className="w-4 h-4 mr-2" />
          {t('Educational Videos')}
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
                      alt={video.title || 'educational videos'} 
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
                      <span className="text-xs font-medium" style={{ color: colors.primary, fontFamily: font }}>{t('Educational Videos')}</span>
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
                      🏥 {video.video_type}
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
                {youtubeData.channel_name || t('Veterinary Care')}
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
                {t('SUBSCRIBE')}
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
                🏥 {t('PET HEALTH TIPS')}
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
      <div 
        className="px-6 py-4" 
        style={{ backgroundColor: colors.background, borderBottom: `2px solid ${colors.primary}20` }}
        id="custom_html"
      >
        <div 
          dangerouslySetInnerHTML={{ __html: customHtmlData.html_content }}
          style={{ fontFamily: font }}
        />
      </div>
    );
  };
  
  const renderQrShareSection = (qrData: any) => {
    if (!qrData.enable_qr) return null;
    
    return (
      <div 
        className="px-6 py-4" 
        style={{ backgroundColor: colors.cardBg, borderBottom: `2px solid ${colors.primary}20` }}
        id="qr_share"
      >
        <div className="text-center mb-4">
          <h3 
            className="font-bold text-sm mb-2" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {qrData.section_title || t('Share & Connect')}
          </h3>
        </div>
        
        <div 
          className="p-4 rounded-2xl text-center" 
          style={{ backgroundColor: colors.background, border: `2px solid ${colors.primary}15` }}
        >
          {qrData.qr_description && (
            <p 
              className="text-xs mb-4" 
              style={{ color: colors.text + 'CC' }}
            >
              {qrData.qr_description}
            </p>
          )}
          
          <Button 
            className="w-full" 
            style={{ 
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
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
      boxShadow: `0 20px 60px ${colors.primary}15`,
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
      
      <div className="p-6 space-y-3" style={{ 
        background: `linear-gradient(135deg, ${colors.primary}08, ${colors.accent}05)`
      }}>
        <Button className="w-full h-14 font-bold rounded-3xl transition-all hover:scale-105" 
                style={{ 
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  color: 'white',
                  fontFamily: font,
                  boxShadow: `0 8px 25px ${colors.primary}30`
                }}
                onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <Heart className="w-5 h-5 mr-2" />
          {t('Care for Your Pet Today')}
        </Button>
        
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1 rounded-2xl" 
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
          
          <Button 
            variant="outline"
            size="sm"
            style={{ 
              borderColor: colors.accent, 
              color: colors.accent, 
              fontFamily: font 
            }}
            onClick={() => {
              if (typeof navigator !== 'undefined' && navigator.share) {
                navigator.share({
                  title: data.name || 'Business Card',
                  text: 'Check out this veterinarian business card',
                  url: window.location.href
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
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