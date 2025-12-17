import React from 'react';
import { getSectionOrder } from '@/utils/sectionHelpers';
import { businessTypeOptions } from '../business-templates';
import CustomCssJs from '@/components/CustomCssJs';

// Import all template components
import FreelancerTemplate from './templates/FreelancerTemplate';
import DoctorTemplate from './templates/DoctorTemplate';
import RestaurantTemplate from './templates/RestaurantTemplate';
import RealEstateTemplate from './templates/RealEstateTemplate';
import FitnessTemplate from './templates/FitnessTemplate';
import PhotographyTemplate from './templates/PhotographyTemplate';
import LawFirmTemplate from './templates/LawFirmTemplate';
import CafeTemplate from './templates/CafeTemplate';
import SalonTemplate from './templates/SalonTemplate';
import ConstructionTemplate from './templates/ConstructionTemplate';
import EventPlannerTemplate from './templates/EventPlannerTemplate';
import EcommerceTemplate from './templates/EcommerceTemplate';
import TravelTemplate from './templates/TravelTemplate';
import GymTemplate from './templates/GymTemplate';
import BakeryTemplate from './templates/BakeryTemplate';
import FitnessStudioTemplate from './templates/FitnessStudioTemplate';
import TechStartupTemplate from './templates/TechStartupTemplate';
import MusicArtistTemplate from './templates/MusicArtistTemplate';
import WeddingPlannerTemplate from './templates/WeddingPlannerTemplate';
import PetCareTemplate from './templates/PetCareTemplate';
import DigitalMarketingTemplate from './templates/DigitalMarketingTemplate';
import AutomotiveTemplate from './templates/AutomotiveTemplate';
import BeautyCosmeticsTemplate from './templates/BeautyCosmeticsTemplate';
import FoodDeliveryTemplate from './templates/FoodDeliveryTemplate';
import HomeServicesTemplate from './templates/HomeServicesTemplate';
import PersonalTrainerTemplate from './templates/PersonalTrainerTemplate';
import ConsultingTemplate from './templates/ConsultingTemplate';
import GraphicDesignTemplate from './templates/GraphicDesignTemplate';
import YogaWellnessTemplate from './templates/YogaWellnessTemplate';
import PodcastCreatorTemplate from './templates/PodcastCreatorTemplate';
import GamingStreamerTemplate from './templates/GamingStreamerTemplate';
import LifeCoachTemplate from './templates/LifeCoachTemplate';
import VeterinarianTemplate from './templates/VeterinarianTemplate';
import ArchitectDesignerTemplate from './templates/ArchitectDesignerTemplate';

interface VCardPreviewProps {
  businessType: string;
  data: any;
  template: any;
}

// Map of business types to their template components
const templateComponents: Record<string, React.ComponentType<any>> = {
  'freelancer': FreelancerTemplate,
  'doctor': DoctorTemplate,
  'restaurant': RestaurantTemplate,
  'realestate': RealEstateTemplate,
  'fitness': FitnessTemplate,
  'photography': PhotographyTemplate,
  'lawfirm': LawFirmTemplate,
  'cafe': CafeTemplate,
  'salon': SalonTemplate,
  'construction': ConstructionTemplate,
  'eventplanner': EventPlannerTemplate,
  'ecommerce': EcommerceTemplate,
  'travel': TravelTemplate,
  'gym': GymTemplate,
  'bakery': BakeryTemplate,
  'fitness-studio': FitnessStudioTemplate,
  'tech-startup': TechStartupTemplate,
  'music-artist': MusicArtistTemplate,
  'wedding-planner': WeddingPlannerTemplate,
  'pet-care': PetCareTemplate,
  'digital-marketing': DigitalMarketingTemplate,
  'automotive': AutomotiveTemplate,
  'beauty-cosmetics': BeautyCosmeticsTemplate,
  'food-delivery': FoodDeliveryTemplate,
  'home-services': HomeServicesTemplate,
  'personal-trainer': PersonalTrainerTemplate,
  'consulting': ConsultingTemplate,
  'graphic-design': GraphicDesignTemplate,
  'yoga-wellness': YogaWellnessTemplate,
  'podcast-creator': PodcastCreatorTemplate,
  'gaming-streamer': GamingStreamerTemplate,
  'life-coach': LifeCoachTemplate,
  'veterinarian': VeterinarianTemplate,
  'architect-designer': ArchitectDesignerTemplate
};

export default function VCardPreview({ businessType, data, template }: VCardPreviewProps) {
  // Convert relative path to full URL for display
  const getDisplayUrl = (path: string): string => {
    if (!path) return path;
    if (path.startsWith('http')) return path;
    if (path.startsWith('/storage/')) {
      const baseUrl = (window as any).appSettings?.baseUrl || window.location.origin;
      return `${baseUrl}${path}`;
    }
    return path.startsWith('/') ? `${window.appSettings.baseUrl}${path}` : path;
  };

  // Process all URLs in config_sections recursively
  const processUrls = (obj: any): any => {
    if (!obj) return obj;
    if (typeof obj === 'string') {
      // Convert relative storage paths to full URLs
      return getDisplayUrl(obj);
    }
    if (Array.isArray(obj)) {
      return obj.map(processUrls);
    }
    if (typeof obj === 'object') {
      const processed: any = {};
      for (const [key, value] of Object.entries(obj)) {
        // Process image-related fields
        if (key.includes('image') || key.includes('logo') || key.includes('icon') || key === 'profile_image' || key === 'og_image') {
          processed[key] = getDisplayUrl(value as string);
        } else {
          processed[key] = processUrls(value);
        }
      }
      return processed;
    }
    return obj;
  };

  // Process URLs in config_sections
  const processedConfigSections = processUrls(data.config_sections);
  
  // Filter config_sections based on allowed sections
  const allowedSections = data.template_config?.allowedSections;
  const filteredConfigSections = React.useMemo(() => {
    if (!allowedSections || allowedSections.length === 0) {
      return processedConfigSections;
    }
    
    const filtered: any = {};
    // Always include essential sections
    const essentialSections = ['colors', 'font', 'language', 'pwa', 'custom_css_js'];
    
    Object.keys(processedConfigSections).forEach(key => {
      if (allowedSections.includes(key) || essentialSections.includes(key) || key === 'custom_css_js') {
        filtered[key] = processedConfigSections[key];
      }
    });
    
    return filtered;
  }, [processedConfigSections, allowedSections]);

  // Filter template sections as well
  const filteredTemplate = React.useMemo(() => {
    if (!template || !allowedSections || allowedSections.length === 0) {
      return template;
    }
    
    return {
      ...template,
      sections: template.sections?.filter((section: any) => 
        allowedSections.includes(section.key) || ['colors', 'font', 'language', 'pwa', 'custom_css_js'].includes(section.key)
      ) || []
    };
  }, [template, allowedSections]);

  // Ensure template_config has sectionSettings
  const enhancedData = {
    ...data,
    config_sections: filteredConfigSections,
    template_config: {
      ...data.template_config,
      sections: filteredConfigSections,
      sectionSettings: data.template_config?.sectionSettings || {}
    }
  };

  // Check if the business type exists in our options
  const isValidType = businessTypeOptions.some(option => option.value === businessType);
  const type = isValidType ? businessType : 'freelancer'; // Default to freelancer if invalid
  
  // Get the template component
  const TemplateComponent = templateComponents[type] || FreelancerTemplate;

  return (
    <div className="w-full">
      <CustomCssJs 
        configSections={filteredConfigSections} 
        planFeatures={enhancedData.template_config?.planFeatures}
      />
      <div className="business-card-container">
        <TemplateComponent data={enhancedData} template={filteredTemplate} />
      </div>
    </div>
  );
  
}

// Common utility function for handling appointment bookings
export const handleAppointmentBooking = (appointmentsData: any) => {
  if (appointmentsData?.booking_url) {
    // If there's a booking URL (like Calendly), open it in a new tab
    typeof window !== "undefined" && window.open(appointmentsData.booking_url, '_blank', 'noopener,noreferrer');
  } else {
    // Otherwise, open the appointment modal
    typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openAppointmentModal'));
  }
};