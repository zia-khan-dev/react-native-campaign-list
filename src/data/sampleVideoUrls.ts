/**
 * Small, publicly reachable MP4s (no hotlink 403 like many `storage.googleapis.com` buckets on mobile).
 * Replace with your CDN in production.
 */
export const SAMPLE_MP4 = {
  w3schoolsBbb: 'https://www.w3schools.com/html/mov_bbb.mp4',
  mdnFlower: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  filesamples640: 'https://filesamples.com/samples/video/mp4/sample_640x360.mp4',
} as const;
