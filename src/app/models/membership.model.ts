

export interface CheckoutData {
    plan: string;
    duration: string;
    amount: number;
};

export interface OrderData {
    amount: number;
    amount_paid: number;
    notes: string[];
    created_at: Date;
    amount_due: number;
    currency: string;
    receipt: string;
    id: string;
    entity: string;
    offer_id: string;
    attempts: number;
    status: string;
}

export interface PaymentResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}