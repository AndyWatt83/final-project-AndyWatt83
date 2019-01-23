const TenderManager = artifacts.require('./TenderManager.sol');
const truffleAssert = require('truffle-assertions');

contract('Testing TenderManager', async (accounts) => {
    // Testing for registering a client
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

    it('Should fire an event when registering a Client', async () => {
        const tenderManager = await TenderManager.deployed();

        const result = await tenderManager.registerClient({ from: accounts[2] });

        truffleAssert.eventEmitted(result, 'NewClientRegistered');
    });

    it('Should revert if a client is attempts to register twice', async () => {
        const tenderManager = await TenderManager.deployed();

        await truffleAssert.reverts(tenderManager.registerClient({ from: accounts[2] }));
    });

    // Testing for registering a bidder
    it('Should register a Bidder', async () => {
        const tenderManager = await TenderManager.deployed();

        // Check that the address is not already a registered client
        const initialValue = await tenderManager.registeredBidders.call(accounts[1]);

        assert.isFalse(initialValue);

        // register the addresss as a client
        await tenderManager.registerBidder({ from: accounts[1] });

        // Chack that the address is now successfully registered
        const finalValue = await tenderManager.registeredBidders.call(accounts[1]);

        assert.isTrue(finalValue);
    });

    it('Should fire an event when registering a Bidder', async () => {
        const tenderManager = await TenderManager.deployed();

        const result = await tenderManager.registerBidder({ from: accounts[2] });

        truffleAssert.eventEmitted(result, 'NewBidderRegistered');
    });

    it('Should revert if a bidder is attempts to register twice', async () => {
        const tenderManager = await TenderManager.deployed();

        await truffleAssert.reverts(tenderManager.registerBidder({ from: accounts[2] }));
    });

    // Testing for createTender
    it('Should create a tender for a registered client with specified percentage', async () => {
        const tenderManager = await TenderManager.deployed();

        // register the client
        await tenderManager.registerClient({ from: accounts[4] });

        // create the Tender
        await tenderManager.createTender(15, { from: accounts[4] });

        const tenterId = await tenderManager.clientTenderIds.call(accounts[4]);

        assert.notEqual(tenterId, 0, 'No tender id set');
    });

    it('Should cancel a tender for a registered client', async () => {
        const tenderManager = await TenderManager.deployed();

        // cancel the Tender
        await tenderManager.cancelTender({ from: accounts[4] });

        const tenterId = await tenderManager.clientTenderIds.call(accounts[4]);

        assert.equal(tenterId, 0, 'No tender id set');
    });

    it('Should revert if a caller is not a client', async () => {
        const tenderManager = await TenderManager.deployed();

        await truffleAssert.reverts(tenderManager.createTender(15, { from: accounts[3] }));
    });

    it('Should revert if a client attempts to open multiple tenders', async () => {
        const tenderManager = await TenderManager.deployed();

        await tenderManager.createTender(15, { from: accounts[1] });
        await truffleAssert.reverts(tenderManager.createTender(15, { from: accounts[1] }));
    });

    it('Should revert if the contract is paused', async () => {
        const tenderManager = await TenderManager.deployed();

        await tenderManager.pause({ from: accounts[0] });
        await truffleAssert.reverts(tenderManager.createTender(15, { from: accounts[1] }));
    });
});
