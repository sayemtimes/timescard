import { handleAppointmentBooking } from '../VCardPreview';
import React, { useState } from 'react';
import StableHtmlContent from '@/components/StableHtmlContent';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ensureRequiredSections } from '@/utils/ensureRequiredSections';
import { VideoEmbed, extractVideoUrl } from '@/components/VideoEmbed';
import { createYouTubeEmbedRef } from '@/utils/youtubeEmbedUtils';
import { useTranslation } from 'react-i18next';
import { 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Instagram, 
  Facebook, 
  Twitter, 
  Clock, 
  Calendar, 
  Coffee, 
  Utensils, 
  Star, 
  ChevronRight, 
  UserPlus,
  ExternalLink,
  Menu,
  Image,
  MessageSquare,
  Video,
  Play,
  Youtube,
  QrCode
} from 'lucide-react';
import SocialIcon from '../../../link-bio-builder/components/SocialIcon';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionOrder, isSectionEnabled, getSectionData } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';
import languageData from '@/../../resources/lang/language.json';

interface CafeTemplateProps {
  data: any;
  template: any;
}

export default function CafeTemplate({ data, template }: CafeTemplateProps) {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
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
      
      const videoData = video.embed_url ? extractVideoUrl(video.embed_url) : null;
      return { ...video, videoData, key: `video-${index}-${video.title || ''}-${video.embed_url || ''}` };
    });
  }, [configSections.videos?.video_list]);
  
  const colors = configSections.colors || template?.defaultColors || { 
    primary: '#6F4E37', 
    secondary: '#A67C52', 
    accent: '#F5EEE6', 
    background: '#FFFFFF', 
    text: '#3A3A3A',
    cardBg: '#FFFBF5',
    borderColor: '#E8E0D8',
    buttonText: '#FFFFFF',
    highlightColor: '#C9A66B'
  };
  const font = configSections.font || template?.defaultFont || 'Poppins, sans-serif';
  
  // Get all sections for this business type
  const allSections = getBusinessTemplate('cafe')?.sections || [];

  const renderSection = (sectionKey: string) => {
    const sectionData = configSections[sectionKey] || {};
    if (!sectionData || Object.keys(sectionData).length === 0 || sectionData.enabled === false) return null;
    
    switch (sectionKey) {
      case 'header':
        return renderHeaderSection(sectionData);
      case 'about':
        return renderAboutSection(sectionData);
      case 'menu_highlights':
        return renderMenuHighlightsSection(sectionData);
      case 'specials':
        return renderSpecialsSection(sectionData);
      case 'contact':
        return renderContactSection(sectionData);
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

  const renderHeaderSection = (headerData: any) => (
    <div className="relative">
      {/* Cover Image */}
      <div className="relative h-40 overflow-hidden rounded-t-2xl">
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
          ></div>
        )}
        
        {/* Overlay */}
        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
        ></div>
        
        {/* Logo */}
        {headerData.logo && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div 
              className="w-20 h-20 rounded-full overflow-hidden border-4" 
              style={{ 
                borderColor: colors.background,
                backgroundColor: colors.background
              }}
            >
              <img 
                src={headerData.logo} 
                alt={headerData.name} 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Cafe Name and Tagline */}
      <div 
        className="pt-12 pb-4 px-5 text-center" 
        style={{ backgroundColor: colors.background }}
      >
        <h1 
          className="text-2xl font-bold mb-1" 
          style={{ 
            color: colors.primary,
            fontFamily: font
          }}
        >
          {headerData.name || data.name || 'Brew & Bean Cafe'}
        </h1>
        
        {headerData.tagline && (
          <p 
            className="text-sm italic" 
            style={{ color: colors.text }}
          >
            {headerData.tagline}
          </p>
        )}
      </div>
      

      
      {/* Quick Action Buttons */}
      <div 
        className="px-5 pb-4 flex justify-center space-x-3" 
        style={{ backgroundColor: colors.background }}
      >
        {configSections.contact?.phone && (
          <a 
            href={`tel:${configSections.contact?.phone}`} 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText
            }}
          >
            <Phone size={16} />
          </a>
        )}
        
        {configSections.contact?.address && (
          <a 
            href={configSections.google_map?.directions_url || `https://maps.google.com/?q=${encodeURIComponent(configSections.contact?.address)}`} 
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText
            }}
          >
            <MapPin size={16} />
          </a>
        )}
        
        <button 
          onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ 
            backgroundColor: colors.primary,
            color: colors.buttonText
          }}
        >
          <MessageSquare size={16} />
        </button>
        
        {/* Language Selector beside MessageSquare */}
        {configSections.language && (
          <div className="relative">
            <button
              onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ 
                backgroundColor: colors.primary,
                color: colors.buttonText
              }}
            >
              <span className="text-sm">{String.fromCodePoint(...(languageData.find(lang => lang.code === currentLanguage)?.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt()) || []))}</span>
            </button>
            
            {showLanguageSelector && (
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-2xl border-2 py-2 min-w-[160px] max-h-48 overflow-y-auto z-[999999]" style={{ borderColor: colors.primary }}>
                {languageData.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center space-x-3 ${
                      currentLanguage === lang.code ? 'font-semibold' : ''
                    }`}
                    style={{
                      backgroundColor: currentLanguage === lang.code ? colors.accent : 'transparent',
                      color: currentLanguage === lang.code ? colors.primary : colors.text
                    }}
                  >
                    <span className="text-lg">{String.fromCodePoint(...lang.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt()))}</span>
                    <span>{lang.name}</span>
                    {currentLanguage === lang.code && <Coffee size={14} style={{ color: colors.primary }} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Divider */}
      <div 
        className="h-2" 
        style={{ backgroundColor: colors.accent }}
      ></div>
      
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
          borderBottom: `8px solid ${colors.accent}`
        }}
      >
        <div className="flex items-center mb-4">
          <Coffee 
            size={18} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-lg font-semibold" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t('Our Story')}
          </h2>
        </div>
        
        <p 
          className="text-sm leading-relaxed mb-4" 
          style={{ color: colors.text }}
        >
          {aboutData.description || data.description}
        </p>
        
        <div className="flex justify-between">
          {aboutData.year_established && (
            <div className="text-center">
              <p 
                className="text-xs" 
                style={{ color: colors.text + '80' }}
              >
                {t('ESTABLISHED')}
              </p>
              <p 
                className="text-lg font-bold" 
                style={{ color: colors.primary }}
              >
                {aboutData.year_established}
              </p>
            </div>
          )}
          
          {aboutData.atmosphere && (
            <div className="text-center">
              <p 
                className="text-xs" 
                style={{ color: colors.text + '80' }}
              >
                {t('ATMOSPHERE')}
              </p>
              <p 
                className="text-sm capitalize" 
                style={{ color: colors.primary }}
              >
                {aboutData.atmosphere.replace('_', ' ')}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderMenuHighlightsSection = (menuData: any) => {
    const items = menuData.items || [];
    const categories = menuData.categories || [];
    if (!Array.isArray(items) || items.length === 0) return null;
    
    // Get categories from data or fallback to unique item categories
    const categoryOptions = categories.length > 0 
      ? ['all', ...categories.map((cat: any) => cat.value)]
      : ['all', ...new Set(items.map((item: any) => item.category))];
    
    const getCategoryLabel = (value: string) => {
      if (value === 'all') return 'all';
      const category = categories.find((cat: any) => cat.value === value);
      return category ? category.label : value;
    };
    
    // Filter items by active category
    const filteredItems = activeCategory === 'all' 
      ? items 
      : items.filter((item: any) => item.category === activeCategory);
    
    const getDietaryBadge = (dietary: string) => {
      if (dietary === 'none' || !dietary) return null;
      
      const dietaryLabels: Record<string, { bg: string, text: string, label: string }> = {
        'vegetarian': { bg: '#E8F5E9', text: '#2E7D32', label: 'V' },
        'vegan': { bg: '#E8F5E9', text: '#1B5E20', label: 'VG' },
        'gluten_free': { bg: '#FFF8E1', text: '#F57F17', label: 'GF' },
        'dairy_free': { bg: '#E1F5FE', text: '#0277BD', label: 'DF' },
        'nut_free': { bg: '#F3E5F5', text: '#7B1FA2', label: 'NF' }
      };
      
      const style = dietaryLabels[dietary] || { bg: '#F5F5F5', text: '#757575', label: dietary.slice(0, 2).toUpperCase() };
      
      return (
        <span 
          className="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 ml-2 rounded-full text-xs font-medium leading-none"
          style={{ 
            backgroundColor: style.bg,
            color: style.text,
            fontSize: '10px'
          }}
          title={dietary.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        >
          {style.label}
        </span>
      );
    };
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.cardBg,
          borderBottom: `8px solid ${colors.accent}`
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Utensils 
              size={18} 
              className="mr-2" 
              style={{ color: colors.primary }}
            />
            <h2 
              className="text-lg font-semibold" 
              style={{ 
                color: colors.primary,
                fontFamily: font
              }}
            >
              {t('Menu Highlights')}
            </h2>
          </div>
          
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-7"
            style={{ 
              borderColor: colors.primary,
              color: colors.primary
            }}
            onClick={() => typeof window !== "undefined" && window.open(configSections.contact?.website, "_blank", "noopener,noreferrer")}
          >
            {t('Full Menu')}
            <ExternalLink size={12} className="ml-1" />
          </Button>
        </div>
        
        {/* Category filters */}
        <div className="flex overflow-x-auto pb-2 mb-4 hide-scrollbar">
          {categoryOptions.map((category: string) => (
            <button
              key={category}
              className={`text-xs py-1 px-3 mr-2 capitalize rounded-full whitespace-nowrap`}
              style={{ 
                backgroundColor: activeCategory === category ? colors.primary : colors.background,
                color: activeCategory === category ? '#FFFFFF' : colors.text,
                border: `1px solid ${activeCategory === category ? colors.primary : colors.borderColor}`
              }}
              onClick={() => setActiveCategory(category)}
            >
              {getCategoryLabel(category).replace('_', ' ')}
            </button>
          ))}
        </div>
        
        {/* Menu items */}
        <div className="space-y-4">
          {filteredItems.map((item: any, index: number) => (
            <div 
              key={index} 
              className="p-3 rounded-lg" 
              style={{ 
                backgroundColor: colors.background,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div className="flex">
                {/* Item Image */}
                {item.image && (
                  <div className="w-16 h-16 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* Item Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center flex-wrap">
                      <h3 
                        className="text-base font-medium" 
                        style={{ 
                          color: colors.primary,
                          fontFamily: font
                        }}
                      >
                        {item.name}
                      </h3>
                      {getDietaryBadge(item.dietary_info)}
                    </div>
                    <span 
                      className="text-sm font-semibold" 
                      style={{ color: colors.secondary }}
                    >
                      {item.price}
                    </span>
                  </div>
                  
                  {item.description && (
                    <p 
                      className="text-xs mt-1" 
                      style={{ color: colors.text + 'CC' }}
                    >
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSpecialsSection = (specialsData: any) => {
    const specials = specialsData.daily_specials || [];
    if (!Array.isArray(specials) || specials.length === 0) return null;
    
    // Get current day
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDay = days[new Date().getDay()];
    
    // Sort specials to put current day first
    const sortedSpecials = [...specials].sort((a, b) => {
      if (a.day === currentDay) return -1;
      if (b.day === currentDay) return 1;
      return 0;
    });
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `8px solid ${colors.accent}`
        }}
      >
        <div className="flex items-center mb-4">
          <Star 
            size={18} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-lg font-semibold" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t('Daily Specials')}
          </h2>
        </div>
        
        <div className="space-y-3">
          {sortedSpecials.map((special: any, index: number) => (
            <div 
              key={index} 
              className="p-3 rounded-lg" 
              style={{ 
                backgroundColor: special.day === currentDay ? colors.accent : colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <h3 
                      className="text-base font-medium" 
                      style={{ 
                        color: colors.primary,
                        fontFamily: font
                      }}
                    >
                      {special.special_name}
                    </h3>
                    
                    {special.day === currentDay && (
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
                  
                  <p 
                    className="text-xs capitalize" 
                    style={{ color: colors.text + '80' }}
                  >
                    {special.day}
                  </p>
                </div>
                
                <span 
                  className="text-sm font-semibold" 
                  style={{ color: colors.secondary }}
                >
                  {special.price}
                </span>
              </div>
              
              {special.description && (
                <p 
                  className="text-xs mt-2" 
                  style={{ color: colors.text + 'CC' }}
                >
                  {special.description}
                </p>
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
        borderBottom: `8px solid ${colors.accent}`
      }}
    >
      <div className="flex items-center mb-4">
        <MapPin 
          size={18} 
          className="mr-2" 
          style={{ color: colors.primary }}
        />
        <h2 
          className="text-lg font-semibold" 
          style={{ 
            color: colors.primary,
            fontFamily: font
          }}
        >
          {t('Find Us')}
        </h2>
      </div>
      
      <div className="space-y-3">
        {contactData.address && (
          <div 
            className="p-3 rounded-lg" 
            style={{ 
              backgroundColor: colors.background,
              border: `1px solid ${colors.borderColor}`
            }}
          >
            <p 
              className="text-xs" 
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
                className="text-xs flex items-center mt-2"
                style={{ color: colors.primary }}
              >
                {t('Get Directions')}
                <ChevronRight size={12} />
              </a>
            )}
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-3">
          {(contactData.phone || data.phone) && (
            <div 
              className="p-3 rounded-lg" 
              style={{ 
                backgroundColor: colors.background,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <p 
                className="text-xs" 
                style={{ color: colors.text + '80' }}
              >
                {t('PHONE')}
              </p>
              <a 
                href={`tel:${contactData.phone || data.phone}`} 
                className="text-sm" 
                style={{ color: colors.primary }}
              >
                {contactData.phone || data.phone}
              </a>
            </div>
          )}
          
          {(contactData.email || data.email) && (
            <div 
              className="p-3 rounded-lg" 
              style={{ 
                backgroundColor: colors.background,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <p 
                className="text-xs" 
                style={{ color: colors.text + '80' }}
              >
                {t('EMAIL')}
              </p>
              <a 
                href={`mailto:${contactData.email || data.email}`} 
                className="text-sm truncate block" 
                style={{ color: colors.primary }}
              >
                {contactData.email || data.email}
              </a>
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
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-transform hover:scale-105"
              style={{ 
                backgroundColor: colors.primary,
                color: '#FFFFFF'
              }}
            >
              <SocialIcon platform={link.platform} color="#FFFFFF" />
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
    
    // Find current day's hours
    const todayHours = hours.find(h => h.day === currentDay);
    const isOpenNow = todayHours && !todayHours.is_closed;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `8px solid ${colors.accent}`
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Clock 
              size={18} 
              className="mr-2" 
              style={{ color: colors.primary }}
            />
            <h2 
              className="text-lg font-semibold" 
              style={{ 
                color: colors.primary,
                fontFamily: font
              }}
            >
              {t('Hours')}
            </h2>
          </div>
          
          {isOpenNow ? (
            <Badge 
              style={{ 
                backgroundColor: '#4CAF50',
                color: '#FFFFFF'
              }}
            >
              {t('Open Now')}
            </Badge>
          ) : (
            <Badge 
              style={{ 
                backgroundColor: '#F44336',
                color: '#FFFFFF'
              }}
            >
              {t('Closed Now')}
            </Badge>
          )}
        </div>
        
        <div 
          className="p-3 rounded-lg" 
          style={{ 
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.borderColor}`
          }}
        >
          <div className="space-y-2">
            {hours.map((hour: any, index: number) => (
              <div 
                key={index} 
                className="flex justify-between items-center py-1"
                style={{ 
                  borderBottom: index < hours.length - 1 ? `1px solid ${colors.borderColor}` : 'none'
                }}
              >
                <span 
                  className="capitalize text-sm font-medium" 
                  style={{ 
                    color: hour.day === currentDay ? colors.primary : colors.text,
                    fontWeight: hour.day === currentDay ? 'bold' : 'normal'
                  }}
                >
                  {hour.day}
                </span>
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

  const renderGallerySection = (galleryData: any) => {
    const photos = galleryData.photos || [];
    if (!Array.isArray(photos) || photos.length === 0) return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.cardBg,
          borderBottom: `8px solid ${colors.accent}`
        }}
      >
        <div className="flex items-center mb-4">
          <Image 
            size={18} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-lg font-semibold" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t('Photo Gallery')}
          </h2>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {photos.map((photo: any, index: number) => (
            <div 
              key={index} 
              className="relative rounded-lg overflow-hidden aspect-square"
              style={{ 
                border: `1px solid ${colors.borderColor}`
              }}
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
                  style={{ backgroundColor: colors.accent }}
                >
                  <Coffee size={24} style={{ color: colors.primary }} />
                </div>
              )}
              
              {photo.caption && (
                <div 
                  className="absolute bottom-0 left-0 right-0 p-2 text-xs"
                  style={{ 
                    backgroundColor: 'rgba(0,0,0,0.6)',
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
          borderBottom: `8px solid ${colors.accent}`
        }}
      >
        <div className="flex items-center mb-4">
          <Video 
            size={18} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-lg font-semibold" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t('Cafe Videos')}
          </h2>
        </div>
        
        <div className="space-y-3">
          {videoContent.map((video: any) => (
            <div 
              key={video.key} 
              className="rounded-lg overflow-hidden" 
              style={{ 
                backgroundColor: colors.background,
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
                  <div className="relative w-full h-32">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title || 'Cafe video'} 
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
                      <span className="text-sm font-medium" style={{ color: colors.primary, fontFamily: font }}>{t("Cafe Experience")}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-base mb-2" style={{ color: colors.text, fontFamily: font }}>
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
                  {video.video_type && (
                    <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: colors.primary + '20', color: colors.primary, fontFamily: font }}>
                      ☕ {video.video_type.replace('_', ' ')}
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
          borderBottom: `8px solid ${colors.accent}`
        }}
      >
        <div className="flex items-center mb-4">
          <Youtube 
            size={18} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-lg font-semibold" 
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
          className="p-4 rounded-lg" 
          style={{ 
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.borderColor}`
          }}
        >
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 rounded-lg bg-red-600 flex items-center justify-center mr-3">
              <Youtube className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base" style={{ color: colors.text, fontFamily: font }}>
                {youtubeData.channel_name || 'Our Cafe'}
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
                ☕ {t("COFFEE TUTORIALS")}
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
          borderBottom: `8px solid ${colors.accent}`
        }}
      >
        <div className="flex items-center mb-4">
          <Star 
            size={18} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-lg font-semibold" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t('Customer Reviews')}
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
                    className="p-3 rounded-lg" 
                    style={{ 
                      backgroundColor: colors.cardBg,
                      border: `1px solid ${colors.borderColor}`
                    }}
                  >
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
                      className="text-sm italic mb-2" 
                      style={{ color: colors.text }}
                    >
                      "{review.review}"
                    </p>
                    
                    <p 
                      className="text-xs font-medium" 
                      style={{ color: colors.primary }}
                    >
                      - {review.customer_name}
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
    if (!appointmentsData.booking_url) return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.cardBg,
          borderBottom: `8px solid ${colors.accent}`
        }}
      >
        <div className="flex items-center mb-4">
          <Calendar 
            size={18} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-lg font-semibold" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t('Reservations')}
          </h2>
        </div>
        
        <div 
          className="p-4 rounded-lg text-center" 
          style={{ 
            backgroundColor: colors.background,
            border: `1px solid ${colors.borderColor}`
          }}
        >
          <p 
            className="text-sm mb-3" 
            style={{ color: colors.text }}
          >
            {appointmentsData.min_party_size && appointmentsData.max_party_size ? (
              `We accept reservations for parties of ${appointmentsData.min_party_size}-${appointmentsData.max_party_size} people.`
            ) : (
              'Reserve your table to avoid waiting.'
            )}
          </p>
          
          <Button
            className="w-full"
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText,
              fontFamily: font
            }}
            onClick={() => handleAppointmentBooking(configSections.appointments)}
          >
            <Calendar className="w-4 h-4 mr-2" />
            {appointmentsData.reservation_text || 'Reserve a Table'}
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
          backgroundColor: colors.background,
          borderBottom: `8px solid ${colors.accent}`
        }}
      >
        <div className="flex items-center mb-4">
          <MapPin 
            size={18} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-lg font-semibold" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {t('Location')}
          </h2>
        </div>
        
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
          backgroundColor: colors.cardBg,
          borderBottom: `8px solid ${colors.accent}`
        }}
      >
        <div className="flex items-center mb-4">
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
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          <h2 
            className="text-lg font-semibold" 
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
          backgroundColor: colors.background,
          borderBottom: `8px solid ${colors.accent}`
        }}
      >
        <div className="flex items-center mb-4">
          <Mail 
            size={18} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-lg font-semibold" 
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
          className="w-full"
          style={{ 
            backgroundColor: colors.primary,
            color: colors.buttonText,
            fontFamily: font
          }}
          onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
        >
          <Mail className="w-4 h-4 mr-2" />
          {t('Send Message')}
        </Button>
      </div>
    );
  };

  const renderThankYouSection = (thankYouData: any) => {
    if (!thankYouData.message) return null;
    
    return (
      <div 
        className="px-5 py-4" 
        style={{ backgroundColor: colors.cardBg }}
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
          borderBottom: `8px solid ${colors.accent}`
        }}
      >
        {customHtmlData.show_title && customHtmlData.section_title && (
          <div className="flex items-center mb-4">
            <Coffee 
              size={18} 
              className="mr-2" 
              style={{ color: colors.primary }}
            />
            <h2 
              className="text-lg font-semibold" 
              style={{ 
                color: colors.primary,
                fontFamily: font
              }}
            >
              {customHtmlData.section_title}
            </h2>
          </div>
        )}
        <div 
          className="custom-html-content p-3 rounded-lg" 
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
                color: ${colors.highlightColor};
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
          borderBottom: `8px solid ${colors.accent}`
        }}
      >
        <div className="flex items-center mb-4">
          <QrCode 
            size={18} 
            className="mr-2" 
            style={{ color: colors.primary }}
          />
          <h2 
            className="text-lg font-semibold" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {qrData.qr_title || t('Share QR Code')}
          </h2>
        </div>
        
        <div className="text-center p-4 rounded-lg" style={{ backgroundColor: colors.background, border: `1px solid ${colors.borderColor}` }}>
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
                className="text-xs px-3 py-1 rounded-full transition-colors"
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
          style={{ color: '#FFFFFF' }}
        >
          {copyrightData.text}
        </p>
      </div>
    );
  };

  // Get ordered sections using the utility function
  const orderedSectionKeys = getSectionOrder(data.template_config || { sections: configSections, sectionSettings: configSections }, allSections);
    
  // Create a style object that will be applied to all text elements
  const globalStyle = {
    fontFamily: font
  };
  
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
        
      {/* Save Contact Button */}
      <div className="p-5 border-t" style={{ borderColor: colors.borderColor || '#D7CCC8' }}>
        <Button 
          className="w-full" 
          variant="outline"
          style={{ 
            borderColor: colors.primary, 
            color: colors.primary, 
            fontFamily: font 
          }}
          onClick={() => {
            const contactData = {
              name: data.name || configSections.header?.name || '',
              title: configSections.header?.tagline || '',
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
}