import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const fitnessTemplate = {
  name: 'Fitness Trainer',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Full Name' },
        { name: 'title', type: 'text', label: 'Professional Title' },
        { name: 'tagline', type: 'textarea', label: 'Tagline' },
        { name: 'motivational_quote', type: 'text', label: 'Motivational Quote' },
        { name: 'profile_image', type: 'file', label: 'Profile Image' },
        { name: 'cover_image', type: 'file', label: 'Cover Image' }
      ],
      required: true
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'About Me' },
        { name: 'experience', type: 'number', label: 'Years of Experience' },
        { name: 'specialties', type: 'tags', label: 'Specialties' },
        { name: 'certifications', type: 'tags', label: 'Certifications' }
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
        { name: 'location', type: 'text', label: 'Gym/Studio Location' }
      ],
      required: true
    },
    {
      key: 'services',
      name: 'Services',
      fields: [
        {
          name: 'service_list',
          type: 'repeater',
          label: 'Training Services',
          fields: [
            { name: 'title', type: 'text', label: 'Service Title' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'price', type: 'text', label: 'Price' },
            { name: 'duration', type: 'text', label: 'Duration' },
            { name: 'icon', type: 'select', label: 'Icon', options: [
              { value: 'dumbbell', label: 'Dumbbell' },
              { value: 'running', label: 'Running' },
              { value: 'yoga', label: 'Yoga' },
              { value: 'nutrition', label: 'Nutrition' },
              { value: 'group', label: 'Group Training' },
              { value: 'personal', label: 'Personal Training' }
            ]}
          ]
        }
      ],
      required: false
    },
    {
      key: 'transformation',
      name: 'Transformations',
      fields: [
        {
          name: 'gallery',
          type: 'repeater',
          label: 'Client Transformations',
          fields: [
            { name: 'title', type: 'text', label: 'Client Name' },
            { name: 'before_image', type: 'file', label: 'Before Image' },
            { name: 'after_image', type: 'file', label: 'After Image' },
            { name: 'description', type: 'textarea', label: 'Transformation Story' },
            { name: 'duration', type: 'text', label: 'Time Period' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'videos',
      name: 'Training Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Fitness Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'workout_demo', label: 'Workout Demonstration' },
              { value: 'exercise_tutorial', label: 'Exercise Tutorial' },
              { value: 'nutrition_tips', label: 'Nutrition Tips' },
              { value: 'client_transformation', label: 'Client Transformation' },
              { value: 'motivational', label: 'Motivational Content' },
              { value: 'form_correction', label: 'Form & Technique' }
            ]},
            { name: 'embed_url', type: 'textarea', label: 'Video Embed URL' },
            { name: 'thumbnail', type: 'file', label: 'Video Thumbnail' },
            { name: 'duration', type: 'text', label: 'Duration' },
            { name: 'difficulty_level', type: 'select', label: 'Difficulty Level', options: [
              { value: 'beginner', label: 'Beginner' },
              { value: 'intermediate', label: 'Intermediate' },
              { value: 'advanced', label: 'Advanced' },
              { value: 'all_levels', label: 'All Levels' }
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
      key: 'programs',
      name: 'Training Programs',
      fields: [
        {
          name: 'program_list',
          type: 'repeater',
          label: 'Programs',
          fields: [
            { name: 'title', type: 'text', label: 'Program Title' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'duration', type: 'text', label: 'Duration' },
            { name: 'level', type: 'select', label: 'Difficulty Level', options: [
              { value: 'beginner', label: 'Beginner' },
              { value: 'intermediate', label: 'Intermediate' },
              { value: 'advanced', label: 'Advanced' },
              { value: 'all', label: 'All Levels' }
            ]},
            { name: 'price', type: 'text', label: 'Price' }
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
      key: 'business_hours',
      name: 'Business Hours',
      fields: [
        {
          name: 'hours',
          type: 'repeater',
          label: 'Training Hours',
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
            { name: 'is_closed', type: 'checkbox', label: 'Not Available' }
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
        { name: 'booking_text', type: 'text', label: 'Booking Button Text' },
        { name: 'consultation_text', type: 'text', label: 'Free Consultation Text' }
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
            { name: 'client_image', type: 'file', label: 'Client Image' },
            { name: 'review', type: 'textarea', label: 'Review Text' },
            { name: 'rating', type: 'number', label: 'Rating (1-5)' },
            { name: 'goal_achieved', type: 'text', label: 'Goal Achieved' }
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
    { name: 'Energy Red', primary: '#FF4136', secondary: '#FF725C', accent: '#FFCEC9', background: '#FFFFFF', text: '#333333' },
    { name: 'Power Blue', primary: '#0074D9', secondary: '#7FDBFF', accent: '#E3F2FD', background: '#F5F7FA', text: '#333333' },
    { name: 'Vitality Green', primary: '#2ECC40', secondary: '#01FF70', accent: '#E8F5E9', background: '#FFFFFF', text: '#333333' },
    { name: 'Strength Black', primary: '#111111', secondary: '#333333', accent: '#F5F5F5', background: '#FFFFFF', text: '#333333' },
    { name: 'Fitness Orange', primary: '#FF851B', secondary: '#FFC300', accent: '#FFF3E0', background: '#FFFFFF', text: '#333333' },
    { name: 'Muscle Purple', primary: '#B10DC9', secondary: '#E066FF', accent: '#F3E5F5', background: '#FFFFFF', text: '#333333' },
    { name: 'Cardio Pink', primary: '#FF4081', secondary: '#FF80AB', accent: '#FCE4EC', background: '#FFFFFF', text: '#333333' },
    { name: 'Endurance Teal', primary: '#39CCCC', secondary: '#7FDBFF', accent: '#E0F7FA', background: '#FFFFFF', text: '#333333' },
    { name: 'Gym Dark', primary: '#001f3f', secondary: '#0074D9', accent: '#E3F2FD', background: '#F5F7FA', text: '#333333' },
    { name: 'Wellness Mint', primary: '#3D9970', secondary: '#2ECC40', accent: '#E8F5E9', background: '#FFFFFF', text: '#333333' }
  ],
  fontOptions: [
    { name: 'Montserrat', value: 'Montserrat, sans-serif', weight: '400,500,600,700,800' },
    { name: 'Roboto Condensed', value: 'Roboto Condensed, sans-serif', weight: '400,700' },
    { name: 'Oswald', value: 'Oswald, sans-serif', weight: '400,500,600,700' },
    { name: 'Bebas Neue', value: 'Bebas Neue, cursive', weight: '400' },
    { name: 'Poppins', value: 'Poppins, sans-serif', weight: '400,500,600,700,800' }
  ],
  defaultColors: {
    primary: '#FF4136',
    secondary: '#FF725C',
    accent: '#FFCEC9',
    background: '#FFFFFF',
    text: '#333333',
    cardBg: '#F9F9F9',
    borderColor: '#EEEEEE',
    buttonText: '#FFFFFF',
    highlightColor: '#FFD700'
  },
  defaultFont: 'Montserrat, sans-serif',
  themeStyle: {
    layout: 'fitness-layout',
    headerStyle: 'dynamic',
    cardStyle: 'fitness-card',
    buttonStyle: 'rounded-full',
    iconStyle: 'fitness',
    spacing: 'comfortable',
    shadows: 'soft',
    animations: 'energetic',
    backgroundPattern: 'fitness-pattern',
    progressBars: true,
    motivationalQuotes: true
  },
  defaultData: {
    header: {
      name: 'Alex Fitness',
      title: 'Certified Personal Trainer',
      tagline: 'Transform your body, transform your life',
      motivational_quote: 'TRANSFORM YOUR BODY, TRANSFORM YOUR LIFE',
      profile_image: '',
      cover_image: ''
    },
    about: {
      description: 'With over 8 years of experience in personal training and nutrition coaching, I help clients achieve their fitness goals through personalized workout plans and dietary guidance. My approach focuses on sustainable lifestyle changes rather than quick fixes.',
      experience: '8',
      specialties: 'Weight Loss, Muscle Building, HIIT, Nutrition Planning, Functional Training',
      certifications: 'NASM CPT, ACE Nutrition Specialist, CrossFit Level 2, First Aid/CPR'
    },
    contact: {
      email: 'alex@fitnesstrainer.com',
      phone: '+1 (555) 987-6543',
      website: 'https://alexfitness.com',
      location: 'Powerhouse Gym, 123 Fitness Ave, New York, NY'
    },
    services: {
      service_list: [
        { title: 'Personal Training', description: 'One-on-one customized training sessions tailored to your specific goals and fitness level', price: '$75', duration: '60 min', icon: 'personal' },
        { title: 'Group Classes', description: 'High-energy group workouts that combine strength training and cardio for maximum results', price: '$25', duration: '45 min', icon: 'group' },
        { title: 'Nutrition Coaching', description: 'Personalized meal plans and nutritional guidance to complement your fitness routine', price: '$150', duration: 'Monthly', icon: 'nutrition' },
        { title: 'Online Training', description: 'Remote coaching with weekly check-ins, custom workouts and video feedback', price: '$200', duration: 'Monthly', icon: 'personal' }
      ]
    },
    transformation: {
      gallery: [
        { title: 'Sarah M.', before_image: '', after_image: '', description: 'Lost 30 pounds and gained confidence through consistent training and nutrition guidance', duration: '6 months' },
        { title: 'Mike T.', before_image: '', after_image: '', description: 'Gained 15 pounds of muscle and improved overall strength with personalized strength training program', duration: '4 months' }
      ]
    },
    programs: {
      program_list: [
        { title: '8-Week Fat Loss Program', description: 'Comprehensive program combining HIIT workouts, strength training, and nutrition guidance for maximum fat loss', duration: '8 weeks', level: 'all', price: '$399' },
        { title: 'Muscle Building Blueprint', description: 'Strategic training and nutrition plan designed to build lean muscle mass and increase strength', duration: '12 weeks', level: 'intermediate', price: '$499' },
        { title: 'Total Body Transformation', description: 'Complete lifestyle overhaul with training, nutrition, and accountability coaching', duration: '16 weeks', level: 'all', price: '$799' }
      ]
    },
    social: {
      social_links: [
        { platform: 'instagram', url: 'https://instagram.com/alexfitness', username: 'alexfitness' },
        { platform: 'youtube', url: 'https://youtube.com/alexfitness', username: 'Alex Fitness' },
        { platform: 'tiktok', url: 'https://tiktok.com/@alexfitness', username: '@alexfitness' },
        { platform: 'facebook', url: 'https://facebook.com/alexfitness', username: 'Alex Fitness' }
      ]
    },
    videos: {
      video_list: [
        { title: 'Perfect Push-Up Form Tutorial', description: 'Master the push-up with proper form and technique for maximum results', video_type: 'exercise_tutorial', embed_url: '', thumbnail: '', duration: '5:30', difficulty_level: 'beginner' },
        { title: '20-Minute HIIT Fat Burning Workout', description: 'High-intensity workout you can do anywhere - no equipment needed', video_type: 'workout_demo', embed_url: '', thumbnail: '', duration: '20:15', difficulty_level: 'intermediate' },
        { title: 'Sarah\'s 30lb Weight Loss Journey', description: 'Follow Sarah\'s incredible transformation and the strategies that worked', video_type: 'client_transformation', embed_url: '', thumbnail: '', duration: '8:45', difficulty_level: 'all_levels' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/alexfitness',
      channel_name: 'Alex Fitness',
      subscriber_count: '127K',
      featured_playlist: 'https://youtube.com/playlist?list=PLbeginnerfriendly',
      latest_video_embed: '',
      channel_description: 'Free workout tutorials, nutrition tips, and fitness motivation from a certified personal trainer. New videos every Tuesday and Friday!'
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '06:00', close_time: '20:00', is_closed: false },
        { day: 'tuesday', open_time: '06:00', close_time: '20:00', is_closed: false },
        { day: 'wednesday', open_time: '06:00', close_time: '20:00', is_closed: false },
        { day: 'thursday', open_time: '06:00', close_time: '20:00', is_closed: false },
        { day: 'friday', open_time: '06:00', close_time: '19:00', is_closed: false },
        { day: 'saturday', open_time: '08:00', close_time: '16:00', is_closed: false },
        { day: 'sunday', open_time: '09:00', close_time: '14:00', is_closed: false }
      ]
    },
    appointments: {
      booking_url: 'https://calendly.com/alexfitness',
      calendar_link: 'https://calendar.google.com/alexfitness',
      booking_text: 'Book a Training Session',
      consultation_text: 'Get a Free Fitness Assessment'
    },
    testimonials: {
      reviews: [
        { client_name: 'Jennifer L.', client_image: '', review: 'Working with Alex completely changed my relationship with fitness. I\'ve lost 45 pounds and feel stronger than ever!', rating: '5', goal_achieved: 'Weight Loss' },
        { client_name: 'David R.', client_image: '', review: 'Alex\'s personalized approach helped me build muscle and improve my athletic performance. Highly recommended!', rating: '5', goal_achieved: 'Muscle Gain' },
        { client_name: 'Michelle K.', client_image: '', review: 'The nutrition guidance was a game-changer for me. I finally understand how to eat for my goals.', rating: '5', goal_achieved: 'Nutrition Education' }
      ]
    },
    google_map: {
      map_embed_url: '',
      directions_url: 'https://maps.google.com/directions'
    },
    app_download: {
      app_store_url: '#',
      play_store_url: '#',
      app_description: 'Download our fitness app for workout tracking, nutrition tips, and exclusive training content.'
    },
    contact_form: {
      form_title: 'Ready to Start Your Fitness Journey?',
      form_description: 'Fill out the form below to get in touch. I\'ll respond within 24 hours to discuss how we can work together to achieve your fitness goals.'
    },
    thank_you: {
      message: 'Thank you for your interest! I look forward to helping you achieve your fitness goals. I\'ll be in touch shortly to discuss the next steps.'
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
      html_content: '<div class="custom-section"><h4>Fitness Tips</h4><p>Check out my latest workout tips and nutrition advice.</p></div>',
      section_title: 'Training Resources',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Share My Training',
      qr_description: 'Scan this QR code to share my personal training services with friends.',
      qr_size: 'medium'
    },
    language: {
      template_language: 'en'
    },
    footer: {
      show_footer: true,
      footer_text: 'Transform your body, transform your life. Professional personal training and nutrition coaching to help you achieve your fitness goals.',
      footer_links: [
        { title: 'Free Consultation', url: '#consultation' },
        { title: 'Training Programs', url: '#programs' },
        { title: 'Nutrition Plans', url: '#nutrition' },
        { title: 'Book Session', url: '#booking' }
      ]
    },
    copyright: {
      text: '© 2025 Alex Fitness. All rights reserved.'
    }
  }
};