import React from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import { FormText, Modal, FormGroup, Label, InputGroup, Input, Button } from 'reactstrap';

const WorkModal = (props) => {
    return (
        <Modal isOpen={props.workModalState} className="modal-lg">
            <div className="modal-header no-border-header text-center">
                <h3 className="modal-title text-center" style={{ fontWeight: "bold" }} >Add Work</h3>
                <p className="lightGray bolder">Add your work details</p>
            </div>
            <div className="modal-body">
                <div className="form-row">
                    <FormGroup id="StartDateG" style={{ marginRight: "5px", width: "49%" }} className={(props.Errors.StartDate === '' ? '' : 'has-danger')}>
                        <Label className="lightGray bolder" for="StartDate">Start Date:</Label>
                        <InputGroup disabled>
                            <Datetime id="StartDate" onChange={props.onChangeWorkStartDate} value={(props.Values.StartDate===''?'':moment(props.Values.StartDate).format('LL'))} dateFormat='MMMM D, YYYY' timeFormat={false} inputProps={{ placeholder: "Start Date" }} />
                        </InputGroup>
                        <FormText color="danger">
                            {props.Errors.StartDate}
                        </FormText>
                    </FormGroup>

                    <FormGroup id="EndDateG" style={{ marginLeft: "5px", width: "49%" }} className={(props.Errors.EndDate === '' ? '' : 'has-danger')}>
                        <Label className="lightGray bolder" for="EndDate">End Date:</Label>
                        <InputGroup disabled>
                            <Datetime id="EndDate" onChange={props.onChangeWorkEndDate} value={(props.Values.EndDate===''?'':moment(props.Values.EndDate).format('LL'))} dateFormat='MMMM D, YYYY' timeFormat={false} inputProps={{ placeholder: "End Date" }} />
                        </InputGroup>
                        <FormText color="danger">
                            {props.Errors.EndDate}
                        </FormText>
                    </FormGroup>
                </div>

                <div className="form-row">
                    <FormGroup id="CompanyG" style={{ marginRight: "5px", width: "49%" }} className={(props.Errors.CompanyName === '' ? '' : 'has-danger')}>
                        <Label className="lightGray bolder" for="Company">Company Name:</Label>
                        <Input
                            type="text"
                            id="Company"
                            placeholder="Enter Company Name"
                            value={props.Values.CompanyName}
                            onChange={props.onChangeCompanyName}
                        />
                        <FormText color="danger">
                            {props.Errors.CompanyName}
                        </FormText>
                    </FormGroup>
                    <FormGroup id="DesignationG" style={{ marginLeft: "5px", width: "49%" }} className={(props.Errors.Designation === '' ? '' : 'has-danger')}>
                        <Label className="lightGray bolder" for="Designation">Designation:</Label>
                        <Input
                            type="text"
                            id="Designation"
                            placeholder="Enter Designation"
                            value={props.Values.Designation}
                            onChange={props.onChangeDesignation}
                        />
                        <FormText color="danger">
                            {props.Errors.Designation}
                        </FormText>
                    </FormGroup>
                </div>

                <div>
                    <FormGroup check>
                        <Label check>
                            <Input onChange={props.onChangeCurrentlyWorking} value={props.Values.currentlyWorking} type="checkbox" id="currentlyWorking" />
                            <span className="form-check-sign">
                                <span className="check"></span>
                            </span>
                            <p className="lightGray bolder">I currently work here</p>
                        </Label>
                    </FormGroup>
                </div>
                <div>
                    <Button onClick={props.AddWork} color="info" style={{ width: "100px", marginLeft: "5px", float: "right" }}>Save</Button>
                    <Button onClick={props.cancelWork} color="danger" style={{ width: "100px", marginRight: "5px", float: "right" }}>Cancel</Button>
                </div>
            </div>
            <div className="modal-footer no-border-footer">
                <br />
            </div>
        </Modal>
    )
}

export default WorkModal;