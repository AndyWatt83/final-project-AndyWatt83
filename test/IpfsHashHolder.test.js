const IpfsHashHolder = artifacts.require('./IpfsHashHolder.sol');
const truffleAssert = require('truffle-assertions');

contract('Testing IpfsHashHolder', async (accounts) => {
    it('Should store accept an arbitrary string representing an IPFS file hash', async () => {
        const ipfsHashHolder = await IpfsHashHolder.new();
        const sampleIpfsHash = 'QmPCmCERPsc8NDQkDCQ3bpz8FNWP2bf8UhDszaWgsWVHJK';

        await ipfsHashHolder.setIpfsHash(sampleIpfsHash);

        const actual = await ipfsHashHolder.ipfsHash.call();

        assert.equal(sampleIpfsHash, actual);
    });

    it('Should store revert if an invalid hash is sent', async () => {
        const ipfsHashHolder = await IpfsHashHolder.new();
        const sampleIpfsHash = '';

        await truffleAssert.reverts(ipfsHashHolder.setIpfsHash(sampleIpfsHash));
    });

    it('Should emit an ipfsSent event', async () => {
        const ipfsHashHolder = await IpfsHashHolder.new();
        const sampleIpfsHash = 'QmPCmCERPsc8NDQkDCQ3bpz8FNWP2bf8UhDszaWgsWVHJK';

        const result = await ipfsHashHolder.setIpfsHash(sampleIpfsHash);

        truffleAssert.eventEmitted(result, 'ipfsSent');
    });

    it('Should correctly identify that a hash IS NOT set', async () => {
        const ipfsHashHolder = await IpfsHashHolder.new();

        const result = await ipfsHashHolder.hashIsSet.call();

        assert.isFalse(result);
    });

    it('Should correctly identify that a hash IS set', async () => {
        const ipfsHashHolder = await IpfsHashHolder.new();
        const sampleIpfsHash = 'QmPCmCERPsc8NDQkDCQ3bpz8FNWP2bf8UhDszaWgsWVHJK';

        await ipfsHashHolder.setIpfsHash(sampleIpfsHash);

        const result = await ipfsHashHolder.hashIsSet.call();

        assert.isTrue(result);
    });

    it('Should clear a hash when insturcted to', async () => {
        const ipfsHashHolder = await IpfsHashHolder.new();
        const sampleIpfsHash = 'QmPCmCERPsc8NDQkDCQ3bpz8FNWP2bf8UhDszaWgsWVHJK';

        await ipfsHashHolder.setIpfsHash(sampleIpfsHash);

        const result1 = await ipfsHashHolder.hashIsSet.call();

        await ipfsHashHolder.clearHash();

        const result2 = await ipfsHashHolder.hashIsSet.call();

        assert.isTrue(result1);
        assert.isFalse(result2);
    });
});
