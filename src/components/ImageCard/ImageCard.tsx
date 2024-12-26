import { Image } from '../../types';
import s from './ImageCard.module.css';

interface ImageCardProps {
  image: Image;
  openModal: (image: Image) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, openModal }) => {
  const { small } = image.urls;
  const { alt_description } = image;
  return (
    <li>
      <img
        className={s.image}
        src={small}
        alt={alt_description}
        loading='lazy'
        onClick={() => openModal(image)}
      />
    </li>
  );
};

export default ImageCard;
