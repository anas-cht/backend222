import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { SupportmessageServiceTsService  } from '../../services/admin_services/supportmessage-service.ts.service';
import { SupportMessageResponseComponent } from './support-message-response/support-message-response.component';

@Component({
  selector: 'app-supportmessages',
  standalone: true,
  imports: [CommonModule, SupportMessageResponseComponent],
  templateUrl: './supportmessages.component.html',
  styleUrl: './supportmessages.component.css'
})
export class SupportmessagesComponent implements OnInit{
  messages:any[]=[];
  activeResponseId: number | null = null;

    constructor(private adminService:SupportmessageServiceTsService  ) {}

  ngOnInit(): void {
      this.getAllmessages();
  }

  deleteMessage(id:number):void{
    this.adminService.deletemessage(id).subscribe({
      next: () => {
        console.log(`message ${id} status updated.`);
        this.getAllmessages();
      },
      error: (err) => {
        console.error(`Error deleting ${id},:`, err);
      }
    });
  }

  getAllmessages():void{
    this.adminService.getAllrequestmessages().subscribe({
      next: (data) => {
        this.messages = data;
      },
      error: (err) => {
        console.error('Error loading messages:', err);
      }
    });

  }

  toggleResponse(id: number) {
    this.activeResponseId = this.activeResponseId === id ? null : id;
  }
  
  handleResponseSubmit(data: { message: any; response: string }) {
    data.message.message=data.response;
    this.adminService.addresponsemessage(data.message).subscribe({
      next: () => {
        console.log("response added",data.message)
      },
      error: (err) => {
        console.error('Error loading messages:', err);
      }
    });
    this.activeResponseId = null; 
  }

}
