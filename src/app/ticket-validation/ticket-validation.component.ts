import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {Ticket} from "../models/ticket.model";

@Component({
  selector: 'app-ticket-validation',
  standalone:false,
  templateUrl: './ticket-validation.component.html',
  styleUrls: ['./ticket-validation.component.css']
})
export class TicketValidationComponent {

  ticketId: string = '';
  ticketInfo: Ticket = new Ticket(); // Holds the ticket data from the backend
  errorMessage: string = ''; // Holds any error message

  constructor(private http: HttpClient, private route: ActivatedRoute) {}



  ngOnInit(): void {
    // Capture the 'id' parameter from the URL
    this.route.params.subscribe(params => {
      this.ticketId = params['id'];
      console.log('ticket ID:', this.ticketId);
      this.validateTicket();
    });


  }

  validateTicket() {
    this.ticketInfo = new Ticket();
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
    let result = confirm("Are you sure you want to invalidate ticket?");
    if (result) {

      const apiUrl = `${environment.apiUrl}/api/tickets/${this.ticketId}/in-validate`; // Replace with your actual endpoint URL

      this.http.put(apiUrl, null).subscribe(
        (response: any) => {
          this.ticketInfo = response; // Populate the ticket info\
          this.validateTicket();
        },
        (error: any) => {
          this.errorMessage =
            error.error || 'Failed to validate the ticket. Please try again.';
        }
      );
    }else{
     //do nothing
      return
    }
  }
}
