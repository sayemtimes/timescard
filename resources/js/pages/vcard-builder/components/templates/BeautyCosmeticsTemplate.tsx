import { handleAppointmentBooking } from '../VCardPreview';
import React from 'react';
import StableHtmlContent from '@/components/StableHtmlContent';
import { VideoEmbed, extractVideoUrl } from '@/components/VideoEmbed';
import { createYouTubeEmbedRef } from '@/utils/youtubeEmbedUtils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Globe, MapPin, Calendar, UserPlus, Sparkles, Heart, Star, Clock, ShoppingBag, Video, Play, Youtube, QrCode } from 'lucide-react';
import SocialIcon from '../../../link-bio-builder/components/SocialIcon';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionOrder } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';
import { useTranslation } from 'react-i18next';
import { sanitizeVideoData } from '@/utils/secureVideoUtils';
import languageData from '@/../../resources/lang/language.json';

interface BeautyCosmeticsTemplateProps {
  data: any;
  template: any;
}

export default function BeautyCosmeticsTemplate({ data, template }: BeautyCosmeticsTemplateProps) {
  const { t, i18n } = useTranslation();
  const configSections = data.config_sections || {};

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
  

  const colors = configSections.colors || template?.defaultColors || { primary: '#E91E63', secondary: '#F06292', text: '#2D2D2D' };
  const font = configSections.font || template?.defaultFont || 'Playfair Display, serif';

  // Get all sections for this business type
  const allSections = getBusinessTemplate('beauty-cosmetics')?.sections || [];

  const renderSection = (sectionKey: string) => {
    const sectionData = configSections[sectionKey] || {};
    if (!sectionData || Object.keys(sectionData).length === 0 || sectionData.enabled === false) return null;
    
    switch (sectionKey) {
      case 'header': return renderHeaderSection(sectionData);
      case 'contact': return renderContactSection(sectionData);
      case 'about': return renderAboutSection(sectionData);
      case 'services': return renderServicesSection(sectionData);
      case 'portfolio': return renderPortfolioSection(sectionData);
      case 'products': return renderProductsSection(sectionData);
      case 'videos': return renderVideosSection(sectionData);
      case 'youtube': return renderYouTubeSection(sectionData);
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
    <div className="relative rounded-t-2xl overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.primary}15, ${colors.secondary}10, ${colors.accent})` }}>
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="fill-current" style={{ color: colors.primary }}>
          <defs>
            <pattern id="beauty-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1.5" fill="currentColor" opacity="0.3"/>
              <circle cx="5" cy="5" r="1" fill="currentColor" opacity="0.2"/>
              <circle cx="15" cy="15" r="1" fill="currentColor" opacity="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#beauty-dots)" />
        </svg>
      </div>
      
      <div className="px-6 py-8 relative">
        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 rounded-full border-4 shadow-xl flex items-center justify-center" style={{ 
            backgroundColor: colors.cardBg,
            borderColor: colors.primary + '40'
          }}>
            {headerData.profile_image ? (
              <img src={headerData.profile_image} alt="Profile" className="w-full h-full rounded-full object-cover" />
            ) : (
              <Sparkles className="w-8 h-8" style={{ color: colors.primary }} />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold mb-1" style={{ color: colors.text, fontFamily: font }}>
              {headerData.name || data.name || 'Beauty Artist'}
            </h1>
            <p className="text-sm font-medium mb-2" style={{ color: colors.primary, fontFamily: font }}>
              {headerData.title || 'Beauty & Makeup Specialist'}
            </p>
            {headerData.tagline && (
              <p className="text-xs leading-relaxed italic" style={{ color: colors.text + 'CC', fontFamily: font }}>
                "{headerData.tagline}"
              </p>
            )}
          </div>
        </div>
        
        {/* Language Selector */}
        {configSections.language && (
          <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-30`}>
            <div className="relative">
              <button
                onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                className="flex items-center justify-center transition-all"
                style={{ 
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: colors.primary
                }}
              >
                <span className="text-2xl">{String.fromCodePoint(...(languageData.find(lang => lang.code === currentLanguage)?.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt()) || []))}</span>
              </button>
              
              {showLanguageSelector && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border py-2 min-w-[150px] max-h-48 overflow-y-auto z-[999999]" style={{ borderColor: colors.borderColor }}>
                  {languageData.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center space-x-2 ${
                        currentLanguage === lang.code ? 'font-medium' : ''
                      }`}
                      style={{
                        backgroundColor: currentLanguage === lang.code ? colors.accent : 'transparent',
                        color: currentLanguage === lang.code ? colors.primary : colors.text
                      }}
                    >
                      <span className="text-base">{String.fromCodePoint(...lang.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt()))}</span>
                      <span>{lang.name}</span>
                      {currentLanguage === lang.code && <Heart size={12} style={{ color: colors.primary }} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="flex justify-center items-center mt-6">
          <div className="flex space-x-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.secondary }}></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
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
      <div className="flex justify-center py-2" style={{ backgroundColor: colors.cardBg }}>
        <div className="w-16 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)` }}></div>
      </div>
      <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
        <div className="grid grid-cols-2 gap-3">
          {(contactData.phone || data.phone) && (
            <div className="flex items-center space-x-2 p-3 rounded-xl" style={{ backgroundColor: colors.accent }}>
              <Phone className="w-4 h-4" style={{ color: colors.primary }} />
              <a 
                href={`tel:${contactData.phone || data.phone}`} 
                className="text-xs font-medium" 
                style={{ color: colors.text, fontFamily: font }}
              >
                {t("Call")}
              </a>
            </div>
          )}
          {(contactData.email || data.email) && (
            <div className="flex items-center space-x-2 p-3 rounded-xl" style={{ backgroundColor: colors.accent }}>
              <Mail className="w-4 h-4" style={{ color: colors.primary }} />
              <a 
                href={`mailto:${contactData.email || data.email}`} 
                className="text-xs font-medium" 
                style={{ color: colors.text, fontFamily: font }}
              >
                {t("Email")}
              </a>
            </div>
          )}
          {(contactData.website || data.website) && (
            <div className="flex items-center space-x-2 p-3 rounded-xl" style={{ backgroundColor: colors.accent }}>
              <Globe className="w-4 h-4" style={{ color: colors.primary }} />
              <a 
                href={contactData.website || data.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-medium" 
                style={{ color: colors.text, fontFamily: font }}
              >
                {t("Website")}
              </a>
            </div>
          )}
          {contactData.location && (
            <div className="flex items-center space-x-2 p-3 rounded-xl" style={{ backgroundColor: colors.accent }}>
              <MapPin className="w-4 h-4" style={{ color: colors.primary }} />
              <span className="text-xs font-medium" style={{ color: colors.text, fontFamily: font }}>
                {contactData.location}
              </span>
            </div>
          )}
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
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <Heart className="w-3 h-3" style={{ color: colors.primary }} />
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: colors.primary }}></div>
          </div>
        </div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <h3 className="font-bold text-sm mb-3 text-center" style={{ color: colors.primary, fontFamily: font }}>
            {t('About Me')}
          </h3>
          <p className="text-sm leading-relaxed mb-4 text-center" style={{ color: colors.text, fontFamily: font }}>
            {aboutData.description || data.description}
          </p>
          {aboutData.specialties && (
            <div className="mb-4">
              <p className="text-xs font-medium mb-2 text-center" style={{ color: colors.text + '80', fontFamily: font }}>{t('Specialties')}</p>
              <div className="flex flex-wrap gap-1 justify-center">
                {aboutData.specialties.split(',').map((specialty: string, index: number) => (
                  <Badge key={index} className="text-xs px-3 py-1 rounded-full" style={{ 
                    backgroundColor: colors.primary + '15', 
                    color: colors.primary,
                    border: `1px solid ${colors.primary}30`
                  }}>
                    {specialty.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {aboutData.experience && (
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full" style={{ backgroundColor: colors.accent }}>
                <Sparkles className="w-4 h-4" style={{ color: colors.primary }} />
                <span className="text-sm font-medium" style={{ color: colors.text, fontFamily: font }}>
                  {aboutData.experience} {t('Years Experience')}
                </span>
              </div>
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
          <div className="w-24 h-px rounded-full" style={{ backgroundColor: colors.primary + '40' }}></div>
        </div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <h3 className="font-bold text-sm mb-4 text-center" style={{ color: colors.primary, fontFamily: font }}>
            {t('Services')}
          </h3>
          <div className="space-y-3">
            {services.map((service: any, index: number) => (
              <div key={index} className="p-4 rounded-2xl" style={{ backgroundColor: colors.accent }}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-sm" style={{ color: colors.text, fontFamily: font }}>
                    {service.title}
                  </h4>
                  <div className="text-right">
                    {service.price && (
                      <p className="text-sm font-bold" style={{ color: colors.primary, fontFamily: font }}>
                        {service.price}
                      </p>
                    )}
                    {service.duration && (
                      <p className="text-xs flex items-center" style={{ color: colors.text + '80', fontFamily: font }}>
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

  const renderPortfolioSection = (portfolioData: any) => {
    const projects = portfolioData.projects || [];
    if (!Array.isArray(projects) || projects.length === 0) return null;
    return (
      <>
        <div className="flex justify-center py-3" style={{ backgroundColor: colors.cardBg }}>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full" style={{ backgroundColor: colors.primary + (i % 2 ? '60' : '30') }}></div>
            ))}
          </div>
        </div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <h3 className="font-bold text-sm mb-4 text-center" style={{ color: colors.primary, fontFamily: font }}>
            {t('Portfolio')}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {projects.map((project: any, index: number) => (
              <div key={index} className="rounded-xl overflow-hidden" style={{ backgroundColor: colors.accent }}>
                <div className="h-20 flex items-center justify-center" style={{ backgroundColor: colors.primary + '10' }}>
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <Sparkles className="w-6 h-6" style={{ color: colors.primary }} />
                  )}
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium" style={{ color: colors.text, fontFamily: font }}>
                    {project.title}
                  </p>
                  {project.category && (
                    <p className="text-xs" style={{ color: colors.primary, fontFamily: font }}>
                      {project.category}
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

  const renderProductsSection = (productsData: any) => {
    const products = productsData.product_list || [];
    if (!Array.isArray(products) || products.length === 0) return null;
    return (
      <>
        <div className="flex justify-center py-3" style={{ backgroundColor: colors.cardBg }}>
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-4 h-4" style={{ color: colors.primary }} />
            <div className="w-8 h-px" style={{ backgroundColor: colors.primary + '40' }}></div>
            <ShoppingBag className="w-4 h-4" style={{ color: colors.primary }} />
          </div>
        </div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <h3 className="font-bold text-sm mb-4 text-center" style={{ color: colors.primary, fontFamily: font }}>
            {t('Featured Products')}
          </h3>
          <div className="space-y-3">
            {products.map((product: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: colors.accent }}>
                <div>
                  <p className="text-sm font-semibold" style={{ color: colors.text, fontFamily: font }}>
                    {product.name}
                  </p>
                  {product.brand && (
                    <p className="text-xs" style={{ color: colors.text + '80', fontFamily: font }}>
                      {product.brand}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  {product.price && (
                    <p className="text-sm font-bold" style={{ color: colors.primary, fontFamily: font }}>
                      {product.price}
                    </p>
                  )}
                  {product.link && (
                    <Button 
                      size="sm" 
                      className="mt-1 h-6 px-3 text-xs" 
                      style={{ 
                        backgroundColor: colors.primary,
                        color: 'white',
                        fontFamily: font
                      }}
                      onClick={() => typeof window !== "undefined" && window.open(product.link, '_blank', 'noopener,noreferrer')}
                    >
                      {t("Buy")}
                    </Button>
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
          <div className="w-20 h-px rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${colors.primary}60, transparent)` }}></div>
        </div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <h3 className="font-bold text-sm mb-4 text-center" style={{ color: colors.primary, fontFamily: font }}>
            {t('Follow My Work')}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {socialLinks.map((link: any, index: number) => (
              <Button 
                key={index} 
                size="sm" 
                className="h-8 rounded-full font-medium justify-start" 
                style={{ 
                  backgroundColor: colors.accent,
                  color: colors.primary,
                  border: `1px solid ${colors.primary}30`,
                  fontFamily: font
                }}
                onClick={() => link.url && typeof window !== "undefined" && window.open(link.url, '_blank', 'noopener,noreferrer')}
              >
                <SocialIcon platform={link.platform} color={colors.primary} />
                <span className="ml-2 capitalize">{link.platform}</span>
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
          <Clock className="w-4 h-4" style={{ color: colors.primary }} />
        </div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <h3 className="font-bold text-sm mb-4 text-center" style={{ color: colors.primary, fontFamily: font }}>
            {t('Availability')}
          </h3>
          <div className="space-y-2">
            {hours.slice(0, 7).map((hour: any, index: number) => (
              <div key={index} className="flex justify-between items-center py-2 px-3 rounded-lg" style={{ 
                backgroundColor: hour.is_closed ? colors.accent + '60' : colors.accent
              }}>
                <span className="capitalize text-sm font-medium" style={{ color: colors.text, fontFamily: font }}>
                  {hour.day}
                </span>
                <span className="text-sm" style={{ 
                  color: hour.is_closed ? colors.text + '60' : colors.primary, 
                  fontFamily: font 
                }}>
                  {hour.is_closed ? t('Closed') : `${hour.open_time} - ${hour.close_time}`}
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
            {[...Array(3)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-current" style={{ color: colors.primary }} />
            ))}
          </div>
        </div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <h3 className="font-bold text-sm mb-4 text-center" style={{ color: colors.primary, fontFamily: font }}>
            {t('Client Love')}
          </h3>
          
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentReview * 100}%)` }}
              >
                {reviews.map((review: any, index: number) => (
                  <div key={index} className="w-full flex-shrink-0 px-1">
                    <div className="p-4 rounded-2xl" style={{ backgroundColor: colors.accent }}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < parseInt(review.rating || 5) ? 'fill-current text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        {review.service && (
                          <span className="text-xs px-2 py-1 rounded-full" style={{ 
                            backgroundColor: colors.primary + '20',
                            color: colors.primary,
                            fontFamily: font
                          }}>
                            {review.service}
                          </span>
                        )}
                      </div>
                      <p className="text-xs mb-3 leading-relaxed italic" style={{ color: colors.text, fontFamily: font }}>
                        "{review.review}"
                      </p>
                      <p className="text-xs font-semibold" style={{ color: colors.primary, fontFamily: font }}>
                        — {review.client_name}
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
        <h3 className="font-bold text-sm mb-3 text-center" style={{ color: colors.primary, fontFamily: font }}>
          {t('Book Your Session')}
        </h3>
        {appointmentsData?.consultation_note && (
          <p className="text-xs text-center mb-3 italic" style={{ color: colors.text + '80', fontFamily: font }}>
            {appointmentsData.consultation_note}
          </p>
        )}
        <Button 
          size="sm" 
          className="w-full h-10 rounded-full font-semibold" 
          style={{ 
            backgroundColor: colors.primary, 
            color: 'white',
            fontFamily: font 
          }}
          onClick={() => handleAppointmentBooking(configSections.appointments)}
        >
          <Calendar className="w-4 h-4 mr-2" />
          {t('Book Appointment')}
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
          <h3 className="font-bold text-sm mb-3 text-center" style={{ color: colors.primary, fontFamily: font }}>
            Visit My Studio
          </h3>
          
          <div className="space-y-3">
            {locationData.map_embed_url && (
              <div className="rounded-xl overflow-hidden" style={{ height: '200px' }}>
                <div dangerouslySetInnerHTML={{ __html: locationData.map_embed_url }} className="w-full h-full" />
              </div>
            )}
            
            {locationData.directions_url && (
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full rounded-full" 
                style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}
                onClick={() => typeof window !== "undefined" && window.open(locationData.directions_url, '_blank', 'noopener,noreferrer')}
              >
                <MapPin className="w-4 h-4 mr-2" />
                {t('Get Directions')}
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
          <div className="w-12 h-px" style={{ backgroundColor: colors.primary + '40' }}></div>
        </div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <h3 className="font-bold text-sm mb-3 text-center" style={{ color: colors.primary, fontFamily: font }}>
            Download My App
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {appData.app_store_url && (
              <Button size="sm" variant="outline" className="rounded-full" style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}>
                {t("App Store")}
              </Button>
            )}
            {appData.play_store_url && (
              <Button size="sm" variant="outline" className="rounded-full" style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}>
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
          <Heart className="w-4 h-4" style={{ color: colors.primary }} />
        </div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <h3 className="font-bold text-sm mb-2 text-center" style={{ color: colors.primary, fontFamily: font }}>
            {formData.form_title}
          </h3>
          {formData.form_description && (
            <p className="text-xs mb-4 text-center italic" style={{ color: colors.text + 'CC', fontFamily: font }}>
              {formData.form_description}
            </p>
          )}
          <Button 
            size="sm" 
            className="w-full rounded-full" 
            style={{ 
              backgroundColor: colors.secondary, 
              color: 'white',
              fontFamily: font 
            }}
            onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
          >
            <Mail className="w-4 h-4 mr-2" />
            {t('Get In Touch')}
          </Button>
        </div>
      </>
    );
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

  const renderVideosSection = (videosData: any) => {
    if (!videoContent || videoContent.length === 0) return null;
    
    return (
      <>
        <div className="flex justify-center py-3" style={{ backgroundColor: colors.cardBg }}>
          <div className="flex items-center space-x-2">
            <Video className="w-4 h-4" style={{ color: colors.primary }} />
            <div className="w-8 h-px" style={{ backgroundColor: colors.primary + '40' }}></div>
            <Video className="w-4 h-4" style={{ color: colors.primary }} />
          </div>
        </div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <h3 className="font-bold text-sm mb-4 text-center" style={{ color: colors.primary, fontFamily: font }}>
            {t('Beauty Tutorials')}
          </h3>
          <div className="space-y-3">
            {videoContent.map((video: any) => (
              <div key={video.key} className="rounded-2xl overflow-hidden" style={{ backgroundColor: colors.accent }}>
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
                        alt={video.title || 'Beauty tutorial'} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white bg-opacity-90 flex items-center justify-center">
                          <Play className="w-6 h-6 ml-1" style={{ color: colors.primary }} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-32 flex items-center justify-center" style={{ backgroundColor: colors.primary + '20' }}>
                      <div className="text-center">
                        <Video className="w-8 h-8 mx-auto mb-2" style={{ color: colors.primary }} />
                        <span className="text-xs" style={{ color: colors.primary, fontFamily: font }}>Beauty Tutorial</span>
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
                      <span className="text-xs" style={{ color: colors.text + '80', fontFamily: font }}>
                        ⏱️ {video.duration}
                      </span>
                    )}
                    {video.technique && (
                      <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: colors.primary + '20', color: colors.primary, fontFamily: font }}>
                        💄 {video.technique}
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

  const renderYouTubeSection = (youtubeData: any) => {
    if (!youtubeData.channel_url && !youtubeData.channel_name && !youtubeData.latest_video_embed) return null;
    
    return (
      <>
        <div className="flex justify-center py-3" style={{ backgroundColor: colors.cardBg }}>
          <Youtube className="w-4 h-4" style={{ color: colors.primary }} />
        </div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <h3 className="font-bold text-sm mb-3 text-center" style={{ color: colors.primary, fontFamily: font }}>
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
        
          <div className="rounded-2xl p-4" style={{ backgroundColor: colors.accent }}>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                <Youtube className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm" style={{ color: colors.text, fontFamily: font }}>
                  {youtubeData.channel_name || 'Beauty Channel'}
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
                  {t('Subscribe')}
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
                  💄 {t("Beauty Tips")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderCustomHtmlSection = (customHtmlData: any) => {
    if (!customHtmlData.html_content) return null;
    
    return (
      <>
        <div className="flex justify-center py-3" style={{ backgroundColor: colors.cardBg }}>
          <Sparkles className="w-4 h-4" style={{ color: colors.primary }} />
        </div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          {customHtmlData.show_title && customHtmlData.section_title && (
            <h3 className="font-bold text-sm mb-3 text-center" style={{ color: colors.primary, fontFamily: font }}>
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
      </>
    );
  };

  const renderQrShareSection = (qrData: any) => {
    if (!qrData.enable_qr) return null;
    
    return (
      <>
        <div className="flex justify-center py-3" style={{ backgroundColor: colors.cardBg }}>
          <QrCode className="w-4 h-4" style={{ color: colors.primary }} />
        </div>
        <div className="px-6 py-4" style={{ backgroundColor: colors.cardBg }}>
          <h3 className="font-bold text-sm mb-3 text-center" style={{ color: colors.primary, fontFamily: font }}>
            {qrData.qr_title || t('Share My Beauty Services')}
          </h3>
          
          <div 
            className="text-center p-4 rounded-xl" 
            style={{ backgroundColor: colors.accent }}
          >
            {qrData.qr_description && (
              <p 
                className="text-sm mb-3 italic" 
                style={{ color: colors.text }}
              >
                {qrData.qr_description}
              </p>
            )}
            
            <Button 
              className="w-full rounded-full" 
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
      </>
    );
  };

  const renderThankYouSection = (thankYouData: any) => {
    if (!thankYouData.message) return null;
    return (
      <div className="px-6 pb-2">
        <p className="text-xs text-center italic" style={{ color: colors.text + '70', fontFamily: font }}>
          {thankYouData.message}
        </p>
      </div>
    );
  };

  const copyrightSection = configSections.copyright;

  // Get ordered sections using the utility function
  const orderedSectionKeys = getSectionOrder(data.template_config || { sections: configSections, sectionSettings: configSections }, allSections);
    
  
  return (
    <div className="w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-lg" style={{ 
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
      
      <div className="p-6 space-y-3" style={{ background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}15)` }}>
        <Button 
          className="w-full h-12 font-bold rounded-full shadow-lg" 
          style={{ 
            backgroundColor: colors.primary,
            color: 'white',
            fontFamily: font
          }}
          onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
        >
          ✨ {t('Book Your Glow Up')}
        </Button>
        <Button 
          className="w-full h-10 font-medium rounded-full border-2" 
          style={{ 
            borderColor: colors.primary, 
            color: colors.primary,
            backgroundColor: 'transparent',
            fontFamily: font
          }}
          onClick={() => handleAppointmentBooking(configSections.appointments)}
        >
          💄 {t('Schedule Consultation')}
        </Button>
        
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full flex items-center justify-center mt-4 rounded-full" 
          style={{ 
            borderColor: colors.primary, 
            color: colors.primary,
            backgroundColor: colors.cardBg,
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
      
      {copyrightSection && (
        <div className="px-6 pb-4 pt-2" style={{ backgroundColor: colors.cardBg }}>
          {copyrightSection.text && (
            <p className="text-xs text-center" style={{ color: colors.text + '50', fontFamily: font }}>
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