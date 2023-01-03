import fetch from "node-fetch"; 
import { URL } from "node:url";

function makeSearchURL(longitude, latitude) {
  // Construct a new URL object using the resource URL
  const searchURL = new URL("https://api.open-meteo.com/v1/forecast");

  // Access the searchParams field of the constructed url
  // The field holds an instance of the URLSearchParams
  // Add a new "q" parameter with the value of the functions input
  searchURL.searchParams.append("longitude", longitude);
  searchURL.searchParams.append("latitude", latitude);
  searchURL.searchParams.append("hourly", "temperature_2m")
  searchURL.searchParams.append("temperature_unit", "fahrenheit")

  return searchURL.toString(); // Return the resulting complete URL
}

export function fetchCurrentWeather(longitude, latitude) {
  // TODO
  if (longitude >= 180 || longitude <= -180 || latitude >= 90 || latitude <= -90 || typeof longitude !== "number" || typeof latitude !== "number") {
    return Promise.reject(new Error("No results found for query."));
  }
  return fetch(makeSearchURL(longitude, latitude))
    .then(response => (response.ok) ? response.json(): new Error(response.statusText))
    .then(json => "hourly" in json && "temperature_2m" in json.hourly && "time" in json.hourly ?
      Promise.resolve({time: json.hourly.time, temperature_2m: json.hourly.temperature_2m}) 
      : Promise.reject("Unable to receive weather data"));
}
