import React from 'react';
import {FormText, Modal, FormGroup, Label, Input, Button } from 'reactstrap';

const SkillModal = (props) => {
    return (
        <Modal isOpen={props.skillModalState} className="modal-lg">
            <div className="modal-header no-border-header text-center">
                <h3 className="modal-title text-center" style={{ fontWeight: "bold" }} >Add Professional Skill</h3>
                <p className="lightGray bolder">Add your professional skill</p>
            </div>
            <div className="modal-body">

                <div className="form-row">
                    <FormGroup style={{ marginRight: "5px", width: "49%" }} className={(props.Errors.Skill===''?'':'has-danger')}>
                        <Label className="lightGray bolder" for="Skill">Professional Skill:</Label>
                        <Input
                            type="text"
                            id="Skill"
                            placeholder="Enter Professional Skill"
                            value={props.Values.Skill}
                            onChange={props.onChangeSkill}
                        />
                        <FormText color="danger">
                            {props.Errors.Skill}
                        </FormText>
                    </FormGroup>
                    <FormGroup style={{ marginLeft: "5px", width: "49%" }} className={(props.Errors.Description===''?'':'has-danger')}>
                        <Label className="lightGray bolder" for="Description">Description:</Label>
                        <Input
                            type="text"
                            id="Description"
                            placeholder="Enter Description"
                            value={props.Values.Description}
                            onChange={props.onChangeSkillDescription}
                        />
                        <FormText color="danger">
                            {props.Errors.Description}
                        </FormText>
                    </FormGroup>
                </div>

                <div>
                    <Button onClick={props.AddProfessionalSkill} color="info" style={{ width: "100px", marginLeft: "5px", float: "right" }}>Save</Button>
                    <Button onClick={props.cancelProfessionalSkill} color="danger" style={{ width: "100px", marginRight: "5px", float: "right" }}>Cancel</Button>
                </div>
            </div>
            <div className="modal-footer no-border-footer">
                <br />
            </div>
        </Modal>
    )
}

export default SkillModal;