import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const eventplannerTemplate = {
  name: 'Event Planner',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Business Name' },
        { name: 'tagline', type: 'textarea', label: 'Tagline' },
        { name: 'logo', type: 'file', label: 'Logo' },
        { name: 'cover_image', type: 'file', label: 'Cover Image' }
      ],
      required: true
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'About Us' },
        { name: 'year_established', type: 'number', label: 'Year Established' },
        { name: 'events_completed', type: 'number', label: 'Events Completed' }
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
            { name: 'title', type: 'text', label: 'Service Name' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'icon', type: 'select', label: 'Icon', options: [
              { value: 'wedding', label: 'Wedding' },
              { value: 'corporate', label: 'Corporate' },
              { value: 'birthday', label: 'Birthday' },
              { value: 'social', label: 'Social Gathering' },
              { value: 'conference', label: 'Conference' },
              { value: 'concert', label: 'Concert' },
              { value: 'festival', label: 'Festival' },
              { value: 'graduation', label: 'Graduation' }
            ]}
          ]
        }
      ],
      required: false
    },
    {
      key: 'videos',
      name: 'Event Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Event Showcase Videos',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'event_highlight', label: 'Event Highlight Reel' },
              { value: 'behind_scenes', label: 'Behind the Scenes' },
              { value: 'client_testimonial', label: 'Client Testimonial' },
              { value: 'venue_tour', label: 'Venue Tour' },
              { value: 'planning_process', label: 'Planning Process' },
              { value: 'setup_timelapse', label: 'Setup Timelapse' }
            ]},
            { name: 'embed_url', type: 'textarea', label: 'Video Embed URL' },
            { name: 'thumbnail', type: 'file', label: 'Video Thumbnail' },
            { name: 'duration', type: 'text', label: 'Duration' },
            { name: 'event_category', type: 'select', label: 'Event Category', options: [
              { value: 'wedding', label: 'Wedding' },
              { value: 'corporate', label: 'Corporate' },
              { value: 'social', label: 'Social' },
              { value: 'conference', label: 'Conference' },
              { value: 'celebration', label: 'Celebration' }
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
      name: 'Portfolio',
      fields: [
        {
          name: 'events',
          type: 'repeater',
          label: 'Past Events',
          fields: [
            { name: 'title', type: 'text', label: 'Event Title' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'date', type: 'text', label: 'Event Date' },
            { name: 'location', type: 'text', label: 'Location' },
            { name: 'image', type: 'file', label: 'Event Image' },
            { name: 'category', type: 'select', label: 'Category', options: [
              { value: 'wedding', label: 'Wedding' },
              { value: 'corporate', label: 'Corporate' },
              { value: 'birthday', label: 'Birthday' },
              { value: 'social', label: 'Social Gathering' },
              { value: 'conference', label: 'Conference' },
              { value: 'concert', label: 'Concert' },
              { value: 'festival', label: 'Festival' },
              { value: 'graduation', label: 'Graduation' }
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
            { name: 'by_appointment', type: 'checkbox', label: 'By Appointment Only' }
          ]
        }
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
            { name: 'caption', type: 'text', label: 'Caption' },
            { name: 'category', type: 'select', label: 'Category', options: [
              { value: 'wedding', label: 'Wedding' },
              { value: 'corporate', label: 'Corporate' },
              { value: 'birthday', label: 'Birthday' },
              { value: 'social', label: 'Social Gathering' },
              { value: 'conference', label: 'Conference' },
              { value: 'concert', label: 'Concert' },
              { value: 'festival', label: 'Festival' },
              { value: 'graduation', label: 'Graduation' }
            ]}
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
            { name: 'review', type: 'textarea', label: 'Review Text' },
            { name: 'rating', type: 'number', label: 'Rating (1-5)' },
            { name: 'event_type', type: 'text', label: 'Event Type' },
            { name: 'event_date', type: 'text', label: 'Event Date' }
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
        { name: 'section_title', type: 'text', label: 'Section Title' },
        { name: 'section_description', type: 'textarea', label: 'Section Description' },
        { name: 'booking_text', type: 'text', label: 'Booking Button Text' },
        { name: 'consultation_text', type: 'text', label: 'Free Consultation Button Text' }
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
    { name: 'Purple Elegance', primary: '#9C27B0', secondary: '#E1BEE7', accent: '#F3E5F5', background: '#FFFFFF', text: '#333333' },
    { name: 'Rose Gold Glam', primary: '#E91E63', secondary: '#F8BBD9', accent: '#FCE4EC', background: '#FFFFFF', text: '#333333' },
    { name: 'Champagne Dreams', primary: '#FF9800', secondary: '#FFCC02', accent: '#FFF8E1', background: '#FFFFFF', text: '#333333' },
    { name: 'Midnight Blue', primary: '#1A237E', secondary: '#3F51B5', accent: '#E8EAF6', background: '#FFFFFF', text: '#333333' },
    { name: 'Emerald Luxury', primary: '#00695C', secondary: '#26A69A', accent: '#E0F2F1', background: '#FFFFFF', text: '#333333' },
    { name: 'Coral Celebration', primary: '#FF5722', secondary: '#FF8A65', accent: '#FBE9E7', background: '#FFFFFF', text: '#333333' },
    { name: 'Silver Sophistication', primary: '#607D8B', secondary: '#90A4AE', accent: '#ECEFF1', background: '#FFFFFF', text: '#333333' },
    { name: 'Blush Romance', primary: '#AD1457', secondary: '#EC407A', accent: '#F8BBD9', background: '#FFFFFF', text: '#333333' },
    { name: 'Golden Celebration', primary: '#F57F17', secondary: '#FFCA28', accent: '#FFFDE7', background: '#FFFFFF', text: '#333333' },
    { name: 'Royal Purple', primary: '#6A1B9A', secondary: '#BA68C8', accent: '#F3E5F5', background: '#FFFFFF', text: '#333333' }
  ],
  fontOptions: [
    { name: 'Montserrat', value: 'Montserrat, sans-serif', weight: '300,400,500,600,700' },
    { name: 'Playfair Display', value: 'Playfair Display, serif', weight: '400,500,600,700' },
    { name: 'Poppins', value: 'Poppins, sans-serif', weight: '300,400,500,600,700' },
    { name: 'Dancing Script', value: 'Dancing Script, cursive', weight: '400,500,600,700' },
    { name: 'Raleway', value: 'Raleway, sans-serif', weight: '300,400,500,600,700' }
  ],
  defaultColors: {
    primary: '#9C27B0',
    secondary: '#E1BEE7',
    accent: '#F3E5F5',
    background: '#FFFFFF',
    text: '#333333',
    cardBg: '#FAFAFA',
    borderColor: '#EEEEEE',
    buttonText: '#FFFFFF'
  },
  defaultFont: 'Montserrat, sans-serif',
  themeStyle: {
    layout: 'event-layout',
    headerStyle: 'modern',
    cardStyle: 'rounded',
    buttonStyle: 'rounded',
    iconStyle: 'simple',
    spacing: 'comfortable',
    shadows: 'soft'
  },
  defaultData: {
    header: {
      name: 'Stellar Events',
      tagline: 'Creating unforgettable moments for every occasion',
      logo: '',
      cover_image: ''
    },
    about: {
      description: 'Stellar Events is a full-service event planning company dedicated to creating memorable experiences. With meticulous attention to detail and creative vision, we transform your ideas into flawlessly executed events that exceed expectations.',
      year_established: '2015',
      events_completed: '500'
    },
    services: {
      service_list: [
        { title: 'Wedding Planning', description: 'Full-service wedding planning from engagement to reception, including venue selection, vendor coordination, and day-of management.', icon: 'wedding' },
        { title: 'Corporate Events', description: 'Professional planning for conferences, product launches, team building activities, and company celebrations.', icon: 'corporate' },
        { title: 'Social Gatherings', description: 'Personalized planning for birthdays, anniversaries, holiday parties, and other special occasions.', icon: 'social' },
        { title: 'Destination Events', description: 'Comprehensive planning for events at remote locations, including travel arrangements and accommodation coordination.', icon: 'conference' }
      ]
    },
    portfolio: {
      events: [
        { title: 'Johnson-Smith Wedding', description: 'An elegant garden wedding with 150 guests featuring a custom floral arch, gourmet dinner, and live string quartet.', date: 'June 15, 2023', location: 'Rosewood Gardens', image: '', category: 'wedding' },
        { title: 'TechCorp Annual Conference', description: 'A two-day conference for 300 attendees with keynote speakers, breakout sessions, and networking events.', date: 'September 22, 2023', location: 'Grand Hotel Conference Center', image: '', category: 'corporate' },
        { title: 'Silver Anniversary Gala', description: 'A black-tie celebration with custom decor, five-course dinner, and entertainment for 200 guests.', date: 'November 5, 2023', location: 'Metropolitan Ballroom', image: '', category: 'social' }
      ]
    },
    contact: {
      email: 'info@stellarevents.com',
      phone: '(555) 123-4567',
      website: 'https://www.stellarevents.com',
      address: '123 Event Plaza, Suite 200, Los Angeles, CA 90001'
    },
    social: {
      social_links: [
        { platform: 'instagram', url: 'https://instagram.com/stellarevents', username: '@stellarevents' },
        { platform: 'facebook', url: 'https://facebook.com/stellarevents', username: 'Stellar Events' },
        { platform: 'pinterest', url: 'https://pinterest.com/stellarevents', username: 'stellarevents' },
        { platform: 'youtube', url: 'https://youtube.com/stellarevents', username: 'Stellar Events' }
      ]
    },
    videos: {
      video_list: [
        { title: 'Johnson-Smith Wedding Highlight Reel', description: 'Beautiful moments from an elegant garden wedding celebration', video_type: 'event_highlight', embed_url: '', thumbnail: '', duration: '4:30', event_category: 'wedding' },
        { title: 'Behind the Scenes: Corporate Event Setup', description: 'Watch our team transform a venue for a major corporate conference', video_type: 'behind_scenes', embed_url: '', thumbnail: '', duration: '6:45', event_category: 'corporate' },
        { title: 'Client Testimonial - Sarah & Michael', description: 'Hear from our happy couple about their perfect wedding day', video_type: 'client_testimonial', embed_url: '', thumbnail: '', duration: '2:15', event_category: 'wedding' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/stellarevents',
      channel_name: 'Stellar Events',
      subscriber_count: '18.3K',
      featured_playlist: 'https://youtube.com/playlist?list=PLweddinghighlights',
      latest_video_embed: '',
      channel_description: 'Event planning inspiration, behind-the-scenes content, and client success stories from your trusted event planning professionals.'
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '09:00', close_time: '17:00', is_closed: false, by_appointment: false },
        { day: 'tuesday', open_time: '09:00', close_time: '17:00', is_closed: false, by_appointment: false },
        { day: 'wednesday', open_time: '09:00', close_time: '17:00', is_closed: false, by_appointment: false },
        { day: 'thursday', open_time: '09:00', close_time: '17:00', is_closed: false, by_appointment: false },
        { day: 'friday', open_time: '09:00', close_time: '17:00', is_closed: false, by_appointment: false },
        { day: 'saturday', open_time: '10:00', close_time: '15:00', is_closed: false, by_appointment: true },
        { day: 'sunday', open_time: '', close_time: '', is_closed: true, by_appointment: false }
      ]
    },
    gallery: {
      photos: [
        { image: '', caption: 'Elegant wedding reception with custom lighting', category: 'wedding' },
        { image: '', caption: 'Corporate product launch with interactive displays', category: 'corporate' },
        { image: '', caption: 'Birthday celebration with custom theme decor', category: 'birthday' },
        { image: '', caption: 'Outdoor festival setup with stage and vendor booths', category: 'festival' }
      ]
    },
    testimonials: {
      reviews: [
        { client_name: 'Sarah & Michael', review: 'Stellar Events made our wedding day absolutely perfect. Their attention to detail and ability to bring our vision to life exceeded our expectations.', rating: '5', event_type: 'Wedding', event_date: 'June 2023' },
        { client_name: 'TechCorp Inc.', review: 'Our annual conference was flawlessly executed thanks to the Stellar Events team. Their professionalism and organization made the planning process stress-free.', rating: '5', event_type: 'Corporate Conference', event_date: 'September 2023' },
        { client_name: 'Jennifer R.', review: 'The 50th anniversary party they planned for my parents was everything we hoped for and more. Every detail was perfect and the guests are still talking about it!', rating: '5', event_type: 'Anniversary Party', event_date: 'November 2023' }
      ]
    },
    appointments: {
      booking_url: 'https://calendly.com/stellarevents',
      section_title: 'Ready to Plan Your Event?',
      section_description: 'Let\'s discuss your vision and create an unforgettable experience together.',
      booking_text: 'Schedule a Consultation',
      consultation_text: 'Free 30-Min Consultation'
    },
    google_map: {
      map_embed_url: '',
      directions_url: 'https://maps.google.com/directions'
    },
    app_download: {
      app_store_url: '#',
      play_store_url: '#',
      app_description: 'Download our app to view your event details, communicate with our team, and access your planning timeline.'
    },
    contact_form: {
      form_title: 'Tell Us About Your Event',
      form_description: 'Share your event vision with us, and we will contact you to discuss how we can bring it to life.'
    },
    thank_you: {
      message: 'Thank you for contacting Stellar Events. We appreciate your interest and will get back to you within 24-48 hours to discuss your event needs.'
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
      html_content: '<div class="custom-section"><h4>Event Planning Tips</h4><p>Discover our latest event planning insights and inspiration.</p></div>',
      section_title: 'Planning Resources',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Share Our Services',
      qr_description: 'Scan this QR code to share our event planning services with friends and family.',
      qr_size: 'medium'
    },
    language: {
      template_language: 'en'
    },
    footer: {
      show_footer: true,
      footer_text: 'Creating unforgettable moments for every occasion. Let us bring your vision to life with our expert event planning services.',
      footer_links: [
        { title: 'Event Packages', url: '#services' },
        { title: 'Portfolio', url: '#portfolio' },
        { title: 'Book Consultation', url: '#booking' },
        { title: 'Contact Us', url: '#contact' }
      ]
    },
    copyright: {
      text: '© 2025 Stellar Events. All rights reserved.'
    }
  }
};