import { Code2, Lightbulb, Rocket, Users } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description:
      "Writing maintainable, modular, and scalable code built to stand the test of time.",
  },
  {
    icon: Rocket,
    title: "Performance",
    description:
      "Optimizing web and mobile apps for lightning-fast load times and seamless UX.",
  },
  {
    icon: Users,
    title: "Leadership",
    description: "Leading technical teams and collaborating closely to turn ideas into reality.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Leveraging cutting-edge tech stacks like Next.js & React Native to stay ahead.",
  },
];

export const About = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
                About Me
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in animation-delay-100 text-secondary-foreground">
              Architecting scalable web & mobile systems,
              <span className="font-serif italic font-normal text-white">
                {" "}
                one stack at a time.
              </span>
            </h2>

            <div className="space-y-4 text-muted-foreground animate-fade-in animation-delay-200">
              <p>
                I'm a Full-Stack Engineer and Tech Lead passionate about 
                building end-to-end digital products. My journey began with a curiosity 
                for how complex systems work under the hood, which quickly grew into 
                deep expertise across web and mobile ecosystems.
              </p>
              <p>
                I specialize in <strong>Next.js, MERN, PERN stacks, and React Native</strong>. 
                Whether it's designing cloud-ready REST/GraphQL APIs with Node.js and PostgreSQL/MongoDB, 
                or crafting butter-smooth interfaces for mobile and web, I focus on code quality, 
                security, and high performance.
              </p>
              <p>
                Beyond coding, I lead tech initiatives, build products in public, and stay at the 
                forefront of tech trends to deliver modern, business-driving digital solutions.
              </p>
            </div>

            <div className="glass rounded-2xl p-6 glow-border animate-fade-in animation-delay-300">
              <p className="text-lg font-medium italic text-foreground">
                My goal is to bridge the gap between complex engineering and 
                delightful user experience — shipping products that scale effortlessly 
                and drive real value.
              </p>
            </div>
          </div>

          {/* Right Column - Highlights */}
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="glass p-6 rounded-2xl animate-fade-in"
                style={{ animationDelay: `${(idx + 1) * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 hover:bg-primary/20">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};