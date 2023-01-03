import { URL } from "node:url"; // Import the URL class from the url library

function makeSearchURL(query) {
  // Construct a new URL object using the resource URL
  const searchURL = new URL("https://university-web-api.herokuapp.com/search");

  // Access the searchParams field of the constructed url
  // The field holds an instance of the URLSearchParams
  // Add a new "q" parameter with the value of the functions input
  searchURL.searchParams.append("name", query);

  return searchURL.toString(); // Return the resulting complete URL
}

import fetch from "node-fetch";

export function fetchUniversities(query) {
  // TODO
  return fetch(makeSearchURL(query))
    .then(response => response.ok ? response.json() : new Error(response.statusText)) // parse the result to a json
    .then(json => (json.length > 0)
    ? Promise.resolve(json.map(e => e.name)) : Promise.reject(new Error("No results found.")));
}
