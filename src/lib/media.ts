export const media = {
  /** Intro video for the hero (public/videos/ashish-intro.mp4, 1920×1080 web-optimized). */
  heroVideo: "/videos/ashish-intro.mp4",
  /** Lighter 720p file served on phones — leave empty to reuse heroVideo. */
  heroVideoMobile: "/videos/ashish-intro-720.mp4",
  /**
   * Poster frame shown before the video loads (public/videos/ashish-intro-poster.jpg).
   * Exported from the real video at 3s — full 16:9 frame, nothing cropped.
   */
  heroVideoPoster: "/videos/ashish-intro-poster.jpg",
  /** 30–60 second intro video for the About section. */
  aboutVideo: "",
  /** Demo video per project, keyed by the project title (shown in its case study). */
  projectVideos: {} as Record<string, string>,
};
