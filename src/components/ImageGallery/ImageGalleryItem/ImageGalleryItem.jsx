import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";

function ImageGalleryItem({ imgSrc, imgAlt, onClick }) {
  return (
    <>
      <li className={s.item}>
        <img className={s.img} src={imgSrc} alt={imgAlt} onClick={onClick} />
      </li>
    </>
  );
}

ImageGalleryItem.propTypes = {
  imgAlt: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
