import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const freelancerTemplate = {
  name: 'Freelancer',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Full Name' },
        { name: 'title', type: 'text', label: 'Professional Title' },
        { name: 'tagline', type: 'textarea', label: 'Tagline' },
        { name: 'profile_image', type: 'file', label: 'Profile Image' }
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
        { name: 'description', type: 'textarea', label: 'About Me' },
        { name: 'skills', type: 'tags', label: 'Skills' },
        { name: 'experience', type: 'number', label: 'Years of Experience' }
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
          label: 'Services',
          fields: [
            { name: 'title', type: 'text', label: 'Service Title' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'price', type: 'number', label: 'Price' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'videos',
      name: 'Portfolio Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Professional Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'project_walkthrough', label: 'Project Walkthrough' },
              { value: 'coding_tutorial', label: 'Coding Tutorial' },
              { value: 'design_process', label: 'Design Process' },
              { value: 'client_testimonial', label: 'Client Testimonial' },
              { value: 'tech_talk', label: 'Tech Talk/Presentation' },
              { value: 'behind_scenes', label: 'Behind the Scenes' }
            ]},
            { name: 'embed_url', type: 'textarea', label: 'Video Embed URL' },
            { name: 'thumbnail', type: 'file', label: 'Video Thumbnail' },
            { name: 'duration', type: 'text', label: 'Duration' },
            { name: 'tech_stack', type: 'text', label: 'Technologies Used' }
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
      name: 'Portfolio',
      fields: [
        {
          name: 'projects',
          type: 'repeater',
          label: 'Projects',
          fields: [
            { name: 'title', type: 'text', label: 'Project Title' },
            { name: 'image', type: 'file', label: 'Project Image' },
            { name: 'url', type: 'url', label: 'Project URL' }
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
          label: 'Business Hours',
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
        { name: 'calendar_link', type: 'url', label: 'Calendar Link' }
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
    {
      key: 'footer',
      name: 'Footer',
      fields: [
        { name: 'show_footer', type: 'checkbox', label: 'Show Footer' },
        { name: 'footer_text', type: 'textarea', label: 'Footer Text' },
        { name: 'footer_links', type: 'repeater', label: 'Footer Links', fields: [
          { name: 'title', type: 'text', label: 'Link Title' },
          { name: 'url', type: 'url', label: 'Link URL' }
        ]}
      ],
      required: false
    }
  ],
  colorPresets: [
    { name: 'Code Blue', primary: '#0066CC', secondary: '#0080FF', accent: '#E6F3FF', background: '#0A0E1A', text: '#E2E8F0', codeBlock: '#1A202C' },
    { name: 'Terminal Green', primary: '#00FF41', secondary: '#39FF14', accent: '#E8F5E8', background: '#0D1117', text: '#C9D1D9', codeBlock: '#161B22' },
    { name: 'Cyber Purple', primary: '#8B5CF6', secondary: '#A78BFA', accent: '#F3F4F6', background: '#1A1B23', text: '#F1F5F9', codeBlock: '#2D2E3F' },
    { name: 'Matrix Black', primary: '#00D9FF', secondary: '#00B4D8', accent: '#F0F9FF', background: '#000000', text: '#FFFFFF', codeBlock: '#111111' },
    { name: 'Neon Orange', primary: '#FF6B35', secondary: '#FF8C42', accent: '#FFF4E6', background: '#1C1C1E', text: '#F2F2F7', codeBlock: '#2C2C2E' },
    { name: 'Arctic Blue', primary: '#0EA5E9', secondary: '#38BDF8', accent: '#F0F9FF', background: '#0F172A', text: '#CBD5E1', codeBlock: '#1E293B' },
    { name: 'Hacker Red', primary: '#EF4444', secondary: '#F87171', accent: '#FEF2F2', background: '#1F1F23', text: '#FAFAFA', codeBlock: '#2A2A2E' },
    { name: 'Dev Gold', primary: '#F59E0B', secondary: '#FBBF24', accent: '#FFFBEB', background: '#1C1917', text: '#F5F5F4', codeBlock: '#292524' },
    { name: 'Mint Fresh', primary: '#10B981', secondary: '#34D399', accent: '#ECFDF5', background: '#0F1419', text: '#E5E7EB', codeBlock: '#1F2937' },
    { name: 'Royal Violet', primary: '#7C3AED', secondary: '#8B5CF6', accent: '#F5F3FF', background: '#1E1B2E', text: '#E2E8F0', codeBlock: '#2A2438' }
  ],
  fontOptions: [
    { name: 'JetBrains Mono', value: 'JetBrains Mono, Fira Code, Monaco, monospace', weight: '400,500,600,700' },
    { name: 'Fira Code', value: 'Fira Code, Consolas, Monaco, monospace', weight: '400,500,600' },
    { name: 'Inter Tech', value: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'Source Code Pro', value: 'Source Code Pro, Menlo, Monaco, monospace', weight: '400,600,700' },
    { name: 'Space Grotesk', value: 'Space Grotesk, Inter, sans-serif', weight: '400,500,600,700' }
  ],
  defaultColors: {
    primary: '#0066CC',
    secondary: '#0080FF',
    accent: '#E6F3FF',
    background: '#0A0E1A',
    text: '#E2E8F0',
    cardBg: 'rgba(26, 32, 44, 0.8)',
    borderColor: '#334155',
    codeBlock: '#1A202C',
    syntaxHighlight: '#00FF41'
  },
  defaultFont: 'JetBrains Mono, Fira Code, Monaco, monospace',
  themeStyle: {
    layout: 'tech-grid',
    headerStyle: 'terminal',
    cardStyle: 'glass-morphism',
    buttonStyle: 'cyber',
    iconStyle: 'tech',
    spacing: 'minimal',
    shadows: 'neon',
    animations: 'glitch',
    backgroundPattern: 'circuit-board',
    codeBlocks: 'syntax-highlighted',
    terminalEffects: true
  },
  defaultData: {
    header: {
      name: 'John Smith',
      title: 'Full Stack Developer',
      tagline: 'Building amazing web experiences with modern technologies',
      profile_image: ''
    },
    contact: {
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      website: 'https://johnsmith.dev',
      location: 'San Francisco, CA'
    },
    about: {
      description: 'Passionate full-stack developer with 5+ years of experience creating scalable web applications. I specialize in React, Node.js, and cloud technologies.',
      skills: 'React, Node.js, TypeScript, AWS, MongoDB, PostgreSQL',
      experience: '5'
    },
    services: {
      service_list: [
        { title: 'Web Development', description: 'Custom web applications using modern frameworks', price: '150' },
        { title: 'API Development', description: 'RESTful APIs and microservices architecture', price: '120' },
        { title: 'Consulting', description: 'Technical consulting and code reviews', price: '100' }
      ]
    },
    portfolio: {
      projects: [
        { title: 'E-commerce Platform', image: 'https://picsum.photos/400/300?random=1', url: 'https://demo-ecommerce.com' },
        { title: 'Task Management App', image: 'https://picsum.photos/400/300?random=2', url: 'https://demo-tasks.com' }
      ]
    },
    social: {
      social_links: [
        { platform: 'linkedin', url: 'https://linkedin.com/in/johnsmith', username: 'johnsmith' },
        { platform: 'twitter', url: 'https://twitter.com/johnsmith', username: '@johnsmith' },
        { platform: 'github', url: 'https://github.com/johnsmith', username: 'johnsmith' },
        { platform: 'youtube', url: 'https://youtube.com/johnsmithdev', username: 'John Smith Dev' }
      ]
    },
    videos: {
      video_list: [
        { title: 'Building a React E-commerce App', description: 'Complete walkthrough of building a modern e-commerce platform with React and Node.js', video_type: 'project_walkthrough', embed_url: '', thumbnail: '', duration: '25:30', tech_stack: 'React, Node.js, MongoDB' },
        { title: 'Advanced TypeScript Patterns', description: 'Learn advanced TypeScript patterns for better code organization', video_type: 'coding_tutorial', embed_url: '', thumbnail: '', duration: '18:45', tech_stack: 'TypeScript, React' },
        { title: 'Client Success Story - Tech Startup', description: 'How I helped a startup build their MVP in 6 weeks', video_type: 'client_testimonial', embed_url: '', thumbnail: '', duration: '4:20', tech_stack: 'Full Stack' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/johnsmithdev',
      channel_name: 'John Smith Dev',
      subscriber_count: '45.8K',
      featured_playlist: 'https://youtube.com/playlist?list=PLreacttutorials',
      latest_video_embed: '',
      channel_description: 'Web development tutorials, coding tips, and project walkthroughs. Subscribe for weekly content on React, Node.js, and modern web technologies.'
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '09:00', close_time: '18:00', is_closed: false },
        { day: 'tuesday', open_time: '09:00', close_time: '18:00', is_closed: false },
        { day: 'wednesday', open_time: '09:00', close_time: '18:00', is_closed: false },
        { day: 'thursday', open_time: '09:00', close_time: '18:00', is_closed: false },
        { day: 'friday', open_time: '09:00', close_time: '17:00', is_closed: false },
        { day: 'saturday', open_time: '', close_time: '', is_closed: false },
        { day: 'sunday', open_time: '', close_time: '', is_closed: true }
      ]
    },
    appointments: {
      booking_url: 'https://calendly.com/johnsmith',
      calendar_link: 'https://calendar.google.com/johnsmith'
    },
    testimonials: {
      reviews: [
        { client_name: 'Tech Startup Inc.', review: 'John delivered an exceptional web application that exceeded our expectations. Professional and reliable!', rating: '5' },
        { client_name: 'Marketing Agency', review: 'Great communication and technical skills. Will definitely work with John again.', rating: '5' },
        { client_name: 'E-commerce Store', review: 'Outstanding work on our online platform. Highly recommended for any development project.', rating: '5' }
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
      form_title: 'Let\'s Work Together',
      form_description: 'Ready to start your next project? Get in touch and let\'s discuss how I can help bring your ideas to life.'
    },
    thank_you: {
      message: 'Thank you for your interest! I\'ll get back to you within 24 hours to discuss your project.'
    },
    seo: {
      meta_title: 'John Smith - Full Stack Developer | Web Development Services',
      meta_description: 'Professional full-stack developer with 5+ years experience. Specializing in React, Node.js, and modern web technologies. Contact for custom web solutions.',
      keywords: 'full stack developer, web development, React, Node.js, JavaScript, TypeScript, freelancer',
      og_image: ''
    },
    pixels: {
      google_analytics: '',
      facebook_pixel: '',
      gtm_id: '',
      custom_head: '',
      custom_body: ''
    },
    custom_html: {
      html_content: '<div class="custom-section"><h4>Featured Work</h4><p>Check out my latest projects and achievements.</p></div>',
      section_title: 'Featured Content',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Share My Contact',
      qr_description: 'Scan this QR code to save my contact information directly to your phone.',
      qr_size: 'medium'
    },
    language: {
      template_language: 'en'
    },
    footer: {
      show_footer: true,
      footer_text: 'Ready to bring your ideas to life? Let\'s collaborate on your next project and create something amazing together.',
      footer_links: [
        { title: 'View Portfolio', url: '#portfolio' },
        { title: 'Book Consultation', url: '#booking' },
        { title: 'Download Resume', url: '#resume' },
        { title: 'Get Quote', url: '#contact' }
      ]
    },
    copyright: {
      text: '© 2025 John Smith. All rights reserved.'
    }
  }
};