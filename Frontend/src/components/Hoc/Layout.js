import React from 'react';
import ProfileNavbar from '../Navbars/ProfileNavbar'
import ProfileSidebar from '../Navbars/ProfileSidebar';
import Chat from '../Chat/Chat';
import GeneralNotification from '../Notifications/General'
import ChatNotification from '../Notifications/Chat'
import RequestNotification from '../Notifications/Request'

const Layout = (props) => {

    let display = null;
    let chat = null;
    let notification = null;
    if (Object.keys(props.user).length !== 0) {
        if (props.chatTo !== undefined) {
            chat = (<div style={{ borderRadius: "10px 10px 0px 0px", position: "fixed", bottom: 0, right: "0", marginRight: "30px", zIndex: "2", boxShadow: "0px 0px 20px 0px gray" }}>
                <Chat chatTo={props.chatTo} chatId={props.activeChatId} endConversation={props.endConversation} user={props.user} messages={props.messages} />
            </div>)
        }

        switch (props.notificationType) {
            case 'G':
                notification = (
                    <div style={{ borderRadius: "10px", position: "fixed", top: 0, right: 0, marginTop: "65px", marginRight: "50px", zIndex: "3", boxShadow: "0px 0px 10px 0px gray" }}>
                        <GeneralNotification generalNotification={props.generalNotifcations} />
                    </div>
                )
                break;
            case "C":
                notification = (
                    <div style={{ borderRadius: "10px", position: "fixed", top: 0, right: 0, marginTop: "65px", marginRight: "50px", zIndex: "3", boxShadow: "0px 0px 10px 0px gray" }}>
                        <ChatNotification chats={props.chats} startConversation={props.startConversation} userId={props.user._id} />
                    </div>
                )
                break;
            case "R":
                notification = (
                    <div style={{ borderRadius: "10px", position: "fixed", top: 0, right: 0, marginTop: "65px", marginRight: "50px", zIndex: "3", boxShadow: "0px 0px 10px 0px gray" }}>
                        <RequestNotification seenBookingRequests={props.seenBookingRequests} bookingRequests={props.bookingRequests} userRole={props.user.Role} />
                    </div>
                )
                break;
            default: break;
        }

        display = (
            <>
                <div style={{ position: "relative", width: "100%", zIndex: "2", boxShadow: "0px 0px 20px 0px gray" }}>
                    <ProfileNavbar
                        toggleSidebar={props.toggleSidebar.bind(this)}
                        user={props.user}
                        requestsCount={props.requestsCount}
                        unReadMessagesCount={props.unReadMessagesCount}
                        notificationCount={props.notificationCount}
                        setNotificationGeneral={props.setNotificationGeneral}
                        setNotificationChat={props.setNotificationChat}
                        setNotificationRequest={props.setNotificationRequest}
                        resetNotification={props.resetNotification}
                    />
                </div>
                <div style={{ paddingTop: '70px', position: 'sticky', top: 0, float: 'left', boxShadow: "0px 0px 20px 0px gray" }}>
                    <ProfileSidebar
                        signOut={props.signOut}
                        sidebarCollapse={props.sidebarCollapse}
                        RedirectToBookingRequests={props.RedirectToBookingRequests}
                        RedirectToEventCalendar={props.RedirectToEventCalendar}
                        RedirectToTransaction={props.RedirectToTransaction}
                        RedirectToNewsfeed={props.RedirectToNewsfeed}
                        RedirectToRecommendation={props.RedirectToRecommendation}
                        Role={props.user.Role}
                        RedirectToCanvas={props.RedirectToCanvas}
                        user={props.user}
                    />
                </div>
                {chat}
                {notification}
            </>
        )
    }
    return (
        <>
            {!window.location.pathname.startsWith('/Canvas/') && display}
            <main> {props.children} </main>
        </>
    )
}

export default Layout;