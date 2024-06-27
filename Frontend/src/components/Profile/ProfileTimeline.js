import React from 'react';
import axios from 'axios';
import url from '../../assets/data/url';
import Post from '../Newsfeed/Post';
import CreatePost from '../Newsfeed/CreatePost';
import socketioClient from 'socket.io-client';

let socket = null;
axios.defaults.withCredentials = true;

class ProfileTimeline extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Text: '',
            Posts: [],
        }
        this.Comment = []
    }

    componentDidMount = async () => {
        socket = socketioClient(url);
        await this.fetchPosts()
    }

    fetchPosts = async () => {
        let posts = await axios.get(url + 'post/view/' + this.props.user._id)


        if (posts.data) {

            this.Comment = await Promise.all(posts.data.map(async e => {
                return ''
            }))

            this.setState({
                Posts: posts.data
            })
        }
    }

    onChangePostText = (input) => {
        this.setState({
            Text: input.target.value
        })
    }

    onPost = async () => {
        let post = await axios.post(url + 'post/insert', { Type: 'T', Text: this.state.Text })
        if (post.data) {
            this.setState({
                Posts: [{ ...post.data }, ...this.state.Posts], Text: ''
            })
            this.Comment = ['', ...this.Comment]
        }
    }

    onLike = async (PostId, isLiked, i) => {
        if (isLiked) {
            //unlike post
            let unlike = await axios.delete(url + 'like/delete/' + PostId)
            if (unlike.data) {
                let Posts = [...this.state.Posts]
                Posts[i].isLiked = false
                Posts[i].LikeCount = Posts[i].LikeCount - 1
                this.setState({
                    Posts
                })
            }
        } else {
            //like post
            let like = await axios.post(url + 'like/insert', { PostId })
            if (like.data) {
                let Posts = [...this.state.Posts]
                Posts[i].isLiked = true
                Posts[i].LikeCount += 1
                this.setState({
                    Posts
                })
                socket.emit('PostLike', { NotificationTo: Posts[i].UserId, NotificationFrom: this.props.user._id, PostId });
            }
        }
    }

    onCommentChange = (index, data) => {
        this.Comment[index] = data.target.value
    }

    onCommentKeyPress = async (index, PostId, data) => {
        if (data.key === 'Enter' && this.Comment[index] !== '') {

            let comment = await axios.post(url + 'comment/insert', { PostId, Text: this.Comment[index] })

            if (comment.data) {
                let Posts = [...this.state.Posts]
                Posts[index].Comments.push(comment.data)
                Posts[index].CommentCount += 1
                this.setState({
                    Posts
                })
                socket.emit('PostComment', { NotificationTo: Posts[index].UserId, NotificationFrom: this.props.user._id, PostId });
            }
        }
    }

    render() {
        return (
            <>
                <div className="flex">
                    <div style={{ width: "40%" }}>
                        <div className="whiteCard mgLeft20">
                            <p className="bold darkGray">Photos</p>
                            <hr className="mg0" />
                            {/* <div className="flex mgTop10">
                                <img className="thumbnail-3" src={cover} />
                                <img className="thumbnail-3" src={cover} />
                                <img className="thumbnail-3" src={cover} />
                            </div> */}
                        </div>
                    </div>


                    <div style={{ width: "60%", padding: "0px 20px" }}>

                        <CreatePost user={this.props.user} Text={this.state.Text}
                            onChangePostText={this.onChangePostText} onPost={this.onPost}
                        />

                        {this.state.Posts.length > 0 && this.state.Posts.map((e, i) => (
                            <Post {...e} key={Math.random() + i} index={i}
                                onLike={this.onLike.bind(this, e._id, e.isLiked, i)}
                                onCommentChange={this.onCommentChange.bind(this, i)}
                                onCommentKeyPress={this.onCommentKeyPress.bind(this, i, e._id)}
                                user={this.props.user}
                            />
                        ))}

                    </div>

                </div>
            </>
        )
    }
}

export default ProfileTimeline;