const Bid = artifacts.require('./Bid.sol');
const Tender = artifacts.require('./Tender.sol');
// const truffleAssert = require('truffle-assertions');

contract('Testing Bid', async (accounts) => {
    it('Should store the constructor argument(s)', async () => {
        const tender = await Tender.new(123, 45);
        const bid = await Bid.new(tender.address);

        const tenderAddress = await bid.tenderAddress.call();

        assert.equal(tenderAddress, tender.address);
    });
});
