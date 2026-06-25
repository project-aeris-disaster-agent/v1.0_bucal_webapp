import { lazy, Suspense, useState } from "react";
import { PageShell } from "../components/layout/PageShell";
import { PlayoffBracket } from "../components/standings/PlayoffBracket";
import { StandingsTable } from "../components/standings/StandingsTable";
import { FeaturedPlayerCard } from "../components/stats/FeaturedPlayerCard";
import { PlayerLeaders } from "../components/stats/PlayerLeaders";
import { getStandingsGroups } from "../lib/data";

const AnalyticsCharts = lazy(() =>
  import("../components/stats/WinProbabilityChart").then((module) => ({
    default: function AnalyticsCharts() {
      return (
        <div className="space-y-4">
          <module.WinProbabilityChart />
          <module.TeamPpgChart />
        </div>
      );
    },
  })),
);

const tabs = ["Standings", "Players", "Analytics"] as const;
type Tab = (typeof tabs)[number];

export function StatsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Standings");
  const groups = getStandingsGroups();
  const [activeGroup, setActiveGroup] = useState(groups[0]);

  return (
    <PageShell title="Stats & Analytics">
      <section className="mb-6">
        <FeaturedPlayerCard />
      </section>

      <div className="mb-4 flex gap-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
              activeTab === tab
                ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                : "border border-[var(--border)] text-[var(--text-muted)]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Standings" && (
        <>
          <div className="mb-3 flex gap-2">
            {groups.map((group) => (
              <button
                key={group}
                type="button"
                onClick={() => setActiveGroup(group)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                  activeGroup === group
                    ? "bg-[var(--border)] text-[var(--text)]"
                    : "text-[var(--text-muted)]"
                }`}
              >
                {group}
              </button>
            ))}
          </div>
          <PlayoffBracket group={activeGroup} />
          <StandingsTable group={activeGroup} />
        </>
      )}

      {activeTab === "Players" && (
        <div className="space-y-4">
          <PlayerLeaders stat="pointsPerGame" />
          <PlayerLeaders stat="reboundsPerGame" />
          <PlayerLeaders stat="assistsPerGame" />
        </div>
      )}

      {activeTab === "Analytics" && (
        <Suspense
          fallback={
            <div className="rounded-2xl border border-[var(--border)] p-8 text-center text-sm text-[var(--text-muted)]">
              Loading charts…
            </div>
          }
        >
          <AnalyticsCharts />
        </Suspense>
      )}
    </PageShell>
  );
}
