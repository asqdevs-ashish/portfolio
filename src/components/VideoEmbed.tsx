/**
 * Renders a video in the site's visual language. Returns null when `src` is
 * empty — so video slots are invisible until a URL is added in src/lib/media.ts.
 */
export function VideoEmbed({
  src,
  className = "",
}: {
  src?: string;
  className?: string;
}) {
  if (!src) return null;

  const isMp4 = src.startsWith("/") || /\.(mp4|webm)(\?|$)/i.test(src);

  let embedUrl = "";
  if (!isMp4) {
    // YouTube: watch, youtu.be or shorts links -> embed id
    const ytMatch = src.match(
      /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/,
    );
    if (ytMatch) {
      embedUrl = `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`;
    } else {
      // Vimeo: numeric id
      const vimeoMatch = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
      if (vimeoMatch) {
        embedUrl = `https://player.vimeo.com/video/${vimeoMatch[1]}`;
      }
    }
  }

  return (
    <div className={className}>
      {isMp4 ? (
        <video
          src={src}
          controls
          playsInline
          preload="metadata"
          className="aspect-video w-full rounded-xl border border-border-strong bg-surface"
        />
      ) : embedUrl ? (
        <div className="aspect-video w-full overflow-hidden rounded-xl border border-border-strong bg-surface">
          <iframe
            src={embedUrl}
            title="Project video"
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : null}
    </div>
  );
}