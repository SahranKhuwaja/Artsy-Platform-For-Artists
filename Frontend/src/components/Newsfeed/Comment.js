import avatar from '../../assets/img/default-avatar.png';
import moment from 'moment';

const Comment = (props) => {
    return (
        <div className="flex" style={{ paddingTop: "10px" }}>
            <div>
                <img alt="avatar" style={{ marginRight: '10px' }} className="avatar-x-sm"
                    src={props.UserData.DP !== undefined ? `data:image/png;base64,${Buffer.from(props.UserData.DP).toString('base64')}` : avatar}
                />
            </div>
            <div style={{ width: '100%' }}>
                <div style={{ overflow: "hidden" }}>
                    <p className="bold mg0 darkGray inline">{props.UserData.FirstName} {props.UserData.LastName}</p>
                    <p style={{ float: 'right', marginRight: '10px' }} className="lighGray bolder mg0 inline fs12">{moment(props.createdAt).fromNow()}</p>
                </div>
                <p className="bolder lightGray mg0">{props.Text}</p>
            </div>
        </div>
    )
}

export default Comment;