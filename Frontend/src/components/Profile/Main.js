import React from 'react';
import axios from 'axios';
import Timeline from './ProfileTimeline';
import About from './ProfileAbout';
import Booklet from './ProfileBooklet';
import ProfileHeader from './ProfileHeader';
import url from "../../assets/data/url";
import Reviews from './ProfileReview';

axios.defaults.withCredentials = true;

class ProfileMain extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            user: {},
            page: 'timeline',
            hover: false,
            imageError: '',
            Reviews: [],
            AvgRating: undefined
        }
    }

    componentDidMount = () => {
        this.setState({
            user: this.props.user
        })
        this.getAvgRating();
    }

    fileInput = undefined;

    getAvgRating = async () => {
        let AvgRating = await (await axios.get(`${url}ratingReview/rating/${this.props.user._id}`)).data.average;
        this.setState({
            AvgRating
        })
    }

    onSearchClick = () => {
        this.props.history.replace('/Search')
    }

    setPageTimeline = () => {
        this.setState({
            page: 'timeline'
        })
    }

    setPageAbout = () => {
        this.setState({
            page: 'about'
        })
    }

    setPageReviews = async () => {
        this.setState({
            page: 'reviews'
        })
        this.getReviews()
    }

    setPageBooklet = () => {
        this.setState({
            page: 'booklet'
        })
    }

    onHover = () => {
        const { hover } = this.state;
        this.setState({
            hover: !hover
        })

    }

    uploadImage = async (fileInput) => {
        this.fileInput = fileInput
    }

    tiggerUpload = () => {
        this.fileInput.click()
    }

    saveImage = async (event) => {

        const { user } = this.state;
        if (event.target.files[0]) {
            if (!this.validateImage(event.target.files[0].name.split('.')[1].toLowerCase())) {
                return this.setState({
                    imageError: 'Please upload an image!'
                })
            }
            this.setState({
                imageError: ''
            })
            const fd = new FormData();
            fd.append("Dp", event.target.files[0]);
            const upload = await axios.post(`${url}user/upload`, fd);
            if (upload.data.Dp) {
                this.setState({
                    user: { ...user, DP: upload.data.Dp }
                })
                this.props.status();
            }
        }

    }

    validateImage = (type) => {
        if (type === 'jpg' || type === 'jpeg' || type === 'png' || type === 'jfif') {
            return true;
        }
        return false;
    }

    getReviews = async () => {
        let reviews = await axios.get(url + "ratingReview/view/user/"+this.state.user._id)
        if (reviews.data) {
            this.setState({
                Reviews: reviews.data
            })
        }
    }

    render() {

        let comp = null;
        if (this.state.page === 'timeline') {
            comp = <Timeline user={this.state.user} />
        } else if (this.state.page === 'about') {
            comp = <About user={this.state.user} status={this.props.status} />
        } else if (this.state.page === 'reviews') {
            comp = <Reviews Reviews={this.state.Reviews} />
        } else if (this.state.page === 'booklet') {
            comp = <Booklet userId={this.state.user._id} />
        }


        return (
            <div style={{ backgroundColor: "lightgray" }}>

                <div style={{ display: 'flex', paddingTop: '70px' }}>

                    {this.state.AvgRating !== undefined &&
                        <div>

                            <ProfileHeader user={this.state.user}
                                setPageTimeline={this.setPageTimeline.bind(this)}
                                setPageAbout={this.setPageAbout.bind(this)}
                                setPageReviews={this.setPageReviews.bind(this)}
                                setPageBooklet={this.setPageBooklet.bind(this)}
                                page={this.state.page} hover={this.state.hover}
                                onHover={this.onHover} upload={this.uploadImage} triggerUpload={this.tiggerUpload}
                                saveImage={this.saveImage} imageError={this.state.imageError}
                                AvgRating={this.state.AvgRating}
                            />

                            {comp}

                        </div>}

                </div>

            </div>
        )
    }
}

export default ProfileMain;