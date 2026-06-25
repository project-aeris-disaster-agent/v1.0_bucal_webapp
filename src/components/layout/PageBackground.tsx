import { BUCAL_BACKGROUND_SRC } from "../../config/constants";
import { AnimatedShaderBackground } from "../ui/animated-shader-background";

export function PageBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[var(--bg)]"
    >
      <AnimatedShaderBackground />
      <img
        src={BUCAL_BACKGROUND_SRC}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center opacity-35 mix-blend-soft-light"
      />
      <div className="absolute inset-0 bg-[var(--bg)]/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--bg)_90%)]" />
    </div>
  );
}
