import React from "react";
import PropTypes from "prop-types";
import "./Datasetelement.css";

export const Datasetelement = (props) => {
  const copyNews = () => {
    navigator.clipboard.writeText(props.news);
  }
  return (
    <div className="dataset-news">
      <button className="copyBtn" onClick={copyNews}>
        <img src="/copy-svgrepo-com.svg" alt=""></img>
      </button>
      <div className="headline">{props.title}</div>
      <div className="news">{props.news}</div>
      <div className="author">{props.author}</div>
    </div>
  );
};

Datasetelement.defaultProps = {
  // itemKey: "key",
  title: "heading",
  news: "News here",
  author: "author",
};

Datasetelement.propTypes = {
  // itemKey: PropTypes.string,
  title: PropTypes.string,
  news: PropTypes.string,
  author: PropTypes.string,
};
