import "./CriteriaTilesPage.css";
import { FC, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { MIN_WELLS_POINTS, WellsCriterion } from "../modules/criteria";
import { CRITERIA_MOCK } from "../modules/mock";
import { PointsFilter } from "../components/PointsFilter";
import { CriterionCard } from "../components/CriterionCard";
import { ROUTES } from "../Routes";
import { AppOutletContext } from "../AppLayout";

const CriteriaTilesPage: FC = () => {
  const [minPoints, setMinPoints] = useState(MIN_WELLS_POINTS);
  const [criteria, setCriteria] = useState<WellsCriterion[]>(CRITERIA_MOCK);
  const { setCriteria: setFeedCriteria } = useOutletContext<AppOutletContext>();
  const navigate = useNavigate();

  // При открытии плитки лента идёт по всему списку критериев
  useEffect(() => {
    setFeedCriteria(CRITERIA_MOCK);
  }, [setFeedCriteria]);

  // Фильтрация mock-объектов по минимальному весу критерия
  const handleSearch = () => {
    const results = CRITERIA_MOCK.filter(
      (criterion) => criterion.wells_points >= minPoints
    );
    setCriteria(results);
    setFeedCriteria(results);
  };

  const handleCardClick = (criterionId: number) => {
    navigate(`${ROUTES.FEED}/${criterionId}`);
  };

  return (
    <div className="tilesPage">
      <header className="tilesHeader">
        <h1 className="tilesTitle">Шкала Уэллса</h1>
        <p className="tilesSubtitle">Справочник клинических критериев ТГВ и ТЭЛА</p>
      </header>

      <PointsFilter
        value={minPoints}
        setValue={(value) => setMinPoints(value)}
        onSubmit={handleSearch}
      />

      {!criteria.length ? (
        <div className="tilesEmpty">Критерии с таким весом не найдены</div>
      ) : (
        <div className="tilesList">
          {criteria.map((criterion) => (
            <CriterionCard
              key={criterion.criterion_id}
              onClick={() => handleCardClick(criterion.criterion_id)}
              {...criterion}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CriteriaTilesPage;
