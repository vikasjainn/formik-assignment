import React from 'react';
import Modal from 'react-modal';

// Bind modal to your app's root element (important for accessibility)
Modal.setAppElement('#root');

interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  content: string;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onRequestClose, content }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Submitted Data"
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      <h2>Submitted Data</h2>
      <pre>{content}</pre>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default CustomModal;
