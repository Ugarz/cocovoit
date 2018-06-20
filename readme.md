# Simple carpooling library
This is a simple test of a carpooling library, built with node and some ♥. 

![](https://travis-ci.org/Ugarz/cocovoit.svg?branch=master)

- [Mocha Documentation](https://mochajs.org/)
- [Shouldjs - Site Documentation](https://shouldjs.github.io/#assertion-be)
- [Shouldjs - Github Documentation](https://github.com/shouldjs/should.js)

Resources 
- [Calcul selon caroulepourvous.com/](http://www.caroulepourvous.com/info-4.php)

## Working with the library
This library is a simple project to build something (re)usable with tests.

```js
const Coco = require("cocovoit");
const Carpooling = new Coco();

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

// Get the passengers of a journey
const numberOfPassengers = journey.passengersList;

// Get the price per passenger for a journey
const pricePerPassenger = journey.calculate();

console.log("All the Journey details", journey);
```
See in the `examples/` folder to see more ways on how to play with the library.

## Working on the library
```bash
git clone git@github.com:Ugarz/cocovoit.git
cd cocovoit
npm start          // Run the example code
npm run dev        // Run a live server to play around (you can edit examples/example-1.js in live mode)
npm test           // Run the tests
npm run test:live  // Run the tests, live
```

[![Cocovoit - Les Lopez](https://cdn.koreus.com/thumbshigh/201703/les-lopez-cocovoit.jpg)](https://youtu.be/3EnE9FylZXg)
