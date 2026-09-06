"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CalendarDays, LoaderCircle, X } from "lucide-react";
import { booking, site, whatsappUrl } from "@/lib/site";
import { trackCta } from "@/lib/track";

/* ---------------------------------- context ---------------------------------- */

type BookingContextValue = {
  isOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openBooking = useCallback(() => setIsOpen(true), []);
  const closeBooking = useCallback(() => setIsOpen(false), []);

  return (
    <BookingContext.Provider value={{ isOpen, openBooking, closeBooking }}>
      {children}
      <BookingModal isOpen={isOpen} onClose={closeBooking} />
    </BookingContext.Provider>
  );
}

/* ---------------------------------- modal ---------------------------------- */

function embedSrc(url: string): string {
  if (!url) return "";
  const base = /^https?:\/\//.test(url) ? url : `https://${url}`;
  const query = base.includes("?")
    ? base + "&theme=dark"
    : base + "?theme=dark";
  return query;
}

function BookingModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [embedLoaded, setEmbedLoaded] = useState(false);
  const src = embedSrc(booking.calUrl);

  // Close on Escape + lock body scroll while open.
  // (Modal unmounts when closed, so embed state resets on each open.)
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
    >
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close booking dialog"
        onClick={onClose}
        className="fixed inset-0 cursor-default bg-black/70 backdrop-blur-sm"
        tabIndex={-1}
      />

      {/* Panel */}
      <div className="relative mt-6 w-full max-w-3xl overflow-hidden rounded-2xl border border-border-strong bg-background shadow-2xl sm:mt-12">
        <div className="flex items-start justify-between gap-6 border-b border-border px-5 py-4 sm:px-7">
          <div>
            <p className="eyebrow">
              <CalendarDays size={13} aria-hidden className="text-primary" />
              <span>Book a Call</span>
            </p>
            <h2 id="booking-title" className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
              {booking.eventName}
            </h2>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {booking.description}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            <X size={17} aria-hidden />
          </button>
        </div>

        <div className="px-5 py-5 sm:px-7 sm:py-6">
          {src ? (
            <div className="relative h-[min(68vh,620px)] min-h-[440px] overflow-hidden rounded-xl border border-border bg-surface">
              {!embedLoaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-muted-foreground">
                  <LoaderCircle size={22} className="animate-spin text-primary" aria-hidden />
                  <p className="text-sm">Loading availability…</p>
                </div>
              )}
              <iframe
                src={src}
                title="Schedule a Project Discovery Call"
                className="h-full w-full"
                style={{ border: 0 }}
                onLoad={() => setEmbedLoaded(true)}
                allow="calendar"
              />
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
              <p className="text-[15px] font-medium text-foreground">
                Booking is being set up right now.
              </p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                Until the calendar link goes live, the fastest ways to reach me
                are email, WhatsApp or a quick call — I reply within 24 hours.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`mailto:${site.email}`} className="btn btn-primary text-sm">
                  Email me
                </a>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary text-sm"
                >
                  WhatsApp
                </a>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Or call directly:{" "}
                <a
                  href={site.phoneHref}
                  className="font-medium text-foreground underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary"
                >
                  {site.phone}
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- button ---------------------------------- */

type BookCallButtonProps = {
  label?: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export function BookCallButton({
  label = "Book a Call",
  variant = "secondary",
  className = "",
}: BookCallButtonProps) {
  const { openBooking } = useBooking();
  return (
    <button
      type="button"
      onClick={() => {
        trackCta("book_call");
        openBooking();
      }}
      className={`btn ${variant === "primary" ? "btn-primary" : "btn-secondary"} ${className}`}
    >
      {label}
      <CalendarDays size={16} aria-hidden />
    </button>
  );
}
