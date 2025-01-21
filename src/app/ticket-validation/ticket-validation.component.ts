import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-ticket-validation',
  standalone:false,
  templateUrl: './ticket-validation.component.html',
  styleUrls: ['./ticket-validation.component.css']
})
export class TicketValidationComponent {

  ticketId: string = '';
  ticketInfo: any = null; // Holds the ticket data from the backend
  errorMessage: string = ''; // Holds any error message

  constructor(private http: HttpClient) {}

  validateTicket() {
    this.ticketInfo = null;
    this.errorMessage = '';

    if (!this.ticketId) {
      this.errorMessage = 'Please enter a ticket ID.';
      return;
    }

    const apiUrl = `${environment.apiUrl}/api/tickets/${this.ticketId}/validate`; // Replace with your actual endpoint URL
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.ticketInfo = response; // Populate the ticket info
      },
      (error:any) => {
        this.errorMessage =
          error.error || 'Failed to validate the ticket. Please try again.';
      }
    );
  }

  invalidateTicket() {
    const apiUrl = `${environment.apiUrl}/api/tickets/${this.ticketId}/in-validate`; // Replace with your actual endpoint URL

    this.http.put(apiUrl,null).subscribe(
      (response: any) => {
        this.ticketInfo = response; // Populate the ticket info\
        this.validateTicket();
      },
      (error:any) => {
        this.errorMessage =
          error.error || 'Failed to validate the ticket. Please try again.';
      }
    );
  }
}
