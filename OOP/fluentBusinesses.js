class FluentBusinesses {
  // constructor(data: object[])
  constructor(data) {
    this.data = data;
  }

  // fromCityInState(city: string, state: string): FluentBusinesses
  // method that filters out all businesses based on city and state objects in data
  // parameters: city (string) and state (string)
  // return: a new FluentBusinesses object with all businesses that staisfy conditions
  fromCityInState(city, state) {
    return new FluentBusinesses(this.data.filter(obj => (Object.hasOwn(obj, 'city') && Object.hasOwn(obj, 'state') && obj.city === city && obj.state === state)));
  }

  // hasStarsGeq(stars: number): FluentBusinesses
  // method that filters out all businesses based on how many stars each business has
  // parameters: stars (number)
  // return: a new FluentBusinesses object with all businesses that staisfy condition
  hasStarsGeq(stars) {
    return new FluentBusinesses(this.data.filter(obj => obj.stars >= stars));
  }

  // inCategory(category: string): FluentBusinesses
  // method that filters out all businesses based on city and state objects in data
  // parameters: city (string) and state (string)
  // return: a new FluentBusinesses object with all businesses that staisfy conditions
  inCategory(category) {
    return new FluentBusinesses(this.data.filter(obj => Object.hasOwn(obj, 'categories') && (obj.categories).includes(category)));
  }

  // isOpenOnDays(days: string[]): FluentBusinesses
  // method that filters out all businesses based on the days each business is open
  // parameters: days which is an array of strings
  // return: a new FluentBusinesses object with all businesses that staisfy conditions
  isOpenOnDays(days) {
    return new FluentBusinesses(this.data.filter(obj => Object.hasOwn(obj, 'hours') && days.every(e => Object.hasOwn(obj.hours, e))));
  }

  // hasAmbience(ambience: string): FluentBusinesses
  // method that filters out all businesses based on if business has ambience
  // parameters: ambience (string)
  // return: a new FluentBusinesses object with all businesses that staisfy conditions
  hasAmbience(ambience) {
    return new FluentBusinesses(this.data.filter(obj => Object.hasOwn(obj, 'attributes') 
    && Object.hasOwn(obj.attributes, 'Ambience') && Object.hasOwn(obj.attributes.Ambience, ambience) 
    && Object.entries(obj.attributes.Ambience).some(e2 => e2.includes(ambience) && e2.includes(true))));
  }

  // bestPlace(): object
  // method that finds that best business which should have the highest number of stars and if needed reviews
  // parameters: none
  // return: a business's object
  bestPlace() {
    return this.data.reduce((acc, obj) => {
      if (Object.hasOwn(obj, 'stars') && !Object.hasOwn(acc, 'stars')) { return obj; }
      else if (Object.hasOwn(obj, 'stars') && obj.stars > acc.stars) { return obj; }
      else if (Object.hasOwn(obj, 'stars') && obj.stars === acc.stars && Object.hasOwn(obj, 'review_count') && Object.hasOwn(acc, 'review_count') && obj.review_count > acc.review_count) { return obj; }
      else if (Object.hasOwn(obj, 'stars') && obj.stars === acc.stars && !Object.hasOwn(acc, 'review_count') && Object.hasOwn(obj, 'review_count')) { return obj; }
      else { return acc; }
    }, {});
  }

  // mostReviews(): object
  // method that finds that best business which should have the highest number of revies and if needed stars
  // parameters: none
  // return: a business's object
  mostReviews() {
    return this.data.reduce((acc, obj) => {
      if (Object.hasOwn(obj, 'review_count') && !Object.hasOwn(acc, 'review_count')) { return obj; }
      else if (Object.hasOwn(obj, 'review_count') && obj.review_count > acc.review_count) { return obj; }
      else if (Object.hasOwn(obj, 'review_count') && obj.review_count === acc.review_count && Object.hasOwn(obj, 'stars') && Object.hasOwn(acc, 'stars') && obj.stars > acc.stars) { return obj; }
      else if (Object.hasOwn(obj, 'review_count') && obj.review_count === acc.review_count && !Object.hasOwn(acc, 'stars') && Object.hasOwn(obj, 'stars')) { return obj; }
      else { return acc; }
    }, {});
  }
}

module.exports = FluentBusinesses;
