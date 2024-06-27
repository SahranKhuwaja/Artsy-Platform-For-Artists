import React from "react";
import axios from "axios";
import { withRouter } from 'react-router'
import avatar from '../../assets/img/default-avatar.png';
import { Badge } from 'reactstrap';

import {
  UncontrolledCollapse,
  Input,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import url from "../../assets/data/url";

// core components

axios.defaults.withCredentials = true;

class ProfileNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bodyClick: false,
      search: '',
      suggestions: [],
    }
  }


  getSearchData = async (query) => {

    let urlx = `search?q=${query}&l=5`;
    const request = await axios.get(url + urlx);

    if (request.data.users) {
      this.setState({
        search: query,
        suggestions: request.data.users,
      })
    }
  }

  setBodyClick = (value) => {
    this.setState({
      bodyClick: value
    })
  }

  onSearchChange = (input) => {
    if (input.target.value !== '')
      this.getSearchData(input.target.value)
    else
      this.setState({
        search: input.target.value,
        suggestions: []
      })
  }

  onSearchClick = async () => {
    if (this.state.search !== '') {
      this.setState({
        suggestions: []
      })
      this.props.history.push('/Search?q=' + this.state.search)
    }
  }

  render() {
    const count = this.props.requestsCount;
    const unReadMessages = this.props.unReadMessagesCount;
    const notificationCount = this.props.notificationCount;

    return (
      <>
        {this.state.bodyClick ? (
          <div id="bodyClick" onClick={() => { document.documentElement.classList.toggle("nav-open"); this.setBodyClick(false); }} />
        ) : null}

        <Navbar color="default" expand="lg" style={{ height: "75px", backgroundColor: "#0b1011", position: 'fixed', width: '100%' }}>

          <div className="navbar-translate">
            <NavbarBrand style={{ fontSize: "25px", marginLeft: "20px", color: "white", cursor:'default' }} data-placement="bottom" href="/Profile/About" onClick={e => e.preventDefault()}>
              <i className="fa fa-paint-brush fa-sm" /> ARTSY
              </NavbarBrand>

            <NavbarBrand style={{ fontSize: "25px", marginLeft: "50px", color: "white", cursor:'pointer' }} data-placement="bottom" onClick={this.props.toggleSidebar}>
              <i className="fa fa-bars fa-sm" />
            </NavbarBrand>

            <button className="navbar-toggler" id="example-navbar-info" type="button" onClick={() => { document.documentElement.classList.toggle("nav-open"); this.setBodyClick(true); }}>
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>

          <UncontrolledCollapse navbar toggler="#example-navbar-info">

            <Nav navbar>
              <NavItem style={{ marginLeft: "20px" }}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText onClick={this.onSearchClick} style={{ borderRadius: "20px 0px 0px 20px" }}><i className="fa fa-search"></i></InputGroupText>
                  </InputGroupAddon>
                  <Input onChange={this.onSearchChange.bind(this)} type="text" placeholder="Search" style={{ width: '300px', textAlign: "left", borderRadius: "0px 20px 20px 0px" }} />
                </InputGroup>
                <div style={{ position: "absolute", marginLeft: "38px", backgroundColor: "#ffffff", borderRadius: "0px 0px 10px 10px", width: "285px" }}>
                  {this.state.suggestions.map((e, i) => {
                    if (this.state.suggestions.length - 1 === i) {
                      return (
                        <div onClick={() => this.props.history.push(`/Profile/${e._id}/View`)} className="searchItem" key={i} style={{ padding: "10px", borderRadius: "0px 0px 10px 10px" }}>{e.FirstName} {e.LastName}</div>
                      )
                    }
                    else {
                      return (
                        <div onClick={() => this.props.history.push(`/Profile/${e._id}/View`)} className="searchItem" key={i} style={{ padding: "10px" }}>{e.FirstName} {e.LastName}</div>
                      )
                    }
                  })}
                </div>
              </NavItem>
            </Nav>

            <Nav className="ml-auto" navbar>

              <NavItem>
                <NavLink href="/Profile">
                  <img className="" alt="avatar" style={{ width: "35px", borderRadius: "100%" }}
                    src={this.props.user.DP ? `data:image/png;base64,${Buffer.from(this.props.user.DP).toString('base64')}` : avatar} />
                  <p style={{ marginLeft: '3px', fontSize: "16px", textTransform: "capitalize", color: "white" }}> {this.props.user.FirstName} {this.props.user.LastName} </p>
                </NavLink>
              </NavItem>

              <NavItem style={{ marginTop: '8px' }}>
                <NavLink onClick={this.props.setNotificationRequest}>
                  <i className="fa fa-envelope" style={{ color: "white" }} />
                  {count!==0 && <Badge color="danger" style={{borderRadius:'100%'}}>{count}</Badge>}
                </NavLink>
              </NavItem>

              <NavItem style={{ marginTop: '8px' }}>
                <NavLink onClick={this.props.setNotificationChat}>
                  <i className="fa fa-comment" style={{ color: "white" }} />
                  {unReadMessages!==0 && <Badge color="danger" style={{borderRadius:'100%'}}>{unReadMessages}</Badge>}
                </NavLink>
              </NavItem>

              <NavItem style={{ marginTop: '8px' }}>
                <NavLink onClick={this.props.setNotificationGeneral}>
                  <i className="fa fa-bell" style={{ color: "white" }} />
                  {notificationCount!==0 && <Badge color="danger" style={{borderRadius:'100%'}}>{notificationCount}</Badge>}
                </NavLink>
              </NavItem>

              <NavItem style={{ marginTop: "5px" }}>
                <NavLink onClick={e => e.preventDefault()}>
                  <i className="fa fa-caret-down" style={{ color: "white", fontSize: "25px" }} />
                </NavLink>
              </NavItem>

            </Nav>
          </UncontrolledCollapse>

        </Navbar>
      </>
    );
  }

}

export default withRouter(ProfileNavbar);