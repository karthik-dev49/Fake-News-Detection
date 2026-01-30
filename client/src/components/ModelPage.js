import React from "react";
import "./ModelPage.css";
import FakeNewsNaiveBayes from "../model-detail/FakeNewsNaiveBayes";
import FakeNewsDecisionTree from "../model-detail/FakeNewsDecisionTree";
const ModelPage = () => {
  const [detailContent, setDetailContent] = React.useState(null);
  const loadDetailPage = (modelName) => {
    if (modelName === "FakeNewsNaiveBayes") {
      console.log("FakeNewsNaiveBayes");
      setDetailContent(<FakeNewsNaiveBayes />);
    } else if (modelName === "FakeNewsDecisionTree") {
      console.log("FakeNewsDecisionTree");
      setDetailContent(<FakeNewsDecisionTree />);
    }
  };
  return (
    <div className="modelBox">
      <div className="model-title">Models (Under Construction)</div>
      <div className="models-option-section">
        <div className="c-op">
          <div className="c-op-title">Fake News Dataset</div>
          <div className="c-op-btns-box">
            <button
              className="c-op-btn"
              onClick={() => loadDetailPage("FakeNewsNaiveBayes")}
            >
              Naive Bayes
            </button>
            <button
              className="c-op-btn"
              onClick={() => loadDetailPage("FakeNewsDecisionTree")}
            >
              Decision Tree
            </button>
            <button className="c-op-btn">model-2</button>
            {/* <button className='c-op-btn'>model-1</button> */}
            {/* <button className='c-op-btn'>model-1</button> */}
            <button className="c-op-btn">model-1</button>
            <button className="c-op-btn">model-1</button>
          </div>
        </div>
        <div className="c-op">
          <div className="c-op-title">LIAR Dataset</div>
          <div className="c-op-btns-box">
            <button className="c-op-btn">model-1</button>
            <button className="c-op-btn">model-1</button>
            <button className="c-op-btn">model-1</button>
            <button className="c-op-btn">model-1</button>
          </div>
        </div>
        <div className="c-op">
          <div className="c-op-title">ISOT Dataset</div>
          <div className="c-op-btns-box">
            <button className="c-op-btn">model-1</button>
            <button className="c-op-btn">model-1</button>
          </div>
        </div>
      </div>
      <div>
        {detailContent}
      </div>
    </div>
  );
};

export default ModelPage;
