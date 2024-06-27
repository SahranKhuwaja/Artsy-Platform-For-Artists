import React from 'react';
import avatar from '../../assets/img/default-avatar.png';
import like from '../../assets/img/icons/like.png';
import likeGray from '../../assets/img/icons/likeGray.png';
import Comment from './Comment';
import Input from 'reactstrap/lib/Input';
import url from '../../assets/data/url';
import axios from 'axios';
import moment from 'moment';
import socketioClient from 'socket.io-client';

let socket = null;
axios.defaults.withCredentials = true;

class ArtistBookletNewsfeed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chapter: {},
            loading: true,
            PostDetails: {},
            Comment: ''
        }
    }

    componentDidMount = async () => {
        socket = socketioClient(url);
        await this.getChapter()
        await this.getPostDetails()
    }

    getChapter = async () => {
        const request = await axios.get(`${url}artistBooklet/getImages/${this.props.match.params.id}?mode=display`);
        if (request.data.images) {
            let chapter = { ...request.data }
            let coverImageIndex = chapter.images.findIndex(e => e.CoverImage === true);
            const CoverImage = { ...chapter.images[coverImageIndex] }
            chapter.images.splice(coverImageIndex, 1);
            this.setState({
                chapter: await { ...chapter, CoverImage },
            })
        }
    }

    getPostDetails = async () => {
        let PostDetails = await (await axios.get(`${url}post/view/chapter/${this.props.match.params.id}`)).data
        this.setState({
            PostDetails,
            loading: false
        })
    }

    onLike = async () => {

        let PostDetails = { ...this.state.PostDetails }

        if (PostDetails.isLiked) {
            //unlike post
            let unlike = await axios.delete(url + 'like/delete/' + PostDetails._id)
            if (unlike.data) {
                PostDetails.isLiked = false
                PostDetails.LikeCount = PostDetails.LikeCount - 1
                this.setState({
                    PostDetails
                })
            }
        } else {
            //like post
            let like = await axios.post(url + 'like/insert', { PostId: PostDetails._id })
            if (like.data) {
                console.log('Liked')

                PostDetails.isLiked = true
                PostDetails.LikeCount = PostDetails.LikeCount + 1
                this.setState({
                    PostDetails
                })
                socket.emit('PostLike', { NotificationTo: PostDetails.UserId, NotificationFrom: this.props.user._id, PostId: PostDetails._id });
            }
        }
    }

    onCommentChange = (data) => {
        this.setState({
            Comment: data.target.value
        })
    }

    onCommentKeyPress = async (data) => {
        if (data.key === 'Enter' && this.state.Comment !== '') {

            let comment = await axios.post(url + 'comment/insert', { PostId: this.state.PostDetails._id, Text: this.state.Comment })

            if (comment.data) {
                let PostDetails = { ...this.state.PostDetails }
                PostDetails.Comments.push(comment.data)
                PostDetails.CommentCount += 1
                this.setState({
                    PostDetails
                })
                socket.emit('PostComment', { NotificationTo: PostDetails.UserId, NotificationFrom: this.props.user._id, PostId: PostDetails._id });
            }
        }
    }

    render() {
        return (
            <>{!this.state.loading ?
                <div style={{ backgroundColor: "lightgray", height: "100%" }}>
                    <div style={{ display: 'flex', paddingTop: '70px' }}>

                        <div className="row" style={{ margin: '20px', width: "100%" }}>
                            <div className="col-md-8 p0">
                                <div style={{ backgroundColor: "white", borderRadius: "10px", boxShadow: "0px 0px 20px -4px gray", marginRight: "20px", padding: "20px" }}>
                                    <div className="flex centerAlignItems mgBottom10">
                                        <div>
                                            <img alt="avatar" style={{ marginRight: '10px' }} className="avatar-md mgRight5" src={this.state.chapter.UserData.DP !== undefined ? `data:image/png;base64,${Buffer.from(this.state.chapter.UserData.DP).toString('base64')}` : avatar} />
                                        </div>
                                        <div className="">
                                            <h5 className="bold mg0 darkGray inline">{this.state.chapter.Title}</h5> <p className="bolder darkGray inline">A Chapter By</p> <h5 className="bold mg0 darkGray inline">{this.state.chapter.UserData.FirstName} {this.state.chapter.UserData.LastName}</h5>
                                            <br />
                                            <p className="lighGray bolder mg0">Published {moment(this.state.chapter.createdAt).fromNow()}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="lighGray bolder mg0">{this.state.chapter.Description}</p>
                                        <img alt="Cover" className="maxWidth mgTop5"
                                            src={`${url}artistBooklet/image/${this.state.chapter.CoverImage.ImageId}/${this.state.chapter.CoverImage.FileName}`} />
                                    </div>
                                </div>
                                {this.state.chapter.images.map((e, i) => (
                                    <div key={"PostImage" + i} style={{ backgroundColor: "white", borderRadius: "10px", boxShadow: "0px 0px 20px -4px gray", marginRight: "20px", marginTop: '20px', padding: "20px" }}>
                                        <img alt={"Post Image " + i} className="postImage mgTop5" src={`${url}artistBooklet/image/${e.ImageId}/${e.FileName}`} />
                                    </div>

                                ))

                                }
                            </div>

                            <div className="col p0">
                                <div style={{ backgroundColor: "white", borderRadius: "10px", boxShadow: "0px 0px 20px -4px gray", padding: "10px" }}>

                                    <div className="flex centerAlignItems">
                                        <div className="p5 pointer" onClick={this.onLike}><img alt="Like" className="inline" src={this.state.PostDetails.isLiked ? like : likeGray} /></div>
                                        <div className="p5"><p className="lightGray inline mg0 bolder">{this.state.PostDetails.LikeCount} Likes</p></div>
                                        <div className="p5"><p className="lightGray inline mg0 bolder">{this.state.PostDetails.CommentCount} Comments</p></div>
                                    </div>
                                    <hr className='mg0' />

                                    {/* comment */}
                                    <div>
                                        {this.state.PostDetails.Comments.length > 0 && this.state.PostDetails.Comments.map((e, i) => {
                                            return <Comment {...e} key={Math.random() + i} />
                                        })}

                                        {/* Write comment */}
                                        <div className="flex" style={{ paddingTop: "10px" }}>
                                            <div>
                                                <img alt="avatar" style={{ marginRight: '10px' }} className="avatar-x-sm" src={this.props.user.DP !== undefined ? `data:image/png;base64,${Buffer.from(this.props.user.DP).toString('base64')}` : avatar} />
                                            </div>
                                            <div style={{ width: '100%' }}>
                                                <Input value={this.state.Comment} onChange={this.onCommentChange}
                                                    onKeyPress={this.onCommentKeyPress}
                                                    placeholder="Write a comment..." />
                                            </div>
                                        </div>
                                        {/* Write comment end */}

                                    </div>
                                    {/* comment end */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : null}
            </>
        )
    }
}

export default ArtistBookletNewsfeed;