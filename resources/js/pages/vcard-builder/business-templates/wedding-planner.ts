import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const weddingPlannerTemplate = {
  name: 'Wedding Planner',
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
        { name: 'years_experience', type: 'number', label: 'Years of Experience' },
        { name: 'weddings_planned', type: 'number', label: 'Weddings Planned' },
        { name: 'approach', type: 'select', label: 'Planning Approach', options: [
          { value: 'traditional', label: 'Traditional' },
          { value: 'modern', label: 'Modern & Contemporary' },
          { value: 'destination', label: 'Destination Weddings' },
          { value: 'luxury', label: 'Luxury Events' },
          { value: 'intimate', label: 'Intimate Gatherings' },
          { value: 'cultural', label: 'Cultural Ceremonies' }
        ]}
      ],
      required: false
    },
    {
      key: 'services',
      name: 'Services',
      fields: [
        {
          name: 'packages',
          type: 'repeater',
          label: 'Service Packages',
          fields: [
            { name: 'name', type: 'text', label: 'Package Name' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'price_range', type: 'text', label: 'Price Range' },
            { name: 'image', type: 'file', label: 'Package Image' },
            { name: 'features', type: 'textarea', label: 'Features (one per line)' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'portfolio',
      name: 'Wedding Portfolio',
      fields: [
        {
          name: 'weddings',
          type: 'repeater',
          label: 'Featured Weddings',
          fields: [
            { name: 'title', type: 'text', label: 'Wedding Title' },
            { name: 'location', type: 'text', label: 'Location' },
            { name: 'date', type: 'text', label: 'Date' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'cover_image', type: 'file', label: 'Cover Image' },
            { name: 'style', type: 'select', label: 'Wedding Style', options: [
              { value: 'rustic', label: 'Rustic' },
              { value: 'beach', label: 'Beach' },
              { value: 'garden', label: 'Garden' },
              { value: 'modern', label: 'Modern' },
              { value: 'traditional', label: 'Traditional' },
              { value: 'bohemian', label: 'Bohemian' },
              { value: 'vintage', label: 'Vintage' },
              { value: 'luxury', label: 'Luxury' }
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
      key: 'videos',
      name: 'Wedding Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Wedding Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'wedding_highlight', label: 'Wedding Highlight Reel' },
              { value: 'planning_process', label: 'Planning Process' },
              { value: 'venue_tour', label: 'Venue Tour' },
              { value: 'client_testimonial', label: 'Client Testimonial' },
              { value: 'behind_scenes', label: 'Behind the Scenes' },
              { value: 'planning_tips', label: 'Wedding Planning Tips' }
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
            { name: 'couple_name', type: 'text', label: 'Couple Name' },
            { name: 'wedding_date', type: 'text', label: 'Wedding Date' },
            { name: 'review', type: 'textarea', label: 'Review Text' },
            { name: 'couple_image', type: 'file', label: 'Couple Photo' },
            { name: 'rating', type: 'number', label: 'Rating (1-5)' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'appointments',
      name: 'Consultation',
      fields: [
        { name: 'booking_url', type: 'url', label: 'Booking URL' },
        { name: 'booking_text', type: 'text', label: 'Booking Button Text' },
        { name: 'consultation_length', type: 'text', label: 'Consultation Length' },
        { name: 'consultation_info', type: 'textarea', label: 'Consultation Information' },
        { name: 'virtual_option', type: 'checkbox', label: 'Virtual Consultation Available' }
      ],
      required: false
    },
    {
      key: 'venues',
      name: 'Preferred Venues',
      fields: [
        {
          name: 'venue_list',
          type: 'repeater',
          label: 'Venues',
          fields: [
            { name: 'name', type: 'text', label: 'Venue Name' },
            { name: 'location', type: 'text', label: 'Location' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'image', type: 'file', label: 'Venue Image' },
            { name: 'capacity', type: 'text', label: 'Capacity' },
            { name: 'website', type: 'url', label: 'Venue Website' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'faq',
      name: 'FAQ',
      fields: [
        {
          name: 'questions',
          type: 'repeater',
          label: 'Frequently Asked Questions',
          fields: [
            { name: 'question', type: 'text', label: 'Question' },
            { name: 'answer', type: 'textarea', label: 'Answer' }
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
    { name: 'Elegant Blush', primary: '#D8A7B1', secondary: '#EAC9C1', accent: '#F9F1F0', background: '#FFFFFF', text: '#5D4954' },
    { name: 'Classic Navy', primary: '#34568B', secondary: '#5C7AEA', accent: '#EFF3F6', background: '#FFFFFF', text: '#333333' },
    { name: 'Sage Green', primary: '#7D8E69', secondary: '#A9B388', accent: '#F1F5EC', background: '#FFFFFF', text: '#3A3A3A' },
    { name: 'Dusty Rose', primary: '#C9A9A6', secondary: '#E5C1C1', accent: '#F8F1F1', background: '#FFFFFF', text: '#4A4A4A' },
    { name: 'Gold & Ivory', primary: '#D4AF37', secondary: '#F5E7A9', accent: '#FFFDF6', background: '#FFFFFF', text: '#3A3A3A' },
    { name: 'Lavender Dream', primary: '#9D8EC7', secondary: '#B8A9DF', accent: '#F5F0FF', background: '#FFFFFF', text: '#4A4A4A' }
  ],
  fontOptions: [
    { name: 'Cormorant Garamond', value: 'Cormorant Garamond, serif', weight: '300,400,500,600,700' },
    { name: 'Playfair Display', value: 'Playfair Display, serif', weight: '400,500,600,700' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif', weight: '300,400,500,600,700' },
    { name: 'Lato', value: 'Lato, sans-serif', weight: '300,400,700' },
    { name: 'Great Vibes', value: 'Great Vibes, cursive', weight: '400' }
  ],
  defaultColors: {
    primary: '#D8A7B1',
    secondary: '#EAC9C1',
    accent: '#F9F1F0',
    background: '#FFFFFF',
    text: '#5D4954',
    cardBg: '#FFFFFF',
    borderColor: '#F0E4E6',
    buttonText: '#FFFFFF',
    highlightColor: '#D8A7B1'
  },
  defaultFont: 'Cormorant Garamond, serif',
  themeStyle: {
    layout: 'wedding-planner-layout',
    headerStyle: 'elegant',
    cardStyle: 'soft',
    buttonStyle: 'rounded',
    iconStyle: 'simple',
    spacing: 'airy',
    shadows: 'soft',
    dividers: true
  },
  defaultData: {
    header: {
      name: 'Eternal Moments',
      tagline: 'Creating unforgettable wedding experiences',
      logo: '',
      cover_image: ''
    },
    about: {
      description: 'Eternal Moments is a boutique wedding planning agency dedicated to creating personalized, stress-free wedding experiences. With meticulous attention to detail and a passion for perfection, we transform your vision into a seamless celebration that reflects your unique love story.',
      years_experience: '10',
      weddings_planned: '250',
      approach: 'luxury'
    },
    services: {
      packages: [
        { name: 'Full Planning', description: 'Comprehensive wedding planning from engagement to "I do"', price_range: 'Starting at $5,000', image: '', features: 'Unlimited consultations\nVendor selection and management\nBudget planning and tracking\nTimeline creation\nDay-of coordination\nRSVP management\nGuest accommodations' },
        { name: 'Partial Planning', description: 'Perfect for couples who have started planning but need professional guidance', price_range: 'Starting at $3,000', image: '', features: '5 planning consultations\nVendor recommendations\nTimeline creation\nMonth-of coordination\nDay-of execution' },
        { name: 'Month-of Coordination', description: 'For couples who have planned their wedding but need help executing their vision', price_range: 'Starting at $1,500', image: '', features: '2 pre-wedding consultations\nVendor confirmation\nDetailed timeline\nCeremony rehearsal\nDay-of coordination\n8 hours of coverage' }
      ]
    },
    portfolio: {
      weddings: [
        { title: 'Emma & James', location: 'Rosewood Gardens', date: 'June 2023', description: 'A romantic garden wedding with lush floral arrangements and elegant touches.', cover_image: '', style: 'garden' },
        { title: 'Sophia & Michael', location: 'Oceanview Terrace', date: 'September 2023', description: 'A breathtaking beach ceremony followed by a reception under the stars.', cover_image: '', style: 'beach' },
        { title: 'Olivia & William', location: 'Historic Mansion', date: 'October 2023', description: 'A sophisticated vintage-inspired celebration with timeless elegance.', cover_image: '', style: 'vintage' }
      ]
    },
    contact: {
      email: 'hello@eternalmoments.com',
      phone: '(555) 123-4567',
      website: 'https://www.eternalmoments.com',
      address: '123 Wedding Lane, Charleston, SC 29401'
    },
    social: {
      social_links: [
        { platform: 'instagram', url: 'https://instagram.com/eternalmoments', username: '@eternalmoments' },
        { platform: 'pinterest', url: 'https://pinterest.com/eternalmoments', username: 'Eternal Moments' },
        { platform: 'facebook', url: 'https://facebook.com/eternalmoments', username: 'Eternal Moments Weddings' },
        { platform: 'youtube', url: 'https://youtube.com/eternalmoments', username: 'Eternal Moments' }
      ]
    },
    videos: {
      video_list: [
        { title: 'Emma & James - Garden Wedding Highlight', description: 'A beautiful garden wedding celebration at Rosewood Gardens', video_type: 'wedding_highlight', embed_url: '', thumbnail: '', duration: '4:30' },
        { title: 'Behind the Scenes - Wedding Planning Process', description: 'See how we transform wedding dreams into reality', video_type: 'planning_process', embed_url: '', thumbnail: '', duration: '8:15' },
        { title: 'Top 5 Wedding Planning Tips', description: 'Essential advice for couples planning their perfect day', video_type: 'planning_tips', embed_url: '', thumbnail: '', duration: '6:45' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/eternalmoments',
      channel_name: 'Eternal Moments',
      subscriber_count: '28.3K',
      featured_playlist: 'https://youtube.com/playlist?list=PLweddinghighlights',
      latest_video_embed: '',
      channel_description: 'Wedding highlights, planning tips, and behind-the-scenes content from luxury wedding planner. Subscribe for weekly wedding inspiration!'
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '09:00', close_time: '17:00', is_closed: false, by_appointment: true },
        { day: 'tuesday', open_time: '09:00', close_time: '17:00', is_closed: false, by_appointment: true },
        { day: 'wednesday', open_time: '09:00', close_time: '17:00', is_closed: false, by_appointment: true },
        { day: 'thursday', open_time: '09:00', close_time: '17:00', is_closed: false, by_appointment: true },
        { day: 'friday', open_time: '09:00', close_time: '17:00', is_closed: false, by_appointment: true },
        { day: 'saturday', open_time: '10:00', close_time: '14:00', is_closed: false, by_appointment: true },
        { day: 'sunday', open_time: '00:00', close_time: '00:00', is_closed: true, by_appointment: false }
      ]
    },
    gallery: {
      photos: [
        { image: '', caption: 'Elegant table setting with floral centerpieces' },
        { image: '', caption: 'Romantic ceremony arch with garden roses' },
        { image: '', caption: 'Custom wedding cake with gold accents' },
        { image: '', caption: 'Intimate reception under string lights' }
      ]
    },
    testimonials: {
      reviews: [
        { couple_name: 'Emma & James', wedding_date: 'June 2023', review: 'Working with Eternal Moments was the best decision we made for our wedding. They took care of every detail and allowed us to truly enjoy our special day without stress.', couple_image: '', rating: '5' },
        { couple_name: 'Sophia & Michael', wedding_date: 'September 2023', review: 'Our beach wedding was absolutely perfect thanks to the incredible team at Eternal Moments. They thought of details we never would have considered and executed everything flawlessly.', couple_image: '', rating: '5' },
        { couple_name: 'Olivia & William', wedding_date: 'October 2023', review: 'We cannot thank Eternal Moments enough for bringing our vision to life. Their attention to detail and creative solutions made our wedding truly unique and memorable.', couple_image: '', rating: '5' }
      ]
    },
    appointments: {
      booking_url: 'https://calendly.com/eternalmoments/consultation',
      booking_text: 'Schedule a Consultation',
      consultation_length: '60 minutes',
      consultation_info: 'Our complimentary initial consultation allows us to get to know you as a couple and discuss your wedding vision, needs, and how we can help create your perfect day.',
      virtual_option: true
    },
    venues: {
      venue_list: [
        { name: 'Rosewood Gardens', location: 'Charleston, SC', description: 'A picturesque garden venue with lush greenery and elegant architecture.', image: '', capacity: 'Up to 200 guests', website: 'https://www.rosewoodgardens.com' },
        { name: 'Oceanview Terrace', location: 'Myrtle Beach, SC', description: 'Stunning beachfront venue with panoramic ocean views and modern facilities.', image: '', capacity: 'Up to 150 guests', website: 'https://www.oceanviewterrace.com' },
        { name: 'Historic Mansion', location: 'Savannah, GA', description: 'A grand historic estate with timeless charm and sophisticated ambiance.', image: '', capacity: 'Up to 120 guests', website: 'https://www.historicmansion.com' }
      ]
    },
    faq: {
      questions: [
        { question: 'How far in advance should I book a wedding planner?', answer: 'We recommend booking your wedding planner 12-18 months before your wedding date, especially if you\'re planning during peak wedding season (May-October).' },
        { question: 'What\'s the difference between a wedding planner and a venue coordinator?', answer: 'A venue coordinator works specifically for the venue and focuses on the venue\'s responsibilities, while a wedding planner works exclusively for you, managing all aspects of your wedding including vendor coordination, timeline creation, and personal assistance throughout the entire planning process.' },
        { question: 'Do you travel for destination weddings?', answer: 'Yes! We love planning destination weddings and have experience coordinating events across the country and internationally. Additional travel fees may apply depending on the location.' }
      ]
    },
    google_map: {
      map_embed_url: '',
      directions_url: 'https://maps.google.com/directions'
    },
    app_download: {
      app_store_url: '#',
      play_store_url: '#',
      app_description: 'Download our wedding planning app to access your timeline, vendor contacts, budget tracker, and communicate directly with your planning team.'
    },
    contact_form: {
      form_title: 'Get in Touch',
      form_description: 'Ready to start planning your dream wedding? Fill out the form below and we\'ll be in touch within 24 hours to schedule your complimentary consultation.'
    },
    thank_you: {
      message: 'Thank you for your interest in Eternal Moments Wedding Planning. We\'re excited to learn more about your vision and help create your perfect day!'
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
      html_content: '<div class="wedding-showcase"><h4>Featured in Bridal Magazine</h4><p>See our latest wedding features and press coverage.</p></div>',
      section_title: 'Press & Features',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Share Our Wedding Services',
      qr_description: 'Scan this QR code to access our wedding planning portfolio and contact information.',
      qr_size: 'medium'
    },
    language: {
      template_language: 'en'
    },
    copyright: {
      text: '© 2025 Eternal Moments Wedding Planning. All rights reserved.'
    }
  }
};