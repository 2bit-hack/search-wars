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
      <div className="btn-container">
        <button
          className="submit-btn"
          disabled={isLoading || !termOne.trim() || !termTwo.trim()}
          onClick={() => {
            setHasResults((_) => false);
            setFailure((_) => null);
            search();
          }}
        >
          FIGHT
        </button>
        <button
          className="submit-btn"
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
      {failure ? (
        <div className="results">
          <p className="error">{failure}</p>
        </div>
      ) : null}
      {hasResults ? (
        <div className="results">
          {results !== null ? (
            <>
              <p>
                {termOne} : {results["termOne"] ?? "-"}
              </p>
              <p>
                {termTwo} : {results["termTwo"] ?? "-"}
              </p>
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
