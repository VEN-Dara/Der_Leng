import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import { Form, Input, notification, Spin } from 'antd'
import React, { useState } from "react";
import './CheckoutFormStyle.css'
import ApiService from "../../../config/api/apiService";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

const CheckoutForm = ({setRefreshData}) => {
    const [stripeError, setStripeError] = useState(null);
    const [name, setName] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false)
    const api = new ApiService()

    // Handle real-time validation errors from the card Element.
    const handleChange = (event) => {
        if (event.error) {
            setStripeError(event.error.message);
        } else {
            setStripeError(null);
        }
    }

    // Handle form submission.
    const handleSubmit = async () => {
        setIsLoading(true);

        const card = elements.getElement(CardElement);

        try {
            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: 'card',
                card: card,
            });

            if (error) {
                setStripeError(error.message)
                setIsLoading(false);
            } else {
                const data = {
                    payment_method_id: paymentMethod.id,
                    type: paymentMethod.type,
                    holder_name: name,
                    brand: paymentMethod.card.brand,
                    last4: paymentMethod.card.last4,
                    exp_month: paymentMethod.card.exp_month,
                    exp_year: paymentMethod.card.exp_year,
                }

                try {
                    console.log(data)
                    const response = await api.post('/payments', data)
                    console.log(response)
                    console.log(response.status)
                    if (response.status === 200) {
                        setIsLoading(false);
                        openNotification()
                        elements.getElement(CardElement).clear();
                        if(typeof setRefreshData === "function") {
                            setRefreshData(true);
                        }
                    }
                } catch (error) {
                    setIsLoading(false);
                    const errorMessage = 'Oops! It looks like there was an issue processing your payment. The card you provided was declined. Please double-check the card details and try again, or use a different payment method. If you continue to experience issues, please contact your bank for assistance.'
                    openErrorNotification(errorMessage)
                }
            }
            
        } catch (error) {
            console.log(error)
            setIsLoading(false);
        }

    };

    const openNotification = () => {
        notification.open({
            message: 'Added Payment Method',
            description:
                'We are pleased to inform you that your payment card has been successfully added to your account.',
        });
    }
    
    const openErrorNotification = (errorMessage) => {
        notification.error({
            message: 'Declined Payment Method',
            description:
                `${errorMessage}`,
        });

    }

    return (
        <Form onFinish={handleSubmit} className="p-5 flex flex-col justify-center w-full border-2 border-solid border-primary rounded-lg">
            <div className="form-row flex flex-col">
                <Form.Item
                    name="name"
                    rules={[{ message: 'Please input your card name holder', required: true }]}
                    label="Cardname"
                    labelCol={{ span: 24 }}  // Label spans the full width
                    wrapperCol={{ span: 24 }} // Input spans the full width
                    className="[&>div>.ant-form-item-label]:h-10 [&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                >
                    <Input value={name} onChange={e => setName(e.target.value)} placeholder="Card Name" className="py-2 -mt-2" />
                </Form.Item>
            </div>
            <div className="form-row">
                <label htmlFor="card-element" className="text-dark dark:text-white60 text-sm font-medium">
                    <span className="text-red-500 mr-1">*</span>Credit or debit card
                </label>

                <CardElement
                    id="card-element"
                    onChange={handleChange}
                />
                <div className="card-errors" role="alert">{stripeError}</div>
            </div>
            <button type="submit" className="submit-btn">
                {!isLoading ? `Submit Payment` : (
                    <div className="spin flex items-center justify-center py-1">
                        <Spin size="small" />
                    </div>
                )}
            </button>
        </Form>
    );
};

const WrappedCheckoutForm = ({setRefreshData}) => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm setRefreshData={setRefreshData}/>
        </Elements>
    );
};

export default WrappedCheckoutForm;
