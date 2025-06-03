import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatbotComponent } from '../chatbot/chatbot.component';


interface SystemSettingsDto {
  userId: number;
  commissionRate: number;
  maxTransactionAmount: number;
  transferLimit: number;
  cryptoEnabled: boolean;
  referralEnabled: boolean;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatbotComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'] // Make sure to include this
})
export class UserListComponent implements OnInit {
  settings: SystemSettingsDto[] = [];
  selectedUserId: number | null = null;
  selectedSetting: SystemSettingsDto | null = null;
  showNotification = false;
  notificationMessage = '';
  isSuccess = false;

  formData = {
    commissionRate: 0,
    maxTransactionAmount: 0,
    transferLimit: 0,
    cryptoEnabled: false,
    referralEnabled: false,
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<SystemSettingsDto[]>('http://localhost:8080/project_e_banking_war_exploded/api/admin/users/settings')
      .subscribe({
        next: (data) => {
          this.settings = data;
        },
        error: (err) => {
          console.error('Error fetching system settings:', err);
          this.showNotificationMessage('Failed to load settings', false);
        },
      });
  }

  onUserSelect() {
    this.selectedSetting = this.settings.find((s) => s.userId === +this.selectedUserId!) || null;
    if (this.selectedSetting) {
      this.formData = { ...this.selectedSetting };
    }
  }

  onSubmit() {
    if (!this.selectedSetting) return;

    const updated = { ...this.formData, userId: this.selectedSetting.userId };

    this.http.put(`http://localhost:8080/project_e_banking_war_exploded/api/admin/user/${updated.userId}`, updated).subscribe({
      next: () => {
        this.showNotificationMessage('Settings updated successfully!', true);
      },
      error: (err) => {
        console.error('Update failed:', err);
        this.showNotificationMessage('Failed to update settings', false);
      },
    });
  }

  private showNotificationMessage(message: string, isSuccess: boolean) {
    this.notificationMessage = message;
    this.isSuccess = isSuccess;
    this.showNotification = true;
    
    setTimeout(() => {
      this.showNotification = false;
    }, 5000);
  }
}