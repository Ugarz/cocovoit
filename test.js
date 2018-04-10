const assert = require("assert");
const should = require('should')

const { createPassenger, createCocovoit } = require("./core/covoit.js").default;


describe("Testing passenger creation", function() {
  describe("Should create a Passenger", function() {
    it("Should return a passenger with data", function() {
      const uPassenger = createPassenger("ugo", 5, true);
      const cPassenger = createPassenger("camille", 3, true);
      const jPassenger = createPassenger("julien", 2, true);

      cPassenger.should.have.property("name", "camille");
      jPassenger.should.have.property("name", "julien");
      uPassenger.should.have.property("name", "ugo");
      uPassenger.should.have.property("name").with.lengthOf(3);
      uPassenger.number_per_week.should.be.exactly(5).and.be.a.Number();
    });
  });
});


describe("Testing Cocovoit", function() {
  it("Should create Users", function() {
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
    cocovoit.should.have.property("kms", options.kms);
  }); 

});
