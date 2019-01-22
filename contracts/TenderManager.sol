pragma solidity ^0.5.0;

/// @author Andy Watt
/// @title The manager contract for the decentralised tendering application
contract TenderManager
{
    mapping (address => bool) public registeredClient;
    mapping (address => bool) public registeredBidder;
    mapping (uint => address) public jobOwners;

    event NewClientRegistered(address indexed clientAddress);
    event NewBidderRegistered(address indexed bidderAddress);

    uint currentJobId;

    constructor () public
    {
        // TODO
    }

}