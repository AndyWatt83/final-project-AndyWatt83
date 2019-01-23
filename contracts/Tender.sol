pragma solidity ^0.5.0;

/// @title A contract representing a tender in the tender management system.
/// @author Andy Watt
contract Tender
{
    uint public tenderId;
    uint public tenderValue;
    uint public percentageDownpayment;
    TenderState public currentState;
    address private winner;

    /// @notice Depolys an instance of the Tender contract
    /// @dev stores the tender id and the percentage downpayment for this contract
    constructor (uint _tenderId, uint _percentageDownpayment) public payable
    {
        tenderId = _tenderId;
        percentageDownpayment = _percentageDownpayment;
        tenderValue = msg.value;
        currentState = TenderState.Draft;
    }

    enum TenderState { Draft, Open, Awarded, Complete, Cancelled }

    /// @notice Moves a draft tender to 'open' and ready to accept bids
    /// @dev sets the enum to TenderState.Open
    function openContract() public
    {
        currentState = TenderState.Open;
    }

    /// @notice Moves an open tender to Awarded, ready for work to commence
    /// @dev sets the enum to TenderState.Open, and stores the winning address
    function awardContract(address _winner) public {
        winner = _winner;
        currentState = TenderState.Awarded;
    }

    /// @notice Moves an Awarded contract to complete
    /// @dev sets the enum to TenderState.Complete
    function completeContract() public {
        currentState = TenderState.Complete;
    }

    /// @notice Cancels a contract, from any state
    /// @dev sets the enum to TenderState.Cancelled, and does the required clean up
    function cancelContract() public {
        currentState = TenderState.Cancelled;
    }
}