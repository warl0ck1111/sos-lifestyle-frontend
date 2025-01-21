import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private baseUrl = 'http://localhost:8080/api/tickets'; // URL to web API

  constructor(private http:HttpClient) { }



  // Get all tickets
  getAllTickets(): Observable<Ticket[]> {
    return this.http
      .get<Ticket[]>(`${this.baseUrl}`)
      .pipe(catchError(this.handleError));
  }

  // Get ticket by ID
  getTicketById(id: string): Observable<Ticket> {
    return this.http
      .get<Ticket>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Create a new ticket
  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http
      .post<Ticket>(`${this.baseUrl}`, ticket, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }

  // Update ticket status
  updateTicketStatus(id: string, ticket: Ticket): Observable<Ticket> {
    return this.http
      .put<Ticket>(`${this.baseUrl}/${id}`, ticket, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }

  // Delete a ticket
  deleteTicket(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Handle payment success
  handlePaymentSuccess(ticketId: string): Observable<string> {
    return this.http
      .post<string>(`${this.baseUrl}/payment-success/${ticketId}`, {})
      .pipe(catchError(this.handleError));
  }

  // Update ticket status via PATCH
  updateStatus(ticketId: string, status: string): Observable<Ticket> {
    return this.http
      .patch<Ticket>(`${this.baseUrl}/${ticketId}/status?status=${status}`,"")
      .pipe(catchError(this.handleError));
  }

  // Validate ticket
  validateTicket(ticketId: string): Observable<string> {
    return this.http
      .get<string>(`${this.baseUrl}/${ticketId}/validate`)
      .pipe(catchError(this.handleError));
  }

  // HTTP headers
  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  // Error handling
  private handleError(error: any) {
    console.error('Error occurred:', error);
    return of(error.message || error);
  }


  
}
