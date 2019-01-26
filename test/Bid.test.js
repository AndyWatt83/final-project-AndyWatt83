const Bid = artifacts.require('./Bid.sol');
const Tender = artifacts.require('./Tender.sol');
const truffleAssert = require('truffle-assertions');

/* These tests ensure the correct operation of the Bid contract.
*/
contract('Testing Bid', async (accounts) => {
    /* Tests the functionality of the constructor.
     * Simply check that the params are stored.
     */
    it('Should store the constructor argument(s)', async () => {
        const tender = await Tender.new(10, 45);
        const bid = await Bid.new(1, 15, tender.address);

        const tenderAddress = await bid.tenderAddress.call();

        assert.equal(tenderAddress, tender.address);
    });

    /* Checks that the bid can be submitted
     */
    it('Should submit the bid', async () => {
        const tender = await Tender.new(10, 45);
        const bid = await Bid.new(1, 15, tender.address);

        await bid.submitBid();

        const result = await bid.submitted.call();

        assert.isTrue(result);
    });

    /* Checks that the event is emitted when bid is submitted
     * This is used by the UI to report that operation has completed.
     */
    it('Should emit a bidIsSubmitted event', async () => {
        const tender = await Tender.new(10, 45);
        const bid = await Bid.new(1, 15, tender.address);

        const result = await bid.submitBid();

        truffleAssert.eventEmitted(result, 'bidIsSubmitted');
    });

    /* Checks that the bid can be cancelled
     */
    it('Should cancel the bid', async () => {
        const tender = await Tender.new(10, 45);
        const bid = await Bid.new(1, 15, tender.address);

        await bid.cancelBid();

        const result = await bid.cancelled.call();

        assert.isTrue(result);
    });

    /* Checks that the event is emitted when bid is submitted
     * This is used by the UI to report that operation has completed.
     */
    it('Should emit a bidIsCancelled event', async () => {
        const tender = await Tender.new(10, 45);
        const bid = await Bid.new(1, 15, tender.address);

        const result = await bid.cancelBid();

        truffleAssert.eventEmitted(result, 'bidIsCancelled');
    });
});
