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
class Person {
    constructor(name, number_per_week, comeback) {
        this.name = name;
        this.number_per_week = number_per_week;
        this.comeback = comeback;
    }
}


// Créer une personne
const uPassenger = new Person('ugo', 5, true);
const cPassenger = new Person('camille', 3, true);
const jPassenger = new Person('julien', 2, true);

// Créer un covoit
const cocovoit = new Covoit({
    kms: 35.5,
    price_per_kms: 1.62,
    passengers: ['ugo', 'camille', 'julien'],
    comeBack: true
});
console.log('** Cocovoit', cocovoit);

// Inviter des personnes

// Calculer le montant
console.log("Price a day", cocovoit.getDayPrice());











// console.log("Cotiz", cocovoit.calc(uPassenger));
// console.log("Cotiz", cocovoit.calc(cPassenger));
// console.log("Cotiz", cocovoit.calc(jPassenger));


// console.log('cocovoit', cocovoit)

// const total = 44.72

// const persons = ['ugo', 'camille', 'julien']
// const pPrice = total / persons.length;

// console.log(`-> $${total} is the total to pay`)
// console.log(`-> $${pPrice} per person divide by ${persons.length}`)

// persons.map(calc);

// function calc(person, total){
//     switch (person) {
//         case 'julien':
//             return total * (10 / 100);
//         case 'camille':
//             return total * (45 / 100);
//         case 'ugo':
//             return total * (45 / 100);
//         default:
//             return total;
//             break;
//     }
// }

// let jPrice = calc('julien', total),
//     cPrice = calc('camille', total),
//     uPrice = calc('ugo', total);

// const isMatchingPrices = (jPrice + cPrice + uPrice === total) ? 'Yes' : 'No'

// console.log('\n Est-ce que ca correspond ?', isMatchingPrices, { total, isMatchingPrices})
// console.log(`---`)
// console.log(`Julien doit ${jPrice} €`)
// console.log(`Camille doit ${cPrice} €`)
// console.log(`Ugo doit ${uPrice} €`)
// console.log(`---`)