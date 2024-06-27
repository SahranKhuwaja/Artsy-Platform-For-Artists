import avatar from '../../assets/img/default-avatar.png';
import ReactStars from "react-rating-stars-component";
import moment from 'moment';

const ReviewCard = (props) => {
    return (
        <div className="whiteCard mgLeft5 mgRight5" style={{ width: '100%' }}>
            <div className="flex centerAlignItems mgBottom5">
                <img alt="avatar" className="avatar-md mgRight5"
                    src={props.UserData.DP !== undefined ? `data:image/png;base64,${Buffer.from(props.UserData.DP).toString('base64')}` : avatar} />
                <div>
                    <h5 className="bold darkGray" style={{marginBottom:'-5px'}}>{props.UserData.FirstName} {props.UserData.LastName}</h5>
                    <div className="flex centerAlignItems">
                        <ReactStars value={props.Rating} edit={false} activeColor="#ffcd01" size={22} />
                        <p className="bolder lightGray mgLeft5 mgBottom0" >({props.Rating}/5)</p>
                    </div>
                </div>
            </div>
            <div>
                <p className="bolder darkGray">{props.Review}</p>
                <p className="bolder lightGray mg0">{moment(props.createdAt).fromNow()}</p>
            </div>

        </div>
    )
}

export default ReviewCard;