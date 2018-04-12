const { createPassenger, createCocovoit } = require("./core/covoit.js");

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

const p = createPassenger('ugo', 5, true);
const c = createCocovoit(options);

c.addPassengers(p)
c.getPassengers()

console.log('User', p)
console.log('Cocovoit', c)
console.log(c.calc())