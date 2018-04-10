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
    this.conductor = props.conductor || 'ugo';
  }
  getDayPrice() {
      if(this.comeBack){
          this.kms = this.kms * 2;
          console.log(`Come back true : ${this.kms}kms`)
          this.total = this.kms / this.price_per_kms;
          return this.total;
        }
        console.log(`Come back false : ${this.kms}kms`)
        this.total = this.kms / this.price_per_kms;
        return this.total;
  }
  calc(props) {
      return props.number_per_week * this.price_per_kms;
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