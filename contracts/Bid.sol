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
    BidState public bidState;

    /// @notice An enumeration of the possible contract states
    enum BidState { Submitted, Accepted, Rejected, Cancelled }

    /// @notice An event which is raised whhen the bid is submitted
    /// @dev Emits an event whrn submit Bid is called
    event bidIsSubmitted();

    /// @notice An event which is raised whhen the bid is accepted
    /// @dev Emits an event whrn accept Bid is called
    event bidIsAccepted();

    /// @notice An event which is raised whhen the bid is rejected
    /// @dev Emits an event whrn accept Bid is called
    event bidIsRejected();

    /// @notice An event which is raised whhen the bid is cancelled
    /// @dev Emits an event whrn cancel Bid is called
    event bidIsCancelled();

    /// @notice Depolys an instance of the Bid contract
    /// @dev stores the address of the tender that this bid is bidding on
    /// @param _bidId the ID of the bid
    /// @param _cost the amount in ETH that the bidder wants to carry out the work
    /// @param _tenderAddress the address of the tender that is being bid on
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
        bidState = BidState.Submitted;
        emit bidIsSubmitted();
    }

    /// @notice Cancells the bid
    /// @dev Sets a flag indicating that the bid is cencelled
    function cancelBid() public {
        bidState = BidState.Cancelled;
        emit bidIsCancelled();
    }
}
