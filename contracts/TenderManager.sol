pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "./Tender.sol";
import "./Bid.sol";

/// @author Andy Watt
/// @title The manager contract for the decentralised tendering application
contract TenderManager is Ownable, Pausable
{
    uint currentTenderId;
    uint currentBidId;

    mapping (address => bool) public registeredClients;
    mapping (address => bool) public registeredBidders;
    mapping (address => uint) public clientTenderIds;
    mapping (uint => address) public tenderIdAddresses;
    mapping (address => uint) public bidderBidIds;
    mapping (uint => address) public bidIdAddresses;

    event ClientRegistered(address indexed clientAddress);
    event ClientUnregistered(address indexed clientAddress);
    event BidderRegistered(address indexed bidderAddress);
    event BidderUnregistered(address indexed bidderAddress);


    /// @notice Constructor for the TenderManager contract.
    /// @dev Takes no arguments, sets the currentTenderId to 1 (zero is used to mean null).
    constructor () public
    {
        currentTenderId = 1;
        currentBidId = 1;
    }

    /// @notice Modifier which ensures that the sender is registerd as a client.
    /// @dev Checks that the sender address has an entry in registeredClients.
    modifier callerIsClient()
    {
        require (registeredClients[msg.sender], "Caller is not a registered client");
        _;
    }

    /// @notice Modifier which ensures that the sender is registerd as a bidder.
    /// @dev Checks that the sender address has an entry in registeredBidders.
    modifier callerIsBidder()
    {
        require (registeredBidders[msg.sender], "Caller is not a registered bidder");
        _;
    }

    /// @notice Modifier which ensures that the sender currently has an open tender.
    /// @dev Checks that the id associated with the sender is greater than zero.
    modifier clientHasOpenTender()
    {
        require (clientTenderIds[msg.sender] > 0, "Client does not have an open tender");
        _;
    }

    /// @notice Modifier which ensures that the sender does not currently have an open tender.
    /// @dev Checks that the id associated with the sender is zero.
    modifier clientHasNoOpenTender()
    {
        require (clientTenderIds[msg.sender] == 0, "Client has a tender open already");
        _;
    }

    /// @notice Registers a new client.
    /// @dev updates the registeredClients mapping.
    /// @return a boolean indicating success.
    function registerClient()
        public
        whenNotPaused()
        returns (bool)
    {
        require(!registeredClients[msg.sender], "Address already registered as a client");

        registeredClients[msg.sender] = true;

        emit ClientRegistered(msg.sender);

        return true;
    }

    /// @notice Unregisters an existing client.
    /// @dev updates the registeredClients mapping.
    /// @return a boolean indicating success.
    function unregisterClient()
        public
        whenNotPaused()
        returns (bool)
    {
        require(registeredClients[msg.sender], "Address already registered as a client");

        registeredClients[msg.sender] = false;

        emit ClientUnregistered(msg.sender);

        return true;
    }

    /// @notice Registers a new bidder.
    /// @dev updates the registeredClients mapping.
    /// @return a boolean indicating success.
    function registerBidder()
        public
        whenNotPaused()
        returns (bool)
    {
        require(!registeredBidders[msg.sender], "Address already registered as a bidder");

        registeredBidders[msg.sender] = true;

        emit BidderRegistered(msg.sender);

        return true;
    }

    /// @notice Creates a new tender for a registered client, with a spcecified downpayment percentage.
    /// @param percentageDownpayment The percentage of the tender value paid on award.
    /// @dev Deploys a new instance of the Tender contract, and associates it with the calling client.
    function createTender(uint percentageDownpayment)
        public
        payable
        whenNotPaused()
        callerIsClient()
        clientHasNoOpenTender()
        returns (address)
    {
        clientTenderIds[msg.sender] = currentTenderId;

        address newTenderAddress = address((new Tender).value(msg.value)(currentTenderId, percentageDownpayment));
        tenderIdAddresses[currentTenderId] = newTenderAddress;
        currentTenderId += 1;
        return newTenderAddress;
    }

    /// @notice Creates a new bid for a registered bidder, with a spcecified cost.
    /// @param cost The amount of ETH that the bidder wants to carry out the work
    /// @param tenderAddress The address of the Tender that is being bid on
    /// @dev Deploys a new instance of the Bid contract, and associates it with the calling bidder.
    function createBid(uint cost, address tenderAddress)
        public
        payable
        whenNotPaused()
        returns (address)
    {
        bidderBidIds[msg.sender] = currentBidId;
        bidIdAddresses[currentBidId] = address(new Bid(currentBidId, cost, tenderAddress));
        currentBidId += 1;
        return bidIdAddresses[currentBidId - 1];
    }

    /// @notice Closes a new tender for a registered client.
    /// @dev Removes a instance of the Tender contract, and cancels any open bids
    function cancelTender()
        public
        whenNotPaused()
        callerIsClient()
        clientHasOpenTender()
        returns (bool)
    {
        clientTenderIds[msg.sender] = 0;
    }

    /// @notice Places a bid on an open tender
    /// @dev Places a bid on an open tender
    function submitBid(address bidAddress)
        public
        whenNotPaused()
        callerIsBidder()
        returns (bool)
    {
        Bid bid = Bid(address(bidAddress));
        bid.submitBid();
        bidIsAttachedToTender = true;
        return true;
    }

    /// @notice Attaches an IPFS hash to either a tender or a bid
    /// @dev Calls self destruct
    function associateIPFS (string memory ipfsHash, address ipfsHolderAddress)
        public
        returns (bool)
    {
        IpfsHashHolder ipfsHashHolder = IpfsHashHolder(address(ipfsHolderAddress));
        ipfsHashHolder.setIpfsHash(ipfsHash);
        return true;
    }

    /// @notice Removes this contract from the etheruem blockchain
    /// @dev CAlls self destruct
    function closeTenderManager (address payable recipient) public
        onlyOwner()
    {
        // there may be a lot of cleanup required here. For now, just self destruct
        selfdestruct(address(recipient));
    }

    // Below are helper methods / shortcuts for use in the drizzle UI.
    // All code from below these comments should be removed, and a better solution for surfacing the data implemented.
    // Considering a 'viewmodel' type contract, borrowing from MVVM practices. More consideration required
    function openContract() public{
        Tender tender = Tender(address(tenderIdAddresses[1]));
        tender.openTender();
        tenderIsOpen = true;
    }

    function awardContract(address winner) public{
        Tender tender = Tender(address(tenderIdAddresses[1]));
        tender.awardTender(winner);
        tenderIsAwarded = true;
        tenderIsOpen = false;
    }

    function awardComplete() public{
        Tender tender = Tender(address(tenderIdAddresses[1]));
        tender.completeTender();
        tenderIsComplete = true;
        tenderIsAwarded = false;
    }

    bool public tenderIsOpen;
    bool public tenderIsAwarded;
    bool public tenderIsComplete;
    bool public bidIsAttachedToTender;
}
