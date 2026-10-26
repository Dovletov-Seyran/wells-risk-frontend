import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import { WellsCriterion } from "./modules/criteria";
import { CRITERIA_MOCK } from "./modules/mock";
import { TabBar } from "./components/TabBar";
import "./MobileApp.css";

// Общий список критериев: его заполняет плитка после фильтрации,
// а лента берёт из него порядок для кнопки «Следующий»
export interface AppOutletContext {
  criteria: WellsCriterion[];
  setCriteria: (criteria: WellsCriterion[]) => void;
}

export const AppLayout: FC = () => {
  const [criteria, setCriteria] = useState<WellsCriterion[]>(CRITERIA_MOCK);

  return (
    <div className="appShell">
      <main className="appContent">
        <Outlet context={{ criteria, setCriteria }} />
      </main>
      <TabBar criteria={criteria} />
    </div>
  );
};
