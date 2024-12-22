import s from './ImageCard.module.css';

const ImageCard = ({ image, openModal }) => {
  const { small, alt_description } = image;
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
