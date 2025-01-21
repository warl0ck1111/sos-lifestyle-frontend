export interface PaymentRequest {
    merchant_code: string;
    pay_item_id: string;
    txn_ref: string;
    amount: string;
    cust_id: string;
    currency: number;
    site_redirect_url: string;
    onComplete: (response: any) => void;
    mode: string;
    }