import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const restaurantTemplate = {
  name: 'Restaurant',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Restaurant Name' },
        { name: 'tagline', type: 'text', label: 'Tagline' },
        { name: 'cuisine_type', type: 'text', label: 'Cuisine Type' },
        { name: 'service_info', type: 'text', label: 'Service Information' },
        { name: 'logo', type: 'file', label: 'Restaurant Logo' },
        { name: 'cover_image', type: 'file', label: 'Cover Image' }
      ],
      required: true
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'Restaurant Description' },
        { name: 'year_established', type: 'number', label: 'Year Established' },
        { name: 'chef_name', type: 'text', label: 'Head Chef Name' },
        { name: 'ambiance', type: 'select', label: 'Ambiance', options: [
          { value: 'casual', label: 'Casual' },
          { value: 'fine_dining', label: 'Fine Dining' },
          { value: 'family', label: 'Family-Friendly' },
          { value: 'bistro', label: 'Bistro' },
          { value: 'cafe', label: 'Café' }
        ]}
      ],
      required: false
    },
    {
      key: 'contact',
      name: 'Contact Information',
      fields: [
        { name: 'phone', type: 'tel', label: 'Phone Number' },
        { name: 'email', type: 'email', label: 'Email Address' },
        { name: 'website', type: 'url', label: 'Website URL' },
        { name: 'address', type: 'textarea', label: 'Address' }
      ],
      required: true
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
      key: 'menu_highlights',
      name: 'Menu Highlights',
      fields: [
        {
          name: 'menu_items',
          type: 'repeater',
          label: 'Menu Items',
          fields: [
            { name: 'name', type: 'text', label: 'Dish Name' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'price', type: 'text', label: 'Price' },
            { name: 'image', type: 'file', label: 'Dish Image' },
            { name: 'category', type: 'select', label: 'Category', options: [
              { value: 'appetizer', label: 'Appetizer' },
              { value: 'main', label: 'Main Course' },
              { value: 'dessert', label: 'Dessert' },
              { value: 'beverage', label: 'Beverage' },
              { value: 'special', label: 'Chef\'s Special' }
            ]}
          ]
        }
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
          label: 'Restaurant Services',
          fields: [
            { name: 'title', type: 'text', label: 'Service Name' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'price', type: 'text', label: 'Price (optional)' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'videos',
      name: 'Restaurant Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Restaurant Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'restaurant_tour', label: 'Restaurant Tour' },
              { value: 'chef_cooking', label: 'Chef Cooking Demo' },
              { value: 'dish_showcase', label: 'Dish Showcase' },
              { value: 'customer_testimonial', label: 'Customer Testimonial' },
              { value: 'behind_scenes', label: 'Behind the Scenes' },
              { value: 'special_events', label: 'Special Events' }
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
          label: 'Restaurant Photos',
          fields: [
            { name: 'image', type: 'file', label: 'Photo' },
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
          label: 'Customer Reviews',
          fields: [
            { name: 'customer_name', type: 'text', label: 'Customer Name' },
            { name: 'review', type: 'textarea', label: 'Review Text' },
            { name: 'rating', type: 'number', label: 'Rating (1-5)' },
            { name: 'date', type: 'text', label: 'Date of Visit' }
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
      key: 'appointments',
      name: 'Reservations',
      fields: [
        { name: 'reservation_url', type: 'url', label: 'Reservation URL' },
        { name: 'reservation_phone', type: 'tel', label: 'Reservation Phone' },
        { name: 'min_party_size', type: 'number', label: 'Minimum Party Size' },
        { name: 'max_party_size', type: 'number', label: 'Maximum Party Size' },
        { name: 'reservation_notes', type: 'textarea', label: 'Reservation Notes' }
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
    { name: 'Rustic Bistro', primary: '#8B4513', secondary: '#A0522D', accent: '#FFD700', background: '#FFF8E1', text: '#3E2723' },
    { name: 'Modern Eatery', primary: '#D32F2F', secondary: '#F44336', accent: '#FFCDD2', background: '#FFFFFF', text: '#212121' },
    { name: 'Seafood Blue', primary: '#0277BD', secondary: '#039BE5', accent: '#B3E5FC', background: '#E1F5FE', text: '#01579B' },
    { name: 'Italian Villa', primary: '#2E7D32', secondary: '#43A047', accent: '#C8E6C9', background: '#F1F8E9', text: '#1B5E20' },
    { name: 'Asian Fusion', primary: '#BF360C', secondary: '#E64A19', accent: '#FFCCBC', background: '#FBE9E7', text: '#3E2723' },
    { name: 'Elegant Dining', primary: '#4E342E', secondary: '#6D4C41', accent: '#D7CCC8', background: '#EFEBE9', text: '#3E2723' },
    { name: 'Cafe Cozy', primary: '#795548', secondary: '#8D6E63', accent: '#D7CCC8', background: '#EFEBE9', text: '#3E2723' },
    { name: 'Vibrant Mexican', primary: '#E65100', secondary: '#F57C00', accent: '#FFE0B2', background: '#FFF3E0', text: '#3E2723' },
    { name: 'Mediterranean', primary: '#1565C0', secondary: '#1976D2', accent: '#BBDEFB', background: '#E3F2FD', text: '#0D47A1' },
    { name: 'Steakhouse', primary: '#5D4037', secondary: '#6D4C41', accent: '#D7CCC8', background: '#EFEBE9', text: '#3E2723' }
  ],
  fontOptions: [
    { name: 'Playfair Display', value: 'Playfair Display, serif', weight: '400,500,600,700' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif', weight: '400,500,600,700' },
    { name: 'Lora', value: 'Lora, serif', weight: '400,500,600,700' },
    { name: 'Oswald', value: 'Oswald, sans-serif', weight: '400,500,600,700' },
    { name: 'Cormorant Garamond', value: 'Cormorant Garamond, serif', weight: '400,500,600,700' }
  ],
  defaultColors: {
    primary: '#8B4513',
    secondary: '#A0522D',
    accent: '#FFD700',
    background: '#FFF8E1',
    text: '#3E2723',
    cardBg: '#FFFFFF',
    borderColor: '#D7CCC8',
    buttonBg: '#8B4513',
    buttonText: '#FFFFFF'
  },
  defaultFont: 'Playfair Display, serif',
  themeStyle: {
    layout: 'elegant-cards',
    headerStyle: 'cover-image',
    cardStyle: 'bordered',
    buttonStyle: 'rounded',
    iconStyle: 'simple',
    spacing: 'comfortable',
    shadows: 'soft',
    animations: 'fade',
    backgroundPattern: 'subtle-texture'
  },
  defaultData: {
    header: {
      name: 'La Bella Cucina',
      tagline: 'Authentic Italian Cuisine',
      cuisine_type: 'Italian',
      service_info: 'Open Daily • Dine-in • Takeout • Delivery',
      logo: '',
      cover_image: ''
    },
    about: {
      description: 'La Bella Cucina brings the authentic flavors of Italy to your table. Our recipes have been passed down through generations, using only the freshest ingredients and traditional cooking methods.',
      year_established: '2010',
      chef_name: 'Marco Rossi',
      ambiance: 'fine_dining'
    },
    contact: {
      phone: '+1 (555) 123-4567',
      email: 'info@labellacucina.com',
      website: 'https://www.labellacucina.com',
      address: '123 Pasta Lane\nItalian Quarter\nNew York, NY 10001'
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '17:00', close_time: '22:00', is_closed: false },
        { day: 'tuesday', open_time: '17:00', close_time: '22:00', is_closed: false },
        { day: 'wednesday', open_time: '17:00', close_time: '22:00', is_closed: false },
        { day: 'thursday', open_time: '17:00', close_time: '22:00', is_closed: false },
        { day: 'friday', open_time: '17:00', close_time: '23:00', is_closed: false },
        { day: 'saturday', open_time: '12:00', close_time: '23:00', is_closed: false },
        { day: 'sunday', open_time: '12:00', close_time: '21:00', is_closed: false }
      ]
    },
    menu_highlights: {
      menu_items: [
        { name: 'Bruschetta al Pomodoro', description: 'Toasted bread topped with fresh tomatoes, garlic, basil, and extra virgin olive oil', price: '$12', image: '', category: 'appetizer' },
        { name: 'Spaghetti Carbonara', description: 'Classic Roman pasta with pancetta, eggs, Pecorino Romano, and black pepper', price: '$22', image: '', category: 'main' },
        { name: 'Tiramisu', description: 'Traditional Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream', price: '$10', image: '', category: 'dessert' }
      ]
    },
    services: {
      service_list: [
        { title: 'Dine-In Service', description: 'Full-service dining experience with table service', price: '' },
        { title: 'Takeout & Delivery', description: 'Order online or by phone for pickup or delivery', price: '' },
        { title: 'Private Events', description: 'Host your special occasions in our private dining room', price: 'Starting at $500' },
        { title: 'Catering', description: 'Bring our authentic Italian cuisine to your event', price: 'Custom pricing' }
      ]
    },
    videos: {
      video_list: [
        { title: 'Chef Marco\'s Signature Carbonara', description: 'Watch our head chef prepare our famous spaghetti carbonara from scratch', video_type: 'chef_cooking', embed_url: '', thumbnail: '', duration: '6:30' },
        { title: 'Tour Our Beautiful Restaurant', description: 'Take a virtual tour of our elegant dining room and cozy atmosphere', video_type: 'restaurant_tour', embed_url: '', thumbnail: '', duration: '3:45' },
        { title: 'Customer Reviews - What They Say', description: 'Hear from our satisfied customers about their dining experience', video_type: 'customer_testimonial', embed_url: '', thumbnail: '', duration: '4:20' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/labellacucina',
      channel_name: 'La Bella Cucina',
      subscriber_count: '8.2K',
      featured_playlist: 'https://youtube.com/playlist?list=PLcookingvideos',
      latest_video_embed: '',
      channel_description: 'Authentic Italian cooking videos, restaurant tours, and culinary stories from La Bella Cucina. Subscribe for weekly cooking inspiration!'
    },
    gallery: {
      photos: [
        { image: '', caption: 'Our elegant dining room' },
        { image: '', caption: 'Chef\'s special pasta dish' },
        { image: '', caption: 'Outdoor patio seating' }
      ]
    },
    testimonials: {
      reviews: [
        { customer_name: 'John Smith', review: 'The best Italian food I\'ve had outside of Italy! The pasta is made fresh daily and the service is impeccable.', rating: '5', date: 'June 2023' },
        { customer_name: 'Maria Johnson', review: 'Authentic flavors that transported me back to my grandmother\'s kitchen in Tuscany. Highly recommended!', rating: '5', date: 'August 2023' }
      ]
    },
    social: {
      social_links: [
        { platform: 'facebook', url: 'https://facebook.com/labellacucina', username: 'labellacucina' },
        { platform: 'instagram', url: 'https://instagram.com/labellacucina', username: '@labellacucina' },
        { platform: 'yelp', url: 'https://yelp.com/biz/labellacucina', username: 'La Bella Cucina' },
        { platform: 'youtube', url: 'https://youtube.com/labellacucina', username: 'La Bella Cucina' }
      ]
    },
    appointments: {
      reservation_url: 'https://resy.com/labellacucina',
      reservation_phone: '+1 (555) 123-4567',
      min_party_size: '1',
      max_party_size: '12',
      reservation_notes: 'Reservations recommended for Friday and Saturday evenings. Special accommodations available for large parties with advance notice.'
    },
    google_map: {
      map_embed_url: '',
      directions_url: 'https://maps.google.com/directions'
    },
    app_download: {
      app_store_url: '#',
      play_store_url: '#',
      app_description: 'Download our app to make reservations, view our menu, and earn rewards with our loyalty program.'
    },
    contact_form: {
      form_title: 'Contact Us',
      form_description: 'Have questions or special requests? Send us a message and we\'ll get back to you as soon as possible.'
    },
    thank_you: {
      message: 'Thank you for your interest in La Bella Cucina. We look forward to serving you soon!'
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
      html_content: '<div class="custom-section"><h4>Chef\'s Special</h4><p>Try our signature dishes made with the finest ingredients and traditional recipes.</p></div>',
      section_title: 'Chef\'s Special',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Share Our Restaurant',
      qr_description: 'Scan this QR code to access our menu, make reservations, and get our contact information.',
      qr_size: 'medium'
    },
    language: {
      template_language: 'en'
    },
    copyright: {
      text: '© 2025 La Bella Cucina. All rights reserved.'
    }
  }
};