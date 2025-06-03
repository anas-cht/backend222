import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-support-message-response',
  standalone:true,
  imports: [CommonModule,FormsModule,],
  templateUrl: './support-message-response.component.html',
  styleUrls: ['./support-message-response.component.css']
})
export class SupportMessageResponseComponent {
  @Input() message!: any;
  @Output() submitted = new EventEmitter<{ message: any; response: string }>();

  responseText = '';

  submitResponse() {
    this.submitted.emit({
      message: this.message,
      response: this.responseText });
    this.responseText = '';
  }
}
