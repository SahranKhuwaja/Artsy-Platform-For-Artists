import React from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import { FormText, Modal, FormGroup, Label, InputGroup, Input, Button } from 'reactstrap';

const EducationModal = (props) => {
    return (
        <Modal isOpen={props.educationModalState} className="modal-lg">
            <div className="modal-header no-border-header text-center">
                <h3 className="modal-title text-center" style={{ fontWeight: "bold" }} >Add College</h3>
                <p className="lightGray bolder">Add your college details</p>
            </div>
            <div className="modal-body">
                <div className="form-row">
                    <FormGroup id="EducationStartDateG" style={{ marginRight: "5px", width: "49%" }} className={(props.Errors.StartDate === '' ? '' : 'has-danger')}>
                        <Label className="lightGray bolder" for="StartDate">Start Date:</Label>
                        <InputGroup disabled>
                            <Datetime id="StartDate" onChange={props.onChangeEducationStartDate} value={(props.Values.StartDate===''?'':moment(props.Values.StartDate).format('LL'))} dateFormat='MMMM D, YYYY' timeFormat={false} inputProps={{ placeholder: "Start Date" }} />
                        </InputGroup>
                        <FormText color="danger">
                            {props.Errors.StartDate}
                        </FormText>
                    </FormGroup>

                    <FormGroup id="EducationEndDateG" style={{ marginLeft: "5px", width: "49%" }} className={(props.Errors.EndDate === '' ? '' : 'has-danger')}>
                        <Label className="lightGray bolder" for="EndDate">End Date:</Label>
                        <InputGroup disabled>
                            <Datetime id="EndDate" onChange={props.onChangeEducationEndDate} value={(props.Values.EndDate===''?'':moment(props.Values.EndDate).format('LL'))} dateFormat='MMMM D, YYYY' timeFormat={false} inputProps={{ placeholder: "End Date" }} />
                        </InputGroup>
                        <FormText color="danger">
                            {props.Errors.EndDate}
                        </FormText>
                    </FormGroup>
                </div>

                <div className="form-row">
                    <FormGroup style={{ marginRight: "5px", width: "49%" }} className={(props.Errors.Institution === '' ? '' : 'has-danger')}>
                        <Label className="lightGray bolder" for="Institution">Institution Name:</Label>
                        <Input
                            type="text"
                            id="Institution"
                            placeholder="Enter Institution Name"
                            value={props.Values.Institution}
                            onChange={props.onChangeInstitution}
                        />
                        <FormText color="danger">
                            {props.Errors.Institution}
                        </FormText>
                    </FormGroup>
                    <FormGroup style={{ marginLeft: "5px", width: "49%" }} className={(props.Errors.Degree === '' ? '' : 'has-danger')}>
                        <Label className="lightGray bolder" for="Degree">Degree:</Label>
                        <Input
                            type="text"
                            id="Degree"
                            placeholder="Enter Degree"
                            value={props.Values.Degree}
                            onChange={props.onChangeDegree}
                        />
                        <FormText color="danger">
                            {props.Errors.Degree}
                        </FormText>
                    </FormGroup>
                </div>

                <div>
                    <FormGroup check>
                        <Label check>
                            <Input onChange={props.onChangeCurrentlyStudying} checked={props.Values.currentlyStudying} type="checkbox" id="currentlyWorking" />
                            <span className="form-check-sign">
                                <span className="check"></span>
                            </span>
                            <p className="lightGray bolder mg0">I currently study here</p>
                        </Label>
                    </FormGroup>
                </div>
                <div>
                    <Button onClick={props.AddEducation} color="info" style={{ width: "100px", marginLeft: "5px", float: "right" }}>Save</Button>
                    <Button onClick={props.cancelEducation} color="danger" style={{ width: "100px", marginRight: "5px", float: "right" }}>Cancel</Button>
                </div>
            </div>
            <div className="modal-footer no-border-footer">
                <br />
            </div>
        </Modal>
    )
}

export default EducationModal;