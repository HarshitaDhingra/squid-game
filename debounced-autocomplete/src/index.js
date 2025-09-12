import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

/*
Build an Autocomplete for Searching and Selecting a Company

There should be an Input Field. 
As the user types in, it should search against this API - 
https://autocomplete.clearbit.com/v1/companies/suggest?query=<search_string>

The results can be displayed in a dropdown below the input box. 
Show company logo and name in each row. 

User can select any one of these companies. 
Log the selected company whenever the user select's one
*/

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
