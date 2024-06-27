import React from 'react';
import { FormText, Modal, FormGroup, Label, Input, Button, Progress } from 'reactstrap';
import { AnimationWrapper } from 'react-hover-animation';
import url from '../../assets/data/url';

const NewChapter = (props) => {
    let ModalData;

    if (props.Step === 1) {
        ModalData = (
            <>
                <div className="modal-header no-border-header text-center">
                    <h3 className="modal-title text-center" style={{ fontWeight: "bold" }} >{(props.Edit ? "Edit Chapter" : "Start A New Chapter")}</h3>
                    <p className="lightGray bolder">{(props.Edit ? "Edit" : "Add")} your chapter details</p>
                </div>
                <div className="modal-body">

                    <Progress striped max="4" value="1" barClassName="progress-bar-success" />
                    <br />

                    <div>
                        <FormGroup className={(props.Errors.Title === '' ? '' : 'has-danger')}>
                            <Label className="lightGray bolder" for="Title">Chapter Title</Label>
                            <Input
                                type="text"
                                id="Title"
                                placeholder="Enter Chapter Title"
                                value={props.Values.Title}
                                onChange={props.onChangeTitle}
                            />
                            <FormText color="danger">
                                {props.Errors.Title}
                            </FormText>
                        </FormGroup>
                    </div>

                    <div>
                        <FormGroup className={(props.Errors.Description === '' ? '' : 'has-danger')}>
                            <Label className="lightGray bolder" for="Description">Description</Label>
                            <Input
                                type="textarea"
                                id="Description"
                                placeholder="Enter Short Description"
                                value={props.Values.Description}
                                onChange={props.onChangeDescription}
                            />
                            <FormText color="danger">
                                {props.Errors.Description}
                            </FormText>
                        </FormGroup>
                    </div>

                    <div>
                        <Button onClick={props.nextStep} color="info" style={{ width: "100px", marginLeft: "5px", float: "right" }}>Next</Button>
                        <Button onClick={props.cancelNewChapter} color="danger" style={{ width: "100px", marginRight: "5px", float: "right" }}>Cancel</Button>
                    </div>

                </div>
                <div className="modal-footer no-border-footer">
                    <br />
                </div>
            </>
        )
    }
    else if (props.Step === 2) {
        ModalData = (
            <>
                <div className="modal-header no-border-header text-center">
                    <h3 className="modal-title text-center" style={{ fontWeight: "bold" }} >{(props.Edit ? "Edit Chapter" : "Start A New Chapter")}</h3>
                    <p className="lightGray bolder">Add Images</p>
                </div>
                <div className="modal-body">

                    <Progress striped max="4" value="2" barClassName="progress-bar-success" />
                    <br />
                    <div style={{ width: '100%', marginBottom: '10px' }}>
                        <Button onClick={props.triggerUpload}><i class="fa fa-upload"></i> Upload Images</Button>
                        <input type="file" multiple ref={props.linkUpload.bind(this)} onChange={props.displayUploadedImages.bind(this)} hidden />
                        {props.Errors.UploadedImages !== '' && <p style={{ color: 'red', fontWeight: 'bold' }}>{props.Errors.UploadedImages}</p>}
                        <div style={{ height: '210px', marginTop: '10px', overflow: 'hidden', overflowY: 'auto' }}>
                            {
                                props.Values.UploadedImages.length !== 0 &&
                                    props.Edit === false ?
                                    props.Values.UploadedImages.map(e => (
                                        <img alt="Uploaded" src={URL.createObjectURL(e)} key={Math.random() + Math.random()} style={{
                                            width: '150px', height: '150px', margin: '10px',
                                            borderRadius: '10%', objectFit: 'cover'
                                        }} />
                                    ))
                                    : [
                                        props.Values.UploadedImages.map(e => (
                                            <img alt="Uploaded 2" src={`${url}artistBooklet/image/${e.ImageId}/${e.FileName}`} key={e._id} style={{
                                                width: '150px', height: '150px', margin: '10px',
                                                borderRadius: '10%', objectFit: 'cover'
                                            }} />
                                        )),
                                        props.NewAddedImages.length !== 0 &&
                                        props.NewAddedImages.map(e => (
                                            <img alt="Uploaded 3" src={URL.createObjectURL(e)} key={Math.random() + Math.random()} style={{
                                                width: '150px', height: '150px', margin: '10px',
                                                borderRadius: '10%', objectFit: 'cover'
                                            }} />
                                        ))
                                    ]

                            }
                        </div>
                    </div>

                    <div>
                        {props.Edit === false ?
                            <Button onClick={props.nextStep} color="info" style={{ width: "100px", marginLeft: "5px", float: "right" }}>Next</Button>
                            :
                            <Button onClick={props.nextStep} color="info" style={{ width: "100px", marginLeft: "5px", float: "right" }}>Save</Button>
                        }
                        <Button onClick={props.prevStep} color="info" style={{ width: "100px", marginLeft: "5px", float: "right" }}>Back</Button>
                        <Button onClick={props.cancelNewChapter} color="danger" style={{ width: "100px", marginRight: "5px", float: "right" }}>Cancel</Button>
                    </div>

                </div>
                <div className="modal-footer no-border-footer">
                    <br />
                </div>
            </>
        )
    }
    else if (props.Step === 3 && props.Edit === false) {
        ModalData = (
            <>
                <div className="modal-header no-border-header text-center">
                    <h3 className="modal-title text-center" style={{ fontWeight: "bold" }} >{(props.Edit ? "Edit Chapter" : "Start A New Chapter")}</h3>
                    <p className="lightGray bolder">Select Cover Image</p>
                </div>
                <div className="modal-body">

                    <Progress striped max="4" value="3" barClassName="progress-bar-success" />
                    <br />
                    <div style={{ width: '100%', marginBottom: '10px' }}>
                        {props.Errors.CoverImage !== '' && <p style={{ color: 'red', fontWeight: 'bold' }}>
                            {props.Errors.CoverImage}</p>}
                        <div style={{
                            height: '210px', display: 'flex', overflowX: 'hidden', overflowY: 'auto',
                            flexFlow: 'wrap'
                        }}>
                            {
                                props.Values.UploadedImages.length !== 0 &&
                                props.Values.UploadedImages.map((e, i) => (
                                    <AnimationWrapper style={{
                                        width: '150px', height: '150px', margin: '10px', cursor: 'pointer', objectFit: 'cover',
                                        ...props.Values.CoverImage === i ? { opacity: '0.6', transform: 'scale(' + 0.95 + ')' } : null
                                    }}
                                        onClick={props.setCoverImage.bind(this, i)}>
                                        <img src={URL.createObjectURL(e)} alt="Uploaded" style={{
                                            width: '150px', height: '150px',
                                            borderRadius: '10%', objectFit: 'cover'
                                        }} />
                                    </AnimationWrapper>
                                ))

                            }
                        </div>
                    </div>

                    <div>
                        <Button onClick={props.nextStep} color="info" style={{ width: "100px", marginLeft: "5px", float: "right" }}>Save</Button>
                        <Button onClick={props.prevStep} color="info" style={{ width: "100px", marginLeft: "5px", float: "right" }}>Back</Button>
                        <Button onClick={props.cancelNewChapter} color="danger" style={{ width: "100px", marginRight: "5px", float: "right" }}>Cancel</Button>
                    </div>

                </div>
                <div className="modal-footer no-border-footer">
                    <br />
                </div>
            </>
        )
    }
    else {

    }

    return (
        <>
            <Modal isOpen={props.NewChapterModal} className="modal-lg">
                {ModalData}
            </Modal>
        </>
    )
}

export default NewChapter;