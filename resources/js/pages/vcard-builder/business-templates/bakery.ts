import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const bakeryTemplate = {
  name: 'Bakery',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Bakery Name' },
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
        { name: 'specialties', type: 'select', label: 'Specialties', options: [
          { value: 'artisan_bread', label: 'Artisan Bread' },
          { value: 'pastries', label: 'Pastries & Desserts' },
          { value: 'cakes', label: 'Custom Cakes' },
          { value: 'vegan', label: 'Vegan & Gluten-Free' },
          { value: 'traditional', label: 'Traditional Recipes' }
        ]}
      ],
      required: false
    },
    {
      key: 'featured_products',
      name: 'Featured Products',
      fields: [
        {
          name: 'categories',
          type: 'repeater',
          label: 'Product Categories',
          fields: [
            { name: 'value', type: 'text', label: 'Category ID' },
            { name: 'label', type: 'text', label: 'Category Name' }
          ]
        },
        {
          name: 'products',
          type: 'repeater',
          label: 'Products',
          fields: [
            { name: 'name', type: 'text', label: 'Product Name' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'price', type: 'text', label: 'Price' },
            { name: 'image', type: 'file', label: 'Product Image' },
            { name: 'category', type: 'select', label: 'Category', options: 'dynamic_categories' },
            { name: 'dietary_info', type: 'select', label: 'Dietary Info', options: [
              { value: 'vegetarian', label: 'Vegetarian' },
              { value: 'vegan', label: 'Vegan' },
              { value: 'gluten_free', label: 'Gluten-Free' },
              { value: 'dairy_free', label: 'Dairy-Free' },
              { value: 'nut_free', label: 'Nut-Free' },
              { value: 'none', label: 'None' }
            ]}
          ]
        }
      ],
      required: false
    },
    {
      key: 'videos',
      name: 'Bakery Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Baking Videos',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'baking_process', label: 'Baking Process' },
              { value: 'recipe_tutorial', label: 'Recipe Tutorial' },
              { value: 'behind_scenes', label: 'Behind the Scenes' },
              { value: 'product_showcase', label: 'Product Showcase' },
              { value: 'customer_stories', label: 'Customer Stories' },
              { value: 'seasonal_specials', label: 'Seasonal Specials' }
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
      key: 'daily_specials',
      name: 'Daily Specials',
      fields: [
        {
          name: 'specials',
          type: 'repeater',
          label: 'Daily Specials',
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
            { name: 'special_name', type: 'text', label: 'Special Name' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'price', type: 'text', label: 'Price' }
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
          label: 'Bakery Hours',
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
          label: 'Customer Reviews',
          fields: [
            { name: 'customer_name', type: 'text', label: 'Customer Name' },
            { name: 'review', type: 'textarea', label: 'Review Text' },
            { name: 'rating', type: 'number', label: 'Rating (1-5)' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'appointments',
      name: 'Order & Pickup',
      fields: [
        { name: 'booking_url', type: 'url', label: 'Online Order URL' },
        { name: 'reservation_text', type: 'text', label: 'Order Button Text' },
        { name: 'min_notice_hours', type: 'number', label: 'Minimum Notice Hours' },
        { name: 'special_orders_info', type: 'textarea', label: 'Special Orders Information' }
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
      key: 'catering',
      name: 'Catering Services',
      fields: [
        { name: 'catering_title', type: 'text', label: 'Catering Title' },
        { name: 'catering_description', type: 'textarea', label: 'Catering Description' },
        { name: 'min_order_amount', type: 'text', label: 'Minimum Order Amount' },
        { name: 'lead_time', type: 'text', label: 'Required Lead Time' },
        {
          name: 'catering_options',
          type: 'repeater',
          label: 'Catering Options',
          fields: [
            { name: 'option_name', type: 'text', label: 'Option Name' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'serves', type: 'text', label: 'Serves' },
            { name: 'price', type: 'text', label: 'Price' }
          ]
        }
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
    { name: 'Warm Bread', primary: '#D35400', secondary: '#E67E22', accent: '#FFF3E0', background: '#FFFFFF', text: '#3A3A3A' },
    { name: 'Sweet Pastry', primary: '#8E44AD', secondary: '#9B59B6', accent: '#F3E5F5', background: '#FFFFFF', text: '#2C3E50' },
    { name: 'Rustic Sourdough', primary: '#795548', secondary: '#A1887F', accent: '#EFEBE9', background: '#FFFBF5', text: '#3E2723' },
    { name: 'Fresh Mint', primary: '#009688', secondary: '#4DB6AC', accent: '#E0F2F1', background: '#FFFFFF', text: '#263238' },
    { name: 'Berry Tart', primary: '#C2185B', secondary: '#E91E63', accent: '#FCE4EC', background: '#FFFFFF', text: '#424242' },
    { name: 'Golden Crust', primary: '#F57F17', secondary: '#FFB300', accent: '#FFF8E1', background: '#FFFFFF', text: '#3E2723' }
  ],
  fontOptions: [
    { name: 'Playfair Display', value: 'Playfair Display, serif', weight: '400,500,600,700' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif', weight: '300,400,500,600,700' },
    { name: 'Lora', value: 'Lora, serif', weight: '400,500,600,700' },
    { name: 'Quicksand', value: 'Quicksand, sans-serif', weight: '300,400,500,600,700' },
    { name: 'Josefin Sans', value: 'Josefin Sans, sans-serif', weight: '300,400,500,600,700' }
  ],
  defaultColors: {
    primary: '#D35400',
    secondary: '#E67E22',
    accent: '#FFF3E0',
    background: '#FFFFFF',
    text: '#3A3A3A',
    cardBg: '#FFFBF5',
    borderColor: '#F5E0C8',
    buttonText: '#FFFFFF',
    highlightColor: '#FFB74D'
  },
  defaultFont: 'Montserrat, sans-serif',
  themeStyle: {
    layout: 'bakery-layout',
    headerStyle: 'banner',
    cardStyle: 'rounded',
    buttonStyle: 'rounded',
    iconStyle: 'simple',
    spacing: 'comfortable',
    shadows: 'soft',
    dividers: true
  },
  defaultData: {
    header: {
      name: 'Sweet Crumb Bakery',
      tagline: 'Artisanal breads, pastries, and cakes made fresh daily',
      logo: '',
      cover_image: ''
    },
    about: {
      description: 'Founded in 2018, Sweet Crumb Bakery is a family-owned artisanal bakery specializing in handcrafted breads, pastries, and custom cakes. We use only the finest ingredients, traditional techniques, and a lot of love to create delicious baked goods that bring joy to our community.',
      year_established: '2018',
      specialties: 'artisan_bread'
    },
    featured_products: {
      categories: [
        { value: 'bread', label: 'Bread' },
        { value: 'pastry', label: 'Pastries' },
        { value: 'cake', label: 'Cakes' },
        { value: 'cookie', label: 'Cookies' },
        { value: 'seasonal', label: 'Seasonal' },
        { value: 'specialty', label: 'Specialty' }
      ],
      products: [
        { name: 'Sourdough Bread', description: 'Our signature naturally leavened sourdough with a crisp crust and tender, tangy interior', price: '$7.50', image: '', category: 'bread', dietary_info: 'vegetarian' },
        { name: 'Chocolate Croissant', description: 'Buttery, flaky croissant filled with rich dark chocolate', price: '$4.25', image: '', category: 'pastry', dietary_info: 'vegetarian' },
        { name: 'Seasonal Fruit Tart', description: 'Buttery shortbread crust filled with vanilla custard and topped with fresh seasonal fruits', price: '$6.95', image: '', category: 'pastry', dietary_info: 'vegetarian' },
        { name: 'Cinnamon Rolls', description: 'Soft, fluffy rolls with cinnamon-sugar filling and cream cheese frosting', price: '$4.50', image: '', category: 'pastry', dietary_info: 'vegetarian' }
      ]
    },
    daily_specials: {
      specials: [
        { day: 'monday', special_name: 'Muffin Monday', description: 'Buy 3 muffins, get 1 free', price: 'Varies' },
        { day: 'wednesday', special_name: 'Whole Grain Wednesday', description: 'All whole grain breads 15% off', price: 'Varies' },
        { day: 'saturday', special_name: 'Weekend Brunch Box', description: 'Assortment of 6 pastries perfect for weekend brunch', price: '$24.95' }
      ]
    },
    contact: {
      email: 'hello@sweetcrumbbakery.com',
      phone: '(555) 123-4567',
      website: 'https://www.sweetcrumbbakery.com',
      address: '123 Main Street, Portland, OR 97201'
    },
    social: {
      social_links: [
        { platform: 'instagram', url: 'https://instagram.com/sweetcrumbbakery', username: '@sweetcrumbbakery' },
        { platform: 'facebook', url: 'https://facebook.com/sweetcrumbbakery', username: 'Sweet Crumb Bakery' },
        { platform: 'pinterest', url: 'https://pinterest.com/sweetcrumbbakery', username: 'Sweet Crumb Bakery' },
        { platform: 'youtube', url: 'https://youtube.com/sweetcrumbbakery', username: 'Sweet Crumb Bakery' }
      ]
    },
    videos: {
      video_list: [
        { title: 'How We Make Our Famous Sourdough', description: 'Watch our master baker create our signature sourdough from starter to finished loaf', video_type: 'baking_process', embed_url: '', thumbnail: '', duration: '12:45' },
        { title: 'Chocolate Croissant Recipe Tutorial', description: 'Learn the secrets behind our buttery, flaky chocolate croissants', video_type: 'recipe_tutorial', embed_url: '', thumbnail: '', duration: '18:30' },
        { title: 'A Day in Our Bakery', description: 'Behind-the-scenes look at our daily baking routine starting at 4 AM', video_type: 'behind_scenes', embed_url: '', thumbnail: '', duration: '8:15' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/sweetcrumbbakery',
      channel_name: 'Sweet Crumb Bakery',
      subscriber_count: '28.5K',
      featured_playlist: 'https://youtube.com/playlist?list=PLbakingbasics',
      latest_video_embed: '',
      channel_description: 'Join us in our kitchen for baking tutorials, behind-the-scenes content, and seasonal recipe inspiration from our artisan bakery.'
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '07:00', close_time: '18:00', is_closed: false },
        { day: 'tuesday', open_time: '07:00', close_time: '18:00', is_closed: false },
        { day: 'wednesday', open_time: '07:00', close_time: '18:00', is_closed: false },
        { day: 'thursday', open_time: '07:00', close_time: '18:00', is_closed: false },
        { day: 'friday', open_time: '07:00', close_time: '19:00', is_closed: false },
        { day: 'saturday', open_time: '07:00', close_time: '19:00', is_closed: false },
        { day: 'sunday', open_time: '08:00', close_time: '16:00', is_closed: false }
      ]
    },
    gallery: {
      photos: [
        { image: '', caption: 'Our fresh bread selection baked daily' },
        { image: '', caption: 'Handcrafted pastries and desserts' },
        { image: '', caption: 'Custom celebration cakes for any occasion' },
        { image: '', caption: 'Our cozy bakery interior' }
      ]
    },
    testimonials: {
      reviews: [
        { customer_name: 'Sarah M.', review: 'The best sourdough bread in town! I\'m completely addicted to their chocolate croissants too.', rating: '5' },
        { customer_name: 'Michael P.', review: 'Sweet Crumb made the most beautiful and delicious cake for my daughter\'s wedding. Highly recommend their custom cake service!', rating: '5' },
        { customer_name: 'Jessica T.', review: 'As someone with gluten sensitivity, I appreciate that they offer such delicious gluten-free options. The GF banana bread is amazing!', rating: '4' }
      ]
    },
    appointments: {
      booking_url: 'https://orders.sweetcrumbbakery.com',
      reservation_text: 'Order Online',
      min_notice_hours: '24',
      special_orders_info: 'Custom cake orders require at least 72 hours notice. For large orders or special dietary requests, please contact us directly.'
    },
    google_map: {
      map_embed_url: '',
      directions_url: 'https://maps.google.com/directions'
    },
    app_download: {
      app_store_url: '#',
      play_store_url: '#',
      app_description: 'Download our app to place orders for pickup, earn loyalty points, and receive exclusive offers and promotions.'
    },
    contact_form: {
      form_title: 'Contact Us',
      form_description: 'Questions about our products, catering services, or special orders? Send us a message and we\'ll get back to you as soon as possible.'
    },
    catering: {
      catering_title: 'Catering Services',
      catering_description: 'We offer catering for corporate events, meetings, parties, and special occasions. From breakfast pastry platters to dessert tables, we can create the perfect spread for your event.',
      min_order_amount: '$100',
      lead_time: '48 hours',
      catering_options: [
        { option_name: 'Breakfast Pastry Platter', description: 'Assortment of croissants, muffins, and scones', serves: '10-12 people', price: '$65' },
        { option_name: 'Cookie & Brownie Platter', description: 'Selection of our most popular cookies and brownies', serves: '15-20 people', price: '$55' },
        { option_name: 'Artisan Bread Basket', description: 'Variety of freshly baked breads with butter and spreads', serves: '10-15 people', price: '$45' }
      ]
    },
    thank_you: {
      message: 'Thank you for your interest in Sweet Crumb Bakery! We appreciate your support and look forward to serving you soon.'
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
      html_content: '<div class="bakery-special"><h4>Fresh Daily</h4><p>All our breads and pastries are baked fresh every morning using traditional techniques and the finest ingredients.</p></div>',
      section_title: 'Our Promise',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Share Our Bakery',
      qr_description: 'Scan to save our contact info and share our delicious baked goods with friends.',
      qr_size: 'medium'
    },
    language: {
      template_language: 'en'
    },
    footer: {
      show_footer: true,
      footer_text: 'Fresh baked daily with love. Custom orders available with advance notice. Follow us for daily specials.',
      footer_links: [
        { title: 'Custom Orders', url: '#' },
        { title: 'Catering Menu', url: '#' },
        { title: 'Allergen Info', url: '#' },
        { title: 'Baking Classes', url: '#' }
      ]
    },
    copyright: {
      text: '© 2025 Sweet Crumb Bakery. All rights reserved.'
    }
  }
};