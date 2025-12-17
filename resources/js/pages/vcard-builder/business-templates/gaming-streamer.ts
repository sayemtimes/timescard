import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const gamingStreamerTemplate = {
  name: 'Gaming Streamer & Esports',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Gamer Tag' },
        { name: 'title', type: 'text', label: 'Gaming Title' },
        { name: 'tagline', type: 'textarea', label: 'Stream Tagline' },
        { name: 'profile_image', type: 'file', label: 'Avatar/Photo' },
        { name: 'status_text', type: 'text', label: 'Stream Status (e.g., LIVE, OFFLINE, STREAMING)' }
      ],
      required: true
    },
    {
      key: 'contact',
      name: 'Contact Information',
      fields: [
        { name: 'email', type: 'email', label: 'Business Email' },
        { name: 'phone', type: 'tel', label: 'Phone Number' },
        { name: 'website', type: 'url', label: 'Gaming Website' },
        { name: 'location', type: 'text', label: 'Location/Region' }
      ],
      required: true
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'Gamer Bio' },
        { name: 'games', type: 'tags', label: 'Main Games' },
        { name: 'experience', type: 'number', label: 'Years Gaming' },
        { name: 'achievements', type: 'textarea', label: 'Gaming Achievements' }
      ],
      required: false
    },
    {
      key: 'streaming',
      name: 'Streaming Info',
      fields: [
        {
          name: 'stream_details',
          type: 'repeater',
          label: 'Streaming Platforms',
          fields: [
            { name: 'platform', type: 'select', label: 'Platform', options: socialPlatformsConfig.map(p => ({ value: p.value, label: p.label })) },
            { name: 'username', type: 'text', label: 'Username' },
            { name: 'followers', type: 'text', label: 'Follower Count' },
            { name: 'stream_url', type: 'url', label: 'Stream URL' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'schedule',
      name: 'Stream Schedule',
      fields: [
        {
          name: 'stream_schedule',
          type: 'repeater',
          label: 'Weekly Schedule',
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
            { name: 'game', type: 'text', label: 'Game/Content' },
            { name: 'start_time', type: 'time', label: 'Start Time' },
            { name: 'duration', type: 'text', label: 'Duration' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'videos',
      name: 'Gaming Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Gaming Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Content Type', options: [
              { value: 'gameplay_highlight', label: 'Gameplay Highlight' },
              { value: 'tutorial_guide', label: 'Tutorial/Guide' },
              { value: 'stream_highlight', label: 'Stream Highlight' },
              { value: 'montage', label: 'Montage/Compilation' },
              { value: 'review', label: 'Game Review' },
              { value: 'esports_match', label: 'Esports Match' },
              { value: 'reaction', label: 'Reaction Video' },
              { value: 'behind_scenes', label: 'Behind the Scenes' }
            ]},
            { name: 'embed_url', type: 'textarea', label: 'Video Embed URL' },
            { name: 'thumbnail', type: 'file', label: 'Video Thumbnail' },
            { name: 'duration', type: 'text', label: 'Duration' },
            { name: 'game_title', type: 'text', label: 'Game Featured' },
            { name: 'view_count', type: 'text', label: 'View Count' }
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
      key: 'social',
      name: 'Social Media',
      fields: [
        {
          name: 'social_links',
          type: 'repeater',
          label: 'Gaming Platforms',
          fields: [
            { name: 'platform', type: 'select', label: 'Platform', options: [
              { value: 'twitch', label: 'Twitch' },
              { value: 'youtube', label: 'YouTube' },
              { value: 'twitter', label: 'Twitter' },
              { value: 'instagram', label: 'Instagram' },
              { value: 'tiktok', label: 'TikTok' },
              { value: 'discord', label: 'Discord' },
              { value: 'steam', label: 'Steam' },
              { value: 'xbox', label: 'Xbox Live' },
              { value: 'playstation', label: 'PlayStation' }
            ]},
            { name: 'url', type: 'url', label: 'Profile URL' },
            { name: 'username', type: 'text', label: 'Gamer Tag' }
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
            { name: 'is_closed', type: 'checkbox', label: 'Offline' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'appointments',
      name: 'Appointments',
      fields: [
        { name: 'booking_url', type: 'url', label: 'Collaboration Booking' },
        { name: 'calendar_link', type: 'url', label: 'Calendar Link' },
        { name: 'collab_info', type: 'textarea', label: 'Collaboration Info' }
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
          label: 'Community Reviews',
          fields: [
            { name: 'client_name', type: 'text', label: 'Viewer/Fan Name' },
            { name: 'review', type: 'textarea', label: 'Review Text' },
            { name: 'rating', type: 'number', label: 'Rating (1-5)' },
            { name: 'platform', type: 'text', label: 'Platform' }
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
    { name: 'Neon Gaming', primary: '#00FF41', secondary: '#FF0080', accent: '#00D9FF', background: '#0A0A0A', text: '#FFFFFF', cardBg: '#1A1A1A' },
    { name: 'RGB Gamer', primary: '#FF6B6B', secondary: '#4ECDC4', accent: '#45B7D1', background: '#121212', text: '#F0F0F0', cardBg: '#1E1E1E' },
    { name: 'Cyber Purple', primary: '#8B5CF6', secondary: '#A78BFA', accent: '#F59E0B', background: '#0F0A19', text: '#E5E7EB', cardBg: '#1F1B2E' },
    { name: 'Electric Blue', primary: '#0EA5E9', secondary: '#38BDF8', accent: '#FBBF24', background: '#0C1222', text: '#F1F5F9', cardBg: '#1E293B' },
    { name: 'Fire Red', primary: '#EF4444', secondary: '#F87171', accent: '#34D399', background: '#1A0B0B', text: '#FEF2F2', cardBg: '#2D1B1B' }
  ],
  fontOptions: [
    { name: 'Orbitron', value: 'Orbitron, monospace', weight: '400,500,700,900' },
    { name: 'Rajdhani', value: 'Rajdhani, sans-serif', weight: '400,500,600,700' },
    { name: 'Exo 2', value: 'Exo 2, sans-serif', weight: '400,500,600,700,800' },
    { name: 'Audiowide', value: 'Audiowide, cursive', weight: '400' },
    { name: 'Electrolize', value: 'Electrolize, sans-serif', weight: '400' }
  ],
  defaultColors: {
    primary: '#00FF41',
    secondary: '#FF0080',
    accent: '#00D9FF',
    background: '#0A0A0A',
    text: '#FFFFFF',
    cardBg: '#1A1A1A',
    borderColor: '#00FF41',
    shadowColor: 'rgba(0, 255, 65, 0.5)'
  },
  defaultFont: 'Orbitron, monospace',
  themeStyle: {
    layout: 'gaming-hud',
    headerStyle: 'streamer-overlay',
    cardStyle: 'neon-panels',
    buttonStyle: 'gaming-controls',
    iconStyle: 'pixel-art',
    spacing: 'grid-based',
    shadows: 'neon-glow',
    animations: 'glitch-effects',
    backgroundPattern: 'circuit-matrix',
    typography: 'futuristic-mono'
  },
  defaultData: {
    header: {
      name: 'CyberNinja_X',
      title: 'Pro Gamer & Content Creator',
      tagline: 'Dominating the digital battlefield and entertaining the gaming community 24/7',
      profile_image: '',
      status_text: 'LIVE'
    },
    contact: {
      email: 'business@cyberninja.gg',
      phone: '+1 (555) 567-8901',
      website: 'https://cyberninja.gg',
      location: 'Los Angeles, CA'
    },
    about: {
      description: 'Professional esports player and content creator with 8+ years of competitive gaming experience. Specializing in FPS and MOBA games with a passion for entertaining and educating the gaming community.',
      games: 'Valorant, League of Legends, Apex Legends, Counter-Strike 2, Overwatch 2',
      experience: '8',
      achievements: 'Regional Champion 2023, 1M+ Twitch followers, Sponsored by top gaming brands'
    },
    streaming: {
      stream_details: [
        { platform: 'twitch', username: 'CyberNinja_X', followers: '1.2M', stream_url: 'https://twitch.tv/cyberninja_x' },
        { platform: 'youtube', username: 'CyberNinja Gaming', followers: '850K', stream_url: 'https://youtube.com/cyberninja' }
      ]
    },
    schedule: {
      stream_schedule: [
        { day: 'monday', game: 'Valorant Ranked', start_time: '19:00', duration: '4 hours' },
        { day: 'wednesday', game: 'League of Legends', start_time: '18:00', duration: '5 hours' },
        { day: 'friday', game: 'Variety Gaming', start_time: '20:00', duration: '3 hours' },
        { day: 'sunday', game: 'Community Games', start_time: '17:00', duration: '4 hours' }
      ]
    },
    videos: {
      video_list: [
        { title: 'Epic Valorant Ace Clutch', description: 'Insane 1v5 clutch in ranked match that secured our victory', video_type: 'gameplay_highlight', embed_url: '', thumbnail: '', duration: '2:45', game_title: 'Valorant', view_count: '125K' },
        { title: 'Complete Valorant Agent Guide', description: 'Master Jett with these pro tips and tricks for ranked gameplay', video_type: 'tutorial_guide', embed_url: '', thumbnail: '', duration: '15:20', game_title: 'Valorant', view_count: '89K' },
        { title: 'Best Stream Moments This Week', description: 'Compilation of the funniest and most epic moments from this week\'s streams', video_type: 'stream_highlight', embed_url: '', thumbnail: '', duration: '8:30', game_title: 'Various', view_count: '67K' }
      ]
    },
    social: {
      social_links: [
        { platform: 'twitch', url: 'https://twitch.tv/cyberninja_x', username: 'CyberNinja_X' },
        { platform: 'youtube', url: 'https://youtube.com/cyberninja', username: 'CyberNinja Gaming' },
        { platform: 'twitter', url: 'https://twitter.com/cyberninja_x', username: '@CyberNinja_X' },
        { platform: 'discord', url: 'https://discord.gg/cyberninja', username: 'CyberNinja Community' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/cyberninja_x',
      channel_name: 'CyberNinja_X Gaming',
      subscriber_count: '892K',
      featured_playlist: 'https://youtube.com/playlist?list=PLvalorantguides',
      latest_video_embed: '',
      channel_description: 'Pro gaming content, tutorials, and live stream highlights. Subscribe for daily gaming videos and esports insights!'
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '14:00', close_time: '23:00', is_closed: false },
        { day: 'tuesday', open_time: '14:00', close_time: '23:00', is_closed: false },
        { day: 'wednesday', open_time: '14:00', close_time: '23:00', is_closed: false },
        { day: 'thursday', open_time: '14:00', close_time: '23:00', is_closed: false },
        { day: 'friday', open_time: '16:00', close_time: '24:00', is_closed: false },
        { day: 'saturday', open_time: '12:00', close_time: '24:00', is_closed: false },
        { day: 'sunday', open_time: '12:00', close_time: '22:00', is_closed: false }
      ]
    },
    appointments: {
      booking_url: 'https://calendly.com/cyberninja',
      calendar_link: 'https://calendar.google.com/cyberninja',
      collab_info: 'Open to brand partnerships, gaming collaborations, and tournament participation. Minimum 48-hour notice required.'
    },
    testimonials: {
      reviews: [
        { client_name: 'GamerFan2023', review: 'Best streamer ever! Amazing gameplay and super entertaining. Never miss a stream!', rating: '5', platform: 'Twitch' },
        { client_name: 'ProGamer_Elite', review: 'Learned so much from watching CyberNinja. Improved my rank significantly thanks to the tips and strategies!', rating: '5', platform: 'YouTube' }
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
      form_title: 'Level Up Together',
      form_description: 'Ready to collaborate, sponsor, or just want to connect? Drop me a message and let\'s create some epic gaming content together!'
    },
    thank_you: {
      message: 'GG! Thanks for reaching out. I\'ll get back to you within 24 hours. Keep gaming and stay awesome!'
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
      html_content: '<div class="gaming-stats"><h4>Gaming Stats</h4><p>🏆 Tournament Wins: 15</p><p>⚡ Current Rank: Immortal</p><p>🎯 Headshot %: 78%</p></div>',
      section_title: 'Gaming Stats',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Add Me to Your Gaming Network',
      qr_description: 'Scan this QR code to instantly connect and follow my gaming journey!',
      qr_size: 'medium'
    },
    language: {
      template_language: 'en'
    },
    copyright: {
      text: '© 2025 CyberNinja_X Gaming. All rights reserved.'
    }
  }
};