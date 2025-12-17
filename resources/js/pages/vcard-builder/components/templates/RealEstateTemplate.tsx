import { handleAppointmentBooking } from '../VCardPreview';
import React from 'react';
import StableHtmlContent from '@/components/StableHtmlContent';
import { VideoEmbed, extractVideoUrl } from '@/components/VideoEmbed';
import { createYouTubeEmbedRef } from '@/utils/youtubeEmbedUtils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ensureRequiredSections } from '@/utils/ensureRequiredSections';
import { useTranslation } from 'react-i18next';
import { sanitizeText, sanitizeUrl } from '@/utils/sanitizeHtml';
import { 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  Clock, 
  Calendar, 
  Star, 
  Download, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram, 
  MessageSquare,
  Home,
  Building,
  Key,
  DollarSign,
  BarChart,
  Search,
  Handshake,
  User,
  Award,
  Briefcase,
  Save,
  Smartphone,
  Video,
  Play,
  Youtube,
  Share2,
  QrCode
} from 'lucide-react';
import SocialIcon from '../../../link-bio-builder/components/SocialIcon';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionOrder, isSectionEnabled, getSectionData } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';
import { sanitizeVideoData } from '@/utils/secureVideoUtils';
import languageData from '@/../../resources/lang/language.json';

interface RealEstateTemplateProps {
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

export default function RealEstateTemplate({ data, template }: RealEstateTemplateProps) {
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
  const colors = configSections.colors || template?.defaultColors || { 
    primary: '#1A365D', 
    secondary: '#2A4365', 
    accent: '#EBF8FF', 
    background: '#FFFFFF', 
    text: '#2D3748',
    cardBg: '#F7FAFC',
    borderColor: '#E2E8F0'
  };
  const font = configSections.font || template?.defaultFont || 'Raleway, sans-serif';
  
  const globalStyle = {
    fontFamily: font
  };
  
  // Get all sections for this business type
  const allSections = getBusinessTemplate('realestate')?.sections || [];

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
      case 'business_hours':
        return renderBusinessHoursSection(sectionData);
      case 'featured_listings':
        return renderFeaturedListingsSection(sectionData);
      case 'services':
        return renderServicesSection(sectionData);
      case 'videos':
        return renderVideosSection(sectionData);
      case 'youtube':
        return renderYouTubeSection(sectionData);
      case 'testimonials':
        return renderTestimonialsSection(sectionData);
      case 'social':
        return renderSocialSection(sectionData);
      case 'appointments':
        return renderAppointmentsSection(sectionData);
      case 'google_map':
        return renderLocationSection(sectionData);
      case 'market_stats':
        return renderMarketStatsSection(sectionData);
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
    <div className="relative overflow-hidden border-b" style={{ borderColor: colors.borderColor || '#E2E8F0' }}>
      {/* Real Estate Property Card Inspired Header */}
      <div className="relative">

        
        {/* Top status bar */}
        <div className="h-6 w-full flex items-center justify-between px-4" 
          style={{ backgroundColor: colors.primary }}>
          <div className="flex items-center">
            <Home size={12} style={{ color: 'white', marginRight: '4px' }} />
            <span className="text-xs font-medium text-white">
              {headerData.agency || 'Premium Properties'}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Award size={12} style={{ color: 'white', marginRight: '4px' }} />
              <span className="text-xs font-medium text-white">
                {headerData.achievement_badge || `Top Agent ${new Date().getFullYear()}`}
              </span>
            </div>
            
            {/* Language Selector */}
            {configSections.language && (
              <div className="relative">
                <button
                  onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                  className="flex items-center space-x-1 text-xs font-medium text-white"
                >
                  <span>
                    {String.fromCodePoint(...(languageData.find(lang => lang.code === currentLanguage)?.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt()) || [127468, 127463]))}
                  </span>
                  <span className="uppercase">{currentLanguage}</span>
                </button>
                
                {showLanguageSelector && (
                  <>
                    <div 
                      className="fixed inset-0" 
                      style={{ zIndex: 99998 }}
                      onClick={() => setShowLanguageSelector(false)}
                    />
                    <div 
                      className="absolute right-0 top-full mt-1 rounded border shadow-lg py-1 w-36 max-h-48 overflow-y-auto"
                      style={{
                        backgroundColor: colors.background,
                        borderColor: colors.borderColor,
                        zIndex: 99999
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
          </div>
        </div>
        
        {/* Main content area with property-like layout */}
        <div className="relative">
          {/* Left side - Agent photo */}
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 h-64 relative">
              {headerData.profile_image ? (
                <img 
                  src={headerData.profile_image} 
                  alt="Agent Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center" 
                  style={{ backgroundColor: colors.accent }}>
                  <User size={64} style={{ color: colors.primary }} />
                </div>
              )}
              
              {/* License badge */}
              {headerData.license_number && (
                <div className="absolute bottom-3 left-3 bg-white px-3 py-1 rounded-full shadow-md">
                  <p className="text-xs font-semibold" style={{ color: colors.primary, fontFamily: font }}>
                    License #: {headerData.license_number}
                  </p>
                </div>
              )}
            </div>
            
            {/* Right side - Property-like details */}
            <div className="w-full md:w-1/2 p-6" style={{ backgroundColor: 'white' }}>
              {/* Agent name as property title */}
              <h1 className="text-2xl font-bold tracking-tight" 
                style={{ color: colors.primary, ...globalStyle }}>
                {sanitizeText(headerData.name || data.name || 'Sarah Johnson')}
              </h1>
              
              {/* Title as property subtitle */}
              {headerData.title && (
                <p className="text-sm font-medium mt-1" 
                  style={{ color: colors.secondary, fontFamily: font }}>
                  {sanitizeText(headerData.title)}
                </p>
              )}
              
              {/* Experience as property feature */}
              <div className="mt-4 flex flex-col space-y-2">
                <div className="flex items-center">
                  <div className="p-2 rounded-full" style={{ backgroundColor: colors.accent }}>
                    <Briefcase size={16} style={{ color: colors.primary }} />
                  </div>
                  <span className="ml-3 text-sm" style={{ color: colors.text, fontFamily: font }}>
                    {configSections.about?.experience_years || '10'} {t("Years Experience")}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <div className="p-2 rounded-full" style={{ backgroundColor: colors.accent }}>
                    <MapPin size={16} style={{ color: colors.primary }} />
                  </div>
                  <span className="ml-3 text-sm" style={{ color: colors.text, fontFamily: font }}>
                    {headerData.service_area || 'Greater Metropolitan Area'}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <div className="p-2 rounded-full" style={{ backgroundColor: colors.accent }}>
                    <Building size={16} style={{ color: colors.primary }} />
                  </div>
                  <span className="ml-3 text-sm" style={{ color: colors.text, fontFamily: font }}>
                    {headerData.property_types || 'Residential & Commercial'}
                  </span>
                </div>
              </div>
              
              {/* Agent specialties */}
              <div className="mt-6">
                <div className="flex flex-wrap gap-2">
                  {(headerData.specialization || 'Residential, Commercial, Luxury Homes')
                    .toString()
                    .split(',')
                    .map((spec: string, index: number) => (
                      <Badge key={index} variant="outline" style={{ borderColor: colors.primary, color: colors.primary }}>
                        {spec.trim()}
                      </Badge>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Property listing-like status bar */}
        <div className="h-8 w-full flex items-center justify-between px-4" 
          style={{ backgroundColor: colors.accent }}>
          <div className="flex items-center">
            <DollarSign size={14} style={{ color: colors.primary, marginRight: '4px' }} />
            <span className="text-xs font-medium" style={{ color: colors.primary }}>
              {headerData.specialization || 'Specialized in Luxury Properties'}
            </span>
          </div>
          <div className="flex items-center">
            <Star size={14} style={{ color: colors.primary, marginRight: '4px' }} />
            <span className="text-xs font-medium" style={{ color: colors.primary }}>
              {headerData.rating || '5.0 Rating'}
            </span>
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
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#E2E8F0' }}>
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-md mr-3" style={{ backgroundColor: colors.accent }}>
            <User size={18} style={{ color: colors.primary }} />
          </div>
          <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{t("About Me")}</h3>
          <div className="ml-3 flex-grow h-1" style={{ 
            background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
            borderRadius: '4px'
          }}></div>
        </div>
        
        <div className="space-y-3">
          <p className="text-sm leading-relaxed" style={{ color: colors.text, fontFamily: font }}>
            {sanitizeText(aboutData.description || data.description)}
          </p>
          
          {aboutData.experience_years && (
            <div className="flex items-center space-x-2 mt-2">
              <Briefcase size={16} style={{ color: colors.primary }} />
              <span className="text-sm" style={{ color: colors.text, fontFamily: font }}>
                {aboutData.experience_years} {t("Years of Experience")}
              </span>
            </div>
          )}
          
          {aboutData.specialties && (
            <div className="mt-3">
              <p className="text-xs font-medium mb-2" style={{ color: colors.text, fontFamily: font }}>{t("Specialties")}:</p>
              <div className="flex flex-wrap gap-1">
                {aboutData.specialties.split(',').map((specialty: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs" style={{ backgroundColor: colors.accent, color: colors.primary }}>
                    {specialty.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {aboutData.certifications && (
            <div className="mt-3">
              <p className="text-xs font-medium mb-2" style={{ color: colors.text, fontFamily: font }}>{t("Certifications")}:</p>
              <div className="flex flex-wrap gap-1">
                {aboutData.certifications.split(',').map((cert: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs" style={{ borderColor: colors.primary, color: colors.primary }}>
                    {cert.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderContactSection = (contactData: any) => (
    <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#E2E8F0' }}>
      <div className="flex items-center mb-4">
        <div className="p-2 rounded-md mr-3" style={{ backgroundColor: colors.accent }}>
          <Phone size={18} style={{ color: colors.primary }} />
        </div>
        <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{t("Contact Information")}</h3>
        <div className="ml-3 flex-grow h-1" style={{ 
          background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
          borderRadius: '4px'
        }}></div>
      </div>
      
      <div className="space-y-3">
        {(contactData.phone || data.phone) && (
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full" style={{ backgroundColor: colors.accent }}>
              <Phone size={16} style={{ color: colors.primary }} />
            </div>
            <a 
              href={`tel:${contactData.phone || data.phone}`} 
              className="text-sm"
              style={{ color: colors.text, fontFamily: font }}
            >
              {contactData.phone || data.phone}
            </a>
          </div>
        )}
        
        {(contactData.email || data.email) && (
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full" style={{ backgroundColor: colors.accent }}>
              <Mail size={16} style={{ color: colors.primary }} />
            </div>
            <a 
              href={`mailto:${contactData.email || data.email}`} 
              className="text-sm"
              style={{ color: colors.text, fontFamily: font }}
            >
              {contactData.email || data.email}
            </a>
          </div>
        )}
        
        {(contactData.website || data.website) && (
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full" style={{ backgroundColor: colors.accent }}>
              <Globe size={16} style={{ color: colors.primary }} />
            </div>
            <a 
              href={contactData.website || data.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm"
              style={{ color: colors.text, fontFamily: font }}
            >
              {contactData.website || data.website}
            </a>
          </div>
        )}
        
        {contactData.office_address && (
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-full" style={{ backgroundColor: colors.accent }}>
              <MapPin size={16} style={{ color: colors.primary }} />
            </div>
            <p 
              className="text-sm whitespace-pre-line"
              style={{ color: colors.text, fontFamily: font }}
            >
              {contactData.office_address}
            </p>
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

  const renderBusinessHoursSection = (hoursData: any) => {
    const hours = hoursData.hours || [];
    if (!Array.isArray(hours) || hours.length === 0) return null;
    
    return (
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#E2E8F0' }}>
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-md mr-3" style={{ backgroundColor: colors.accent }}>
            <Clock size={18} style={{ color: colors.primary }} />
          </div>
          <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{t("Business Hours")}</h3>
          <div className="ml-3 flex-grow h-1" style={{ 
            background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
            borderRadius: '4px'
          }}></div>
        </div>
        
        <div className="space-y-2">
          {hours.slice(0, 7).map((hour: any, index: number) => (
            <div key={index} className="flex justify-between items-center p-2 rounded" style={{ 
              backgroundColor: hour.is_closed ? colors.accent + '40' : colors.accent,
              fontFamily: font
            }}>
              <span className="capitalize font-medium text-sm" style={{ color: colors.text }}>
                {hour.day}
              </span>
              <span className="text-sm" style={{ color: hour.is_closed ? colors.text + '80' : colors.primary }}>
                {hour.is_closed ? 'Closed' : `${hour.open_time} - ${hour.close_time}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderFeaturedListingsSection = (listingsData: any) => {
    const properties = listingsData.properties || [];
    if (!Array.isArray(properties) || properties.length === 0) return null;
    
    const getStatusBadge = (status: string) => {
      let bgColor, textColor;
      
      switch (status) {
        case 'for_sale':
          bgColor = '#10B981';
          textColor = '#FFFFFF';
          break;
        case 'for_rent':
          bgColor = '#3B82F6';
          textColor = '#FFFFFF';
          break;
        case 'pending':
          bgColor = '#F59E0B';
          textColor = '#FFFFFF';
          break;
        case 'sold':
          bgColor = '#EF4444';
          textColor = '#FFFFFF';
          break;
        default:
          bgColor = colors.primary;
          textColor = '#FFFFFF';
      }
      
      return { bgColor, textColor };
    };
    
    const getStatusLabel = (status: string) => {
      switch (status) {
        case 'for_sale': return 'For Sale';
        case 'for_rent': return 'For Rent';
        case 'pending': return 'Pending';
        case 'sold': return 'Sold';
        default: return status;
      }
    };
    
    return (
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#E2E8F0' }}>
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-md mr-3" style={{ backgroundColor: colors.accent }}>
            <Home size={18} style={{ color: colors.primary }} />
          </div>
          <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{t("Featured Listings")}</h3>
          <div className="ml-3 flex-grow h-1" style={{ 
            background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
            borderRadius: '4px'
          }}></div>
        </div>
        
        <div className="space-y-4">
          {properties.map((property: any, index: number) => {
            const statusStyle = getStatusBadge(property.status);
            
            return (
              <div 
                key={index} 
                className="rounded-lg overflow-hidden shadow-md"
                style={{ backgroundColor: colors.cardBg || '#F7FAFC' }}
                onClick={() => property.listing_url && typeof window !== "undefined" && window.open(property.listing_url, '_blank', 'noopener,noreferrer')}
              >
                <div className="relative h-40">
                  {property.image ? (
                    <img src={property.image} alt={property.address} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
                      <Home size={40} style={{ color: colors.primary }} />
                    </div>
                  )}
                  
                  {/* Status badge */}
                  <div 
                    className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium"
                    style={{ 
                      backgroundColor: statusStyle.bgColor,
                      color: statusStyle.textColor
                    }}
                  >
                    {getStatusLabel(property.status)}
                  </div>
                  
                  {/* Price */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 px-3 py-2"
                    style={{ 
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      color: '#FFFFFF'
                    }}
                  >
                    <p className="font-bold" style={{ fontFamily: font }}>{property.price}</p>
                  </div>
                </div>
                
                <div className="p-3">
                  <h4 className="font-medium text-sm mb-2" style={{ color: colors.text, fontFamily: font }}>
                    {property.address}
                  </h4>
                  
                  <div className="flex justify-between mb-2">
                    {property.bedrooms && (
                      <div className="text-center">
                        <p className="text-xs" style={{ color: colors.text + '80' }}>{t("Beds")}</p>
                        <p className="font-bold text-sm" style={{ color: colors.primary }}>{property.bedrooms}</p>
                      </div>
                    )}
                    
                    {property.bathrooms && (
                      <div className="text-center">
                        <p className="text-xs" style={{ color: colors.text + '80' }}>{t("Baths")}</p>
                        <p className="font-bold text-sm" style={{ color: colors.primary }}>{property.bathrooms}</p>
                      </div>
                    )}
                    
                    {property.sqft && (
                      <div className="text-center">
                        <p className="text-xs" style={{ color: colors.text + '80' }}>{t("Sq.Ft")}</p>
                        <p className="font-bold text-sm" style={{ color: colors.primary }}>{property.sqft}</p>
                      </div>
                    )}
                  </div>
                  
                  {property.description && (
                    <p className="text-xs mt-2" style={{ color: colors.text + 'CC', fontFamily: font }}>
                      {property.description.length > 100 
                        ? property.description.substring(0, 100) + '...' 
                        : property.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderServicesSection = (servicesData: any) => {
    const services = servicesData.service_list || [];
    if (!Array.isArray(services) || services.length === 0) return null;
    
    const getServiceIcon = (icon: string) => {
      switch (icon) {
        case 'home': return <Home size={24} />;
        case 'building': return <Building size={24} />;
        case 'key': return <Key size={24} />;
        case 'dollar': return <DollarSign size={24} />;
        case 'chart': return <BarChart size={24} />;
        case 'search': return <Search size={24} />;
        case 'handshake': return <Handshake size={24} />;
        default: return <Briefcase size={24} />;
      }
    };
    
    return (
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#E2E8F0' }}>
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-md mr-3" style={{ backgroundColor: colors.accent }}>
            <Briefcase size={18} style={{ color: colors.primary }} />
          </div>
          <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{t("Services")}</h3>
          <div className="ml-3 flex-grow h-1" style={{ 
            background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
            borderRadius: '4px'
          }}></div>
        </div>
        
        <div className="space-y-4">
          {services.map((service: any, index: number) => (
            <div key={index} className="flex">
              <div className="mr-3 p-3 rounded-full" style={{ backgroundColor: colors.accent }}>
                <div style={{ color: colors.primary }}>
                  {getServiceIcon(service.icon)}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-sm" style={{ color: colors.text, fontFamily: font }}>
                  {service.title}
                </h4>
                {service.description && (
                  <p className="text-xs mt-1" style={{ color: colors.text + 'CC', fontFamily: font }}>
                    {service.description}
                  </p>
                )}
              </div>
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
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#E2E8F0' }}>
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-md mr-3" style={{ backgroundColor: colors.accent }}>
            <Video size={18} style={{ color: colors.primary }} />
          </div>
          <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{t("Property Videos")}</h3>
          <div className="ml-3 flex-grow h-1" style={{ 
            background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
            borderRadius: '4px'
          }}></div>
        </div>
        
        <div className="space-y-4">
          {videoContent.map((video: any) => (
            <div key={video.key} className="rounded-lg overflow-hidden shadow-md" style={{ backgroundColor: colors.cardBg }}>
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
                      alt={video.title || 'Property video'} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center" 
                        style={{ backgroundColor: colors.primary }}
                      >
                        <Play className="w-8 h-8 ml-1 text-white" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-40 flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
                    <div className="text-center">
                      <Video className="w-12 h-12 mx-auto mb-2" style={{ color: colors.primary }} />
                      <span className="text-sm font-medium" style={{ color: colors.primary, fontFamily: font }}>{t("Property Tour")}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h4 className="font-medium text-base mb-2" style={{ color: colors.text, fontFamily: font }}>
                  {video.title}
                </h4>
                {video.description && (
                  <p className="text-sm mb-3" style={{ color: colors.text + 'CC', fontFamily: font }}>
                    {video.description}
                  </p>
                )}
                <div className="flex justify-between items-center">
                  {video.duration && (
                    <span className="text-xs" style={{ color: colors.text + '80', fontFamily: font }}>
                      ⏱️ {video.duration}
                    </span>
                  )}
                  {video.property_type && (
                    <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: colors.accent, color: colors.primary, fontFamily: font }}>
                      🏠 {video.property_type}
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
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#E2E8F0' }}>
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-md mr-3" style={{ backgroundColor: colors.accent }}>
            <Youtube size={18} style={{ color: colors.primary }} />
          </div>
          <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{t("YouTube Channel")}</h3>
          <div className="ml-3 flex-grow h-1" style={{ 
            background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
            borderRadius: '4px'
          }}></div>
        </div>
        
        {youtubeData.latest_video_embed && (
          <div className="mb-4 rounded-lg overflow-hidden" style={{ backgroundColor: colors.cardBg }}>
            <div className="p-3 mb-2">
              <h4 className="font-semibold text-sm flex items-center" style={{ color: colors.text, fontFamily: font }}>
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
                  'Latest Property Video'
                )}
              />
            </div>
          </div>
        )}
        
        <div className="p-4 rounded-lg" style={{ backgroundColor: colors.cardBg }}>
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-lg bg-red-600 flex items-center justify-center mr-4">
              <Youtube className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-base" style={{ color: colors.text, fontFamily: font }}>
                {youtubeData.channel_name || 'Real Estate Channel'}
              </h4>
              {youtubeData.subscriber_count && (
                <p className="text-sm" style={{ color: colors.text + 'CC', fontFamily: font }}>
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
                🏠 {t("PROPERTY TOURS")}
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
    
    
    const getTransactionLabel = (type: string) => {
      switch (type) {
        case 'buyer': return 'Buyer';
        case 'seller': return 'Seller';
        case 'both': return 'Buyer & Seller';
        case 'rental': return 'Rental';
        default: return type;
      }
    };
    
    return (
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#E2E8F0' }}>
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-md mr-3" style={{ backgroundColor: colors.accent }}>
            <Star size={18} style={{ color: colors.primary }} />
          </div>
          <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{t("Client Testimonials")}</h3>
          <div className="ml-3 flex-grow h-1" style={{ 
            background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
            borderRadius: '4px'
          }}></div>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-600 ease-in-out"
              style={{ transform: `translateX(-${currentReview * 100}%)` }}
            >
              {reviews.map((review: any, index: number) => (
                <div key={index} className="w-full flex-shrink-0 px-1">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: colors.accent, fontFamily: font }}>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          fill={i < parseInt(review.rating || 5) ? colors.primary : 'transparent'} 
                          stroke={i < parseInt(review.rating || 5) ? colors.primary : colors.text + '40'} 
                        />
                      ))}
                      
                      {review.transaction_type && (
                        <Badge 
                          variant="outline" 
                          className="ml-2 text-xs" 
                          style={{ borderColor: colors.primary, color: colors.primary }}
                        >
                          {getTransactionLabel(review.transaction_type)}
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm mb-2" style={{ color: colors.text }}>{review.review}</p>
                    <p className="text-xs font-medium" style={{ color: colors.primary }}>- {review.client_name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {reviews.length > 1 && (
            <div className="flex justify-center mt-3 space-x-2">
              {reviews.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full transition-colors"
                  style={{ 
                    backgroundColor: currentReview === index ? colors.primary : colors.primary + '40'
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
    const socialLinks = socialData.social_links || [];
    if (!Array.isArray(socialLinks) || socialLinks.length === 0) return null;
    
    return (
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#E2E8F0' }}>
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-md mr-3" style={{ backgroundColor: colors.accent }}>
            <Globe size={18} style={{ color: colors.primary }} />
          </div>
          <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{t("Connect With Me")}</h3>
          <div className="ml-3 flex-grow h-1" style={{ 
            background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
            borderRadius: '4px'
          }}></div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {socialLinks.map((link: any, index: number) => (
            <Button 
              key={index} 
              variant="outline" 
              className="flex items-center justify-center py-2"
              style={{ 
                borderColor: colors.primary, 
                color: colors.primary, 
                fontFamily: font 
              }}
              onClick={() => link.url && typeof window !== "undefined" && window.open(link.url, '_blank', 'noopener,noreferrer')}
            >
              <SocialIcon platform={link.platform} color={colors.primary} />
              <span className="ml-2 text-sm capitalize">{link.platform}</span>
            </Button>
          ))}
        </div>
      </div>
    );
  };

  const renderAppointmentsSection = (appointmentsData: any) => {
    return (
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#E2E8F0' }}>
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-md mr-3" style={{ backgroundColor: colors.accent }}>
            <Calendar size={18} style={{ color: colors.primary }} />
          </div>
          <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{t("Schedule an Appointment")}</h3>
          <div className="ml-3 flex-grow h-1" style={{ 
            background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
            borderRadius: '4px'
          }}></div>
        </div>
        
        <div className="space-y-3">
          <Button 
            className="w-full" 
            style={{ 
              backgroundColor: colors.primary, 
              color: 'white', 
              fontFamily: font 
            }}
            onClick={() => handleAppointmentBooking(configSections.appointments)}
          >
            <Calendar className="w-4 h-4 mr-2" />
            {t("Schedule Appointment")}
          </Button>
          
          {appointmentsData.appointment_types && (
            <div className="mt-3">
              <p className="text-xs font-medium mb-2" style={{ color: colors.text, fontFamily: font }}>Available for:</p>
              <div className="flex flex-wrap gap-1">
                {appointmentsData.appointment_types.split(',').map((type: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs" style={{ backgroundColor: colors.accent, color: colors.primary }}>
                    {type.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {appointmentsData.appointment_notes && (
            <p className="text-xs mt-2" style={{ color: colors.text + 'CC', fontFamily: font }}>
              {appointmentsData.appointment_notes}
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderLocationSection = (locationData: any) => {
    if (!locationData.map_embed_url && !locationData.directions_url) return null;
    
    return (
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#E2E8F0' }}>
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-md mr-3" style={{ backgroundColor: colors.accent }}>
            <MapPin size={18} style={{ color: colors.primary }} />
          </div>
          <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{t("Office Location")}</h3>
          <div className="ml-3 flex-grow h-1" style={{ 
            background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
            borderRadius: '4px'
          }}></div>
        </div>
        
        <div className="space-y-3">
          {locationData.map_embed_url && (
            <div className="rounded overflow-hidden h-48">
              <div dangerouslySetInnerHTML={{ __html: locationData.map_embed_url }} className="w-full h-full" />
            </div>
          )}
          
          {locationData.directions_url && (
            <Button 
              className="w-full" 
              variant="outline"
              style={{ 
                borderColor: colors.primary, 
                color: colors.primary, 
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

  const renderMarketStatsSection = (statsData: any) => {
    if (!statsData.area_served) return null;
    
    return (
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#E2E8F0' }}>
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-md mr-3" style={{ backgroundColor: colors.accent }}>
            <BarChart size={18} style={{ color: colors.primary }} />
          </div>
          <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{t("Market Statistics")}</h3>
          <div className="ml-3 flex-grow h-1" style={{ 
            background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
            borderRadius: '4px'
          }}></div>
        </div>
        
        <div className="space-y-3">
          <div className="p-3 rounded-lg" style={{ backgroundColor: colors.accent, fontFamily: font }}>
            <h4 className="font-medium text-sm mb-2" style={{ color: colors.primary }}>
              {statsData.area_served}
            </h4>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              {statsData.avg_home_price && (
                <div className="p-2 rounded" style={{ backgroundColor: 'white' }}>
                  <p className="text-xs" style={{ color: colors.text + '80' }}>{t("Avg. Home Price")}</p>
                  <p className="font-bold text-sm" style={{ color: colors.primary }}>{statsData.avg_home_price}</p>
                </div>
              )}
              
              {statsData.avg_days_on_market && (
                <div className="p-2 rounded" style={{ backgroundColor: 'white' }}>
                  <p className="text-xs" style={{ color: colors.text + '80' }}>{t("Avg. Days on Market")}</p>
                  <p className="font-bold text-sm" style={{ color: colors.primary }}>{statsData.avg_days_on_market}</p>
                </div>
              )}
            </div>
            
            {statsData.market_description && (
              <p className="text-xs" style={{ color: colors.text }}>
                {statsData.market_description}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderAppDownloadSection = (appData: any) => {
    if (!appData.app_store_url && !appData.play_store_url) return null;
    
    return (
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#E2E8F0' }}>
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-md mr-3" style={{ backgroundColor: colors.accent }}>
            <Smartphone size={18} style={{ color: colors.primary }} />
          </div>
          <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{t("Download Our App")}</h3>
          <div className="ml-3 flex-grow h-1" style={{ 
            background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
            borderRadius: '4px'
          }}></div>
        </div>
        
        <div className="space-y-3">
          {appData.app_description && (
            <p className="text-sm" style={{ color: colors.text, fontFamily: font }}>
              {appData.app_description}
            </p>
          )}
          
          <div className="grid grid-cols-2 gap-2">
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
                <Download className="w-4 h-4 mr-2" />
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
                <Download className="w-4 h-4 mr-2" />
                {t("Play Store")}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderContactFormSection = (formData: any) => {
    if (!formData.form_title) return null;
    
    return (
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#E2E8F0' }}>
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-md mr-3" style={{ backgroundColor: colors.accent }}>
            <Mail size={18} style={{ color: colors.primary }} />
          </div>
          <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{formData.form_title}</h3>
          <div className="ml-3 flex-grow h-1" style={{ 
            background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
            borderRadius: '4px'
          }}></div>
        </div>
        
        <div className="space-y-3">
          {formData.form_description && (
            <p className="text-sm" style={{ color: colors.text, fontFamily: font }}>
              {formData.form_description}
            </p>
          )}
          
          <Button 
            className="w-full" 
            style={{ 
              backgroundColor: colors.primary, 
              color: 'white', 
              fontFamily: font 
            }}
            onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            {t("Send Message")}
          </Button>
        </div>
      </div>
    );
  };

  const renderCustomHtmlSection = (customHtmlData: any) => {
    if (!customHtmlData.html_content) return null;
    
    return (
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#E2E8F0' }}>
        {customHtmlData.show_title && customHtmlData.section_title && (
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-md mr-3" style={{ backgroundColor: colors.accent }}>
              <Home size={18} style={{ color: colors.primary }} />
            </div>
            <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{customHtmlData.section_title}</h3>
            <div className="ml-3 flex-grow h-1" style={{ 
              background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
              borderRadius: '4px'
            }}></div>
          </div>
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
                background-color: ${colors.accent};
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
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#E2E8F0' }}>
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-md mr-3" style={{ backgroundColor: colors.accent }}>
            <QrCode size={18} style={{ color: colors.primary }} />
          </div>
          <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{t("Share QR Code")}</h3>
          <div className="ml-3 flex-grow h-1" style={{ 
            background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
            borderRadius: '4px'
          }}></div>
        </div>
        <div className="text-center p-4 rounded-lg" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.borderColor}` }}>
          {qrData.qr_title && (
            <h4 className="font-medium text-base mb-2" style={{ color: colors.text, fontFamily: font }}>
              {qrData.qr_title}
            </h4>
          )}
          
          {qrData.qr_description && (
            <p className="text-sm mb-4" style={{ color: colors.text + 'CC', fontFamily: font }}>
              {qrData.qr_description}
            </p>
          )}
          
          <Button 
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
    );
  };

  const renderThankYouSection = (thankYouData: any) => {
    if (!thankYouData.message) return null;
    
    return (
      <div className="px-6 py-4 text-center border-b" style={{ borderColor: colors.borderColor || '#E2E8F0' }}>
        <p className="text-sm italic" style={{ color: colors.text, fontFamily: font }}>
          {thankYouData.message}
        </p>
      </div>
    );
  };

  const renderCopyrightSection = (copyrightData: any) => {
    if (!copyrightData.text) return null;
    
    return (
      <div className="px-6 py-4 text-center">
        <p className="text-xs" style={{ color: colors.text + '80', fontFamily: font }}>
          {copyrightData.text}
        </p>
        
        {copyrightData.disclaimer && (
          <p className="text-xs mt-2" style={{ color: colors.text + '60', fontFamily: font }}>
            {copyrightData.disclaimer}
          </p>
        )}
      </div>
    );
  };
  
  // Extract copyright section to render it at the end
  const copyrightSection = configSections.copyright;
  
  // Get ordered sections using the utility function
  const orderedSectionKeys = getSectionOrder(data.template_config || { sections: configSections, sectionSettings: configSections }, allSections);
    
  return (
    <div className="w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-lg" style={{ 
      fontFamily: font,
      background: colors.background || '#FFFFFF',
      color: colors.text || '#2D3748'
    }}>
      {orderedSectionKeys
        .filter(key => key !== 'colors' && key !== 'font' && key !== 'copyright')
        .map((sectionKey) => (
          <React.Fragment key={sectionKey}>
            {renderSection(sectionKey)}
          </React.Fragment>
        ))}
      
      <div className="p-6 space-y-3">
        <Button 
          className="w-full" 
          style={{ 
            backgroundColor: colors.primary, 
            color: 'white', 
            fontFamily: font 
          }}
          onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          {t("Contact Me")}
        </Button>
        
        <Button 
          className="w-full" 
          variant="outline"
          style={{ 
            borderColor: colors.primary, 
            color: colors.primary, 
            fontFamily: font 
          }}
          onClick={() => handleAppointmentBooking(configSections.appointments)}
        >
          <Calendar className="w-4 h-4 mr-2" />
          {t("Schedule Showing")}
        </Button>
        
        <Button 
          className="w-full" 
          variant="outline"
          style={{ 
            borderColor: colors.secondary, 
            color: colors.secondary, 
            fontFamily: font 
          }}
          onClick={() => {
            const contactData = {
              name: data.name || configSections.header?.name || '',
              title: data.title || configSections.header?.title || '',
              email: data.email || configSections.contact?.email || '',
              phone: data.phone || configSections.contact?.phone || '',
              website: data.website || configSections.contact?.website || '',
              address: configSections.contact?.office_address || ''
            };
            import('@/utils/vcfGenerator').then(module => {
                  module.downloadVCF(contactData);
                });
          }}
        >
          <Save className="w-4 h-4 mr-2" />
          {t("Save Contact")}
        </Button>
      </div>
      
      {/* Copyright always at the end */}
      {copyrightSection && copyrightSection.text && (
        <div className="px-6 pb-4 text-center">
          <p className="text-xs" style={{ color: colors.text + '60', fontFamily: font }}>
            {copyrightSection.text}
          </p>
          
          {copyrightSection.disclaimer && (
            <p className="text-xs mt-2" style={{ color: colors.text + '60', fontFamily: font }}>
              {copyrightSection.disclaimer}
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