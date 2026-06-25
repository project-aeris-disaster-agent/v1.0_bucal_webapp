import { useEffect, useState } from "react";

type MobilePerformanceState = {
  /** Touch-first device (phones/tablets). */
  isCoarsePointer: boolean;
  /** User or OS prefers reduced motion. */
  preferReducedMotion: boolean;
  /** Skip GPU-heavy effects (shader, heavy compositing). */
  reduceGpuEffects: boolean;
};

function getInitialState(): MobilePerformanceState {
  if (typeof window === "undefined") {
    return {
      isCoarsePointer: false,
      preferReducedMotion: false,
      reduceGpuEffects: false,
    };
  }

  const isCoarsePointer = window.matchMedia(
    "(hover: none) and (pointer: coarse)",
  ).matches;
  const preferReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  return {
    isCoarsePointer,
    preferReducedMotion,
    reduceGpuEffects: isCoarsePointer || preferReducedMotion,
  };
}

export function useMobilePerformance(): MobilePerformanceState {
  const [state, setState] = useState(getInitialState);

  useEffect(() => {
    const coarseQuery = window.matchMedia("(hover: none) and (pointer: coarse)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      const isCoarsePointer = coarseQuery.matches;
      const preferReducedMotion = motionQuery.matches;
      setState({
        isCoarsePointer,
        preferReducedMotion,
        reduceGpuEffects: isCoarsePointer || preferReducedMotion,
      });
    };

    sync();
    coarseQuery.addEventListener("change", sync);
    motionQuery.addEventListener("change", sync);

    return () => {
      coarseQuery.removeEventListener("change", sync);
      motionQuery.removeEventListener("change", sync);
    };
  }, []);

  return state;
}
