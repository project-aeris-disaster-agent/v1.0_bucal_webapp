import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getVotePoints } from "../lib/voteStorage";

type VotePointsContextValue = {
  points: number;
  refreshPoints: () => void;
};

const VotePointsContext = createContext<VotePointsContextValue | null>(null);

export function VotePointsProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState(() => getVotePoints());

  const refreshPoints = useCallback(() => {
    setPoints(getVotePoints());
  }, []);

  useEffect(() => {
    const handleUpdate = () => refreshPoints();

    window.addEventListener("bucal-points-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("bucal-points-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [refreshPoints]);

  const value = useMemo(
    () => ({ points, refreshPoints }),
    [points, refreshPoints],
  );

  return (
    <VotePointsContext.Provider value={value}>
      {children}
    </VotePointsContext.Provider>
  );
}

export function useVotePoints() {
  const ctx = useContext(VotePointsContext);
  if (!ctx) {
    throw new Error("useVotePoints must be used within VotePointsProvider");
  }
  return ctx;
}
