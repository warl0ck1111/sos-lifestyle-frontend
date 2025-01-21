import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  tickets: any[] = [];

  // constructor(private firestore: AngularFirestore) {
  //   this.firestore
  //     .collection('tickets')
  //     .valueChanges({ idField: 'ticketId' })
  //     .subscribe((data:any) => {
  //       this.tickets = data;
  //     });
  // }



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
}
