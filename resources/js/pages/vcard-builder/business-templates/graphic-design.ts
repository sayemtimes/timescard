import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const graphicDesignTemplate = {
  name: 'Graphic Design Studio',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Designer Name' },
        { name: 'title', type: 'text', label: 'Creative Title' },
        { name: 'tagline', type: 'textarea', label: 'Creative Tagline' },
        { name: 'profile_image', type: 'file', label: 'Profile Photo' }
      ],
      required: true
    },
    {
      key: 'contact',
      name: 'Contact Information',
      fields: [
        { name: 'email', type: 'email', label: 'Email Address' },
        { name: 'phone', type: 'tel', label: 'Phone Number' },
        { name: 'website', type: 'url', label: 'Portfolio Website' },
        { name: 'location', type: 'text', label: 'Studio Location' }
      ],
      required: true
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'Creative Bio' },
        { name: 'specialties', type: 'tags', label: 'Design Specialties' },
        { name: 'experience', type: 'number', label: 'Years of Experience' },
        { name: 'design_philosophy', type: 'textarea', label: 'Design Philosophy' }
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
          label: 'Design Services',
          fields: [
            { name: 'title', type: 'text', label: 'Service Name' },
            { name: 'description', type: 'textarea', label: 'Service Description' },
            { name: 'icon', type: 'text', label: 'Service Icon' },
            { name: 'price', type: 'text', label: 'Starting Price' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'videos',
      name: 'Design Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Creative Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'design_process', label: 'Design Process' },
              { value: 'project_showcase', label: 'Project Showcase' },
              { value: 'tutorial', label: 'Design Tutorial' },
              { value: 'client_testimonial', label: 'Client Testimonial' },
              { value: 'behind_scenes', label: 'Behind the Scenes' },
              { value: 'speed_design', label: 'Speed Design' }
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
      key: 'portfolio',
      name: 'Portfolio Gallery',
      fields: [
        {
          name: 'projects',
          type: 'repeater',
          label: 'Design Projects',
          fields: [
            { name: 'title', type: 'text', label: 'Project Title' },
            { name: 'category', type: 'select', label: 'Category', options: [
              { value: 'branding', label: 'Branding' },
              { value: 'web-design', label: 'Web Design' },
              { value: 'print', label: 'Print Design' },
              { value: 'packaging', label: 'Packaging' },
              { value: 'illustration', label: 'Illustration' },
              { value: 'logo', label: 'Logo Design' }
            ]},
            { name: 'image', type: 'file', label: 'Project Image' },
            { name: 'description', type: 'textarea', label: 'Project Description' }
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
          label: 'Creative Platforms',
          fields: [
            { name: 'platform', type: 'select', label: 'Platform', options: socialPlatformsConfig.map(p => ({ value: p.value, label: p.label })) },
            { name: 'url', type: 'url', label: 'Profile URL' },
            { name: 'username', type: 'text', label: 'Username' }
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
        { name: 'booking_url', type: 'url', label: 'Project Consultation URL' },
        { name: 'calendar_link', type: 'url', label: 'Calendar Link' },
        { name: 'consultation_note', type: 'textarea', label: 'Consultation Note' }
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
            { name: 'client_company', type: 'text', label: 'Client Company' },
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
    { name: 'Creative Rainbow', primary: '#FF6B6B', secondary: '#4ECDC4', accent: '#45B7D1', background: '#FFFFFF', text: '#2C3E50', cardBg: '#F8F9FA' },
    { name: 'Neon Pop', primary: '#FF0080', secondary: '#00FF80', accent: '#8000FF', background: '#000000', text: '#FFFFFF', cardBg: '#1A1A1A' },
    { name: 'Sunset Gradient', primary: '#FF6B35', secondary: '#F7931E', accent: '#FFD23F', background: '#FFF8F0', text: '#2D1B69', cardBg: '#FFFFFF' },
    { name: 'Ocean Breeze', primary: '#0077BE', secondary: '#00A8CC', accent: '#7FDBDA', background: '#F0F8FF', text: '#003366', cardBg: '#FFFFFF' },
    { name: 'Forest Magic', primary: '#2ECC71', secondary: '#27AE60', accent: '#F39C12', background: '#F8FFF8', text: '#1B4332', cardBg: '#FFFFFF' }
  ],
  fontOptions: [
    { name: 'Poppins', value: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif', weight: '300,400,500,600,700' },
    { name: 'Montserrat', value: 'Montserrat, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'Nunito', value: 'Nunito, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,600,700,800' },
    { name: 'Raleway', value: 'Raleway, -apple-system, BlinkMacSystemFont, sans-serif', weight: '300,400,500,600,700' },
    { name: 'Quicksand', value: 'Quicksand, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' }
  ],
  defaultColors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    accent: '#45B7D1',
    background: '#FFFFFF',
    text: '#2C3E50',
    cardBg: '#F8F9FA',
    borderColor: '#E9ECEF',
    shadowColor: 'rgba(255, 107, 107, 0.2)'
  },
  defaultFont: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif',
  themeStyle: {
    layout: 'creative-masonry',
    headerStyle: 'artistic-hero',
    cardStyle: 'floating-cards',
    buttonStyle: 'gradient-rounded',
    iconStyle: 'colorful',
    spacing: 'dynamic',
    shadows: 'colorful',
    animations: 'bounce',
    backgroundPattern: 'geometric-shapes',
    typography: 'creative-mix'
  },
  defaultData: {
    header: {
      name: 'Alex Rivera',
      title: 'Creative Director & Graphic Designer',
      tagline: 'Transforming ideas into visual masterpieces that captivate and inspire',
      profile_image: ''
    },
    contact: {
      email: 'hello@alexrivera.design',
      phone: '+1 (555) 234-5678',
      website: 'https://alexrivera.design',
      location: 'Los Angeles, CA'
    },
    about: {
      description: 'Passionate graphic designer with 8+ years of experience creating compelling visual identities, stunning web designs, and memorable brand experiences for clients worldwide.',
      specialties: 'Brand Identity, Logo Design, Web Design, Print Design, Packaging, Illustration',
      experience: '8',
      design_philosophy: 'Great design is not just about making things look beautiful—it\'s about solving problems and creating emotional connections.'
    },
    services: {
      service_list: [
        { title: 'Brand Identity Design', description: 'Complete brand identity packages including logos, color palettes, and brand guidelines', icon: '🎨', price: 'From $2,500' },
        { title: 'Web Design', description: 'Modern, responsive website designs that convert visitors into customers', icon: '💻', price: 'From $3,000' },
        { title: 'Print Design', description: 'Brochures, flyers, business cards, and marketing materials', icon: '📄', price: 'From $500' },
        { title: 'Packaging Design', description: 'Eye-catching product packaging that stands out on shelves', icon: '📦', price: 'From $1,500' }
      ]
    },
    portfolio: {
      projects: [
        { title: 'Eco Coffee Brand', category: 'branding', image: '', description: 'Complete brand identity for sustainable coffee company' },
        { title: 'Tech Startup Website', category: 'web-design', image: '', description: 'Modern SaaS platform landing page design' },
        { title: 'Artisan Soap Packaging', category: 'packaging', image: '', description: 'Luxury packaging design for handmade soaps' }
      ]
    },
    social: {
      social_links: [
        { platform: 'behance', url: 'https://behance.net/alexrivera', username: 'alexrivera' },
        { platform: 'dribbble', url: 'https://dribbble.com/alexrivera', username: 'alexrivera' },
        { platform: 'instagram', url: 'https://instagram.com/alexrivera.design', username: '@alexrivera.design' },
        { platform: 'youtube', url: 'https://youtube.com/alexriveradesign', username: 'Alex Rivera Design' }
      ]
    },
    videos: {
      video_list: [
        { title: 'Logo Design Process - From Concept to Final', description: 'Watch the complete process of creating a brand identity from initial sketches to final logo', video_type: 'design_process', embed_url: '', thumbnail: '', duration: '15:30' },
        { title: 'Eco Coffee Brand - Project Showcase', description: 'Complete brand identity project walkthrough for sustainable coffee company', video_type: 'project_showcase', embed_url: '', thumbnail: '', duration: '8:45' },
        { title: 'Adobe Illustrator Logo Tutorial', description: 'Step-by-step tutorial on creating professional logos in Illustrator', video_type: 'tutorial', embed_url: '', thumbnail: '', duration: '22:15' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/alexriveradesign',
      channel_name: 'Alex Rivera Design',
      subscriber_count: '67.2K',
      featured_playlist: 'https://youtube.com/playlist?list=PLdesigntutorials',
      latest_video_embed: '',
      channel_description: 'Design tutorials, project showcases, and creative inspiration from a professional graphic designer. Subscribe for weekly design content!'
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '09:00', close_time: '18:00', is_closed: false },
        { day: 'tuesday', open_time: '09:00', close_time: '18:00', is_closed: false },
        { day: 'wednesday', open_time: '09:00', close_time: '18:00', is_closed: false },
        { day: 'thursday', open_time: '09:00', close_time: '18:00', is_closed: false },
        { day: 'friday', open_time: '09:00', close_time: '17:00', is_closed: false },
        { day: 'saturday', open_time: '10:00', close_time: '14:00', is_closed: false },
        { day: 'sunday', open_time: '', close_time: '', is_closed: true }
      ]
    },
    appointments: {
      booking_url: 'https://calendly.com/alexrivera',
      calendar_link: 'https://calendar.google.com/alexrivera',
      consultation_note: 'Free 30-minute creative consultation to discuss your project needs'
    },
    testimonials: {
      reviews: [
        { client_name: 'Sarah Chen', client_company: 'Bloom Botanicals', review: 'Alex created an absolutely stunning brand identity for our plant-based skincare line. The designs perfectly captured our eco-friendly values!', rating: '5', project_type: 'Brand Identity' },
        { client_name: 'Marcus Johnson', client_company: 'TechFlow Solutions', review: 'Our new website design has increased conversions by 40%. Alex\'s creative vision and attention to detail are unmatched.', rating: '5', project_type: 'Web Design' }
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
      form_title: 'Let\'s Create Something Amazing',
      form_description: 'Ready to bring your vision to life? Share your project details and let\'s start creating something extraordinary together.'
    },
    thank_you: {
      message: 'Thank you for reaching out! I\'ll review your project details and get back to you within 24 hours with ideas and next steps.'
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
      html_content: '<div class="design-awards"><h4>Recent Awards</h4><p>🏆 Best Brand Identity - Design Awards 2024</p><p>🎨 Creative Excellence - Graphic Design USA</p><p>✨ Innovation in Design - Creative Review</p></div>',
      section_title: 'Awards & Recognition',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Connect & Collaborate',
      qr_description: 'Scan to save my contact and explore my creative portfolio instantly!',
      qr_size: 'medium'
    },
    language: {
      template_language: 'en'
    },
    copyright: {
      text: '© 2025 Alex Rivera Design Studio. All rights reserved.'
    }
  }
};