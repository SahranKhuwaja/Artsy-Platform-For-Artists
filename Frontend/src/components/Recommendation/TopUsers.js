import avatar from '../../assets/img/default-avatar.png';
import { Link } from 'react-router-dom';

const TopUsers = (props) => {
    return (
        <div className="flex" style={{ margin: '20px 10px' }}>
            {props.users.map((e, i) => (
                <div className="whiteCard alignCenter" style={{ margin: '0px 10px', width: '100%' }} key={Math.random() + i}>
                    <p className="bold darkGray">Trending</p>
                    <hr className="mgTop0 mgBottom10" />
                    <img alt="avatar" className="avatar-md mgBottom5"
                        src={e.UserData.DP ? `data:image/png;base64,${Buffer.from(e.UserData.DP).toString('base64')}` : avatar} />
                    <Link to={`/Profile/${e.UserData._id}/View`}>
                        <p className="bold darkGray mg0">{e.UserData.FirstName} {e.UserData.LastName}</p>
                    </Link>
                    <p className="bolder lightGray mg0">{e.UserData.Title ? e.UserData.Title : e.UserData.Role}</p>
                    <p className="mg0">
                        <i className="fa fa-star fa-xs" style={{ color: "#ffcd01" }} />
                        <i className="fa fa-star fa-xs" style={{ color: "#ffcd01" }} />
                    </p>
                </div>
            ))}
        </div>
    )
}

export default TopUsers;