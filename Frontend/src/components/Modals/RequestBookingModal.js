import React from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import currency from '../../assets/data/currency';
import { FormText, Modal, FormGroup, Label, InputGroup, Input, Button } from 'reactstrap';

const RequestBookingModal = (props) => {
    return (
        <Modal isOpen={props.DisplayRequestModal} className="modal-lg">
            <div className="modal-header no-border-header text-center">
                <h3 className="modal-title text-center" style={{ fontWeight: "bold" }} >Send Booking Request</h3>
                <p className="lightGray bolder">Enter Booking Details</p>
            </div>
            <div className="modal-body">
                <div className="form-row">
                    <FormGroup style={{ marginRight: "5px", width: "49%" }} className={(props.Errors.StartDate === '' ? '' : 'has-danger')}>
                        <Label className="lightGray bolder" for="StartDate">Start Date:</Label>
                        <InputGroup disabled>
                            <Datetime id="StartDate" onChange={props.onChangeStartDate} value={(props.Values.StartDate === '' ? '' : moment(props.Values.StartDate).format('LL'))} dateFormat='MMMM D, YYYY' timeFormat={false} inputProps={{ placeholder: "Start Date" }} />
                        </InputGroup>
                        <FormText color="danger">
                            {props.Errors.StartDate}
                        </FormText>
                    </FormGroup>

                    <FormGroup style={{ marginLeft: "5px", width: "49%" }} className={(props.Errors.EndDate === '' ? '' : 'has-danger')}>
                        <Label className="lightGray bolder" for="EndDate">End Date:</Label>
                        <InputGroup disabled>
                            <Datetime id="EndDate" onChange={props.onChangeEndDate} value={(props.Values.EndDate === '' ? '' : moment(props.Values.EndDate).format('LL'))} dateFormat='MMMM D, YYYY' timeFormat={false} inputProps={{ placeholder: "End Date" }} />
                        </InputGroup>
                        <FormText color="danger">
                            {props.Errors.EndDate}
                        </FormText>
                    </FormGroup>
                </div>

                <div className="form-row">
                    <FormGroup style={{ marginRight: "5px", width: "49%" }} className={(props.Errors.Venue === '' ? '' : 'has-danger')}>
                        <Label className="lightGray bolder" for="Venue">Venue:</Label>
                        <Input
                            type="text"
                            id="Venue"
                            placeholder="Enter Venue"
                            value={props.Values.Venue}
                            onChange={props.onChangeVenue}
                        />
                        <FormText color="danger">
                            {props.Errors.Venue}
                        </FormText>
                    </FormGroup>
                    <FormGroup style={{ marginLeft: "20px", width: "45%" }} className={(props.Errors.PaymentAmount === '' ? '' : 'has-danger')}>
                        <Label className="lightGray bolder" for="PaymentAmount">Payment Amount:</Label>
                        <span className="row">
                            <Input className="col-sm-7" style={{width:"90%"}}
                                type="number"
                                id="PaymentAmount"
                                min="5"
                                step="5"
                                placeholder="Enter Payment Amount"
                                value={props.Values.PaymentAmount}
                                onChange={props.onChangePaymentAmount}
                            />
                            <Input className="col-sm-4" type="select" style={{ marginLeft:"10px"}}>
                                {currency.map((e,i)=>{
                                    return <option key={Math.random()+i} value={e.code}>{e.code}</option>
                                })}
                            </Input>
                        </span>

                        <FormText color="danger">
                            {props.Errors.PaymentAmount}
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
                    <Button onClick={props.sendRequest} color="info" style={{ width: "100px", marginLeft: "5px", float: "right" }}>Save</Button>
                    <Button onClick={props.cancelRequest} color="danger" style={{ width: "100px", marginRight: "5px", float: "right" }}>Cancel</Button>
                </div>
            </div>
            <div className="modal-footer no-border-footer">
                <br />
            </div>
        </Modal>
    )
}

export default RequestBookingModal;