pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "./Tender.sol";
import "./IpfsHashHolder.sol"; // Need to remove this from here

/// @author Andy Watt
/// @title The manager contract for the decentralised tendering application
contract TenderManager is Ownable, Pausable, IpfsHashHolder
{
    uint currentJobId;

    mapping (address => bool) public registeredClients;
    mapping (address => bool) public registeredBidders;
    mapping (uint => address) public jobOwners;
    mapping (address => uint) public clientTenderIds;
    mapping (uint => address) public tenderIdAddresses;

    event ClientRegistered(address indexed clientAddress);
    event ClientUnregistered(address indexed clientAddress);
    event BidderRegistered(address indexed bidderAddress);
    event BidderUnregistered(address indexed bidderAddress);

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
        require (registeredBidders[msg.sender], "Caller is not a registered client");
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


    uint public tenderValue;

    /// @notice Constructor for the TenderManager contract.
    /// @dev Takes no arguments, sets the currentJobId to 1 (zero is used to mean null).
    constructor () public payable
    {
        currentJobId = 1;
        tenderValue = msg.value;
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
        returns (bool)
    {
        clientTenderIds[msg.sender] = currentJobId;
        tenderIdAddresses[currentJobId] = address((new Tender).value(msg.value)(currentJobId, percentageDownpayment));
        currentJobId += 1;
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
    function bidOnTender(address tenderAddress)
        public
        whenNotPaused()
        callerIsBidder()
        view
        returns (uint)
    {
        Tender tender = Tender(address(tenderAddress));
        uint percentage = tender.percentageDownpayment();
        return percentage;
    }

    function closeTenderManager (address payable recipient) public
        onlyOwner()
    {
        // there may be a lot of cleanup required here. For now, just self destruct
        selfdestruct(address(recipient));
    }
}
