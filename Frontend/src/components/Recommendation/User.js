import avatar from '../../assets/img/default-avatar.png';
import { Link } from 'react-router-dom';

const User = (props) => {
    return (
        <div className="alignCenter" style={{ width: '20%' }}>
            
            <img alt="avatar" className="avatar-lg"
                src={props.DP ? `data:image/png;base64,${Buffer.from(props.DP).toString('base64')}` : avatar} />
            
            <p className="bold darkGray mgTop5 mgBottom0">{props.FirstName} {props.LastName}</p>
            <p className="bolder lightGray fs12 mg0">{props.Title ? props.Title : props.Role}</p>
            
            <p>
                <i className="fa fa-star fa-xs" style={{ color: "#ffcd01" }} />
                <i className="fa fa-star fa-xs" style={{ color: "#ffcd01" }} />
            </p>
            
            <Link to={`/Profile/${props._id}/View`}>
                <i className="fa fa-arrow-circle-right fa-lg" />
            </Link>
        </div>
    )
}

export default User