import ErrorMessage from './ErrorMessage/ErrorMessage';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageModal from './ImageModal/ImageModal';
import Loader from './Loader/Loader';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import SearchBar from './SearchBar/SearchBar';
import fetchImages from '../services/api';
import { Image } from '../types';

import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetchImages<Image[]>(query, page);
        const imagesData = response.map(
          ({ id, urls: { small, regular }, alt_description }) => ({
            id,
            urls: { small, regular },
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

  const onSubmit = (query: string) => {
    if (!query) {
      toast.error('Search query should not be empty');
      return;
    }
    setImages([]);
    setQuery(query);
    setPage(1);
  };

  function openModal(image: Image): void {
    setSelectedImage(image);
    setModalIsOpen(true);
  }

  function closeModal(): void {
    setModalIsOpen(false);
    setSelectedImage(null);
  }

  const onLoadMore = (): void => {
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
