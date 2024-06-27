import React from 'react';
import { Button, Modal } from 'reactstrap';

const DetailModal = (props) => {
    return (
        <Modal isOpen={props.show} toggle={props.toggle} className="modal-lg">
            <div className="modal-header no-border-header text-center">
                <h3 className="modal-title text-center darkGray" style={{ fontWeight: "bold" }} >Transaction Detail</h3>
            </div>
            <div className="modal-body mgRight10 mgLeft10">
                <div className="flex spaceBetween">
                    <div>
                        <div className="flex">
                            <p className="mgRight5 bold darkGray">Project ID: </p>
                            <p className="bolder darkGray">{props.ProjectId}</p>
                        </div>
                        <div className="flex">
                            <p className="mgRight5 bold darkGray">Merchant ID: </p>
                            <p className="bolder darkGray">{props.MerChantId}</p>
                        </div>
                        <div className="flex">
                            <p className="mgRight5 bold darkGray">Paid To (Artist): </p>
                            <p className="bolder darkGray">{props.Artist?.FirstName} {props.Artist?.LastName}</p>
                        </div>
                        <div className="flex">
                            <p className="mgRight5 bold darkGray">Artist Email: </p>
                            <p className="bolder darkGray">{props.Artist?.Email}</p>
                        </div>

                    </div>
                    <div>
                        <div className="flex">
                            <p className="mgRight5 bold darkGray">Order ID: </p>
                            <p className="bolder darkGray">{props.OrderId}</p>
                        </div>
                        <div className="flex">
                            <p className="mgRight5 bold darkGray">Payer ID: </p>
                            <p className="bolder darkGray">{props.PayerId}</p>
                        </div>
                        <div className="flex">
                            <p className="mgRight5 bold darkGray">Paid From (Client): </p>
                            <p className="bolder darkGray">{props.Client?.FirstName} {props.Client?.LastName}</p>
                        </div>
                        <div className="flex">
                            <p className="mgRight5 bold darkGray">Client Email: </p>
                            <p className="bolder darkGray">{props.Client?.Email}</p>
                        </div>
                    </div>
                </div>
                <br />
                <div className="flex">
                    <p className="mgRight5 bold darkGray">Payer Email: </p>
                    <p className="bolder darkGray">{props.PayerEmail}</p>
                </div>
                <div className="flex">
                    <p className="mgRight5 bold darkGray">Payer Address: </p>
                    <p className="bolder darkGray">{props.PayerAddress}</p>
                </div>

                <br />
                <div>
                    <div className="flex spaceBetween">
                        <p className="bold darkGray">Transaction</p>
                        <p className="bold darkGray">Status: {props.Status}</p>
                    </div>
                    <table className="table">
                        <tr>
                            <th className="bold darkGray">Gross Ammount</th>
                            <th className="bold darkGray">Net Amount</th>
                            <th className="bold darkGray">Paypal Fees</th>
                            <th className="bold darkGray">Platform Fees</th>
                            <th className="bold darkGray">Currency</th>
                        </tr>
                        <tr>
                            <td className="bolder darkGray">{props.GrossAmount}</td>
                            <td className="bolder darkGray">{props.NetAmount}</td>
                            <td className="bolder darkGray">{props.PaypalFees}</td>
                            <td className="bolder darkGray">{props.PlatformFees}</td>
                            <td className="bolder darkGray">{props.Currency}</td>
                        </tr>
                    </table>
                </div>
                <div className="alignCenter">
                    <Button style={{width:'250px'}} color="info" onClick={props.toggle}>Close</Button>
                </div>
            </div>
        </Modal >
    )
}

export default DetailModal