import React from 'react';
import { Modal, Button, Progress } from 'reactstrap';
import { AnimationWrapper } from 'react-hover-animation';
import url from '../../assets/data/url';

const ChangeCover = (props) => {
    let ModalData;
        ModalData = (
            <>
                <div className="modal-header no-border-header text-center">
                    <h3 className="modal-title text-center" style={{ fontWeight: "bold" }} >Edit Chapter</h3>
                    <p className="lightGray bolder">Change Cover Image</p>
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
                                        ...e.CoverImage ? { opacity: '0.6', transform: 'scale(' + 0.95 + ')' } : null
                                    }}
                                        onClick={props.updateCoverImage.bind(this, i)}>
                                        <img alt="Cover" src={`${url}artistBooklet/image/${e.ImageId}/${e.FileName}`} key={e._id} style={{
                                                width: '150px', height: '150px',
                                                borderRadius: '10%', objectFit: 'cover'
                                            }} />
                                    </AnimationWrapper>
                                ))

                            }
                        </div>
                    </div>

                    <div>
                        <Button onClick={props.saveCoverImage} color="info" style={{ width: "100px", marginLeft: "5px", float: "right" }}>Save</Button>
                        <Button onClick={props.cancelChangeCover} color="danger" style={{ width: "100px", marginRight: "5px", float: "right" }}>Cancel</Button>
                    </div>

                </div>
                <div className="modal-footer no-border-footer">
                    <br />
                </div>
            </>
        )
    return (
        <>
            <Modal isOpen={props.ChangeCoverImageModal} className="modal-lg">
                {ModalData}
            </Modal>
        </>
    )
}

export default ChangeCover;