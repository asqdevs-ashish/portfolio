import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/** Shared content width — every section flows through the same grid. */
export function Container({ children, className = "" }: ContainerProps) {
  return <div className={`shell ${className}`}>{children}</div>;
}
