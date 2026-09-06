import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { Services } from "@/components/sections/Services";
import { WebMobile } from "@/components/sections/WebMobile";
import { WhyWorkWithMe } from "@/components/sections/WhyWorkWithMe";
import { Testimonials } from "@/components/sections/Testimonials";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Services />
      <WebMobile />
      <WhyWorkWithMe />
      <Testimonials />
      <About />
      <Process />
      <FAQ />
      <FinalCTA />
      <Contact />
    </>
  );
}
