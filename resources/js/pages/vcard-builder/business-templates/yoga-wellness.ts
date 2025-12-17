import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const yogaWellnessTemplate = {
  name: 'Yoga & Wellness Studio',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Instructor Name' },
        { name: 'title', type: 'text', label: 'Wellness Title' },
        { name: 'tagline', type: 'textarea', label: 'Mindful Tagline' },
        { name: 'profile_image', type: 'file', label: 'Profile Photo' }
      ],
      required: true
    },
    {
      key: 'contact',
      name: 'Contact Information',
      fields: [
        { name: 'email', type: 'email', label: 'Email Address' },
        { name: 'phone', type: 'tel', label: 'Phone Number' },
        { name: 'website', type: 'url', label: 'Studio Website' },
        { name: 'location', type: 'text', label: 'Studio Location' }
      ],
      required: true
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'Wellness Journey' },
        { name: 'certifications', type: 'tags', label: 'Certifications' },
        { name: 'experience', type: 'number', label: 'Years of Practice' },
        { name: 'philosophy', type: 'textarea', label: 'Wellness Philosophy' }
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
          label: 'Wellness Services',
          fields: [
            { name: 'title', type: 'text', label: 'Service Name' },
            { name: 'description', type: 'textarea', label: 'Service Description' },
            { name: 'duration', type: 'text', label: 'Duration' },
            { name: 'price', type: 'text', label: 'Price' },
            { name: 'type', type: 'select', label: 'Service Type', options: [
              { value: 'yoga', label: 'Yoga Class' },
              { value: 'meditation', label: 'Meditation' },
              { value: 'wellness', label: 'Wellness Coaching' },
              { value: 'retreat', label: 'Retreat' },
              { value: 'workshop', label: 'Workshop' }
            ]}
          ]
        }
      ],
      required: false
    },
    {
      key: 'videos',
      name: 'Yoga Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Wellness Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'yoga_flow', label: 'Yoga Flow Practice' },
              { value: 'meditation_guide', label: 'Guided Meditation' },
              { value: 'wellness_tips', label: 'Wellness Tips' },
              { value: 'breathing_exercise', label: 'Breathing Exercise' },
              { value: 'philosophy_talk', label: 'Yoga Philosophy' },
              { value: 'student_journey', label: 'Student Journey' }
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
      key: 'class_schedule',
      name: 'Class Schedule',
      fields: [
        {
          name: 'classes',
          type: 'repeater',
          label: 'Weekly Classes',
          fields: [
            { name: 'class_name', type: 'text', label: 'Class Name' },
            { name: 'day', type: 'select', label: 'Day', options: [
              { value: 'monday', label: 'Monday' },
              { value: 'tuesday', label: 'Tuesday' },
              { value: 'wednesday', label: 'Wednesday' },
              { value: 'thursday', label: 'Thursday' },
              { value: 'friday', label: 'Friday' },
              { value: 'saturday', label: 'Saturday' },
              { value: 'sunday', label: 'Sunday' }
            ]},
            { name: 'time', type: 'text', label: 'Time' },
            { name: 'level', type: 'select', label: 'Level', options: [
              { value: 'beginner', label: 'Beginner' },
              { value: 'intermediate', label: 'Intermediate' },
              { value: 'advanced', label: 'Advanced' },
              { value: 'all-levels', label: 'All Levels' }
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
          label: 'Studio Hours',
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
        { name: 'booking_url', type: 'url', label: 'Class Booking URL' },
        { name: 'calendar_link', type: 'url', label: 'Calendar Link' },
        { name: 'booking_note', type: 'textarea', label: 'Booking Instructions' }
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
          label: 'Student Reviews',
          fields: [
            { name: 'client_name', type: 'text', label: 'Student Name' },
            { name: 'review', type: 'textarea', label: 'Review Text' },
            { name: 'rating', type: 'number', label: 'Rating (1-5)' },
            { name: 'transformation', type: 'textarea', label: 'Transformation Story' }
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
    { name: 'Zen Garden', primary: '#8FBC8F', secondary: '#98D8C8', accent: '#F7DC6F', background: '#F8F8F0', text: '#2F4F4F', cardBg: '#FFFFFF' },
    { name: 'Lotus Bloom', primary: '#DDA0DD', secondary: '#E6E6FA', accent: '#FFB6C1', background: '#FFF8DC', text: '#4B0082', cardBg: '#FFFFFF' },
    { name: 'Ocean Calm', primary: '#20B2AA', secondary: '#87CEEB', accent: '#F0E68C', background: '#F0F8FF', text: '#2F4F4F', cardBg: '#FFFFFF' },
    { name: 'Sunset Peace', primary: '#CD853F', secondary: '#DEB887', accent: '#F4A460', background: '#FFF8DC', text: '#8B4513', cardBg: '#FFFFFF' },
    { name: 'Forest Harmony', primary: '#228B22', secondary: '#90EE90', accent: '#ADFF2F', background: '#F0FFF0', text: '#006400', cardBg: '#FFFFFF' }
  ],
  fontOptions: [
    { name: 'Lora', value: 'Lora, Georgia, serif', weight: '400,500,600,700' },
    { name: 'Merriweather', value: 'Merriweather, Georgia, serif', weight: '300,400,700' },
    { name: 'Playfair Display', value: 'Playfair Display, Georgia, serif', weight: '400,500,600,700' },
    { name: 'Source Serif Pro', value: 'Source Serif Pro, Georgia, serif', weight: '400,600,700' },
    { name: 'Crimson Text', value: 'Crimson Text, Georgia, serif', weight: '400,600,700' }
  ],
  defaultColors: {
    primary: '#8FBC8F',
    secondary: '#98D8C8',
    accent: '#F7DC6F',
    background: '#F8F8F0',
    text: '#2F4F4F',
    cardBg: '#FFFFFF',
    borderColor: '#E0E0E0',
    shadowColor: 'rgba(143, 188, 143, 0.3)'
  },
  defaultFont: 'Lora, Georgia, serif',
  themeStyle: {
    layout: 'zen-flow',
    headerStyle: 'mandala-circle',
    cardStyle: 'organic-curves',
    buttonStyle: 'zen-rounded',
    iconStyle: 'nature',
    spacing: 'breathing-room',
    shadows: 'soft-glow',
    animations: 'gentle-float',
    backgroundPattern: 'lotus-petals',
    typography: 'mindful-serif'
  },
  defaultData: {
    header: {
      name: 'Serenity Moon',
      title: 'Certified Yoga Instructor & Wellness Coach',
      tagline: 'Guiding you on a journey to inner peace, strength, and mindful living',
      profile_image: ''
    },
    contact: {
      email: 'namaste@serenitymoon.yoga',
      phone: '+1 (555) 345-6789',
      website: 'https://serenitymoon.yoga',
      location: 'Peaceful Valley, CA'
    },
    about: {
      description: 'With 10+ years of dedicated practice and teaching, I help individuals discover their inner strength through yoga, meditation, and holistic wellness practices.',
      certifications: 'RYT-500, Meditation Teacher, Reiki Master, Ayurveda Practitioner',
      experience: '10',
      philosophy: 'Yoga is not about touching your toes. It is about what you learn on the way down.'
    },
    services: {
      service_list: [
        { title: 'Hatha Yoga Classes', description: 'Gentle, slow-paced yoga focusing on basic postures and breathing', duration: '60 minutes', price: '$25', type: 'yoga' },
        { title: 'Vinyasa Flow', description: 'Dynamic sequences linking breath with movement', duration: '75 minutes', price: '$30', type: 'yoga' },
        { title: 'Meditation Sessions', description: 'Guided meditation for stress relief and mindfulness', duration: '30 minutes', price: '$20', type: 'meditation' },
        { title: 'Wellness Coaching', description: 'Personalized holistic wellness guidance', duration: '90 minutes', price: '$80', type: 'wellness' }
      ]
    },
    videos: {
      video_list: [
        { title: '20-Minute Morning Flow for Beginners', description: 'Gentle yoga sequence to start your day with intention and energy', video_type: 'yoga_flow', embed_url: '', thumbnail: '', duration: '20:15' },
        { title: 'Guided Meditation for Stress Relief', description: 'Calming meditation practice to release tension and find inner peace', video_type: 'meditation_guide', embed_url: '', thumbnail: '', duration: '15:30' },
        { title: 'Breathing Techniques for Anxiety', description: 'Simple pranayama exercises to calm the mind and nervous system', video_type: 'breathing_exercise', embed_url: '', thumbnail: '', duration: '12:45' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/serenitymoon',
      channel_name: 'Serenity Moon Yoga',
      subscriber_count: '67.8K',
      featured_playlist: 'https://youtube.com/playlist?list=PLyogaflows',
      latest_video_embed: '',
      channel_description: 'Free yoga classes, guided meditations, and wellness wisdom for your journey to inner peace. New videos every Tuesday and Friday!'
    },
    class_schedule: {
      classes: [
        { class_name: 'Morning Flow', day: 'monday', time: '7:00 AM', level: 'all-levels' },
        { class_name: 'Gentle Hatha', day: 'wednesday', time: '6:00 PM', level: 'beginner' },
        { class_name: 'Power Vinyasa', day: 'friday', time: '7:30 AM', level: 'intermediate' },
        { class_name: 'Restorative Yoga', day: 'sunday', time: '5:00 PM', level: 'all-levels' }
      ]
    },
    social: {
      social_links: [
        { platform: 'instagram', url: 'https://instagram.com/serenitymoon.yoga', username: '@serenitymoon.yoga' },
        { platform: 'youtube', url: 'https://youtube.com/serenitymoon', username: 'Serenity Moon Yoga' },
        { platform: 'facebook', url: 'https://facebook.com/serenitymoon.yoga', username: 'Serenity Moon Yoga' }
      ]
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '06:00', close_time: '20:00', is_closed: false },
        { day: 'tuesday', open_time: '06:00', close_time: '20:00', is_closed: false },
        { day: 'wednesday', open_time: '06:00', close_time: '20:00', is_closed: false },
        { day: 'thursday', open_time: '06:00', close_time: '20:00', is_closed: false },
        { day: 'friday', open_time: '06:00', close_time: '20:00', is_closed: false },
        { day: 'saturday', open_time: '08:00', close_time: '18:00', is_closed: false },
        { day: 'sunday', open_time: '08:00', close_time: '18:00', is_closed: false }
      ]
    },
    appointments: {
      booking_url: 'https://calendly.com/serenitymoon',
      calendar_link: 'https://calendar.google.com/serenitymoon',
      booking_note: 'Please arrive 10 minutes early. Bring your own mat or rent one at the studio.'
    },
    testimonials: {
      reviews: [
        { client_name: 'Emma Thompson', review: 'Serenity\'s classes have transformed my relationship with stress and anxiety. Her gentle guidance creates a safe space for growth.', rating: '5', transformation: 'Found inner peace and improved flexibility' },
        { client_name: 'David Chen', review: 'The meditation sessions have been life-changing. I sleep better and feel more centered in my daily life.', rating: '5', transformation: 'Better sleep and mental clarity' }
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
      form_title: 'Begin Your Wellness Journey',
      form_description: 'Ready to start your path to inner peace and wellness? Reach out and let\'s explore how yoga and mindfulness can transform your life.'
    },
    thank_you: {
      message: 'Namaste! Thank you for reaching out. I\'ll respond within 24 hours to help you begin your wellness journey.'
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
      html_content: '<div class="wellness-quote"><h4>Daily Inspiration</h4><p>"The body benefits from movement, and the mind benefits from stillness."</p></div>',
      section_title: 'Mindful Moments',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Connect with Serenity Moon',
      qr_description: 'Scan this QR code to access our yoga studio information and class schedules.',
      qr_size: 'medium'
    },
    language: {
      template_language: 'en'
    },
    copyright: {
      text: '© 2025 Serenity Moon Yoga Studio. All rights reserved.'
    }
  }
};