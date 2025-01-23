import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {finalize, of} from 'rxjs';
import {AjaxResponse} from '../models/ajax-response-model';
import {environment} from '../../environments/environment';
import {PaymentService} from "../services/payment.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-book-ticket',
  standalone: false,

  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent {
  apiUrl = environment.apiUrl;
  ticketPrice = environment.ticketPrice;
  eventName = environment.eventName;
  TICKET_URL: string = `${this.apiUrl}/api/tickets`;

  // Reactive form
  bookingForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required,]),
    noOfTickets: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  submitted = false;
  queryParams: any = {};

  constructor(private http: HttpClient,
              private paymentService: PaymentService) {}


  onSubmit() {
    // Validate form before proceeding
    console.log(this.bookingForm);

    if (this.bookingForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    const transRef = this.randomReference();
    let amount = (environment.ticketPrice * Number(this.bookingForm?.controls['noOfTickets']?.value)).toString();
      let cust_email= this.bookingForm?.controls['email']?.value;
      let cust_name= this.bookingForm?.controls['name']?.value;
      let cust_mobile_no= this.bookingForm?.controls['phone']?.value;
      let cust_id= this.bookingForm?.controls['email']?.value;
    const paymentRequest = {
      merchant_code: environment.merchantCode,
      pay_item_id: environment.payItemId,
      pay_item_name: this.eventName,
      txn_ref: transRef,
      cust_email: cust_email,
      cust_name: cust_name,
      cust_mobile_no: cust_mobile_no,
      cust_id: cust_id,
      amount: amount,
      currency: 566,
      site_redirect_url: `https://partyreadyng.com`,
      onComplete: (response: any) => this.paymentCallback(response),
      mode: environment.mode,
    };

    // Call the payment service
    this.paymentService.checkout(paymentRequest)

  }

  paymentCallback(response: any) {
    console.log("paymentCallback/"+response)
    console.log(JSON.stringify(response))
    if (response && response.desc === 'Customer cancellation') {
      // alert('Payment was canceled by the user.');
      return;
    }

    if (response && response.desc === 'Approved by Financial Institution') {
      console.log('Payment approved:', response);

      const formData = {
        phone: this.bookingForm.controls['phone'].value,
        email: this.bookingForm.controls['email'].value,
        name: this.bookingForm.controls['name'].value,
        noOfTickets: this.bookingForm.controls['noOfTickets'].value,
      };

      const paymentDateAndTime = new Date().toISOString(); // ISO format for timestamps

      const ticketObject = {
        ...response,
        ...formData,
        ticketId: this.generateTicketId,
        eventName: this.eventName,
        qrCode: '',
        paymentDateAndTime: paymentDateAndTime, // Store payment date and time
        ticketUsed: false,                   // Default to false
        dateAndTimeTicketUsed: null,           // Default to null
      };

      console.log('Final Ticket Object:', ticketObject);


      this.http.post(`${this.TICKET_URL}`, ticketObject)
        .pipe(finalize(() => {
          // alert('Thank you for your purchase');
          this.submitted = true;

        }))
        .subscribe((response: any) => {


          // console.log(response);

        }, (error: AjaxResponse<null>) => {
          alert('Failed to create ticket. Please try again.');
          // this.showAlert(error.message as string, "warning", "warning")
        })

    }
    else if(response.desc){
      alert(response.desc)
    }
    else {
      alert('Payment not successful. Please try again.');
      console.log('Payment failed or not approved.');
    }
  }

  randomReference(): string {
    const timestamp = Date.now();
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 6; ++i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return `REF-${timestamp}-${result}`;
  }

  generateTicketId(): string {
    const timestamp = Date.now().toString();
    const randomString = Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    return `${timestamp}-${randomString}`;
  }


  private createticket(request: {
    amount: any;
    cust_email: any;
    cust_name: any;
    cust_id: any;
    txn_ref: any;
    cust_mobile_no: any;
    desc: string
  }) {
    console.log("createticket/"+ JSON.stringify(request))
    this.http.post(`${this.TICKET_URL}`, request)
      .pipe(finalize(() => {
        alert('Thank you for your purchase, please Check mail for your ticket!');
        this.submitted = true;

      }))
      .subscribe((response: any) => {


        // console.log(response);

      }, (error: AjaxResponse<null>) => {
        alert('Failed to create ticket. Please try again.');
        // this.showAlert(error.message as string, "warning", "warning")
      })
  }
}
