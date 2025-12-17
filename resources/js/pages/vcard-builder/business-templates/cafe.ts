import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const cafeTemplate = {
  name: 'Cafe',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Cafe Name' },
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
        { name: 'atmosphere', type: 'select', label: 'Atmosphere', options: [
          { value: 'cozy', label: 'Cozy & Intimate' },
          { value: 'modern', label: 'Modern & Sleek' },
          { value: 'rustic', label: 'Rustic & Warm' },
          { value: 'vintage', label: 'Vintage & Retro' },
          { value: 'artsy', label: 'Artistic & Creative' }
        ]}
      ],
      required: false
    },
    {
      key: 'menu_highlights',
      name: 'Menu Highlights',
      fields: [
        {
          name: 'categories',
          type: 'repeater',
          label: 'Menu Categories',
          fields: [
            { name: 'value', type: 'text', label: 'Category ID' },
            { name: 'label', type: 'text', label: 'Category Name' }
          ]
        },
        {
          name: 'items',
          type: 'repeater',
          label: 'Menu Items',
          fields: [
            { name: 'name', type: 'text', label: 'Item Name' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'price', type: 'text', label: 'Price' },
            { name: 'image', type: 'file', label: 'Item Image' },
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
      name: 'Cafe Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Cafe Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'coffee_brewing', label: 'Coffee Brewing' },
              { value: 'latte_art', label: 'Latte Art' },
              { value: 'cafe_atmosphere', label: 'Cafe Atmosphere' },
              { value: 'food_preparation', label: 'Food Preparation' },
              { value: 'customer_stories', label: 'Customer Stories' },
              { value: 'behind_scenes', label: 'Behind the Scenes' }
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
      key: 'specials',
      name: 'Daily Specials',
      fields: [
        {
          name: 'daily_specials',
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
          label: 'Cafe Hours',
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
      name: 'Reservations',
      fields: [
        { name: 'booking_url', type: 'url', label: 'Reservation URL' },
        { name: 'reservation_text', type: 'text', label: 'Reservation Button Text' },
        { name: 'min_party_size', type: 'number', label: 'Minimum Party Size' },
        { name: 'max_party_size', type: 'number', label: 'Maximum Party Size' }
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
        { name: 'html_content', type: 'textarea', label: 'HTML Content' },
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
        { name: 'qr_description', type: 'textarea', label: 'QR Description' }
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
    { name: 'Coffee Brown', primary: '#6F4E37', secondary: '#A67C52', accent: '#F5EEE6', background: '#FFFFFF', text: '#3A3A3A' },
    { name: 'Espresso Dark', primary: '#362417', secondary: '#5D4037', accent: '#D7CCC8', background: '#FFFFFF', text: '#212121' },
    { name: 'Latte Cream', primary: '#C9A66B', secondary: '#D4B483', accent: '#FFF8E1', background: '#FFFBF5', text: '#5D4037' },
    { name: 'Mint Mocha', primary: '#00796B', secondary: '#26A69A', accent: '#E0F2F1', background: '#FFFFFF', text: '#263238' },
    { name: 'Berry Blend', primary: '#AD1457', secondary: '#D81B60', accent: '#FCE4EC', background: '#FFFFFF', text: '#424242' },
    { name: 'Caramel Gold', primary: '#E65100', secondary: '#F57C00', accent: '#FFF3E0', background: '#FFFFFF', text: '#3E2723' }
  ],
  fontOptions: [
    { name: 'Playfair Display', value: 'Playfair Display, serif', weight: '400,500,600,700' },
    { name: 'Poppins', value: 'Poppins, sans-serif', weight: '300,400,500,600,700' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif', weight: '300,400,500,600,700' },
    { name: 'Josefin Sans', value: 'Josefin Sans, sans-serif', weight: '300,400,500,600,700' },
    { name: 'Quicksand', value: 'Quicksand, sans-serif', weight: '300,400,500,600,700' }
  ],
  defaultColors: {
    primary: '#6F4E37',
    secondary: '#A67C52',
    accent: '#F5EEE6',
    background: '#FFFFFF',
    text: '#3A3A3A',
    cardBg: '#FFFBF5',
    borderColor: '#E8E0D8',
    buttonText: '#FFFFFF',
    highlightColor: '#C9A66B'
  },
  defaultFont: 'Poppins, sans-serif',
  themeStyle: {
    layout: 'cafe-layout',
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
      name: 'Brew & Bean Cafe',
      tagline: 'Artisanal coffee and homemade treats in a cozy atmosphere',
      logo: '',
      cover_image: ''
    },
    about: {
      description: 'Established in 2015, Brew & Bean is a neighborhood cafe committed to serving exceptional coffee sourced from sustainable farms around the world. Our pastries and light meals are made fresh daily using locally-sourced ingredients.',
      year_established: '2015',
      atmosphere: 'cozy'
    },
    menu_highlights: {
      categories: [
        { value: 'coffee', label: 'Coffee' },
        { value: 'tea', label: 'Tea' },
        { value: 'pastry', label: 'Pastries' },
        { value: 'breakfast', label: 'Breakfast' },
        { value: 'lunch', label: 'Lunch' },
        { value: 'dessert', label: 'Desserts' },
        { value: 'specialty', label: 'Specialty' }
      ],
      items: [
        { name: 'House Blend Coffee', description: 'Our signature medium roast with notes of chocolate and caramel', price: '$3.50', image: '', category: 'coffee', dietary_info: 'none' },
        { name: 'Avocado Toast', description: 'Sourdough bread topped with smashed avocado, cherry tomatoes, and microgreens', price: '$8.95', image: '', category: 'breakfast', dietary_info: 'vegetarian' },
        { name: 'Blueberry Scone', description: 'Buttery scone filled with fresh blueberries and topped with lemon glaze', price: '$4.25', image: '', category: 'pastry', dietary_info: 'vegetarian' },
        { name: 'Chai Latte', description: 'Black tea infused with cinnamon, cardamom, and other warming spices', price: '$4.75', image: '', category: 'tea', dietary_info: 'none' }
      ]
    },
    specials: {
      daily_specials: [
        { day: 'monday', special_name: 'Muffin Monday', description: 'Buy any coffee, get a muffin half price', price: 'Varies' },
        { day: 'wednesday', special_name: 'Waffle Wednesday', description: 'Belgian waffles with your choice of toppings', price: '$7.95' },
        { day: 'friday', special_name: 'Latte Happy Hour', description: '20% off all specialty lattes from 3-5pm', price: 'Varies' }
      ]
    },
    contact: {
      email: 'hello@brewandbean.com',
      phone: '(555) 123-4567',
      website: 'https://www.brewandbean.com',
      address: '123 Coffee Lane, Portland, OR 97201'
    },
    social: {
      social_links: [
        { platform: 'instagram', url: 'https://instagram.com/brewandbean', username: '@brewandbean' },
        { platform: 'facebook', url: 'https://facebook.com/brewandbean', username: 'Brew & Bean Cafe' },
        { platform: 'yelp', url: 'https://yelp.com/biz/brew-and-bean', username: 'Brew & Bean Cafe' },
        { platform: 'youtube', url: 'https://youtube.com/brewandbean', username: 'Brew & Bean Cafe' }
      ]
    },
    videos: {
      video_list: [
        { title: 'Perfect Pour-Over Coffee Tutorial', description: 'Learn how our baristas create the perfect pour-over coffee using our house blend', video_type: 'coffee_brewing', embed_url: '', thumbnail: '', duration: '6:30' },
        { title: 'Latte Art Masterclass', description: 'Watch our head barista create beautiful latte art designs', video_type: 'latte_art', embed_url: '', thumbnail: '', duration: '4:45' },
        { title: 'A Day at Brew & Bean', description: 'Experience the cozy atmosphere and community spirit of our neighborhood cafe', video_type: 'cafe_atmosphere', embed_url: '', thumbnail: '', duration: '3:20' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/brewandbean',
      channel_name: 'Brew & Bean Cafe',
      subscriber_count: '8.2K',
      featured_playlist: 'https://youtube.com/playlist?list=PLcoffeetutorials',
      latest_video_embed: '',
      channel_description: 'Coffee tutorials, cafe culture, and behind-the-scenes content from your favorite neighborhood coffee shop.'
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '07:00', close_time: '19:00', is_closed: false },
        { day: 'tuesday', open_time: '07:00', close_time: '19:00', is_closed: false },
        { day: 'wednesday', open_time: '07:00', close_time: '19:00', is_closed: false },
        { day: 'thursday', open_time: '07:00', close_time: '19:00', is_closed: false },
        { day: 'friday', open_time: '07:00', close_time: '21:00', is_closed: false },
        { day: 'saturday', open_time: '08:00', close_time: '21:00', is_closed: false },
        { day: 'sunday', open_time: '08:00', close_time: '17:00', is_closed: false }
      ]
    },
    gallery: {
      photos: [
        { image: '', caption: 'Our cozy interior with plenty of seating' },
        { image: '', caption: 'Barista preparing our signature latte art' },
        { image: '', caption: 'Fresh pastries baked daily' },
        { image: '', caption: 'Outdoor patio seating' }
      ]
    },
    testimonials: {
      reviews: [
        { customer_name: 'Emily R.', review: 'My favorite spot for morning coffee! The atmosphere is so inviting and the staff always remembers my order.', rating: '5' },
        { customer_name: 'Michael T.', review: 'Great place to work remotely. Fast wifi, plenty of outlets, and the coffee keeps me going all day.', rating: '5' },
        { customer_name: 'Sarah L.', review: 'Their avocado toast and chai latte combo is my weekend treat. Never disappoints!', rating: '4' }
      ]
    },
    appointments: {
      booking_url: 'https://reservations.brewandbean.com',
      reservation_text: 'Reserve a Table',
      min_party_size: '2',
      max_party_size: '8'
    },
    google_map: {
      map_embed_url: '',
      directions_url: 'https://maps.google.com/directions'
    },
    app_download: {
      app_store_url: '#',
      play_store_url: '#',
      app_description: 'Download our app to order ahead, collect loyalty points, and receive exclusive offers.'
    },
    contact_form: {
      form_title: 'Get in Touch',
      form_description: 'Questions, comments, or catering inquiries? Send us a message and we will get back to you soon.'
    },
    custom_html: {
      html_content: '<h3>Welcome to Our Cafe</h3><p>Experience the perfect blend of artisanal coffee and cozy atmosphere. Our skilled baristas craft each cup with passion and precision.</p>',
      section_title: 'Special Features',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Share Our Cafe',
      qr_description: 'Scan to share our cafe with friends and family'
    },
    language: {
      template_language: 'en'
    },
    thank_you: {
      message: 'Thank you for your message! We will respond within 24 hours. In the meantime, we hope to see you at the cafe soon.'
    },
    seo: {
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
    footer: {
      show_footer: true,
      footer_text: 'Visit us for the best coffee experience in town. Follow us on social media for daily specials and updates.',
      footer_links: [
        { title: 'Privacy Policy', url: '#' },
        { title: 'Terms of Service', url: '#' },
        { title: 'Contact Us', url: '#' }
      ]
    },
    copyright: {
      text: '© 2025 Brew & Bean Cafe. All rights reserved.'
    }
  }
};