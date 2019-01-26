import React from "react";
import {
    AccountData,
    ContractData,
    ContractForm,
} from "drizzle-react-components";
import IpfsForm from "./IpfsForm"

import logo from "./logo.png";

export default ({ accounts }) => (
    <div className="App">
        <div className="section">
            <h2>Active Account</h2>
            <AccountData accountIndex="0" units="ether" precision="3" />
        </div>
        <p> This UI is a very simple reference implementation that allows the full life cycle of a tender to be assessed. This is simply intended to demonstrate how the contract interactions work, this is not a complete UI for this tendering system. </p>
        <br />
        <p> There are two types of actors in this system. These are:</p>
        <br />
        <p> CLIENTS: An individual or company who submits a tender to have some work done, and invites bids on the tender. The client pays the winning bidder to carry out the work.</p>
        <br />
        <p> BIDDER - Is an individual or company who responds to live tenders, by posting a bid on the work. The bidder is paid by the client as defined by the payment terms contract. </p>
        <hr />
        <p> 1. Use this section to register and unregister as a CLIENT. Being a registered client allows the account to create new tenders</p>
        <table border="1">
            <tr>
                <td>
                    Register as client
                </td>
                <td>
                    Unegister as client
                </td>
                <td>
                    Is Registered
                </td>
            </tr>
            <tr>
                <td>
                    <ContractForm
                        contract="TenderManager"
                        method="registerClient"
                        labels={["Register as Client"]}/>
                </td>
                <td>
                    <ContractForm
                        contract="TenderManager"
                        method="unregisterClient"
                        labels={["Unegister as Client"]}/>
                </td>
                <td>
                    <ContractData
                        contract="TenderManager"
                        method="registeredClients"
                        methodArgs={[accounts[0]]}
                        labels={["Check Registered"]}/>
                </td>
            </tr>
        </table>
        <hr />
        <p> 2. Use this section to create a new tender, and upload the tender document to IPFS. Note, that a sample tender is include in the 'samples' folder in the repo</p>
        <p> The client should indicate what persentage of the contract cost they will pay upfront. Enter as a number "10", and not "10%"</p>
        <table border="1">
            <tr>
                <td>
                    Deploy contract:
                </td>
                <td>
                    <ContractForm
                    contract="TenderManager"
                    method="createTender"
                    labels={["% on Award"]}/>
                </td>
            </tr>
            <tr>
                <td>
                    Address:
                </td>
                <td>
                    <ContractData
                    contract="TenderManager"
                    method="tenderIdAddresses"
                    methodArgs={[1]}/>
                </td>
            </tr>
            <tr>
                <td>
                    IPFS Send (to IPFS):
                </td>
                <td>
                    <IpfsForm />
                </td>
            </tr>
            <tr>
                <td>
                    IPFS Send (to Smart Contract):
                </td>
                <td>
                    <IpfsForm />
                </td>
            </tr>
        </table>

        <div className="section">
            <h2> Tender Manager </h2>
            <ContractForm contract="TenderManager" method="registeredClients" methodArgs={[accounts[0]]}/>

            <br />
            Create Tender:


            <br />
            <ContractData
                contract="TenderManager"
                method="clientTenderIds"
                methodArgs={[accounts[0]]}/>

            <br />
            <ContractData
                contract="TenderManager"
                method="tenderIdAddresses"
                methodArgs={[2]}/>

            <br />
            Set IPFS
            <ContractForm
                contract="TenderManager"
                method="setIpfsHash"
                labels={["Paste in IPFS Hash"]}/>
                <br />
            <ContractData
                contract="TenderManager"
                method="ipfsHash"
                labels={["Current Hash"]}/>
        </div>

        {/* <div className="section">

        </div> */}
    </div>
);
