import { lazy, Suspense } from "react";
import { BUCAL_BACKGROUND_MOBILE_SRC, BUCAL_BACKGROUND_SRC } from "../../config/constants";
import { useMobilePerformance } from "../../lib/useMobilePerformance";

const AnimatedShaderBackground = lazy(
  () => import("../ui/animated-shader-background"),
);

export function PageBackground() {
  const { isCoarsePointer } = useMobilePerformance();
  const showBackgroundImage = !isCoarsePointer;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[var(--bg)]"
    >
      <Suspense fallback={null}>
        <AnimatedShaderBackground />
      </Suspense>

      {showBackgroundImage ? (
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet={BUCAL_BACKGROUND_SRC}
            type="image/webp"
          />
          <img
            src={BUCAL_BACKGROUND_MOBILE_SRC}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center opacity-35 md:opacity-40"
            decoding="async"
            fetchPriority="low"
          />
        </picture>
      ) : null}

      <div className="absolute inset-0 bg-[var(--bg)]/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--bg)_90%)]" />
    </div>
  );
}
