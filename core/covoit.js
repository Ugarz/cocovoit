const find = require('lodash/find')
const isArray = require("lodash/isArray");
const random = require("lodash/random");

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
 * Journey class
 * @param {object} an object with data
 */
class Journey {
  constructor(props) {
    this.passengers = props.passengers || [];
    this.total = 0;
    this.kms = props.comeBack ? props.kms * 2 : props.kms;
    this.price_per_kms = props.price_per_kms;
    this.comeBack = props.comeBack || false;
    this.conductor = props.conductor || this.passengers[random(0, this.passengers.length)];
    this.car = props.car || {}
  }
  getCocovoitParameters() {
    return this;
  }
  getPassengers() {
    return this.passengers;
  }
  calculate() {
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
 * 
 */
class Cocovoit {
  createPassenger(name, number_per_week, comeback) {
    return new Passenger(name, number_per_week, comeback);
  }
  createJourney(options) {
    return new Journey(options);
  }
}

function createCocovoit(){
  return new Cocovoit()
}

module.exports = createCocovoit;
