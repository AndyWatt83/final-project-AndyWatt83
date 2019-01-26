_This document describes the steps taken to mitigate common attacks in developing this project._

THe doencument [here](https://www.kingoftheether.com/contract-safety-checklist.html) was used as the basis for.

## Logic bugs

Logic bugs are generally mitigated through rigourous testing, and good coding pracrtices. Unit tests were written for every function call, and an attempt was made to test all logic paths, including reverts.

This should be augmented before the app goes into production, by using more advanced techniques, like [fuzzing](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/) or [symbolic execution](https://www.trailofbits.com/research-and-development/manticore/)

Additionally, using battle tested code prevents logic bugs. Where possible, open zeppeling contracts were used.

## Arithmetic overflow

A common way to attack a smart contract is to use a property of binary numbers to overflow a value. This type of attack was mitigated by making use of the SafeMath library where calculations were carried out.

## Malicious Creator

The ownable patten was used, but was jused judiciously to prevent the contract creator having too much power. The ownership is renounceable, and once the operation of the contract is checked, the owner can (provably) renounce their additoinal privalges.

## tx.origin problem

tx.origin can cause issues where an attacker can send a transaction through an indermediary contract. Use of tx.origin is eliminated in this project, and the required addresses are saved and passed as parameters (where required) instead.