const find = require('lodash/find')
const isArray = require("lodash/isArray");
const random = require("lodash/random");
const isObject = require("lodash/isObject");

/**
 * Create a Person
 * @param {{string}} name of the passenger
 * @param {{integer}} age of the passenger
 * @param {{integer}} number_per_week special parameters for the passenger during journey
 * @param {{boolean}} comeBack is he going back on the same trip ?
 */
class Passenger {
  constructor(details, { number_per_week, comeBack }) {
      this.name = details.name || undefined;
      this.age = details.age || undefined;
      this.number_per_week = number_per_week || undefined;
      this.comeBack = comeBack || false;
  }
}

/**
 * Journey class
 * @param {{string}} conductor conductor's name for the journey
 * @param {{integer}} kms the kilometers of the journey
 * @param {{array || object}} passengers the passengers list
 * @param {{integer}} price_per_kms the price that cost a kilometer according the fuel
 * @param {{boolean}} comeBack object with data
 * @param {{boolean}} smoking is smoking allowed ?
 * @param {{object}} car object with data
 */
class Journey {
  constructor(props) {
    this.conductor = props.conductor || this.passengers[random(0, this.passengers.length)];
    this.kms = props.comeBack ? props.kms * 2 : props.kms;
    this.passengers = props.passengers || [];
    this.price_per_kms = props.price_per_kms;
    this.comeBack = props.comeBack || false;
    this.smoking = props.smoking || false;
    this.car = props.car || {}
  }
  get parameters() {
    return this;
  }
  get passengersList() {
    return this.passengers;
  }
  get pricePerPassenger() {
    for (const passenger in this.passengers) {
      if (this.passengers.hasOwnProperty(passenger)) {
        const element = this.passengers[passenger];
        const calc = this.calculate(element.name)
        // console.log('\n ** calc', { calc, name : element.name});
        this.passengers.push({ price: calc, name: element.name });
        // console.log('\n ** el', element);
      }
    }
    console.log("\n ** this.passengers", this.passengers);
    return;
  }
  /**
   * Calculate price for a passenger, or globally
   * @param {string} passengerName 
   */
  calculate(passengerName) {
    this.numberOfPayers = this.passengers.length === 0 ? 1 : this.passengers.length +1;
    if(passengerName){
      const pInfos = this.passengers.find(passenger => passenger.name === passengerName)
      return (this.car.consumption * this.kms / 100 * this.price_per_kms / this.numberOfPayers) * pInfos.number_per_week;
    }
    // 5.2 x 328 / 100 * 1.35 / 3
    // PRIXparPASSAGER = CONSO x NKM / 100 * PRIXduL / NBOCCUPANTS
    return this.car.consumption * this.kms / 100 * this.price_per_kms / this.numberOfPayers;
  }

  /**
   * addPassengers
   * Add passengers to the Journey
   * @param {array || object} passengers 
   * @return {object}
   */
  addPassengers(passengers) {
    if(isObject(passengers)){
      if (isArray(passengers)) {
        return passengers.map(passenger => this.passengers.push(passenger));
      }
      return (this.passengers[0] = passengers);
    } else {
      const error = new Error('passengers should be an object or an array of objects')
      error.code = 'BAD_REQUEST'
      throw error;
    }
  }
  resetPassengers() {
    return (this.passengers = []);
  }
}

/**
 * Cocovoit
 */
class Cocovoit {
  createPassenger(name, number_per_week, comeBack) {
    return new Passenger(name, number_per_week, comeBack);
  }
  createJourney(options) {
    return new Journey(options);
  }
}

function createCocovoit(){
  return new Cocovoit()
}

module.exports = createCocovoit;
