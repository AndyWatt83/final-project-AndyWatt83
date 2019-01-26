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


    /// @notice Depolys an instance of the Bid contract
    /// @dev stores the address of the tender that this bid is bidding on
    constructor (uint _bidId, uint _cost, address _tenderAddress) public
    {
        tenderAddress = _tenderAddress;
        bidId = _bidId;
        cost = _cost;
    }

    function submitBid() public
    {
        submitted = true;
    }
}
