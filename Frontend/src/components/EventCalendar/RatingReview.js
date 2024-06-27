import { Modal, Input, Button } from "reactstrap"
import ReactStars from "react-rating-stars-component";
import avatar from '../../assets/img/default-avatar.png';
import moment from "moment";

const RatingReview = (props) => {
    let display;
    if (props.isReviewed) {
        //Display review
        display = (
            <>
                <div className="modal-header no-border-header">
                    <button aria-label="Close" className="close fRight" data-dismiss="modal" type="button" onClick={props.cancelReview}>
                        <span aria-hidden={true}>×</span>
                    </button>
                    <div className="flex">
                        <div>
                            {props.CurrentUser.Role === "Artist" ?
                                <img alt="avatar" style={{ margin: '0px 10px' }} className="avatar-small mg5"
                                    src={props.UserData.DP !== undefined ? `data:image/png;base64,${Buffer.from(props.UserData.DP).toString('base64')}` : avatar} />
                                :
                                <img alt="avatar" style={{ margin: '0px 10px' }} className="avatar-small mg5"
                                    src={props.CurrentUser.DP !== undefined ? `data:image/png;base64,${Buffer.from(props.CurrentUser.DP).toString('base64')}` : avatar} />
                            }
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <h5 className="bold mg0 darkGray inline">{props.CurrentUser.Role === "Artist" ? props.UserData.FirstName + " " + props.UserData.LastName : props.CurrentUser.FirstName + " " + props.CurrentUser.LastName}</h5><p className="lighGray bolder mg0 inline"> reviewed {props.CurrentUser.Role === "Artist" ? "your" : "this"} work</p>
                            <p className="lighGray bolder mg0">{moment(props.RatingReview.createdAt).fromNow()}</p>
                        </div>
                    </div>

                </div>
                <div className="modal-body" style={{ padding: '0px 25px' }}>
                    <span className="flex centerAlignItems">
                        <ReactStars
                            activeColor="#ffcd01"
                            edit={false} size={24}
                            value={props.RatingReview.Rating}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star" />}
                        />
                        <p className="lightGray bolder mg0"> (rated {props.RatingReview.Rating} stars)</p>
                    </span>
                    <p className="lightGray bolder mg0">{props.RatingReview.Review}</p>
                </div>

            </>
        )
    } else if (props.CurrentUser.Role === "Client") {
        //Take review
        const review = (
            <div className="modal-body alignCenter pTop0">
                <p className="lightGray bolder">How was your experience?</p>
                <Input onChange={props.onChangeReview.bind(this)}
                    value={props.RatingReview.Review}
                    maxLength='200' className="mgTop10" type="textarea"
                    placeholder="Write a review"
                    style={{ width: '100%', resize: 'none', height: '110px' }} />
                <br />
                <Button onClick={props.SaveReview} disabled={props.RatingReview.Review === ''} color="success" style={{ width: '150px' }} >Submit</Button>
            </div>
        )

        display = (
            <>
                <div className="modal-header no-border-header text-center pBottom0">
                    <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={props.cancelReview}>
                        <span aria-hidden={true}>×</span>
                    </button>
                    <br />
                    <h3 className="modal-title text-center darkGray bold">Rating & Review</h3>
                    <p className="lightGray bolder">How would you rate this work?</p>
                </div>
                <div className="modal-body pTop0 pBottom0 mAuto alignCenter" >
                    <ReactStars size={48}
                        onChange={props.onChangeRating}
                        activeColor="#ffcd01"
                        value={props.RatingReview.Rating}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                    />
                </div>
                {props.RatingReview.Rating !== '' ? review : undefined}

            </>
        )
    }

    return (
        <Modal isOpen={props.ReviewModal} className="modal-md">
            {display}
            <div className="modal-footer no-border-footer">
                <br />
            </div>
        </Modal>
    )
}

export default RatingReview;