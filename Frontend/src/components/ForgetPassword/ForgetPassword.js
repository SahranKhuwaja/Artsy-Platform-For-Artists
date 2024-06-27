import React, { Component } from 'react';
import backgroundMainImage from '../../assets/img/3.jpg';
import axios from 'axios';
import { Button, Container, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Alert } from "reactstrap";

import Navbar from "../Navbars/IndexNavbar";

class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fPEmail: '',
            url: 'http://localhost:3001/user/',
            success: false,
            notExists: false
        }
    }

    fPEmailSet = (e) => {
        this.setState({
            fPEmail: e.target.value
        })
    }

    requestLink = async () => {
        this.setState({
            success:false,
            notExists:false
        })

        const request = await axios.post(`${this.state.url}forgetpassword/request`, { Email: this.state.fPEmail });
        if (request.data) {
            this.setState({
                success: true,
                fPEmail: ''
            })
        }
        else {
            this.setState({
                notExists: true,
                fPEmail: ''
            })
        }
    }

    render() {
        return (
            <>
                <Navbar />
                <div className="page-header section-dark" style={{ backgroundImage: `url(${backgroundMainImage})` }}>
                    <div className="filter" />
                    <div className="content-center">
                        <Container>
                            <div className="text-center" style={{ backgroundColor: '#0b1011', padding: '50px', paddingTop: "20px", height: "250px", width: "500px" }}>
                                <h3 style={{ fontWeight: "bold" }}>Forgotten Password</h3>
                                <p>Please enter your email address.</p>

                                <br />
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><i className="fa fa-envelope"></i></InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="email" id="Email" value={this.state.fPEmail} placeholder="Email" onChange={this.fPEmailSet.bind(this)} />
                                    </InputGroup>
                                </FormGroup>

                                <Button block className="btn-round" color="default" onClick={this.requestLink}>Submit</Button>

                            </div>

                            <div style={{ backgroundImage: "url(" + backgroundMainImage + ")", width: "500px", height: "30px" }}></div>

                            {this.state.success ?
                                <Alert color="success" style={{ marginTop: '10px', fontWeight: 'bold' }}>
                                    Password reset link has been sent to your email
                                </Alert> : null}

                            {this.state.notExists ?
                                <Alert color="danger" style={{ marginTop: '10px', fontWeight: 'bold' }}>
                                    No account with this email exists or email is invalid
                                </Alert> : null}
                        </Container>

                    </div>
                </div>
            </>
        )
    }
}

export default ForgetPassword;