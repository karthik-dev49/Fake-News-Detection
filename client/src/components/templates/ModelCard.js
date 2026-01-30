import React from 'react'
import "./ModelCard.css";
// import PropTypes from 'prop-types'

const ModelCard = ({ onSelectModel }) => {
    const [selectedModel, setSelectedModel] = React.useState(0);
    const handleModelClick = (modelNumber) => {
      // Toggle selection and highlight state
      if (selectedModel === modelNumber) {
        setSelectedModel(0); // Deselect the currently selected model
      } else {
        setSelectedModel(modelNumber); // Select the clicked model
      }

      // Notify the parent component about the selected model
      onSelectModel(selectedModel === modelNumber ? 0 : modelNumber);
    };
  return (
    <div className="model-selection-section">
      <div className="model-selection-title">
        Choose Model for News Prediction
      </div>
      <div className="model-selection-card-area">
        <div
          className={`model-selection-card ${
            selectedModel === 1 ? "selected" : ""
          }`}
          onClick={() => handleModelClick(1)}
        >
          <div className="model-selection-card-title">Fake News Dataset</div>
          <div className="model-selection-card-description">Naive Bayes</div>
        </div>
        <div
          className={`model-selection-card ${
            selectedModel === 2 ? "selected" : ""
          }`}
          onClick={() => handleModelClick(2)}
        >
            <div>(under construction)</div>
          <div className="model-selection-card-title">Fake News Dataset</div>
          <div className="model-selection-card-description">Decision Tree</div>
        </div>
      </div>
    </div>
  );
};

// ModelCard.propTypes = {}

export {ModelCard}