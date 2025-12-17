import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const foodDeliveryTemplate = {
  name: 'Food Delivery & Catering',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Business Name' },
        { name: 'title', type: 'text', label: 'Service Type' },
        { name: 'tagline', type: 'textarea', label: 'Tagline' },
        { name: 'profile_image', type: 'file', label: 'Logo' },
        { name: 'badge_1', type: 'text', label: 'Badge 1 Text' },
        { name: 'badge_2', type: 'text', label: 'Badge 2 Text' }
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
        { name: 'location', type: 'text', label: 'Service Area' }
      ],
      required: true
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'About Our Service' },
        { name: 'specialties', type: 'tags', label: 'Cuisine Types' },
        { name: 'experience', type: 'number', label: 'Years in Business' }
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
          label: 'Food Services',
          fields: [
            { name: 'title', type: 'text', label: 'Service Name' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'price', type: 'text', label: 'Starting Price' },
            { name: 'min_order', type: 'text', label: 'Minimum Order' }
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
          name: 'dishes',
          type: 'repeater',
          label: 'Popular Dishes',
          fields: [
            { name: 'name', type: 'text', label: 'Dish Name' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'price', type: 'text', label: 'Price' },
            { name: 'category', type: 'text', label: 'Category' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'videos',
      name: 'Food Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Food Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'food_preparation', label: 'Food Preparation' },
              { value: 'menu_showcase', label: 'Menu Showcase' },
              { value: 'behind_kitchen', label: 'Behind the Kitchen' },
              { value: 'delivery_process', label: 'Delivery Process' },
              { value: 'customer_review', label: 'Customer Review' },
              { value: 'chef_special', label: 'Chef Special' }
            ]},
            { name: 'embed_url', type: 'textarea', label: 'Video Embed URL' },
            { name: 'thumbnail', type: 'file', label: 'Video Thumbnail' },
            { name: 'duration', type: 'text', label: 'Duration' },
            { name: 'cuisine_type', type: 'text', label: 'Cuisine Type' }
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
      key: 'delivery_info',
      name: 'Delivery Information',
      fields: [
        { name: 'delivery_fee', type: 'text', label: 'Delivery Fee' },
        { name: 'free_delivery_min', type: 'text', label: 'Free Delivery Minimum' },
        { name: 'delivery_time', type: 'text', label: 'Delivery Time' },
        { name: 'delivery_radius', type: 'text', label: 'Delivery Radius' }
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
            { name: 'url', type: 'url', label: 'Profile URL' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'business_hours',
      name: 'Operating Hours',
      fields: [
        {
          name: 'hours',
          type: 'repeater',
          label: 'Service Hours',
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
      name: 'Order & Catering',
      fields: [
        { name: 'order_url', type: 'url', label: 'Online Ordering URL' },
        { name: 'catering_phone', type: 'tel', label: 'Catering Phone' }
      ],
      required: false
    },
    {
      key: 'testimonials',
      name: 'Customer Reviews',
      fields: [
        {
          name: 'reviews',
          type: 'repeater',
          label: 'Customer Reviews',
          fields: [
            { name: 'client_name', type: 'text', label: 'Customer Name' },
            { name: 'review', type: 'textarea', label: 'Review Text' },
            { name: 'rating', type: 'number', label: 'Rating (1-5)' },
            { name: 'order_type', type: 'text', label: 'Order Type' }
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
    { name: 'Spicy Red', primary: '#DC2626', secondary: '#EF4444', accent: '#FEE2E2', background: '#FFFBFA', text: '#1F2937', cardBg: '#FFFFFF' },
    { name: 'Fresh Green', primary: '#059669', secondary: '#10B981', accent: '#D1FAE5', background: '#F0FDF4', text: '#1F2937', cardBg: '#FFFFFF' },
    { name: 'Golden Yellow', primary: '#D97706', secondary: '#F59E0B', accent: '#FEF3C7', background: '#FFFBEB', text: '#1F2937', cardBg: '#FFFFFF' },
    { name: 'Pizza Orange', primary: '#EA580C', secondary: '#FB923C', accent: '#FED7AA', background: '#FFF7ED', text: '#1F2937', cardBg: '#FFFFFF' },
    { name: 'Berry Purple', primary: '#7C3AED', secondary: '#8B5CF6', accent: '#E0E7FF', background: '#F8FAFC', text: '#1F2937', cardBg: '#FFFFFF' },
    { name: 'Chocolate Brown', primary: '#92400E', secondary: '#B45309', accent: '#FDE68A', background: '#FFFBEB', text: '#1F2937', cardBg: '#FFFFFF' }
  ],
  fontOptions: [
    { name: 'Poppins', value: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'Nunito', value: 'Nunito, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,600,700' },
    { name: 'Open Sans', value: 'Open Sans, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,600,700' },
    { name: 'Roboto', value: 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,700' },
    { name: 'Lato', value: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,700' }
  ],
  defaultColors: {
    primary: '#DC2626',
    secondary: '#EF4444',
    accent: '#FEE2E2',
    background: '#FFFBFA',
    text: '#1F2937',
    cardBg: '#FFFFFF',
    borderColor: '#FCA5A5'
  },
  defaultFont: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif',
  themeStyle: {
    layout: 'food-focused',
    headerStyle: 'appetizing',
    cardStyle: 'warm',
    buttonStyle: 'rounded',
    iconStyle: 'filled',
    spacing: 'comfortable',
    shadows: 'warm',
    animations: 'smooth'
  },
  defaultData: {
    header: {
      name: 'Tasty Bites Delivery',
      title: 'Fresh Food Delivered Fast',
      tagline: 'Delicious meals delivered to your doorstep in 30 minutes or less',
      profile_image: '',
      badge_1: 'Fast Delivery',
      badge_2: 'Fresh Made'
    },
    contact: {
      email: 'orders@tastybites.com',
      phone: '+1 (555) FOOD-NOW',
      website: 'https://tastybites.com',
      location: 'Downtown & Suburbs'
    },
    about: {
      description: 'We specialize in fresh, high-quality food delivery and catering services. From quick lunch deliveries to large event catering, we bring delicious food right to you.',
      specialties: 'Italian, Asian, American, Mexican, Mediterranean, Healthy Options',
      experience: '5'
    },
    services: {
      service_list: [
        { title: 'Food Delivery', description: 'Hot, fresh meals delivered to your location', price: 'From $12.99', min_order: '$25' },
        { title: 'Corporate Catering', description: 'Office lunch and meeting catering', price: 'From $8/person', min_order: '10 people' },
        { title: 'Event Catering', description: 'Full-service catering for special events', price: 'From $15/person', min_order: '20 people' },
        { title: 'Meal Prep', description: 'Weekly healthy meal preparation service', price: 'From $45/week', min_order: '5 meals' }
      ]
    },
    menu_highlights: {
      dishes: [
        { name: 'Signature Burger', description: 'Juicy beef patty with special sauce and fresh toppings', price: '$14.99', category: 'American' },
        { name: 'Chicken Pad Thai', description: 'Authentic Thai noodles with chicken and peanut sauce', price: '$13.99', category: 'Asian' },
        { name: 'Margherita Pizza', description: 'Fresh mozzarella, basil, and tomato sauce on crispy crust', price: '$16.99', category: 'Italian' },
        { name: 'Caesar Salad Bowl', description: 'Crisp romaine, parmesan, croutons with grilled chicken', price: '$11.99', category: 'Healthy' }
      ]
    },
    delivery_info: {
      delivery_fee: '$3.99',
      free_delivery_min: '$35',
      delivery_time: '25-35 minutes',
      delivery_radius: '5 miles'
    },
    social: {
      social_links: [
        { platform: 'instagram', url: 'https://instagram.com/tastybites' },
        { platform: 'facebook', url: 'https://facebook.com/tastybites' },
        { platform: 'yelp', url: 'https://yelp.com/tastybites' },
        { platform: 'youtube', url: 'https://youtube.com/tastybites' }
      ]
    },
    videos: {
      video_list: [
        { title: 'How We Make Our Signature Burger', description: 'Watch our chefs prepare our most popular burger from scratch', video_type: 'food_preparation', embed_url: '', thumbnail: '', duration: '4:30', cuisine_type: 'American' },
        { title: 'Fresh Pad Thai Cooking Process', description: 'Authentic Thai cooking techniques for our delicious Pad Thai', video_type: 'chef_special', embed_url: '', thumbnail: '', duration: '6:15', cuisine_type: 'Asian' },
        { title: 'From Kitchen to Your Door in 30 Minutes', description: 'See how we ensure fast, hot delivery every time', video_type: 'delivery_process', embed_url: '', thumbnail: '', duration: '3:45', cuisine_type: 'General' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/tastybites',
      channel_name: 'Tasty Bites Delivery',
      subscriber_count: '21.6K',
      featured_playlist: 'https://youtube.com/playlist?list=PLcookingvideos',
      latest_video_embed: '',
      channel_description: 'Delicious food preparation videos, cooking tips, and behind-the-scenes content from your favorite food delivery service.'
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '11:00', close_time: '22:00', is_closed: false },
        { day: 'tuesday', open_time: '11:00', close_time: '22:00', is_closed: false },
        { day: 'wednesday', open_time: '11:00', close_time: '22:00', is_closed: false },
        { day: 'thursday', open_time: '11:00', close_time: '22:00', is_closed: false },
        { day: 'friday', open_time: '11:00', close_time: '23:00', is_closed: false },
        { day: 'saturday', open_time: '10:00', close_time: '23:00', is_closed: false },
        { day: 'sunday', open_time: '12:00', close_time: '21:00', is_closed: false }
      ]
    },
    appointments: {
      order_url: 'https://tastybites.com/order',
      catering_phone: '+1 (555) CATER-ME'
    },
    testimonials: {
      reviews: [
        { client_name: 'Jennifer Lee', review: 'Always fresh and delivered on time! The pad thai is amazing and arrives hot every time.', rating: '5', order_type: 'Delivery' },
        { client_name: 'Mark Thompson', review: 'Great catering service for our office meetings. Professional setup and delicious food.', rating: '5', order_type: 'Corporate Catering' },
        { client_name: 'Sarah Johnson', review: 'Love the meal prep service! Healthy, tasty meals that save me so much time during the week.', rating: '5', order_type: 'Meal Prep' }
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
      form_title: 'Get a Catering Quote',
      form_description: 'Planning an event? Contact us for a custom catering quote tailored to your needs.'
    },
    thank_you: {
      message: 'Thank you for choosing Tasty Bites! We\'ll contact you within 2 hours to confirm your order or quote.'
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
      html_content: '<div class="custom-section"><h4>Special Offers</h4><p>Check out our daily specials and combo deals!</p></div>',
      section_title: 'Daily Specials',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Share Our Menu',
      qr_description: 'Scan this QR code to share our delicious menu with friends and family.',
      qr_size: 'medium'
    },
    language: {
      template_language: 'en'
    },
    copyright: {
      text: '© 2025 Tasty Bites Delivery. All rights reserved.'
    }
  }
};