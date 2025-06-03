import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CryptoService } from '../services/crypto.service';

@Component({
  selector: 'app-crypto-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.scss']
})
export class CryptoListComponent implements OnInit {
  cryptos: any[] = [];
  filteredCryptos: any[] = [];
  loading = true;
  searchQuery = '';
  selectedCrypto: any;
  amount: number = 0;
  transactions: any[] = [];
  userId: number = 7; // Should be set from auth service in real app

  // Notification properties
  showNotification = false;
  notificationMessage = '';
  isSuccess = false;

  constructor(private cryptoService: CryptoService) {}

  ngOnInit(): void {
    this.loadInitialData();
    this.loadTransactions();
  }

  private showNotificationMessage(message: string, isSuccess: boolean) {
    this.notificationMessage = message;
    this.isSuccess = isSuccess;
    this.showNotification = true;
    
    setTimeout(() => {
      this.showNotification = false;
    }, 10000);
  }

  loadInitialData(): void {
    this.loading = true;
    
    this.cryptoService.getCryptoData().subscribe({
      next: (data) => {
        this.cryptos = data;
        this.filteredCryptos = data;
        this.cryptoService.setAllCryptos(data);
        this.loading = false;
        
        // Silently check crypto status without showing error
        this.cryptoService.getAllCryptos(this.userId).subscribe({
          error: () => {} // Ignore error
        });
      },
      error: (err) => {
        this.showNotificationMessage('Failed to load cryptocurrency data', false);
        this.loading = false;
      }
    });
  }
  onSearch(): void {
    this.filteredCryptos = this.cryptoService.localSearch(this.searchQuery);
  }

  selectCrypto(crypto: any): void {
    this.selectedCrypto = crypto;
    this.amount = 0;
  }

  buyCrypto(): void {
    if (!this.selectedCrypto) {
      this.showNotificationMessage('Please select a cryptocurrency first', false);
      return;
    }

    if (this.amount <= 0) {
      this.showNotificationMessage('Please enter a valid amount', false);
      return;
    }

    const transaction = {
      cryptoId: this.selectedCrypto.id,
      cryptoSymbol: this.selectedCrypto.symbol,
      cryptoName: this.selectedCrypto.name,
      amount: this.amount,
      priceAtTransaction: this.selectedCrypto.current_price
    };

    this.cryptoService.buyCrypto(this.userId, transaction).subscribe({
      next: () => {
        this.showNotificationMessage('Purchase successful!', true);
        this.loadTransactions();
      },
      error: (err) => this.showNotificationMessage('Purchase failed: ' + err.message, false)
    });
  }

  sellCrypto(): void {
    if (!this.selectedCrypto) {
      this.showNotificationMessage('Please select a cryptocurrency first', false);
      return;
    }

    if (this.amount <= 0) {
      this.showNotificationMessage('Please enter a valid amount', false);
      return;
    }

    const transaction = {
      cryptoId: this.selectedCrypto.id,
      cryptoSymbol: this.selectedCrypto.symbol,
      cryptoName: this.selectedCrypto.name,
      amount: this.amount,
      priceAtTransaction: this.selectedCrypto.current_price
    };

    this.cryptoService.sellCrypto(this.userId, transaction).subscribe({
      next: () => {
        this.showNotificationMessage('Sale successful!', true);
        this.loadTransactions();
      },
      error: (err) => this.showNotificationMessage('Sale failed: ' + err.message, false)
    });
  }

  loadTransactions(): void {
    this.cryptoService.getUserTransactions(this.userId).subscribe({
      next: (transactions) => this.transactions = transactions,
      error: (err) => this.showNotificationMessage('Not allowed to buy or sell ', false)
    });
  }

  
}