const Configuration = artifacts.require('Configuration');
const TenderManager = artifacts.require('TenderManager');

module.exports = function (deployer) {
    deployer.deploy(Configuration);
    deployer.deploy(TenderManager);
};
