import React from 'react';
import avatar from '../../assets/img/default-avatar.png';
import moment from 'moment';
import { Link } from 'react-router-dom';

const RequestNotification = (props) => {

    let display;

    if (props.bookingRequests.length > 0) {

        display = (
            props.bookingRequests.map(e => {
                if (props.userRole === 'Artist') {
                    return (
                        <Link to={"/Requests#" + e._id} key={e._id}>
                            <div className="Notification">
                                <div className="mgRight10 mg5">
                                    <img alt="avatar" className="avatar-small" src={e.ClientData.DP !== undefined ?
                                        `data:image/png;base64,${Buffer.from(e.ClientData.DP).toString('base64')}` : avatar} />
                                </div>
                                <div>
                                    <p className="bolder lightGray"><span className="bold darkGray">{e.ClientData.FirstName} {e.ClientData.LastName}</span> sent you a booking request.</p>
                                    <p className="fs12 bolder darkGray" style={{ fontWeight: 'bold' }}>{moment(e.createdAt).fromNow()}</p>
                                </div>
                            </div>
                        </Link>
                    )
                } else {
                    return (
                        <Link to={"/Requests#" + e._id} key={e._id}>
                            <div className="Notification">
                                <div className="mgRight10 mg5">
                                    <img alt="avatar" className="avatar-small" src={e.ArtistData.DP !== undefined ?
                                        `data:image/png;base64,${Buffer.from(e.ArtistData.DP).toString('base64')}` : avatar} />
                                </div>
                                <div>
                                    <p className="bolder lightGray"><span className="bold darkGray">{e.ArtistData.FirstName} {e.ArtistData.LastName}</span> {e.Status} your booking request.</p>
                                    <p className="fs12 bolder darkGray"
                                        style={!e.StatusChangeSeen ? { fontWeight: 'bold' } : null}
                                    >{moment(e.createdAt).fromNow()}</p>
                                </div>
                            </div>
                        </Link>
                    )
                }
            })
        )

    }

    else {
        display = (
            <div style={{ padding: '0px 10px' }}>
                <p className="lightGray bolder mg0">No Pending Requests</p>
            </div>
        )
    }

    return (
        <div style={{ width: "300px", backgroundColor: '#fafafb', borderRadius: "10px", padding: "5px" }}>

            <h5 className="bold mg10 darkGray">Booking Requests</h5>
            {display}
            <div>
                <Link to="/Requests"><p className="darkGray bold alignCenter mg5">More</p></Link>
            </div>
        </div>
    )
}

export default RequestNotification;