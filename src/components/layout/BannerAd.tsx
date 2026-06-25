import { BANNER_AD_SRC } from "../../config/constants";

export function BannerAd() {
  return (
    <div
      className="mx-auto w-full max-w-lg bg-transparent"
      style={{ aspectRatio: "728 / 90" }}
    >
      <img
        src={BANNER_AD_SRC}
        alt="Advertisement"
        className="block h-full w-full object-contain object-center"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
