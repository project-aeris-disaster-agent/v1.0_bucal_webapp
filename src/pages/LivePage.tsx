import { CollapsibleLiveMatchCard } from "../components/match/CollapsibleLiveMatchCard";
import { CommunityChat } from "../components/live/CommunityChat";
import { YouTubeEmbed } from "../components/live/YouTubeEmbed";
import { PageShell } from "../components/layout/PageShell";
import { Badge } from "../components/ui/Badge";
import { getLiveMatch } from "../lib/data";

export function LivePage() {
  const liveMatch = getLiveMatch();

  return (
    <PageShell title="Watch Live" liveUi>
      <div className="mb-4 flex items-center gap-2">
        <Badge variant="live">Live</Badge>
        <span className="text-sm text-[var(--text-muted)]">
          BUCAL Season Broadcast
        </span>
      </div>

      <YouTubeEmbed />

      {liveMatch && (
        <section className="mt-4">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wider">
            Live Scoreboard
          </h2>
          <CollapsibleLiveMatchCard match={liveMatch} />
        </section>
      )}

      <section className="mt-6">
        <CommunityChat />
      </section>
    </PageShell>
  );
}
