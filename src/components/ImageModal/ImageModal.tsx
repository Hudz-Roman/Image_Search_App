import s from './ImageModal.module.css';
import Modal from 'react-modal';

const ImageModal = ({ image, modalIsOpen, closeModal }) => {
  const { regular, alt_description } = image;

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'lightgrey',
    },
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Image Modal'
    >
      <img src={regular} alt={alt_description} className={s.modal_img} />
    </Modal>
  );
};

export default ImageModal;
