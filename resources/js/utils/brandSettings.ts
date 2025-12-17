import { type ThemeColor } from '@/hooks/use-appearance';
import { type LayoutPosition } from '@/contexts/LayoutContext';
import { type Appearance } from '@/hooks/use-appearance';

// Define the brand settings interface
export interface BrandSettings {
  logoDark: string;
  logoLight: string;
  favicon: string;
  titleText: string;
  footerText: string;
  themeColor: ThemeColor;
  customColor: string;
  sidebarVariant: string;
  sidebarStyle: string;
  layoutDirection: LayoutPosition;
  themeMode: Appearance;
}

// Default brand settings
export const DEFAULT_BRAND_SETTINGS: BrandSettings = {
  logoDark: '/images/logos/logo-dark.png',
  logoLight: '/images/logos/logo-light.png',
  favicon: '/images/logos/favicon.ico',
  titleText: 'WorkDo',
  footerText: '© 2025 WorkDo. All rights reserved.',
  themeColor: 'green',
  customColor: '#10b981',
  sidebarVariant: 'inset',
  sidebarStyle: 'plain',
  layoutDirection: 'left',
  themeMode: 'light',
};

// Get brand settings from props or localStorage as fallback
export const getBrandSettings = (userSettings?: Record<string, string>): BrandSettings => {
  // If we have settings from the backend, use those
  if (userSettings) {
    const getFullUrl = (path: string, defaultPath: string) => {
      if (!path) return window.appSettings?.baseUrl + defaultPath;
      if (path.startsWith('http')) return path;
      return window.appSettings?.baseUrl + path;
    };

    // Convert layoutDirection from backend format to frontend format if needed
    const layoutDirection = userSettings.layoutDirection === 'ltr' ? 'left' : 
                           userSettings.layoutDirection === 'rtl' ? 'right' : 
                           (userSettings.layoutDirection as LayoutPosition) || DEFAULT_BRAND_SETTINGS.layoutDirection;

    return {
      logoDark: getFullUrl(userSettings.logoDark, DEFAULT_BRAND_SETTINGS.logoDark),
      logoLight: getFullUrl(userSettings.logoLight, DEFAULT_BRAND_SETTINGS.logoLight),
      favicon: getFullUrl(userSettings.favicon, DEFAULT_BRAND_SETTINGS.favicon),
      titleText: userSettings.titleText || DEFAULT_BRAND_SETTINGS.titleText,
      footerText: userSettings.footerText || DEFAULT_BRAND_SETTINGS.footerText,
      themeColor: (userSettings.themeColor as ThemeColor) || DEFAULT_BRAND_SETTINGS.themeColor,
      customColor: userSettings.customColor || DEFAULT_BRAND_SETTINGS.customColor,
      sidebarVariant: userSettings.sidebarVariant || DEFAULT_BRAND_SETTINGS.sidebarVariant,
      sidebarStyle: userSettings.sidebarStyle || DEFAULT_BRAND_SETTINGS.sidebarStyle,
      layoutDirection: layoutDirection,
      themeMode: (userSettings.themeMode as Appearance) || DEFAULT_BRAND_SETTINGS.themeMode,
    };
  }

  // Fallback to localStorage if no backend settings
  if (typeof localStorage === 'undefined') {
    return DEFAULT_BRAND_SETTINGS;
  }

  try {
    const savedSettings = localStorage.getItem('brandSettings');
    return savedSettings ? JSON.parse(savedSettings) : DEFAULT_BRAND_SETTINGS;
  } catch (error) {
    return DEFAULT_BRAND_SETTINGS;
  }
};