import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const fitnessStudioTemplate = {
  name: 'Fitness Studio',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Studio Name' },
        { name: 'tagline', type: 'textarea', label: 'Tagline' },
        { name: 'logo', type: 'file', label: 'Logo' },
        { name: 'cover_image', type: 'file', label: 'Cover Image' }
      ],
      required: true
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'About Us' },
        { name: 'year_established', type: 'number', label: 'Year Established' },
        { name: 'studio_type', type: 'select', label: 'Studio Type', options: [
          { value: 'yoga', label: 'Yoga Studio' },
          { value: 'pilates', label: 'Pilates Studio' },
          { value: 'crossfit', label: 'CrossFit Box' },
          { value: 'dance', label: 'Dance Studio' },
          { value: 'martial_arts', label: 'Martial Arts' },
          { value: 'general', label: 'General Fitness' }
        ]}
      ],
      required: false
    },
    {
      key: 'services',
      name: 'Services',
      fields: [
        {
          name: 'offerings',
          type: 'repeater',
          label: 'Fitness Services',
          fields: [
            { name: 'name', type: 'text', label: 'Service Name' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'price', type: 'text', label: 'Price' },
            { name: 'image', type: 'file', label: 'Service Image' },
            { name: 'duration', type: 'text', label: 'Duration' },
            { name: 'intensity', type: 'select', label: 'Intensity Level', options: [
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
      key: 'videos',
      name: 'Fitness Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Studio Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'class_preview', label: 'Class Preview' },
              { value: 'workout_tutorial', label: 'Workout Tutorial' },
              { value: 'studio_tour', label: 'Studio Tour' },
              { value: 'member_testimonial', label: 'Member Testimonial' },
              { value: 'trainer_spotlight', label: 'Trainer Spotlight' },
              { value: 'transformation_story', label: 'Transformation Story' }
            ]},
            { name: 'embed_url', type: 'textarea', label: 'Video Embed URL' },
            { name: 'thumbnail', type: 'file', label: 'Video Thumbnail' },
            { name: 'duration', type: 'text', label: 'Duration' },
            { name: 'fitness_level', type: 'select', label: 'Fitness Level', options: [
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
      key: 'class_schedule',
      name: 'Class Schedule',
      fields: [
        {
          name: 'classes',
          type: 'repeater',
          label: 'Weekly Classes',
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
            { name: 'class_name', type: 'text', label: 'Class Name' },
            { name: 'time', type: 'text', label: 'Time' },
            { name: 'instructor', type: 'text', label: 'Instructor' }
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
            { name: 'rating', type: 'number', label: 'Rating (1-5)' },
            { name: 'member_image', type: 'file', label: 'Member Photo' },
            { name: 'achievement', type: 'text', label: 'Achievement/Result' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'appointments',
      name: 'Book a Class',
      fields: [
        { name: 'booking_url', type: 'url', label: 'Booking URL' },
        { name: 'booking_text', type: 'text', label: 'Booking Button Text' },
        { name: 'trial_available', type: 'checkbox', label: 'Free Trial Available' },
        { name: 'trial_text', type: 'text', label: 'Trial Offer Text' }
      ],
      required: false
    },
    {
      key: 'trainers',
      name: 'Our Trainers',
      fields: [
        {
          name: 'team',
          type: 'repeater',
          label: 'Trainers/Instructors',
          fields: [
            { name: 'name', type: 'text', label: 'Name' },
            { name: 'title', type: 'text', label: 'Title/Specialty' },
            { name: 'bio', type: 'textarea', label: 'Bio' },
            { name: 'image', type: 'file', label: 'Photo' },
            { name: 'certifications', type: 'text', label: 'Certifications' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'membership',
      name: 'Membership Options',
      fields: [
        {
          name: 'plans',
          type: 'repeater',
          label: 'Membership Plans',
          fields: [
            { name: 'name', type: 'text', label: 'Plan Name' },
            { name: 'price', type: 'text', label: 'Price' },
            { name: 'duration', type: 'text', label: 'Duration' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'features', type: 'textarea', label: 'Features (one per line)' },
            { name: 'is_popular', type: 'checkbox', label: 'Mark as Popular' }
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
        { name: 'app_description', type: 'textarea', label: 'App Description' },
        { name: 'app_features', type: 'textarea', label: 'App Features (one per line)' }
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
    { name: 'Energetic Red', primary: '#E53935', secondary: '#FF5252', accent: '#FFEBEE', background: '#FFFFFF', text: '#212121' },
    { name: 'Fitness Blue', primary: '#1E88E5', secondary: '#42A5F5', accent: '#E3F2FD', background: '#FFFFFF', text: '#212121' },
    { name: 'Yoga Green', primary: '#43A047', secondary: '#66BB6A', accent: '#E8F5E9', background: '#FFFFFF', text: '#212121' },
    { name: 'Power Purple', primary: '#8E24AA', secondary: '#AB47BC', accent: '#F3E5F5', background: '#FFFFFF', text: '#212121' },
    { name: 'Dark Mode', primary: '#5D4037', secondary: '#795548', accent: '#212121', background: '#121212', text: '#FFFFFF' },
    { name: 'High Contrast', primary: '#FF6F00', secondary: '#FFA000', accent: '#FFF8E1', background: '#212121', text: '#FFFFFF' }
  ],
  fontOptions: [
    { name: 'Montserrat', value: 'Montserrat, sans-serif', weight: '300,400,500,600,700,800' },
    { name: 'Roboto', value: 'Roboto, sans-serif', weight: '300,400,500,700,900' },
    { name: 'Oswald', value: 'Oswald, sans-serif', weight: '300,400,500,600,700' },
    { name: 'Bebas Neue', value: 'Bebas Neue, cursive', weight: '400' },
    { name: 'Poppins', value: 'Poppins, sans-serif', weight: '300,400,500,600,700,800' }
  ],
  defaultColors: {
    primary: '#E53935',
    secondary: '#FF5252',
    accent: '#FFEBEE',
    background: '#FFFFFF',
    text: '#212121',
    cardBg: '#F5F5F5',
    borderColor: '#E0E0E0',
    buttonText: '#FFFFFF',
    highlightColor: '#FFC107'
  },
  defaultFont: 'Montserrat, sans-serif',
  themeStyle: {
    layout: 'fitness-studio-layout',
    headerStyle: 'dynamic',
    cardStyle: 'sharp',
    buttonStyle: 'pill',
    iconStyle: 'bold',
    spacing: 'compact',
    shadows: 'strong',
    dividers: true
  },
  defaultData: {
    header: {
      name: 'FlexFit Studio',
      tagline: 'Transform Your Body, Transform Your Life',
      logo: '',
      cover_image: ''
    },
    about: {
      description: 'FlexFit Studio is a premium fitness destination offering a wide range of classes and training options for all fitness levels. Our expert trainers and state-of-the-art facilities provide the perfect environment to achieve your fitness goals, whether you\'re just starting out or looking to take your training to the next level.',
      year_established: '2018',
      studio_type: 'general'
    },
    services: {
      offerings: [
        { name: 'Personal Training', description: 'One-on-one sessions tailored to your specific goals and fitness level', price: 'From $60/session', image: '', duration: '45-60 min', intensity: 'all_levels' },
        { name: 'HIIT Classes', description: 'High-intensity interval training to maximize calorie burn and improve cardiovascular fitness', price: '$25/class', image: '', duration: '45 min', intensity: 'intermediate' },
        { name: 'Yoga Flow', description: 'Dynamic yoga sequences to improve flexibility, strength, and mindfulness', price: '$20/class', image: '', duration: '60 min', intensity: 'all_levels' },
        { name: 'Strength & Conditioning', description: 'Build muscle and improve overall strength with our comprehensive strength program', price: '$25/class', image: '', duration: '60 min', intensity: 'intermediate' }
      ]
    },
    class_schedule: {
      classes: [
        { day: 'monday', class_name: 'Morning HIIT', time: '6:00 AM - 6:45 AM', instructor: 'Alex' },
        { day: 'monday', class_name: 'Yoga Flow', time: '12:00 PM - 1:00 PM', instructor: 'Sarah' },
        { day: 'monday', class_name: 'Strength & Conditioning', time: '5:30 PM - 6:30 PM', instructor: 'Mike' },
        { day: 'wednesday', class_name: 'Morning HIIT', time: '6:00 AM - 6:45 AM', instructor: 'Alex' },
        { day: 'wednesday', class_name: 'Pilates', time: '12:00 PM - 1:00 PM', instructor: 'Emma' },
        { day: 'wednesday', class_name: 'Boxing Fundamentals', time: '5:30 PM - 6:30 PM', instructor: 'Jason' },
        { day: 'friday', class_name: 'Morning HIIT', time: '6:00 AM - 6:45 AM', instructor: 'Alex' },
        { day: 'friday', class_name: 'Yoga Flow', time: '12:00 PM - 1:00 PM', instructor: 'Sarah' },
        { day: 'friday', class_name: 'Strength & Conditioning', time: '5:30 PM - 6:30 PM', instructor: 'Mike' },
        { day: 'saturday', class_name: 'Weekend Warrior', time: '9:00 AM - 10:15 AM', instructor: 'Mike' },
        { day: 'saturday', class_name: 'Yoga Flow', time: '11:00 AM - 12:00 PM', instructor: 'Sarah' }
      ]
    },
    contact: {
      email: 'info@flexfitstudio.com',
      phone: '(555) 123-4567',
      website: 'https://www.flexfitstudio.com',
      address: '123 Fitness Way, Los Angeles, CA 90001'
    },
    social: {
      social_links: [
        { platform: 'instagram', url: 'https://instagram.com/flexfitstudio', username: '@flexfitstudio' },
        { platform: 'facebook', url: 'https://facebook.com/flexfitstudio', username: 'FlexFit Studio' },
        { platform: 'youtube', url: 'https://youtube.com/flexfitstudio', username: 'FlexFit Studio' }
      ]
    },
    videos: {
      video_list: [
        { title: 'HIIT Class Preview - High Energy Workout', description: 'Get a taste of our popular HIIT class with this energizing preview', video_type: 'class_preview', embed_url: '', thumbnail: '', duration: '3:45', fitness_level: 'intermediate' },
        { title: 'Studio Tour - Welcome to FlexFit', description: 'Take a virtual tour of our state-of-the-art fitness facility', video_type: 'studio_tour', embed_url: '', thumbnail: '', duration: '5:20', fitness_level: 'all_levels' },
        { title: 'Jessica\'s Transformation Journey', description: 'Inspiring story of how Jessica lost 30 lbs and gained confidence', video_type: 'transformation_story', embed_url: '', thumbnail: '', duration: '4:15', fitness_level: 'all_levels' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/flexfitstudio',
      channel_name: 'FlexFit Studio',
      subscriber_count: '34.7K',
      featured_playlist: 'https://youtube.com/playlist?list=PLhomeworkouts',
      latest_video_embed: '',
      channel_description: 'Fitness tutorials, class previews, and member success stories from FlexFit Studio. Subscribe for weekly workout inspiration!'
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '05:30', close_time: '21:00', is_closed: false },
        { day: 'tuesday', open_time: '05:30', close_time: '21:00', is_closed: false },
        { day: 'wednesday', open_time: '05:30', close_time: '21:00', is_closed: false },
        { day: 'thursday', open_time: '05:30', close_time: '21:00', is_closed: false },
        { day: 'friday', open_time: '05:30', close_time: '20:00', is_closed: false },
        { day: 'saturday', open_time: '08:00', close_time: '18:00', is_closed: false },
        { day: 'sunday', open_time: '09:00', close_time: '16:00', is_closed: false }
      ]
    },
    gallery: {
      photos: [
        { image: '', caption: 'Our spacious main workout area' },
        { image: '', caption: 'State-of-the-art cardio equipment' },
        { image: '', caption: 'Dedicated yoga and stretching zone' },
        { image: '', caption: 'Free weights and strength training area' }
      ]
    },
    testimonials: {
      reviews: [
        { member_name: 'Jessica R.', review: 'FlexFit completely changed my approach to fitness. The trainers are knowledgeable and supportive, and the community keeps me motivated!', rating: '5', member_image: '', achievement: 'Lost 30 lbs in 6 months' },
        { member_name: 'David M.', review: 'As someone who was intimidated by gyms, FlexFit provided the perfect welcoming environment. The variety of classes keeps my routine fresh and exciting.', rating: '5', member_image: '', achievement: 'Improved strength and flexibility' },
        { member_name: 'Sophia T.', review: 'The personal training sessions are worth every penny. My trainer created a program specifically for my goals and keeps me accountable.', rating: '4', member_image: '', achievement: 'Completed first half-marathon' }
      ]
    },
    appointments: {
      booking_url: 'https://bookings.flexfitstudio.com',
      booking_text: 'Book a Class',
      trial_available: true,
      trial_text: 'Try a free class! New members only.'
    },
    trainers: {
      team: [
        { name: 'Mike Johnson', title: 'Head Trainer, Strength Specialist', bio: 'With over 10 years of experience and multiple certifications, Mike specializes in strength training and athletic performance.', image: '', certifications: 'NASM CPT, CSCS, TRX Certified' },
        { name: 'Sarah Chen', title: 'Yoga Instructor', bio: 'Sarah brings a calming presence to her classes, focusing on alignment, breath work, and mindfulness.', image: '', certifications: '500hr RYT, Yoga Alliance Certified' },
        { name: 'Alex Rodriguez', title: 'HIIT & Cardio Specialist', bio: 'Alex is known for his high-energy classes that push you to your limits while keeping you motivated and having fun.', image: '', certifications: 'ACE CPT, Spinning Certified, TRX Qualified' },
        { name: 'Emma Wilson', title: 'Pilates & Mobility Instructor', bio: 'Emma focuses on core strength, posture, and functional movement patterns to help clients move better in everyday life.', image: '', certifications: 'STOTT Pilates Certified, FMS Level 2' }
      ]
    },
    membership: {
      plans: [
        { name: 'Basic', price: '$49/month', duration: 'Monthly', description: 'Access to gym and basic classes', features: 'Gym access\nBasic classes\nLocker room access\nFitness assessment', is_popular: false },
        { name: 'Premium', price: '$79/month', duration: 'Monthly', description: 'Full access to all classes and facilities', features: 'All Basic features\nUnlimited classes\nGuest passes (2/month)\nNutrition consultation', is_popular: true },
        { name: 'Elite', price: '$129/month', duration: 'Monthly', description: 'Complete fitness experience with personal training', features: 'All Premium features\n2 PT sessions/month\nPriority booking\nCustom workout plan\nMonthly InBody scan', is_popular: false }
      ]
    },
    google_map: {
      map_embed_url: '',
      directions_url: 'https://maps.google.com/directions'
    },
    app_download: {
      app_store_url: '#',
      play_store_url: '#',
      app_description: 'Take FlexFit with you wherever you go. Our mobile app makes it easy to book classes, track your progress, and stay connected with our fitness community.',
      app_features: 'Easy class booking\nWorkout tracking\nPersonal metrics\nCommunity features\nNutrition logging'
    },
    contact_form: {
      form_title: 'Get in Touch',
      form_description: 'Have questions about our classes, membership options, or anything else? Send us a message and our team will get back to you as soon as possible.'
    },
    thank_you: {
      message: 'Thank you for your interest in FlexFit Studio! We look forward to helping you achieve your fitness goals.'
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
      html_content: '<div class="custom-section"><h4>Fitness Tips</h4><p>Check out our latest workout tips and nutrition advice.</p></div>',
      section_title: 'Fitness Resources',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Share Our Gym',
      qr_description: 'Scan this QR code to share our fitness studio with friends and family.',
      qr_size: 'medium'
    },
    language: {
      template_language: 'en'
    },
    footer: {
      show_footer: true,
      footer_text: 'Your fitness journey starts here. Expert trainers, modern equipment, and a supportive community await you at FlexFit Studio.',
      footer_links: [
        { title: 'Free Trial', url: '#trial' },
        { title: 'Class Packages', url: '#membership' },
        { title: 'Personal Training', url: '#trainers' },
        { title: 'Book a Class', url: '#booking' }
      ]
    },
    copyright: {
      text: '© 2025 FlexFit Studio. All rights reserved.'
    }
  }
};