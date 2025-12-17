import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, Play, PlayCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface HeroSectionProps {
  brandColor?: string;
  settings: any;
  sectionData: {
    title?: string;
    subtitle?: string;
    announcement_text?: string;
    primary_button_text?: string;
    secondary_button_text?: string;
    image?: string;
    stats?: Array<{value: string; label: string}>;
    card?: {
      name: string;
      title: string;
      company: string;
      initials: string;
    };
    nfc_video_url?: string;
  };
}

export default function HeroSection({ settings, sectionData, brandColor = '#3b82f6' }: HeroSectionProps) {
  const { t } = useTranslation();
  const { props } = usePage();
  const globalSettings = (props as any).globalSettings || {};
  const [showVideoModal, setShowVideoModal] = useState(false);
  
  // Helper to get full URL for images
  const getImageUrl = (path: string | undefined) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${window.appSettings.imageUrl}${path}`;
  };

  const heroImage = getImageUrl(sectionData.image);
  const nfcVideoUrl = sectionData.nfc_video_url;
  
  // Get company logo from settings (priority: landing page light > global light > landing page dark > global dark > default)
  const landingPageLogoDark = settings?.config_sections?.theme?.logo_dark;
  const landingPageLogoLight = settings?.config_sections?.theme?.logo_light;
  const globalLogoDark = globalSettings?.logoDark;
  const globalLogoLight = globalSettings?.logoLight;
  
  // Use light logo if set, otherwise fall back to dark logo, then default
  const logoPath = landingPageLogoLight || globalLogoLight || landingPageLogoDark || globalLogoDark;
  const companyLogo = (logoPath ? getImageUrl(logoPath) : '/images/logos/logo-light.png') || '/images/logos/logo-light.png';

  return (
    <section id="hero" className="pt-16 hero-section min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6 sm:space-y-8">
           
            {/* Company Header */}
            <div className="flex items-center justify-center gap-3 m-0">
              <img src={companyLogo} alt="Times Digital Logo" className="object-contain rounded-lg" style={{ width: '115px', height: '115px' }} />
             <div>
               <h2 className="text-6xl font-bold  text-[#055353] mb-2 text-center">Times Digital</h2>
              <h2 className="text-2xl font-bold text-white text-center mb-2 bg-[#055353]">it Solution</h2>
              
             </div>
            </div>
             
            <h1 className="text-3xl md:text-4xl text center lg:text-4xl font-bold leading-tight bg-[#055353] text-white p-2  text-center m-0 mt-[70px]" role="banner" aria-label="Main heading">
              {sectionData.title || 'Create Your Digital Business Card'}
            </h1>
            
            <p className="text-lg md:text-xl  text-center leading-relaxed max-w-2xl font-medium bg-[#ff8901] text-white">
              {sectionData.subtitle || 'Transform your networking with professional digital business cards.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 justify-center lg:justify-start">
              <Link
                href={route('register')}
                className="hero-button px-8 py-4 rounded-lg transition-colors font-semibold text-base flex items-center justify-center gap-2 hover:opacity-90"
                aria-label="Start free trial - Register for vCard SaaS"
              >
                {sectionData.primary_button_text || t('Start Free Trial')}
                <ArrowRight size={18} />
              </Link>
              <Link
                href={route('login')}
                className="border px-8 py-4 rounded-lg transition-colors font-semibold text-base flex items-center justify-center gap-2 hover:bg-gray-50 hero-text"
                style={{ borderColor: '#055353' }}
                aria-label="Login to existing vCard SaaS account"
              >
                <Play size={18} />
                {sectionData.secondary_button_text || 'Login'}
              </Link>
              
              {/* NFC Video Button - Always visible for testing */}
              <button
                onClick={() => setShowVideoModal(true)}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-lg transition-all font-semibold text-base hover:bg-gray-50 border border-gray-300 group"
                aria-label="Watch NFC card explanation video"
              >
                <div className="relative">
                  <PlayCircle 
                    size={24} 
                    style={{ color: brandColor }} 
                    className="group-hover:scale-110 transition-transform"
                  />
                  <div 
                    className="absolute inset-0 rounded-full animate-ping opacity-0 group-hover:opacity-70"
                    style={{ 
                      backgroundColor: brandColor,
                      animationDuration: '1.5s'
                    }}
                  ></div>
                </div>
                <span className="text-white">{t('NFC Card Explained')}</span>
              </button>
            </div>

            {sectionData.stats && sectionData.stats.length > 0 && (
              <div className="grid grid-cols-3 bg-[#055353] pl-3 pr-3 ">
                {sectionData.stats.map((stat, index) => (
                  <div key={index} className="text-center bg-white mr-6 ml-6 mt-6 mb-6 pt-6 bp-6">
                    <div className="text-3xl md:text-4xl font-bold ">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 font-medium text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Content - Hero Image or Card */}
          <div className="relative">
            {heroImage ? (
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="Hero" 
                  className="w-full h-auto rounded-2xl shadow-xl"
                />
              </div>
            ) : (
              <div className="hero-card rounded-2xl shadow-xl p-8 max-w-sm mx-auto">
                <div className="text-center space-y-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center bg-[#ff8901]">
                      <span className="text-white text-2xl font-bold">
                        {sectionData.card?.initials || 'JD'}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-[#055353]">
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1.5"></div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {sectionData.card?.name || t('John Doe')}
                    </h3>
                    <p className="hero-card-accent font-semibold">
                      {sectionData.card?.title || t('Senior Developer')}
                    </p>
                    <p className="text-white">
                      {sectionData.card?.company || t('Tech Solutions Inc.')}
                    </p>
                  </div>
                  
                  <div className="flex justify-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border">
                      <span className="text-gray-600 text-sm">📧</span>
                    </div>
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border">
                      <span className="text-gray-600 text-sm">📱</span>
                    </div>
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border">
                      <span className="text-gray-600 text-sm">🔗</span>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gray-50 rounded-xl border">
                    <div className="w-24 h-24 bg-white rounded-lg mx-auto flex items-center justify-center shadow-sm border">
                      <div className="w-16 h-16 rounded flex items-center justify-center" style={{ backgroundColor: brandColor }}>
                        <span className="text-white text-xs font-mono">{t("QR")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Simple Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gray-200 rounded-full opacity-50"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gray-300 rounded-full opacity-40"></div>
          </div>
        </div>
      </div>
      
      {/* Video Modal */}
      <div className={`fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity ${showVideoModal ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="relative w-full max-w-4xl">
          <button
            onClick={() => setShowVideoModal(false)}
            className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300"
            aria-label="Close video"
          >
            &times;
          </button>
          <div className="aspect-video">
            {nfcVideoUrl && (nfcVideoUrl.includes('youtube') || nfcVideoUrl.includes('youtu.be')) ? (
              <iframe
                src={nfcVideoUrl}
                className="w-full h-full rounded-lg"
                title="NFC Card Explanation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : nfcVideoUrl ? (
              <video 
                src={nfcVideoUrl} 
                controls 
                className="w-full h-full rounded-lg"
                autoPlay
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <PlayCircle size={64} className="mx-auto mb-4 opacity-70" />
                  <h3 className="text-2xl font-bold mb-2">NFC Business Cards</h3>
                  <p className="text-lg mb-4 max-w-2xl mx-auto">
                    Add an explainer video URL in the admin settings to showcase how our NFC-enabled digital business cards work and revolutionize your networking experience.
                  </p>
                  <p className="text-gray-300">
                    This is a placeholder message. Admins can add a YouTube embed URL or direct video link in the Hero section settings.
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-xl font-bold text-white">NFC Business Cards</h3>
            <p className="text-gray-300 mt-2">
              See how our NFC-enabled digital business cards work and revolutionize your networking experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}