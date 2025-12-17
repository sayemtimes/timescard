import { socialPlatformsConfig } from '../social-platforms-config';

export const chefCulinaryTemplate = {
  name: 'Chef & Culinary Artist',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Chef Name' },
        { name: 'title', type: 'text', label: 'Culinary Title' },
        { name: 'tagline', type: 'textarea', label: 'Culinary Philosophy' },
        { name: 'profile_image', type: 'file', label: 'Chef Photo' }
      ],
      required: true
    },
    {
      key: 'contact',
      name: 'Contact Information',
      fields: [
        { name: 'email', type: 'email', label: 'Email Address' },
        { name: 'phone', type: 'tel', label: 'Phone Number' },
        { name: 'website', type: 'url', label: 'Culinary Website' },
        { name: 'location', type: 'text', label: 'Kitchen Location' }
      ],
      required: true
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'Culinary Journey' },
        { name: 'specialties', type: 'tags', label: 'Cuisine Specialties' },
        { name: 'experience', type: 'number', label: 'Years in Kitchen' },
        { name: 'training', type: 'textarea', label: 'Culinary Training' }
      ],
      required: false
    },
    {
      key: 'signature_dishes',
      name: 'Signature Dishes',
      fields: [
        {
          name: 'dishes',
          type: 'repeater',
          label: 'Featured Dishes',
          fields: [
            { name: 'name', type: 'text', label: 'Dish Name' },
            { name: 'description', type: 'textarea', label: 'Dish Description' },
            { name: 'cuisine_type', type: 'select', label: 'Cuisine Type', options: [
              { value: 'french', label: 'French' },
              { value: 'italian', label: 'Italian' },
              { value: 'asian', label: 'Asian' },
              { value: 'mediterranean', label: 'Mediterranean' },
              { value: 'american', label: 'American' },
              { value: 'fusion', label: 'Fusion' },
              { value: 'dessert', label: 'Dessert' }
            ]},
            { name: 'image', type: 'file', label: 'Dish Photo' },
            { name: 'ingredients', type: 'textarea', label: 'Key Ingredients' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'videos',
      name: 'Culinary Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Cooking Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'recipe_tutorial', label: 'Recipe Tutorial' },
              { value: 'cooking_technique', label: 'Cooking Technique' },
              { value: 'ingredient_spotlight', label: 'Ingredient Spotlight' },
              { value: 'kitchen_tips', label: 'Kitchen Tips' },
              { value: 'behind_scenes', label: 'Behind the Scenes' },
              { value: 'client_event', label: 'Client Event' }
            ]},
            { name: 'embed_url', type: 'textarea', label: 'Video Embed URL' },
            { name: 'thumbnail', type: 'file', label: 'Video Thumbnail' },
            { name: 'duration', type: 'text', label: 'Duration' },
            { name: 'difficulty_level', type: 'select', label: 'Difficulty Level', options: [
              { value: 'beginner', label: 'Beginner' },
              { value: 'intermediate', label: 'Intermediate' },
              { value: 'advanced', label: 'Advanced' },
              { value: 'professional', label: 'Professional' }
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
      key: 'services',
      name: 'Services',
      fields: [
        {
          name: 'service_list',
          type: 'repeater',
          label: 'Culinary Services',
          fields: [
            { name: 'title', type: 'text', label: 'Service Name' },
            { name: 'description', type: 'textarea', label: 'Service Description' },
            { name: 'price_range', type: 'text', label: 'Price Range' },
            { name: 'duration', type: 'text', label: 'Service Duration' }
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
          label: 'Culinary Platforms',
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
          label: 'Kitchen Hours',
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
            { name: 'open_time', type: 'time', label: 'Kitchen Opens' },
            { name: 'close_time', type: 'time', label: 'Kitchen Closes' },
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
        { name: 'booking_note', type: 'textarea', label: 'Booking Instructions' }
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
            { name: 'event_type', type: 'text', label: 'Event/Service Type' }
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
      key: 'copyright',
      name: 'Copyright',
      fields: [
        { name: 'text', type: 'text', label: 'Copyright Text' }
      ],
      required: false
    }
  ],
  colorPresets: [
    { name: 'Warm Kitchen', primary: '#D2691E', secondary: '#CD853F', accent: '#F4A460', background: '#FFF8DC', text: '#8B4513', cardBg: '#FFFFFF' },
    { name: 'Fresh Herbs', primary: '#228B22', secondary: '#32CD32', accent: '#ADFF2F', background: '#F0FFF0', text: '#006400', cardBg: '#FFFFFF' },
    { name: 'Spice Market', primary: '#FF6347', secondary: '#FF7F50', accent: '#FFD700', background: '#FFF5EE', text: '#8B0000', cardBg: '#FFFFFF' },
    { name: 'Ocean Catch', primary: '#4682B4', secondary: '#87CEEB', accent: '#F0E68C', background: '#F0F8FF', text: '#191970', cardBg: '#FFFFFF' },
    { name: 'Wine & Dine', primary: '#800080', secondary: '#DA70D6', accent: '#FFB6C1', background: '#FDF5E6', text: '#4B0082', cardBg: '#FFFFFF' }
  ],
  fontOptions: [
    { name: 'Playfair Display', value: 'Playfair Display, Georgia, serif', weight: '400,500,600,700' },
    { name: 'Cormorant Garamond', value: 'Cormorant Garamond, Georgia, serif', weight: '400,500,600,700' },
    { name: 'Crimson Text', value: 'Crimson Text, Georgia, serif', weight: '400,600,700' },
    { name: 'Libre Baskerville', value: 'Libre Baskerville, Georgia, serif', weight: '400,700' },
    { name: 'Lora', value: 'Lora, Georgia, serif', weight: '400,500,600,700' }
  ],
  defaultColors: {
    primary: '#D2691E',
    secondary: '#CD853F',
    accent: '#F4A460',
    background: '#FFF8DC',
    text: '#8B4513',
    cardBg: '#FFFFFF',
    borderColor: '#DEB887',
    shadowColor: 'rgba(210, 105, 30, 0.2)'
  },
  defaultFont: 'Playfair Display, Georgia, serif',
  themeStyle: {
    layout: 'recipe-card',
    headerStyle: 'chef-portrait',
    cardStyle: 'ingredient-cards',
    buttonStyle: 'recipe-buttons',
    iconStyle: 'culinary',
    spacing: 'kitchen-flow',
    shadows: 'warm-glow',
    animations: 'sizzle-effects',
    backgroundPattern: 'kitchen-tiles',
    typography: 'elegant-serif'
  },
  defaultData: {
    header: {
      name: 'Isabella Romano',
      title: 'Executive Chef & Culinary Artist',
      tagline: 'Creating extraordinary culinary experiences that tell stories through flavor, tradition, and innovation',
      profile_image: ''
    },
    contact: {
      email: 'chef@isabellaromano.com',
      phone: '+1 (555) 678-9012',
      website: 'https://isabellaromano.com',
      location: 'New York, NY'
    },
    about: {
      description: 'Award-winning chef with 15+ years of culinary expertise, specializing in modern Italian cuisine with Mediterranean influences. Passionate about farm-to-table cooking and creating memorable dining experiences.',
      specialties: 'Italian, Mediterranean, Farm-to-Table, Molecular Gastronomy, Pastry Arts',
      experience: '15',
      training: 'Culinary Institute of America, Stage at Michelin-starred restaurants in Italy and France'
    },
    signature_dishes: {
      dishes: [
        { name: 'Truffle Risotto al Parmigiano', description: 'Creamy Arborio rice with black truffle, aged Parmigiano-Reggiano, and fresh herbs', cuisine_type: 'italian', image: '', ingredients: 'Arborio rice, black truffle, Parmigiano-Reggiano, white wine, vegetable stock' },
        { name: 'Mediterranean Sea Bass', description: 'Pan-seared sea bass with olive tapenade, roasted vegetables, and lemon herb sauce', cuisine_type: 'mediterranean', image: '', ingredients: 'Fresh sea bass, Kalamata olives, cherry tomatoes, fresh herbs, extra virgin olive oil' },
        { name: 'Deconstructed Tiramisu', description: 'Modern interpretation of classic tiramisu with espresso caviar and mascarpone mousse', cuisine_type: 'dessert', image: '', ingredients: 'Mascarpone, espresso, ladyfingers, cocoa, molecular gastronomy elements' }
      ]
    },
    services: {
      service_list: [
        { title: 'Private Chef Services', description: 'Intimate dining experiences in your home with personalized menus', price_range: '$200-500 per person', duration: '3-4 hours' },
        { title: 'Culinary Classes', description: 'Hands-on cooking classes for individuals and groups', price_range: '$150-300 per person', duration: '2-3 hours' },
        { title: 'Event Catering', description: 'Full-service catering for special events and celebrations', price_range: '$75-150 per person', duration: 'Full event' },
        { title: 'Menu Development', description: 'Custom menu creation and recipe development for restaurants', price_range: '$2,000-10,000', duration: '2-4 weeks' }
      ]
    },
    social: {
      social_links: [
        { platform: 'instagram', url: 'https://instagram.com/chefisabellaromano', username: '@chefisabellaromano' },
        { platform: 'youtube', url: 'https://youtube.com/chefisabella', username: 'Chef Isabella Romano' },
        { platform: 'tiktok', url: 'https://tiktok.com/@chefisabella', username: '@chefisabella' }
      ]
    },
    videos: {
      video_list: [
        { title: 'Perfect Risotto Technique', description: 'Master the art of making creamy, restaurant-quality risotto at home', video_type: 'recipe_tutorial', embed_url: '', thumbnail: '', duration: '18:45', difficulty_level: 'intermediate' },
        { title: 'Knife Skills Masterclass', description: 'Essential knife techniques every home cook should know', video_type: 'cooking_technique', embed_url: '', thumbnail: '', duration: '12:30', difficulty_level: 'beginner' },
        { title: 'Truffle Season: Black Gold in the Kitchen', description: 'Everything you need to know about selecting and using fresh truffles', video_type: 'ingredient_spotlight', embed_url: '', thumbnail: '', duration: '8:15', difficulty_level: 'advanced' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/chefisabella',
      channel_name: 'Chef Isabella Romano',
      subscriber_count: '245K',
      featured_playlist: 'https://youtube.com/playlist?list=PLitalianclassics',
      latest_video_embed: '',
      channel_description: 'Professional cooking tutorials, culinary techniques, and behind-the-scenes content from an award-winning chef. Learn to cook like a pro!'
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '10:00', close_time: '18:00', is_closed: false },
        { day: 'tuesday', open_time: '10:00', close_time: '18:00', is_closed: false },
        { day: 'wednesday', open_time: '10:00', close_time: '18:00', is_closed: false },
        { day: 'thursday', open_time: '10:00', close_time: '18:00', is_closed: false },
        { day: 'friday', open_time: '10:00', close_time: '20:00', is_closed: false },
        { day: 'saturday', open_time: '09:00', close_time: '20:00', is_closed: false },
        { day: 'sunday', open_time: '', close_time: '', is_closed: true }
      ]
    },
    appointments: {
      booking_url: 'https://calendly.com/chefisabella',
      calendar_link: 'https://calendar.google.com/chefisabella',
      booking_note: 'Please book at least 48 hours in advance. Dietary restrictions and preferences can be discussed during consultation.'
    },
    testimonials: {
      reviews: [
        { client_name: 'Sarah Mitchell', review: 'Isabella created the most incredible anniversary dinner for us. Every dish was a masterpiece, and the presentation was absolutely stunning!', rating: '5', event_type: 'Private Dinner' },
        { client_name: 'David Chen', review: 'The cooking class was amazing! Isabella is not only an incredible chef but also a wonderful teacher. Learned techniques I\'ll use forever.', rating: '5', event_type: 'Cooking Class' }
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
      form_title: 'Let\'s Create Something Delicious',
      form_description: 'Ready to embark on a culinary journey? Share your vision and let\'s create an unforgettable dining experience together.'
    },
    thank_you: {
      message: 'Grazie! Thank you for your interest. I\'ll get back to you within 24 hours to discuss your culinary needs and create something extraordinary together.'
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
    copyright: {
      text: '© 2025 Isabella Romano Culinary Arts. All rights reserved.'
    }
  }
};