pragma solidity ^0.5.0;

contract Tender
{
    uint public tenderId;
    uint public tenderValue;
    uint public percentageDownpayment;

    constructor (uint _tenderId, uint _percentageDownpayment) public payable
    {
        tenderId = _tenderId;
        percentageDownpayment = _percentageDownpayment;
        tenderValue = msg.value;
    }
}