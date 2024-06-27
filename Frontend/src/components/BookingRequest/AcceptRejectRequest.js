import avatar from '../../assets/img/default-avatar.png';
import moment from 'moment';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const AcceptRejectRequest = (props) => {
    return (
        <div>
            {props.userRole === 'Artist' ?
                <div className="flex">
                    <div>
                        <img style={{ margin: '0px 10px' }} className="avatar-small" alt="avatar"
                            src={props.request.ClientData.DP ? `data:image/png;base64,${Buffer.from(props.request.ClientData.DP)
                                .toString('base64')}` : avatar} />

                    </div>
                    <div style={{ width: '100%' }}>
                        <div style={{ overflow: "hidden" }}>
                            <Link to={`Profile/${props.request.Client}/View`}><p className="bold mg0 darkGray inline pointer">{props.request.ClientData.FirstName} {props.request.ClientData.LastName}</p></Link>
                            <p style={{ float: 'right', marginRight: '10px' }} className="lighGray bolder mg0 inline">{moment(props.request.createdAt).fromNow()}</p>
                        </div>
                        <div>
                            <p className="bolder lightGray">"{props.request.Description}"</p>
                            <p className="bolder darkGray inline">Venue: </p><p className="bolder lightGray inline">{props.request.Venue}</p><br />
                            <p className="bolder darkGray inline">Event Date: </p><p className="bolder lightGray inline">{moment(props.request.StartDate).format('LL')} to {moment(props.request.EndDate).format('LL')}</p><br />
                            <p className="bolder darkGray inline">Payment Amount: </p><p className="bolder lightGray inline">{props.request.PaymentAmount} {props.request.Currency}</p><br />
                        </div>
                        <div style={{ marginTop: "15px" }}>
                            <Button color="info" style={{ width: "100px", marginRight: "10px" }} onClick={props.requestResponse.bind(this, props.request._id, 'Accepted', props.index)}>Accept</Button>
                            <Button color="danger" style={{ width: "100px", marginRight: "10px" }} onClick={props.requestResponse.bind(this, props.request._id, 'Rejected', props.index)}>Reject</Button>
                        </div>
                    </div>
                </div>
                :
                <div className="flex">
                    <div>
                        <img style={{ margin: '0px 10px' }} className="avatar-small" alt="avatar"
                            src={props.request.ArtistData.DP ? `data:image/png;base64,${Buffer.from(props.request.ArtistData.DP)
                                .toString('base64')}` : avatar} />

                    </div>
                    <div style={{ width: '100%' }}>
                        <div style={{ overflow: "hidden" }}>
                            <Link to={`Profile/${props.request.Artist}/View`}><p className="bold mg0 darkGray inline pointer">{props.request.ArtistData.FirstName} {props.request.ArtistData.LastName}</p></Link>
                            <p style={{ float: 'right', marginRight: '10px' }} className="lighGray bolder mg0 inline">{moment(props.request.updatedAt).fromNow()}</p>
                        </div>
                        <div>
                            <p className="bolder lightGray">"{props.request.Description}"</p>
                            <p className="bolder darkGray inline">Venue: </p><p className="bolder lightGray inline">{props.request.Venue}</p><br />
                            <p className="bolder darkGray inline">Event Date: </p><p className="bolder lightGray inline">{moment(props.request.StartDate).format('LL')} to {moment(props.request.EndDate).format('LL')}</p><br />
                            <p className="bolder darkGray inline">Payment Amount: </p><p className="bolder lightGray inline">{props.request.PaymentAmount} {props.request.Currency}</p><br />
                            <p className="bolder darkGray inline">Status: </p><p className="bolder lightGray inline">{props.request.Status}</p><br />
                        </div>
                    </div>
                </div>

            }
        </div>
    )
}

export default AcceptRejectRequest;