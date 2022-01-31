import React from 'react';
import {Elements, ElementsConsumer} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";
import PaymentForm from './PaymentForm'

const stripePromise = loadStripe('pk_test_51I1TvuBfJfjIR7pMii78gvYzNS9AJr4llkjqSWCf3DQWTJ37HAyi2lRjIHo2iYsNHGKNHEpFYngaDYjgxHwbZS3J00YF6hz8Tl');

const InjectedPaymentForm = () => (
    <ElementsConsumer>
    {({stripe, elements}) => (
        <PaymentForm stripe={stripe} elements={elements}/>
    )}
    </ElementsConsumer>
);

const Payment = () => (
    <Elements stripe={stripePromise}>
        <InjectedPaymentForm/>
    </Elements>
);

export default Payment;