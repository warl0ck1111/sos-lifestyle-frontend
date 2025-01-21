import { Injectable } from '@angular/core';
import { PaymentRequest } from '../models/payment.request.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  
constructor() { }

checkout(paymentRequest:PaymentRequest) {

return of(window.webpayCheckout(paymentRequest));
}

}

declare global {
  interface Window {
  webpayCheckout: (paymentRequest: any) => void;
  }
}
