import React from 'react';
import { Input, Alert } from 'reactstrap';
import avatar from '../../assets/img/default-avatar.png';
import back from '../../assets/img/chat2.png';
import socketioClient from 'socket.io-client';
import moment from 'moment';
import axios from 'axios';
import Filter from 'bad-words';
import Picker from 'emoji-picker-react';
import url from "../../assets/data/url";
import clientUrl from "../../assets/data/clientUrl";
let socket = null;
const filter = new Filter();

axios.defaults.withCredentials = true;

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isCollapsed: false,
            message: '',
            errorType: '',
            error: '',
            visible: false,
            showEmoji: false
        }
    }

    scrollBarDiv = undefined;
    attach = undefined;

    toggleCollapse = () => {
        this.setState({
            isCollapsed: !this.state.isCollapsed
        })
    }

    componentDidMount = async () => {
        socket = socketioClient(url);

    }

    onTyping = (event) => {
        this.setState({
            message: event.target.value
        })
    }

    handleKeyPress = async (event) => {
        if (this.state.message !== '') {
            if (event.key === 'Enter') {
                if (filter.isProfane(this.state.message)) {
                    this.setState({
                        errorType: 'Language Error!',
                        error: 'Inappropriate Language!',
                        visible: true
                    })
                } else {
                    socket.emit('message', { to: this.props.chatTo._id, from: this.props.user._id, message: this.state.message });
                    this.setState({
                        message: await ''
                    })
                }

            }

        }
    }

    scrollToBottom = () => {
        if (this.scrollBarDiv !== null) {
            this.scrollBarDiv.scrollTop = this.scrollBarDiv.scrollHeight;
        }
    }

    componentDidUpdate = () => {

        this.scrollToBottom()
    }

    linkAtach = (input) => {
        this.attach = input;
    }

    triggerUpload = () => {
        this.attach.click();
    }

    attachment = async (files) => {

        const filesArray = [...files.target.files];
        const fd = new FormData();
        for (let i = 0; i < filesArray.length; i++) {
            const check = this.checkFileType(filesArray[i].name.split('.')[1]);
            if (!check) {
                this.setState({
                    errorType: 'Attachment Error!',
                    error: await 'File is not supported!',
                    visible: await true
                })
                this.attach.value = "";
                return false;
            }
            fd.append('File', filesArray[i])
        }
        const attachmentSend = await axios.post(`${url}chat/attachment`, fd);
        if (attachmentSend.data.files) {
            socket.emit('message', { to: this.props.chatTo._id, from: this.props.user._id, attachments: attachmentSend.data.files });
            this.attach.value = "";
        }


    }

    checkFileType = (split) => {

        if (split === 'jpg' || split === 'jpeg' || split === 'png' || split === 'jfif' || split === 'pdf'
            || split === 'doc' || split === 'docx' || split === 'txt') {
            return true;
        }
        return false;
    }

    toggleVisible = () => {

        const { visible } = this.state;
        this.setState({
            visible: !visible,
        })
    }

    download = (url) => {
        const win = window.open(url, '_blank');
        win.focus();
    }

    toggleShowEmoji = () => {
        this.setState({
            showEmoji: !this.state.showEmoji
        })
    }

    onEmojiClick = (event, emojiObject) => {
        this.setState({
            message: this.state.message + emojiObject.emoji
        })
    };

    openCanvas = () => {
        let canvas = window.open(clientUrl + 'Canvas/')
        // canvas.users = { chatFrom: this.props.user, chatTo: this.props.chatTo }
    }

    render() {
        const collapsed = (
            <div style={{ width: "350px" }}>
                <div onClick={this.toggleCollapse} style={{ padding: "10px", borderRadius: "10px 10px 0px 0px", backgroundColor: "#0b1011", color: "white", height: "50px" }}>
                    <span style={{ marginLeft: '10px', fontSize: "18px", fontWeight: "bold", textTransform: "capitalize", color: "white" }}>
                        {this.props.chatTo.FirstName} {this.props.chatTo.LastName}
                        <button className="chat-btn-hover fRight" onClick={this.props.endConversation} >
                            <i className="fa fa-times" />
                        </button>
                    </span>
                </div>
            </div>
        )



        const open = (
            <div style={{ width: "350px", height: "420px" }}>
                <div onClick={this.toggleCollapse} style={{ padding: "10px", borderRadius: "10px 10px 0px 0px", backgroundColor: "#0b1011", color: "white", height: "50px" }}>
                    <span style={{ marginLeft: '10px', fontSize: "18px", fontWeight: "bold", textTransform: "capitalize", color: "white" }}>
                        {this.props.chatTo.FirstName} {this.props.chatTo.LastName}
                        <button className="chat-btn-hover fRight" onClick={this.props.endConversation} >
                            <i className="fa fa-times" />
                        </button>
                    </span>
                </div>

                <div style={{ backgroundColor: "white", height: "310px", }}>
                    <div style={{ overflowY: 'scroll', padding: "10px", background: "url(" + back + ")", height: "310px" }} id="chatBody"
                        ref={(e) => this.scrollBarDiv = e}>

                        <div className="systemChat" >Start a conversation</div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {this.props.messages.map((e, i) => {
                                if (e.MessageTo.toString() === this.props.user._id.toString()) {
                                    return (
                                        <div key={Math.random() + i}>
                                            <div className="receive" style={{ display: "flex" }}>
                                                <div>
                                                    <img className="avatar-small mg5" alt="avatar"
                                                        src={this.props.chatTo.DP !== undefined ? `data:image/png;base64,${Buffer.from(this.props.chatTo.DP).toString('base64')}`
                                                            : avatar} />
                                                </div>
                                                <div>

                                                    <div className="message" >
                                                        {e.Message !== undefined ?
                                                            e.Message :
                                                            e.AttachmentType.split('/')[0] === 'image' ?
                                                                <img alt="attachment" src={`${url}chat/attachment/${e.AttachmentId}/${e.FileName}`} style={{ width: '230px', height: 'auto', marginBottom: '5px', marginTop: '5px', borderRadius: '5%' }} />
                                                                :
                                                                <div style={{ display: 'flex', width: '230px', height: 'auto', marginBottom: '5px', marginTop: '5px', borderRadius: '5%', flexDirection: "row" }}>
                                                                    {
                                                                        e.AttachmentType.split('/')[1] === 'pdf' ?
                                                                            <i className="fa fa-file-pdf-o" style={{ fontSize: '36px', color: 'red' }} />
                                                                            :
                                                                            e.AttachmentType.split('/')[1] === 'plain' ?
                                                                                <i className="fa fa-file-text-o" style={{ fontSize: '36px', color: 'black' }} />
                                                                                :
                                                                                <i className="fa fa-file-word-o" style={{ fontSize: '36px', color: 'darkblue' }} />
                                                                    }
                                                                    <h6 style={{ marginLeft: '20px', textDecoration: 'underline', wordBreak: 'break-all', cursor: 'pointer', textTransform: 'lowercase' }}
                                                                        onClick={this.download.bind(this, `${url}chat/attachment/${e.AttachmentId}/${e.FileName}`)}>{e.FileName}</h6>
                                                                </div>

                                                        }
                                                    </div>

                                                    <div style={{ color: 'black', fontSize: '10px', fontWeight: 'bold', float: 'right', margin: '5px', marginTop: '-4px' }}> {moment(e.createdAt).format('LT')} </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                else {
                                    return (
                                        <div style={{ float: 'right' }} key={Math.random() + i}>
                                            <div className="send" style={{ display: "flex", float: 'right' }}>
                                                <div>
                                                    <div className="message" >
                                                        {e.Message !== undefined ?
                                                            e.Message :
                                                            e.AttachmentType.split('/')[0] === 'image' ?
                                                                <img alt="attachment" src={`${url}chat/attachment/${e.AttachmentId}/${e.FileName}`} style={{ width: '230px', height: 'auto', marginBottom: '5px', marginTop: '5px', borderRadius: '5%' }} />
                                                                :
                                                                <div style={{ display: 'flex', width: '230px', height: 'auto', marginBottom: '5px', marginTop: '5px', borderRadius: '5%', flexDirection: "row" }}>
                                                                    {
                                                                        e.AttachmentType.split('/')[1] === 'pdf' ?
                                                                            <i className="fa fa-file-pdf-o" style={{ fontSize: '36px', color: 'red' }} />
                                                                            :
                                                                            e.AttachmentType.split('/')[1] === 'plain' ?
                                                                                <i className="fa fa-file-text-o" style={{ fontSize: '36px', color: 'black' }} />
                                                                                :
                                                                                <i className="fa fa-file-word-o" style={{ fontSize: '36px', color: 'darkblue' }} />
                                                                    }
                                                                    <h6 style={{ marginLeft: '20px', textDecoration: 'underline', wordBreak: 'break-all', cursor: 'pointer', textTransform: 'lowercase' }}
                                                                        onClick={this.download.bind(this, `${url}chat/attachment/${e.AttachmentId}/${e.FileName}`)}>{e.FileName}</h6>
                                                                </div>

                                                        }
                                                    </div>
                                                    <div style={{ color: 'black', fontSize: '9px', fontWeight: 'bold', float: 'right', margin: '5px', marginTop: '-4px' }}> {moment(e.createdAt).format('LT')} </div>
                                                </div>
                                                <div>
                                                    <img className="avatar-small mg5" alt="avatar"
                                                        src={this.props.user.DP !== undefined ? `data:image/png;base64,${Buffer.from(this.props.user.DP).toString('base64')}`
                                                            : avatar} />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>

                    </div>
                </div>

                <div style={{ display: "flex", padding: "10px", backgroundColor: "#0b1011", color: "white", height: "60px" }}>
                    <button className="chat-btn-hover fs18 mg5" style={{ marginRight: "7px" }} onClick={this.openCanvas} >
                        <i className="fa fa-paint-brush" />
                    </button>

                    <Input type="text" placeholder="Type your message" style={{ color: "black", width: '200px', marginRight: "10px" }}
                        onKeyPress={this.handleKeyPress} value={this.state.message} onChange={this.onTyping.bind(this)} />

                    <button className="chat-btn-hover fs18 mg5" onClick={this.triggerUpload}><i className="fa fa-paperclip" /></button>

                    <button className="chat-btn-hover fs18 mg5" style={{ marginRight: "7px" }} onClick={this.toggleShowEmoji}><i className="fa fa-smile-o" /></button>

                    <input type="file" name="attachment" id="attach" ref={(input) => this.attach = input}
                        onChange={this.attachment.bind(this)} multiple hidden />
                </div>
            </div>
        )
        let error = null;
        if (this.state.error !== '') {
            error = (
                <Alert color="danger" isOpen={this.state.visible} toggle={this.toggleVisible} style={{ marginBottom: '0px' }} >
                    <b>{this.state.errorType}</b> {this.state.error}
                </Alert>
            )
        }
        return (
            <div>
                { this.state.showEmoji &&
                    <div style={{ bottom: 0, right: 0, zIndex: 10, position: 'absolute', marginBottom: '60px' }}>
                        <Picker onEmojiClick={this.onEmojiClick} disableSearchBar={true} pickerStyle={{
                            boxShadow: 'grey 0px 0px 10px 0px', border: 'none', width: '340px', margin: '5px', height: '300px'
                        }} />
                    </div>
                }

                {this.state.isCollapsed ? collapsed : open}
                {error}
            </div>
        )
    }
}

export default Chat;