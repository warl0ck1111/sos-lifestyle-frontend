import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {finalize, of} from 'rxjs';
import {AjaxResponse} from '../models/ajax-response-model';
import {environment} from '../../environments/environment';
import {PaymentService} from "../services/payment.service";
import {TicketCount} from "../models/ticket-count";

@Component({
  selector: 'app-book-ticket',
  standalone: false,

  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent {
  apiUrl = environment.apiUrl;
  eventName = environment.eventName;
  TICKET_URL: string = `${this.apiUrl}/api/tickets`;
  TICKET_COUNT_URL: string = `${this.apiUrl}/api/tickets-count`;

  selectedTicketTypePrice: number = 0;
  totalAmount: number = 0;
  ticketLimit: number = 1000;
  isEarlyBirdFinished = false

  // Reactive form
  bookingForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required,]),
    noOfTickets: new FormControl('1', [Validators.required, Validators.min(1)]),
    ticketType: new FormControl('', Validators.required)
  });

  submitted = false;
  isBuyTicketsButtonClicked: boolean = false;
  paymentRequest?: {
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
  };

  constructor(private http: HttpClient,
              private paymentService: PaymentService) {

  }

  ticketTypeCounts!: TicketCount[];

  ngOnInit() {
    this.getTicketTYpeCount();
    this.getEarlyBirdCount();
  }

  getIndividualTicketCount(ticketType: string): any {
    let ticket = this.ticketTypeCounts.find(t => {
      console.log("getIndividualTicketCount/" + JSON.stringify(t))
      return t.ticketType === ticketType
    });
    // console.log("getIndividualTicketCount2/"+JSON.stringify(ticket))
    if (ticket instanceof TicketCount) {
      this.ticketLimit = ticket.ticketCount;
    }
    return ticket ? ticket.ticketCount : 0;
  }

  getTicketTYpeCount() {
    this.http.get<TicketCount[]>(this.TICKET_COUNT_URL).pipe(finalize(() => {
      //do nothing for now todo
    })).subscribe((result: any) => {

        this.ticketTypeCounts = result;
        console.log("getTicketTYpeCount/finished getting getTicketTYpeCount successfully/result:" + JSON.stringify(result))
        // // this.openSnackBar("Success", "Dismiss")

      },
      error => {
        // this.openSnackBar(error.message, "Dismiss")
        console.log("getTicketTYpeCount/there was an error getting getTicketTYpeCount list")

      })
  }

  getEarlyBirdCount() {
    this.http.get<TicketCount[]>(`${this.TICKET_COUNT_URL}/remaining?eventName=${environment.eventName}&ticketType=EARLY_BIRDS`).pipe(finalize(() => {
      //do nothing for now todo
    })).subscribe((result: any) => {
        console.log("getEarlyBirdCount/" + result.count)
        this.isEarlyBirdFinished = result.count == 0;
      },
      error => {
        // this.openSnackBar(error.message, "Dismiss")
        console.log("getTicketTYpeCount/there was an error getting getTicketTYpeCount list")

      })
  }

  onSubmit() {
    // Validate form before proceeding

    console.log(this.bookingForm);

    if (this.bookingForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    const transRef = this.randomReference();
    this.paymentRequest = {
      merchant_code: environment.merchantCode,
      pay_item_id: environment.payItemId,
      pay_item_name: environment.eventName,
      txn_ref: transRef,
      cust_email: this.bookingForm?.controls['email']?.value,
      cust_name: this.bookingForm?.controls['name']?.value,
      cust_mobile_no: this.bookingForm?.controls['phone']?.value,
      cust_id: this.bookingForm?.controls['email']?.value,
      amount: this.getAmount(),
      currency: 566,
      site_redirect_url: `https://partyreadyng.com`,
      onComplete: (response: any) => this.paymentCallback(response),
      mode: environment.mode,
    };
    this.paymentService.checkout(this.paymentRequest)

  }

  paymentCallback(response: any) {
    console.log("paymentCallback/" + response)
    console.log(JSON.stringify(response))
    if (response && response.desc === 'Customer cancellation') {
      // alert('Payment was canceled by the user.');
      return;
    }
    if (response && response.resp === "Z6") {
      //user canceled the payment process
      return;
    }

    if (response && response.desc === 'Approved by Financial Institution') {
      console.log('Payment approved:', response);

      const formData = {
        phone: this.bookingForm.controls['phone'].value,
        email: this.bookingForm.controls['email'].value,
        name: this.bookingForm.controls['name'].value,
        noOfTickets: this.bookingForm.controls['noOfTickets'].value,
        ticketType: this.bookingForm.controls['ticketType'].value
      };

      const paymentDateAndTime = new Date().toISOString(); // ISO format for timestamps

      const ticketObject = {
        ...response,
        ...this.paymentRequest,
        ...formData,
        ticketId: this.generateTicketId(),
        eventName: this.eventName,
        eventLocation: environment.eventLocation,
        eventStartTime: environment.eventStartTime,
        eventDate: environment.eventDate,
        qrCode: '',
        paymentDateAndTime: paymentDateAndTime, // Store payment date and time
        ticketUsed: false,                   // Default to false
        dateAndTimeTicketUsed: null,           // Default to null
      };

      console.log('Final Ticket Object:', ticketObject);


      this.http.post(`${this.TICKET_URL}`, ticketObject)
        .pipe(finalize(() => {
          this.getTicketTYpeCount()
          alert('Thank you for your purchase');
          this.submitted = true;

        }))
        .subscribe((response: any) => {


          // console.log(response);

        }, (error: AjaxResponse<null>) => {
          alert('Failed to create ticket. Please pls contact admin with your receipt.');
          // this.showAlert(error.message as string, "warning", "warning")
        })

    } else if (response.desc) {
      alert(response.desc)
    } else {
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

  buyTicketButtonClicked() {
    this.isBuyTicketsButtonClicked = !this.isBuyTicketsButtonClicked;
  }

  selectTicket(ticketType: any) {
    console.log("selectTicket:event:" + ticketType)
    console.log("selectTicket:event:" + JSON.stringify(ticketType))
    if (ticketType === "EARLY_BIRDS") {
      this.selectedTicketTypePrice = environment.earlyBirdsTicketPrice
    } else if (ticketType === "STANDARD") {
      this.selectedTicketTypePrice = environment.standardTicketPrice
    } else if (ticketType === "VIP") {
      this.selectedTicketTypePrice = environment.VIPTicketPrice
    }

    this.totalAmount = this.selectedTicketTypePrice * Number(this.bookingForm?.controls['noOfTickets']?.value);

    console.log(`Selected: ${ticketType}, Price: ₦${this.selectedTicketTypePrice}`);
  }

  getAmount(event?: Event) {
    if (event) {

      const inputElement = event.target as HTMLInputElement;
      let value = Number(inputElement.value);

      if (value <= 0 || isNaN(value)) {
        this.bookingForm?.controls['noOfTickets'].setValue("1");
        // this.noOfTickets = 1; // Default to 1 if 0 or negative
        inputElement.value = '1'; // Update input field
      } else {
        this.bookingForm?.controls['noOfTickets'].setValue(value.toString());
      }
    }

    console.log("getAmount/")

    this.totalAmount = this.selectedTicketTypePrice * Number(this.bookingForm?.controls['noOfTickets']?.value);
    return (this.selectedTicketTypePrice * Number(this.bookingForm?.controls['noOfTickets']?.value)).toString();
  }

}
