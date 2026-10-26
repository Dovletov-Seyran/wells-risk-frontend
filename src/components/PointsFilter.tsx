import "./PointsFilter.css";
import { FC } from "react";
import { Button, Form } from "react-bootstrap";
import { MAX_WELLS_POINTS, MIN_WELLS_POINTS, formatPoints } from "../modules/criteria";

interface Props {
  value: number;
  setValue: (value: number) => void;
  onSubmit: () => void;
  buttonTitle?: string;
}

// Фильтр плитки: критерии с весом не ниже выбранного
export const PointsFilter: FC<Props> = ({ value, setValue, onSubmit, buttonTitle = "Найти" }) => (
  <div className="pointsFilter">
    <Form.Label className="pointsFilterLabel" htmlFor="minPoints">
      Вес критерия от <span className="pointsFilterValue">{formatPoints(value)}</span> баллов
    </Form.Label>

    <div className="pointsFilterRow">
      <span className="pointsFilterEdge">{MIN_WELLS_POINTS}</span>
      <Form.Range
        id="minPoints"
        className="pointsFilterRange"
        min={MIN_WELLS_POINTS}
        max={MAX_WELLS_POINTS}
        step={0.5}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
      />
      <span className="pointsFilterEdge">+{MAX_WELLS_POINTS}</span>
    </div>

    <Button className="pointsFilterButton" onClick={onSubmit}>
      {buttonTitle}
    </Button>
  </div>
);

export default PointsFilter;
