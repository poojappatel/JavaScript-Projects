import { fetchUniversityWeather} from "./universityWeather.js";
import { writeToJSONFile } from "./fileUtility.js"
import { readFromJSONFile} from "./fileUtility.js"


const promise = fetchUniversityWeather("University of Michigan");

promise.then(w => writeToJSONFile("./weatherFile.txt", w)
.then(r => readFromJSONFile("./weatherFile.txt")
.then(avg => console.log("Weather at UCal: " + avg.totalAverage))));
