"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import {
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
} from "lucide-react";

const SKIP_SECONDS = 3;

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** Small round control with a tooltip; sized up on touch devices. */
function CtrlButton({
  label,
  title,
  onClick,
  children,
  pressed,
}: {
  label: string;
  title: string;
  onClick: () => void;
  children: ReactNode;
  pressed?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={pressed}
      title={title}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-foreground/90 transition-colors hover:bg-white/10 hover:text-foreground md:h-9 md:w-9"
    >
      {children}
    </button>
  );
}

/** Circular skip icon with the "3" set into the middle, YouTube-style. */
function SkipIcon({ dir }: { dir: "back" | "forward" }) {
  const Icon = dir === "back" ? RotateCcw : RotateCw;
  return (
    <span
      aria-hidden
      className="relative flex h-4 w-4 items-center justify-center"
    >
      <Icon size={16} />
      <span className="absolute inset-0 flex items-center justify-center text-[8px] font-semibold leading-none">
        3
      </span>
    </span>
  );
}

export function HeroVideo({
  src,
  mobileSrc = "",
  poster,
  caption,
}: {
  src: string;
  mobileSrc?: string;
  poster?: string;
  /** Optional visible caption rendered under the frame. */
  caption?: ReactNode;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [blockedAudible, setBlockedAudible] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferedPct, setBufferedPct] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenSupported, setFullscreenSupported] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const dragRef = useRef(false);
  const wasAutoRef = useRef(false);
  const userPausedRef = useRef(false);
  const reducedRef = useRef(false);

  /* ------------------------- environment preferences ------------------------ */

  // Track reduced-motion and coarse pointers live (mirrored into refs so
  // mount-only effects never read a stale value).
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const touch = window.matchMedia("(hover: none) and (pointer: coarse)");
    const update = () => {
      reducedRef.current = motion.matches;
      setIsTouch(touch.matches);
    };
    update();
    motion.addEventListener("change", update);
    touch.addEventListener("change", update);
    return () => {
      motion.removeEventListener("change", update);
      touch.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    setFullscreenSupported(Boolean(document.fullscreenEnabled));
    const onFsChange = () =>
      setIsFullscreen(document.fullscreenElement === shellRef.current);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  /* --------------------- autoplay with sound, then muted -------------------- */

  // Runs once on mount. Tries audible playback first; only if the browser
  // rejects it does the video start muted (with the "Unmute" pill). Nothing
  // here ever removes or permanently disables the original audio track.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedRef.current) return;
    let cancelled = false;

    const attempt = async () => {
      // 1) Attempt autoplay with audio enabled.
      try {
        video.muted = false;
        await video.play();
        if (!cancelled) {
          setIsMuted(false);
          setBlockedAudible(false);
        }
        return;
      } catch {
        /* audible autoplay blocked by the browser */
      }
      // 2) Graceful fallback: start muted so the video still plays.
      try {
        video.muted = true;
        await video.play();
        if (!cancelled) {
          setIsMuted(true);
          setBlockedAudible(true);
        }
      } catch {
        /* even muted autoplay is blocked — stay on the poster; the user can
           press play, and their gesture will allow audio */
      }
    };

    attempt();
    return () => {
      cancelled = true;
    };
  }, []);

  /* -------------- pause out of view, resume unless user paused -------------- */

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (
            wasAutoRef.current &&
            !userPausedRef.current &&
            video.paused &&
            !video.ended
          ) {
            video.play().catch(() => {});
          }
        } else if (!video.paused) {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  /* ------------------------------ media actions ----------------------------- */

  /**
   * Trustworthy duration for this element. Prefers `video.duration`, but
   * reconciles it against the seekable range — if the browser only has an
   * estimate (partial data), the seekable end is what seeking actually
   * honors, so that is the number we display and use.
   */
  const usableDuration = useCallback(() => {
    const video = videoRef.current;
    if (!video) return 0;
    const seekableEnd =
      video.seekable.length > 0
        ? video.seekable.end(video.seekable.length - 1)
        : 0;
    const d = video.duration;
    if (Number.isFinite(d) && d > 0) {
      if (
        Number.isFinite(seekableEnd) &&
        seekableEnd > 0 &&
        Math.abs(seekableEnd - d) > 0.5
      )
        return seekableEnd;
      return d;
    }
    return Number.isFinite(seekableEnd) && seekableEnd > 0 ? seekableEnd : 0;
  }, []);

  const play = useCallback((userInitiated = false) => {
    const video = videoRef.current;
    if (!video) return;
    if (video.ended) video.currentTime = 0;
    if (userInitiated) userPausedRef.current = false;
    video.play().catch(() => {});
  }, []);

  const pause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    userPausedRef.current = true;
    video.pause();
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused || video.ended) play(true);
    else pause();
  }, [play, pause]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setIsMuted(next);
    // Unmuting always happens inside a user gesture, so audio is permitted.
    if (!next) setBlockedAudible(false);
  }, []);

  const seekTo = useCallback(
    (time: number) => {
      const video = videoRef.current;
      if (!video) return;
      const d = usableDuration();
      if (d <= 0) return;
      video.currentTime = Math.min(d, Math.max(0, time));
      setCurrentTime(video.currentTime);
    },
    [usableDuration],
  );

  const skip = useCallback(
    (delta: number) => {
      const video = videoRef.current;
      if (!video) return;
      seekTo(video.currentTime + delta);
    },
    [seekTo],
  );

  const toggleFullscreen = useCallback(async () => {
    const shell = shellRef.current;
    if (!shell) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
      return;
    }
    try {
      await shell.requestFullscreen();
    } catch {
      // iPhone Safari has no element fullscreen — fall back to the native
      // video fullscreen if available.
      const video = videoRef.current as
        | (HTMLVideoElement & { webkitEnterFullscreen?: () => void })
        | null;
      video?.webkitEnterFullscreen?.();
    }
  }, []);

  /* ------------------------------ seek dragging ----------------------------- */

  const seekFromClientX = useCallback(
    (clientX: number) => {
      const video = videoRef.current;
      const track = trackRef.current;
      if (!video || !track) return;
      const d = usableDuration();
      if (d <= 0) return;
      const rect = track.getBoundingClientRect();
      const pct = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      video.currentTime = pct * d;
      setCurrentTime(video.currentTime);
    },
    [usableDuration],
  );

  const onTrackPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragRef.current = true;
    setDragging(true);
    setControlsVisible(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* capture is best-effort */
    }
    seekFromClientX(e.clientX);
  };

  const onTrackPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current) seekFromClientX(e.clientX);
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    dragRef.current = false;
    setDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };

  const onTrackKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        e.preventDefault();
        skip(-SKIP_SECONDS);
        break;
      case "ArrowRight":
      case "ArrowUp":
        e.preventDefault();
        skip(SKIP_SECONDS);
        break;
      case "Home":
        e.preventDefault();
        seekTo(0);
        break;
      case "End":
        e.preventDefault();
        seekTo(duration);
        break;
    }
  };

  /* --------------------- keyboard on the player shell ----------------------- */

  const onPlayerKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    // Only handle keys aimed at the player shell itself — buttons inside keep
    // their native Space/Enter behavior, and nothing outside is affected.
    if (e.target !== e.currentTarget) return;
    if (e.key === " ") {
      e.preventDefault();
      togglePlay();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      skip(-SKIP_SECONDS);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      skip(SKIP_SECONDS);
    } else if (e.key === "m" || e.key === "M") {
      toggleMute();
    } else if ((e.key === "f" || e.key === "F") && fullscreenSupported) {
      toggleFullscreen();
    }
  };

  /* ------------------------------ video events ------------------------------ */

  // Store the duration only when the browser reports a usable value; re-run
  // on durationchange/progress/seeked below, since estimates can correct
  // themselves as more of the file buffers.
  const syncDuration = useCallback(() => {
    const d = usableDuration();
    if (d > 0) setDuration(d);
  }, [usableDuration]);

  // The browser can finish loading metadata BEFORE React hydrates and attaches
  // the `loadedmetadata`/`durationchange` handlers — on a prerendered page the
  // event fires while the HTML is still parsing. So on mount, read the
  // element's already-known duration directly.
  useEffect(() => {
    syncDuration();
  }, [syncDuration]);

  const handleLoadedMetadata = () => syncDuration();
  const handleDurationChange = () => syncDuration();
  const handleSeeked = () => {
    syncDuration();
    setCurrentTime(videoRef.current?.currentTime ?? 0);
  };
  const handlePlay = () => {
    wasAutoRef.current = true;
    userPausedRef.current = false;
    setIsPlaying(true);
  };
  const handlePause = () => setIsPlaying(false);
  const handleEnded = () => setIsPlaying(false);
  const handleTimeUpdate = () => {
    // Self-healing: in case metadata resolved after hydration, catch it here.
    // (Setting the same value is a no-op re-render-wise.)
    syncDuration();
    setCurrentTime(videoRef.current?.currentTime ?? 0);
  };
  const handleProgress = () => {
    syncDuration();
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0)
      return;
    const end = video.buffered.length
      ? video.buffered.end(video.buffered.length - 1)
      : 0;
    setBufferedPct(Math.min(100, (end / video.duration) * 100));
  };

  /* --------------------------------- render --------------------------------- */

  const progressPct =
    Number.isFinite(duration) && duration > 0
      ? Math.min(100, (currentTime / duration) * 100)
      : 0;
  const controlsShown = !isPlaying || controlsVisible || dragging;

  const onSurfaceClick = () => {
    // Touch: first tap reveals controls. Mouse: click toggles playback.
    if (isTouch) setControlsVisible((v) => !v);
    else togglePlay();
  };

  return (
    <figure className="relative">
      <div
        ref={shellRef}
        tabIndex={0}
        role="group"
        aria-label="Introduction video player. Space plays or pauses, arrow keys skip 3 seconds."
        onKeyDown={onPlayerKeyDown}
        className="video-shell group/shell relative overflow-hidden rounded-xl border border-border-strong bg-black shadow-[0_28px_70px_-32px_rgba(0,0,0,0.8)] transition-colors duration-300 focus-visible:border-primary/50 hover:border-primary/40"
      >
        <div
          className="relative aspect-video w-full cursor-pointer select-none"
          onClick={onSurfaceClick}
        >
          <video
            ref={videoRef}
            playsInline
            preload="metadata"
            poster={poster}
            aria-label="Ashish Kumar introduction video"
            className="absolute inset-0 h-full w-full object-contain"
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={handleEnded}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onDurationChange={handleDurationChange}
            onProgress={handleProgress}
            onSeeked={handleSeeked}
            onVolumeChange={() => setIsMuted(videoRef.current?.muted ?? true)}
          >
            {mobileSrc && (
              <source
                src={mobileSrc}
                media="(max-width: 767px)"
                type={mobileSrc.endsWith(".webm") ? "video/webm" : "video/mp4"}
              />
            )}
            <source
              src={src}
              type={src.endsWith(".webm") ? "video/webm" : "video/mp4"}
            />
          </video>

          {/* Center play / replay — visible whenever paused */}
          {!isPlaying && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              aria-label={
                duration > 0 && currentTime >= duration
                  ? "Replay video"
                  : "Play video"
              }
              className="absolute inset-0 z-10 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/20"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-border-strong bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-primary">
                <Play size={20} aria-hidden className="ml-0.5" />
              </span>
            </button>
          )}

          {/* Unmute pill — only when audible autoplay was blocked */}
          {blockedAudible && isMuted && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              aria-label="Unmute video"
              className="absolute bottom-16 left-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-background/85 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-primary"
            >
              <VolumeX size={13} aria-hidden />
              Unmute
            </button>
          )}

          {/* Control bar — hover/focus on desktop, tap-to-toggle on touch */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/75 via-black/30 to-transparent pt-8 transition-opacity duration-300 group-hover/shell:opacity-100 group-focus-within/shell:opacity-100 ${
              controlsShown ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div className="flex items-center gap-0.5 px-2 pb-2 sm:px-3">
              <CtrlButton
                label={isPlaying ? "Pause video" : "Play video"}
                title={isPlaying ? "Pause" : "Play"}
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause size={16} aria-hidden />
                ) : (
                  <Play size={16} aria-hidden className="ml-0.5" />
                )}
              </CtrlButton>

              <CtrlButton
                label="Skip back 3 seconds"
                title="Back 3s"
                onClick={() => skip(-SKIP_SECONDS)}
              >
                <SkipIcon dir="back" />
              </CtrlButton>

              <CtrlButton
                label="Skip forward 3 seconds"
                title="Forward 3s"
                onClick={() => skip(SKIP_SECONDS)}
              >
                <SkipIcon dir="forward" />
              </CtrlButton>

              {/* Seek slider — pointer, touch and keyboard */}
              <div
                ref={trackRef}
                role="slider"
                tabIndex={0}
                aria-label="Seek video"
                aria-valuemin={0}
                aria-valuemax={
                  Number.isFinite(duration) && duration > 0
                    ? Math.round(duration)
                    : 0
                }
                aria-valuenow={Math.round(currentTime)}
                aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
                aria-orientation="horizontal"
                onKeyDown={onTrackKeyDown}
                onPointerDown={onTrackPointerDown}
                onPointerMove={onTrackPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                className="group/seek relative mx-1.5 min-w-8 flex-1 cursor-pointer touch-none py-2.5"
              >
                <div className="relative h-1 w-full rounded-full bg-white/20">
                  {bufferedPct > 0 && (
                    <div
                      aria-hidden
                      className="absolute inset-y-0 left-0 rounded-full bg-white/15"
                      style={{ width: `${bufferedPct}%` }}
                    />
                  )}
                  <div
                    aria-hidden
                    className="absolute inset-y-0 left-0 rounded-full bg-primary"
                    style={{ width: `${progressPct}%` }}
                  />
                  <div
                    aria-hidden
                    className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow transition-transform duration-150 group-hover/seek:scale-125"
                    style={{ left: `${progressPct}%` }}
                  />
                </div>
              </div>

              <span className="ml-1 shrink-0 text-[11px] tabular-nums text-foreground/80">
                {formatTime(currentTime)}
                <span className="text-foreground/40"> / </span>
                {formatTime(duration)}
              </span>

              <CtrlButton
                label={isMuted ? "Unmute video" : "Mute video"}
                title={isMuted ? "Unmute" : "Mute"}
                pressed={!isMuted}
                onClick={toggleMute}
              >
                {isMuted ? (
                  <VolumeX size={16} aria-hidden />
                ) : (
                  <Volume2 size={16} aria-hidden />
                )}
              </CtrlButton>

              {fullscreenSupported && (
                <CtrlButton
                  label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  title="Fullscreen"
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? (
                    <Minimize2 size={15} aria-hidden />
                  ) : (
                    <Maximize2 size={15} aria-hidden />
                  )}
                </CtrlButton>
              )}
            </div>
          </div>
        </div>
      </div>

      <figcaption
        className={
          caption
            ? "mt-3 text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
            : "sr-only"
        }
      >
        {caption ??
          "Ashish Kumar introduces himself — websites, web applications and cross-platform mobile apps."}
      </figcaption>
    </figure>
  );
}
