import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./AppLayout";
import { ROUTES } from "./Routes";
import CriteriaTilesPage from "./pages/CriteriaTilesPage";
import { CriterionFeedPage } from "./pages/CriterionFeedPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to={ROUTES.TILES} replace />} />
          <Route path={ROUTES.TILES} element={<CriteriaTilesPage />} />
          <Route path={`${ROUTES.FEED}/:id`} element={<CriterionFeedPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
