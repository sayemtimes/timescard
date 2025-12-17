import { handleAppointmentBooking } from '../VCardPreview';
import React from 'react';
import StableHtmlContent from '@/components/StableHtmlContent';
import { VideoEmbed, extractVideoUrl } from '@/components/VideoEmbed';
import { createYouTubeEmbedRef } from '@/utils/youtubeEmbedUtils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { Mail, Phone, Globe, MapPin, Linkedin, Twitter, Github, Briefcase, Calendar, Download, UserPlus, Video, Play, Youtube, Share2, QrCode } from 'lucide-react';
import SocialIcon from '../../../link-bio-builder/components/SocialIcon';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionOrder, isSectionEnabled, getSectionData } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';
import { useTranslation } from 'react-i18next';
import { sanitizeVideoData } from '@/utils/secureVideoUtils';
import languageData from '@/../../resources/lang/language.json';


interface FreelancerTemplateProps {
  data: any;
  template: any;
}

export default function FreelancerTemplate({ data, template }: FreelancerTemplateProps) {
  const { t, i18n } = useTranslation();
  const configSections = data.config_sections || {};
  const colors = { ...template?.defaultColors, ...configSections.colors } || { primary: '#3B82F6', secondary: '#1E40AF', accent: '#F59E0B', text: '#E2E8F0' };
  const font = configSections.font || template?.defaultFont || 'Inter, sans-serif';
  

  
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
  };
  
  // Get all sections for this business type
  const allSections = getBusinessTemplate('freelancer')?.sections || [];
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
      case 'portfolio':
        return renderPortfolioSection(sectionData);
      case 'videos':
        return renderVideosSection(sectionData);
      case 'youtube':
        return renderYouTubeSection(sectionData);
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
      case 'copyright':
        return renderCopyrightSection(sectionData);
      default:
        return null;
    }
  };

  const renderHeaderSection = (headerData: any) => (
    <div className="relative rounded-t-2xl overflow-hidden" style={{ background: colors.background || '#0A0E1A' }}>
      {/* Circuit Board Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="fill-current" style={{ color: colors.primary }}>
          <pattern id="circuit" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M10 10h30v5h-30zM10 20h30v5h-30zM20 10v30h5v-30zM30 10v30h5v-30z" />
            <circle cx="15" cy="15" r="2" />
            <circle cx="35" cy="35" r="2" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>
      
      <div className="h-36 w-full relative">
        <div className="absolute inset-0" style={{ background: colors.background || '#0A0E1A' }}></div>
        <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}>
          <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-2 px-3 py-1 rounded-md`} style={{ 
            backgroundColor: colors.codeBlock || '#1A202C',
            border: `1px solid ${colors.primary}`,
            boxShadow: colors.glowEffect || `0 0 10px ${colors.primary}40`
          }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.syntaxHighlight || '#00FF41' }}></div>
            <span className="text-xs font-mono font-bold" style={{ color: colors.text || '#E2E8F0' }}>{'<DEVELOPER/>'}</span>
          </div>
        </div>
        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3`}>
          {/* Language Selector */}
          {configSections.language && (
            <div className="relative">
              <button
                onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                className="flex items-center space-x-1 px-2 py-1 rounded text-xs"
                style={{ 
                  backgroundColor: colors.background || '#0A0E1A',
                  border: `1px solid ${colors.borderColor || '#334155'}`,
                  color: colors.text || '#E2E8F0'
                }}
              >
                <span>
                  {String.fromCodePoint(...(languageData.find(lang => lang.code === currentLanguage)?.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt()) || [127468, 127463]))}
                </span>
                <span className="uppercase font-medium">{currentLanguage}</span>
              </button>
              
              {showLanguageSelector && (
                <>
                  <div 
                    className="fixed inset-0" 
                    style={{ zIndex: 99998 }}
                    onClick={() => setShowLanguageSelector(false)}
                  />
                  <div 
                    className="absolute right-0 top-full mt-1 rounded border shadow-lg py-1 w-32 max-h-48 overflow-y-auto"
                    style={{
                      backgroundColor: colors.background || '#0A0E1A',
                      borderColor: colors.borderColor || '#334155',
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
                          color: colors.text || '#E2E8F0'
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
          
          {/* Terminal Dots */}
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: colors.syntaxHighlight || '#00FF41', animationDelay: '1s' }}></div>
          </div>
        </div>
        {/* Floating Code Elements */}
        <div className="absolute bottom-4 right-4 opacity-30">
          <div className="text-xs font-mono" style={{ color: colors.text }}>
            <div>{'{ code: "clean" }'}</div>
            <div>{'{ bugs: 0 }'}</div>
          </div>
        </div>
      </div>
      
      <div className="px-6 pb-6 -mt-16 relative">
        <div className={`flex items-start ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
          <div className="w-24 h-24 rounded-lg border-2 shadow-2xl flex items-center justify-center" style={{ 
            backgroundColor: colors.codeBlock || '#1A202C',
            borderColor: colors.primary,
            boxShadow: colors.glowEffect || `0 0 20px ${colors.primary}40`
          }}>
            {headerData.profile_image ? (
              <img src={headerData.profile_image} alt="Profile" className="w-full h-full rounded-lg object-cover" />
            ) : (
              <div className="text-center">
                <div className="text-lg font-mono font-bold" style={{ color: colors.primary }}>{'<>'}</div>
                <div className="text-xs font-mono" style={{ color: colors.text }}>DEV</div>
              </div>
            )}
          </div>
          <div className="flex-1 mt-4">
            <h1 className="text-xl font-mono font-bold" style={{ color: colors.text || '#E2E8F0', fontFamily: font }}>
              {headerData.name || data.name || 'const developer = {'}
            </h1>
            <p className="text-sm font-mono" style={{ color: colors.primary, fontFamily: font }}>
              {headerData.title || data.title || '  role: "Full Stack Developer"'}
            </p>
            {headerData.tagline && (
              <p className="text-xs font-mono mt-2 p-2 rounded" style={{ 
                color: colors.syntaxHighlight || '#00FF41',
                backgroundColor: colors.codeBlock || '#1A202C',
                fontFamily: font
              }}>
                // {headerData.tagline}
              </p>
            )}
            <div className="text-xs font-mono mt-2" style={{ color: colors.text, fontFamily: font }}>{'}'}</div>
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
    <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#334155'}` }}>
      <h3 className="font-mono font-bold text-sm mb-4" style={{ color: colors.primary, fontFamily: font }}>
        <span style={{ color: colors.syntaxHighlight || '#00FF41' }}>{t("const")}</span> {t("contact")} = {'{'}
      </h3>
      <div className="space-y-3 ml-4">
        {(contactData.email || data.email) && (
          <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3 p-2 rounded`} style={{ backgroundColor: colors.codeBlock || '#1A202C' }}>
            <Mail className="w-4 h-4" style={{ color: colors.primary }} />
            <span className="font-mono text-sm" style={{ color: colors.text, fontFamily: font }}>
              <span style={{ color: colors.syntaxHighlight }}>{t("email")}:</span> "
              <a 
                href={`mailto:${contactData.email || data.email}`} 
                style={{ color: colors.primary, textDecoration: 'underline', fontFamily: font }}
              >
                {contactData.email || data.email}
              </a>"
            </span>
          </div>
        )}
        {(contactData.phone || data.phone) && (
          <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3 p-2 rounded`} style={{ backgroundColor: colors.codeBlock || '#1A202C' }}>
            <Phone className="w-4 h-4" style={{ color: colors.primary }} />
            <span className="font-mono text-sm" style={{ color: colors.text, fontFamily: font }}>
              <span style={{ color: colors.syntaxHighlight }}>{t("phone")}:</span> "
              <a 
                href={`tel:${contactData.phone || data.phone}`} 
                style={{ color: colors.primary, textDecoration: 'underline', fontFamily: font }}
              >
                {contactData.phone || data.phone}
              </a>"
            </span>
          </div>
        )}
        {(contactData.website || data.website) && (
          <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3 p-2 rounded`} style={{ backgroundColor: colors.codeBlock || '#1A202C' }}>
            <Globe className="w-4 h-4" style={{ color: colors.primary }} />
            <span className="font-mono text-sm" style={{ color: colors.text, fontFamily: font }}>
              <span style={{ color: colors.syntaxHighlight }}>{t("website")}:</span> "
              <a 
                href={contactData.website || data.website} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: colors.primary, textDecoration: 'underline', fontFamily: font }}
              >
                {contactData.website || data.website}
              </a>"
            </span>
          </div>
        )}
        {contactData.location && (
          <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3 p-2 rounded`} style={{ backgroundColor: colors.codeBlock || '#1A202C' }}>
            <MapPin className="w-4 h-4" style={{ color: colors.primary }} />
            <span className="font-mono text-sm" style={{ color: colors.text, fontFamily: font }}>
              <span style={{ color: colors.syntaxHighlight }}>{t("location")}:</span> "{contactData.location}"
            </span>
          </div>
        )}
      </div>
      <div className="font-mono text-sm mt-2" style={{ color: colors.primary, fontFamily: font }}>{'}'}</div>
      
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
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#334155'}` }}>
        <h3 className="font-semibold text-sm mb-3" style={{ color: colors.text, fontFamily: font }}>{t('About')}</h3>
        <p className="text-sm leading-relaxed" style={{ color: colors.text, fontFamily: font }}>
          {aboutData.description || data.description}
        </p>
        {aboutData.skills && (
          <div className="mt-3">
            <p className="text-xs font-medium mb-2" style={{ color: colors.text, fontFamily: font }}>{t('Skills')}:</p>
            <div className="flex flex-wrap gap-1">
              {aboutData.skills.split(',').map((skill: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs" style={{ backgroundColor: colors.primary + '20', color: colors.text }}>
                  {skill.trim()}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {aboutData.experience && (
          <div className="mt-3">
            <p className="text-xs font-medium" style={{ color: colors.text, fontFamily: font }}>{t('Experience')}: {aboutData.experience} {t('years')}</p>
          </div>
        )}
      </div>
    );
  };

  const renderServicesSection = (servicesData: any) => {
    const services = servicesData.service_list || [];
    if (!Array.isArray(services) || services.length === 0) return null;
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#334155'}` }}>
        <h3 className="font-semibold text-sm mb-3" style={{ color: colors.text, fontFamily: font }}>{t('Services')}</h3>
        <div className="space-y-3">
          {services.map((service: any, index: number) => (
            <div key={index} className="border-l-2 pl-3" style={{ borderColor: colors.accent, ...globalStyle }}>
              <h4 className="font-medium text-sm" style={{ color: colors.text, ...globalStyle }}>{service.title}</h4>
              {service.description && <p className="text-xs" style={{ color: colors.text, ...globalStyle }}>{service.description}</p>}
              {service.price && <p className="text-xs font-medium" style={{ color: colors.primary, ...globalStyle }}>${service.price}/hr</p>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPortfolioSection = (portfolioData: any) => {
    const projects = portfolioData.projects || [];
    if (!Array.isArray(projects) || projects.length === 0) return null;
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#334155'}` }}>
        <h3 className="font-semibold text-sm mb-3" style={{ color: colors.text, fontFamily: font }}>{t('Portfolio')}</h3>
        <div className="grid grid-cols-2 gap-2">
          {projects.map((project: any, index: number) => (
            <div key={index} className="space-y-1" style={globalStyle}>
              {project.image ? (
                <div className="w-full h-16 rounded overflow-hidden" style={{ borderLeft: `3px solid ${colors.primary}` }}>
                  <img src={project.image} alt={project.title || 'Project'} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-full h-16 rounded flex items-center justify-center text-xs font-medium" style={{ 
                  borderLeft: `3px solid ${colors.primary}`, 
                  backgroundColor: colors.codeBlock || '#1A202C',
                  color: colors.text || '#E2E8F0',
                  fontFamily: font
                }}>
                  <div className="text-center">
                    <div className="text-lg mb-1" style={{ color: colors.primary }}>{'</>'}</div>
                    <div className="text-xs truncate px-2">{project.title || t('Project')}</div>
                  </div>
                </div>
              )}
              <div className="text-xs font-medium truncate" style={{ color: colors.text, ...globalStyle }}>
                {project.title || t('Project')}
              </div>
              {project.url && (
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs truncate block" 
                  style={{ color: colors.primary, ...globalStyle }}
                >
                  {project.url}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Helper function to extract and process video URL (moved outside render function)
  const extractVideoUrl = React.useCallback((embedUrl: string) => {
    if (!embedUrl) return null;
    
    // Extract src from iframe HTML
    if (embedUrl.includes('<iframe')) {
      const srcMatch = embedUrl.match(/src=["']([^"']+)["']/i);
      const extractedUrl = srcMatch ? srcMatch[1] : null;
      
      // Check if it's YouTube - return for iframe handling
      if (extractedUrl && (extractedUrl.includes('youtube.com') || extractedUrl.includes('youtu.be'))) {
        return { url: extractedUrl, isYouTube: true };
      }
      
      return extractedUrl ? { url: extractedUrl, isYouTube: false } : null;
    }
    
    // Handle direct URLs
    if (embedUrl.includes('youtube.com') || embedUrl.includes('youtu.be')) {
      return { url: embedUrl, isYouTube: true };
    }
    
    return { url: embedUrl, isYouTube: false };
  }, []);

  const renderVideosSection = (videosData: any) => {
    const videos = videosData.video_list || [];
    if (!Array.isArray(videos) || videos.length === 0) return null;
    
    // Process video content without hooks
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
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#334155'}` }}>
        <h3 className="font-mono font-bold text-sm mb-4" style={{ color: colors.primary, fontFamily: font }}>
          <span style={{ color: colors.syntaxHighlight || '#00FF41' }}>{t("const")}</span> {t("videos")} = [{'{'}
        </h3>
        <div className="space-y-3 ml-4">
          {videoContent.map((video: any, index: number) => (
            <div key={video.key} className="rounded-lg overflow-hidden" style={{ backgroundColor: colors.codeBlock || '#1A202C', border: `1px solid ${colors.primary}30` }}>
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
                  video.videoData.isYouTube ? (
                    <div 
                      className="w-full relative overflow-hidden" 
                      style={{ 
                        paddingBottom: '56.25%',
                        height: 0
                      }}
                    >
                      <iframe
                        src={`${video.videoData.url}?modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`}
                        className="absolute inset-0 w-full h-full"
                        style={{ border: 'none', pointerEvents: 'auto' }}
                        loading="lazy"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        referrerPolicy="strict-origin-when-cross-origin"
                        tabIndex={-1}
                        title={video.title || 'Video'}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-32 overflow-hidden rounded">
                      <video
                        src={video.videoData.url}
                        className="w-full h-full object-cover"
                        controls
                        preload="metadata"
                        title={video.title || 'Video'}
                      />
                    </div>
                  )
                ) : video.thumbnail ? (
                  <div className="relative w-full h-32 overflow-hidden rounded">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title || t('Code tutorial')} 
                      className="w-full h-full object-cover"
                      style={{ objectPosition: 'center' }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white bg-opacity-90 flex items-center justify-center">
                        <Play className="w-6 h-6 ml-1" style={{ color: colors.primary }} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-32 flex items-center justify-center" style={{ backgroundColor: colors.primary + '20' }}>
                    <div className="text-center">
                      <Video className="w-8 h-8 mx-auto mb-2" style={{ color: colors.primary }} />
                      <span className="text-xs font-mono" style={{ color: colors.primary, fontFamily: font }}>{'<video/>'}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-3">
                <h4 className="font-mono text-sm mb-1" style={{ color: colors.text, fontFamily: font }}>
                  <span style={{ color: colors.syntaxHighlight }}>{t("title")}:</span> "{video.title}"
                </h4>
                {video.description && (
                  <p className="font-mono text-xs mb-2" style={{ color: colors.text + 'CC', fontFamily: font }}>
                    <span style={{ color: colors.syntaxHighlight }}>{t("desc")}:</span> "{video.description}"
                  </p>
                )}
                <div className="flex justify-between items-center">
                  {video.duration && (
                    <span className="font-mono text-xs" style={{ color: colors.text + '80', fontFamily: font }}>
                      <span style={{ color: colors.syntaxHighlight }}>{t("time")}:</span> "{video.duration}"
                    </span>
                  )}
                  {video.tech_stack && (
                    <span className="font-mono text-xs px-2 py-1 rounded" style={{ backgroundColor: colors.primary + '20', color: colors.primary, fontFamily: font }}>
                      {video.tech_stack}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="font-mono text-sm mt-2" style={{ color: colors.primary, fontFamily: font }}>]</div>
      </div>
    );
  };

  const renderYouTubeSection = (youtubeData: any) => {
    if (!youtubeData.channel_url && !youtubeData.channel_name && !youtubeData.latest_video_embed) return null;
    
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#334155'}` }}>
        <h3 className="font-mono font-bold text-sm mb-4" style={{ color: colors.primary, fontFamily: font }}>
          <span style={{ color: colors.syntaxHighlight || '#00FF41' }}>{t("const")}</span> {t("youtube")} = {'{'}
        </h3>
        
        {youtubeData.latest_video_embed && (
          <div className="ml-4 mb-4 rounded-lg overflow-hidden" style={{ backgroundColor: colors.codeBlock || '#1A202C', border: `1px solid ${colors.primary}30` }}>
            <div className="p-3 mb-2">
              <h4 className="font-mono text-sm flex items-center" style={{ color: colors.text, fontFamily: font }}>
                <Play className="w-4 h-4 mr-2" style={{ color: colors.primary }} />
                <span style={{ color: colors.syntaxHighlight }}>{t("latest")}:</span> "{t("video")}"
              </h4>
            </div>
            <div className="w-full relative overflow-hidden" style={{ paddingBottom: '56.25%', height: 0 }}>
              <div 
                className="absolute inset-0 w-full h-full"
                ref={createYouTubeEmbedRef(
                  youtubeData.latest_video_embed,
                  { colors, font },
                  'Latest Dev Video'
                )}
              />
            </div>
          </div>
        )}
        
        <div className="ml-4 p-4 rounded-lg" style={{ backgroundColor: colors.codeBlock || '#1A202C', border: `1px solid ${colors.primary}30` }}>
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-red-600 flex items-center justify-center">
              <Youtube className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-mono text-sm" style={{ color: colors.text, fontFamily: font }}>
                <span style={{ color: colors.syntaxHighlight }}>{t("channel")}:</span> "{youtubeData.channel_name || 'Dev Channel'}"
              </h4>
              {youtubeData.subscriber_count && (
                <p className="font-mono text-xs" style={{ color: colors.text + 'CC', fontFamily: font }}>
                  <span style={{ color: colors.syntaxHighlight }}>{t("subs")}:</span> "{youtubeData.subscriber_count}"
                </p>
              )}
            </div>
          </div>
          
          {youtubeData.channel_description && (
            <p className="font-mono text-xs mb-3" style={{ color: colors.text, fontFamily: font }}>
              <span style={{ color: colors.syntaxHighlight }}>{t("about")}:</span> "{youtubeData.channel_description}"
            </p>
          )}
          
          <div className="space-y-2">
            {youtubeData.channel_url && (
              <Button 
                size="sm" 
                className="w-full font-mono" 
                style={{ 
                  backgroundColor: '#FF0000', 
                  color: 'white',
                  fontFamily: font 
                }}
                onClick={() => typeof window !== "undefined" && window.open(youtubeData.channel_url, '_blank', 'noopener,noreferrer')}
              >
                <Youtube className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t("subscribe()")}
              </Button>
            )}
            {youtubeData.featured_playlist && (
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full font-mono" 
                style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}
                onClick={() => typeof window !== "undefined" && window.open(youtubeData.featured_playlist, '_blank', 'noopener,noreferrer')}
              >
                {'> '} {t("tutorials.watch()")}
              </Button>
            )}
          </div>
        </div>
        <div className="font-mono text-sm mt-2" style={{ color: colors.primary, fontFamily: font }}>{'}'}</div>
      </div>
    );
  };

  const renderSocialSection = (socialData: any) => {
    const socialLinks = socialData.social_links || [];
    if (!Array.isArray(socialLinks) || socialLinks.length === 0) return null;
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#334155'}` }}>
        <h3 className="font-semibold text-sm mb-3" style={{ color: colors.text, fontFamily: font }}>{t('Connect')}</h3>
        <div className="grid grid-cols-2 gap-2">
          {socialLinks.map((link: any, index: number) => (
            <Button 
              key={index} 
              size="sm" 
              variant="outline" 
              className="justify-start overflow-hidden" 
              style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}
              onClick={() => link.url && typeof window !== "undefined" && window.open(link.url, '_blank', 'noopener,noreferrer')}
              title={link.username ? `${link.platform}: @${link.username}` : link.platform}
            >
              <SocialIcon platform={link.platform} color={colors.primary} />
              <span className="text-xs capitalize truncate ml-2" style={globalStyle}>{link.platform}</span>
              {link.username && <span className="text-xs ml-1 truncate" style={globalStyle}>@{link.username}</span>}
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
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#334155'}` }}>
        <h3 className="font-semibold text-sm mb-3" style={{ color: colors.text, fontFamily: font }}>{t('Availability')}</h3>
        <div className="space-y-2">
          {hours.slice(0, 7).map((hour: any, index: number) => (
            <div key={index} className="flex justify-between items-center p-2 rounded" style={{ 
              backgroundColor: hour.is_closed ? colors.codeBlock || '#1A202C' : `${colors.primary}15`,
              border: `1px solid ${hour.is_closed ? colors.borderColor : colors.primary + '30'}`
            }}>
              <span className="capitalize font-medium text-xs" style={{ color: colors.text, fontFamily: font }}>{hour.day}</span>
              <span className="text-xs" style={{ color: hour.is_closed ? colors.text + '80' : colors.primary, fontFamily: font }}>
                {hour.is_closed ? t('Closed') : `${hour.open_time} - ${hour.close_time}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Testimonials state (moved to component level)
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = React.useState(0);
  
  // Effect for testimonials rotation (moved to component level)
  React.useEffect(() => {
    const testimonialsData = configSections.testimonials;
    const reviews = testimonialsData?.reviews || [];
    if (!Array.isArray(reviews) || reviews.length <= 2) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonialIndex(prev => (prev + 2) % reviews.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [configSections.testimonials?.reviews]);

  const renderTestimonialsSection = (testimonialsData: any) => {
    const reviews = testimonialsData.reviews || [];
    if (!Array.isArray(reviews) || reviews.length === 0) return null;
    
    const getVisibleReviews = () => {
      if (reviews.length <= 2) return reviews;
      return [
        reviews[currentTestimonialIndex],
        reviews[(currentTestimonialIndex + 1) % reviews.length]
      ];
    };
    
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#334155'}` }}>
        <h3 className="font-semibold text-sm mb-3" style={{ color: colors.text, fontFamily: font }}>{t('Client Reviews')}</h3>
        <div className="space-y-3 transition-all duration-500">
          {getVisibleReviews().map((review: any, index: number) => (
            <div key={`${currentTestimonialIndex}-${index}`} className="p-3 rounded-xl" style={{ backgroundColor: `${colors.primary}10` }}>
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full ${i < parseInt(review.rating || 5) ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                ))}
              </div>
              <p className="text-xs mb-2 leading-relaxed" style={{ color: colors.text, ...globalStyle }}>"{review.review}"</p>
              <p className="text-xs font-medium" style={{ color: colors.primary, ...globalStyle }}>- {review.client_name}</p>
            </div>
          ))}
        </div>
        {reviews.length > 2 && (
          <div className="flex justify-center mt-2 space-x-1">
            {Array.from({ length: Math.ceil(reviews.length / 2) }).map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  Math.floor(currentTestimonialIndex / 2) === i ? 'opacity-100' : 'opacity-30'
                }`}
                style={{ backgroundColor: colors.primary }}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderAppointmentsSection = (appointmentsData: any) => {
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#334155'}` }}>
        <h3 className="font-semibold text-sm mb-3" style={{ color: colors.text, fontFamily: font }}>{t('Book Appointment')}</h3>
        <div className="space-y-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="w-full" 
            style={{ fontFamily: font }}
            onClick={() => handleAppointmentBooking(configSections.appointments)}
          >
            <Calendar className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('Schedule Meeting')}
          </Button>
          {appointmentsData?.calendar_link && (
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full" 
              style={{ fontFamily: font }}
              onClick={() => typeof window !== "undefined" && window.open(appointmentsData.calendar_link, '_blank', 'noopener,noreferrer')}
            >
              {t('View Calendar')}
            </Button>
          )}
        </div>
      </div>
    );
  };

  const renderLocationSection = (locationData: any) => {
    if (!locationData.map_embed_url && !locationData.directions_url) return null;
    
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#334155'}` }}>
        <h3 className="font-semibold text-sm mb-3" style={{ color: colors.text, fontFamily: font }}>{t('Location')}</h3>
        
        <div className="space-y-3">
          {locationData.map_embed_url && (
            <div className="rounded-lg overflow-hidden" style={{ height: '200px' }}>
              <div dangerouslySetInnerHTML={{ __html: locationData.map_embed_url }} className="w-full h-full" />
            </div>
          )}
          
          {locationData.directions_url && (
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full" 
              style={{ fontFamily: font }}
              onClick={() => typeof window !== "undefined" && window.open(locationData.directions_url, '_blank', 'noopener,noreferrer')}
            >
              <MapPin className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
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
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#334155'}` }}>
        <h3 className="font-semibold text-sm mb-3" style={{ color: colors.text, fontFamily: font }}>{t('Download App')}</h3>
        <div className="grid grid-cols-2 gap-2">
          {appData.app_store_url && (
            <Button 
              size="sm" 
              variant="outline" 
              style={{ fontFamily: font }}
              onClick={() => typeof window !== "undefined" && window.open(appData.app_store_url, '_blank', 'noopener,noreferrer')}
            >
              {t('App Store')}
            </Button>
          )}
          {appData.play_store_url && (
            <Button 
              size="sm" 
              variant="outline" 
              style={{ fontFamily: font }}
              onClick={() => typeof window !== "undefined" && window.open(appData.play_store_url, '_blank', 'noopener,noreferrer')}
            >
              {t('Play Store')}
            </Button>
          )}
        </div>
      </div>
    );
  };

  const renderContactFormSection = (formData: any) => {
    if (!formData.form_title) return null;
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#334155'}` }}>
        <h3 className="font-semibold text-sm mb-2" style={{ color: colors.text, fontFamily: font }}>
          {formData.form_title}
        </h3>
        {formData.form_description && (
          <p className="text-xs mb-3" style={{ color: colors.text, fontFamily: font }}>
            {formData.form_description}
          </p>
        )}
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full" 
          style={{ fontFamily: font }}
          onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openContactModal'))}
        >
          <Mail className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t('Contact Me')}
        </Button>
      </div>
    );
  };

  const renderThankYouSection = (thankYouData: any) => {
    if (!thankYouData.message) return null;
    return (
      <div className="px-6 pb-2">
        <p className="text-xs text-center" style={{ color: colors.text + '80', fontFamily: font }}>
          {thankYouData.message}
        </p>
      </div>
    );
  };

  // Stable HTML content to prevent iframe reloading
  const stableHtmlContent = React.useMemo(() => {
    return configSections.custom_html?.html_content || '';
  }, [configSections.custom_html?.html_content]);

  const renderCustomHtmlSection = (customHtmlData: any) => {
    if (!customHtmlData?.html_content) return null;
    
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#334155'}` }}>
        {customHtmlData.show_title && customHtmlData.section_title && (
          <h3 className="font-mono font-bold text-sm mb-4" style={{ color: colors.primary, fontFamily: font }}>
            <span style={{ color: colors.syntaxHighlight || '#00FF41' }}>{t("const")}</span> {customHtmlData.section_title.toLowerCase().replace(/\s+/g, '_')} = {'{'}
          </h3>
        )}
        <div 
          className="custom-html-content p-3 rounded-lg" 
          style={{ 
            backgroundColor: colors.codeBlock || '#1A202C',
            border: `1px solid ${colors.primary}30`,
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
                color: ${colors.syntaxHighlight || '#00FF41'};
                text-decoration: underline;
              }
              .custom-html-content ul, .custom-html-content ol {
                color: ${colors.text};
                padding-left: 1rem;
                font-family: ${font};
              }
              .custom-html-content code {
                background-color: ${colors.primary}20;
                color: ${colors.syntaxHighlight || '#00FF41'};
                padding: 0.125rem 0.25rem;
                border-radius: 0.25rem;
                font-family: 'JetBrains Mono', monospace;
              }
              .custom-html-content iframe {
                max-width: 100%;
                border: none;
              }
            `}
          </style>
          {/* Use StableHtmlContent to prevent iframe reloading */}
          <StableHtmlContent htmlContent={stableHtmlContent} />
        </div>
        {customHtmlData.show_title && customHtmlData.section_title && (
          <div className="font-mono text-sm mt-2" style={{ color: colors.primary, fontFamily: font }}>{'}'}</div>
        )}
      </div>
    );
  };

  const renderQrShareSection = (qrData: any) => {
    if (!qrData.enable_qr) return null;
    
    return (
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.borderColor || '#334155'}` }}>
          <h3 className="font-mono font-bold text-sm mb-4" style={{ color: colors.primary, fontFamily: font }}>
            <span style={{ color: colors.syntaxHighlight || '#00FF41' }}>{t("const")}</span> {t("qr_share")} = {'{'}
          </h3>
          <div className="text-center p-4 rounded-lg" style={{ backgroundColor: colors.codeBlock || '#1A202C', border: `1px solid ${colors.primary}30` }}>
            {qrData.qr_title && (
              <h4 className="font-mono text-sm mb-3" style={{ color: colors.text, fontFamily: font }}>
                <span style={{ color: colors.syntaxHighlight }}>{t("title")}:</span> "{qrData.qr_title}"
              </h4>
            )}
            
            {qrData.qr_description && (
              <p className="font-mono text-xs mb-3" style={{ color: colors.text + 'CC', fontFamily: font }}>
                <span style={{ color: colors.syntaxHighlight }}>{t("desc")}:</span> "{qrData.qr_description}"
              </p>
            )}
            
            <Button 
              size="sm" 
              className="w-full font-mono" 
              style={{ 
                backgroundColor: colors.primary,
                color: colors.background || '#0A0E1A',
                fontFamily: font
              }}
              onClick={() => setShowQrModal(true)}
            >
              <QrCode className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {'> '} {t("Share QR Code")}
            </Button>
          </div>
          <div className="font-mono text-sm mt-2" style={{ color: colors.primary, fontFamily: font }}>{'}'}</div>
        </div>
    );
  };

  const renderCopyrightSection = (copyrightData: any) => {
    // This function is no longer used as we're rendering copyright separately at the end
    return null;
  };

  // Create a style object that will be applied to all text elements
  const globalStyle = {
    fontFamily: font
  };
  
  // Extract copyright section to render it at the end
  const copyrightSection = configSections.copyright;
  
  // Get ordered sections using the utility function, excluding copyright
  const orderedSectionKeys = getSectionOrder(data.template_config || { sections: configSections, sectionSettings: configSections }, allSections)
    .filter(key => key !== 'colors' && key !== 'font' && key !== 'copyright');
  
  return (
    <div className="w-full max-w-md mx-auto rounded-2xl overflow-hidden" style={{ 
        fontFamily: font,
        background: colors.background || '#0A0E1A',
        border: `1px solid ${colors.borderColor || '#334155'}`,
        boxShadow: colors.glowEffect || `0 0 30px ${colors.primary}20`,
        direction: isRTL ? 'rtl' : 'ltr'
      }}>
      {orderedSectionKeys.map((sectionKey) => (
        <React.Fragment key={sectionKey}>
          {renderSection(sectionKey)}
        </React.Fragment>
      ))}
      
      <div className="p-6 space-y-4" style={{ background: `linear-gradient(to bottom, ${colors.background || '#0A0E1A'}, ${colors.codeBlock || '#1A202C'})` }}>
        <Button 
          className="w-full h-12 font-bold rounded-lg border transition-all hover:shadow-lg" 
          style={{ 
            backgroundColor: colors.primary,
            color: colors.background || '#0A0E1A',
            border: `1px solid ${colors.primary}`,
            boxShadow: `0 0 15px ${colors.primary}40`,
            fontFamily: font
          }}
          onClick={() => {
            const event = new CustomEvent('openContactModal');
            typeof window !== "undefined" && window.dispatchEvent(event);
          }}
        >
          <span>{'> '}</span>{t("contact_developer()")}<span className="animate-pulse">|</span>
        </Button>
        <Button 
          className="w-full h-12 font-bold rounded-lg border-2 transition-all hover:shadow-lg" 
          style={{ 
            borderColor: colors.syntaxHighlight || '#00FF41', 
            color: colors.syntaxHighlight || '#00FF41',
            backgroundColor: 'transparent',
            boxShadow: `0 0 10px ${colors.syntaxHighlight || '#00FF41'}20`,
            fontFamily: font
          }}
          onClick={() => {
            const event = new CustomEvent('openAppointmentModal');
            typeof window !== "undefined" && window.dispatchEvent(event);
          }}
        >
          <span>{'> '}</span>{t("schedule_meeting()")}<span className="animate-pulse">|</span>
        </Button>
        
        {/* Save Contact Button */}
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full flex items-center justify-center mt-4" 
          style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}
          onClick={() => {
            const headerData = configSections.header || {};
            const contactData = configSections.contact || {};
            const vcfData = {
              name: headerData.name || data.name || '',
              title: headerData.title || data.title || '',
              email: contactData.email || data.email || '',
              phone: contactData.phone || data.phone || '',
              website: contactData.website || data.website || '',
              location: contactData.location || ''
            };
            import('@/utils/vcfGenerator').then(module => {
              module.downloadVCF(vcfData);
            });
          }}
        >
          <UserPlus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t('Save Contact')}
        </Button>
      </div>
      
      {/* Copyright always at the end */}
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