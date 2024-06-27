import React from "react";
import cover from '../../assets/img/3.jpg';
import avatar from '../../assets/img/default-avatar.png';
import avatarBack from '../../assets/img/avatar-back.jpg';

const Profile = (props) => {

    const selected = { backgroundColor: "#6494ff", color: "white", padding: "15px 20px", borderRadius: "5px" }
    const page = props.page;

    let hoverStyle = null;
    let imageStyle = null;
    if (props.hover) {
        imageStyle = {
            opacity: '0.6',

        }
        hoverStyle = {
            visibility: 'visible'
        }
    }

    let stars = [];
    for (var i = 0; i < props.AvgRating; i++)
        stars.push(<i className="fa fa-star" style={{ color: "#ffcd01", fontSize:"17px" }} />)
        
    return (
        <div style={{ margin: "20px", marginBottom: "0px", padding: "2px" }}>
            <div style={{ backgroundColor: "white", borderRadius: "10px", boxShadow: "0px 0px 20px -4px gray" }}>
                <img alt="cover" src={cover} className="cover" />

                <div className="row" style={{ marginLeft: "210px", height: "55px" }}>
                    <div className="col-md-5">
                        <h3 className="darkGray bold" style={{ marginTop: "7px" }}>{props.user.FirstName} {props.user.LastName}</h3>
                        <div className="flex centerAlignItems">
                            <p className="lightGray bolder pRight5">{props.user.Title}</p>
                            <p>{stars}</p>
                        </div>
                    </div>

                    <div className="col-md-5" style={{ display: "flex", marginLeft: "120px" }}>
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

                </div>
                <div style={{ cursor: 'pointer' }} onClick={props.triggerUpload}>
                    <img className="avatar" src={avatarBack} alt="avatar" style={{ marginTop: "-215px", marginLeft: "10px" }} />

                    <img className="avatar" src={props.user.DP ? `data:image/png;base64,${Buffer.from(props.user.DP).toString('base64')}` : avatar} alt="avatar" style={{ marginTop: "-215px", marginLeft: "-220px", transition: '.5s ease', backfaceVisibility: 'hidden', ...imageStyle }} onMouseOver={props.onHover} onMouseLeave={props.onHover} />

                    <i className="fa fa-camera" onMouseOver={props.onHover} onMouseLeave={props.onHover} style={{ fontSize: '80px', marginLeft: '-150px', marginTop: '-135px', position: 'absolute', color: '#fafafb', visibility: 'hidden', ...hoverStyle }} />

                    <input type="file" ref={(file) => props.upload(file)} style={{ visibility: 'hidden' }} name="Dp"
                        onChange={props.saveImage.bind(this)} />
                    <p style={{ color: 'red', marginLeft: '15px', fontWeight: 'bold', fontSize: '18px' }}>{props.imageError}</p>
                </div>
            </div>

            <div className="row" style={{ cursor: "pointer", boxShadow: "0px 0px 20px -4px gray", textAlign: "center", borderRadius: "10px", margin: "15px 0px", backgroundColor: "white", height: "60px" }}>
                <div className="col" style={(page === 'timeline' ? selected : { padding: "15px 20px" })} onClick={props.setPageTimeline}>
                    <h5 className="bold" style={{ verticalAlign: "center", marginBottom: "0px" }}>Timeline</h5>
                </div>
                <div className="col" style={(page === 'about' ? selected : { padding: "15px 20px" })} onClick={props.setPageAbout}>
                    <h5 className="bold" style={{ verticalAlign: "center", marginBottom: "0px" }}>About</h5>
                </div>
                <div className="col" style={(page === 'reviews' ? selected : { padding: "15px 20px" })} onClick={props.setPageReviews}>
                    <h5 className="bold" style={{ verticalAlign: "center", marginBottom: "0px" }}>Reviews</h5>
                </div>
                {(props.user.Role === "Artist" ?
                    <div className="col" style={(page === 'booklet' ? selected : { padding: "15px 20px" })} onClick={props.setPageBooklet}>
                        <h5 className="bold" style={{ verticalAlign: "center", marginBottom: "0px" }}>Booklet</h5>
                    </div>
                    : null)}
            </div>

        </div>
    )
}

export default Profile;