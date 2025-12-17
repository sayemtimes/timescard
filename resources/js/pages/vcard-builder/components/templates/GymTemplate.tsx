import { handleAppointmentBooking } from '../VCardPreview';
import React, { useState, useMemo } from 'react';
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
  Calendar, 
  Clock, 
  Star,
  ChevronRight,
  MessageSquare,
  Dumbbell,
  Users,
  Award,
  User,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Camera,
  CheckCircle,
  ArrowRight,
  Clock3,
  Video,
  Play,
  Share2,
  QrCode
} from 'lucide-react';
import SocialIcon from '../../../link-bio-builder/components/SocialIcon';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionOrder } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';
import languageData from '@/../../resources/lang/language.json';

interface GymTemplateProps {
  data: any;
  template: any;
}

export default function GymTemplate({ data, template }: GymTemplateProps) {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('classes');
  const [activeDay, setActiveDay] = useState<string>('monday');
  
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
    primary: '#FF5722', 
    secondary: '#212121', 
    accent: '#FBE9E7', 
    background: '#FFFFFF', 
    text: '#333333',
    cardBg: '#F5F5F5',
    borderColor: '#E0E0E0',
    buttonText: '#FFFFFF',
    highlightColor: '#FFC107'
  };
  const font = configSections.font || template?.defaultFont || 'Roboto, sans-serif';

  // Get all sections for this business type
  const allSections = getBusinessTemplate('gym')?.sections || [];
  
  const renderHeaderSection = (headerData: any) => (
    <div className="relative">
      {/* Hero Image */}
      <div className="relative h-64 overflow-hidden">
        {headerData.hero_image ? (
          <img 
            src={headerData.hero_image} 
            alt="Gym Hero" 
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
        
        {/* Language Selector */}
        {configSections.language && (
          <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}>
            <div className="relative">
              <button
                onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-bold transition-all hover:scale-105"
                style={{ 
                  backgroundColor: colors.primary,
                  color: colors.buttonText,
                  fontFamily: font
                }}
              >
                <Globe className="w-3 h-3" />
                <span>{languageData.find(lang => lang.code === currentLanguage)?.name || 'EN'}</span>
              </button>
              
              {showLanguageSelector && (
                <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 min-w-[140px] max-h-48 overflow-y-auto z-[99999]">
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
        
        {/* Overlay with Logo and Name */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-6" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
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
                backgroundColor: colors.primary,
                color: colors.buttonText
              }}
            >
              <Dumbbell size={36} />
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
            {headerData.name || data.name || 'PowerFit Studio'}
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
      
      {/* Quick Action Buttons */}
      <div 
        className="grid grid-cols-3 gap-px" 
        style={{ 
          backgroundColor: colors.borderColor
        }}
      >
        <Button
          className="rounded-none h-14 flex flex-col items-center justify-center"
          style={{ 
            backgroundColor: colors.secondary,
            color: colors.buttonText,
            fontFamily: font
          }}
          onClick={() => handleAppointmentBooking(configSections.appointments)}
        >
          <Calendar size={18} className="mb-1" />
          <span className="text-xs">{t("Book a Class")}</span>
        </Button>
        
        <Button
          className="rounded-none h-14 flex flex-col items-center justify-center"
          style={{ 
            backgroundColor: colors.primary,
            color: colors.buttonText,
            fontFamily: font
          }}
          onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
        >
          <MessageSquare size={18} className="mb-1" />
          <span className="text-xs">{t("Contact Us")}</span>
        </Button>

        <Button
          className="rounded-none h-14 flex flex-col items-center justify-center"
          style={{ 
            backgroundColor: colors.secondary,
            color: colors.buttonText,
            fontFamily: font
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
              if (module && module.downloadVCF) {
                module.downloadVCF(businessData);
              }
            }).catch(() => {});
          }}
        >
          <User size={18} className="mb-1" />
          <span className="text-xs">{t("Save Contact")}</span>
        </Button>
      </div>
      
      {/* Navigation Tabs */}
      <div 
        className="flex overflow-x-auto hide-scrollbar" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <TabButton 
          label="Classes" 
          icon={<Dumbbell size={16} />}
          active={activeTab === 'classes'} 
          onClick={() => setActiveTab('classes')} 
          colors={colors}
          font={font}
        />
        <TabButton 
          label="Schedule" 
          icon={<Calendar size={16} />}
          active={activeTab === 'schedule'} 
          onClick={() => setActiveTab('schedule')} 
          colors={colors}
          font={font}
        />
        <TabButton 
          label="Trainers" 
          icon={<Users size={16} />}
          active={activeTab === 'trainers'} 
          onClick={() => setActiveTab('trainers')} 
          colors={colors}
          font={font}
        />
        <TabButton 
          label="Membership" 
          icon={<Award size={16} />}
          active={activeTab === 'membership'} 
          onClick={() => setActiveTab('membership')} 
          colors={colors}
          font={font}
        />
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
  
  const TabButton = ({ label, icon, active, onClick, colors, font }: any) => (
    <button
      className={`px-4 py-3 flex flex-1 flex-col items-center justify-center transition-all duration-200`}
      style={{ 
        color: active ? colors.primary : colors.text + '80',
        borderBottom: active ? `3px solid ${colors.primary}` : `3px solid transparent`,
        fontFamily: font,
        backgroundColor: active ? colors.accent : 'transparent'
      }}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs mt-1 font-medium">{label}</span>
    </button>
  );

  const renderAboutSection = (aboutData: any) => {
    if (!aboutData.description && !data.description) return null;
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <h2 
          className="text-xl font-bold mb-4" 
          style={{ 
            color: colors.text,
            fontFamily: font
          }}
        >
          {t("About Our Gym")}
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
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <p 
                className="text-xs mb-1" 
                style={{ color: colors.text + '80' }}
              >
                {t("Established")}
              </p>
              <p 
                className="text-xl font-bold" 
                style={{ color: colors.primary }}
              >
                {aboutData.year_established}
              </p>
            </div>
          )}
          
          {aboutData.members_count && (
            <div 
              className="p-4 rounded-lg text-center" 
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <p 
                className="text-xs mb-1" 
                style={{ color: colors.text + '80' }}
              >
                {t("Members")}
              </p>
              <p 
                className="text-xl font-bold" 
                style={{ color: colors.primary }}
              >
                {aboutData.members_count}+
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderClassesSection = (classesData: any) => {
    if (activeTab !== 'classes') return null;
    
    const classes = classesData.class_list || [];
    if (!Array.isArray(classes) || classes.length === 0) return null;
    
    const getLevelBadge = (level: string) => {
      const levels: Record<string, { bg: string, text: string }> = {
        'beginner': { bg: '#E8F5E9', text: '#2E7D32' },
        'intermediate': { bg: '#FFF3E0', text: '#E65100' },
        'advanced': { bg: '#FFEBEE', text: '#C62828' },
        'all': { bg: '#E3F2FD', text: '#1565C0' }
      };
      
      return levels[level] || { bg: colors.accent, text: colors.primary };
    };
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background
        }}
      >
        <h2 
          className="text-xl font-bold mb-4" 
          style={{ 
            color: colors.text,
            fontFamily: font
          }}
        >
          {t("Our Classes")}
        </h2>
        
        <div className="space-y-4">
          {classes.map((fitnessClass: any, index: number) => (
            <div 
              key={index} 
              className="rounded-lg overflow-hidden" 
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              {/* Class Image or Placeholder */}
              <div className="relative h-40 overflow-hidden">
                {fitnessClass.image ? (
                  <img 
                    src={fitnessClass.image} 
                    alt={fitnessClass.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center" 
                    style={{ 
                      backgroundColor: colors.accent,
                      color: colors.primary
                    }}
                  >
                    <Dumbbell size={48} />
                  </div>
                )}
                
                {/* Duration Badge */}
                {fitnessClass.duration && (
                  <div 
                    className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium flex items-center" 
                    style={{ 
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      color: '#FFFFFF'
                    }}
                  >
                    <Clock size={12} className="mr-1" />
                    {fitnessClass.duration}
                  </div>
                )}
                
                {/* Level Badge */}
                {fitnessClass.level && (
                  <div 
                    className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-medium capitalize" 
                    style={{ 
                      backgroundColor: getLevelBadge(fitnessClass.level).bg,
                      color: getLevelBadge(fitnessClass.level).text
                    }}
                  >
                    {fitnessClass.level}
                  </div>
                )}
              </div>
              
              {/* Class Details */}
              <div className="p-4">
                <h3 
                  className="text-lg font-bold mb-2" 
                  style={{ 
                    color: colors.text,
                    fontFamily: font
                  }}
                >
                  {fitnessClass.name}
                </h3>
                
                {fitnessClass.description && (
                  <p 
                    className="text-sm" 
                    style={{ color: colors.text + 'CC' }}
                  >
                    {fitnessClass.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderScheduleSection = (scheduleData: any) => {
    if (activeTab !== 'schedule') return null;
    
    const scheduleItems = scheduleData.schedule_list || [];
    if (!Array.isArray(scheduleItems) || scheduleItems.length === 0) return null;
    
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    // Filter schedule items for the active day
    const daySchedule = scheduleItems.filter((item: any) => item.day === activeDay);
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background
        }}
      >
        <h2 
          className="text-xl font-bold mb-4" 
          style={{ 
            color: colors.text,
            fontFamily: font
          }}
        >
          {t("Class Schedule")}
        </h2>
        
        {/* Day Selector */}
        <div 
          className="flex overflow-x-auto hide-scrollbar mb-4" 
          style={{ scrollbarWidth: 'none' }}
        >
          {days.map((day, index) => (
            <button
              key={day}
              className={`px-3 py-2 mx-1 rounded-full text-xs font-medium flex-shrink-0 transition-all duration-200`}
              style={{ 
                backgroundColor: activeDay === day ? colors.primary : colors.cardBg,
                color: activeDay === day ? colors.buttonText : colors.text,
                fontFamily: font
              }}
              onClick={() => setActiveDay(day)}
            >
              {dayLabels[index]}
            </button>
          ))}
        </div>
        
        {daySchedule.length > 0 ? (
          <div className="space-y-3">
            {daySchedule.map((item: any, index: number) => (
              <div 
                key={index} 
                className="p-4 rounded-lg flex items-center" 
                style={{ 
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.borderColor}`
                }}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0" 
                  style={{ 
                    backgroundColor: colors.primary,
                    color: colors.buttonText
                  }}
                >
                  <Clock3 size={20} />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 
                      className="text-base font-bold" 
                      style={{ 
                        color: colors.text,
                        fontFamily: font
                      }}
                    >
                      {item.class_name}
                    </h3>
                    
                    <span 
                      className="text-sm font-medium" 
                      style={{ color: colors.primary }}
                    >
                      {item.time}
                    </span>
                  </div>
                  
                  {item.trainer && (
                    <p 
                      className="text-xs flex items-center mt-1" 
                      style={{ color: colors.text + '80' }}
                    >
                      <User size={12} className="mr-1" />
                      {item.trainer}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div 
            className="p-4 rounded-lg text-center" 
            style={{ 
              backgroundColor: colors.cardBg,
              border: `1px solid ${colors.borderColor}`
            }}
          >
            <p 
              className="text-sm" 
              style={{ color: colors.text + '80' }}
            >
              {t("No classes scheduled for this day.")}
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderTrainersSection = (trainersData: any) => {
    if (activeTab !== 'trainers') return null;
    
    const trainers = trainersData.trainer_list || [];
    if (!Array.isArray(trainers) || trainers.length === 0) return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background
        }}
      >
        <h2 
          className="text-xl font-bold mb-4" 
          style={{ 
            color: colors.text,
            fontFamily: font
          }}
        >
          {t("Our Trainers")}
        </h2>
        
        <div className="space-y-5">
          {trainers.map((trainer: any, index: number) => (
            <div 
              key={index} 
              className="rounded-lg overflow-hidden" 
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.borderColor}`
              }}
            >
              <div className="flex">
                {/* Trainer Image */}
                <div className="w-1/3 h-32">
                  {trainer.image ? (
                    <img 
                      src={trainer.image} 
                      alt={trainer.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center" 
                      style={{ 
                        backgroundColor: colors.accent,
                        color: colors.primary
                      }}
                    >
                      <User size={32} />
                    </div>
                  )}
                </div>
                
                {/* Trainer Details */}
                <div className="w-2/3 p-3">
                  <h3 
                    className="text-base font-bold" 
                    style={{ 
                      color: colors.text,
                      fontFamily: font
                    }}
                  >
                    {trainer.name}
                  </h3>
                  
                  {trainer.position && (
                    <p 
                      className="text-xs mb-2" 
                      style={{ color: colors.primary }}
                    >
                      {trainer.position}
                    </p>
                  )}
                  
                  {trainer.certifications && (
                    <p 
                      className="text-xs" 
                      style={{ color: colors.text + '80' }}
                    >
                      {trainer.certifications}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Trainer Bio */}
              {trainer.bio && (
                <div className="p-3 pt-0">
                  <p 
                    className="text-sm" 
                    style={{ color: colors.text + 'CC' }}
                  >
                    {trainer.bio.length > 120 ? trainer.bio.substring(0, 120) + '...' : trainer.bio}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMembershipSection = (membershipData: any) => {
    if (activeTab !== 'membership') return null;
    
    const plans = membershipData.plan_list || [];
    if (!Array.isArray(plans) || plans.length === 0) return null;
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background
        }}
      >
        <h2 
          className="text-xl font-bold mb-4" 
          style={{ 
            color: colors.text,
            fontFamily: font
          }}
        >
          {t("Membership Plans")}
        </h2>
        
        <div className="space-y-4">
          {plans.map((plan: any, index: number) => (
            <div 
              key={index} 
              className="rounded-lg overflow-hidden" 
              style={{ 
                backgroundColor: plan.highlight ? colors.accent : colors.cardBg,
                border: plan.highlight ? `2px solid ${colors.primary}` : `1px solid ${colors.borderColor}`
              }}
            >
              {/* Plan Header */}
              <div 
                className="p-4" 
                style={{ 
                  backgroundColor: plan.highlight ? colors.primary : colors.secondary,
                  color: colors.buttonText
                }}
              >
                <div className="flex justify-between items-center">
                  <h3 
                    className="text-lg font-bold" 
                    style={{ 
                      color: colors.buttonText,
                      fontFamily: font
                    }}
                  >
                    {plan.name}
                  </h3>
                  
                  {plan.highlight && (
                    <Badge 
                      className="bg-white text-xs" 
                      style={{ color: colors.primary }}
                    >
                      {t("Popular")}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-baseline mt-1">
                  <span 
                    className="text-xl font-bold" 
                    style={{ color: colors.buttonText }}
                  >
                    {plan.price}
                  </span>
                  
                  {plan.duration && (
                    <span 
                      className="text-xs ml-1" 
                      style={{ color: 'rgba(255,255,255,0.8)' }}
                    >
                      {plan.duration}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Plan Details */}
              <div className="p-4">
                {plan.description && (
                  <p 
                    className="text-sm mb-3" 
                    style={{ color: colors.text }}
                  >
                    {plan.description}
                  </p>
                )}
                
                {plan.features && (
                  <div className="space-y-2">
                    {plan.features.split(',').map((feature: string, i: number) => (
                      <div 
                        key={i} 
                        className="flex items-center"
                      >
                        <CheckCircle 
                          size={16} 
                          className="mr-2" 
                          style={{ color: colors.primary }}
                        />
                        <span 
                          className="text-sm" 
                          style={{ color: colors.text }}
                        >
                          {feature.trim()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                
                <Button
                  className="w-full mt-4"
                  style={{ 
                    backgroundColor: plan.highlight ? colors.primary : colors.secondary,
                    color: colors.buttonText,
                    fontFamily: font
                  }}
                  onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
                >
                  {t("Select Plan")}
                </Button>
              </div>
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
          backgroundColor: colors.accent,
          borderTop: `1px solid ${colors.borderColor}`,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <h2 
          className="text-xl font-bold mb-4" 
          style={{ 
            color: colors.text,
            fontFamily: font
          }}
        >
          {t("Success Stories")}
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
                      backgroundColor: colors.background,
                      border: `1px solid ${colors.borderColor}`
                    }}
                  >
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                        {review.image ? (
                          <img 
                            src={review.image} 
                            alt={review.member_name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div 
                            className="w-full h-full flex items-center justify-center" 
                            style={{ 
                              backgroundColor: colors.primary,
                              color: colors.buttonText
                            }}
                          >
                            <User size={20} />
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <h3 
                          className="text-sm font-bold" 
                          style={{ 
                            color: colors.text,
                            fontFamily: font
                          }}
                        >
                          {review.member_name}
                        </h3>
                        
                        <div className="flex items-center">
                          {review.achievement && (
                            <Badge 
                              className="text-xs mr-2" 
                              style={{ 
                                backgroundColor: colors.primary,
                                color: colors.buttonText
                              }}
                            >
                              {review.achievement}
                            </Badge>
                          )}
                          
                          {review.member_since && (
                            <span 
                              className="text-xs" 
                              style={{ color: colors.text + '80' }}
                            >
                              {t("Member since")} {review.member_since}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <p 
                      className="text-sm" 
                      style={{ color: colors.text }}
                    >
                      "{(review.review || '').replace(/[<>"'&]/g, '')}"
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

  const renderVideosSection = (videosData: any) => {
    const videos = videosData.video_list || [];
    if (!Array.isArray(videos) || videos.length === 0) return null;
    
    // Process video content
    const videoContent = React.useMemo(() => {
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
    }, [videos]);
    
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <h2 
          className="text-xl font-bold mb-4" 
          style={{ 
            color: colors.text,
            fontFamily: font
          }}
        >
         {t("Workout Videos")}
        </h2>
        
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
                      alt={video.title || 'Workout video'} 
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
                    {video.duration && (
                      <div className="absolute bottom-2 right-2 px-2 py-1 rounded text-xs font-bold" style={{ backgroundColor: 'rgba(0,0,0,0.8)', color: 'white' }}>
                        {video.duration}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-40 flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
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
                  {video.workout_type && (
                    <span 
                      className="text-xs px-2 py-1 rounded font-bold" 
                      style={{ 
                        backgroundColor: colors.primary,
                        color: colors.buttonText,
                        fontFamily: font
                      }}
                    >
                      {video.workout_type.replace('_', ' ').toUpperCase()}
                    </span>
                  )}
                  {video.difficulty_level && (
                    <span 
                      className="text-xs px-2 py-1 rounded" 
                      style={{ 
                        backgroundColor: colors.accent,
                        color: colors.primary,
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
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.cardBg,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <h2 
          className="text-xl font-bold mb-4" 
          style={{ 
            color: colors.text,
            fontFamily: font
          }}
        >
          {t("YouTube Channel")}
        </h2>
        
        <div>
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
        </div>
        
        <div 
          className="rounded-lg p-4" 
          style={{ 
            backgroundColor: colors.background,
            border: `1px solid ${colors.borderColor}`
          }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
              <Youtube className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-base" style={{ color: colors.text, fontFamily: font }}>
                {youtubeData.channel_name || 'Gym Channel'}
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
                💪 {t("WORKOUT PLAYLIST")}
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
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <h2 
          className="text-xl font-bold mb-4" 
          style={{ 
            color: colors.text,
            fontFamily: font
          }}
        >
          {t("Our Facility")}
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
        <h2 
          className="text-xl font-bold mb-4" 
          style={{ 
            color: colors.text,
            fontFamily: font
          }}
        >
          {t("Gym Hours")}
        </h2>
        
        <div 
          className="rounded-lg overflow-hidden" 
          style={{ border: `1px solid ${colors.borderColor}` }}
        >
          {hours.map((hour: any, index: number) => (
            <div 
              key={index} 
              className="flex justify-between items-center p-3"
              style={{ 
                backgroundColor: hour.day === currentDay ? colors.accent : colors.background,
                borderBottom: index < hours.length - 1 ? `1px solid ${colors.borderColor}` : 'none'
              }}
            >
              <div className="flex items-center">
                <span 
                  className="capitalize text-sm font-bold" 
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
                  color: hour.is_closed ? colors.text + '80' : colors.text,
                  fontWeight: hour.day === currentDay ? 'bold' : 'normal'
                }}
              >
                {hour.is_closed ? 'Closed' : `${hour.open_time} - ${hour.close_time}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContactSection = (contactData: any) => {
    return (
      <div 
        className="px-5 py-6" 
        style={{ 
          backgroundColor: colors.background,
          borderBottom: `1px solid ${colors.borderColor}`
        }}
      >
        <h2 
          className="text-xl font-bold mb-4" 
          style={{ 
            color: colors.text,
            fontFamily: font
          }}
        >
          {t("Contact Us")}
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
                  backgroundColor: colors.primary,
                  color: colors.buttonText
                }}
              >
                <Phone size={18} />
              </div>
              <div>
                <p 
                  className="text-xs" 
                  style={{ color: colors.text + '80' }}
                >
                  {t("PHONE")}
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
                  backgroundColor: colors.primary,
                  color: colors.buttonText
                }}
              >
                <Mail size={18} />
              </div>
              <div className="flex-1 overflow-hidden">
                <p 
                  className="text-xs" 
                  style={{ color: colors.text + '80' }}
                >
                  {t("EMAIL")}
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
                  backgroundColor: colors.primary,
                  color: colors.buttonText
                }}
              >
                <MapPin size={18} />
              </div>
              <div>
                <p 
                  className="text-xs" 
                  style={{ color: colors.text + '80' }}
                >
                  {t("ADDRESS")}
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
                    {t("Get Directions")}
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
              {configSections.appointments?.booking_text || 'Book a Class'}
            </Button>
          )}
          
          {configSections.appointments?.trial_text && (
            <Button
              className="w-full"
              style={{ 
                backgroundColor: colors.secondary,
                color: colors.buttonText,
                fontFamily: font
              }}
              onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
            >
              <Award className="w-4 h-4 mr-2" />
              {configSections.appointments?.trial_text || 'Free Trial'}
            </Button>
          )}
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
          backgroundColor: colors.secondary,
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
              className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-105"
              style={{ 
                backgroundColor: colors.primary,
                color: colors.buttonText
              }}
            >
              <SocialIcon platform={link.platform} color="currentColor" />
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
        style={{ backgroundColor: colors.secondary }}
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

  const renderSection = (sectionKey: string) => {
    const sectionData = configSections[sectionKey] || {};
    if (!sectionData || Object.keys(sectionData).length === 0 || sectionData.enabled === false) return null;
    
    switch (sectionKey) {
      case 'header':
        return renderHeaderSection(sectionData);
      case 'about':
        return renderAboutSection(sectionData);
      case 'classes':
        return renderClassesSection(sectionData);
      case 'trainers':
        return renderTrainersSection(sectionData);
      case 'membership':
        return renderMembershipSection(sectionData);
      case 'schedule':
        return renderScheduleSection(sectionData);
      case 'videos':
        return renderVideosSection(sectionData);
      case 'youtube':
        return renderYouTubeSection(sectionData);
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
      case 'app_download':
        return renderAppDownloadSection(sectionData);
      case 'contact_form':
        return renderContactFormSection(sectionData);
      case 'custom_html':
        return renderCustomHtmlSection(sectionData);
      case 'qr_share':
        return renderQrShareSection(sectionData);
      case 'google_map':
        return renderLocationSection(sectionData);
      case 'thank_you':
        return renderThankYouSection(sectionData);
      case 'copyright':
        return renderCopyrightSection(sectionData);
      default:
        return null;
    }
  };
  
  const renderAppDownloadSection = (appData: any) => {
    if (!appData.app_store_url && !appData.play_store_url) return null;
    return (
      <div className="px-5 py-6" style={{ backgroundColor: colors.cardBg, borderBottom: `1px solid ${colors.borderColor}` }}>
        <h2 className="text-xl font-bold mb-4" style={{ color: colors.text, fontFamily: font }}>{t("Download Our App")}</h2>
        {appData.app_description && <p className="text-sm mb-4" style={{ color: colors.text }}>{appData.app_description}</p>}
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
      <div className="px-5 py-6" style={{ backgroundColor: colors.background, borderBottom: `1px solid ${colors.borderColor}` }}>
        <h2 className="text-xl font-bold mb-4" style={{ color: colors.text, fontFamily: font }}>{formData.form_title}</h2>
        {formData.form_description && <p className="text-sm mb-4" style={{ color: colors.text }}>{formData.form_description}</p>}
        <Button className="w-full" style={{ backgroundColor: colors.primary, color: colors.buttonText, fontFamily: font }} onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <MessageSquare className="w-4 h-4 mr-2" />{t("Send Message")}
        </Button>
      </div>
    );
  };
  
  const renderLocationSection = (locationData: any) => {
    if (!locationData.map_embed_url && !locationData.directions_url) return null;
    
    return (
      <div className="px-5 py-6" style={{ backgroundColor: colors.background, borderBottom: `1px solid ${colors.borderColor}` }}>
        <h2 className="text-xl font-bold mb-4" style={{ color: colors.text, fontFamily: font }}>{t("Location")}</h2>
        
        <div className="space-y-3">
          {locationData.map_embed_url && (
            <div className="rounded-lg overflow-hidden" style={{ height: '200px' }}>
              <div dangerouslySetInnerHTML={{ __html: locationData.map_embed_url }} className="w-full h-full" />
            </div>
          )}
          
          {locationData.directions_url && (
            <Button className="w-full" style={{ backgroundColor: colors.primary, color: colors.buttonText, fontFamily: font }} onClick={() => typeof window !== "undefined" && window.open(locationData.directions_url, "_blank", "noopener,noreferrer")}>
              <MapPin className="w-4 h-4 mr-2" />{t("Get Directions")}
            </Button>
          )}
        </div>
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
          <h2 
            className="text-xl font-bold mb-4" 
            style={{ 
              color: colors.text,
              fontFamily: font
            }}
          >
            <Dumbbell className="w-5 h-5 mr-2 inline" style={{ color: colors.primary }} />
            {customHtmlData.section_title}
          </h2>
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
                font-weight: bold;
              }
              .custom-html-content p {
                color: ${colors.text};
                margin-bottom: 0.5rem;
                font-family: ${font};
              }
              .custom-html-content a {
                color: ${colors.primary};
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
        <h2 
          className="text-xl font-bold mb-4" 
          style={{ 
            color: colors.text,
            fontFamily: font
          }}
        >
          <Share2 className="w-5 h-5 mr-2 inline" style={{ color: colors.primary }} />
          {t("Share Our Gym")}
        </h2>
        <div 
          className="text-center p-4 rounded-lg" 
          style={{ 
            backgroundColor: colors.background,
            border: `1px solid ${colors.borderColor}`
          }}
        >
          {qrData.qr_title && (
            <h4 className="font-bold text-base mb-2" style={{ color: colors.text, fontFamily: font }}>
              {qrData.qr_title}
            </h4>
          )}
          
          {qrData.qr_description && (
            <p className="text-sm mb-4" style={{ color: colors.text + 'CC', fontFamily: font }}>
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
      <div className="px-5 py-4" style={{ backgroundColor: colors.cardBg }}>
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