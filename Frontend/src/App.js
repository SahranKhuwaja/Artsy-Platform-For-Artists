import { Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';
import Loader from 'react-loader-spinner';
import axios from 'axios';
import Layout from './components/Hoc/Layout';
import url from './assets/data/url';
import socketioClient from 'socket.io-client';
import { isArray } from 'lodash';
import { withRouter } from 'react-router';
import clientUrl from './assets/data/clientUrl';

import "./assets/css/bootstrap.min.css";
import "./assets/css/paper-kit.css";
import "./assets/demo/demo.css";
import "./assets/css/custom.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Main from './components/Account/Main';
import About from './components/Profile/Main';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import ResetPassword from './components/ForgetPassword/ResetPassword';
import Search from './components/Search/Search'
import VisitProfile from './components/VisitProfile/VisitProfile'
import ViewRequests from './components/BookingRequest/ViewRequests';
import ArtistBookletNewsfeed from './components/Newsfeed/ArtistBookletNewsfeed';
import Newsfeed from './components/Newsfeed/Newsfeed';
import EventCalendar from './components/EventCalendar/Main';
import Transaction from './components/Transaction/Main';
import Recommendation from './components/Recommendation/Main';
import Canvas from './components/Canvas/Canvas';
import TransactionRedirect from './components/Transaction/Redirect';
import Payment from './components/EventCalendar/Payment';

let socket = null;
axios.defaults.withCredentials = true;

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: {},
      sidebarCollapse: false,
      notificationType: '',
      bookingRequests: [],
      requestsCount: 0,
      chats: [],
      chatTo: undefined,
      messages: [],
      unReadMessagesCount: 0,
      generalNotifcations: [],
      notificationCount: 0,
      activeChatId: ''
    }
  }

  componentDidMount = () => {
    this.checkProfileStatus();
  }

  setNotificationGeneral = () => {
    if (this.state.notificationType === 'G') {
      this.resetNotification();
    }
    else {
      this.setState({
        notificationType: 'G'
      })
    }
  }

  setNotificationChat = () => {
    if (this.state.notificationType === 'C') {
      this.resetNotification();
    }
    else {
      this.setState({
        notificationType: 'C'
      })
    }
  }

  setNotificationRequest = () => {
    if (this.state.notificationType === 'R') {
      this.resetNotification();
    }
    else {
      this.setState({
        notificationType: 'R'
      })
    }
  }

  resetNotification = () => {
    this.setState({
      notificationType: ''
    })
  }

  checkProfileStatus = async () => {
    const user = await axios.get(`${url}user/profile/about`);
    if (user.data !== false) {
      this.setState({
        loading: false,
        user: user.data
      })

      this.getGeneralNotification();
      this.getGeneralNotificationCount();
      this.getBookingRequests();
      this.getRequestsCount();
      this.getConversations();
      this.unReadMessagesCount();
      socket = socketioClient(url);

      socket.emit('newUser', user.data._id);

      socket.on('displayMessage', (data) => {
        let messages = this.state.messages;
        let chats = [...this.state.chats];
        let unReadMessagesCount = this.state.unReadMessagesCount;

        if (this.state.chatTo !== undefined) {
          if (this.state.chatTo._id.toString() === data.to.toString() ||
            this.state.chatTo._id.toString() === data.from.toString()) {
            if (!isArray(data.message)) {
              messages = [...messages, data.message]
            } else {
              messages = [...messages, ...data.message]
            }
          }
        }

        let findChat = this.state.chats.findIndex(e => e._id.toString() === data.conversation._id.toString());
        if (findChat !== -1) {
          chats[findChat] = { ...data.conversation, UserData: chats[findChat].UserData, LastMessageSender: data.from }
          chats.splice(0, 0, chats.splice(findChat, 1)[0]);
        } else {
          chats.splice(0, 0, {
            ...data.conversation, UserData: this.state.chatTo !== undefined ?
              this.state.chatTo : data.UserData, LastMessageSender: data.from
          });
        }

        if (data.to.toString() === this.state.user._id.toString()) {
          unReadMessagesCount += 1;
        }

        this.setState({
          messages,
          chats,
          unReadMessagesCount
        })
      })

      socket.on('receiveBookingRequest', (data) => {
        this.setState({
          bookingRequests: [data, ...this.state.bookingRequests],
          requestsCount: this.state.requestsCount + 1,
        })
      })

      socket.on('receiveBookingResponse', (data) => {
        this.setState({
          bookingRequests: [data, ...this.state.bookingRequests],
          requestsCount: this.state.requestsCount + 1,
        })
      })

      socket.on('receiveBookingFinished', (data) => {
        this.setState({
          generalNotifcations: [data, ...this.state.generalNotifcations],
          notificationCount: this.state.notificationCount + 1,
        })
      })

      socket.on('receiveBookingReviewed', (data) => {
        this.setState({
          generalNotifcations: [data, ...this.state.generalNotifcations],
          notificationCount: this.state.notificationCount + 1,
        })
      })

      socket.on('receivePostLike', (data) => {
        this.setState({
          generalNotifcations: [data, ...this.state.generalNotifcations],
          notificationCount: this.state.notificationCount + 1,
        })
      })

      socket.on('receivePostComment', (data) => {
        this.setState({
          generalNotifcations: [data, ...this.state.generalNotifcations],
          notificationCount: this.state.notificationCount + 1,
        })
      })

      let sideB = document.getElementsByClassName("pro-sidebar")[0]
      if (sideB) {
        sideB.style.height = window.innerHeight - 70 + "px"
      }

    } else {
      this.setState({
        loading: false,
        user: {}
      })
    }

  }


  toggleSidebar = () => {
    this.setState({
      sidebarCollapse: !this.state.sidebarCollapse
    })
  }

  getBookingRequests = async () => {
    const request = await axios.get(`${url}bookingRequest/get?limit=5`);
    if (request.data.requests) {
      this.setState({
        bookingRequests: request.data.requests
      })
    }
  }

  seenBookingRequests = async (id) => {
    const request = await axios.post(`${url}bookingRequest/update/${id}`);
    if (request.data.requests) {
      this.getBookingRequests()
      this.getRequestsCount()
    }
  }

  getRequestsCount = async () => {
    const request = await axios.get(`${url}bookingRequest/getRequestsCount`);
    if (request.data.count) {
      this.setState({
        requestsCount: request.data.count
      })
    }
  }

  decrementRequestCount = async () => {
    this.setState({
      requestsCount: this.state.requestsCount - 1
    })
  }

  getConversations = async () => {
    const conversations = await axios.get(`${url}chat/conversations`);
    if (conversations.data.conversations) {
      this.setState({
        chats: conversations.data.conversations
      })
    }
  }

  unReadMessagesCount = async () => {
    const request = await axios.get(`${url}chat/getUnReadConversations`);
    if (request.data.count) {
      this.setState({
        unReadMessagesCount: request.data.count
      })
    }
  }

  startConversation = async (chatTo, id, LastMessageSender) => {
    this.setState({
      chatTo
    });
    socket.emit('getMessages', { to: chatTo._id, from: this.state.user._id });
    socket.on('messages', (data) => {
      this.setState({
        messages: data.messages
      })
    })

    if (id !== undefined) {
      if (LastMessageSender.toString() !== this.state.user._id.toString()) {
        const request = await axios.put(`${url}chat/update/${id}`, { LastMessageSeen: true });
        if (request.data) {
          const { chats } = this.state;
          const findIndex = await chats.findIndex(e => e._id.toString() === id.toString());
          chats[findIndex] = await { ...chats[findIndex], LastMessageSeen: true }
          this.setState({
            chats,
            unReadMessagesCount: this.state.unReadMessagesCount !== 0 ? this.state.unReadMessagesCount - 1 : 0
          })
          this.resetNotification()
        }
      }
      this.setState({
        activeChatId: id, notificationType: ''
      })
    }

  }

  endConversation = () => {
    this.setState({
      chatTo: undefined,
      messages: []
    })
  }

  getGeneralNotification = async () => {
    const notifications = await axios.get(`${url}notification/get?limit=5`);
    if (notifications.data) {
      this.setState({
        generalNotifcations: notifications.data
      })
    }
  }

  getGeneralNotificationCount = async () => {
    const notifications = await axios.get(`${url}notification/getNotificationCount`);
    if (notifications.data.count) {
      this.setState({
        notificationCount: notifications.data.count
      })
    }
  }

  signOut = async () => {
    const request = await axios.post(url + "session/signOut");
    if (request.data) {
      this.checkProfileStatus();
    }
  }

  RedirectToBookingRequests = () => {
    this.props.history.push('/Requests')
  }

  RedirectToEventCalendar = () => {
    this.props.history.push('/EventCalendar')
  }

  RedirectToTransaction = () => {
    this.props.history.push('/Transaction')
  }

  RedirectToRecommendation = () => {
    this.props.history.push('/Recommendation')
  }

  RedirectToNewsfeed = () => {
    this.props.history.push('/')
  }

  RedirectToCanvas = ()=>{
    let canvas = window.open(clientUrl + 'Canvas/')
  }

  render() {

    let display = (<Loader type="Grid" color="black" height={500} style={{ textAlign: 'center', marginTop: '50px' }} />)
    let routes = null;
    if (!this.state.loading) {
      if (Object.keys(this.state.user).length !== 0) {
        routes = (
          <Switch >
            <Route path='/Profile' exact render={() => <About user={this.state.user} status={this.checkProfileStatus} />} />
            <Route path='/Search' component={Search} />
            <Route path='/Requests' render={() => <ViewRequests userRole={this.state.user.Role} decrementRequestCount={this.decrementRequestCount} />} />
            <Route path='/Profile/:id/View' render={(props) => <VisitProfile startConversation={this.startConversation} {...props} user={this.state.user} />} />
            <Route path='/Booklet/:id' render={(props) => <ArtistBookletNewsfeed user={this.state.user} {...props} />} />
            <Route path='/EventCalendar' render={(props) => <EventCalendar {...props} user={this.state.user} />} />
            <Route path='/Transaction' render={() => <Transaction user={this.state.user} />} />
            <Route path='/Recommendation' render={() => <Recommendation user={this.state.user} />} />
            <Route path='/Canvas' render={(props) => <Canvas {...props} user={this.state.user}/>} />
            <Route path='/Payment/:id' render={(props)=><Payment {...props} user={this.state.user} />} />
            <Route path='/' render={() => <Newsfeed user={this.state.user} />} />
            {/* <Route from='/Transaction/Redirect' to='/Transaction' /> */}
            <Redirect from='*' to='/' />
          </Switch>
        )

      } else {
        routes = (
          <Switch>
            <Route path='/' exact render={() => <Main checkProfileStatus={this.checkProfileStatus} />} />
            <Route path='/ForgetPassword' component={ForgetPassword} />
            <Route path='/ResetPassword/:token' component={ResetPassword} />
            <Route path='/Transaction/Redirect' render={(props)=><TransactionRedirect {...props}/>} />
            <Redirect from='*' to='/' />
          </Switch>
        )
      }
      display = (
        <Layout
          signOut={this.signOut}
          user={this.state.user}
          toggleSidebar={this.toggleSidebar}
          sidebarCollapse={this.state.sidebarCollapse}
          history={this.history}

          bookingRequests={this.state.bookingRequests}
          requestsCount={this.state.requestsCount}
          generalNotifcations={this.state.generalNotifcations}
          notificationCount={this.state.notificationCount}

          chats={this.state.chats}
          chatTo={this.state.chatTo}
          messages={this.state.messages}
          startConversation={this.startConversation}
          unReadMessagesCount={this.state.unReadMessagesCount}
          endConversation={this.endConversation}
          activeChatId={this.state.activeChatId}

          setNotificationGeneral={this.setNotificationGeneral}
          setNotificationChat={this.setNotificationChat}
          setNotificationRequest={this.setNotificationRequest}

          seenBookingRequests={this.seenBookingRequests}

          resetNotification={this.resetNotification}
          notificationType={this.state.notificationType}

          RedirectToBookingRequests={this.RedirectToBookingRequests}
          RedirectToEventCalendar={this.RedirectToEventCalendar}
          RedirectToTransaction={this.RedirectToTransaction}
          RedirectToNewsfeed={this.RedirectToNewsfeed}
          RedirectToRecommendation={this.RedirectToRecommendation}
          RedirectToCanvas={this.RedirectToCanvas}
        >
          {routes}
        </Layout>
      )
    }

    return (<>{display}</>);
  }
}

export default withRouter(App);
