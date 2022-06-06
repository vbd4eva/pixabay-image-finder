import PropTypes from "prop-types";
import { Component } from "react";

import s from "./ImageGallery.module.css";

import ImageGalleryItem from "./ImageGalleryItem/";
import { RotatingLines } from "react-loader-spinner";
import statuses from "../../json/statuses.json";

export default class ImageGallery extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.number.isRequired })
    ).isRequired,
    onGalleryItemClick: PropTypes.func.isRequired,
    status: PropTypes.string,
  };

  render() {
    return (
      <>
        <ul className={s.gallery}>
          {this.props.images.map(({ id, webformatURL, tags }, index) => (
            <ImageGalleryItem
              key={id}
              imgSrc={webformatURL}
              imgAlt={tags}
              onClick={() => {
                this.props.onGalleryItemClick(index);
              }}
            />
          ))}
        </ul>
        {this.props.status === statuses.PENDING && (
          <div>
            <RotatingLines width="24" strokeColor="currentColor" />
          </div>
        )}
      </>
    );
  }
}
