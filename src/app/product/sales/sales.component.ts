import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {SalesService} from "../../services/sales.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {finalize} from "rxjs";
import {formatDate} from "@angular/common";
import {Sale} from "../../model/sale";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent {



  displayedSaleListColumns: string[] = ['position', 'name', 'description', 'quantity', 'price', 'totalPrice', 'saleDate'];
  salesListDataSource = new MatTableDataSource<Sale>();

  @ViewChild(MatPaginator) salesListPaginator!: MatPaginator;

  ngAfterViewInit() {
    this.salesListDataSource.paginator = this.salesListPaginator;
  }


  constructor(private route: ActivatedRoute,
              private router: Router,
              private salesService: SalesService,
              private saleService: SalesService,
              private _snackBar: MatSnackBar) {
    this.getSales();


  }


  applySaleListFilter(event?: Event) {
    if (!event) return
    const filterValue = (event.target as HTMLInputElement).value;
    this.salesListDataSource.filter = filterValue.trim().toLowerCase();

    if (this.salesListDataSource.paginator) {

      this.salesListDataSource.paginator.firstPage();
    }
  }


  getSales(): void {
    this.salesService.getAllSales().pipe(finalize(() => {
//do nothing for now todo
    })).subscribe((result: any) => {
        this.salesListDataSource.data = result;
        console.log("getSales/finished getting sales successfully/result:"+JSON.stringify(result))
        // this.openSnackBar("Success", "Dismiss")

      },
      error => {
        this.openSnackBar(error.message, "Dismiss")
        console.log("getSales/there was an error getting sales report list")

      })
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

}
