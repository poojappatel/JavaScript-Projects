import { URL } from "node:url"; // Import the URL class from the url library

function makeSearchURL(query) {
  // Construct a new URL object using the resource URL
  const searchURL = new URL("https://geocode.maps.co/search?q=query");

  // Access the searchParams field of the constructed url
  // The field holds an instance of the URLSearchParams
  // Add a new "q" parameter with the value of the functions input
  searchURL.searchParams.append("q", query);

  return searchURL.toString(); // Return the resulting complete URL
}

import fetch from "node-fetch";

export function fetchLongitudeAndLatitude(query) {
  // TODO
  return fetch(makeSearchURL(query))
  .then(response => response.json())
  .then(json => (Array.isArray(json) && json.length > 0)
  ? Promise.resolve({lon: Number(json[0].lon), lat: Number(json[0].lat)})
  : Promise.reject(new Error("No results found."))
  ).catch(err => console.log("Unable to retrieve location data: " + err));
}
