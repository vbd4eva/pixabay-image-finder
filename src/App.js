import { PureComponent } from "react";

// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

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

export default class App extends PureComponent {
  state = {
    searchQuery: "",
    status: statuses.IDLE,
    gallery: [],
    showModaL: false,
    currentGalleryItem: null,
  };

  #currentApiResult = null;

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) this.getImages();

    if (prevState.gallery !== this.state.gallery && this.state.showModaL) {
      this.setNextCurrentImg();
    }
  }

  handleSearchQuery = (searchQuery) => {
    this.setState({ searchQuery });
  };

  getGalleryItemByIndex(index) {
    const isFirst = index === 0;
    const isLast = this.state.gallery.length - 1 === index;

    const isFinal = isLast && this.isGalleryComplete();
    return { ...this.state.gallery[index], index, isFirst, isLast, isFinal };
  }

  pixabay = new ApiService();
  getImages = async () => {
    this.setState({ status: statuses.PENDING });

    this.#currentApiResult = await this.pixabay.getImages(
      this.state.searchQuery
    );

    const isResolve = Boolean(this.#currentApiResult);
    const isListNew = this.#currentApiResult?.isQueryNew;

    this.setState(({ gallery }) => {
      const newState = {
        status: isResolve ? statuses.RESOLVED : statuses.REJECTED,
      };
      if (isResolve) {
        newState.gallery = isListNew
          ? this.#currentApiResult.images
          : [...gallery, ...this.#currentApiResult.images];
      }
      return newState;
    });
  };

  isGalleryComplete() {
    if (!this.#currentApiResult?.pagination) return false;
    const { amount } = this.#currentApiResult;
    return amount === this.state.gallery.length;
  }
  isGalleryNotEmpty() {
    return this.state.gallery.length > 0;
  }

  showModal = (index) => {
    this.setState({
      currentGalleryItem: this.getGalleryItemByIndex(index),
      showModaL: true,
    });
  };
  closeModal = () => {
    this.setState({ showModaL: false });
  };
  getPrevSlide = () => {
    const { isFirst, index } = this.state.currentGalleryItem;

    if (isFirst) {
      console.log("перведущего нет, текущий - прервый");
      return;
    }

    const newIndx = index - 1;
    this.setState({
      currentGalleryItem: this.getGalleryItemByIndex(newIndx),
    });
  };
  getNextSlide = () => {
    const { isLast, isFinal } = this.state.currentGalleryItem;

    if (isFinal) {
      console.warn("Error - next slide is absent , current is final!");
      return;
    }

    if (isLast) {
      // console.log("Фетч следующей страницы");
      this.getImages();
      return;
    }
    this.setNextCurrentImg();
  };
  setNextCurrentImg() {
    const { index } = this.state.currentGalleryItem;
    this.setState({
      currentGalleryItem: this.getGalleryItemByIndex(index + 1),
    });
  }

  failPixabayConnectionHandler = () => {
    this.setState({ status: statuses.REJECTED });
  };
  render() {
    const isNothingFinded = this.#currentApiResult?.amount === 0;

    return (
      <>
        <Searchbar
          onSubmit={this.handleSearchQuery}
          status={this.state.status}
        />

        {this.isGalleryNotEmpty() ? (
          <>
            <ImageGallery
              images={this.state.gallery}
              onGalleryItemClick={this.showModal}
              status={this.state.status}
            />
            <Message>
              {this.isGalleryComplete() ? (
                <p>
                  Thats all over pixabay results by query '
                  <b>{this.state.searchQuery}</b>'.
                </p>
              ) : (
                <LoadMoreBtn
                  onClick={this.getImages}
                  status={this.state.status}
                />
              )}
            </Message>
          </>
        ) : (
          <>
            {" "}
            <FullScreenCenterWrapper>
              {this.state.status === statuses.IDLE && (
                <Message>
                  <>
                    <p>
                      The ability to find images, implemented by using the
                      Pixabay API.
                    </p>
                    <PixabayLogo
                      onLoadError={this.failPixabayConnectionHandler}
                    />
                  </>
                </Message>
              )}
              {isNothingFinded && (
                <Message>
                  <NothingFinded searchQuery={this.state.searchQuery} />
                </Message>
              )}
            </FullScreenCenterWrapper>
            {this.state.status === statuses.REJECTED && (
              <SomethingWentWrong>
                Oops..
                <br />
                something went wrong whith Pixabay server interaction. Check
                your internet connection, or try again later.
              </SomethingWentWrong>
            )}
          </>
        )}

        {this.state.showModaL && (
          <Modal onClose={this.closeModal}>
            <Slider
              current={this.state.currentGalleryItem}
              onPrevSlide={this.getPrevSlide}
              onNextSlide={this.getNextSlide}
            />
          </Modal>
        )}
      </>
    );
  }
}
