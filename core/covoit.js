const find = require('lodash/find')
const isArray = require("lodash/isArray");


/**
 * Covoit class
 * @param {object} an object with data
 */
class Covoit {
  constructor(props) {
    this.passengers = props.passengers || [];
    this.total = 0;
    this.kms = props.comeBack ? props.kms * 2 : props.kms;
    this.price_per_kms = props.price_per_kms;
    this.comeBack = props.comeBack || false;
    this.conductor = props.conductor || "ugo";
    this.car = props.car || {}
  }
  getCocovoitParameters() {
    return this;
  }
  getPassengers() {
    return this.passengers;
  }
  calc() {
    // 5.2 x 328 / 100 * 1.35 / 3
    // PRIXparPASSAGER = CONSO x NKM / 100 * PRIXduL / NBOCCUPANTS
    const personsWhoPay = this.passengers.length === 0 ? 1 : this.passengers.length + 1;
    return this.car.consumption * this.kms / 100 * this.price_per_kms / personsWhoPay;
  }
  addPassengers(passengers) {
    if (isArray(passengers)) {
      return passengers.map(passenger => this.passengers.push(passenger));
    }
    return (this.passengers[0] = passengers);
  }
  resetPassengers() {
    return (this.passengers = []);
  }
}

/**
 * Create a Person
 * @param {object} with data
 */
class Passenger {
    constructor(name, number_per_week, comeback) {
        this.name = name;
        this.number_per_week = number_per_week;
        this.comeback = comeback;
    }
}

/**
 * Create a Passenger
 * @param {string} name 
 * @param {integer} number_per_week 
 * @param {boolean} comeback 
 */
function createPassenger(name, number_per_week, comeback) {
  return new Passenger(name, number_per_week, comeback);
}

/**
 * Create a cocovoit
 * @param {object} options 
 */
function createCocovoit(options) {
  return new Covoit(options);
}

module.exports = {
  createPassenger,
  createCocovoit
};