import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const homeServicesTemplate = {
  name: 'Home Services & Maintenance',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Business Name' },
        { name: 'title', type: 'text', label: 'Service Type' },
        { name: 'tagline', type: 'textarea', label: 'Tagline' },
        { name: 'profile_image', type: 'file', label: 'Logo' },
        { name: 'badge_1', type: 'text', label: 'Badge 1 Text' },
        { name: 'badge_2', type: 'text', label: 'Badge 2 Text' },
        { name: 'badge_3', type: 'text', label: 'Badge 3 Text' }
      ],
      required: true
    },
    {
      key: 'contact',
      name: 'Contact Information',
      fields: [
        { name: 'email', type: 'email', label: 'Email Address' },
        { name: 'phone', type: 'tel', label: 'Phone Number' },
        { name: 'website', type: 'url', label: 'Website URL' },
        { name: 'location', type: 'text', label: 'Service Area' }
      ],
      required: true
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'About Our Services' },
        { name: 'specialties', type: 'tags', label: 'Specialties' },
        { name: 'experience', type: 'number', label: 'Years in Business' }
      ],
      required: false
    },
    {
      key: 'services',
      name: 'Services',
      fields: [
        {
          name: 'service_list',
          type: 'repeater',
          label: 'Home Services',
          fields: [
            { name: 'title', type: 'text', label: 'Service Name' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'price', type: 'text', label: 'Starting Price' },
            { name: 'emergency', type: 'checkbox', label: 'Emergency Service' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'certifications',
      name: 'Licenses & Insurance',
      fields: [
        {
          name: 'cert_list',
          type: 'repeater',
          label: 'Certifications',
          fields: [
            { name: 'title', type: 'text', label: 'License/Certification' },
            { name: 'number', type: 'text', label: 'License Number' },
            { name: 'expiry', type: 'text', label: 'Expiry Date' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'videos',
      name: 'Service Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Home Service Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'service_demo', label: 'Service Demonstration' },
              { value: 'how_to_tips', label: 'How-To Tips' },
              { value: 'before_after', label: 'Before & After' },
              { value: 'customer_testimonial', label: 'Customer Testimonial' },
              { value: 'emergency_response', label: 'Emergency Response' },
              { value: 'maintenance_tips', label: 'Maintenance Tips' }
            ]},
            { name: 'embed_url', type: 'textarea', label: 'Video Embed URL' },
            { name: 'thumbnail', type: 'file', label: 'Video Thumbnail' },
            { name: 'duration', type: 'text', label: 'Duration' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'youtube',
      name: 'YouTube Channel',
      fields: [
        { name: 'channel_url', type: 'url', label: 'YouTube Channel URL' },
        { name: 'channel_name', type: 'text', label: 'Channel Name' },
        { name: 'subscriber_count', type: 'text', label: 'Subscriber Count' },
        { name: 'featured_playlist', type: 'url', label: 'Featured Playlist URL' },
        { name: 'latest_video_embed', type: 'textarea', label: 'Latest Video Embed Code' },
        { name: 'channel_description', type: 'textarea', label: 'Channel Description' }
      ],
      required: false
    },
    {
      key: 'emergency_info',
      name: 'Emergency Services',
      fields: [
        { name: 'emergency_phone', type: 'tel', label: 'Emergency Phone' },
        { name: 'emergency_hours', type: 'text', label: 'Emergency Hours' },
        { name: 'response_time', type: 'text', label: 'Response Time' }
      ],
      required: false
    },
    {
      key: 'social',
      name: 'Social Media',
      fields: [
        {
          name: 'social_links',
          type: 'repeater',
          label: 'Social Media Links',
          fields: [
            { name: 'platform', type: 'select', label: 'Platform', options: socialPlatformsConfig.map(p => ({ value: p.value, label: p.label })) },
            { name: 'url', type: 'url', label: 'Profile URL' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'business_hours',
      name: 'Business Hours',
      fields: [
        {
          name: 'hours',
          type: 'repeater',
          label: 'Service Hours',
          fields: [
            { name: 'day', type: 'select', label: 'Day', options: [
              { value: 'monday', label: 'Monday' },
              { value: 'tuesday', label: 'Tuesday' },
              { value: 'wednesday', label: 'Wednesday' },
              { value: 'thursday', label: 'Thursday' },
              { value: 'friday', label: 'Friday' },
              { value: 'saturday', label: 'Saturday' },
              { value: 'sunday', label: 'Sunday' }
            ]},
            { name: 'open_time', type: 'time', label: 'Start Time' },
            { name: 'close_time', type: 'time', label: 'End Time' },
            { name: 'is_closed', type: 'checkbox', label: 'Closed' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'appointments',
      name: 'Schedule Service',
      fields: [
        { name: 'booking_url', type: 'url', label: 'Booking URL' },
        { name: 'estimate_note', type: 'textarea', label: 'Free Estimate Note' }
      ],
      required: false
    },
    {
      key: 'testimonials',
      name: 'Customer Reviews',
      fields: [
        {
          name: 'reviews',
          type: 'repeater',
          label: 'Customer Reviews',
          fields: [
            { name: 'client_name', type: 'text', label: 'Customer Name' },
            { name: 'review', type: 'textarea', label: 'Review Text' },
            { name: 'rating', type: 'number', label: 'Rating (1-5)' },
            { name: 'service_type', type: 'text', label: 'Service Type' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'google_map',
      name: 'Service Area',
      fields: [
        { name: 'map_embed_url', type: 'textarea', label: 'Google Maps Embed URL' },
        { name: 'directions_url', type: 'url', label: 'Google Maps Directions URL' }
      ],
      required: false
    },
    {
      key: 'app_download',
      name: 'App Download',
      fields: [
        { name: 'app_store_url', type: 'url', label: 'App Store URL' },
        { name: 'play_store_url', type: 'url', label: 'Play Store URL' }
      ],
      required: false
    },
    {
      key: 'contact_form',
      name: 'Contact Form',
      fields: [
        { name: 'form_title', type: 'text', label: 'Form Title' },
        { name: 'form_description', type: 'textarea', label: 'Form Description' }
      ],
      required: false
    },
    {
      key: 'thank_you',
      name: 'Thank You Message',
      fields: [
        { name: 'message', type: 'textarea', label: 'Thank You Message' }
      ],
      required: false
    },    {
      key: 'seo',
      name: 'SEO Settings',
      fields: [
        { name: 'meta_title', type: 'text', label: 'Meta Title' },
        { name: 'meta_description', type: 'textarea', label: 'Meta Description' },
        { name: 'keywords', type: 'text', label: 'Keywords' },
        { name: 'og_image', type: 'url', label: 'Open Graph Image URL' }
      ],
      required: false
    },
    {
      key: 'pixels',
      name: 'Pixel & Analytics',
      fields: [
        { name: 'google_analytics', type: 'text', label: 'Google Analytics ID' },
        { name: 'facebook_pixel', type: 'text', label: 'Facebook Pixel ID' },
        { name: 'gtm_id', type: 'text', label: 'Google Tag Manager ID' },
        { name: 'custom_head', type: 'textarea', label: 'Custom Head Code' },
        { name: 'custom_body', type: 'textarea', label: 'Custom Body Code' }
      ],
      required: false
    },
    {
      key: 'custom_html',
      name: 'Custom HTML',
      fields: [
        { name: 'html_content', type: 'textarea', label: 'Custom HTML Code' },
        { name: 'section_title', type: 'text', label: 'Section Title' },
        { name: 'show_title', type: 'checkbox', label: 'Show Section Title' }
      ],
      required: false
    },
    {
      key: 'qr_share',
      name: 'QR Code Share',
      fields: [
        { name: 'enable_qr', type: 'checkbox', label: 'Enable QR Code Sharing' },
        { name: 'qr_title', type: 'text', label: 'QR Section Title' },
        { name: 'qr_description', type: 'textarea', label: 'QR Description' },
        { name: 'qr_size', type: 'select', label: 'QR Code Size', options: [
          { value: 'small', label: 'Small (128px)' },
          { value: 'medium', label: 'Medium (200px)' },
          { value: 'large', label: 'Large (300px)' }
        ]}
      ],
      required: false
    },
    {
      key: 'language',
      name: 'Language Settings',
      fields: [
        { name: 'template_language', type: 'select', label: 'Template Language', options: languageData.map(lang => ({ value: lang.code, label: `${String.fromCodePoint(...lang.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt()))} ${lang.name}` })) }
      ],
      required: false
    },
    {
      key: 'copyright',
      name: 'Copyright',
      fields: [
        { name: 'text', type: 'text', label: 'Copyright Text' }
      ],
      required: false
    }
  ],
  colorPresets: [
    { name: 'Tool Blue', primary: '#1E40AF', secondary: '#3B82F6', accent: '#DBEAFE', background: '#F8FAFC', text: '#1E293B', cardBg: '#FFFFFF' },
    { name: 'Safety Orange', primary: '#EA580C', secondary: '#FB923C', accent: '#FED7AA', background: '#FFF7ED', text: '#1C1917', cardBg: '#FFFFFF' },
    { name: 'Work Green', primary: '#059669', secondary: '#10B981', accent: '#D1FAE5', background: '#F0FDF4', text: '#1F2937', cardBg: '#FFFFFF' },
    { name: 'Steel Gray', primary: '#6B7280', secondary: '#9CA3AF', accent: '#F3F4F6', background: '#F9FAFB', text: '#111827', cardBg: '#FFFFFF' },
    { name: 'Electric Yellow', primary: '#D97706', secondary: '#F59E0B', accent: '#FEF3C7', background: '#FFFBEB', text: '#1F2937', cardBg: '#FFFFFF' },
    { name: 'Plumber Red', primary: '#DC2626', secondary: '#EF4444', accent: '#FEE2E2', background: '#FFFBFB', text: '#1F2937', cardBg: '#FFFFFF' }
  ],
  fontOptions: [
    { name: 'Roboto', value: 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,700' },
    { name: 'Open Sans', value: 'Open Sans, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,600,700' },
    { name: 'Lato', value: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,700' },
    { name: 'Source Sans Pro', value: 'Source Sans Pro, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,600,700' },
    { name: 'Nunito', value: 'Nunito, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,600,700' }
  ],
  defaultColors: {
    primary: '#1E40AF',
    secondary: '#3B82F6',
    accent: '#DBEAFE',
    background: '#F8FAFC',
    text: '#1E293B',
    cardBg: '#FFFFFF',
    borderColor: '#CBD5E1'
  },
  defaultFont: 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif',
  themeStyle: {
    layout: 'professional',
    headerStyle: 'reliable',
    cardStyle: 'clean',
    buttonStyle: 'solid',
    iconStyle: 'filled',
    spacing: 'structured',
    shadows: 'professional',
    animations: 'steady'
  },
  defaultData: {
    header: {
      name: 'ProFix Home Services',
      title: 'Professional Home Maintenance & Repair',
      tagline: 'Reliable, licensed professionals for all your home service needs',
      profile_image: '',
      badge_1: 'Licensed',
      badge_2: 'Insured',
      badge_3: '24/7'
    },
    contact: {
      email: 'service@profix.com',
      phone: '+1 (555) FIX-HOME',
      website: 'https://profix.com',
      location: 'Metro Area & Suburbs'
    },
    about: {
      description: 'Licensed and insured home service professionals with over 15 years of experience. We provide reliable, quality workmanship for all your home maintenance and repair needs.',
      specialties: 'Plumbing, Electrical, HVAC, Handyman, Appliance Repair, Emergency Services',
      experience: '15'
    },
    services: {
      service_list: [
        { title: 'Plumbing Services', description: 'Leak repairs, pipe installation, drain cleaning', price: 'From $89', emergency: true },
        { title: 'Electrical Work', description: 'Wiring, outlets, lighting, panel upgrades', price: 'From $125', emergency: true },
        { title: 'HVAC Services', description: 'AC repair, heating, duct cleaning, maintenance', price: 'From $99', emergency: false },
        { title: 'General Handyman', description: 'Home repairs, installations, maintenance tasks', price: 'From $75', emergency: false }
      ]
    },
    certifications: {
      cert_list: [
        { title: 'Licensed Contractor', number: 'LIC-123456', expiry: '2025-12-31' },
        { title: 'Insured & Bonded', number: 'INS-789012', expiry: '2025-06-30' },
        { title: 'EPA Certified', number: 'EPA-345678', expiry: '2026-03-15' }
      ]
    },
    emergency_info: {
      emergency_phone: '+1 (555) 911-HELP',
      emergency_hours: '24/7 Emergency Service',
      response_time: 'Within 2 hours'
    },
    social: {
      social_links: [
        { platform: 'google', url: 'https://business.google.com/profix' },
        { platform: 'yelp', url: 'https://yelp.com/profix' },
        { platform: 'facebook', url: 'https://facebook.com/profix' },
        { platform: 'youtube', url: 'https://youtube.com/profix' }
      ]
    },
    videos: {
      video_list: [
        { title: 'How to Fix a Leaky Faucet', description: 'Step-by-step guide to fixing common faucet leaks', video_type: 'how_to_tips', embed_url: '', thumbnail: '', duration: '8:30' },
        { title: 'Emergency Plumbing Response', description: 'See how quickly our team responds to plumbing emergencies', video_type: 'emergency_response', embed_url: '', thumbnail: '', duration: '4:15' },
        { title: 'Kitchen Renovation - Before & After', description: 'Complete kitchen electrical and plumbing renovation project', video_type: 'before_after', embed_url: '', thumbnail: '', duration: '6:45' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/profix',
      channel_name: 'ProFix Home Services',
      subscriber_count: '19.4K',
      featured_playlist: 'https://youtube.com/playlist?list=PLhometips',
      latest_video_embed: '',
      channel_description: 'Home maintenance tips, repair tutorials, and service demonstrations from licensed professionals. Subscribe for weekly home improvement content!'
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '07:00', close_time: '18:00', is_closed: false },
        { day: 'tuesday', open_time: '07:00', close_time: '18:00', is_closed: false },
        { day: 'wednesday', open_time: '07:00', close_time: '18:00', is_closed: false },
        { day: 'thursday', open_time: '07:00', close_time: '18:00', is_closed: false },
        { day: 'friday', open_time: '07:00', close_time: '18:00', is_closed: false },
        { day: 'saturday', open_time: '08:00', close_time: '16:00', is_closed: false },
        { day: 'sunday', open_time: '', close_time: '', is_closed: true }
      ]
    },
    appointments: {
      booking_url: 'https://profix.com/schedule',
      estimate_note: 'Free estimates on all major repairs and installations'
    },
    testimonials: {
      reviews: [
        { client_name: 'Mike Johnson', review: 'Excellent plumbing work! Fixed our leak quickly and professionally. Highly recommend ProFix.', rating: '5', service_type: 'Plumbing' },
        { client_name: 'Sarah Davis', review: 'Great electrical work installing new outlets. Clean, professional, and reasonably priced.', rating: '5', service_type: 'Electrical' },
        { client_name: 'Robert Chen', review: 'Emergency HVAC repair on a weekend. They came out quickly and got our heat working again.', rating: '5', service_type: 'HVAC' }
      ]
    },
    google_map: {
      map_embed_url: '',
      directions_url: 'https://maps.google.com/directions'
    },
    app_download: {
      app_store_url: '#',
      play_store_url: '#'
    },
    contact_form: {
      form_title: 'Request Free Estimate',
      form_description: 'Get a free estimate for your home service needs. Licensed professionals ready to help.'
    },
    thank_you: {
      message: 'Thank you for choosing ProFix! We\'ll contact you within 2 hours to schedule your service.'
    },    seo: {
      meta_title: '',
      meta_description: '',
      keywords: '',
      og_image: ''
    },    pixels: {
      google_analytics: '',
      facebook_pixel: '',
      gtm_id: '',
      custom_head: '',
      custom_body: ''
    },
    custom_html: {
      html_content: '<div class="service-highlights"><h4>Why Choose ProFix?</h4><p>🔧 Licensed & Insured Professionals</p><p>⏰ Same-Day Service Available</p><p>💰 Upfront Pricing - No Hidden Fees</p><p>🔄 100% Satisfaction Guarantee</p></div>',
      section_title: 'Service Guarantee',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Quick Contact for Service',
      qr_description: 'Scan to save our contact info and request service anytime!',
      qr_size: 'medium'
    },
    language: {
      template_language: 'en'
    },
    copyright: {
      text: '© 2025 ProFix Home Services. Licensed & Insured.'
    }
  }
};