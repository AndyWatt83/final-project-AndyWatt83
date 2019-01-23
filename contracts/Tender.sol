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

    /// 
    constructor (uint _tenderId, uint _percentageDownpayment) public payable
    {
        tenderId = _tenderId;
        percentageDownpayment = _percentageDownpayment;
        tenderValue = msg.value;
        currentState = TenderState.Draft;
    }

    enum TenderState { Draft, Open, Awarded, Complete, Cancelled }

    /// Moves a draft tender to 'open' and ready to accept bids
    /// @dev sets the enum to TenderState.Open
    function openContract() public
    {
        currentState = TenderState.Open;
    }

    /// Moves an open tender to Awarded, ready for work to commence
    /// @dev sets the enum to TenderState.Open, and stored the winning address
    function awardContract(address _winner) public {
        winner = _winner;
        currentState = TenderState.Awarded;
    }

    /// Moves an Awarded contract to complete
    /// @dev 
    function completeContract() public {
        currentState = TenderState.Complete;
    }

    // Cancels a contract, from any state
    function cancelContract() public {
        currentState = TenderState.Cancelled;
    }
}