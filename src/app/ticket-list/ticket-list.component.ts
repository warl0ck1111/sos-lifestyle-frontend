import {HttpClient} from '@angular/common/http';
import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {
  finalize,
} from 'rxjs/operators';
import {Ticket} from '../models/ticket.model';
import {environment} from '../../environments/environment';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LiveAnnouncer} from "@angular/cdk/a11y";


@Component({
  selector: 'app-ticket-list',
  standalone: false,

  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent {

  apiUrl = environment.apiUrl;
  TICKET_URL: string = `${this.apiUrl}/api/tickets`;

  tickets:Ticket[] = [];

  displayedSaleListColumns: string[] = ['id','email','phone','eventName','amount','noOfTickets','paymentDateAndTime','ticketUsed','dateTimeOfInvalidation'];
  ticketsListDataSource = new MatTableDataSource<Ticket>();

  @ViewChild(MatPaginator) ticketsListPaginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.ticketsListDataSource.sort = this.sort;
    this.ticketsListDataSource.paginator = this.ticketsListPaginator;
  }

  constructor(private http: HttpClient,
              private router: Router, private _snackBar: MatSnackBar,
              private _liveAnnouncer: LiveAnnouncer,) {
    this.getTickets();

  }


  getTickets() {
    this.http.get<Ticket[]>(this.TICKET_URL).pipe(finalize(() => {
//do nothing for now todo
    })).subscribe(response => {
      this.tickets = response;
        this.ticketsListDataSource.data = response;

    },
      error => {
        this.openSnackBar(error.message, "Dismiss")
        console.log("getTickets/there was an error getting tickets report list")

      })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


  applySaleListFilter(event?: Event) {
    if (!event) return
    const filterValue = (event.target as HTMLInputElement).value;
    this.ticketsListDataSource.filter = filterValue.trim().toLowerCase();

    if (this.ticketsListDataSource.paginator) {

      this.ticketsListDataSource.paginator.firstPage();
    }
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }


  }


  refreshList() {
    this.getTickets();
  }
}
