import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const ecommerceTemplate = {
  name: 'E-commerce Store',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Store Name' },
        { name: 'tagline', type: 'textarea', label: 'Tagline' },
        { name: 'logo', type: 'file', label: 'Logo' }
      ],
      required: true
    },
    {
      key: 'featured',
      name: 'Featured Banner',
      fields: [
        { name: 'title', type: 'text', label: 'Banner Title' },
        { name: 'subtitle', type: 'text', label: 'Banner Subtitle' },
        { name: 'image', type: 'file', label: 'Banner Image' },
        { name: 'button_text', type: 'text', label: 'Button Text' },
        { name: 'button_url', type: 'url', label: 'Button URL' }
      ],
      required: false
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'About Us' },
        { name: 'year_established', type: 'number', label: 'Year Established' }
      ],
      required: false
    },
    {
      key: 'categories',
      name: 'Product Categories',
      fields: [
        {
          name: 'category_list',
          type: 'repeater',
          label: 'Categories',
          fields: [
            { name: 'title', type: 'text', label: 'Category Name' },
            { name: 'image', type: 'file', label: 'Category Image' },
            { name: 'url', type: 'url', label: 'Category URL' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'products',
      name: 'Featured Products',
      fields: [
        {
          name: 'product_list',
          type: 'repeater',
          label: 'Products',
          fields: [
            { name: 'title', type: 'text', label: 'Product Name' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'price', type: 'text', label: 'Price' },
            { name: 'sale_price', type: 'text', label: 'Sale Price (optional)' },
            { name: 'image', type: 'file', label: 'Product Image' },
            { name: 'url', type: 'url', label: 'Product URL' },
            { name: 'category', type: 'text', label: 'Category' },
            { name: 'badge', type: 'select', label: 'Badge', options: [
              { value: 'new', label: 'New' },
              { value: 'sale', label: 'Sale' },
              { value: 'bestseller', label: 'Best Seller' },
              { value: 'limited', label: 'Limited Edition' },
              { value: 'none', label: 'None' }
            ]}
          ]
        }
      ],
      required: false
    },
    {
      key: 'videos',
      name: 'Product Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Product & Brand Videos',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'product_demo', label: 'Product Demonstration' },
              { value: 'unboxing', label: 'Unboxing Experience' },
              { value: 'how_to_use', label: 'How to Use' },
              { value: 'customer_review', label: 'Customer Review' },
              { value: 'brand_story', label: 'Brand Story' },
              { value: 'behind_scenes', label: 'Behind the Scenes' }
            ]},
            { name: 'embed_url', type: 'textarea', label: 'Video Embed URL' },
            { name: 'thumbnail', type: 'file', label: 'Video Thumbnail' },
            { name: 'duration', type: 'text', label: 'Duration' },
            { name: 'product_category', type: 'text', label: 'Product Category' }
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
      key: 'benefits',
      name: 'Shopping Benefits',
      fields: [
        {
          name: 'benefit_list',
          type: 'repeater',
          label: 'Benefits',
          fields: [
            { name: 'title', type: 'text', label: 'Benefit Title' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'icon', type: 'select', label: 'Icon', options: [
              { value: 'shipping', label: 'Free Shipping' },
              { value: 'returns', label: 'Easy Returns' },
              { value: 'secure', label: 'Secure Checkout' },
              { value: 'support', label: 'Customer Support' },
              { value: 'quality', label: 'Quality Guarantee' },
              { value: 'discount', label: 'Discounts' }
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
        { name: 'address', type: 'text', label: 'Address (if applicable)' }
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
      name: 'Customer Service Hours',
      fields: [
        {
          name: 'hours',
          type: 'repeater',
          label: 'Hours',
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
            { name: 'product_purchased', type: 'text', label: 'Product Purchased' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'newsletter',
      name: 'Newsletter',
      fields: [
        { name: 'title', type: 'text', label: 'Newsletter Title' },
        { name: 'description', type: 'textarea', label: 'Newsletter Description' },
        { name: 'button_text', type: 'text', label: 'Subscribe Button Text' }
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
    { name: 'Modern Blue', primary: '#4A6CF7', secondary: '#6E82FE', accent: '#EEF1FF', background: '#FFFFFF', text: '#333333' },
    { name: 'Shopping Green', primary: '#10B981', secondary: '#34D399', accent: '#D1FAE5', background: '#FFFFFF', text: '#333333' },
    { name: 'Luxury Purple', primary: '#8B5CF6', secondary: '#A78BFA', accent: '#EDE9FE', background: '#FFFFFF', text: '#333333' },
    { name: 'Vibrant Orange', primary: '#F59E0B', secondary: '#FBBF24', accent: '#FEF3C7', background: '#FFFFFF', text: '#333333' },
    { name: 'Classic Black', primary: '#1F2937', secondary: '#374151', accent: '#F3F4F6', background: '#FFFFFF', text: '#333333' },
    { name: 'Rose Gold', primary: '#EC4899', secondary: '#F472B6', accent: '#FCE7F3', background: '#FFFFFF', text: '#333333' },
    { name: 'Teal Fresh', primary: '#0D9488', secondary: '#14B8A6', accent: '#CCFBF1', background: '#FFFFFF', text: '#333333' },
    { name: 'Coral Bright', primary: '#EF4444', secondary: '#F87171', accent: '#FEE2E2', background: '#FFFFFF', text: '#333333' }
  ],
  fontOptions: [
    { name: 'Inter', value: 'Inter, sans-serif', weight: '300,400,500,600,700' },
    { name: 'Poppins', value: 'Poppins, sans-serif', weight: '300,400,500,600,700' },
    { name: 'Roboto', value: 'Roboto, sans-serif', weight: '300,400,500,700' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif', weight: '300,400,500,600,700' },
    { name: 'Open Sans', value: 'Open Sans, sans-serif', weight: '300,400,600,700' }
  ],
  defaultColors: {
    primary: '#4A6CF7',
    secondary: '#6E82FE',
    accent: '#EEF1FF',
    background: '#FFFFFF',
    text: '#333333',
    cardBg: '#F9F9F9',
    borderColor: '#EEEEEE',
    buttonText: '#FFFFFF',
    saleColor: '#E53935',
    starColor: '#FFC107'
  },
  defaultFont: 'Inter, sans-serif',
  themeStyle: {
    layout: 'ecommerce-layout',
    headerStyle: 'modern',
    cardStyle: 'shadow',
    buttonStyle: 'rounded',
    iconStyle: 'simple',
    spacing: 'comfortable'
  },
  defaultData: {
    header: {
      name: 'StyleHub',
      tagline: 'Quality products for your lifestyle',
      logo: ''
    },
    featured: {
      title: 'Summer Collection',
      subtitle: 'Discover our latest arrivals with up to 30% off',
      image: '',
      button_text: 'Shop Now',
      button_url: 'https://www.stylehub.com/summer'
    },
    about: {
      description: 'StyleHub offers a curated selection of high-quality products for your everyday needs. We focus on sustainable materials, ethical manufacturing, and timeless designs that will last for years to come.',
      year_established: '2018'
    },
    categories: {
      category_list: [
        { title: 'Clothing', image: '', url: 'https://www.stylehub.com/clothing' },
        { title: 'Accessories', image: '', url: 'https://www.stylehub.com/accessories' },
        { title: 'Home Decor', image: '', url: 'https://www.stylehub.com/home' },
        { title: 'Beauty', image: '', url: 'https://www.stylehub.com/beauty' }
      ]
    },
    products: {
      product_list: [
        { title: 'Classic White T-Shirt', description: 'Premium cotton t-shirt with a relaxed fit and durable construction.', price: '$29.99', sale_price: '', image: '', url: 'https://www.stylehub.com/products/classic-tee', category: 'Clothing', badge: 'bestseller' },
        { title: 'Minimalist Watch', description: 'Sleek design with a leather strap and Japanese movement.', price: '$89.99', sale_price: '$69.99', image: '', url: 'https://www.stylehub.com/products/minimalist-watch', category: 'Accessories', badge: 'sale' },
        { title: 'Ceramic Plant Pot', description: 'Handcrafted ceramic pot perfect for small to medium plants.', price: '$34.99', sale_price: '', image: '', url: 'https://www.stylehub.com/products/ceramic-pot', category: 'Home Decor', badge: 'new' },
        { title: 'Natural Face Serum', description: 'Hydrating serum with vitamin C and hyaluronic acid.', price: '$45.99', sale_price: '', image: '', url: 'https://www.stylehub.com/products/face-serum', category: 'Beauty', badge: 'none' }
      ]
    },
    benefits: {
      benefit_list: [
        { title: 'Free Shipping', description: 'On all orders over $50', icon: 'shipping' },
        { title: 'Easy Returns', description: '30-day return policy', icon: 'returns' },
        { title: 'Secure Checkout', description: 'Safe & encrypted payment', icon: 'secure' },
        { title: '24/7 Support', description: 'We are here to help', icon: 'support' }
      ]
    },
    contact: {
      email: 'hello@stylehub.com',
      phone: '(555) 123-4567',
      website: 'https://www.stylehub.com',
      address: '123 Fashion Street, Suite 100, New York, NY 10001'
    },
    social: {
      social_links: [
        { platform: 'instagram', url: 'https://instagram.com/stylehub', username: '@stylehub' },
        { platform: 'facebook', url: 'https://facebook.com/stylehub', username: 'StyleHub' },
        { platform: 'pinterest', url: 'https://pinterest.com/stylehub', username: 'stylehub' },
        { platform: 'youtube', url: 'https://youtube.com/stylehub', username: 'StyleHub' }
      ]
    },
    videos: {
      video_list: [
        { title: 'Classic White T-Shirt - Product Showcase', description: 'See the quality and fit of our bestselling classic white t-shirt', video_type: 'product_demo', embed_url: '', thumbnail: '', duration: '2:30', product_category: 'Clothing' },
        { title: 'Unboxing the StyleHub Experience', description: 'Experience our premium packaging and attention to detail', video_type: 'unboxing', embed_url: '', thumbnail: '', duration: '4:15', product_category: 'General' },
        { title: 'How to Style Your Minimalist Watch', description: 'Styling tips and outfit ideas for our popular minimalist watch', video_type: 'how_to_use', embed_url: '', thumbnail: '', duration: '6:45', product_category: 'Accessories' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/stylehub',
      channel_name: 'StyleHub',
      subscriber_count: '52.1K',
      featured_playlist: 'https://youtube.com/playlist?list=PLproductshowcase',
      latest_video_embed: '',
      channel_description: 'Product showcases, styling tips, and behind-the-scenes content from your favorite lifestyle brand. Subscribe for weekly style inspiration!'
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '09:00', close_time: '18:00', is_closed: false },
        { day: 'tuesday', open_time: '09:00', close_time: '18:00', is_closed: false },
        { day: 'wednesday', open_time: '09:00', close_time: '18:00', is_closed: false },
        { day: 'thursday', open_time: '09:00', close_time: '18:00', is_closed: false },
        { day: 'friday', open_time: '09:00', close_time: '18:00', is_closed: false },
        { day: 'saturday', open_time: '10:00', close_time: '16:00', is_closed: false },
        { day: 'sunday', open_time: '', close_time: '', is_closed: true }
      ]
    },
    testimonials: {
      reviews: [
        { customer_name: 'Emily R.', review: 'The quality of the clothing is exceptional. I have ordered multiple times and have always been impressed with both the products and customer service.', rating: '5', product_purchased: 'Classic White T-Shirt' },
        { customer_name: 'Michael T.', review: 'Fast shipping and the minimalist watch exceeded my expectations. Will definitely shop here again!', rating: '5', product_purchased: 'Minimalist Watch' },
        { customer_name: 'Sarah L.', review: 'Love my new ceramic plant pot. It is exactly as described and looks perfect in my living room.', rating: '4', product_purchased: 'Ceramic Plant Pot' }
      ]
    },
    newsletter: {
      title: 'Join Our Newsletter',
      description: 'Subscribe to receive updates on new arrivals, special offers, and styling tips.',
      button_text: 'Subscribe'
    },
    app_download: {
      app_store_url: '#',
      play_store_url: '#',
      app_description: 'Download our app for a seamless shopping experience, exclusive mobile offers, and easy order tracking.'
    },
    contact_form: {
      form_title: 'Contact Us',
      form_description: 'Have questions or need assistance? Fill out the form below and our team will get back to you shortly.'
    },
    thank_you: {
      message: 'Thank you for contacting StyleHub. We appreciate your message and will respond within 24 hours during business days.'
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
      html_content: '<div class="custom-section"><h4>Special Offers</h4><p>Check out our latest deals and promotions.</p></div>',
      section_title: 'Special Content',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Share Our Store',
      qr_description: 'Scan this QR code to visit our online store and browse our latest products.',
      qr_size: 'medium'
    },
    language: {
      template_language: 'en'
    },
    footer: {
      show_footer: true,
      footer_text: 'Shop with confidence. Free shipping on orders over $50. Easy returns within 30 days.',
      footer_links: [
        { title: 'Shipping Info', url: '#' },
        { title: 'Return Policy', url: '#' },
        { title: 'Size Guide', url: '#' },
        { title: 'Customer Service', url: '#' }
      ]
    },
    copyright: {
      text: '© 2025 StyleHub. All rights reserved.'
    }
  }
};