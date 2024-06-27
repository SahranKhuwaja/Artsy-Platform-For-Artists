import React from 'react';
import Users from './Users';
import ToolKit from './Tools';
import { SketchField, Tools } from 'react-sketch';
import { Input } from 'reactstrap';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import url from '../../assets/data/url';
import socketioClient from 'socket.io-client';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

let socket = null;

class Canvas extends React.Component {
    constructor(props) {
        super(props)
        const CANVAS_HEIGHT = (window.innerHeight - 40)
        this.state = {
            chatTo: {},
            chatFrom: {},
            weight: 10,
            tool: Tools.Pencil,
            lineColor: '#f44336',
            activeText: false,
            // ready: false
        }
    }

    canvasRef = undefined;

    // componentDidMount = async () => {

    //    if(this.props.user!==undefined){
    //        this.setState({
    //            ready:true
    //        })
    //    }

    // }

    changeWeight = (input) => {
        this.setState({
            weight: input.target.value
        })
    }

    changeTool = (tool) => {
        this.setState({
            tool, activeText: false
        })
    }

    changeColor = (color) => {
        this.setState({
            lineColor: color.hex
        })
    }

    clearCanvas = () => {
        this.canvasRef.clear()
    }

    undo = () => {
        this.canvasRef.undo()
    }

    redo = () => {
        this.canvasRef.redo()
    }

    typeText = () => {
        this.setState({
            activeText: true,
            tool: 'text',
        })
    }

    changeText = (input) => {
        this.setState({
            text: input.target.value
        })
    }

    addText = () => {
        if (this.state.text !== '') {
            this.canvasRef.addText(this.state.text)
            this.setState({ text: '' })
        }
    }

    download = () => {
        const data = this.canvasRef.toDataURL();
        //let win = window.open();
        //win.document.write('<iframe src="' + data  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
        const link = document.createElement('a');
        link.href = data;
        link.download = 'Sketch.png';
        link.click()
    }

    render() {
        // if (!this.state.ready) {
        //     return <Loader type="Grid" color="black" height={500} style={{ textAlign: 'center', marginTop: '50px' }} />
        // }
        return (
            <div className="flex coverScreen p20" style={{ height: window.innerHeight }}>
                <div style={{ width: '25%' }}>
                    
                    <Users user={this.props.user} />
                    <ToolKit
                        weight={this.state.weight}
                        changeWeight={this.changeWeight}
                        tool={this.state.tool}
                        changeTool={this.changeTool}
                        changeColor={this.changeColor}
                        clearCanvas={this.clearCanvas}
                        undo={this.undo}
                        redo={this.redo}
                        addText={this.addText}
                        download={this.download}
                        activeText={this.state.activeText}
                        typeText={this.typeText}
                    />
                </div>
                <div className="whiteCard mgLeft20 canvas">
                    <div className="darkCard brandContainer">
                        <p className="brand"><i className="fa fa-paint-brush fa-sm" /> ARTSY</p>
                    </div>
                    {this.state.activeText &&
                        <div className="canvas-inputContainer">
                            <Input placeholder="Enter text here" className="canvas-input bolder" value={this.state.text} onChange={this.changeText} />
                            <button className="cleanButton canvasTextBtn" onClick={this.addText}>
                                <i className="fa fa-arrow-circle-right tool fa-2x" title="Add Text" />
                            </button>
                        </div>
                    }
                    <SketchField
                        width='100%'
                        height='100%'
                        tool={this.state.tool === 'text' ? Tools.Select : this.state.tool}
                        lineColor={this.state.lineColor}
                        lineWidth={this.state.weight}
                        ref={e => this.canvasRef = e}
                        backgroundColor="#ffffff"
                    />
                </div>
            </div>
        )
    }
}

export default Canvas