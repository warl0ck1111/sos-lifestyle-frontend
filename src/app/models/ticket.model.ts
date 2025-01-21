export class Ticket {
    id?: string;
    name?: string;
    email?: string;
    phone?: boolean;
    noOfTickets?:number;
    timeOfPayent?:string;
    isValid?:boolean;
    dateTimeOfInvalidation?:string;
    eventName: any;
    amount: any;
    paymentDateAndTime?: string|Date;
  }