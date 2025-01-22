export interface PaymentRequest {
  merchant_code: string;
  amount: string;
  site_redirect_url: string;
  onComplete: (response: any) => void;
  txn_ref: string;
  mode: string;
  cust_email: string | null | undefined;
  pay_item_name: string;
  cust_name: string | null | undefined;
  currency: number;
  pay_item_id: string;
  cust_id: string | null | undefined;
  cust_mobile_no: string | null | undefined
}
