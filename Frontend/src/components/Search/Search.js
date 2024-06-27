import React from 'react';
import axios from 'axios';
import { isEqual } from 'lodash';
import avatar from '../../assets/img/default-avatar.png';
import countries from '../../assets/data/countries';
import { FormGroup, Label, Input } from 'reactstrap';
import url from '../../assets/data/url';
import { Link } from 'react-router-dom';

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sidebarCollapse: true,
            user: {},
            search: "",
            users: [],
            Role: '',
            Country: '',
            City: '',
            q: ''
        }
    }

    componentDidMount = () => {
        this.checkProfileStatus();
        //this.getSearchData();
        if (this.props.location.search) {
            const urlParams = new URLSearchParams(this.props.location.search);
            const query = urlParams.get('q');
            this.getSearchData(query);
        }
    }

    componentDidUpdate = (props) => {

        const urlParams = new URLSearchParams(this.props.location.search);
        const query = urlParams.get('q');

        if (!isEqual(query, this.state.q)) {
            this.getSearchData(query)
        }
    }

    getSearchData = async (query) => {

        //alert('h')
        if (query !== '') {
            let urlx = `search?q=${query}`
            if (this.state.Role !== '')
                urlx += `&r=${this.state.Role}`
            if (this.state.Country !== '')
                urlx += `&country=${this.state.Country}`
            if (this.state.City !== '')
                urlx += `&city=${this.state.City}`

            const request = await axios.get(url + urlx);
            // this.props.history.push({search:urlx});
           
            if (request.data.users) {
                this.setState({
                    users: request.data.users,
                    q: query
                })
            }
        }
    }

    checkProfileStatus = async () => {
        const login = await axios.get(`${url}user/profile/about`);
        if (login.data === false) {
            this.props.history.replace('/');
        } else {
            setTimeout(() => {
                this.setState({
                    loading: false,
                    user: login.data
                })
            }, 1000)
        }
        console.log(login.data);
    }

    toggleSidebar = () => {
        this.setState({
            sidebarCollapse: !this.state.sidebarCollapse
        })
    }

    onChangeCountry = async (input) => {
        this.setState({
            Country: await input.target.value
        })
        await this.getSearchData(this.state.q);
    }

    onChangeCity = async (input) => {
        this.setState({
            City: await input.target.value
        })
        await this.getSearchData(this.state.q);
    }

    onChangeRole = async (input) => {

        this.setState({
            Role: await input.target.value
        })
        await this.getSearchData(this.state.q);
    }

    render() {
        return (
            <div style={{ backgroundColor: "lightgray", height:"100%"}}>

                <div style={{ display: 'flex', paddingTop: '70px' }}>

                    {/* MAIN */}
                    <div className="row" style={{ margin: '20px', width: "100%" }}>

                        <div className="col-md-9">

                            {this.state.users.map((e, i) => {
                                return (
                                    <div className="row" key={Math.random() + i} style={{ backgroundColor: "white", borderRadius: "10px", boxShadow: "0px 0px 20px -4px gray", padding: "20px 10px", marginRight: "5px", marginBottom: "20px" }}>
                                        <div className="col-sm-1">
                                            <img src={e.DP ? `data:image/png;base64,${Buffer.from(e.DP).toString('base64')}` : avatar} alt="avatar" style={{ borderRadius: "100px", border: "2px solid rgb(102, 97, 91)", width: "80px" }} />
                                        </div>
                                        <div className="col-md-6" style={{ marginLeft: "30px" }}>
                                            <Link to={`/Profile/${e._id}/View`} style={{ color: "rgb(102,97,91)" }}>
                                                <h4 style={{ marginTop: "0px", fontWeight: "bold" }}>{e.FirstName + " " + e.LastName}</h4>
                                            </Link>

                                            <span>
                                                {e.Title + " "}
                                                <i className="fa fa-star" style={{ color: "#ffbc00" }} />
                                                <i className="fa fa-star" style={{ color: "#ffbc00" }} />
                                                <i className="fa fa-star" style={{ color: "#ffbc00" }} />
                                                <i className="fa fa-star" style={{ color: "#ffbc00" }} />
                                            </span>
                                            <br />
                                            {`From ${e.City}, ${e.Country}`}
                                        </div>
                                    </div>

                                )
                            })}

                        </div>

                        <div className="col" style={{ height:"345px", backgroundColor: "white", borderRadius: "10px", boxShadow: "0px 0px 20px -4px gray", padding: "20px", marginLeft: "5px" }}>
                            <p style={{ fontWeight: "bolder" }}>Showing results for '{this.state.q}'</p>
                            <hr />

                            <div style={{ margin: "0px 15px" }}>
                                {/* <p>Find People by</p> */}
                                <div>
                                    <FormGroup>
                                        <Label for="country">Country</Label>
                                        <Input onChange={this.onChangeCountry} id="country" type='select' value={this.state.Country}>
                                            <option value=''>All Countries</option>
                                            {countries.map((e, i) => {
                                                if (e.name === this.state.user.Country)
                                                    return <option key={Math.random() + i} defaultValue={e.name}>{e.name}</option>
                                                else
                                                    return <option key={Math.random() + i} value={e.name}>{e.name}</option>
                                            })}
                                        </Input>
                                    </FormGroup>
                                </div>
                                <div>
                                    <FormGroup>
                                        <Label for="city">City</Label>
                                        <Input placeholder="Filter by City" onChange={this.onChangeCity} id="city" type='text' value={this.state.City} />
                                    </FormGroup>
                                </div>
                                <div>
                                    <FormGroup>
                                        <Label for="role">Users</Label>
                                        <Input onChange={this.onChangeRole} id="role" type='select' value={this.state.Role}>
                                            <option value="">All Users</option>
                                            <option value="Artist">Artist</option>
                                            <option value="Client">Client</option>
                                        </Input>
                                    </FormGroup>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;