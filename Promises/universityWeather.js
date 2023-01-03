import { fetchCurrentWeather } from "./fetchCurrentWeather.js"
import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js"
import { fetchUniversities } from "./fetchUniversities.js"

//fetchUniversityWeather(universityQuery: string): Promise<{ [key: string]: number }>
export async function fetchUniversityWeather(query) {
  // TODO
  let totalSum = 0;
  let counter = 0;
  let object = { totalAverage: 0};
  let universities = await fetchUniversities(query);

  return Promise.all(universities.map(e =>
    fetchLongitudeAndLatitude(e)
    .then(longLat => fetchCurrentWeather(longLat.lon, longLat.lat))
    .then(weather => {
      let totAvg = weather.temperature_2m.reduce((acc, elem) => acc + elem, 0)/weather.temperature_2m.length;
      object[e] = totAvg;
      totalSum += totAvg;
      ++counter;
    })
    )).then(e => {
      object.totalAverage = totalSum/counter;
      return object;
    }).catch(new Error("No results found for query."))
  }

export function fetchUMassWeather() {
  // TODO
  return fetchUniversityWeather("University of Massachusetts");
}

export function fetchUCalWeather() {
  // TODO
  return fetchUniversityWeather("University of California");
}
