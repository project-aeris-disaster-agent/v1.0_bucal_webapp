import { useEffect, useState } from "react";
import { BANNER_AD_SRC, BANNER_AD_STATIC_SRC } from "../../config/constants";
import { useMobilePerformance } from "../../lib/useMobilePerformance";

export function BannerAd() {
  const { reduceGpuEffects } = useMobilePerformance();
  const [paused, setPaused] = useState(() => document.hidden);

  useEffect(() => {
    const handleVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const showAnimated = !reduceGpuEffects && !paused;
  const src = showAnimated ? BANNER_AD_SRC : BANNER_AD_STATIC_SRC;

  return (
    <div
      className="mx-auto w-full max-w-lg bg-transparent"
      style={{ aspectRatio: "728 / 90" }}
    >
      <img
        key={src}
        src={src}
        alt="Advertisement"
        className="block h-full w-full object-contain object-center"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
