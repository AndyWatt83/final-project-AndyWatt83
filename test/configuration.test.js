/*
    Placeholder testing for the dummy contract. Used to make sure the dev pipeline is set up and
    working as required.
*/

const Configuration = artifacts.require('./Configuration.sol');

contract('Configuration', async (accounts) => {
    it('Should return a number', async () => {
        const configuration = await Configuration.deployed();
        const actual = await configuration.aNumber.call();
        const expected = 5;

        assert.equal(actual, expected);
    });
});
