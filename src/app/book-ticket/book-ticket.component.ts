import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../services/email.service';
import { PaymentService } from '../services/payment.service';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs';
import { AjaxResponse } from '../models/ajax-response-model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-book-ticket',
  standalone: false,

  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent {
  apiUrl = environment.apiUrl;
TICKET_URL: string = `${this.apiUrl}/api/tickets`;


  isLoading = false;

  // Reactive form
  bookingForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    noOfTickets: new FormControl('', [Validators.required, Validators.min(1)]),
  });



  ticketCode = 'Ticket#1234567890'; // Example ticket code
  qrCodeDataUrl: string | undefined;  submitted = false;

  constructor(private http:HttpClient,
    private paymentService: PaymentService, private emailService: EmailService,
    ) {

    }
    tickets: any[] = [];

    downloadCSV() {
      const csvRows = [];
      csvRows.push('Ticket ID,Used');
      this.tickets.forEach((ticket) => {
        csvRows.push(`${ticket.ticketId},${ticket.used ? 'Yes' : 'No'}`);
      });

      const csvData = csvRows.join('\n');
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', 'attendees.csv');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }



  onSubmit() {
    // Validate form before proceeding




    console.log(this.bookingForm);

    // if (this.bookingForm.invalid) {
    //   alert('Please fill all required fields correctly.');
    //   return;
    // }

    console.log('Form data:', this.bookingForm.value);

    // Payment details
    const merchantCode = 'MX19329';
    const payItemId = 'Default_Payable_MX19329';
    const transRef = this.randomReference();

    const paymentRequest = {
      merchant_code: merchantCode,
      pay_item_id: payItemId,
      txn_ref: transRef,
      amount: '10000',
      cust_id: 'Bashir-djknskjdnsjdksd',
      currency: 566,
      site_redirect_url: window.location.origin,
      onComplete: (response: any) => this.paymentCallback(response),
      mode: 'TEST',
    };

    this.isLoading = true;

    // Call the payment service
    this.paymentService.checkout(paymentRequest)

  }

  paymentCallback(response: any) {
    if (response && response.desc === 'Customer cancellation') {
      alert('Payment was canceled by the user.');
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
        ticketId:this.generateTicketId,
        eventName:'SINGLES-EXPERIENCE',
        qrCode:'',
        paymentDateAndTime: paymentDateAndTime, // Store payment date and time
        ticketUsed: false,                   // Default to false
        dateAndTimeTicketUsed: null,           // Default to null
      };

      console.log('Final Ticket Object:', ticketObject);



      this.http.post(`${this.TICKET_URL}`, ticketObject)
      .pipe(finalize(() => {
        alert('Ticket created successfully!');
          this.submitted = true;

      }))
      .subscribe((response: any) => {


        // console.log(response);

      }, (error: AjaxResponse<null>) => {
        alert('Failed to create ticket. Please try again.');
        // this.showAlert(error.message as string, "warning", "warning")
      })

    } else {
      alert('Payment was not successful. Please try again.');
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


  // sendTicketEmail() {
  //   const emailData = {
  //     to: 'bashirokala@hotmail.com',
  //     subject: 'Your Ticket Details',
  //     text: 'Thank you for booking. Your ticket is confirmed.',
  //     html: `
  //       <h1>Ticket Details</h1>
  //       <p>Your ticket has been successfully booked!</p>
  //       <h2>Your QR Code</h2>
  //       <img src="${this.qrCodeDataUrl}" alt="Ticket QR Code" />
  //     `,
  //   };

  //   // Use the QR code module to generate the QR code data URL
  //   // this.generateQRCode(this.ticketCode);

  //   // // Send the email after QR code URL is generated
  //   // if (this.qrCodeDataUrl) {
  //   //   this.emailService.sendEmail(emailData).subscribe({
  //   //     next: (response) => {
  //   //       console.log('Email sent successfully:', response);
  //   //       alert('Email sent successfully!');
  //   //     },
  //   //     error: (error) => {
  //   //       console.error('Error sending email:', error);
  //   //       alert('Failed to send email.');
  //   //     },
  //   //   });
  //   // }
  // }



  generateQRCode(ticketCode: string) {
    // Use the QR code generation function from angularx-qrcode
    // Generate base64 URL (you can render it in the UI too if needed)
    this.qrCodeDataUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(ticketCode)}&size=150x150`;
  }

  generateTicketId(): string {
    const timestamp = Date.now().toString();
    const randomString = Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
    return `${timestamp}-${randomString}`;
    }










  ticketId: string = '';
  result: string | null = null;
  ticketUsed: boolean = false;


  validateTicket() {
    console.log("validateTicket")
  }


  inValidateTicket(){
    console.log("inValidateTicket.....");
    this.updateTicketStatus("oqjsDj3jn5", true)

  }

  // Method to update ticket status
  updateTicketStatus(ticketId: string, newStatus: boolean) {
    console.log("updateTicketStatus")
  }

}
