import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-32">
      <Container>
        <div className="max-w-xl">
          <p className="font-display text-7xl italic text-primary">404</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            This page wandered off.
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            The page you’re looking for doesn’t exist — it may have moved or
            the link might be incorrect.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/" className="btn btn-primary text-sm">
              <ArrowLeft size={15} aria-hidden />
              Back to Home
            </Link>
            <Link href="/work" className="btn btn-secondary text-sm">
              View My Work
              <ArrowUpRight size={15} aria-hidden />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
