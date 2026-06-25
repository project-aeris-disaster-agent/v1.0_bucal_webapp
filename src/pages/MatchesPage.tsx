import { CompactMatchCard } from "../components/match/CompactMatchCard";
import { FeaturedMatchCard } from "../components/match/FeaturedMatchCard";
import { WatchBadge } from "../components/match/WatchBadge";
import { MatchSchedule } from "../components/match/MatchSchedule";
import { TeamFormStrip } from "../components/match/TeamFormStrip";
import { PageShell } from "../components/layout/PageShell";
import { StandingsTable } from "../components/standings/StandingsTable";
import { TicketCTA } from "../components/tickets/TicketCTA";
import { Card } from "../components/ui/Card";
import {
  getFeaturedMatch,
  getLiveMatches,
  getStandingsGroups,
} from "../lib/data";

export function MatchesPage() {
  const liveMatches = getLiveMatches();
  const featured = getFeaturedMatch();
  const groups = getStandingsGroups();
  const previewGroup = groups[0];

  return (
    <PageShell title="Matches" titleAction={<WatchBadge />} liveUi>
      <section className="mb-6">
        {liveMatches.length > 0 ? (
          <>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider">
              Live Now on TIKTOK™
            </h2>
            <FeaturedMatchCard match={liveMatches[0]} />
            {liveMatches.length > 1 && (
              <div className="mt-2 space-y-2">
                {liveMatches.slice(1).map((match) => (
                  <CompactMatchCard key={match.id} match={match} />
                ))}
              </div>
            )}
          </>
        ) : (
          <FeaturedMatchCard match={featured} />
        )}
      </section>

      <section className="mb-6">
        <MatchSchedule />
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wider">
          Group Standings
        </h2>
        <StandingsTable group={previewGroup} compact />
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wider">
          Recent Form
        </h2>
        <div className="space-y-2">
          <TeamFormStrip teamId={featured.homeTeamId} />
          <TeamFormStrip teamId={featured.awayTeamId} />
        </div>
      </section>

      <section>
        <Card className="flex flex-col items-center gap-4 bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--border)]/30 py-6 text-center">
          <p className="text-sm text-[var(--text-muted)]">
            Catch every BUCAL game live
          </p>
          <TicketCTA fullWidth className="max-w-xs" />
          <p className="text-[10px] text-[var(--text-muted)]">
            Powered by ReQuest Tickets
          </p>
        </Card>
      </section>
    </PageShell>
  );
}
