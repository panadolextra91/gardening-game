import React from 'react';
import './GardenPage.css';
import { useState } from 'react';
import PotsModal from '../components/PotsModal';
import PlantsModal from '../components/PlantsModal';


const GardenPage: React.FC = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <div className="garden-container">
      <div className="garden-header">
        <h1>Welcome, Green Thumb!</h1>
        
      </div>
      <div className="garden-stats">
          <div className="stat-item">
          <img
            className="stat-icon"
            src="https://res.cloudinary.com/duy8dombh/image/upload/v1744463918/fac96efd8086c61dfa49db14eb764297-removebg-preview_fzfsju.png"
            alt="Plants Icon"
          />
            <span className="stat-value">0/16</span>
          </div>
          <div className="stat-item">
            <img
            className="stat-icon"
            src="https://res.cloudinary.com/duy8dombh/image/upload/v1744464006/pixel-art-illustration-coin-pixelated-coin-coin-pixelated-pixel-art-game-icon-webs_1038602-950-removebg-preview_fa3u8a.png"
            alt="Coins Icon"
          />
            <span className="stat-value">500</span>
          </div>
        </div>
      <div className="garden-grid">
        {Array(16).fill(null).map((_, index) => (
          <div key={index} className="garden-plot">
            <button className="plot-button" onClick={() => setModalOpen(true)}>
              <span>Plant Here</span>
            </button>
          </div>
        ))}
      </div>
      {modalOpen && <PlantsModal onClose={() => setModalOpen(false)} />}
      {modalOpen && <PotsModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default GardenPage;
