'use strict'

const clib = require("../core/covoit");
const P = new clib();


// Build options for a journey
const options = {
  kms: 35.5,
  price_per_kms: 1.62,
  passengers: [],
  comeBack: true,
  conductor: "ugo",
  car: {
    model: "308",
    brand: "Peugeot",
    consumption: 7
  }
};


const journey = P.createJourney(options);
const uPassenger = P.createPassenger({ name: "ugo", age: 28 }, { number_per_week: 5, comeBack: true });

journey.addPassengers(uPassenger)
const passengersList = journey.passengersList;


// Calculate price per passenger
const pricePerPassenger = journey.calculate();
console.log(`Price per passenger : ${pricePerPassenger}€`);

const roundedPricePerPassenger = journey.calculate({ rounded: 2});
console.log(`Rounded price per passenger : ${roundedPricePerPassenger}€`);


// Calculate for a passenger
const passengerName = 'ugo'

const uPrice = journey.calculate({ passengerName });
console.log(`Price for ${passengerName} : ${uPrice}€`);

const uRoundedPrice = journey.calculate({ passengerName, rounded: 2 });
console.log(`Rounded price for ${passengerName} : ${uRoundedPrice}€`);


console.log("All the Journey details", journey);