import React from 'react'
import avatar from '../../assets/img/default-avatar.png';
import imageVideo from '../../assets/img/icons/image.png';
import friend from '../../assets/img/icons/friend.png';
import feeling from '../../assets/img/icons/feeling.png';
import { Input, Button } from 'reactstrap';

const CreatePost = (props) => {
    return (
        <div className="whiteCard mgBottom20" style={{ padding: "20px 0px" }}>
            <h5 className="bold darkGray pRight20 pLeft20">Create Post</h5>
            <hr className="mgTop0" />
            <div className="pRight10 pLeft10">
                <div className="flex centerAlignItems">
                    <div>
                        <img alt="avatar" className="avatar-md mgSides10" src={props.user.DP !== undefined ? `data:image/png;base64,${Buffer.from(props.user.DP).toString('base64')}` : avatar} />
                    </div>
                    <div className="maxWidth">
                        <Input onChange={props.onChangePostText.bind(this)} value={props.Text} style={{ border: "none", fontSize: "14px", padding: "6px 12px", width: "100%" }} placeholder="Write something here..." />
                    </div>
                </div>
                <hr />
                <div className="flex maxWidth">
                    <div className="blueBack" style={{ padding: "10px", margin: "0px 5px" }}>
                        <a href="#" className="bolder blue"><img alt="Media" src={imageVideo} /> Photo/Video</a>
                    </div>
                    <div className="blueBack" style={{ padding: "10px", margin: "0px 5px" }}>
                        <a href="#" className="bolder blue"><img alt="Tag Friend" src={friend} /> Tag Friend</a>
                    </div>
                    <div className="blueBack" style={{ padding: "10px", margin: "0px 5px" }}>
                        <a href="#" className="bolder blue"><img alt="Feeling/Activity" src={feeling} /> Feeling/Activity</a>
                    </div>
                    <Button onClick={props.onPost} hidden={props.Text === ''} style={{ margin: "0px 5px", outerHeight: '20px', width: '133.9px' }} color="info">Post</Button>
                </div>
            </div>
        </div>
    )
}

export default CreatePost;