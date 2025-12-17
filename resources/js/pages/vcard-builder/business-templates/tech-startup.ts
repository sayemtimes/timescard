import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const techStartupTemplate = {
  name: 'Tech Startup',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Company Name' },
        { name: 'tagline', type: 'textarea', label: 'Tagline' },
        { name: 'logo', type: 'file', label: 'Logo' },
        { name: 'cover_image', type: 'file', label: 'Cover Image' },
        { name: 'cta_text', type: 'text', label: 'Call to Action Text' },
        { name: 'cta_url', type: 'url', label: 'Call to Action URL' }
      ],
      required: true
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'About Us' },
        { name: 'year_founded', type: 'number', label: 'Year Founded' },
        { name: 'company_size', type: 'select', label: 'Company Size', options: [
          { value: 'startup', label: 'Startup (1-10)' },
          { value: 'small', label: 'Small (11-50)' },
          { value: 'medium', label: 'Medium (51-200)' },
          { value: 'large', label: 'Large (201-500)' },
          { value: 'enterprise', label: 'Enterprise (500+)' }
        ]}
      ],
      required: false
    },
    {
      key: 'services',
      name: 'Services',
      fields: [
        {
          name: 'offerings',
          type: 'repeater',
          label: 'Products/Services',
          fields: [
            { name: 'name', type: 'text', label: 'Service Name' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'icon', type: 'select', label: 'Icon', options: [
              { value: 'code', label: 'Code' },
              { value: 'cloud', label: 'Cloud' },
              { value: 'database', label: 'Database' },
              { value: 'mobile', label: 'Mobile' },
              { value: 'desktop', label: 'Desktop' },
              { value: 'security', label: 'Security' },
              { value: 'analytics', label: 'Analytics' },
              { value: 'ai', label: 'AI/ML' }
            ]},
            { name: 'image', type: 'file', label: 'Service Image' },
            { name: 'link', type: 'url', label: 'Learn More URL' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'features',
      name: 'Key Features',
      fields: [
        {
          name: 'feature_list',
          type: 'repeater',
          label: 'Features',
          fields: [
            { name: 'title', type: 'text', label: 'Feature Title' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'icon', type: 'select', label: 'Icon', options: [
              { value: 'zap', label: 'Speed' },
              { value: 'shield', label: 'Security' },
              { value: 'settings', label: 'Customization' },
              { value: 'users', label: 'Collaboration' },
              { value: 'trending-up', label: 'Analytics' },
              { value: 'smartphone', label: 'Mobile' },
              { value: 'globe', label: 'Global' },
              { value: 'clock', label: 'Time-saving' }
            ]},
            { name: 'image', type: 'file', label: 'Feature Image' }
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
        { name: 'address', type: 'text', label: 'Address' }
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
            { name: 'is_closed', type: 'checkbox', label: 'Closed' },
            { name: 'is_remote', type: 'checkbox', label: 'Remote Work Day' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'videos',
      name: 'Company Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Tech Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'product_demo', label: 'Product Demo' },
              { value: 'company_intro', label: 'Company Introduction' },
              { value: 'tech_tutorial', label: 'Tech Tutorial' },
              { value: 'client_testimonial', label: 'Client Testimonial' },
              { value: 'behind_scenes', label: 'Behind the Scenes' },
              { value: 'webinar', label: 'Webinar/Presentation' }
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
      key: 'gallery',
      name: 'Photo Gallery',
      fields: [
        {
          name: 'photos',
          type: 'repeater',
          label: 'Photos',
          fields: [
            { name: 'image', type: 'file', label: 'Image' },
            { name: 'caption', type: 'text', label: 'Caption' }
          ]
        }
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
            { name: 'company', type: 'text', label: 'Company' },
            { name: 'position', type: 'text', label: 'Position' },
            { name: 'review', type: 'textarea', label: 'Review Text' },
            { name: 'rating', type: 'number', label: 'Rating (1-5)' },
            { name: 'client_image', type: 'file', label: 'Client Photo' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'appointments',
      name: 'Demo Request',
      fields: [
        { name: 'booking_url', type: 'url', label: 'Booking URL' },
        { name: 'booking_text', type: 'text', label: 'Booking Button Text' },
        { name: 'demo_length', type: 'text', label: 'Demo Length' },
        { name: 'demo_description', type: 'textarea', label: 'Demo Description' }
      ],
      required: false
    },
    {
      key: 'team',
      name: 'Our Team',
      fields: [
        {
          name: 'members',
          type: 'repeater',
          label: 'Team Members',
          fields: [
            { name: 'name', type: 'text', label: 'Name' },
            { name: 'title', type: 'text', label: 'Title/Position' },
            { name: 'bio', type: 'textarea', label: 'Bio' },
            { name: 'image', type: 'file', label: 'Photo' },
            { name: 'linkedin', type: 'url', label: 'LinkedIn URL' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'pricing',
      name: 'Pricing Plans',
      fields: [
        {
          name: 'plans',
          type: 'repeater',
          label: 'Pricing Plans',
          fields: [
            { name: 'name', type: 'text', label: 'Plan Name' },
            { name: 'price', type: 'text', label: 'Price' },
            { name: 'billing_period', type: 'select', label: 'Billing Period', options: [
              { value: 'monthly', label: 'Monthly' },
              { value: 'annually', label: 'Annually' },
              { value: 'one_time', label: 'One-time' },
              { value: 'custom', label: 'Custom' }
            ]},
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'features', type: 'textarea', label: 'Features (one per line)' },
            { name: 'cta_text', type: 'text', label: 'CTA Button Text' },
            { name: 'cta_url', type: 'url', label: 'CTA URL' },
            { name: 'is_popular', type: 'checkbox', label: 'Mark as Popular' }
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
        { name: 'app_description', type: 'textarea', label: 'App Description' },
        { name: 'app_features', type: 'textarea', label: 'App Features (one per line)' },
        { name: 'app_image', type: 'file', label: 'App Screenshot' }
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
    { name: 'Modern Blue', primary: '#2563EB', secondary: '#3B82F6', accent: '#EFF6FF', background: '#FFFFFF', text: '#1E293B' },
    { name: 'Tech Purple', primary: '#7C3AED', secondary: '#8B5CF6', accent: '#F5F3FF', background: '#FFFFFF', text: '#1E293B' },
    { name: 'Startup Green', primary: '#059669', secondary: '#10B981', accent: '#ECFDF5', background: '#FFFFFF', text: '#1E293B' },
    { name: 'Dark Mode', primary: '#6366F1', secondary: '#818CF8', accent: '#1E1E2E', background: '#0F0F1A', text: '#F1F5F9' },
    { name: 'Coral Tech', primary: '#F43F5E', secondary: '#FB7185', accent: '#FFF1F2', background: '#FFFFFF', text: '#1E293B' },
    { name: 'Teal Accent', primary: '#0D9488', secondary: '#14B8A6', accent: '#CCFBF1', background: '#FFFFFF', text: '#1E293B' }
  ],
  fontOptions: [
    { name: 'Inter', value: 'Inter, sans-serif', weight: '300,400,500,600,700,800' },
    { name: 'Poppins', value: 'Poppins, sans-serif', weight: '300,400,500,600,700,800' },
    { name: 'DM Sans', value: 'DM Sans, sans-serif', weight: '400,500,700' },
    { name: 'Roboto', value: 'Roboto, sans-serif', weight: '300,400,500,700,900' },
    { name: 'Outfit', value: 'Outfit, sans-serif', weight: '300,400,500,600,700,800' }
  ],
  defaultColors: {
    primary: '#2563EB',
    secondary: '#3B82F6',
    accent: '#EFF6FF',
    background: '#FFFFFF',
    text: '#1E293B',
    cardBg: '#F8FAFC',
    borderColor: '#E2E8F0',
    buttonText: '#FFFFFF',
    highlightColor: '#38BDF8'
  },
  defaultFont: 'Inter, sans-serif',
  themeStyle: {
    layout: 'tech-startup-layout',
    headerStyle: 'modern',
    cardStyle: 'shadow',
    buttonStyle: 'rounded',
    iconStyle: 'duotone',
    spacing: 'airy',
    shadows: 'soft',
    dividers: true
  },
  defaultData: {
    header: {
      name: 'NexaTech',
      tagline: 'Innovative solutions for the digital age',
      logo: '',
      cover_image: '',
      cta_text: 'Get Started',
      cta_url: '#contact_form'
    },
    about: {
      description: 'NexaTech is a forward-thinking technology company specializing in cloud solutions, AI integration, and custom software development. Founded with a mission to make cutting-edge technology accessible to businesses of all sizes, we\'ve helped hundreds of clients transform their digital presence and operational efficiency.',
      year_founded: '2018',
      company_size: 'small'
    },
    services: {
      offerings: [
        { name: 'Cloud Solutions', description: 'Scalable cloud infrastructure and migration services to optimize your business operations.', icon: 'cloud', image: '', link: '#' },
        { name: 'Custom Software', description: 'Tailored software solutions designed to address your unique business challenges.', icon: 'code', image: '', link: '#' },
        { name: 'AI Integration', description: 'Implement artificial intelligence to automate processes and gain valuable insights.', icon: 'ai', image: '', link: '#' },
        { name: 'Data Analytics', description: 'Transform your raw data into actionable business intelligence.', icon: 'analytics', image: '', link: '#' }
      ]
    },
    features: {
      feature_list: [
        { title: 'Lightning Fast', description: 'Our optimized solutions ensure maximum performance and minimal latency.', icon: 'zap', image: '' },
        { title: 'Enterprise Security', description: 'Bank-level encryption and security protocols to keep your data safe.', icon: 'shield', image: '' },
        { title: 'Fully Customizable', description: 'Flexible architecture that adapts to your specific business requirements.', icon: 'settings', image: '' },
        { title: 'Seamless Integration', description: 'Works with your existing tools and platforms for a smooth transition.', icon: 'users', image: '' }
      ]
    },
    contact: {
      email: 'info@nexatech.com',
      phone: '(555) 123-4567',
      website: 'https://www.nexatech.com',
      address: '123 Tech Park, San Francisco, CA 94107'
    },
    social: {
      social_links: [
        { platform: 'twitter', url: 'https://twitter.com/nexatech', username: '@nexatech' },
        { platform: 'linkedin', url: 'https://linkedin.com/company/nexatech', username: 'NexaTech' },
        { platform: 'github', url: 'https://github.com/nexatech', username: 'nexatech' },
        { platform: 'youtube', url: 'https://youtube.com/nexatech', username: 'NexaTech' }
      ]
    },
    videos: {
      video_list: [
        { title: 'NexaTech Platform Demo - Complete Walkthrough', description: 'See our cloud platform in action with a comprehensive product demonstration', video_type: 'product_demo', embed_url: '', thumbnail: '', duration: '12:30' },
        { title: 'Meet the NexaTech Team', description: 'Get to know our passionate team of developers and innovators', video_type: 'company_intro', embed_url: '', thumbnail: '', duration: '5:45' },
        { title: 'Client Success Story - GrowthCorp', description: 'How we helped GrowthCorp increase efficiency by 40%', video_type: 'client_testimonial', embed_url: '', thumbnail: '', duration: '8:20' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/nexatech',
      channel_name: 'NexaTech',
      subscriber_count: '12.8K',
      featured_playlist: 'https://youtube.com/playlist?list=PLtechvideos',
      latest_video_embed: '',
      channel_description: 'Tech tutorials, product demos, and insights from the NexaTech team. Subscribe for weekly tech content and industry updates!'
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '09:00', close_time: '18:00', is_closed: false, is_remote: false },
        { day: 'tuesday', open_time: '09:00', close_time: '18:00', is_closed: false, is_remote: false },
        { day: 'wednesday', open_time: '09:00', close_time: '18:00', is_closed: false, is_remote: true },
        { day: 'thursday', open_time: '09:00', close_time: '18:00', is_closed: false, is_remote: false },
        { day: 'friday', open_time: '09:00', close_time: '17:00', is_closed: false, is_remote: true },
        { day: 'saturday', open_time: '10:00', close_time: '15:00', is_closed: false, is_remote: true },
        { day: 'sunday', open_time: '00:00', close_time: '00:00', is_closed: true, is_remote: false }
      ]
    },
    gallery: {
      photos: [
        { image: '', caption: 'Our modern office space' },
        { image: '', caption: 'Team collaboration session' },
        { image: '', caption: 'Latest product launch event' },
        { image: '', caption: 'Tech conference presentation' }
      ]
    },
    testimonials: {
      reviews: [
        { client_name: 'Sarah Johnson', company: 'GrowthCorp', position: 'CTO', review: 'NexaTech transformed our digital infrastructure, resulting in a 40% increase in operational efficiency. Their team was professional, responsive, and delivered beyond our expectations.', rating: '5', client_image: '' },
        { client_name: 'Michael Chen', company: 'InnovateLabs', position: 'CEO', review: 'The custom software solution developed by NexaTech has been a game-changer for our business. It streamlined our processes and provided valuable insights we never had access to before.', rating: '5', client_image: '' },
        { client_name: 'Emily Rodriguez', company: 'TechStart', position: 'Product Manager', review: 'Working with NexaTech was a seamless experience. Their cloud migration expertise saved us countless hours and resources while improving our system reliability.', rating: '4', client_image: '' }
      ]
    },
    appointments: {
      booking_url: 'https://calendly.com/nexatech/demo',
      booking_text: 'Schedule a Demo',
      demo_length: '30 minutes',
      demo_description: 'See our solutions in action with a personalized demo tailored to your business needs. Our product specialists will walk you through key features and answer any questions you may have.'
    },
    team: {
      members: [
        { name: 'Alex Rivera', title: 'CEO & Founder', bio: 'With 15+ years in tech leadership, Alex founded NexaTech with a vision to make enterprise-level technology accessible to businesses of all sizes.', image: '', linkedin: 'https://linkedin.com/in/alexrivera' },
        { name: 'Jamie Wong', title: 'CTO', bio: 'Jamie leads our technical strategy and innovation, bringing extensive experience in cloud architecture and AI development.', image: '', linkedin: 'https://linkedin.com/in/jamiewong' },
        { name: 'Taylor Smith', title: 'Head of Product', bio: 'Taylor ensures our products meet the highest standards of quality and user experience through thoughtful design and rigorous testing.', image: '', linkedin: 'https://linkedin.com/in/taylorsmith' },
        { name: 'Morgan Lee', title: 'Customer Success Lead', bio: 'Morgan works closely with clients to ensure they get maximum value from our solutions and provides ongoing support.', image: '', linkedin: 'https://linkedin.com/in/morganlee' }
      ]
    },
    pricing: {
      plans: [
        { name: 'Starter', price: '$99', billing_period: 'monthly', description: 'Perfect for small businesses and startups', features: 'Core platform features\nBasic analytics\n5 user accounts\n8/5 support\n5GB storage', cta_text: 'Start Free Trial', cta_url: '#', is_popular: false },
        { name: 'Professional', price: '$249', billing_period: 'monthly', description: 'Ideal for growing businesses', features: 'All Starter features\nAdvanced analytics\n20 user accounts\n24/7 priority support\n50GB storage\nAPI access\nCustom integrations', cta_text: 'Start Free Trial', cta_url: '#', is_popular: true },
        { name: 'Enterprise', price: 'Custom', billing_period: 'custom', description: 'For large organizations with specific needs', features: 'All Professional features\nUnlimited users\nDedicated account manager\nCustom development\nUnlimited storage\nSLA guarantee\nOn-premise options', cta_text: 'Contact Sales', cta_url: '#', is_popular: false }
      ]
    },
    google_map: {
      map_embed_url: '',
      directions_url: 'https://maps.google.com/directions'
    },
    app_download: {
      app_store_url: '#',
      play_store_url: '#',
      app_description: 'Take NexaTech with you on the go. Our mobile app gives you access to all your important data and tools wherever you are.',
      app_features: 'Real-time analytics dashboard\nSecure access to your account\nPush notifications for important updates\nOffline mode for uninterrupted work\nSeamless sync across all devices',
      app_image: ''
    },
    contact_form: {
      form_title: 'Get in Touch',
      form_description: 'Have questions about our products or services? Fill out the form below and our team will get back to you within 24 hours.'
    },
    thank_you: {
      message: 'Thank you for your interest in NexaTech! We\'ve received your message and will respond shortly. In the meantime, feel free to explore our services and solutions.'
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
      html_content: '<div class="tech-showcase"><h4>Innovation Hub</h4><p>Discover cutting-edge technology solutions.</p></div>',
      section_title: 'Tech Innovation',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Connect with NexaTech',
      qr_description: 'Scan this QR code to access our digital business card and stay connected.',
      qr_size: 'medium'
    },
    language: {
      template_language: 'en'
    },
    copyright: {
      text: '© 2025 NexaTech. All rights reserved.'
    }
  }
};