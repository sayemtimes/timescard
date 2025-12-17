import { handleAppointmentBooking } from '../VCardPreview';
import React, { useState } from 'react';
import StableHtmlContent from '@/components/StableHtmlContent';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ensureRequiredSections } from '@/utils/ensureRequiredSections';
import { VideoEmbed, extractVideoUrl } from '@/components/VideoEmbed';
import { createYouTubeEmbedRef } from '@/utils/youtubeEmbedUtils';
import { useTranslation } from 'react-i18next';
import { sanitizeVideoData } from '@/utils/secureVideoUtils';
import languageData from '@/../../resources/lang/language.json';
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
  Star, 
  ChevronRight, 
  UserPlus,
  ExternalLink,
  Image,
  MessageSquare,
  Cake,
  Utensils,
  ShoppingBag,
  Users,
  Video,
  Play,
  Youtube,
  QrCode
} from 'lucide-react';
import SocialIcon from '../../../link-bio-builder/components/SocialIcon';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionData } from '@/utils/sectionHelpers';
import { getSectionOrder } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';

interface BakeryTemplateProps {
  data: any;
  template: any;
}

export default function BakeryTemplate({ data, template }: BakeryTemplateProps) {
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
    primary: '#D35400', 
    secondary: '#E67E22', 
    accent: '#FFF3E0', 
    background: '#FFFFFF', 
    text: '#3A3A3A',
    cardBg: '#FFFBF5',
    borderColor: '#F5E0C8',
    buttonText: '#FFFFFF',
    highlightColor: '#FFB74D'
  };
  const font = configSections.font || template?.defaultFont || 'Montserrat, sans-serif';
  
  // Get all sections for this business type
  const allSections = getBusinessTemplate('bakery')?.sections || [];

  const renderSection = (sectionKey: string) => {
    const sectionData = configSections[sectionKey] || {};
    if (!sectionData || Object.keys(sectionData).length === 0 || sectionData.enabled === false) return null;
    
    switch (sectionKey) {
      case 'header':
        return renderHeaderSection(sectionData);
      case 'about':
        return renderAboutSection(sectionData);
      case 'featured_products':
        return renderFeaturedProductsSection(sectionData);
      case 'daily_specials':
        return renderDailySpecialsSection(sectionData);
      case 'contact':
        return renderContactSection(sectionData);
      case 'social':
        return renderSocialSection(sectionData);
      case 'business_hours':
        return renderBusinessHoursSection(sectionData);
      case 'videos':
        return renderVideosSection(sectionData);
      case 'youtube':
        return renderYouTubeSection(sectionData);
      case 'gallery':
        return renderGallerySection(sectionData);
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
      case 'catering':
        return renderCateringSection(sectionData);
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
    <div className="relative">
      {/* Cover Image with Pattern Overlay */}
      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        {headerData.cover_image ? (
          <img 
            src={headerData.cover_image} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div 
            className="w-full h-full relative" 
            style={{ 
              background: `linear-gradient(135deg, ${colors.primary}40 0%, ${colors.secondary}40 100%)`,
            }}
          >
            {/* Bakery pattern overlay */}
            <div className="absolute inset-0 opacity-10" 
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${colors.primary.replace('#', '')}' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>
        )}
        
        {/* Overlay */}
        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
        ></div>
      </div>
      
      {/* Logo and Name Container */}
      <div className="relative px-5 pt-6 pb-4 text-center">
        {/* Logo */}
        {headerData.logo && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <div 
              className="w-24 h-24 rounded-full overflow-hidden border-4 shadow-lg" 
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
        
        {/* Bakery Name and Tagline */}
        <div className="mt-12">
          <h1 
            className="text-2xl font-bold mb-1" 
            style={{ 
              color: colors.primary,
              fontFamily: font
            }}
          >
            {headerData.name || data.name || 'Sweet Crumb Bakery'}
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
      </div>
      
      {/* Quick Action Buttons */}
      <div 
        className="px-5 pb-4 flex justify-center space-x-3" 
        style={{ backgroundColor: colors.background }}
      >
        {configSections.contact?.phone && (
          <a 
            href={`tel:${configSections.contact?.phone}`} 
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
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
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
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
          className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
          style={{ 
            backgroundColor: colors.primary,
            color: colors.buttonText
          }}
        >
          <MessageSquare size={16} />
        </button>
        
        {/* Language Selector */}
        {configSections.language && (
          <div className="relative">
            <button
              onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
              style={{ 
                backgroundColor: colors.primary,
                border: `1px solid ${colors.primary}`,
                color: colors.buttonText
              }}
            >
              <Globe size={16} />
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
        )}
      </div>
      
      {/* Decorative Divider */}
      <div className="relative h-4 overflow-hidden">
        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: colors.accent }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 right-0 h-1" 
          style={{ backgroundColor: colors.primary + '40' }}
        ></div>
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
          borderBottom: `8px solid ${colors.accent}`
        }}
      >
        <div className="mb-4">
          <div className="flex items-center">
            <Cake 
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
          <div className="mt-2 relative h-3">
            <div className="absolute left-0 right-0 h-0.5" style={{ backgroundColor: colors.primary + '30' }}></div>
            <div className="absolute left-0 right-0 top-1 h-0.5" style={{ backgroundColor: colors.primary + '20' }}></div>
            <div className="absolute left-0 right-0 top-2 h-0.5" style={{ backgroundColor: colors.primary + '10' }}></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-1 w-6 h-6">
              <svg viewBox="0 0 24 24" fill={colors.primary} xmlns="http://www.w3.org/2000/svg">
                <path d="M12,3c-0.5,0-1,0.2-1.4,0.6C10.2,4,10,4.5,10,5c0,0.5,0.2,1,0.6,1.4C11,6.8,11.5,7,12,7c0.5,0,1-0.2,1.4-0.6 C13.8,6,14,5.5,14,5c0-0.5-0.2-1-0.6-1.4C13,3.2,12.5,3,12,3z M7.5,5C7,5,6.5,5.2,6.1,5.6C5.7,6,5.5,6.5,5.5,7c0,0.5,0.2,1,0.6,1.4 C6.5,8.8,7,9,7.5,9C8,9,8.5,8.8,8.9,8.4C9.3,8,9.5,7.5,9.5,7c0-0.5-0.2-1-0.6-1.4C8.5,5.2,8,5,7.5,5z M16.5,5 c-0.5,0-1,0.2-1.4,0.6C14.7,6,14.5,6.5,14.5,7c0,0.5,0.2,1,0.6,1.4C15.5,8.8,16,9,16.5,9c0.5,0,1-0.2,1.4-0.6 C18.3,8,18.5,7.5,18.5,7c0-0.5-0.2-1-0.6-1.4C17.5,5.2,17,5,16.5,5z M5.2,10C4.7,10,4.2,10.2,3.8,10.6C3.4,11,3.2,11.5,3.2,12 c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4 C6.2,10.2,5.7,10,5.2,10z M12,10c-0.5,0-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6 c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C13,10.2,12.5,10,12,10z M18.8,10c-0.5,0-1,0.2-1.4,0.6 c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4 c0-0.5-0.2-1-0.6-1.4C19.8,10.2,19.3,10,18.8,10z M7.5,15c-0.5,0-1,0.2-1.4,0.6C5.7,16,5.5,16.5,5.5,17c0,0.5,0.2,1,0.6,1.4 C6.5,18.8,7,19,7.5,19c0.5,0,1-0.2,1.4-0.6C9.3,18,9.5,17.5,9.5,17c0-0.5-0.2-1-0.6-1.4C8.5,15.2,8,15,7.5,15z M16.5,15 c-0.5,0-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6 c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C17.5,15.2,17,15,16.5,15z M12,17c-0.5,0-1,0.2-1.4,0.6C10.2,18,10,18.5,10,19 c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4 C13,17.2,12.5,17,12,17z"/>
              </svg>
            </div>
          </div>
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
          
          {aboutData.specialties && (
            <div className="text-center">
              <p 
                className="text-xs" 
                style={{ color: colors.text + '80' }}
              >
                {t('SPECIALTIES')}
              </p>
              <p 
                className="text-sm capitalize" 
                style={{ color: colors.primary }}
              >
                {aboutData.specialties.replace('_', ' ')}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderFeaturedProductsSection = (productsData: any) => {
    const products = productsData.products || [];
    const categories = productsData.categories || [];
    if (!Array.isArray(products) || products.length === 0) return null;
    
    // Get categories from data or fallback to unique product categories
    const categoryOptions = categories.length > 0 
      ? ['all', ...categories.map((cat: any) => cat.value)]
      : ['all', ...new Set(products.map((item: any) => item.category))];
    
    const getCategoryLabel = (value: string) => {
      if (value === 'all') return 'all';
      const category = categories.find((cat: any) => cat.value === value);
      return category ? category.label : value;
    };
    
    // Filter items by active category
    const filteredProducts = activeCategory === 'all' 
      ? products 
      : products.filter((item: any) => item.category === activeCategory);
    
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
        <div className="mb-4">
          <div className="flex items-center justify-between">
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
                {t('Featured Products')}
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
          <div className="mt-2 relative h-3">
            <div className="absolute left-0 right-0 h-0.5" style={{ backgroundColor: colors.primary + '30' }}></div>
            <div className="absolute left-0 right-0 top-1 h-0.5" style={{ backgroundColor: colors.primary + '20' }}></div>
            <div className="absolute left-0 right-0 top-2 h-0.5" style={{ backgroundColor: colors.primary + '10' }}></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-1 w-6 h-6">
              <svg viewBox="0 0 24 24" fill={colors.primary} xmlns="http://www.w3.org/2000/svg">
                <path d="M12,3c-0.5,0-1,0.2-1.4,0.6C10.2,4,10,4.5,10,5c0,0.5,0.2,1,0.6,1.4C11,6.8,11.5,7,12,7c0.5,0,1-0.2,1.4-0.6 C13.8,6,14,5.5,14,5c0-0.5-0.2-1-0.6-1.4C13,3.2,12.5,3,12,3z M7.5,5C7,5,6.5,5.2,6.1,5.6C5.7,6,5.5,6.5,5.5,7c0,0.5,0.2,1,0.6,1.4 C6.5,8.8,7,9,7.5,9C8,9,8.5,8.8,8.9,8.4C9.3,8,9.5,7.5,9.5,7c0-0.5-0.2-1-0.6-1.4C8.5,5.2,8,5,7.5,5z M16.5,5 c-0.5,0-1,0.2-1.4,0.6C14.7,6,14.5,6.5,14.5,7c0,0.5,0.2,1,0.6,1.4C15.5,8.8,16,9,16.5,9c0.5,0,1-0.2,1.4-0.6 C18.3,8,18.5,7.5,18.5,7c0-0.5-0.2-1-0.6-1.4C17.5,5.2,17,5,16.5,5z M5.2,10C4.7,10,4.2,10.2,3.8,10.6C3.4,11,3.2,11.5,3.2,12 c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4 C6.2,10.2,5.7,10,5.2,10z M12,10c-0.5,0-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6 c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C13,10.2,12.5,10,12,10z M18.8,10c-0.5,0-1,0.2-1.4,0.6 c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4 c0-0.5-0.2-1-0.6-1.4C19.8,10.2,19.3,10,18.8,10z M7.5,15c-0.5,0-1,0.2-1.4,0.6C5.7,16,5.5,16.5,5.5,17c0,0.5,0.2,1,0.6,1.4 C6.5,18.8,7,19,7.5,19c0.5,0,1-0.2,1.4-0.6C9.3,18,9.5,17.5,9.5,17c0-0.5-0.2-1-0.6-1.4C8.5,15.2,8,15,7.5,15z M16.5,15 c-0.5,0-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6 c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C17.5,15.2,17,15,16.5,15z M12,17c-0.5,0-1,0.2-1.4,0.6C10.2,18,10,18.5,10,19 c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4 C13,17.2,12.5,17,12,17z"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Category filters */}
        <div className="flex overflow-x-auto pb-2 mb-4 hide-scrollbar">
          {categoryOptions.map((category: string) => (
            <button
              key={category}
              className={`text-xs py-1 px-3 mr-2 capitalize rounded-full whitespace-nowrap`}
              style={{ 
                backgroundColor: activeCategory === category ? colors.primary : colors.background,
                color: activeCategory === category ? colors.buttonText : colors.text,
                border: `1px solid ${activeCategory === category ? colors.primary : colors.borderColor}`
              }}
              onClick={() => setActiveCategory(category)}
            >
              {getCategoryLabel(category).replace('_', ' ')}
            </button>
          ))}
        </div>
        
        {/* Product items */}
        <div className="space-y-4">
          {filteredProducts.map((product: any, index: number) => (
            <div 
              key={index} 
              className="flex p-3 rounded-lg" 
              style={{ 
                backgroundColor: colors.background,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              {/* Product Image */}
              <div className="flex-shrink-0 mr-3">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name || 'Product'} 
                    className="w-16 h-16 rounded-lg object-cover"
                    style={{ border: `1px solid ${colors.borderColor}` }}
                  />
                ) : (
                  <div 
                    className="w-16 h-16 rounded-lg flex items-center justify-center" 
                    style={{ 
                      backgroundColor: colors.accent,
                      border: `1px solid ${colors.borderColor}`
                    }}
                  >
                    <Cake size={20} style={{ color: colors.primary }} />
                  </div>
                )}
              </div>
              
              {/* Product Details */}
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
                      {product.name}
                    </h3>
                    {getDietaryBadge(product.dietary_info)}
                  </div>
                  <span 
                    className="text-sm font-semibold ml-2" 
                    style={{ color: colors.secondary }}
                  >
                    {product.price}
                  </span>
                </div>
                
                {product.description && (
                  <p 
                    className="text-xs mt-1" 
                    style={{ color: colors.text + 'CC' }}
                  >
                    {product.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDailySpecialsSection = (specialsData: any) => {
    const specials = specialsData.specials || [];
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
        <div className="mb-4">
          <div className="flex items-center">
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
          <div className="mt-2 relative h-3">
            <div className="absolute left-0 right-0 h-0.5" style={{ backgroundColor: colors.primary + '30' }}></div>
            <div className="absolute left-0 right-0 top-1 h-0.5" style={{ backgroundColor: colors.primary + '20' }}></div>
            <div className="absolute left-0 right-0 top-2 h-0.5" style={{ backgroundColor: colors.primary + '10' }}></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-1 w-6 h-6">
              <svg viewBox="0 0 24 24" fill={colors.primary} xmlns="http://www.w3.org/2000/svg">
                <path d="M12,3c-0.5,0-1,0.2-1.4,0.6C10.2,4,10,4.5,10,5c0,0.5,0.2,1,0.6,1.4C11,6.8,11.5,7,12,7c0.5,0,1-0.2,1.4-0.6 C13.8,6,14,5.5,14,5c0-0.5-0.2-1-0.6-1.4C13,3.2,12.5,3,12,3z M7.5,5C7,5,6.5,5.2,6.1,5.6C5.7,6,5.5,6.5,5.5,7c0,0.5,0.2,1,0.6,1.4 C6.5,8.8,7,9,7.5,9C8,9,8.5,8.8,8.9,8.4C9.3,8,9.5,7.5,9.5,7c0-0.5-0.2-1-0.6-1.4C8.5,5.2,8,5,7.5,5z M16.5,5 c-0.5,0-1,0.2-1.4,0.6C14.7,6,14.5,6.5,14.5,7c0,0.5,0.2,1,0.6,1.4C15.5,8.8,16,9,16.5,9c0.5,0,1-0.2,1.4-0.6 C18.3,8,18.5,7.5,18.5,7c0-0.5-0.2-1-0.6-1.4C17.5,5.2,17,5,16.5,5z M5.2,10C4.7,10,4.2,10.2,3.8,10.6C3.4,11,3.2,11.5,3.2,12 c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4 C6.2,10.2,5.7,10,5.2,10z M12,10c-0.5,0-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6 c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C13,10.2,12.5,10,12,10z M18.8,10c-0.5,0-1,0.2-1.4,0.6 c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4 c0-0.5-0.2-1-0.6-1.4C19.8,10.2,19.3,10,18.8,10z M7.5,15c-0.5,0-1,0.2-1.4,0.6C5.7,16,5.5,16.5,5.5,17c0,0.5,0.2,1,0.6,1.4 C6.5,18.8,7,19,7.5,19c0.5,0,1-0.2,1.4-0.6C9.3,18,9.5,17.5,9.5,17c0-0.5-0.2-1-0.6-1.4C8.5,15.2,8,15,7.5,15z M16.5,15 c-0.5,0-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6 c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C17.5,15.2,17,15,16.5,15z M12,17c-0.5,0-1,0.2-1.4,0.6C10.2,18,10,18.5,10,19 c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4 C13,17.2,12.5,17,12,17z"/>
              </svg>
            </div>
          </div>
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
      <div className="mb-4">
        <div className="flex items-center">
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
        <div className="mt-2 relative h-3">
          <div className="absolute left-0 right-0 h-0.5" style={{ backgroundColor: colors.primary + '30' }}></div>
          <div className="absolute left-0 right-0 top-1 h-0.5" style={{ backgroundColor: colors.primary + '20' }}></div>
          <div className="absolute left-0 right-0 top-2 h-0.5" style={{ backgroundColor: colors.primary + '10' }}></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-1 w-6 h-6">
            <svg viewBox="0 0 24 24" fill={colors.primary} xmlns="http://www.w3.org/2000/svg">
              <path d="M12,3c-0.5,0-1,0.2-1.4,0.6C10.2,4,10,4.5,10,5c0,0.5,0.2,1,0.6,1.4C11,6.8,11.5,7,12,7c0.5,0,1-0.2,1.4-0.6 C13.8,6,14,5.5,14,5c0-0.5-0.2-1-0.6-1.4C13,3.2,12.5,3,12,3z M7.5,5C7,5,6.5,5.2,6.1,5.6C5.7,6,5.5,6.5,5.5,7c0,0.5,0.2,1,0.6,1.4 C6.5,8.8,7,9,7.5,9C8,9,8.5,8.8,8.9,8.4C9.3,8,9.5,7.5,9.5,7c0-0.5-0.2-1-0.6-1.4C8.5,5.2,8,5,7.5,5z M16.5,5 c-0.5,0-1,0.2-1.4,0.6C14.7,6,14.5,6.5,14.5,7c0,0.5,0.2,1,0.6,1.4C15.5,8.8,16,9,16.5,9c0.5,0,1-0.2,1.4-0.6 C18.3,8,18.5,7.5,18.5,7c0-0.5-0.2-1-0.6-1.4C17.5,5.2,17,5,16.5,5z M5.2,10C4.7,10,4.2,10.2,3.8,10.6C3.4,11,3.2,11.5,3.2,12 c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4 C6.2,10.2,5.7,10,5.2,10z M12,10c-0.5,0-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6 c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C13,10.2,12.5,10,12,10z M18.8,10c-0.5,0-1,0.2-1.4,0.6 c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4 c0-0.5-0.2-1-0.6-1.4C19.8,10.2,19.3,10,18.8,10z M7.5,15c-0.5,0-1,0.2-1.4,0.6C5.7,16,5.5,16.5,5.5,17c0,0.5,0.2,1,0.6,1.4 C6.5,18.8,7,19,7.5,19c0.5,0,1-0.2,1.4-0.6C9.3,18,9.5,17.5,9.5,17c0-0.5-0.2-1-0.6-1.4C8.5,15.2,8,15,7.5,15z M16.5,15 c-0.5,0-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6 c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C17.5,15.2,17,15,16.5,15z M12,17c-0.5,0-1,0.2-1.4,0.6C10.2,18,10,18.5,10,19 c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4 C13,17.2,12.5,17,12,17z"/>
            </svg>
          </div>
        </div>
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
                color: colors.buttonText
              }}
            >
              <SocialIcon platform={link.platform} color={colors.buttonText} />
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
        <div className="mb-4">
          <div className="flex items-center justify-between">
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
          <div className="mt-2 relative h-3">
            <div className="absolute left-0 right-0 h-0.5" style={{ backgroundColor: colors.primary + '30' }}></div>
            <div className="absolute left-0 right-0 top-1 h-0.5" style={{ backgroundColor: colors.primary + '20' }}></div>
            <div className="absolute left-0 right-0 top-2 h-0.5" style={{ backgroundColor: colors.primary + '10' }}></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-1 w-6 h-6">
              <svg viewBox="0 0 24 24" fill={colors.primary} xmlns="http://www.w3.org/2000/svg">
                <path d="M12,3c-0.5,0-1,0.2-1.4,0.6C10.2,4,10,4.5,10,5c0,0.5,0.2,1,0.6,1.4C11,6.8,11.5,7,12,7c0.5,0,1-0.2,1.4-0.6 C13.8,6,14,5.5,14,5c0-0.5-0.2-1-0.6-1.4C13,3.2,12.5,3,12,3z M7.5,5C7,5,6.5,5.2,6.1,5.6C5.7,6,5.5,6.5,5.5,7c0,0.5,0.2,1,0.6,1.4 C6.5,8.8,7,9,7.5,9C8,9,8.5,8.8,8.9,8.4C9.3,8,9.5,7.5,9.5,7c0-0.5-0.2-1-0.6-1.4C8.5,5.2,8,5,7.5,5z M16.5,5 c-0.5,0-1,0.2-1.4,0.6C14.7,6,14.5,6.5,14.5,7c0,0.5,0.2,1,0.6,1.4C15.5,8.8,16,9,16.5,9c0.5,0,1-0.2,1.4-0.6 C18.3,8,18.5,7.5,18.5,7c0-0.5-0.2-1-0.6-1.4C17.5,5.2,17,5,16.5,5z M5.2,10C4.7,10,4.2,10.2,3.8,10.6C3.4,11,3.2,11.5,3.2,12 c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4 C6.2,10.2,5.7,10,5.2,10z M12,10c-0.5,0-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6 c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C13,10.2,12.5,10,12,10z M18.8,10c-0.5,0-1,0.2-1.4,0.6 c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4 c0-0.5-0.2-1-0.6-1.4C19.8,10.2,19.3,10,18.8,10z M7.5,15c-0.5,0-1,0.2-1.4,0.6C5.7,16,5.5,16.5,5.5,17c0,0.5,0.2,1,0.6,1.4 C6.5,18.8,7,19,7.5,19c0.5,0,1-0.2,1.4-0.6C9.3,18,9.5,17.5,9.5,17c0-0.5-0.2-1-0.6-1.4C8.5,15.2,8,15,7.5,15z M16.5,15 c-0.5,0-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6 c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C17.5,15.2,17,15,16.5,15z M12,17c-0.5,0-1,0.2-1.4,0.6C10.2,18,10,18.5,10,19 c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4 C13,17.2,12.5,17,12,17z"/>
              </svg>
            </div>
          </div>
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

  const renderVideosSection = (videosData: any) => {
    if (!videoContent || videoContent.length === 0) return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `8px solid ${colors.accent}`
        }}
      >
        <div className="mb-4">
          <div className="flex items-center">
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
              {t('Baking Videos')}
            </h2>
          </div>
          <div className="mt-2 relative h-3">
            <div className="absolute left-0 right-0 h-0.5" style={{ backgroundColor: colors.primary + '30' }}></div>
            <div className="absolute left-0 right-0 top-1 h-0.5" style={{ backgroundColor: colors.primary + '20' }}></div>
            <div className="absolute left-0 right-0 top-2 h-0.5" style={{ backgroundColor: colors.primary + '10' }}></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-1 w-6 h-6">
              <svg viewBox="0 0 24 24" fill={colors.primary} xmlns="http://www.w3.org/2000/svg">
                <path d="M12,3c-0.5,0-1,0.2-1.4,0.6C10.2,4,10,4.5,10,5c0,0.5,0.2,1,0.6,1.4C11,6.8,11.5,7,12,7c0.5,0,1-0.2,1.4-0.6 C13.8,6,14,5.5,14,5c0-0.5-0.2-1-0.6-1.4C13,3.2,12.5,3,12,3z M7.5,5C7,5,6.5,5.2,6.1,5.6C5.7,6,5.5,6.5,5.5,7c0,0.5,0.2,1,0.6,1.4 C6.5,8.8,7,9,7.5,9C8,9,8.5,8.8,8.9,8.4C9.3,8,9.5,7.5,9.5,7c0-0.5-0.2-1-0.6-1.4C8.5,5.2,8,5,7.5,5z M16.5,5 c-0.5,0-1,0.2-1.4,0.6C14.7,6,14.5,6.5,14.5,7c0,0.5,0.2,1,0.6,1.4C15.5,8.8,16,9,16.5,9c0.5,0,1-0.2,1.4-0.6 C18.3,8,18.5,7.5,18.5,7c0-0.5-0.2-1-0.6-1.4C17.5,5.2,17,5,16.5,5z M5.2,10C4.7,10,4.2,10.2,3.8,10.6C3.4,11,3.2,11.5,3.2,12 c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4 C6.2,10.2,5.7,10,5.2,10z M12,10c-0.5,0-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6 c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C13,10.2,12.5,10,12,10z M18.8,10c-0.5,0-1,0.2-1.4,0.6 c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4 c0-0.5-0.2-1-0.6-1.4C19.8,10.2,19.3,10,18.8,10z M7.5,15c-0.5,0-1,0.2-1.4,0.6C5.7,16,5.5,16.5,5.5,17c0,0.5,0.2,1,0.6,1.4 C6.5,18.8,7,19,7.5,19c0.5,0,1-0.2,1.4-0.6C9.3,18,9.5,17.5,9.5,17c0-0.5-0.2-1-0.6-1.4C8.5,15.2,8,15,7.5,15z M16.5,15 c-0.5,0-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6 c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C17.5,15.2,17,15,16.5,15z M12,17c-0.5,0-1,0.2-1.4,0.6C10.2,18,10,18.5,10,19 c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4 C13,17.2,12.5,17,12,17z"/>
              </svg>
            </div>
          </div>
        </div>
        
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
                  <div className="relative w-full h-36">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title || 'Baking video'} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
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
                      <span className="text-sm font-medium" style={{ color: colors.primary, fontFamily: font }}>{t("Baking Tutorial")}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-3">
                <h4 className="font-medium text-sm mb-2" style={{ color: colors.text, fontFamily: font }}>
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
                  {video.recipe_type && (
                    <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: colors.primary + '20', color: colors.primary, fontFamily: font }}>
                      🍰 {video.recipe_type}
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
          borderBottom: `8px solid ${colors.accent}`
        }}
      >
        <div className="mb-4">
          <div className="flex items-center">
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
        
          <div className="mt-2 relative h-3">
            <div className="absolute left-0 right-0 h-0.5" style={{ backgroundColor: colors.primary + '30' }}></div>
            <div className="absolute left-0 right-0 top-1 h-0.5" style={{ backgroundColor: colors.primary + '20' }}></div>
            <div className="absolute left-0 right-0 top-2 h-0.5" style={{ backgroundColor: colors.primary + '10' }}></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-1 w-6 h-6">
              <svg viewBox="0 0 24 24" fill={colors.primary} xmlns="http://www.w3.org/2000/svg">
                <path d="M12,3c-0.5,0-1,0.2-1.4,0.6C10.2,4,10,4.5,10,5c0,0.5,0.2,1,0.6,1.4C11,6.8,11.5,7,12,7c0.5,0,1-0.2,1.4-0.6 C13.8,6,14,5.5,14,5c0-0.5-0.2-1-0.6-1.4C13,3.2,12.5,3,12,3z M7.5,5C7,5,6.5,5.2,6.1,5.6C5.7,6,5.5,6.5,5.5,7c0,0.5,0.2,1,0.6,1.4 C6.5,8.8,7,9,7.5,9C8,9,8.5,8.8,8.9,8.4C9.3,8,9.5,7.5,9.5,7c0-0.5-0.2-1-0.6-1.4C8.5,5.2,8,5,7.5,5z M16.5,5 c-0.5,0-1,0.2-1.4,0.6C14.7,6,14.5,6.5,14.5,7c0,0.5,0.2,1,0.6,1.4C15.5,8.8,16,9,16.5,9c0.5,0,1-0.2,1.4-0.6 C18.3,8,18.5,7.5,18.5,7c0-0.5-0.2-1-0.6-1.4C17.5,5.2,17,5,16.5,5z M5.2,10C4.7,10,4.2,10.2,3.8,10.6C3.4,11,3.2,11.5,3.2,12 c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4 C6.2,10.2,5.7,10,5.2,10z M12,10c-0.5,0-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6 c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C13,10.2,12.5,10,12,10z M18.8,10c-0.5,0-1,0.2-1.4,0.6 c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4 c0-0.5-0.2-1-0.6-1.4C19.8,10.2,19.3,10,18.8,10z M7.5,15c-0.5,0-1,0.2-1.4,0.6C5.7,16,5.5,16.5,5.5,17c0,0.5,0.2,1,0.6,1.4 C6.5,18.8,7,19,7.5,19c0.5,0,1-0.2,1.4-0.6C9.3,18,9.5,17.5,9.5,17c0-0.5-0.2-1-0.6-1.4C8.5,15.2,8,15,7.5,15z M16.5,15 c-0.5,0-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6 c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C17.5,15.2,17,15,16.5,15z M12,17c-0.5,0-1,0.2-1.4,0.6C10.2,18,10,18.5,10,19 c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4 C13,17.2,12.5,17,12,17z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div 
          className="p-4 rounded-lg" 
          style={{ 
            backgroundColor: colors.background,
            border: `1px solid ${colors.borderColor}`
          }}
        >
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mr-3">
              <Youtube className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm" style={{ color: colors.text, fontFamily: font }}>
                {youtubeData.channel_name || 'Bakery Channel'}
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
                🍰 {t("BAKING TUTORIALS")}
              </Button>
            )}
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
        <div className="mb-4">
          <div className="flex items-center">
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
          <div className="mt-2 relative h-3">
            <div className="absolute left-0 right-0 h-0.5" style={{ backgroundColor: colors.primary + '30' }}></div>
            <div className="absolute left-0 right-0 top-1 h-0.5" style={{ backgroundColor: colors.primary + '20' }}></div>
            <div className="absolute left-0 right-0 top-2 h-0.5" style={{ backgroundColor: colors.primary + '10' }}></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-1 w-6 h-6">
              <svg viewBox="0 0 24 24" fill={colors.primary} xmlns="http://www.w3.org/2000/svg">
                <path d="M12,3c-0.5,0-1,0.2-1.4,0.6C10.2,4,10,4.5,10,5c0,0.5,0.2,1,0.6,1.4C11,6.8,11.5,7,12,7c0.5,0,1-0.2,1.4-0.6 C13.8,6,14,5.5,14,5c0-0.5-0.2-1-0.6-1.4C13,3.2,12.5,3,12,3z M7.5,5C7,5,6.5,5.2,6.1,5.6C5.7,6,5.5,6.5,5.5,7c0,0.5,0.2,1,0.6,1.4 C6.5,8.8,7,9,7.5,9C8,9,8.5,8.8,8.9,8.4C9.3,8,9.5,7.5,9.5,7c0-0.5-0.2-1-0.6-1.4C8.5,5.2,8,5,7.5,5z M16.5,5 c-0.5,0-1,0.2-1.4,0.6C14.7,6,14.5,6.5,14.5,7c0,0.5,0.2,1,0.6,1.4C15.5,8.8,16,9,16.5,9c0.5,0,1-0.2,1.4-0.6 C18.3,8,18.5,7.5,18.5,7c0-0.5-0.2-1-0.6-1.4C17.5,5.2,17,5,16.5,5z M5.2,10C4.7,10,4.2,10.2,3.8,10.6C3.4,11,3.2,11.5,3.2,12 c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4 C6.2,10.2,5.7,10,5.2,10z M12,10c-0.5,0-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6 c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C13,10.2,12.5,10,12,10z M18.8,10c-0.5,0-1,0.2-1.4,0.6 c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4 c0-0.5-0.2-1-0.6-1.4C19.8,10.2,19.3,10,18.8,10z M7.5,15c-0.5,0-1,0.2-1.4,0.6C5.7,16,5.5,16.5,5.5,17c0,0.5,0.2,1,0.6,1.4 C6.5,18.8,7,19,7.5,19c0.5,0,1-0.2,1.4-0.6C9.3,18,9.5,17.5,9.5,17c0-0.5-0.2-1-0.6-1.4C8.5,15.2,8,15,7.5,15z M16.5,15 c-0.5,0-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6 c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C17.5,15.2,17,15,16.5,15z M12,17c-0.5,0-1,0.2-1.4,0.6C10.2,18,10,18.5,10,19 c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4 C13,17.2,12.5,17,12,17z"/>
              </svg>
            </div>
          </div>
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
                  <Cake size={24} style={{ color: colors.primary }} />
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
        <div className="mb-4">
          <div className="flex items-center">
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
          <div className="mt-2 relative h-3">
            <div className="absolute left-0 right-0 h-0.5" style={{ backgroundColor: colors.primary + '30' }}></div>
            <div className="absolute left-0 right-0 top-1 h-0.5" style={{ backgroundColor: colors.primary + '20' }}></div>
            <div className="absolute left-0 right-0 top-2 h-0.5" style={{ backgroundColor: colors.primary + '10' }}></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-1 w-6 h-6">
              <svg viewBox="0 0 24 24" fill={colors.primary} xmlns="http://www.w3.org/2000/svg">
                <path d="M12,3c-0.5,0-1,0.2-1.4,0.6C10.2,4,10,4.5,10,5c0,0.5,0.2,1,0.6,1.4C11,6.8,11.5,7,12,7c0.5,0,1-0.2,1.4-0.6 C13.8,6,14,5.5,14,5c0-0.5-0.2-1-0.6-1.4C13,3.2,12.5,3,12,3z M7.5,5C7,5,6.5,5.2,6.1,5.6C5.7,6,5.5,6.5,5.5,7c0,0.5,0.2,1,0.6,1.4 C6.5,8.8,7,9,7.5,9C8,9,8.5,8.8,8.9,8.4C9.3,8,9.5,7.5,9.5,7c0-0.5-0.2-1-0.6-1.4C8.5,5.2,8,5,7.5,5z M16.5,5 c-0.5,0-1,0.2-1.4,0.6C14.7,6,14.5,6.5,14.5,7c0,0.5,0.2,1,0.6,1.4C15.5,8.8,16,9,16.5,9c0.5,0,1-0.2,1.4-0.6 C18.3,8,18.5,7.5,18.5,7c0-0.5-0.2-1-0.6-1.4C17.5,5.2,17,5,16.5,5z M5.2,10C4.7,10,4.2,10.2,3.8,10.6C3.4,11,3.2,11.5,3.2,12 c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4 C6.2,10.2,5.7,10,5.2,10z M12,10c-0.5,0-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6 c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C13,10.2,12.5,10,12,10z M18.8,10c-0.5,0-1,0.2-1.4,0.6 c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4 c0-0.5-0.2-1-0.6-1.4C19.8,10.2,19.3,10,18.8,10z M7.5,15c-0.5,0-1,0.2-1.4,0.6C5.7,16,5.5,16.5,5.5,17c0,0.5,0.2,1,0.6,1.4 C6.5,18.8,7,19,7.5,19c0.5,0,1-0.2,1.4-0.6C9.3,18,9.5,17.5,9.5,17c0-0.5-0.2-1-0.6-1.4C8.5,15.2,8,15,7.5,15z M16.5,15 c-0.5,0-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6 c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C17.5,15.2,17,15,16.5,15z M12,17c-0.5,0-1,0.2-1.4,0.6C10.2,18,10,18.5,10,19 c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4 C13,17.2,12.5,17,12,17z"/>
              </svg>
            </div>
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
        <div className="mb-4">
          <div className="flex items-center">
            <ShoppingBag 
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
              {t('Order & Pickup')}
            </h2>
          </div>
          <div className="mt-2 relative h-3">
            <div className="absolute left-0 right-0 h-0.5" style={{ backgroundColor: colors.primary + '30' }}></div>
            <div className="absolute left-0 right-0 top-1 h-0.5" style={{ backgroundColor: colors.primary + '20' }}></div>
            <div className="absolute left-0 right-0 top-2 h-0.5" style={{ backgroundColor: colors.primary + '10' }}></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-1 w-6 h-6">
              <svg viewBox="0 0 24 24" fill={colors.primary} xmlns="http://www.w3.org/2000/svg">
                <path d="M12,3c-0.5,0-1,0.2-1.4,0.6C10.2,4,10,4.5,10,5c0,0.5,0.2,1,0.6,1.4C11,6.8,11.5,7,12,7c0.5,0,1-0.2,1.4-0.6 C13.8,6,14,5.5,14,5c0-0.5-0.2-1-0.6-1.4C13,3.2,12.5,3,12,3z M7.5,5C7,5,6.5,5.2,6.1,5.6C5.7,6,5.5,6.5,5.5,7c0,0.5,0.2,1,0.6,1.4 C6.5,8.8,7,9,7.5,9C8,9,8.5,8.8,8.9,8.4C9.3,8,9.5,7.5,9.5,7c0-0.5-0.2-1-0.6-1.4C8.5,5.2,8,5,7.5,5z M16.5,5 c-0.5,0-1,0.2-1.4,0.6C14.7,6,14.5,6.5,14.5,7c0,0.5,0.2,1,0.6,1.4C15.5,8.8,16,9,16.5,9c0.5,0,1-0.2,1.4-0.6 C18.3,8,18.5,7.5,18.5,7c0-0.5-0.2-1-0.6-1.4C17.5,5.2,17,5,16.5,5z M5.2,10C4.7,10,4.2,10.2,3.8,10.6C3.4,11,3.2,11.5,3.2,12 c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4 C6.2,10.2,5.7,10,5.2,10z M12,10c-0.5,0-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6 c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C13,10.2,12.5,10,12,10z M18.8,10c-0.5,0-1,0.2-1.4,0.6 c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4 c0-0.5-0.2-1-0.6-1.4C19.8,10.2,19.3,10,18.8,10z M7.5,15c-0.5,0-1,0.2-1.4,0.6C5.7,16,5.5,16.5,5.5,17c0,0.5,0.2,1,0.6,1.4 C6.5,18.8,7,19,7.5,19c0.5,0,1-0.2,1.4-0.6C9.3,18,9.5,17.5,9.5,17c0-0.5-0.2-1-0.6-1.4C8.5,15.2,8,15,7.5,15z M16.5,15 c-0.5,0-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6 c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C17.5,15.2,17,15,16.5,15z M12,17c-0.5,0-1,0.2-1.4,0.6C10.2,18,10,18.5,10,19 c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4 C13,17.2,12.5,17,12,17z"/>
              </svg>
            </div>
          </div>
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
            {appointmentsData.min_notice_hours ? (
              `Please place orders at least ${appointmentsData.min_notice_hours} hours in advance.`
            ) : (
              'Order online for convenient pickup at our bakery.'
            )}
          </p>
          
          {appointmentsData.special_orders_info && (
            <p 
              className="text-xs mb-3 italic" 
              style={{ color: colors.text + 'CC' }}
            >
              {appointmentsData.special_orders_info}
            </p>
          )}
          
          <Button
            className="w-full"
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText,
              fontFamily: font
            }}
            onClick={() => handleAppointmentBooking(configSections.appointments)}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            {appointmentsData.reservation_text || 'Order Online'}
          </Button>
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
          backgroundColor: colors.background,
          borderBottom: `8px solid ${colors.accent}`
        }}
      >
        <div className="mb-4">
          <div className="flex items-center">
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
          <div className="mt-2 relative h-3">
            <div className="absolute left-0 right-0 h-0.5" style={{ backgroundColor: colors.primary + '30' }}></div>
            <div className="absolute left-0 right-0 top-1 h-0.5" style={{ backgroundColor: colors.primary + '20' }}></div>
            <div className="absolute left-0 right-0 top-2 h-0.5" style={{ backgroundColor: colors.primary + '10' }}></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-1 w-6 h-6">
              <svg viewBox="0 0 24 24" fill={colors.primary} xmlns="http://www.w3.org/2000/svg">
                <path d="M12,3c-0.5,0-1,0.2-1.4,0.6C10.2,4,10,4.5,10,5c0,0.5,0.2,1,0.6,1.4C11,6.8,11.5,7,12,7c0.5,0,1-0.2,1.4-0.6 C13.8,6,14,5.5,14,5c0-0.5-0.2-1-0.6-1.4C13,3.2,12.5,3,12,3z M7.5,5C7,5,6.5,5.2,6.1,5.6C5.7,6,5.5,6.5,5.5,7c0,0.5,0.2,1,0.6,1.4 C6.5,8.8,7,9,7.5,9C8,9,8.5,8.8,8.9,8.4C9.3,8,9.5,7.5,9.5,7c0-0.5-0.2-1-0.6-1.4C8.5,5.2,8,5,7.5,5z M16.5,5 c-0.5,0-1,0.2-1.4,0.6C14.7,6,14.5,6.5,14.5,7c0,0.5,0.2,1,0.6,1.4C15.5,8.8,16,9,16.5,9c0.5,0,1-0.2,1.4-0.6 C18.3,8,18.5,7.5,18.5,7c0-0.5-0.2-1-0.6-1.4C17.5,5.2,17,5,16.5,5z M5.2,10C4.7,10,4.2,10.2,3.8,10.6C3.4,11,3.2,11.5,3.2,12 c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4 C6.2,10.2,5.7,10,5.2,10z M12,10c-0.5,0-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6 c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C13,10.2,12.5,10,12,10z M18.8,10c-0.5,0-1,0.2-1.4,0.6 c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4 c0-0.5-0.2-1-0.6-1.4C19.8,10.2,19.3,10,18.8,10z M7.5,15c-0.5,0-1,0.2-1.4,0.6C5.7,16,5.5,16.5,5.5,17c0,0.5,0.2,1,0.6,1.4 C6.5,18.8,7,19,7.5,19c0.5,0,1-0.2,1.4-0.6C9.3,18,9.5,17.5,9.5,17c0-0.5-0.2-1-0.6-1.4C8.5,15.2,8,15,7.5,15z M16.5,15 c-0.5,0-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6 c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C17.5,15.2,17,15,16.5,15z M12,17c-0.5,0-1,0.2-1.4,0.6C10.2,18,10,18.5,10,19 c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4 C13,17.2,12.5,17,12,17z"/>
              </svg>
            </div>
          </div>
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
        <div className="mb-4">
          <div className="flex items-center">
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
          <div className="mt-2 relative h-3">
            <div className="absolute left-0 right-0 h-0.5" style={{ backgroundColor: colors.primary + '30' }}></div>
            <div className="absolute left-0 right-0 top-1 h-0.5" style={{ backgroundColor: colors.primary + '20' }}></div>
            <div className="absolute left-0 right-0 top-2 h-0.5" style={{ backgroundColor: colors.primary + '10' }}></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-1 w-6 h-6">
              <svg viewBox="0 0 24 24" fill={colors.primary} xmlns="http://www.w3.org/2000/svg">
                <path d="M12,3c-0.5,0-1,0.2-1.4,0.6C10.2,4,10,4.5,10,5c0,0.5,0.2,1,0.6,1.4C11,6.8,11.5,7,12,7c0.5,0,1-0.2,1.4-0.6 C13.8,6,14,5.5,14,5c0-0.5-0.2-1-0.6-1.4C13,3.2,12.5,3,12,3z M7.5,5C7,5,6.5,5.2,6.1,5.6C5.7,6,5.5,6.5,5.5,7c0,0.5,0.2,1,0.6,1.4 C6.5,8.8,7,9,7.5,9C8,9,8.5,8.8,8.9,8.4C9.3,8,9.5,7.5,9.5,7c0-0.5-0.2-1-0.6-1.4C8.5,5.2,8,5,7.5,5z M16.5,5 c-0.5,0-1,0.2-1.4,0.6C14.7,6,14.5,6.5,14.5,7c0,0.5,0.2,1,0.6,1.4C15.5,8.8,16,9,16.5,9c0.5,0,1-0.2,1.4-0.6 C18.3,8,18.5,7.5,18.5,7c0-0.5-0.2-1-0.6-1.4C17.5,5.2,17,5,16.5,5z M5.2,10C4.7,10,4.2,10.2,3.8,10.6C3.4,11,3.2,11.5,3.2,12 c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4 C6.2,10.2,5.7,10,5.2,10z M12,10c-0.5,0-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6 c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C13,10.2,12.5,10,12,10z M18.8,10c-0.5,0-1,0.2-1.4,0.6 c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4 c0-0.5-0.2-1-0.6-1.4C19.8,10.2,19.3,10,18.8,10z M7.5,15c-0.5,0-1,0.2-1.4,0.6C5.7,16,5.5,16.5,5.5,17c0,0.5,0.2,1,0.6,1.4 C6.5,18.8,7,19,7.5,19c0.5,0,1-0.2,1.4-0.6C9.3,18,9.5,17.5,9.5,17c0-0.5-0.2-1-0.6-1.4C8.5,15.2,8,15,7.5,15z M16.5,15 c-0.5,0-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6 c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C17.5,15.2,17,15,16.5,15z M12,17c-0.5,0-1,0.2-1.4,0.6C10.2,18,10,18.5,10,19 c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4 C13,17.2,12.5,17,12,17z"/>
              </svg>
            </div>
          </div>
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
        <div className="mb-4">
          <div className="flex items-center">
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
          <div className="mt-2 relative h-3">
            <div className="absolute left-0 right-0 h-0.5" style={{ backgroundColor: colors.primary + '30' }}></div>
            <div className="absolute left-0 right-0 top-1 h-0.5" style={{ backgroundColor: colors.primary + '20' }}></div>
            <div className="absolute left-0 right-0 top-2 h-0.5" style={{ backgroundColor: colors.primary + '10' }}></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-1 w-6 h-6">
              <svg viewBox="0 0 24 24" fill={colors.primary} xmlns="http://www.w3.org/2000/svg">
                <path d="M12,3c-0.5,0-1,0.2-1.4,0.6C10.2,4,10,4.5,10,5c0,0.5,0.2,1,0.6,1.4C11,6.8,11.5,7,12,7c0.5,0,1-0.2,1.4-0.6 C13.8,6,14,5.5,14,5c0-0.5-0.2-1-0.6-1.4C13,3.2,12.5,3,12,3z M7.5,5C7,5,6.5,5.2,6.1,5.6C5.7,6,5.5,6.5,5.5,7c0,0.5,0.2,1,0.6,1.4 C6.5,8.8,7,9,7.5,9C8,9,8.5,8.8,8.9,8.4C9.3,8,9.5,7.5,9.5,7c0-0.5-0.2-1-0.6-1.4C8.5,5.2,8,5,7.5,5z M16.5,5 c-0.5,0-1,0.2-1.4,0.6C14.7,6,14.5,6.5,14.5,7c0,0.5,0.2,1,0.6,1.4C15.5,8.8,16,9,16.5,9c0.5,0,1-0.2,1.4-0.6 C18.3,8,18.5,7.5,18.5,7c0-0.5-0.2-1-0.6-1.4C17.5,5.2,17,5,16.5,5z M5.2,10C4.7,10,4.2,10.2,3.8,10.6C3.4,11,3.2,11.5,3.2,12 c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4 C6.2,10.2,5.7,10,5.2,10z M12,10c-0.5,0-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6 c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C13,10.2,12.5,10,12,10z M18.8,10c-0.5,0-1,0.2-1.4,0.6 c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4 c0-0.5-0.2-1-0.6-1.4C19.8,10.2,19.3,10,18.8,10z M7.5,15c-0.5,0-1,0.2-1.4,0.6C5.7,16,5.5,16.5,5.5,17c0,0.5,0.2,1,0.6,1.4 C6.5,18.8,7,19,7.5,19c0.5,0,1-0.2,1.4-0.6C9.3,18,9.5,17.5,9.5,17c0-0.5-0.2-1-0.6-1.4C8.5,15.2,8,15,7.5,15z M16.5,15 c-0.5,0-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6 c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C17.5,15.2,17,15,16.5,15z M12,17c-0.5,0-1,0.2-1.4,0.6C10.2,18,10,18.5,10,19 c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4 C13,17.2,12.5,17,12,17z"/>
              </svg>
            </div>
          </div>
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

  const renderCateringSection = (cateringData: any) => {
    if (!cateringData.catering_title) return null;
    
    const cateringOptions = cateringData.catering_options || [];
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.cardBg,
          borderBottom: `8px solid ${colors.accent}`
        }}
      >
        <div className="mb-4">
          <div className="flex items-center">
            <Users 
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
              {cateringData.catering_title}
            </h2>
          </div>
          <div className="mt-2 relative h-3">
            <div className="absolute left-0 right-0 h-0.5" style={{ backgroundColor: colors.primary + '30' }}></div>
            <div className="absolute left-0 right-0 top-1 h-0.5" style={{ backgroundColor: colors.primary + '20' }}></div>
            <div className="absolute left-0 right-0 top-2 h-0.5" style={{ backgroundColor: colors.primary + '10' }}></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-1 w-6 h-6">
              <svg viewBox="0 0 24 24" fill={colors.primary} xmlns="http://www.w3.org/2000/svg">
                <path d="M12,3c-0.5,0-1,0.2-1.4,0.6C10.2,4,10,4.5,10,5c0,0.5,0.2,1,0.6,1.4C11,6.8,11.5,7,12,7c0.5,0,1-0.2,1.4-0.6 C13.8,6,14,5.5,14,5c0-0.5-0.2-1-0.6-1.4C13,3.2,12.5,3,12,3z M7.5,5C7,5,6.5,5.2,6.1,5.6C5.7,6,5.5,6.5,5.5,7c0,0.5,0.2,1,0.6,1.4 C6.5,8.8,7,9,7.5,9C8,9,8.5,8.8,8.9,8.4C9.3,8,9.5,7.5,9.5,7c0-0.5-0.2-1-0.6-1.4C8.5,5.2,8,5,7.5,5z M16.5,5 c-0.5,0-1,0.2-1.4,0.6C14.7,6,14.5,6.5,14.5,7c0,0.5,0.2,1,0.6,1.4C15.5,8.8,16,9,16.5,9c0.5,0,1-0.2,1.4-0.6 C18.3,8,18.5,7.5,18.5,7c0-0.5-0.2-1-0.6-1.4C17.5,5.2,17,5,16.5,5z M5.2,10C4.7,10,4.2,10.2,3.8,10.6C3.4,11,3.2,11.5,3.2,12 c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4 C6.2,10.2,5.7,10,5.2,10z M12,10c-0.5,0-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6 c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C13,10.2,12.5,10,12,10z M18.8,10c-0.5,0-1,0.2-1.4,0.6 c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4 c0-0.5-0.2-1-0.6-1.4C19.8,10.2,19.3,10,18.8,10z M7.5,15c-0.5,0-1,0.2-1.4,0.6C5.7,16,5.5,16.5,5.5,17c0,0.5,0.2,1,0.6,1.4 C6.5,18.8,7,19,7.5,19c0.5,0,1-0.2,1.4-0.6C9.3,18,9.5,17.5,9.5,17c0-0.5-0.2-1-0.6-1.4C8.5,15.2,8,15,7.5,15z M16.5,15 c-0.5,0-1,0.2-1.4,0.6c-0.4,0.4-0.6,0.9-0.6,1.4c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6 c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4C17.5,15.2,17,15,16.5,15z M12,17c-0.5,0-1,0.2-1.4,0.6C10.2,18,10,18.5,10,19 c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.2-1-0.6-1.4 C13,17.2,12.5,17,12,17z"/>
              </svg>
            </div>
          </div>
        </div>
        
        {cateringData.catering_description && (
          <p 
            className="text-sm mb-4" 
            style={{ color: colors.text }}
          >
            {cateringData.catering_description}
          </p>
        )}
        
        <div className="flex justify-between mb-4">
          {cateringData.min_order_amount && (
            <div className="text-center">
              <p 
                className="text-xs" 
                style={{ color: colors.text + '80' }}
              >
                {t("MINIMUM ORDER")}
              </p>
              <p 
                className="text-sm font-bold" 
                style={{ color: colors.primary }}
              >
                {cateringData.min_order_amount}
              </p>
            </div>
          )}
          
          {cateringData.lead_time && (
            <div className="text-center">
              <p 
                className="text-xs" 
                style={{ color: colors.text + '80' }}
              >
                {t("LEAD TIME")}
              </p>
              <p 
                className="text-sm" 
                style={{ color: colors.primary }}
              >
                {cateringData.lead_time}
              </p>
            </div>
          )}
        </div>
        
        {Array.isArray(cateringOptions) && cateringOptions.length > 0 && (
          <div className="space-y-3">
            {cateringOptions.map((option: any, index: number) => (
              <div 
                key={index} 
                className="p-3 rounded-lg" 
                style={{ 
                  backgroundColor: colors.background,
                  border: `1px solid ${colors.borderColor}`
                }}
              >
                <div className="flex justify-between items-start">
                  <h3 
                    className="text-base font-medium" 
                    style={{ 
                      color: colors.primary,
                      fontFamily: font
                    }}
                  >
                    {option.option_name}
                  </h3>
                  <span 
                    className="text-sm font-semibold" 
                    style={{ color: colors.secondary }}
                  >
                    {option.price}
                  </span>
                </div>
                
                {option.description && (
                  <p 
                    className="text-xs mt-1" 
                    style={{ color: colors.text + 'CC' }}
                  >
                    {option.description}
                  </p>
                )}
                
                {option.serves && (
                  <p 
                    className="text-xs mt-1 italic" 
                    style={{ color: colors.text + '99' }}
                  >
                    {t("Serves:")} {option.serves}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
        
        <Button 
          className="w-full mt-4"
          style={{ 
            backgroundColor: colors.primary,
            color: colors.buttonText,
            fontFamily: font
          }}
          onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
        >
          <Mail className="w-4 h-4 mr-2" />
          {t('Inquire About Catering')}
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
          <div className="mb-4">
            <div className="flex items-center">
              <Cake 
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
            <div className="mt-2 relative h-3">
              <div className="absolute left-0 right-0 h-0.5" style={{ backgroundColor: colors.primary + '30' }}></div>
              <div className="absolute left-0 right-0 top-1 h-0.5" style={{ backgroundColor: colors.primary + '20' }}></div>
              <div className="absolute left-0 right-0 top-2 h-0.5" style={{ backgroundColor: colors.primary + '10' }}></div>
            </div>
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
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.cardBg,
          borderBottom: `8px solid ${colors.accent}`
        }}
      >
        <div className="mb-4">
          <div className="flex items-center">
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
              {qrData.qr_title || t('Share Our Bakery')}
            </h2>
          </div>
          <div className="mt-2 relative h-3">
            <div className="absolute left-0 right-0 h-0.5" style={{ backgroundColor: colors.primary + '30' }}></div>
            <div className="absolute left-0 right-0 top-1 h-0.5" style={{ backgroundColor: colors.primary + '20' }}></div>
            <div className="absolute left-0 right-0 top-2 h-0.5" style={{ backgroundColor: colors.primary + '10' }}></div>
          </div>
        </div>
        
        <div 
          className="text-center p-4 rounded-lg" 
          style={{ 
            backgroundColor: colors.background,
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
            className="w-full" 
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
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.cardBg,
          borderBottom: `8px solid ${colors.accent}`
        }}
      >
        {footerData.footer_text && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Cake 
                size={18} 
                className="mr-2" 
                style={{ color: colors.primary }}
              />
              <h3 
                className="text-base font-semibold" 
                style={{ 
                  color: colors.primary,
                  fontFamily: font
                }}
              >
                {t('Our Promise')}
              </h3>
            </div>
            <p 
              className="text-sm text-center" 
              style={{ 
                color: colors.text,
                fontFamily: font
              }}
            >
              {footerData.footer_text}
            </p>
          </div>
        )}
        
        {footerData.footer_links && Array.isArray(footerData.footer_links) && footerData.footer_links.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3">
            {footerData.footer_links.map((link: any, index: number) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-2 rounded-full transition-colors"
                style={{ 
                  backgroundColor: colors.primary + '20',
                  color: colors.primary,
                  fontFamily: font,
                  border: `1px solid ${colors.primary}30`
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
        
      {/* Save Contact Button */}
      <div className="p-5 border-t" style={{ borderColor: colors.borderColor }}>
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