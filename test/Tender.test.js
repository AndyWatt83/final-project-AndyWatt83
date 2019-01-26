const Tender = artifacts.require('./Tender.sol');
const truffleAssert = require('truffle-assertions');

/* These tests ensure the correct operation of the Tender contract.
**/
contract('Testing Tender', async (accounts) => {
    /* Tests the functionality of the constructor.
     * Simply check that the params are stored.
     **/
    it('Should store the constructor arguments', async () => {
        const tender = await Tender.new(123, 45);
        const tenderId = await tender.tenderId.call();
        const percentageDownpayment = await tender.percentageDownpayment.call();

        assert.equal(tenderId, 123);
        assert.equal(percentageDownpayment, 45);
    });

    /* Tender contract is a state machine. This checks an invalid state change.
     **/
    it('Should revert if moved directly to a complete state', async () => {
        const tender = await Tender.new(123, 45);

        await truffleAssert.reverts(tender.completeTender());
    });

    /* Every tender requires a tendering document before it can be opened.
     * This test checks that the code reverts if the contrtact state is moved from
     * 'Draft' -> 'Open' before an IPFS hash is submitted
     **/
    it('Should revert if opened without an IPFS hash', async () => {
        const tender = await Tender.new(123, 45);

        await truffleAssert.reverts(tender.openTender());
    });

    /* Every tender requires a tendering document before it can be opened.
     * This test checks that the contract can be opened if a hash has been submitted
     **/
    it('Should open if an IPFS hash is set', async () => {
        const tender = await Tender.new(123, 45);

        await tender.setIpfsHash('Any string will work in here');
        const result = await tender.openTender();

        truffleAssert.eventEmitted(result, 'tenderOpened');
    });

    /* Methods are added to return the sontract state. This is testesd here
     **/
    it('Should return true when the contract is in the open state', async () => {
        const tender = await Tender.new(123, 45);

        await tender.setIpfsHash('Any string will work in here');
        await tender.openTender();

        const result = await tender.tenderIsOpen();

        assert.isTrue(result);
    });
});
