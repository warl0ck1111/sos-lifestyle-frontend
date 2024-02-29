import {Component, ViewChild} from '@angular/core';
import {UserProfileComponent} from "../user-profile/user-profile.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
      private _dialog: MatDialog,
      private userService: UserService,
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
    this.userService.getAllUsers(0,1000,'','').subscribe({
      next: (res:any) => {
        this.dataSource = new MatTableDataSource(res);
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


}
