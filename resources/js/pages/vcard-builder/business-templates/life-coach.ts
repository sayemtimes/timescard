import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const lifeCoachTemplate = {
  name: 'Life Coach & Motivational Speaker',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Coach Name' },
        { name: 'title', type: 'text', label: 'Coaching Title' },
        { name: 'tagline', type: 'textarea', label: 'Inspirational Tagline' },
        { name: 'profile_image', type: 'file', label: 'Coach Photo' }
      ],
      required: true
    },
    {
      key: 'contact',
      name: 'Contact Information',
      fields: [
        { name: 'email', type: 'email', label: 'Email Address' },
        { name: 'phone', type: 'tel', label: 'Phone Number' },
        { name: 'website', type: 'url', label: 'Coaching Website' },
        { name: 'location', type: 'text', label: 'Location' }
      ],
      required: true
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'Coaching Journey' },
        { name: 'specializations', type: 'tags', label: 'Coaching Specializations' },
        { name: 'experience', type: 'number', label: 'Years Coaching' },
        { name: 'mission', type: 'textarea', label: 'Mission Statement' }
      ],
      required: false
    },
    {
      key: 'programs',
      name: 'Coaching Programs',
      fields: [
        {
          name: 'program_list',
          type: 'repeater',
          label: 'Coaching Programs',
          fields: [
            { name: 'title', type: 'text', label: 'Program Name' },
            { name: 'description', type: 'textarea', label: 'Program Description' },
            { name: 'duration', type: 'text', label: 'Program Duration' },
            { name: 'format', type: 'select', label: 'Format', options: [
              { value: 'one-on-one', label: 'One-on-One' },
              { value: 'group', label: 'Group Coaching' },
              { value: 'workshop', label: 'Workshop' },
              { value: 'online', label: 'Online Course' },
              { value: 'retreat', label: 'Retreat' }
            ]},
            { name: 'price', type: 'text', label: 'Investment' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'transformations',
      name: 'Client Transformations',
      fields: [
        {
          name: 'success_stories',
          type: 'repeater',
          label: 'Success Stories',
          fields: [
            { name: 'client_initial', type: 'text', label: 'Client Initial' },
            { name: 'challenge', type: 'textarea', label: 'Initial Challenge' },
            { name: 'transformation', type: 'textarea', label: 'Transformation Achieved' },
            { name: 'outcome', type: 'textarea', label: 'Current Outcome' },
            { name: 'timeframe', type: 'text', label: 'Timeframe' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'videos',
      name: 'Inspirational Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Motivational Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'motivational_speech', label: 'Motivational Speech' },
              { value: 'coaching_session', label: 'Coaching Session Demo' },
              { value: 'client_transformation', label: 'Client Transformation' },
              { value: 'life_tips', label: 'Life Tips & Advice' },
              { value: 'workshop_preview', label: 'Workshop Preview' },
              { value: 'personal_story', label: 'Personal Story' }
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
      key: 'speaking',
      name: 'Speaking Engagements',
      fields: [
        {
          name: 'topics',
          type: 'repeater',
          label: 'Speaking Topics',
          fields: [
            { name: 'topic', type: 'text', label: 'Topic Title' },
            { name: 'description', type: 'textarea', label: 'Topic Description' },
            { name: 'audience', type: 'text', label: 'Target Audience' },
            { name: 'duration', type: 'text', label: 'Duration Options' }
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
          label: 'Inspirational Platforms',
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
          label: 'Availability',
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
            { name: 'open_time', type: 'time', label: 'Available From' },
            { name: 'close_time', type: 'time', label: 'Available Until' },
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
        { name: 'booking_url', type: 'url', label: 'Session Booking URL' },
        { name: 'calendar_link', type: 'url', label: 'Calendar Link' },
        { name: 'consultation_info', type: 'textarea', label: 'Free Consultation Info' }
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
          label: 'Client Testimonials',
          fields: [
            { name: 'client_name', type: 'text', label: 'Client Name' },
            { name: 'review', type: 'textarea', label: 'Testimonial' },
            { name: 'rating', type: 'number', label: 'Rating (1-5)' },
            { name: 'program', type: 'text', label: 'Program/Service' }
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
    { name: 'Sunrise Inspiration', primary: '#FF6B35', secondary: '#F7931E', accent: '#FFD23F', background: '#FFF9F0', text: '#2D1B69', cardBg: '#FFFFFF' },
    { name: 'Calm Confidence', primary: '#4A90E2', secondary: '#7BB3F0', accent: '#50C878', background: '#F8FBFF', text: '#1A365D', cardBg: '#FFFFFF' },
    { name: 'Growth Green', primary: '#28A745', secondary: '#34CE57', accent: '#85E085', background: '#F0FFF4', text: '#155724', cardBg: '#FFFFFF' },
    { name: 'Empowerment Purple', primary: '#6F42C1', secondary: '#8A63D2', accent: '#D1C4E9', background: '#FAF8FF', text: '#3D2B56', cardBg: '#FFFFFF' },
    { name: 'Mindful Earth', primary: '#8B4513', secondary: '#CD853F', accent: '#DEB887', background: '#FDF5E6', text: '#5D2F0A', cardBg: '#FFFFFF' }
  ],
  fontOptions: [
    { name: 'Montserrat', value: 'Montserrat, -apple-system, BlinkMacSystemFont, sans-serif', weight: '300,400,500,600,700' },
    { name: 'Open Sans', value: 'Open Sans, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,600,700' },
    { name: 'Poppins', value: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif', weight: '300,400,500,600,700' },
    { name: 'Nunito', value: 'Nunito, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,600,700,800' },
    { name: 'Source Sans Pro', value: 'Source Sans Pro, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,600,700' }
  ],
  defaultColors: {
    primary: '#FF6B35',
    secondary: '#F7931E',
    accent: '#FFD23F',
    background: '#FFF9F0',
    text: '#2D1B69',
    cardBg: '#FFFFFF',
    borderColor: '#FFE4B5',
    shadowColor: 'rgba(255, 107, 53, 0.2)'
  },
  defaultFont: 'Montserrat, -apple-system, BlinkMacSystemFont, sans-serif',
  themeStyle: {
    layout: 'inspiration-flow',
    headerStyle: 'motivational-hero',
    cardStyle: 'uplifting-cards',
    buttonStyle: 'action-buttons',
    iconStyle: 'inspirational',
    spacing: 'empowering',
    shadows: 'uplifting-glow',
    animations: 'growth-effects',
    backgroundPattern: 'success-rays',
    typography: 'motivational-sans'
  },
  defaultData: {
    header: {
      name: 'Maya Thompson',
      title: 'Certified Life Coach & Motivational Speaker',
      tagline: 'Empowering individuals to unlock their potential, overcome limitations, and create the extraordinary life they deserve',
      profile_image: ''
    },
    contact: {
      email: 'hello@mayathompsoncoaching.com',
      phone: '+1 (555) 789-0123',
      website: 'https://mayathompsoncoaching.com',
      location: 'San Diego, CA'
    },
    about: {
      description: 'Passionate life coach with 12+ years of experience helping individuals transform their lives through proven strategies, mindset shifts, and actionable goal-setting. Certified through ICF and specialized in breakthrough coaching methodologies.',
      specializations: 'Career Transitions, Confidence Building, Goal Achievement, Mindset Coaching, Leadership Development',
      experience: '12',
      mission: 'To inspire and empower every person I work with to break through their limitations and create a life of purpose, passion, and fulfillment.'
    },
    programs: {
      program_list: [
        { title: 'Breakthrough Intensive', description: '90-day one-on-one program designed to create massive shifts in your life and career', duration: '3 months', format: 'one-on-one', price: '$3,997' },
        { title: 'Confidence Mastery Workshop', description: 'Transform your self-doubt into unshakeable confidence in just one day', duration: '1 day', format: 'workshop', price: '$297' },
        { title: 'Goal Achiever Mastermind', description: 'Small group coaching program for ambitious individuals ready to level up', duration: '6 months', format: 'group', price: '$1,997' },
        { title: 'Mindset Reset Course', description: 'Online course to reprogram limiting beliefs and create empowering thought patterns', duration: 'Self-paced', format: 'online', price: '$497' }
      ]
    },
    transformations: {
      success_stories: [
        { client_initial: 'S.M.', challenge: 'Stuck in unfulfilling corporate job, lacking confidence to pursue entrepreneurship', transformation: 'Launched successful consulting business, increased income by 150%', outcome: 'Now running 6-figure business and mentoring other entrepreneurs', timeframe: '6 months' },
        { client_initial: 'J.R.', challenge: 'Struggling with imposter syndrome and fear of public speaking', transformation: 'Became confident speaker, landed promotion to leadership role', outcome: 'Now leads team of 20+ and speaks at industry conferences', timeframe: '4 months' }
      ]
    },
    speaking: {
      topics: [
        { topic: 'Unleashing Your Inner Champion', description: 'Discover the mindset and strategies of high achievers to unlock your full potential', audience: 'Corporate teams, entrepreneurs', duration: '45-90 minutes' },
        { topic: 'From Fear to Fearless', description: 'Transform limiting beliefs and step boldly into your power', audience: 'Women\'s groups, conferences', duration: '30-60 minutes' },
        { topic: 'The Success Blueprint', description: 'Proven framework for setting and achieving ambitious goals', audience: 'Sales teams, leadership groups', duration: '60-120 minutes' }
      ]
    },
    social: {
      social_links: [
        { platform: 'instagram', url: 'https://instagram.com/mayathompsoncoach', username: '@mayathompsoncoach' },
        { platform: 'youtube', url: 'https://youtube.com/mayathompson', username: 'Maya Thompson Coaching' },
        { platform: 'linkedin', url: 'https://linkedin.com/in/mayathompsoncoach', username: 'Maya Thompson' }
      ]
    },
    videos: {
      video_list: [
        { title: 'Unleash Your Inner Champion - Keynote Speech', description: 'Powerful keynote on discovering and unleashing your full potential', video_type: 'motivational_speech', embed_url: '', thumbnail: '', duration: '18:45' },
        { title: 'Breakthrough Coaching Session Demo', description: 'See how breakthrough coaching works with a real client session', video_type: 'coaching_session', embed_url: '', thumbnail: '', duration: '25:30' },
        { title: 'From Corporate Burnout to 6-Figure Business', description: 'Client transformation story of career change and success', video_type: 'client_transformation', embed_url: '', thumbnail: '', duration: '12:15' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/mayathompson',
      channel_name: 'Maya Thompson Coaching',
      subscriber_count: '89.3K',
      featured_playlist: 'https://youtube.com/playlist?list=PLmotivationalspeeches',
      latest_video_embed: '',
      channel_description: 'Life coaching insights, motivational content, and transformation stories to help you create the extraordinary life you deserve. New videos every Tuesday!'
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '09:00', close_time: '17:00', is_closed: false },
        { day: 'tuesday', open_time: '09:00', close_time: '17:00', is_closed: false },
        { day: 'wednesday', open_time: '09:00', close_time: '17:00', is_closed: false },
        { day: 'thursday', open_time: '09:00', close_time: '17:00', is_closed: false },
        { day: 'friday', open_time: '09:00', close_time: '15:00', is_closed: false },
        { day: 'saturday', open_time: '10:00', close_time: '14:00', is_closed: false },
        { day: 'sunday', open_time: '', close_time: '', is_closed: true }
      ]
    },
    appointments: {
      booking_url: 'https://calendly.com/mayathompson',
      calendar_link: 'https://calendar.google.com/mayathompson',
      consultation_info: 'Book your complimentary 30-minute breakthrough session to discover what\'s possible for your life and how coaching can help you get there.'
    },
    testimonials: {
      reviews: [
        { client_name: 'Jennifer Walsh', review: 'Maya completely transformed my mindset and my life. I went from feeling stuck and overwhelmed to confident and purposeful. Best investment I\'ve ever made!', rating: '5', program: 'Breakthrough Intensive' },
        { client_name: 'Michael Chen', review: 'The Goal Achiever Mastermind exceeded all my expectations. Maya\'s coaching style is both challenging and supportive. I achieved goals I never thought possible.', rating: '5', program: 'Goal Achiever Mastermind' }
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
      form_title: 'Ready to Transform Your Life?',
      form_description: 'Take the first step towards the life you\'ve always dreamed of. Share what you\'re looking to achieve and let\'s explore how we can make it happen together.'
    },
    thank_you: {
      message: 'Thank you for taking this important step! I\'ll personally review your message and respond within 24 hours. Your transformation journey starts now!'
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
      html_content: '<div class="coaching-achievements"><h4>Coaching Achievements</h4><p>✨ 500+ Lives Transformed</p><p>🏆 ICF Certified Professional Coach</p><p>📚 Featured in 15+ Publications</p><p>🎤 100+ Speaking Engagements</p></div>',
      section_title: 'Impact & Recognition',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Connect & Transform',
      qr_description: 'Scan to save my contact and start your transformation journey today!',
      qr_size: 'medium'
    },
    language: {
      template_language: 'en'
    },
    copyright: {
      text: '© 2025 Maya Thompson Coaching. All rights reserved.'
    }
  }
};