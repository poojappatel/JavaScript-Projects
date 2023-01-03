const data = require("./data.json");
const FluentBusinesses = require("./FluentBusinesses");

// Find some great doctors in Santa Barbara, CA

const doctors = new FluentBusinesses(data)
  //.isOpenOnDays(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]).data
  //.inCategory("Doctors")
  //.fromCityInState("Santa Barbara", "CA")
  //.hasStarsGeq(4.5).data;
  //.hasAmbience("casual").data;
  .bestPlace()

  //console.log("Great doctor in Santa Barbara, CA: " + doctors.categories);
  //console.log("Great doctor in Santa Barbara, CA: " );
console.log("Great doctor in Santa Barbara, CA: " + doctors.name);



const greatRestaurant = new FluentBusinesses(data)
  .hasStarsGeq(5)
  .inCategory("Restaurants")
  .fromCityInState("Tampa", "FL")
  .mostReviews();

console.log("Best restaurant in Tampa, FL: " + greatRestaurant.name);
