import { Play, Radio } from "lucide-react";
import { useState } from "react";
import { YOUTUBE_STREAM_URL } from "../../config/constants";
import { Card } from "../ui/Card";
import { TicketCTA } from "../tickets/TicketCTA";

type YouTubeEmbedProps = {
  embedUrl?: string;
  title?: string;
  borderless?: boolean;
};

function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:embed\/|v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return match?.[1] ?? null;
}

export function YouTubeEmbed({
  embedUrl,
  title = "BUCAL Live Stream",
  borderless = false,
}: YouTubeEmbedProps = {}) {
  const src = embedUrl ?? YOUTUBE_STREAM_URL;
  const [playing, setPlaying] = useState(false);

  if (!src) {
    return (
      <Card className="flex flex-col items-center py-12 text-center">
        <Radio size={40} className="mb-4 text-[var(--text-muted)]" />
        <h3 className="text-lg font-bold">Stream starts soon</h3>
        <p className="mt-2 max-w-xs text-sm text-[var(--text-muted)]">
          The live broadcast will appear here on game day. Get your seats early.
        </p>
        <div className="mt-6 w-full max-w-xs">
          <TicketCTA fullWidth />
        </div>
      </Card>
    );
  }

  const videoId = extractYouTubeId(src);
  const posterUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;

  const player = playing ? (
    <div className="relative w-full pt-[56.25%]">
      <iframe
        title={title}
        src={`${src}${src.includes("?") ? "&" : "?"}autoplay=1`}
        className="absolute inset-0 h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  ) : (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block w-full overflow-hidden rounded-2xl pt-[56.25%] text-left"
      aria-label={`Play ${title}`}
    >
      {posterUrl ? (
        <img
          src={posterUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="absolute inset-0 bg-[var(--border)]" />
      )}
      <span className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/45" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform group-active:scale-95">
          <Play size={28} className="ml-1" fill="currentColor" />
        </span>
      </span>
    </button>
  );

  if (borderless) {
    return <div className="overflow-hidden rounded-2xl">{player}</div>;
  }

  return <Card className="overflow-hidden p-0">{player}</Card>;
}
