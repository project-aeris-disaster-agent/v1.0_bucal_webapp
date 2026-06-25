import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, MapPin, Vote } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { LiveBadge, LiveMatchScoreboard } from "./FeaturedMatchCard";
import { MatchVotePanel } from "./MatchVotePanel";
import { TeamLogo } from "../team/TeamLogo";
import { Card } from "../ui/Card";
import { enrichMatch } from "../../lib/data";
import { getStoredVote } from "../../lib/voteStorage";
import type { Match, Team } from "../../data/types";

type CollapsibleLiveMatchCardProps = {
  match: Match;
  defaultExpanded?: boolean;
};

type MiniTeamSideProps = {
  team: Team;
  align: "left" | "right";
  isLeading: boolean;
};

function MiniTeamSide({ team, align, isLeading }: MiniTeamSideProps) {
  const isRight = align === "right";
  const wash = `${team.color}33`;

  return (
    <div
      className={`relative flex min-w-0 flex-1 items-center gap-2 overflow-hidden ${
        isRight ? "justify-end text-right" : ""
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-[120%]"
        style={{
          background: isRight
            ? `linear-gradient(to left, ${wash}, transparent 72%)`
            : `linear-gradient(to right, ${wash}, transparent 72%)`,
          ...(isRight ? { right: 0 } : { left: 0 }),
        }}
      />

      {!isRight && (
        <TeamLogo
          team={team}
          size="md"
          className={
            isLeading
              ? "ring-2 ring-[var(--accent)]/50 ring-offset-1 ring-offset-[var(--bg-elevated)]"
              : ""
          }
        />
      )}

      <div className={`relative min-w-0 ${isRight ? "order-first" : ""}`}>
        <p
          className={`truncate text-sm font-black tracking-tight ${
            isLeading ? "text-[var(--text)]" : "text-[var(--text-muted)]"
          }`}
        >
          {team.abbreviation}
        </p>
        <p className="text-[9px] font-semibold uppercase tracking-wider text-[var(--text-muted)]/70">
          #{team.seed}
        </p>
      </div>

      {isRight && (
        <TeamLogo
          team={team}
          size="md"
          className={
            isLeading
              ? "ring-2 ring-[var(--accent)]/50 ring-offset-1 ring-offset-[var(--bg-elevated)]"
              : ""
          }
        />
      )}
    </div>
  );
}

type CompactScoreProps = {
  home: Team;
  away: Team;
  homeScore: number;
  awayScore: number;
  homeLeading: boolean;
  awayLeading: boolean;
};

function CompactScore({
  home,
  away,
  homeScore,
  awayScore,
  homeLeading,
  awayLeading,
}: CompactScoreProps) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 pb-2 pt-1">
      <MiniTeamSide team={home} align="left" isLeading={homeLeading} />

      <div className="relative flex shrink-0 flex-col items-center">
        <div className="relative overflow-hidden rounded-xl border border-[var(--border)]/70 bg-[var(--bg)]/70 px-3.5 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.12),transparent_75%)]"
          />
          <div className="relative flex items-baseline gap-1.5 tabular-nums">
            <span
              className={`text-2xl font-black leading-none ${
                homeLeading
                  ? "animate-score-glow text-[var(--accent)]"
                  : "text-[var(--text)]/65"
              }`}
            >
              {homeScore}
            </span>
            <span className="text-sm font-black text-[var(--text-muted)]/40">–</span>
            <span
              className={`text-2xl font-black leading-none ${
                awayLeading
                  ? "animate-score-glow text-[var(--accent)]"
                  : "text-[var(--text)]/65"
              }`}
            >
              {awayScore}
            </span>
          </div>
        </div>
        <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.22em] text-red-400/90">
          In Progress
        </p>
      </div>

      <MiniTeamSide team={away} align="right" isLeading={awayLeading} />
    </div>
  );
}

export function CollapsibleLiveMatchCard({
  match,
  defaultExpanded = false,
}: CollapsibleLiveMatchCardProps) {
  const [detailsExpanded, setDetailsExpanded] = useState(defaultExpanded);
  const [voteOpen, setVoteOpen] = useState(false);
  const [hasVote, setHasVote] = useState(() => Boolean(getStoredVote(match.id)));
  const { home, away } = enrichMatch(match);
  const homeScore = match.homeScore ?? 0;
  const awayScore = match.awayScore ?? 0;
  const homeLeading = homeScore > awayScore;
  const awayLeading = awayScore > homeScore;

  useEffect(() => {
    setHasVote(Boolean(getStoredVote(match.id)));
  }, [match.id, voteOpen]);

  function handleVoteToggle() {
    setVoteOpen((prev) => !prev);
  }

  return (
    <Card className="relative animate-live-border overflow-hidden border-red-500/40 p-0">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-500/[0.07] via-transparent to-[var(--accent)]/[0.04]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-full w-full animate-live-shimmer bg-gradient-to-r from-transparent via-red-500/[0.08] to-transparent"
      />

      <div className="relative">
        <button
          type="button"
          onClick={() => setDetailsExpanded((prev) => !prev)}
          aria-expanded={detailsExpanded}
          className="flex w-full items-center justify-between gap-2 px-3 pt-2.5 pb-2 text-left transition-colors hover:bg-[var(--bg)]/20"
        >
          <LiveBadge />
          <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            {match.group} · {match.sport}
          </p>
          <span className="shrink-0 rounded-lg bg-[var(--bg)]/60 p-1 text-[var(--text-muted)]">
            {detailsExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </span>
        </button>

        <AnimatePresence mode="wait" initial={false}>
          {detailsExpanded ? (
            <motion.div
              key="expanded"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-3">
                <div className="mb-3 flex items-center gap-1 text-xs text-[var(--text-muted)]">
                  <MapPin size={12} className="shrink-0 text-red-400/70" />
                  <span>{match.venue}</span>
                </div>
                <LiveMatchScoreboard
                  home={home}
                  away={away}
                  homeScore={homeScore}
                  awayScore={awayScore}
                  isLive
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="compact"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <CompactScore
                home={home}
                away={away}
                homeScore={homeScore}
                awayScore={awayScore}
                homeLeading={homeLeading}
                awayLeading={awayLeading}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="border-t border-[var(--border)]/50">
          {!voteOpen && (
            <div className="px-3 py-2">
              <button
                type="button"
                onClick={handleVoteToggle}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)]/12 py-2.5 text-xs font-black uppercase tracking-[0.14em] text-[var(--accent)] ring-1 ring-[var(--accent)]/30 transition-all hover:bg-[var(--accent)]/18 active:scale-[0.98]"
              >
                <Vote size={14} />
                {hasVote ? "View vote" : "Vote"}
              </button>
            </div>
          )}

          <MatchVotePanel
            matchId={match.id}
            home={home}
            away={away}
            homeScore={homeScore}
            awayScore={awayScore}
            open={voteOpen}
            onClose={() => {
              setVoteOpen(false);
              setHasVote(Boolean(getStoredVote(match.id)));
            }}
            onVoted={() => setHasVote(true)}
          />
        </div>

        {!voteOpen && !detailsExpanded && (
          <div
            aria-hidden
            className="h-0.5 w-full bg-gradient-to-r from-transparent via-red-500/50 to-transparent"
          />
        )}
      </div>
    </Card>
  );
}
