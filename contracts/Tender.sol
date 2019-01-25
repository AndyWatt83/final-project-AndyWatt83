pragma solidity ^0.5.0;

import "./IpfsHashHolder.sol";

/// @title A contract representing a tender in the tender management system.
/// @author Andy Watt
contract Tender is IpfsHashHolder
{
    uint public tenderId;
    uint public tenderValue;
    uint public percentageDownpayment;
    TenderState public currentState;
    address private winner;
    address[] private bids;

    /// @notice Depolys an instance of the Tender contract
    /// @dev stores the tender id and the percentage downpayment for this contract
    constructor (uint _tenderId, uint _percentageDownpayment) public payable
    {
        tenderId = _tenderId;
        percentageDownpayment = _percentageDownpayment;
        tenderValue = msg.value;
        currentState = TenderState.Draft;
    }

    /// @notice An envent indicating that the contract state has been set to Open
    event tenderOpened();

    /// @notice An envent indicating that the contract state has been set to Awarded
    event tenderAwarded();

    /// @notice An envent indicating that the contract state has been set to Complete
    event tenderCompleted();

    /// @notice An envent indicating that the contract state has been set to Cancelled
    event tenderCancelled();

    /// @notice An enumeration of the possible contract states
    enum TenderState { Draft, Open, Awarded, Complete, Cancelled }

    /// @notice Modifier to check the currentState against a required state
    modifier checkState(TenderState requiredState)
    {
        require(currentState == requiredState, "contract is not in the correct state");
        _;
    }

    /// @notice Modifier to check that the IPFS has with the dender document is not null
    modifier hasIpfsHash()
    {
        bytes memory textRepresentation = bytes(ipfsHash);
        require (textRepresentation.length > 0, "IPFS has is required");
        _;
    }

    /// @notice Moves a draft tender to 'open' and ready to accept bids
    /// @dev sets the enum to TenderState.Open
    function openTender()
        public
        hasIpfsHash()
        checkState(TenderState.Draft)
        returns(TenderState)
    {
        currentState = TenderState.Open;
        emit tenderOpened();
        return currentState;
    }

    /// @notice Moves an open tender to Awarded, ready for work to commence
    /// @dev sets the enum to TenderState.Open, and stores the winning address
    function awardTender(address _winner)
        public
        checkState(TenderState.Open)
        returns(TenderState)
    {
        winner = _winner;
        currentState = TenderState.Awarded;
        emit tenderAwarded();
        return currentState;
    }

    /// @notice Moves an Awarded contract to complete
    /// @dev sets the enum to TenderState.Complete
    function completeTender()
        public
        checkState(TenderState.Awarded)
        returns(TenderState)
    {
        currentState = TenderState.Complete;
        emit tenderCompleted();
        return currentState;
    }

    /// @notice Cancels a contract, from any state
    /// @dev sets the enum to TenderState.Cancelled, and does the required clean up
    function cancelTender()
        public
        returns(TenderState)
    {
        currentState = TenderState.Cancelled;
        emit tenderCancelled();
        return currentState;
    }

    /// @notice function called by a bidder to notify the client of their bid
    function placeBid(address bidAddress)
        public
        checkState(TenderState.Open)
        returns (bool)
    {
        bids.push(bidAddress);
    }
}