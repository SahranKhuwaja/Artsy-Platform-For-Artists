import React from 'react';
import axios from 'axios';
import url from "../../assets/data/url";
import VisitProfileHeader from './VisitProfileHeader';
import VisitProfileAbout from './VisitProfileAbout';
import RequestBookingModal from '../Modals/RequestBookingModal';
import socketioClient from 'socket.io-client';
import VisitProfileBooklet from './VisitProfileBooklet';
import VisitProfileReview from '../Profile/ProfileReview';
import VisitProfileTimeline from './VisitProfileTimeline';
import moment from 'moment';

let socket = null;
axios.defaults.withCredentials = true;

class VisitProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            work: [],
            skill: [],
            education: [],
            reviews: [],
            page: 'timeline',
            BookingRequest: {
                Values: {
                    Description: '',
                    StartDate: '',
                    EndDate: '',
                    Venue: '',
                    PaymentAmount: '',
                    Currency: 'USD'
                },
                Errors: {
                    Description: '',
                    StartDate: '',
                    EndDate: '',
                    Venue: '',
                    PaymentAmount: ''
                }
            },
            DisplayRequestModal: false,
            loading: true
        }
    }

    componentDidMount = () => {
        this.getProfile();
        this.incrementVisit();
        socket = socketioClient(url);
    }

    getProfile = async () => {
        let id = this.props.match.params.id;
        let user = await (await axios.get(url + 'user/' + id)).data;
        let work = await (await axios.get(url + 'work/view/' + id)).data;
        let skill = await (await axios.get(url + 'skill/view/' + id)).data;
        let education = await (await axios.get(url + 'education/view/' + id)).data;
        let reviews = await (await axios.get(url + 'ratingReview/view/user/' + id)).data
        let AvgRating = await (await axios.get(url + 'ratingReview/rating/' + id)).data.average;

        this.setState({
            user, work, skill, education, reviews, AvgRating, loading: false
        })
    }

    incrementVisit = async () => {
        await axios.post(url + 'visit/visit', {OwnerId: this.props.match.params.id} )
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

    setPageReviews = () => {
        this.setState({
            page: 'reviews'
        })
    }

    setPageBooklet = () => {
        this.setState({
            page: 'booklet'
        })
    }

    toggleRequestModal = () => {
        this.setState({
            DisplayRequestModal: !this.state.DisplayRequestModal
        })
    }

    onChangeDescription = (input) => {
        if (input.target.value.length <= 100) {
            let BookingRequest = { ...this.state.BookingRequest }
            BookingRequest.Values.Description = input.target.value;
            this.setState({
                BookingRequest
            })
        }
    }

    onChangeStartDate = (input) => {
        let BookingRequest = { ...this.state.BookingRequest }
        BookingRequest.Values.StartDate = input._d;
        this.setState({
            BookingRequest
        })
    }

    onChangeEndDate = (input) => {
        let BookingRequest = { ...this.state.BookingRequest }
        BookingRequest.Values.EndDate = input._d;
        this.setState({
            BookingRequest
        })
    }

    onChangeVenue = (input) => {
        let BookingRequest = { ...this.state.BookingRequest }
        BookingRequest.Values.Venue = input.target.value;
        this.setState({
            BookingRequest
        })
    }

    onChangePaymentAmount = (input) => {
        let BookingRequest = { ...this.state.BookingRequest }
        BookingRequest.Values.PaymentAmount = input.target.value;
        this.setState({
            BookingRequest
        })
    }

    onChangeCurrency = (input) => {
        let BookingRequest = { ...this.state.BookingRequest }
        BookingRequest.Values.Currency = input.target.value;
        this.setState({
            BookingRequest
        })
    }

    clearRequest = () => {
        this.setState({
            BookingRequest: {
                Values: {
                    Description: '',
                    StartDate: '',
                    EndDate: '',
                    Venue: '',
                    PaymentAmount: '',
                    Currency: 'USD'
                },
                Errors: {
                    Description: '',
                    StartDate: '',
                    EndDate: '',
                    Venue: '',
                    PaymentAmount: ''
                }
            }
        })

    }

    cancelRequest = () => {
        this.clearRequest()
        this.toggleRequestModal();
    }

    sendRequest = () => {
        let BookingRequest = { ...this.state.BookingRequest }
        BookingRequest.Errors = { StartDate: '', EndDate: '', Venue: '', PaymentAmount: '', Description: '' }
        if (BookingRequest.Values.StartDate === '' || (BookingRequest.Values.EndDate === '' && BookingRequest.Values.Venue === '') || BookingRequest.Values.PaymentAmount === '' || BookingRequest.Values.Description === '') {

            if (BookingRequest.Values.StartDate === '') {
                BookingRequest.Errors.StartDate = 'Required'
            }
            if (BookingRequest.Values.EndDate === '') {
                BookingRequest.Errors.EndDate = "Required"
            }
            if (BookingRequest.Values.Venue === '') {
                BookingRequest.Errors.Venue = 'Required'
            }
            if (BookingRequest.Values.PaymentAmount === '') {
                BookingRequest.Errors.PaymentAmount = 'Required'
            }
            if (BookingRequest.Values.Description === '') {
                BookingRequest.Errors.Description = 'Required'
            }

            this.setState({
                BookingRequest
            })

        } else if (BookingRequest.Values.StartDate > BookingRequest.Values.EndDate) {

            BookingRequest.Errors.EndDate = "End Date must succeed the Start Date"
            this.setState({
                BookingRequest
            })

        } else if (BookingRequest.Values.StartDate < moment()) {
            BookingRequest.Errors.StartDate = "Booking Date must be of the future"
            this.setState({
                BookingRequest
            })
        }

        else {
            socket.emit('sendingBookingRequest', { ...BookingRequest.Values, Artist: this.state.user._id, Client: this.props.user._id });
            this.toggleRequestModal();
            this.clearRequest();
        }
    }

    render() {

        let comp = null;
        if (this.state.page === 'timeline') {
            comp = <VisitProfileTimeline user={this.state.user} ActiveUser={this.props.user} />
        } else if (this.state.page === 'about') {
            comp = <VisitProfileAbout user={this.state.user} work={this.state.work} skill={this.state.skill} education={this.state.education} />
        } else if (this.state.page === 'reviews') {
            comp = <VisitProfileReview Reviews={this.state.reviews} />
        } else if (this.state.page === 'booklet') {
            comp = <VisitProfileBooklet userId={this.state.user._id} />
        }

        // if (Object.keys(this.state.user).length > 0) {
        if (this.state.loading) {
            return <div></div>
        }
        else {
            return (
                <div style={{ backgroundColor: "lightgray" }}>
                    <div style={{ display: 'flex', paddingTop: '70px' }}>
                        <div>
                            <VisitProfileHeader user={this.state.user}
                                setPageTimeline={this.setPageTimeline.bind(this)}
                                setPageAbout={this.setPageAbout.bind(this)}
                                setPageReviews={this.setPageReviews.bind(this)}
                                setPageBooklet={this.setPageBooklet.bind(this)}
                                page={this.state.page}
                                toggleRequestModal={this.toggleRequestModal}
                                startConversation={this.props.startConversation}
                                AvgRating={this.state.AvgRating}
                            />
                            <RequestBookingModal DisplayRequestModal={this.state.DisplayRequestModal}
                                onChangeDescription={this.onChangeDescription}
                                onChangeStartDate={this.onChangeStartDate}
                                onChangeEndDate={this.onChangeEndDate}
                                onChangeVenue={this.onChangeVenue}
                                onChangePaymentAmount={this.onChangePaymentAmount}
                                cancelRequest={this.cancelRequest}
                                sendRequest={this.sendRequest}
                                {...this.state.BookingRequest}
                            />
                            {comp}
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default VisitProfile;