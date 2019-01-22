pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";

/// @author Andy Watt
/// @title The manager contract for the decentralised tendering application
contract TenderManager is Ownable, Pausable
{


    mapping (address => bool) public registeredClients;
    mapping (address => bool) public registeredBidders;
    mapping (uint => address) public jobOwners;

    event NewClientRegistered(address indexed clientAddress);
    event NewBidderRegistered(address indexed bidderAddress);

    uint currentJobId;

    constructor () public
    {

    }

    /// Registers a new client.
    /// @dev updates the registeredClients mapping.
    /// @return a boolean indicating success.
    function registerClient() public whenNotPaused() returns (bool){
        require(!registeredClients[msg.sender], "Address already registered as a client");

        registeredClients[msg.sender] = true;

        emit NewClientRegistered(msg.sender);

        return true;
    }

    /// Checks whether a passed address is a registered client
    /// @dev Checks whether a passed address is a registered client
    /// @param the address which is being checked
    /// @return boolean representing whether the address is a registerd client
    function RegisteredAsClient(address clientAddress) public returns (bool){
        return registeredClients[clientAddress];
    }

    function registerBidder() public whenNotPaused() returns (bool){
        require(!registeredBidders[msg.sender], "Address already registered as a bidder");

        registeredBidders[msg.sender] = true;

        emit NewBidderRegistered(msg.sender);

        return true;
    }

}