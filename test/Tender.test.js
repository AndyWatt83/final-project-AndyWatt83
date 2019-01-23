const Tender = artifacts.require('./Tender.sol');
const truffleAssert = require('truffle-assertions');

contract('Testing Tender', async (accounts) => {
    it('Should store the constructor arguments', async () => {
        const tender = await Tender.new(123, 45);
        const tenderId = await tender.tenderId.call();
        const percentageDownpayment = await tender.percentageDownpayment.call();
        const currentState = await tender.currentState.call();

        console.log(currentState);

        assert.equal(tenderId, 123);
        assert.equal(percentageDownpayment, 45);
    });

    it('Should revert if moved directly to a complete state', async () => {
        const tender = await Tender.new(123, 45);

        await truffleAssert.reverts(tender.completeTender());
    });

    it('Should revert if opened without an IPFS hash', async () => {
        const tender = await Tender.new(123, 45);

        await truffleAssert.reverts(tender.openTender());
    });

    it('Should open if an IPFS hash is set', async () => {
        const tender = await Tender.new(123, 45);

        await tender.setIpfsHash('Any string will work in here');
        const result = await tender.openTender();

        truffleAssert.eventEmitted(result, 'tenderOpened');
    });
});
