import { React, useState } from 'react';
import './sign_in.css';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { useHistory } from 'react-router-dom';
import { newContextComponents } from "@drizzle/react-components";
const { ContractData, ContractForm } = newContextComponents;

function SignIn({ drizzle, drizzleState }) {
    const [user, setUser] = useState('');
    const [show, setShow] = useState(false);

    const acc = drizzle.web3.eth.accounts.givenProvider.selectedAddress;
    const history = useHistory();
    const handleLogin = () => {
        const u = user.toLowerCase();
        console.log("Metamask:" ,acc,"Input: ",u);
        if (u === acc) {
            history.push('/dashboard');
            history.go();
        }else{
            handleShow();
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (

        <div >
            <Row>
                <Col>
                    <div className="form-wrapper">
                        <h2>Create Account</h2>
                        <br></br>
                        <ContractForm drizzle={drizzle} contract="Healthcare" method="addUser" sendArgs={{ from: acc, gas: 600000 }} />
                        {/* <ContractForm drizzle={drizzle} contract="Healthcare" method="updateUserInfo" sendArgs={{from: acc, gas: 600000}}/> */}
                        <br></br>
                        <p>
                            Number of users:<ContractData drizzle={drizzle} drizzleState={drizzleState} contract="Healthcare" method="showUsersCount" />
                        </p>
                    </div>
                </Col>
                <Col>
                    <div className="form-wrapper2">
                        <h2>Login</h2>
                        <br></br>
                        <p>Enter account address:</p>
                        <input type="text" onChange={event => setUser(event.target.value)} />
                        <br></br><br></br>
                        <Button variant="primary" onClick={handleLogin}>Login</Button>
                    </div>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Incorrect account address</Modal.Title>
                </Modal.Header>
                <Modal.Body>Enter your account address from Metamask to Log in.</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default SignIn