const Configuration = artifacts.require('./Configuration.sol');
const TenderManager = artifacts.require('./TenderManager.sol');
const Tender = artifacts.require('./Tender.sol');

module.exports = function (deployer) {
    deployer.deploy(Configuration);
    deployer.deploy(TenderManager);
    deployer.deploy(Tender);
};
