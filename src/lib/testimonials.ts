export type Testimonial = {
  /** Short, direct quote from the client. Never fabricate these. */
  quote: string;
  name: string;
  /** e.g. "Founder, Brightline Realty" */
  context: string;
};

export const testimonials: Testimonial[] = [];
