import React from 'react';
import { Link } from 'react-router-dom';
import { Button, FormGroup, Input, Modal, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import backgroundMainImage from '../../assets/img/3.jpg';

const LoginModal = (props) => {


    return (

        <Modal isOpen={props.display} toggle={props.displayModal} modalClassName="modal-register">
            <div style={{ backgroundColor: "#0b1011" }} className="modal-header no-border-header text-center">
                <button style={{ color: "white" }} aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={props.displayModal}>
                    <span aria-hidden={true}>×</span>
                </button>
                <h3 className="modal-title text-center" style={{ fontWeight: "bold" }} >Login</h3>
                <p>Log in to your account</p>
            </div>

            <div style={{ backgroundColor: "#0b1011" }} className="modal-body">
                <FormGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-envelope"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input value={props.login.Email} onChange={props.setLoginEmail} type="email" id="Email" placeholder="Email" />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-lock"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input value={props.login.Password} onChange={props.setLoginPass} type="password" id="Password" placeholder="Password" autoComplete="off" />
                    </InputGroup>
                </FormGroup>
                <p style={{color:"#c1c1c1", fontWeight:"bold"}}>
                    {(props.loginAlert !== "" ? props.loginAlert : "")}
                </p>
                <Button block className="btn-round" color="default" onClick={props.onLogin}>Log in</Button>
            </div>

            <div style={{ backgroundColor: "#0b1011", marginBottom: "0px" }} className="modal-body">
                <span className="text-muted text-center">
                    Forgotten Password?{" "}
                    <Link to='/ForgetPassword'>click here</Link>
                </span>
            </div>

            <div style={{ backgroundImage: "url(" + backgroundMainImage + ")", marginBottom: "0px" }} className="modal-footer no-border-footer">
            </div>
        </Modal>
    );
}



export default LoginModal;