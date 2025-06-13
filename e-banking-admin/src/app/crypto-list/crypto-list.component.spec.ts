import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoListComponent } from './crypto-list.component';

describe('CryptoListComponent', () => {
  let component: CryptoListComponent;
  let fixture: ComponentFixture<CryptoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
