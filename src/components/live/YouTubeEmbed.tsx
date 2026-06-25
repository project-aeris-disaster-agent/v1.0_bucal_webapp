import { Radio } from "lucide-react";
import { YOUTUBE_STREAM_URL } from "../../config/constants";
import { Card } from "../ui/Card";
import { TicketCTA } from "../tickets/TicketCTA";

type YouTubeEmbedProps = {
  embedUrl?: string;
  title?: string;
  borderless?: boolean;
};

export function YouTubeEmbed({
  embedUrl,
  title = "BUCAL Live Stream",
  borderless = false,
}: YouTubeEmbedProps = {}) {
  const src = embedUrl ?? YOUTUBE_STREAM_URL;

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

  const player = (
    <div className="relative w-full pt-[56.25%]">
      <iframe
        title={title}
        src={src}
        className="absolute inset-0 h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );

  if (borderless) {
    return (
      <div className="overflow-hidden rounded-2xl">{player}</div>
    );
  }

  return <Card className="overflow-hidden p-0">{player}</Card>;
}
