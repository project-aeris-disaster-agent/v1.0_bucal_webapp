import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { VotePointsProvider } from "./context/VotePointsContext";
import { LandingPage } from "./pages/LandingPage";
import { LivePage } from "./pages/LivePage";
import { MatchesPage } from "./pages/MatchesPage";
import { StatsPage } from "./pages/StatsPage";
import { TicketsPage } from "./pages/TicketsPage";

export default function App() {
  return (
    <ThemeProvider>
      <VotePointsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="/live" element={<LivePage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
        </Routes>
      </BrowserRouter>
      </VotePointsProvider>
    </ThemeProvider>
  );
}
