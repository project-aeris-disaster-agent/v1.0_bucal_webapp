import { MapPin } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { TeamLogo } from "../team/TeamLogo";
import { enrichMatch } from "../../lib/data";
import type { Match, Team } from "../../data/types";

type FeaturedMatchCardProps = {
  match: Match;
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-PH", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-PH", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-red-400 ring-1 ring-red-500/30">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 animate-live-dot rounded-full bg-red-500" />
      </span>
      Live
    </span>
  );
}

export { LiveBadge };

type ScoreProps = {
  value: number;
  isLeading: boolean;
  isLive: boolean;
  delay?: number;
};

function Score({ value, isLeading, isLive, delay = 0 }: ScoreProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.6, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 18, delay }}
      className={`tabular-nums text-5xl font-black leading-none tracking-tight sm:text-6xl ${
        isLeading
          ? isLive
            ? "text-[var(--accent)] animate-score-glow"
            : "text-[var(--accent)]"
          : "text-[var(--text)]/70"
      }`}
    >
      {value}
    </motion.span>
  );
}

type ScoreboardProps = {
  home: Team;
  away: Team;
  homeScore: number;
  awayScore: number;
  isLive: boolean;
};

export function LiveMatchScoreboard({
  home,
  away,
  homeScore,
  awayScore,
  isLive,
}: ScoreboardProps) {
  const homeLeading = homeScore > awayScore;
  const awayLeading = awayScore > homeScore;
  const tied = homeScore === awayScore;

  return (
    <div className="relative overflow-hidden rounded-xl border border-[var(--border)]/60 bg-[var(--bg)]/40 p-4 backdrop-blur-sm">
      {isLive && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.08),transparent_70%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -left-full w-full animate-live-shimmer bg-gradient-to-r from-transparent via-red-500/[0.07] to-transparent"
          />
        </>
      )}

      <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5">
        <TeamColumn team={home} align="left" isLeading={homeLeading && !tied} />

        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2 sm:gap-3">
            <Score
              value={homeScore}
              isLeading={homeLeading || tied}
              isLive={isLive}
              delay={0.1}
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-lg font-black text-[var(--text-muted)]/50 sm:text-xl"
            >
              –
            </motion.span>
            <Score
              value={awayScore}
              isLeading={awayLeading || tied}
              isLive={isLive}
              delay={0.2}
            />
          </div>
          {isLive && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-[9px] font-bold uppercase tracking-[0.2em] text-red-400/80"
            >
              In Progress
            </motion.p>
          )}
        </div>

        <TeamColumn team={away} align="right" isLeading={awayLeading && !tied} />
      </div>
    </div>
  );
}

type TeamColumnProps = {
  team: Team;
  align: "left" | "right";
  isLeading?: boolean;
};

function TeamColumn({ team, align, isLeading = false }: TeamColumnProps) {
  return (
    <div
      className={`flex flex-col gap-1.5 ${align === "right" ? "items-end text-right" : "items-start"}`}
    >
      <TeamLogo
        team={team}
        size="lg"
        className={`transition-transform ${isLeading ? "ring-2 ring-[var(--accent)]/40 ring-offset-2 ring-offset-[var(--bg-elevated)]" : ""}`}
      />
      <div>
        <p
          className={`text-sm font-bold ${isLeading ? "text-[var(--text)]" : "text-[var(--text-muted)]"}`}
        >
          {team.abbreviation}
        </p>
        <p className="text-[10px] text-[var(--text-muted)]">#{team.seed}</p>
      </div>
    </div>
  );
}

function ScheduledLayout({ match, home, away }: { match: Match; home: Team; away: Team }) {
  return (
    <Card className="overflow-hidden">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          {match.group} · {match.sport}
        </p>
        <Badge variant="default">{match.status}</Badge>
      </div>

      <div className="mb-4 flex items-center gap-1 text-xs text-[var(--text-muted)]">
        <MapPin size={12} />
        <span>{match.venue}</span>
      </div>

      <div className="flex items-center justify-between gap-4">
        <TeamBlock team={home} align="left" />
        <div className="text-center">
          <p className="text-2xl font-bold">{formatTime(match.scheduledAt)}</p>
          <Badge variant="accent" className="mt-1">
            {formatDate(match.scheduledAt)}
          </Badge>
        </div>
        <TeamBlock team={away} align="right" />
      </div>
    </Card>
  );
}

export function FeaturedMatchCard({ match }: FeaturedMatchCardProps) {
  const { home, away } = enrichMatch(match);
  const isLive = match.status === "live";
  const hasScore = match.homeScore !== undefined && match.awayScore !== undefined;

  if (match.status === "scheduled") {
    return <ScheduledLayout match={match} home={home} away={away} />;
  }

  if (!hasScore) {
    return <ScheduledLayout match={match} home={home} away={away} />;
  }

  return (
    <Card
      className={`relative overflow-hidden p-0 ${
        isLive ? "animate-live-border border-red-500/40" : ""
      }`}
    >
      {isLive && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-500/[0.06] via-transparent to-[var(--accent)]/[0.04]"
        />
      )}

      <div className="relative p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            {match.group} · {match.sport}
          </p>
          {isLive ? (
            <LiveBadge />
          ) : (
            <Badge variant="default">{match.status}</Badge>
          )}
        </div>

        <div className="mb-4 flex items-center gap-1 text-xs text-[var(--text-muted)]">
          <MapPin size={12} className="shrink-0 text-red-400/70" />
          <span>{match.venue}</span>
        </div>

        <LiveMatchScoreboard
          home={home}
          away={away}
          homeScore={match.homeScore!}
          awayScore={match.awayScore!}
          isLive={isLive}
        />
      </div>
    </Card>
  );
}

type TeamBlockProps = {
  team: Team;
  align: "left" | "right";
};

function TeamBlock({ team, align }: TeamBlockProps) {
  return (
    <div
      className={`flex flex-1 flex-col ${align === "right" ? "items-end text-right" : "items-start"}`}
    >
      <TeamLogo team={team} size="lg" className="mb-2" />
      <p className="text-sm font-bold">{team.abbreviation}</p>
      <p className="text-[10px] text-[var(--text-muted)]">#{team.seed}</p>
    </div>
  );
}
