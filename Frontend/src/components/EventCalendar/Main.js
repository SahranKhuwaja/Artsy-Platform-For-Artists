import React from 'react';
import axios from 'axios';
import url from '../../assets/data/url';
import Calander from './Calander';
import moment from 'moment';
import today from '../../assets/img/today.png';
import avatar from '../../assets/img/default-avatar.png';
import arrowRight from '../../assets/img/icons/arrow-right.png';
import arrowStop from '../../assets/img/icons/arrow-stop.png';
import ConfirmFinish from './ConfirmFinish';
import { UncontrolledDropdown, DropdownItem, Button, Badge, DropdownToggle, DropdownMenu } from 'reactstrap';
import RatingReview from './RatingReview';
import socketioClient from 'socket.io-client';
// import PaymentModal from './Payment';

let socket = null;
axios.defaults.withCredentials = true;


class EventCalander extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bookings: [],
            currentDate: moment(),
            selected: [],
            toggleDetails: false,
            ConfirmModal: false,
            RatingReview: {
                ProjectId: '',
                Artist: '',
                Rating: '',
                Review: '',
            },
            isReviewed: false,
            ReviewModal: false,
            PaymentModal: false,
            // acceptPayment: false,
            // loading: true,
            // openData:undefined
        }
    }

    projectFile = undefined;

    componentDidMount = async () => {
        socket = socketioClient(url);
        this.resetToCurrentDate();
    }

    getBookings = async () => {
        const request = await (await axios.get(`${url}bookingRequest/calander/${this.state.currentDate.month()}/${this.state.currentDate.year()}`)).data;
        this.setState({
            bookings: await request
        })
    }

    getFirstDayOfMonth = () => {
        const { currentDate } = this.state;
        const firstDay = moment(currentDate).startOf('month').format('d');
        return firstDay;
    }

    getDaysOfMonth = () => {
        const { currentDate } = this.state;
        const days = moment(currentDate).daysInMonth();
        return days;
    }

    getRows = () => {
        const { currentDate, bookings } = this.state;
        let blanks = [];
        let days = [];
        let cells = [];
        let rows = [];
        let style = {};
        let classes = ['cell'];

        for (let i = 0; i < this.getFirstDayOfMonth(); i++, blanks.push(<td key={Math.random() + i}></td>));

        for (let i = 1; i <= this.getDaysOfMonth(); i++) {
            const day = parseInt(moment().format('D'));
            const month = parseInt(moment(this.state.currentDate).month());
            const year = parseInt(moment(this.state.currentDate).year());
            if (month === parseInt(moment().month()) && year === parseInt(moment().year())) {
                if (i === day) {
                    style = { backgroundImage: 'url(' + today + ')' }
                    classes.push('backImage');
                    classes.push('greenBack');
                    classes.push('selected');
                }
                else {
                    style = {};
                    classes = ['cell'];
                }
            }
            days.push(<td className={classes.join(' ')} style={style} key={Math.random() + i} onClick={this.getBookingRequestDetails.bind(this, i)}>
                <div>
                    <div style={{ textAlign: 'right' }}>{i}</div>
                    <div className="flex" style={{ justifyContent: 'space-around' }}>
                        {bookings.map((e, ind) => {
                            if (parseInt(moment(e.StartDate).format('D')) === i && moment(e.StartDate).format('MMM') === moment(currentDate).format('MMM')) {
                                return (
                                    <div key={Math.random() + ind}>
                                        <img alt={e.UserData.FirstName + " " + e.UserData.LastName} className="avatar-x-sm"
                                            src={e.UserData.DP !== undefined ? `data:image/png;base64,${Buffer.from(e.UserData.DP).toString('base64')}` : avatar} />
                                        <img src={arrowRight} className="calanderIcon" alt="Event Start" />
                                    </div>)
                            }
                            if (parseInt(moment(e.EndDate).format('D')) === i && moment(e.EndDate).format('MMM') === moment(currentDate).format('MMM')) {
                                return (
                                    <div key={Math.random() + ind}>
                                        <img alt={e.UserData.FirstName + " " + e.UserData.LastName} className="avatar-x-sm"
                                            src={e.UserData.DP !== undefined ? `data:image/png;base64,${Buffer.from(e.UserData.DP).toString('base64')}` : avatar} />
                                        <img src={arrowStop} className="calanderIcon" alt="Event End" />
                                    </div>)
                            }
                            return "";
                        })}
                    </div>
                </div>
            </td>)

        }

        const totalSlots = [...blanks, ...days];
        totalSlots.forEach((e, i) => {
            if (i % 7 !== 0) {
                cells.push(e);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(e);
            }
            if (i === totalSlots.length - 1) {
                const Blanks = 7 - cells.length;
                for (i = 1; i <= Blanks; i++, cells.push(<td key={Math.random() + i}></td>));
                rows.push(cells);

            }
        })
        const daysInMonth = rows.map((e, i) => (<tr key={Math.random() + i}>{e}</tr>))
        return daysInMonth;
    }

    setNextMonth = async () => {
        const { currentDate } = this.state;
        let newDate = { ...currentDate };
        newDate = await moment(newDate).add(1, 'month')
        this.setState({
            currentDate: await newDate
        })
        await this.getBookings();
    }

    setPreviousMonth = async () => {
        const { currentDate } = this.state;
        let newDate = { ...currentDate };
        newDate = await moment(newDate).subtract(1, 'month')
        this.setState({
            currentDate: await newDate
        })
        await this.getBookings();
    }

    resetToCurrentDate = async () => {
        this.setState({
            currentDate: await moment()
        })
        await this.getBookings();
        this.getBookingRequestDetails(parseInt(moment().format('D')))
    }

    setDate = (number) => {
        let currentDate = { ...this.state.currentDate }
        currentDate = moment(currentDate).date(number)
        this.setState({
            currentDate
        })
    }

    getBookingRequestDetails = async (date) => {
        const { bookings } = this.state;
        let selected = bookings.filter(e => (parseInt(moment(e.StartDate).format('D')) === date) || (parseInt(moment(e.EndDate).format('D')) === date))
        selected = await Promise.all(selected.map((e, i) => {
            e.ShowDetails = i === 0
            return e
        }))

        this.setState({
            selected: await selected
        })

        this.setDate(date);
    }

    toggleDetails = (id) => {
        let selected = [...this.state.selected];

        selected = selected.map(e => {
            if (e._id === id) {
                e.ShowDetails = !e.ShowDetails
            }
            return e
        })

        this.setState({
            selected
        })
    }

    UploadFile = () => {
        this.projectFile.click()
    }

    onChangeUploadFile = async (id, input) => {
        const files = [...input.target.files];
        const selected = [...this.state.selected]
        const fd = new FormData();
        for (let i = 0; i < files.length; i++) {
            fd.append('File', files[i]);
        }
        fd.append('BookingProjectId', id);
        const request = await axios.post(`${url}bookingProject/sendFile`, fd);
        if (request.data.bookingProjectFiles.length !== 0) {
            let index = selected.findIndex(e => e.BookingProject._id.toString() === id.toString());
            selected[index].BookingProjectFiles = selected[index].BookingProjectFiles.concat(request.data.bookingProjectFiles)
            this.setState({
                selected
            })
        }
    }

    markAsCompleted = async (id) => {
        let selected = [...this.state.selected];
        let index = selected.findIndex(e => e.BookingProject._id.toString() === id.toString());
        selected[index].BookingProject.isFinished = true;
        this.setState({
            selected
        })
        socket.emit('bookingFinished', { ProjectId: id, RequestId: selected[index]._id, Client: selected[index].Client });
    }

    downloadFiles = async (files) => {
        let win = undefined;
        files.forEach(e => {
            win = window.open(`${url}bookingProject/files/${e.ProjectFileId}/${e.FileName}`, '_blank');
        })
    }

    toggleConfirm = () => {
        this.setState({
            ConfirmModal: !this.state.ConfirmModal
        })
    }

    toggleReview = () => {
        this.setState({
            ReviewModal: !this.state.ReviewModal
        })
    }

    clearReview = () => {
        this.setState({
            RatingReview: {
                ProjectId: '',
                Artist: '',
                Rating: '',
                Review: ''
            }
        })
    }

    cancelReview = () => {
        this.clearReview()
        this.toggleReview()
    }

    getRatingReview = async (Booking) => {
        let RatingReview = { ...this.state.RatingReview }
        let isReviewed = false
        const review = await axios.get(`${url}ratingReview/view/${Booking.BookingProject._id}`);
        if (review.data) {
            RatingReview = review.data
            isReviewed = true
        } else {
            RatingReview.ProjectId = Booking.BookingProject._id
            RatingReview.Artist = Booking.Artist
        }
        this.setState({
            RatingReview, isReviewed
        })
        this.toggleReview();
    }

    onChangeRating = async (rating) => {
        let RatingReview = { ...this.state.RatingReview }
        RatingReview.Rating = await rating
        this.setState({
            RatingReview
        })
    }

    onChangeReview = async (input) => {
        let RatingReview = { ...this.state.RatingReview }
        RatingReview.Review = input.target.value
        this.setState({
            RatingReview
        })
    }

    SaveReview = async () => {
        console.log(this.state.RatingReview)
        const review = await axios.post(`${url}ratingReview/insert/`, this.state.RatingReview);
        if (review.data.review) {
            this.clearReview();
            this.toggleReview();
            socket.emit('bookingReviewed', review.data.review);
        }
    }

    // togglePayment = () => {
    //     this.setState({
    //         PaymentModal: !this.state.PaymentModal
    //     })
    // }

    onPayment = async (data) => {
        // await this.setupPayment(data)
        // this.togglePayment()
        this.props.history.push({
            pathname:`/Payment/${data._id}`,
            state:{selected:data}
        })
    }

    render() {

        let list;

        if (this.state.selected.length === 0) {
            list = (
                <div className="mg10">
                    <p className="bolder lightGray mg0">You have no plans on this day.</p>
                </div>
            )
        }

        else {
            list = (
                this.state.selected.map((e, ind) => (
                    <div className="mgTop10" key={Math.random() + ind}>
                        <div style={{ padding: '10px 0px' }} className="flex">
                            <div>
                                <img alt="avatar" style={{ margin: '0px 10px' }} className="avatar-x-sm mg5"
                                    src={e.UserData.DP !== undefined ? `data:image/png;base64,${Buffer.from(e.UserData.DP).toString('base64')}` : avatar} />
                            </div>
                            <div style={{ width: '100%' }}>
                                <div className="flex">
                                    <div style={{ width: '100%' }}>
                                        <p className="bold mg0 darkGray">{e.UserData.FirstName} {e.UserData.LastName}</p>
                                        <p className="lighGray bolder mg0">{moment(e.StartDate).format('Do MMM YYYY')} - {moment(e.EndDate).format('Do MMM YYYY')}</p>
                                    </div>
                                    <div>
                                        <button className="p10 cleanButton" onClick={this.toggleDetails.bind(this, e._id)}>
                                            <i className={`fa ${e.ShowDetails ? 'fa-chevron-down' : 'fa-chevron-right'} lightGray`} />
                                        </button>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                                <div>
                                </div>
                                {e.ShowDetails &&
                                    <div className="mgTop5 mgRight5">
                                        <p className="bolder lightGray">{e.Description}</p>
                                        <p className="bolder darkGray inline">Venue: </p><p className="bolder lightGray inline">{e.Venue}</p><br />
                                        <p className="bolder darkGray inline">Payment Amount: </p><p className="bolder lightGray inline">{e.PaymentAmount} {e.Currency}</p><br />
                                        <Badge color={e.BookingProject.isFinished ? 'success' : 'danger'}>{e.BookingProject.isFinished ? 'Completed' : 'Incomplete'}</Badge>{" "}
                                        <Badge color={e.BookingProject.isPaid ? 'success' : 'danger'}>{e.BookingProject.isPaid ? 'Paid' : 'Unpaid'}</Badge>{" "}
                                        {
                                            (!e.BookingProject.isFinished ? (this.props.user.Role === 'Artist' ?
                                                // PROJECT INCOMPLETE AND ROLE IS ARTIST
                                                <div>
                                                    <input hidden type="file" ref={e => this.projectFile = e} multiple onChange={this.onChangeUploadFile.bind(this, e.BookingProject._id)} />
                                                    <ConfirmFinish
                                                        ConfirmModal={this.state.ConfirmModal} toggleConfirm={this.toggleConfirm}
                                                        Finish={this.markAsCompleted.bind(this, e.BookingProject._id)}
                                                    />
                                                    <Button onClick={this.UploadFile} style={{ width: '100px' }} color="info" outline className="mgTop10 bold lower blue p5 mgRight5"><i className="fa fa-upload" /> Upload</Button>
                                                    <Button onClick={this.toggleConfirm} style={{ width: '100px' }} color="info" outline className="mgTop10 bold lower blue p5"><i className="fa fa-paper-plane" /> Finish</Button>
                                                </div>
                                                :
                                                // PROJECT INCOMPLETE AND ROLE CLIENT
                                                undefined
                                            ) :
                                                // PROJECT COMPLETE
                                                <div>
                                                    <RatingReview
                                                        ReviewModal={this.state.ReviewModal}
                                                        toggleReview={this.toggleReview}
                                                        cancelReview={this.cancelReview}
                                                        RatingReview={this.state.RatingReview}
                                                        CurrentUser={this.props.user}
                                                        onChangeRating={this.onChangeRating}
                                                        onChangeReview={this.onChangeReview}
                                                        SaveReview={this.SaveReview}
                                                        isReviewed={this.state.isReviewed}
                                                        UserData={e.UserData}
                                                    />
                                                    {/* <PaymentModal
                                                        show={this.state.PaymentModal}
                                                        toggle={this.togglePayment}
                                                        acceptPayment={this.state.acceptPayment}
                                                        user={this.props.user}
                                                        data={e}
                                                        PaypalButtons={PaypalButtons}
                                                        loading={this.state.loading}
                                                        navigateToTransaction={this.navigateToTransaction}
                                                    /> */}
                                                    <UncontrolledDropdown className="btn-group">
                                                        <DropdownToggle outline className="p0 noBorder noEffect" color="info" type="button">See Details</DropdownToggle>
                                                        <DropdownMenu style={{ marginLeft: '-5px', marginTop: '-15px' }}>
                                                            <DropdownItem onClick={this.downloadFiles.bind(this, e.BookingProjectFiles)}>Download Files</DropdownItem>
                                                            {e.BookingProject.isReviewed || this.props.user.Role === 'Client' ?
                                                                <DropdownItem onClick={this.getRatingReview.bind(this, e)}>Rating {"&"} Review</DropdownItem>
                                                                : undefined
                                                            }
                                                            <DropdownItem onClick={this.onPayment.bind(this, e)}>Payment Details</DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </div>
                                            )
                                        }

                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                ))
            )
        }

        return (
            <>
                <div style={{ backgroundColor: "lightgray", height: "100%" }}>
                    <div style={{ display: 'flex', paddingTop: '70px' }}>

                        <div className="row" style={{ margin: '20px', width: "100%" }}>

                            <div className="col p0">
                                <div className="mgBottom20 centerAlignItems" style={{ backgroundColor: "white", borderRadius: "10px", boxShadow: "0px 0px 20px -4px gray", padding: "20px" }}>
                                    <h4 className="bold darkGray mgRight5 mg0 inline">{this.state.currentDate.format('LL')}</h4>
                                    <p className="lightGray bolder mg0 inline">({this.state.currentDate.format('LL') === moment().format('LL') ? "today" : this.state.currentDate.fromNow()})</p>
                                </div>

                                <div style={{ backgroundColor: "white", borderRadius: "10px", boxShadow: "0px 0px 20px -4px gray", padding: "10px" }}>
                                    <p className="bold darkGray mg10">Event Details</p>
                                    <hr className="mg0" />
                                    {list}
                                </div>

                            </div>

                            <div className="col-md-8 p0">
                                <Calander currentDate={this.state.currentDate}
                                    rows={this.getRows}
                                    setNextMonth={this.setNextMonth}
                                    setPreviousMonth={this.setPreviousMonth}
                                    resetToCurrentDate={this.resetToCurrentDate}
                                    getCalanderDates={this.getCalanderDates}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default EventCalander;