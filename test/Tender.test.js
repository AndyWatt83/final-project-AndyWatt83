const Tender = artifacts.require('./Tender.sol');
// const truffleAssert = require('truffle-assertions');

contract('Testing Tender', async (accounts) => {
    it('Should store the constructor arguments', async () => {
        const tender = await Tender.new(123, 45);

        const tenderId = await tender.tenderId.call();
        const percentageDownpayment = await tender.percentageDownpayment.call();

        assert.equal(tenderId, 123);
        assert.equal(percentageDownpayment, 45);
    });
});
