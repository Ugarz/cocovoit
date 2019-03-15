/**
 * @license
 * Copyright (c) 2015 Example Corporation Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
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
  constructor(details, { number_per_week, age, comeBack }) {
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
 * @param {{object}} passengers the passengers list
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
  /**
   * Calculate price for a passenger, or globally
   * @param {{string}} passengerName 
   * @param {{integer}} rounded
   * @return {integer} price || roundedPrice
   */
  calculate(options) {
    this.numberOfPayers = this.passengers.length === 0 ? 1 : this.passengers.length +1;
    
    const calc = () => this.car.consumption * this.kms / 100 * this.price_per_kms / this.numberOfPayers;
    const calcForPassenger = pInformations => this.car.consumption * this.kms / 100 * this.price_per_kms / this.numberOfPayers * pInformations.number_per_week;
    const roundPrice = (price, by) => price.toFixed(by)
    
    if (options && options.passengerName !== undefined){
      const pInformations = this.passengers.find(passenger => passenger.name === options.passengerName);
      if(options.rounded){
        const price = calcForPassenger(pInformations);
        return roundPrice(price, options.rounded);
      }
      const price = calcForPassenger(pInformations);
      return price;
    }
    if(options && options.rounded){
      const price = calc()
      return roundPrice(price, options.rounded);
    }
    // 5.2 x 328 / 100 * 1.35 / 3
    // PRIXparPASSAGER = CONSO x NKM / 100 * PRIXduL / NBOCCUPANTS
    return calc()
  }

  /**
   * addPassengers
   * Add passengers to the Journey
   * @description Add a passenger to the journey
   * @param {object} passengers 
   * @throws {BAD_REQUEST} passengers should be an object or an array of objects.
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
 * Accessor Class Cocovoit
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
