pragma solidity ^0.5.0;

import "./Tender.sol";
import "./IpfsHashHolder.sol";

/// @title A contract representing a bid in the tender management system.
/// @author Andy Watt
contract Bid is IpfsHashHolder
{
    address public tenderAddress;
    uint public bidId;
    uint public cost;
    bool public submitted;
    bool public cancelled;

    /// @notice An event which is raised whhen the bid is submitted
    /// @dev Emits an event whrn submit Bid is called
    event bidIsSubmitted();

    /// @notice An event which is raised whhen the bid is cancelled
    /// @dev Emits an event whrn cancel Bid is called
    event bidIsCancelled();

    /// @notice Depolys an instance of the Bid contract
    /// @dev stores the address of the tender that this bid is bidding on
    constructor (uint _bidId, uint _cost, address _tenderAddress) public
    {
        tenderAddress = _tenderAddress;
        bidId = _bidId;
        cost = _cost;
    }

    /// @notice Submits the bid
    /// @dev sets a flag indicating that the bid is submitted
    function submitBid() public
    {
        submitted = true;
        emit bidIsSubmitted();
    }

    /// @notice Cancells the bid
    /// @dev Sets a flag indicating that the bid is cencelled
    function cancelBid() public{
        cancelled = true;
        emit bidIsCancelled();
    }
}
