import PropTypes from "prop-types";
import s from "./Slider.module.css";
import { GrPrevious, GrNext } from "react-icons/gr";

function Slider({ current, onNextSlide, onPrevSlide }) {
  const { largeImageURL, tags, isFirst, isFinal } = current;

  return (
    <div className={s.container}>
      <div className={s.side}>
        {isFirst || (
          <button
            type="button"
            className={s.btn}
            onClick={onPrevSlide}
            aria-label="Show previous image"
          >
            <GrPrevious className={s.btnIcon} />
          </button>
        )}
      </div>

      <div className={s.imgContainer}>
        <img src={largeImageURL} alt={tags} />
      </div>

      <div className={s.side}>
        {isFinal || (
          <button
            type="button"
            className={s.btn}
            onClick={onNextSlide}
            aria-label="Show next image"
          >
            <GrNext className={s.btnIcon} />
          </button>
        )}
      </div>
    </div>
  );
}

Slider.propTypes = {
  current: PropTypes.object.isRequired,
  onPrevSlide: PropTypes.func.isRequired,
  onNextSlide: PropTypes.func.isRequired,
};

export default Slider;
