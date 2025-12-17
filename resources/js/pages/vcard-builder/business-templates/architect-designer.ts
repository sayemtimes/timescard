import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const architectDesignerTemplate = {
  name: 'Architect & Interior Designer',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Designer Name' },
        { name: 'title', type: 'text', label: 'Professional Title' },
        { name: 'tagline', type: 'textarea', label: 'Design Philosophy' },
        { name: 'profile_image', type: 'file', label: 'Professional Photo' }
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
        { name: 'description', type: 'textarea', label: 'Design Journey' },
        { name: 'specialties', type: 'tags', label: 'Design Specialties' },
        { name: 'experience', type: 'number', label: 'Years of Experience' },
        { name: 'education', type: 'textarea', label: 'Education & Credentials' }
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
            { name: 'category', type: 'select', label: 'Category', options: [
              { value: 'architecture', label: 'Architecture' },
              { value: 'interior', label: 'Interior Design' },
              { value: 'landscape', label: 'Landscape Design' },
              { value: 'consultation', label: 'Design Consultation' },
              { value: 'renovation', label: 'Renovation' }
            ]},
            { name: 'price_range', type: 'text', label: 'Price Range' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'portfolio',
      name: 'Portfolio',
      fields: [
        {
          name: 'projects',
          type: 'repeater',
          label: 'Featured Projects',
          fields: [
            { name: 'title', type: 'text', label: 'Project Title' },
            { name: 'type', type: 'select', label: 'Project Type', options: [
              { value: 'residential', label: 'Residential' },
              { value: 'commercial', label: 'Commercial' },
              { value: 'hospitality', label: 'Hospitality' },
              { value: 'office', label: 'Office Space' },
              { value: 'retail', label: 'Retail' },
              { value: 'institutional', label: 'Institutional' }
            ]},
            { name: 'image', type: 'file', label: 'Project Image' },
            { name: 'description', type: 'textarea', label: 'Project Description' },
            { name: 'year', type: 'text', label: 'Year Completed' },
            { name: 'size', type: 'text', label: 'Project Size' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'videos',
      name: 'Project Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Design Process Videos',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'project_walkthrough', label: 'Project Walkthrough' },
              { value: 'design_process', label: 'Design Process' },
              { value: 'client_testimonial', label: 'Client Testimonial' },
              { value: 'before_after', label: 'Before & After' },
              { value: 'design_tips', label: 'Design Tips' }
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
      key: 'design_process',
      name: 'Design Process',
      fields: [
        {
          name: 'process_steps',
          type: 'repeater',
          label: 'Design Process Steps',
          fields: [
            { name: 'step_number', type: 'number', label: 'Step Number' },
            { name: 'step_title', type: 'text', label: 'Step Title' },
            { name: 'step_description', type: 'textarea', label: 'Step Description' },
            { name: 'duration', type: 'text', label: 'Typical Duration' }
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
          label: 'Design Platforms',
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
        { name: 'booking_url', type: 'url', label: 'Consultation Booking URL' },
        { name: 'calendar_link', type: 'url', label: 'Calendar Link' },
        { name: 'consultation_info', type: 'textarea', label: 'Consultation Information' }
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
            { name: 'project_type', type: 'text', label: 'Project Type' },
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
      key: 'contact_form',
      name: 'Contact Form',
      fields: [
        { name: 'form_title', type: 'text', label: 'Form Title' },
        { name: 'form_description', type: 'textarea', label: 'Form Description' }
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
    },    
     {
      key: 'copyright',
      name: 'Copyright',
      fields: [
        { name: 'text', type: 'text', label: 'Copyright Text' }
      ],
      required: false
    },
    {
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
  ],
  colorPresets: [
    { name: 'Modern Minimalist', primary: '#2C3E50', secondary: '#34495E', accent: '#E74C3C', background: '#FFFFFF', text: '#2C3E50', cardBg: '#F8F9FA' },
    { name: 'Warm Neutral', primary: '#8B7355', secondary: '#A0937D', accent: '#D4AF37', background: '#FAF9F6', text: '#5D4E37', cardBg: '#FFFFFF' },
    { name: 'Contemporary Blue', primary: '#1E3A8A', secondary: '#3B82F6', accent: '#F59E0B', background: '#F8FAFC', text: '#1E293B', cardBg: '#FFFFFF' },
    { name: 'Elegant Gray', primary: '#4B5563', secondary: '#6B7280', accent: '#10B981', background: '#F9FAFB', text: '#374151', cardBg: '#FFFFFF' },
    { name: 'Sophisticated Black', primary: '#111827', secondary: '#374151', accent: '#F59E0B', background: '#F3F4F6', text: '#111827', cardBg: '#FFFFFF' }
  ],
  fontOptions: [
    { name: 'Playfair Display', value: 'Playfair Display, Georgia, serif', weight: '400,500,600,700' },
    { name: 'Montserrat', value: 'Montserrat, -apple-system, BlinkMacSystemFont, sans-serif', weight: '300,400,500,600,700' },
    { name: 'Lato', value: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif', weight: '300,400,700' },
    { name: 'Open Sans', value: 'Open Sans, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,600,700' },
    { name: 'Roboto', value: 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif', weight: '300,400,500,700' }
  ],
  defaultColors: {
    primary: '#2C3E50',
    secondary: '#34495E',
    accent: '#E74C3C',
    background: '#FFFFFF',
    text: '#2C3E50',
    cardBg: '#F8F9FA',
    borderColor: '#E5E7EB',
    shadowColor: 'rgba(44, 62, 80, 0.1)'
  },
  defaultFont: 'Playfair Display, Georgia, serif',
  themeStyle: {
    layout: 'architectural-grid',
    headerStyle: 'design-showcase',
    cardStyle: 'blueprint-cards',
    buttonStyle: 'architectural-buttons',
    iconStyle: 'design-icons',
    spacing: 'golden-ratio',
    shadows: 'architectural-depth',
    animations: 'blueprint-reveal',
    backgroundPattern: 'grid-lines',
    typography: 'design-serif'
  },
  defaultData: {
    header: {
      name: 'Alexandra Chen',
      title: 'Principal Architect & Interior Designer',
      tagline: 'Creating spaces that inspire, function beautifully, and reflect the unique story of each client through thoughtful design and architectural excellence',
      profile_image: ''
    },
    contact: {
      email: 'hello@alexandrachen.design',
      phone: '+1 (555) 901-2345',
      website: 'https://alexandrachen.design',
      location: 'San Francisco, CA'
    },
    about: {
      description: 'Award-winning architect and interior designer with 14+ years of experience creating innovative residential and commercial spaces. Passionate about sustainable design, modern aesthetics, and spaces that enhance human experience.',
      specialties: 'Residential Architecture, Interior Design, Sustainable Design, Space Planning, Renovation',
      experience: '14',
      education: 'Master of Architecture from UC Berkeley, LEED Certified Professional, AIA Member'
    },
    services: {
      service_list: [
        { title: 'Architectural Design', description: 'Complete architectural services from concept to construction documentation', category: 'architecture', price_range: '$15,000 - $75,000' },
        { title: 'Interior Design', description: 'Full-service interior design including space planning, furniture, and styling', category: 'interior', price_range: '$8,000 - $50,000' },
        { title: 'Design Consultation', description: 'Expert design advice and project guidance for DIY projects', category: 'consultation', price_range: '$200 - $500/hour' },
        { title: 'Home Renovation', description: 'Complete renovation services from planning to project management', category: 'renovation', price_range: '$25,000 - $200,000' }
      ]
    },
    portfolio: {
      projects: [
        { title: 'Modern Hillside Residence', type: 'residential', image: '', description: 'Contemporary 3,500 sq ft home with panoramic city views and sustainable features', year: '2023', size: '3,500 sq ft' },
        { title: 'Downtown Loft Renovation', type: 'residential', image: '', description: 'Industrial loft transformation with open concept living and custom millwork', year: '2023', size: '2,200 sq ft' },
        { title: 'Boutique Hotel Lobby', type: 'hospitality', image: '', description: 'Luxury hotel lobby design featuring local materials and biophilic elements', year: '2022', size: '1,800 sq ft' }
      ]
    },
    design_process: {
      process_steps: [
        { step_number: 1, step_title: 'Discovery & Programming', step_description: 'Understanding your needs, lifestyle, and design preferences through detailed consultation', duration: '1-2 weeks' },
        { step_number: 2, step_title: 'Concept Development', step_description: 'Creating initial design concepts, mood boards, and spatial layouts', duration: '2-3 weeks' },
        { step_number: 3, step_title: 'Design Development', step_description: 'Refining designs, selecting materials, and developing detailed drawings', duration: '3-4 weeks' },
        { step_number: 4, step_title: 'Construction Documentation', step_description: 'Preparing detailed construction drawings and specifications', duration: '2-3 weeks' },
        { step_number: 5, step_title: 'Implementation', step_description: 'Project management and oversight during construction phase', duration: 'Variable' }
      ]
    },
    social: {
      social_links: [
        { platform: 'instagram', url: 'https://instagram.com/alexandrachen.design', username: '@alexandrachen.design' },
        { platform: 'pinterest', url: 'https://pinterest.com/alexandrachendesign', username: 'Alexandra Chen Design' },
        { platform: 'behance', url: 'https://behance.net/alexandrachen', username: 'Alexandra Chen' },
        { platform: 'youtube', url: 'https://youtube.com/alexandrachendesign', username: 'Alexandra Chen Design' }
      ]
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '09:00', close_time: '18:00', is_closed: false },
        { day: 'tuesday', open_time: '09:00', close_time: '18:00', is_closed: false },
        { day: 'wednesday', open_time: '09:00', close_time: '18:00', is_closed: false },
        { day: 'thursday', open_time: '09:00', close_time: '18:00', is_closed: false },
        { day: 'friday', open_time: '09:00', close_time: '17:00', is_closed: false },
        { day: 'saturday', open_time: '10:00', close_time: '15:00', is_closed: false },
        { day: 'sunday', open_time: '', close_time: '', is_closed: true }
      ]
    },
    appointments: {
      booking_url: 'https://calendly.com/alexandrachen',
      calendar_link: 'https://calendar.google.com/alexandrachen',
      consultation_info: 'Initial consultations are complimentary for projects over $10,000. Please bring inspiration images and project requirements.'
    },
    testimonials: {
      reviews: [
        { client_name: 'Jennifer Walsh', project_type: 'Residential Renovation', review: 'Alexandra transformed our dated home into a modern masterpiece. Her attention to detail and design vision exceeded our expectations. Highly recommend!', rating: '5' },
        { client_name: 'David Martinez', project_type: 'Commercial Office', review: 'Working with Alexandra on our office design was incredible. She created a space that\'s both functional and inspiring for our team.', rating: '5' }
      ]
    },
    videos: {
      video_list: [
        { title: 'Modern Hillside Residence - Design Walkthrough', description: 'Take a virtual tour through our award-winning hillside residence project', video_type: 'project_walkthrough', embed_url: '', thumbnail: '', duration: '8:45' },
        { title: 'My Design Process - From Concept to Reality', description: 'Behind-the-scenes look at how I approach each design project', video_type: 'design_process', embed_url: '', thumbnail: '', duration: '12:30' },
        { title: 'Client Success Story - Downtown Loft Transformation', description: 'Hear from satisfied clients about their renovation experience', video_type: 'client_testimonial', embed_url: '', thumbnail: '', duration: '6:15' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/alexandrachendesign',
      channel_name: 'Alexandra Chen Design',
      subscriber_count: '45.2K',
      featured_playlist: 'https://youtube.com/playlist?list=PLdesignprocess',
      latest_video_embed: '',
      channel_description: 'Weekly design inspiration, project walkthroughs, and architectural insights for design enthusiasts and professionals.'
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
      form_title: 'Let\'s Design Something Beautiful',
      form_description: 'Ready to transform your space? Share your vision and let\'s create something extraordinary together. Every great design starts with a conversation.'
    },
    thank_you: {
      message: 'Thank you for your interest in working together! I\'ll review your project details and respond within 24 hours to discuss how we can bring your vision to life.'
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
      html_content: '<div class="featured-work"><h4>Award-Winning Projects</h4><p>Recognized by Architectural Digest and Interior Design Magazine for innovative residential and commercial spaces.</p></div>',
      section_title: 'Featured Recognition',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Connect with My Design Studio',
      qr_description: 'Scan to save my contact information and explore my latest projects.',
      qr_size: 'medium'
    },

    language: {
      template_language: 'en'
    },
    copyright: {
      text: '© 2025 Alexandra Chen Design Studio. All rights reserved.'
    }
  }
};