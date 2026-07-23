import { useState } from "react";
import { ArrowUpRight, Github, Smartphone, Globe } from "lucide-react";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";

const projects = [
  {
    title: "Chain Arrow Lock",
    type: "Mobile App",
    description:
      "An engaging logic-based mobile puzzle game featuring multi-directional arrow mechanics, level progressions, and interactive daily challenge calendar systems.",
    image: "/projects/chain-arrow-lock.jpeg",
    tags: ["React Native", "Mobile Game", "Tailwind CSS", "State Engine"],
  },
  {
    title: "My Bunny - Partner Companion",
    type: "Mobile App",
    description:
      "A dedicated relationship tracking & connectivity app with real-time partner sync, daily love notes, habit/water reminders, and mood check-in modules.",
    image: "/projects/my-bunny.jpeg",
    tags: ["React Native", "Node.js", "WebSockets", "MongoDB"],
  },
  {
    title: "A² Trade - Crypto & Stock Platform",
    type: "Web Application",
    description:
      "An advanced real-time trading terminal featuring interactive candlestick charts, multi-asset watchlists (BTC, Forex, Stocks), and dynamic technical indicators.",
    image: "/projects/a2-trade.png",
    tags: ["Next.js", "Financial Tech", "TradingView Engine", "Tailwind CSS"],
    link: "https://a-square-trades.vercel.app",
  },
  {
    title: "India Tours - Travel Experience",
    type: "Web Application",
    description:
      "A premium travel booking platform tailored for international tourists, featuring custom itinerary builders, curated tour packages, and multi-city bookings.",
    image: "/projects/india-tours.png",
    tags: ["Next.js", "Travel SaaS", "UI/UX", "Tailwind CSS"],
    link: "https://tour-agency-akash.vercel.app",
  },
  {
    title: "A² Properties - Sohna Real Estate",
    type: "Web Application",
    description:
      "A high-converting luxury real estate portal showcasing residential plots, luxury floors, site visit booking workflows, and yield calculators in Sohna.",
    image: "/projects/a2-properties.png",
    tags: ["Next.js", "Real Estate", "Lead Gen", "Tailwind CSS"],
    link: "https://a2-real-estate.vercel.app",
  },
  {
    title: "A² Academy - Educational Portal",
    type: "Web Application",
    description:
      "A modern institutional web platform designed for premier schools, featuring interactive campus tour integrations, online admissions, and dynamic event feeds.",
    image: "/projects/a2-school.png",
    tags: ["Next.js", "EdTech", "Full Stack", "Tailwind CSS"],
    link: "https://a2-school-site.vercel.app",
  },
];

export const Projects = () => {
  const [showAll, setShowAll] = useState(false);

  // Toggle projects list based on state
  const displayedProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mx-auto max-w-3xl mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Projects that{" "}
            <span className="font-serif italic font-normal text-white">
              make an impact.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            A selection of my recent production work, ranging from interactive mobile applications to high-performing live web applications.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {displayedProjects.map((project) => {
            const hasLinks = Boolean(project.link || project.github);

            return (
              <div
                key={project.title}
                className="group glass rounded-2xl overflow-hidden animate-fade-in border border-border/40 hover:border-primary/40 transition-all duration-300 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-video bg-slate-950/80 flex items-center justify-center border-b border-border/40">
                  {project.type === "Mobile App" ? (
                    <>
                      {/* Blurred Background Glow for Mobile App Screenshots */}
                      <img
                        src={project.image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-125 pointer-events-none"
                      />
                      {/* Centered Mobile Screenshot Mockup */}
                      <img
                        src={project.image}
                        alt={project.title}
                        className="relative z-10 h-[88%] object-contain rounded-xl shadow-2xl border border-white/20 transition-transform duration-500 group-hover:scale-105"
                      />
                    </>
                  ) : (
                    /* Standard Web Application Screenshot */
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60 pointer-events-none" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/70 backdrop-blur-md text-white border border-white/10 flex items-center gap-1.5 shadow-lg">
                      {project.type === "Mobile App" ? (
                        <Smartphone className="w-3.5 h-3.5 text-primary" />
                      ) : (
                        <Globe className="w-3.5 h-3.5 text-green-400" />
                      )}
                      {project.type}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  {hasLinks && (
                    <div className="absolute inset-0 z-30 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-[2px]">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-2 text-sm font-medium"
                        >
                          Visit Live Site
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                          title="View Source Code"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${project.title}`}
                        >
                          <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                        </a>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-3.5 py-1 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground group-hover:border-primary/30 group-hover:text-foreground transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All / Show Less Toggle Button */}
        {projects.length > 4 && (
          <div className="text-center mt-12 animate-fade-in animation-delay-500">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="inline-block cursor-pointer focus:outline-none"
            >
              <AnimatedBorderButton>
                {showAll ? "Show Less" : "View All Projects"}
                <ArrowUpRight
                  className={`w-5 h-5 transition-transform duration-300 ${
                    showAll ? "rotate-180" : ""
                  }`}
                />
              </AnimatedBorderButton>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};