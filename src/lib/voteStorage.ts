const POINTS_KEY = "bucal-vote-points";
const VOTE_PREFIX = "bucal-vote-";

export type VoteChoice = "yes" | "no";

export type StoredVote = {
  choice: VoteChoice;
  matchId: string;
  lockedAt: string;
  resolved?: boolean;
  won?: boolean;
};

export const VOTE_REWARD_POINTS = 50;

export function getVotePoints(): number {
  try {
    return Number(localStorage.getItem(POINTS_KEY) ?? 0) || 0;
  } catch {
    return 0;
  }
}

export type VoteSummary = {
  total: number;
  resolved: number;
  won: number;
};

export function getVoteSummary(): VoteSummary {
  const summary: VoteSummary = { total: 0, resolved: 0, won: 0 };

  try {
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (!key?.startsWith(VOTE_PREFIX)) continue;

      const raw = localStorage.getItem(key);
      if (!raw) continue;

      const vote = JSON.parse(raw) as StoredVote;
      summary.total += 1;
      if (vote.resolved) {
        summary.resolved += 1;
        if (vote.won) summary.won += 1;
      }
    }
  } catch {
    return summary;
  }

  return summary;
}

function notifyPointsUpdated() {
  window.dispatchEvent(new Event("bucal-points-updated"));
}

export function getStoredVote(matchId: string): StoredVote | null {
  try {
    const raw = localStorage.getItem(`${VOTE_PREFIX}${matchId}`);
    return raw ? (JSON.parse(raw) as StoredVote) : null;
  } catch {
    return null;
  }
}

export function saveVote(matchId: string, choice: VoteChoice): StoredVote {
  const vote: StoredVote = {
    choice,
    matchId,
    lockedAt: new Date().toISOString(),
  };
  localStorage.setItem(`${VOTE_PREFIX}${matchId}`, JSON.stringify(vote));
  return vote;
}

export function addPendingPoints(amount: number): number {
  const next = getVotePoints() + amount;
  localStorage.setItem(POINTS_KEY, String(next));
  notifyPointsUpdated();
  return next;
}

export function resolveVote(
  matchId: string,
  homeWon: boolean,
): { awarded: number; won: boolean } | null {
  const vote = getStoredVote(matchId);
  if (!vote || vote.resolved) return null;

  const won =
    (vote.choice === "yes" && homeWon) || (vote.choice === "no" && !homeWon);
  const updated: StoredVote = { ...vote, resolved: true, won };
  localStorage.setItem(`${VOTE_PREFIX}${matchId}`, JSON.stringify(updated));

  if (won) {
    addPendingPoints(VOTE_REWARD_POINTS);
    return { awarded: VOTE_REWARD_POINTS, won: true };
  }

  return { awarded: 0, won: false };
}
