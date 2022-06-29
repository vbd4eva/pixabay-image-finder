import { useContext } from "react";
import PropTypes from "prop-types";

import s from "./ImageGallery.module.css";

import ImageGalleryItem from "./ImageGalleryItem/";
import { RotatingLines } from "react-loader-spinner";
import statusContext from "../../context/status/context";

function ImageGallery({ onGalleryItemClick, images }) {
  const { checkStatus, PENDING } = useContext(statusContext);

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
