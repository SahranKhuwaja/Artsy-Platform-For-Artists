const axios = require('axios');
const fetch = require('node-fetch');
const moment = require('moment');

exports.getAccessToken = async () => {
    const accessToken = await axios({
        url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Accept-Language': 'en_US',
            'content-type': 'application/x-www-form-urlencoded'
        },
        auth: {
            username: process.env.CLIENTID,
            password: process.env.SECRETID
        },
        params: {
            grant_type: 'client_credentials'
        }

    })
    return accessToken.data
}

exports.onBoardSeller = async (user, accessToken) => {
    const onBoard = await fetch('https://api-m.sandbox.paypal.com/v2/customer/partner-referrals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify({
            "individual_owners": [{
                "names": [{
                    "prefix": user.Gender === 'Male' ? "Mr." : "Ms.",
                    "given_name": user.FirstName,
                    "surname": user.LastName,
                    // "middle_name": "Middle",
                    // "suffix": "Jr.",
                    "full_name": user.FirstName + ' ' + user.LastName,
                    "type": "LEGAL"
                }],
                "citizenship": "CA",
                "addresses": [{
                    // "address_line_1": "One Washington Square",
                    // "address_line_2": "Apt 123",
                    "admin_area_2": user.City,
                    "admin_area_1": user.Country,
                    // "postal_code": "95112",
                    "country_code": "CA",
                    "type": "HOME"
                }],
                "phones": [{
                    "country_code": "1",
                    "national_number": user.Phone,
                    // "extension_number": "1234",
                    "type": "MOBILE"
                }],
                "birth_details": {
                    "date_of_birth": moment(user.Birthday).format('YYYY-MM-DD')
                },
                "type": "PRIMARY"
            }],
            "business_entity": {
                "business_type": {
                    "type": "INDIVIDUAL",
                    "subtype": "ASSO_TYPE_INCORPORATED"
                },
                "business_industry": {
                    "category": "1004",
                    "mcc_code": "2025",
                    "subcategory": "8931"
                },
                "business_incorporation": {
                    "incorporation_country_code": "CA",
                    // "incorporation_date": "1986-12-29"
                },
                "names": [{
                    "business_name": "Artsy Artist",
                    "type": "LEGAL_NAME"
                }],
                "emails": [{
                    "type": "CUSTOMER_SERVICE",
                    "email": user.Email
                }],
                // "website": "https://mystore.testenterprises.com",
                "addresses": [{
                    // "address_line_1": "One Washington Square",
                    // "address_line_2": "Apt 123",
                    "admin_area_2": user.City,
                    "admin_area_1": user.Country,
                    // "postal_code": "95112",
                    // "postal_code": "H3B1E3",
                    "country_code": "CA",
                    "type": "WORK"
                }],
                "phones": [{
                    "country_code": "1",
                    "national_number": user.Phone,
                    // "extension_number": "1234",
                    "type": "CUSTOMER_SERVICE"
                }],
                "beneficial_owners": {
                    "individual_beneficial_owners": [{
                        "names": [{
                            "prefix": user.Gender === 'Male' ? "Mr." : "Ms.",
                            "given_name": user.FirstName,
                            "surname": user.LastName,
                            // "middle_name": "Middle",
                            // "suffix": "Jr.",
                            "full_name": user.FirstName + ' ' + user.LastName,
                            "type": "LEGAL"
                        }],
                        "citizenship": "CA",
                        "addresses": [{
                            // "address_line_1": "One Washington Square",
                            // "address_line_2": "Apt 123",
                            "admin_area_2": user.City,
                            "admin_area_1": user.Country,
                            // "postal_code": "H3B1E3",
                            "country_code": "CA",
                            "type": "HOME"
                        }],
                        "phones": [{
                            "country_code": "1",
                            "national_number": user.Phone,
                            // "extension_number": "1234",
                            "type": "MOBILE"
                        }],
                        "birth_details": {
                            "date_of_birth": moment(user.Birthday).format('YYYY-MM-DD')
                        },
                        // "percentage_of_ownership": "50"
                    }],
                    "business_beneficial_owners": [{
                        "business_type": {
                            "type": "INDIVIDUAL",
                            "subtype": "ASSO_TYPE_INCORPORATED"
                        },
                        "business_industry": {
                            "category": "1004",
                            "mcc_code": "2025",
                            "subcategory": "8931"
                        },
                        "business_incorporation": {
                            "incorporation_country_code": "CA",
                            // "incorporation_date": "1986-12-29"
                        },
                        "names": [{
                            "business_name": "Artsy Artist",
                            "type": "LEGAL_NAME"
                        }],
                        "emails": [{
                            "type": "CUSTOMER_SERVICE",
                            "email": user.Email
                        }],
                        // "website": "https://mystore.testenterprises.com",
                        "addresses": [{
                            // "address_line_1": "One Washington Square",
                            // "address_line_2": "Apt 123",
                            "admin_area_2": user.City,
                            "admin_area_1": user.Country,
                            // "postal_code": "95112",
                            "country_code": "CA",
                            "type": "WORK"
                        }],
                        "phones": [{
                            "country_code": "1",
                            "national_number": user.Phone,
                            // "extension_number": "1234",
                            "type": "CUSTOMER_SERVICE"
                        }],
                        // "percentage_of_ownership": "50"
                    }]
                },
                "office_bearers": [{
                    "names": [{
                        "prefix": user.Gender === 'Male' ? "Mr." : "Ms.",
                        "given_name": user.FirstName,
                        "surname": user.LastName,
                        // "middle_name": "Middle",
                        // "suffix": "Jr.",
                        "full_name": user.FirstName + ' ' + user.LastName,
                        "type": "LEGAL"
                    }],
                    "citizenship": "US",
                    "addresses": [{
                        // "address_line_1": "One Washington Square",
                        // "address_line_2": "Apt 123",
                        "admin_area_2": user.City,
                        "admin_area_1": user.Country,
                        // "postal_code": "95112",
                        // "postal_code":"H3B1E3",
                        "country_code": "CA",
                        "type": "HOME"
                    }],
                    "phones": [{
                        "country_code": "1",
                        "national_number": user.Phone,
                        // "extension_number": "1234",
                        "type": "MOBILE"
                    }],
                    "birth_details": {
                        "date_of_birth": moment(user.Birthday).format('YYYY-MM-DD')
                    },
                    "role": "DIRECTOR"
                }],
                // "annual_sales_volume_range": {
                //     "minimum_amount": {
                //         "currency_code": "USD",
                //         "value": "10000"
                //     },
                //     "maximum_amount": {
                //         "currency_code": "USD",
                //         "value": "50000"
                //     }
                // },
                // "average_monthly_volume_range": {
                //     "minimum_amount": {
                //         "currency_code": "USD",
                //         "value": "1000"
                //     },
                //     "maximum_amount": {
                //         "currency_code": "USD",
                //         "value": "50000"
                //     }
                // },
                "purpose_code": "P0104"
            },
            "email": user.Email,
            "preferred_language_code": "en-US",
            "tracking_id": user._id,
            "partner_config_override": {
                // "partner_logo_url": "https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg",
                "return_url": "http://artsy-dev.com/Transaction/Redirect",
                "return_url_description": "The url to return the merchant after the paypal onboarding process.",
                // "action_renewal_url": "https://testenterprises.com/renew-exprired-url",
                "show_add_credit_card": true
            },
            "operations": [{
                "operation": "BANK_ADDITION"
            }],
            "financial_instruments": {
                "banks": [{
                    "nick_name": "Bank of America",
                    "account_number": "973737327366201",
                    "account_type": "CHECKING",
                    "currency_code": "USD",
                    "identifiers": [{
                        "type": "ROUTING_NUMBER_1",
                        "value": "325272063"
                    }]
                }]
            },
            "legal_consents": [{
                "type": "SHARE_DATA_CONSENT",
                "granted": true
            }],
            "operations": [
                {
                  "operation": "API_INTEGRATION",
                  "api_integration_preference": {
                    // "classic_api_integration": {
                    //   "integration_type": "THIRD_PARTY",
                    //   "third_party_details": {
                    //     "permissions": [
                    //       "EXPRESS_CHECKOUT",
                    //     //   "REFUND",
                    //     //   "DIRECT_PAYMENT",
                    //     //   "AUTH_CAPTURE",
                    //     //   "BUTTON_MANAGER",
                    //     //   "ACCOUNT_BALANCE",
                    //     //   "TRANSACTION_DETAILS"
                    //     ]
                    //   },
                    // //   "first_party_details": "CERTIFICATE"
                    // },
                    "rest_api_integration": {
                      "integration_method": "PAYPAL",
                      "integration_type": "THIRD_PARTY",
                      "third_party_details": {
                        "features": [
                            "PAYMENT",
                            "REFUND",
                            "FUTURE_PAYMENT",
                            "PARTNER_FEE",
                            // "DELAY_FUNDS_DISBURSEMENT",
                            // "READ_SELLER_DISPUTE",
                            // "UPDATE_SELLER_DISPUTE",
                            // "ADVANCED_TRANSACTIONS_SEARCH",
                            // "SWEEP_FUNDS_EXTERNAL_SINK",
                            // "ACCESS_MERCHANT_INFORMATION",
                            // "TRACKING_SHIPMENT_READWRITE",
                            // "INVOICE_READ_WRITE",
                            // "UPDATE_CUSTOMER_DISPUTES"
                        ]
                      }
                    }
                  },
                }
              ],
            "products": ["EXPRESS_CHECKOUT"],
          
            
        })
    })
    return await onBoard.json();
}

exports.createOrder = async (payee, amount, accessToken) => {
    try {
      const orderId = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
        method: 'POST',
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${accessToken}`,
          'PayPal-Partner-Attribution-Id': process.env.BNN
        },
        body: JSON.stringify({
          "intent": "CAPTURE",
          "purchase_units": [{
            "amount": {
              "currency_code": "USD",
              "value": amount
            },
            "payee": {
              "email_address": payee.Email,
            },
            "shipping": {
              "names": [{
                "prefix": payee.Gender==='Male'?'Mr.':'Ms.',
                "given_name": payee.FirstName,
                "surname": payee.LastName,
                "full_name": payee.FirstName + ' ' + payee.LastName,
                "type": "LEGAL"
              }],
              "address": {
                "address_line_1": payee.FirstName.toUpperCase() + ' ' + payee.LastName.toLowerCase(),
                // "address_line_2": "Apt 123",
                "admin_area_2": payee.City,
                "admin_area_1": payee.Country,
                "postal_code": "95112",
                "country_code": "US",
              }
            },
            "payment_instruction": {
              "disbursement_mode": "INSTANT",
              "platform_fees": [{
                "amount": {
                  "currency_code": "USD",
                  "value": parseInt(amount) * 0.1
                }
              }]
            }
          }],
        }),
      })
      return await orderId.json()
    } catch (e) {
      console.log(e)
    }
  }

  exports.captureOrder = async(orderId,accessToken)=>{
      try{
        const capture = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`, {
            method: 'POST',
            headers: {
              'Content-Type': "application/json",
              'Authorization': `Bearer ${accessToken}`,
              'PayPal-Partner-Attribution-Id': process.env.BNN
            },
        })
        return await capture.json()
      }catch(e){
          console.log(e)
      }

  }

  exports.status =async(trackingId, accessToken)=>{
      try{
        const check = await fetch(`https://api-m.sandbox.paypal.com/v1/customer/partners/partner_id/merchant-integrations?tracking_id=${trackingId}`,
        {
            method: 'POST',
            headers: {
              'Content-Type': "application/json",
              'Authorization': `Bearer ${accessToken}`,
            },
        })
        return await check.json()

      }catch(e){
          console.log(e)
      }

  }