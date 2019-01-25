_This document describes the design pattern decisions that were undertaken in developing this project._

Frequently, the best practice for implementing a given design pattern is to use battle tested code, such as the open zeppelin library of contracts. This is the approach that has been taken in this project.

# Ownable

The ownable pattern results in contracts that can be 'owned' by a nominated address. The entity that can prove ownership of the ;owner' addess is granted special privallages when interacting with the contract.

This patten is implemented the TenderManager contract, by inheriting the open zeppelin 'ownable' contract.

This contract allows ownership to be defined, rescinded, transferred, and confirmed.

# Circuit Breaker

A circuit breaker makes an allowance that the execution of the contract can be stopped by an enitiy such as the contract 'owner' (as defined above). The 'owner' has the ability to pause, and unpause the contract. Halting interactions with the contract ahould the need arise.

This is implemented by inheriting the open zeppeling 'pausable' contract on the Tender manager.

This cointract allows the contract to be paused and unpaused, as well as allowing the ability to do so to be transeferred or rescinded.

# State machine

A state machine is an entity which can be moved between certain pre-defined stated. A conctract can act as a state machine, and be moved between various stated dependig on previous transactions with the contract. 

In this project, the Tender contract is given 'state', to indicate what stage of the tendering preocess the tender is in. The available states are:

`enum TenderState { Draft, Open, Awarded, Complete, Cancelled }`

# Pull payment

While it is intuitive to 'push' payment once a certain condition is met, this can introduce security concerns. Instead the recipient if the payment is granted the ability to withdraw the funds.

This is implemented in the Bid contract, allowing the bidder to withdraw their reward when the contract state moves to 'complete'
