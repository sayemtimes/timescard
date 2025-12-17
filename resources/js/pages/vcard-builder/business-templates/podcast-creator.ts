import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const podcastCreatorTemplate = {
  name: 'Podcast Host & Content Creator',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Host Name' },
        { name: 'title', type: 'text', label: 'Creator Title' },
        { name: 'tagline', type: 'textarea', label: 'Show Tagline' },
        { name: 'profile_image', type: 'file', label: 'Host Photo' },
        { name: 'status_text', type: 'text', label: 'Status Text (e.g., ON AIR, LIVE, RECORDING)' }
      ],
      required: true
    },
    {
      key: 'contact',
      name: 'Contact Information',
      fields: [
        { name: 'email', type: 'email', label: 'Business Email' },
        { name: 'phone', type: 'tel', label: 'Phone Number' },
        { name: 'website', type: 'url', label: 'Podcast Website' },
        { name: 'location', type: 'text', label: 'Recording Location' }
      ],
      required: true
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'Host Bio' },
        { name: 'topics', type: 'tags', label: 'Podcast Topics' },
        { name: 'experience', type: 'number', label: 'Years Creating Content' },
        { name: 'mission', type: 'textarea', label: 'Content Mission' }
      ],
      required: false
    },
    {
      key: 'shows',
      name: 'Shows & Content',
      fields: [
        {
          name: 'show_list',
          type: 'repeater',
          label: 'Podcast Shows',
          fields: [
            { name: 'title', type: 'text', label: 'Show Title' },
            { name: 'description', type: 'textarea', label: 'Show Description' },
            { name: 'frequency', type: 'select', label: 'Release Schedule', options: [
              { value: 'daily', label: 'Daily' },
              { value: 'weekly', label: 'Weekly' },
              { value: 'biweekly', label: 'Bi-weekly' },
              { value: 'monthly', label: 'Monthly' },
              { value: 'seasonal', label: 'Seasonal' }
            ]},
            { name: 'platform_links', type: 'textarea', label: 'Platform Links' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'videos',
      name: 'Video Content',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Video Podcasts & Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'video_podcast', label: 'Video Podcast Episode' },
              { value: 'behind_scenes', label: 'Behind the Scenes' },
              { value: 'interview_highlight', label: 'Interview Highlight' },
              { value: 'podcast_tips', label: 'Podcasting Tips' },
              { value: 'studio_tour', label: 'Studio Tour' },
              { value: 'guest_intro', label: 'Guest Introduction' }
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
      key: 'episodes',
      name: 'Latest Episodes',
      fields: [
        {
          name: 'episode_list',
          type: 'repeater',
          label: 'Recent Episodes',
          fields: [
            { name: 'title', type: 'text', label: 'Episode Title' },
            { name: 'guest', type: 'text', label: 'Guest Name' },
            { name: 'description', type: 'textarea', label: 'Episode Description' },
            { name: 'duration', type: 'text', label: 'Duration' },
            { name: 'listen_url', type: 'url', label: 'Listen URL' }
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
          label: 'Content Platforms',
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
          label: 'Recording Schedule',
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
        { name: 'booking_url', type: 'url', label: 'Guest Booking URL' },
        { name: 'calendar_link', type: 'url', label: 'Calendar Link' },
        { name: 'guest_requirements', type: 'textarea', label: 'Guest Requirements' }
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
          label: 'Listener Reviews',
          fields: [
            { name: 'client_name', type: 'text', label: 'Reviewer Name' },
            { name: 'review', type: 'textarea', label: 'Review Text' },
            { name: 'rating', type: 'number', label: 'Rating (1-5)' },
            { name: 'platform', type: 'text', label: 'Review Platform' }
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
    { name: 'Podcast Purple', primary: '#8B5CF6', secondary: '#A78BFA', accent: '#F59E0B', background: '#1F1B24', text: '#F3F4F6', cardBg: '#2D2438' },
    { name: 'Audio Orange', primary: '#F97316', secondary: '#FB923C', accent: '#EAB308', background: '#0F0A19', text: '#FBBF24', cardBg: '#1C1917' },
    { name: 'Sound Wave Blue', primary: '#0EA5E9', secondary: '#38BDF8', accent: '#06B6D4', background: '#0C1222', text: '#E0F2FE', cardBg: '#1E293B' },
    { name: 'Mic Drop Red', primary: '#EF4444', secondary: '#F87171', accent: '#FBBF24', background: '#1A0B0B', text: '#FEF2F2', cardBg: '#2D1B1B' },
    { name: 'Creator Green', primary: '#10B981', secondary: '#34D399', accent: '#F59E0B', background: '#0A1A0A', text: '#ECFDF5', cardBg: '#1F2937' }
  ],
  fontOptions: [
    { name: 'Inter', value: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700,800' },
    { name: 'Roboto', value: 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,700,900' },
    { name: 'Poppins', value: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700,800' },
    { name: 'Nunito', value: 'Nunito, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,600,700,800' },
    { name: 'Work Sans', value: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' }
  ],
  defaultColors: {
    primary: '#8B5CF6',
    secondary: '#A78BFA',
    accent: '#F59E0B',
    background: '#1F1B24',
    text: '#F3F4F6',
    cardBg: '#2D2438',
    borderColor: '#4C1D95',
    shadowColor: 'rgba(139, 92, 246, 0.3)'
  },
  defaultFont: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  themeStyle: {
    layout: 'audio-waveform',
    headerStyle: 'podcast-studio',
    cardStyle: 'sound-cards',
    buttonStyle: 'audio-controls',
    iconStyle: 'broadcast',
    spacing: 'rhythm-based',
    shadows: 'audio-glow',
    animations: 'sound-wave',
    backgroundPattern: 'equalizer-bars',
    typography: 'broadcast-ready'
  },
  defaultData: {
    header: {
      name: 'Jordan Rivers',
      title: 'Podcast Host & Content Creator',
      tagline: 'Amplifying voices, sharing stories, and creating conversations that matter',
      profile_image: '',
      status_text: 'ON AIR'
    },
    contact: {
      email: 'hello@jordanrivers.audio',
      phone: '+1 (555) 456-7890',
      website: 'https://jordanrivers.audio',
      location: 'Austin, TX'
    },
    about: {
      description: 'Passionate storyteller and podcast host with 6+ years of experience creating engaging audio content. I specialize in interviewing thought leaders and exploring topics that inspire positive change.',
      topics: 'Technology, Entrepreneurship, Personal Growth, Innovation, Storytelling',
      experience: '6',
      mission: 'To create meaningful conversations that inspire, educate, and connect people from all walks of life.'
    },
    shows: {
      show_list: [
        { title: 'The Innovation Hour', description: 'Weekly deep dives into cutting-edge technology and the minds behind breakthrough innovations', frequency: 'weekly', platform_links: 'Spotify, Apple Podcasts, YouTube' },
        { title: 'Founder Stories', description: 'Intimate conversations with entrepreneurs about their journey from idea to success', frequency: 'biweekly', platform_links: 'All major platforms' }
      ]
    },
    videos: {
      video_list: [
        { title: 'The Future of AI - Full Video Episode', description: 'Complete video version of our AI discussion with Dr. Sarah Chen', video_type: 'video_podcast', embed_url: '', thumbnail: '', duration: '45:30' },
        { title: 'Behind the Scenes - Studio Setup Tour', description: 'Take a look at the podcast studio and recording equipment', video_type: 'studio_tour', embed_url: '', thumbnail: '', duration: '8:15' },
        { title: 'How to Start Your Own Podcast', description: 'Essential tips for aspiring podcasters from equipment to content', video_type: 'podcast_tips', embed_url: '', thumbnail: '', duration: '12:45' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/jordanrivers',
      channel_name: 'Jordan Rivers',
      subscriber_count: '124K',
      featured_playlist: 'https://youtube.com/playlist?list=PLpodcastepisodes',
      latest_video_embed: '',
      channel_description: 'Video podcasts, interview highlights, and behind-the-scenes content from The Innovation Hour. Subscribe for weekly video episodes and exclusive content!'
    },
    episodes: {
      episode_list: [
        { title: 'The Future of AI with Dr. Sarah Chen', guest: 'Dr. Sarah Chen', description: 'Exploring the ethical implications and exciting possibilities of artificial intelligence', duration: '45 min', listen_url: 'https://spotify.com/episode1' },
        { title: 'Building a Billion Dollar Startup', guest: 'Marcus Johnson', description: 'From garage to IPO - the incredible journey of a tech entrepreneur', duration: '52 min', listen_url: 'https://spotify.com/episode2' }
      ]
    },
    social: {
      social_links: [
        { platform: 'spotify', url: 'https://spotify.com/jordanrivers', username: 'Jordan Rivers' },
        { platform: 'apple-podcasts', url: 'https://podcasts.apple.com/jordanrivers', username: 'Jordan Rivers' },
        { platform: 'youtube', url: 'https://youtube.com/jordanrivers', username: '@jordanrivers' },
        { platform: 'instagram', url: 'https://instagram.com/jordanrivers.audio', username: '@jordanrivers.audio' }
      ]
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '09:00', close_time: '17:00', is_closed: false },
        { day: 'tuesday', open_time: '09:00', close_time: '17:00', is_closed: false },
        { day: 'wednesday', open_time: '09:00', close_time: '17:00', is_closed: false },
        { day: 'thursday', open_time: '09:00', close_time: '17:00', is_closed: false },
        { day: 'friday', open_time: '09:00', close_time: '15:00', is_closed: false },
        { day: 'saturday', open_time: '', close_time: '', is_closed: true },
        { day: 'sunday', open_time: '', close_time: '', is_closed: true }
      ]
    },
    appointments: {
      booking_url: 'https://calendly.com/jordanrivers',
      calendar_link: 'https://calendar.google.com/jordanrivers',
      guest_requirements: 'Please prepare 3-5 talking points and ensure you have a quiet recording environment with good audio quality.'
    },
    testimonials: {
      reviews: [
        { client_name: 'Alex Thompson', review: 'Jordan is an incredible interviewer who makes guests feel comfortable while asking thought-provoking questions. The production quality is top-notch!', rating: '5', platform: 'Apple Podcasts' },
        { client_name: 'Maria Garcia', review: 'The Innovation Hour has become my go-to podcast for staying updated on tech trends. Jordan\'s insights are always valuable.', rating: '5', platform: 'Spotify' }
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
      form_title: 'Be a Guest on the Show',
      form_description: 'Have an interesting story to share? Want to discuss your expertise on the podcast? Let\'s connect and explore collaboration opportunities.'
    },
    thank_you: {
      message: 'Thanks for reaching out! I\'ll review your message and get back to you within 48 hours. Looking forward to potentially having you on the show!'
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
      html_content: '<div class="custom-section"><h4>Featured Content</h4><p>Check out my latest podcast episodes and exclusive content.</p></div>',
      section_title: 'Featured Content',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Share My Podcast',
      qr_description: 'Scan this QR code to access my podcast and contact information directly on your phone.',
      qr_size: 'medium'
    },
    language: {
      template_language: 'en'
    },
    copyright: {
      text: '© 2025 Jordan Rivers Audio. All rights reserved.'
    }
  }
};