const TenderManager = artifacts.require('./TenderManager.sol');

contract('Testing TenderManager', async (accounts) => {
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

});
