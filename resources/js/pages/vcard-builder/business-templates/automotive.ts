import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const automotiveTemplate = {
  name: 'Automotive Services',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Shop Name' },
        { name: 'title', type: 'text', label: 'Service Type' },
        { name: 'tagline', type: 'textarea', label: 'Tagline' },
        { name: 'profile_image', type: 'file', label: 'Shop Logo' },
        { name: 'badge_1', type: 'text', label: 'Badge 1 Text' },
        { name: 'badge_2', type: 'text', label: 'Badge 2 Text' }
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
        { name: 'location', type: 'text', label: 'Location' }
      ],
      required: true
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'About Our Shop' },
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
          label: 'Auto Services',
          fields: [
            { name: 'title', type: 'text', label: 'Service Name' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'price', type: 'text', label: 'Starting Price' }
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
          label: 'Automotive Videos',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'service_demo', label: 'Service Demonstration' },
              { value: 'repair_process', label: 'Repair Process' },
              { value: 'customer_testimonial', label: 'Customer Testimonial' },
              { value: 'shop_tour', label: 'Shop Tour' },
              { value: 'maintenance_tips', label: 'Maintenance Tips' },
              { value: 'before_after', label: 'Before & After Repair' }
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
      key: 'certifications',
      name: 'Certifications',
      fields: [
        {
          name: 'cert_list',
          type: 'repeater',
          label: 'Certifications & Brands',
          fields: [
            { name: 'title', type: 'text', label: 'Certification/Brand' },
            { name: 'description', type: 'text', label: 'Details' }
          ]
        }
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
          label: 'Shop Hours',
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
            { name: 'open_time', type: 'time', label: 'Opening Time' },
            { name: 'close_time', type: 'time', label: 'Closing Time' },
            { name: 'is_closed', type: 'checkbox', label: 'Closed' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'appointments',
      name: 'Appointments',
      fields: [
        { name: 'booking_url', type: 'url', label: 'Booking URL' },
        { name: 'emergency_phone', type: 'tel', label: 'Emergency/Towing Number' }
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
            { name: 'vehicle', type: 'text', label: 'Vehicle' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'google_map',
      name: 'Location',
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
    { name: 'Motor Red', primary: '#DC2626', secondary: '#EF4444', accent: '#FEE2E2', background: '#1F1F1F', text: '#F5F5F5', cardBg: '#2A2A2A' },
    { name: 'Engine Blue', primary: '#1E40AF', secondary: '#3B82F6', accent: '#DBEAFE', background: '#0F172A', text: '#E2E8F0', cardBg: '#1E293B' },
    { name: 'Chrome Silver', primary: '#6B7280', secondary: '#9CA3AF', accent: '#F3F4F6', background: '#111827', text: '#F9FAFB', cardBg: '#1F2937' },
    { name: 'Racing Yellow', primary: '#EAB308', secondary: '#FACC15', accent: '#FEF3C7', background: '#1C1917', text: '#FAFAF9', cardBg: '#292524' },
    { name: 'Tire Black', primary: '#F97316', secondary: '#FB923C', accent: '#FED7AA', background: '#000000', text: '#FFFFFF', cardBg: '#1A1A1A' },
    { name: 'Oil Green', primary: '#059669', secondary: '#10B981', accent: '#D1FAE5', background: '#064E3B', text: '#ECFDF5', cardBg: '#065F46' }
  ],
  fontOptions: [
    { name: 'Roboto', value: 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,700' },
    { name: 'Open Sans', value: 'Open Sans, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,600,700' },
    { name: 'Lato', value: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,700' },
    { name: 'Nunito', value: 'Nunito, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,600,700' },
    { name: 'Source Sans Pro', value: 'Source Sans Pro, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,600,700' }
  ],
  defaultColors: {
    primary: '#DC2626',
    secondary: '#EF4444',
    accent: '#FEE2E2',
    background: '#1F1F1F',
    text: '#F5F5F5',
    cardBg: '#2A2A2A',
    borderColor: '#404040'
  },
  defaultFont: 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif',
  themeStyle: {
    layout: 'industrial',
    headerStyle: 'metallic',
    cardStyle: 'industrial',
    buttonStyle: 'bold',
    iconStyle: 'solid',
    spacing: 'compact',
    shadows: 'strong',
    animations: 'mechanical'
  },
  defaultData: {
    header: {
      name: 'AutoCare Pro',
      title: 'Complete Automotive Services',
      tagline: 'Expert auto repair and maintenance services you can trust',
      profile_image: '',
      badge_1: 'Licensed & Insured',
      badge_2: 'Expert Service'
    },
    contact: {
      email: 'service@autocare.com',
      phone: '+1 (555) 123-AUTO',
      website: 'https://autocarepro.com',
      location: 'Downtown Auto District'
    },
    about: {
      description: 'Family-owned auto shop providing honest, reliable automotive services for over 20 years. ASE certified technicians using the latest diagnostic equipment.',
      specialties: 'Engine Repair, Brake Service, Oil Changes, Transmission, AC Repair, Diagnostics',
      experience: '20'
    },
    services: {
      service_list: [
        { title: 'Oil Change & Filter', description: 'Full synthetic oil change with multi-point inspection', price: 'From $49.99' },
        { title: 'Brake Service', description: 'Complete brake inspection, pads, rotors, and fluid service', price: 'From $149.99' },
        { title: 'Engine Diagnostics', description: 'Computer diagnostics and check engine light service', price: 'From $99.99' },
        { title: 'Transmission Service', description: 'Transmission fluid change and inspection', price: 'From $179.99' }
      ]
    },
    certifications: {
      cert_list: [
        { title: 'ASE Certified', description: 'Automotive Service Excellence Certification' },
        { title: 'AAA Approved', description: 'AAA Approved Auto Repair Facility' },
        { title: 'NAPA AutoCare', description: 'NAPA AutoCare Center with nationwide warranty' }
      ]
    },
    social: {
      social_links: [
        { platform: 'facebook', url: 'https://facebook.com/autocarepro' },
        { platform: 'google', url: 'https://business.google.com/autocarepro' },
        { platform: 'yelp', url: 'https://yelp.com/autocarepro' },
        { platform: 'youtube', url: 'https://youtube.com/autocarepro' }
      ]
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '07:30', close_time: '18:00', is_closed: false },
        { day: 'tuesday', open_time: '07:30', close_time: '18:00', is_closed: false },
        { day: 'wednesday', open_time: '07:30', close_time: '18:00', is_closed: false },
        { day: 'thursday', open_time: '07:30', close_time: '18:00', is_closed: false },
        { day: 'friday', open_time: '07:30', close_time: '18:00', is_closed: false },
        { day: 'saturday', open_time: '08:00', close_time: '16:00', is_closed: false },
        { day: 'sunday', open_time: '', close_time: '', is_closed: true }
      ]
    },
    appointments: {
      booking_url: 'https://autocarepro.com/book',
      emergency_phone: '+1 (555) 911-TOWS'
    },
    testimonials: {
      reviews: [
        { client_name: 'Mike Johnson', review: 'Honest mechanics who explain everything clearly. Fixed my transmission at a fair price.', rating: '5', vehicle: '2018 Honda Civic' },
        { client_name: 'Sarah Davis', review: 'Quick oil change service and they found a potential issue before it became expensive. Great service!', rating: '5', vehicle: '2020 Toyota Camry' },
        { client_name: 'Robert Chen', review: 'ASE certified technicians who know their stuff. My go-to shop for all automotive needs.', rating: '5', vehicle: '2019 Ford F-150' }
      ]
    },
    videos: {
      video_list: [
        { title: 'Complete Brake Service Walkthrough', description: 'Watch our ASE certified technicians perform a complete brake service', video_type: 'service_demo', embed_url: '', thumbnail: '', duration: '15:30' },
        { title: 'Engine Diagnostic Process', description: 'See how we diagnose check engine lights using professional equipment', video_type: 'repair_process', embed_url: '', thumbnail: '', duration: '10:45' },
        { title: 'Customer Mike Reviews Our Transmission Service', description: 'Hear from satisfied customer about our honest and reliable service', video_type: 'customer_testimonial', embed_url: '', thumbnail: '', duration: '3:20' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/autocarepro',
      channel_name: 'AutoCare Pro',
      subscriber_count: '12.8K',
      featured_playlist: 'https://youtube.com/playlist?list=PLautomaintenance',
      latest_video_embed: '',
      channel_description: 'Professional automotive repair tips, service demonstrations, and maintenance advice from ASE certified technicians.'
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
      form_title: 'Schedule Your Service',
      form_description: 'Get a free estimate or schedule your automotive service appointment today.'
    },
    thank_you: {
      message: 'Thank you for choosing AutoCare Pro! We\'ll contact you within 2 hours to confirm your appointment.'
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
      html_content: '<div class="featured-services"><h4>Certified Excellence</h4><p>ASE Certified technicians with over 20 years of automotive expertise. Your trusted local auto repair shop.</p></div>',
      section_title: 'Why Choose Us',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Save Our Shop Info',
      qr_description: 'Scan to save our contact details and never lose our number when you need automotive service.',
      qr_size: 'medium'
    },
    language: {
      template_language: 'en'
    },
    copyright: {
      text: '© 2025 AutoCare Pro. All rights reserved.'
    }
  }
};