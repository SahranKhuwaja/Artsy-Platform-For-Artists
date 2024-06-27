import React, { Component } from 'react';
import backgroundMainImage from '../../assets/img/3.jpg';
import axios from 'axios';
import { Popover, PopoverBody, Button, Container, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";

import Navbar from "../Navbars/IndexNavbar";
import { Link } from 'react-router-dom';
import { isEqual } from 'lodash';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'http://localhost:3001/user/',
            success: false,
            NewPassword: '',
            ConfirmPassword: '',
            InvalidToken: false,
            NewPasswordMsg: '',
            ConfirmPasswordMsg: ''
        }
    }

    NewPasswordSet = (e) => {
        this.setState({
            NewPassword: e.target.value
        })
    }
    ConfirmPasswordSet = (e) => {
        this.setState({
            ConfirmPassword: e.target.value
        })
    }

    componentDidMount = async () => {
        const check = await axios.get(`${this.state.url}resetpassword/${this.props.match.params.token}`);
        if (!check.data) {
            this.setState({
                InvalidToken: true
            })
        }
    }

    resetPassword = async () => {
        const { NewPassword, ConfirmPassword } = this.state
        let NewPasswordMsg = ""
        let ConfirmPasswordMsg = ""

        if (NewPassword === "") {
            NewPasswordMsg = "Required"
        } else if (NewPassword.length < 8 || NewPassword.length > 15) {
            NewPasswordMsg = "Length should be between 8-15"
        } else if (!NewPassword.match(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)) {
            NewPasswordMsg = "Requires a letter, digit & symbol"
        }

        if (ConfirmPassword === "") {
            ConfirmPasswordMsg = "Required"
            alert("h")
        } else if (!isEqual(NewPassword, ConfirmPassword)) {
            ConfirmPasswordMsg = "Password doesn't match"
        }

        if (await NewPasswordMsg === "" && await NewPasswordMsg === "") {
            const check = await axios.post(`${this.state.url}resetpassword/${this.props.match.params.token}`, { Password: this.state.NewPassword });
            if (!check.data) {
                this.setState({
                    InvalidToken: true
                })
            } else {
                this.setState({
                    success: true
                })
            }
        }

        this.setState({
            NewPasswordMsg, ConfirmPasswordMsg
        })

    }

    render() {
        if (this.state.success) {
            return (
                <>
                    <Navbar />
                    <div className="page-header section-dark" style={{ backgroundImage: `url(${backgroundMainImage})` }}>
                        <div className="filter" />
                        <div className="content-center">
                            <Container>
                                <div className="text-center" style={{ backgroundColor: '#0b1011', padding: '50px', paddingTop: "20px", height: "300px", width: "500px" }}>
                                    <h3 style={{ fontWeight: "bold" }}>Reset Password</h3>
                                    <p>Please reset your password.</p>
                                    <br />
                                    <h3 style={{ textAlign: 'center', color: '#18ab1c', fontWeight: "bold", marginTop: "0px" }} key="3sksk">
                                        Your password has been reset, click below to login.
                                    </h3>
                                    <br />
                                    <Link to="/" key="4sksk"><Button>Go to Login</Button></Link>
                                </div>
                                <div style={{ backgroundImage: "url(" + backgroundMainImage + ")", width: "500px", height: "30px" }}></div>

                            </Container>

                        </div>
                    </div>
                </>
            )
        } else if (!this.state.InvalidToken) {
            return (
                <>
                    <Navbar />
                    <div className="page-header section-dark" style={{ backgroundImage: `url(${backgroundMainImage})` }}>
                        <div className="filter" />
                        <div className="content-center">
                            <Container>
                                <div className="text-center" style={{ backgroundColor: '#0b1011', padding: '50px', paddingTop: "20px", height: "325px", width: "500px" }}>
                                    <h3 style={{ fontWeight: "bold" }}>Reset Password</h3>
                                    <p>Please reset your password.</p>
                                    <br />

                                    <FormGroup key="1sksk" className={(this.state.NewPasswordMsg === "" ? "" : "has-danger")}>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText><i className="fa fa-lock"></i></InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" id="NewPassword" value={this.state.NewPassword} placeholder="New Password" onChange={this.NewPasswordSet} />
                                            <Popover placement="right" isOpen={this.state.NewPasswordMsg !== ""} target="NewPassword" className="popover-primary">
                                                <PopoverBody id="NewPassword0">
                                                    {this.state.NewPasswordMsg}
                                                </PopoverBody>
                                            </Popover>
                                        </InputGroup>
                                    </FormGroup>

                                    <FormGroup className={(this.state.ConfirmPasswordMsg === "" ? "" : "has-danger")}>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText><i className="fa fa-repeat"></i></InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" id="ConfirmPassword" value={this.state.ConfirmPassword} placeholder="Confirm Password" onChange={this.ConfirmPasswordSet} />
                                            <Popover placement="right" isOpen={this.state.ConfirmPasswordMsg !== ""} target="ConfirmPassword" className="popover-primary">
                                                <PopoverBody id="ConfirmPassword1">
                                                    {this.state.ConfirmPasswordMsg}
                                                </PopoverBody>
                                            </Popover>
                                        </InputGroup>
                                    </FormGroup>
                                    <Button block className="btn-round" color="default" key="2sksk" onClick={this.resetPassword}>Submit</Button>

                                </div>
                                <div style={{ backgroundImage: "url(" + backgroundMainImage + ")", width: "500px", height: "30px" }}></div>

                            </Container>

                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <Navbar />
                    <div className="page-header section-dark" style={{ backgroundImage: `url(${backgroundMainImage})` }}>
                        <div className="filter" />
                        <div className="content-center">
                            <Container>
                                <div className="text-center" style={{ backgroundColor: '#0b1011', padding: '50px', paddingTop: "20px", height: "300px", width: "500px" }}>
                                    <h3 style={{ fontWeight: "bold" }}>Reset Password</h3>
                                    <p>Please reset your password.</p>
                                    <br />

                                    <h3 style={{ textAlign: 'center', color: '#d2710d', fontWeight: "bold", marginTop: "0px" }} key="5sksk">
                                        The link has expired, click below to request a new link.
                                                    </h3> <br />
                                    <Link to="/ForgetPassword" key="6sksk"><Button>Request New Link</Button></Link>

                                </div>
                                <div style={{ backgroundImage: "url(" + backgroundMainImage + ")", width: "500px", height: "30px" }}></div>

                            </Container>

                        </div>
                    </div>
                </>
            )
        }
    }
}

export default ResetPassword;