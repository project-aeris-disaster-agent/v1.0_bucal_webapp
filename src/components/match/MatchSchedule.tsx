import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { enrichMatch, getMatchDates, getMatchesByDate } from "../../lib/data";

export function MatchSchedule() {
  const dates = getMatchDates();
  const [index, setIndex] = useState(() =>
    Math.max(
      0,
      dates.findIndex((d) => d === new Date().toISOString().slice(0, 10)),
    ),
  );

  const selectedDate = dates[index] ?? dates[0];
  const dayMatches = useMemo(
    () => getMatchesByDate(selectedDate),
    [selectedDate],
  );

  const label = new Date(selectedDate).toLocaleDateString("en-PH", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wider">
          Schedule
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={index <= 0}
            onClick={() => setIndex((i) => i - 1)}
            className="rounded-lg border border-[var(--border)] p-1 disabled:opacity-30"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-xs font-medium">{label}</span>
          <button
            type="button"
            disabled={index >= dates.length - 1}
            onClick={() => setIndex((i) => i + 1)}
            className="rounded-lg border border-[var(--border)] p-1 disabled:opacity-30"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {dayMatches.length === 0 ? (
          <Card>
            <p className="text-center text-sm text-[var(--text-muted)]">
              No matches scheduled for this date.
            </p>
          </Card>
        ) : (
          dayMatches.map((match) => {
            const { home, away } = enrichMatch(match);
            return (
              <Card key={match.id} className="py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">
                      {home.abbreviation} vs {away.abbreviation}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {match.group} ·{" "}
                      {new Date(match.scheduledAt).toLocaleTimeString("en-PH", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <Badge variant={match.status === "live" ? "live" : "default"}>
                    {match.status}
                  </Badge>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </section>
  );
}
