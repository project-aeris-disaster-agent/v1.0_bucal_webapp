import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { APP_NAME, BUCAL_LOGO_SRC } from "../../config/constants";
import { ProfileMenu } from "./ProfileMenu";
import { useTheme } from "../../context/ThemeContext";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={BUCAL_LOGO_SRC}
            alt={APP_NAME}
            className="h-10 w-auto"
          />
          <div>
            <p className="text-sm font-bold leading-tight">BUCAL</p>
            <p className="text-[10px] text-[var(--text-muted)] leading-tight">
              Bicol Athletic League
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <ProfileMenu />
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full border border-[var(--border)] p-2 text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
