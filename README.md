ConsenSys Course Final Project

[![Travis](https://travis-ci.org/dev-bootcamp-2019/final-project-AndyWatt83.svg?branch=master)](https://travis-ci.org/dev-bootcamp-2019/final-project-AndyWatt83)

This application was developed as the final project for the [Consensys Academy developer program](https://consensys.net/academy/).

Author: Andy Watt

Email: andy.watt83@gmail.com

# Description

This project is a proof of concept application for a distributed and anonymous tendering process.

There are two primary actors in this system. These are:

CLIENT - Is an individual or company who submits a tender to have some work done, and invites bids on the tender. The client pays the winning bidder to carry out the work.

BIDDER - Is an individual or company who responds to live tenders, by posting a bid on the work. The bidder is paid by the client as defined by the payment terms contract.

This system - when fully fleshed out - would allow a company to post a tender on the Ethereum network. Bidders could then browse the available tenders through a web front end, and annonmously place bids on the tenders. The client could then view the bids, and indicate the winner by issuing a transaction through a smart contract.

The documents describing the tender requirememts are stored on IPFS with the hash of the file stored in the smart contract. Likewise, the bid submissins are stored on IPFS and linked to the tender by the hash.

Ideally, uPort would be used to authenticate the clients and the bidders, but at this stage that is not implemented.

---
# Running the application
To run this project, you must have the following installed:

+ git
+ npm
+ truffle
+ ganache (GUI, not CLI)
+ metamask
+ Visual Studio Code (or other text editor)

To evaluate this project, please:

0. `ganache-cli`
1. Ensure that metamask is connected to your instance of ganache-cle
2. `git clone https://github.com/dev-bootcamp-2019/final-project-andywatt83`
3. `cd final-project-AndyWatt83`
4. `npm install`
5. `truffle compile`
6. `truffle migrate`
7. `truffle test`
8. `cd app`
9. `npm install`
10. `npm run start`

The user interface will then load.

Instructions for using the UI, are included in the UI.

---





