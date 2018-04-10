const { createPassenger, createCocovoit } = require("./core/covoit.js").default;

const options = {
  kms: 35.5,
  price_per_kms: 1.62,
  passengers: ["ugo", "camille", "julien"],
  comeBack: true,
  conductor: "ugo"
};

const p = createPassenger('ugo', 5, true);
const c = createCocovoit(options);

console.log('User', p)
console.log('Cocovoit', c)