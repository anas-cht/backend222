import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { AdminsManagementService } from '../../services/admin_services/admins-management.service';
import {AddAdminComponent} from './add-admin/add-admin.component'
import {UpdateAdminComponent} from './update-admin/update-admin.component'



@Component({
  selector: 'app-admin-management',
  standalone: true, 
  imports: [CommonModule,UpdateAdminComponent,AddAdminComponent],
  templateUrl: './admins-management.component.html',
  styleUrls: ['./admins-management.component.css']
})
export class AdminsManagementComponent implements OnInit {
  administrators: any[] = [];
  showAddForm = false;
  showUpdateForm = false;
  selectedAdmin: any = null;

  constructor(private adminService: AdminsManagementService) {}

  ngOnInit() {
    this.loadAdmins();
  }

  loadAdmins() {
    this.adminService.getalladmins().subscribe({
      next: (data) => {
        this.administrators = data;
      },
      error: (err) => {
        console.error('Error loading currencies:', err);
      }
    });
  }

  showUpdate(admin: any) {
    this.selectedAdmin = admin;
    this.showUpdateForm = !this.showUpdateForm;
    this.showAddForm = false;
  }

  showadd() {
    this.showAddForm = !this.showAddForm;
    this.showUpdateForm =false;
  }
  


handleAddAdmin(admin: any) {
  this.adminService.addadmin(admin).subscribe(() => this.loadAdmins());
  this.showAddForm = false;
}

handleUpdateAdmin(admin: any) {
  this.adminService.updateadmin(admin).subscribe(() => this.loadAdmins());
  this.showUpdateForm = false;
  this.selectedAdmin = null;
}

deleteadmin(admin:any){
  this.adminService.deleteadmin(admin).subscribe({
    next: (data) => {
      console.log("admin deleted ");
      this.loadAdmins();
    },
    error: (err) => {
      console.error('Error loading currencies:', err);
    }
  });
}


}
