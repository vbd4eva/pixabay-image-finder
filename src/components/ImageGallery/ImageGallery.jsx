import PropTypes from "prop-types";

import s from "./ImageGallery.module.css";

import ImageGalleryItem from "./ImageGalleryItem/";
import { RotatingLines } from "react-loader-spinner";
import { checkStatus, PENDING } from "../../controllers/status";

function ImageGallery({ onGalleryItemClick, images }) {
  return (
    <>
      <ul className={s.gallery}>
        {images.map(({ id, webformatURL, tags }, index) => (
          <ImageGalleryItem
            key={id}
            imgSrc={webformatURL}
            imgAlt={tags}
            onClick={() => {
              onGalleryItemClick(index);
            }}
          />
        ))}
      </ul>
      {checkStatus(PENDING) && (
        <div>
          <RotatingLines width="24" strokeColor="currentColor" />
        </div>
      )}
    </>
  );
}

ImageGallery.propTypes = {
  onGalleryItemClick: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired })
  ).isRequired,
};

export default ImageGallery;
