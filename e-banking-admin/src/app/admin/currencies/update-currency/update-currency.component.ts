import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrenciesService } from '../../../services/admin_services/currencies_services';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-currency',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-currency.component.html',
  styleUrls: ['./update-currency.component.css']
})
export class UpdateCurrencyComponent {
  @Input() currency: any;
  @Output() currencyUpdated = new EventEmitter<{success: boolean, message: string}>();
  originalCurrency: any;

  constructor(private adminService: CurrenciesService) {}

  ngOnInit() {
    // Create a deep copy of the original currency for comparison
    this.originalCurrency = JSON.parse(JSON.stringify(this.currency));
  }

  updateCurrency() {
    // Check if any changes were made
    if (!this.hasChanges()) {
      this.currencyUpdated.emit({
        success: false,
        message: 'No changes detected'
      });
      return;
    }

    this.adminService.updatecurrency(this.currency).subscribe({
      next: () => {
        this.currencyUpdated.emit({
          success: true,
          message: 'Currency updated successfully!'
        });
        // Update original after successful update
        this.originalCurrency = JSON.parse(JSON.stringify(this.currency));
      },
      error: (err: HttpErrorResponse) => {
        const errorMessage = this.getErrorMessage(err);
        this.currencyUpdated.emit({
          success: false,
          message: errorMessage
        });
      }
    });
  }

  private hasChanges(): boolean {
    return JSON.stringify(this.currency) !== JSON.stringify(this.originalCurrency);
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    let errorMessage = 'An unexpected error occurred';
    
    if (error.status === 0) {
      errorMessage = 'Network error: Please check your internet connection';
    } else if (error.status === 400) {
      errorMessage = 'Invalid data: ' + (error.error?.message || 'Please check your input');
    } else if (error.status === 401 || error.status === 403) {
      errorMessage = 'Authentication error: ' + (error.error?.message || 'Please login again');
    } else if (error.status === 404) {
      errorMessage = 'Currency not found';
    } else if (error.status === 409) {
      errorMessage = 'Conflict: ' + (error.error?.message || 'code or name already in use');
    } else if (error.status === 500) {
      errorMessage = 'Server error: ' + 
        (error.error?.message || 'Our servers are experiencing issues. Please try again later');
    } else {
      errorMessage = `Error ${error.status}: ${error.message}`;
    }

    return errorMessage;
  }
}