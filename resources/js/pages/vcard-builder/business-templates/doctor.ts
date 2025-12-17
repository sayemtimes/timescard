import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const doctorTemplate = {
  name: 'Doctor/Medical',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Doctor Name' },
        { name: 'title', type: 'text', label: 'Medical Title' },
        { name: 'specialization', type: 'text', label: 'Specialization' },
        { name: 'professional_badge', type: 'text', label: 'Professional Badge' },
        { name: 'profile_image', type: 'file', label: 'Profile Photo' }
      ],
      required: true
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'About Doctor' },
        { name: 'qualifications', type: 'textarea', label: 'Qualifications' },
        { name: 'experience_years', type: 'number', label: 'Years of Experience' }
      ],
      required: false
    },
    {
      key: 'contact',
      name: 'Contact Information',
      fields: [
        { name: 'email', type: 'email', label: 'Email Address' },
        { name: 'phone', type: 'tel', label: 'Phone Number' },
        { name: 'emergency_phone', type: 'tel', label: 'Emergency Phone' },
        { name: 'website', type: 'url', label: 'Website URL' },
        { name: 'clinic_address', type: 'textarea', label: 'Clinic Address' }
      ],
      required: true
    },
    {
      key: 'business_hours',
      name: 'Clinic Hours',
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
            { name: 'is_closed', type: 'checkbox', label: 'Closed' },
            { name: 'appointment_only', type: 'checkbox', label: 'By Appointment Only' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'specialties',
      name: 'Medical Specialties',
      fields: [
        {
          name: 'specialty_list',
          type: 'repeater',
          label: 'Specialties',
          fields: [
            { name: 'name', type: 'text', label: 'Specialty Name' },
            { name: 'description', type: 'textarea', label: 'Description' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'videos',
      name: 'Educational Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Medical Education Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'health_education', label: 'Health Education' },
              { value: 'procedure_explanation', label: 'Procedure Explanation' },
              { value: 'prevention_tips', label: 'Prevention Tips' },
              { value: 'patient_testimonial', label: 'Patient Testimonial' },
              { value: 'clinic_tour', label: 'Clinic Tour' },
              { value: 'doctor_introduction', label: 'Doctor Introduction' }
            ]},
            { name: 'embed_url', type: 'textarea', label: 'Video Embed URL' },
            { name: 'thumbnail', type: 'file', label: 'Video Thumbnail' },
            { name: 'duration', type: 'text', label: 'Duration' },
            { name: 'medical_specialty', type: 'text', label: 'Medical Specialty' }
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
      name: 'Medical Services',
      fields: [
        {
          name: 'service_list',
          type: 'repeater',
          label: 'Services',
          fields: [
            { name: 'name', type: 'text', label: 'Service Name' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'duration', type: 'text', label: 'Duration' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'appointments',
      name: 'Appointments',
      fields: [
        { name: 'booking_phone', type: 'tel', label: 'Appointment Phone' },
        { name: 'online_booking_url', type: 'url', label: 'Online Booking URL' },
        { name: 'booking_instructions', type: 'textarea', label: 'Booking Instructions' }
      ],
      required: false
    },
    {
      key: 'testimonials',
      name: 'Patient Testimonials',
      fields: [
        {
          name: 'reviews',
          type: 'repeater',
          label: 'Patient Reviews',
          fields: [
            { name: 'patient_name', type: 'text', label: 'Patient Name' },
            { name: 'review', type: 'textarea', label: 'Review Text' },
            { name: 'rating', type: 'number', label: 'Rating (1-5)' }
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
      key: 'google_map',
      name: 'Clinic Location',
      fields: [
        { name: 'map_embed_url', type: 'textarea', label: 'Google Maps Embed URL' },
        { name: 'directions_url', type: 'url', label: 'Google Maps Directions URL' }
      ],
      required: false
    },
    {
      key: 'app_download',
      name: 'Medical App',
      fields: [
        { name: 'app_store_url', type: 'url', label: 'App Store URL' },
        { name: 'play_store_url', type: 'url', label: 'Play Store URL' }
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
        { name: 'qr_description', type: 'textarea', label: 'QR Description' }
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
    },
    {
      key: 'copyright',
      name: 'Copyright',
      fields: [
        { name: 'text', type: 'text', label: 'Copyright Text' }
      ],
      required: false
    },
    {
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
    }
  ],
  colorPresets: [
    { name: 'Medical Blue', primary: '#1E40AF', secondary: '#3B82F6', accent: '#DBEAFE', background: '#F8FAFC', text: '#1E293B' },
    { name: 'Health Green', primary: '#047857', secondary: '#10B981', accent: '#D1FAE5', background: '#F0FDF4', text: '#14532D' },
    { name: 'Clinical White', primary: '#475569', secondary: '#64748B', accent: '#E2E8F0', background: '#FFFFFF', text: '#0F172A' },
    { name: 'Trust Teal', primary: '#0F766E', secondary: '#14B8A6', accent: '#CCFBF1', background: '#F0FDFA', text: '#134E4A' },
    { name: 'Cardiology Red', primary: '#DC2626', secondary: '#EF4444', accent: '#FEE2E2', background: '#FEF2F2', text: '#7F1D1D' },
    { name: 'Pharmacy Purple', primary: '#7C3AED', secondary: '#A855F7', accent: '#EDE9FE', background: '#FAF5FF', text: '#581C87' },
    { name: 'Sterile Gray', primary: '#6B7280', secondary: '#9CA3AF', accent: '#F3F4F6', background: '#FAFAFA', text: '#374151' },
    { name: 'Emergency Orange', primary: '#EA580C', secondary: '#FB923C', accent: '#FED7AA', background: '#FFF7ED', text: '#9A3412' },
    { name: 'Wellness Rose', primary: '#E11D48', secondary: '#F43F5E', accent: '#FECDD3', background: '#FFF1F2', text: '#881337' },
    { name: 'Healing Mint', primary: '#059669', secondary: '#34D399', accent: '#A7F3D0', background: '#ECFDF5', text: '#064E3B' }
  ],
  fontOptions: [
    { name: 'Inter Medical', value: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600' },
    { name: 'Source Sans Pro', value: 'Source Sans Pro, sans-serif', weight: '400,600,700' },
    { name: 'Roboto Clinical', value: 'Roboto, Arial, sans-serif', weight: '300,400,500,700' },
    { name: 'Open Sans', value: 'Open Sans, Helvetica, sans-serif', weight: '400,600,700' },
    { name: 'Lato Professional', value: 'Lato, sans-serif', weight: '400,700,900' }
  ],
  defaultColors: {
    primary: '#1E40AF',
    secondary: '#3B82F6',
    accent: '#DBEAFE',
    background: '#F8FAFC',
    text: '#1E293B',
    cardBg: '#FFFFFF',
    borderColor: '#E2E8F0'
  },
  defaultFont: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  themeStyle: {
    layout: 'clinical',
    headerStyle: 'professional',
    cardStyle: 'clean',
    buttonStyle: 'rounded',
    iconStyle: 'medical',
    spacing: 'comfortable',
    shadows: 'subtle',
    animations: 'gentle'
  },
  defaultData: {
    header: {
      name: 'Dr. Sarah Johnson',
      title: 'MD, FACP',
      specialization: 'Internal Medicine & Cardiology',
      professional_badge: 'HEALTHCARE PROFESSIONAL',
      profile_image: ''
    },
    about: {
      description: 'Dr. Sarah Johnson is a board-certified internal medicine physician with specialized training in cardiology. She is dedicated to providing comprehensive, patient-centered care with a focus on preventive medicine.',
      qualifications: 'MD from Harvard Medical School, Residency in Internal Medicine at Johns Hopkins, Fellowship in Cardiology at Mayo Clinic',
      experience_years: '15'
    },
    contact: {
      email: 'dr.johnson@healthclinic.com',
      phone: '+1 (555) 123-4567',
      emergency_phone: '+1 (555) 911-0000',
      website: 'https://drjohnsonmd.com',
      clinic_address: '456 Medical Center Drive, Suite 200, Health City, NY 10002'
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '08:00', close_time: '17:00', is_closed: false, appointment_only: false },
        { day: 'tuesday', open_time: '08:00', close_time: '17:00', is_closed: false, appointment_only: false },
        { day: 'wednesday', open_time: '08:00', close_time: '17:00', is_closed: false, appointment_only: false },
        { day: 'thursday', open_time: '08:00', close_time: '17:00', is_closed: false, appointment_only: false },
        { day: 'friday', open_time: '08:00', close_time: '16:00', is_closed: false, appointment_only: false },
        { day: 'saturday', open_time: '09:00', close_time: '13:00', is_closed: false, appointment_only: true },
        { day: 'sunday', open_time: '', close_time: '', is_closed: true, appointment_only: false }
      ]
    },
    specialties: {
      specialty_list: [
        { name: 'Preventive Cardiology', description: 'Heart disease prevention and risk assessment' },
        { name: 'Hypertension Management', description: 'Comprehensive blood pressure management' },
        { name: 'Diabetes Care', description: 'Type 1 and Type 2 diabetes management' }
      ]
    },
    services: {
      service_list: [
        { name: 'Annual Physical Exam', description: 'Comprehensive health assessment', duration: '60 minutes' },
        { name: 'Cardiac Consultation', description: 'Heart health evaluation', duration: '45 minutes' },
        { name: 'Preventive Care', description: 'Screenings and vaccinations', duration: '30 minutes' }
      ]
    },
    appointments: {
      booking_phone: '+1 (555) 123-4567',
      online_booking_url: 'https://drjohnsonmd.com/appointments',
      booking_instructions: 'Please call 24 hours in advance for appointments. Emergency consultations available.'
    },
    testimonials: {
      reviews: [
        { patient_name: 'Michael Chen', review: 'Dr. Johnson is thorough and caring. She takes time to explain everything clearly.', rating: '5' },
        { patient_name: 'Lisa Williams', review: 'Excellent bedside manner and very knowledgeable. Highly recommend!', rating: '5' }
      ]
    },
    social: {
      social_links: [
        { platform: 'linkedin', url: 'https://linkedin.com/in/drjohnsonmd', username: 'Dr. Sarah Johnson' },
        { platform: 'facebook', url: 'https://facebook.com/drjohnsonmd', username: 'Dr. Johnson Medical Practice' },
        { platform: 'healthgrades', url: 'https://healthgrades.com/physician/dr-johnson', username: 'Dr. Sarah Johnson' },
        { platform: 'youtube', url: 'https://youtube.com/drjohnsonmd', username: 'Dr. Sarah Johnson MD' }
      ]
    },
    videos: {
      video_list: [
        { title: 'Understanding Heart Health: Prevention Tips', description: 'Learn essential tips for maintaining cardiovascular health and preventing heart disease', video_type: 'health_education', embed_url: '', thumbnail: '', duration: '12:45', medical_specialty: 'Cardiology' },
        { title: 'What to Expect During Your Annual Physical', description: 'A comprehensive guide to annual physical examinations and their importance', video_type: 'procedure_explanation', embed_url: '', thumbnail: '', duration: '8:30', medical_specialty: 'Internal Medicine' },
        { title: 'Managing Diabetes: A Patient\'s Journey', description: 'Real patient story about successfully managing Type 2 diabetes', video_type: 'patient_testimonial', embed_url: '', thumbnail: '', duration: '6:15', medical_specialty: 'Endocrinology' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/drjohnsonmd',
      channel_name: 'Dr. Sarah Johnson MD',
      subscriber_count: '24.8K',
      featured_playlist: 'https://youtube.com/playlist?list=PLhearthealth',
      latest_video_embed: '',
      channel_description: 'Medical education videos, health tips, and patient care insights from a board-certified internal medicine physician and cardiologist.'
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
      form_title: 'Schedule a Consultation',
      form_description: 'Have questions about your health? Contact us to schedule a consultation.'
    },
    custom_html: {
      html_content: '<h3>Comprehensive Healthcare</h3><p>Dr. Sarah Johnson is a board-certified physician with 15+ years of experience providing compassionate, patient-centered care. Specializing in internal medicine and cardiology with a focus on preventive healthcare.</p>',
      section_title: 'Medical Excellence',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Share Doctor Info',
      qr_description: 'Scan to share doctor information with family and friends'
    },
    language: {
      template_language: 'en'
    },
    thank_you: {
      message: 'Thank you for choosing Dr. Johnson for your healthcare needs. Your health is our priority.'
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
    copyright: {
      text: '© 2025 Dr. Sarah Johnson, MD. All rights reserved.'
    }
  }
};