import React, { useState } from 'react';
import { useForm, usePage, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Save, Eye, Settings as SettingsIcon, Palette, Type, ArrowUpDown, Info, GripVertical, Plus, Trash2, Image } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { PageTemplate } from '@/components/page-template';
import { SettingsSection } from '@/components/settings-section';
import { toast } from '@/components/custom-toast';
import { Toaster } from '@/components/ui/toaster';
import { useBrand } from '@/contexts/BrandContext';
import { THEME_COLORS } from '@/hooks/use-appearance';
import MediaPicker from '@/components/MediaPicker';

interface DirectorySettings {
  id?: number;
  title: string;
  description: string;
  config_sections: {
    theme: {
      primary_color: string;
      secondary_color: string;
      accent_color: string;
    };
    background_image?: string;
    use_background_image?: boolean;
    company?: {
      name: string;
      contact_email?: string;
      contact_phone?: string;
      contact_address?: string;
      description?: string;
    };
    hero?: {
      trust_badge: string;
      main_title: string;
      subtitle: string;
      features: Array<{
        icon: string;
        text: string;
      }>;
    };
    footer?: {
      description?: string;
      newsletter_title?: string;
      newsletter_subtitle?: string;
      links?: any;
      social_links?: Array<{
        name: string;
        icon: string;
        href: string;
      }>;
      section_titles?: {
        product: string;
        company: string;
        support: string;
        legal: string;
      };
    };
    section_order?: string[];
    section_visibility?: Record<string, boolean>;
  };
}

interface PageProps {
  settings: DirectorySettings;
  flash?: {
    success?: string;
    error?: string;
  };
}

export default function BusinessDirectorySettings() {
  const { t } = useTranslation();
  const { settings, flash } = usePage<PageProps>().props;
  const { themeColor, customColor } = useBrand();
  const brandColor = themeColor === 'custom' ? customColor : THEME_COLORS[themeColor as keyof typeof THEME_COLORS];
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<'content' | 'hero' | 'footer' | 'order'>('content');

  const { data, setData, processing } = useForm<DirectorySettings>({
    title: settings.title || 'Business Directory',
    description: settings.description || '',
    config_sections: settings.config_sections || {
      theme: {
        primary_color: '#3b82f6',
        secondary_color: '#8b5cf6',
        accent_color: '#10b981'
      },
      background_image: '',
      use_background_image: false,
      company: {
        name: settings.config_sections?.company?.name || '',
        description: settings.config_sections?.company?.description || ''
      },
      hero: {
        trust_badge: 'Trusted by 10,000+ Businesses',
        main_title: 'Discover Amazing Businesses',
        subtitle: 'Connect with professionals, explore services, and grow your network in our comprehensive business directory',
        features: [
          {icon: 'verified', text: 'Verified Businesses'},
          {icon: 'location', text: 'Local & Global'},
          {icon: 'contact', text: 'Instant Contact'}
        ]
      },
      footer: {
        description: 'Transforming professional networking with innovative digital business cards. Connect, share, and grow your network effortlessly.',
        newsletter_title: 'Stay Updated with Our Latest Features',
        newsletter_subtitle: 'Join our newsletter for product updates and networking tips',
        links: {
          product: [
            { name: 'Features', href: '#features' },
            { name: 'Pricing', href: '#pricing' },
            { name: 'Templates', href: '#' },
            { name: 'Integrations', href: '#' }
          ],
          company: [
            { name: 'About Us', href: '#about' },
            { name: 'Careers', href: '#' },
            { name: 'Press', href: '#' },
            { name: 'Contact', href: '#contact' }
          ],
          support: [
            { name: 'Help Center', href: '#' },
            { name: 'Documentation', href: '#' },
            { name: 'API Reference', href: '#' },
            { name: 'Status', href: '#' }
          ],
          legal: [
            { name: 'Privacy Policy', href: '#' },
            { name: 'Terms of Service', href: '#' },
            { name: 'Cookie Policy', href: '#' },
            { name: 'GDPR', href: '#' }
          ]
        },
        social_links: [
          { name: 'Facebook', icon: 'Facebook', href: '#' },
          { name: 'Twitter', icon: 'Twitter', href: '#' },
          { name: 'LinkedIn', icon: 'Linkedin', href: '#' },
          { name: 'Instagram', icon: 'Instagram', href: '#' }
        ],
        section_titles: {
          product: 'Product',
          company: 'Company',
          support: 'Support',
          legal: 'Legal'
        }
      },
      section_order: ['hero', 'search', 'categories', 'filters', 'businesses'],
      section_visibility: {
        hero: true,
        search: true,
        categories: true,
        filters: true,
        businesses: true
      }
    }
  });



  const convertToRelativePath = (url: string): string => {
    if (!url) return url;
    if (!url.startsWith('http')) return url;
    const storageIndex = url.indexOf('/storage/');
    return storageIndex !== -1 ? url.substring(storageIndex) : url;
  };
  
  const getDisplayUrl = (path: string): string => {
    if (!path) return path;
    if (path.startsWith('http')) return path;
    return `${window.appSettings.imageUrl}${path}`;
  };

  const saveSettings = () => {
    setIsLoading(true);
    
    router.post(route('directory.settings.update'), data, {
      preserveScroll: true,
      onSuccess: () => {
        setIsLoading(false);
        toast.success(t('Directory settings saved successfully'));
      },
      onError: (errors) => {
        setIsLoading(false);
        const errorMessage = Object.values(errors).join(', ') || t('Failed to save directory settings');
        toast.error(errorMessage);
      }
    });
  };

  return (
    <PageTemplate 
      title={t("Business Directory Settings")} 
      url="/directory/settings"
      action={
        <div className="flex gap-2">
          <Link
            href={route('directory.index')}
            className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors"
            style={{ backgroundColor: brandColor }}
          >
            <Eye className="w-4 h-4" />
            {t("View Directory")}
          </Link>
        </div>
      }
    >
      <SettingsSection
        title={t('Directory Settings')}
        description={t('Configure your business directory appearance and menu')}
        action={
          <Button onClick={saveSettings} disabled={isLoading} size="sm">
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? t('Saving...') : t('Save Changes')}
          </Button>
        }
      >
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'content', label: t('Content'), icon: Type },
              { key: 'hero', label: t('Hero'), icon: SettingsIcon },
              { key: 'footer', label: t('Footer'), icon: Type },
              { key: 'order', label: t('Order'), icon: ArrowUpDown }
            ].map(section => (
              <Button
                key={section.key}
                variant={activeSection === section.key ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveSection(section.key as any)}
                className={`flex items-center gap-2 ${
                  activeSection === section.key 
                    ? 'text-white dark:text-white border-0' 
                    : 'dark:text-gray-300 dark:border-gray-700'
                }`}
                style={activeSection === section.key ? {
                  backgroundColor: brandColor
                } : {}}
              >
                <section.icon className="h-4 w-4" />
                {section.label}
              </Button>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            {activeSection === 'content' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Type className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('Basic Information')}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('Configure main directory content')}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="title">{t('Directory Title')}</Label>
                    <Input
                      id="title"
                      value={data.title}
                      onChange={(e) => setData('title', e.target.value)}
                      placeholder={t('Business Directory')}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">{t('Directory Description')}</Label>
                    <Textarea
                      id="description"
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                      placeholder={t('Discover amazing businesses and connect with professionals')}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <Info className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('Company Information')}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('Separate company information for business directory')}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label htmlFor="company_name" className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      <SettingsIcon className="h-4 w-4" style={{ color: brandColor }} />
                      {t('Company Name')}
                    </Label>
                    <Input
                      id="company_name"
                      value={data.config_sections?.company?.name || ''}
                      onChange={(e) => setData('config_sections', {
                        ...data.config_sections,
                        company: { ...data.config_sections?.company, name: e.target.value }
                      })}
                      placeholder={t('Directory Company Name')}
                      className="h-10 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                      style={{ '--tw-ring-color': brandColor + '33' } as React.CSSProperties}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="company_email">{t('Contact Email')}</Label>
                    <Input
                      id="company_email"
                      type="email"
                      value={data.config_sections?.company?.contact_email || ''}
                      onChange={(e) => setData('config_sections', {
                        ...data.config_sections,
                        company: { ...data.config_sections?.company, contact_email: e.target.value }
                      })}
                      placeholder={t('support@company.com')}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="company_phone">{t('Contact Phone')}</Label>
                    <Input
                      id="company_phone"
                      value={data.config_sections?.company?.contact_phone || ''}
                      onChange={(e) => setData('config_sections', {
                        ...data.config_sections,
                        company: { ...data.config_sections?.company, contact_phone: e.target.value }
                      })}
                      placeholder={t('+1 (555) 123-4567')}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="company_address">{t('Contact Address')}</Label>
                    <Input
                      id="company_address"
                      value={data.config_sections?.company?.contact_address || ''}
                      onChange={(e) => setData('config_sections', {
                        ...data.config_sections,
                        company: { ...data.config_sections?.company, contact_address: e.target.value }
                      })}
                      placeholder={t('123 Business Ave, City, State')}
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <Palette className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('Theme Colors')}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('Customize the color scheme for your directory')}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-3">
                    <Label htmlFor="primary_color">{t('Primary Color')}</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primary_color"
                        type="color"
                        value={data.config_sections?.theme?.primary_color || '#3b82f6'}
                        onChange={(e) => setData('config_sections', {
                          ...data.config_sections,
                          theme: { ...data.config_sections?.theme, primary_color: e.target.value }
                        })}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={data.config_sections?.theme?.primary_color || '#3b82f6'}
                        onChange={(e) => setData('config_sections', {
                          ...data.config_sections,
                          theme: { ...data.config_sections?.theme, primary_color: e.target.value }
                        })}
                        placeholder="#3b82f6"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="secondary_color">{t('Secondary Color')}</Label>
                    <div className="flex gap-2">
                      <Input
                        id="secondary_color"
                        type="color"
                        value={data.config_sections?.theme?.secondary_color || '#8b5cf6'}
                        onChange={(e) => setData('config_sections', {
                          ...data.config_sections,
                          theme: { ...data.config_sections?.theme, secondary_color: e.target.value }
                        })}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={data.config_sections?.theme?.secondary_color || '#8b5cf6'}
                        onChange={(e) => setData('config_sections', {
                          ...data.config_sections,
                          theme: { ...data.config_sections?.theme, secondary_color: e.target.value }
                        })}
                        placeholder="#8b5cf6"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="accent_color">{t('Accent Color')}</Label>
                    <div className="flex gap-2">
                      <Input
                        id="accent_color"
                        type="color"
                        value={data.config_sections?.theme?.accent_color || '#10b981'}
                        onChange={(e) => setData('config_sections', {
                          ...data.config_sections,
                          theme: { ...data.config_sections?.theme, accent_color: e.target.value }
                        })}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={data.config_sections?.theme?.accent_color || '#10b981'}
                        onChange={(e) => setData('config_sections', {
                          ...data.config_sections,
                          theme: { ...data.config_sections?.theme, accent_color: e.target.value }
                        })}
                        placeholder="#10b981"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Image className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('Background Options')}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('Choose between solid colors or background image')}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Switch
                      id="use_background_image"
                      checked={data.config_sections?.use_background_image || false}
                      onCheckedChange={(checked) => setData('config_sections', {
                        ...data.config_sections,
                        use_background_image: checked
                      })}
                    />
                    <Label htmlFor="use_background_image" className="text-sm font-medium">
                      {t('Use Background Image')}
                    </Label>
                  </div>
                  
                  {data.config_sections?.use_background_image && (
                    <div className="space-y-3">
                      <MediaPicker
                        label={t('Background Image')}
                        value={getDisplayUrl(data.config_sections?.background_image || '')}
                        onChange={(value) => setData('config_sections', {
                          ...data.config_sections,
                          background_image: convertToRelativePath(value)
                        })}
                        placeholder={t('Select background image...')}
                      />
                      <p className="text-xs text-gray-500">
                        {t('Recommended size: 1920x1080px or larger. The image will be used as the directory background.')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            )}

            {activeSection === 'hero' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                    <SettingsIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('Hero Section Content')}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('Configure the main hero section content')}</p>
                  </div>
                </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="trust_badge">{t('Trust Badge Text')}</Label>
                  <Input
                    id="trust_badge"
                    value={data.config_sections.hero?.trust_badge || ''}
                    onChange={(e) => setData('config_sections', {
                      ...data.config_sections,
                      hero: { ...data.config_sections.hero, trust_badge: e.target.value }
                    })}
                    placeholder={t('Trusted by 10,000+ Businesses')}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="main_title">{t('Main Title')}</Label>
                  <Input
                    id="main_title"
                    value={data.config_sections.hero?.main_title || ''}
                    onChange={(e) => setData('config_sections', {
                      ...data.config_sections,
                      hero: { ...data.config_sections.hero, main_title: e.target.value }
                    })}
                    placeholder={t('Discover Amazing Businesses')}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="subtitle">{t('Subtitle')}</Label>
                  <Textarea
                    id="subtitle"
                    value={data.config_sections.hero?.subtitle || ''}
                    onChange={(e) => setData('config_sections', {
                      ...data.config_sections,
                      hero: { ...data.config_sections.hero, subtitle: e.target.value }
                    })}
                    placeholder={t('Connect with professionals, explore services, and grow your network')}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-4">
                  <Label>{t('Feature Highlights')}</Label>
                  {(data.config_sections.hero?.features || []).map((feature, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                      <div className="space-y-3">
                        <Label htmlFor={`feature_${index}_icon`}>{t('Icon')}</Label>
                        <select
                          id={`feature_${index}_icon`}
                          value={feature.icon}
                          onChange={(e) => {
                            const newFeatures = [...(data.config_sections.hero?.features || [])];
                            newFeatures[index] = { ...feature, icon: e.target.value };
                            setData('config_sections', {
                              ...data.config_sections,
                              hero: { ...data.config_sections.hero, features: newFeatures }
                            });
                          }}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="verified">{t('Verified')}</option>
                          <option value="location">{t('Location')}</option>
                          <option value="contact">{t('Contact')}</option>
                          <option value="star">{t('Star')}</option>
                          <option value="shield">{t('Shield')}</option>
                          <option value="globe">{t('Globe')}</option>
                          <option value="users">{t('Users')}</option>
                          <option value="zap">{t('Zap')}</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor={`feature_${index}_text`}>{t('Text')}</Label>
                        <div className="flex gap-2">
                          <Input
                            id={`feature_${index}_text`}
                            value={feature.text}
                            onChange={(e) => {
                              const newFeatures = [...(data.config_sections.hero?.features || [])];
                              newFeatures[index] = { ...feature, text: e.target.value };
                              setData('config_sections', {
                                ...data.config_sections,
                                hero: { ...data.config_sections.hero, features: newFeatures }
                              });
                            }}
                            placeholder={t('Feature text')}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                            onClick={() => {
                              const newFeatures = (data.config_sections.hero?.features || []).filter((_, i) => i !== index);
                              setData('config_sections', {
                                ...data.config_sections,
                                hero: { ...data.config_sections.hero, features: newFeatures }
                              });
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="border-2"
                    style={{ color: brandColor, borderColor: brandColor }}
                    onClick={() => {
                      const newFeatures = [...(data.config_sections.hero?.features || []), { icon: 'verified', text: '' }];
                      setData('config_sections', {
                        ...data.config_sections,
                        hero: { ...data.config_sections.hero, features: newFeatures }
                      });
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {t('Add Feature')}
                  </Button>
                </div>
              </div>
              </div>
            </div>
            )}

            {activeSection === 'footer' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gray-100 dark:bg-gray-900 rounded-lg">
                    <Type className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('Footer Content')}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('Footer description and newsletter content')}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-3">
                    <Label htmlFor="footer_description">{t('Company Description')}</Label>
                    <Textarea
                      id="footer_description"
                      value={data.config_sections?.footer?.description || ''}
                      onChange={(e) => setData('config_sections', {
                        ...data.config_sections,
                        footer: { ...data.config_sections?.footer, description: e.target.value }
                      })}
                      placeholder={t('Transforming professional networking...')}
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="footer_newsletter_title">{t('Newsletter Title')}</Label>
                    <Input
                      id="footer_newsletter_title"
                      value={data.config_sections?.footer?.newsletter_title || ''}
                      onChange={(e) => setData('config_sections', {
                        ...data.config_sections,
                        footer: { ...data.config_sections?.footer, newsletter_title: e.target.value }
                      })}
                      placeholder={t('Stay Updated with Our Latest Features')}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="footer_newsletter_subtitle">{t('Newsletter Subtitle')}</Label>
                    <Input
                      id="footer_newsletter_subtitle"
                      value={data.config_sections?.footer?.newsletter_subtitle || ''}
                      onChange={(e) => setData('config_sections', {
                        ...data.config_sections,
                        footer: { ...data.config_sections?.footer, newsletter_subtitle: e.target.value }
                      })}
                      placeholder={t('Join our newsletter for product updates...')}
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <SettingsIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('Social Links')}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('Social media links and profiles')}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {(data.config_sections?.footer?.social_links || []).map((social, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                          <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-bold">{index + 1}</span>
                          {t('Social Link')} {index + 1}
                        </h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                          onClick={() => {
                            const newSocials = (data.config_sections?.footer?.social_links || []).filter((_, i) => i !== index);
                            setData('config_sections', {
                              ...data.config_sections,
                              footer: { ...data.config_sections?.footer, social_links: newSocials }
                            });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-3">
                          <Label htmlFor={`social_${index}_name`}>{t('Name')}</Label>
                          <Input
                            id={`social_${index}_name`}
                            value={social.name || ''}
                            onChange={(e) => {
                              const newSocials = [...(data.config_sections?.footer?.social_links || [])];
                              newSocials[index] = { ...newSocials[index], name: e.target.value };
                              setData('config_sections', {
                                ...data.config_sections,
                                footer: { ...data.config_sections?.footer, social_links: newSocials }
                              });
                            }}
                            placeholder={t('Facebook')}
                          />
                        </div>
                        
                        <div className="space-y-3">
                          <Label htmlFor={`social_${index}_icon`}>{t('Icon')}</Label>
                          <select
                            id={`social_${index}_icon`}
                            value={social.icon || 'Facebook'}
                            onChange={(e) => {
                              const newSocials = [...(data.config_sections?.footer?.social_links || [])];
                              newSocials[index] = { ...newSocials[index], icon: e.target.value };
                              setData('config_sections', {
                                ...data.config_sections,
                                footer: { ...data.config_sections?.footer, social_links: newSocials }
                              });
                            }}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-gray-100"
                          >
                            <option value="Facebook">Facebook</option>
                            <option value="Twitter">Twitter</option>
                            <option value="Linkedin">LinkedIn</option>
                            <option value="Instagram">Instagram</option>
                          </select>
                        </div>
                        
                        <div className="space-y-3">
                          <Label htmlFor={`social_${index}_href`}>{t('URL')}</Label>
                          <Input
                            id={`social_${index}_href`}
                            value={social.href || ''}
                            onChange={(e) => {
                              const newSocials = [...(data.config_sections?.footer?.social_links || [])];
                              newSocials[index] = { ...newSocials[index], href: e.target.value };
                              setData('config_sections', {
                                ...data.config_sections,
                                footer: { ...data.config_sections?.footer, social_links: newSocials }
                              });
                            }}
                            placeholder="https://facebook.com/..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-2"
                    style={{ color: brandColor, borderColor: brandColor }}
                    onClick={() => {
                      const newSocials = [...(data.config_sections?.footer?.social_links || []), { name: '', icon: 'Facebook', href: '' }];
                      setData('config_sections', {
                        ...data.config_sections,
                        footer: { ...data.config_sections?.footer, social_links: newSocials }
                      });
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {t('Add Social Link')}
                  </Button>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <SettingsIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('Footer Links')}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('Footer navigation links by category')}</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {['product', 'company', 'support', 'legal'].map((category) => (
                    <div key={category} className="space-y-4">
                      <div className="space-y-3">
                        <Label htmlFor={`${category}_title`}>{t('Section Title')}</Label>
                        <Input
                          id={`${category}_title`}
                          value={data.config_sections?.footer?.section_titles?.[category] || ''}
                          onChange={(e) => {
                            const newTitles = { ...data.config_sections?.footer?.section_titles };
                            newTitles[category] = e.target.value;
                            setData('config_sections', {
                              ...data.config_sections,
                              footer: { ...data.config_sections?.footer, section_titles: newTitles }
                            });
                          }}
                          placeholder={category.charAt(0).toUpperCase() + category.slice(1)}
                        />
                      </div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">{data.config_sections?.footer?.section_titles?.[category] || category.charAt(0).toUpperCase() + category.slice(1)} Links</h4>
                      {(data.config_sections?.footer?.links?.[category] || []).map((link: any, index: number) => (
                        <div key={index} className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                          <div className="space-y-3">
                            <Label htmlFor={`${category}_${index}_name`}>{t('Name')}</Label>
                            <Input
                              id={`${category}_${index}_name`}
                              value={link.name || ''}
                              onChange={(e) => {
                                const newLinks = { ...data.config_sections?.footer?.links };
                                if (!newLinks[category]) newLinks[category] = [];
                                newLinks[category][index] = { ...newLinks[category][index], name: e.target.value };
                                setData('config_sections', {
                                  ...data.config_sections,
                                  footer: { ...data.config_sections?.footer, links: newLinks }
                                });
                              }}
                              placeholder={t('Features')}
                            />
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor={`${category}_${index}_href`}>{t('URL')}</Label>
                            <div className="flex gap-2">
                              <Input
                                id={`${category}_${index}_href`}
                                value={link.href || ''}
                                onChange={(e) => {
                                  const newLinks = { ...data.config_sections?.footer?.links };
                                  if (!newLinks[category]) newLinks[category] = [];
                                  newLinks[category][index] = { ...newLinks[category][index], href: e.target.value };
                                  setData('config_sections', {
                                    ...data.config_sections,
                                    footer: { ...data.config_sections?.footer, links: newLinks }
                                  });
                                }}
                                placeholder="#features"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                                onClick={() => {
                                  const newLinks = { ...data.config_sections?.footer?.links };
                                  if (newLinks[category]) {
                                    newLinks[category] = newLinks[category].filter((_: any, i: number) => i !== index);
                                    setData('config_sections', {
                                      ...data.config_sections,
                                      footer: { ...data.config_sections?.footer, links: newLinks }
                                    });
                                  }
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="border-2"
                        style={{ color: brandColor, borderColor: brandColor }}
                        onClick={() => {
                          const newLinks = { ...data.config_sections?.footer?.links };
                          if (!newLinks[category]) newLinks[category] = [];
                          newLinks[category].push({ name: '', href: '' });
                          setData('config_sections', {
                            ...data.config_sections,
                            footer: { ...data.config_sections?.footer, links: newLinks }
                          });
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        {t('Add')} {data.config_sections?.footer?.section_titles?.[category] || category.charAt(0).toUpperCase() + category.slice(1)} {t('Link')}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            )}

            {activeSection === 'order' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                    <ArrowUpDown className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('Section Order')}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('Drag and drop to reorder sections on your directory page')}</p>
                  </div>
                </div>
              
              <div className="space-y-3">
                {(() => {
                  const defaultOrder = ['hero', 'search', 'categories', 'filters', 'businesses'];
                  const currentOrder = data.config_sections.section_order || [];
                  const mergedOrder = [...new Set([...currentOrder, ...defaultOrder])];
                  return mergedOrder;
                })().map((sectionKey, index) => {
                  const sectionNames: Record<string, string> = {
                    hero: t('Hero Section'),
                    search: t('Search Bar'),
                    categories: t('Business Categories'),
                    filters: t('Filters'),
                    businesses: t('Business Listings')
                  };
                  
                  const isEnabled = data.config_sections.section_visibility?.[sectionKey] !== false;
                  
                  return (
                    <div
                      key={sectionKey}
                      draggable={sectionKey !== 'search' && sectionKey !== 'filters'}
                      onDragStart={sectionKey !== 'search' && sectionKey !== 'filters' ? (e) => {
                        e.dataTransfer.setData('text/plain', index.toString());
                      } : undefined}
                      onDragOver={sectionKey !== 'search' && sectionKey !== 'filters' ? (e) => {
                        e.preventDefault();
                      } : undefined}
                      onDrop={(e) => {
                        e.preventDefault();
                        const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
                        const currentOrder = [...(data.config_sections.section_order || [])];
                        const draggedItem = currentOrder[dragIndex];
                        
                        // Prevent dropping on search or filters
                        if (sectionKey === 'search' || sectionKey === 'filters') return;
                        // Prevent moving search or filters
                        if (draggedItem === 'search' || draggedItem === 'filters') return;
                        
                        currentOrder.splice(dragIndex, 1);
                        currentOrder.splice(index, 0, draggedItem);
                        setData('config_sections', {
                          ...data.config_sections,
                          section_order: currentOrder
                        });
                      }}
                      className={`flex items-center gap-3 p-4 border rounded-lg transition-all hover:shadow-md ${
                        sectionKey !== 'search' && sectionKey !== 'filters' ? 'cursor-move' : 'cursor-default'
                      } ${
                        isEnabled ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700' : 'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 opacity-60'
                      }`}
                    >
                      <GripVertical className="h-5 w-5 text-gray-400" />
                      <div className="flex-1 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">{sectionNames[sectionKey]}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {isEnabled ? t('Enabled') : t('Disabled')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">{t('Enable')}</Label>
                          <Switch
                            checked={isEnabled}
                            onCheckedChange={(checked) => {
                              const newVisibility = {
                                ...data.config_sections.section_visibility,
                                [sectionKey]: checked
                              };
                              
                              if (sectionKey === 'search' && !checked) {
                                newVisibility.filters = false;
                              }
                              
                              setData('config_sections', {
                                ...data.config_sections,
                                section_visibility: newVisibility
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">{t('How to reorder')}</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      {t('Click and drag any section to change its position. Disabled sections will still appear in the order but won\'t be visible on the directory page.')}
                    </p>
                  </div>
                </div>
              </div>
              </div>
            </div>
            )}
          </div>
        </div>
      </SettingsSection>
      <Toaster />
    </PageTemplate>
  );
}