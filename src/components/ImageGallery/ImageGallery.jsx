import PropTypes from "prop-types";

import s from "./ImageGallery.module.css";

import ImageGalleryItem from "./ImageGalleryItem/";
import { RotatingLines } from "react-loader-spinner";
import statuses from "../../json/statuses.json";

function ImageGallery({ onGalleryItemClick, status, images }) {
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
      {status === statuses.PENDING && (
        <div>
          <RotatingLines width="24" strokeColor="currentColor" />
        </div>
      )}
    </>
  );
}

ImageGallery.propTypes = {
  onGalleryItemClick: PropTypes.func.isRequired,
  status: PropTypes.string,
  images: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired })
  ).isRequired,
};

export default ImageGallery;
