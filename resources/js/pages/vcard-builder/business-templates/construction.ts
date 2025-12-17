import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const constructionTemplate = {
  name: 'Construction & Contractor',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Company Name' },
        { name: 'tagline', type: 'textarea', label: 'Tagline' },
        { name: 'logo', type: 'file', label: 'Logo' },
        { name: 'license_number', type: 'text', label: 'License Number' }
      ],
      required: true
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'About Us' },
        { name: 'year_established', type: 'number', label: 'Year Established' },
        { name: 'service_area', type: 'text', label: 'Service Area' }
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
              { value: 'renovation', label: 'Renovation' },
              { value: 'plumbing', label: 'Plumbing' },
              { value: 'electrical', label: 'Electrical' },
              { value: 'roofing', label: 'Roofing' },
              { value: 'painting', label: 'Painting' },
              { value: 'flooring', label: 'Flooring' },
              { value: 'landscaping', label: 'Landscaping' },
              { value: 'carpentry', label: 'Carpentry' },
              { value: 'masonry', label: 'Masonry' },
              { value: 'hvac', label: 'HVAC' }
            ]}
          ]
        }
      ],
      required: false
    },
    {
      key: 'videos',
      name: 'Project Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Construction Videos',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'project_timelapse', label: 'Project Timelapse' },
              { value: 'before_after', label: 'Before & After' },
              { value: 'process_demo', label: 'Process Demonstration' },
              { value: 'client_testimonial', label: 'Client Testimonial' },
              { value: 'team_introduction', label: 'Team Introduction' },
              { value: 'safety_procedures', label: 'Safety Procedures' }
            ]},
            { name: 'embed_url', type: 'textarea', label: 'Video Embed URL' },
            { name: 'thumbnail', type: 'file', label: 'Video Thumbnail' },
            { name: 'duration', type: 'text', label: 'Duration' },
            { name: 'project_category', type: 'select', label: 'Project Category', options: [
              { value: 'residential', label: 'Residential' },
              { value: 'commercial', label: 'Commercial' },
              { value: 'renovation', label: 'Renovation' },
              { value: 'new_construction', label: 'New Construction' }
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
      key: 'projects',
      name: 'Projects',
      fields: [
        {
          name: 'project_list',
          type: 'repeater',
          label: 'Projects',
          fields: [
            { name: 'title', type: 'text', label: 'Project Name' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'location', type: 'text', label: 'Location' },
            { name: 'before_image', type: 'file', label: 'Before Image' },
            { name: 'after_image', type: 'file', label: 'After Image' },
            { name: 'category', type: 'select', label: 'Category', options: [
              { value: 'residential', label: 'Residential' },
              { value: 'commercial', label: 'Commercial' },
              { value: 'industrial', label: 'Industrial' },
              { value: 'renovation', label: 'Renovation' },
              { value: 'new_construction', label: 'New Construction' }
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
        { name: 'emergency', type: 'tel', label: 'Emergency Contact' }
      ],
      required: true
    },
    {
      key: 'credentials',
      name: 'Credentials',
      fields: [
        {
          name: 'certifications',
          type: 'repeater',
          label: 'Certifications & Licenses',
          fields: [
            { name: 'title', type: 'text', label: 'Certification Title' },
            { name: 'issuer', type: 'text', label: 'Issuing Organization' },
            { name: 'year', type: 'text', label: 'Year' },
            { name: 'image', type: 'file', label: 'Certificate Image' }
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
            { name: 'review', type: 'textarea', label: 'Review Text' },
            { name: 'rating', type: 'number', label: 'Rating (1-5)' },
            { name: 'project_type', type: 'text', label: 'Project Type' },
            { name: 'location', type: 'text', label: 'Location' }
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
        { name: 'estimate_text', type: 'text', label: 'Free Estimate Button Text' }
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
      key: 'custom_html',
      name: 'Custom HTML',
      fields: [
        { name: 'html_content', type: 'textarea', label: 'HTML Content' },
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
        { name: 'qr_description', type: 'textarea', label: 'QR Description' }
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
    { name: 'Construction Yellow', primary: '#F9A826', secondary: '#FFD166', accent: '#FFF3CD', background: '#FFFFFF', text: '#333333' },
    { name: 'Industrial Gray', primary: '#455A64', secondary: '#607D8B', accent: '#CFD8DC', background: '#FFFFFF', text: '#333333' },
    { name: 'Safety Orange', primary: '#FF5722', secondary: '#FF8A65', accent: '#FFCCBC', background: '#FFFFFF', text: '#333333' },
    { name: 'Blueprint Blue', primary: '#1565C0', secondary: '#1E88E5', accent: '#BBDEFB', background: '#FFFFFF', text: '#333333' },
    { name: 'Contractor Black', primary: '#212121', secondary: '#424242', accent: '#F5F5F5', background: '#FFFFFF', text: '#333333' },
    { name: 'Forest Green', primary: '#2E7D32', secondary: '#43A047', accent: '#C8E6C9', background: '#FFFFFF', text: '#333333' }
  ],
  fontOptions: [
    { name: 'Roboto', value: 'Roboto, sans-serif', weight: '400,500,700,900' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif', weight: '400,500,600,700,800' },
    { name: 'Open Sans', value: 'Open Sans, sans-serif', weight: '400,600,700' },
    { name: 'Oswald', value: 'Oswald, sans-serif', weight: '400,500,600,700' },
    { name: 'Teko', value: 'Teko, sans-serif', weight: '300,400,500,600,700' }
  ],
  defaultColors: {
    primary: '#F9A826',
    secondary: '#FFD166',
    accent: '#FFF3CD',
    background: '#FFFFFF',
    text: '#333333',
    cardBg: '#F9F9F9',
    borderColor: '#E0E0E0',
    buttonText: '#FFFFFF',
    warningColor: '#FF5722'
  },
  defaultFont: 'Roboto, sans-serif',
  themeStyle: {
    layout: 'construction-layout',
    headerStyle: 'industrial',
    cardStyle: 'solid',
    buttonStyle: 'square',
    iconStyle: 'bold',
    spacing: 'compact',
    shadows: 'strong',
    dividers: true
  },
  defaultData: {
    header: {
      name: 'BuildRight Construction',
      tagline: 'Quality craftsmanship for all your construction needs',
      logo: '',
      license_number: 'LIC #123456'
    },
    about: {
      description: 'BuildRight Construction has been serving the community since 2005. We specialize in residential and commercial construction projects, delivering high-quality workmanship and exceptional customer service. Our team of skilled professionals is committed to bringing your vision to life on time and within budget.',
      year_established: '2005',
      service_area: 'Greater Portland Area and Surrounding Counties'
    },
    services: {
      service_list: [
        { title: 'Home Renovations', description: 'Complete home remodeling services including kitchens, bathrooms, basements, and additions.', icon: 'renovation' },
        { title: 'New Construction', description: 'Custom home building from foundation to finishing touches, built to your specifications.', icon: 'carpentry' },
        { title: 'Roofing', description: 'Roof installation, repair, and replacement using quality materials with expert craftsmanship.', icon: 'roofing' },
        { title: 'Electrical Services', description: 'Comprehensive electrical work including installation, repairs, and upgrades to meet code requirements.', icon: 'electrical' }
      ]
    },
    projects: {
      project_list: [
        { title: 'Modern Kitchen Remodel', description: 'Complete kitchen renovation featuring custom cabinetry, quartz countertops, and high-end appliances.', location: 'Portland, OR', before_image: '', after_image: '', category: 'residential' },
        { title: 'Commercial Office Renovation', description: 'Full interior renovation of a 5,000 sq ft office space including new flooring, lighting, and partition walls.', location: 'Beaverton, OR', before_image: '', after_image: '', category: 'commercial' },
        { title: 'Custom Home Build', description: 'New construction of a 3,200 sq ft custom home with energy-efficient features and smart home technology.', location: 'Lake Oswego, OR', before_image: '', after_image: '', category: 'new_construction' }
      ]
    },
    contact: {
      email: 'info@buildrightconstruction.com',
      phone: '(503) 555-1234',
      website: 'https://www.buildrightconstruction.com',
      address: '123 Builder Way, Portland, OR 97201',
      emergency: '(503) 555-9876'
    },
    credentials: {
      certifications: [
        { title: 'General Contractor License', issuer: 'Oregon Construction Contractors Board', year: '2005', image: '' },
        { title: 'OSHA Safety Certification', issuer: 'Occupational Safety and Health Administration', year: '2022', image: '' },
        { title: 'Energy Trust of Oregon Trade Ally', issuer: 'Energy Trust of Oregon', year: '2018', image: '' }
      ]
    },
    social: {
      social_links: [
        { platform: 'facebook', url: 'https://facebook.com/buildrightconstruction', username: 'BuildRight Construction' },
        { platform: 'instagram', url: 'https://instagram.com/buildrightconstruction', username: '@buildrightconstruction' },
        { platform: 'houzz', url: 'https://houzz.com/pro/buildrightconstruction', username: 'BuildRight Construction' },
        { platform: 'youtube', url: 'https://youtube.com/buildrightconstruction', username: 'BuildRight Construction' }
      ]
    },
    videos: {
      video_list: [
        { title: 'Kitchen Renovation Timelapse', description: 'Watch our complete kitchen renovation from demolition to final reveal', video_type: 'project_timelapse', embed_url: '', thumbnail: '', duration: '3:45', project_category: 'renovation' },
        { title: 'Custom Home Build Process', description: 'Follow the construction of a custom home from foundation to move-in ready', video_type: 'process_demo', embed_url: '', thumbnail: '', duration: '12:30', project_category: 'new_construction' },
        { title: 'Client Success Story - The Johnson Family', description: 'Hear from satisfied clients about their home renovation experience', video_type: 'client_testimonial', embed_url: '', thumbnail: '', duration: '4:15', project_category: 'residential' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/buildrightconstruction',
      channel_name: 'BuildRight Construction',
      subscriber_count: '15.7K',
      featured_playlist: 'https://youtube.com/playlist?list=PLhomerenovations',
      latest_video_embed: '',
      channel_description: 'Construction tutorials, project timelapses, and home improvement tips from licensed contractors with 20+ years of experience.'
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '07:00', close_time: '17:00', is_closed: false },
        { day: 'tuesday', open_time: '07:00', close_time: '17:00', is_closed: false },
        { day: 'wednesday', open_time: '07:00', close_time: '17:00', is_closed: false },
        { day: 'thursday', open_time: '07:00', close_time: '17:00', is_closed: false },
        { day: 'friday', open_time: '07:00', close_time: '17:00', is_closed: false },
        { day: 'saturday', open_time: '08:00', close_time: '12:00', is_closed: false },
        { day: 'sunday', open_time: '', close_time: '', is_closed: true }
      ]
    },
    gallery: {
      photos: [
        { image: '', caption: 'Custom kitchen with island and pendant lighting' },
        { image: '', caption: 'Bathroom remodel with walk-in shower' },
        { image: '', caption: 'Exterior siding and trim work' },
        { image: '', caption: 'Finished basement with entertainment area' }
      ]
    },
    testimonials: {
      reviews: [
        { client_name: 'Michael & Sarah Johnson', review: 'BuildRight transformed our outdated kitchen into a modern, functional space that exceeded our expectations. Their attention to detail and craftsmanship was impressive.', rating: '5', project_type: 'Kitchen Remodel', location: 'Portland' },
        { client_name: 'Northwest Medical Group', review: 'We hired BuildRight for our office renovation and were extremely pleased with the results. They worked efficiently to minimize disruption to our practice and delivered on schedule.', rating: '5', project_type: 'Commercial Renovation', location: 'Beaverton' },
        { client_name: 'David Wilson', review: 'From design to completion, BuildRight made building our custom home a smooth process. Their communication was excellent and the quality of work is outstanding.', rating: '5', project_type: 'Custom Home', location: 'Lake Oswego' }
      ]
    },
    appointments: {
      booking_url: 'https://calendly.com/buildrightconstruction',
      section_title: 'Ready to Start Your Project?',
      section_description: 'Contact us today for professional service and quality workmanship.',
      booking_text: 'Schedule a Consultation',
      estimate_text: 'Request a Free Estimate'
    },
    google_map: {
      map_embed_url: '',
      directions_url: 'https://maps.google.com/directions'
    },
    app_download: {
      app_store_url: '#',
      play_store_url: '#',
      app_description: 'Download our app to track your project progress, communicate with our team, and manage payments.'
    },
    contact_form: {
      form_title: 'Get in Touch',
      form_description: 'Have a project in mind? Fill out the form below to discuss your construction needs and receive a free estimate.'
    },
    custom_html: {
      html_content: '<h3>Quality Construction Services</h3><p>With over 20 years of experience, we deliver exceptional construction projects on time and within budget. Our licensed professionals ensure quality workmanship and customer satisfaction.</p>',
      section_title: 'Why Choose Us',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Share Our Services',
      qr_description: 'Scan to share our construction services with others'
    },
    language: {
      template_language: 'en'
    },
    thank_you: {
      message: 'Thank you for contacting BuildRight Construction. We appreciate your interest and will get back to you within 1-2 business days to discuss your project.'
    },
    seo: {
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
    footer: {
      show_footer: true,
      footer_text: 'Licensed, bonded, and insured. Serving the community with quality construction services since 2005.',
      footer_links: [
        { title: 'License Verification', url: '#' },
        { title: 'Insurance Info', url: '#' },
        { title: 'Safety Standards', url: '#' }
      ]
    },
    copyright: {
      text: '© 2025 BuildRight Construction. All rights reserved. CCB #123456'
    }
  }
};