const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const sessionStore = require('connect-mongo')(session)
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
const User = require('./models/user');
const Chat = require('./models/chat');
const BookingRequest = require('./models/bookingRequest');
const BookingProject = require('./models/bookingProject');
const Message = require('./models/message');
const Notification = require('./models/notification');


//Socket.io configuration
const app = express();
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        // origin: ["http://localhost:3000","http://artsy-dev.com"],
        origin:true,
        methods: ["GET", "POST"],
        credentials: true
    }
});
require('./db/mongoose');

//require routes
const sessionRouter = require('./routes/session');
const userRouter = require('./routes/user');
const bookingRequestRouter = require('./routes/bookingRequest');
const bookingProjectRouter = require('./routes/bookingProject');
const artistBookletRouter = require('./routes/artistBooklet');
const workRouter = require('./routes/work');
const educationRouter = require('./routes/education');
const skillRouter = require('./routes/skill');
const searchRouter = require('./routes/search');
const chatRouter = require('./routes/chat');
const ratingReviewRouter = require('./routes/ratingReview');
const notificationRouter = require('./routes/notification');
const postRouter = require('./routes/post');
const likeRouter = require('./routes/like');
const commentRouter = require('./routes/comment');
const visitRouter = require('./routes/visit');
const recommendationRouter = require('./routes/recommendation');
const transactionRouter = require('./routes/transaction');

//app configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    // origin: ["http://localhost:3000","http://artsy-dev.com"],
    origin:true,
    credentials: true,
}
));

//session
app.use(session({
    store: new sessionStore({ mongooseConnection: mongoose.connection }),
    name: 'sid',
    saveUninitialized: false,
    resave: false,
    secret: 'xn98dry924rxyd90ny1xm9xpnyr',
    maxAge: 86400000,
    cookie: { maxAge: 86400000, sameSite: true, secure: false, }
}))


//use routes
app.use('/session', sessionRouter);
app.use('/user', userRouter);
app.use('/bookingRequest', bookingRequestRouter);
app.use('/bookingProject', bookingProjectRouter);
app.use('/artistBooklet', artistBookletRouter);
app.use('/work', workRouter);
app.use('/education', educationRouter);
app.use('/skill', skillRouter);
app.use('/search', searchRouter);
app.use('/chat', chatRouter);
app.use('/ratingReview', ratingReviewRouter);
app.use('/notification', notificationRouter);
app.use('/post', postRouter);
app.use('/like', likeRouter);
app.use('/comment', commentRouter);
app.use('/visit', visitRouter);
app.use('/recommend', recommendationRouter);
app.use('/transaction', transactionRouter);

//Socket.io
const users = [];
io.on('connection', (socket) => {

    console.log('new connection');
    socket.on('newUser', (id) => {
        socket.userID = id;
        users[socket.userID] = socket;
    })

    socket.on('getMessages', async (data) => {

        const conversation = await Chat.findConversation({ User1: data.to, User2: data.from });
        if (Object.keys(conversation).length !== 0) {
            const messages = await Message.getMessages(conversation._id);
            io.to(users[data.from].id).emit('messages', { messages });
        }

    })

    socket.on('message', async (data) => {

        let conversation = await Chat.findConversation({ User1: data.to, User2: data.from });
        let UserData = {};
        if (Object.keys(conversation).length === 0) {
            conversation = await Chat.startConversation({
                User1: data.from, User2: data.to,
                LastMessage: data.message !== undefined ? data.message : 'Attachment'
            });
            UserData = await User.fetchUserData(mongoose.Types.ObjectId(data.from));
        } else {
            conversation = {
                ...conversation.toObject(), LastMessage: data.message !== undefined ? data.message : 'Attachment',
                LastMessageSeen: false
            };
            await Chat.updateConversation(conversation);
        }
        let msgObject = { ChatId: conversation._id, MessageTo: data.to, MessageFrom: data.from };

        if (data.message !== undefined) {
            msgObject.Message = data.message;
        } else {
            msgObject.Attachments = data.attachments;
        }

        const saveMessage = await Message.saveMessage(msgObject);

        if (users[data.to]) {
            io.to(users[data.to].id).emit('displayMessage', { message: await saveMessage, from: data.from, to: data.to, conversation, UserData });
            io.to(users[data.from].id).emit('displayMessage', { message: await saveMessage, from: data.from, to: data.to, conversation });
        } else {
            io.to(users[data.from].id).emit('displayMessage', { message: await saveMessage, from: data.from, to: data.to, conversation });
        }

    })

    socket.on('sendingBookingRequest', async (data) => {
        let bookingRequest = await BookingRequest.addBookingRequest(data);
        bookingRequest = await { ...bookingRequest.toObject(), ClientData: await User.fetchUserData(bookingRequest.Client) }
        if (users[data.Artist]) {
            io.to(users[data.Artist].id).emit('receiveBookingRequest', bookingRequest);
        }

    })

    socket.on('requestResponse', async (data) => {

        let bookingRequest = await BookingRequest.updateBookingRequest(data);
        if (data.Status === 'Accepted') {
            let bookingProject = await BookingProject.addBookingProject({
                BookingRequestId: bookingRequest._id
            })
        }

        bookingRequest = await { ...bookingRequest.toObject(), ArtistData: await User.fetchUserData(bookingRequest.Artist) }
        if (users[bookingRequest.Client]) {
            io.to(users[bookingRequest.Client].id).emit('receiveBookingResponse', bookingRequest);
        }
    })

    socket.on('bookingFinished', async (data) => {

        if (await BookingProject.FinishProject(data.ProjectId)) {

            let bookingRequest = await BookingRequest.fetchBookingRequestData(data.RequestId)
            const notify = new Notification({
                NotificationTo: bookingRequest.Client,
                NotificationFrom: bookingRequest.Artist,
                BookingRequestId: bookingRequest._id,
                Type: 'BF'
            })

            let notification = await notify.save();

            notification = { ...notification.toObject(), UserData: await User.fetchUserData(notification.NotificationFrom) }

            if (users[data.Client]) {
                io.to(users[data.Client].id).emit('receiveBookingFinished', notification);
            }
        }
    })

    socket.on('bookingReviewed', async (data) => {

        const notify = new Notification({
            NotificationTo: data.Artist,
            NotificationFrom: data.Client,
            ReviewId: data._id,
            Type: 'BR'
        })

        let notification = await notify.save();

        notification = { ...notification.toObject(), UserData: await User.fetchUserData(notification.NotificationFrom) }

        if (users[data.Artist]) {
            io.to(users[data.Artist].id).emit('receiveBookingReviewed', notification);
        }

    })

    socket.on('PostLike', async (data) => {
        const notify = new Notification({
            NotificationTo: data.NotificationTo,
            NotificationFrom: data.NotificationFrom,
            PostId: data.PostId,
            Type: 'PL'
        })

        let notification = await notify.save();

        notification = { ...notification.toObject(), UserData: await User.fetchUserData(notification.NotificationFrom) }

        if (users[data.NotificationTo]) {
            io.to(users[data.NotificationTo].id).emit('receivePostLike', notification);
        }
    })

    socket.on('PostComment', async (data) => {
        const notify = new Notification({
            NotificationTo: data.NotificationTo,
            NotificationFrom: data.NotificationFrom,
            PostId: data.PostId,
            Type: 'PC'
        })

        let notification = await notify.save();

        notification = { ...notification.toObject(), UserData: await User.fetchUserData(notification.NotificationFrom) }

        if (users[data.NotificationTo]) {
            io.to(users[data.NotificationTo].id).emit('receivePostComment', notification);
        }
    })

    socket.on('checlStatus',(users)=>{
        console.log(users)
    })

})


//server
const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log("Working...");
})