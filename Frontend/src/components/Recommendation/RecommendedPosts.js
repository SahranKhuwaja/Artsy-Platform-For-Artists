import artworks from '../../assets/img/artworks.png';
import Post from '../Newsfeed/Post';

const RecommendedPosts = (props) => {

    console.log(props)

    if (props.posts.length === 0) {
        return (
            <div className="whiteCard maxWidth alignCenter">
                <img alt="Booklet is empty" src={artworks} style={{ height: "200px", margin: "20px" }} />
                <p className="darkGray bolder">Looks like you are all caught up!</p>
                <p className="darkGray bolder">Like more artworks to get suggestions</p>
            </div>
        )
    }

    return (
        <div className="p0" style={{marginBottom:'-20px'}}>
            {props.posts.map((e, i) => {
                return <Post {...e} user={props.user}/>
            })}
        </div>
    )
}

export default RecommendedPosts