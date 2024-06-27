import React from 'react';
import like from '../../assets/img/icons/like.png';
import likeGray from '../../assets/img/icons/likeGray.png';
import avatar from '../../assets/img/default-avatar.png';
import moment from 'moment';
import Comment from './Comment';
import { Link } from 'react-router-dom';
import { Input, UncontrolledCarousel } from 'reactstrap';
import url from '../../assets/data/url';

const Post = (props) => {

    let ImageItems
    if (props.ChapterImages) {
        ImageItems = props.ChapterImages.map((e, i) => {
            return {
                src: `${url}artistBooklet/image/${e.ImageId}/${e.FileName}`,
                altImage: `Image ${i}`,
                caption: ''
            }
        })
    }

    return (
        <div style={{ backgroundColor: "white", borderRadius: "10px", boxShadow: "0px 0px 20px -4px gray", padding: "20px 10px 10px", marginBottom: "20px" }}>

            {/* Head */}
            <div className="flex centerAlignItems mgBottom10">
                <div>
                    <img alt="Post avatar" style={{ margin: '0px 10px' }} className="avatar-md mg5" src={props.UserData.DP !== undefined ? `data:image/png;base64,${Buffer.from(props.UserData.DP).toString('base64')}` : avatar} />
                </div>
                <div className="">
                    <h5 className="bold mg0 darkGray inline">{props.UserData.FirstName} {props.UserData.LastName}</h5>
                    {props.Type === "CS" && <>
                        <p className="bolder darkGray inline"> Started A New Chapter </p>
                        <br />
                        <p className="lighGray bolder mg0 capitalize"><Link to={`/Booklet/${props.ChapterData._id}`} className="blue bolder">{moment(props.createdAt).fromNow()}</Link></p>
                    </>}

                    {props.Type === "CU" && <>
                        <p className="bolder darkGray inline"> Updated {props.UserData.Gender === "Male" ? "His" : "Her"} Chapter </p>
                        <h5 className="bold mg0 darkGray inline">{props.ChapterData.Title}</h5>
                        <br />
                        <p className="lighGray bolder mg0 capitalize">{moment(props.createdAt).fromNow()}</p>
                    </>}

                    {props.Type === "T" && <>
                        <br />
                        <p className="lighGray bolder mg0 capitalize">{moment(props.createdAt).fromNow()}</p>
                    </>}

                </div>
            </div>
            {/* Head end */}

            {/* body */}
            <div className="mg5">
                {props.Type === "CS" && <>
                    <p className="lighGray bolder">{props.ChapterData.Description}</p>
                    <UncontrolledCarousel items={ImageItems} />
                </>}
                {props.Type === "CU" && <>
                    <p className="lighGray bolder">{props.ChapterData.Description}</p>
                    <UncontrolledCarousel items={ImageItems} />
                </>}
                {props.Type === "T" && <p className="lighGray bolder mg0">{props.Text}</p>}
            </div>
            {/* body end */}

            {/* Stats */}
            <div className="flex centerAlignItems">
                <div className="p5 pointer" onClick={props.onLike}><img alt="Like" className="inline" src={props.isLiked ? like : likeGray} /></div>
                <div className="p5"><p className="lightGray inline mg0 bolder">{props.LikeCount} Likes</p></div>
                <div className="p5"><p className="lightGray inline mg0 bolder">{props.CommentCount} Comments</p></div>
            </div>
            <hr className='mg0' />
            {/* Stats end */}

            {/* comment */}
            <div>
                {props.Comments.map((e, i) => (
                    <Comment {...e} key={Math.random() + i} />
                ))}

                {/* Write comment */}
                <div className="flex" style={{ paddingTop: "10px" }}>
                    <div>
                        <img alt="Comment avatar" style={{ marginRight: '10px' }} className="avatar-x-sm" src={props.user.DP !== undefined ? `data:image/png;base64,${Buffer.from(props.user.DP).toString('base64')}` : avatar} />
                    </div>
                    <div className="flex centerAlignItems" style={{ width: '100%' }}>
                        <Input placeholder="Write a comment..."
                            onKeyPress={props.onCommentKeyPress}
                            onChange={props.onCommentChange}
                        />
                    </div>
                </div>
                {/* Write comment end */}
            </div>
            {/* comment end */}

        </div>

    )
}

export default Post;