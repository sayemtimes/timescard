import { handleAppointmentBooking } from '../VCardPreview';
import React, { useState } from 'react';
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
  Calendar, 
  Clock, 
  Star,
  ChevronRight,
  MessageSquare,
  Plane,
  Building,
  Ship,
  Map,
  Car,
  Shield,
  FileText,
  Package,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Camera,
  Menu,
  X,
  ArrowRight,
  Info,
  Compass,
  User,
  Video,
  Play,
  Share2,
  QrCode,
  UserPlus
} from 'lucide-react';
import SocialIcon from '../../../link-bio-builder/components/SocialIcon';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionOrder } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';
import { useTranslation } from 'react-i18next';
import { sanitizeVideoData } from '@/utils/secureVideoUtils';
import languageData from '@/../../resources/lang/language.json';

interface TravelTemplateProps {
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

export default function TravelTemplate({ data, template }: TravelTemplateProps) {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [activeDestination, setActiveDestination] = useState<number>(0);
  
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
    primary: '#1A73E8', 
    secondary: '#34A853', 
    accent: '#E8F5E9', 
    background: '#FFFFFF', 
    text: '#333333',
    cardBg: '#F8F9FA',
    borderColor: '#EEEEEE',
    buttonText: '#FFFFFF',
    highlightColor: '#FBBC04'
  };
  const font = configSections.font || template?.defaultFont || 'Poppins, sans-serif';

  // Get all sections for this business type
  const allSections = getBusinessTemplate('travel')?.sections || [];
  
  const renderHeaderSection = (headerData: any) => (
    <div className="relative">
      {/* Background Image */}
      <div className="relative h-64 overflow-hidden">
        {headerData.background_image ? (
          <img 
            src={headerData.background_image} 
            alt="Travel Background" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div 
            className="w-full h-full" 
            style={{ 
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              opacity: 0.9
            }}
          ></div>
        )}
        
        {/* Overlay with Logo and Name */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-6" 
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
        >
          {headerData.logo ? (
            <img 
              src={headerData.logo} 
              alt={headerData.name} 
              className="h-20 mb-4 object-contain"
            />
          ) : (
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center mb-4" 
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Compass size={36} color="#FFFFFF" />
            </div>
          )}
          
          <h1 
            className="text-2xl font-bold mb-2" 
            style={{ 
              color: '#FFFFFF',
              fontFamily: font,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            {headerData.name || data.name || t('Wanderlust Travel')}
          </h1>
          
          {headerData.tagline && (
            <p 
              className="text-sm" 
              style={{ 
                color: '#FFFFFF',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              {headerData.tagline}
            </p>
          )}
        </div>
      </div>
      
      {/* Language Selector */}
      {configSections.language && (
        <div className={`absolute top-4 ${isRTL ? 'left-16' : 'right-16'} z-20`}>
          <div className="relative">
            <button
              onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <span className="text-sm text-white">
                {String.fromCodePoint(...(languageData.find(lang => lang.code === currentLanguage)?.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt()) || [127468, 127463]))}
              </span>
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
        </div>
      )}
      
      {/* Menu Button */}
      <button
        className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-10"
        style={{ 
          backgroundColor: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(10px)'
        }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <X size={20} color="#FFFFFF" />
        ) : (
          <Menu size={20} color="#FFFFFF" />
        )}
      </button>

      {/* Save Contact Button */}
      <button
        className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center z-10"
        style={{ 
          backgroundColor: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(10px)'
        }}
        onClick={() => {
          const businessData = {
            name: headerData.name || data.name,
            title: headerData.tagline,
            email: configSections.contact?.email || data.email,
            phone: configSections.contact?.phone || data.phone,
            website: configSections.contact?.website,
            location: configSections.contact?.address
          };
          import('@/utils/vcfGenerator').then(module => {
            module.downloadVCF(businessData);
          });
        }}
      >
        <User size={20} color="#FFFFFF" />
      </button>
      
      {/* Mobile Menu */}
      {menuOpen && (
        <div 
          className="absolute top-0 left-0 w-full h-screen z-20 p-6 pt-16"
          style={{ 
            backgroundColor: colors.background,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ 
              backgroundColor: colors.primary,
              color: colors.buttonText
            }}
            onClick={() => setMenuOpen(false)}
          >
            <X size={20} />
          </button>
          
          <div className="space-y-4">
            <MenuLink 
              icon={<Info size={18} />} 
              label={t('About Us')} 
              onClick={() => {
                typeof document !== "undefined" && document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
                setMenuOpen(false);
              }}
              colors={colors}
              font={font}
            />
            
            <MenuLink 
              icon={<Compass size={18} />} 
              label={t('Destinations')} 
              onClick={() => {
                typeof document !== "undefined" && document.getElementById('destinations-section')?.scrollIntoView({ behavior: 'smooth' });
                setMenuOpen(false);
              }}
              colors={colors}
              font={font}
            />
            
            <MenuLink 
              icon={<Package size={18} />} 
              label={t('Services')} 
              onClick={() => {
                typeof document !== "undefined" && document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
                setMenuOpen(false);
              }}
              colors={colors}
              font={font}
            />
            
            <MenuLink 
              icon={<Star size={18} />} 
              label={t('Special Offers')} 
              onClick={() => {
                typeof document !== "undefined" && document.getElementById('offers-section')?.scrollIntoView({ behavior: 'smooth' });
                setMenuOpen(false);
              }}
              colors={colors}
              font={font}
            />
            
            <MenuLink 
              icon={<Camera size={18} />} 
              label={t('Gallery')} 
              onClick={() => {
                typeof document !== "undefined" && document.getElementById('gallery-section')?.scrollIntoView({ behavior: 'smooth' });
                setMenuOpen(false);
              }}
              colors={colors}
              font={font}
            />
            
            <MenuLink 
              icon={<MessageSquare size={18} />} 
              label={t('Contact')} 
              onClick={() => {
                typeof document !== "undefined" && document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
                setMenuOpen(false);
              }}
              colors={colors}
              font={font}
            />
          </div>
          
          <div className="mt-8">
            <Button
              className="w-full"
              style={{ 
                backgroundColor: colors.primary,
                color: colors.buttonText,
                fontFamily: font
              }}
              onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {t('Book a Consultation')}
            </Button>
          </div>
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
  
  const MenuLink = ({ icon, label, onClick, colors, font }: any) => (
    <button
      className="flex items-center w-full p-3 rounded-lg"
      style={{ 
        backgroundColor: colors.cardBg,
        color: colors.text,
        fontFamily: font
      }}
      onClick={onClick}
    >
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
        style={{ 
          backgroundColor: colors.primary,
          color: colors.buttonText
        }}
      >
        {icon}
      </div>
      <span className="font-medium">{label}</span>
      <ChevronRight size={16} className="ml-auto" />
    </button>
  );

  const renderAboutSection = (aboutData: any) => {
    if (!aboutData.description && !data.description) return null; 
    return (
      <div 
        id="about-section"
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <h2 
          className="text-xl font-bold mb-4 text-center" 
          style={{ 
            color: colors.primary,
            fontFamily: font
          }}
        >
          {t('About Us')}
        </h2>
        
        <p 
          className="text-sm leading-relaxed mb-6" 
          style={{ color: colors.text }}
        >
          {aboutData.description || data.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          {aboutData.year_established && (
            <div 
              className="p-4 rounded-lg text-center" 
              style={{ 
                backgroundColor: colors.accent,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <p 
                className="text-xs mb-1" 
                style={{ color: colors.text + '80' }}
              >
                {t('ESTABLISHED')}
              </p>
              <p 
                className="text-xl font-bold" 
                style={{ color: colors.primary }}
              >
                {aboutData.year_established}
              </p>
            </div>
          )}
          
          {aboutData.destinations_count && (
            <div 
              className="p-4 rounded-lg text-center" 
              style={{ 
                backgroundColor: colors.accent,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <p 
                className="text-xs mb-1" 
                style={{ color: colors.text + '80' }}
              >
                {t('DESTINATIONS')}
              </p>
              <p 
                className="text-xl font-bold" 
                style={{ color: colors.primary }}
              >
                {aboutData.destinations_count}+
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderDestinationsSection = (destinationsData: any) => {
    const destinations = destinationsData.destination_list || [];
    if (!Array.isArray(destinations) || destinations.length === 0) return null;
    
    return (
      <div 
        id="destinations-section"
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.cardBg,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <h2 
          className="text-xl font-bold mb-4 text-center" 
          style={{ 
            color: colors.primary,
            fontFamily: font
          }}
        >
          {t('Popular Destinations')}
        </h2>
        
        {/* Destination Selector */}
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {destinations.map((destination: any, index: number) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-200`}
              style={{ 
                backgroundColor: activeDestination === index ? colors.primary : colors.background,
                color: activeDestination === index ? colors.buttonText : colors.text,
                border: `1px solid ${activeDestination === index ? colors.primary : colors.borderColor}`,
                fontFamily: font
              }}
              onClick={() => setActiveDestination(index)}
            >
              {destination.name}
            </button>
          ))}
        </div>
        
        {/* Active Destination */}
        {destinations[activeDestination] && (
          <div 
            className="rounded-lg overflow-hidden" 
            style={{ 
              backgroundColor: colors.background,
              border: `1px solid ${colors.borderColor}`
            }}
          >
            {/* Destination Image */}
            <div className="relative h-48 overflow-hidden">
              {destinations[activeDestination].image ? (
                <img 
                  src={destinations[activeDestination].image} 
                  alt={destinations[activeDestination].name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div 
                  className="w-full h-full flex items-center justify-center" 
                  style={{ backgroundColor: colors.accent }}
                >
                  <Compass size={32} style={{ color: colors.primary }} />
                </div>
              )}
              
              {/* Location Badge */}
              {destinations[activeDestination].location && (
                <div 
                  className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium" 
                  style={{ 
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    color: colors.primary
                  }}
                >
                  <MapPin size={12} className="inline mr-1" />
                  {destinations[activeDestination].location}
                </div>
              )}
            </div>
            
            {/* Destination Details */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 
                  className="text-lg font-bold" 
                  style={{ 
                    color: colors.text,
                    fontFamily: font
                  }}
                >
                  {destinations[activeDestination].name}
                </h3>
                
                <div className="flex flex-col items-end">
                  {destinations[activeDestination].price && (
                    <span 
                      className="text-sm font-bold" 
                      style={{ color: colors.primary }}
                    >
                      {destinations[activeDestination].price}
                    </span>
                  )}
                  
                  {destinations[activeDestination].duration && (
                    <span 
                      className="text-xs" 
                      style={{ color: colors.text + '80' }}
                    >
                      {destinations[activeDestination].duration}
                    </span>
                  )}
                </div>
              </div>
              
              {destinations[activeDestination].description && (
                <p 
                  className="text-sm mb-4" 
                  style={{ color: colors.text + 'CC' }}
                >
                  {destinations[activeDestination].description}
                </p>
              )}
              
              {destinations[activeDestination].url && (
                <a
                  href={destinations[activeDestination].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium"
                  style={{ color: colors.primary }}
                >
                  {t('Learn More')}
                  <ArrowRight size={14} className="ml-1" />
                </a>
              )}
            </div>
          </div>
        )}
        
        {/* Destination Navigation Dots */}
        <div className="flex justify-center mt-4 overflow-x-auto hide-scrollbar">
          <div className="flex space-x-2 px-4">
            {destinations.map((_, index: number) => (
              <button
                key={index}
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ 
                  backgroundColor: activeDestination === index ? colors.primary : colors.borderColor
                }}
                onClick={() => setActiveDestination(index)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderServicesSection = (servicesData: any) => {
    const services = servicesData.service_list || [];
    if (!Array.isArray(services) || services.length === 0) return null;
    
    const getServiceIcon = (iconName: string) => {
      switch(iconName) {
        case 'flight': return <Plane size={24} />;
        case 'hotel': return <Building size={24} />;
        case 'cruise': return <Ship size={24} />;
        case 'tour': return <Map size={24} />;
        case 'car': return <Car size={24} />;
        case 'insurance': return <Shield size={24} />;
        case 'visa': return <FileText size={24} />;
        case 'custom': return <Package size={24} />;
        default: return <Globe size={24} />;
      }
    };
    
    return (
      <div 
        id="services-section"
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <h2 
          className="text-xl font-bold mb-4 text-center" 
          style={{ 
            color: colors.primary,
            fontFamily: font
          }}
        >
          {t('Our Services')}
        </h2>
        
        <div className="grid grid-cols-2 gap-3">
          {services.map((service: any, index: number) => (
            <div 
              key={index} 
              className="p-4 rounded-lg flex flex-col items-center text-center" 
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mb-2" 
                style={{ 
                  backgroundColor: colors.accent,
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

  const renderSpecialOffersSection = (offersData: any) => {
    const offers = offersData.offer_list || [];
    if (!Array.isArray(offers) || offers.length === 0) return null;
    
    return (
      <div 
        id="offers-section"
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.accent,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <h2 
          className="text-xl font-bold mb-4 text-center" 
          style={{ 
            color: colors.primary,
            fontFamily: font
          }}
        >
          {t('Special Offers')}
        </h2>
        
        <div className="space-y-4">
          {offers.map((offer: any, index: number) => (
            <div 
              key={index} 
              className="rounded-lg overflow-hidden" 
              style={{ 
                backgroundColor: colors.background,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              {/* Offer Image */}
              <div className="relative h-40 overflow-hidden">
                {offer.image ? (
                  <img 
                    src={offer.image} 
                    alt={offer.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div 
                    className="w-full h-full" 
                    style={{ 
                      background: `linear-gradient(135deg, ${colors.primary}40, ${colors.secondary}40)`,
                    }}
                  ></div>
                )}
                
                {/* Discount Badge */}
                {offer.discount && (
                  <div 
                    className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold" 
                    style={{ 
                      backgroundColor: colors.highlightColor,
                      color: '#FFFFFF'
                    }}
                  >
                    {offer.discount}
                  </div>
                )}
              </div>
              
              {/* Offer Details */}
              <div className="p-4">
                <h3 
                  className="text-base font-bold mb-1" 
                  style={{ 
                    color: colors.primary,
                    fontFamily: font
                  }}
                >
                  {offer.title}
                </h3>
                
                {offer.description && (
                  <p 
                    className="text-sm mb-2" 
                    style={{ color: colors.text + 'CC' }}
                  >
                    {offer.description}
                  </p>
                )}
                
                <div className="flex justify-between items-center">
                  {offer.valid_until && (
                    <span 
                      className="text-xs" 
                      style={{ color: colors.text + '80' }}
                    >
                      {t('Valid until')}: {offer.valid_until}
                    </span>
                  )}
                  
                  {offer.url && (
                    <a
                      href={offer.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium"
                      style={{ color: colors.primary }}
                    >
                      {t('View Details')}
                    </a>
                  )}
                </div>
              </div>
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
        id="gallery-section"
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <h2 
          className="text-xl font-bold mb-4 text-center" 
          style={{ 
            color: colors.primary,
            fontFamily: font
          }}
        >
          {t('Travel Gallery')}
        </h2>
        
        <div className="grid grid-cols-2 gap-2">
          {photos.map((photo: any, index: number) => (
            <div 
              key={index} 
              className="relative rounded-lg overflow-hidden aspect-square" 
              style={{ border: `1px solid ${colors.borderColor}` }}
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
                  <Camera size={24} style={{ color: colors.primary }} />
                </div>
              )}
              
              {(photo.caption || photo.location) && (
                <div 
                  className="absolute bottom-0 left-0 right-0 p-2 text-xs"
                  style={{ 
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color: '#FFFFFF'
                  }}
                >
                  {photo.caption}
                  {photo.caption && photo.location && <br />}
                  {photo.location && (
                    <span className="flex items-center mt-1">
                      <MapPin size={10} className="mr-1" />
                      {photo.location}
                    </span>
                  )}
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
          backgroundColor: colors.cardBg,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <h2 
          className="text-xl font-bold mb-4 text-center" 
          style={{ 
            color: colors.primary,
            fontFamily: font
          }}
        >
          {t('Traveler Stories')}
        </h2>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-600 ease-in-out"
              style={{ transform: `translateX(-${currentReview * 100}%)` }}
            >
              {reviews.map((review: any, index: number) => (
                <div key={index} className="w-full flex-shrink-0 px-1">
                  <div 
                    className="p-4 rounded-lg" 
                    style={{ 
                      backgroundColor: colors.background,
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
                      className="text-sm italic mb-3" 
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
                      
                      <div className="flex flex-col items-end">
                        {review.destination && (
                          <span 
                            className="text-xs" 
                            style={{ color: colors.primary }}
                          >
                            {review.destination}
                          </span>
                        )}
                        
                        {review.trip_date && (
                          <span 
                            className="text-xs" 
                            style={{ color: colors.text + '80' }}
                          >
                            {review.trip_date}
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
            <div className="flex justify-center mt-4 space-x-2">
              {testimonialsData.reviews.map((_, dotIndex) => (
                <Compass
                  key={dotIndex}
                  size={12}
                  fill={currentReview === dotIndex ? colors.primary : 'transparent'}
                  stroke={colors.primary}
                  className="transition-all duration-300"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderContactSection = (contactData: any) => {
    return (
      <div 
        id="contact-section"
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <h2 
          className="text-xl font-bold mb-4 text-center" 
          style={{ 
            color: colors.primary,
            fontFamily: font
          }}
        >
          {t('Contact Us')}
        </h2>
        
        <div className="space-y-3 mb-6">
          {(contactData.phone || data.phone) && (
            <a 
              href={`tel:${contactData.phone || data.phone}`} 
              className="flex items-center p-3 rounded-lg" 
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center mr-3" 
                style={{ 
                  backgroundColor: colors.accent,
                  color: colors.primary
                }}
              >
                <Phone size={18} />
              </div>
              <div>
                <p 
                  className="text-xs" 
                  style={{ color: colors.text + '80' }}
                >
                  {t('PHONE')}
                </p>
                <p 
                  className="text-sm font-medium" 
                  style={{ color: colors.text }}
                >
                  {contactData.phone || data.phone}
                </p>
              </div>
            </a>
          )}
          
          {contactData.emergency && (
            <a 
              href={`tel:${contactData.emergency}`} 
              className="flex items-center p-3 rounded-lg" 
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center mr-3" 
                style={{ 
                  backgroundColor: '#FFEBEE',
                  color: '#E53935'
                }}
              >
                <Phone size={18} />
              </div>
              <div>
                <p 
                  className="text-xs" 
                  style={{ color: colors.text + '80' }}
                >
                  {t('EMERGENCY CONTACT')}
                </p>
                <p 
                  className="text-sm font-medium" 
                  style={{ color: colors.text }}
                >
                  {contactData.emergency}
                </p>
              </div>
            </a>
          )}
          
          {(contactData.email || data.email) && (
            <a 
              href={`mailto:${contactData.email || data.email}`} 
              className="flex items-center p-3 rounded-lg" 
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center mr-3" 
                style={{ 
                  backgroundColor: colors.accent,
                  color: colors.primary
                }}
              >
                <Mail size={18} />
              </div>
              <div className="flex-1 overflow-hidden">
                <p 
                  className="text-xs" 
                  style={{ color: colors.text + '80' }}
                >
                  {t('EMAIL')}
                </p>
                <p 
                  className="text-sm font-medium truncate" 
                  style={{ color: colors.text }}
                >
                  {contactData.email || data.email}
                </p>
              </div>
            </a>
          )}
          
          {contactData.address && (
            <div 
              className="flex items-center p-3 rounded-lg" 
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0" 
                style={{ 
                  backgroundColor: colors.accent,
                  color: colors.primary
                }}
              >
                <MapPin size={18} />
              </div>
              <div>
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
        
        <div className="space-y-3">
          {configSections.appointments?.booking_url && (
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
              {configSections.appointments?.booking_text || t('Schedule a Consultation')}
            </Button>
          )}
          
          <Button
            className="w-full"
            style={{ 
              backgroundColor: colors.secondary,
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

  const renderCopyrightSection = (copyrightData: any) => {
    if (!copyrightData.text) return null;
    
    return (
      <div 
        className="px-5 py-4" 
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
      case 'destinations':
        return renderDestinationsSection(sectionData);
      case 'services':
        return renderServicesSection(sectionData);
      case 'videos':
        return renderVideosSection(sectionData);
      case 'youtube':
        return renderYouTubeSection(sectionData);
      case 'special_offers':
        return renderSpecialOffersSection(sectionData);
      case 'gallery':
        return renderGallerySection(sectionData);
      case 'testimonials':
        return renderTestimonialsSection(sectionData);
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
      case 'thank_you':
        return renderThankYouSection(sectionData);
      case 'copyright':
        return renderCopyrightSection(sectionData);
      default:
        return null;
    }
  };
  
  const renderBusinessHoursSection = (hoursData: any) => {
    const hours = hoursData.hours || [];
    if (!Array.isArray(hours) || hours.length === 0) return null;
    return (
      <div className="px-5 py-6">
        <h2 className="text-xl font-bold mb-4 text-center" style={{ color: colors.primary, fontFamily: font }}>{t('Office Hours')}</h2>
        <div className="space-y-2">
          {hours.map((hour: any, index: number) => (
            <div key={index} className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.borderColor}` }}>
              <span className="capitalize font-medium text-sm" style={{ color: colors.text }}>{hour.day}</span>
              <span className="text-sm" style={{ color: hour.is_closed ? colors.text + '80' : colors.primary }}>
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
      <div className="px-5 py-6" style={{ backgroundColor: colors.primary, color: colors.buttonText }}>
        <div className="text-center">
          <h2 
            className="text-xl font-bold mb-3" 
            style={{ 
              color: colors.buttonText, 
              fontFamily: font,
              textAlign: 'center',
              margin: '0 auto 12px auto'
            }}
          >
            {appointmentsData.section_title || t('Plan Your Adventure')}
          </h2>
          <p 
            className="text-sm mb-4" 
            style={{ 
              color: 'rgba(255,255,255,0.8)',
              textAlign: 'center',
              margin: '0 auto 16px auto',
              lineHeight: '1.5'
            }}
          >
            {appointmentsData.section_description || t('Ready to explore the world? Let us help you plan your perfect trip.')}
          </p>
          <div 
            className="flex flex-col space-y-3" 
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Button 
              className="w-full" 
              style={{ 
                backgroundColor: colors.background, 
                color: colors.primary, 
                fontFamily: font,
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }} 
              onClick={() => handleAppointmentBooking(configSections.appointments)}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {appointmentsData.booking_text || t('Schedule Consultation')}
            </Button>
            <Button 
              className="w-full" 
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                color: colors.buttonText, 
                fontFamily: font,
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }} 
              onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              {appointmentsData.consultation_text || t('Free Consultation')}
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  const renderLocationSection = (locationData: any) => {
    if (!locationData.map_embed_url && !locationData.directions_url) return null;
    
    return (
      <div className="px-5 py-6">
        <h2 className="text-xl font-bold mb-4 text-center" style={{ color: colors.primary, fontFamily: font }}>{t('Our Location')}</h2>
        
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
      <div className="px-5 py-6">
        <h2 className="text-xl font-bold mb-4 text-center" style={{ color: colors.primary, fontFamily: font }}>{t('Download Our App')}</h2>
        {appData.app_description && <p className="text-sm mb-4 text-center" style={{ color: colors.text }}>{appData.app_description}</p>}
        <div className="grid grid-cols-2 gap-3">
          {appData.app_store_url && <Button variant="outline" style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }} onClick={() => typeof window !== "undefined" && window.open(appData.app_store_url, "_blank", "noopener,noreferrer")}>{t("App Store")}</Button>}
          {appData.play_store_url && <Button variant="outline" style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }} onClick={() => typeof window !== "undefined" && window.open(appData.play_store_url, "_blank", "noopener,noreferrer")}>{t("Play Store")}</Button>}
        </div>
      </div>
    );
  };
  
  const renderContactFormSection = (formData: any) => {
    if (!formData.form_title) return null;
    return (
      <div className="px-5 py-6" style={{ backgroundColor: colors.primary, color: colors.buttonText }}>
        <h2 className="text-lg font-bold mb-4 text-center" style={{ color: colors.buttonText, fontFamily: font }}>{formData.form_title}</h2>
        {formData.form_description && <p className="text-sm mb-4 text-center" style={{ color: 'rgba(255,255,255,0.8)' }}>{formData.form_description}</p>}
        <Button className="w-full" style={{ backgroundColor: colors.background, color: colors.primary, fontFamily: font }} onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <MessageSquare className="w-4 h-4 mr-2" />{t('Contact Us')}
        </Button>
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
          {t('Travel Videos')}
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
                      alt={video.title || 'travel videos'} 
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
                      <span className="text-xs font-medium" style={{ color: colors.primary, fontFamily: font }}>{t('Travel Videos')}</span>
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
                      ✈️ {video.video_type}
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
                {youtubeData.channel_name || t('Travel Adventures')}
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
                ✈️ {t('TRAVEL GUIDES')}
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
        className="px-5 py-8" 
        style={{ backgroundColor: colors.background }}
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
        className="px-5 py-8" 
        style={{ backgroundColor: colors.cardBg }}
        id="qr_share"
      >
        <h2 
          className="text-lg font-bold mb-4 text-center" 
          style={{ 
            color: colors.primary,
            fontFamily: font
          }}
        >
          {qrData.qr_title || t('Share Our Services')}
        </h2>
        
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
            <QrCode className="w-4 h-4 mr-2" />
            {t("Share QR Code")}
          </Button>
        </div>
      </div>
    );
  };

  const renderThankYouSection = (thankYouData: any) => {
    if (!thankYouData.message) return null;
    return (
      <div className="px-5 py-4">
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
        .filter(key => key !== 'colors' && key !== 'font' && key !== 'copyright')
        .map((sectionKey) => (
          <React.Fragment key={sectionKey}>
            {renderSection(sectionKey)}
          </React.Fragment>
        ))}
        
      {/* Save Contact Button */}
      <div className="p-5 border-t" style={{ borderColor: colors.borderColor }}>
        <div className="flex gap-2">
          <Button 
            className="flex-1" 
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
          
          <Button 
            variant="outline"
            size="sm"
            style={{ 
              borderColor: colors.primary, 
              color: colors.primary, 
              fontFamily: font 
            }}
            onClick={() => {
              if (typeof navigator !== 'undefined' && navigator.share) {
                navigator.share({
                  title: data.name || configSections.header?.name || 'Business Card',
                  text: configSections.header?.tagline || 'Check out this business card',
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