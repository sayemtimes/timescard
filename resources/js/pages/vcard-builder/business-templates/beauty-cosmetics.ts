import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const beautyCosmeticsTemplate = {
  name: 'Beauty & Cosmetics',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Brand/Artist Name' },
        { name: 'title', type: 'text', label: 'Specialty' },
        { name: 'tagline', type: 'textarea', label: 'Tagline' },
        { name: 'profile_image', type: 'file', label: 'Profile/Logo' }
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
        { name: 'description', type: 'textarea', label: 'About Me/Brand' },
        { name: 'specialties', type: 'tags', label: 'Specialties' },
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
          label: 'Beauty Services',
          fields: [
            { name: 'title', type: 'text', label: 'Service Name' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'price', type: 'text', label: 'Price' },
            { name: 'duration', type: 'text', label: 'Duration' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'videos',
      name: 'Beauty Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Beauty Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'makeup_tutorial', label: 'Makeup Tutorial' },
              { value: 'transformation', label: 'Transformation' },
              { value: 'product_review', label: 'Product Review' },
              { value: 'skincare_routine', label: 'Skincare Routine' },
              { value: 'client_testimonial', label: 'Client Testimonial' },
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
      key: 'portfolio',
      name: 'Portfolio',
      fields: [
        {
          name: 'projects',
          type: 'repeater',
          label: 'Beauty Work',
          fields: [
            { name: 'title', type: 'text', label: 'Look/Style Name' },
            { name: 'image', type: 'file', label: 'Photo' },
            { name: 'category', type: 'text', label: 'Category' }
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
            { name: 'name', type: 'text', label: 'Product Name' },
            { name: 'brand', type: 'text', label: 'Brand' },
            { name: 'price', type: 'text', label: 'Price' },
            { name: 'link', type: 'url', label: 'Purchase Link' }
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
            { name: 'username', type: 'text', label: 'Username' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'business_hours',
      name: 'Availability',
      fields: [
        {
          name: 'hours',
          type: 'repeater',
          label: 'Available Hours',
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
            { name: 'open_time', type: 'time', label: 'Start Time' },
            { name: 'close_time', type: 'time', label: 'End Time' },
            { name: 'is_closed', type: 'checkbox', label: 'Unavailable' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'appointments',
      name: 'Bookings',
      fields: [
        { name: 'booking_url', type: 'url', label: 'Booking URL' },
        { name: 'consultation_note', type: 'textarea', label: 'Consultation Note' }
      ],
      required: false
    },
    {
      key: 'testimonials',
      name: 'Client Reviews',
      fields: [
        {
          name: 'reviews',
          type: 'repeater',
          label: 'Client Reviews',
          fields: [
            { name: 'client_name', type: 'text', label: 'Client Name' },
            { name: 'review', type: 'textarea', label: 'Review Text' },
            { name: 'rating', type: 'number', label: 'Rating (1-5)' },
            { name: 'service', type: 'text', label: 'Service Received' }
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
    { name: 'Rose Gold', primary: '#E91E63', secondary: '#F06292', accent: '#FCE4EC', background: '#FFF8F8', text: '#2D2D2D', cardBg: '#FFFFFF' },
    { name: 'Coral Blush', primary: '#FF6B6B', secondary: '#FF8E8E', accent: '#FFE8E8', background: '#FFFAFA', text: '#333333', cardBg: '#FFFFFF' },
    { name: 'Lavender Dream', primary: '#9C27B0', secondary: '#BA68C8', accent: '#F3E5F5', background: '#FAFAFA', text: '#2E2E2E', cardBg: '#FFFFFF' },
    { name: 'Peach Glow', primary: '#FF9800', secondary: '#FFB74D', accent: '#FFF3E0', background: '#FFFEF7', text: '#2C2C2C', cardBg: '#FFFFFF' },
    { name: 'Berry Chic', primary: '#8E24AA', secondary: '#AB47BC', accent: '#F8BBD9', background: '#FDF7FA', text: '#2A2A2A', cardBg: '#FFFFFF' },
    { name: 'Nude Elegance', primary: '#A1887F', secondary: '#BCAAA4', accent: '#EFEBE9', background: '#FAFAFA', text: '#3E2723', cardBg: '#FFFFFF' }
  ],
  fontOptions: [
    { name: 'Playfair Display', value: 'Playfair Display, Georgia, serif', weight: '400,500,600,700' },
    { name: 'Poppins', value: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif', weight: '300,400,500,600' },
    { name: 'Lora', value: 'Lora, Georgia, serif', weight: '400,500,600' },
    { name: 'Montserrat', value: 'Montserrat, -apple-system, BlinkMacSystemFont, sans-serif', weight: '300,400,500,600' },
    { name: 'Dancing Script', value: 'Dancing Script, cursive', weight: '400,500,600,700' }
  ],
  defaultColors: {
    primary: '#E91E63',
    secondary: '#F06292',
    accent: '#FCE4EC',
    background: '#FFF8F8',
    text: '#2D2D2D',
    cardBg: '#FFFFFF',
    borderColor: '#F8BBD9'
  },
  defaultFont: 'Playfair Display, Georgia, serif',
  themeStyle: {
    layout: 'elegant',
    headerStyle: 'glamorous',
    cardStyle: 'soft',
    buttonStyle: 'rounded',
    iconStyle: 'outlined',
    spacing: 'airy',
    shadows: 'soft',
    animations: 'gentle'
  },
  defaultData: {
    header: {
      name: 'Bella Beauty Studio',
      title: 'Makeup Artist & Beauty Consultant',
      tagline: 'Enhancing your natural beauty with artistry and elegance',
      profile_image: ''
    },
    contact: {
      email: 'hello@bellabeauty.com',
      phone: '+1 (555) 123-GLOW',
      website: 'https://bellabeauty.com',
      location: 'Beverly Hills, CA'
    },
    about: {
      description: 'Professional makeup artist specializing in bridal, editorial, and special occasion makeup. Certified in advanced beauty techniques with a passion for enhancing natural beauty.',
      specialties: 'Bridal Makeup, Editorial, Special Events, Skincare Consultation, Color Matching',
      experience: '7'
    },
    services: {
      service_list: [
        { title: 'Bridal Makeup', description: 'Complete bridal look with trial session', price: '$350', duration: '3 hours' },
        { title: 'Special Event Makeup', description: 'Glamorous makeup for special occasions', price: '$150', duration: '1.5 hours' },
        { title: 'Makeup Lesson', description: 'Personal makeup tutorial and tips', price: '$120', duration: '2 hours' },
        { title: 'Skincare Consultation', description: 'Personalized skincare routine advice', price: '$80', duration: '1 hour' }
      ]
    },
    portfolio: {
      projects: [
        { title: 'Romantic Bridal Look', image: '', category: 'Bridal' },
        { title: 'Editorial Glam', image: '', category: 'Editorial' },
        { title: 'Natural Glow', image: '', category: 'Everyday' }
      ]
    },
    products: {
      product_list: [
        { name: 'Signature Lip Gloss', brand: 'Bella Beauty', price: '$28', link: '#' },
        { name: 'Glow Serum', brand: 'Bella Beauty', price: '$45', link: '#' },
        { name: 'Contour Palette', brand: 'Bella Beauty', price: '$38', link: '#' }
      ]
    },
    social: {
      social_links: [
        { platform: 'instagram', url: 'https://instagram.com/bellabeauty', username: '@bellabeauty' },
        { platform: 'tiktok', url: 'https://tiktok.com/@bellabeauty', username: '@bellabeauty' },
        { platform: 'youtube', url: 'https://youtube.com/bellabeauty', username: 'Bella Beauty' },
        { platform: 'pinterest', url: 'https://pinterest.com/bellabeauty', username: 'bellabeauty' }
      ]
    },
    videos: {
      video_list: [
        { title: 'Bridal Makeup Tutorial - Romantic Glow', description: 'Step-by-step tutorial for achieving the perfect bridal makeup look', video_type: 'makeup_tutorial', embed_url: '', thumbnail: '', duration: '15:20' },
        { title: 'Client Transformation - Before & After', description: 'Amazing transformation for a special event client', video_type: 'transformation', embed_url: '', thumbnail: '', duration: '8:45' },
        { title: 'My Daily Skincare Routine', description: 'The skincare routine I recommend to all my clients for glowing skin', video_type: 'skincare_routine', embed_url: '', thumbnail: '', duration: '12:30' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/bellabeauty',
      channel_name: 'Bella Beauty',
      subscriber_count: '156K',
      featured_playlist: 'https://youtube.com/playlist?list=PLbridalmakeup',
      latest_video_embed: '',
      channel_description: 'Beauty tutorials, makeup tips, skincare advice, and client transformations. Subscribe for weekly beauty content and professional makeup artist insights.'
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '10:00', close_time: '19:00', is_closed: false },
        { day: 'tuesday', open_time: '10:00', close_time: '19:00', is_closed: false },
        { day: 'wednesday', open_time: '10:00', close_time: '19:00', is_closed: false },
        { day: 'thursday', open_time: '10:00', close_time: '19:00', is_closed: false },
        { day: 'friday', open_time: '10:00', close_time: '20:00', is_closed: false },
        { day: 'saturday', open_time: '09:00', close_time: '18:00', is_closed: false },
        { day: 'sunday', open_time: '11:00', close_time: '17:00', is_closed: false }
      ]
    },
    appointments: {
      booking_url: 'https://bellabeauty.com/book',
      consultation_note: 'Free 15-minute consultation available for all new clients'
    },
    testimonials: {
      reviews: [
        { client_name: 'Emma Wilson', review: 'Absolutely stunning bridal makeup! Bella made me feel like a princess on my wedding day.', rating: '5', service: 'Bridal Makeup' },
        { client_name: 'Sofia Martinez', review: 'Amazing makeup lesson! I learned so much and now I can recreate the looks at home.', rating: '5', service: 'Makeup Lesson' },
        { client_name: 'Grace Chen', review: 'Professional and talented artist. My makeup looked flawless for the entire event.', rating: '5', service: 'Special Event' }
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
      form_title: 'Book Your Beauty Session',
      form_description: 'Ready to enhance your natural beauty? Contact me for a personalized consultation.'
    },
    thank_you: {
      message: 'Thank you for your interest! I\'ll get back to you within 24 hours to discuss your beauty needs.'
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
      html_content: '<div class="beauty-highlight"><h4>Certified Professional</h4><p>Licensed makeup artist with advanced certifications in bridal and editorial makeup artistry.</p></div>',
      section_title: 'Professional Excellence',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Share My Beauty Services',
      qr_description: 'Scan to save my contact info and share my beauty services with friends.',
      qr_size: 'medium'
    },
    language: {
      template_language: 'en'
    },
    copyright: {
      text: '© 2025 Bella Beauty Studio. All rights reserved.'
    }
  }
};