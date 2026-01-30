import "./Home.css";
import "../components/templates/Historyelement.css";
import React, { useState, useEffect, useCallback } from "react";
import { Header } from "../components/Header.js";
import  Nav  from "../components/Nav.js";
import { Footer } from "../components/Footer.js";
import { useUser } from "../contexts/UserContext.js";
import { Historyelement } from "../components/templates/Historyelement.js";
import { Datasetelement } from "../components/templates/Datasetelement.js";
// import { MButton } from "../components/templates/MButton.js";
import { ModelCard } from "../components/templates/ModelCard.js";
import ModelPage from "../components/ModelPage.js";
// import AvailableModels from "../components/templates/AvaliableModels.js";
export const Home = () => {
  let [newsHistory, setNewsHistory] = useState([]);
  const [newsInput, setNewsInput] = useState("");
  const [homeTab, setHomeTab] = useState(true);
  const [activeTab, setActiveTab] = useState(true);
  const { userName, setUserName } = useUser();
  const [prediction, setPrediction] = useState(null);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [type, setType] = useState("train");
  const [loading, setLoading] = useState(false);
  // const [availableModels, setAvailableModels] = useState([]);
  const [loadOutput, setLoadOutput] = useState(false);
  const [count_t, setCount_t] = useState("______");
  const [modelNo, setModelNo] = useState(0);
  const modelConfig = {
    1: {
      modelName: "Naive Bayes",
      dataName: "Fake News",
      accuracy: "0.98%",
    },
    2: {
      modelName: "Decision Tree",
      dataName: "Fake News",
      accuracy: "0.98%",
    },
  };
  // Define fetchNewsHistory using useCallback
  const fetchNewsHistory = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/news/getNews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName }),
      });

      const data = await response.json();

      if (data.status === "ok") {
        setNewsHistory(data.news);
        return data.news;
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("An error occurred while fetching news history:", error);
    }
  }, [userName]);

  const onDeleteSuccess = useCallback(async () => {
    try {
      const updatedNewsHistory = await fetchNewsHistory();
      setNewsHistory(updatedNewsHistory);
    } catch (error) {
      console.error("An error occurred while updating news history:", error);
    }
  }, [fetchNewsHistory]);
  const handleSelectModel = (selectedModel) => {
    setModelNo(selectedModel);
  };
  const handlePredict = async (e) => {
    e.preventDefault();
    // Check if there is news input
    if (modelNo === 0) {
      alert("Please select a model");
      return;
    }
    if (newsInput.trim() !== "") {
      try {
        setPrediction(null);
        const predictionresponse = await fetch(
          `http://127.0.0.1:5000/predict${modelNo}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ news: newsInput }),
          }
        );
        const predictiondata = await predictionresponse.json();
        // Send the news input and userName to the server
        const response = await fetch("http://localhost:3001/news/predictNews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            news: newsInput,
            userName,
            prediction: predictiondata.prediction,
            dataset: modelConfig[modelNo].dataName,
            model: modelConfig[modelNo].modelName,
            accuracy: modelConfig[modelNo].accuracy,
          }),
        });

        const data = await response.json();

        if (data.status === "ok" && predictiondata.status === 200) {
          // Wait for the prediction to be completed
          setLoadOutput(true);
          newsHistory = await fetchNewsHistory();
          // Clear the news input after prediction
          setLoadOutput(false);
          setPrediction(predictiondata.prediction);
          setNewsInput("");
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("An error occurred while predicting news:", error);
      }
    } else {
      alert("News input is empty");
    }
  };

  const toggleDataset = async (dataset, type) => {
    // const AvaliableModels = {
    //   FakeNews: ["LSTM", "NB"],
    //   ISOT: ["LSTM", "NB", "SVM", "RF"],
    //   LIAR: ["LSTM", "NB", "SVM"],
    // };
    // setAvailableModels(AvaliableModels[dataset]);
    console.log(dataset, type);
    try {
      setLoading(true);
      setCount_t("______");
      const response = await fetch(
        `http://localhost:5000/${dataset}${type}dataset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      const data = await response.json();
      if (data.status === 200) {
        setSelectedDataset(data.data);
        setCount_t(data.total_rows);
        // setAvailableModels(m);
        // console.log(availableModels);
      } else {
        console.error("Status is not 200");
      }
    } catch (error) {
      console.error("An error occurred while fetching dataset", error);
    } finally {
      setLoading(false);
    }
  };
  const handleTabChange = (isHomeTab) => {
    setHomeTab(isHomeTab);
    setActiveTab(isHomeTab);
  };
  const handleToggle = async (dataset, type) => {
    setType((prevType) => (prevType === "test" ? "train" : "test"));
    // if()
  };

  useEffect(() => {
    // Fetch user's news history only if userName is available
    if (userName) {
      fetchNewsHistory();
    }
  }, [userName, fetchNewsHistory]);

  useEffect(() => {
    // Set the user name from sessionStorage on component mount
    const storedUserName = sessionStorage.getItem("userName");
    if (storedUserName) {
      // if(storedUserName!=="Guest" && storedUserName!==""){
      //   alert("You will be logged in with previous session");
      // }
      setUserName(storedUserName);
    } else {
      setUserName("Guest");
    }
  }, [setUserName]);

  // Update sessionStorage when userName changes
  useEffect(() => {
    sessionStorage.setItem("userName", userName);
  }, [userName]);

  return (
    <div className="home">
      <div className="historyBox">
        <div className="history-title">News History</div>
        <div className="history-entity">
          {newsHistory.map((newsItem) => (
            <li key={newsItem._id}>
              <Historyelement
                news={newsItem.news}
                createdAt={newsItem.createdAt}
                userName={newsItem.userName}
                prediction={newsItem.prediction}
                dataset={newsItem.dataset}
                model={newsItem.model}
                accuracy={newsItem.accuracy}
                onDeleteSuccess={onDeleteSuccess}
              />
            </li>
          ))}
        </div>
      </div>
      <div className="main-container">
        <Header
          title="Major Project - Fake News Detection App"
          profile={true}
        />

        <Nav activeTab={activeTab}  onTabChange={handleTabChange} />
        {homeTab ? (
          <div className="container">
            <div className="datasetBox">
              <div className="dataset-title-box">
                <div className="dataset-title">DataSet</div>
                <label className="t">
                  <input type="checkbox" />
                  <span className="toggle-slider" onClick={handleToggle}>
                    <div className="datasetType">{type}</div>
                  </span>
                </label>
              </div>

              <div className="dataset-wrapper">
                <div className="option-wrapper">
                  <div className="dataset-option-title">Available dataset</div>
                  <div className="dataset-options">
                    <button
                      className="dataset-options-btns"
                      onClick={() => toggleDataset("FakeNews", `${type}`)}
                    >
                      Fake News Dataset
                    </button>
                    <button
                      className="dataset-options-btns"
                      onClick={() => toggleDataset("LIAR", `${type}`)}
                    >
                      LIAR Dataset
                    </button>
                    <button
                      className="dataset-options-btns"
                      onClick={() => toggleDataset("ISOT", `${type}`)}
                    >
                      ISOT Dataset
                    </button>
                  </div>
                  <div className="count-tuples">
                    No. of tuples:<span>{count_t}</span>
                  </div>
                </div>

                <div className="dataset-entity">
                  {loading ? (
                    <div className="loader">Loading...</div>
                  ) : selectedDataset ? (
                    selectedDataset.map((newsItem) => (
                      <Datasetelement
                        // itemKey={newsItem.id}
                        title={newsItem.title}
                        news={newsItem.text}
                        author={newsItem.author}
                      />
                    ))
                  ) : (
                    <div className="loader">No dataset selected</div>
                  )}
                </div>
              </div>
            </div>

            <div className="ii">
              <div className="predictionBox">
                <div className="prediction-title">Prediction</div>
                <ModelCard onSelectModel={handleSelectModel} />
                <div className="prediction-section">
                  <form className="messageBox" method="POST">
                    <input
                      required=""
                      placeholder="Enter the News"
                      type="text"
                      value={newsInput}
                      id="messageInput"
                      onChange={(e) => setNewsInput(e.target.value)}
                    />
                    <button id="sendButton" onClick={handlePredict}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 664 663"
                      >
                        <path
                          fill="none"
                          d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                        ></path>
                        <path
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          strokeWidth="33.67"
                          stroke="#6c6c6c"
                          d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                        ></path>
                      </svg>
                    </button>
                  </form>
                  <div className="prediction-output">
                    <div
                      className="detectionResult"
                      style={{
                        color:
                          prediction === "Real"
                            ? "green"
                            : prediction === "Fake"
                            ? "red"
                            : "white",
                        backgroundColor:
                          prediction === "Real"
                            ? "lightgreen"
                            : prediction === "Fake"
                            ? "pink"
                            : "transparent",
                      }}
                    >
                      {prediction !== null ? (
                        <p>{prediction === "Fake" ? "Fake" : "Real"}</p>
                      ) : loadOutput ? (
                        <p>Waiting for prediction...</p>
                      ) : (
                        <p>Prediction output</p>
                      )}
                    </div>
                    <div className="detail-report">
                      <a href="de">How prediction happened?</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="all-models">
            <ModelPage />
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};
