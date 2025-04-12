import React from 'react';
import './PotsModal.css';

type PotsModalProps = {
  onClose: () => void;
};

const PotsModal: React.FC<PotsModalProps> = ({ onClose }) => {
  const pots = [
    { name: 'Basic Pot', price: '100 coins' },
    { name: 'Fancy Pot', price: '250 coins' },
    { name: 'Luxury Pot', price: '500 coins' },
    { name: 'Golden Pot', price: '1000 coins' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Select a Pot</h2>
        <div className="pots-list">
          {pots.map((pot, index) => (
            <div key={index} className="pot-item">
              <div className="pot-name">{pot.name}</div>
              <div className="pot-price">{pot.price}</div>
            </div>
          ))}
        </div>
        <button className="close-button" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default PotsModal;
