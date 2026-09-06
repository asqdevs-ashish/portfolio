"use client";

import { ArrowRight, LoaderCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { site, whatsappUrl } from "@/lib/site";
import { trackCta } from "@/lib/track";

const inputClasses =
  "w-full rounded-lg border border-border-strong bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary/70 focus:outline-none";

type FormState = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
};

const emptyForm: FormState = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  timeline: "",
  message: "",
};

type Status = "idle" | "sending" | "sent";

export function ContactForm() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState<Status>("idle");

  const update =
    (field: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    trackCta("contact_form");
    const message = [
      "Hi Ashish,",
      "",
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Project type: ${form.projectType}`,
      form.budget ? `Budget: ${form.budget}` : "",
      form.timeline ? `Timeline: ${form.timeline}` : "",
      "",
      form.message.trim(),
    ]
      .filter((line) => line !== "")
      .join("\n");

    const url = whatsappUrl(message);

    // Give the UI a beat so the button state is visible, then hand over.
    window.setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
      setStatus("sent");
      setForm(emptyForm);
    }, 350);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-surface p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-[13px] font-medium text-foreground/90">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            value={form.name}
            onChange={update("name")}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-[13px] font-medium text-foreground/90">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={update("email")}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="projectType" className="mb-2 block text-[13px] font-medium text-foreground/90">
          Project type
        </label>
        <select
          id="projectType"
          required
          value={form.projectType}
          onChange={update("projectType")}
          className={`${inputClasses} appearance-none [&>option]:bg-background`}
        >
          <option value="" disabled>
            What do you need built?
          </option>
          <option value="Website">Website</option>
          <option value="Web Application">Web Application</option>
          <option value="Mobile App (iOS & Android)">Mobile App (iOS & Android)</option>
          <option value="SaaS Product">SaaS Product</option>
          <option value="AI Integration">AI Integration</option>
          <option value="Existing product / improvements">Existing product or improvements</option>
          <option value="Other">Something else</option>
        </select>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="budget" className="mb-2 block text-[13px] font-medium text-foreground/90">
            Budget <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <select
            id="budget"
            value={form.budget}
            onChange={update("budget")}
            className={`${inputClasses} appearance-none [&>option]:bg-background`}
          >
            <option value="">Select a range</option>
            <option value="Under $1,000">Under $1,000</option>
            <option value="$1,000 – $5,000">$1,000 – $5,000</option>
            <option value="$5,000 – $15,000">$5,000 – $15,000</option>
            <option value="$15,000+">$15,000+</option>
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className="mb-2 block text-[13px] font-medium text-foreground/90">
            Timeline <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <select
            id="timeline"
            value={form.timeline}
            onChange={update("timeline")}
            className={`${inputClasses} appearance-none [&>option]:bg-background`}
          >
            <option value="">Select a timeline</option>
            <option value="Flexible / not urgent">Flexible / not urgent</option>
            <option value="Within 2 weeks">Within 2 weeks</option>
            <option value="1 – 2 months">1 – 2 months</option>
            <option value="2 – 3 months">2 – 3 months</option>
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-2 block text-[13px] font-medium text-foreground/90">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          required
          placeholder="What are you building — a website, web app or mobile app? What’s the goal?"
          value={form.message}
          onChange={update("message")}
          className={`${inputClasses} resize-none leading-relaxed`}
        />
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-70">
          {status === "sending" ? (
            <>
              <LoaderCircle size={16} className="animate-spin" aria-hidden />
              Preparing…
            </>
          ) : (
            <>
              Send Message
              <ArrowRight size={16} aria-hidden />
            </>
          )}
        </button>
        {status === "sent" && (
          <p className="text-sm text-primary" role="status">
            Opening WhatsApp with your message — talk soon.
          </p>
        )}
      </div>

      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
        Submitting opens WhatsApp with your details pre-filled — nothing is
        stored on this site. Prefer email? Write to{" "}
        <a
          href={`mailto:${site.email}`}
          className="text-foreground/80 underline decoration-primary/50 underline-offset-2 hover:text-primary"
        >
          {site.email}
        </a>
        .
      </p>
    </form>
  );
}
