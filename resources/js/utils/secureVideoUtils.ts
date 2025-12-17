import DOMPurify from 'dompurify';

export const sanitizeVideoData = (video: any) => {
  if (!video) return null;
  
  return {
    title: DOMPurify.sanitize(video.title || ''),
    description: DOMPurify.sanitize(video.description || ''),
    duration: DOMPurify.sanitize(video.duration || ''),
    thumbnail: video.thumbnail ? DOMPurify.sanitize(video.thumbnail) : null,
    embed_url: video.embed_url ? DOMPurify.sanitize(video.embed_url) : null,
    video_url: video.video_url ? DOMPurify.sanitize(video.video_url) : null,
    // Template-specific fields
    topic: DOMPurify.sanitize(video.topic || ''),
    video_type: DOMPurify.sanitize(video.video_type || ''),
    marketing_channel: DOMPurify.sanitize(video.marketing_channel || ''),
    technique: DOMPurify.sanitize(video.technique || ''),
    project_type: DOMPurify.sanitize(video.project_type || ''),
    service_type: DOMPurify.sanitize(video.service_type || ''),
    recipe_type: DOMPurify.sanitize(video.recipe_type || '')
  };
};

export const sanitizePath = (path: string): string => {
  if (!path) return '';
  // Remove path traversal sequences
  return path.replace(/\.\./g, '').replace(/[\/\\]/g, '');
};