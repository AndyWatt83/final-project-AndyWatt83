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
});
