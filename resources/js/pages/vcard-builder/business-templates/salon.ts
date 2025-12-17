import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const salonTemplate = {
  name: 'Salon & Spa',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Salon Name' },
        { name: 'tagline', type: 'textarea', label: 'Tagline' },
        { name: 'logo', type: 'file', label: 'Logo' },
        { name: 'background_image', type: 'file', label: 'Background Image' }
      ],
      required: true
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'About Us' },
        { name: 'year_established', type: 'number', label: 'Year Established' },
        { name: 'specialists_count', type: 'number', label: 'Number of Specialists' }
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
            { name: 'price', type: 'text', label: 'Price' },
            { name: 'duration', type: 'text', label: 'Duration' },
            { name: 'category', type: 'select', label: 'Category', options: [
              { value: 'hair', label: 'Hair' },
              { value: 'nails', label: 'Nails' },
              { value: 'facial', label: 'Facial' },
              { value: 'massage', label: 'Massage' },
              { value: 'makeup', label: 'Makeup' },
              { value: 'spa', label: 'Spa Treatments' },
              { value: 'waxing', label: 'Waxing' },
              { value: 'other', label: 'Other' }
            ]}
          ]
        }
      ],
      required: false
    },
    {
      key: 'specialists',
      name: 'Specialists',
      fields: [
        {
          name: 'team',
          type: 'repeater',
          label: 'Team Members',
          fields: [
            { name: 'name', type: 'text', label: 'Name' },
            { name: 'title', type: 'text', label: 'Title/Position' },
            { name: 'bio', type: 'textarea', label: 'Bio' },
            { name: 'image', type: 'file', label: 'Photo' },
            { name: 'specialties', type: 'text', label: 'Specialties' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'promotions',
      name: 'Promotions',
      fields: [
        {
          name: 'offers',
          type: 'repeater',
          label: 'Special Offers',
          fields: [
            { name: 'title', type: 'text', label: 'Promotion Title' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'valid_until', type: 'text', label: 'Valid Until' },
            { name: 'discount', type: 'text', label: 'Discount/Offer' },
            { name: 'code', type: 'text', label: 'Promo Code (if applicable)' }
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
          label: 'Salon Hours',
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
      key: 'videos',
      name: 'Salon Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Beauty Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'transformation', label: 'Hair Transformation' },
              { value: 'tutorial', label: 'Beauty Tutorial' },
              { value: 'salon_tour', label: 'Salon Tour' },
              { value: 'client_testimonial', label: 'Client Testimonial' },
              { value: 'behind_scenes', label: 'Behind the Scenes' },
              { value: 'product_demo', label: 'Product Demonstration' }
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
            { name: 'caption', type: 'text', label: 'Caption' },
            { name: 'category', type: 'select', label: 'Category', options: [
              { value: 'salon', label: 'Salon Interior' },
              { value: 'work', label: 'Our Work' },
              { value: 'products', label: 'Products' },
              { value: 'team', label: 'Team' }
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
            { name: 'service_received', type: 'text', label: 'Service Received' }
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
        { name: 'cancellation_policy', type: 'textarea', label: 'Cancellation Policy' }
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
    }
  ],
  colorPresets: [
    { name: 'Elegant Rose', primary: '#DB7093', secondary: '#E8B4B8', accent: '#FFF0F5', background: '#FFFFFF', text: '#333333' },
    { name: 'Spa Mint', primary: '#3EB489', secondary: '#5FCCA0', accent: '#E0F5EE', background: '#FFFFFF', text: '#333333' },
    { name: 'Lavender Calm', primary: '#8A2BE2', secondary: '#9370DB', accent: '#F3E5F5', background: '#FFFFFF', text: '#333333' },
    { name: 'Luxury Gold', primary: '#D4AF37', secondary: '#F0E68C', accent: '#FFF8E1', background: '#FFFFFF', text: '#333333' },
    { name: 'Modern Black', primary: '#333333', secondary: '#555555', accent: '#F5F5F5', background: '#FFFFFF', text: '#333333' },
    { name: 'Ocean Breeze', primary: '#4682B4', secondary: '#87CEEB', accent: '#F0F8FF', background: '#FFFFFF', text: '#333333' }
  ],
  fontOptions: [
    { name: 'Playfair Display', value: 'Playfair Display, serif', weight: '400,500,600,700' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif', weight: '300,400,500,600,700' },
    { name: 'Lato', value: 'Lato, sans-serif', weight: '300,400,700' },
    { name: 'Cormorant Garamond', value: 'Cormorant Garamond, serif', weight: '300,400,500,600,700' },
    { name: 'Raleway', value: 'Raleway, sans-serif', weight: '300,400,500,600,700' }
  ],
  defaultColors: {
    primary: '#DB7093',
    secondary: '#E8B4B8',
    accent: '#FFF0F5',
    background: '#FFFFFF',
    text: '#333333',
    cardBg: '#FAFAFA',
    borderColor: '#F0F0F0',
    buttonText: '#FFFFFF',
    highlightColor: '#FFD700'
  },
  defaultFont: 'Montserrat, sans-serif',
  themeStyle: {
    layout: 'salon-layout',
    headerStyle: 'elegant',
    cardStyle: 'soft-shadow',
    buttonStyle: 'rounded',
    iconStyle: 'simple',
    spacing: 'airy',
    shadows: 'soft',
    dividers: true
  },
  defaultData: {
    header: {
      name: 'Serenity Salon & Spa',
      tagline: 'Where beauty meets relaxation',
      logo: '',
      background_image: ''
    },
    about: {
      description: 'Welcome to Serenity Salon & Spa, where we believe in nurturing both inner and outer beauty. Our team of skilled professionals is dedicated to providing exceptional services in a tranquil environment, helping you look and feel your absolute best.',
      year_established: '2018',
      specialists_count: '12'
    },
    services: {
      service_list: [
        { title: 'Signature Haircut & Style', description: 'Precision cut and professional styling tailored to your face shape and preferences', price: 'From $65', duration: '45-60 min', category: 'hair' },
        { title: 'Classic Manicure', description: 'Nail shaping, cuticle care, hand massage, and polish application', price: '$35', duration: '30 min', category: 'nails' },
        { title: 'Rejuvenating Facial', description: 'Deep cleansing, exfoliation, mask, and moisturizing treatment customized for your skin type', price: '$85', duration: '60 min', category: 'facial' },
        { title: 'Swedish Massage', description: 'Relaxing full-body massage using long, flowing strokes to reduce tension and promote wellness', price: '$95', duration: '60 min', category: 'massage' }
      ]
    },
    specialists: {
      team: [
        { name: 'Emma Johnson', title: 'Senior Hair Stylist', bio: 'With over 10 years of experience, Emma specializes in creative color techniques and precision cutting.', image: '', specialties: 'Color, Balayage, Precision Cuts' },
        { name: 'Michael Chen', title: 'Massage Therapist', bio: 'Certified in multiple massage modalities, Michael is known for his therapeutic approach to relieving tension and promoting relaxation.', image: '', specialties: 'Deep Tissue, Hot Stone, Swedish' },
        { name: 'Sophia Rodriguez', title: 'Esthetician', bio: 'Sophia is passionate about skincare and helping clients achieve their best complexion through customized facial treatments.', image: '', specialties: 'Anti-aging, Acne Treatment, Chemical Peels' }
      ]
    },
    promotions: {
      offers: [
        { title: 'New Client Special', description: '20% off your first service with us', valid_until: 'Ongoing', discount: '20% Off', code: 'WELCOME' },
        { title: 'Spa Package Deal', description: 'Enjoy a facial, massage, and manicure at a special bundled price', valid_until: 'December 31, 2025', discount: 'Save $45', code: 'SPADAY' }
      ]
    },
    contact: {
      email: 'info@serenitysalon.com',
      phone: '(555) 123-4567',
      website: 'https://www.serenitysalon.com',
      address: '123 Beauty Lane, Suite 100, Los Angeles, CA 90001'
    },
    social: {
      social_links: [
        { platform: 'instagram', url: 'https://instagram.com/serenitysalon', username: '@serenitysalon' },
        { platform: 'facebook', url: 'https://facebook.com/serenitysalon', username: 'Serenity Salon & Spa' },
        { platform: 'pinterest', url: 'https://pinterest.com/serenitysalon', username: 'serenitysalon' },
        { platform: 'youtube', url: 'https://youtube.com/serenitysalon', username: 'Serenity Salon & Spa' }
      ]
    },
    videos: {
      video_list: [
        { title: 'Dramatic Hair Color Transformation', description: 'Watch Emma transform a client with a stunning balayage makeover', video_type: 'transformation', embed_url: '', thumbnail: '', duration: '8:30' },
        { title: 'Tour Our Luxurious Spa Facilities', description: 'Take a relaxing tour through our beautiful salon and spa spaces', video_type: 'salon_tour', embed_url: '', thumbnail: '', duration: '4:15' },
        { title: 'At-Home Skincare Routine Tips', description: 'Sophia shares professional skincare tips you can do at home', video_type: 'tutorial', embed_url: '', thumbnail: '', duration: '6:45' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/serenitysalon',
      channel_name: 'Serenity Salon & Spa',
      subscriber_count: '15.6K',
      featured_playlist: 'https://youtube.com/playlist?list=PLbeautytips',
      latest_video_embed: '',
      channel_description: 'Beauty transformations, skincare tips, and behind-the-scenes content from Serenity Salon & Spa. Subscribe for weekly beauty inspiration!'
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '10:00', close_time: '19:00', is_closed: false },
        { day: 'tuesday', open_time: '10:00', close_time: '19:00', is_closed: false },
        { day: 'wednesday', open_time: '10:00', close_time: '19:00', is_closed: false },
        { day: 'thursday', open_time: '10:00', close_time: '20:00', is_closed: false },
        { day: 'friday', open_time: '10:00', close_time: '20:00', is_closed: false },
        { day: 'saturday', open_time: '09:00', close_time: '18:00', is_closed: false },
        { day: 'sunday', open_time: '11:00', close_time: '16:00', is_closed: false }
      ]
    },
    gallery: {
      photos: [
        { image: '', caption: 'Our elegant salon interior', category: 'salon' },
        { image: '', caption: 'Balayage by Emma', category: 'work' },
        { image: '', caption: 'Relaxing massage room', category: 'salon' },
        { image: '', caption: 'Premium products we use and recommend', category: 'products' }
      ]
    },
    testimonials: {
      reviews: [
        { client_name: 'Jessica M.', review: 'Emma transformed my hair with the most beautiful highlights. The attention to detail and personalized service made my experience exceptional.', rating: '5', service_received: 'Balayage & Cut' },
        { client_name: 'Robert T.', review: 'The deep tissue massage with Michael was exactly what I needed. He targeted all my problem areas and I left feeling completely renewed.', rating: '5', service_received: 'Deep Tissue Massage' },
        { client_name: 'Alicia K.', review: 'My facial with Sophia was amazing! She analyzed my skin and customized the treatment perfectly. My complexion has never looked better.', rating: '5', service_received: 'Signature Facial' }
      ]
    },
    appointments: {
      booking_url: 'https://bookings.serenitysalon.com',
      section_title: 'Ready for a New Look?',
      section_description: 'Book your appointment today and let our specialists take care of you.',
      booking_text: 'Book an Appointment',
      cancellation_policy: 'Please provide at least 24 hours notice for cancellations to avoid a 50% service fee. No-shows will be charged the full service amount.'
    },
    google_map: {
      map_embed_url: '',
      directions_url: 'https://maps.google.com/directions'
    },
    app_download: {
      app_store_url: '#',
      play_store_url: '#',
      app_description: 'Download our app to book appointments, manage your schedule, and receive exclusive offers and promotions.'
    },
    contact_form: {
      form_title: 'Contact Us',
      form_description: 'Have questions or special requests? Send us a message and our team will get back to you as soon as possible.'
    },
    thank_you: {
      message: 'Thank you for your message! Our team will respond within 24 hours. We look forward to welcoming you to Serenity Salon & Spa.'
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
      html_content: '<div class="custom-section"><h4>Beauty Tips</h4><p>Discover our expert beauty tips and skincare advice for maintaining your glow at home.</p></div>',
      section_title: 'Beauty Tips',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Share Our Salon',
      qr_description: 'Scan this QR code to book appointments, view our services, and get our contact information.',
      qr_size: 'medium'
    },
    language: {
      template_language: 'en'
    },
    copyright: {
      text: '© 2025 Serenity Salon & Spa. All rights reserved.'
    }
  }
};