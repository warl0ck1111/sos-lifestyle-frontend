import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

    const apiUrl = `http://localhost:8080/api/tickets/${this.ticketId}/validate`; // Replace with your actual endpoint URL
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.ticketInfo = response; // Populate the ticket info
      },
      (error:any) => {
        this.errorMessage =
          error.error?.message || 'Failed to validate the ticket. Please try again.';
      }
    );
  }
}
