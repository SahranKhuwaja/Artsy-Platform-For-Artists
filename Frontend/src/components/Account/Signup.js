import React from "react";
import { Popover, PopoverBody, Progress, CardImg, CardText, FormGroup, Label, Input, Button, InputGroupAddon, InputGroupText, InputGroup, Card, CardBody, DropdownItem, DropdownMenu, UncontrolledDropdown, DropdownToggle } from "reactstrap";
import Datetime from 'react-datetime';
import artistIcon from '../../assets/img/artistIcon.png';
import clientIcon from '../../assets/img/clientIcon.png';
import countries from '../../assets/data/countries'

const Signup = (props) => {

    let show = props.popovers;
    switch (props.signupStep) {
        case 1: {
            return (
                <>
                    <div>
                        <h2 className="bold darkGray">Sign Up</h2>
                        <p className="bolder lightGray">Please fill in this form to create an account!</p>
                    </div>
                    <br />
                    <div className="form-row">

                        <FormGroup className="col-md-6" id="FirstNameG">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input value={props.newUser.FirstName} onChange={props.onFirstNameChange} id="FirstName0" type="text" placeholder="First Name" required />
                                <Popover placement="left" isOpen={show[0].display} target="FirstNameG" className="popover-primary">
                                    <PopoverBody id="FirstName0">
                                        {show[0].message}
                                    </PopoverBody>
                                </Popover>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup className="col-md-6" id="LastNameG" >
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input value={props.newUser.LastName} onChange={props.onLastNameChange} id="LastName1" type="text" placeholder="Last Name" />
                                <Popover placement="right" isOpen={show[1].display} target="LastNameG" className="popover-primary">
                                    <PopoverBody id="LastName1">
                                        {show[1].message}
                                    </PopoverBody>
                                </Popover>
                            </InputGroup>
                        </FormGroup>
                    </div>

                    <FormGroup id="EmailG">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><i className="fa fa-envelope"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input value={props.newUser.Email} onChange={props.onEmailChange} id="Email" type="email" placeholder="Email" />
                            <Popover placement="right" isOpen={show[2].display} target="EmailG" className="popover-primary">
                                <PopoverBody id="Email2">
                                    {show[2].message}
                                </PopoverBody>
                            </Popover>
                        </InputGroup>
                    </FormGroup>

                    <FormGroup id="PasswordG">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><i className="fa fa-lock"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input value={props.newUser.Password} onChange={props.onPasswordChange} id="Password" type="password" placeholder="Password" autoComplete="off" />
                            <Popover placement="right" isOpen={show[3].display} target="PasswordG" className="popover-primary">
                                <PopoverBody id="Password3">
                                    {show[3].message}
                                </PopoverBody>
                            </Popover>
                        </InputGroup>
                    </FormGroup>

                    <FormGroup id="ConfirmPasswordG">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><i className="fa fa-repeat"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input value={props.newUser.ConfirmPassword} onChange={props.onConfirmPasswordChange} id="ConfirmPassword" type="password" placeholder="Confirm Password" autoComplete="off" />
                            <Popover placement="right" isOpen={show[4].display} target="ConfirmPasswordG" className="popover-primary">
                                <PopoverBody id="ConfirmPassword4">
                                    {show[4].message}
                                </PopoverBody>
                            </Popover>
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                        <Label style={{ marginLeft: "20px" }} className="form-check-label">
                            <Input className="form-check-input" type="checkbox" checked={props.enabled} onChange={props.onChecked}/>
                            <p className="bolder lightGray inline">I accept the </p><a className="bolder" href="#!">Terms of Use</a><p className="bolder lightGray inline"> and </p><a className="bolder" href="#!">Private Policy</a><p className="bolder lightGray inline">.</p>
                        </Label>
                    </FormGroup>
                    <Button color="primary" onClick={props.addBasic} disabled={!props.enabled}>Sign Up</Button>
                </>
            );
        }

        case 2: {
            return (
                <>
                    <div>
                        <h2 className="bold darkGray">Personal Information</h2>
                        <p className="bolder lightGray">Please fill in this form to create an account!</p>
                    </div>
                    <br />
                    <Progress striped max="3" value="1" barClassName="progress-bar-info" />
                    <br />
                    <div className="form-row">

                        <FormGroup className="col-md-6" id="Country">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-globe"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input type="select" defaultValue={props.newUser.Country[0]} id="Country5" name="select" onChange={props.onCountryChange}>
                                    {
                                        countries.map((e, i) => {
                                            if (i === 0)
                                                return <option selected value={e.name} key={i}>{e.name}</option>
                                            else
                                                return <option value={e.name} key={i}>{e.name}</option>
                                        })
                                    }
                                </Input>
                                <Popover placement="right" isOpen={show[5].display} target="Country" className="popover-primary">
                                    <PopoverBody id="Country5">
                                        {show[5].message}
                                    </PopoverBody>
                                </Popover>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup className="col-md-6" id="City">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-map-marker"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input value={props.newUser.City} onChange={props.onCityChange} id="City6" type="type" placeholder="City">
                                </Input>
                                <Popover placement="right" isOpen={show[6].display} target="City" className="popover-primary">
                                    <PopoverBody id="City6">
                                        {show[6].message}
                                    </PopoverBody>
                                </Popover>
                            </InputGroup>
                        </FormGroup>
                    </div>

                    <FormGroup id="Birthday">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><i className="fa fa-calendar"></i></InputGroupText>
                            </InputGroupAddon>
                            <Datetime value={props.newUser.Birthday} dateFormat='MMMM D, YYYY' max={Date.now()} onChange={props.onBirthdayChange}  id="Birthday7" timeFormat={false} inputProps={{ placeholder: "Date of Birth" }} />
                            <Popover placement="right" isOpen={show[7].display} target="Birthday" className="popover-primary">
                                <PopoverBody id="Birthday7">
                                    {show[7].message}
                                </PopoverBody>
                            </Popover>
                        </InputGroup>
                    </FormGroup>

                    <FormGroup id="Gender">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input defaultValue={props.newUser.Gender} onChange={props.onGenderChange}  id="Gender8" type="select" name="select">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </Input>
                            <Popover placement="right" isOpen={show[8].display} target="Gender" className="popover-primary">
                                <PopoverBody id="Gender8">
                                    {show[8].message}
                                </PopoverBody>
                            </Popover>
                        </InputGroup>
                    </FormGroup>

                    <FormGroup id="Phone">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><i className="fa fa-phone"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input value={props.newUser.Phone} onChange={props.onPhoneChange} id="Phone9" type="text" placeholder="Phone" />
                            <Popover placement="right" isOpen={show[9].display} target="Phone" className="popover-primary">
                                <PopoverBody id="Phone9">
                                    {show[9].message}
                                </PopoverBody>
                            </Popover>
                        </InputGroup>
                    </FormGroup>
                    <Button color="primary" onClick={props.addPersonalInfo}>Next</Button>
                </>
            )
        }

        case 3: {
            return (
                <>
                    <div>
                        <h2 className="bold darkGray">Select Your Role</h2>
                        <p className="bolder lightGray">What is your purpose for joining ARTSY?</p>
                    </div>
                    <br />
                    <Progress striped max="3" value="2" barClassName="progress-bar-info" />
                    <br />
                    <div style={{ display: "flex" }}>

                        <Card style={{ width: '20rem', marginRight: "10px" }} onClick={props.setRoleArtist}>
                            <CardImg top src={artistIcon} alt="Artist" />
                            <CardBody style={{ padding: "10px" }}>
                                <CardText>
                                    I want to showcase my work and / or start a bussiness.
                                </CardText>
                            </CardBody>
                        </Card>

                        <Card style={{ width: '20rem', marginLeft: "10px" }} onClick={props.setRoleClient}>
                            <CardImg top src={clientIcon} alt="Client" />
                            <CardBody style={{ padding: "10px" }}>
                                <CardText>
                                    I want to buy art and / or hire someone who can arrange events for me.
                                </CardText>
                            </CardBody>
                        </Card>
                    </div>
                </>
            )
        }

        case 4: {
            return (
                <>
                    <div>
                        <h2 className="bold darkGray">Your Profile is Ready!</h2>
                        <p className="bolder lightGray">Are you satisfied with your details?</p>
                        <br />
                        <Progress striped max="3" value="3" barClassName="progress-bar-info" />
                        <br />
                        <span>
                            <UncontrolledDropdown style={{ marginRight: "5px" }} className="btn-group">
                                <DropdownToggle aria-expanded={false} aria-haspopup={true} caret color="primary" data-toggle="dropdown" type="button">Go Back</DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem href="#!" onClick={props.setStep1}>Sign Up</DropdownItem>
                                    <DropdownItem href="#!" onClick={props.setStep2}>Personal Information</DropdownItem>
                                    <DropdownItem href="#!" onClick={props.setStep3}>Select Your Role</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <Button style={{ marginLeft: "5px" }} color="success" onClick={props.createAccount}>Finish</Button>
                        </span>
                    </div>
                    <br />
                </>
            )
        }

        default: break;
    }
};

export default Signup;