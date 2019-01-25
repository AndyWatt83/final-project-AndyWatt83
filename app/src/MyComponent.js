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
        <IpfsForm />
        <div className="section">
            <h2> Tender Manager </h2>
            <div className="borderDiv">
                <p>Register as Client:</p>
                <ContractForm
                    contract="TenderManager"
                    method="registerClient"
                    labels={["Register as Client"]}/>
            </div>

            <div className="borderDiv">
                <p>Unregister as Client:</p>
                <ContractForm
                    contract="TenderManager"
                    method="unregisterClient"
                    labels={["Unegister as Client"]}/>
            </div>

            <div className="borderDiv">
                <p>Check if an address is a registered client:</p>
                <ContractForm contract="TenderManager" method="registeredClients"/>
            </div>

            <ContractData
                contract="TenderManager"
                method="registeredClients"
                methodArgs={[accounts[0]]}
                labels={["Check Registered"]}/>
            <br />
            Create Tender:
            <ContractForm
                contract="TenderManager"
                method="createTender"
                labels={["% on Award"]}/>
        </div>

        {/* <div className="section">

        </div> */}
    </div>
);
