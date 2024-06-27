import React from 'react';
import avatar from '../../assets/img/default-avatar.png';
import moment from 'moment';
import { Link } from 'react-router-dom';

const GeneralNotification = (props) => {

    const display = (
        props.generalNotification.map((e, i) => {
            let notificationText = ''
            switch (e.Type) {
                case "BF": notificationText = 'Finished your booking.'; break;
                case "BR": notificationText = 'Reviewed your booking.'; break;
                case "BP": notificationText = 'Finished Payment for your booking.'; break;
                case "PL": notificationText = 'Liked Your Post'; break;
                case "PC": notificationText = 'Commented on your Post'; break;
                default: break;
            }

            return (
                <div className="Notification" key={Math.random() + i}>
                    <div className="mgRight10 mg5">
                        <img alt="avatar" className="avatar-small" src={e.UserData.DP !== undefined ?
                            `data:image/png;base64,${Buffer.from(e.UserData.DP).toString('base64')}` : avatar} />
                    </div>
                    <div>
                        <p className="bolder lightGray"><span className="bold darkGray">{e.UserData.FirstName} {e.UserData.LastName}</span> {notificationText}</p>
                        <p className={"fs12 mg0 " + (e.Seen ? "bolder lightGray" : 'bold darkGray')}>{moment(e.createdAt).fromNow()}</p>
                    </div>
                </div>
            )
        })
    )


    return (
        <div style={{ width: "300px", backgroundColor: '#fafafb', borderRadius: "10px", padding: "5px" }}>

            <h5 className="darkGray bold mg10">Notifications</h5>
            {display}
            <div>
                <Link to="/"><p className="darkGray bold alignCenter mg5">More</p></Link>
            </div>
        </div>
    )
}

export default GeneralNotification;