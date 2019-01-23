const Configuration = artifacts.require('./Configuration.sol');
const TenderManager = artifacts.require('./TenderManager.sol');

module.exports = function (deployer) {
    deployer.deploy(Configuration);
    deployer.deploy(TenderManager);
};
