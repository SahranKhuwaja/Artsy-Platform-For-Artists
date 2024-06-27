import React from 'react';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import { CirclePicker } from 'react-color';
import { Button } from 'reactstrap';
import { SketchField, Tools } from 'react-sketch';


//icons
import select from '../../assets/img/tools/select.svg';
import pencil from '../../assets/img/tools/pencil.svg';
import pan from '../../assets/img/tools/pan.svg';
import text from '../../assets/img/tools/text.svg';
import line from '../../assets/img/tools/line.svg';
import rectangle from '../../assets/img/tools/rectangle.svg';
import circle from '../../assets/img/tools/circle.svg';
import clear from '../../assets/img/tools/clear.svg';
import undo from '../../assets/img/tools/undo.svg';
import redo from '../../assets/img/tools/redo.svg';

const ToolKit = (props) => {
    return (
        <div className="darkCard mgTop20 colFlex" style={{ height: window.innerHeight - 220 }}>
            <div className="flex spaceBetween maxWidth">
                <button className="cleanButton toolBtn" onClick={() => props.changeTool(Tools.Select)}><img src={select} alt="Select" title="Select" className={props.tool === Tools.Select ? ' toolSelected' : 'tool'} /></button>
                <button className="cleanButton toolBtn" onClick={() => props.changeTool(Tools.Pencil)}><img src={pencil} alt="Pencil" title="Pencil" className={props.tool === Tools.Pencil ? ' toolSelected' : 'tool'} /></button>
                <button className="cleanButton toolBtn" onClick={() => props.changeTool(Tools.Pan)}><img src={pan} alt="Pan" title="Pan" className={props.tool === Tools.Pan ? ' toolSelected' : 'tool'} /></button>
                <button className="cleanButton toolBtn" onClick={() => props.typeText()}><img src={text} alt="Text" title="Text" className="tool" className={props.tool === 'text' ? ' toolSelected' : 'tool'} /></button>
                <button className="cleanButton toolBtn" onClick={() => props.changeTool(Tools.Line)}><img src={line} alt="Line" title="Line" className={props.tool === Tools.Line ? ' toolSelected' : 'tool'} /></button>
            </div>
            <div className="mgTop20 flex spaceBetween maxWidth">
                <button className="cleanButton toolBtn" onClick={() => props.changeTool(Tools.Circle)}><img src={circle} alt="Circle" title="Circle" className={props.tool === Tools.Circle ? ' toolSelected' : 'tool'} /></button>
                <button className="cleanButton toolBtn" onClick={() => props.changeTool(Tools.Rectangle)}><img src={rectangle} alt="Square" title="Square" className={props.tool === Tools.Rectangle ? ' toolSelected' : 'tool'} /></button>
                <button className="cleanButton toolBtn" onClick={() => props.undo()}><img src={undo} alt="Undo" title="Undo" className="tool" /></button>
                <button className="cleanButton toolBtn" onClick={() => props.redo()} ><img src={redo} alt="Redo" title="Redo" className="tool" /></button>
                <button className="cleanButton toolBtn" onClick={() => props.clearCanvas()}><img src={clear} alt="Clear Canvas" title="Clear Canvas" className="tool" /></button>
            </div>
            <div className="mgTop20 maxWidth">
                <p className="bolder mg0" >Line Weight</p>
                <RangeSlider
                    value={props.weight}
                    onChange={props.changeWeight}
                />
            </div>
            <div className="mgTop20 maxWidth" style={{ height: '100%' }}>
                <p className="bolder mg0" >Color Swatches</p>
                <div className="mgTop10" style={{ textAlign: 'center' }}>
                    <CirclePicker width='auto' onChange={props.changeColor.bind(this)} />
                </div>
            </div>
            <div>
                <Button className="maxWidth BlueButton" onClick={props.download.bind(this)}><i className="fa fa-cloud-download fa-lg mgRight5" /> Download</Button>
            </div>
        </div>
    )
}

export default ToolKit;