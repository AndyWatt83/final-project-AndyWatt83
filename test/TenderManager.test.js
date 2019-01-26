const TenderManager = artifacts.require('./TenderManager.sol');
const truffleAssert = require('truffle-assertions');

/* These tests ensure the correct operation of the Tender contract.
 */
contract('Testing TenderManager', async (accounts) => {
    /* Ensures that an address can be registerd as a client
     */
    it('Should register a Client', async () => {
        const tenderManager = await TenderManager.deployed();

        // Check that the address is not already a registered client
        const initialValue = await tenderManager.registeredClients.call(accounts[1]);

        assert.isFalse(initialValue);

        // register the addresss as a client
        await tenderManager.registerClient({ from: accounts[1] });

        // Chack that the address is now successfully registered
        const finalValue = await tenderManager.registeredClients.call(accounts[1]);

        assert.isTrue(finalValue);
    });

    /* Checks that the ClientRegistered event is fired when a client is successfully registered
     */
    it('Should fire an event when registering a Client', async () => {
        const tenderManager = await TenderManager.deployed();

        const result = await tenderManager.registerClient({ from: accounts[2] });

        truffleAssert.eventEmitted(result, 'ClientRegistered');
    });

    /* Checks that an address cannot be registered twice as a client
     */
    it('Should revert if a client is attempts to register twice', async () => {
        const tenderManager = await TenderManager.deployed();

        await truffleAssert.reverts(tenderManager.registerClient({ from: accounts[2] }));
    });

    /* Ensures that an address can be registerd as a bidder
     */
    it('Should register a Bidder', async () => {
        const tenderManager = await TenderManager.deployed();

        // Check that the address is not already a registered client
        const initialValue = await tenderManager.registeredBidders.call(accounts[1]);

        assert.isFalse(initialValue);

        // register the addresss as a bidder
        await tenderManager.registerBidder({ from: accounts[1] });

        // Chack that the address is now successfully registered
        const finalValue = await tenderManager.registeredBidders.call(accounts[1]);

        assert.isTrue(finalValue);
    });

    /* Checks that the BidderRegistered event is fired when a bidder is successfully registered
     */
    it('Should fire an event when registering a Bidder', async () => {
        const tenderManager = await TenderManager.deployed();

        const result = await tenderManager.registerBidder({ from: accounts[2] });

        truffleAssert.eventEmitted(result, 'BidderRegistered');
    });

    /* Checks that an address cannot be registered twice as a bidder
     */
    it('Should revert if a bidder is attempts to register twice', async () => {
        const tenderManager = await TenderManager.deployed();

        await truffleAssert.reverts(tenderManager.registerBidder({ from: accounts[2] }));
    });

    /* When a tender is created, a new instance of the Tender contract is deployed
     * This test checks that the tenderId variable has been incremented, showing
     * that a new tender has been added
     */
    it('Should create a tender for a registered client with specified percentage', async () => {
        const tenderManager = await TenderManager.deployed();

        // register the client
        await tenderManager.registerClient({ from: accounts[4] });

        // create the Tender
        await tenderManager.createTender(15, { from: accounts[4] });

        const tenterId = await tenderManager.clientTenderIds.call(accounts[4]);

        assert.notEqual(tenterId, 0, 'No tender id set');
    });

    /* Checks that client can delete a tender fromt he system entirely
     * This operation shouldn't really be used. The tneder should be cancelled
     * by changing the state of the Tender contract instance
     */
    it('Should cancel a tender for a registered client', async () => {
        const tenderManager = await TenderManager.deployed();

        // cancel the Tender
        await tenderManager.cancelTender({ from: accounts[4] });

        const tenterId = await tenderManager.clientTenderIds.call(accounts[4]);

        assert.equal(tenterId, 0, 'No tender id set');
    });

    /* Test that tenders can only be created by registers clients
     */
    it('Should revert if a caller is not a client', async () => {
        const tenderManager = await TenderManager.deployed();

        await truffleAssert.reverts(tenderManager.createTender(15, { from: accounts[3] }));
    });

    /* Test that each client can only have one active tender at a time
     */
    it('Should revert if a client attempts to open multiple tenders', async () => {
        const tenderManager = await TenderManager.deployed();

        await tenderManager.createTender(15, { from: accounts[1] });
        await truffleAssert.reverts(tenderManager.createTender(15, { from: accounts[1] }));
    });

    /* Test that tenders cannot be created if the contract is paused.
     */
    it('Should revert if the contract is paused', async () => {
        const tenderManager = await TenderManager.deployed();

        await tenderManager.pause({ from: accounts[0] });
        await truffleAssert.reverts(tenderManager.createTender(15, { from: accounts[1] }));
    });
});
