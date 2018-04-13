# WIP simple covoit Lib
This is a simple test of a carpooling library.

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
const journey = Carpooling.createJourney(options);
// Create a passenger
const passenger = Carpooling.createPassenger('ugo', 5, true);
// Add a passenger
journey.addPassengers(passenger);
// Get the passengers of a journey
const numberOfPassengers = journey.getPassengers();
// Get the price per passenger for a journey
const pricePerPassenger = journey.calculate();
```
See the `server.js` to see more on how to play with the library.

## Working on the library
```bash
git clone git@github.com:Ugarz/cocovoit.git
cd cocovoit
npm start          // Run the server
npm test           // Run the tests
npm run test:live  // Run the tests, live
```

[![Cocovoit - Les Lopez](https://cdn.koreus.com/thumbshigh/201703/les-lopez-cocovoit.jpg)](https://youtu.be/3EnE9FylZXg)
