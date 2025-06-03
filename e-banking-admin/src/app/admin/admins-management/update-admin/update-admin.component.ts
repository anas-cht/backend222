import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {
  @Input() admin: any;
  @Output() adminUpdated = new EventEmitter<any>();
  original: any;

  ngOnInit() {
    this.original = JSON.parse(JSON.stringify(this.admin));
  }

  submit() {
    if (JSON.stringify(this.admin) !== JSON.stringify(this.original)) {
      this.adminUpdated.emit(this.admin);
      this.original = JSON.parse(JSON.stringify(this.admin));
    }
  }
}
