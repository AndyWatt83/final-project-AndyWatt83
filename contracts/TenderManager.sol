pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "./Tender.sol";

/// @author Andy Watt
/// @title The manager contract for the decentralised tendering application
contract TenderManager is Ownable, Pausable
{
    uint currentJobId;

    mapping (address => bool) public registeredClients;
    mapping (address => bool) public registeredBidders;
    mapping (uint => address) public jobOwners;
    mapping (address => uint) public clientTenderIds;
    mapping (uint => address) public tenderIdAddresses;

    event NewClientRegistered(address indexed clientAddress);
    event NewBidderRegistered(address indexed bidderAddress);

    modifier callerIsClient()
    {
        require (registeredClients[msg.sender], "Caller is not a registered client");
        _;
    }

    modifier clientHasOpenTender()
    {
        require (clientTenderIds[msg.sender] > 0, "Client does not have an open tender");
        _;
    }

    modifier clientHasNoOpenTender()
    {
        require (clientTenderIds[msg.sender] == 0, "Client has a tender open already");
        _;
    }

    constructor () public
    {
        currentJobId = 1;
    }

    /// Registers a new client.
    /// @dev updates the registeredClients mapping.
    /// @return a boolean indicating success.
    function registerClient()
        public
        whenNotPaused()
        returns (bool)
    {
        require(!registeredClients[msg.sender], "Address already registered as a client");

        registeredClients[msg.sender] = true;

        emit NewClientRegistered(msg.sender);

        return true;
    }

    /// Registers a new bidder.
    /// @dev updates the registeredClients mapping.
    /// @return a boolean indicating success.
    function registerBidder()
        public
        whenNotPaused()
        returns (bool)
    {
        require(!registeredBidders[msg.sender], "Address already registered as a bidder");

        registeredBidders[msg.sender] = true;

        emit NewBidderRegistered(msg.sender);

        return true;
    }

    /// Creates a new tender for a registered client.
    /// @dev Deploys a new instance of the Tender contract, and associates it with the calling client
    function createTender()
        public
        whenNotPaused()
        callerIsClient()
        clientHasNoOpenTender()
        returns (bool)
    {
        clientTenderIds[msg.sender] = currentJobId;
        tenderIdAddresses[currentJobId] = address(new Tender(currentJobId));
        currentJobId += 1;
    }

    /// Closes a new tender for a registered client.
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

}