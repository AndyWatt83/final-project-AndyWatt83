pragma solidity ^0.5.0;

import "./Tender.sol";

/// @title A contract representing a bid in the tender management system.
/// @author Andy Watt
contract Bid
{
    address public tenderAddress;
    Tender public tender;

    uint percentagePromised;

    /// @notice Depolys an instance of the Bid contract
    /// @dev stores the address of the tender that this bid is bidding on
    constructor (address _tenderAddress) public
    {
        tenderAddress = _tenderAddress;
    }
}
