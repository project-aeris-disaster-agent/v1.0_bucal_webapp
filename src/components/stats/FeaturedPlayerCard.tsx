import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { players } from "../../data/players";
import { getTeam } from "../../lib/data";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";

type FeaturedPlayer = {
  name: string;
  team: string;
  abbreviation: string;
  position: string;
  photo: string;
  photoIsLogo?: boolean;
  accentColor: string;
  stats: {
    pointsPerGame: number;
    reboundsPerGame: number;
    assistsPerGame: number;
    gamesPlayed: number;
  };
};

function buildFeaturedPlayer(
  player: (typeof players)[number],
): FeaturedPlayer {
  const team = getTeam(player.teamId);

  return {
    name: player.name,
    team: team?.school ?? team?.name ?? "",
    abbreviation: team?.abbreviation ?? "",
    position: player.position,
    photo: team?.logo ?? "",
    photoIsLogo: true,
    accentColor: team?.color ?? "#C8102E",
    stats: {
      pointsPerGame: player.pointsPerGame,
      reboundsPerGame: player.reboundsPerGame,
      assistsPerGame: player.assistsPerGame,
      gamesPlayed: player.gamesPlayed,
    },
  };
}

const FEATURED_PLAYERS: FeaturedPlayer[] = [
  {
    name: "LeBron James",
    team: "Los Angeles Lakers",
    abbreviation: "LAL",
    position: "SF",
    photo: "/media/lebron.webp",
    accentColor: "#552583",
    stats: {
      pointsPerGame: 24.4,
      reboundsPerGame: 7.8,
      assistsPerGame: 8.2,
      gamesPlayed: 70,
    },
  },
  buildFeaturedPlayer(players[0]),
  buildFeaturedPlayer(players[1]),
  buildFeaturedPlayer(players[2]),
  buildFeaturedPlayer(players[3]),
];

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-lg font-black text-[var(--accent)]">{value}</p>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
        {label}
      </p>
    </div>
  );
}

export function FeaturedPlayerCard() {
  const [index, setIndex] = useState(0);
  const total = FEATURED_PLAYERS.length;
  const player = FEATURED_PLAYERS[index];
  const { name, team, abbreviation, position, photo, photoIsLogo, accentColor, stats } =
    player;

  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  return (
    <Card className="relative overflow-hidden p-0">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-100 transition-opacity"
        style={{
          background: `linear-gradient(to bottom right, ${accentColor}18, transparent, ${accentColor}10)`,
        }}
      />

      <div className="relative p-4">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Featured Player
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous featured player"
                className="rounded-lg border border-[var(--border)] p-1"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="min-w-[2.5rem] text-center text-[10px] font-semibold tabular-nums text-[var(--text-muted)]">
                {index + 1}/{total}
              </span>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next featured player"
                className="rounded-lg border border-[var(--border)] p-1"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <Badge variant="accent">Season Highlight</Badge>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <div
              className="absolute -inset-1 rounded-full opacity-60"
              style={{
                background: `linear-gradient(to bottom right, ${accentColor}, ${accentColor}88)`,
              }}
            />
            <img
              src={photo}
              alt={name}
              className={`relative h-24 w-24 rounded-full ring-2 ring-[var(--bg-elevated)] ${
                photoIsLogo
                  ? "bg-[var(--bg)] object-contain p-3"
                  : "object-cover object-top"
              }`}
            />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-black tracking-tight">{name}</h2>
            <p className="text-sm text-[var(--text-muted)]">
              {abbreviation} · {position}
            </p>
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">{team}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2 rounded-xl border border-[var(--border)]/60 bg-[var(--bg)]/40 p-3">
          <StatBlock label="PPG" value={stats.pointsPerGame.toFixed(1)} />
          <StatBlock label="RPG" value={stats.reboundsPerGame.toFixed(1)} />
          <StatBlock label="APG" value={stats.assistsPerGame.toFixed(1)} />
          <StatBlock label="GP" value={String(stats.gamesPlayed)} />
        </div>
      </div>
    </Card>
  );
}
