const assert = require("assert");
const should = require('should')

const {
  createPassenger,
  createCocovoit
} = require("./core/covoit.js");

describe("Basic tests", function() {
  it("Should create passengers", function() {
    const uPassenger = createPassenger("ugo", 5, true);
    const cPassenger = createPassenger("camille", 3, true);
    const jPassenger = createPassenger("julien", 2, true);

    cPassenger.should.have.property("name", "camille");
    jPassenger.should.have.property("name", "julien");
    uPassenger.should.have.property("name", "ugo");
    uPassenger.should.have.property("name").with.lengthOf(3);
    uPassenger.number_per_week.should.be.exactly(5).and.be.a.Number();
  });

  it("Should create Cocovoit", function() {
    const options = {
        kms: 35.5,
        price_per_kms: 1.62,
        passengers: ['ugo', 'camille', 'julien'],
        comeBack: true,
        conductor: 'ugo'
    }
    const cocovoit = createCocovoit(options);
    cocovoit.should.have.property("passengers", options.passengers);
    cocovoit.should.have.property("price_per_kms", options.price_per_kms);
    cocovoit.should.have.property("comeBack", options.comeBack);
    cocovoit.should.have.property("conductor", options.conductor);
    cocovoit.should.have.property("kms", options.kms);
  });
  
  it("Should create and add a passenger to the cocovoit", function() {
    const options = {
      kms: 35.5,
      price_per_kms: 1.62,
      comeBack: true,
      conductor: 'ugo'
    }
    const cocovoit = createCocovoit(options);
    const uPassenger = createPassenger("ugo", 5, true);
    
    cocovoit.addPassenger(uPassenger)
    const passengersList = cocovoit.getPassengers();
    
    assert.deepEqual(passengersList[0], uPassenger);
    
    passengersList[0].should.have.property("name");
    passengersList[0].should.have.property("number_per_week");
    passengersList[0].should.have.property("comeback");
    
    uPassenger.should.have.property("name", "ugo");
    uPassenger.should.have.property("name").with.lengthOf(3);
    uPassenger.number_per_week.should.be.exactly(5).and.be.a.Number();
  });
  
  it("Should create and add a bunch of passengers to the cocovoit", function() {
    const options = { kms: 35.5, price_per_kms: 1.62, comeBack: true, conductor: "ugo" };
    const cocovoit = createCocovoit(options);

    const uPassenger = createPassenger("ugo", 5, true);
    const cPassenger = createPassenger("camille", 3, true);

    cocovoit.addPassenger([uPassenger, cPassenger]);
    const passengersList = cocovoit.getPassengers();

    assert.deepEqual(passengersList, [uPassenger, cPassenger]);

    passengersList[0].should.have.property("name");
    passengersList[0].should.have.property("number_per_week");
    passengersList[0].should.have.property("comeback");
  });
  
  it("Should reset the passengers of current cocovoit", function() {
    const options = { kms: 35.5, price_per_kms: 1.62, comeBack: true, conductor: "ugo" };
    const cocovoit = createCocovoit(options);

    const uPassenger = createPassenger("ugo", 5, true);
    const cPassenger = createPassenger("camille", 3, true);

    cocovoit.addPassenger([uPassenger, cPassenger]);
    let passengersList = cocovoit.getPassengers();
    
    assert.deepEqual(passengersList, [uPassenger, cPassenger]);
    
    passengersList[0].should.have.property("name");
    passengersList[0].should.have.property("number_per_week");
    passengersList[0].should.have.property("comeback");
    
    cocovoit.resetPassengers();
    
    passengersList = cocovoit.getPassengers();
    
    passengersList.should.not.have.property("name");
    passengersList.should.not.have.property("number_per_week");
    passengersList.should.not.have.property("comeback");
  });
});



describe("Operation tests", function() {
  it("Should get full price of current cocovoit", function() {
    const options = { kms: 35.5, price_per_kms: 1.62, comeBack: true, conductor: "ugo" };
    const cocovoit = createCocovoit(options);
    const totalPrice = cocovoit.getTotalPrice()

    totalPrice.should.be.aboveOrEqual(0);
    totalPrice.should.be.belowOrEqual(44);
  });
});
