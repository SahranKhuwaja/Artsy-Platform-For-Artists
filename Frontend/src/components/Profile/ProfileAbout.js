import React from "react";
import countries from '../../assets/data/countries'
import url from '../../assets/data/url'
import Datetime from 'react-datetime';
import validator from 'validator'
import moment from 'moment';
import { Label, Input, InputGroup, Popover, PopoverBody, FormGroup, Button } from 'reactstrap';
import axios from "axios";
import Work from '../Modals/WorkModal';
import Education from '../Modals/EducationModal';
import Skill from '../Modals/SkillModal';

class AboutProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedValue: 1,
            disableBasic: true,
            disableContact: true,
            disableAccount: true,
            disablePassword: true,
            tempUser: { ...this.props.user, Password: '', NewPassword: '', ConfirmPassword: '' },
            Errors: {
                FirstName: '',
                LastName: '',
                Birthday: '',
                Gender: '',
                Country: '',
                City: '',
                Email: '',
                Phone: '',
                Password: '',
                NewPassword: '',
                ConfirmPassword: ''
            },
            WorkList: [],
            SkillList: [],
            EducationList: [],
            workModalState: false,
            educationModalState: false,
            skillModalState: false,
            Work: {
                _id: '',
                Values: {
                    StartDate: '',
                    EndDate: '',
                    CompanyName: '',
                    Designation: '',
                    CurrentlyWorking: false
                },
                Errors: {
                    StartDate: '',
                    EndDate: '',
                    CompanyName: '',
                    Designation: ''
                }
            },
            ProfessionalSkill: {
                _id: '',
                Values: {
                    Skill: '',
                    Description: '',
                },
                Errors: {
                    Skill: '',
                    Description: '',
                }
            },
            Education: {
                _id: '',
                Values: {
                    StartDate: '',
                    EndDate: '',
                    Institution: '',
                    Degree: '',
                    CurrentlyStudying: false
                },
                Errors: {
                    StartDate: '',
                    EndDate: '',
                    Institution: '',
                    Degree: '',
                }
            }
        }
    }

    setSelectedValue1 = () => {
        this.setState({
            selectedValue: 1,
            disableBasic: true,
            disableContact: true,
            disableAccount: true,
            disablePassword: true
        })
    }

    componentDidMount = () => {
        document.querySelector('#dt input').disabled = true;
        document.querySelector('.rdtPicker').hidden = true;

        this.populateWorkList();
        this.populateSkillList();
        this.populateEducationList();
    }

    componentDidUpdate = () => {
        if (this.state.selectedValue === 1 && this.state.disableBasic) {
            document.querySelector('#dt input').disabled = true;
            document.querySelector('.rdtPicker').hidden = true;
        }
    }

    setSelectedValue2 = () => {
        this.setState({
            selectedValue: 2,
            disableBasic: true,
            disableContact: true,
            disableAccount: true,
            disablePassword: true
        })
    }

    setSelectedValue3 = () => {
        this.setState({
            selectedValue: 3,
            disableBasic: true,
            disableContact: true,
            disableAccount: true,
            disablePassword: true
        })
    }

    onChangeFirstName = (input) => {
        this.setState({
            tempUser: { ...this.state.tempUser, FirstName: input.target.value }
        })
    }

    onChangeLastName = (input) => {
        this.setState({
            tempUser: { ...this.state.tempUser, LastName: input.target.value }
        })
    }

    onChangeBirthday = (input) => {
        this.setState({
            tempUser: { ...this.state.tempUser, Birthday: input._d }
        })
    }

    onChangeGender = (input) => {
        this.setState({
            tempUser: { ...this.state.tempUser, Gender: input.target.value }
        })
    }

    onChangeCountry = (input) => {
        this.setState({
            tempUser: { ...this.state.tempUser, Country: input.target.value }
        })
    }

    onChangeCity = (input) => {
        this.setState({
            tempUser: { ...this.state.tempUser, City: input.target.value }
        })
    }

    onChangeEmail = (input) => {
        this.setState({
            tempUser: { ...this.state.tempUser, Email: input.target.value }
        })
    }

    onChangePhone = (input) => {
        this.setState({
            tempUser: { ...this.state.tempUser, Phone: input.target.value }
        })
    }

    onChangeRole = (input) => {
        this.setState({
            tempUser: { ...this.state.tempUser, Role: input.target.value }
        })
    }

    onChangeTitle = (input) => {
        this.setState({
            tempUser: { ...this.state.tempUser, Title: input.target.value }
        })
    }

    onChangePassword = (input) => {
        this.setState({
            tempUser: { ...this.state.tempUser, Password: input.target.value }
        })
    }

    onChangeNewPassword = (input) => {
        this.setState({
            tempUser: { ...this.state.tempUser, NewPassword: input.target.value }
        })
    }

    onChangeConfirmPassword = (input) => {
        this.setState({
            tempUser: { ...this.state.tempUser, ConfirmPassword: input.target.value }
        })
    }

    editBasic = () => {
        this.setState({
            disableBasic: false
        })
        document.querySelector('#dt input').disabled = false;
        document.querySelector('.rdtPicker').hidden = false;
    }

    cancelBasic = () => {
        this.setState({
            disableBasic: true,
            tempUser: { ...this.props.user }
        })
        document.querySelector('#dt input').disabled = true;
        document.querySelector('.rdtPicker').hidden = true;
    }

    editContact = () => {
        this.setState({
            disableContact: false
        })
    }

    cancelContact = () => {
        this.setState({
            disableContact: true,
            tempUser: { ...this.props.user }
        })
    }

    editAccount = () => {
        this.setState({
            disableAccount: false
        })
    }

    cancelAccount = () => {
        this.setState({
            disableAccount: true,
            tempUser: { ...this.props.user }
        })
    }

    editPassword = () => {
        this.setState({
            disablePassword: false
        })
    }

    cancelPassword = () => {
        this.setState({
            disablePassword: true
        })
    }

    saveBasic = async () => {
        const { tempUser } = this.state
        let Errors = this.state.Errors
        Errors.FirstName = ''
        Errors.LastName = ''
        Errors.Birthday = ''
        Errors.Gender = ''
        Errors.Country = ''
        Errors.City = ''

        if (tempUser.FirstName === '' || tempUser.LastName === '' || tempUser.City === '') {
            if (tempUser.FirstName === '') {
                Errors.FirstName = 'Required'
            }
            if (tempUser.LastName === '') {
                Errors.LastName = 'Required'
            }
            if (tempUser.City === '') {
                Errors.City = 'Required'
            }
            this.forceUpdate();
        } else {
            const data = {
                FirstName: tempUser.FirstName,
                LastName: tempUser.LastName,
                Birthday: tempUser.Birthday,
                Gender: tempUser.Gender,
                Country: tempUser.Country,
                City: tempUser.City
            }
            const result = await (await axios.post(url + "user/edit", data)).data;
            if (result) {
                this.props.status();
                this.setState({
                    disableBasic: true
                })
            }
        }

    }

    saveContact = async () => {
        const { tempUser } = this.state
        let Errors = this.state.Errors
        Errors.Email = ''
        Errors.Phone = ''

        if (tempUser.Email === '' || !validator.isEmail(tempUser.Email) || tempUser.Phone === '' || !validator.isMobilePhone(tempUser.Phone)) {
            if (tempUser.Email === '') {
                Errors.Email = 'Required';
            } else if (!validator.isEmail(tempUser.Email)) {
                Errors.Email = 'Invalid Email Address';
            }

            if (tempUser.Phone === '') {
                Errors.Phone = 'Required';
            } else if (!validator.isMobilePhone(tempUser.Phone)) {
                Errors.Phone = 'Invalid Phone Number';
            }

            this.forceUpdate();

        } else {
            const data = { Email: tempUser.Email, Phone: tempUser.Phone }
            const result = await (await axios.post(url + "user/edit", data)).data;
            if (result) {
                this.setState({
                    disableContact: true
                })
            }
        }

        console.log(this.state)
    }

    saveAccount = async () => {
        const { tempUser } = this.state
        const data = { Role: tempUser.Role, Title: tempUser.Title }
        const result = await (await axios.post(url + "user/edit", data)).data;
        if (result) {
            this.props.status();
            this.setState({
                disableAccount: true

            })
        }
    }

    savePassword = async () => {
        const { tempUser } = this.state
        let Errors = this.state.Errors;
        Errors.Password = '';
        Errors.NewPassword = '';
        Errors.ConfirmPassword = '';

        if (tempUser.Password === '' || tempUser.NewPassword === '' || tempUser.ConfirmPassword === '') {

            if (tempUser.Password === '') {
                Errors.Password = 'Required'
            }
            if (tempUser.NewPassword === '') {
                Errors.NewPassword = 'Required'
            }
            if (tempUser.ConfirmPassword === '') {
                Errors.ConfirmPassword = 'Required'
            }
        } else if (!(await axios.post(url + 'user/verifyPassword', { Password: tempUser.Password })).data) {
            Errors.Password = 'Incorrect Password'
        }
        else if (!tempUser.NewPassword.match(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)) {

            if (tempUser.NewPassword.length < 8 || tempUser.NewPassword.length > 15) {
                Errors.Password = 'Length should be between 8-15'
            } else {
                Errors.Password = 'Requires a letter, digit & symbol'
            }

        } else if (tempUser.NewPassword !== tempUser.ConfirmPassword) {
            Errors.Password = "Password doesn't match"

        } else if (await (await axios.post(url + "user/resetpassword", { Password: tempUser.NewPassword })).data) {
            this.setState({
                disablePassword: true,
                tempUser: { ...this.props.user, Password: '', NewPassword: '', ConfirmPassword: '' }
            })
        }
        this.forceUpdate();
    }

    toggleWorkModal = () => {
        const workModalState = this.state.workModalState;
        this.setState({
            workModalState: !workModalState
        })
    }

    toggleEducationModal = () => {
        this.setState({
            educationModalState: !this.state.educationModalState
        })
    }

    toggleSkillModal = () => {
        this.setState({
            skillModalState: !this.state.skillModalState
        })
    }

    onChangeWorkStartDate = (input) => {
        let Work = { ...this.state.Work }
        Work.Values.StartDate = input._d;
        this.setState({
            Work
        })
    }

    onChangeWorkEndDate = (input) => {
        let Work = { ...this.state.Work }
        Work.Values.EndDate = input._d;
        this.setState({
            Work
        })
    }

    onChangeCompanyName = (input) => {
        let Work = { ...this.state.Work }
        Work.Values.CompanyName = input.target.value;
        this.setState({
            Work
        })
    }

    onChangeDesignation = (input) => {
        let Work = { ...this.state.Work }
        Work.Values.Designation = input.target.value;
        this.setState({
            Work
        })
    }

    onChangeCurrentlyWorking = (input) => {
        let Work = { ...this.state.Work }
        Work.Values.CurrentlyWorking = input.target.checked;
        Work.Values.EndDate = '';
        Work.Errors.EndDate = '';
        this.setState({
            Work
        })
        document.querySelector('#EndDateG input').disabled = input.target.checked;
        document.querySelector('#EndDateG .rdtPicker').hidden = input.target.checked;
    }

    cancelWork = () => {
        this.clearWork();
        this.toggleWorkModal();
    }

    clearWork = () => {
        this.setState({
            Work: {
                _id: '',
                Values: {
                    StartDate: '',
                    EndDate: '',
                    CompanyName: '',
                    Designation: '',
                    CurrentlyWorking: false
                },
                Errors: {
                    StartDate: '',
                    EndDate: '',
                    CompanyName: '',
                    Designation: ''
                }
            }
        })
    }

    AddWork = async () => {
        let Work = { ...this.state.Work }

        Work.Errors = { StartDate: '', EndDate: '', CompanyName: '', Designation: '' }
        if (Work.Values.StartDate === '' || (Work.Values.EndDate === '' && !Work.Values.CurrentlyWorking) || Work.Values.CompanyName === '' || Work.Values.Designation === '') {

            if (Work.Values.StartDate === '') {
                Work.Errors.StartDate = 'Required'
            }
            if (Work.Values.EndDate === '' && !Work.Values.CurrentlyWorking) {
                Work.Errors.EndDate = "Required (Or check 'I currently work here')"
            }
            if (Work.Values.CompanyName === '') {
                Work.Errors.CompanyName = 'Required'
            }
            if (Work.Values.Designation === '') {
                Work.Errors.Designation = 'Required'
            }

            this.setState({
                Work
            })

        } else if (Work.Values.StartDate > Work.Values.EndDate && (Work.Values.CurrentlyWorking === false)) {

            Work.Errors.EndDate = "End Date must succeed the Start Date"
            this.setState({
                Work
            })

        } else {
            if (Work._id === '') {
                //insert
                axios.post(url + 'work/insert', { ...Work.Values }).then(async () => {
                    await this.populateWorkList();
                });

            } else {
                //update
                axios.post(url + 'work/update/' + Work._id, { ...Work.Values }).then(async () => {
                    await this.populateWorkList();
                });
            }

            this.toggleWorkModal();
            this.clearWork();
        }
    }

    onChangeSkill = (input) => {
        let ProfessionalSkill = { ...this.state.ProfessionalSkill }
        ProfessionalSkill.Values.Skill = input.target.value;
        this.setState({
            ProfessionalSkill
        })
    }

    onChangeSkillDescription = (input) => {
        let ProfessionalSkill = { ...this.state.ProfessionalSkill }
        ProfessionalSkill.Values.Description = input.target.value;
        this.setState({
            ProfessionalSkill
        })
    }

    clearProfessionalSkill = () => {
        this.setState({
            ProfessionalSkill: {
                _id: '',
                Values: {
                    Skill: '',
                    Description: '',
                },
                Errors: {
                    Skill: '',
                    Description: '',
                }
            }
        })
    }

    cancelProfessionalSkill = () => {
        this.toggleSkillModal();
        this.clearProfessionalSkill();
    }

    AddProfessionalSkill = async () => {
        let ProfessionalSkill = { ...this.state.ProfessionalSkill }
        ProfessionalSkill.Errors = { Skill: '', Description: '' }
        if (ProfessionalSkill.Values.Skill === '' || ProfessionalSkill.Values.Description === '') {

            if (ProfessionalSkill.Values.Skill === '') {
                ProfessionalSkill.Errors.Skill = 'Required'
            }
            if (ProfessionalSkill.Values.Description === '') {
                ProfessionalSkill.Errors.Description = 'Required'
            }

            this.setState({
                ProfessionalSkill
            })

        } else {
            if (ProfessionalSkill._id === '') {
                //insert
                axios.post(url + 'skill/insert', { ...ProfessionalSkill.Values }).then(async () => {
                    await this.populateSkillList();
                })
            } else {
                //update
                axios.post(url + 'skill/update/' + ProfessionalSkill._id, { ...ProfessionalSkill.Values }).then(async () => {
                    await this.populateSkillList();
                })
            }
            this.toggleSkillModal();
            this.clearProfessionalSkill();
        }
    }

    onChangeEducationStartDate = (input) => {
        let Education = { ...this.state.Education }
        Education.Values.StartDate = input._d;
        this.setState({
            Education
        })
    }

    onChangeEducationEndDate = (input) => {
        let Education = { ...this.state.Education }
        Education.Values.EndDate = input._d;
        this.setState({
            Education
        })
    }

    onChangeInstitution = (input) => {
        let Education = { ...this.state.Education }
        Education.Values.Institution = input.target.value;
        this.setState({
            Education
        })
    }

    onChangeDegree = (input) => {
        let Education = { ...this.state.Education }
        Education.Values.Degree = input.target.value;
        this.setState({
            Education
        })
    }

    onChangeCurrentlyStudying = async (input) => {
        let Education = { ...this.state.Education }
        Education.Values.CurrentlyStudying = await input.target.checked;
        Education.Values.EndDate = '';
        Education.Errors.EndDate = '';

        this.setState({
            Education
        })

        document.querySelector('#EducationEndDateG input').disabled = input.target.checked;
        document.querySelector('#EducationEndDateG .rdtPicker').hidden = input.target.checked;
    }

    cancelEducation = () => {
        this.clearEducation();
        this.toggleEducationModal();
    }

    clearEducation = () => {
        this.setState({
            Education: {
                _id: '',
                Values: {
                    StartDate: '',
                    EndDate: '',
                    Institution: '',
                    Degree: '',
                    CurrentlyStudying: false
                },
                Errors: {
                    StartDate: '',
                    EndDate: '',
                    Institution: '',
                    Degree: '',
                }
            }
        })
    }

    AddEducation = async () => {
        let Education = { ...this.state.Education }
        Education.Errors = { StartDate: '', EndDate: '', Institution: '', Degree: '' }
        if (Education.Values.StartDate === '' || (Education.Values.EndDate === '' && !Education.Values.CurrentlyStudying) || Education.Values.Institution === '' || Education.Values.Degree === '') {

            if (Education.Values.StartDate === '') {
                Education.Errors.StartDate = 'Required'
            }
            if (Education.Values.EndDate === '' && !Education.Values.CurrentlyStudying) {
                Education.Errors.EndDate = "Required (Or check 'I currently study here')"
            }
            if (Education.Values.Institution === '') {
                Education.Errors.Institution = 'Required'
            }
            if (Education.Values.Degree === '') {
                Education.Errors.Degree = 'Required'
            }

            this.setState({
                Education
            })

        } else if (Education.Values.StartDate > Education.Values.EndDate && (Education.Values.CurrentlyWorking === false)) {
            Education.Errors.EndDate = "End Date must succeed the Start Date"
            this.setState({
                Education
            })

        } else {
            if (Education._id === '') {
                //insert
                axios.post(url + 'education/insert', { ...Education.Values }).then(async () => {
                    await this.populateEducationList();
                })
            } else {
                //update
                axios.post(url + 'education/update/' + Education._id, { ...Education.Values }).then(async () => {
                    await this.populateEducationList();
                })
            }

            this.toggleEducationModal();
            this.clearEducation();
        }
    }

    populateWorkList = async () => {
        let WorkList = (await axios.get(url + 'work/view')).data
        this.setState({
            WorkList
        })
    }

    populateSkillList = async () => {
        let SkillList = (await axios.get(url + 'skill/view')).data
        this.setState({
            SkillList
        })
    }

    populateEducationList = async () => {
        let EducationList = (await axios.get(url + 'education/view')).data
        this.setState({
            EducationList
        })
    }

    editWork = async (work) => {

        let Work = this.state.Work
        Work._id = await work._id
        delete work._id
        Work.Values = await { ...work }

        this.setState({
            Work
        })

        this.toggleWorkModal();
    }

    editSkill = async (skill) => {
        let ProfessionalSkill = this.state.ProfessionalSkill
        ProfessionalSkill._id = await skill._id
        delete skill._id
        ProfessionalSkill.Values = await { ...skill }

        this.setState({
            ProfessionalSkill
        })

        this.toggleSkillModal();
    }

    editEducation = async (education) => {
        let Education = this.state.Education
        Education._id = await education._id
        delete education._id
        Education.Values = await { ...education }

        this.setState({
            Education
        })

        this.toggleEducationModal();
    }

    removeWork = async (id) => {
        await axios.delete(url + 'work/delete/' + id)
        this.populateWorkList();
    }

    removeSkill = async (id) => {
        await axios.delete(url + 'skill/delete/' + id)
        this.populateSkillList();
    }

    removeEducation = async (id) => {
        await axios.delete(url + 'education/delete/' + id)
        this.populateEducationList();
    }

    render() {
        const selected = { cursor: "pointer", borderRadius: "5px", backgroundColor: "#c4ecff85", padding: "12px 35px", color: "#0088e8" }
        const selectedValue = this.state.selectedValue;
        let display;



        if (selectedValue === 1) { //Basic & Contact
            display = (
                <div style={{ marginLeft: "20px", paddingTop: "5px", width: "70%" }}>
                    <div>
                        <div className="darkGray bold" style={{ fontSize: "18px", marginBottom: "0px" }}>
                            Basic Information
                            <Button className="close" outline onClick={this.editBasic} style={{ float: "right", fontSize: "14px", color: "#66615B" }}><i className="fa fa-pencil" /></Button>
                            <hr />
                        </div>
                        <div className="form-row" onClick={this.editBasic}>
                            <FormGroup className={(this.state.Errors.FirstName === '' ? '' : 'has-danger')} style={{ marginRight: "5px", width: "49%" }} id="FirstNameG">
                                <Label className="lightGray bolder" for="FirstName">First Name:</Label>
                                <Input
                                    type="text"
                                    id="FirstName"
                                    value={this.state.tempUser.FirstName}
                                    placeholder="Enter First Name"
                                    disabled={this.state.disableBasic}
                                    onChange={this.onChangeFirstName.bind(this)}
                                />
                                <Popover placement="left" isOpen={this.state.Errors.FirstName !== '' && !this.state.disableBasic} target="FirstNameG" className="popover-primary">
                                    <PopoverBody id="FirstNameP">
                                        {this.state.Errors.FirstName}
                                    </PopoverBody>
                                </Popover>
                            </FormGroup>
                            <FormGroup id="LastNameG" className={(this.state.Errors.LastName === '' ? '' : 'has-danger')} style={{ marginLeft: "5px", width: "49%" }}>
                                <Label className="lightGray bolder" for="LastName">Last Name:</Label>
                                <Input
                                    type="text"
                                    id="LastName"
                                    value={this.state.tempUser.LastName}
                                    placeholder="Enter Last Name"
                                    disabled={this.state.disableBasic}
                                    onChange={this.onChangeLastName.bind(this)}
                                />
                                <Popover placement="left" isOpen={this.state.Errors.LastName !== '' && !this.state.disableBasic} target="LastNameG" className="popover-primary">
                                    <PopoverBody id="LastNameP">
                                        {this.state.Errors.LastName}
                                    </PopoverBody>
                                </Popover>
                            </FormGroup>
                        </div>

                        <div className="form-row">
                            <FormGroup id="BirthdayG" className={(this.state.Errors.Birthday === '' ? '' : 'has-danger')} style={{ marginRight: "5px", width: "49%" }}>
                                <Label className="lightGray bolder" for="Birthday">Date of Birth:</Label>
                                <InputGroup id="dt">
                                    <Datetime disabled value={moment(this.state.tempUser.Birthday).format('LL')} dateFormat='MMMM D, YYYY' onChange={this.onChangeBirthday.bind(this)} id="Birthday" timeFormat={false} inputProps={{ placeholder: "Date of Birth" }} />
                                </InputGroup>
                                <Popover placement="left" isOpen={this.state.Errors.Birthday !== '' && !this.state.disableBasic} target="BirthdayG" className="popover-primary">
                                    <PopoverBody id="BirthdayP">
                                        {this.state.Errors.Birthday}
                                    </PopoverBody>
                                </Popover>
                            </FormGroup>

                            <FormGroup id="GenderG" className={(this.state.Errors.Gender === '' ? '' : 'has-danger')} style={{ marginLeft: "5px", width: "49%" }}>
                                <Label className="lightGray bolder" for="Gender">Gender:</Label>
                                <Input defaultValue={this.state.tempUser.Gender} onChange={this.onChangeGender.bind(this)} id="Gender" type="select" name="select" disabled={this.state.disableBasic}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </Input>
                            </FormGroup>
                        </div>

                        <div className="form-row">
                            <FormGroup id="CountryG" className={(this.state.Errors.Country === '' ? '' : 'has-danger')} style={{ marginRight: "5px", width: "49%" }}>
                                <Label className="lightGray bolder" for="Country">Country:</Label>
                                <Input defaultValue={this.state.tempUser.Country} onChange={this.onChangeCountry.bind(this)} id="Country" type="select" name="select" disabled={this.state.disableBasic}>
                                    {
                                        countries.map((e, i) => {
                                            if (i === 0)
                                                return <option value={e.name} key={i}>{e.name}</option>
                                            else
                                                return <option value={e.name} key={i}>{e.name}</option>
                                        })
                                    }
                                </Input>
                            </FormGroup>
                            <FormGroup id="CityG" className={(this.state.Errors.City === '' ? '' : 'has-danger')} style={{ marginLeft: "5px", width: "49%" }}>
                                <Label className="lightGray bolder" for="City">City:</Label>
                                <Input
                                    type="text"
                                    id="City"
                                    value={this.state.tempUser.City}
                                    placeholder="Enter City"
                                    disabled={this.state.disableBasic}
                                    onChange={this.onChangeCity.bind(this)}
                                />
                                <Popover placement="left" isOpen={this.state.Errors.City !== '' && !this.state.disableBasic} target="CityG" className="popover-primary">
                                    <PopoverBody id="CityP">
                                        {this.state.Errors.City}
                                    </PopoverBody>
                                </Popover>
                            </FormGroup>
                        </div>
                        <div style={{ overflow: "hidden" }} hidden={this.state.disableBasic} >
                            <Button onClick={this.saveBasic} color="info" style={{ width: "100px", marginLeft: "5px", float: "right" }}>Save</Button>
                            <Button onClick={this.cancelBasic} color="danger" style={{ width: "100px", marginRight: "5px", float: "right" }}>Cancel</Button>
                        </div>
                        <br />
                    </div>


                    <div>
                        <div className="darkGray bold" style={{ fontSize: "18px", marginBottom: "0px" }}>
                            Contact Information
                            <Button className="close" outline onClick={this.editContact} style={{ float: "right", fontSize: "14px", color: "#66615B" }}><i className="fa fa-pencil" /></Button>
                            <hr />
                        </div>
                        <div onClick={this.editContact} className="form-row">
                            <FormGroup className={(this.state.Errors.Email === '' ? '' : 'has-danger')} style={{ marginRight: "5px", width: "49%" }} id="EmailG">
                                <Label className="lightGray bolder" for="Email">Email Address:</Label>
                                <InputGroup>
                                    <Input
                                        type="text"
                                        id="Email"
                                        value={this.state.tempUser.Email}
                                        placeholder="Enter Email Address"
                                        onChange={this.onChangeEmail}
                                        disabled={this.state.disableContact}
                                    />

                                    <Popover placement="right" isOpen={this.state.Errors.Email !== ''} target={"EmailG" ? "EmailG" : ""} className="popover-primary">
                                        <PopoverBody id="EmailP">
                                            {this.state.Errors.Email}
                                        </PopoverBody>
                                    </Popover>
                                </InputGroup>
                            </FormGroup>

                            <FormGroup className={(this.state.Errors.Phone === '' ? '' : 'has-danger')} style={{ marginLeft: "5px", width: "49%" }} id="PhoneG">
                                <Label className="lightGray bolder" for="Phone">Phone Number:</Label>
                                <InputGroup>
                                    <Input
                                        type="text"
                                        id="Phone"
                                        value={this.state.tempUser.Phone}
                                        placeholder="Enter Phone Number"
                                        onChange={this.onChangePhone}
                                        disabled={this.state.disableContact}
                                    />
                                    <Popover placement="right" isOpen={this.state.Errors.Phone !== ''} target="PhoneG" className="popover-primary">
                                        <PopoverBody id="PhoneP">
                                            {this.state.Errors.Phone}
                                        </PopoverBody>
                                    </Popover>
                                </InputGroup>
                            </FormGroup>
                        </div>
                        <div style={{ overflow: "hidden" }} hidden={this.state.disableContact}>
                            <Button onClick={this.saveContact.bind(this)} color="info" style={{ width: "100px", marginLeft: "5px", float: "right" }}>Save</Button>
                            <Button onClick={this.cancelContact.bind(this)} color="danger" style={{ width: "100px", marginRight: "5px", float: "right" }}>Cancel</Button>
                        </div>
                    </div>
                </div>
            )
        } else if (selectedValue === 2) { //Work & Education
            display = (
                <>
                    <Work
                        workModalState={this.state.workModalState}
                        toggleWorkModal={this.toggleWorkModal} {...this.state.Work}
                        onChangeWorkStartDate={this.onChangeWorkStartDate}
                        onChangeWorkEndDate={this.onChangeWorkEndDate}
                        onChangeCompanyName={this.onChangeCompanyName}
                        onChangeDesignation={this.onChangeDesignation}
                        onChangeCurrentlyWorking={this.onChangeCurrentlyWorking}
                        AddWork={this.AddWork} cancelWork={this.cancelWork}
                    />

                    <Skill
                        skillModalState={this.state.skillModalState}
                        toggleSkillModal={this.toggleSkillModal} {...this.state.ProfessionalSkill}
                        onChangeSkill={this.onChangeSkill}
                        onChangeSkillDescription={this.onChangeSkillDescription}
                        AddProfessionalSkill={this.AddProfessionalSkill}
                        cancelProfessionalSkill={this.cancelProfessionalSkill}
                    />
                    <Education
                        educationModalState={this.state.educationModalState}
                        toggleEducationModal={this.toggleEducationModal} {...this.state.Education}
                        onChangeEducationStartDate={this.onChangeEducationStartDate}
                        onChangeEducationEndDate={this.onChangeEducationEndDate}
                        onChangeInstitution={this.onChangeInstitution}
                        onChangeDegree={this.onChangeDegree}
                        onChangeCurrentlyStudying={this.onChangeCurrentlyStudying}
                        AddEducation={this.AddEducation}
                        cancelEducation={this.cancelEducation}
                    />

                    <div style={{ marginLeft: "20px", paddingTop: "5px", width: "70%" }}>
                        <div>
                            <div className="darkGray bold" style={{ fontSize: "18px", marginBottom: "0px" }}>
                                Work
                                <hr />
                            </div>
                            <div>
                                <Button onClick={this.toggleWorkModal.bind(this)} style={{ width: "155px" }} color="info"><i className="fa fa-plus" /><b> Add Work</b></Button>
                            </div>
                            <br />
                            {this.state.WorkList.map((e, i) => {
                                return (
                                    <span key={i}>
                                        <Button className="close" outline onClick={() => this.removeWork(e._id)} style={{ marginRight: "5px", float: "right", fontSize: "14px", color: "#66615B" }}><i className="fa fa-times" /></Button>
                                        <Button className="close" outline onClick={() => this.editWork(e)} style={{ marginRight: "5px", float: "right", fontSize: "14px", color: "#66615B" }}><i className="fa fa-pencil" /></Button>
                                        <p className="bolder">{(e.CurrentlyWorking ? "" : "Former ") + `${e.Designation} at ${e.CompanyName} (From ${moment(e.StartDate).format('YYYY')}` + (e.CurrentlyWorking ? ")" : ` to ${moment(e.EndDate).format('YYYY')})`)}</p>
                                    </span>
                                )
                            })}
                            <br />
                        </div>
                        <div>
                            <div className="darkGray bold" style={{ fontSize: "18px", marginBottom: "0px" }}>
                                Professional Skills
                                <hr />
                            </div>
                            <div>
                                <Button onClick={this.toggleSkillModal.bind(this)} style={{ width: "155px" }} color="info"><i className="fa fa-plus" /><b> Add Skill</b></Button>
                            </div>
                            <br />
                            {this.state.SkillList.map((e, i) => {
                                return (
                                    <span key={i}>
                                        <Button className="close" outline onClick={() => this.removeSkill(e._id)} style={{ marginRight: "5px", float: "right", fontSize: "14px", color: "#66615B" }}><i className="fa fa-times" /></Button>
                                        <Button className="close" outline onClick={() => this.editSkill(e)} style={{ marginRight: "5px", float: "right", fontSize: "14px", color: "#66615B" }}><i className="fa fa-pencil" /></Button>
                                        <p className="bolder">{`${e.Skill} (${e.Description})`}</p>
                                    </span>
                                )
                            })}
                            <br />
                        </div>
                        <div>
                            <div className="darkGray bold" style={{ fontSize: "18px", marginBottom: "0px" }}>
                                College
                                <hr />
                            </div>
                            <div>
                                <Button onClick={this.toggleEducationModal.bind(this)} style={{ width: "155px" }} color="info"><i className="fa fa-plus" /><b> Add College</b></Button>
                            </div>
                            <br />
                            {this.state.EducationList.map((e, i) => {
                                return (
                                    <span key={i}>
                                        <Button className="close" outline onClick={() => this.removeEducation(e._id)} style={{ marginRight: "5px", float: "right", fontSize: "14px", color: "#66615B" }}><i className="fa fa-times" /></Button>
                                        <Button className="close" outline onClick={() => this.editEducation(e)} style={{ marginRight: "5px", float: "right", fontSize: "14px", color: "#66615B" }}><i className="fa fa-pencil" /></Button>
                                        <p className="bolder">{(e.CurrentlyStudying ? "Studying " : "Studied ") + `${e.Degree} at ${e.Institution} (From ${moment(e.StartDate).format('YYYY')}` + (e.CurrentlyStudying ? ")" : ` to ${moment(e.EndDate).format('YYYY')})`)}</p>
                                    </span>
                                )
                            })}
                            <br />
                        </div>
                    </div>
                </>
            )
        } else if (selectedValue === 3) { //Account & Password
            display = (
                <div style={{ marginLeft: "20px", paddingTop: "5px", width: "70%" }}>
                    <div>
                        <div className="darkGray bold" style={{ fontSize: "18px", marginBottom: "0px" }}>
                            Account Details
                            <Button className="close" outline style={{ float: "right", fontSize: "14px", color: "#66615B" }} onClick={this.editAccount}><i className="fa fa-pencil" /></Button>
                            <hr />
                        </div>
                        <div className="form-row" onClick={this.editAccount}>
                            <FormGroup style={{ marginRight: "5px", width: "49%" }}>
                                <Label className="lightGray bolder" for="Type">Account Type</Label>
                                <Input
                                    type="select"
                                    id="Type"
                                    defaultValue={this.state.tempUser.Role}
                                    onChange={this.onChangeRole.bind(this)}
                                    disabled={this.state.disableAccount}
                                >
                                    <option value="Artist">Artist</option>
                                    <option value="Client">Client</option>
                                </Input>
                            </FormGroup>
                            <FormGroup style={{ marginLeft: "5px", width: "49%" }}>
                                <Label className="lightGray bolder" for="Title">Title:</Label>
                                <Input
                                    type="text"
                                    id="Title"
                                    value={this.state.tempUser.Title}
                                    placeholder="Enter Title (e.g. Digital Artsist)"
                                    onChange={this.onChangeTitle.bind(this)}
                                    disabled={this.state.disableAccount}
                                />
                            </FormGroup>
                        </div>
                        <div style={{ overflow: "hidden" }} hidden={this.state.disableAccount}>
                            <Button onClick={this.saveAccount} color="info" style={{ width: "100px", marginLeft: "5px", float: "right" }}>Save</Button>
                            <Button onClick={this.cancelAccount} color="danger" style={{ width: "100px", marginRight: "5px", float: "right" }}>Cancel</Button>
                        </div>
                    </div>

                    <div hidden={!this.state.disablePassword}>
                        <hr />
                        <Button color="info" onClick={this.editPassword}>Change Password</Button>
                    </div>

                    <div hidden={this.state.disablePassword}>
                        <div className="darkGray bold" style={{ fontSize: "18px", marginBottom: "0px" }}>
                            Change Password
                            <Button className="close" outline style={{ float: "right", fontSize: "14px", color: "#66615B" }}><i className="fa fa-pencil" /></Button>
                            <hr />
                        </div>
                        <div className="form-row">
                            <FormGroup className={(this.state.Errors.Password === '' ? '' : 'has-danger')} style={{ marginRight: "5px", width: "49%" }} id="PasswordG">
                                <Label className="lightGray bolder" for="Password">Password:</Label>
                                <Input
                                    type="password"
                                    id="Password"
                                    placeholder="Enter Password"
                                    value={this.state.tempUser.Password}
                                    onChange={this.onChangePassword.bind(this)}
                                />
                                <Popover placement="left" isOpen={this.state.Errors.Password !== '' && !this.state.disablePassword} target="PasswordG" className="popover-primary">
                                    <PopoverBody id="PasswordP">
                                        {this.state.Errors.Password}
                                    </PopoverBody>
                                </Popover>
                            </FormGroup>
                        </div>
                        <div className="form-row">
                            <FormGroup className={(this.state.Errors.NewPassword === '' ? '' : 'has-danger')} style={{ marginRight: "5px", width: "49%" }} id="NewPasswordG">
                                <Label className="lightGray bolder" for="NewPassword">New Password:</Label>
                                <Input
                                    type="password"
                                    id="NewPassword"
                                    placeholder="Enter New Password"
                                    value={this.state.tempUser.NewPassword}
                                    onChange={this.onChangeNewPassword.bind(this)}
                                />
                                <Popover placement="left" isOpen={this.state.Errors.NewPassword !== '' && !this.state.disablePassword} target="NewPasswordG" className="popover-primary">
                                    <PopoverBody id="NewPasswordP">
                                        {this.state.Errors.NewPassword}
                                    </PopoverBody>
                                </Popover>
                            </FormGroup>
                            <FormGroup className={(this.state.Errors.ConfirmPassword === '' ? '' : 'has-danger')} style={{ marginLeft: "5px", width: "49%" }} id="ConfirmPasswordG">
                                <Label className="lightGray bolder" for="ConfirmPassword">Confirm Password:</Label>
                                <Input
                                    type="password"
                                    id="ConfirmPassword"
                                    placeholder="Enter Confirm Password"
                                    value={this.state.tempUser.ConfirmPassword}
                                    onChange={this.onChangeConfirmPassword.bind(this)}
                                />
                                <Popover placement="right" isOpen={this.state.Errors.ConfirmPassword !== '' && !this.state.disablePassword} target="ConfirmPasswordG" className="popover-primary">
                                    <PopoverBody id="ConfirmPasswordP">
                                        {this.state.Errors.ConfirmPassword}
                                    </PopoverBody>
                                </Popover>
                            </FormGroup>
                        </div>
                        <div style={{ overflow: "hidden" }}>
                            <Button onClick={this.savePassword} color="info" style={{ width: "100px", marginLeft: "5px", float: "right" }}>Save</Button>
                            <Button onClick={this.cancelPassword} color="danger" style={{ width: "100px", marginRight: "5px", float: "right" }}>Cancel</Button>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div style={{ margin: "20px", marginTop: "0px", padding: "2px" }}>
                <div style={{ backgroundColor: "white", borderRadius: "10px", boxShadow: "0px 0px 20px -4px gray", padding: "20px", display: "flex" }}>
                    <div style={{ marginRight: "20px" }}>
                        <div className="bolder" onClick={this.setSelectedValue1} style={(this.state.selectedValue === 1 ? selected : { cursor: "pointer", padding: "12px 35px", color: "#0088e8" })}>Basic and Contact Info</div>
                        <div className="bolder" onClick={this.setSelectedValue2} style={(this.state.selectedValue === 2 ? selected : { cursor: "pointer", padding: "12px 35px", color: "#0088e8" })}>Work and Education</div>
                        <div className="bolder" onClick={this.setSelectedValue3} style={(this.state.selectedValue === 3 ? selected : { cursor: "pointer", padding: "12px 35px", color: "#0088e8" })}>Account and Password</div>
                    </div>
                    {display}
                </div>
            </div>
        )
    }
}

export default AboutProfile;