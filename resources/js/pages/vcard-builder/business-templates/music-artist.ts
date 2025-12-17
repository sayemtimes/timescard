import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const musicArtistTemplate = {
  name: 'Music Artist',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Artist/Band Name' },
        { name: 'tagline', type: 'textarea', label: 'Tagline' },
        { name: 'logo', type: 'file', label: 'Logo/Photo' },
        { name: 'cover_image', type: 'file', label: 'Cover Image' },
        { name: 'cta_text', type: 'text', label: 'Call to Action Text' },
        { name: 'cta_url', type: 'url', label: 'Call to Action URL' }
      ],
      required: true
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'Bio' },
        { name: 'genre', type: 'text', label: 'Music Genre' },
        { name: 'origin', type: 'text', label: 'Origin/Location' },
        { name: 'formed_year', type: 'number', label: 'Year Formed/Started' }
      ],
      required: false
    },
    {
      key: 'music',
      name: 'Music',
      fields: [
        {
          name: 'tracks',
          type: 'repeater',
          label: 'Featured Tracks',
          fields: [
            { name: 'title', type: 'text', label: 'Track Title' },
            { name: 'album', type: 'text', label: 'Album' },
            { name: 'year', type: 'number', label: 'Release Year' },
            { name: 'embed_url', type: 'textarea', label: 'Embed URL (Spotify, SoundCloud, etc.)' },
            { name: 'stream_url', type: 'url', label: 'Stream URL' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'videos',
      name: 'Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Music Videos',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'embed_url', type: 'textarea', label: 'Embed URL (YouTube, Vimeo, etc.)' },
            { name: 'thumbnail', type: 'file', label: 'Thumbnail Image' }
          ]
        }
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
          label: 'Services',
          fields: [
            { name: 'name', type: 'text', label: 'Service Name' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'price', type: 'text', label: 'Price (if applicable)' },
            { name: 'icon', type: 'select', label: 'Icon', options: [
              { value: 'music', label: 'Music' },
              { value: 'mic', label: 'Microphone' },
              { value: 'headphones', label: 'Headphones' },
              { value: 'radio', label: 'Radio' },
              { value: 'disc', label: 'Disc' },
              { value: 'guitar', label: 'Guitar' },
              { value: 'piano', label: 'Piano' },
              { value: 'drum', label: 'Drum' }
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
        { name: 'booking_email', type: 'email', label: 'Booking Email' }
      ],
      required: true
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
      key: 'tour_dates',
      name: 'Tour Dates',
      fields: [
        {
          name: 'events',
          type: 'repeater',
          label: 'Upcoming Shows',
          fields: [
            { name: 'date', type: 'date', label: 'Date' },
            { name: 'venue', type: 'text', label: 'Venue' },
            { name: 'city', type: 'text', label: 'City' },
            { name: 'country', type: 'text', label: 'Country' },
            { name: 'ticket_url', type: 'url', label: 'Ticket URL' },
            { name: 'sold_out', type: 'checkbox', label: 'Sold Out' }
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
          label: 'Availability Hours',
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
            { name: 'is_closed', type: 'checkbox', label: 'Unavailable' }
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
          label: 'Reviews & Press',
          fields: [
            { name: 'reviewer_name', type: 'text', label: 'Reviewer/Publication Name' },
            { name: 'review', type: 'textarea', label: 'Review Text' },
            { name: 'source', type: 'text', label: 'Source' },
            { name: 'source_url', type: 'url', label: 'Source URL' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'appointments',
      name: 'Booking',
      fields: [
        { name: 'booking_url', type: 'url', label: 'Booking URL' },
        { name: 'booking_text', type: 'text', label: 'Booking Button Text' },
        { name: 'booking_email', type: 'email', label: 'Booking Email' },
        { name: 'booking_description', type: 'textarea', label: 'Booking Information' }
      ],
      required: false
    },
    {
      key: 'band_members',
      name: 'Band Members',
      fields: [
        {
          name: 'members',
          type: 'repeater',
          label: 'Members',
          fields: [
            { name: 'name', type: 'text', label: 'Name' },
            { name: 'role', type: 'text', label: 'Role/Instrument' },
            { name: 'bio', type: 'textarea', label: 'Bio' },
            { name: 'image', type: 'file', label: 'Photo' },
            { name: 'instagram', type: 'url', label: 'Instagram URL' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'merchandise',
      name: 'Merchandise',
      fields: [
        {
          name: 'items',
          type: 'repeater',
          label: 'Merch Items',
          fields: [
            { name: 'name', type: 'text', label: 'Item Name' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'price', type: 'text', label: 'Price' },
            { name: 'image', type: 'file', label: 'Item Image' },
            { name: 'store_url', type: 'url', label: 'Store URL' }
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
    { name: 'Rock Vibe', primary: '#E91E63', secondary: '#FF4081', accent: '#311B92', background: '#121212', text: '#FFFFFF' },
    { name: 'Indie Folk', primary: '#795548', secondary: '#A1887F', accent: '#EFEBE9', background: '#FFFFFF', text: '#3E2723' },
    { name: 'Electronic', primary: '#00BCD4', secondary: '#4DD0E1', accent: '#006064', background: '#121212', text: '#FFFFFF' },
    { name: 'Hip Hop', primary: '#FFC107', secondary: '#FFCA28', accent: '#212121', background: '#000000', text: '#FFFFFF' },
    { name: 'Classical', primary: '#3F51B5', secondary: '#5C6BC0', accent: '#E8EAF6', background: '#FFFFFF', text: '#1A237E' },
    { name: 'Jazz', primary: '#673AB7', secondary: '#7E57C2', accent: '#EDE7F6', background: '#121212', text: '#FFFFFF' }
  ],
  fontOptions: [
    { name: 'Montserrat', value: 'Montserrat, sans-serif', weight: '300,400,500,600,700,800' },
    { name: 'Playfair Display', value: 'Playfair Display, serif', weight: '400,500,600,700' },
    { name: 'Oswald', value: 'Oswald, sans-serif', weight: '300,400,500,600,700' },
    { name: 'Abril Fatface', value: 'Abril Fatface, cursive', weight: '400' },
    { name: 'Permanent Marker', value: 'Permanent Marker, cursive', weight: '400' }
  ],
  defaultColors: {
    primary: '#E91E63',
    secondary: '#FF4081',
    accent: '#311B92',
    background: '#121212',
    text: '#FFFFFF',
    cardBg: '#1E1E1E',
    borderColor: '#333333',
    buttonText: '#FFFFFF',
    highlightColor: '#FFC107'
  },
  defaultFont: 'Montserrat, sans-serif',
  themeStyle: {
    layout: 'music-artist-layout',
    headerStyle: 'fullscreen',
    cardStyle: 'sharp',
    buttonStyle: 'rounded',
    iconStyle: 'bold',
    spacing: 'comfortable',
    shadows: 'strong',
    dividers: true
  },
  defaultData: {
    header: {
      name: 'Sonic Wave',
      tagline: 'Alternative Rock Band from Los Angeles',
      logo: '',
      cover_image: '',
      cta_text: 'Listen Now',
      cta_url: '#music'
    },
    about: {
      description: 'Sonic Wave is an alternative rock band known for their energetic performances and thought-provoking lyrics. Formed in 2018, the band has quickly risen in the indie music scene with their unique blend of rock, electronic, and punk influences.',
      genre: 'Alternative Rock',
      origin: 'Los Angeles, CA',
      formed_year: '2018'
    },
    music: {
      tracks: [
        { title: 'Midnight Echo', album: 'Neon Dreams', year: '2023', embed_url: '', stream_url: '#' },
        { title: 'Electric Pulse', album: 'Neon Dreams', year: '2023', embed_url: '', stream_url: '#' },
        { title: 'Fading Memories', album: 'First Light', year: '2021', embed_url: '', stream_url: '#' },
        { title: 'Daybreak', album: 'First Light', year: '2021', embed_url: '', stream_url: '#' }
      ]
    },
    videos: {
      video_list: [
        { title: 'Midnight Echo - Official Music Video', description: 'Directed by Alex Johnson', embed_url: '', thumbnail: '' },
        { title: 'Live at Sunset Festival', description: 'Full performance from Summer 2023', embed_url: '', thumbnail: '' }
      ]
    },
    services: {
      offerings: [
        { name: 'Live Performances', description: 'Book Sonic Wave for your venue or private event', price: 'Contact for pricing', icon: 'mic' },
        { name: 'Studio Sessions', description: 'Hire band members for studio recording sessions', price: 'Starting at $500', icon: 'headphones' },
        { name: 'Songwriting', description: 'Collaborative songwriting and production', price: 'Custom quotes', icon: 'music' }
      ]
    },
    contact: {
      email: 'info@sonicwaveband.com',
      phone: '(555) 123-4567',
      website: 'https://www.sonicwaveband.com',
      address: 'Los Angeles, CA',
      booking_email: 'booking@sonicwaveband.com'
    },
    social: {
      social_links: [
        { platform: 'spotify', url: 'https://open.spotify.com/artist/sonicwave', username: 'Sonic Wave' },
        { platform: 'instagram', url: 'https://instagram.com/sonicwave', username: '@sonicwave' },
        { platform: 'youtube', url: 'https://youtube.com/sonicwave', username: 'Sonic Wave Official' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/sonicwave',
      channel_name: 'Sonic Wave Official',
      subscriber_count: '234K',
      featured_playlist: 'https://youtube.com/playlist?list=PLmusicvideos',
      latest_video_embed: '',
      channel_description: 'Official music videos, live performances, and behind-the-scenes content from alternative rock band Sonic Wave. Subscribe for new releases!'
    },
    tour_dates: {
      events: [
        { date: '2025-06-15', venue: 'The Echo', city: 'Los Angeles', country: 'USA', ticket_url: '#', sold_out: false },
        { date: '2025-06-22', venue: 'Bottom of the Hill', city: 'San Francisco', country: 'USA', ticket_url: '#', sold_out: false },
        { date: '2025-07-05', venue: 'Mercury Lounge', city: 'New York', country: 'USA', ticket_url: '#', sold_out: false }
      ]
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '10:00', close_time: '18:00', is_closed: false },
        { day: 'tuesday', open_time: '10:00', close_time: '18:00', is_closed: false },
        { day: 'wednesday', open_time: '10:00', close_time: '18:00', is_closed: false },
        { day: 'thursday', open_time: '10:00', close_time: '18:00', is_closed: false },
        { day: 'friday', open_time: '10:00', close_time: '16:00', is_closed: false },
        { day: 'saturday', open_time: '00:00', close_time: '00:00', is_closed: true },
        { day: 'sunday', open_time: '00:00', close_time: '00:00', is_closed: true }
      ]
    },
    gallery: {
      photos: [
        { image: '', caption: 'Live at Sunset Festival 2023' },
        { image: '', caption: 'Behind the scenes at our music video shoot' },
        { image: '', caption: 'Studio session for Neon Dreams album' },
        { image: '', caption: 'Backstage at The Echo' }
      ]
    },
    testimonials: {
      reviews: [
        { reviewer_name: 'Rolling Stone', review: '"One of the most promising new acts in the alternative rock scene. Their energy is infectious and their sound is refreshingly authentic."', source: 'Album Review', source_url: '#' },
        { reviewer_name: 'Pitchfork', review: '"Sonic Wave delivers a powerful sonic experience that blends nostalgic rock elements with modern production techniques."', source: 'Concert Review', source_url: '#' },
        { reviewer_name: 'LA Weekly', review: '"Their live performances are not to be missed - a true showcase of raw talent and musical chemistry."', source: 'Feature Article', source_url: '#' }
      ]
    },
    appointments: {
      booking_url: 'https://booking.sonicwaveband.com',
      booking_text: 'Book Us',
      booking_email: 'booking@sonicwaveband.com',
      booking_description: 'Interested in booking Sonic Wave for your venue, festival, or private event? Fill out our booking form or contact our management team directly.'
    },
    band_members: {
      members: [
        { name: 'Alex Rivera', role: 'Lead Vocals, Guitar', bio: 'Founding member with a background in classical guitar and a passion for storytelling through music.', image: '', instagram: 'https://instagram.com/alexrivera' },
        { name: 'Jamie Wong', role: 'Bass, Backing Vocals', bio: 'Brings the groove with influences ranging from funk to post-punk. Jamie joined the band in 2019.', image: '', instagram: 'https://instagram.com/jamiewong' },
        { name: 'Taylor Smith', role: 'Drums', bio: 'The rhythmic foundation of Sonic Wave with a jazz background and energetic performance style.', image: '', instagram: 'https://instagram.com/taylorsmith' },
        { name: 'Morgan Lee', role: 'Keyboards, Synth', bio: 'Electronic music producer turned band member who adds atmospheric textures to the band\'s sound.', image: '', instagram: 'https://instagram.com/morganlee' }
      ]
    },
    merchandise: {
      items: [
        { name: 'Neon Dreams Vinyl', description: 'Limited edition 180g vinyl with exclusive artwork', price: '$25.00', image: '', store_url: '#' },
        { name: 'Tour T-Shirt', description: 'Black cotton tee with 2025 tour dates', price: '$20.00', image: '', store_url: '#' },
        { name: 'Logo Hoodie', description: 'Premium pullover hoodie with embroidered logo', price: '$45.00', image: '', store_url: '#' }
      ]
    },
    google_map: {
      map_embed_url: '',
      directions_url: 'https://maps.google.com/directions'
    },
    app_download: {
      app_store_url: '#',
      play_store_url: '#',
      app_description: 'Get exclusive content, early access to tickets, and connect with other fans through our official mobile app.'
    },
    contact_form: {
      form_title: 'Get in Touch',
      form_description: 'Questions, collaboration requests, or just want to say hello? Send us a message and we\'ll get back to you.'
    },
    thank_you: {
      message: 'Thanks for connecting with Sonic Wave! We appreciate your support and will respond to your message soon.'
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
      html_content: '<div class="music-achievements"><h4>Music Achievements</h4><p>🏆 Best Alternative Rock Album 2023</p><p>🎤 100+ Live Performances</p><p>💿 500K+ Streams on Spotify</p><p>🎵 Featured on Major Playlists</p></div>',
      section_title: 'Awards & Recognition',
      show_title: true
    },
    qr_share: {
      enable_qr: true,
      qr_title: 'Connect with Sonic Wave',
      qr_description: 'Scan to follow us on all platforms and never miss a beat!',
      qr_size: 'medium'
    },
    language: {
      template_language: 'en'
    },
    footer: {
      show_footer: true,
      footer_text: 'Follow us on all platforms and never miss a beat! Connect with Sonic Wave for the latest music, tour dates, and exclusive content.',
      footer_links: [
        { title: 'Stream Music', url: '#music' },
        { title: 'Tour Dates', url: '#tour' },
        { title: 'Merchandise', url: '#merch' },
        { title: 'Book Us', url: '#booking' }
      ]
    },
    copyright: {
      text: '© 2025 Sonic Wave. All rights reserved.'
    }
  }
};