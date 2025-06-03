import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { CurrenciesService } from '../../services/admin_services/currencies_services';
import { AddCurrencyComponent } from './add-currency/add-currency.component';
import { UpdateCurrencyComponent } from './update-currency/update-currency.component';

@Component({
  selector: 'app-currencies',
  standalone: true, 
  imports: [CommonModule, AddCurrencyComponent, UpdateCurrencyComponent],
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {
  currencies: any[] = [];
  showAddForm = false;
  showUpdateForm = false;
  selectedCurrency: any = null;
  message: { success: boolean; text: string } | null = null;

  constructor(private adminService: CurrenciesService) {}

  ngOnInit(): void {
    this.loadCurrencies();
  }

  handleCurrencyEvent(event: { success: boolean, message: string }) {
    this.message = {
      success: event.success,
      text: event.message
    };
  
    if (event.success) {
      if (this.showAddForm) {
        this.onCurrencyAdded();   // For add
      } else if (this.showUpdateForm) {
        this.onCurrencyUpdated(); // For update
      }
    }
  
    setTimeout(() => this.message = null, 5000);
  }
  

  handleCurrencyAdded(event: { success: boolean; message: string }) {
    this.message = {
      success: event.success,
      text: event.message
    };
    if (event.success) {
      this.loadCurrencies(); 
  }
    
  
    setTimeout(() => this.message = null, 5000);
  }

  loadCurrencies(): void {
    this.adminService.getCurrencies().subscribe({
      next: (data) => {
        this.currencies = data;
      },
      error: (err) => {
        console.error('Error loading currencies:', err);
      }
    });
  }

  toggleCurrencyStatus(currency: any): void {
    currency.enabled = !currency.enabled;
    this.adminService.toggleCurrencyStatus(currency.id).subscribe({
      next: () => {
        console.log(`Currency ${currency.code} status updated.`);
      },
      error: (err) => {
        console.error(`Error updating status ${currency.id}, ${currency.enabled}:`, err);
        currency.enabled = !currency.enabled;
      }
    });
  }

  // Toggle Add Currency Form
  showAddCurrencyForm(): void {
    if (this.showAddForm) {
      // If form is already open, close it
      this.showAddForm = false;
    } else {
      // If form is closed, open it and close update form
      this.showAddForm = true;
      this.showUpdateForm = false;
      this.selectedCurrency = null;
    }
  }

  // Toggle Update Currency Form
  updateCurrency(currency: any): void {
    if (this.showUpdateForm && this.selectedCurrency?.id === currency.id) {
      // If clicking update on same currency when form is already open, close it
      this.showUpdateForm = false;
      this.selectedCurrency = null;
    } else {
      // Otherwise open the update form and close add form
      this.selectedCurrency = currency;
      this.showUpdateForm = true;
      this.showAddForm = false;
    }
  }

  onCurrencyAdded(): void {
    this.loadCurrencies();
    this.showAddForm = false;
  }

  onCurrencyUpdated(): void {
    this.loadCurrencies();
    this.showUpdateForm = false;
    this.selectedCurrency = null;
  }
}