import { useEffect } from "react";
import { Check, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { VOTE_REWARD_POINTS } from "../../lib/voteStorage";

type VoteSuccessFxProps = {
  teamLabel: string;
  onDone: () => void;
};

const particles = Array.from({ length: 12 }, (_, index) => index);

export function VoteSuccessFx({ teamLabel, onDone }: VoteSuccessFxProps) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, 1600);
    return () => window.clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden rounded-2xl bg-[var(--bg)]/85 backdrop-blur-sm"
    >
      {particles.map((particle) => (
        <motion.span
          key={particle}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0.4],
            x: Math.cos((particle / 12) * Math.PI * 2) * 72,
            y: Math.sin((particle / 12) * Math.PI * 2) * 72,
          }}
          transition={{ duration: 0.75, delay: 0.05 + particle * 0.02 }}
          className="pointer-events-none absolute h-2 w-2 rounded-full bg-[var(--accent)]"
        />
      ))}

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        className="relative flex flex-col items-center px-6 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.1 }}
          className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)] shadow-[0_0_40px_rgba(163,255,0,0.45)]"
        >
          <Check size={32} className="text-[var(--accent-foreground)]" strokeWidth={3} />
        </motion.div>

        <motion.p
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg font-black tracking-tight"
        >
          Vote confirmed!
        </motion.p>

        <motion.p
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.28 }}
          className="mt-1 text-sm text-[var(--text-muted)]"
        >
          You picked <span className="font-bold text-[var(--text)]">{teamLabel}</span> to win
        </motion.p>

        <motion.div
          initial={{ y: 12, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 20, delay: 0.38 }}
          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)]/15 px-3 py-1.5 ring-1 ring-[var(--accent)]/35"
        >
          <Sparkles size={14} className="text-[var(--accent)]" />
          <span className="text-sm font-black text-[var(--accent)]">
            +{VOTE_REWARD_POINTS} pts if correct
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
