import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Team } from "../../data/types";
import {
  getStoredVote,
  saveVote,
  type VoteChoice,
  VOTE_REWARD_POINTS,
} from "../../lib/voteStorage";
import { VoteSuccessFx } from "./VoteSuccessFx";

type MatchVotePanelProps = {
  matchId: string;
  home: Team;
  away: Team;
  homeScore: number;
  awayScore: number;
  open: boolean;
  onClose: () => void;
  onVoted?: () => void;
};

function getVoteSplit(homeScore: number, awayScore: number) {
  const total = Math.max(homeScore + awayScore, 1);
  const yes = Math.round((homeScore / total) * 100);
  return { yes, no: 100 - yes };
}

type VoteOptionButtonProps = {
  label: string;
  sublabel: string;
  percent: number;
  selected: boolean;
  accent: "yes" | "no";
  onClick: () => void;
};

function VoteOptionButton({
  label,
  sublabel,
  percent,
  selected,
  accent,
  onClick,
}: VoteOptionButtonProps) {
  const isYes = accent === "yes";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl border p-3 text-left transition-all active:scale-[0.98] ${
        selected
          ? isYes
            ? "border-[var(--accent)]/60 ring-2 ring-[var(--accent)]/30"
            : "border-red-400/60 ring-2 ring-red-400/25"
          : "border-[var(--border)] hover:border-[var(--text-muted)]/40"
      }`}
    >
      <div
        aria-hidden
        className={`absolute inset-y-0 left-0 ${
          isYes ? "bg-[var(--accent)]/10" : "bg-red-500/10"
        }`}
        style={{ width: `${percent}%` }}
      />
      <div className="relative">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-sm font-black uppercase tracking-wide">{label}</span>
          <span
            className={`tabular-nums text-xl font-black ${
              isYes ? "text-[var(--accent)]" : "text-red-400"
            }`}
          >
            {percent}%
          </span>
        </div>
        <p className="mt-0.5 truncate text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          {sublabel}
        </p>
      </div>
    </button>
  );
}

export function MatchVotePanel({
  matchId,
  home,
  away,
  homeScore,
  awayScore,
  open,
  onClose,
  onVoted,
}: MatchVotePanelProps) {
  const [storedVote, setStoredVote] = useState(() => getStoredVote(matchId));
  const [pendingChoice, setPendingChoice] = useState<VoteChoice | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const split = getVoteSplit(homeScore, awayScore);

  useEffect(() => {
    if (!open) {
      setPendingChoice(null);
      setShowSuccess(false);
    }
  }, [open]);

  function handleConfirm() {
    if (!pendingChoice) return;
    saveVote(matchId, pendingChoice);
    setStoredVote(getStoredVote(matchId));
    setShowSuccess(true);
  }

  function handleSuccessDone() {
    setShowSuccess(false);
    setPendingChoice(null);
    onVoted?.();
    onClose();
  }

  const pickedTeam =
    storedVote?.choice === "yes" ? home.abbreviation : away.abbreviation;

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="vote-panel"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          className="relative overflow-hidden border-t border-[var(--border)]/60"
        >
          <div className="relative px-3 py-3">
            {storedVote && !showSuccess ? (
              <div className="rounded-xl border border-[var(--accent)]/25 bg-[var(--accent)]/8 px-3 py-3 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                  Vote locked
                </p>
                <p className="mt-1 text-sm font-black">
                  You voted{" "}
                  <span className="text-[var(--accent)]">{pickedTeam}</span> to win
                </p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Earn up to {VOTE_REWARD_POINTS} pts when the game ends
                </p>
              </div>
            ) : (
              <>
                <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Who wins?
                </p>

                <div className="flex gap-2">
                  <VoteOptionButton
                    label="Yes"
                    sublabel={`${home.abbreviation} wins`}
                    percent={split.yes}
                    selected={pendingChoice === "yes"}
                    accent="yes"
                    onClick={() => setPendingChoice("yes")}
                  />
                  <VoteOptionButton
                    label="No"
                    sublabel={`${away.abbreviation} wins`}
                    percent={split.no}
                    selected={pendingChoice === "no"}
                    accent="no"
                    onClick={() => setPendingChoice("no")}
                  />
                </div>

                <AnimatePresence initial={false}>
                  {pendingChoice && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 p-3">
                        <p className="text-center text-xs text-[var(--text-muted)]">
                          Confirm your vote for{" "}
                          <span className="font-bold text-[var(--text)]">
                            {pendingChoice === "yes"
                              ? `${home.abbreviation} to win`
                              : `${away.abbreviation} to win`}
                          </span>
                          ?
                        </p>
                        <p className="mt-1 text-center text-[10px] text-[var(--text-muted)]">
                          Win {VOTE_REWARD_POINTS} pts if your pick is correct
                        </p>
                        <div className="mt-3 flex gap-2">
                          <button
                            type="button"
                            onClick={() => setPendingChoice(null)}
                            className="flex-1 rounded-lg border border-[var(--border)] py-2 text-xs font-bold uppercase tracking-wide text-[var(--text-muted)] transition-colors hover:bg-[var(--bg)]"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleConfirm}
                            className="flex-1 rounded-lg bg-[var(--accent)] py-2 text-xs font-bold uppercase tracking-wide text-[var(--accent-foreground)] transition-transform active:scale-[0.98]"
                          >
                            Confirm vote
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}

            {!showSuccess && (
              <button
                type="button"
                onClick={onClose}
                className="mt-2 w-full py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
              >
                Close
              </button>
            )}
          </div>

          <AnimatePresence>
            {showSuccess && (
              <VoteSuccessFx
                teamLabel={
                  pendingChoice === "yes" ? `${home.abbreviation} wins` : `${away.abbreviation} wins`
                }
                onDone={handleSuccessDone}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
