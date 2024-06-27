import avatar from '../../assets/img/default-avatar.png';
import users from '../../assets/img/users.png';
import { Link } from 'react-router-dom';

const RecommendedUsers = (props) => {

    if (props.users.length === 0) {
        return (
            <div className="whiteCard mgLeft20 alignCenter">
                <img alt="Booklet is empty" src={users} style={{ height: "200px", margin: "20px" }} />
                <p className="darkGray bolder">You already know everyone in your circle!</p>
                <p className="darkGray bolder">Discover more people to get suggestions</p>
            </div>
        )
    }

    return (
        <div className="whiteCard mgLeft20">
            <p className="bold darkGray">People You May Like</p>
            <hr className="mgTop0 mgBottom10" />
            {props.users.map((e, i) => (

                <div className="flex centerAlignItems p5" key={Math.random() + i}>
                    <img alt="avatar" className="avatar-md"
                        src={e.DP ? `data:image/png;base64,${Buffer.from(e.DP).toString('base64')}` : avatar} />
                    <div className="mgLeft10">
                        <Link to={`/Profile/${e._id}/View`}>
                            <p className="bold darkGray mg0">{e.FirstName} {e.LastName}</p>
                        </Link>
                        <p className="bolder lightGray mg0">{e.Title}</p>
                        <p className="mg0">
                            <i className="fa fa-star fa-xs" style={{ color: "#ffcd01" }} />
                            <i className="fa fa-star fa-xs" style={{ color: "#ffcd01" }} />
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RecommendedUsers;