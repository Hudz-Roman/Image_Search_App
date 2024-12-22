import ErrorMessage from './ErrorMessage/ErrorMessage';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageModal from './ImageModal/ImageModal';
import Loader from './Loader/Loader';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import SearchBar from './SearchBar/SearchBar';

import { useState, useEffect } from 'react';
import fetchImages from '../services/api';
import Modal from 'react-modal';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetchImages(query, page);
        const imagesData = response.map(
          ({ id, urls: { small, regular }, alt_description }) => ({
            id,
            small,
            regular,
            alt_description,
          })
        );
        setImages((prev) => [...prev, ...imagesData]);
      } catch (error) {
        console.error(error);
        setIsError(true);
        toast.error("This didn't work.");
      } finally {
        setIsLoading(false);
      }
    };
    if (query) {
      getData();
    }
  }, [query, page]);

  const onSubmit = (query) => {
    if (!query) {
      toast.error('Search query should not be empty');
      return;
    }
    setImages([]);
    setQuery(query);
    setPage(1);
  };

  function openModal(image) {
    setSelectedImage(image);
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
    setSelectedImage(null);
  }

  const onLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <Toaster position='top-right' reverseOrder={true} />
      <SearchBar onSubmit={onSubmit} />
      <ImageGallery images={images} openModal={openModal} />
      <Loader isLoading={isLoading} />
      {images.length > 0 && (
        <LoadMoreBtn onLoadMore={onLoadMore} isLoading={isLoading} />
      )}
      {selectedImage && (
        <ImageModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          image={selectedImage}
        />
      )}
      {isError && <ErrorMessage />}
    </>
  );
}

export default App;
