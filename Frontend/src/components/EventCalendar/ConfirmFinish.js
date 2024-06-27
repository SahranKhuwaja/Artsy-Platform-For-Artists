import { Modal, Button } from 'reactstrap';

const ConfirmFinish = (props) => {
    return (
        <Modal isOpen={props.ConfirmModal} className="modal-md">
            <div className="modal-header no-border-header text-center">
                <h3 className="modal-title text-center" style={{ fontWeight: "bold" }} >Confirm Finish</h3>
                <br />
                <p className="lightGray bolder">This action will finish booking, you cannot undo afterwards.
                <br />Are you sure you want to finish?</p><br />
                <Button onClick={props.Finish} style={{ width: '150px' }} className="mgRight5" color="info">Yes, confirm</Button>
                <Button onClick={props.toggleConfirm} style={{ width: '150px' }} className="mgLeft5" color="danger">No, wait</Button>
            </div>
            <div className="modal-footer no-border-footer">
                <br />
            </div>
        </Modal>
    )
}

export default ConfirmFinish;