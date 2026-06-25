import { useEffect, useMemo, useRef, useState } from "react";
import { Sparkles, Trophy, User, Vote } from "lucide-react";
import { useVotePoints } from "../../context/VotePointsContext";
import { getVoteSummary, VOTE_REWARD_POINTS } from "../../lib/voteStorage";

export function ProfileMenu() {
  const { points } = useVotePoints();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const summary = useMemo(() => getVoteSummary(), [points]);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative flex items-center gap-2">
      <div
        aria-label={`${points} points`}
        className="inline-flex items-center gap-1 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2.5 py-1 text-[11px] font-black tabular-nums text-[var(--accent)]"
      >
        <Sparkles size={12} />
        {points.toLocaleString()} pts
      </div>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open profile"
        aria-expanded={open}
        aria-haspopup="dialog"
        className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
          open
            ? "border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)]"
            : "border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]"
        }`}
      >
        <User size={18} />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Profile"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-72 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] shadow-[var(--card-shadow)]"
        >
          <div className="border-b border-[var(--border)] bg-[var(--accent)]/8 px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)]/20 ring-2 ring-[var(--accent)]/35">
                <User size={22} className="text-[var(--accent)]" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">BUCAL Fan</p>
                <p className="text-[11px] text-[var(--text-muted)]">
                  Vote on live games to earn points
                </p>
              </div>
            </div>
          </div>

          <div className="px-4 py-3">
            <div className="rounded-xl border border-[var(--accent)]/25 bg-[var(--accent)]/8 px-3 py-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                Your points
              </p>
              <p className="mt-1 flex items-center gap-2 text-2xl font-black tabular-nums text-[var(--accent)]">
                <Trophy size={20} />
                {points.toLocaleString()}
              </p>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <StatPill label="Votes" value={summary.total} />
              <StatPill label="Settled" value={summary.resolved} />
              <StatPill label="Won" value={summary.won} />
            </div>

            <p className="mt-3 flex items-start gap-2 text-[11px] leading-relaxed text-[var(--text-muted)]">
              <Vote size={14} className="mt-0.5 shrink-0 text-[var(--accent)]" />
              Pick the winner on live match cards. Earn {VOTE_REWARD_POINTS} pts for
              each correct vote when the game ends.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

type StatPillProps = {
  label: string;
  value: number;
};

function StatPill({ label, value }: StatPillProps) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)]/50 px-2 py-2 text-center">
      <p className="text-sm font-black tabular-nums">{value}</p>
      <p className="text-[9px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
        {label}
      </p>
    </div>
  );
}
