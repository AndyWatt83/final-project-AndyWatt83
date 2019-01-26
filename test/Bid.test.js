const Bid = artifacts.require('./Bid.sol');
const Tender = artifacts.require('./Tender.sol');
// const truffleAssert = require('truffle-assertions');

/* These tests ensure the correct operation of the Bid contract.
**/
contract('Testing Bid', async (accounts) => {
    /* Tests the functionality of the constructor.
     * Simply check that the params are stored.
     **/
    it('Should store the constructor argument(s)', async () => {
        const tender = await Tender.new(123, 45);
        const bid = await Bid.new(tender.address);

        const tenderAddress = await bid.tenderAddress.call();

        assert.equal(tenderAddress, tender.address);
    });
});
