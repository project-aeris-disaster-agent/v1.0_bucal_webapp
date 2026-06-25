import { Link } from "react-router-dom";
import { ChevronRight, Radio } from "lucide-react";
import {
  APP_NAME,
  BUCAL_LOGO_SRC,
  LANDING_YOUTUBE_EMBED_URL,
} from "../config/constants";
import { YouTubeEmbed } from "../components/live/YouTubeEmbed";
import { CompactMatchCard } from "../components/match/CompactMatchCard";
import { FeaturedMatchCard } from "../components/match/FeaturedMatchCard";
import { TicketCTA } from "../components/tickets/TicketCTA";
import { BottomNav } from "../components/layout/BottomNav";
import { Header } from "../components/layout/Header";
import { PageBackground } from "../components/layout/PageBackground";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import {
  enrichMatch,
  getFeaturedMatch,
  getOtherLiveMatches,
  getUpcomingMatches,
} from "../lib/data";

export function LandingPage() {
  const featured = getFeaturedMatch();
  const otherLive = getOtherLiveMatches(featured.id);
  const upcoming = getUpcomingMatches(3).filter(
    (m) => m.id !== featured.id && m.status !== "live",
  );

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[var(--bg)] pb-bottom-chrome"
      data-live-ui="true"
    >
      <PageBackground />

      <div className="relative z-10">
        <Header />

        <section className="relative px-4 pb-6 pt-6">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_top,rgba(163,255,0,0.12),transparent_65%)]"
          />

          <div className="relative mx-auto max-w-lg text-center">
            <img
              src={BUCAL_LOGO_SRC}
              alt={APP_NAME}
              className="mx-auto mb-4 h-[9.8rem] w-auto drop-shadow-[0_0_24px_rgba(163,255,0,0.25)]"
            />
            <p className="text-xs text-white sm:text-sm">
              The Bicol Universities and Colleges Athletic League Webapp.
            </p>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Link
                to="/matches"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-black uppercase tracking-wide text-[var(--accent-foreground)] transition-transform hover:brightness-110 active:scale-[0.98]"
              >
                Upcoming Matches
                <ChevronRight size={16} />
              </Link>
              <Link
                to="/live"
                className="watch-live-btn inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold uppercase tracking-wide transition-transform hover:brightness-110 active:scale-[0.98]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-full w-full animate-live-shimmer bg-gradient-to-r from-transparent via-red-500/25 to-transparent"
                />
                <span className="relative z-10 inline-flex items-center gap-2">
                  <span className="relative inline-flex h-2 w-2 shrink-0 animate-live-dot rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                  <Radio size={16} className="text-red-400" />
                  Watch Live
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-lg px-4 pb-4">
          <YouTubeEmbed
            embedUrl={LANDING_YOUTUBE_EMBED_URL}
            title="BUCAL League"
            borderless
          />
        </section>

        <section className="mx-auto max-w-lg px-4 pb-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider">
              {featured.status === "live" ? "Live Now" : "Featured"}
            </h2>
            <Link
              to="/matches"
              className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--accent)]"
            >
              All →
            </Link>
          </div>
          <FeaturedMatchCard match={featured} />
          {otherLive.length > 0 && (
            <div className="mt-2 space-y-2">
              {otherLive.map((match) => (
                <CompactMatchCard key={match.id} match={match} />
              ))}
            </div>
          )}
        </section>

        {upcoming.length > 0 && (
          <section className="mx-auto max-w-lg px-4 pb-4">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider">
              Up Next
            </h2>
            <div className="space-y-2">
              {upcoming.map((match) => {
                const { home, away } = enrichMatch(match);
                return (
                  <Link key={match.id} to="/matches">
                    <Card className="py-3 transition-colors hover:border-[var(--accent)]/30">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold">
                            {home.abbreviation} vs {away.abbreviation}
                          </p>
                          <p className="text-xs text-[var(--text-muted)]">
                            {new Date(match.scheduledAt).toLocaleString(
                              "en-PH",
                              { dateStyle: "short", timeStyle: "short" },
                            )}
                          </p>
                        </div>
                        <Badge>{match.status}</Badge>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <section className="mx-auto max-w-lg px-4 pb-8">
          <TicketCTA fullWidth />
        </section>

        <BottomNav />
      </div>
    </div>
  );
}
