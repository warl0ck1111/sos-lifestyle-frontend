// import { HttpClient } from '@angular/common/http';
// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { timer } from 'rxjs';
// import { finalize } from 'rxjs/operators';
// import { Ticket } from '../models/ticket.model';
// import { AjaxResponse } from '../models/ajax-response-model';


// @Component({
//   selector: 'app-ticket',
//   templateUrl: './ticket.component.html',
//   styleUrls: ['./ticket.component.css']
// })
// export class TicketComponent implements OnInit, OnDestroy {

//   title: string = "Create New"
//   actionButtonText = "Create"
//   actionButtonIcon = "plus-circle"
//   ticketForm!: FormGroup
//   ticketList!: Ticket[] | null
//   ticket!: Ticket | null
//   isUpdate: boolean = false;


//   CREATE_TICKET_URL: string = "http://localhost:8080/api/ticket/create";
//   UPDATE_TICKET_URL: string = "http://localhost:8080/api/ticket/update";

//   alertMsg!: string;
//   style!: string;
//   show: boolean = false;
//   interval: any;
//   alertIcon!: string;

//   constructor(private http: HttpClient,
//     private fb: FormBuilder) {
//     this.initializeForm()
//   }

//   ngOnInit(): void {

//     if (sessionStorage.getItem('ticket')) { //if it is an update populate fields
//       let a = sessionStorage.getItem("ticket");
//       console.log(a)
//       this.ticket = JSON.parse(a == null ? "{}" : a);
//       this.initializeFormwithData()
//       this.title = "Update "
//       this.actionButtonText = "Update"
//       this.actionButtonIcon = "paper-plane"
//       this.isUpdate = true
//     }
//   }

//   ngOnDestroy(): void {
//     sessionStorage.removeItem("ticket")
//   }

//   initializeForm() {
//     this.ticketForm = this.fb.group({
//       name: ['', Validators.required],
//       details: ['', Validators.required],
//       date: ['', Validators.required],
//       isValid: [false],
//       title: ['', Validators.required],

//     })
//   }

//   initializeFormwithData() {
//     this.ticketForm = this.fb.group({
//       name: [this.ticket?.name, Validators.required],
//       id: [this.ticket?.id, Validators.required],
//       isValid: [this.ticket?.isValid],
//       details: [this.ticket?.details, Validators.required],
//       date: [this.ticket?.date, Validators.required],
//       title: [this.ticket?.title, Validators.required],

//     })
//   }

//   createUpdateTicket() {

//     if (sessionStorage.getItem("ticket")) {
//       this.updateTicket();
//     }
//     else {
//       this.createTicket();
//     }

//   }

//   createTicket() {
//     // console.log(this.ticketForm.value);

//     this.http.post<Ticket>(this.CREATE_TICKET_URL, this.ticketForm.value)
//       .pipe(finalize(() => {

//       }))
//       .subscribe((response: any) => {
//         if (response.status == "OK") {
//           this.ticketForm.reset();
//           this.showAlert('Ticket Created Successfully', "warning", "info-circle")
//           timer(2500).subscribe(() => {
//             this.goBack();
//           });


//         }
//       },
//         (error: AjaxResponse<null>) => {
//           this.showAlert(<string>(error?.message), "warning", "info-circle")
//         })
//   }


//   updateTicket() {
//     // console.log(this.ticketForm.value);
//     this.http.put<Ticket>(this.UPDATE_TICKET_URL, this.ticketForm.value)
//       .pipe(finalize(() => {

//       }))
//       .subscribe((response: any) => {

//         if (response.status == "OK") {
//           this.ticketForm.reset();
//           this.showAlert('Update Successful', "warning", "info-circle")
//           timer(300).subscribe(() => {
//             this.goBack();

//           });


//         }
//       },
//         (error: AjaxResponse<null>) => {
//           this.showAlert(<string>(error?.message), "warning", "info-circle")
//         })
//   }


//   goBack() {
//     window.history.back();
//   }

//   //custom toast view
//   showAlert(msg: string, style: string, icon: string) {
//     this.alertIcon = icon;
//     this.alertMsg = msg;
//     this.style = style || 'info';
//     this.show = true;
//     timer(5000).subscribe(() => (this.show = false));
//     return false;
//   }



// }
