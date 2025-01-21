export class Ticket {
    id?: string;
    name?: string;
    email?: string;
    phone?: boolean;
    noOfTickets?:number;
    timeOfPayent?:string;
    ticketUsed?:boolean;
    dateTimeOfInvalidation?:string;
    eventName: any;
    amount: any;
    paymentDateAndTime?: string|Date;
  }
