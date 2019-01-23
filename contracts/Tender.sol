pragma solidity ^0.5.0;

contract Tender
{
    uint public tenderId;

    constructor (uint _tenderId) public
    {
        tenderId = _tenderId;
    }
}