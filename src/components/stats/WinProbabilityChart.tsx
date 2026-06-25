import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "../ui/Card";
import {
  enrichMatch,
  getFeaturedMatch,
  getTeamPpg,
  getWinProbabilityTrend,
} from "../../lib/data";

export function WinProbabilityChart() {
  const data = getWinProbabilityTrend();
  const { home, away } = enrichMatch(getFeaturedMatch());

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold">Win Probability</h3>
        <div className="flex gap-2 text-[10px]">
          {["1W", "1M", "ALL"].map((label) => (
            <span
              key={label}
              className={`rounded-md px-2 py-1 ${
                label === "1W"
                  ? "bg-[var(--accent)] text-[var(--accent-foreground)] font-semibold"
                  : "text-[var(--text-muted)]"
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className="mb-3 flex gap-4 text-xs">
        <span className="flex items-center gap-1">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: home.color }}
          />
          {home.abbreviation}
        </span>
        <span className="flex items-center gap-1">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: away.color }}
          />
          {away.abbreviation}
        </span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="label" tick={{ fill: "var(--text-muted)", fontSize: 11 }} />
          <YAxis domain={[30, 70]} tick={{ fill: "var(--text-muted)", fontSize: 11 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              borderRadius: 8,
            }}
          />
          <Line
            type="monotone"
            dataKey="home"
            stroke={home.color}
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="away"
            stroke={away.color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function TeamPpgChart() {
  const data = getTeamPpg().map((entry) => ({
    name: entry.team.abbreviation,
    ppg: entry.ppg,
    fill: entry.team.color,
  }));

  return (
    <Card>
      <h3 className="mb-4 text-sm font-bold">Points Per Game</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical" margin={{ left: 0, right: 16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
          <XAxis type="number" tick={{ fill: "var(--text-muted)", fontSize: 11 }} />
          <YAxis
            type="category"
            dataKey="name"
            width={48}
            tick={{ fill: "var(--text-muted)", fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              borderRadius: 8,
            }}
          />
          <Legend />
          <Bar dataKey="ppg" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
