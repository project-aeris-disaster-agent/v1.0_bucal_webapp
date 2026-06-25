import { BarChart3, Home, Radio, Ticket, Trophy } from "lucide-react";
import { NavLink } from "react-router-dom";
import { BannerAd } from "./BannerAd";
import { Footer } from "./Footer";

const navItems = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/matches", label: "Matches", icon: Trophy, end: false },
  { to: "/live", label: "Live", icon: Radio, end: false },
  { to: "/stats", label: "Stats", icon: BarChart3, end: false },
  { to: "/tickets", label: "Tickets", icon: Ticket, end: false },
];

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pb-[env(safe-area-inset-bottom)]">
      <BannerAd />
      <nav className="border-t border-[var(--border)] bg-[var(--bg)] md:bg-[var(--bg)]/95 md:backdrop-blur-md">
        <div className="mx-auto grid max-w-lg grid-cols-5 px-1 py-2">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-medium transition-colors ${
                isActive
                  ? "text-[var(--accent)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
        </div>
      </nav>
      <Footer />
    </div>
  );
}
