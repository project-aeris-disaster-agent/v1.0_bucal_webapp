import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { VotePointsProvider } from "./context/VotePointsContext";

const LandingPage = lazy(() =>
  import("./pages/LandingPage").then(({ LandingPage }) => ({
    default: LandingPage,
  })),
);
const LivePage = lazy(() =>
  import("./pages/LivePage").then(({ LivePage }) => ({ default: LivePage })),
);
const MatchesPage = lazy(() =>
  import("./pages/MatchesPage").then(({ MatchesPage }) => ({
    default: MatchesPage,
  })),
);
const StatsPage = lazy(() =>
  import("./pages/StatsPage").then(({ StatsPage }) => ({
    default: StatsPage,
  })),
);
const TicketsPage = lazy(() =>
  import("./pages/TicketsPage").then(({ TicketsPage }) => ({
    default: TicketsPage,
  })),
);

function PageLoader() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-[var(--bg)]"
      aria-busy="true"
      aria-label="Loading page"
    />
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <VotePointsProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/matches" element={<MatchesPage />} />
              <Route path="/live" element={<LivePage />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="/tickets" element={<TicketsPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </VotePointsProvider>
    </ThemeProvider>
  );
}
