import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportMessageResponseComponent } from './support-message-response.component';

describe('SupportMessageResponseComponent', () => {
  let component: SupportMessageResponseComponent;
  let fixture: ComponentFixture<SupportMessageResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportMessageResponseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportMessageResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
