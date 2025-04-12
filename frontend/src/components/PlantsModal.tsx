import React from 'react';
import './PotsModal.css';

type PlantsModalProps = {
  onClose: () => void;
};

const PlantsModal: React.FC<PlantsModalProps> = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Select a Plant</h2>
        <ul>
          <li>Rose</li>
          <li>Violet</li>
          <li>Lily</li>
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PlantsModal;
