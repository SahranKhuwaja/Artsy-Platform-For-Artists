import React from 'react';
import moment from 'moment';

class VisitProfileAbout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: 1
        }
    }

    setSelectedValue1 = () => {
        this.setState({
            selectedValue: 1,
        })
    }


    setSelectedValue2 = () => {
        this.setState({
            selectedValue: 2,
        })
    }

    render() {
        const selected = { borderRadius: "5px", backgroundColor: "#c4ecff85", padding: "12px 35px", color: "#0088e8", fontWeight: "bolder" }
        const selectedValue = this.state.selectedValue;
        let display;

        if (selectedValue === 1) { //Basic & Contact
            display = (
                <div style={{ marginLeft: "20px", paddingTop: "5px", width: "70%" }}>
                    <div>
                        <div className="darkGray bold" style={{ fontSize: "18px", marginBottom: "0px" }}>
                            Basic Information
                            <hr />
                        </div>
                        <div>
                            <div className='row'>
                                <div className='col-sm'><p className="darkGray bolder">Birth Date</p></div>
                                <div className='col-sm'><p className="lightGray bolder">{moment(this.props.user.Birthday).format('Do MMMM')}</p></div>
                            </div>
                            <div className='row'>
                                <div className='col-sm'><p className="darkGray bolder">Birth Year</p></div>
                                <div className='col-sm'><p className="lightGray bolder">{moment(this.props.user.Birthday).format('YYYY')}</p></div>
                            </div>
                            <div className='row'>
                                <div className='col-sm'><p className="darkGray bolder">Gender</p></div>
                                <div className='col-sm'><p className="lightGray bolder">{this.props.user.Gender}</p></div>
                            </div>
                            <div className='row'>
                                <div className='col-sm'><p className="darkGray bolder">Current City</p></div>
                                <div className='col-sm'><p className="lightGray bolder">{this.props.user.City}, {this.props.user.Country}</p></div>
                            </div>
                        </div>
                        <br />
                    </div>

                    <div>
                        <div className="darkGray bold" style={{ fontSize: "18px", marginBottom: "0px" }}>
                            Contact Information
                            <hr />
                        </div>
                        <div>
                            <div className='row'>
                                <div className='col-sm'><p  className="darkGray bolder">Email</p></div>
                                <div className='col-sm'><p className="lightGray bolder">{this.props.user.Email}</p></div>
                            </div>
                            <div className='row'>
                                <div className='col-sm'><p  className="darkGray bolder">Phone</p></div>
                                <div className='col-sm'><p className="lightGray bolder">{this.props.user.Phone}</p></div>
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
            )
        } else if (selectedValue === 2) { //Work & Education
            display = (
                <div style={{ marginLeft: "20px", paddingTop: "5px", width: "70%" }}>
                    <div>
                        <div className="darkGray bold" style={{ fontSize: "18px", marginBottom: "0px" }}>
                            Work
                            <hr />
                        </div>
                        {this.props.work.map((e, i) => {
                            return (
                                <span key={i}>
                                    <p style={{ fontWeight: "bolder" }}>{(e.CurrentlyWorking ? "" : "Former ") + `${e.Designation} at ${e.CompanyName} (From ${moment(e.StartDate).format('YYYY')}` + (e.CurrentlyWorking ? ")" : ` to ${moment(e.EndDate).format('YYYY')})`)}</p>
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
                        {this.props.skill.map((e, i) => {
                            return (
                                <span key={i}>
                                    <p style={{ fontWeight: "bolder" }}>{`${e.Skill} (${e.Description})`}</p>
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
                        {this.props.education.map((e, i) => {
                            return (
                                <span key={i}>
                                    <p style={{ fontWeight: "bolder" }}>{(e.CurrentlyStudying ? "Studying " : "Studied ") + `${e.Degree} at ${e.Institution} (From ${moment(e.StartDate).format('YYYY')}` + (e.CurrentlyStudying ? ")" : ` to ${moment(e.EndDate).format('YYYY')})`)}</p>
                                </span>
                            )
                        })}
                        <br />
                    </div>
                </div>
            )
        }

        return (
            <div style={{ margin: "20px", marginTop: "0px", padding: "2px" }}>
                <div style={{ backgroundColor: "white", borderRadius: "10px", boxShadow: "0px 0px 20px -4px gray", padding: "20px", display: "flex" }}>
                    <div style={{ marginRight: "20px" }}>
                        <div onClick={this.setSelectedValue1} style={(this.state.selectedValue === 1 ? selected : { cursor: "pointer", padding: "12px 35px", color: "#0088e8", fontWeight: "bolder" })}>Basic and Contact Info</div>
                        <div onClick={this.setSelectedValue2} style={(this.state.selectedValue === 2 ? selected : { cursor: "pointer", padding: "12px 35px", color: "#0088e8", fontWeight: "bolder" })}>Work and Education</div>
                    </div>
                    {display}
                </div>
            </div>
        )
    }
}

export default VisitProfileAbout;