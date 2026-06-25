import { useState } from "react";
import type { Team } from "../../data/types";

type TeamLogoProps = {
  team: Pick<Team, "abbreviation" | "color" | "logo">;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses = {
  xs: "h-2.5 w-2.5 text-[8px]",
  sm: "h-3 w-3 text-[8px]",
  md: "h-7 w-7 text-xs",
  lg: "h-12 w-12 text-sm",
} as const;

export function TeamLogo({ team, size = "lg", className = "" }: TeamLogoProps) {
  const [failed, setFailed] = useState(false);
  const sizeClass = sizeClasses[size];

  if (team.logo && !failed) {
    return (
      <img
        src={team.logo}
        alt={`${team.abbreviation} logo`}
        className={`${sizeClass} shrink-0 rounded-full bg-white object-contain p-0.5 ${className}`}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} flex shrink-0 items-center justify-center rounded-full font-bold text-white ${className}`}
      style={{ backgroundColor: team.color }}
    >
      {team.abbreviation.slice(0, 2)}
    </div>
  );
}
