import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const consultingTemplate = {
  name: 'Consulting & Professional Services',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Full Name' },
        { name: 'title', type: 'text', label: 'Professional Title' },
        { name: 'tagline', type: 'textarea', label: 'Professional Tagline' },
        { name: 'profile_image', type: 'file', label: 'Professional Photo' }
      ],
      required: true
    },
    {
      key: 'contact',
      name: 'Contact Information',
      fields: [
        { name: 'email', type: 'email', label: 'Business Email' },
        { name: 'phone', type: 'tel', label: 'Phone Number' },
        { name: 'website', type: 'url', label: 'Website URL' },
        { name: 'location', type: 'text', label: 'Office Location' }
      ],
      required: true
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'Professional Summary' },
        { name: 'expertise', type: 'tags', label: 'Areas of Expertise' },
        { name: 'experience', type: 'number', label: 'Years of Experience' },
        { name: 'certifications', type: 'tags', label: 'Certifications' }
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
          label: 'Consulting Services',
          fields: [
            { name: 'title', type: 'text', label: 'Service Title' },
            { name: 'description', type: 'textarea', label: 'Service Description' },
            { name: 'duration', type: 'text', label: 'Typical Duration' },
            { name: 'price_range', type: 'text', label: 'Price Range' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'videos',
      name: 'Educational Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Professional Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'thought_leadership', label: 'Thought Leadership' },
              { value: 'case_study', label: 'Case Study Presentation' },
              { value: 'webinar', label: 'Webinar/Workshop' },
              { value: 'client_testimonial', label: 'Client Testimonial' },
              { value: 'industry_insights', label: 'Industry Insights' },
              { value: 'methodology', label: 'Methodology Explanation' }
            ]},
            { name: 'embed_url', type: 'textarea', label: 'Video Embed URL' },
            { name: 'thumbnail', type: 'file', label: 'Video Thumbnail' },
            { name: 'duration', type: 'text', label: 'Duration' },
            { name: 'expertise_area', type: 'text', label: 'Expertise Area' }
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
      key: 'case_studies',
      name: 'Case Studies',
      fields: [
        {
          name: 'studies',
          type: 'repeater',
          label: 'Client Success Stories',
          fields: [
            { name: 'title', type: 'text', label: 'Project Title' },
            { name: 'client_industry', type: 'text', label: 'Client Industry' },
            { name: 'challenge', type: 'textarea', label: 'Challenge' },
            { name: 'solution', type: 'textarea', label: 'Solution' },
            { name: 'results', type: 'textarea', label: 'Results Achieved' }
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
          label: 'Professional Networks',
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
      name: 'Appointments',
      fields: [
        { name: 'booking_url', type: 'url', label: 'Consultation Booking URL' },
        { name: 'calendar_link', type: 'url', label: 'Calendar Link' },
        { name: 'consultation_fee', type: 'text', label: 'Initial Consultation Fee' }
      ],
      required: false
    },
    {
      key: 'testimonials',
      name: 'Testimonials',
      fields: [
        {
          name: 'reviews',
          type: 'repeater',
          label: 'Client Testimonials',
          fields: [
            { name: 'client_name', type: 'text', label: 'Client Name' },
            { name: 'client_title', type: 'text', label: 'Client Title/Company' },
            { name: 'review', type: 'textarea', label: 'Testimonial' },
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
    { name: 'Executive Blue', primary: '#1E40AF', secondary: '#3B82F6', accent: '#EFF6FF', background: '#F8FAFC', text: '#1E293B', cardBg: '#FFFFFF' },
    { name: 'Corporate Gray', primary: '#374151', secondary: '#6B7280', accent: '#F9FAFB', background: '#FFFFFF', text: '#111827', cardBg: '#F3F4F6' },
    { name: 'Professional Navy', primary: '#1E3A8A', secondary: '#3730A3', accent: '#E0E7FF', background: '#F1F5F9', text: '#0F172A', cardBg: '#FFFFFF' },
    { name: 'Trust Green', primary: '#059669', secondary: '#10B981', accent: '#ECFDF5', background: '#F9FAFB', text: '#064E3B', cardBg: '#FFFFFF' },
    { name: 'Authority Purple', primary: '#7C3AED', secondary: '#8B5CF6', accent: '#F5F3FF', background: '#FAFAFA', text: '#581C87', cardBg: '#FFFFFF' }
  ],
  fontOptions: [
    { name: 'Inter', value: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'Roboto', value: 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,700' },
    { name: 'Open Sans', value: 'Open Sans, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,600,700' },
    { name: 'Lato', value: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,700' },
    { name: 'Source Sans Pro', value: 'Source Sans Pro, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,600,700' }
  ],
  defaultColors: {
    primary: '#1E40AF',
    secondary: '#3B82F6',
    accent: '#EFF6FF',
    background: '#F8FAFC',
    text: '#1E293B',
    cardBg: '#FFFFFF',
    borderColor: '#E2E8F0',
    shadowColor: 'rgba(0, 0, 0, 0.1)'
  },
  defaultFont: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  themeStyle: {
    layout: 'professional-grid',
    headerStyle: 'executive',
    cardStyle: 'clean-shadow',
    buttonStyle: 'professional',
    iconStyle: 'business',
    spacing: 'comfortable',
    shadows: 'subtle',
    animations: 'smooth',
    backgroundPattern: 'subtle-grid',
    typography: 'corporate'
  },
  defaultData: {
    header: {
      name: 'Sarah Johnson',
      title: 'Management Consultant',
      tagline: 'Transforming businesses through strategic insights and operational excellence',
      profile_image: ''
    },
    contact: {
      email: 'sarah@consultingfirm.com',
      phone: '+1 (555) 987-6543',
      website: 'https://sarahjohnsonconsulting.com',
      location: 'New York, NY'
    },
    about: {
      description: 'Strategic management consultant with 12+ years of experience helping Fortune 500 companies optimize operations, drive growth, and navigate complex business challenges.',
      expertise: 'Strategic Planning, Operations Management, Digital Transformation, Change Management, Process Optimization',
      experience: '12',
      certifications: 'PMP, Six Sigma Black Belt, MBA'
    },
    services: {
      service_list: [
        { title: 'Strategic Planning', description: 'Comprehensive strategic planning and roadmap development', duration: '3-6 months', price_range: '$15,000 - $50,000' },
        { title: 'Operations Consulting', description: 'Process optimization and operational efficiency improvements', duration: '2-4 months', price_range: '$10,000 - $30,000' },
        { title: 'Digital Transformation', description: 'Technology adoption and digital strategy implementation', duration: '6-12 months', price_range: '$25,000 - $100,000' }
      ]
    },
    case_studies: {
      studies: [
        {
          title: 'Manufacturing Efficiency Improvement',
          client_industry: 'Manufacturing',
          challenge: 'Client faced 30% production delays and rising operational costs',
          solution: 'Implemented lean manufacturing principles and automated key processes',
          results: '40% reduction in production time, 25% cost savings, improved quality metrics'
        }
      ]
    },
    social: {
      social_links: [
        { platform: 'linkedin', url: 'https://linkedin.com/in/sarahjohnson', username: 'sarahjohnson' },
        { platform: 'twitter', url: 'https://twitter.com/sarahconsults', username: '@sarahconsults' },
        { platform: 'youtube', url: 'https://youtube.com/sarahjohnsonconsulting', username: 'Sarah Johnson Consulting' }
      ]
    },
    videos: {
      video_list: [
        { title: 'Strategic Planning Framework for Growth', description: 'Learn the proven framework I use to help companies develop winning strategies', video_type: 'thought_leadership', embed_url: '', thumbnail: '', duration: '18:30', expertise_area: 'Strategic Planning' },
        { title: 'Digital Transformation Success Story', description: 'Case study presentation on how we helped a Fortune 500 company modernize operations', video_type: 'case_study', embed_url: '', thumbnail: '', duration: '25:45', expertise_area: 'Digital Transformation' },
        { title: 'Change Management Best Practices', description: 'Webinar on leading organizational change effectively', video_type: 'webinar', embed_url: '', thumbnail: '', duration: '45:20', expertise_area: 'Change Management' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/sarahjohnsonconsulting',
      channel_name: 'Sarah Johnson Consulting',
      subscriber_count: '32.4K',
      featured_playlist: 'https://youtube.com/playlist?list=PLstrategicplanning',
      latest_video_embed: '',
      channel_description: 'Strategic insights, business transformation tips, and leadership advice from a management consultant with 12+ years of Fortune 500 experience.'
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '08:00', close_time: '18:00', is_closed: false },
        { day: 'tuesday', open_time: '08:00', close_time: '18:00', is_closed: false },
        { day: 'wednesday', open_time: '08:00', close_time: '18:00', is_closed: false },
        { day: 'thursday', open_time: '08:00', close_time: '18:00', is_closed: false },
        { day: 'friday', open_time: '08:00', close_time: '17:00', is_closed: false },
        { day: 'saturday', open_time: '', close_time: '', is_closed: true },
        { day: 'sunday', open_time: '', close_time: '', is_closed: true }
      ]
    },
    appointments: {
      booking_url: 'https://calendly.com/sarahjohnson',
      calendar_link: 'https://calendar.google.com/sarahjohnson',
      consultation_fee: 'Free initial consultation'
    },
    testimonials: {
      reviews: [
        { client_name: 'Michael Chen', client_title: 'CEO, TechCorp Inc.', review: 'Sarah\'s strategic insights transformed our operations. Her expertise in change management was invaluable during our digital transformation.', rating: '5' },
        { client_name: 'Lisa Rodriguez', client_title: 'VP Operations, Global Manufacturing', review: 'Outstanding results! Sarah helped us achieve 40% efficiency gains while maintaining quality standards.', rating: '5' }
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
      form_title: 'Schedule a Consultation',
      form_description: 'Ready to transform your business? Let\'s discuss your challenges and explore how strategic consulting can drive your success.'
    },
    custom_html: {
      html_content: '<h3>Strategic Business Transformation</h3><p>With 12+ years of Fortune 500 experience, I help businesses optimize operations, drive growth, and navigate complex challenges through proven methodologies and strategic insights.</p>',
      section_title: 'Expertise & Approach',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Share My Profile',
      qr_description: 'Scan to share my consulting services with your network'
    },
    language: {
      template_language: 'en'
    },
    thank_you: {
      message: 'Thank you for your interest! I\'ll review your inquiry and respond within 24 hours to schedule our initial consultation.'
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
      text: '© 2025 Sarah Johnson Consulting. All rights reserved.'
    }
  }
};