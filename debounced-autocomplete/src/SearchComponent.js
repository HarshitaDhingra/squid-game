import React, { useState, useRef, useCallback } from "react";
import "./InputEle.css";

export default function SearchComponent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const inputRef = useRef();

  const search = () => {
    const inputText = inputRef.current.value;
    console.log("inputText: ", inputText);
    if (!inputText) setData([]);
    else {
      console.log("api call made");
      setLoading(true);
      fetch(
        `https://autocomplete.clearbit.com/v1/companies/suggest?query=${inputText}`
      )
        .then((data) => {
          return data.json();
        })
        .then((response) => {
          setData(response);
          setLoading(false);
        })
        .catch((err) => {
          setError(true);
          throw new Error(err);
        });
    }
  };
  const debounce = function (fn, delay) {
    let timer;
    return function (...args) {
      // const context = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(args);
      }, delay);
    };
  };

  const betterSearch = useCallback(debounce(search, 1000), [inputRef]);

  const logComapnyName = (name) => console.log(name);

  return (
    <div className="search-wrapper">
      <input ref={inputRef} type="text" onChange={betterSearch} />
      {loading && <div>Loading...</div>}
      {error && <div>Error Found!</div>}
      {!loading && !error && !!data?.length && (
        <div>
          {data.map((d) => (
            <div
              onClick={() => logComapnyName(d.name)}
              className="result-card"
              key={d.domain}
            >
              <img
                src={d.logo}
                alt="logo"
                className="logo"
                height="20px"
                width="20px"
              />
              <a rel="noreferrer noreopener" href={d.domain} target="_blank">
                {d.name}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
