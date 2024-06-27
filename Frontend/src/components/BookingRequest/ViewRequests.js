import React from 'react';
import axios from 'axios';
import url from '../../assets/data/url'
import AcceptRejectRequest from './AcceptRejectRequest';
import socketioClient from 'socket.io-client';

let socket = null;
axios.defaults.withCredentials = true;

class ViewRequests extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            requests: []
        }
    }

    componentDidMount = () => {
        this.getRequests();
        socket = socketioClient(url);
    }

    getRequests = async () => {
        const request = await (await axios.get(`${url}bookingRequest/get`)).data;
        if (request.requests) {
            this.setState({
                requests: request.requests
            })
        }
    }

    requestResponse = async (_id, Status, Index) => {
        const requests = [...this.state.requests];
        requests.splice(Index, 1);
        socket.emit('requestResponse', { _id, Status });
        this.setState({
            requests
        })
        this.props.decrementRequestCount()
    }

    render() {
        return (
            <>
                <div style={{ backgroundColor: "lightgray", height: "100%" }}>
                    <div style={{ display: 'flex', paddingTop: '70px' }}>

                        <div className="row" style={{ margin: '20px', width: "100%" }}>
                            <div className="col-md-9 p0">
                                <div style={{ backgroundColor: "white", borderRadius: "10px", boxShadow: "0px 0px 20px -4px gray", marginRight: "20px", padding: "20px" }}>
                                    <p className="bold darkGray">Booking Requests {this.props.userRole === 'Artist' ? '(Pending)' : '(Responded)'}</p>
                                    {
                                        (this.state.requests.length > 0 ?
                                            this.state.requests.map((e, i) => {
                                                return (
                                                    <div key={Math.random() + i} id={e._id}>
                                                        <hr />
                                                        <AcceptRejectRequest request={e} index={i} requestResponse={this.requestResponse}
                                                            userRole={this.props.userRole} />
                                                    </div>
                                                )
                                            })
                                            :
                                            <div style={{ padding: "10px 0px" }}>
                                                <p className="lightGray bolder mg0" >No Pending Requests</p>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>

                            <div className="col p0">
                                <div style={{ backgroundColor: "white", borderRadius: "10px", boxShadow: "0px 0px 20px -4px gray", padding: "10px" }}>
                                    <p className="bold darkGray mg10">Upcomming</p>
                                    <hr className="mg0" />
                                    <div className="blueBack p10 mgTop5" >
                                        <p className="bolder lightGray mg0 inline">You have 4 Upcomming events. </p>
                                        <a href="#" className="bolder mg0 blue">View Details</a>
                                    </div>
                                </div>

                                <div style={{ backgroundColor: "white", borderRadius: "10px", boxShadow: "0px 0px 20px -4px gray", padding: "10px", marginTop: "20px" }}>
                                    <p className="bold darkGray mg10">History</p>
                                    <hr className="mg0" />
                                    <div className="greenBack p10 mgTop5" >
                                        <p className="bolder lightGray mg0 inline">You accepted a booking request by </p><p className="bolder mg0 darkGray inline pointer">Joey Parker</p>
                                    </div>
                                    <div className="redBack p10 mgTop5">
                                        <p className="bolder lightGray mg0 inline">You rejected a booking request by </p><p className="bolder mg0 darkGray inline pointer">Joey Parker</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default ViewRequests;