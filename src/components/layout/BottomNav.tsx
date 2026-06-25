import { BarChart3, Home, Radio, Ticket, Trophy } from "lucide-react";
import { NavLink } from "react-router-dom";
import { BannerAd } from "./BannerAd";
import { Footer } from "./Footer";

const navItems = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/matches", label: "Matches", icon: Trophy, end: false },
  { to: "/live", label: "Live", icon: Radio, end: false, highlight: true },
  { to: "/stats", label: "Stats", icon: BarChart3, end: false },
  { to: "/tickets", label: "Tickets", icon: Ticket, end: false },
] as const;

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pb-[env(safe-area-inset-bottom)]">
      <BannerAd />
      <nav className="border-t border-[var(--border)] bg-[var(--bg)] md:bg-[var(--bg)]/95 md:backdrop-blur-md">
        <div className="mx-auto grid max-w-lg grid-cols-5 px-1 py-2">
        {navItems.map(({ to, label, icon: Icon, end, ...item }) => {
          const highlight = "highlight" in item && item.highlight;

          return (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                highlight
                  ? `bottom-nav-live flex flex-col items-center gap-0.5 rounded-xl px-1.5 py-1 text-[10px] font-bold uppercase tracking-wide transition-all ${
                      isActive ? "bottom-nav-live--active" : ""
                    }`
                  : `flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-medium transition-colors ${
                      isActive
                        ? "text-[var(--accent)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text)]"
                    }`
              }
            >
              {highlight ? (
                <>
                  <span className="bottom-nav-live-icon relative flex h-8 w-8 items-center justify-center rounded-full">
                    <span
                      aria-hidden
                      className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.9)] animate-live-dot"
                    />
                    <Icon size={18} className="text-red-400" />
                  </span>
                  <span className="text-red-400">{label}</span>
                </>
              ) : (
                <>
                  <Icon size={20} />
                  {label}
                </>
              )}
            </NavLink>
          );
        })}
        </div>
      </nav>
      <Footer />
    </div>
  );
}
