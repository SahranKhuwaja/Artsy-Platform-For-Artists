import React from 'react';
import axios from 'axios';
import url from '../../assets/data/url';
import TopUsers from './TopUsers';
import RecommendedPosts from './RecommendedPosts';
import RecommendedUsers from './RecommendedUsers';
import Loader from 'react-loader-spinner';


class Recommendation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            UserRecommend: [],
            ChapterRecommend: [],
            TopVisits: [],
            loading: true
        }
    }

    componentDidMount = () => {
        this.getRecommendations();
    }

    getRecommendations = async () => {
        const UserRecommend = await (await axios.get(url + 'recommend/users')).data
        const TopVisits = await (await axios.get(url + 'visit/topVisits')).data
        this.setState({
            UserRecommend: UserRecommend.predictions,
            ChapterRecommend: UserRecommend.predictionsChapters,
            TopVisits,
            loading: false
        })
    }

    render() {
        if (this.state.loading) {
            return (<Loader type="Grid" color="black" height={700} style={{ textAlign: 'center' }} />)
        }

        return (
            <div style={{ display: 'flex', paddingTop: '70px' }}>
                <div className="maxWidth">
                    <TopUsers users={this.state.TopVisits} />

                    <div className="flex" style={{ margin: '20px' }}>
                        
                        <div style={{ width: '60%' }}>
                            <RecommendedPosts posts={this.state.ChapterRecommend} user={this.props.user} />
                        </div>
                        <div style={{ width: '40%' }}>
                            <RecommendedUsers users={this.state.UserRecommend} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Recommendation