const TenderManager = artifacts.require('TenderManager');

module.exports = function (deployer) {
    deployer.deploy(TenderManager, { value: 1000000 });
};
