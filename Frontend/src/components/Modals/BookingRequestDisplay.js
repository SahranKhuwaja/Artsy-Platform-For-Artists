import React from 'react';
import { Modal } from 'reactstrap';
import AcceptRejectRequest from '../BookingRequest/AcceptRejectRequest';

const BookingRequestDisplay = (props) => {
    return (
        <Modal isOpen={true} className="modal-lg">
            <div className="modal-header no-border-header text-center">
                <button aria-label="Close" className="close" data-dismiss="modal" type="button">
                    <span aria-hidden={true}>×</span>
                </button>
            </div>
            <div className="modal-body">
                <AcceptRejectRequest />
            </div>
        </Modal>
    )
}

export default BookingRequestDisplay;

