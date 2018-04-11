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
    this.kms = props.kms;
    this.price_per_kms = props.price_per_kms;
    this.comeBack = props.comeBack || false;
    this.conductor = props.conductor || "ugo";
  }
  getPassengers(){
    return this.passengers;
  }
  getTotalPrice() {
    if (this.comeBack) {
      this.kms = this.kms * 2;
      console.log(`Total distance : ${this.kms}kms`);
      this.total = this.kms / this.price_per_kms;
      return this.total;
    }
    console.log(`Total distance : ${this.kms}kms`);
    this.total = this.kms / this.price_per_kms;
    return this.total;
  }
  calc(props) {
    return props.number_per_week * this.price_per_kms;
  }
  addPassenger(passengers) {
    if(isArray(passengers)){
      return passengers.map(passenger => this.passengers.push(passenger))
    }
    return this.passengers[0] = passengers
  }
  resetPassengers(){
    return this.passengers = [];
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