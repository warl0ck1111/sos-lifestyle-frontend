import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent {

  transactionReference: string = '';
  transaction: any = null;

  constructor(private http: HttpClient) {}

  fetchTransactionDetails() {
    const apiUrl = `https://your-backend-url/api/transactions/${this.transactionReference}`;
    this.http.get(apiUrl).subscribe(
      (data) => {
        this.transaction = data;
      },
      (error) => {
        console.error('Error fetching transaction details:', error);
        alert('Transaction not found or an error occurred.');
      }
    );
  }

}
