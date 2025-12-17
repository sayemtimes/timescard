import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const digitalMarketingTemplate = {
  name: 'Digital Marketing Agency',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Agency Name' },
        { name: 'title', type: 'text', label: 'Tagline' },
        { name: 'tagline', type: 'textarea', label: 'Description' },
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
        { name: 'location', type: 'text', label: 'Location' }
      ],
      required: true
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'About Agency' },
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
          label: 'Marketing Services',
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
      name: 'Marketing Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Marketing Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'campaign_showcase', label: 'Campaign Showcase' },
              { value: 'tutorial', label: 'Marketing Tutorial' },
              { value: 'case_study', label: 'Case Study' },
              { value: 'client_testimonial', label: 'Client Testimonial' },
              { value: 'industry_insights', label: 'Industry Insights' },
              { value: 'behind_scenes', label: 'Behind the Scenes' }
            ]},
            { name: 'embed_url', type: 'textarea', label: 'Video Embed URL' },
            { name: 'thumbnail', type: 'file', label: 'Video Thumbnail' },
            { name: 'duration', type: 'text', label: 'Duration' },
            { name: 'marketing_channel', type: 'select', label: 'Marketing Channel', options: [
              { value: 'seo', label: 'SEO' },
              { value: 'ppc', label: 'PPC' },
              { value: 'social_media', label: 'Social Media' },
              { value: 'content_marketing', label: 'Content Marketing' },
              { value: 'email_marketing', label: 'Email Marketing' },
              { value: 'general', label: 'General Marketing' }
            ]}
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
      key: 'portfolio',
      name: 'Case Studies',
      fields: [
        {
          name: 'projects',
          type: 'repeater',
          label: 'Success Stories',
          fields: [
            { name: 'title', type: 'text', label: 'Campaign Title' },
            { name: 'image', type: 'file', label: 'Campaign Image' },
            { name: 'url', type: 'url', label: 'Case Study URL' },
            { name: 'results', type: 'text', label: 'Key Results' }
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
          label: 'Social Media Profiles',
          fields: [
            { name: 'platform', type: 'select', label: 'Platform', options: socialPlatformsConfig.map(p => ({ value: p.value, label: p.label })) },
            { name: 'url', type: 'url', label: 'Profile URL' },
            { name: 'username', type: 'text', label: 'Username/Handle' }
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
          label: 'Office Hours',
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
      name: 'Consultation Booking',
      fields: [
        { name: 'booking_url', type: 'url', label: 'Booking URL' },
        { name: 'calendar_link', type: 'url', label: 'Calendar Link' }
      ],
      required: false
    },
    {
      key: 'testimonials',
      name: 'Client Testimonials',
      fields: [
        {
          name: 'reviews',
          type: 'repeater',
          label: 'Client Reviews',
          fields: [
            { name: 'client_name', type: 'text', label: 'Client Name' },
            { name: 'company', type: 'text', label: 'Company' },
            { name: 'review', type: 'textarea', label: 'Review Text' },
            { name: 'rating', type: 'number', label: 'Rating (1-5)' }
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
      key: 'custom_html',
      name: 'Custom HTML',
      fields: [
        { name: 'html_content', type: 'textarea', label: 'HTML Content' },
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
        { name: 'qr_description', type: 'textarea', label: 'QR Description' }
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
      key: 'copyright',
      name: 'Copyright',
      fields: [
        { name: 'text', type: 'text', label: 'Copyright Text' }
      ],
      required: false
    }
  ],
  colorPresets: [
    { name: 'Digital Blue', primary: '#1E40AF', secondary: '#3B82F6', accent: '#DBEAFE', background: '#F8FAFC', text: '#1E293B', cardBg: '#FFFFFF' },
    { name: 'Marketing Orange', primary: '#EA580C', secondary: '#FB923C', accent: '#FED7AA', background: '#FFFBEB', text: '#1C1917', cardBg: '#FFFFFF' },
    { name: 'Creative Purple', primary: '#7C3AED', secondary: '#A78BFA', accent: '#E0E7FF', background: '#FAFAFA', text: '#374151', cardBg: '#FFFFFF' },
    { name: 'Growth Green', primary: '#059669', secondary: '#10B981', accent: '#D1FAE5', background: '#F0FDF4', text: '#1F2937', cardBg: '#FFFFFF' },
    { name: 'Brand Red', primary: '#DC2626', secondary: '#EF4444', accent: '#FEE2E2', background: '#FFFBFB', text: '#1F2937', cardBg: '#FFFFFF' },
    { name: 'Social Pink', primary: '#DB2777', secondary: '#EC4899', accent: '#FCE7F3', background: '#FDF2F8', text: '#1F2937', cardBg: '#FFFFFF' },
    { name: 'Tech Teal', primary: '#0891B2', secondary: '#06B6D4', accent: '#CFFAFE', background: '#F0FDFA', text: '#1F2937', cardBg: '#FFFFFF' }
  ],
  fontOptions: [
    { name: 'Poppins', value: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'Inter', value: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'Montserrat', value: 'Montserrat, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'Open Sans', value: 'Open Sans, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,600,700' },
    { name: 'Roboto', value: 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,700' }
  ],
  defaultColors: {
    primary: '#1E40AF',
    secondary: '#3B82F6',
    accent: '#DBEAFE',
    background: '#F8FAFC',
    text: '#1E293B',
    cardBg: '#FFFFFF',
    borderColor: '#E2E8F0'
  },
  defaultFont: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif',
  themeStyle: {
    layout: 'modern-card',
    headerStyle: 'gradient',
    cardStyle: 'elevated',
    buttonStyle: 'rounded',
    iconStyle: 'filled',
    spacing: 'comfortable',
    shadows: 'soft',
    animations: 'smooth',
    backgroundPattern: 'subtle-grid'
  },
  defaultData: {
    header: {
      name: 'Digital Growth Agency',
      title: 'Accelerating Your Digital Success',
      tagline: 'We help businesses grow through strategic digital marketing, data-driven campaigns, and innovative solutions.',
      profile_image: '',
      badge_1: 'Digital',
      badge_2: 'Growth',
      badge_3: 'ROI Focused'
    },
    contact: {
      email: 'hello@digitalgrowth.com',
      phone: '+1 (555) 123-4567',
      website: 'https://digitalgrowth.com',
      location: 'New York, NY'
    },
    about: {
      description: 'We are a full-service digital marketing agency specializing in helping businesses achieve measurable growth through strategic online marketing campaigns.',
      specialties: 'SEO, PPC, Social Media Marketing, Content Marketing, Email Marketing, Analytics',
      experience: '8'
    },
    services: {
      service_list: [
        { title: 'Search Engine Optimization', description: 'Improve your organic search rankings and drive qualified traffic', price: 'From $2,500/mo' },
        { title: 'Pay-Per-Click Advertising', description: 'Targeted ad campaigns across Google, Facebook, and other platforms', price: 'From $1,500/mo' },
        { title: 'Social Media Management', description: 'Complete social media strategy and content creation', price: 'From $1,200/mo' },
        { title: 'Content Marketing', description: 'Strategic content creation to engage and convert your audience', price: 'From $2,000/mo' }
      ]
    },
    portfolio: {
      projects: [
        { title: 'E-commerce Growth Campaign', image: '', url: '#', results: '300% increase in online sales' },
        { title: 'B2B Lead Generation', image: '', url: '#', results: '150% more qualified leads' },
        { title: 'Brand Awareness Campaign', image: '', url: '#', results: '500% increase in brand mentions' }
      ]
    },
    social: {
      social_links: [
        { platform: 'linkedin', url: 'https://linkedin.com/company/digitalgrowth', username: 'digitalgrowth' },
        { platform: 'twitter', url: 'https://twitter.com/digitalgrowth', username: '@digitalgrowth' },
        { platform: 'facebook', url: 'https://facebook.com/digitalgrowth', username: 'digitalgrowth' },
        { platform: 'instagram', url: 'https://instagram.com/digitalgrowth', username: '@digitalgrowth' },
        { platform: 'youtube', url: 'https://youtube.com/digitalgrowthagency', username: 'Digital Growth Agency' }
      ]
    },
    videos: {
      video_list: [
        { title: 'E-commerce Growth Campaign Results', description: 'See how we achieved 300% sales growth for our e-commerce client', video_type: 'campaign_showcase', embed_url: '', thumbnail: '', duration: '8:45', marketing_channel: 'general' },
        { title: 'Google Ads Optimization Tutorial', description: 'Step-by-step guide to optimizing Google Ads campaigns for better ROI', video_type: 'tutorial', embed_url: '', thumbnail: '', duration: '15:20', marketing_channel: 'ppc' },
        { title: 'Client Success Story - TechStart Inc.', description: 'How we helped a startup increase leads by 200% in 3 months', video_type: 'client_testimonial', embed_url: '', thumbnail: '', duration: '6:30', marketing_channel: 'general' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/digitalgrowthagency',
      channel_name: 'Digital Growth Agency',
      subscriber_count: '87.3K',
      featured_playlist: 'https://youtube.com/playlist?list=PLmarketingtips',
      latest_video_embed: '',
      channel_description: 'Digital marketing tutorials, campaign breakdowns, and growth strategies from a leading digital marketing agency. Subscribe for weekly marketing insights!'
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '09:00', close_time: '18:00', is_closed: false },
        { day: 'tuesday', open_time: '09:00', close_time: '18:00', is_closed: false },
        { day: 'wednesday', open_time: '09:00', close_time: '18:00', is_closed: false },
        { day: 'thursday', open_time: '09:00', close_time: '18:00', is_closed: false },
        { day: 'friday', open_time: '09:00', close_time: '17:00', is_closed: false },
        { day: 'saturday', open_time: '', close_time: '', is_closed: true },
        { day: 'sunday', open_time: '', close_time: '', is_closed: true }
      ]
    },
    appointments: {
      booking_url: 'https://calendly.com/digitalgrowth',
      calendar_link: 'https://calendar.google.com/digitalgrowth'
    },
    testimonials: {
      reviews: [
        { client_name: 'Sarah Johnson', company: 'TechStart Inc.', review: 'Digital Growth Agency transformed our online presence. Our leads increased by 200% in just 3 months!', rating: '5' },
        { client_name: 'Mike Chen', company: 'E-commerce Plus', review: 'Professional team with excellent results. They really understand digital marketing strategy.', rating: '5' },
        { client_name: 'Lisa Rodriguez', company: 'Local Business Co.', review: 'Outstanding ROI on our marketing spend. Highly recommend their services!', rating: '5' }
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
      form_title: 'Ready to Grow Your Business?',
      form_description: 'Get a free digital marketing consultation and discover how we can help accelerate your growth.'
    },
    custom_html: {
      html_content: '<h3>Digital Growth Experts</h3><p>We are a full-service digital marketing agency with 8+ years of experience helping businesses achieve measurable growth through data-driven campaigns and innovative strategies.</p>',
      section_title: 'Why Choose Us',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Share Our Agency',
      qr_description: 'Scan to share our digital marketing services with your network'
    },
    language: {
      template_language: 'en'
    },
    thank_you: {
      message: 'Thank you for your interest! We\'ll contact you within 24 hours to discuss your digital marketing goals.'
    },
    seo: {
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
    copyright: {
      text: '© 2025 Digital Growth Agency. All rights reserved.'
    }
  }
};