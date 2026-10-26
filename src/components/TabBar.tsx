import "./TabBar.css";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES, ROUTE_LABELS } from "../Routes";
import { WellsCriterion } from "../modules/criteria";

interface Props {
  criteria: WellsCriterion[];
}

export const TabBar: FC<Props> = ({ criteria }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isFeed = location.pathname.startsWith(ROUTES.FEED);
  const isTiles = location.pathname === ROUTES.TILES;

  const goToTiles = () => navigate(ROUTES.TILES);

  // Лента открывается с первого критерия текущего списка
  const goToFeed = () => {
    const firstId = criteria[0]?.criterion_id;
    if (firstId) {
      navigate(`${ROUTES.FEED}/${firstId}`);
    }
  };

  return (
    <nav className="tabBar">
      <button
        type="button"
        className={`tabBarItem ${isFeed ? "tabBarItemActive" : ""}`}
        onClick={goToFeed}
      >
        <span className="tabBarIcon">▶</span>
        {ROUTE_LABELS.FEED}
      </button>
      {/* Добавление доступно только врачу после входа — в этой лабораторной недоступно */}
      <button type="button" className="tabBarItem" disabled>
        <span className="tabBarIcon">＋</span>
        {ROUTE_LABELS.DRAFT}
      </button>
      <button
        type="button"
        className={`tabBarItem ${isTiles ? "tabBarItemActive" : ""}`}
        onClick={goToTiles}
      >
        <span className="tabBarIcon">▦</span>
        {ROUTE_LABELS.TILES}
      </button>
      {/* Вход появится вместе с авторизацией — в этой лабораторной недоступен */}
      <button type="button" className="tabBarItem" disabled>
        <span className="tabBarIcon">⇥</span>
        {ROUTE_LABELS.LOGIN}
      </button>
    </nav>
  );
};
