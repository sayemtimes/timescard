import { handleAppointmentBooking } from '../VCardPreview';
import React from 'react';
import StableHtmlContent from '@/components/StableHtmlContent';
import { VideoEmbed, extractVideoUrl } from '@/components/VideoEmbed';
import { createYouTubeEmbedRef } from '@/utils/youtubeEmbedUtils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ensureRequiredSections } from '@/utils/ensureRequiredSections';
import { useTranslation } from 'react-i18next';
import { sanitizeVideoData } from '@/utils/secureVideoUtils';
import { 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  Clock, 
  Calendar, 
  Star, 
  Download, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  MessageSquare,
  Utensils,
  Coffee,
  Save,
  Video,
  Play,
  Share2,
  QrCode
} from 'lucide-react';
import SocialIcon from '../../../link-bio-builder/components/SocialIcon';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionOrder, isSectionEnabled, getSectionData } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';
import languageData from '@/../../resources/lang/language.json';

interface RestaurantTemplateProps {
  data: any;
  template: any;
}

export default function RestaurantTemplate({ data, template }: RestaurantTemplateProps) {
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
  const colors = configSections.colors || template?.defaultColors || { 
    primary: '#8B4513', 
    secondary: '#A0522D', 
    accent: '#FFD700', 
    background: '#FFF8E1', 
    text: '#3E2723' 
  };
  const font = configSections.font || template?.defaultFont || 'Playfair Display, serif';
  
  // Get all sections for this business type
  const allSections = getBusinessTemplate('restaurant')?.sections || [];

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
      let videoData = null;
      
      if (sanitizedVideo?.embed_url) {
        try {
          videoData = extractVideoUrl(sanitizedVideo.embed_url);
          // Debug logging for development
          if (process.env.NODE_ENV === 'development') {
            console.log('Video processing:', {
              original: sanitizedVideo.embed_url,
              processed: videoData
            });
          }
        } catch (error) {
          console.warn('Error processing video URL:', sanitizedVideo.embed_url, error);
        }
      }
      
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
      case 'business_hours':
        return renderBusinessHoursSection(sectionData);
      case 'menu_highlights':
        return renderMenuSection(sectionData);
      case 'services':
        return renderServicesSection(sectionData);
      case 'gallery':
        return renderGallerySection(sectionData);
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
    <div className="relative overflow-hidden">
      {/* Restaurant-themed Header with Menu-inspired Design */}
      <div className="relative">
        {/* Language Selector */}
        {configSections.language && (
          <div className={`absolute top-2 ${isRTL ? 'left-4' : 'right-4'} z-10`}>
            <div className="relative">
              <button
                onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                className="flex items-center space-x-1 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 shadow-md"
                style={{ 
                  backgroundColor: colors.accent,
                  border: `2px solid ${colors.primary}`,
                  color: colors.primary
                }}
              >
                <Utensils className="w-3 h-3" />
                <span>
                  {String.fromCodePoint(...(languageData.find(lang => lang.code === currentLanguage)?.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt()) || [127468, 127463]))}
                </span>
                <span className="uppercase font-bold">{currentLanguage}</span>
              </button>
              
              {showLanguageSelector && (
                <>
                  <div 
                    className="fixed inset-0" 
                    style={{ zIndex: 99998 }}
                    onClick={() => setShowLanguageSelector(false)}
                  />
                  <div 
                    className="absolute right-0 top-full mt-1 rounded-lg border shadow-xl py-1 w-40 max-h-48 overflow-y-auto"
                    style={{
                      backgroundColor: colors.background,
                      borderColor: colors.primary,
                      zIndex: 99999
                    }}
                  >
                    {languageData.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className="w-full text-left px-3 py-2 text-xs flex items-center space-x-2 hover:bg-gray-50 transition-colors"
                        style={{
                          backgroundColor: currentLanguage === lang.code ? colors.accent : 'transparent',
                          color: currentLanguage === lang.code ? colors.primary : colors.text,
                          fontFamily: font
                        }}
                      >
                        <span>
                          {String.fromCodePoint(...lang.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt()))}
                        </span>
                        <span className="truncate">{lang.name}</span>
                        {currentLanguage === lang.code && (
                          <Coffee className="w-3 h-3 ml-auto" style={{ color: colors.primary }} />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        
        {/* Decorative menu border */}
        <div className="h-4 w-full" style={{ 
          background: colors.accent,
          borderBottom: `2px solid ${colors.primary}`
        }}></div>
        
        {/* Main header with plate-like circular design */}
        <div className="relative bg-white pb-6">
          {/* Circular plate-like image container with centered logo */}
          <div className="relative mx-auto w-56 h-56 rounded-full overflow-hidden border-8 shadow-xl" 
            style={{ borderColor: colors.primary }}>
            {headerData.cover_image ? (
              <img 
                src={headerData.cover_image} 
                alt={t('Restaurant Cover')} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ 
                background: `radial-gradient(circle, ${colors.secondary}40, ${colors.primary}90)`,
              }}>
                <Utensils size={64} style={{ color: 'white' }} />
              </div>
            )}
            
            {/* Logo centered within the cover image */}
            {headerData.logo && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 bg-white shadow-lg"
                  style={{ borderColor: colors.primary }}>
                  <img src={headerData.logo} alt={t('Logo')} className="w-full h-full object-contain p-1" />
                </div>
              </div>
            )}
          </div>
          
          {/* Restaurant name and tagline */}
          <div className="text-center mt-6 px-6">
            <h1 className="text-3xl font-bold tracking-wide" 
              style={{ 
                fontFamily: font, 
                color: colors.primary,
                textShadow: '1px 1px 1px rgba(0,0,0,0.1)'
              }}>
              {headerData.name || data.name || t('La Bella Cucina')}
            </h1>
            
            {headerData.tagline && (
              <p className="text-sm mt-1 italic" 
                style={{ 
                  fontFamily: font,
                  color: colors.secondary
                }}>
                {headerData.tagline}
              </p>
            )}
            
            {/* Cuisine type with stars */}
            <div className="flex items-center justify-center mt-2">
              <p className="font-semibold text-sm" style={{ color: colors.text, fontFamily: font }}>
                {headerData.cuisine_type || t('Italian Cuisine')}
              </p>
              <div className="flex ml-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={12} fill={colors.accent} stroke={colors.accent} />
                ))}
              </div>
            </div>
            
            {/* Established year */}
            {headerData.year_established && (
              <p className="text-xs mt-1" style={{ color: colors.text + '80', fontFamily: font }}>
                {t('Established')} {headerData.year_established}
              </p>
            )}
            
            {/* Decorative utensils */}
            <div className="flex justify-center mt-3 space-x-8">
              <Coffee size={16} style={{ color: colors.primary + '80' }} />
              <Utensils size={16} style={{ color: colors.primary + '80' }} />
            </div>
          </div>
        </div>
        
        {/* Restaurant info bar */}
        <div className="relative px-6 py-3 flex items-center justify-center" 
          style={{ backgroundColor: colors.accent + '30', borderTop: `1px solid ${colors.primary}30` }}>
          <div className="flex items-center">
            <Coffee size={14} style={{ color: colors.primary, marginRight: '8px' }} />
            <span className="text-sm font-medium" style={{ color: colors.primary, fontFamily: font }}>
              {headerData.service_info || t('Open Daily • Dine-in • Takeout • Delivery')}
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
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#D7CCC8' }}>
        <div className="text-center mb-4">
          <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{t('About Us')}</h3>
          <div className="flex items-center justify-center mt-2">
            <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(-30deg)' }} />
            <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
            <Coffee size={16} style={{ color: colors.primary }} />
            <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
            <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(30deg)' }} />
          </div>
        </div>
        
        <div className="space-y-3">
          <p className="text-sm leading-relaxed" style={{ color: colors.text, fontFamily: font }}>
            {aboutData.description || data.description}
          </p>
          
          <div className="flex flex-wrap gap-4 mt-3">
            {aboutData.year_established && (
              <div className="flex flex-col items-center p-2 rounded-lg" style={{ backgroundColor: `${colors.primary}15` }}>
                <span className="text-xs" style={{ color: colors.text, fontFamily: font }}>{t('Established')}</span>
                <span className="font-bold" style={{ color: colors.primary, fontFamily: font }}>{aboutData.year_established}</span>
              </div>
            )}
            
            {aboutData.chef_name && (
              <div className="flex flex-col items-center p-2 rounded-lg" style={{ backgroundColor: `${colors.primary}15` }}>
                <span className="text-xs" style={{ color: colors.text, fontFamily: font }}>{t('Head Chef')}</span>
                <span className="font-bold" style={{ color: colors.primary, fontFamily: font }}>{aboutData.chef_name}</span>
              </div>
            )}
            
            {aboutData.ambiance && (
              <div className="flex flex-col items-center p-2 rounded-lg" style={{ backgroundColor: `${colors.primary}15` }}>
                <span className="text-xs" style={{ color: colors.text, fontFamily: font }}>{t('Ambiance')}</span>
                <span className="font-bold" style={{ color: colors.primary, fontFamily: font }}>
                  {aboutData.ambiance === 'fine_dining' ? 'Fine Dining' : 
                   aboutData.ambiance === 'casual' ? 'Casual' :
                   aboutData.ambiance === 'family' ? 'Family-Friendly' :
                   aboutData.ambiance === 'bistro' ? 'Bistro' :
                   aboutData.ambiance === 'cafe' ? 'Café' : aboutData.ambiance}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderContactSection = (contactData: any) => (
    <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#D7CCC8' }}>
      <div className="text-center mb-4">
        <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{t('Contact Information')}</h3>
        <div className="flex items-center justify-center mt-2">
          <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(-30deg)' }} />
          <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
          <Coffee size={16} style={{ color: colors.primary }} />
          <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
          <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(30deg)' }} />
        </div>
      </div>
      
      <div className="space-y-3">
        {(contactData.phone || data.phone) && (
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full" style={{ backgroundColor: `${colors.primary}15` }}>
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
            <div className="p-2 rounded-full" style={{ backgroundColor: `${colors.primary}15` }}>
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
            <div className="p-2 rounded-full" style={{ backgroundColor: `${colors.primary}15` }}>
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
        
        {contactData.address && (
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-full" style={{ backgroundColor: `${colors.primary}15` }}>
              <MapPin size={16} style={{ color: colors.primary }} />
            </div>
            <p 
              className="text-sm whitespace-pre-line"
              style={{ color: colors.text, fontFamily: font }}
            >
              {contactData.address}
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
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#D7CCC8' }}>
        <div className="text-center mb-4">
          <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{t('Business Hours')}</h3>
          <div className="flex items-center justify-center mt-2">
            <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(-30deg)' }} />
            <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
            <Clock size={16} style={{ color: colors.primary }} />
            <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
            <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(30deg)' }} />
          </div>
        </div>
        
        <div className="space-y-2">
          {hours.slice(0, 7).map((hour: any, index: number) => (
            <div key={index} className="flex justify-between items-center p-2 rounded" style={{ 
              backgroundColor: hour.is_closed ? `${colors.primary}10` : `${colors.primary}15`,
              fontFamily: font
            }}>
              <span className="capitalize font-medium text-sm" style={{ color: colors.text }}>
                {hour.day}
              </span>
              <span className="text-sm" style={{ color: hour.is_closed ? colors.text + '80' : colors.primary }}>
                {hour.is_closed ? t('Closed') : `${hour.open_time} - ${hour.close_time}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderServicesSection = (servicesData: any) => {
    const services = servicesData.service_list || [];
    if (!Array.isArray(services) || services.length === 0) return null;
    
    return (
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#D7CCC8' }}>
        <div className="text-center mb-4">
          <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{t('Our Services')}</h3>
          <div className="flex items-center justify-center mt-2">
            <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(-30deg)' }} />
            <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
            <Coffee size={16} style={{ color: colors.primary }} />
            <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
            <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(30deg)' }} />
          </div>
        </div>
        
        <div className="space-y-3">
          {services.map((service: any, index: number) => (
            <div key={index} className="p-3 rounded" style={{ backgroundColor: `${colors.primary}10`, fontFamily: font }}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-sm" style={{ color: colors.text }}>{service.title}</h4>
                  {service.description && (
                    <p className="text-xs mt-1" style={{ color: colors.text + 'CC' }}>{service.description}</p>
                  )}
                </div>
                {service.price && (
                  <span className="font-bold text-sm ml-2" style={{ color: colors.primary }}>{service.price}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMenuSection = (menuData: any) => {
    const menuItems = menuData.menu_items || [];
    if (!Array.isArray(menuItems) || menuItems.length === 0) return null;
    
    // Group menu items by category
    const categories: {[key: string]: any[]} = {};
    menuItems.forEach((item: any) => {
      const category = item.category || 'other';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(item);
    });
    
    return (
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#D7CCC8' }}>
        <div className="text-center mb-4">
          <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{t('Menu Highlights')}</h3>
          <div className="flex items-center justify-center mt-2">
            <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(-30deg)' }} />
            <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
            <Coffee size={16} style={{ color: colors.primary }} />
            <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
            <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(30deg)' }} />
          </div>
        </div>
        
        <div className="space-y-4">
          {Object.entries(categories).map(([category, items]) => (
            <div key={category} className="space-y-3">
              <h4 className="text-sm font-medium capitalize" style={{ color: colors.secondary, fontFamily: font }}>
                {category === 'appetizer' ? t('Appetizers') :
                 category === 'main' ? t('Main Courses') :
                 category === 'dessert' ? t('Desserts') :
                 category === 'beverage' ? t('Beverages') :
                 category === 'special' ? t('Chef\'s Specials') : category}
              </h4>
              
              {items.map((item: any, index: number) => (
                <div key={index} className="flex border-b pb-3" style={{ borderColor: `${colors.borderColor}50` }}>
                  {item.image ? (
                    <div className="w-16 h-16 rounded overflow-hidden mr-3">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded overflow-hidden mr-3 flex items-center justify-center" style={{ backgroundColor: `${colors.primary}15` }}>
                      <Utensils size={24} style={{ color: colors.primary }} />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h5 className="font-medium text-sm" style={{ color: colors.text, fontFamily: font }}>{item.name}</h5>
                      <span className="font-bold text-sm" style={{ color: colors.primary, fontFamily: font }}>{item.price}</span>
                    </div>
                    {item.description && (
                      <p className="text-xs mt-1" style={{ color: colors.text + 'CC', fontFamily: font }}>{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
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
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#D7CCC8' }}>
        <div className="text-center mb-4">
          <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{t('Photo Gallery')}</h3>
          <div className="flex items-center justify-center mt-2">
            <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(-30deg)' }} />
            <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
            <Coffee size={16} style={{ color: colors.primary }} />
            <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
            <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(30deg)' }} />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {photos.map((photo: any, index: number) => (
            <div key={index} className="relative rounded overflow-hidden h-32">
              {photo.image ? (
                <img src={photo.image} alt={photo.caption || `${t('Gallery')} ${index + 1}`} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: `${colors.primary}15` }}>
                  <Coffee size={32} style={{ color: colors.primary }} />
                </div>
              )}
              {photo.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-1">
                  <p className="text-xs text-white text-center" style={{ fontFamily: font }}>{photo.caption}</p>
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
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#D7CCC8' }}>
        <div className="text-center mb-4">
          <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{t('Restaurant Videos')}</h3>
          <div className="flex items-center justify-center mt-2">
            <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(-30deg)' }} />
            <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
            <Video size={16} style={{ color: colors.primary }} />
            <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
            <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(30deg)' }} />
          </div>
        </div>
        
        <div className="space-y-3">
          {videoContent.map((video: any) => (
            <div key={video.key} className="rounded overflow-hidden" style={{ backgroundColor: `${colors.primary}10` }}>
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
                ) : video.videoData && video.videoData.url ? (
                  <VideoEmbed
                    url={video.videoData.url}
                    title={video.title || t('Video')}
                    platform={video.videoData.platform}
                    colors={colors}
                  />
                ) : video.embed_url ? (
                  <div className="w-full h-32 flex items-center justify-center" style={{ backgroundColor: `${colors.primary}15` }}>
                    <div className="text-center">
                      <Video className="w-8 h-8 mx-auto mb-2" style={{ color: colors.primary }} />
                      <span className="text-xs" style={{ color: colors.primary, fontFamily: font }}>
                        {t('Video URL')}: {video.embed_url.substring(0, 50)}...
                      </span>
                    </div>
                  </div>
                ) : video.thumbnail ? (
                  <div className="relative w-full h-32">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title || t('Video thumbnail')} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white bg-opacity-90 flex items-center justify-center">
                        <Play className="w-6 h-6 ml-1" style={{ color: colors.primary }} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-32 flex items-center justify-center" style={{ backgroundColor: `${colors.primary}15` }}>
                    <div className="text-center">
                      <Video className="w-8 h-8 mx-auto mb-2" style={{ color: colors.primary }} />
                      <span className="text-xs" style={{ color: colors.primary, fontFamily: font }}>{t('Restaurant Video')}</span>
                      {process.env.NODE_ENV === 'development' && video.embed_url && (
                        <div className="mt-1 text-xs text-red-500">
                          Debug: Failed to process URL
                        </div>
                      )}
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
                  {video.video_type && (
                    <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: colors.accent, color: colors.primary, fontFamily: font }}>
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
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#D7CCC8' }}>
        <div className="text-center mb-4">
          <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{t('YouTube Channel')}</h3>
          <div className="flex items-center justify-center mt-2">
            <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(-30deg)' }} />
            <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
            <Youtube size={16} style={{ color: colors.primary }} />
            <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
            <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(30deg)' }} />
          </div>
        </div>
        
        <div className="rounded p-4" style={{ backgroundColor: `${colors.primary}10` }}>
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
              <h4 className="font-medium text-sm" style={{ color: colors.text, fontFamily: font }}>
                {youtubeData.channel_name || t('Our YouTube Channel')}
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
                {t('Visit Our Channel')}
              </Button>
            )}
            {youtubeData.featured_playlist && (
              <Button 
                variant="outline" 
                className="w-full" 
                style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}
                onClick={() => typeof window !== "undefined" && window.open(youtubeData.featured_playlist, '_blank', 'noopener,noreferrer')}
              >
                📋 {t('Featured Recipes')}
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
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#D7CCC8' }}>
        <div className="text-center mb-4">
          <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{t('Customer Reviews')}</h3>
          <div className="flex items-center justify-center mt-2">
            <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(-30deg)' }} />
            <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
            <Star size={16} style={{ color: colors.primary }} />
            <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
            <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(30deg)' }} />
          </div>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentReview * 100}%)` }}
            >
              {reviews.map((review: any, index: number) => (
                <div key={index} className="w-full flex-shrink-0 px-1">
                  <div className="p-3 rounded" style={{ backgroundColor: `${colors.primary}10`, fontFamily: font }}>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          fill={i < parseInt(review.rating || 5) ? colors.accent : 'transparent'} 
                          stroke={i < parseInt(review.rating || 5) ? colors.accent : colors.text + '40'} 
                        />
                      ))}
                      {review.date && (
                        <span className="text-xs ml-2" style={{ color: colors.text + '80' }}>{review.date}</span>
                      )}
                    </div>
                    <p className="text-sm mb-2" style={{ color: colors.text }}>"{review.review}"</p>
                    <p className="text-xs font-medium" style={{ color: colors.primary }}>- {review.customer_name}</p>
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

  const renderSocialSection = (socialData: any) => {
    const socialLinks = socialData.social_links || [];
    if (!Array.isArray(socialLinks) || socialLinks.length === 0) return null;
    
    return (
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#D7CCC8' }}>
        <div className="text-center mb-4">
          <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{t('Follow Us')}</h3>
          <div className="flex items-center justify-center mt-2">
            <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(-30deg)' }} />
            <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
            <Globe size={16} style={{ color: colors.primary }} />
            <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
            <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(30deg)' }} />
          </div>
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
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#D7CCC8' }}>
        <div className="text-center mb-4">
          <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{t('Reservations')}</h3>
          <div className="flex items-center justify-center mt-2">
            <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(-30deg)' }} />
            <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
            <Calendar size={16} style={{ color: colors.primary }} />
            <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
            <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(30deg)' }} />
          </div>
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
            {t('Make a Reservation')}
          </Button>
          
          {appointmentsData.reservation_notes && (
            <p className="text-xs" style={{ color: colors.text + 'CC', fontFamily: font }}>
              {appointmentsData.reservation_notes}
            </p>
          )}
          
          {appointmentsData.reservation_phone && (
            <div className="flex items-center justify-center space-x-2">
              <Phone size={14} style={{ color: colors.primary }} />
              <span className="text-sm" style={{ color: colors.text, fontFamily: font }}>
                {t('Call for reservations')}: <a href={`tel:${appointmentsData.reservation_phone}`} style={{ color: colors.primary }}>{appointmentsData.reservation_phone}</a>
              </span>
            </div>
          )}
          
          {(appointmentsData.min_party_size || appointmentsData.max_party_size) && (
            <div className="flex justify-center space-x-4">
              {appointmentsData.min_party_size && (
                <div className="text-center">
                  <span className="text-xs" style={{ color: colors.text + '80', fontFamily: font }}>{t('Min Party')}</span>
                  <p className="font-bold" style={{ color: colors.primary, fontFamily: font }}>{appointmentsData.min_party_size}</p>
                </div>
              )}
              {appointmentsData.max_party_size && (
                <div className="text-center">
                  <span className="text-xs" style={{ color: colors.text + '80', fontFamily: font }}>{t('Max Party')}</span>
                  <p className="font-bold" style={{ color: colors.primary, fontFamily: font }}>{appointmentsData.max_party_size}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderLocationSection = (locationData: any) => {
    if (!locationData.map_embed_url && !locationData.directions_url) return null;
    
    return (
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#D7CCC8' }}>
        <div className="text-center mb-4">
          <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{t('Location')}</h3>
          <div className="flex items-center justify-center mt-2">
            <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(-30deg)' }} />
            <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
            <MapPin size={16} style={{ color: colors.primary }} />
            <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
            <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(30deg)' }} />
          </div>
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
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#D7CCC8' }}>
        <div className="text-center mb-4">
          <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{t('Download Our App')}</h3>
          <div className="flex items-center justify-center mt-2">
            <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(-30deg)' }} />
            <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
            <Download size={16} style={{ color: colors.primary }} />
            <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
            <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(30deg)' }} />
          </div>
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
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#D7CCC8' }}>
        <div className="text-center mb-4">
          <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{formData.form_title}</h3>
          <div className="flex items-center justify-center mt-2">
            <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(-30deg)' }} />
            <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
            <MessageSquare size={16} style={{ color: colors.primary }} />
            <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
            <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(30deg)' }} />
          </div>
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
            {t("Contact Us")}
          </Button>
        </div>
      </div>
    );
  };

  const renderCustomHtmlSection = (customHtmlData: any) => {
    if (!customHtmlData.html_content) return null;
    
    return (
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#D7CCC8' }}>
        {customHtmlData.show_title && customHtmlData.section_title && (
          <div className="text-center mb-4">
            <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{customHtmlData.section_title}</h3>
            <div className="flex items-center justify-center mt-2">
              <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(-30deg)' }} />
              <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
              <Coffee size={16} style={{ color: colors.primary }} />
              <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
              <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(30deg)' }} />
            </div>
          </div>
        )}
        <div 
          className="custom-html-content p-4 rounded-lg" 
          style={{ 
            backgroundColor: colors.cardBg || '#FFFFFF',
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
                font-family: serif;
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
      <div className="px-6 py-4 border-b" style={{ borderColor: colors.borderColor || '#D7CCC8' }}>
        <div className="text-center mb-4">
          <h3 className="font-semibold" style={{ color: colors.primary, fontFamily: font }}>{t("Share QR Code")}</h3>
          <div className="flex items-center justify-center mt-2">
            <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(-30deg)' }} />
            <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
            <QrCode size={16} style={{ color: colors.primary }} />
            <div className="mx-3 h-px w-16" style={{ backgroundColor: colors.accent }}></div>
            <Utensils size={16} style={{ color: colors.primary, transform: 'rotate(30deg)' }} />
          </div>
        </div>
        <div className="text-center p-4 rounded-lg" style={{ backgroundColor: colors.cardBg || '#FFFFFF', border: `1px solid ${colors.borderColor}` }}>
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
      <div className="px-6 py-4 text-center border-b" style={{ borderColor: colors.borderColor || '#D7CCC8' }}>
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
      background: colors.background || '#FFF8E1',
      color: colors.text || '#3E2723'
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
          {t('Contact Us')}
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
          {t('Make a Reservation')}
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
              title: configSections.header?.cuisine_type || t('Restaurant'),
              email: data.email || configSections.contact?.email || '',
              phone: data.phone || configSections.contact?.phone || '',
              website: data.website || configSections.contact?.website || '',
              address: configSections.contact?.address || ''
            };
            import('@/utils/vcfGenerator').then(module => {
                  module.downloadVCF(contactData);
                });
          }}
        >
          <Save className="w-4 h-4 mr-2" />
          {t('Save Contact')}
        </Button>
      </div>
      
      {/* Copyright always at the end */}
      {copyrightSection && copyrightSection.text && (
        <div className="px-6 pb-4 text-center">
          <p className="text-xs" style={{ color: colors.text + '60', fontFamily: font }}>
            {copyrightSection.text}
          </p>
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