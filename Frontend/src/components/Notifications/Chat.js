import React from 'react';
import avatar from '../../assets/img/default-avatar.png';
import moment from 'moment';

const ChatNotification = (props) => {

    let display;

    if (props.chats.length > 0) {

        display = props.chats.map(e =>
        (
            <div className="Notification" onClick={props.startConversation.bind(this, e.UserData, e._id, e.LastMessageSender)}>
                <div className="mgRight10 mg5">
                    <img alt="avatar" className="avatar-small" src={e.UserData.DP !== undefined ?
                        `data:image/png;base64,${Buffer.from(e.UserData.DP).toString('base64')}` : avatar} />
                </div>
                <div>
                    <p className="bold darkGray">{e.UserData.FirstName} {e.UserData.LastName}</p>
                    <p className={"lightGray " + (props.userId.toString() !== e.LastMessageSender.toString() ? (!e.LastMessageSeen ? 'bold' : "bolder") : "bolder")} >{e.LastMessage} <span className="fs12"> · {moment(e.updatedAt).fromNow()} </span></p>
                </div>
            </div>
        ));

    } else {
        display = (
            <div style={{padding:'10px', paddingTop:'0px'}}>
                <p className="lightGray bolder mg0">No Messages</p>
            </div>
        )
    }

    return (
        <div style={{ width: "300px", backgroundColor: '#fafafb', borderRadius: "10px", padding: "5px" }}>

            <h5 className="bold mg10 darkGray">Messages</h5>
            {/* <div className="mgLeft10 bold">Recent</div> */}
            {display}
        </div>
    )
}

export default ChatNotification;