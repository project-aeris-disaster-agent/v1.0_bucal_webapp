import { useState } from "react";
import { MapPin } from "lucide-react";
import { PageShell } from "../components/layout/PageShell";
import { SeatMap } from "../components/tickets/SeatMap";
import { TicketCTA } from "../components/tickets/TicketCTA";
import { VenueSelect } from "../components/tickets/VenueSelect";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { venues } from "../data/venues";
import { enrichMatch, getUpcomingMatches } from "../lib/data";

export function TicketsPage() {
  const upcoming = getUpcomingMatches();
  const [selectedVenueId, setSelectedVenueId] = useState(venues[0].id);
  const selectedVenue =
    venues.find((v) => v.id === selectedVenueId) ?? venues[0];

  return (
    <PageShell
      title="Tickets"
      titleAction={
        <VenueSelect
          compact
          venues={venues}
          value={selectedVenueId}
          onChange={setSelectedVenueId}
        />
      }
    >
      <div className="mb-6 flex flex-col items-center">
        <Card className="flex w-full flex-col items-center gap-6 py-6">
          <div className="w-full max-w-xs space-y-6">
            <SeatMap venue={selectedVenue} />
            <TicketCTA fullWidth />
          </div>
        </Card>
      </div>

      <section>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wider">
          Upcoming Games
        </h2>
        <div className="space-y-2">
          {upcoming.map((match) => {
            const { home, away } = enrichMatch(match);
            return (
              <Card key={match.id} className="py-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">
                      {home.abbreviation} vs {away.abbreviation}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-[var(--text-muted)]">
                      <MapPin size={12} />
                      {match.venue}
                    </p>
                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                      {new Date(match.scheduledAt).toLocaleString("en-PH", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <Badge variant={match.status === "live" ? "live" : "default"}>
                    {match.status}
                  </Badge>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
