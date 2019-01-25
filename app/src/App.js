import React, { Component } from "react";
import { DrizzleProvider } from "drizzle-react";
import { LoadingContainer } from "drizzle-react-components";

import TenderManager from "./contracts/TenderManager.json";
import truffleContract from "truffle-contract";
import getWeb3 from "./getWeb3";
import ipfs from './ipfs';

import "./App.css";

import drizzleOptions from "./drizzleOptions";
import MyContainer from "./MyContainer";

class App extends Component {
    render() {
        return (
            <div>
                <DrizzleProvider options={drizzleOptions}>
                    <LoadingContainer>
                        <MyContainer />
                    </LoadingContainer>
                </DrizzleProvider>
            </div>
            );
        }
    }

    export default App;
