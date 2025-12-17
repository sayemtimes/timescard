import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const gymTemplate = {
  name: 'Fitness Studio',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Gym/Studio Name' },
        { name: 'tagline', type: 'textarea', label: 'Tagline' },
        { name: 'logo', type: 'file', label: 'Logo' },
        { name: 'hero_image', type: 'file', label: 'Hero Image' }
      ],
      required: true
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'About Us' },
        { name: 'year_established', type: 'number', label: 'Year Established' },
        { name: 'members_count', type: 'number', label: 'Members Count' }
      ],
      required: false
    },
    {
      key: 'classes',
      name: 'Fitness Classes',
      fields: [
        {
          name: 'class_list',
          type: 'repeater',
          label: 'Classes',
          fields: [
            { name: 'name', type: 'text', label: 'Class Name' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'duration', type: 'text', label: 'Duration' },
            { name: 'level', type: 'select', label: 'Level', options: [
              { value: 'beginner', label: 'Beginner' },
              { value: 'intermediate', label: 'Intermediate' },
              { value: 'advanced', label: 'Advanced' },
              { value: 'all', label: 'All Levels' }
            ]},
            { name: 'image', type: 'file', label: 'Class Image' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'trainers',
      name: 'Trainers',
      fields: [
        {
          name: 'trainer_list',
          type: 'repeater',
          label: 'Trainers',
          fields: [
            { name: 'name', type: 'text', label: 'Trainer Name' },
            { name: 'position', type: 'text', label: 'Position/Specialty' },
            { name: 'bio', type: 'textarea', label: 'Bio' },
            { name: 'image', type: 'file', label: 'Trainer Image' },
            { name: 'certifications', type: 'text', label: 'Certifications' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'membership',
      name: 'Membership Plans',
      fields: [
        {
          name: 'plan_list',
          type: 'repeater',
          label: 'Plans',
          fields: [
            { name: 'name', type: 'text', label: 'Plan Name' },
            { name: 'price', type: 'text', label: 'Price' },
            { name: 'duration', type: 'text', label: 'Duration' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'features', type: 'textarea', label: 'Features (comma separated)' },
            { name: 'highlight', type: 'checkbox', label: 'Highlight as Popular' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'videos',
      name: 'Gym Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Fitness Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'gym_tour', label: 'Gym Tour' },
              { value: 'class_preview', label: 'Class Preview' },
              { value: 'workout_demo', label: 'Workout Demo' },
              { value: 'member_success', label: 'Member Success Story' },
              { value: 'trainer_spotlight', label: 'Trainer Spotlight' },
              { value: 'equipment_guide', label: 'Equipment Guide' }
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
      key: 'schedule',
      name: 'Class Schedule',
      fields: [
        {
          name: 'schedule_list',
          type: 'repeater',
          label: 'Schedule Items',
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
            { name: 'time', type: 'text', label: 'Time' },
            { name: 'class_name', type: 'text', label: 'Class Name' },
            { name: 'trainer', type: 'text', label: 'Trainer' }
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
          label: 'Gym Hours',
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
      key: 'gallery',
      name: 'Photo Gallery',
      fields: [
        {
          name: 'photos',
          type: 'repeater',
          label: 'Photos',
          fields: [
            { name: 'image', type: 'file', label: 'Image' },
            { name: 'caption', type: 'text', label: 'Caption' }
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
          label: 'Member Reviews',
          fields: [
            { name: 'member_name', type: 'text', label: 'Member Name' },
            { name: 'review', type: 'textarea', label: 'Review Text' },
            { name: 'achievement', type: 'text', label: 'Achievement' },
            { name: 'member_since', type: 'text', label: 'Member Since' },
            { name: 'image', type: 'file', label: 'Member Image' }
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
        { name: 'booking_text', type: 'text', label: 'Booking Button Text' },
        { name: 'trial_text', type: 'text', label: 'Free Trial Button Text' }
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
    { name: 'Power Orange', primary: '#FF5722', secondary: '#FF7043', accent: '#FBE9E7', background: '#FFFFFF', text: '#333333' },
    { name: 'Energy Red', primary: '#E53935', secondary: '#FF5252', accent: '#FFEBEE', background: '#FFFFFF', text: '#212121' },
    { name: 'Strong Blue', primary: '#1E88E5', secondary: '#42A5F5', accent: '#E3F2FD', background: '#FFFFFF', text: '#212121' },
    { name: 'Muscle Green', primary: '#43A047', secondary: '#66BB6A', accent: '#E8F5E9', background: '#FFFFFF', text: '#212121' },
    { name: 'Beast Purple', primary: '#8E24AA', secondary: '#AB47BC', accent: '#F3E5F5', background: '#FFFFFF', text: '#212121' },
    { name: 'Dark Power', primary: '#5D4037', secondary: '#795548', accent: '#212121', background: '#121212', text: '#FFFFFF' }
  ],
  fontOptions: [
    { name: 'Roboto', value: 'Roboto, sans-serif', weight: '300,400,500,700,900' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif', weight: '300,400,500,600,700,800' },
    { name: 'Oswald', value: 'Oswald, sans-serif', weight: '300,400,500,600,700' },
    { name: 'Poppins', value: 'Poppins, sans-serif', weight: '300,400,500,600,700,800' },
    { name: 'Open Sans', value: 'Open Sans, sans-serif', weight: '300,400,600,700' }
  ],
  defaultColors: {
    primary: '#FF5722',
    secondary: '#FF7043',
    accent: '#FBE9E7',
    background: '#FFFFFF',
    text: '#333333',
    cardBg: '#F5F5F5',
    borderColor: '#E0E0E0',
    buttonText: '#FFFFFF',
    highlightColor: '#FFC107'
  },
  defaultFont: 'Roboto, sans-serif',
  themeStyle: {
    layout: 'fitness-layout',
    headerStyle: 'dynamic',
    cardStyle: 'solid',
    buttonStyle: 'rounded',
    iconStyle: 'bold',
    spacing: 'compact'
  },
  defaultData: {
    header: {
      name: 'PowerFit Studio',
      tagline: 'Transform Your Body, Transform Your Life',
      logo: '',
      hero_image: ''
    },
    about: {
      description: 'PowerFit Studio is a premier fitness facility dedicated to helping you achieve your health and fitness goals. Our state-of-the-art equipment, expert trainers, and diverse class offerings create an environment where everyone from beginners to advanced athletes can thrive. We believe fitness is not just about physical strength but about building a healthier, happier life.',
      year_established: '2015',
      members_count: '1500'
    },
    classes: {
      class_list: [
        { name: 'HIIT', description: 'High-intensity interval training that alternates between intense bursts of activity and fixed periods of less-intense activity or rest.', duration: '45 min', level: 'intermediate', image: '' },
        { name: 'Yoga Flow', description: 'A vinyasa-style yoga class linking breath with movement for improved flexibility, strength, and mindfulness.', duration: '60 min', level: 'all', image: '' },
        { name: 'Strength Training', description: 'Focus on building muscle and strength using free weights, resistance bands, and weight machines.', duration: '50 min', level: 'all', image: '' },
        { name: 'Spin Class', description: 'High-energy indoor cycling workout set to motivating music with varying speeds and resistance levels.', duration: '45 min', level: 'all', image: '' }
      ]
    },
    trainers: {
      trainer_list: [
        { name: 'Alex Johnson', position: 'Head Trainer, Strength Specialist', bio: 'With over 10 years of experience, Alex specializes in strength training and athletic performance. His approach focuses on proper form and progressive overload for maximum results.', image: '', certifications: 'NASM CPT, CSCS, TRX Certified' },
        { name: 'Sarah Chen', position: 'Yoga & Pilates Instructor', bio: 'Sarah brings a holistic approach to fitness, combining traditional yoga practices with modern exercise science. Her classes emphasize mind-body connection and functional movement.', image: '', certifications: 'RYT-500, Pilates Method Alliance Certified' },
        { name: 'Marcus Williams', position: 'HIIT & Cardio Specialist', bio: 'Known for his high-energy classes, Marcus creates challenging workouts that push members to their limits while keeping motivation high and exercises varied.', image: '', certifications: 'ACE CPT, Spinning Certified, CrossFit L2' }
      ]
    },
    membership: {
      plan_list: [
        { name: 'Basic', price: '$49/month', duration: 'Monthly', description: 'Access to gym facilities and basic equipment', features: 'Gym access,Basic equipment,Locker room access', highlight: false },
        { name: 'Premium', price: '$79/month', duration: 'Monthly', description: 'Full access to all facilities and group classes', features: 'All gym access,Unlimited classes,Free towel service,Fitness assessment,Guest passes (2/month)', highlight: true },
        { name: 'Annual', price: '$599/year', duration: 'Yearly', description: 'Our best value plan with two months free', features: 'All Premium features,Two months free,Personal training session (1),Nutrition consultation', highlight: false }
      ]
    },
    schedule: {
      schedule_list: [
        { day: 'monday', time: '6:00 AM', class_name: 'Morning HIIT', trainer: 'Marcus Williams' },
        { day: 'monday', time: '9:00 AM', class_name: 'Yoga Flow', trainer: 'Sarah Chen' },
        { day: 'monday', time: '5:30 PM', class_name: 'Strength Training', trainer: 'Alex Johnson' },
        { day: 'tuesday', time: '7:00 AM', class_name: 'Spin Class', trainer: 'Marcus Williams' },
        { day: 'tuesday', time: '12:00 PM', class_name: 'Lunch Express HIIT', trainer: 'Marcus Williams' },
        { day: 'tuesday', time: '6:30 PM', class_name: 'Evening Yoga', trainer: 'Sarah Chen' }
      ]
    },
    contact: {
      email: 'info@powerfitstudio.com',
      phone: '(555) 789-1234',
      website: 'https://www.powerfitstudio.com',
      address: '456 Fitness Way, Los Angeles, CA 90001'
    },
    social: {
      social_links: [
        { platform: 'instagram', url: 'https://instagram.com/powerfitstudio', username: '@powerfitstudio' },
        { platform: 'facebook', url: 'https://facebook.com/powerfitstudio', username: 'PowerFit Studio' },
        { platform: 'youtube', url: 'https://youtube.com/powerfitstudio', username: 'PowerFit Studio' }
      ]
    },
    videos: {
      video_list: [
        { title: 'PowerFit Studio Tour - State-of-the-Art Facilities', description: 'Take a virtual tour of our modern fitness facility and equipment', video_type: 'gym_tour', embed_url: '', thumbnail: '', duration: '5:30' },
        { title: 'HIIT Class Preview with Marcus', description: 'Get a taste of our high-energy HIIT class led by trainer Marcus Williams', video_type: 'class_preview', embed_url: '', thumbnail: '', duration: '3:45' },
        { title: 'Jason\'s Transformation - 30lbs Lost', description: 'Inspiring member success story and transformation journey', video_type: 'member_success', embed_url: '', thumbnail: '', duration: '6:20' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/powerfitstudio',
      channel_name: 'PowerFit Studio',
      subscriber_count: '41.8K',
      featured_playlist: 'https://youtube.com/playlist?list=PLworkoutvideos',
      latest_video_embed: '',
      channel_description: 'Fitness workouts, class previews, and member success stories from PowerFit Studio. Subscribe for weekly fitness motivation!'
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '05:00', close_time: '22:00', is_closed: false },
        { day: 'tuesday', open_time: '05:00', close_time: '22:00', is_closed: false },
        { day: 'wednesday', open_time: '05:00', close_time: '22:00', is_closed: false },
        { day: 'thursday', open_time: '05:00', close_time: '22:00', is_closed: false },
        { day: 'friday', open_time: '05:00', close_time: '22:00', is_closed: false },
        { day: 'saturday', open_time: '07:00', close_time: '20:00', is_closed: false },
        { day: 'sunday', open_time: '08:00', close_time: '18:00', is_closed: false }
      ]
    },
    gallery: {
      photos: [
        { image: '', caption: 'State-of-the-art cardio equipment' },
        { image: '', caption: 'Spacious yoga studio' },
        { image: '', caption: 'Free weights area' },
        { image: '', caption: 'Spin class in action' }
      ]
    },
    testimonials: {
      reviews: [
        { member_name: 'Jason K.', review: 'Joining PowerFit was the best decision I made for my health. The trainers are knowledgeable and supportive, and the community keeps me motivated.', achievement: 'Lost 30 lbs', member_since: 'January 2022', image: '' },
        { member_name: 'Michelle T.', review: 'The variety of classes keeps my workouts fresh and challenging. I especially love the yoga classes with Sarah - they have improved my flexibility and reduced my stress levels.', achievement: 'Completed first 5K race', member_since: 'March 2021', image: '' },
        { member_name: 'David R.', review: 'As someone new to fitness, I was intimidated at first, but the staff made me feel welcome from day one. The beginner-friendly approach helped me build confidence.', achievement: 'Gained 12 lbs of muscle', member_since: 'September 2022', image: '' }
      ]
    },
    appointments: {
      booking_url: 'https://calendly.com/powerfitstudio',
      booking_text: 'Book a Class',
      trial_text: 'Free 7-Day Trial'
    },
    google_map: {
      map_embed_url: '',
      directions_url: 'https://maps.google.com/directions'
    },
    app_download: {
      app_store_url: '#',
      play_store_url: '#',
      app_description: 'Download our app to book classes, track your workouts, and stay connected with the PowerFit community.'
    },
    contact_form: {
      form_title: 'Get in Touch',
      form_description: 'Have questions about our classes or membership options? Fill out the form below and our team will get back to you.'
    },
    thank_you: {
      message: 'Thank you for contacting PowerFit Studio. We appreciate your interest and will respond to your inquiry within 24 hours.'
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
      html_content: '<div class="fitness-stats"><h4>Gym Statistics</h4><p>🏆 1,500+ Active Members</p><p>💪 50+ Group Classes Weekly</p><p>⭐ 4.9/5 Member Satisfaction Rating</p><p>🔥 24/7 Gym Access Available</p></div>',
      section_title: 'Why Choose PowerFit',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Join Our Fitness Community',
      qr_description: 'Scan to save our contact info and start your fitness journey with us today!',
      qr_size: 'medium'
    },
    language: {
      template_language: 'en'
    },
    footer: {
      show_footer: true,
      footer_text: 'Transform your life with us. State-of-the-art equipment, expert trainers, and a supportive community awaits you at PowerFit Studio.',
      footer_links: [
        { title: 'Membership Plans', url: '#membership' },
        { title: 'Class Schedule', url: '#schedule' },
        { title: 'Personal Training', url: '#trainers' },
        { title: 'Free Trial', url: '#trial' }
      ]
    },
    copyright: {
      text: '© 2025 PowerFit Studio. All rights reserved.'
    }
  }
};