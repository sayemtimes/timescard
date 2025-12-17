import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const travelTemplate = {
  name: 'Travel Agency',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Agency Name' },
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
        { name: 'destinations_count', type: 'number', label: 'Destinations Offered' }
      ],
      required: false
    },
    {
      key: 'destinations',
      name: 'Popular Destinations',
      fields: [
        {
          name: 'destination_list',
          type: 'repeater',
          label: 'Destinations',
          fields: [
            { name: 'name', type: 'text', label: 'Destination Name' },
            { name: 'location', type: 'text', label: 'Location' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'image', type: 'file', label: 'Destination Image' },
            { name: 'price', type: 'text', label: 'Starting Price' },
            { name: 'duration', type: 'text', label: 'Duration' },
            { name: 'url', type: 'url', label: 'More Info URL' }
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
          label: 'Services',
          fields: [
            { name: 'title', type: 'text', label: 'Service Name' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'icon', type: 'select', label: 'Icon', options: [
              { value: 'flight', label: 'Flights' },
              { value: 'hotel', label: 'Hotels' },
              { value: 'cruise', label: 'Cruises' },
              { value: 'tour', label: 'Tours' },
              { value: 'car', label: 'Car Rentals' },
              { value: 'insurance', label: 'Travel Insurance' },
              { value: 'visa', label: 'Visa Services' },
              { value: 'custom', label: 'Custom Packages' }
            ]}
          ]
        }
      ],
      required: false
    },
    {
      key: 'special_offers',
      name: 'Special Offers',
      fields: [
        {
          name: 'offer_list',
          type: 'repeater',
          label: 'Offers',
          fields: [
            { name: 'title', type: 'text', label: 'Offer Title' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'discount', type: 'text', label: 'Discount' },
            { name: 'valid_until', type: 'text', label: 'Valid Until' },
            { name: 'image', type: 'file', label: 'Offer Image' },
            { name: 'url', type: 'url', label: 'Offer URL' }
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
        { name: 'address', type: 'text', label: 'Address' },
        { name: 'emergency', type: 'tel', label: 'Emergency Contact' }
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
            { name: 'is_closed', type: 'checkbox', label: 'Closed' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'videos',
      name: 'Travel Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Travel Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'destination_guide', label: 'Destination Guide' },
              { value: 'travel_tips', label: 'Travel Tips' },
              { value: 'client_journey', label: 'Client Travel Journey' },
              { value: 'cultural_experience', label: 'Cultural Experience' },
              { value: 'agency_intro', label: 'Agency Introduction' },
              { value: 'travel_vlog', label: 'Travel Vlog' }
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
            { name: 'location', type: 'text', label: 'Location' }
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
            { name: 'rating', type: 'number', label: 'Rating (1-5)', min: 1, max: 5 },
            { name: 'destination', type: 'text', label: 'Destination Visited' },
            { name: 'trip_date', type: 'text', label: 'Trip Date' }
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
      key: 'thank_you',
      name: 'Thank You Message',
      fields: [
        { name: 'message', type: 'textarea', label: 'Thank You Message' }
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
    { name: 'Ocean Blue', primary: '#1A73E8', secondary: '#34A853', accent: '#E8F5E9', background: '#FFFFFF', text: '#333333' },
    { name: 'Sunset Orange', primary: '#FF6B35', secondary: '#FF8E53', accent: '#FFF4E6', background: '#FFFFFF', text: '#333333' },
    { name: 'Adventure Green', primary: '#059669', secondary: '#10B981', accent: '#D1FAE5', background: '#FFFFFF', text: '#333333' },
    { name: 'Sky Blue', primary: '#0EA5E9', secondary: '#38BDF8', accent: '#E0F2FE', background: '#FFFFFF', text: '#333333' },
    { name: 'Desert Gold', primary: '#D97706', secondary: '#F59E0B', accent: '#FEF3C7', background: '#FFFFFF', text: '#333333' },
    { name: 'Mountain Purple', primary: '#7C3AED', secondary: '#8B5CF6', accent: '#EDE9FE', background: '#FFFFFF', text: '#333333' },
    { name: 'Tropical Teal', primary: '#0D9488', secondary: '#14B8A6', accent: '#CCFBF1', background: '#FFFFFF', text: '#333333' },
    { name: 'Coral Reef', primary: '#DC2626', secondary: '#EF4444', accent: '#FEE2E2', background: '#FFFFFF', text: '#333333' }
  ],
  fontOptions: [
    { name: 'Poppins', value: 'Poppins, sans-serif', weight: '300,400,500,600,700' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif', weight: '300,400,500,600,700' },
    { name: 'Roboto', value: 'Roboto, sans-serif', weight: '300,400,500,700' },
    { name: 'Open Sans', value: 'Open Sans, sans-serif', weight: '300,400,600,700' },
    { name: 'Lato', value: 'Lato, sans-serif', weight: '300,400,700,900' }
  ],
  defaultColors: {
    primary: '#1A73E8',
    secondary: '#34A853',
    accent: '#E8F5E9',
    background: '#FFFFFF',
    text: '#333333',
    cardBg: '#F8F9FA',
    borderColor: '#EEEEEE',
    buttonText: '#FFFFFF',
    highlightColor: '#FBBC04'
  },
  defaultFont: 'Poppins, sans-serif',
  themeStyle: {
    layout: 'travel-layout',
    headerStyle: 'panoramic',
    cardStyle: 'rounded',
    buttonStyle: 'rounded',
    iconStyle: 'simple',
    spacing: 'comfortable'
  },
  defaultData: {
    header: {
      name: 'Wanderlust Travel',
      tagline: 'Discover the world with us',
      logo: '',
      background_image: ''
    },
    about: {
      description: 'Wanderlust Travel is a full-service travel agency dedicated to creating unforgettable experiences. With over 15 years of expertise, we specialize in crafting personalized itineraries to destinations worldwide. Our team of experienced travel consultants is committed to providing exceptional service and insider knowledge to make your travel dreams a reality.',
      year_established: '2008',
      destinations_count: '120'
    },
    destinations: {
      destination_list: [
        { name: 'Santorini', location: 'Greece', description: 'Experience the stunning white-washed buildings, blue domes, and breathtaking sunsets of this iconic Greek island.', image: '', price: 'From $1,299', duration: '7 days', url: 'https://www.wanderlusttravel.com/destinations/santorini' },
        { name: 'Bali', location: 'Indonesia', description: 'Explore lush rice terraces, ancient temples, and pristine beaches on this tropical paradise island.', image: '', price: 'From $1,499', duration: '10 days', url: 'https://www.wanderlusttravel.com/destinations/bali' },
        { name: 'Kyoto', location: 'Japan', description: 'Immerse yourself in Japanese culture with visits to historic temples, traditional gardens, and authentic tea houses.', image: '', price: 'From $1,899', duration: '8 days', url: 'https://www.wanderlusttravel.com/destinations/kyoto' },
        { name: 'Machu Picchu', location: 'Peru', description: 'Trek through the Andes to discover the ancient Incan citadel and one of the most iconic archaeological sites in the world.', image: '', price: 'From $2,199', duration: '9 days', url: 'https://www.wanderlusttravel.com/destinations/machu-picchu' }
      ]
    },
    services: {
      service_list: [
        { title: 'Flight Bookings', description: 'Access to competitive airfares with major airlines and exclusive deals.', icon: 'flight' },
        { title: 'Hotel Reservations', description: 'Partnerships with hotels and resorts worldwide at all price points.', icon: 'hotel' },
        { title: 'Guided Tours', description: 'Expert-led tours with local guides for authentic experiences.', icon: 'tour' },
        { title: 'Custom Itineraries', description: 'Personalized travel plans tailored to your interests and budget.', icon: 'custom' }
      ]
    },
    special_offers: {
      offer_list: [
        { title: 'Summer in Europe', description: '10-day tour of Italy, France, and Spain with guided excursions and premium accommodations.', discount: '15% Off', valid_until: 'May 31, 2025', image: '', url: 'https://www.wanderlusttravel.com/offers/summer-europe' },
        { title: 'Tropical Escape', description: 'All-inclusive Caribbean resort stay with airfare and activities included.', discount: '$300 Off', valid_until: 'June 15, 2025', image: '', url: 'https://www.wanderlusttravel.com/offers/tropical-escape' }
      ]
    },
    contact: {
      email: 'info@wanderlusttravel.com',
      phone: '(555) 123-4567',
      website: 'https://www.wanderlusttravel.com',
      address: '123 Journey Lane, Suite 200, San Francisco, CA 94110',
      emergency: '(555) 987-6543'
    },
    social: {
      social_links: [
        { platform: 'instagram', url: 'https://instagram.com/wanderlusttravel', username: '@wanderlusttravel' },
        { platform: 'facebook', url: 'https://facebook.com/wanderlusttravel', username: 'Wanderlust Travel' },
        { platform: 'tripadvisor', url: 'https://tripadvisor.com/wanderlusttravel', username: 'Wanderlust Travel' },
        { platform: 'youtube', url: 'https://youtube.com/wanderlusttravel', username: 'Wanderlust Travel' }
      ]
    },
    videos: {
      video_list: [
        { title: 'Santorini Travel Guide - Hidden Gems', description: 'Discover the secret spots and local experiences in beautiful Santorini', video_type: 'destination_guide', embed_url: '', thumbnail: '', duration: '10:30' },
        { title: 'Essential Packing Tips for International Travel', description: 'Expert advice on packing smart for your next international adventure', video_type: 'travel_tips', embed_url: '', thumbnail: '', duration: '7:15' },
        { title: 'The Martinez Family\'s Costa Rica Adventure', description: 'Follow the Martinez family on their unforgettable Costa Rica journey', video_type: 'client_journey', embed_url: '', thumbnail: '', duration: '12:45' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/wanderlusttravel',
      channel_name: 'Wanderlust Travel',
      subscriber_count: '34.7K',
      featured_playlist: 'https://youtube.com/playlist?list=PLdestinationguides',
      latest_video_embed: '',
      channel_description: 'Travel guides, destination tips, and inspiring travel stories from around the world. Subscribe for weekly travel inspiration and expert advice!'
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '09:00', close_time: '18:00', is_closed: false },
        { day: 'tuesday', open_time: '09:00', close_time: '18:00', is_closed: false },
        { day: 'wednesday', open_time: '09:00', close_time: '18:00', is_closed: false },
        { day: 'thursday', open_time: '09:00', close_time: '18:00', is_closed: false },
        { day: 'friday', open_time: '09:00', close_time: '18:00', is_closed: false },
        { day: 'saturday', open_time: '10:00', close_time: '15:00', is_closed: false },
        { day: 'sunday', open_time: '', close_time: '', is_closed: true }
      ]
    },
    gallery: {
      photos: [
        { image: '', caption: 'Sunset over Santorini', location: 'Greece' },
        { image: '', caption: 'Rice terraces in Ubud', location: 'Bali, Indonesia' },
        { image: '', caption: 'Cherry blossoms at Kiyomizu-dera Temple', location: 'Kyoto, Japan' },
        { image: '', caption: 'Machu Picchu vista', location: 'Peru' }
      ]
    },
    testimonials: {
      reviews: [
        { client_name: 'Jennifer & David', review: 'Our honeymoon to Bali was absolutely perfect. Wanderlust Travel took care of every detail, allowing us to focus on enjoying our special trip. The private villa they recommended was stunning!', rating: '5', destination: 'Bali', trip_date: 'September 2023' },
        { client_name: 'Robert T.', review: 'The guided tour of Japan was exceptional. Our guide was knowledgeable and took us to places we would never have discovered on our own. Will definitely book with Wanderlust again!', rating: '5', destination: 'Japan', trip_date: 'April 2023' },
        { client_name: 'The Martinez Family', review: 'Planning a trip for a family of five can be challenging, but Wanderlust made it easy. Our Costa Rica adventure had something for everyone - beaches, rainforests, and wildlife.', rating: '4', destination: 'Costa Rica', trip_date: 'July 2023' }
      ]
    },
    appointments: {
      booking_url: 'https://calendly.com/wanderlusttravel',
      section_title: 'Plan Your Adventure',
      section_description: 'Ready to explore the world? Let us help you plan your perfect trip.',
      booking_text: 'Schedule a Consultation',
      consultation_text: 'Free Travel Planning Session'
    },
    google_map: {
      map_embed_url: '',
      directions_url: 'https://maps.google.com/directions'
    },
    app_download: {
      app_store_url: '#',
      play_store_url: '#',
      app_description: 'Download our app to browse destinations, access your travel itineraries offline, and receive real-time travel alerts.'
    },
    contact_form: {
      form_title: 'Plan Your Next Adventure',
      form_description: 'Tell us about your dream trip, and one of our travel consultants will contact you to start planning your perfect getaway.'
    },
    thank_you: {
      message: 'Thank you for contacting Wanderlust Travel. We appreciate your interest and will get back to you within 24-48 hours to discuss your travel plans.'
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
      html_content: '<div class="travel-promo"><h4>Special Travel Deals</h4><p>Discover exclusive offers and travel packages.</p></div>',
      section_title: 'Travel Promotions',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Share Our Travel Services',
      qr_description: 'Scan this QR code to access our travel agency information and book your next adventure.',
      qr_size: 'medium'
    },
    language: {
      template_language: 'en'
    },
    footer: {
      show_footer: true,
      footer_text: 'Discover the world with us. Expert travel planning, personalized itineraries, and unforgettable experiences await.',
      footer_links: [
        { title: 'Destinations', url: '#destinations' },
        { title: 'Travel Packages', url: '#offers' },
        { title: 'Plan Your Trip', url: '#booking' },
        { title: 'Travel Tips', url: '#videos' }
      ]
    },
    copyright: {
      text: '© 2025 Wanderlust Travel. All rights reserved.'
    }
  }
};