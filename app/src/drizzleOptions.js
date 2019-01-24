import TenderManager from "./contracts/TenderManager.json";

const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545",
    },
  },
  contracts: [TenderManager],
  events: {
    TenderManager: ['ClientRegistered', 'ClientRegistered','ClientUnregistered', 'ClientUnregistered'],
  },
  polls: {
    accounts: 1500,
  },
};

export default options;
