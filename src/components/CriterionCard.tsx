import "./CriterionCard.css";
import { FC } from "react";
import { Card } from "react-bootstrap";
import { formatPoints } from "../modules/criteria";

// Изображение по умолчанию лежит в public/
const defaultImage = "/DefaultImage.jpg";

interface Props {
  criterion_name: string;
  wells_points: number;
  image_url: string;
  like_count: number;
  onClick: () => void;
}

export const CriterionCard: FC<Props> = ({
  criterion_name,
  wells_points,
  image_url,
  like_count,
  onClick,
}) => (
  <Card className="criterionCard" onClick={onClick}>
    <Card.Img
      className="criterionCardImage"
      variant="top"
      src={image_url || defaultImage}
      alt={criterion_name}
    />
    <Card.Body className="criterionCardBody">
      <span className="criterionCardPoints">{formatPoints(wells_points)}</span>
      <Card.Title className="criterionCardName">{criterion_name}</Card.Title>
      <Card.Text className="criterionCardLikes">♥ {like_count}</Card.Text>
    </Card.Body>
  </Card>
);

export default CriterionCard;
