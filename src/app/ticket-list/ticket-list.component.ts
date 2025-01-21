import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

import { Subject } from 'rxjs';
// import * as XLSX from 'xlsx';

import {
  finalize,
} from 'rxjs/operators';
import { Ticket } from '../models/ticket.model';
import { AjaxResponse } from '../models/ajax-response-model';
import { environment } from '../../environments/environment';





@Component({
  selector: 'app-ticket-list',
  standalone: false,

  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent {

  refreshList() {
  console.log("Refreshing ticket list...");
 this.ngOnInit()
}

inValidateTicket() {
throw new Error('Method not implemented.');
}

apiUrl = environment.apiUrl;
TICKET_URL: string = `${this.apiUrl}/api/tickets`;


  constructor(private http: HttpClient,
    private router: Router) {

    }

    ngOnInit(){
      this.http.get<Ticket[]>(this.TICKET_URL).subscribe(response => {
        this.tickets = response;

      })
    }




  tickets: Ticket[] = []

  // importTickets: Ticket[] = this.tickets;
  // exportTickets: Ticket[] = [];


  spinnerEnabled = false;
  keys?: string[] | null;
  dataSheet: any = new Subject();
  @ViewChild('inputFile') inputFile!: ElementRef;
  isExcelFile!: boolean;


  alertMsg!: string;
  style!: string;
  show: boolean = false;
  interval: any;
  alertIcon!: string;





  gotoCreateTicket() {
    this.router.navigate(['/create'])
  }

  gotoEditTicket(ticket: Ticket) {
    sessionStorage.setItem('ticket', JSON.stringify(ticket))
    this.router.navigate(["/edit"]);
  }

  deleteTicket(ticket: Ticket) {
    // this.http.delete(`${this.DELETE_TICKETS_URL}${ticket.id}`)
    //   .pipe(finalize(() => {
    //     this.findAllTickets();
    //   }))
    //   .subscribe((response: any) => {

    //     if (response.status == "OK") {
    //       this.showAlert('Ticket Deleted Successfully', "warning", "info-circle")

    //       this.tickets = response.data;

    //     }

    //     // console.log(response);

    //   }, (error: AjaxResponse<null>) => {
    //     this.showAlert(error.message as string, "warning", "warning")
    //   })
  }

  exportData(tableId: string) {
    // this.excelService.exportToFile("contacts", tableId);
    // this.showAlert("Data Exported Succesfully", "info", "info-circle")

  }



  showAlert(msg: string, style: string, icon: string) {
    this.alertIcon = icon;
    this.alertMsg = msg;
    this.style = style || 'info';
    this.show = true;
    timer(5000).subscribe(() => (this.show = false));
    return false;
  }



  // Method to update ticket status
  updateTicketStatus(ticket:Ticket) {
    console.log("updateTicketStatus: ticket");

    // this.http.put(this.TICKET_URL).subscribe((response:Ticket[]) => {
    //   this.tickets = response.data as Ticket[];
    //   // console.log(response);

    // })

  }


}
