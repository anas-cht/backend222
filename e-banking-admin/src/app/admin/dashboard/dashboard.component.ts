import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChatbotComponent } from '../../chatbot/chatbot.component';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, ChatbotComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  {

  
}
