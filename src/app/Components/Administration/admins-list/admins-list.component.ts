import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdministratorService } from '../../../services/administrator/administrator.service';

@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrl: './admins-list.component.css'
})
export class AdminsListComponent {
  adminForm!: FormGroup;
  isVisibile: boolean = false;
  loading = false;
  admins: any[] = [];
  displayedColumns: string[] = ['id','username', 'email', 'password', 'actions'];
  dataSource!: MatTableDataSource<any>;
  isEditMode = false;
  currentAdminId: number | null = null;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild('deleteDialog')
  deleteDialog!: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
    private adminService: AdministratorService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.adminForm = this.fb.group({
      username:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    // Load the list of administrators
    this.getAdministrators();
  }

  getAdministrators(): void {
    this.loading = true;
    this.adminService.listAdministrator().subscribe(
      (res: any) => {
        this.admins = res.dati || [];
        this.dataSource = new MatTableDataSource(this.admins);
        // Setup pagination after view init
        setTimeout(() => (this.dataSource.paginator = this.paginator));
        this.loading = false;
      },
      (      err: any) => {
        console.error(err);
        this.loading = false;
      }
    );
  }

  onSubmit(): void {
    if (this.adminForm.invalid) {
      return;
    }
    const payload = this.adminForm.value;
    if (this.isEditMode && this.currentAdminId !== null) {
      // Update operation
      payload['id'] = this.currentAdminId;
      this.adminService.updateAdministrator(payload).subscribe(
        () => {
          this.getAdministrators();
          this.resetForm();
        },
        (        err: any) => console.error(err)
      );
    } else {
      // Create operation
      this.adminService.createAdministrator(payload).subscribe(
        () => {
          this.getAdministrators();
          this.resetForm();

        },
        (        err: any) => console.error(err)
      );
    }
  }

  editAdmin(admin: any): void {
    this.isEditMode = true;
    this.currentAdminId = admin.id;
    this.adminForm.patchValue({
      email: admin.email,
      password: admin.password,
      username:admin.username
    });
  }

  resetForm(): void {
    this.isEditMode = false;
    this.currentAdminId = null;
    for (const key in this.adminForm.controls) {
      this.adminForm.get(key)!.clearValidators();
      this.adminForm.get(key)!.updateValueAndValidity();
  }
    this.adminForm.reset();

  }

  openDeleteDialog(admin: any): void {
    const dialogRef = this.dialog.open(this.deleteDialog, {
      data: admin
    });
    // Optional: Handle after close if needed
    dialogRef.afterClosed().subscribe();
  }

  deleteAdmin(adminId: number): void {
    this.adminService.deleteAdministrator({ id: adminId }).subscribe(
      () => {
        this.getAdministrators();
        this.dialog.closeAll();
      },
      (      err: any) => console.error(err)
    );
  }

  toggleVisibility(): void {
    this.isVisibile = !this.isVisibile;
  }
}


