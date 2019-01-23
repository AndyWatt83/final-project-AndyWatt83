pragma solidity ^0.5.0;

import "./Tender.sol";

/// @title A contract representing a bid in the tender management system.
/// @author Andy Watt
contract Bid
{
    address public tenderAddress;
    Tender public tender;

    uint percentagePromised;


    constructor (address _tenderAddress) public
    {
        tenderAddress = _tenderAddress;
    }
}
