'use strict'

const clib = require("./core/covoit");
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

// Create a journey
const journey = P.createJourney(options);

// Create a passenger
const uPassenger = P.createPassenger({ name: "ugo", age: 28 }, { number_per_week: 5, comeBack: true });

// Add a passenger
journey.addPassengers(uPassenger)
const passengersList = journey.passengersList;
// .. do something with the passengers list

// Get the price per passenger for a journey
const pricePerPassenger = journey.calculate();
console.log(`Price per passenger : ${pricePerPassenger}€`);

// Get the rounded price per passenger for a journey
const roundedPricePerPassenger = journey.calculate({ rounded: 2});
console.log(`Rounded price per passenger : ${roundedPricePerPassenger}€`);

// Get the price for passenger with username === "ugo"
const passengerName = 'ugo'
const uPrice = journey.calculate({ passengerName });
console.log(`Price for ${passengerName} : ${uPrice}€`);

// Get the rounded price for passenger with username === "ugo"
const uRoundedPrice = journey.calculate({ passengerName, rounded: 2 });
console.log(`Rounded price for ${passengerName} : ${uRoundedPrice}€`);


console.log("All the Journey details", journey);