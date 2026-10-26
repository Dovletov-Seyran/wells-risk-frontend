import "./CriterionFeedPage.css";
import { FC, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { WellsCriterion, formatPoints } from "../modules/criteria";
import { CRITERIA_MOCK } from "../modules/mock";
import { ROUTES } from "../Routes";
import { AppOutletContext } from "../AppLayout";

// Изображение и видео по умолчанию лежат в public/
const defaultImage = "/DefaultImage.jpg";
const defaultVideo = "/DefaultVideo.mp4";

export const CriterionFeedPage: FC = () => {
  const [criterion, setCriterion] = useState<WellsCriterion>();
  const [expanded, setExpanded] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { criteria } = useOutletContext<AppOutletContext>();

  // Критерий ищем в текущем списке ленты, при открытии по прямой ссылке — в mock
  useEffect(() => {
    if (!id) return;

    const fromList = criteria.find((item) => String(item.criterion_id) === id);
    setCriterion(
      fromList ?? CRITERIA_MOCK.find((item) => String(item.criterion_id) === id)
    );
    setExpanded(false);
  }, [id, criteria]);

  // Следующий критерий по порядку в списке, который показала плитка
  const handleNext = () => {
    if (!id || !criteria.length) return;
    const currentIndex = criteria.findIndex(
      (item) => String(item.criterion_id) === id
    );
    const nextItem = criteria[currentIndex + 1];
    if (nextItem) {
      navigate(`${ROUTES.FEED}/${nextItem.criterion_id}`);
    }
  };

  if (!criterion) {
    return <div className="feedEmpty">Критерий не найден</div>;
  }

  return (
    <div className="feedPage">
      <video
        key={criterion.criterion_id}
        className="feedVideo"
        src={criterion.video_url || defaultVideo}
        poster={criterion.image_url || defaultImage}
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="feedShade" />

      <aside className="feedSide">
        <div className="feedParam">
          <span className="feedParamValue">{formatPoints(criterion.wells_points)}</span>
          <span className="feedLabel">баллов</span>
        </div>

        <div className="feedParam">
          <span className="feedIcon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12h6M9 16h6M9 8h6M5 3h14v18H5z" strokeLinecap="round" />
            </svg>
          </span>
          <span className="feedLabel">{criterion.criterion_group}</span>
        </div>

        <div className="feedParam">
          <span className="feedIcon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21s-8-4.6-8-10a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 11c0 5.4-8 10-8 10z" />
            </svg>
          </span>
          <span className="feedLabel">{criterion.like_count}</span>
        </div>

        <button
          type="button"
          className="feedNext"
          onClick={handleNext}
          title="Следующий критерий"
          aria-label="Следующий критерий"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </aside>

      <div className="feedBottom">
        <h1 className="feedName">{criterion.criterion_name}</h1>
        {expanded && <p className="feedDescription">{criterion.short_description}</p>}
        <button
          type="button"
          className="feedMore"
          onClick={() => setExpanded((state) => !state)}
        >
          {expanded ? "Меньше" : "Больше"}
        </button>
      </div>
    </div>
  );
};
