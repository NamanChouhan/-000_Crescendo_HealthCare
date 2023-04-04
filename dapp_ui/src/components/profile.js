import React from 'react';
import { Row, Col } from 'react-bootstrap';
// import Form from 'react-bootstrap/Form';
import './profile.css';
import { newContextComponents } from "@drizzle/react-components";
const { ContractData, ContractForm } = newContextComponents;

function profile(props) {
    const { drizzle, drizzleState } = props;
    let sender = drizzle.web3.eth.accounts.givenProvider.selectedAddress; //gives the connected Metamask account
    return (
        <div className="form-css">
            <h2>Account Information</h2>
            <Row>
                <Col>
                    <ContractData drizzle={drizzle} drizzleState={drizzleState} contract="Healthcare" method="showAccInfo" methodArgs={[sender, { from: sender }]} />
                </Col>
            </Row>
            <h2>Personal Information</h2>
            <Row>
                <Col>
                    <ContractData drizzle={drizzle} drizzleState={drizzleState} contract="Healthcare" method="showPersonalInfo" methodArgs={[sender, { from: sender }]} />
                </Col>
                <Col className="form">
                    <ContractForm drizzle={drizzle} contract="Healthcare" method="updateUserInfo" sendArgs={{ from: sender, gas: 600000 }} />
                </Col>
            </Row>
        </div>
    )
}

export default profile
