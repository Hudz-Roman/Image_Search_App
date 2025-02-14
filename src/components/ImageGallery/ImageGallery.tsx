import ImageCard from '../ImageCard/ImageCard';
import { Image } from '../../types';
import s from './ImageGallery.module.css';

interface ImageGalleryProps {
  images: Image[];
  openModal: (image: Image) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, openModal }) => {
  return (
    <ul className={s.gallery}>
      {images.map((image) => (
        <ImageCard key={image.id} image={image} openModal={openModal} />
      ))}
    </ul>
  );
};

export default ImageGallery;
