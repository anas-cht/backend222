import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferralService } from '../services/referral.service';


@Component({
  selector: 'app-referral',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss']
})
export class ReferralComponent implements OnInit {
  userId = 7; // Replace with logic to get the current user's ID
  commission: number | null = null;
  errorMessage?: string;
  isLoading = true;

  constructor(private referralService: ReferralService) {}

  ngOnInit(): void {
    this.referralService.getReferralCommission(this.userId).subscribe({
      next: (commission) => {
        this.commission = commission;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error || err.message || 'Failed to load commission.';
        this.isLoading = false;
        console.error('Error:', err);
      }      
    });
  }
}
