import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const realEstateTemplate = {
  name: 'Real Estate Agent',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Agent Name' },
        { name: 'title', type: 'text', label: 'Professional Title' },
        { name: 'agency', type: 'text', label: 'Agency Name' },
        { name: 'license_number', type: 'text', label: 'License Number' },
        { name: 'achievement_badge', type: 'text', label: 'Achievement Badge' },
        { name: 'service_area', type: 'text', label: 'Service Area' },
        { name: 'property_types', type: 'text', label: 'Property Types' },
        { name: 'specialization', type: 'text', label: 'Specialization' },
        { name: 'rating', type: 'text', label: 'Rating' },
        { name: 'profile_image', type: 'file', label: 'Profile Image' }
      ],
      required: true
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'About Me' },
        { name: 'experience_years', type: 'number', label: 'Years of Experience' },
        { name: 'specialties', type: 'tags', label: 'Specialties' },
        { name: 'certifications', type: 'tags', label: 'Certifications' }
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
        { name: 'office_address', type: 'textarea', label: 'Office Address' }
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
      key: 'featured_listings',
      name: 'Featured Listings',
      fields: [
        {
          name: 'properties',
          type: 'repeater',
          label: 'Properties',
          fields: [
            { name: 'address', type: 'text', label: 'Property Address' },
            { name: 'price', type: 'text', label: 'Price' },
            { name: 'bedrooms', type: 'number', label: 'Bedrooms' },
            { name: 'bathrooms', type: 'number', label: 'Bathrooms' },
            { name: 'sqft', type: 'number', label: 'Square Footage' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'image', type: 'file', label: 'Property Image' },
            { name: 'status', type: 'select', label: 'Status', options: [
              { value: 'for_sale', label: 'For Sale' },
              { value: 'for_rent', label: 'For Rent' },
              { value: 'pending', label: 'Pending' },
              { value: 'sold', label: 'Sold' }
            ]},
            { name: 'listing_url', type: 'url', label: 'Listing URL' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'videos',
      name: 'Property Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Real Estate Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'property_tour', label: 'Property Tour' },
              { value: 'neighborhood_guide', label: 'Neighborhood Guide' },
              { value: 'market_update', label: 'Market Update' },
              { value: 'client_testimonial', label: 'Client Testimonial' },
              { value: 'buying_tips', label: 'Buying/Selling Tips' },
              { value: 'agent_introduction', label: 'Agent Introduction' }
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
      key: 'services',
      name: 'Services',
      fields: [
        {
          name: 'service_list',
          type: 'repeater',
          label: 'Services',
          fields: [
            { name: 'title', type: 'text', label: 'Service Title' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'icon', type: 'select', label: 'Icon', options: [
              { value: 'home', label: 'Home' },
              { value: 'building', label: 'Building' },
              { value: 'key', label: 'Key' },
              { value: 'dollar', label: 'Dollar' },
              { value: 'chart', label: 'Chart' },
              { value: 'search', label: 'Search' },
              { value: 'handshake', label: 'Handshake' }
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
            { name: 'transaction_type', type: 'select', label: 'Transaction Type', options: [
              { value: 'buyer', label: 'Buyer' },
              { value: 'seller', label: 'Seller' },
              { value: 'both', label: 'Both' },
              { value: 'rental', label: 'Rental' }
            ]}
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
      name: 'Appointments',
      fields: [
        { name: 'booking_url', type: 'url', label: 'Booking URL' },
        { name: 'calendar_link', type: 'url', label: 'Calendar Link' },
        { name: 'appointment_types', type: 'tags', label: 'Appointment Types (e.g., Showing, Consultation)' },
        { name: 'appointment_notes', type: 'textarea', label: 'Appointment Notes' }
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
      key: 'market_stats',
      name: 'Market Statistics',
      fields: [
        { name: 'area_served', type: 'text', label: 'Area Served' },
        { name: 'avg_home_price', type: 'text', label: 'Average Home Price' },
        { name: 'avg_days_on_market', type: 'number', label: 'Average Days on Market' },
        { name: 'market_description', type: 'textarea', label: 'Market Description' }
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
        { name: 'text', type: 'text', label: 'Copyright Text' },
        { name: 'disclaimer', type: 'textarea', label: 'Legal Disclaimer' }
      ],
      required: false
    }
  ],
  colorPresets: [
    { name: 'Professional Blue', primary: '#1A365D', secondary: '#2A4365', accent: '#EBF8FF', background: '#FFFFFF', text: '#2D3748' },
    { name: 'Luxury Gold', primary: '#744210', secondary: '#975A16', accent: '#FFFFF0', background: '#FFFFFF', text: '#2D3748' },
    { name: 'Modern Gray', primary: '#4A5568', secondary: '#718096', accent: '#F7FAFC', background: '#FFFFFF', text: '#2D3748' },
    { name: 'Coastal Teal', primary: '#285E61', secondary: '#2C7A7B', accent: '#E6FFFA', background: '#FFFFFF', text: '#2D3748' },
    { name: 'Urban Brick', primary: '#9B2C2C', secondary: '#C53030', accent: '#FFF5F5', background: '#FFFFFF', text: '#2D3748' },
    { name: 'Forest Green', primary: '#276749', secondary: '#2F855A', accent: '#F0FFF4', background: '#FFFFFF', text: '#2D3748' },
    { name: 'Elegant Purple', primary: '#553C9A', secondary: '#6B46C1', accent: '#FAF5FF', background: '#FFFFFF', text: '#2D3748' },
    { name: 'Warm Terracotta', primary: '#C05621', secondary: '#DD6B20', accent: '#FFFAF0', background: '#FFFFFF', text: '#2D3748' },
    { name: 'Classic Black', primary: '#1A202C', secondary: '#2D3748', accent: '#F7FAFC', background: '#FFFFFF', text: '#2D3748' },
    { name: 'Soft Beige', primary: '#8B5C24', secondary: '#A27A3A', accent: '#FEFCBF', background: '#FFFFF0', text: '#2D3748' }
  ],
  fontOptions: [
    { name: 'Raleway', value: 'Raleway, sans-serif', weight: '300,400,500,600,700' },
    { name: 'Roboto', value: 'Roboto, sans-serif', weight: '300,400,500,700' },
    { name: 'Playfair Display', value: 'Playfair Display, serif', weight: '400,500,600,700' },
    { name: 'Poppins', value: 'Poppins, sans-serif', weight: '300,400,500,600,700' },
    { name: 'Libre Baskerville', value: 'Libre Baskerville, serif', weight: '400,700' }
  ],
  defaultColors: {
    primary: '#1A365D',
    secondary: '#2A4365',
    accent: '#EBF8FF',
    background: '#FFFFFF',
    text: '#2D3748',
    cardBg: '#F7FAFC',
    borderColor: '#E2E8F0',
    buttonBg: '#1A365D',
    buttonText: '#FFFFFF'
  },
  defaultFont: 'Raleway, sans-serif',
  themeStyle: {
    layout: 'modern-cards',
    headerStyle: 'professional',
    cardStyle: 'shadow',
    buttonStyle: 'rounded',
    iconStyle: 'simple',
    spacing: 'comfortable',
    shadows: 'medium',
    animations: 'slide',
    backgroundPattern: 'none'
  },
  defaultData: {
    header: {
      name: 'Sarah Johnson',
      title: 'Licensed Real Estate Agent',
      agency: 'Premier Properties',
      license_number: 'RE-12345678',
      achievement_badge: 'Top Agent 2025',
      service_area: 'Greater Metropolitan Area',
      property_types: 'Residential & Commercial',
      specialization: 'Specialized in Luxury Properties',
      rating: '5.0 Rating',
      profile_image: ''
    },
    about: {
      description: 'With over 10 years of experience in the real estate market, I specialize in helping clients find their dream homes and investment properties. My knowledge of the local market and dedication to client satisfaction ensures a smooth and successful transaction.',
      experience_years: '10',
      specialties: 'Residential, Luxury Homes, First-Time Buyers, Investment Properties',
      certifications: 'CRS, ABR, SRS, GRI'
    },
    contact: {
      phone: '+1 (555) 987-6543',
      email: 'sarah@premierproperties.com',
      website: 'https://www.sarahjohnsonrealty.com',
      office_address: '789 Realty Drive\nSuite 200\nMetro City, CA 90210'
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '09:00', close_time: '17:00', is_closed: false },
        { day: 'tuesday', open_time: '09:00', close_time: '17:00', is_closed: false },
        { day: 'wednesday', open_time: '09:00', close_time: '17:00', is_closed: false },
        { day: 'thursday', open_time: '09:00', close_time: '17:00', is_closed: false },
        { day: 'friday', open_time: '09:00', close_time: '17:00', is_closed: false },
        { day: 'saturday', open_time: '10:00', close_time: '15:00', is_closed: false },
        { day: 'sunday', open_time: '', close_time: '', is_closed: true }
      ]
    },
    featured_listings: {
      properties: [
        { 
          address: '123 Luxury Lane, Metro City, CA', 
          price: '$1,250,000', 
          bedrooms: '4', 
          bathrooms: '3.5', 
          sqft: '3200', 
          description: 'Stunning modern home with open floor plan, gourmet kitchen, and resort-style backyard with pool and spa.', 
          image: '', 
          status: 'for_sale',
          listing_url: 'https://www.sarahjohnsonrealty.com/listings/123-luxury-lane'
        },
        { 
          address: '456 Family Circle, Metro City, CA', 
          price: '$750,000', 
          bedrooms: '3', 
          bathrooms: '2', 
          sqft: '1800', 
          description: 'Charming family home in top school district with updated kitchen, hardwood floors, and spacious backyard.', 
          image: '', 
          status: 'for_sale',
          listing_url: 'https://www.sarahjohnsonrealty.com/listings/456-family-circle'
        },
        { 
          address: '789 Downtown Loft, Metro City, CA', 
          price: '$525,000', 
          bedrooms: '2', 
          bathrooms: '2', 
          sqft: '1200', 
          description: 'Modern downtown loft with high ceilings, exposed brick, and amazing city views. Walking distance to restaurants and shops.', 
          image: '', 
          status: 'pending',
          listing_url: 'https://www.sarahjohnsonrealty.com/listings/789-downtown-loft'
        }
      ]
    },
    videos: {
      video_list: [
        { title: 'Luxury Home Tour - 123 Luxury Lane', description: 'Take a virtual tour of this stunning $1.25M modern home with pool and spa', video_type: 'property_tour', embed_url: '', thumbnail: '', duration: '5:30' },
        { title: 'Metro City Market Update - Q4 2024', description: 'Latest market trends, pricing, and what to expect in the coming months', video_type: 'market_update', embed_url: '', thumbnail: '', duration: '8:15' },
        { title: 'First-Time Homebuyer Tips', description: 'Essential advice for first-time buyers navigating today\'s market', video_type: 'buying_tips', embed_url: '', thumbnail: '', duration: '6:45' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/sarahjohnsonrealty',
      channel_name: 'Sarah Johnson Realty',
      subscriber_count: '4.8K',
      featured_playlist: 'https://youtube.com/playlist?list=PLpropertytours',
      latest_video_embed: '',
      channel_description: 'Property tours, market updates, and real estate tips from a top-performing agent in Metro City. Subscribe for weekly real estate insights!'
    },
    services: {
      service_list: [
        { title: 'Buyer Representation', description: 'Expert guidance through the entire home buying process, from search to closing.', icon: 'home' },
        { title: 'Seller Representation', description: 'Strategic marketing and pricing to sell your home quickly and for top dollar.', icon: 'dollar' },
        { title: 'Property Valuation', description: 'Detailed market analysis to determine the optimal listing price for your property.', icon: 'chart' },
        { title: 'Investment Consulting', description: 'Advice on real estate investments to maximize returns and build wealth.', icon: 'building' }
      ]
    },
    testimonials: {
      reviews: [
        { client_name: 'Michael & Jennifer Brown', review: 'Sarah helped us find our dream home in a competitive market. Her knowledge and negotiation skills were invaluable. We couldn\'t be happier with our purchase!', rating: '5', transaction_type: 'buyer' },
        { client_name: 'Robert Wilson', review: 'Sarah sold my home in just 5 days for above asking price. Her marketing strategy and staging advice made all the difference. Highly recommended!', rating: '5', transaction_type: 'seller' },
        { client_name: 'Lisa Martinez', review: 'As a first-time homebuyer, I was nervous about the process. Sarah guided me every step of the way and found me a perfect starter home within my budget.', rating: '5', transaction_type: 'buyer' }
      ]
    },
    social: {
      social_links: [
        { platform: 'facebook', url: 'https://facebook.com/sarahjohnsonrealty', username: 'sarahjohnsonrealty' },
        { platform: 'instagram', url: 'https://instagram.com/sarahjohnsonrealty', username: '@sarahjohnsonrealty' },
        { platform: 'linkedin', url: 'https://linkedin.com/in/sarahjohnsonrealty', username: 'sarahjohnsonrealty' },
        { platform: 'zillow', url: 'https://zillow.com/profile/sarahjohnsonrealty', username: 'Sarah Johnson' },
        { platform: 'youtube', url: 'https://youtube.com/sarahjohnsonrealty', username: 'Sarah Johnson Realty' }
      ]
    },
    appointments: {
      booking_url: 'https://calendly.com/sarahjohnsonrealty',
      calendar_link: 'https://calendar.google.com/sarahjohnsonrealty',
      appointment_types: 'Property Showing, Buyer Consultation, Seller Consultation, Market Analysis',
      appointment_notes: 'Please schedule appointments at least 24 hours in advance. For same-day showings, please call directly.'
    },
    google_map: {
      map_embed_url: '',
      directions_url: 'https://maps.google.com/directions'
    },
    market_stats: {
      area_served: 'Metro City and surrounding areas',
      avg_home_price: '$825,000',
      avg_days_on_market: '18',
      market_description: 'The Metro City real estate market remains strong with limited inventory and high demand, especially in desirable neighborhoods with good schools. Interest rates have stabilized, making it a good time for both buyers and sellers.'
    },
    app_download: {
      app_store_url: '#',
      play_store_url: '#',
      app_description: 'Download our app to search properties, schedule showings, and receive instant notifications about new listings that match your criteria.'
    },
    contact_form: {
      form_title: 'Contact Me',
      form_description: 'Have questions about buying or selling a home? Send me a message and I\'ll get back to you promptly.'
    },
    thank_you: {
      message: 'Thank you for reaching out! I appreciate your interest and will respond to your inquiry within 24 hours.'
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
      html_content: '<div class="custom-section"><h4>Market Insights</h4><p>Get the latest market trends and property insights in your area.</p></div>',
      section_title: 'Market Insights',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Share My Contact',
      qr_description: 'Scan this QR code to save my contact information and access my property listings.',
      qr_size: 'medium'
    },
    language: {
      template_language: 'en'
    },
    copyright: {
      text: '© 2025 Sarah Johnson, Premier Properties. All rights reserved.',
      disclaimer: 'Real estate agent is licensed in the state of California. Each office independently owned and operated. This is not intended as a solicitation if your property is currently listed with another broker.'
    }
  }
};