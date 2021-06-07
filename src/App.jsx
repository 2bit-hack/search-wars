import axios from "axios";
import React, { useState } from "react";
import "./App.css";

import constants from "./constants/constants";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [failure, setFailure] = useState(null);
  const [results, setResults] = useState(null);
  const [termOne, setTermOne] = useState("");
  const [termTwo, setTermTwo] = useState("");

  const search = async () => {
    try {
      setIsLoading((_) => true);

      const response = await axios
        .post(constants.baseUrl, {
          termOne,
          termTwo,
        })
        .then((res) => res.data);

      setHasResults((_) => true);
      setResults((_) =>
        response["termOne"] &&
        response["termOne"] !== -1 &&
        response["termTwo"] &&
        response["termTwo"] !== -1
          ? response
          : null
      );
    } catch (error) {
      console.error("ERROR: ", error);
      setHasResults((_) => false);
      setFailure((_) => "Failed to fetch results!");
    } finally {
      setIsLoading((_) => false);
    }
  };

  return (
    <div className="App">
      <header>
        <p className="heading">Search Wars!</p>
      </header>
      <div className="desc desc-size">
        <p className="desc-text">
          Enter two search terms (&#8804; 50 characters) and find out which of
          the two has more search results on{" "}
          <a className="link" href="https://www.bing.com" target="_blank">
            Bing
          </a>
        </p>
      </div>
      <div className="search-container">
        <div className="search-row">
          <input
            className="search"
            type="text"
            placeholder="Search Term 1"
            disabled={isLoading}
            value={termOne}
            onChange={(event) => {
              setHasResults((_) => false);
              setFailure((_) => null);
              setTermOne((_) => event.target.value);
            }}
          />
        </div>
        <div className="search-row">
          <input
            className="search"
            type="text"
            placeholder="Search Term 2"
            disabled={isLoading}
            value={termTwo}
            onChange={(event) => {
              setHasResults((_) => false);
              setFailure((_) => null);
              setTermTwo((_) => event.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <button
          className="btn mr"
          disabled={
            isLoading ||
            !termOne.trim() ||
            !termTwo.trim() ||
            termOne.trim().length > 50 ||
            termTwo.trim().length > 50
          }
          onClick={() => {
            setHasResults((_) => false);
            setFailure((_) => null);
            search();
          }}
        >
          FIGHT
        </button>
        <button
          className="btn"
          onClick={() => {
            setTermOne((_) => "");
            setTermTwo((_) => "");
            setHasResults((_) => false);
            setFailure((_) => null);
          }}
        >
          CLEAR
        </button>
      </div>

      {isLoading ? (
        <div className="loading">
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : null}
      {failure ? (
        <div className="results">
          <p className="error">{failure}</p>
        </div>
      ) : null}
      {hasResults ? (
        <div className="results">
          {results !== null ? (
            <>
              <p className="result-text">
                {results["termOne"] > results["termTwo"]
                  ? "🥇"
                  : results["termTwo"] > results["termOne"]
                  ? "🥈"
                  : "🏳️"}{" "}
                {termOne} : {results["termOne"] ?? "-"}
              </p>
              <div className="graph-container">
                <div
                  className="graph"
                  style={{
                    marginTop: "5px",
                    marginBottom: "5px",
                    height: "20px",
                    width:
                      Math.floor(
                        (results["termOne"] /
                          (results["termOne"] + results["termTwo"])) *
                          200
                      ) + "px",
                  }}
                />
                <p className="graph-text">
                  {Math.floor(
                    (results["termOne"] /
                      (results["termOne"] + results["termTwo"])) *
                      100
                  )}
                  %
                </p>
              </div>
              <p className="result-text">
                {results["termTwo"] > results["termOne"]
                  ? "🥇"
                  : results["termOne"] > results["termTwo"]
                  ? "🥈"
                  : "🏳️"}{" "}
                {termTwo} : {results["termTwo"] ?? "-"}
              </p>
              <div className="graph-container">
                <div
                  className="graph"
                  style={{
                    marginTop: "5px",
                    marginBottom: "5px",
                    height: "20px",
                    width:
                      Math.floor(
                        (results["termTwo"] /
                          (results["termOne"] + results["termTwo"])) *
                          200
                      ) + "px",
                  }}
                />
                <p className="graph-text">
                  {100 -
                    Math.floor(
                      (results["termOne"] /
                        (results["termOne"] + results["termTwo"])) *
                        100
                    )}
                  %
                </p>
              </div>
            </>
          ) : (
            <p className="error">
              Results could not be fetched for one or both search terms
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default App;
