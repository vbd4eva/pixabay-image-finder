import { useState, useRef, useEffect, useCallback } from "react";

import statuses from "./json/statuses.json";
import ApiService from "./controllers/apiService";
import ImageGallery from "./components/ImageGallery";
import Searchbar from "./components/Searchbar";
import LoadMoreBtn from "./components/LoadMoreBtn";
import SomethingWentWrong from "./components/SomethingWentWrong";
import FullScreenCenterWrapper from "./components/FullScreenCenterWrapper/FullScreenCenterWrapper";
import NothingFinded from "./components/NothingFinded/NothingFinded";
import Message from "./components/FullScreenCenterWrapper/Message/Message";
import PixabayLogo from "./components/PixabayLogo/PixabayLogo";
import Modal from "./components/Modal";
import Slider from "./components/Slider";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState(statuses.IDLE);
  const [gallery, setGallery] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentGalleryItem, setCurrentGalleryItem] = useState(null);

  const currentApiResult = useRef(null);
  const Pixabay = useRef(new ApiService());

  const memoGetImages = useCallback(async () => {
    setStatus(statuses.PENDING);

    currentApiResult.current = await Pixabay.current.getImages(searchQuery);

    const isResolve = Boolean(currentApiResult.current);
    const isListNew = currentApiResult.current?.isQueryNew;

    setGallery((state) =>
      isListNew
        ? currentApiResult.current.images
        : [...state, ...currentApiResult.current.images]
    );

    setStatus(isResolve ? statuses.RESOLVED : statuses.REJECTED);
  }, [searchQuery]);

  //
  useEffect(() => {
    if (searchQuery) memoGetImages();
  }, [memoGetImages, searchQuery]);

  useEffect(() => {
    if (gallery.length && showModal) setNextCurrentImg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gallery.length]);

  //
  function handleSearchQuery(searchQuery) {
    setSearchQuery(searchQuery);
  }
  //
  const isNothingFinded = () => currentApiResult.current?.amount === 0;
  function isGalleryNotEmpty() {
    return gallery.length > 0;
  }
  function isGalleryComplete() {
    if (!currentApiResult.current?.pagination) return false;
    const { amount } = currentApiResult.current;
    return amount === gallery.length;
  }
  function getGalleryItemByIndex(index) {
    const isFirst = index === 0;
    const isLast = gallery.length - 1 === index;

    const isFinal = isLast && isGalleryComplete();
    return { ...gallery[index], index, isFirst, isLast, isFinal };
  }
  //
  const renderModal = (index) => {
    console.log("index");
    console.log(index);
    setCurrentGalleryItem(getGalleryItemByIndex(index));
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const getPrevSlide = () => {
    const { isFirst, index } = currentGalleryItem;

    if (isFirst) {
      console.log(
        "Previous Slide is not avelable, the current slide if first !"
      );
      return;
    }

    const newIndx = index - 1;
    setCurrentGalleryItem(getGalleryItemByIndex(newIndx));
  };
  const getNextSlide = () => {
    const { isLast, isFinal } = currentGalleryItem;

    if (isFinal) {
      console.warn("Error - next slide is absent , current is final!");
      return;
    }

    if (isLast) {
      memoGetImages();
      return;
    }
    setNextCurrentImg();
  };
  function setNextCurrentImg() {
    const { index } = currentGalleryItem;
    setCurrentGalleryItem(getGalleryItemByIndex(index + 1));
  }
  //
  const failPixabayConnectionHandler = () => {
    setStatus(statuses.REJECTED);
  };

  return (
    <>
      <Searchbar onSubmit={handleSearchQuery} status={status} />

      {isGalleryNotEmpty() ? (
        <>
          <ImageGallery
            images={gallery}
            onGalleryItemClick={renderModal}
            status={status}
          />
          <Message>
            {isGalleryComplete() ? (
              <p>
                Thats all over pixabay results by query '<b>{searchQuery}</b>'.
              </p>
            ) : (
              <LoadMoreBtn onClick={memoGetImages} status={status} />
            )}
          </Message>
        </>
      ) : (
        <>
          <FullScreenCenterWrapper>
            {status === statuses.IDLE && (
              <Message>
                <>
                  <p>
                    The ability to find images, implemented by using the Pixabay
                    API.
                  </p>
                  <PixabayLogo onLoadError={failPixabayConnectionHandler} />
                </>
              </Message>
            )}
            {isNothingFinded() && (
              <Message>
                <NothingFinded searchQuery={searchQuery} />
              </Message>
            )}
          </FullScreenCenterWrapper>
          {status === statuses.REJECTED && (
            <SomethingWentWrong>
              Oops..
              <br />
              something went wrong whith Pixabay server interaction. Check your
              internet connection, or try again later.
            </SomethingWentWrong>
          )}
        </>
      )}

      {showModal && (
        <Modal onClose={closeModal}>
          <Slider
            current={currentGalleryItem}
            onPrevSlide={getPrevSlide}
            onNextSlide={getNextSlide}
          />
        </Modal>
      )}
    </>
  );
}

export default App;
