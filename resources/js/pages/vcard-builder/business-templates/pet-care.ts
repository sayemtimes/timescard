import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const petCareTemplate = {
  name: 'Pet Care',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Business Name' },
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
        { name: 'years_experience', type: 'number', label: 'Years of Experience' },
        { name: 'business_type', type: 'select', label: 'Business Type', options: [
          { value: 'veterinary', label: 'Veterinary Clinic' },
          { value: 'grooming', label: 'Pet Grooming' },
          { value: 'boarding', label: 'Pet Boarding/Daycare' },
          { value: 'training', label: 'Pet Training' },
          { value: 'retail', label: 'Pet Store' },
          { value: 'multi', label: 'Multiple Services' }
        ]}
      ],
      required: false
    },
    {
      key: 'services',
      name: 'Services',
      fields: [
        {
          name: 'pet_services',
          type: 'repeater',
          label: 'Pet Services',
          fields: [
            { name: 'name', type: 'text', label: 'Service Name' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'price', type: 'text', label: 'Price' },
            { name: 'image', type: 'file', label: 'Service Image' },
            { name: 'duration', type: 'text', label: 'Duration (if applicable)' },
            { name: 'pet_type', type: 'select', label: 'Pet Type', options: [
              { value: 'all', label: 'All Pets' },
              { value: 'dogs', label: 'Dogs Only' },
              { value: 'cats', label: 'Cats Only' },
              { value: 'small', label: 'Small Animals' },
              { value: 'exotic', label: 'Exotic Pets' }
            ]}
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
        { name: 'emergency_phone', type: 'tel', label: 'Emergency Phone (if applicable)' }
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
          label: 'Operating Hours',
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
          label: 'Client Reviews',
          fields: [
            { name: 'client_name', type: 'text', label: 'Client Name' },
            { name: 'pet_name', type: 'text', label: 'Pet Name' },
            { name: 'pet_type', type: 'text', label: 'Pet Type (e.g., Dog, Cat)' },
            { name: 'review', type: 'textarea', label: 'Review Text' },
            { name: 'rating', type: 'number', label: 'Rating (1-5)' },
            { name: 'client_image', type: 'file', label: 'Client/Pet Photo' }
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
        { name: 'appointment_info', type: 'textarea', label: 'Appointment Information' },
        { name: 'online_booking', type: 'checkbox', label: 'Online Booking Available' }
      ],
      required: false
    },
    {
      key: 'team',
      name: 'Our Team',
      fields: [
        {
          name: 'staff',
          type: 'repeater',
          label: 'Staff Members',
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
      key: 'videos',
      name: 'Pet Care Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Pet Care Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'care_tips', label: 'Pet Care Tips' },
              { value: 'service_demo', label: 'Service Demonstration' },
              { value: 'facility_tour', label: 'Facility Tour' },
              { value: 'pet_testimonial', label: 'Pet & Owner Testimonial' },
              { value: 'educational', label: 'Educational Content' },
              { value: 'behind_scenes', label: 'Behind the Scenes' }
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
      key: 'pet_care_tips',
      name: 'Pet Care Tips',
      fields: [
        {
          name: 'tips',
          type: 'repeater',
          label: 'Care Tips',
          fields: [
            { name: 'title', type: 'text', label: 'Tip Title' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'pet_type', type: 'select', label: 'Pet Type', options: [
              { value: 'all', label: 'All Pets' },
              { value: 'dogs', label: 'Dogs' },
              { value: 'cats', label: 'Cats' },
              { value: 'small', label: 'Small Animals' },
              { value: 'exotic', label: 'Exotic Pets' }
            ]},
            { name: 'image', type: 'file', label: 'Tip Image' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'emergency',
      name: 'Emergency Information',
      fields: [
        { name: 'emergency_title', type: 'text', label: 'Emergency Section Title' },
        { name: 'emergency_description', type: 'textarea', label: 'Emergency Instructions' },
        { name: 'emergency_phone', type: 'tel', label: 'Emergency Phone Number' },
        { name: 'emergency_hours', type: 'text', label: 'Emergency Hours' },
        { name: 'show_emergency_banner', type: 'checkbox', label: 'Show Emergency Banner' }
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
      key: 'copyright',
      name: 'Copyright',
      fields: [
        { name: 'text', type: 'text', label: 'Copyright Text' }
      ],
      required: false
    }
  ],
  colorPresets: [
    { name: 'Playful Paws', primary: '#4CAF50', secondary: '#8BC34A', accent: '#E8F5E9', background: '#FFFFFF', text: '#333333' },
    { name: 'Vet Blue', primary: '#1976D2', secondary: '#64B5F6', accent: '#E3F2FD', background: '#FFFFFF', text: '#333333' },
    { name: 'Grooming Pink', primary: '#EC407A', secondary: '#F48FB1', accent: '#FCE4EC', background: '#FFFFFF', text: '#333333' },
    { name: 'Cozy Brown', primary: '#795548', secondary: '#A1887F', accent: '#EFEBE9', background: '#FFFFFF', text: '#333333' },
    { name: 'Vibrant Orange', primary: '#FF9800', secondary: '#FFB74D', accent: '#FFF3E0', background: '#FFFFFF', text: '#333333' },
    { name: 'Calm Teal', primary: '#009688', secondary: '#4DB6AC', accent: '#E0F2F1', background: '#FFFFFF', text: '#333333' }
  ],
  fontOptions: [
    { name: 'Nunito', value: 'Nunito, sans-serif', weight: '400,600,700,800' },
    { name: 'Quicksand', value: 'Quicksand, sans-serif', weight: '400,500,600,700' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif', weight: '400,500,600,700' },
    { name: 'Comic Neue', value: 'Comic Neue, cursive', weight: '400,700' },
    { name: 'Poppins', value: 'Poppins, sans-serif', weight: '400,500,600,700' }
  ],
  defaultColors: {
    primary: '#4CAF50',
    secondary: '#8BC34A',
    accent: '#E8F5E9',
    background: '#FFFFFF',
    text: '#333333',
    cardBg: '#FFFFFF',
    borderColor: '#E0E0E0',
    buttonText: '#FFFFFF',
    highlightColor: '#FFC107'
  },
  defaultFont: 'Nunito, sans-serif',
  themeStyle: {
    layout: 'pet-care-layout',
    headerStyle: 'friendly',
    cardStyle: 'rounded',
    buttonStyle: 'rounded',
    iconStyle: 'playful',
    spacing: 'comfortable',
    shadows: 'soft',
    dividers: true
  },
  defaultData: {
    header: {
      name: 'Paws & Claws',
      tagline: 'Compassionate care for your furry family members',
      logo: '',
      cover_image: ''
    },
    about: {
      description: 'At Paws & Claws, we provide comprehensive veterinary care, grooming, and boarding services for pets of all kinds. Our experienced team is dedicated to ensuring the health, happiness, and well-being of your beloved companions in a stress-free environment.',
      years_experience: '15',
      business_type: 'multi'
    },
    services: {
      pet_services: [
        { name: 'Wellness Exams', description: 'Comprehensive health check-ups to keep your pet in optimal health.', price: 'From $50', image: '', duration: '30 min', pet_type: 'all' },
        { name: 'Full Grooming', description: 'Complete grooming service including bath, haircut, nail trimming, and ear cleaning.', price: 'From $45', image: '', duration: '60-90 min', pet_type: 'all' },
        { name: 'Pet Boarding', description: 'Safe and comfortable overnight care for your pets while you\'re away.', price: 'From $35/night', image: '', duration: 'Overnight', pet_type: 'all' },
        { name: 'Dental Cleaning', description: 'Professional dental care to maintain your pet\'s oral health.', price: 'From $200', image: '', duration: '60 min', pet_type: 'all' }
      ]
    },
    contact: {
      email: 'info@pawsandclaws.com',
      phone: '(555) 123-4567',
      website: 'https://www.pawsandclaws.com',
      address: '123 Pet Care Lane, Anytown, CA 90210',
      emergency_phone: '(555) 987-6543'
    },
    social: {
      social_links: [
        { platform: 'instagram', url: 'https://instagram.com/pawsandclaws', username: '@pawsandclaws' },
        { platform: 'facebook', url: 'https://facebook.com/pawsandclaws', username: 'Paws & Claws' },
        { platform: 'twitter', url: 'https://twitter.com/pawsandclaws', username: '@pawsandclaws' },
        { platform: 'youtube', url: 'https://youtube.com/pawsandclaws', username: 'Paws & Claws' }
      ]
    },
    videos: {
      video_list: [
        { title: 'How to Brush Your Dog\'s Teeth', description: 'Step-by-step guide to maintaining your dog\'s dental health at home', video_type: 'care_tips', embed_url: '', thumbnail: '', duration: '5:30' },
        { title: 'Tour Our Modern Veterinary Facility', description: 'Take a virtual tour of our state-of-the-art clinic and boarding facilities', video_type: 'facility_tour', embed_url: '', thumbnail: '', duration: '7:45' },
        { title: 'Max\'s Grooming Transformation', description: 'Watch Max get a full grooming makeover at our salon', video_type: 'service_demo', embed_url: '', thumbnail: '', duration: '4:20' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/pawsandclaws',
      channel_name: 'Paws & Claws Pet Care',
      subscriber_count: '23.7K',
      featured_playlist: 'https://youtube.com/playlist?list=PLpetcaretips',
      latest_video_embed: '',
      channel_description: 'Pet care tips, educational content, and behind-the-scenes videos from our veterinary clinic and grooming salon. Subscribe for weekly pet care advice!'
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '08:00', close_time: '18:00', is_closed: false },
        { day: 'tuesday', open_time: '08:00', close_time: '18:00', is_closed: false },
        { day: 'wednesday', open_time: '08:00', close_time: '18:00', is_closed: false },
        { day: 'thursday', open_time: '08:00', close_time: '18:00', is_closed: false },
        { day: 'friday', open_time: '08:00', close_time: '18:00', is_closed: false },
        { day: 'saturday', open_time: '09:00', close_time: '16:00', is_closed: false },
        { day: 'sunday', open_time: '00:00', close_time: '00:00', is_closed: true }
      ]
    },
    gallery: {
      photos: [
        { image: '', caption: 'Our modern facility' },
        { image: '', caption: 'Professional grooming services' },
        { image: '', caption: 'Comfortable boarding accommodations' },
        { image: '', caption: 'Our friendly staff with happy patients' }
      ]
    },
    testimonials: {
      reviews: [
        { client_name: 'Sarah Johnson', pet_name: 'Max', pet_type: 'Dog', review: 'The team at Paws & Claws has been taking care of my Golden Retriever for years. They\'re always gentle, thorough, and genuinely care about Max\'s wellbeing.', rating: '5', client_image: '' },
        { client_name: 'Michael Chen', pet_name: 'Luna', pet_type: 'Cat', review: 'I was nervous about boarding my cat, but the staff made both of us feel comfortable. Luna came home happy and well-cared for. I won\'t hesitate to use their services again!', rating: '5', client_image: '' },
        { client_name: 'Emily Rodriguez', pet_name: 'Bella', pet_type: 'Dog', review: 'The grooming services are excellent! Bella always looks and smells amazing after her appointments. The groomers are patient with her anxiety too.', rating: '4', client_image: '' }
      ]
    },
    appointments: {
      booking_url: 'https://booking.pawsandclaws.com',
      booking_text: 'Book an Appointment',
      appointment_info: 'Schedule an appointment for veterinary services, grooming, or to discuss boarding options. Same-day appointments may be available for urgent cases.',
      online_booking: true
    },
    team: {
      staff: [
        { name: 'Dr. James Wilson', title: 'Head Veterinarian', bio: 'Dr. Wilson has over 15 years of experience in small animal medicine and surgery. He has a special interest in preventative care and geriatric medicine.', image: '', specialties: 'Small Animal Medicine, Surgery, Geriatric Care' },
        { name: 'Lisa Martinez', title: 'Lead Groomer', bio: 'Lisa has been grooming pets for 10 years and is certified in handling anxious animals. She specializes in breed-specific cuts and gentle grooming techniques.', image: '', specialties: 'Breed-Specific Cuts, Anxious Pet Handling' },
        { name: 'Mark Thompson', title: 'Boarding Manager', bio: 'Mark ensures that all boarding pets receive personalized attention and care. He\'s known for creating a home-like environment for our overnight guests.', image: '', specialties: 'Animal Behavior, Enrichment Activities' },
        { name: 'Dr. Sarah Lee', title: 'Associate Veterinarian', bio: 'Dr. Lee joined our team after completing advanced training in dental care and dermatology. She loves working with pets of all sizes.', image: '', specialties: 'Dental Care, Dermatology' }
      ]
    },
    pet_care_tips: {
      tips: [
        { title: 'Dental Health', description: 'Brush your pet\'s teeth regularly and provide dental chews to maintain good oral hygiene and prevent dental disease.', pet_type: 'all', image: '' },
        { title: 'Summer Safety', description: 'Never leave pets in hot cars and ensure they have access to shade and fresh water during warm weather to prevent heat stroke.', pet_type: 'all', image: '' },
        { title: 'Flea Prevention', description: 'Maintain regular flea prevention treatments year-round, even in winter months, to protect your pet and your home.', pet_type: 'all', image: '' },
        { title: 'Cat Enrichment', description: 'Provide climbing spaces, hiding spots, and interactive toys to keep indoor cats mentally stimulated and physically active.', pet_type: 'cats', image: '' }
      ]
    },
    emergency: {
      emergency_title: 'Pet Emergency?',
      emergency_description: 'If your pet is experiencing a medical emergency outside of our regular hours, please call our emergency line immediately or visit the nearest 24-hour veterinary hospital.',
      emergency_phone: '(555) 987-6543',
      emergency_hours: '24/7',
      show_emergency_banner: true
    },
    google_map: {
      map_embed_url: '',
      directions_url: 'https://maps.google.com/directions'
    },
    app_download: {
      app_store_url: '#',
      play_store_url: '#',
      app_description: 'Download our app to easily schedule appointments, receive medication reminders, access your pet\'s health records, and more.',
      app_features: 'Appointment scheduling\nMedication reminders\nDigital health records\nDirect messaging with our team\nEmergency contact information'
    },
    contact_form: {
      form_title: 'Contact Us',
      form_description: 'Have questions about our services or want to schedule an appointment? Fill out the form below and we\'ll get back to you as soon as possible.'
    },
    thank_you: {
      message: 'Thank you for reaching out to Paws & Claws! We appreciate your interest and will respond to your inquiry shortly.'
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
      html_content: '<div class="pet-care-stats"><h4>Pet Care Excellence</h4><p>🐶 5000+ Happy Pets Served</p><p>🏆 15 Years of Experience</p><p>👨‍⚕️ Licensed Veterinarians</p><p>⭐ 5-Star Rated Service</p></div>',
      section_title: 'Why Choose Us',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Connect with Paws & Claws',
      qr_description: 'Scan to save our contact info and book your pet\'s next appointment!',
      qr_size: 'medium'
    },
    language: {
      template_language: 'en'
    },
    copyright: {
      text: '© 2025 Paws & Claws Pet Care. All rights reserved.'
    }
  }
};