import PropTypes from "prop-types";
export default function PixabayLogo({ onLoadError }) {
  const handleImageErrored = (e) => {
    if (onLoadError) {
      onLoadError();
      return;
    }
    console.log(
      "Pixabay server is unavailable! Please check your internet connection."
    );
  };

  return (
    <img
      src="https://pixabay.com/static/img/logo.svg"
      alt="Pixabay Logo"
      onError={handleImageErrored}
    />
  );
}

PixabayLogo.propTypes = {
  onLoadError: PropTypes.func,
};
