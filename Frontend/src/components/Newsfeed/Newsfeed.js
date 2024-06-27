import React from 'react';
import url from '../../assets/data/url';
import axios from 'axios';
import CreatePost from './CreatePost';
import Post from './Post';
import Loader from 'react-loader-spinner';
import users from '../../assets/img/users.png';
import artworks from '../../assets/img/artworks.png';
import calendar from '../../assets/img/timeCalendar.png';
import transaction from '../../assets/img/transaction.png';
import socketioClient from 'socket.io-client';

let socket = null;
axios.defaults.withCredentials = true;

class Newsfeed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Text: '',
            Posts: [],
            loading: true
        }
        this.Comment = []
    }

    componentDidMount = async () => {
        socket = socketioClient(url);
        await this.fetchPosts();
    }

    fetchPosts = async () => {
        let posts = await axios.get(url + 'post/view/')

        if (posts.data) {

            this.Comment = await Promise.all(posts.data.map(async e => {
                return ''
            }))

            this.setState({
                Posts: posts.data, loading: false
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

        if (this.state.loading) {
            return (<Loader type="Grid" color="black" height={700} style={{ textAlign: 'center' }} />)
        } else 

        return (
            <div style={{ display: 'flex', paddingTop: '70px' }}>

                <div className="flex" style={{ margin: '20px', width: "100%" }}>
                    <div className="p0 mgRight20" style={{width:'60%'}}>

                        {/* Create Post */}
                        <CreatePost
                            user={this.props.user} Text={this.state.Text}
                            onChangePostText={this.onChangePostText} onPost={this.onPost}
                        />
                        {/* Create Post End */}

                        {this.state.Posts.length > 0 && this.state.Posts.map((e, i) => (
                            <Post {...e} key={Math.random() + i} index={i}
                                onLike={this.onLike.bind(this, e._id, e.isLiked, i)}
                                onCommentChange={this.onCommentChange.bind(this, i)}
                                onCommentKeyPress={this.onCommentKeyPress.bind(this, i, e._id)}
                                user={this.props.user}
                            />
                        ))}

                    </div>

                    <div className="p0" style={{width:'40%'}}>

                        <div className="whiteCard alignCenter pointer blueHoverCard mgBottom20" style={{height:'226px'}}>
                            <p className="bolder darkGray">No artworks to your liking?</p>
                            <img className="mg5" src={artworks} alt="Recommendation" style={{height:'70%'}} />
                            <p className="bolder darkGray">Click here to get some suggestions!</p>
                        </div>

                        <div className="whiteCard alignCenter pointer blueHoverCard mgBottom20" style={{height:'226px'}}>
                            <p className="bolder darkGray">Expand your social circle</p>
                            <img className="mg5" src={users} alt="Recommendation" style={{height:'70%'}} />
                            <p className="bolder darkGray">Artsy knows people you may like!</p>
                        </div>

                        <div className="whiteCard alignCenter pointer blueHoverCard mgBottom20" style={{height:'226px'}}>
                            <p className="bolder darkGray">Trouble keeping track?</p>
                            <img className="mg5" src={calendar} alt="Recommendation" style={{height:'70%'}} />
                            <p className="bolder darkGray">Let Artsy take care of all your schedules!</p>
                        </div>

                        <div className="whiteCard alignCenter pointer blueHoverCard mgBottom20" style={{height:'226px'}}>
                            <p className="bolder darkGray">Easy to perform transactions</p>
                            <img className="mg5" src={transaction} alt="Recommendation" style={{height:'70%'}} />
                            <p className="bolder darkGray">Keep track of all your payments!</p>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Newsfeed;