import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const photographyTemplate = {
  name: 'Photography',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Full Name' },
        { name: 'title', type: 'text', label: 'Professional Title' },
        { name: 'tagline', type: 'textarea', label: 'Tagline' },
        { name: 'cta_button_text', type: 'text', label: 'Call-to-Action Button Text' },
        { name: 'profile_image', type: 'file', label: 'Profile Image' },
        { name: 'background_image', type: 'file', label: 'Background Image' }
      ],
      required: true
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'About Me' },
        { name: 'experience', type: 'number', label: 'Years of Experience' },
        { name: 'specialties', type: 'tags', label: 'Photography Specialties' }
      ],
      required: false
    },
    {
      key: 'portfolio',
      name: 'Portfolio',
      fields: [
        {
          name: 'gallery',
          type: 'repeater',
          label: 'Photo Gallery',
          fields: [
            { name: 'title', type: 'text', label: 'Image Title' },
            { name: 'category', type: 'select', label: 'Category', options: [
              { value: 'portrait', label: 'Portrait' },
              { value: 'landscape', label: 'Landscape' },
              { value: 'wedding', label: 'Wedding' },
              { value: 'event', label: 'Event' },
              { value: 'commercial', label: 'Commercial' },
              { value: 'street', label: 'Street' }
            ]},
            { name: 'image', type: 'file', label: 'Photo' },
            { name: 'description', type: 'textarea', label: 'Description' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'videos',
      name: 'Photography Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Photography Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'behind_scenes', label: 'Behind the Scenes' },
              { value: 'tutorial', label: 'Photography Tutorial' },
              { value: 'client_session', label: 'Client Session Highlights' },
              { value: 'portfolio_showcase', label: 'Portfolio Showcase' },
              { value: 'equipment_review', label: 'Equipment Review' },
              { value: 'wedding_highlight', label: 'Wedding Highlight Reel' }
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
      key: 'services',
      name: 'Services',
      fields: [
        {
          name: 'service_list',
          type: 'repeater',
          label: 'Photography Services',
          fields: [
            { name: 'title', type: 'text', label: 'Service Title' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'price', type: 'text', label: 'Price' },
            { name: 'duration', type: 'text', label: 'Duration' },
            { name: 'icon', type: 'select', label: 'Icon', options: [
              { value: 'camera', label: 'Camera' },
              { value: 'video', label: 'Video' },
              { value: 'edit', label: 'Editing' },
              { value: 'portrait', label: 'Portrait' },
              { value: 'wedding', label: 'Wedding' },
              { value: 'event', label: 'Event' }
            ]}
          ]
        }
      ],
      required: false
    },
    {
      key: 'contact',
      name: 'Contact Information',
      fields: [
        { name: 'email', type: 'email', label: 'Email Address' },
        { name: 'phone', type: 'tel', label: 'Phone Number' },
        { name: 'website', type: 'url', label: 'Website URL' },
        { name: 'location', type: 'text', label: 'Studio Location' }
      ],
      required: true
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
          label: 'Studio Hours',
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
        { name: 'calendar_link', type: 'url', label: 'Calendar Link' },
        { name: 'booking_text', type: 'text', label: 'Booking Button Text' }
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
          label: 'Client Reviews',
          fields: [
            { name: 'client_name', type: 'text', label: 'Client Name' },
            { name: 'client_image', type: 'file', label: 'Client Image' },
            { name: 'review', type: 'textarea', label: 'Review Text' },
            { name: 'rating', type: 'number', label: 'Rating (1-5)' },
            { name: 'project_type', type: 'text', label: 'Project Type' }
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
        { name: 'play_store_url', type: 'url', label: 'Play Store URL' },
        { name: 'app_description', type: 'textarea', label: 'App Description' }
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
      key: 'copyright',
      name: 'Copyright',
      fields: [
        { name: 'text', type: 'text', label: 'Copyright Text' }
      ],
      required: false
    }
  ],
  colorPresets: [
    { name: 'Monochrome', primary: '#000000', secondary: '#333333', accent: '#FFFFFF', background: '#FFFFFF', text: '#000000' },
    { name: 'Vintage Sepia', primary: '#704214', secondary: '#A67951', accent: '#F2E2C6', background: '#FDF8F0', text: '#3A2921' },
    { name: 'Dark Contrast', primary: '#1A1A1A', secondary: '#333333', accent: '#F5F5F5', background: '#0A0A0A', text: '#FFFFFF' },
    { name: 'Minimal White', primary: '#CCCCCC', secondary: '#EEEEEE', accent: '#F8F8F8', background: '#FFFFFF', text: '#333333' },
    { name: 'Film Blue', primary: '#2C3E50', secondary: '#34495E', accent: '#ECF0F1', background: '#FFFFFF', text: '#2C3E50' },
    { name: 'Warm Portrait', primary: '#D35400', secondary: '#E67E22', accent: '#FEF5E7', background: '#FFFFFF', text: '#333333' },
    { name: 'Nature Green', primary: '#27AE60', secondary: '#2ECC71', accent: '#E9F7EF', background: '#FFFFFF', text: '#333333' },
    { name: 'Studio Gray', primary: '#7F8C8D', secondary: '#95A5A6', accent: '#ECEFF1', background: '#FFFFFF', text: '#2C3E50' }
  ],
  fontOptions: [
    { name: 'Playfair Display', value: 'Playfair Display, serif', weight: '400,500,600,700' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif', weight: '300,400,500,600,700' },
    { name: 'Futura', value: 'Futura, sans-serif', weight: '400,500,600' },
    { name: 'Helvetica Neue', value: 'Helvetica Neue, Helvetica, Arial, sans-serif', weight: '300,400,500,700' },
    { name: 'Cormorant Garamond', value: 'Cormorant Garamond, serif', weight: '300,400,500,600,700' }
  ],
  defaultColors: {
    primary: '#000000',
    secondary: '#333333',
    accent: '#FFFFFF',
    background: '#FFFFFF',
    text: '#000000',
    cardBg: '#F9F9F9',
    borderColor: '#EEEEEE',
    buttonText: '#FFFFFF',
    overlayColor: 'rgba(0,0,0,0.7)'
  },
  defaultFont: 'Playfair Display, serif',
  themeStyle: {
    layout: 'photography-layout',
    headerStyle: 'fullscreen',
    cardStyle: 'minimal',
    buttonStyle: 'minimal',
    iconStyle: 'simple',
    spacing: 'airy',
    shadows: 'subtle',
    animations: 'fade',
    imageStyle: 'bordered',
    overlayEffects: true
  },
  defaultData: {
    header: {
      name: 'Alex Morgan',
      title: 'Professional Photographer',
      tagline: 'Capturing moments that last forever',
      cta_button_text: 'Get in Touch',
      profile_image: '',
      background_image: ''
    },
    about: {
      description: 'With over 10 years of experience in photography, I specialize in capturing authentic moments with an artistic eye. My work has been featured in various publications and exhibitions around the country.',
      experience: '10',
      specialties: 'Portrait, Wedding, Commercial, Fine Art, Event Photography'
    },
    portfolio: {
      gallery: [
        { title: 'Summer Wedding', category: 'wedding', image: '', description: 'Elegant summer wedding at Lakeside Gardens' },
        { title: 'Urban Portrait', category: 'portrait', image: '', description: 'Creative portrait session in downtown area' },
        { title: 'Mountain Landscape', category: 'landscape', image: '', description: 'Sunrise at Blue Ridge Mountains' },
        { title: 'Corporate Event', category: 'event', image: '', description: 'Annual tech conference photography' }
      ]
    },
    services: {
      service_list: [
        { title: 'Wedding Photography', description: 'Full-day coverage of your special day with edited digital images and prints', price: 'From $2,500', duration: '8-10 hours', icon: 'wedding' },
        { title: 'Portrait Session', description: 'Professional portrait photography for individuals, couples or families', price: 'From $350', duration: '1-2 hours', icon: 'portrait' },
        { title: 'Commercial Photography', description: 'High-quality images for your business, products or services', price: 'From $800', duration: 'Custom', icon: 'camera' },
        { title: 'Event Coverage', description: 'Professional photography for corporate events, parties and special occasions', price: 'From $600', duration: 'Variable', icon: 'event' }
      ]
    },
    contact: {
      email: 'alex@morganphotography.com',
      phone: '+1 (555) 123-4567',
      website: 'https://morganphotography.com',
      location: 'Studio 42, 123 Creative Ave, New York, NY'
    },
    social: {
      social_links: [
        { platform: 'instagram', url: 'https://instagram.com/alexmorganphoto', username: '@alexmorganphoto' },
        { platform: 'facebook', url: 'https://facebook.com/alexmorganphotography', username: 'Alex Morgan Photography' },
        { platform: 'pinterest', url: 'https://pinterest.com/alexmorganphoto', username: 'alexmorganphoto' },
        { platform: 'behance', url: 'https://behance.net/alexmorgan', username: 'Alex Morgan' },
        { platform: 'youtube', url: 'https://youtube.com/alexmorganphoto', username: 'Alex Morgan Photography' }
      ]
    },
    videos: {
      video_list: [
        { title: 'Behind the Scenes - Wedding Photography', description: 'See how I capture the perfect wedding moments throughout the day', video_type: 'behind_scenes', embed_url: '', thumbnail: '', duration: '8:30' },
        { title: 'Portrait Lighting Tutorial', description: 'Learn professional portrait lighting techniques for stunning results', video_type: 'tutorial', embed_url: '', thumbnail: '', duration: '12:45' },
        { title: 'Sarah & James Wedding Highlight', description: 'Beautiful wedding highlight reel from Lakeside Gardens', video_type: 'wedding_highlight', embed_url: '', thumbnail: '', duration: '3:20' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/alexmorganphoto',
      channel_name: 'Alex Morgan Photography',
      subscriber_count: '78.4K',
      featured_playlist: 'https://youtube.com/playlist?list=PLphotographytutorials',
      latest_video_embed: '',
      channel_description: 'Photography tutorials, behind-the-scenes content, and wedding highlights from a professional photographer. Subscribe for weekly photography tips!'
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '10:00', close_time: '18:00', is_closed: false },
        { day: 'tuesday', open_time: '10:00', close_time: '18:00', is_closed: false },
        { day: 'wednesday', open_time: '10:00', close_time: '18:00', is_closed: false },
        { day: 'thursday', open_time: '10:00', close_time: '18:00', is_closed: false },
        { day: 'friday', open_time: '10:00', close_time: '17:00', is_closed: false },
        { day: 'saturday', open_time: '11:00', close_time: '16:00', is_closed: false },
        { day: 'sunday', open_time: '', close_time: '', is_closed: true }
      ]
    },
    appointments: {
      booking_url: 'https://calendly.com/alexmorgan',
      calendar_link: 'https://calendar.google.com/alexmorgan',
      booking_text: 'Schedule a Consultation'
    },
    testimonials: {
      reviews: [
        { client_name: 'Sarah & James', client_image: '', review: 'Alex captured our wedding day perfectly. The photos are absolutely stunning and really tell the story of our special day. Highly recommended!', rating: '5', project_type: 'Wedding' },
        { client_name: 'Corporate Solutions Inc.', client_image: '', review: 'Professional, creative and efficient. Alex delivered exceptional photos for our corporate branding that perfectly captured our company culture.', rating: '5', project_type: 'Commercial' },
        { client_name: 'Emma T.', client_image: '', review: 'The family portrait session was a wonderful experience. Alex made everyone feel comfortable and the results were beautiful.', rating: '5', project_type: 'Portrait' }
      ]
    },
    google_map: {
      map_embed_url: '',
      directions_url: 'https://maps.google.com/directions'
    },
    app_download: {
      app_store_url: '#',
      play_store_url: '#',
      app_description: 'Download our mobile app to view your photo galleries, book sessions, and stay updated with our latest work.'
    },
    contact_form: {
      form_title: 'Get in Touch',
      form_description: 'Interested in working together? Fill out the form below with details about your project, and I\'ll get back to you to discuss how we can create something beautiful together.'
    },
    thank_you: {
      message: 'Thank you for your interest in my photography services. I\'ll review your message and get back to you within 24-48 hours to discuss your project in detail.'
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
      html_content: '<div style="text-align: center; padding: 20px;"><h3>Photography Awards & Recognition</h3><ul style="list-style: none; padding: 0;"><li>🏆 Best Wedding Photographer 2024 - Metro City Awards</li><li>📸 Featured in Photography Magazine</li><li>🏖️ International Photography Contest Winner</li><li>⭐ 5-Star Rating on WeddingWire</li></ul></div>',
      section_title: 'Awards & Recognition',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Share My Photography Portfolio',
      qr_description: 'Scan the QR code to easily share my portfolio with friends and family, or to quickly access my contact information and booking details.'
    },
    language: {
      template_language: 'en'
    },
    copyright: {
      text: '© 2025 Alex Morgan Photography. All rights reserved.'
    }
  }
};