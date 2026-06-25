import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { Header } from "./Header";
import { PageBackground } from "./PageBackground";

type PageShellProps = {
  children: ReactNode;
  title?: string;
  titleAction?: ReactNode;
};

export function PageShell({ children, title, titleAction }: PageShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--bg)] pb-bottom-chrome">
      <PageBackground />

      <div className="relative z-10">
        <Header />
        <main className="mx-auto max-w-lg px-4 py-4">
          {title && (
            <div className="mb-4 flex items-center justify-between gap-3">
              <h1 className="text-xl font-bold tracking-tight">{title}</h1>
              {titleAction}
            </div>
          )}
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
