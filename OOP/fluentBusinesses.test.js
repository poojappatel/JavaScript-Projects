const assert = require("assert");
const FluentBusinesses  = require("./FluentBusinesses");

const testData = [
  {
    name: "Applebee's",
    city: "Charlotte",
    state: "NC",
    stars: 4,
    review_count: 6,
    categories: [
      "Fast Food",
      "Burgers",
      "Nightlife",
      "Bars",
      "American (Traditional)",
      "Chicken Wings",
      "Sports Bars",
      "Steakhouses",
      "Restaurants"
    ],
    attributes: { 
      Ambience: {
        touristy: true,
        hipster: false,
        romantic: false,
        divey: false,
        intimate: false,
        trendy: false,
        upscale: false,
        classy: false,
        casual: true
      }
    },
    hours: {
      Monday: "0:0-0:0",
      Tuesday: "11:0-20:0",
      Wednesday: "11:0-20:0",
      Thursday: "11:0-20:0",
      Friday: "11:0-19:0",
      Saturday: "11:0-1:0",
      Sunday: "11:0-20:0"
    }
  },
  {
    name: "China Garden",
    state: "NC",
    city: "Charlotte",
    stars: 4,
    review_count: 10,
    categories: [
      "Restaurants",
      "Chinese"
    ],
    attributes: {
      Ambience: {
        romantic: false,
        intimate: false,
        classy: true,
        hipster: false,
        divey: false,
        touristy: true,
        trendy: false,
        upscale: false,
        casual: false
      }
    },
    hours: {
      Monday: "11:30-21:0",
      Tuesday: "11:30-21:0",
      Wednesday: "11:30-21:0",
      Thursday: "11:30-21:0",
      Friday: "11:30-21:0",
      Saturday: "11:30-21:0"
    }
  },
  {
    name: "Beach Ventures Roofing",
    state: "AZ",
    city: "Phoenix",
    stars: 3,
    review_count: 30,
    categories: [
      "Apartments",
      "Roofing",
      "Real Estate",
      "Home Services"
    ]
  },
  {
    name: "Alpaul Automobile Wash",
    city: "Charlotte",
    state: "NC",
    stars: 2,
    review_count: 30,
    categories: [
      "Tires",
      "Automotive",
      "Auto Repair",
      "Oil Change Stations",
      "Auto Detailing",
      "Car Wash"
    ],
    hours: {
      Monday: "8:0-16:0",
      Tuesday: "8:0-18:0",
      Wednesday: "8:0-18:0",
      Thursday: "8:0-18:0",
      Friday: "8:0-18:0",
      Saturday: "8:0-18:0",
      Sunday: "9:0-17:0"
    }
  }
];

test("fromCityInState filters correctly", () => {
  const list = new FluentBusinesses(testData).fromCityInState("Charlotte", "NC").data;
  assert(list.length === 3);
  assert(list[0].name === "Applebee's");
  assert(list[1].name === "China Garden");
  assert(list[2].name === "Alpaul Automobile Wash");
});

test("hasStarsGeq filters correctly", () => {
  const stars = new FluentBusinesses(testData).hasStarsGeq(4).data
    assert(stars.length === 2);
    assert(stars[0].name === "Applebee's");
    assert(stars[1].name === "China Garden");
});

test("hasStarsGeq filters correctly for decimal", () => {
  const stars = new FluentBusinesses(testData).hasStarsGeq(2.5).data
    assert(stars.length === 3);
    assert(stars[0].name === "Applebee's");
    assert(stars[1].name === "China Garden");
    assert(stars[2].name === "Beach Ventures Roofing");
});

test("hasStarsGeq filters correctly with greater than 5", () => {
  const stars = new FluentBusinesses(testData).hasStarsGeq(6).data
    assert(stars.length === 0);
});

test("hasStarsGeq filters correctly with 0", () => {
  const stars = new FluentBusinesses(testData).hasStarsGeq(0).data
    assert(stars.length === 4);
    assert(stars[0].name === "Applebee's");
    assert(stars[1].name === "China Garden");
    assert(stars[2].name === "Beach Ventures Roofing");
    assert(stars[3].name === "Alpaul Automobile Wash");
});

test("hasStarsGeq filters correctly with negative number", () => {
  const stars = new FluentBusinesses(testData).hasStarsGeq(-1).data
    assert(stars.length === 4);
    assert(stars[0].name === "Applebee's");
    assert(stars[1].name === "China Garden");
    assert(stars[2].name === "Beach Ventures Roofing");
    assert(stars[3].name === "Alpaul Automobile Wash");
});

test("bestPlace tie-breaking", () => {
  const best = new FluentBusinesses(testData)
    .fromCityInState("Charlotte", "NC")
    .bestPlace();
  assert(best.name === "China Garden");
});

test("mostReviews tie-breaking", () => {
  const reviews = new FluentBusinesses(testData)
    //.fromCityInState("Charlotte", "NC")
    .mostReviews();
  assert(reviews.name === "Beach Ventures Roofing");
});
  
test("inCategory filters correctly", () => {
  const catList = new FluentBusinesses(testData).inCategory("Restaurants").data
    assert(catList.length === 2);
    assert(catList[0].name === "Applebee's");
    assert(catList[1].name === "China Garden");
});

test("inCategory filters correctly", () => {
  const catList = new FluentBusinesses(testData).inCategory("Tires").data
    assert(catList.length === 1);
    assert(catList[0].name === "Alpaul Automobile Wash");
});

test("hasAmbience filters correctly", () => {
  const ambList = new FluentBusinesses(testData).hasAmbience("casual").data
    assert(ambList.length === 1);
    assert(ambList[0].name === "Applebee's");
});

test("hasAmbience filters correctlys", () => {
  const ambList = new FluentBusinesses(testData).hasAmbience("touristy").data
    assert(ambList.length === 2);
    assert(ambList[0].name === "Applebee's");
    assert(ambList[1].name === "China Garden");
});

test("hasAmbience works when no attribute", () => {
  const ambList = new FluentBusinesses(testData)
  .fromCityInState("Phoenix", "AZ")
  .hasAmbience("touristy").data
    assert(ambList.length === 0);
});

test("isOpenOnDays filters correctlys", () => {
  const open = new FluentBusinesses(testData)
  .isOpenOnDays(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]).data
    assert(open.length === 2);
    assert(open[0].name === "Applebee's");
    assert(open[1].name === "Alpaul Automobile Wash");
});

test("isOpenOnDays filters correctlys with less restricting argument", () => {
  const open = new FluentBusinesses(testData)
  .isOpenOnDays(["Monday", "Tuesday", "Wednesday", "Thursday"]).data
    assert(open.length === 3);
    assert(open[0].name === "Applebee's");
    assert(open[1].name === "China Garden");
    assert(open[2].name === "Alpaul Automobile Wash");
});

test("isOpenOnDays filters correctlys with less restricting argument", () => {
  const open = new FluentBusinesses(testData).isOpenOnDays([]).data
    assert(open.length === 3);
    assert(open[0].name === "Applebee's");
    assert(open[1].name === "China Garden");
    assert(open[2].name === "Alpaul Automobile Wash");
});

test("isOpenOnDays filters correctlys with no hours object", () => {
  const open = new FluentBusinesses(testData)
  .fromCityInState("Phoenix", "AZ")
  .isOpenOnDays([]).data
    assert(open.length === 0);
});

const testData1 = [
  {
    name: "Applebee's",
    // city: "Charlotte",
    // state: "NC",
    // stars: 4,
    review_count: 6,
  },
  {
    name: "Alpaul Automobile Wash",
    // city: "Charlotte",
    state: "NC",
    // stars: 2,
    review_count: 30,
  }
];

test("fromCityInState works with no state/city objects", () => {
  const list = new FluentBusinesses(testData1)
  .fromCityInState("Charlotte", "NC").data
    assert(list.length === 0);
});

test("hasStarsGeq works with no stars object", () => {
  const stars = new FluentBusinesses(testData1)
  .hasStarsGeq(3).data
    assert(stars.length === 0);
});

test("mostReviews works correctly", () => {
  const most = new FluentBusinesses(testData1).mostReviews()
    assert(most.name = "Alpaul Automobile Wash");
});

test("inCategory works with no categories object", () => {
  const noCat = new FluentBusinesses(testData1).inCategory().data
    assert(noCat.length === 0);
});

test("isOpenOnDats works with no hours object", () => {
  const noOpen = new FluentBusinesses(testData1).isOpenOnDays().data
    assert(noOpen.length === 0);
});

const testData2 = [
  {
    name: "Applebee's",
    // city: "Charlotte",
    state: "NC",
    stars: 4,
    review_count: 6,
  }
];

test("fromCityInState works with no state/city objects", () => {
  const list = new FluentBusinesses(testData2)
  .fromCityInState("Charlotte", "NC").data
    assert(list.length === 0);
});

const testData3 = [
  {
    name: "Applebee's",
    city: "Charlotte",
    state: "NC",
    // stars: 4,
    review_count: 6,
  },
  {
    name: "Alpaul Automobile Wash",
    city: "Charlotte",
    state: "NC",
    // stars: 2,
    review_count: 30,
  },
  {
    name: "Beach Ventures Roofing",
    state: "AZ",
    city: "Phoenix",
    stars: 3,
    //review_count: 30,
  },
  {
    name: "China Garden",
    state: "AZ",
    city: "Phoenix",
    stars: 4,
    //review_count: 10,
  }
];

test("bestPlace works with no stars objects", () => {
  const best = new FluentBusinesses(testData3)
  .fromCityInState("Charlotte", "NC")
  .bestPlace()
    assert(Object.keys(best).length === 0);
});

test("bestPlace works with no stars objects", () => {
  const most = new FluentBusinesses(testData3)
  .fromCityInState("Phoenix", "AZ")
  .mostReviews()
    assert(Object.keys(most).length === 0);
});

const testData4 = [
  {
    name: "Megacuts",
    city: "Tuscan",
    state: "AZ",
    stars: 2,
    review_count: 8,
    categories: [
      "Barbers",
      "Beauty & Spas",
      "Hair Salons",
      "Men's Hair Salons",
      "Hair Stylists"
    ],
    hours: {
      Monday: "9:0-20:0",
      Tuesday: "9:0-20:0",
      Wednesday: "9:0-20:0",
      Thursday: "9:0-20:0",
      Friday: "9:0-20:0",
      Saturday: "8:0-19:0"
    }
  },
  {
    name: "Panda Express",
    city: "Saint Louis",
    state: "MO",
    stars: 3.5,
    review_count: 7,
    categories: [
      "Chinese",
      "Fast Food",
      "Restaurants",
      "Family"
    ],
    hours: {
      Monday: "11:0-19:0",
      Tuesday: "11:0-17:0",
      Wednesday: "11:0-19:0",
      Thursday: "11:0-19:0",
      Friday: "11:0-19:0",
      Saturday: "11:0-19:0",
      Sunday: "11:0-19:0"
    }
  },
  {
    name: "Uno Pizzeria & Grill",
    city: "Oaks",
    state: "PA",
    stars: 3,
    review_count: 138,
    attributes: {
      Ambience: {
        romantic: false,
        intimate: false,
        classy: false,
        hipster: false,
        divey: false,
        touristy: false,
        trendy: false,
        upscale: false,
        casual: true
      },
   },
    categories: [
      "Restaurants",
      "American (New)",
      "American (Traditional)",
      "Pizza",
      "Gluten-Free"
    ],
    hours: {
      Monday: "0:0-0:0",
      Tuesday: "11:0-22:0",
      Wednesday: "11:0-22:0",
      Thursday: "11:0-22:0",
      Friday: "11:0-23:0",
      Saturday: "11:0-23:0",
      Sunday: "11:0-22:0"
    }
  },
  {
    name: "Grafitti Wall",
    city: "Saint Louis",
    state: "MO",
    stars: 4.5,
    review_count: 22,
    categories: [
      "Local Flavor",
      "Shopping",
      "Arts & Entertainment",
      "Art Galleries"
    ]
  },
  {
    name: "Wildcat Automotive",
    city: "Tuscan",
    state: "AZ",
    stars: 5,
    review_count: 25,
    categories: [
      "Wheel & Rim Repair",
      "Auto Repair",
      "Automotive",
      "Oil Change Stations",
      "Transmission Repair"
    ],
    hours: {
      Monday: "7:0-17:30",
      Tuesday: "7:0-17:30",
      Wednesday: "7:0-17:30",
      Thursday: "7:0-17:30",
      Friday: "7:0-17:30"
    }
  },
  {
    name: "Hilton El Conquistador",
    city: "Tuscan",
    state: "AZ",
    stars: 3,
    review_count: 16,
    categories: [
      "Active Life",
      "Sports Clubs",
      "Golf"
    ]
  },
  {
    name: "The Wash Factory",
    city: "West Chester",
    state: "PA",
    stars: 4.5,
    review_count: 9,
    categories: [
      "Dry Cleaning & Laundry",
      "Local Services",
      "Laundry Services"
    ],
    hours: {
      Monday: "6:0-23:0",
      Tuesday: "6:0-23:0",
      Wednesday: "6:0-23:0",
      Thursday: "6:0-23:0",
      Friday: "6:0-23:0",
      Saturday: "6:0-23:0",
      Sunday: "6:0-23:0"
    }
  },
  {
    name: "Sandy's Wonderland Spa",
    city: "Cherry Hill",
    state: "NJ",
    stars: 5,
    review_count: 25,
    categories: [
      "Traditional Chinese Medicine",
      "Health & Medical",
      "Massage Therapy",
      "Beauty & Spas",
      "Massage"
    ],
    hours: {
      Monday: "9:0-20:0",
      Tuesday: "9:0-20:0",
      Wednesday: "9:0-20:0",
      Thursday: "9:0-20:0",
      Friday: "9:0-20:0",
      Saturday: "9:0-20:0",
      Sunday: "10:30-19:0"
    }
  },
  {
    name: "Santucci\u2019s",
    city: "Downingtown",
    state: "PA",
    stars: 3.5,
    review_count: 9,
    categories: [
      "Salad",
      "Italian",
      "Restaurants",
      "Pizza"
    ],
    hours: {
      Monday: "0:0-0:0",
      Tuesday: "11:0-21:0",
      Wednesday: "11:0-21:0",
      Thursday: "11:0-21:0",
      Friday: "11:0-21:0",
      Saturday: "11:0-21:0",
      Sunday: "11:0-21:0"
    }
  },
  {
    name: "South Street Cleaners",
    city: "Philadelphia",
    state: "PA",
    stars: 4.5,
    review_count: 28,
    categories: [
      "Dry Cleaning & Laundry",
      "Local Services",
      "Laundry Services"
    ],
    hours: {
      Monday: "7:0-18:30",
      Tuesday: "7:0-18:30",
      Wednesday: "7:0-18:30",
      Thursday: "7:0-18:30",
      Friday: "7:0-18:30",
      Saturday: "8:0-18:0"
    }
  },
  {
    name: "Aviator Hotel & Suites",
    city: "Saint Louis",
    state: "MO",
    stars: 2.5,
    review_count: 5,
    categories: [
      "Venues & Event Spaces",
      "Hotels & Travel",
      "Event Planning & Services",
      "Hotels",
      "Family"
    ],
    hours: {
      Monday: "0:0-0:0",
      Tuesday: "0:0-0:0",
      Wednesday: "0:0-0:0",
      Thursday: "0:0-0:0",
      Friday: "0:0-0:0",
      Saturday: "0:0-0:0",
      Sunday: "0:0-0:0"
    }
  }
];

test("1: testing multiple methods", () => {
  const mult = new FluentBusinesses(testData4)
  .hasStarsGeq(4.5)
  .isOpenOnDays(["Monday", "Wednesday", "Friday"]).data
    assert(mult.length === 4);
    assert(mult[0].name === "Wildcat Automotive");
    assert(mult[1].name === "The Wash Factory");
    assert(mult[2].name === "Sandy's Wonderland Spa");
    assert(mult[3].name === "South Street Cleaners");
});

test("2: testing multiple methods", () => {
  const mult = new FluentBusinesses(testData4)
  .hasStarsGeq(4.5)
  .isOpenOnDays(["Monday", "Wednesday", "Friday"])
  .bestPlace();
    assert(mult.name === "Wildcat Automotive");
});

test("3: testing multiple methods", () => {
  const mult = new FluentBusinesses(testData4)
  .hasStarsGeq(4.5)
  .isOpenOnDays(["Monday", "Wednesday", "Friday"])
  .mostReviews();
    assert(mult.name === "South Street Cleaners");
});

test("4: testing multiple methods", () => {
  const mult = new FluentBusinesses(testData4)
  .fromCityInState("Tuscan", "AZ")
  .isOpenOnDays(["Wednesday"])
  .hasStarsGeq(2).data
    assert(mult.length === 2);
    assert(mult[0].name === "Megacuts");
    assert(mult[1].name === "Wildcat Automotive");
});

test("5: testing multiple methods", () => {
  const mult = new FluentBusinesses(testData4)
  .isOpenOnDays(["Saturday"])
  .hasStarsGeq(2.5)
  .inCategory("Restaurants").data
    assert(mult.length === 3);
    assert(mult[0].name === "Panda Express");
    assert(mult[1].name === "Uno Pizzeria & Grill");
    assert(mult[2].name === "Santucci\u2019s");
});

test("6: testing multiple methods", () => {
  const mult = new FluentBusinesses(testData4)
  .isOpenOnDays(["Saturday"])
  .hasStarsGeq(2.5)
  .inCategory("Restaurants")
  .bestPlace()
    assert(mult.name === "Santucci\u2019s");
});

test("7: testing multiple methods", () => {
  const mult = new FluentBusinesses(testData4)
  .inCategory("Shopping")
  .isOpenOnDays(["Saturday"]).data
    assert(mult.length === 0);
});

test("8: testing multiple methods", () => {
  const mult = new FluentBusinesses(testData4)
  .hasAmbience("casual")
  .isOpenOnDays(["Monday", "Tuesday", "Friday"]).data
    assert(mult.length === 1);
    assert(mult[0].name === "Uno Pizzeria & Grill",);
});

test("9: testing multiple methods", () => {
  const mult = new FluentBusinesses(testData4)
  .hasStarsGeq(3)
  .isOpenOnDays(["Monday", "Tuesday", "Friday"])
  .mostReviews();
    assert(mult.name === "Uno Pizzeria & Grill",);
});

test("10: testing multiple methods", () => {
  const mult = new FluentBusinesses(testData4)
  .fromCityInState("Saint Louis", "MO")
  .isOpenOnDays(["Saturday"])
  .hasStarsGeq(2.5)
  .inCategory("Family").data
    assert(mult.length === 2);
    assert(mult[0].name === "Panda Express");
    assert(mult[1].name === "Aviator Hotel & Suites");
});

test("11: testing multiple methods", () => {
  const mult = new FluentBusinesses(testData4)
  .fromCityInState("Saint Louis", "MO")
  .isOpenOnDays(["Saturday"])
  .hasStarsGeq(2.5)
  .inCategory("Family")
  .bestPlace()
    assert(mult.name === "Panda Express");
});
