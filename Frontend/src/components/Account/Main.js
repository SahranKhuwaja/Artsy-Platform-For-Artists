import React from 'react';
import axios from 'axios';

import { forOwn, isEqual } from 'lodash';
import validator from 'validator';
import countries from '../../assets/data/countries'
import url from '../../assets/data/url'

import Navbar from "../Navbars/IndexNavbar";
import Header from "./IndexHeader";
import Footer from "./Footer";
import LoginModal from "../Account/LoginModal";
axios.defaults.withCredentials = true;

class Main extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            loginModal: false,
            selectRoleModal: false,
            signupStep: 1,
            newUser: {
                FirstName: '',
                LastName: '',
                Email: '',
                Password: '',
                ConfirmPassword: '',
                Country: countries[0].name,
                City: '',
                Birthday: '',
                Gender: 'Male',
                Phone: '',
                Role: 'Artist'
            },
            login: {
                Email: '',
                Password: ''
            },
            enabled: false,
            errors: [],
            fields: ['FirstName', 'LastName', 'Email', 'Password', 'ConfirmPassword', "Country", "City", "Birthday", "Gender", "Phone"],
            popovers: [{ display: false, message: '' }, { display: false, message: '' }, { display: false, message: '' }, { display: false, message: '' }, { display: false, message: '' }, { display: false, message: '' }, { display: false, message: '' }, { display: false, message: '' }, { display: false, message: '' }, { display: false, message: '' }],
            loginAlert: ""
        }
    }


    onFirstNameChange = (input) => {
        this.setState({
            newUser: { ...this.state.newUser, FirstName: input.target.value }
        })
    }

    onLastNameChange = (input) => {
        this.setState({
            newUser: { ...this.state.newUser, LastName: input.target.value }
        })
    }

    onEmailChange = (input) => {
        this.setState({
            newUser: { ...this.state.newUser, Email: input.target.value }
        })
    }

    onPasswordChange = (input) => {
        this.setState({
            newUser: { ...this.state.newUser, Password: input.target.value }
        })
    }

    onConfirmPasswordChange = (input) => {
        this.setState({
            newUser: { ...this.state.newUser, ConfirmPassword: input.target.value }
        })
    }

    onChecked = () => {
        this.setState({
            enabled: !this.state.enabled
        })
    }

    onCountryChange = (input) => {
        this.setState({
            newUser: { ...this.state.newUser, Country: input.target.value }
        })
    }

    onCityChange = (input) => {
        this.setState({
            newUser: { ...this.state.newUser, City: input.target.value }
        })
    }

    onBirthdayChange = (input) => {
        this.setState({
            newUser: { ...this.state.newUser, Birthday: input._d }
        })
    }

    onGenderChange = (input) => {
        this.setState({
            newUser: { ...this.state.newUser, Gender: input.target.value }
        })
    }

    onPhoneChange = (input) => {
        this.setState({
            newUser: { ...this.state.newUser, Phone: input.target.value }
        })
    }

    setStep1 = () => {
        this.setState({
            signupStep: 1
        })
    }

    setStep2 = () => {
        this.setState({
            signupStep: 2
        })
    }

    setStep3 = () => {
        this.setState({
            signupStep: 3
        })
    }

    setStep4 = () => {
        this.setState({
            signupStep: 4
        })
    }

    addBasic = async (event) => {
        const { newUser, fields } = this.state;
        let errors = []
        let popoversD = [{ display: false, message: '' }, { display: false, message: '' }, { display: false, message: '' }, { display: false, message: '' }, { display: false, message: '' }, { display: false, message: '' }, { display: false, message: '' }, { display: false, message: '' }, { display: false, message: '' }, { display: false, message: '' }]

        document.querySelector(`#FirstNameG`).classList.remove("has-danger");
        document.querySelector(`#LastNameG`).classList.remove("has-danger");
        document.querySelector(`#EmailG`).classList.remove("has-danger");
        document.querySelector(`#PasswordG`).classList.remove("has-danger");
        document.querySelector(`#ConfirmPasswordG`).classList.remove("has-danger");

        forOwn(newUser, async (value, key) => {
            if (key === 'FirstName' || key === 'LastName' || key === 'Email' || key === 'Password' || key === 'ConfirmPassword') {
                if (value === '') {
                    errors.push({ error: 'Required', tag: key });
                }
                if (key === 'Email' && value !== '') {
                    if (!validator.isEmail(value)) {
                        errors.push({ error: 'Invalid Email Address', tag: key })
                    }
                } else {
                    if (key === 'Password' && value !== '') {
                        if (value.length < 8 || value.length > 15) {
                            errors.push({ error: 'Length should be between 8-15', tag: key })
                        }
                        else if (!value.match(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)) {
                            errors.push({ error: 'Requires a letter, digit & symbol', tag: key })
                        }
                        else {
                            if (!isEqual(value, newUser.ConfirmPassword)) {
                                errors.push({ error: "Password doesn't match", tag: "ConfirmPassword" })
                            }
                        }
                    }
                }
            }
        })


        if (newUser.Email !== '') {
            await axios.get(url + "session/verifyEmail?Email=" + newUser.Email).then(e => {
                if (e.data) {
                    errors.push({ error: 'Account already exists', tag: "Email" })
                    console.log(errors)
                }
            })
        }


        await errors.map((e, j) => {
            // eslint-disable-next-line
            return fields.map((el, i) => {
                if (isEqual(e.tag, el)) {
                    return [
                        document.querySelector(`#${fields[i]}G`).classList.add("has-danger"),
                        popoversD[i] = { display: true, message: e.error }
                    ]
                }
            })
        })

        console.log(popoversD);

        this.setState({ errors, popovers: popoversD })

        if (errors.length === 0) {
            this.setStep2();
        }
    }

    addPersonalInfo = async (event) => {
        const { newUser, fields } = this.state;
        let errors = []
        await forOwn(newUser, (value, key) => {
            if (key === 'Country' || key === 'City' || key === 'Birthday' || key === 'Gender' || key === 'Phone') {
                if (value === '') {
                    errors.push({ error: 'Required', tag: key });
                }
                else if (key === 'Phone' && !validator.isMobilePhone(value)) {
                    errors.push({ error: 'Invalid Phone Number', tag: key });
                }
            }
        })

        console.log(errors);

        let popoversD = [{ display: false, message: '' }, { display: false, message: '' }, { display: false, message: '' }, { display: false, message: '' }, { display: false, message: '' }, { display: false, message: '' }, { display: false, message: '' }, { display: false, message: '' }, { display: false, message: '' }, { display: false, message: '' }]
        document.querySelector(`#Country`).classList.remove("has-danger");
        document.querySelector(`#City`).classList.remove("has-danger");
        document.querySelector(`#Birthday`).classList.remove("has-danger");
        document.querySelector(`#Gender`).classList.remove("has-danger");
        document.querySelector(`#Phone`).classList.remove("has-danger");

        errors.map((e, j) => {
            // eslint-disable-next-line
            return fields.map((el, i) => {
                if (isEqual(e.tag, el)) {
                    return [
                        document.querySelector(`#${fields[i]}`).classList.add("has-danger"),
                        popoversD[i] = { display: true, message: e.error }
                    ]
                }
            })
        })

        this.setState({ errors, popovers: popoversD })

        if (errors.length === 0) {
            this.setStep3();
        }
    }

    setRoleArtist = () => {
        const {newUser} = this.state;
        this.setState({
            newUser:{...newUser, Role: 'Artist'}
        })
        this.setStep4();
    }

    setRoleClient = () => {
        const {newUser} = this.state;
        this.setState({
            newUser:{...newUser, Role: 'Client'}
        })
        this.setStep4();
    }

    createAccount = () => {
        axios.post(url + "user/insert", this.state.newUser).then(e => {
           this.props.checkProfileStatus()
        });
    }

    toggleLoginModal = () => {
        const { loginModal } = this.state;
        this.setState({
            loginModal: !loginModal,
            login: {
                Email: '',
                Password: ''
            },
            loginAlert: ""
        })
    }

    setLoginEmail = (input) => {
        this.setState({
            login: { ...this.state.login, Email: input.target.value }
        })
    }

    setLoginPass = (input) => {
        this.setState({
            login: { ...this.state.login, Password: input.target.value }
        })
    }

    onLogin = async () => {
        const { login } = this.state
        let loginAlert = ""

        if (login.Email === "" || login.Password === "") {
            loginAlert = "Email and Password are required"
        } else if ((await axios.post(url + 'session/signin', this.state.login)).data) {
                this.props.checkProfileStatus()
        } else {
            loginAlert = "Incorrect Email or Password"
        }
        
        this.setState({
            loginAlert,
            login: {...this.state.login, Password: ''}
        })
    }

    render() {
        return (
            <>
                <Navbar />
                <Header displayModal={this.toggleLoginModal} newUser={this.state.newUser}
                    onFirstNameChange={this.onFirstNameChange.bind(this)}
                    onLastNameChange={this.onLastNameChange.bind(this)}
                    onEmailChange={this.onEmailChange.bind(this)}
                    onPasswordChange={this.onPasswordChange.bind(this)}
                    onConfirmPasswordChange={this.onConfirmPasswordChange.bind(this)}
                    onCountryChange={this.onCountryChange.bind(this)}
                    onCityChange={this.onCityChange.bind(this)}
                    onBirthdayChange={this.onBirthdayChange.bind(this)}
                    onGenderChange={this.onGenderChange.bind(this)}
                    onPhoneChange={this.onPhoneChange.bind(this)}
                    setRoleArtist={this.setRoleArtist.bind(this)}
                    setRoleClient={this.setRoleClient.bind(this)}
                    signupStep={this.state.signupStep}
                    setStep1={this.setStep1.bind(this)}
                    setStep2={this.setStep2.bind(this)}
                    setStep3={this.setStep3.bind(this)}
                    addBasic={this.addBasic.bind(this)}
                    addPersonalInfo={this.addPersonalInfo.bind(this)}
                    popovers={this.state.popovers} show={this.state.show}
                    createAccount={this.createAccount.bind(this)}
                    enabled={this.state.enabled}
                    onChecked={this.onChecked.bind(this)}
                />
                <LoginModal display={this.state.loginModal} displayModal={this.toggleLoginModal.bind(this)}
                    onLogin={this.onLogin.bind(this)}
                    login={this.state.login}
                    setLoginEmail={this.setLoginEmail.bind(this)}
                    setLoginPass={this.setLoginPass.bind(this)}
                    loginAlert = {this.state.loginAlert} />
                <Footer />
            </>
        )
    }
}

export default Main;