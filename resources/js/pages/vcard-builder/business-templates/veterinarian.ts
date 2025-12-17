import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const veterinarianTemplate = {
  name: 'Veterinarian & Animal Care',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Veterinarian Name' },
        { name: 'title', type: 'text', label: 'Professional Title' },
        { name: 'tagline', type: 'textarea', label: 'Care Philosophy' },
        { name: 'profile_image', type: 'file', label: 'Professional Photo' }
      ],
      required: true
    },
    {
      key: 'contact',
      name: 'Contact Information',
      fields: [
        { name: 'email', type: 'email', label: 'Email Address' },
        { name: 'phone', type: 'tel', label: 'Clinic Phone' },
        { name: 'website', type: 'url', label: 'Clinic Website' },
        { name: 'location', type: 'text', label: 'Clinic Location' }
      ],
      required: true
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'Professional Background' },
        { name: 'specialties', type: 'tags', label: 'Veterinary Specialties' },
        { name: 'experience', type: 'number', label: 'Years of Practice' },
        { name: 'education', type: 'textarea', label: 'Education & Certifications' }
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
          label: 'Veterinary Services',
          fields: [
            { name: 'title', type: 'text', label: 'Service Name' },
            { name: 'description', type: 'textarea', label: 'Service Description' },
            { name: 'animal_types', type: 'tags', label: 'Animal Types' },
            { name: 'price_range', type: 'text', label: 'Price Range' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'animal_care',
      name: 'Animal Care Tips',
      fields: [
        {
          name: 'care_tips',
          type: 'repeater',
          label: 'Pet Care Tips',
          fields: [
            { name: 'animal_type', type: 'select', label: 'Animal Type', options: [
              { value: 'dogs', label: 'Dogs' },
              { value: 'cats', label: 'Cats' },
              { value: 'birds', label: 'Birds' },
              { value: 'rabbits', label: 'Rabbits' },
              { value: 'reptiles', label: 'Reptiles' },
              { value: 'fish', label: 'Fish' },
              { value: 'exotic', label: 'Exotic Pets' }
            ]},
            { name: 'tip_title', type: 'text', label: 'Tip Title' },
            { name: 'tip_description', type: 'textarea', label: 'Care Tip' },
            { name: 'season', type: 'select', label: 'Season', options: [
              { value: 'all-year', label: 'All Year' },
              { value: 'spring', label: 'Spring' },
              { value: 'summer', label: 'Summer' },
              { value: 'fall', label: 'Fall' },
              { value: 'winter', label: 'Winter' }
            ]}
          ]
        }
      ],
      required: false
    },
    {
      key: 'videos',
      name: 'Pet Care Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Veterinary Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'pet_care_tips', label: 'Pet Care Tips' },
              { value: 'clinic_tour', label: 'Clinic Tour' },
              { value: 'procedure_explanation', label: 'Procedure Explanation' },
              { value: 'pet_health_education', label: 'Pet Health Education' },
              { value: 'success_story', label: 'Pet Success Story' },
              { value: 'emergency_tips', label: 'Emergency Care Tips' }
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
      key: 'emergency',
      name: 'Emergency Care',
      fields: [
        { name: 'emergency_phone', type: 'tel', label: 'Emergency Phone' },
        { name: 'after_hours_info', type: 'textarea', label: 'After Hours Information' },
        { name: 'emergency_clinic', type: 'text', label: 'Partner Emergency Clinic' },
        { name: 'emergency_tips', type: 'textarea', label: 'Emergency First Aid Tips' }
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
          label: 'Social Platforms',
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
          label: 'Clinic Hours',
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
      name: 'Appointments',
      fields: [
        { name: 'booking_url', type: 'url', label: 'Appointment Booking URL' },
        { name: 'calendar_link', type: 'url', label: 'Calendar Link' },
        { name: 'appointment_info', type: 'textarea', label: 'Appointment Instructions' }
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
            { name: 'client_name', type: 'text', label: 'Pet Owner Name' },
            { name: 'pet_name', type: 'text', label: 'Pet Name' },
            { name: 'pet_type', type: 'text', label: 'Pet Type' },
            { name: 'review', type: 'textarea', label: 'Review Text' },
            { name: 'rating', type: 'number', label: 'Rating (1-5)' }
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
    { name: 'Caring Blue', primary: '#4A90E2', secondary: '#7BB3F0', accent: '#50C878', background: '#F8FBFF', text: '#1A365D', cardBg: '#FFFFFF' },
    { name: 'Gentle Green', primary: '#28A745', secondary: '#34CE57', accent: '#85E085', background: '#F0FFF4', text: '#155724', cardBg: '#FFFFFF' },
    { name: 'Warm Orange', primary: '#FF8C42', secondary: '#FFB366', accent: '#FFE5B4', background: '#FFF8F0', text: '#8B4513', cardBg: '#FFFFFF' },
    { name: 'Calm Purple', primary: '#8A63D2', secondary: '#B19CD9', accent: '#E6E6FA', background: '#FAF8FF', text: '#3D2B56', cardBg: '#FFFFFF' },
    { name: 'Trust Teal', primary: '#20B2AA', secondary: '#48D1CC', accent: '#E0FFFF', background: '#F0FFFF', text: '#2F4F4F', cardBg: '#FFFFFF' }
  ],
  fontOptions: [
    { name: 'Inter', value: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'Roboto', value: 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,700' },
    { name: 'Open Sans', value: 'Open Sans, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,600,700' },
    { name: 'Lato', value: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,700' },
    { name: 'Source Sans Pro', value: 'Source Sans Pro, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,600,700' }
  ],
  defaultColors: {
    primary: '#4A90E2',
    secondary: '#7BB3F0',
    accent: '#50C878',
    background: '#F8FBFF',
    text: '#1A365D',
    cardBg: '#FFFFFF',
    borderColor: '#E2E8F0',
    shadowColor: 'rgba(74, 144, 226, 0.2)'
  },
  defaultFont: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  themeStyle: {
    layout: 'pet-friendly',
    headerStyle: 'veterinary-care',
    cardStyle: 'animal-cards',
    buttonStyle: 'caring-buttons',
    iconStyle: 'animal-icons',
    spacing: 'comfortable-care',
    shadows: 'gentle-glow',
    animations: 'playful-bounce',
    backgroundPattern: 'paw-prints',
    typography: 'friendly-sans'
  },
  defaultData: {
    header: {
      name: 'Dr. Emily Parker',
      title: 'Doctor of Veterinary Medicine',
      tagline: 'Providing compassionate, comprehensive care for your beloved pets with expertise, empathy, and dedication',
      profile_image: ''
    },
    contact: {
      email: 'info@parkerveterinary.com',
      phone: '+1 (555) 890-1234',
      website: 'https://parkerveterinary.com',
      location: 'Austin, TX'
    },
    about: {
      description: 'Dedicated veterinarian with 10+ years of experience providing exceptional care for pets of all sizes. Passionate about preventive medicine, surgery, and building lasting relationships with pet families.',
      specialties: 'Small Animal Medicine, Surgery, Dental Care, Preventive Medicine, Emergency Care',
      experience: '10',
      education: 'DVM from Texas A&M University, Board Certified in Small Animal Practice'
    },
    services: {
      service_list: [
        { title: 'Wellness Exams', description: 'Comprehensive health checkups and preventive care for your pet', animal_types: 'Dogs, Cats, Rabbits', price_range: '$75-150' },
        { title: 'Vaccinations', description: 'Core and non-core vaccines to protect your pet from diseases', animal_types: 'Dogs, Cats, Ferrets', price_range: '$50-200' },
        { title: 'Dental Care', description: 'Professional dental cleaning and oral health maintenance', animal_types: 'Dogs, Cats', price_range: '$300-800' },
        { title: 'Surgery', description: 'Soft tissue and orthopedic surgical procedures', animal_types: 'Dogs, Cats, Small Animals', price_range: '$500-3000' }
      ]
    },
    animal_care: {
      care_tips: [
        { animal_type: 'dogs', tip_title: 'Daily Exercise', tip_description: 'Ensure your dog gets at least 30 minutes of exercise daily to maintain physical and mental health', season: 'all-year' },
        { animal_type: 'cats', tip_title: 'Litter Box Maintenance', tip_description: 'Clean the litter box daily and provide one box per cat plus one extra', season: 'all-year' },
        { animal_type: 'dogs', tip_title: 'Summer Safety', tip_description: 'Never leave your dog in a hot car and provide plenty of water during summer walks', season: 'summer' }
      ]
    },
    videos: {
      video_list: [
        { title: 'How to Brush Your Dog\'s Teeth at Home', description: 'Step-by-step guide to maintaining your dog\'s dental health between vet visits', video_type: 'pet_care_tips', embed_url: '', thumbnail: '', duration: '6:30' },
        { title: 'Tour Our State-of-the-Art Veterinary Clinic', description: 'See our modern facilities and meet our caring team', video_type: 'clinic_tour', embed_url: '', thumbnail: '', duration: '4:45' },
        { title: 'Max\'s Recovery Story - From Emergency to Health', description: 'Follow Max\'s journey from emergency surgery to full recovery', video_type: 'success_story', embed_url: '', thumbnail: '', duration: '8:20' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/parkerveterinary',
      channel_name: 'Parker Veterinary',
      subscriber_count: '18.4K',
      featured_playlist: 'https://youtube.com/playlist?list=PLpetcaretips',
      latest_video_embed: '',
      channel_description: 'Pet care tips, health education, and veterinary insights from Dr. Emily Parker. Subscribe for weekly pet health advice and educational content!'
    },
    emergency: {
      emergency_phone: '+1 (555) 890-9999',
      after_hours_info: 'For after-hours emergencies, please call our emergency line or visit Austin Emergency Veterinary Clinic',
      emergency_clinic: 'Austin Emergency Veterinary Clinic - (555) 123-HELP',
      emergency_tips: 'Keep your pet calm, apply pressure to bleeding wounds, and contact us immediately for guidance'
    },
    social: {
      social_links: [
        { platform: 'facebook', url: 'https://facebook.com/parkerveterinary', username: 'Parker Veterinary Clinic' },
        { platform: 'instagram', url: 'https://instagram.com/dremilyparker', username: '@dremilyparker' },
        { platform: 'youtube', url: 'https://youtube.com/parkerveterinary', username: 'Parker Veterinary' }
      ]
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '08:00', close_time: '18:00', is_closed: false },
        { day: 'tuesday', open_time: '08:00', close_time: '18:00', is_closed: false },
        { day: 'wednesday', open_time: '08:00', close_time: '18:00', is_closed: false },
        { day: 'thursday', open_time: '08:00', close_time: '18:00', is_closed: false },
        { day: 'friday', open_time: '08:00', close_time: '18:00', is_closed: false },
        { day: 'saturday', open_time: '09:00', close_time: '15:00', is_closed: false },
        { day: 'sunday', open_time: '', close_time: '', is_closed: true }
      ]
    },
    appointments: {
      booking_url: 'https://calendly.com/dremilyparker',
      calendar_link: 'https://calendar.google.com/dremilyparker',
      appointment_info: 'Please bring your pet\'s vaccination records and any medications they are currently taking'
    },
    testimonials: {
      reviews: [
        { client_name: 'Sarah Johnson', pet_name: 'Max', pet_type: 'Golden Retriever', review: 'Dr. Parker saved Max\'s life during his emergency surgery. Her expertise and compassion made all the difference. Highly recommend!', rating: '5' },
        { client_name: 'Mike Chen', pet_name: 'Whiskers', pet_type: 'Persian Cat', review: 'Whiskers has been seeing Dr. Parker for 3 years. She\'s gentle, thorough, and always takes time to explain everything. Best vet in Austin!', rating: '5' }
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
      form_title: 'Schedule Your Pet\'s Visit',
      form_description: 'Ready to give your pet the best care possible? Contact us to schedule an appointment or ask any questions about your pet\'s health.'
    },
    thank_you: {
      message: 'Thank you for trusting us with your pet\'s care! We\'ll respond within 24 hours to schedule your appointment and answer any questions.'
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
      html_content: '<div class="pet-care-tips"><h4>Pet Health Tips</h4><p>Essential care advice for your beloved pets.</p></div>',
      section_title: 'Pet Care Resources',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Connect with Dr. Parker',
      qr_description: 'Scan this QR code to access our veterinary clinic information and schedule appointments.',
      qr_size: 'medium'
    },
    language: {
      template_language: 'en'
    },
    copyright: {
      text: '© 2025 Dr. Emily Parker Veterinary Practice. All rights reserved.'
    }
  }
};