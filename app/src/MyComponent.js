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
        <p>
            This UI is a very simple reference implementation that allows the full life cycle of a tender to be assessed. This is simply intended to demonstrate how the contract interactions work, this is not a complete UI for this tendering system.
        </p>
        <hr />
        <table>
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
                    <div className="borderDiv">
                    <p>Register as Client:</p>
                    <ContractForm
                        contract="TenderManager"
                        method="registerClient"
                        labels={["Register as Client"]}/>
                    </div>
                </td>
                <td>
                    <div className="borderDiv">
                    <p>Unregister as Client:</p>
                    <ContractForm
                        contract="TenderManager"
                        method="unregisterClient"
                        labels={["Unegister as Client"]}/>
                    </div>
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
        <IpfsForm />
        <div className="section">
            <h2> Tender Manager </h2>
            <ContractForm contract="TenderManager" method="registeredClients" methodArgs={[accounts[0]]}/>

            <br />
            Create Tender:
            <ContractForm
                contract="TenderManager"
                method="createTender"
                labels={["% on Award"]}/>

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
