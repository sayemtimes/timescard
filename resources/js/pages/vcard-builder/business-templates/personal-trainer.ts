import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const personalTrainerTemplate = {
  name: 'Personal Trainer & Fitness Coach',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Trainer Name' },
        { name: 'title', type: 'text', label: 'Specialty' },
        { name: 'tagline', type: 'textarea', label: 'Motivation Quote' },
        { name: 'profile_image', type: 'file', label: 'Profile Photo' },
        { name: 'badge_1', type: 'text', label: 'Badge 1 Text' },
        { name: 'badge_2', type: 'text', label: 'Badge 2 Text' },
        { name: 'badge_3', type: 'text', label: 'Badge 3 Text' }
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
        { name: 'location', type: 'text', label: 'Training Location' }
      ],
      required: true
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'About Me' },
        { name: 'specialties', type: 'tags', label: 'Training Specialties' },
        { name: 'experience', type: 'number', label: 'Years of Experience' }
      ],
      required: false
    },
    {
      key: 'services',
      name: 'Training Services',
      fields: [
        {
          name: 'service_list',
          type: 'repeater',
          label: 'Training Programs',
          fields: [
            { name: 'title', type: 'text', label: 'Program Name' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'price', type: 'text', label: 'Price' },
            { name: 'duration', type: 'text', label: 'Session Duration' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'achievements',
      name: 'Achievements & Certifications',
      fields: [
        {
          name: 'achievement_list',
          type: 'repeater',
          label: 'Certifications & Awards',
          fields: [
            { name: 'title', type: 'text', label: 'Achievement/Certification' },
            { name: 'organization', type: 'text', label: 'Organization' },
            { name: 'year', type: 'text', label: 'Year' }
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
              { value: 'client_success', label: 'Client Success Story' },
              { value: 'motivation', label: 'Motivational Content' },
              { value: 'form_correction', label: 'Form & Technique' }
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
      key: 'transformation_stories',
      name: 'Success Stories',
      fields: [
        {
          name: 'stories',
          type: 'repeater',
          label: 'Client Transformations',
          fields: [
            { name: 'client_name', type: 'text', label: 'Client Name' },
            { name: 'result', type: 'text', label: 'Achievement' },
            { name: 'timeframe', type: 'text', label: 'Timeframe' },
            { name: 'before_after', type: 'file', label: 'Before/After Photo' }
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
      name: 'Training Schedule',
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
            { name: 'is_closed', type: 'checkbox', label: 'Not Available' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'appointments',
      name: 'Book Training',
      fields: [
        { name: 'booking_url', type: 'url', label: 'Booking URL' },
        { name: 'consultation_note', type: 'textarea', label: 'Free Consultation Note' }
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
            { name: 'program', type: 'text', label: 'Training Program' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'google_map',
      name: 'Training Location',
      fields: [
        { name: 'map_embed_url', type: 'textarea', label: 'Google Maps Embed URL' },
        { name: 'directions_url', type: 'url', label: 'Google Maps Directions URL' }
      ],
      required: false
    },
    {
      key: 'app_download',
      name: 'Fitness App',
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
    { name: 'Energy Orange', primary: '#EA580C', secondary: '#FB923C', accent: '#FED7AA', background: '#FFF7ED', text: '#1C1917', cardBg: '#FFFFFF' },
    { name: 'Power Red', primary: '#DC2626', secondary: '#EF4444', accent: '#FEE2E2', background: '#FFFBFB', text: '#1F2937', cardBg: '#FFFFFF' },
    { name: 'Strength Blue', primary: '#1E40AF', secondary: '#3B82F6', accent: '#DBEAFE', background: '#F8FAFC', text: '#1E293B', cardBg: '#FFFFFF' },
    { name: 'Vitality Green', primary: '#059669', secondary: '#10B981', accent: '#D1FAE5', background: '#F0FDF4', text: '#1F2937', cardBg: '#FFFFFF' },
    { name: 'Muscle Purple', primary: '#7C3AED', secondary: '#8B5CF6', accent: '#E0E7FF', background: '#F8FAFC', text: '#374151', cardBg: '#FFFFFF' },
    { name: 'Cardio Pink', primary: '#DB2777', secondary: '#EC4899', accent: '#FCE7F3', background: '#FDF2F8', text: '#1F2937', cardBg: '#FFFFFF' }
  ],
  fontOptions: [
    { name: 'Poppins', value: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'Montserrat', value: 'Montserrat, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'Roboto', value: 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,700' },
    { name: 'Open Sans', value: 'Open Sans, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,600,700' },
    { name: 'Nunito', value: 'Nunito, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,600,700' }
  ],
  defaultColors: {
    primary: '#EA580C',
    secondary: '#FB923C',
    accent: '#FED7AA',
    background: '#FFF7ED',
    text: '#1C1917',
    cardBg: '#FFFFFF',
    borderColor: '#FDBA74'
  },
  defaultFont: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif',
  themeStyle: {
    layout: 'energetic',
    headerStyle: 'motivational',
    cardStyle: 'dynamic',
    buttonStyle: 'bold',
    iconStyle: 'filled',
    spacing: 'active',
    shadows: 'strong',
    animations: 'energetic'
  },
  defaultData: {
    header: {
      name: 'Alex Fitness',
      title: 'Certified Personal Trainer & Nutrition Coach',
      tagline: 'Transform your body, transform your life. Let\'s achieve your fitness goals together!',
      profile_image: '',
      badge_1: 'Transform',
      badge_2: 'Achieve',
      badge_3: 'Succeed'
    },
    contact: {
      email: 'train@alexfitness.com',
      phone: '+1 (555) GET-STRONG',
      website: 'https://alexfitness.com',
      location: 'Downtown Gym & Online'
    },
    about: {
      description: 'Certified personal trainer with 8 years of experience helping clients achieve their fitness goals. Specializing in strength training, weight loss, and lifestyle transformation.',
      specialties: 'Weight Loss, Strength Training, HIIT, Nutrition Coaching, Body Transformation',
      experience: '8'
    },
    services: {
      service_list: [
        { title: '1-on-1 Personal Training', description: 'Customized workout plans with personal attention', price: '$80/session', duration: '60 minutes' },
        { title: 'Small Group Training', description: 'Train with friends in groups of 2-4 people', price: '$45/person', duration: '45 minutes' },
        { title: 'Online Coaching', description: 'Virtual training sessions and meal planning', price: '$150/month', duration: 'Ongoing' },
        { title: 'Nutrition Consultation', description: 'Personalized meal plans and nutrition guidance', price: '$120', duration: '90 minutes' }
      ]
    },
    achievements: {
      achievement_list: [
        { title: 'NASM Certified Personal Trainer', organization: 'National Academy of Sports Medicine', year: '2020' },
        { title: 'Precision Nutrition Level 1', organization: 'Precision Nutrition', year: '2021' },
        { title: 'Trainer of the Year Award', organization: 'FitLife Gym', year: '2023' }
      ]
    },
    transformation_stories: {
      stories: [
        { client_name: 'Sarah M.', result: 'Lost 35 lbs, gained confidence', timeframe: '6 months', before_after: '' },
        { client_name: 'Mike T.', result: 'Built 15 lbs muscle, improved strength', timeframe: '4 months', before_after: '' },
        { client_name: 'Jennifer L.', result: 'Completed first marathon', timeframe: '8 months', before_after: '' }
      ]
    },
    social: {
      social_links: [
        { platform: 'instagram', url: 'https://instagram.com/alexfitness', username: '@alexfitness' },
        { platform: 'tiktok', url: 'https://tiktok.com/@alexfitness', username: '@alexfitness' },
        { platform: 'youtube', url: 'https://youtube.com/alexfitness', username: 'Alex Fitness' }
      ]
    },
    videos: {
      video_list: [
        { title: '20-Minute Full Body HIIT Workout', description: 'High-intensity workout you can do anywhere with no equipment needed', video_type: 'workout_demo', embed_url: '', thumbnail: '', duration: '20:15' },
        { title: 'Perfect Squat Form Tutorial', description: 'Master the squat with proper form and technique for maximum results', video_type: 'exercise_tutorial', embed_url: '', thumbnail: '', duration: '6:30' },
        { title: 'Sarah\'s 35lb Weight Loss Journey', description: 'Inspiring transformation story and the strategies that worked', video_type: 'client_success', embed_url: '', thumbnail: '', duration: '8:45' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/alexfitness',
      channel_name: 'Alex Fitness',
      subscriber_count: '156K',
      featured_playlist: 'https://youtube.com/playlist?list=PLworkoutvideos',
      latest_video_embed: '',
      channel_description: 'Free workout videos, nutrition tips, and fitness motivation from a certified personal trainer. New videos every Monday, Wednesday, and Friday!'
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '06:00', close_time: '20:00', is_closed: false },
        { day: 'tuesday', open_time: '06:00', close_time: '20:00', is_closed: false },
        { day: 'wednesday', open_time: '06:00', close_time: '20:00', is_closed: false },
        { day: 'thursday', open_time: '06:00', close_time: '20:00', is_closed: false },
        { day: 'friday', open_time: '06:00', close_time: '19:00', is_closed: false },
        { day: 'saturday', open_time: '07:00', close_time: '17:00', is_closed: false },
        { day: 'sunday', open_time: '08:00', close_time: '16:00', is_closed: false }
      ]
    },
    appointments: {
      booking_url: 'https://alexfitness.com/book',
      consultation_note: 'Free 30-minute consultation for all new clients to discuss your fitness goals'
    },
    testimonials: {
      reviews: [
        { client_name: 'Emma Wilson', review: 'Alex helped me lose 30 pounds and feel stronger than ever! His motivation and expertise are unmatched.', rating: '5', program: 'Weight Loss Program' },
        { client_name: 'David Chen', review: 'Best trainer I\'ve ever worked with. Knowledgeable, patient, and really cares about your progress.', rating: '5', program: 'Strength Training' },
        { client_name: 'Lisa Rodriguez', review: 'The nutrition coaching changed my relationship with food completely. Highly recommend Alex!', rating: '5', program: 'Nutrition Coaching' }
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
      form_title: 'Start Your Transformation',
      form_description: 'Ready to change your life? Contact me for a free consultation and let\'s create your personalized fitness plan.'
    },
    thank_you: {
      message: 'Thank you for taking the first step! I\'ll contact you within 24 hours to schedule your free consultation.'
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
      html_content: '<div class="fitness-stats"><h4>Training Results</h4><p>💪 500+ Clients Transformed</p><p>🏆 8 Years Experience</p><p>📈 95% Success Rate</p><p>🎆 Award-Winning Trainer</p></div>',
      section_title: 'Proven Results',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Start Your Fitness Journey',
      qr_description: 'Scan to connect and begin your transformation today!',
      qr_size: 'medium'
    },
    language: {
      template_language: 'en'
    },
    copyright: {
      text: '© 2025 Alex Fitness. Transform Your Life.'
    }
  }
};