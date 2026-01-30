import './Historyelement.css';
import React from 'react'
import PropTypes from 'prop-types';

export const Historyelement = (props) => {
  const [viewVisible, setViewVisible] = React.useState(false);
  // console.log(props);
const deleteNews = async () => {
  try {
    const response = await fetch("http://localhost:3001/news/deleteNews", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName:props.userName,createdAt:props.createdAt }),
      
    });
const data = await response.json();
    if (data.status==="ok") {
      
      console.log("News deleted successfully:", data);
      props.onDeleteSuccess();
      // If you want to perform additional actions on successful deletion, you can do it here
    } else {
     console.error("Error while deleting news:", data.message);
    }
  } catch (error) {
    console.error("Error in deleteNews:", error);
  }
};
const openModal = () => {
  setViewVisible(true);
};

const closeModal = () => {
  setViewVisible(false);
};
const getModalClass = () => {
  // Use a ternary operator to conditionally apply a class based on the prediction value
  return `${
    props.prediction === "Real" ? "real-modal" : "fake-modal"
  }`;
};
const modalClass = getModalClass();
  return (
    <div className="history-container">
      <div className="news-container">{props.news}</div>
      <div className="more">
        <div className="more-title">more</div>
        <div className="more-list" id="moreList">
          <button className="menuBtn-delete" onClick={() => deleteNews()}>
            Delete
          </button>

          <button className="menuBtn-view" onClick={openModal}>
            View
          </button>
        </div>
      </div>

      <div className={`modal ${viewVisible ? "visible" : ""}`} id="modal">
        <div className='modal-card'>
          <div className={`${modalClass}-content`}>
            <div className={`${modalClass}-header`}>
              <div>News</div>
              <span className={`${modalClass}-closeBtn`} onClick={closeModal}>
                &times;
              </span>
            </div>
            <div className={`${modalClass}-body`}>{props.news}</div>
            <div className={`${modalClass}-footer`}>
              <div>Dataset: {props.dataset}</div>
              <div>Model Name: {props.model}</div>
              <div>Model predicted : {props.prediction}</div>
              <div>Accuracy : {props.accuracy}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Historyelement.defaultProps = {
    news: 'News here',
};

Historyelement.propTypes = {
    news: PropTypes.string,
};
