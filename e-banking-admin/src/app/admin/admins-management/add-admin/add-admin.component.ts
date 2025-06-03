import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent {
  @Output() adminAdded = new EventEmitter<any>();

  admin:any = {
    username: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    department: '',
    employeeId: '',
    bankId: null,
    agentId: null
  };

  submit() {
    if (this.isValid()) {
      this.adminAdded.emit(this.admin);
      this.reset();
    }
  }

  

  isValid() {
    return this.admin.username && this.admin.email && this.admin.password;
  }

  reset() {
    this.admin = {
      username: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      department: '',
      employeeId: '',
      bankId: null,
      agentId: null
    };
  }
}
