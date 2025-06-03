import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrenciesService, Currency } from '../../../services/admin_services/currencies_services';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-currency',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-currency.component.html',
  styleUrls: ['./add-currency.component.css']
})
export class AddCurrencyComponent {
  @Output() currencyAdded = new EventEmitter<{success: boolean, message: string}>();
  
  currency: Currency = {
    id:0,
    name: '', 
    code: '', 
    symbol: '', 
    buyRate: 0, 
    sellRate: 0, 
    country: '',
    amount:0
  };

  constructor(private adminService: CurrenciesService) {}

  addCurrency() {
    if (!this.isFormValid()) {
      this.currencyAdded.emit({
        success: false,
        message: 'Please fill all required fields'
      });
      return;
    }

    this.adminService.addcurrency(this.currency).subscribe({
      next: () => {
        this.resetForm();
        this.currencyAdded.emit({
          success: true,
          message: 'Currency added successfully!'
        });
      },
      error: (err: HttpErrorResponse) => {
        const errorMessage = this.getErrorMessage(err);
        console.error('Error adding currency:', err);
        this.currencyAdded.emit({
          success: false,
          message: errorMessage
        });
      }
    });
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    let errorMessage = 'An unexpected error occurred';
    if (error.status === 0) {
      errorMessage = 'Network error: Please check your internet connection';
    } else if (error.status === 400) {
      errorMessage = 'Invalid data: ' + (this.extractMessage(error) || 'Please check your input');
    } else if (error.status === 401 || error.status === 403) {
      errorMessage = 'Authentication error: ' + (this.extractMessage(error) || 'Please login again');
    } else if (error.status === 404) {
      errorMessage = 'Resource not found';
    } else if (error.status === 409) {
      errorMessage = 'Conflict: ' + (this.extractMessage(error) || 'code or name already in use');
    } else if (error.status === 500) {
      errorMessage = 'Server error: ' + (this.extractMessage(error) || 'Our servers are experiencing issues. Please try again later');
    } else {
      errorMessage = `Error ${error.status}: ${error.message}`;
    }
  
    return errorMessage;
  }
  
  private extractMessage(error: HttpErrorResponse): string | null {
    if (typeof error.error === 'string') {
      try {
        const parsed = JSON.parse(error.error);
        return parsed.message || null;
      } catch {
        return null; // Not JSON, ignore
      }
    } else if (typeof error.error === 'object' && error.error !== null) {
      return error.error.message || null;
    }
    return null;
  }
  

  private isFormValid(): boolean {
    return !!this.currency.name && !!this.currency.code && !!this.currency.symbol && !!this.currency.buyRate
    && !!this.currency.sellRate && !!this.currency.country;
  }

  private resetForm() {
    this.currency = {
      id:0,
      name: '', 
      code: '', 
      symbol: '', 
      buyRate: 0, 
      sellRate: 0, 
      country: '',
      amount:0
    };
  }
}