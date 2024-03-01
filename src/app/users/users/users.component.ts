import {Component, ViewChild} from '@angular/core';
import {UserProfileComponent} from "../user-profile/user-profile.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {PageableResponse} from "../../model/http-response";
import {UsersListResponse} from "../../model/user.interface";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'role',
    'gender',
    'status',
    // 'company',
    // 'experience',
    // 'package',
    'action',
  ];
  dataSource: MatTableDataSource<UsersListResponse> =  new MatTableDataSource<UsersListResponse>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
      private _dialog: MatDialog,
      private userService: UserService,
      private _liveAnnouncer: LiveAnnouncer,
      private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }


  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(UserProfileComponent);
    dialogRef.afterClosed().subscribe({
      next: (val:any) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  getEmployeeList() {
    this.userService.getAllUsers(0,1000,'','')
        .subscribe({
      next: (res:PageableResponse<UsersListResponse>) => {
        this.dataSource.data = res.content;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    this.userService.deleteEmployee(id).subscribe({
      next: (res:any) => {
        this.snackbar.open('Employee deleted!', 'done');
        this.getEmployeeList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(UserProfileComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val:any) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
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


  lockUserAccount(row:any) {

    this.userService.lockUserAccount(row.email).subscribe((result:any)=>{
      this.snackbar.open(`${row.email} account locked successfully`)
      this.ngOnInit();
      location.reload();

    }, error => {
      this.snackbar.open(`there was an error locking user account`)
    })

  }

  unlockUserAccount(row:any) {
    this.userService.unlockUserAccount(row.email).subscribe((result:any)=>{
      this.snackbar.open(`${row.email} account unlocked successfully`)
      this.ngOnInit();
    }, error => {
      this.snackbar.open(`there was an error locking user account`)
    })
  }
}
