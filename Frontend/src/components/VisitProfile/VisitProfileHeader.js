import React from "react";
import {
    Button,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown
} from "reactstrap";
import cover from '../../assets/img/3.jpg';
import avatar from '../../assets/img/default-avatar.png';

const VisitProfileHeader = (props) => {

    const selected = { backgroundColor: "#6494ff", color: "white", padding: "15px 20px", borderRadius: "5px" }
    const page = props.page;

    let stars = [];
    for (var i = 0; i < props.AvgRating; i++)
        stars.push(<i key={"star-" + i} className="fa fa-star" style={{ color: "#ffcd01", fontSize: "17px" }} />)

    return (
        <div style={{ margin: "20px", marginBottom: "0px", padding: "2px" }}>
            <div style={{ backgroundColor: "white", borderRadius: "10px", boxShadow: "0px 0px 20px -4px gray" }}>
                <img alt="cover" src={cover} className="cover" />

                <div className="row" style={{ marginLeft: "210px", height: "55px" }}>
                    <div className="col-md-4">
                        <h3 className="darkGray bold" style={{ marginTop: "7px" }}>{props.user.FirstName} {props.user.LastName}</h3>
                        <div className="flex centerAlignItems">
                            <p className="lightGray bolder pRight5">{props.user.Title}</p>
                            <p>{stars}</p>
                        </div>
                    </div>

                    <div className="col-md-3" style={{ display: "flex" }}>
                        <div style={{ margin: "0px 10px" }}>
                            <h5 className="darkGray bolder" style={{ marginTop: "7px", marginBottom: "0px" }}>Posts</h5>
                            <p className="lightGray bolder" style={{ fontSize: "17px", textAlign: "center" }}>60</p>
                        </div>
                        <div style={{ margin: "0px 10px" }}>
                            <h5 className="darkGray bolder" style={{ marginTop: "7px", marginBottom: "0px" }}>Reviews</h5>
                            <p className="lightGray bolder" style={{ fontSize: "17px", textAlign: "center" }}>90</p>
                        </div>
                        <div style={{ margin: "0px 10px" }}>
                            <h5 className="darkGray bolder" style={{ marginTop: "7px", marginBottom: "0px" }}>Bookings</h5>
                            <p className="lightGray bolder" style={{ fontSize: "17px", textAlign: "center" }}>40</p>
                        </div>
                    </div>

                    <div className="col">
                        <div className="flex" style={{ margin: "0px 10px", paddingTop: "15px", float: "right", marginRight: "15px" }}>

                            <Button color="info" type="button" onClick={props.startConversation.bind(this, props.user, undefined, undefined)}>
                                <i style={{ fontSize: "16px" }} className="fa fa-comment" /> Message
                            </Button>
                            {props.user.Role === "Artist" ?
                                <UncontrolledDropdown className="mgLeft5">
                                    <DropdownToggle aria-haspopup={true} className="dropdown-toggle-split" color="info" data-toggle="dropdown" type="button">
                                        <i style={{ fontSize: "16px" }} className="fa fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu style={{ marginLeft: '-120px' }}>
                                        <DropdownItem onClick={props.toggleRequestModal}>
                                            Request Booking
                                    </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                : undefined
                            }
                        </div>
                    </div>

                </div>
                <div style={{ cursor: 'pointer' }} onClick={props.triggerUpload}>
                    <img className="avatar" src={props.user.DP ? `data:image/png;base64,${Buffer.from(props.user.DP).toString('base64')}` : avatar} alt="avatar" style={{ marginTop: "-215px", marginLeft: "15px" }} />
                </div>
            </div>

            <div className="row" style={{ cursor: "pointer", boxShadow: "0px 0px 20px -4px gray", textAlign: "center", borderRadius: "10px", margin: "15px 0px", backgroundColor: "white", height: "60px" }}>
                <div className="col" style={(page === 'timeline' ? selected : { padding: "15px 20px" })} onClick={props.setPageTimeline}>
                    <h5 style={{ fontWeight: "bold", verticalAlign: "center", marginBottom: "0px" }}>Timeline</h5>
                </div>
                <div className="col" style={(page === 'about' ? selected : { padding: "15px 20px" })} onClick={props.setPageAbout}>
                    <h5 style={{ fontWeight: "bold", verticalAlign: "center", marginBottom: "0px" }}>About</h5>
                </div>
                <div className="col" style={(page === 'reviews' ? selected : { padding: "15px 20px" })} onClick={props.setPageReviews}>
                    <h5 style={{ fontWeight: "bold", verticalAlign: "center", marginBottom: "0px" }}>Reviews</h5>
                </div>
                {(props.user.Role === "Artist" ?
                    <div className="col" style={(page === 'booklet' ? selected : { padding: "15px 20px" })} onClick={props.setPageBooklet}>
                        <h5 style={{ fontWeight: "bold", verticalAlign: "center", marginBottom: "0px" }}>Booklet</h5>
                    </div>
                    : null)}
            </div>

        </div>
    )
}

export default VisitProfileHeader;