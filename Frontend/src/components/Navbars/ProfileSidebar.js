import React from 'react';
import { ProSidebar, Menu, MenuItem, SidebarContent, SidebarFooter, SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

const ProfileSidebar = (props) => {

    let Features;

    if (props.Role === 'Artist') {

        Features = (
            <Menu iconShape="none">

                {/* <MenuItem icon={<i className="fa fa-book" />} >Artist Booklet</MenuItem> */}
                <MenuItem icon={<i className="fa fa-envelope" />} onClick={props.RedirectToBookingRequests}>Booking Requests</MenuItem>
                <MenuItem icon={<i className="fa fa-calendar" />} onClick={props.RedirectToEventCalendar}>Event Calendar</MenuItem>
                <MenuItem icon={<i className="fa fa-credit-card" />} onClick={props.RedirectToTransaction}>Transactions</MenuItem>
                <MenuItem icon={<i className="fa fa-paint-brush" />} onClick={props.RedirectToCanvas}>Canvas</MenuItem>

            </Menu>
        )


    } else if (props.Role === 'Client') {
        Features = (
            <Menu iconShape="none">

                <MenuItem icon={<i className="fa fa-envelope" />} onClick={props.RedirectToBookingRequests}>Booking Requests</MenuItem>
                <MenuItem icon={<i className="fa fa-calendar" />} onClick={props.RedirectToEventCalendar}>Events Calander</MenuItem>
                <MenuItem icon={<i className="fa fa-credit-card" />} onClick={props.RedirectToTransaction} >Transactions</MenuItem>
                <MenuItem icon={<i className="fa fa-paint-brush" />} onClick={props.RedirectToCanvas}>Canvas</MenuItem>

            </Menu>
        )
    }

    return (

        <div>
            <ProSidebar className={(props.sidebarCollapse ? "collapsed" : "")} >
                <SidebarHeader style={{ backgroundColor: "#0b1011", color: "white" }}>
                    <Menu iconShape="none">
                        <MenuItem icon={<i className="fa fa-newspaper-o" />} onClick={props.RedirectToNewsfeed}>Newsfeed</MenuItem>
                        <MenuItem icon={<i className="fa fa-users" />} onClick={props.RedirectToRecommendation}>Recommendations</MenuItem>

                    </Menu>
                </SidebarHeader>
                <SidebarContent style={{ backgroundColor: "#0b1011", color: "white" }}>
                    {Features}
                </SidebarContent>

                <SidebarFooter style={{ backgroundColor: "#0b1011", color: "white" }}>
                    <Menu iconShape="none">
                        <MenuItem icon={<i className="fa fa-cog" />}>Profile Settings</MenuItem>
                        <MenuItem icon={<i className="fa fa-sign-out" />} onClick={props.signOut}>Sign out</MenuItem>
                    </Menu>
                </SidebarFooter>
                <div style={{ width: "500px", height: "12px", backgroundColor: "#6494FF" }}></div>
            </ProSidebar>
        </div>
    )
}

export default ProfileSidebar;