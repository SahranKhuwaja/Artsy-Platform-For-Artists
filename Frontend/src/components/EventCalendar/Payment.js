import React, { Component } from 'react';
import axios from 'axios';
import url from '../../assets/data/url';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';

let PaypalButtons = undefined;

axios.defaults.withCredentials = true;

class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: undefined,
            acceptPayment: false,
            loading: true
        }
    }

    componentDidMount = async () => {
        this.setData()
    }

    setData = async () => {
        this.setState({
            selected: await this.props.location.state.selected,
            loading: await false
        })
        await this.setupPayment()
    }

    setupPayment = async () => {
        const { selected } = this.state
        let api = `${url}transaction/paypal/sellers/merchant/payment`;
        if (this.props.user.Role === 'Client') {
            api += `?ArtistId=${selected.Artist}`
        }
        const request = (await axios.get(api)).data
        console.log(request.merchant)
        if (request.merchant !== undefined) {
            if (this.props.user.Role === 'Client') {
                await this.setupPayButtons(request.merchant)
            } else {
                this.acceptPayment();
            }
        }

    }

    setupPayButtons = async (merchant) => {
        if (document.querySelector('#pay')) {
            document.querySelector('#pay').remove();
        }
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?&client-id=${merchant.ClientId}&merchant-id=${merchant.MerchantIdInPaypal}`;
        script.id = 'pay';
        script.async = true;
        await document.body.append(script);
        setTimeout(() => {
            PaypalButtons = window.paypal.Buttons.driver('react', {
                React,
                ReactDOM
            })
            this.acceptPayment();
        }, 1000)

    }

    acceptPayment = () => {
        this.setState({
            acceptPayment: true,
        })
    }

    createOrder = async (data, actions) => {
        const { selected } = this.state;
        const request = await axios.post(`${url}transaction/paypal/payment/createOrder`, { payee: selected.UserData, amount: selected.PaymentAmount });
        if (request.data.id) {
            return request.data.id;
        }

    }

    onApprove = async (data, actions) => {
        const request = await axios.post(`${url}transaction/paypal/payment/captureOrder/${data.orderID}`);
        if (request.data) {
            this.generateInvoice(request.data)
        }
    }

    generateInvoice = async (data) => {
        const { selected } = this.state;
        const transaction = {
            OrderId: data.id,
            PayerId: data.payer.payer_id,
            PayerName: data.payer.name.given_name + ' ' + data.payer.name.surname,
            PayerEmail: data.payer.email_address,
            PayerAddress: data.purchase_units[0].shipping.address.address_line_1 + ' ' +
                data.purchase_units[0].shipping.address.admin_area_1 + ' ' +
                data.purchase_units[0].shipping.address.admin_area_2 + ' ' +
                data.purchase_units[0].shipping.address.country_code + ' Postal Code ' +
                data.purchase_units[0].shipping.address.postal_code,
            GrossAmount: data.purchase_units[0].payments.captures[0].seller_receivable_breakdown.gross_amount.value,
            NetAmount: data.purchase_units[0].payments.captures[0].seller_receivable_breakdown.net_amount.value,
            PaypalFees: data.purchase_units[0].payments.captures[0].seller_receivable_breakdown.paypal_fee.value,
            PlatformFees: data.purchase_units[0].payments.captures[0].seller_receivable_breakdown.platform_fees[0].amount.value,
            Currency: data.purchase_units[0].payments.captures[0].amount.currency_code,
            MerChantId: data.purchase_units[0].payments.captures[0].seller_receivable_breakdown.platform_fees[0].payee.merchant_id,
            Artist: selected.Artist,
            Client: this.props.user._id,
            ProjectId: selected.BookingProject._id
        }
        const request = await axios.post(`${url}transaction/paypal/payment/transaction/invoice`, { transaction });
        if (request.data.id !== undefined) {
            this.updateStatus()
        }
    }

    updateStatus = async (transactionId) => {
        let selected = { ...this.state.selected };
        const request = await axios.put(`${url}bookingProject/paid/${selected.BookingProject._id}`, { transactionId });
        if (request.data === true) {
            this.navigateToTransaction();
        }
    }

    navigateToTransaction = () => {
        this.props.history.push('/Transaction')
    }

    render() {
        let body = (<Loader type="Grid" color="black" style={{ textAlign: 'center', marginTop: '20px', marginBottom: '80px' }} />)
        if (!this.state.loading) {
            if (!this.state.acceptPayment && this.props.user.Role === 'Artist' && !this.state.selected.BookingProject.isPaid) {
                body = <p className="bolder darkgray">You haven't setup your business account to accept payments. <Link to='/Transaction' className="blue bolder">Click Here</Link> to create.</p>
            } else if (!this.state.acceptPayment && this.props.user.Role === 'Client' && this.state.selected.BookingProject.isFinished && !this.state.selected.BookingProject.isPaid) {
                body = <p className="bolder darkgray">Artist has not setup his/her business account to accept payments</p>
            } else if (this.state.acceptPayment && this.props.user.Role === 'Client' && this.state.selected.BookingProject.isFinished && !this.state.selected.BookingProject.isPaid) {
                body = <PaypalButtons createOrder={(data, actions) => this.createOrder(data, actions)} onApprove={(data, actions) => this.onApprove(data, actions)} />
            } else if (this.state.acceptPayment && this.props.user.Role === 'Artist') {
                body = <p className="bolder darkgray"> To access your business account <Link className="blue bolder" to='/Transaction'>Click Here</Link></p>
            }
            else {
                this.navigateToTransaction()
            }
        }

        return (
            <div style={{ paddingTop: '70px', display: 'flex' }}>
                <div className="whiteCard mg20 alignCenter" style={{ width: '100%' }}>
                    <h2 className="bold darkGray">Payment</h2>
                    <p className="bolder darkGray" >Choose a payment method</p>
                    <div style={{ textAlign: 'center', margin: '30px 25%' }}>
                        {body}
                    </div>
                </div>
            </div>
        )
    }


}

export default Payment;