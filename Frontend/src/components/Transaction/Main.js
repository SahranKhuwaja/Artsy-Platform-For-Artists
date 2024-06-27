import React from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import url from '../../assets/data/url';
import transaction from '../../assets/img/transaction.png';
import DetailModal from './Detail';

axios.defaults.withCredentials = true;

class Transaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            merchantDetails: {},
            transactions: [],
            DetailModal: false,
            DetailData: {}
        }

    }

    componentDidMount = async () => {
        if (this.props.user.Role === 'Artist') {
            this.getMerchantDetails();
            this.addMerchant();
        }
        this.getTransactions();
    }

    onBoardSellers = async () => {
        const onBoard = await axios.post(`${url}transaction/paypal/sellers/onBoard`);
        window.location = await `${onBoard.data.links[1].href}`;

    }


    getMerchantDetails = async () => {
        const request = await axios.get(`${url}transaction/paypal/sellers/merchant`);
        if (await request.data.merchant) {
            this.setState({
                merchantDetails: await request.data.merchant
            })
        }

    }

    addMerchant = async () => {
        const params = new URLSearchParams(window.location.search);
        if (Object.keys(this.state.merchantDetails).length === 0) {
            if (params.get('merchantId') !== undefined && params.get('merchantIdInPayPal') !== undefined) {
                const merchant = {
                    MerchantId: params.get('merchantId'), MerchantIdInPaypal: params.get('merchantIdInPayPal'),
                    AccountStatus: params.get('accountStatus')
                }
                const request = await axios.post(`${url}transaction/paypal/sellers/add/merchant`, merchant);
                if (request.data === true) {
                    this.setState({
                        merchantDetails: { UserId: this.props.user._id, ...merchant }
                    })
                }

            }
        }
    }

    getTransactions = async () => {
        const request = await axios.get(`${url}transaction/paypal/payments/invoice`);
        if (request.data.transactions) {
            this.setState({
                transactions: await request.data.transactions
            })
        }
    }

    closeDetail = () => {
        this.setState({
            DetailModal: false
        })
    }

    showDetail = (DetailData) => {
        this.setState({
            DetailData,
            DetailModal: true
        })
    }

    render() {
        let transactions = (
            <table class="table table-striped">
                <tr>
                    <th className="textCenter bold darkGray">#</th>
                    <th className="textCenter bold darkGray">Paid To (Artist)</th>
                    <th className="textCenter bold darkGray">Paid From (Client)</th>
                    <th className="textCenter bold darkGray">Gross Amount</th>
                    <th className="textCenter bold darkGray">Net Amount</th>
                    <th className="textCenter bold darkGray">Paypal Fees</th>
                    <th className="textCenter bold darkGray">Platform Fees</th>
                    <th className="textCenter bold darkGray">Currency</th>
                    <th className="textCenter bold darkGray"></th>
                </tr>
                <tbody>
                    {this.state.transactions.map((e, i) => (
                        <tr className="bolder darkgray">
                            <td className="textCenter bolder darkGray">{i + 1}</td>
                            <td className="textCenter bolder darkGray">{e.Artist.FirstName + ' ' + e.Artist.LastName}</td>
                            <td className="textCenter bolder darkGray">{e.Client.FirstName + ' ' + e.Client.LastName}</td>
                            <td className="textCenter bolder darkGray">{e.GrossAmount}</td>
                            <td className="textCenter bolder darkGray">{e.NetAmount}</td>
                            <td className="textCenter bolder darkGray">{e.PaypalFees}</td>
                            <td className="textCenter bolder darkGray">{e.PlatformFees}</td>
                            <td className="textCenter bolder darkGray">{e.Currency}</td>
                            <td className="textCenter bolder darkGray">
                                <Button onClick={() => this.showDetail(e)} color="info"
                                    className="p0 noBorder noEffect btn btn-outline-info">See Details</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table >
        )
        let body = (
            <div className="whiteCard mg20 alignCenter" style={{height: window.innerHeight - 110 }}>
                <h3 className="bold darkGray mgTop0 mgBottom10">Past Transactions</h3>
                <div style={{ overflow: 'auto' }}>
                    {transactions}
                </div>
            </div>
        );
        if (this.props.user.Role === 'Artist' && Object.keys(this.state.merchantDetails).length === 0) {
            body = (
                <div className="whiteCard mg20 alignCenter" style={{ width: '100%' }}>
                    <p className="bolder darkGray">Manage all your payments easily</p>
                    <img className="mg5" src={transaction} alt="Recommendation" style={{ width: '300px' }} />
                    <p className="bolder darkGray">Click below to set up your Account</p>
                    <Button color="info" className="mgTop5" onClick={this.onBoardSellers}>Set Up Your Paypal Merchant Account</Button>
                </div>
            )
        }
        if (Object.keys(this.state.merchantDetails).length !== 0) {
            let merchantDetails = this.state.merchantDetails;
            body = (
                <div>
                    <div className="whiteCard mg20 alignCenter">
                        <h3 className="bold darkGray mgTop0 mgBottom10">Merchant Account Details</h3>
                        <table className="table">
                            <tr>
                                <td className="bold darkGray">Merchant ID</td>
                                <td className="bold darkGray">Merchant ID In Paypal</td>
                                <td className="bold darkGray">Account Status</td>
                                <td className="bold darkGray">Business Email</td>
                                <td className="bold darkGray">Role</td>
                            </tr>
                            <tr>
                                <td className="bolder darkGray">{merchantDetails.MerchantId}</td>
                                <td className="bolder darkGray">{merchantDetails.MerchantIdInPaypal}</td>
                                <td className="bolder darkGray">{merchantDetails.AccountStatus}</td>
                                <td className="bolder darkGray">{this.props.user.Email}</td>
                                <td className="bolder darkGray">{this.props.user.Role}</td>
                            </tr>
                        </table>
                    </div>
                    <div className="whiteCard mg20 alignCenter">
                        <h3 className="bold darkGray mgTop0 mgBottom10">Past Transactions</h3>
                        {transactions}
                    </div>
                </div>
            )
        }
        return (
            <div style={{ display: 'flex', paddingTop: '70px' }}>
                <div className="maxWidth">
                    {body}

                    {this.state.DetailData !== {} &&
                        <DetailModal
                            show={this.state.DetailModal}
                            toggle={this.closeDetail}
                            {...this.state.DetailData}
                        />
                    }
                </div>
            </div>

        )
    }
}

export default Transaction;