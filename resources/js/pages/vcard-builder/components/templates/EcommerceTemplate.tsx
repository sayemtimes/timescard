import { handleAppointmentBooking } from '../VCardPreview';
import React from 'react';
import StableHtmlContent from '@/components/StableHtmlContent';
import { VideoEmbed, extractVideoUrl } from '@/components/VideoEmbed';
import { createYouTubeEmbedRef } from '@/utils/youtubeEmbedUtils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ensureRequiredSections } from '@/utils/ensureRequiredSections';
import { useTranslation } from 'react-i18next';
import { sanitizeVideoData, sanitizePath } from '@/utils/secureVideoUtils';
import languageData from '@/../../resources/lang/language.json';
import { 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Calendar, 
  Clock, 
  Star,
  ChevronRight,
  MessageSquare,
  ShoppingBag,
  Package,
  RefreshCw,
  ShieldCheck,
  HeadphonesIcon,
  Award,
  Truck,
  Facebook,
  Instagram,
  Twitter,
  User,
  Video,
  Play,
  Youtube,
  QrCode
} from 'lucide-react';
import SocialIcon from '../../../link-bio-builder/components/SocialIcon';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionOrder } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';

interface EcommerceTemplateProps {
  data: any;
  template: any;
}

function EcommerceTemplate({ data, template }: EcommerceTemplateProps) {
  const { t, i18n } = useTranslation();
  
  // Get all sections for this business type
  const templateSections = template?.defaultData || {};
  
  // Ensure all required sections are available
  const configSections = ensureRequiredSections(data.config_sections || {}, templateSections);

  // Testimonials state (moved to component level)
  const [currentReview, setCurrentReview] = React.useState(0);
  
  // Effect for testimonials rotation (moved to component level)
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
    primary: '#4A6CF7', 
    secondary: '#6E82FE', 
    accent: '#EEF1FF', 
    background: '#FFFFFF', 
    text: '#333333',
    cardBg: '#F9F9F9',
    borderColor: '#EEEEEE',
    buttonText: '#FFFFFF',
    saleColor: '#E53935',
    starColor: '#FFC107'
  };
  const font = configSections.font || template?.defaultFont || 'Inter, sans-serif';

  // Get all sections for this business type
  const allSections = getBusinessTemplate('ecommerce')?.sections || [];

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
  
  const renderHeaderSection = (headerData: any) => (
    <div>
      {/* Main Header */}
      <div 
        className="px-4 py-4 flex items-center justify-between" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        {/* Logo */}
        <div className="flex items-center">
          {headerData.logo ? (
            <img 
              src={headerData.logo} 
              alt={headerData.name} 
              className="h-10 mr-3"
            />
          ) : (
            <ShoppingBag 
              size={28} 
              style={{ color: colors.primary }}
              className="mr-3"
            />
          )}
          
          <div>
            <h1 
              className="text-xl font-bold" 
              style={{ 
                color: colors.text,
                fontFamily: font
              }}
            >
              {headerData.name || data.name || 'StyleHub'}
            </h1>
            
            {headerData.tagline && (
              <p 
                className="text-xs" 
                style={{ color: colors.text + '80' }}
              >
                {headerData.tagline}
              </p>
            )}
          </div>
        </div>
        

        
        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            size="sm"
            className="text-xs h-8"
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText,
              fontFamily: font
            }}
            onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
          >
            {t('Contact')}
          </Button>

          <Button
            size="sm"
            className="text-xs h-8"
            style={{ 
              backgroundColor: colors.secondary,
              color: colors.buttonText,
              fontFamily: font
            }}
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
          >
            <User size={12} className="mr-1" />
            {t('Save')}
          </Button>

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

  const renderFeaturedSection = (featuredData: any) => {
    if (!featuredData.title && !featuredData.image) return null; 
    return (
      <div 
        className="relative h-48 overflow-hidden" 
        style={{ backgroundColor: colors.accent }}
      >
        {featuredData.image ? (
          <img 
            src={featuredData.image} 
            alt={featuredData.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r" style={{ 
            backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
            opacity: 0.8
          }}></div>
        )}
        
        <div 
          className="absolute inset-0 flex flex-col justify-center px-5" 
          style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
        >
          {featuredData.title && (
            <h2 
              className="text-xl font-bold mb-1" 
              style={{ 
                color: '#FFFFFF',
                fontFamily: font,
                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              {featuredData.title}
            </h2>
          )}
          
          {featuredData.subtitle && (
            <p 
              className="text-sm mb-3" 
              style={{ 
                color: '#FFFFFF',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              {featuredData.subtitle}
            </p>
          )}
          
          {featuredData.button_text && (
            <Button
              className="w-max text-sm py-1 px-4 h-auto"
              style={{ 
                backgroundColor: colors.background,
                color: colors.primary,
                fontFamily: font,
                fontWeight: 'bold'
              }}
              onClick={() => typeof window !== "undefined" && window.open(featuredData.button_url || '#', "_blank", "noopener,noreferrer")}
            >
              {featuredData.button_text}
              <ChevronRight size={14} className="ml-1" />
            </Button>
          )}
        </div>
      </div>
    );
  };

  const renderCategoriesSection = (categoriesData: any) => {
    const categories = categoriesData.category_list || [];
    if (!Array.isArray(categories) || categories.length === 0) return null;
    
    return (
      <div className="px-4 py-5">
        <h2 
          className="text-lg font-bold mb-4" 
          style={{ 
            color: colors.text,
            fontFamily: font
          }}
        >
          {t('Shop by Category')}
        </h2>
        
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category: any, index: number) => (
            <a
              key={index}
              href={category.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-lg overflow-hidden aspect-square"
            >
              {category.image ? (
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div 
                  className="w-full h-full" 
                  style={{ 
                    backgroundColor: colors.accent,
                    backgroundImage: `linear-gradient(45deg, ${colors.primary}20, ${colors.secondary}20)`
                  }}
                ></div>
              )}
              
              <div 
                className="absolute inset-0 flex items-center justify-center" 
                style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
              >
                <h3 
                  className="text-base font-bold" 
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: font,
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                  }}
                >
                  {category.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  };

  const renderProductsSection = (productsData: any) => {
    const products = productsData.product_list || [];
    if (!Array.isArray(products) || products.length === 0) return null;
    
    const getBadgeStyle = (badge: string) => {
      switch(badge) {
        case 'sale': return { bg: colors.saleColor || '#E53935', text: '#FFFFFF' };
        case 'new': return { bg: colors.primary || '#4A6CF7', text: '#FFFFFF' };
        case 'bestseller': return { bg: colors.secondary || '#6E82FE', text: '#FFFFFF' };
        case 'limited': return { bg: '#212121', text: '#FFFFFF' };
        default: return { bg: colors.primary || '#4A6CF7', text: '#FFFFFF' };
      }
    };
    
    return (
      <div className="px-4 py-5">
        <div className="flex items-center justify-between mb-4">
          <h2 
            className="text-lg font-bold" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {t('Featured Products')}
          </h2>
          
          <a 
            href="#" 
            className="text-xs flex items-center"
            style={{ color: colors.primary }}
          >
            {t('View All')}
            <ChevronRight size={14} />
          </a>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {products.map((product: any, index: number) => (
            <a
              key={index}
              href={product.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg overflow-hidden"
              style={{ 
                backgroundColor: colors.background,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              {/* Product Image */}
              <div className="relative aspect-square">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center" 
                    style={{ backgroundColor: colors.accent }}
                  >
                    <ShoppingBag size={24} style={{ color: colors.primary }} />
                  </div>
                )}
                
                {/* Badge */}
                {product.badge && product.badge !== 'none' && (
                  <span 
                    className="absolute top-2 left-2 inline-flex items-center justify-center px-2 py-1 rounded font-bold text-xs leading-none" 
                    style={{ 
                      backgroundColor: getBadgeStyle(product.badge).bg,
                      color: getBadgeStyle(product.badge).text,
                      minWidth: '2.5rem',
                      height: '1.5rem',
                      fontSize: '10px',
                      textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                    }}
                  >
                    {product.badge.toUpperCase()}
                  </span>
                )}
                
                {/* View Details Button */}
                <span 
                  className="absolute bottom-2 right-2 inline-flex items-center justify-center px-2 py-1 rounded text-xs font-medium cursor-pointer" 
                  style={{ 
                    backgroundColor: colors.primary,
                    color: colors.buttonText,
                    minWidth: '2rem',
                    height: '1.5rem',
                    fontSize: '10px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                  }}
                >
                  {t('View')}
                </span>
              </div>
              
              {/* Product Info */}
              <div className="p-3">
                <p 
                  className="text-xs mb-1" 
                  style={{ color: colors.text + '80' }}
                >
                  {product.category}
                </p>
                
                <h3 
                  className="text-sm font-medium mb-1 line-clamp-1" 
                  style={{ 
                    color: colors.text,
                    fontFamily: font
                  }}
                >
                  {product.title}
                </h3>
                
                {product.description && (
                  <p 
                    className="text-xs mb-2 line-clamp-2" 
                    style={{ color: colors.text + 'CC' }}
                  >
                    {product.description}
                  </p>
                )}
                
                <div className="flex items-center">
                  {product.sale_price ? (
                    <>
                      <span 
                        className="text-sm font-bold mr-2" 
                        style={{ color: colors.saleColor }}
                      >
                        {product.sale_price}
                      </span>
                      <span 
                        className="text-xs line-through" 
                        style={{ color: colors.text + '80' }}
                      >
                        {product.price}
                      </span>
                    </>
                  ) : (
                    <span 
                      className="text-sm font-bold" 
                      style={{ color: colors.text }}
                    >
                      {product.price}
                    </span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  };

  const renderBenefitsSection = (benefitsData: any) => {
    const benefits = benefitsData.benefit_list || [];
    if (!Array.isArray(benefits) || benefits.length === 0) return null;
    
    const getBenefitIcon = (iconName: string) => {
      switch(iconName) {
        case 'shipping': return <Truck size={24} />;
        case 'returns': return <RefreshCw size={24} />;
        case 'secure': return <ShieldCheck size={24} />;
        case 'support': return <HeadphonesIcon size={24} />;
        case 'quality': return <Award size={24} />;
        case 'discount': return <Package size={24} />;
        default: return <Package size={24} />;
      }
    };
    
    return (
      <div 
        className="px-4 py-5" 
        style={{ 
          backgroundColor: colors.accent,
          borderTop: `1px solid ${colors.borderColor}`,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          {benefits.map((benefit: any, index: number) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center"
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mb-2" 
                style={{ 
                  backgroundColor: colors.background,
                  color: colors.primary
                }}
              >
                {getBenefitIcon(benefit.icon)}
              </div>
              
              <h3 
                className="text-sm font-bold mb-1" 
                style={{ 
                  color: colors.text,
                  fontFamily: font
                }}
              >
                {benefit.title}
              </h3>
              
              {benefit.description && (
                <p 
                  className="text-xs" 
                  style={{ color: colors.text + 'CC' }}
                >
                  {benefit.description}
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
      <div className="px-4 py-5">
        <h2 
          className="text-lg font-bold mb-4" 
          style={{ 
            color: colors.text,
            fontFamily: font
          }}
        >
          {t('Product Videos')}
        </h2>
        
        <div className="space-y-3">
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
                      alt={video.title || 'Product video'} 
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
                  <div className="w-full h-40 flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
                    <div className="text-center">
                      <Video className="w-10 h-10 mx-auto mb-2" style={{ color: colors.primary }} />
                      <span className="text-sm font-medium" style={{ color: colors.primary, fontFamily: font }}>{t("Product Demo")}</span>
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
                  {video.product_featured && (
                    <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: colors.primary + '20', color: colors.primary, fontFamily: font }}>
                      🛍️ {video.product_featured}
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
      <div className="px-4 py-5">
        <h2 
          className="text-lg font-bold mb-4" 
          style={{ 
            color: colors.text,
            fontFamily: font
          }}
        >
          {t('YouTube Channel')}
        </h2>
        
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
            <div className="w-14 h-14 rounded-lg bg-red-600 flex items-center justify-center mr-3">
              <Youtube className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base" style={{ color: colors.text, fontFamily: font }}>
                {youtubeData.channel_name || 'Our Store'}
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
                {t('SUBSCRIBE')}
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
                📺 {t('PRODUCT REVIEWS')}
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
      <div className="px-4 py-5">
        <h2 
          className="text-lg font-bold mb-4" 
          style={{ 
            color: colors.text,
            fontFamily: font
          }}
        >
          {t('Customer Reviews')}
        </h2>
        
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
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          fill={i < parseInt(review.rating || 5) ? colors.starColor : 'transparent'} 
                          stroke={i < parseInt(review.rating || 5) ? colors.starColor : colors.borderColor}
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
                        - {review.customer_name}
                      </p>
                      
                      {review.product_purchased && (
                        <span 
                          className="text-xs" 
                          style={{ color: colors.text + '80' }}
                        >
                          {review.product_purchased}
                        </span>
                      )}
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

  const renderNewsletterSection = (newsletterData: any) => {
    if (!newsletterData.title) return null;
    
    return (
      <div 
        className="px-4 py-5" 
        style={{ 
          backgroundColor: colors.primary,
          color: colors.buttonText
        }}
      >
        <div className="text-center mb-4">
          <h2 
            className="text-lg font-bold mb-2" 
            style={{ 
              color: colors.buttonText,
              fontFamily: font
            }}
          >
            {newsletterData.title}
          </h2>
          
          {newsletterData.description && (
            <p 
              className="text-sm" 
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              {newsletterData.description}
            </p>
          )}
        </div>
        
        <div 
          className="flex rounded-lg overflow-hidden" 
          style={{ 
            backgroundColor: colors.background,
            border: `1px solid ${colors.borderColor}`
          }}
        >
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-1 px-3 py-2 text-sm bg-transparent border-none outline-none"
            style={{ color: colors.text }}
          />
          
          <Button
            className="rounded-none h-auto"
            style={{ 
              backgroundColor: colors.secondary,
              color: colors.buttonText,
              fontFamily: font
            }}
            onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
          >
            {newsletterData.button_text || t('Subscribe')}
          </Button>
        </div>
      </div>
    );
  };

  const renderContactSection = (contactData: any) => {
    return (
      <div className="px-4 py-5">
        <h2 
          className="text-lg font-bold mb-4" 
          style={{ 
            color: colors.text,
            fontFamily: font
          }}
        >
          {t('Contact Us')}
        </h2>
        
        <div className="space-y-3">
          {(contactData.email || data.email) && (
            <a 
              href={`mailto:${contactData.email || data.email}`} 
              className="flex items-center p-3 rounded-lg" 
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <Mail 
                size={18} 
                className="mr-3" 
                style={{ color: colors.primary }}
              />
              <span 
                className="text-sm" 
                style={{ color: colors.text }}
              >
                {contactData.email || data.email}
              </span>
            </a>
          )}
          
          {(contactData.phone || data.phone) && (
            <a 
              href={`tel:${contactData.phone || data.phone}`} 
              className="flex items-center p-3 rounded-lg" 
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <Phone 
                size={18} 
                className="mr-3" 
                style={{ color: colors.primary }}
              />
              <span 
                className="text-sm" 
                style={{ color: colors.text }}
              >
                {contactData.phone || data.phone}
              </span>
            </a>
          )}
          
          {contactData.address && (
            <div 
              className="flex items-start p-3 rounded-lg" 
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <MapPin 
                size={18} 
                className="mr-3 flex-shrink-0 mt-0.5" 
                style={{ color: colors.primary }}
              />
              <span 
                className="text-sm" 
                style={{ color: colors.text }}
              >
                {contactData.address}
              </span>
            </div>
          )}
        </div>
        
        <div className="mt-4">
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
            {t('Send a Message')}
          </Button>
        </div>
      </div>
    );
  };

  const renderSocialSection = (socialData: any) => {
    const socialLinks = socialData.social_links || [];
    if (!Array.isArray(socialLinks) || socialLinks.length === 0) return null;
    
    return (
      <div 
        className="px-4 py-4" 
        style={{ 
          backgroundColor: colors.background,
          borderTop: `1px solid ${colors.borderColor}`
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

  const renderCustomHtmlSection = (customHtmlData: any) => {
    if (!customHtmlData.html_content) return null;
    
    return (
      <div className="px-4 py-5">
        {customHtmlData.show_title && customHtmlData.section_title && (
          <h2 
            className="text-lg font-bold mb-4" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            {customHtmlData.section_title}
          </h2>
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
      <div className="px-4 py-5">
        <h2 
          className="text-lg font-bold mb-4" 
          style={{ 
            color: colors.text,
            fontFamily: font
          }}
        >
          {qrData.qr_title || t('Share Our Store')}
        </h2>
        
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
        className="px-4 py-5" 
        style={{ 
          backgroundColor: colors.cardBg,
          borderTop: `1px solid ${colors.borderColor}`
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
        className="px-4 py-4" 
        style={{ backgroundColor: colors.background }}
      >
        <p 
          className="text-xs text-center" 
          style={{ color: colors.text + '80' }}
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
      case 'featured':
        return renderFeaturedSection(sectionData);
      case 'categories':
        return renderCategoriesSection(sectionData);
      case 'products':
        return renderProductsSection(sectionData);
      case 'benefits':
        return renderBenefitsSection(sectionData);
      case 'videos':
        return renderVideosSection(sectionData);
      case 'youtube':
        return renderYouTubeSection(sectionData);
      case 'testimonials':
        return renderTestimonialsSection(sectionData);
      case 'newsletter':
        return renderNewsletterSection(sectionData);
      case 'business_hours':
        return renderBusinessHoursSection(sectionData);
      case 'contact':
        return renderContactSection(sectionData);
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
  
  const renderAboutSection = (aboutData: any) => {
    if (!aboutData.description && !data.description) return null;
    return (
      <div className="px-4 py-5">
        <h2 className="text-lg font-bold mb-4" style={{ color: colors.text, fontFamily: font }}>{t('About Us')}</h2>
        <p className="text-sm leading-relaxed mb-4" style={{ color: colors.text }}>{aboutData.description || data.description}</p>
        {aboutData.year_established && (
          <div className="p-3 rounded-lg" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.borderColor}` }}>
            <p className="text-xs" style={{ color: colors.text + '80' }}>{t("ESTABLISHED")}</p>
            <p className="text-xl font-bold" style={{ color: colors.primary }}>{aboutData.year_established}</p>
          </div>
        )}
      </div>
    );
  };
  
  const renderBusinessHoursSection = (hoursData: any) => {
    const hours = hoursData.hours || [];
    if (!Array.isArray(hours) || hours.length === 0) return null;
    return (
      <div className="px-4 py-5">
        <h2 className="text-lg font-bold mb-4" style={{ color: colors.text, fontFamily: font }}>{t('Business Hours')}</h2>
        <div className="space-y-2">
          {hours.map((hour: any, index: number) => (
            <div key={index} className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: colors.cardBg }}>
              <span className="capitalize text-sm" style={{ color: colors.text }}>{hour.day}</span>
              <span className="text-sm" style={{ color: hour.is_closed ? colors.text + '80' : colors.text }}>
                {hour.is_closed ? t('Closed') : `${hour.open_time} - ${hour.close_time}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const renderAppointmentsSection = (appointmentsData: any) => {
    return (
      <div className="px-4 py-5">
        <Button className="w-full" style={{ backgroundColor: colors.primary, color: colors.buttonText, fontFamily: font }} onClick={() => handleAppointmentBooking(configSections.appointments)}>
          <Calendar className="w-4 h-4 mr-2" />{t('Book Appointment')}
        </Button>
      </div>
    );
  };
  
  const renderLocationSection = (locationData: any) => {
    if (!locationData.map_embed_url && !locationData.directions_url) return null;
    
    return (
      <div className="px-4 py-5">
        <h2 className="text-lg font-bold mb-4" style={{ color: colors.text, fontFamily: font }}>{t('Location')}</h2>
        
        <div className="space-y-3">
          {locationData.map_embed_url && (
            <div className="rounded-lg overflow-hidden" style={{ height: '200px' }}>
              <div dangerouslySetInnerHTML={{ __html: locationData.map_embed_url }} className="w-full h-full" />
            </div>
          )}
          
          {locationData.directions_url && (
            <Button className="w-full" style={{ backgroundColor: colors.primary, color: colors.buttonText, fontFamily: font }} onClick={() => typeof window !== "undefined" && window.open(locationData.directions_url, "_blank", "noopener,noreferrer")}>
              <MapPin className="w-4 h-4 mr-2" />{t('Get Directions')}
            </Button>
          )}
        </div>
      </div>
    );
  };
  
  const renderAppDownloadSection = (appData: any) => {
    if (!appData.app_store_url && !appData.play_store_url) return null;
    return (
      <div className="px-4 py-5">
        <h2 className="text-lg font-bold mb-4" style={{ color: colors.text, fontFamily: font }}>{t('Download Our App')}</h2>
        {appData.app_description && (
          <p 
            className="text-sm mb-4" 
            style={{ color: colors.text }}
          >
            {appData.app_description}
          </p>
        )}
        <div className="grid grid-cols-2 gap-3">
          {appData.app_store_url && <Button variant="outline" style={{ borderColor: colors.primary, color: colors.primary }} onClick={() => typeof window !== "undefined" && window.open(appData.app_store_url, "_blank", "noopener,noreferrer")}>{t('App Store')}</Button>}
          {appData.play_store_url && <Button variant="outline" style={{ borderColor: colors.primary, color: colors.primary }} onClick={() => typeof window !== "undefined" && window.open(appData.play_store_url, "_blank", "noopener,noreferrer")}>{t('Play Store')}</Button>}
        </div>
      </div>
    );
  };
  
  const renderContactFormSection = (formData: any) => {
    if (!formData.form_title) return null;
    return (
      <div className="px-4 py-5">
        <h2 className="text-lg font-bold mb-4" style={{ color: colors.text, fontFamily: font }}>{formData.form_title}</h2>
        {formData.form_description && (
          <p 
            className="text-sm mb-4" 
            style={{ color: colors.text }}
          >
            {formData.form_description}
          </p>
        )}
        <Button className="w-full" style={{ backgroundColor: colors.primary, color: colors.buttonText, fontFamily: font }} onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <MessageSquare className="w-4 h-4 mr-2" />{t('Send Message')}
        </Button>
      </div>
    );
  };
  
  const renderThankYouSection = (thankYouData: any) => {
    if (!thankYouData.message) return null;
    return (
      <div className="px-4 py-4">
        <p className="text-xs text-center" style={{ color: colors.text + '80' }}>{thankYouData.message}</p>
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

export default EcommerceTemplate;